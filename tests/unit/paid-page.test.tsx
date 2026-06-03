import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("/paid page", () => {
  it("shows the confirmation message and intake CTA", async () => {
    const { default: PaidPage } = await import("@/app/paid/page");

    render(<PaidPage />);

    expect(
      screen.getByRole("heading", {
        name: "Payment received — let’s get to work.",
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
      screen.getByText(
        /Have extra context\? Send links, screenshots, or notes to Jonathan\./i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Return Home" }),
    ).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("link", { name: "Send Project Details" })
        .some((link) => link.getAttribute("href") === "/#start"),
    ).toBe(true);
  });
});
