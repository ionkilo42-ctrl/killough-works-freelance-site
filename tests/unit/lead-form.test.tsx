import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LeadForm } from "@/components/lead-form";

describe("LeadForm", () => {
  it("shows the intake-first starter-build fields", () => {
    const { container } = render(<LeadForm />);

    expect(screen.getByLabelText("Business / idea")).toBeInTheDocument();
    expect(screen.getByLabelText(/Where is the problem\?/)).toBeInTheDocument();
    expect(
      screen.getByText(
        "Paste a website link, social page, shared screenshot link, or describe what you have. Have screenshots? Mention them here or paste a shared link for now.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("What do you want fixed or built?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send it to Jonathan" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "$10-$35 — Starter fix" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "$35-$100 — Larger fix" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "$150+ — Multi-step build" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Not sure yet" })).toBeInTheDocument();
    expect(
      screen.getByText("Starter fixes are for one clear friction point, not an entire business rebuild."),
    ).toBeInTheDocument();
    expect(container.querySelector(".console-form-submit")).not.toBeNull();
  });
});
