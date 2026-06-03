import type { Metadata } from "next";
import Link from "next/link";

import { BrandLockup } from "@/components/brand-lockup";
import { contactDetails } from "@/data/site";

const followUpLinks = {
  intake: "/#start",
  payHub: "/pay",
  home: "/",
} as const;

const nextSteps = [
  "I review your payment and request.",
  "I look at the website, page, form, or profile you send.",
  "I send back the first practical fix, teardown, draft, or recommendation based on the option you selected.",
] as const;

export const metadata: Metadata = {
  title: "Paid | Killough Works",
  description: "Confirmation and next steps after a starter payment or deposit.",
};

export default function PaidPage() {
  return (
    <main className="shell inner-page paid-page-shell">
      <section className="section section-tray paid-confirmation-shell">
        <div className="identity-strip utility-strip paid-confirmation-top">
          <BrandLockup note="Payment confirmed and ready for the next practical step." />
          <nav className="route-nav" aria-label="Confirmation page links">
            <span className="route-nav-label">Route</span>
            <div className="route-nav-links">
              <Link href={followUpLinks.home}>Return home</Link>
              <Link href={followUpLinks.payHub}>Payment hub</Link>
            </div>
          </nav>
        </div>

        <div className="paid-confirmation-wrap">
          <article className="paid-confirmation-card">
            <p className="micro-note">Payment received / clear handoff / no extra maze</p>
            <h1>Payment received — let’s get to work.</h1>
            <p className="lede paid-confirmation-lede">
              Your Killough Works request is in. The next step is to send the links, screenshots,
              or notes I need to review the right thing.
            </p>

            <div className="paid-card-sections">
              <section className="paid-info-block">
                <p className="panel-label">Confirmation</p>
                <p>
                  Your payment was received. I&apos;ll review your request and use the details you
                  send next to figure out the clearest first fix.
                </p>
              </section>

              <section className="paid-info-block">
                <p className="panel-label">What happens next</p>
                <ol className="paid-step-list">
                  {nextSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </section>

              <section className="paid-info-block">
                <p className="panel-label">Send project details</p>
                <p>
                  Have extra context? Send links, screenshots, or notes to {contactDetails.name}.
                </p>
              </section>
            </div>

            <div className="hero-actions paid-confirmation-actions">
              <a className="button primary" href={followUpLinks.intake}>
                Send Project Details
              </a>
              <Link className="button secondary" href={followUpLinks.home}>
                Return Home
              </Link>
            </div>

            <p className="contact-note paid-support-copy">
              {contactDetails.directLabel}:{" "}
              <a className="text-link" href={contactDetails.mailtoHref}>
                {contactDetails.email}
              </a>
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
