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

    expect(
      screen.getByText("Small, fast web fixes for local businesses tired of losing leads."),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Based in South Jersey. Fixing websites nationwide.").length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/Hi, I['’]m Jonathan/i).length,
    ).toBeGreaterThan(0);
    expect(screen.getByText(/I fix the annoying website problems big agencies overcharge for/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Starts at \$35\. Secure a Friction Check, then use the handoff page to send the links, screenshots, or notes I need to review the right thing\./i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Secure checkout first\. Then send your website URL, screenshots, and the issue you want reviewed\./i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Messy is okay\. Send the site, page, or social profile\./i),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Get a $35 Friction Check" })[0]).toHaveAttribute(
      "href",
      "https://buy.stripe.com/7sY7sLba91fgaTwb0I1ZS02",
    );
    expect(screen.getByRole("link", { name: "See sample fixes" })).toHaveAttribute(
      "href",
      "#sample-fixes",
    );
    expect(
      screen.getByRole("link", { name: "Plan a mini build" }),
    ).toHaveAttribute("href", "#start");
    expect(
      screen.getAllByText(/If the slots are full, I['’]ll tell you before you pay for anything larger than a Friction Check\./i)
        .length,
    ).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "What I Fix" })).toHaveAttribute("href", "#what-i-fix");
    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute("href", "#pricing");
    expect(screen.getByRole("link", { name: "Sample Fixes" })).toHaveAttribute("href", "#sample-fixes");
    expect(screen.getByRole("link", { name: "FAQ" })).toHaveAttribute("href", "#faq");
    expect(screen.getByRole("link", { name: "Start" })).toHaveAttribute("href", "#start");
    expect(screen.queryByRole("link", { name: "Book a quick call" })).not.toBeInTheDocument();
  });

  it("puts the local-business offer sections in the new conversion order", async () => {
    delete process.env.NEXT_PUBLIC_BOOKING_URL;
    const { default: Home } = await import("@/app/page");

    render(<Home />);

    const heroHeading = screen.getAllByRole("heading", {
      level: 1,
      name: "Small, fast web fixes for local businesses tired of losing leads.",
    })[0];
    const whatIFixHeading = screen.getAllByRole("heading", {
      level: 2,
      name: "The small problems that quietly lose customers",
    })[0];
    const pricingHeading = screen.getAllByRole("heading", {
      level: 2,
      name: "No giant agency proposal. Pick the size of fix you need.",
    })[0];
    const sampleFixesHeading = screen.getAllByRole("heading", {
      level: 2,
      name: "Example fixes, shown as simple mockups",
    })[0];
    const faqHeading = screen.getAllByRole("heading", {
      level: 2,
      name: "Simple answers before you start",
    })[0];
    const contactHeading = screen.getAllByRole("heading", {
      level: 2,
      name: "Start with the messy version",
    })[0];

    expect(heroHeading.compareDocumentPosition(whatIFixHeading)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(whatIFixHeading.compareDocumentPosition(pricingHeading)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(pricingHeading.compareDocumentPosition(sampleFixesHeading)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(sampleFixesHeading.compareDocumentPosition(faqHeading)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(faqHeading.compareDocumentPosition(contactHeading)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);

    expect(screen.queryByText("Featured visuals")).not.toBeInTheDocument();
    expect(screen.queryByText("Small business systems, fixed one clear step at a time.")).not.toBeInTheDocument();
    expect(screen.queryByText("Messy is okay. Send the thing.")).not.toBeInTheDocument();
    expect(screen.queryByText("Send me the broken business moment.")).not.toBeInTheDocument();
  });

  it("shows image-backed example fixes for local service businesses", async () => {
    delete process.env.NEXT_PUBLIC_BOOKING_URL;
    const { default: Home } = await import("@/app/page");

    render(<Home />);

    expect(
      screen.getAllByText(
        "These examples show the kind of practical improvements Killough Works can make. They are illustrative mockups, not client case studies. Real client examples will be added as the portfolio grows.",
      ).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText("Illustrative mockup").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("heading", { level: 3, name: "Missing quote button" }).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText("Turns buried contact details into a clear quote path.").length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByAltText(/no quote button transformed into a page with a prominent request a quote path/i)
        .length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByRole("heading", { level: 3, name: "Messy intake process" }).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(
        "Turns scattered messages into one simple form with the details needed to quote faster.",
      ).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByAltText(/quote details scattered across messages replaced by a clean pressure washing quote form/i)
        .length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("heading", { level: 3, name: "Scattered Facebook info" }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText("Turns posts, captions, and comments into one organized service page.").length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("heading", { level: 3, name: "No next step after payment" }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(
        "Turns a generic success screen into a reassuring handoff page with clear next steps.",
      ).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("heading", { level: 3, name: "Missed review opportunity" }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(
        "Turns happy customers into easier review requests and stronger local proof.",
      ).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("heading", { level: 3, name: "Leads lost in Messenger" }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText("Turns buried chats into a simple lead tracker with visible follow-up.").length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("heading", { level: 3, name: "Realtor lead capture" }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(
        "Turns listing traffic into actual buyer, seller, or showing inquiries.",
      ).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("heading", { level: 3, name: "Contractor inspection request" }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(
        "Turns call-only intake into an inspection request form with photos and scheduling details.",
      ).length,
    ).toBeGreaterThan(0);
  });

  it("shows the pricing ladder, platform trust, and availability guardrails", async () => {
    delete process.env.NEXT_PUBLIC_BOOKING_URL;
    const { default: Home } = await import("@/app/page");

    render(<Home />);

    expect(screen.getAllByText("Limited weekly intake, kept intentional").length).toBeGreaterThan(0);
    expect(screen.getAllByText("3 Friction Checks").length).toBeGreaterThan(0);
    expect(screen.getAllByText("2 First Fixes").length).toBeGreaterThan(0);
    expect(screen.getAllByText("1 Mini Build").length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/If the slots are full, I['’]ll tell you before you pay for anything larger than a Friction Check\./)
        .length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText("$35 — Friction Check").length).toBeGreaterThan(0);
    expect(screen.getAllByText("$75 — First Fix").length).toBeGreaterThan(0);
    expect(screen.getAllByText("$150+ — Mini Build").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Platforms I can usually help with").length).toBeGreaterThan(0);
    expect(screen.getAllByText("WordPress").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Squarespace").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Facebook / Instagram business pages").length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/If your setup is unusual, start with a \$35 Friction Check\./i).length,
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

  it("adds a clear Jonathan trust anchor and footer contact details", async () => {
    delete process.env.NEXT_PUBLIC_BOOKING_URL;
    const { default: Home } = await import("@/app/page");

    const { container } = render(<Home />);

    const anchor = container.querySelector(".human-anchor");

    expect(anchor).not.toBeNull();
    expect(anchor?.textContent).toContain(
      "Hi, I’m Jonathan",
    );
    expect(anchor?.textContent).toContain(
      "website handyman based in South Jersey",
    );
    expect(screen.getAllByText("Killough Works").length).toBeGreaterThan(0);
    expect(screen.getAllByAltText("Killough Works logo").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Website handyman for local businesses.").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Based in South Jersey. Fixing websites nationwide.").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Built by Jonathan in South Jersey").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Direct contact:").length).toBeGreaterThan(0);
    expect(screen.getAllByText("jonathan@killough.works").length).toBeGreaterThan(0);
    expect(screen.queryByText("JW")).not.toBeInTheDocument();
  });

  it("surfaces the featured friction check and the plain-language FAQ", async () => {
    delete process.env.NEXT_PUBLIC_BOOKING_URL;
    const { default: Home } = await import("@/app/page");

    render(<Home />);

    expect(screen.getAllByText("Delivered within 48 hours.").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Most popular for known problems").length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/Secure your Friction Check\. After checkout, you land on a short handoff page/i).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText("Do I need to give you my password?").length).toBeGreaterThan(0);
    expect(screen.getAllByText("What if you can’t fix it?").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Is this a full website redesign?").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Start with the \$35 Friction Check\./).length).toBeGreaterThan(0);
  });
});
