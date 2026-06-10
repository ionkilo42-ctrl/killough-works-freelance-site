"use client";

import Link from "next/link";
import { createContext, useContext, useState, type ReactNode } from "react";

import { legalRoutes } from "@/data/legal";
import type { PaymentOfferSlug } from "@/data/legal";

type PaymentTermsContextValue = {
  agreed: boolean;
  setAgreed: (value: boolean) => void;
};

const PaymentTermsContext = createContext<PaymentTermsContextValue | null>(null);

function usePaymentTermsContext() {
  const context = useContext(PaymentTermsContext);
  if (!context) {
    throw new Error("Payment terms components must be used within PaymentTermsProvider.");
  }
  return context;
}

export function PaymentTermsProvider({ children }: { children: ReactNode }) {
  const [agreed, setAgreed] = useState(false);

  return (
    <PaymentTermsContext.Provider value={{ agreed, setAgreed }}>
      {children}
    </PaymentTermsContext.Provider>
  );
}

export function PaymentTermsCheckbox() {
  const { agreed, setAgreed } = usePaymentTermsContext();

  return (
    <div className="payment-terms-gate">
      <label className="payment-terms-checkbox">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(event) => setAgreed(event.target.checked)}
        />
        <span>
          I have read and agree to the{" "}
          <Link href={legalRoutes.terms} className="text-link">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href={legalRoutes.refund} className="text-link">
            Refund Policy
          </Link>
          .
        </span>
      </label>
      <p className="payment-terms-note">
        By completing payment, you agree to the Terms of Service and Refund Policy. Payment is
        blocked until you check the box above.
      </p>
    </div>
  );
}

type GatedStripeButtonProps = {
  offerSlug: PaymentOfferSlug;
  stripeUrl: string;
  label: string;
  className?: string;
};

export function GatedStripeButton({
  offerSlug,
  stripeUrl,
  label,
  className = "button primary payment-button",
}: GatedStripeButtonProps) {
  const { agreed } = usePaymentTermsContext();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleClick() {
    if (!agreed || status === "loading") {
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/payment-acceptance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          offerSlug,
          stripeUrl,
        }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(payload.message ?? "Could not record acceptance. Please try again.");
        return;
      }

      window.open(stripeUrl, "_blank", "noopener,noreferrer");
      setStatus("idle");
    } catch {
      setStatus("error");
      setMessage("Could not record acceptance. Please try again.");
    }
  }

  return (
    <div className="payment-gate-button-wrap">
      <button
        type="button"
        className={className}
        disabled={!agreed || status === "loading"}
        onClick={handleClick}
        aria-disabled={!agreed || status === "loading"}
      >
        {status === "loading" ? "Recording acceptance..." : label}
      </button>
      {!agreed ? (
        <p className="payment-gate-hint">Check the terms box above to enable secure checkout.</p>
      ) : null}
      {message ? <p className="form-message error">{message}</p> : null}
    </div>
  );
}