import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { employmentSignal } from "@/data/site";

describe("Home page", () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_BOOKING_URL;
  });

  it("presents portfolio positioning with employment signal and no public checkout", async () => {
    delete process.env.NEXT_PUBLIC_BOOKING_URL;
    const { default: Home } = await import("@/app/page");

    render(<Home />);

    expect(screen.getByText(employmentSignal)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /I build workflows, interfaces, and small systems/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Feltabout" })).toBeInTheDocument();
    expect(screen.getByText(/building with his father/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View Feltabout on GitHub/i })).toHaveAttribute(
      "href",
      "https://github.com/ionkilo42-ctrl/feltabout",
    );

    const sectionNav = screen.getByRole("navigation", { name: "Section links" });
    expect(sectionNav.querySelector('a[href="#now-building"]')).not.toBeNull();
    expect(sectionNav.querySelector('a[href="#prototypes"]')).not.toBeNull();

    expect(screen.getByRole("link", { name: /Open prototype: Live Bible Companion/i })).toHaveAttribute(
      "href",
      "/demos/live-bible-companion",
    );
    expect(screen.queryByRole("link", { name: "Pricing" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Friction Check/i })).not.toBeInTheDocument();
    expect(screen.queryByText("What is Killough Works right now?")).not.toBeInTheDocument();
  });

  it("orders proof sections before contact with prototypes before work samples", async () => {
    delete process.env.NEXT_PUBLIC_BOOKING_URL;
    const { default: Home } = await import("@/app/page");

    const { container } = render(<Home />);
    const main = container.querySelector("main");
    expect(main).not.toBeNull();

    const feltabout = main!.querySelector("#now-building");
    const prototypes = main!.querySelector("#prototypes");
    const workSamples = main!.querySelector("#work-samples");
    const contact = main!.querySelector("#contact");

    expect(feltabout).not.toBeNull();
    expect(prototypes).not.toBeNull();
    expect(workSamples).not.toBeNull();
    expect(contact).not.toBeNull();
    expect(feltabout!.compareDocumentPosition(prototypes!)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(prototypes!.compareDocumentPosition(workSamples!)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(workSamples!.compareDocumentPosition(contact!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it("shows landscape study previews with scannable copy", async () => {
    delete process.env.NEXT_PUBLIC_BOOKING_URL;
    const { default: Home } = await import("@/app/page");

    const { container } = render(<Home />);

    expect(container.querySelector(".study-preview-list")).not.toBeNull();
    expect(container.querySelectorAll(".study-preview-card").length).toBe(4);
    expect(screen.getByText("Missing quote button")).toBeInTheDocument();
    expect(screen.getByText(/Interface exercises showing conversion paths/i)).toBeInTheDocument();
  });

  it("opens and closes a work sample lightbox", async () => {
    delete process.env.NEXT_PUBLIC_BOOKING_URL;
    const { default: Home } = await import("@/app/page");
    const user = userEvent.setup();

    render(<Home />);

    await user.click(
      screen.getByRole("button", { name: "View design study for Scattered Facebook info" }),
    );

    expect(
      screen.getByRole("dialog", { name: "Expanded image for Scattered Facebook info" }),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(
      screen.queryByRole("dialog", { name: "Expanded image for Scattered Facebook info" }),
    ).not.toBeInTheDocument();
  });

  it("does not surface field notes, focus areas, or faq on the homepage", async () => {
    delete process.env.NEXT_PUBLIC_BOOKING_URL;
    const { default: Home } = await import("@/app/page");

    const { container } = render(<Home />);

    expect(container.querySelector("#field-notes")).toBeNull();
    expect(container.querySelector(".note-entry")).toBeNull();
    expect(container.querySelector(".focus-list")).toBeNull();
    expect(container.querySelector(".faq-list")).toBeNull();
  });

  it("treats the contact section as a flat editorial block", async () => {
    delete process.env.NEXT_PUBLIC_BOOKING_URL;
    const { default: Home } = await import("@/app/page");

    const { container } = render(<Home />);

    expect(container.querySelector(".contact-block")).not.toBeNull();
    expect(container.querySelector(".lead-form-flat")).not.toBeNull();
    expect(container.querySelector(".contact-console")).toBeNull();
    expect(container.querySelector(".section-tray")).toBeNull();
  });
});