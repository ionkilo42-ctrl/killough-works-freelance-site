import type { Metadata } from "next";

const followUpLinks = {
  intake: "#",
  payHub: "/pay",
  home: "/",
} as const;

const nextSteps = [
  "Business name.",
  "Website, booking link, or social page.",
  "What you want help with right now.",
  "Any screenshots, photos, files, or references.",
  "Best contact method for the follow-up.",
] as const;

export const metadata: Metadata = {
  title: "Paid | Killough Works",
  description: "Confirmation and next steps after a starter payment or deposit.",
};

export default function PaidPage() {
  return (
    <main className="shell inner-page">
      <section className="subpage-hero">
        <div className="identity-strip utility-strip">
          <div>
            <p className="eyebrow">Killough Works</p>
            <p className="identity-note">
              Confirmation page for starter payments and scoped small-build deposits.
            </p>
          </div>
          <nav className="route-nav" aria-label="Confirmation page links">
            <span className="route-nav-label">Route</span>
            <div className="route-nav-links">
              <a href={followUpLinks.home}>Back home</a>
              <a href={followUpLinks.payHub}>Back to pay</a>
              <a className="route-nav-cta" href={followUpLinks.intake}>
                Send intake details
              </a>
            </div>
          </nav>
        </div>

        <div className="hero-ledger pay-ledger">
          <article className="hero-essay pay-essay">
            <p className="micro-note">Payment confirmation / intake handoff / next-step clarity</p>
            <div className="hero-poster">
              <p className="headline-note">No extra maze after payment.</p>
              <div className="headline-stack">
                <span className="poster-mark">KW-PAID</span>
                <h1>Payment received. Next step is simple.</h1>
              </div>
            </div>
            <p className="lede">
              You are not stuck guessing what happens next. Send the key details so I can shape the
              smallest useful version first. The clearer the business name, link, files,
              screenshots, and contact method, the faster I can start cleanly.
            </p>
            <div className="hero-actions">
              <a className="button primary" href={followUpLinks.intake}>
                Send intake details
              </a>
              <a className="button secondary" href={followUpLinks.payHub}>
                Back to payment hub
              </a>
            </div>
          </article>

          <aside className="artifact-card process-board confirmation-card">
            <p className="panel-label">Next steps</p>
            <div className="mini-steps">
              {nextSteps.map((step, index) => (
                <p key={step}>
                  <span>0{index + 1}</span>
                  {step}
                </p>
              ))}
            </div>
            <p className="panel-note">
              Send the intake details and I will review what you sent, shape the smallest useful
              next step, and follow up using your preferred contact method.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
