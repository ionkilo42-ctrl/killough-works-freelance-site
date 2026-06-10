import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LegalPage } from "@/components/legal-page";

describe("legal pages", () => {
  it("renders policy content with package version", () => {
    render(
      <LegalPage
        slug="terms"
        version="1.1"
        content={
          "# Terms of Service\n\n## 1. Agreement\n\nThese Terms govern Killough Works.\n\n[Privacy Policy](/privacy)"
        }
      />,
    );

    expect(screen.getAllByRole("heading", { name: "Terms of Service" }).length).toBeGreaterThan(0);
    expect(screen.getByText("Killough Works legal package v1.1.")).toBeInTheDocument();
    expect(screen.getByText(/These Terms govern Killough Works/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute("href", "/privacy");
  });
});