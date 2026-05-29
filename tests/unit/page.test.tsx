import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

describe("Home page", () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_BOOKING_URL;
  });

  it("keeps the booking CTA quiet and hidden when no booking url exists", async () => {
    delete process.env.NEXT_PUBLIC_BOOKING_URL;
    const { default: Home } = await import("@/app/page");

    render(<Home />);

    expect(screen.getByText("Small coded tools for messy business moments.")).toBeInTheDocument();
    expect(screen.getByText(/Starter fixes from \$10-\$35/)).toBeInTheDocument();
    expect(
      screen.getAllByText(/Submit first\.\s*I['’]ll review it and send the smallest useful next step\./)
        .length,
    ).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "Start small" })).toHaveAttribute("href", "#how-it-starts");
    expect(screen.getByRole("link", { name: "Browse all field notes" })).toHaveAttribute(
      "href",
      "/field-notes",
    );
    expect(screen.getByRole("link", { name: "Start Here" })).toHaveAttribute("href", "/pay");
    expect(screen.queryByRole("link", { name: "Book a quick call" })).not.toBeInTheDocument();
  });

  it("puts practical service sections first and removes abstract homepage copy", async () => {
    delete process.env.NEXT_PUBLIC_BOOKING_URL;
    const { default: Home } = await import("@/app/page");

    render(<Home />);

    const heroHeading = screen.getAllByRole("heading", { level: 1, name: "Small coded tools for messy business moments." })[0];
    const whatIFixHeading = screen.getAllByRole("heading", { level: 2, name: "What I fix first" })[0];
    const howItStartsHeading = screen.getAllByRole("heading", { level: 2, name: "How it starts" })[0];
    const starterFixesHeading = screen.getAllByRole("heading", { level: 2, name: "Raw field notes: common starter fixes" })[0];
    const contactHeading = screen.getAllByRole("heading", { level: 2, name: "Messy is okay. Send the thing." })[0];

    expect(heroHeading.compareDocumentPosition(whatIFixHeading)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(whatIFixHeading.compareDocumentPosition(howItStartsHeading)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(howItStartsHeading.compareDocumentPosition(starterFixesHeading)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(starterFixesHeading.compareDocumentPosition(contactHeading)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);

    expect(screen.queryByText("Featured visuals")).not.toBeInTheDocument();
    expect(screen.queryByText("A visual system for practical clarity.")).not.toBeInTheDocument();
    expect(screen.queryByText("Follow the signal, not the noise.")).not.toBeInTheDocument();
    expect(
      screen.queryByText("A clear frame can make the next useful move easier to see."),
    ).not.toBeInTheDocument();
  });

  it("shows compact before-and-after starter-fix examples", async () => {
    delete process.env.NEXT_PUBLIC_BOOKING_URL;
    const { default: Home } = await import("@/app/page");

    render(<Home />);

    expect(screen.getAllByText("Common starter fix").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("heading", { level: 3, name: "Quote request cleanup" }).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText((_, element) => element?.textContent === "Before: DM me for a quote.").length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(
        (_, element) =>
          element?.textContent ===
          "After: A short intake path that collects service type, location, photos/link, and urgency.",
      ).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByRole("heading", { level: 3, name: "Offer page cleanup" }).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText((_, element) => element?.textContent === "Before: A good idea buried in a social post.").length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(
        (_, element) =>
          element?.textContent ===
          "After: A simple page with the offer, price range, next step, and payment/contact link.",
      ).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("heading", { level: 3, name: "Lead flow repair" }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText((_, element) => element?.textContent === "Before: Back-and-forth messages with missing details.").length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText((_, element) => element?.textContent === "After: A cleaner form that asks the right questions once.").length,
    ).toBeGreaterThan(0);
  });

  it("shows compact trust guardrails around timing, fit, and scope", async () => {
    delete process.env.NEXT_PUBLIC_BOOKING_URL;
    const { default: Home } = await import("@/app/page");

    render(<Home />);

    expect(
      screen.getAllByText(
        /I usually send a first read within 24 hours\. Small starter fixes often ship in 1-2 business days once the path is clear\./,
      ).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(
        /Best fit: custom HTML\/CSS\/JS, React\/Tailwind pages, simple forms, embedded tools, Webflow-style page tweaks, Zapier-style handoffs, and lightweight website cleanup\./,
      ).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText("Good fit:").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Not a starter fix:").length).toBeGreaterThan(0);
    expect(screen.getAllByText("one confusing offer").length).toBeGreaterThan(0);
    expect(screen.getAllByText("full SaaS app").length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(
        /If it needs a bigger rebuild instead of a starter fix, I'll tell you straight up before anything gets overbuilt\./,
      ).length,
    ).toBeGreaterThan(0);
  });

  it("treats the contact section like a contained repair desk", async () => {
    delete process.env.NEXT_PUBLIC_BOOKING_URL;
    const { default: Home } = await import("@/app/page");

    const { container } = render(<Home />);

    expect(container.querySelector(".contact-console")).not.toBeNull();
    expect(container.querySelector(".lead-form.console-form")).not.toBeNull();
    expect(container.querySelector(".contact-copy.console-sidebar")).not.toBeNull();
  });

  it("adds a compact human trust anchor near the form", async () => {
    delete process.env.NEXT_PUBLIC_BOOKING_URL;
    const { default: Home } = await import("@/app/page");

    const { container } = render(<Home />);

    const anchor = container.querySelector(".human-anchor");

    expect(anchor).not.toBeNull();
    expect(anchor?.textContent).toContain(
      "Jonathan Killough builds small practical web fixes, intake flows, and lightweight tools for people who have a messy business problem but not a polished project brief.",
    );
    expect(anchor?.textContent).toContain(
      "You do not need to know the technical name for the problem. Send what you have and I'll help name the bottleneck.",
    );
  });
});
