"use client";

import {
  GatedStripeButton,
  PaymentTermsCheckbox,
  PaymentTermsProvider,
} from "@/components/payment-terms-gate";

type FrictionCheckCheckoutButtonProps = {
  stripeUrl: string;
  label: string;
};

export function FrictionCheckCheckoutButton({
  stripeUrl,
  label,
}: FrictionCheckCheckoutButtonProps) {
  return (
    <PaymentTermsProvider>
      <div className="hero-checkout-gate">
        <PaymentTermsCheckbox />
        <GatedStripeButton
          offerSlug="friction-check"
          stripeUrl={stripeUrl}
          label={label}
          className="button primary"
        />
      </div>
    </PaymentTermsProvider>
  );
}