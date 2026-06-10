import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("/paid page", () => {
  it("shows the confirmation message and intake CTA", async () => {
    const { default: PaidPage } = await import("@/app/paid/page");

    render(<PaidPage />);

    expect(
      screen.getByRole("heading", {
        name: "Thank you — your payment is received.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Your Killough Works request is in\. The next step is to send the links, screenshots, or notes I need to review the right thing\./i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Your payment was received. I'll review your request and use the details you send next to figure out the clearest first fix.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("I review your payment and request."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("I look at the website, page, form, or profile you send."),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "I send back the first practical fix, teardown, draft, or recommendation based on the option you selected.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Send me one of the following so I can start with the right practical first step\./i),
    ).toBeInTheDocument();
    expect(screen.getByText("your website")).toBeInTheDocument();
    expect(screen.getByText("Facebook or Instagram page")).toBeInTheDocument();
    expect(screen.getByText("screenshot")).toBeInTheDocument();
    expect(screen.getByText("offer idea")).toBeInTheDocument();
    expect(screen.getByText("broken form or lead flow")).toBeInTheDocument();
    expect(screen.getByText("what you want customers to do")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Optional: add a short note explaining what you paid for and what you want fixed first\./i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Payment follow-up:")).toBeInTheDocument();
    expect(screen.getAllByText("jonathan@killough.works").length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "Terms" })).toHaveAttribute("href", "/terms");
    expect(
      screen.getByRole("link", { name: "Return Home" }),
    ).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("link", { name: "Send Project Details" })
        .some((link) => link.getAttribute("href") === "/#contact"),
    ).toBe(true);
  });
});
