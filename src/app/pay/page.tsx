import type { Metadata } from "next";
import Link from "next/link";

import { BrandLockup } from "@/components/brand-lockup";

const paymentLinks = {
  frictionCheck: "https://buy.stripe.com/7sY7sLba91fgaTwb0I1ZS02",
  firstFix: "/#contact",
  miniBuild: "/#contact",
  venmo: "https://venmo.com/u/ionkilo42",
  cashApp: "https://cash.app/$ionkilo42",
  paypal: "https://paypal.me/ionkilo42",
} as const;

const paymentOptions = [
  {
    title: "$35 — Friction Check",
    detail:
      "I look at the messy spot and tell you what is actually broken, what matters, and what the first useful fix should be.",
    href: paymentLinks.frictionCheck,
    cta: "Pay $35",
    badge: "Best place to start",
    recommended: true,
  },
  {
    title: "$75 — First Fix",
    detail:
      "I make one small practical improvement: form cleanup, intake flow, payment link, copy rewrite, button fix, customer message, or simple page section.",
    href: paymentLinks.firstFix,
    cta: "Start a First Fix",
    badge: null,
    recommended: false,
  },
  {
    title: "$150+ — Mini Build",
    detail:
      "For multi-step flows, dashboards, branded pages, automation, lead capture, or anything that needs more structure.",
    href: paymentLinks.miniBuild,
    cta: "Scope a Mini Build",
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
          <BrandLockup note="Small business systems, fixed one clear step at a time." />
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
            <p className="micro-note">Clear starting points / honest scope / no fake checkout maze</p>
            <div className="hero-poster">
              <p className="headline-note">One clear step first.</p>
              <div className="headline-stack">
                <span className="poster-mark">KW-PAY</span>
                <h1>One clear step. Then the next.</h1>
              </div>
              <div className="hero-orbit">
                <span>friction check</span>
                <span>first fix</span>
                <span>mini build</span>
              </div>
            </div>
            <p className="lede">
              Send me the broken business moment. I&apos;ll make the first useful fix obvious. The
              Friction Check has a live payment link now. First Fix and Mini Build work starts after
              I review the real problem and confirm scope with you.
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
              <li>The $35 Friction Check is the best default if you want a clear first move.</li>
              <li>After payment, use the confirmation page to send the details I need to start.</li>
              <li>If you are unsure, contact me first and I&apos;ll tell you the right starting point.</li>
              <li>I scope First Fix and Mini Build work before charging more.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section" id="payment-options">
        <div className="section-heading">
          <p className="section-label">Payment hub</p>
          <h2>Offer ladder</h2>
          <p>
            The $35 Friction Check is the cleanest place to start if you need clarity fast. The
            First Fix and Mini Build tiers are still the same ladder, but they start with a scoped
            contact-first handoff instead of a blind checkout. If the work grows, I price the next
            phase separately before any additional charges are sent.
          </p>
        </div>
        <div className="payment-grid">
          {paymentOptions.map((option, index) => (
            <article
              className={`pricing-card payment-card payment-card-${index + 1}${option.recommended ? " payment-card-featured" : ""}`}
              key={option.title}
            >
              <p className="pricing-note">
                {option.href.startsWith("https://") ? "live payment link" : "scoped through contact first"}
              </p>
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
          <p>These offers are meant to fix one clear business problem at a practical level.</p>
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
