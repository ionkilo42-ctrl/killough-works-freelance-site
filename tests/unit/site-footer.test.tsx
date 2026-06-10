import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteFooter } from "@/components/site-footer";

describe("SiteFooter", () => {
  it("renders legal links and contact details", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("link", { name: "Terms" })).toHaveAttribute("href", "/terms");
    expect(screen.getByRole("link", { name: "Privacy" })).toHaveAttribute("href", "/privacy");
    expect(screen.getByRole("link", { name: "Refund" })).toHaveAttribute("href", "/refund");
    expect(screen.getByText("jonathan@killough.works")).toBeInTheDocument();
  });
});