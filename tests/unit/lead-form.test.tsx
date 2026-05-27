import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LeadForm } from "@/components/lead-form";

describe("LeadForm", () => {
  it("shows the intake-first starter-build fields", () => {
    render(<LeadForm />);

    expect(screen.getByLabelText("Business / idea")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Link, screenshot, Instagram, Facebook, or website"),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("What do you want fixed or built?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send it to Jonathan" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "$10-$25" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Not sure yet" })).toBeInTheDocument();
  });
});
