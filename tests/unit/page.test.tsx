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

    expect(screen.getByText("Small useful builds for messy business problems.")).toBeInTheDocument();
    expect(screen.getByText("Field notes")).toBeInTheDocument();
    expect(screen.getByText("First build menu")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Book a quick call" })).not.toBeInTheDocument();
  });
});
