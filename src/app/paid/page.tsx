import type { Metadata } from "next";
import Link from "next/link";

import { BrandLockup } from "@/components/brand-lockup";
import { SiteFooter } from "@/components/site-footer";
import { paymentFollowUpContact } from "@/data/site";

const followUpLinks = {
  intake: "/#contact",
  payHub: "/pay",
  home: "/",
} as const;

const nextSteps = [
  "I review your payment and request.",
  "I look at the website, page, form, or profile you send.",
  "I send back the first practical fix, teardown, draft, or recommendation based on the option you selected.",
] as const;

const sendMeList = [
  "your website",
  "Facebook or Instagram page",
  "screenshot",
  "offer idea",
  "broken form or lead flow",
  "what you want customers to do",
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
            <h1>Thank you — your payment is received.</h1>
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
                <p className="panel-label">Next step</p>
                <p>
                  Send me one of the following so I can start with the right practical first step.
                </p>
                <ul className="messy-list paid-detail-list">
                  {sendMeList.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="contact-note">
                  Optional: add a short note explaining what you paid for and what you want fixed
                  first.
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
              {paymentFollowUpContact.label}:{" "}
              <a className="text-link" href={paymentFollowUpContact.mailtoHref}>
                {paymentFollowUpContact.email}
              </a>
            </p>
          </article>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
