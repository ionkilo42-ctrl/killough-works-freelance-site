import Image from "next/image";
import Link from "next/link";

import { BrandLockup } from "@/components/brand-lockup";
import { LeadForm } from "@/components/lead-form";
import { SampleFixGallery } from "@/components/sample-fix-gallery";
import {
  availabilitySlots,
  contactDetails,
  coreCategories,
  faqs,
  pricingTiers,
  processSteps,
  starterFixes,
  supportedPlatforms,
} from "@/data/site";

const rawBookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();
const bookingUrl = rawBookingUrl || "#start";
const hasBookingUrl = Boolean(rawBookingUrl);

export default function Home() {
  return (
    <main className="shell innovation-shell">
      <section className="hero-section section-tray hero-tray light-hero-tray" id="top">
        <div className="topline">
          <BrandLockup note="Website handyman for local businesses." />
          <nav className="route-nav" aria-label="Section links">
            <a href="#what-i-fix">What I Fix</a>
            <a href="#pricing">Pricing</a>
            <a href="#sample-fixes">Sample Fixes</a>
            <a href="#faq">FAQ</a>
            <a className="route-nav-cta" href="#start">
              Start
            </a>
          </nav>
        </div>

        <p className="trust-marker">Based in South Jersey. Fixing websites nationwide.</p>

        <div className="hero-grid home-hero-grid">
          <article className="hero-card hero-copy">
            <p className="micro-note">Website Handyman for Local Businesses</p>
            <h1>Small, fast web fixes for local businesses tired of losing leads.</h1>
            <p className="hero-quick-note">
              Starts at $35. Secure a Friction Check, then use the handoff page to send the links,
              screenshots, or notes I need to review the right thing.
            </p>
            <div className="hero-actions">
              <a
                className="button primary"
                href={pricingTiers[0].href}
                target="_blank"
                rel="noreferrer"
              >
                Start with Friction Check — $35
              </a>
              <Link className="button tertiary" href="/demos">
                See Working Demos
              </Link>
            </div>
            <p className="hero-payment-note">
              Secure checkout first. Then send your website URL, screenshots, and the issue you
              want reviewed.
            </p>
            <p className="lede">
              I fix the annoying website problems big agencies overcharge for: broken contact
              forms, confusing booking pages, weak calls-to-action, messy mobile layouts, missing
              payment links, and quote requests stuck in DMs.
            </p>
            <p className="contact-note">
              Small fixes that help customers contact, book, or pay you.
            </p>
            <div className="hero-diagnostic-line" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <p className="contact-note">
              Messy is okay. Send the site, page, or social profile. I&apos;ll show you where
              customers are getting stuck.
            </p>
          </article>

          <aside className="hero-side-panel">
            <p className="panel-label">Local trust</p>
            <div className="human-anchor hero-human-anchor" aria-label="Jonathan note">
              <span className="stamp-mark" aria-hidden="true">
                <Image
                  className="stamp-mark-image"
                  src="/brand/killough-works-mark.png"
                  alt=""
                  width={1254}
                  height={1254}
                  sizes="44px"
                />
              </span>
              <div>
                <p className="human-anchor-title">Hi, I’m Jonathan</p>
                <p className="contact-note">
                  I&apos;m a website handyman based in South Jersey. I help local service
                  businesses clean up the small digital problems that quietly cost them leads.
                </p>
                <p className="contact-note">
                  No giant agency rebrand. No vague tech pitch. Just a clear first fix when
                  customers are getting stuck.
                </p>
              </div>
            </div>
            <div className="signal-board compact-signal-board">
              {processSteps.map((step) => (
                <p key={step.title}>
                  <strong>{step.number}</strong> {step.title}: {step.summary}
                </p>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section section-tray" id="what-i-fix">
        <div className="section-heading">
          <p className="section-label">What I Fix</p>
          <h2>The small problems that quietly lose customers</h2>
          <p>
            This is the work: broken forms, confusing next steps, weak mobile buttons, and pages
            that make people leave before asking for a quote.
          </p>
        </div>
        <div className="category-grid">
          {coreCategories.map((item) => (
            <article className="category-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-tray pricing-section" id="pricing">
        <div className="section-heading">
          <p className="section-label">Pricing</p>
          <h2>No giant agency proposal. Pick the size of fix you need.</h2>
          <p>
            The $35 Friction Check is the easiest way to start if you know something feels broken
            but you do not want to get sold a full rebuild.
          </p>
        </div>
        <div className="payment-grid homepage-pricing-grid">
          {pricingTiers.map((tier) => {
            const externalLink = tier.href.startsWith("http");

            return (
              <article
                className={`pricing-card payment-card${tier.featured ? " payment-card-featured" : ""}`}
                key={tier.title}
              >
                <div className="payment-card-image-wrap">
                  <Image
                    src={tier.imageSrc}
                    alt={tier.imageAlt}
                    width={1254}
                    height={1254}
                    className="payment-card-image"
                    sizes="(max-width: 760px) 100vw, (max-width: 1080px) 50vw, 320px"
                  />
                </div>
                <p className="pricing-note">
                  {tier.checkoutMode === "live"
                    ? "Start here"
                    : tier.checkoutMode === "starting-payment"
                      ? "starter build payment"
                      : "scope first"}
                </p>
                {tier.badge ? <p className="payment-badge">{tier.badge}</p> : null}
                <h3>{tier.title}</h3>
                <p>
                  <strong>Best for:</strong> {tier.bestFor}
                </p>
                <p>{tier.description}</p>
                {tier.deliverable ? (
                  <p>
                    <strong>Deliverable:</strong> {tier.deliverable}
                  </p>
                ) : null}
                {tier.handoff ? (
                  <p className="contact-note">
                    <strong>How it starts:</strong> {tier.handoff}
                  </p>
                ) : null}
                <div className="pricing-includes">
                  <p className="panel-label">Includes</p>
                  <ul className="messy-list">
                    {tier.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                {tier.timeline ? (
                  <p className="contact-note">
                    <strong>Timeline:</strong> {tier.timeline}
                  </p>
                ) : null}
                <a
                  className="button primary payment-button"
                  href={tier.href}
                  target={externalLink ? "_blank" : undefined}
                  rel={externalLink ? "noreferrer" : undefined}
                >
                  {tier.cta}
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section section-tray identity-section" id="about-jonathan">
        <div className="section-heading">
          <p className="section-label">Built by Jonathan</p>
          <h2>Built by Jonathan in South Jersey</h2>
          <p>{contactDetails.trustBlurb}</p>
        </div>
        <div className="category-grid identity-grid">
          <article className="category-card identity-card">
            <h3>Based in New Jersey</h3>
            <p>Local-business mindset, plain language, and a practical first step instead of a bloated process.</p>
          </article>
          <article className="category-card identity-card">
            <h3>Focused on useful fixes</h3>
            <p>Websites, forms, lead capture, quote systems, branding polish, and small automations that clarify the next step.</p>
          </article>
          <article className="category-card identity-card">
            <h3>No fake agency layer</h3>
            <p>You get direct contact with the person doing the review and the work, including a clear scope before anything gets bigger.</p>
          </article>
        </div>
      </section>

      <section className="section section-tray warm-section" id="weekly-slots">
        <div className="section-heading">
          <p className="section-label">This Week</p>
          <h2>Limited weekly intake, kept intentional</h2>
          <p>I only take a small number of fixes at a time so the work stays fast, clear, and useful.</p>
        </div>
        <div className="category-grid availability-grid">
          {availabilitySlots.map((slot) => (
            <article className="category-card availability-card" key={slot.title}>
              <h3>{slot.title}</h3>
              <p>{slot.note}</p>
            </article>
          ))}
        </div>
        <p className="contact-note">
          If the slots are full, I&apos;ll tell you before you pay for anything larger than a
          Friction Check.
        </p>
      </section>

      <section className="section section-tray sample-fixes-section" id="sample-fixes">
        <div className="section-heading">
          <p className="section-label">Sample Fixes</p>
          <h2>Example fixes, shown as simple mockups</h2>
          <p>
            These examples show the kind of practical improvements Killough Works can make. They
            are illustrative mockups, not client case studies. Real client examples will be added
            as the portfolio grows.
          </p>
        </div>
        <SampleFixGallery items={starterFixes} />
      </section>

      <section className="section section-tray" id="platforms">
        <div className="section-heading">
          <p className="section-label">Platforms</p>
          <h2>Platforms I can usually help with</h2>
          <p>
            If your setup is unusual, start with a $35 Friction Check. I&apos;ll tell you plainly
            what is fixable and what is not.
          </p>
        </div>
        <div className="signal-board platform-grid">
          {supportedPlatforms.map((platform) => (
            <p key={platform}>{platform}</p>
          ))}
        </div>
      </section>

      <section className="section section-tray" id="faq">
        <div className="section-heading">
          <p className="section-label">FAQ</p>
          <h2>Simple answers before you start</h2>
        </div>
        <div className="category-grid faq-grid">
          {faqs.map((item) => (
            <article className="category-card faq-card" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-tray contact-section work-order-section" id="start">
        <div className="section-heading">
          <p className="section-label">Start</p>
          <h2>Start with the messy version</h2>
          <p>
            Drop your website, Facebook page, Instagram, or the thing that feels broken. I&apos;ll
            look at it and tell you the first practical fix.
          </p>
        </div>
        <div className="contact-console">
          <div className="contact-grid">
            <div className="contact-copy console-sidebar">
              <p className="panel-label">What happens next</p>
              <ol>
                <li>Choose the option that fits the size of the fix.</li>
                <li>Complete secure checkout or send your request for scoped work.</li>
                <li>Use the handoff page or form to send your links, screenshots, or notes.</li>
                <li>I review what your customers see and send back the clearest next move.</li>
              </ol>
              <p className="panel-label">Good fit</p>
              <ul className="messy-list">
                <li>Broken contact forms</li>
                <li>Confusing booking pages</li>
                <li>Quote requests lost in DMs</li>
                <li>Missing payment or start links</li>
              </ul>
              <p className="panel-label">Simple scope first</p>
              <p className="contact-note">
                If the problem needs a bigger rebuild, I&apos;ll tell you clearly instead of
                pretending a quick patch will solve everything.
              </p>
              <p className="contact-note">
                {contactDetails.directLabel}: <a className="text-link" href={contactDetails.mailtoHref}>{contactDetails.email}</a>
              </p>
              <div className="human-anchor" aria-label="Jonathan note">
                <p className="stamp-mark" aria-hidden="true">
                  KW
                </p>
                <div>
                  <p className="human-anchor-title">Hi, I’m Jonathan</p>
                  <p className="contact-note">
                    I help local service businesses fix the small website and lead-flow problems
                    that make customers bounce, wait, or give up.
                  </p>
                  <p className="contact-note">
                    You do not need a polished brief. A short message and a messy link are enough.
                  </p>
                </div>
              </div>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>

      {hasBookingUrl ? (
        <section className="section section-tray quiet-cta-section">
          <div className="quiet-cta">
            <div>
              <p className="section-label">Bigger Projects</p>
              <h2>Need to talk through a larger build?</h2>
              <p>
                Book a quick call if the first fix clearly opens into a larger project.
              </p>
            </div>
            <a className="button tertiary" href={bookingUrl} target="_blank" rel="noreferrer">
              Book a quick call
            </a>
          </div>
        </section>
      ) : null}

      <footer className="section section-tray site-footer">
        <div>
          <p className="section-label">Killough Works</p>
          <p className="footer-line">Website handyman for local businesses.</p>
          <p className="footer-line">Based in South Jersey. Fixing websites nationwide.</p>
        </div>
        <p className="footer-contact">
          {contactDetails.directLabel}:{" "}
          <a className="text-link" href={contactDetails.mailtoHref}>
            {contactDetails.email}
          </a>
        </p>
      </footer>
    </main>
  );
}
