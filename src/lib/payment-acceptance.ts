import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

import { Resend } from "resend";

import {
  getLegalAbsoluteUrl,
  legalPolicyVersions,
  legalRoutes,
  paymentOfferLabels,
  type PaymentOfferSlug,
} from "@/data/legal";

export type PaymentAcceptancePayload = {
  offerSlug: PaymentOfferSlug;
  stripeUrl: string;
};

export type PaymentAcceptanceRecord = {
  id: string;
  timestamp: string;
  offer: string;
  offerSlug: PaymentOfferSlug;
  stripeUrl: string;
  termsVersion: string;
  refundVersion: string;
  privacyVersion: string;
  termsUrl: string;
  refundUrl: string;
  privacyUrl: string;
  ip: string | null;
  userAgent: string | null;
  referer: string | null;
  accepted: true;
};

export type PaymentAcceptanceRequestMeta = {
  ip: string | null;
  userAgent: string | null;
  referer: string | null;
};

const validOfferSlugs: PaymentOfferSlug[] = ["friction-check", "first-fix", "mini-build"];

export function validatePaymentAcceptance(payload: Partial<PaymentAcceptancePayload>) {
  if (!payload.offerSlug || !validOfferSlugs.includes(payload.offerSlug)) {
    throw new Error("Missing or invalid offer.");
  }

  if (!payload.stripeUrl?.trim() || !payload.stripeUrl.startsWith("https://")) {
    throw new Error("Missing or invalid payment URL.");
  }

  return {
    offerSlug: payload.offerSlug,
    stripeUrl: payload.stripeUrl.trim(),
  };
}

export function buildPaymentAcceptanceRecord(
  payload: PaymentAcceptancePayload,
  meta: PaymentAcceptanceRequestMeta,
): PaymentAcceptanceRecord {
  return {
    id: randomUUID(),
    timestamp: new Date().toISOString(),
    offer: paymentOfferLabels[payload.offerSlug],
    offerSlug: payload.offerSlug,
    stripeUrl: payload.stripeUrl,
    termsVersion: legalPolicyVersions.terms,
    refundVersion: legalPolicyVersions.refund,
    privacyVersion: legalPolicyVersions.privacy,
    termsUrl: getLegalAbsoluteUrl(legalRoutes.terms),
    refundUrl: getLegalAbsoluteUrl(legalRoutes.refund),
    privacyUrl: getLegalAbsoluteUrl(legalRoutes.privacy),
    ip: meta.ip,
    userAgent: meta.userAgent,
    referer: meta.referer,
    accepted: true,
  };
}

async function saveLocally(record: PaymentAcceptanceRecord) {
  const dataDir = path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, "payment-acceptances.json");

  await mkdir(dataDir, { recursive: true });

  let existing: PaymentAcceptanceRecord[] = [];
  try {
    const content = await readFile(filePath, "utf8");
    existing = JSON.parse(content) as PaymentAcceptanceRecord[];
  } catch {
    existing = [];
  }

  existing.unshift(record);
  await writeFile(filePath, JSON.stringify(existing, null, 2), "utf8");
}

function formatAuditEmail(record: PaymentAcceptanceRecord) {
  return [
    "Payment terms acceptance recorded",
    "",
    `Offer: ${record.offer}`,
    `Offer Slug: ${record.offerSlug}`,
    `Accepted At: ${record.timestamp}`,
    `Accepted: ${record.accepted}`,
    "",
    `Terms Version: ${record.termsVersion}`,
    `Terms URL: ${record.termsUrl}`,
    `Refund Version: ${record.refundVersion}`,
    `Refund URL: ${record.refundUrl}`,
    `Privacy Version: ${record.privacyVersion}`,
    `Privacy URL: ${record.privacyUrl}`,
    "",
    `Stripe URL: ${record.stripeUrl}`,
    `IP: ${record.ip ?? "N/A"}`,
    `User Agent: ${record.userAgent ?? "N/A"}`,
    `Referer: ${record.referer ?? "N/A"}`,
    `Record ID: ${record.id}`,
  ].join("\n");
}

async function notifyByEmail(record: PaymentAcceptanceRecord) {
  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.INTAKE_TO_EMAIL ?? process.env.LEAD_INBOX;
  const from =
    process.env.INTAKE_FROM_EMAIL ??
    process.env.LEAD_FROM_EMAIL ??
    "Killough Works <onboarding@resend.dev>";

  if (!apiKey || !inbox) {
    return { mode: "unconfigured" as const };
  }

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from,
    to: [inbox],
    subject: `Payment terms accepted: ${record.offer} — v${record.termsVersion}`,
    text: formatAuditEmail(record),
  });

  return { mode: "email" as const };
}

export async function handlePaymentAcceptance(
  payload: Partial<PaymentAcceptancePayload>,
  meta: PaymentAcceptanceRequestMeta,
) {
  const validated = validatePaymentAcceptance(payload);
  const record = buildPaymentAcceptanceRecord(validated, meta);

  try {
    await saveLocally(record);
  } catch (error) {
    console.warn("Could not persist payment acceptance locally.", error);
  }

  const delivery = await notifyByEmail(record);

  if (delivery.mode === "unconfigured" && process.env.NODE_ENV === "production") {
    console.warn("Payment acceptance recorded without email delivery configured.", {
      id: record.id,
      offer: record.offer,
      timestamp: record.timestamp,
    });
  }

  return {
    id: record.id,
    timestamp: record.timestamp,
    offer: record.offer,
    termsVersion: record.termsVersion,
    deliveryMode: delivery.mode,
  };
}

export function extractRequestMeta(request: Request): PaymentAcceptanceRequestMeta {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip");

  return {
    ip: ip ?? null,
    userAgent: request.headers.get("user-agent"),
    referer: request.headers.get("referer"),
  };
}