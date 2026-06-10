#!/usr/bin/env node

const STRIPE_API_BASE = "https://api.stripe.com/v1";
const DEFAULT_SITE_URL = "https://killough.works";
const MANAGED_BY = "killough_works_stripe_sync";
const OLD_PRODUCT_NAMES = ["Quick Lead / Offer Audit", "Pitch Image / Social Graphic"];

const dryRun = process.env.DRY_RUN !== "false";
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL);
const skipImages = process.env.SKIP_STRIPE_IMAGES === "true";

const offers = [
  {
    key: "friction_check",
    envVar: "NEXT_PUBLIC_STRIPE_FRICTION_CHECK_URL",
    name: "Friction Check",
    unitAmount: 3500,
    description:
      "A focused review of your page, post, link, offer, or lead flow. I’ll identify what is confusing, missing, or costing you responses and give you the clearest first fix.",
    localImagePath: "public/images/offers/friction-check.png",
    publicImagePath: "/images/offers/friction-check.png",
  },
  {
    key: "first_fix",
    envVar: "NEXT_PUBLIC_STRIPE_FIRST_FIX_URL",
    name: "First Fix",
    unitAmount: 7500,
    description:
      "One practical improvement completed for you, such as offer cleanup, a DM pitch, landing page section, intake form, payment/start link, CTA rewrite, or small lead-flow improvement.",
    localImagePath: "public/images/offers/first-fix.png",
    publicImagePath: "/images/offers/first-fix.png",
  },
  {
    key: "mini_build",
    envVar: "NEXT_PUBLIC_STRIPE_MINI_BUILD_URL",
    name: "Mini Build",
    unitAmount: 15000,
    description:
      "A small custom build starter payment around your actual business, such as a quote flow, booking page, QR hub, intake system, simple dashboard, partner page, landing page, or lightweight automation.",
    localImagePath: "public/images/offers/mini-build.png",
    publicImagePath: "/images/offers/mini-build.png",
  },
];

main().catch((error) => {
  console.error("");
  console.error("Stripe sync failed:");
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});

async function main() {
  if (!stripeSecretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY. Put it in your shell or .env.local, never in committed code.");
  }

  if (!/^sk_(test|live)_/.test(stripeSecretKey)) {
    throw new Error("STRIPE_SECRET_KEY should look like sk_test_... or sk_live_....");
  }

  const keyMode = stripeSecretKey.startsWith("sk_live_") ? "live" : "test";
  const imageBaseUrl = skipImages ? null : siteUrl;

  console.log("Killough Works Stripe sync");
  console.log(`Mode: ${keyMode}`);
  console.log(`Dry run: ${dryRun ? "yes" : "no"}`);
  console.log(`Site URL: ${siteUrl}`);
  console.log(
    imageBaseUrl
      ? `Product images: public URLs under ${imageBaseUrl}`
      : "Product images: skipped because SKIP_STRIPE_IMAGES=true",
  );
  console.log("");
  console.log("Planned current offers:");
  for (const offer of offers) {
    console.log(`- ${offer.name}: ${formatUsd(offer.unitAmount)} one-time`);
  }
  console.log("");

  const productsBefore = await listAll("/products");
  const productById = new Map(productsBefore.map((product) => [product.id, product]));
  const synced = [];

  for (const offer of offers) {
    const product = await ensureProduct(offer, productsBefore, imageBaseUrl);
    if (product.id && !product.id.startsWith("dry_run_")) {
      productById.set(product.id, product);
    }

    const price = await ensurePrice(offer, product);
    const paymentLink = await ensurePaymentLink(offer, product, price, productById);

    synced.push({ offer, product, price, paymentLink });
  }

  const productsAfter = dryRun ? productsBefore : await listAll("/products");
  const productsForCleanup = dryRun ? productsBefore : productsAfter;
  await deactivateOldProducts(productsForCleanup);

  const refreshedProductById = new Map(productsForCleanup.map((product) => [product.id, product]));
  for (const item of synced) {
    if (item.product.id && !item.product.id.startsWith("dry_run_")) {
      refreshedProductById.set(item.product.id, item.product);
    }
  }

  await deactivateOldPaymentLinks(refreshedProductById);

  console.log("");
  console.log("Payment links for environment variables:");
  for (const item of synced) {
    const value = item.paymentLink.url || "(created on actual run)";
    console.log(`${item.offer.envVar}=${value}`);
  }

  console.log("");
  console.log("Notes:");
  console.log("- Stripe product images require public image URLs; this script points Stripe at the deployed site URLs.");
  console.log("- Run after the offer images are deployed, or set SKIP_STRIPE_IMAGES=true for the first pass.");
  console.log("- Global checkout branding colors/logos still need to be confirmed in the Stripe dashboard.");
}

async function ensureProduct(offer, existingProducts, imageBaseUrl) {
  const imageUrl = imageBaseUrl ? new URL(offer.publicImagePath, `${imageBaseUrl}/`).toString() : null;
  const product =
    existingProducts.find((candidate) => candidate.metadata?.killough_offer_key === offer.key) ||
    existingProducts.find((candidate) => candidate.name.toLowerCase() === offer.name.toLowerCase());

  const params = {
    name: offer.name,
    description: offer.description,
    active: "true",
    metadata: offerMetadata(offer),
  };

  if (imageUrl) {
    params.images = [imageUrl];
  }

  if (!product) {
    if (dryRun) {
      logDryRun(`create product ${offer.name}`, params);
      return { id: `dry_run_product_${offer.key}`, name: offer.name, metadata: params.metadata };
    }

    const created = await stripeRequest("POST", "/products", params);
    console.log(`Created product: ${created.name} (${created.id})`);
    return created;
  }

  if (dryRun) {
    logDryRun(`update product ${offer.name} (${product.id})`, params);
    return product;
  }

  const updated = await stripeRequest("POST", `/products/${product.id}`, params);
  console.log(`Updated product: ${updated.name} (${updated.id})`);
  return updated;
}

async function ensurePrice(offer, product) {
  if (product.id.startsWith("dry_run_")) {
    logDryRun(`create price for ${offer.name}`, {
      unit_amount: offer.unitAmount,
      currency: "usd",
      product: product.id,
    });
    return { id: `dry_run_price_${offer.key}`, unit_amount: offer.unitAmount, currency: "usd" };
  }

  const prices = await listAll("/prices", { product: product.id, active: "true" });
  const matchingPrice = prices.find(
    (price) =>
      price.currency === "usd" &&
      price.unit_amount === offer.unitAmount &&
      price.type === "one_time" &&
      price.active,
  );

  if (matchingPrice) {
    console.log(`Confirmed price: ${offer.name} ${formatUsd(offer.unitAmount)} (${matchingPrice.id})`);
    return matchingPrice;
  }

  const params = {
    currency: "usd",
    unit_amount: offer.unitAmount,
    product: product.id,
    nickname: `${offer.name} ${formatUsd(offer.unitAmount)}`,
    metadata: offerMetadata(offer),
  };

  if (dryRun) {
    logDryRun(`create price for ${offer.name}`, params);
    return { id: `dry_run_price_${offer.key}`, unit_amount: offer.unitAmount, currency: "usd" };
  }

  const created = await stripeRequest("POST", "/prices", params);
  console.log(`Created price: ${offer.name} ${formatUsd(offer.unitAmount)} (${created.id})`);
  return created;
}

async function ensurePaymentLink(offer, product, price, productById) {
  const paymentLinks = await listPaymentLinksWithItems(productById);
  const candidates = paymentLinks.filter((link) => {
    const managedMatch = link.metadata?.killough_offer_key === offer.key;
    const priceMatch = link.lineItems.some((item) => item.price?.id === price.id);
    const productMatch = link.lineItems.some((item) => getLineItemProductId(item) === product.id);
    return managedMatch || priceMatch || productMatch;
  });

  const matchingLink = candidates.find(
    (link) => link.active && link.lineItems.some((item) => item.price?.id === price.id),
  );

  if (matchingLink) {
    const params = paymentLinkUpdateParams(offer);
    if (dryRun) {
      logDryRun(`update payment link for ${offer.name} (${matchingLink.id})`, params);
      return matchingLink;
    }

    const updated = await stripeRequest("POST", `/payment_links/${matchingLink.id}`, params);
    console.log(`Updated payment link: ${offer.name} (${updated.url})`);
    return updated;
  }

  for (const candidate of candidates) {
    if (candidate.active && candidate.metadata?.managed_by === MANAGED_BY) {
      await updatePaymentLinkActive(candidate, false, `deactivate stale managed payment link for ${offer.name}`);
    }
  }

  const params = {
    line_items: [{ price: price.id, quantity: 1 }],
    metadata: offerMetadata(offer),
    after_completion: {
      type: "redirect",
      redirect: {
        url: new URL("/paid", `${siteUrl}/`).toString(),
      },
    },
  };

  if (dryRun) {
    logDryRun(`create payment link for ${offer.name}`, params);
    return { id: `dry_run_payment_link_${offer.key}`, url: null, active: true, metadata: params.metadata };
  }

  const created = await stripeRequest("POST", "/payment_links", params);
  console.log(`Created payment link: ${offer.name} (${created.url})`);
  return created;
}

async function deactivateOldProducts(products) {
  console.log("");
  console.log("Old product cleanup:");
  const oldProducts = products.filter((product) => OLD_PRODUCT_NAMES.includes(product.name));

  if (oldProducts.length === 0) {
    console.log("- No old products found by name.");
    return;
  }

  for (const product of oldProducts) {
    if (!product.active) {
      console.log(`- Already inactive: ${product.name} (${product.id})`);
      continue;
    }

    if (dryRun) {
      logDryRun(`mark old product inactive: ${product.name} (${product.id})`, { active: "false" });
      continue;
    }

    await stripeRequest("POST", `/products/${product.id}`, { active: "false" });
    console.log(`- Marked product inactive: ${product.name} (${product.id})`);
  }
}

async function deactivateOldPaymentLinks(productById) {
  console.log("");
  console.log("Old payment link cleanup:");
  const paymentLinks = await listPaymentLinksWithItems(productById);
  const oldPaymentLinks = paymentLinks.filter((link) =>
    link.lineItems.some((item) => OLD_PRODUCT_NAMES.includes(getLineItemProductName(item, productById))),
  );

  if (oldPaymentLinks.length === 0) {
    console.log("- No old payment links found by product name.");
    return;
  }

  for (const link of oldPaymentLinks) {
    if (!link.active) {
      console.log(`- Already inactive: ${link.id}`);
      continue;
    }

    await updatePaymentLinkActive(link, false, `mark old payment link inactive (${link.id})`);
  }
}

async function updatePaymentLinkActive(link, active, label) {
  const params = { active: active ? "true" : "false" };

  if (dryRun) {
    logDryRun(label, params);
    return;
  }

  await stripeRequest("POST", `/payment_links/${link.id}`, params);
  console.log(`- ${label}`);
}

async function listPaymentLinksWithItems(productById) {
  const paymentLinks = await listAll("/payment_links");

  const enriched = [];
  for (const link of paymentLinks) {
    const lineItems = await listAll(`/payment_links/${link.id}/line_items`, {
      "expand[]": "data.price.product",
    });
    for (const item of lineItems) {
      const product = item.price?.product;
      if (product && typeof product === "object") {
        productById.set(product.id, product);
      }
    }
    enriched.push({ ...link, lineItems });
  }

  return enriched;
}

async function listAll(path, params = {}) {
  const items = [];
  let startingAfter;

  do {
    const page = await stripeRequest("GET", path, {
      ...params,
      limit: 100,
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    });

    items.push(...page.data);
    startingAfter = page.has_more ? page.data.at(-1)?.id : undefined;
  } while (startingAfter);

  return items;
}

async function stripeRequest(method, path, params = {}) {
  const url = new URL(`${STRIPE_API_BASE}${path}`);
  const headers = {
    Authorization: `Bearer ${stripeSecretKey}`,
  };

  const request = { method, headers };

  if (method === "GET") {
    const query = toStripeParams(params);
    for (const [key, value] of query) {
      url.searchParams.append(key, value);
    }
  } else {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    request.body = toStripeParams(params);
  }

  const response = await fetch(url, request);
  const text = await response.text();
  const payload = text ? JSON.parse(text) : {};

  if (!response.ok) {
    const message = payload.error?.message || response.statusText;
    throw new Error(`${method} ${path} failed: ${message}`);
  }

  return payload;
}

function paymentLinkUpdateParams(offer) {
  return {
    active: "true",
    metadata: offerMetadata(offer),
    after_completion: {
      type: "redirect",
      redirect: {
        url: new URL("/paid", `${siteUrl}/`).toString(),
      },
    },
  };
}

function offerMetadata(offer) {
  return {
    managed_by: MANAGED_BY,
    killough_offer_key: offer.key,
    local_image_path: offer.localImagePath,
  };
}

function getLineItemProductId(item) {
  const product = item.price?.product;
  if (!product) {
    return "";
  }
  return typeof product === "string" ? product : product.id;
}

function getLineItemProductName(item, productById) {
  const product = item.price?.product;
  if (!product) {
    return "";
  }
  if (typeof product === "object") {
    return product.name || "";
  }
  return productById.get(product)?.name || "";
}

function toStripeParams(value, prefix, params = new URLSearchParams()) {
  if (value === undefined || value === null) {
    return params;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      toStripeParams(item, `${prefix}[${index}]`, params);
    });
    return params;
  }

  if (typeof value === "object") {
    for (const [key, nestedValue] of Object.entries(value)) {
      const nestedKey = prefix ? `${prefix}[${key}]` : key;
      toStripeParams(nestedValue, nestedKey, params);
    }
    return params;
  }

  params.append(prefix, String(value));
  return params;
}

function normalizeSiteUrl(value) {
  return value.replace(/\/+$/, "");
}

function formatUsd(cents) {
  return `$${(cents / 100).toFixed(0)}`;
}

function logDryRun(label, params) {
  console.log(`[dry-run] Would ${label}`);
  console.log(indent(JSON.stringify(redact(params), null, 2)));
}

function redact(value) {
  return value;
}

function indent(value) {
  return value
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n");
}
