import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import DemoDetailPage from "@/app/demos/[slug]/page";

describe("/demos page", () => {
  it("groups the demo catalog by practical business category", async () => {
    const { default: DemosPage } = await import("@/app/demos/page");

    render(<DemosPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Working prototypes across real business workflows.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Interactive demos of quote forms, booking flows, deposit steps, review tools, landing pages, and follow-up systems/i,
      ),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Lead Capture & Intake" })).toHaveAttribute(
      "href",
      "#lead-capture-intake",
    );
    expect(screen.getByRole("heading", { level: 2, name: "Lead Capture & Intake" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Booking & Scheduling" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Sales & Conversion" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Reviews & Reputation" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Customer Follow-Up" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Business Operations" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Websites & Landing Pages" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Experiments" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Pressure Washing Quote Form" })).not.toBeInTheDocument();

    expect(screen.getByRole("heading", { level: 3, name: "Service Booking Request Flow" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Deposit Payment Flow" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Estimate Approval Flow" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Lead Follow-Up Dashboard" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Local Service Landing Page" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Live Bible Companion" })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Deposit Payment Flow" })).toHaveAttribute(
      "href",
      "/demos/deposit-payment-flow",
    );
    expect(screen.getByRole("link", { name: "Live Bible Companion" })).toHaveAttribute(
      "href",
      "/demos/live-bible-companion",
    );
  });

  it("shows the fake success state on a form-based demo detail page after submit", async () => {
    const user = userEvent.setup();
    const page = await DemoDetailPage({ params: Promise.resolve({ slug: "pressure-washing-quote" }) });

    render(page);

    await user.type(screen.getByLabelText("Homeowner name"), "Chris Parker");
    await user.type(screen.getByLabelText("Phone number"), "(856) 555-0149");
    await user.selectOptions(screen.getByLabelText("Main surface"), "driveway");
    await user.type(screen.getByLabelText("Town"), "Washington Township");
    await user.selectOptions(screen.getByLabelText("Best callback time"), "morning");
    await user.click(screen.getByRole("button", { name: "Request pressure washing quote" }));

    expect(screen.getByText("Request sent.")).toBeInTheDocument();
    expect(
      screen.getByText("The real version would send this lead straight to the business owner by email or text."),
    ).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("link", { name: "Start a Conversation" })
        .some((link) => link.getAttribute("href") === "/#contact"),
    ).toBe(true);
  });

  it("shows the payment demo with a clean deposit success message", async () => {
    const user = userEvent.setup();
    const page = await DemoDetailPage({ params: Promise.resolve({ slug: "deposit-payment-flow" }) });

    render(page);

    expect(screen.getByText("Job summary")).toBeInTheDocument();
    expect(screen.getByText("Spring driveway and walkway wash")).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText("Choose deposit or package"), "100");
    await user.type(screen.getByLabelText("Customer name"), "Ashley Ford");
    await user.type(screen.getByLabelText("Phone number"), "(609) 555-0144");
    await user.type(screen.getByLabelText("Email"), "ashley@example.com");
    await user.click(screen.getByRole("button", { name: "Pay deposit" }));

    expect(screen.getByText("Deposit step ready.")).toBeInTheDocument();
    expect(
      screen.getByText(/The real version would connect this step to Stripe, PayPal, Venmo, Cash App, or your Killough Works pay flow/i),
    ).toBeInTheDocument();
  });

  it("shows the landing page demo as a screen preview with a fake quote CTA", async () => {
    const user = userEvent.setup();
    const page = await DemoDetailPage({ params: Promise.resolve({ slug: "local-service-landing-page" }) });

    render(page);

    expect(screen.getByText("Pressure washing that actually makes it easy to get a quote.")).toBeInTheDocument();
    expect(screen.getByText("House washing")).toBeInTheDocument();
    expect(screen.getByText("Before and after project highlight")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Request a quote" }));

    expect(screen.getByText("Quote path ready.")).toBeInTheDocument();
    expect(
      screen.getByText(/The real version would send the customer into a quote form, booking request, or direct contact step/i),
    ).toBeInTheDocument();
  });

  it("shows the operations dashboard demo and fake follow-up action", async () => {
    const user = userEvent.setup();
    const page = await DemoDetailPage({ params: Promise.resolve({ slug: "lead-follow-up-dashboard" }) });

    render(page);

    expect(screen.getByText("4 leads need attention")).toBeInTheDocument();
    expect(screen.getByText("Fence repair")).toBeInTheDocument();
    expect(screen.getByText("House wash quote")).toBeInTheDocument();
    expect(screen.getByText("Weekly mowing")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Mark lead followed up" }));

    expect(screen.getByText("Lead updated.")).toBeInTheDocument();
    expect(
      screen.getByText("The real version would save the status change and show the owner which lead was followed up."),
    ).toBeInTheDocument();
  });
});
