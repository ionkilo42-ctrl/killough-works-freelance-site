"use client";

import Image from "next/image";

import {
  GatedStripeButton,
  PaymentTermsCheckbox,
  PaymentTermsProvider,
} from "@/components/payment-terms-gate";
import type { PricingTier } from "@/data/site";
import type { PaymentOfferSlug } from "@/data/legal";

const offerSlugByName: Record<string, PaymentOfferSlug> = {
  "Friction Check": "friction-check",
  "First Fix": "first-fix",
  "Mini Build": "mini-build",
};

type PayOptionsClientProps = {
  options: PricingTier[];
};

export function PayOptionsClient({ options }: PayOptionsClientProps) {
  return (
    <PaymentTermsProvider>
      <PaymentTermsCheckbox />
      <div className="payment-grid">
        {options.map((option, index) => {
          const offerSlug = option.name ? offerSlugByName[option.name] : undefined;

          return (
            <article
              className={`pricing-card payment-card payment-card-${index + 1}${option.featured ? " payment-card-featured" : ""}`}
              key={option.title}
            >
              <div className="payment-card-image-wrap">
                <Image
                  src={option.imageSrc}
                  alt={option.imageAlt}
                  width={1254}
                  height={1254}
                  className="payment-card-image"
                  sizes="(max-width: 760px) 100vw, (max-width: 1080px) 50vw, 360px"
                />
              </div>
              <p className="pricing-note">
                {option.checkoutMode === "live"
                  ? "live payment link"
                  : option.checkoutMode === "starting-payment"
                    ? "starter build payment"
                    : "scope first"}
              </p>
              {option.badge ? <p className="payment-badge">{option.badge}</p> : null}
              <h3>{option.title}</h3>
              <p>{option.description}</p>
              {option.handoff ? <p className="contact-note">{option.handoff}</p> : null}
              {offerSlug ? (
                <GatedStripeButton
                  offerSlug={offerSlug}
                  stripeUrl={option.href}
                  label={option.cta}
                />
              ) : (
                <a className="button primary payment-button" href={option.href}>
                  {option.cta}
                </a>
              )}
            </article>
          );
        })}
      </div>
    </PaymentTermsProvider>
  );
}