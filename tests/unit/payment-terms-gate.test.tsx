import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  GatedStripeButton,
  PaymentTermsCheckbox,
  PaymentTermsProvider,
} from "@/components/payment-terms-gate";

describe("PaymentTermsGate", () => {
  it("requires the terms checkbox before enabling checkout", async () => {
    const user = userEvent.setup();
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ id: "test-id" }), { status: 200 }),
    );

    render(
      <PaymentTermsProvider>
        <PaymentTermsCheckbox />
        <GatedStripeButton
          offerSlug="first-fix"
          stripeUrl="https://buy.stripe.com/test"
          label="Get a First Fix — $75"
        />
      </PaymentTermsProvider>,
    );

    const button = screen.getByRole("button", { name: "Get a First Fix — $75" });
    expect(button).toBeDisabled();

    await user.click(
      screen.getByRole("checkbox", {
        name: /I have read and agree to the Terms of Service and Refund Policy/i,
      }),
    );

    expect(button).toBeEnabled();

    await user.click(button);

    expect(fetchSpy).toHaveBeenCalledWith(
      "/api/payment-acceptance",
      expect.objectContaining({ method: "POST" }),
    );
    expect(openSpy).toHaveBeenCalledWith(
      "https://buy.stripe.com/test",
      "_blank",
      "noopener,noreferrer",
    );

    expect(screen.getByRole("link", { name: "Terms of Service" })).toHaveAttribute("href", "/terms");
    expect(screen.getByRole("link", { name: "Refund Policy" })).toHaveAttribute("href", "/refund");

    openSpy.mockRestore();
    fetchSpy.mockRestore();
  });
});