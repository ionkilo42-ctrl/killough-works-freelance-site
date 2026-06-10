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

type HomepagePricingClientProps = {
  tiers: PricingTier[];
};

export function HomepagePricingClient({ tiers }: HomepagePricingClientProps) {
  return (
    <PaymentTermsProvider>
      <PaymentTermsCheckbox />
      <div className="payment-grid homepage-pricing-grid">
        {tiers.map((tier) => {
          const offerSlug = tier.name ? offerSlugByName[tier.name] : undefined;

          return (
            <article
              className={`pricing-card payment-card${tier.featured ? " payment-card-featured" : ""}`}
              key={tier.title}
            >
              <div className="payment-card-image-wrap">
                <Image
                  src={tier.imageSrc}
                  alt={tier.imageAlt}
                  width={1254}
                  height={1254}
                  className="payment-card-image"
                  sizes="(max-width: 760px) 100vw, (max-width: 1080px) 50vw, 320px"
                />
              </div>
              <p className="pricing-note">
                {tier.checkoutMode === "live"
                  ? "Start here"
                  : tier.checkoutMode === "starting-payment"
                    ? "starter build payment"
                    : "scope first"}
              </p>
              {tier.badge ? <p className="payment-badge">{tier.badge}</p> : null}
              <h3>{tier.title}</h3>
              <p>
                <strong>Best for:</strong> {tier.bestFor}
              </p>
              <p>{tier.description}</p>
              {tier.deliverable ? (
                <p>
                  <strong>Deliverable:</strong> {tier.deliverable}
                </p>
              ) : null}
              {tier.handoff ? (
                <p className="contact-note">
                  <strong>How it starts:</strong> {tier.handoff}
                </p>
              ) : null}
              <div className="pricing-includes">
                <p className="panel-label">Includes</p>
                <ul className="messy-list">
                  {tier.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              {tier.timeline ? (
                <p className="contact-note">
                  <strong>Timeline:</strong> {tier.timeline}
                </p>
              ) : null}
              {offerSlug ? (
                <GatedStripeButton
                  offerSlug={offerSlug}
                  stripeUrl={tier.href}
                  label={tier.cta}
                />
              ) : (
                <a className="button primary payment-button" href={tier.href}>
                  {tier.cta}
                </a>
              )}
            </article>
          );
        })}
      </div>
    </PaymentTermsProvider>
  );
}