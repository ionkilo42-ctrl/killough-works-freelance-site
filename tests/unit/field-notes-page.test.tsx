import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Field Notes page", () => {
  it("renders public build notes as a secondary archive", async () => {
    const { default: FieldNotesPage } = await import("@/app/field-notes/page");

    const { container } = render(<FieldNotesPage />);

    expect(
      screen.getByRole("heading", { name: "How I think about product problems" }),
    ).toBeInTheDocument();
    expect(container.querySelectorAll(".note-entry").length).toBe(5);
    expect(screen.getByText("Quote request cleanup")).toBeInTheDocument();
    expect(screen.queryByText("Lead flow repair")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact →" })).toHaveAttribute("href", "/#contact");
    expect(screen.getByRole("link", { name: "Back to homepage" })).toHaveAttribute("href", "/");
  });
});