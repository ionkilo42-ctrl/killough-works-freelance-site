import type { Metadata } from "next";
import Link from "next/link";

import { BrandLockup } from "@/components/brand-lockup";

const followUpLinks = {
  intake: "/#start",
  payHub: "/pay",
  home: "/",
} as const;

const nextSteps = [
  "What is your website, Facebook, Instagram, or page link?",
  "What is the #1 thing that feels broken, confusing, or annoying right now?",
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
          <BrandLockup note="Friction Check handoff for small business systems, fixed one clear step at a time." />
          <nav className="route-nav" aria-label="Confirmation page links">
            <span className="route-nav-label">Route</span>
            <div className="route-nav-links">
              <Link href={followUpLinks.home}>Back home</Link>
              <Link href={followUpLinks.payHub}>Back to pay</Link>
              <a className="route-nav-cta" href={followUpLinks.intake}>
                Send intake details
              </a>
            </div>
          </nav>
        </div>

        <div className="hero-ledger pay-ledger">
          <article className="hero-essay pay-essay">
            <p className="micro-note">Payment received / Friction Check handoff / real intake next step</p>
            <div className="hero-poster">
              <p className="headline-note">No extra maze after payment.</p>
            <div className="headline-stack">
                <span className="poster-mark">KW-PAID</span>
                <h1>Payment received. Next, answer 2 quick questions so I can review the first useful move.</h1>
              </div>
            </div>
            <p className="lede">
              For a $35 Friction Check, the next move is simple. Send your page link and the #1
              thing that feels broken, confusing, or annoying right now.
            </p>
            <p className="contact-note">
              Messy is okay. A website, Facebook page, Instagram profile, or rough page link is
              enough to start.
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
              Send those 2 answers and I&apos;ll review the Friction Check cleanly, identify what is
              actually broken, and reply with the first useful move.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
