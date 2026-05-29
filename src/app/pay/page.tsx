import type { Metadata } from "next";
import Link from "next/link";

import { BrandLockup } from "@/components/brand-lockup";

const paymentLinks = {
  quickAudit: "https://buy.stripe.com/14A8wP5PPbTUaTw3yg1ZS00",
  socialGraphic: "https://buy.stripe.com/7sY28r6TT6zA1iW1q81ZS01",
  starterDeposit: "https://buy.stripe.com/7sY7sLba91fgaTwb0I1ZS02",
  customDeposit: "/#contact",
  venmo: "https://venmo.com/u/ionkilo42",
  cashApp: "https://cash.app/$ionkilo42",
  paypal: "https://paypal.me/ionkilo42",
} as const;

const paymentOptions = [
  {
    title: "$10 Quick Lead / Offer Audit",
    detail:
      "For a fast read on the weak spot in your offer, screenshot, caption, landing page, or lead path.",
    href: paymentLinks.quickAudit,
    cta: "Pay $10",
    badge: null,
    recommended: false,
  },
  {
    title: "$25 Pitch Image / Social Graphic",
    detail:
      "For a sharper visual you can actually post, text, or send in a DM when the current pitch looks rough.",
    href: paymentLinks.socialGraphic,
    cta: "Pay $25",
    badge: null,
    recommended: false,
  },
  {
    title: "$35 Starter Build Deposit",
    detail:
      "Best for most people who are ready to move from rough idea to first real page, form, graphic set, or small useful build.",
    href: paymentLinks.starterDeposit,
    cta: "Pay $35",
    badge: "Best place to start",
    recommended: true,
  },
  {
    title: "Custom Project Deposit",
    detail:
      "For scoped work that needs a separate deposit amount after we agree on the smallest useful version.",
    href: paymentLinks.customDeposit,
    cta: "Open custom deposit",
    badge: null,
    recommended: false,
  },
] as const;

const alternativePayments = [
  {
    label: "Venmo",
    href: paymentLinks.venmo,
    handle: "@ionkilo42",
    copy: "Send payment through Venmo using @ionkilo42.",
    cta: "Open Venmo",
  },
  {
    label: "Cash App",
    href: paymentLinks.cashApp,
    handle: "$ionkilo42",
    copy: "Send payment through Cash App using $ionkilo42.",
    cta: "Open Cash App",
  },
  {
    label: "PayPal",
    href: paymentLinks.paypal,
    handle: "paypal.me/ionkilo42",
    copy: "Send payment through PayPal using paypal.me/ionkilo42.",
    cta: "Open PayPal",
  },
] as const;

export const metadata: Metadata = {
  title: "Pay | Killough Works",
  description: "Starter payments and deposits for small useful freelance work.",
};

export default function PayPage() {
  return (
    <main className="shell inner-page">
      <section className="subpage-hero">
        <div className="identity-strip utility-strip">
          <BrandLockup note="Simple external payment links for starter services, fast visuals, and scoped deposits." />
          <nav className="route-nav" aria-label="Payment page links">
            <span className="route-nav-label">Route</span>
            <div className="route-nav-links">
              <Link href="/">Back home</Link>
              <a href="#payment-options">Payment options</a>
              <a href="#other-ways-to-pay">Other ways to pay</a>
              <Link className="route-nav-cta" href="/paid">
                Paid / Next
              </Link>
            </div>
          </nav>
        </div>

        <div className="hero-ledger pay-ledger">
          <article className="hero-essay pay-essay">
            <p className="micro-note">Starter payments / small deposits / external checkout links</p>
            <div className="hero-poster">
              <p className="headline-note">Keep it small first.</p>
              <div className="headline-stack">
                <span className="poster-mark">KW-PAY</span>
                <h1>Start Small. Build Something Useful.</h1>
              </div>
              <div className="hero-orbit">
                <span>quick audit</span>
                <span>starter deposit</span>
                <span>no custom checkout form</span>
              </div>
            </div>
            <p className="lede">
              If you already know the small thing you want help with, you can pay for a starter
              service or deposit here. These are simple external payment links so you can move
              without waiting on a custom invoice flow. If you are unsure which option fits, contact
              me first and I can point you to the best starting move.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#payment-options">
                See payment options
              </a>
              <a className="button secondary" href="#other-ways-to-pay">
                Other ways to pay
              </a>
            </div>
          </article>

          <aside className="artifact-card signal-card pay-note-card">
            <p className="panel-label">How this works</p>
            <p className="signal-card-title">Pay for the smallest clear next step.</p>
            <ul className="signal-bullets">
              <li>Choose the closest starter option.</li>
              <li>The $35 starter deposit is the recommended starting point for most people.</li>
              <li>After payment, use the confirmation page to send the details I need to start.</li>
              <li>If you are unsure, contact me first before paying.</li>
              <li>I scope anything larger before charging more.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section" id="payment-options">
        <div className="section-heading">
          <p className="section-label">Payment hub</p>
          <h2>Starter offers and deposits.</h2>
          <p>
            The $35 starter deposit is the best default if you want me to begin building something
            useful. These links are for small first steps only. If the work clearly expands beyond
            the starter scope, I will price the next phase separately before any additional charges
            are sent. If you are unsure which option fits, you can contact me first and I will help
            you choose.
          </p>
        </div>
        <div className="payment-grid">
          {paymentOptions.map((option, index) => (
            <article
              className={`pricing-card payment-card payment-card-${index + 1}${option.recommended ? " payment-card-featured" : ""}`}
              key={option.title}
            >
              <p className="pricing-note">external Stripe link</p>
              {option.badge ? <p className="payment-badge">{option.badge}</p> : null}
              <h3>{option.title}</h3>
              <p>{option.detail}</p>
              <a
                className="button primary payment-button"
                href={option.href}
                target="_blank"
                rel="noreferrer"
              >
                {option.cta}
              </a>
            </article>
          ))}
        </div>
        <div className="signal-board pay-note-board">
          <p>Payments here cover small starter services or deposits only.</p>
          <p>Larger work is scoped separately before any additional charges are sent.</p>
          <p>Once you pay, use the confirmation page to send the context that lets me start cleanly.</p>
          <p>After payment, I review what you send and use it to shape the smallest useful next step.</p>
        </div>
      </section>

      <section className="section" id="other-ways-to-pay">
        <div className="section-heading">
          <p className="section-label">Other ways to pay</p>
          <h2>Other ways to pay</h2>
          <p>
            Stripe is the main checkout option, but you can also use Venmo, Cash App, or PayPal if
            that is easier.
          </p>
        </div>
        <div className="payment-method-grid">
          {alternativePayments.map((method) => (
            <article className="contact-copy payment-method-card" key={method.label}>
              <p className="panel-label">{method.label}</p>
              <h3>{method.handle}</h3>
              <p>{method.copy}</p>
              <a className="text-link" href={method.href} target="_blank" rel="noreferrer">
                {method.cta}
              </a>
            </article>
          ))}
        </div>
        <p className="identity-note">
          After using Venmo, Cash App, or PayPal, please message me with what you paid for and the
          details for the project so I can match the payment to your request.
        </p>
      </section>
    </main>
  );
}
