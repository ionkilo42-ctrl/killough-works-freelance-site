import { describe, expect, it } from "vitest";

import {
  buildPaymentAcceptanceRecord,
  validatePaymentAcceptance,
} from "@/lib/payment-acceptance";

describe("payment acceptance", () => {
  it("validates a supported offer and stripe url", () => {
    expect(
      validatePaymentAcceptance({
        offerSlug: "first-fix",
        stripeUrl: "https://buy.stripe.com/test",
      }),
    ).toEqual({
      offerSlug: "first-fix",
      stripeUrl: "https://buy.stripe.com/test",
    });
  });

  it("rejects invalid offer slugs", () => {
    expect(() =>
      validatePaymentAcceptance({
        offerSlug: "enterprise-build" as "first-fix",
        stripeUrl: "https://buy.stripe.com/test",
      }),
    ).toThrow(/invalid offer/i);
  });

  it("builds an audit record with versioned policy urls", () => {
    const record = buildPaymentAcceptanceRecord(
      {
        offerSlug: "first-fix",
        stripeUrl: "https://buy.stripe.com/test",
      },
      {
        ip: "203.0.113.10",
        userAgent: "vitest",
        referer: "https://killough.works/pay",
      },
    );

    expect(record.offer).toBe("First Fix");
    expect(record.termsVersion).toBe("1.1");
    expect(record.refundVersion).toBe("1.1");
    expect(record.privacyVersion).toBe("1.1");
    expect(record.termsUrl).toContain("/terms");
    expect(record.refundUrl).toContain("/refund");
    expect(record.privacyUrl).toContain("/privacy");
    expect(record.accepted).toBe(true);
    expect(record.ip).toBe("203.0.113.10");
  });
});