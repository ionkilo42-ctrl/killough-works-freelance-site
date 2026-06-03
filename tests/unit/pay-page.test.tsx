import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("/pay page", () => {
  it("shows only the current offer ladder with clear starter guidance", async () => {
    const { default: PayPage } = await import("@/app/pay/page");

    render(<PayPage />);

    expect(screen.getByRole("heading", { name: "Pick the closest starting point." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Current offers" })).toBeInTheDocument();
    expect(screen.getByText("$35 — Friction Check")).toBeInTheDocument();
    expect(screen.getByText("$75 — First Fix")).toBeInTheDocument();
    expect(screen.getByText("$150+ — Mini Build")).toBeInTheDocument();
    expect(screen.getByText("Best place to start")).toBeInTheDocument();
    expect(screen.getByText("One useful improvement")).toBeInTheDocument();
    expect(
      screen.getByText(
        "A focused review of your page, post, link, offer, or lead flow. I’ll identify what is confusing, missing, or costing you responses and give you the clearest first fix.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "One practical improvement completed for you, such as offer cleanup, a DM pitch, landing page section, intake form, payment/start link, CTA rewrite, or small lead-flow improvement.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "A small custom build around your actual business, such as a quote flow, booking page, QR hub, intake system, simple dashboard, partner page, landing page, or lightweight automation.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Start with Friction Check — $35" })).toHaveAttribute(
      "href",
      "https://buy.stripe.com/28E4gz2DDf66bXA0m41ZS04",
    );
    expect(screen.getByRole("link", { name: "Get a First Fix — $75" })).toHaveAttribute(
      "href",
      "https://buy.stripe.com/5kQbJ11zzaPQ9Ps7Ow1ZS05",
    );
    expect(screen.getByRole("link", { name: "Request a Mini Build — $150+" })).toHaveAttribute(
      "href",
      "https://buy.stripe.com/aFa4gz6TTaPQ4v81q81ZS03",
    );
    expect(
      screen.getAllByText(/After payment, send the page, post, screenshot, or idea you want fixed\./i)
        .length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByText(/If the job needs more than the selected tier, I’ll say so before doing extra work\./i),
    ).toBeInTheDocument();
    expect(screen.getByText("Direct contact:")).toBeInTheDocument();
    expect(screen.getByText("jonathan@killough.works")).toBeInTheDocument();
    expect(screen.getAllByAltText(/Killough Works .* offer graphic/i).length).toBeGreaterThanOrEqual(3);
    expect(screen.queryByText("Venmo")).not.toBeInTheDocument();
    expect(screen.queryByText("Cash App")).not.toBeInTheDocument();
    expect(screen.queryByText("PayPal")).not.toBeInTheDocument();
  });
});
