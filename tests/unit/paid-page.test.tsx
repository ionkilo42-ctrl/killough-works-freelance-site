import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("/paid page", () => {
  it("shows the confirmation message and intake CTA", async () => {
    const { default: PaidPage } = await import("@/app/paid/page");

    render(<PaidPage />);

    expect(screen.getByRole("heading", { name: "Payment received. Next step is simple." })).toBeInTheDocument();
    expect(screen.getByText("Business name.")).toBeInTheDocument();
    expect(screen.getByText("Website, booking link, or social page.")).toBeInTheDocument();
    expect(screen.getByText("What you want help with right now.")).toBeInTheDocument();
    expect(screen.getByText("Any screenshots, photos, files, or references.")).toBeInTheDocument();
    expect(screen.getByText("Best contact method for the follow-up.")).toBeInTheDocument();
    expect(screen.getByText(/You are not stuck guessing what happens next/i)).toBeInTheDocument();
    expect(screen.getByText(/Send the intake details and I will review what you sent/i)).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("link", { name: "Send intake details" })
        .some((link) => link.getAttribute("href") === "#"),
    ).toBe(true);
  });
});
