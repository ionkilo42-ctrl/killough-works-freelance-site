import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

describe("Home page", () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_BOOKING_URL;
  });

  it("keeps the booking CTA quiet and hidden when no booking url exists", async () => {
    delete process.env.NEXT_PUBLIC_BOOKING_URL;
    const { default: Home } = await import("@/app/page");

    render(<Home />);

    expect(screen.getByText("Small coded tools for messy business moments.")).toBeInTheDocument();
    expect(screen.getByText("Starter fixes from $10-$35")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "See what I build" })).toHaveAttribute("href", "#categories");
    expect(screen.getByRole("link", { name: "Browse all field notes" })).toHaveAttribute(
      "href",
      "/field-notes",
    );
    expect(screen.getByRole("link", { name: "Pay / Start" })).toHaveAttribute("href", "/pay");
    expect(screen.queryByRole("link", { name: "Book a quick call" })).not.toBeInTheDocument();
  });
});
