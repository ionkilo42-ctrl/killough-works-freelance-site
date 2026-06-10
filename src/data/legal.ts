export const LEGAL_PACKAGE_VERSION = "1.1";
export const LEGAL_EFFECTIVE_DATE = "June 10, 2026";

export const legalPolicyVersions = {
  terms: LEGAL_PACKAGE_VERSION,
  refund: LEGAL_PACKAGE_VERSION,
  privacy: LEGAL_PACKAGE_VERSION,
  "ai-disclosure": LEGAL_PACKAGE_VERSION,
  "intellectual-property": LEGAL_PACKAGE_VERSION,
  "service-agreement": LEGAL_PACKAGE_VERSION,
} as const;

export const legalRoutes = {
  terms: "/terms",
  privacy: "/privacy",
  refund: "/refund",
  "ai-disclosure": "/ai-disclosure",
  "intellectual-property": "/intellectual-property",
  "service-agreement": "/service-agreement",
} as const;

export type LegalDocumentSlug = keyof typeof legalRoutes;

export const legalDocuments: Record<
  LegalDocumentSlug,
  { title: string; description: string }
> = {
  terms: {
    title: "Terms of Service",
    description: "Site use, service tiers, liability limits, and client responsibilities.",
  },
  privacy: {
    title: "Privacy Policy",
    description: "How Killough Works collects and uses contact and project information.",
  },
  refund: {
    title: "Refund Policy",
    description: "Refund and chargeback rules for Friction Check, First Fix, and Mini Build.",
  },
  "ai-disclosure": {
    title: "AI Disclosure",
    description: "How Killough Works may use AI tools in client work and what that means for you.",
  },
  "intellectual-property": {
    title: "Intellectual Property Policy",
    description: "Ownership and license rules for client materials, deliverables, and provider tools.",
  },
  "service-agreement": {
    title: "Service Agreement Template",
    description: "Template agreement for Mini Build and larger engagements with defined scope.",
  },
};

export type PaymentOfferSlug = "friction-check" | "first-fix" | "mini-build";

export const paymentOfferLabels: Record<PaymentOfferSlug, string> = {
  "friction-check": "Friction Check",
  "first-fix": "First Fix",
  "mini-build": "Mini Build",
};

export function getLegalAbsoluteUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://killough.works";
  return `${base.replace(/\/$/, "")}${path}`;
}