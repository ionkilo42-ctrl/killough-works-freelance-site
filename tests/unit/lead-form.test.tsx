import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LeadForm } from "@/components/lead-form";

describe("LeadForm", () => {
  it("shows the lower-pressure local-business intake fields", () => {
    const { container } = render(<LeadForm />);

    expect(screen.getByLabelText("Business name")).toBeInTheDocument();
    expect(screen.getByLabelText(/^Website or social link/)).toBeInTheDocument();
    expect(
      screen.getByText(
        "Messy is okay. A website, Facebook page, Instagram profile, or rough page link is enough to start.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/^What feels broken, confusing, or annoying\?/)).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "$35 — Friction Check" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "$75 — First Fix" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "$150+ — Mini Build" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Not sure yet" })).toBeInTheDocument();
    expect(
      screen.getByText("Pick the closest fit. If you are not sure yet, I can tell you the best place to start."),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("You do not need a full project brief. Short and messy is fine."),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(
        "You do not need a full project brief. Short and messy is fine. After payment, this is where you send the context that helps me review the right thing.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send project details" })).toBeInTheDocument();
    expect(screen.getByText("Direct contact: jonathan@killough.works")).toBeInTheDocument();
    expect(container.querySelector(".console-form-submit")).not.toBeNull();
  });
});
