import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LeadForm } from "@/components/lead-form";

describe("LeadForm", () => {
  it("shows hiring-first conversation intake fields", () => {
    const { container } = render(<LeadForm />);

    expect(screen.getByLabelText("Company or project (optional)")).toBeInTheDocument();
    expect(screen.getByLabelText(/^Website or social link/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^What should I know\?/)).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Portfolio / hiring review" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Collaboration or prototype" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Scoped client project" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Ministry / education tool" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "General inquiry" })).toBeInTheDocument();
    expect(screen.getByText(/Hiring managers and collaborators/i)).toBeInTheDocument();
    expect(screen.getByText(/By submitting this form, you agree to the/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
      "href",
      "/privacy",
    );
    expect(screen.getByRole("button", { name: "Send message" })).toBeInTheDocument();
    expect(screen.getByText("Direct contact: jonathan@killough.works")).toBeInTheDocument();
    expect(container.querySelector(".console-form-submit")).not.toBeNull();
  });
});