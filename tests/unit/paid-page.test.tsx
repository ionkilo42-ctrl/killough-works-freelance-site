import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("/paid page", () => {
  it("shows the confirmation message and intake CTA", async () => {
    const { default: PaidPage } = await import("@/app/paid/page");

    render(<PaidPage />);

    expect(
      screen.getByRole("heading", {
        name: "Payment received. Next, answer 2 quick questions so I can review the first useful move.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /For a \$35 Friction Check, the next move is simple\. Send your page link and the #1 thing that feels broken, confusing, or annoying right now\./i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("What is your website, Facebook, Instagram, or page link?")).toBeInTheDocument();
    expect(
      screen.getByText("What is the #1 thing that feels broken, confusing, or annoying right now?"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Messy is okay\. A website, Facebook page, Instagram profile, or rough page link is enough to start\./i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Send those 2 answers and I.ll review the Friction Check cleanly, identify what is actually broken, and reply with the first useful move\./i,
      ),
    ).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("link", { name: "Send intake details" })
        .some((link) => link.getAttribute("href") === "/#start"),
    ).toBe(true);
  });
});
