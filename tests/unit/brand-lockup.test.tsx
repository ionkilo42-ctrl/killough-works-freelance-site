import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BrandLockup } from "@/components/brand-lockup";

describe("BrandLockup", () => {
  it("renders the Killough Works seal and wordmark note", () => {
    render(<BrandLockup note="Practical workshop notes." />);

    expect(screen.getByLabelText("Killough Works brand")).toBeInTheDocument();
    expect(screen.getByText("Killough Works")).toBeInTheDocument();
    expect(screen.getByText("Practical workshop notes.")).toBeInTheDocument();
    expect(screen.getByText("K")).toBeInTheDocument();
    expect(screen.getByText("W")).toBeInTheDocument();
  });
});
