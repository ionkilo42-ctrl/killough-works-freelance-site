import type { Metadata } from "next";
import Link from "next/link";

import { BrandLockup } from "@/components/brand-lockup";
import { PayOptionsClient } from "@/components/pay-options-client";
import { SiteFooter } from "@/components/site-footer";
import { contactDetails, pricingTiers } from "@/data/site";

const paymentGuidance = [
  "Pick the closest starting point.",
  "Complete secure checkout with the live Stripe payment link.",
  "After payment, send the page, post, screenshot, or idea you want fixed.",
  "If the job needs more than the selected tier, I’ll say so before doing extra work.",
] as const;

export const metadata: Metadata = {
  title: "Pay | Killough Works",
  description: "Current Killough Works starter offers and payment links.",
};

export default function PayPage() {
  return (
    <main className="shell inner-page">
      <section className="subpage-hero">
        <div className="identity-strip utility-strip">
          <BrandLockup note="Small starts. Clear scope. Build from proof." />
          <nav className="route-nav" aria-label="Payment page links">
            <span className="route-nav-label">Route</span>
            <div className="route-nav-links">
              <Link href="/">Back home</Link>
              <a href="#payment-options">Current offers</a>
              <Link className="route-nav-cta" href="/paid">
                Paid / Next
              </Link>
            </div>
          </nav>
        </div>

        <div className="hero-ledger pay-ledger">
          <article className="hero-essay pay-essay">
            <p className="micro-note">Small starts / practical first step / no stale checkout maze</p>
            <div className="hero-poster">
              <p className="headline-note">Current offer ladder.</p>
              <div className="headline-stack">
                <span className="poster-mark">KW-PAY</span>
                <h1>Pick the closest starting point.</h1>
              </div>
              <div className="hero-orbit">
                <span>friction check</span>
                <span>first fix</span>
                <span>mini build</span>
              </div>
            </div>
            <p className="lede">
              The current ladder is simple: Friction Check at $35, First Fix at $75, and Mini Build
              starting at $150+. Start with the smallest clear option, then send the messy real-world
              context I need to review the right thing.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#payment-options">
                Start here
              </a>
              <Link className="button secondary" href="/#contact">
                Send details first
              </Link>
            </div>
          </article>

          <aside className="artifact-card signal-card pay-note-card">
            <p className="panel-label">How it starts</p>
            <p className="signal-card-title">One practical first step. Then the next move.</p>
            <ul className="signal-bullets">
              {paymentGuidance.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="section section-tray pay-options-section" id="payment-options">
        <div className="section-heading">
          <p className="section-label">Payment hub</p>
          <h2>Current offers</h2>
          <p>
            Friction Check is the focused review. First Fix is one useful improvement. Mini Build is
            the starter build option for a small custom system. Each option below uses a live Stripe
            payment link.
          </p>
        </div>
        <PayOptionsClient options={pricingTiers} />
        <div className="signal-board pay-note-board">
          <p>Friction Check — $35: A focused review of your page, post, link, offer, or lead flow.</p>
          <p>First Fix — $75: One practical improvement completed for you.</p>
          <p>Mini Build — $150+: A small custom build around your actual business.</p>
          <p>After payment, send the page, post, screenshot, or idea you want fixed first.</p>
        </div>
        <p className="contact-note pay-contact-line">
          Direct contact:{" "}
          <a className="text-link" href={contactDetails.mailtoHref}>
            {contactDetails.email}
          </a>
        </p>
      </section>
      <SiteFooter />
    </main>
  );
}
