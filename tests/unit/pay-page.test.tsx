import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("/pay page", () => {
  it("shows starter payment options and alternative payment methods", async () => {
    const { default: PayPage } = await import("@/app/pay/page");

    render(<PayPage />);

    expect(screen.getByRole("heading", { name: "Start Small. Build Something Useful." })).toBeInTheDocument();
    expect(screen.getByText("$10 Quick Lead / Offer Audit")).toBeInTheDocument();
    expect(screen.getByText("$25 Pitch Image / Social Graphic")).toBeInTheDocument();
    expect(screen.getByText("$35 Starter Build Deposit")).toBeInTheDocument();
    expect(screen.getByText("Custom Project Deposit")).toBeInTheDocument();
    expect(screen.getByText("Best place to start")).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("link", { name: "Other ways to pay" })
        .some((link) => link.getAttribute("href") === "#other-ways-to-pay"),
    ).toBe(true);
    expect(screen.getByText("Venmo")).toBeInTheDocument();
    expect(screen.getByText("Cash App")).toBeInTheDocument();
    expect(screen.getByText("PayPal")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Other ways to pay" })).toBeInTheDocument();
    expect(
      screen.getByText(
        "Stripe is the main checkout option, but you can also use Venmo, Cash App, or PayPal if that is easier.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("@ionkilo42")).toBeInTheDocument();
    expect(screen.getByText("$ionkilo42")).toBeInTheDocument();
    expect(screen.getByText("paypal.me/ionkilo42")).toBeInTheDocument();
    expect(
      screen.getByText("Send payment through Venmo using @ionkilo42."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Send payment through Cash App using $ionkilo42."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Send payment through PayPal using paypal.me/ionkilo42."),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "After using Venmo, Cash App, or PayPal, please message me with what you paid for and the details for the project so I can match the payment to your request.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Open Venmo" })).toHaveAttribute(
      "href",
      "https://venmo.com/u/ionkilo42",
    );
    expect(screen.getByRole("link", { name: "Open Cash App" })).toHaveAttribute(
      "href",
      "https://cash.app/$ionkilo42",
    );
    expect(screen.getByRole("link", { name: "Open PayPal" })).toHaveAttribute(
      "href",
      "https://paypal.me/ionkilo42",
    );
    expect(
      screen.getByText("Larger work is scoped separately before any additional charges are sent."),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/The \$35 starter deposit is the best default/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/After payment, use the confirmation page to send the details/i)).toBeInTheDocument();
    expect(screen.getByText(/If you are unsure, contact me first/i)).toBeInTheDocument();
  });
});
