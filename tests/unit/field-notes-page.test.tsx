import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Field Notes page", () => {
  it("renders the note grid from shared placeholder data", async () => {
    const { default: FieldNotesPage } = await import("@/app/field-notes/page");

    render(<FieldNotesPage />);

    expect(screen.getByRole("heading", { name: "Field Notes" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Clarity is a service." })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "A small tool that saves a back-and-forth." }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Follow the signal, not the noise." }),
    ).toBeInTheDocument();
  });
});
