import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BrandLockup } from "@/components/brand-lockup";

describe("BrandLockup", () => {
  it("renders the Killough Works logo assets and note", () => {
    render(<BrandLockup note="Practical workshop notes." />);

    expect(screen.getByLabelText("Killough Works brand")).toBeInTheDocument();
    expect(screen.getByAltText("Killough Works logo")).toBeInTheDocument();
    expect(screen.getByText("Practical workshop notes.")).toBeInTheDocument();
    expect(screen.queryByText("JW")).not.toBeInTheDocument();
  });
});
