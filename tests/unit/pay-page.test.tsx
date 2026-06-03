import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("/pay page", () => {
  it("shows starter payment options and alternative payment methods", async () => {
    const { default: PayPage } = await import("@/app/pay/page");

    render(<PayPage />);

    expect(screen.getByRole("heading", { name: "One clear step. Then the next." })).toBeInTheDocument();
    expect(screen.getByText("$35 — Friction Check")).toBeInTheDocument();
    expect(screen.getByText("$75 — First Fix")).toBeInTheDocument();
    expect(screen.getByText("$150+ — Mini Build")).toBeInTheDocument();
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
      screen.getByText(/The \$35 friction check is the best default/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Complete secure checkout, then use the handoff page to send links, screenshots, or notes\./i),
    ).toBeInTheDocument();
    expect(screen.getByText(/If you are unsure, contact me first/i)).toBeInTheDocument();
    expect(screen.getByText(/After checkout, use the confirmation page to send the links, screenshots, or notes that let me start cleanly\./i)).toBeInTheDocument();
    expect(
      screen.getByText(
        "I look at the messy spot and tell you what is actually broken, what matters, and what the first useful fix should be.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "I make one small practical improvement: form cleanup, intake flow, payment link, copy rewrite, button fix, customer message, or simple page section.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "For multi-step flows, dashboards, branded pages, automation, lead capture, or anything that needs more structure.",
      ),
    ).toBeInTheDocument();
  });
});
