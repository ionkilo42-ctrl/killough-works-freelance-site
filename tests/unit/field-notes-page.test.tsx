import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Field Notes page", () => {
  it("renders the field-notes archive as concrete repair examples with a return CTA", async () => {
    const { default: FieldNotesPage } = await import("@/app/field-notes/page");

    render(<FieldNotesPage />);

    expect(screen.getByRole("heading", { name: "Field Notes" })).toBeInTheDocument();
    expect(
      screen.getByText(
        /A practical archive of common starter fixes: intake cleanup, offer pages, quote-flow repairs, and small web tools that turn messy business moments into a clearer next step\./,
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Quote request cleanup" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Offer page cleanup" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Payment/contact path cleanup" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Common starter fix").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Example repair").length).toBeGreaterThan(0);
    expect(
      screen.getAllByText((_, element) => element?.textContent === "Before: DM me for a quote.").length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(
        (_, element) =>
          element?.textContent === "Why it matters: Less back-and-forth before the first reply.",
      ).length,
    ).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "Submit a fix" })).toHaveAttribute("href", "/#contact");
    expect(screen.getByRole("link", { name: "Back to homepage" })).toHaveAttribute("href", "/");
  });
});
