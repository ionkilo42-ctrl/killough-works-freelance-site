import { LeadForm } from "@/components/lead-form";
import {
  coreCategories,
  processSteps,
  starterFixes,
} from "@/data/site";

const rawBookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();
const bookingUrl = rawBookingUrl || "#contact";
const hasBookingUrl = Boolean(rawBookingUrl);

export default function Home() {
  return (
    <main className="shell innovation-shell">
      <section className="hero-section section-tray hero-tray" id="top">
        <div className="topline">
          <div>
            <p className="eyebrow">Killough Works</p>
            <p className="identity-note">Small digital fixes for rough, real business moments.</p>
          </div>
          <nav className="route-nav" aria-label="Section links">
            <a href="#what-i-fix">What I fix</a>
            <a href="#how-it-starts">How it starts</a>
            <a href="#field-notes">Starter fixes</a>
            <a href="#contact">Send it</a>
            <a className="route-nav-cta" href="/pay">
              Start Here
            </a>
          </nav>
        </div>

        <div className="hero-grid home-hero-grid">
          <article className="hero-card hero-copy">
            <p className="micro-note">Send the messy version</p>
            <h1>Small coded tools for messy business moments.</h1>
            <p className="lede">
              I fix unclear offers, messy intake, rough quote flows, and small web problems that
              block the next sale or reply.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#contact">
                Send me the messy version
              </a>
              <a className="button secondary" href="#how-it-starts">
                Start small
              </a>
            </div>
          </article>

          <aside className="hero-side-panel">
            <p className="panel-label">Messy is okay</p>
            <p className="side-panel-title">Send the thing before it is polished.</p>
            <ul className="messy-list">
              <li>A website link or shared screenshot link</li>
              <li>A rough offer, caption, or promo idea</li>
              <li>A form, inbox, DM thread, or lead path that keeps getting stuck</li>
            </ul>
            <p className="contact-note">Starter fixes from $10-$35. Bigger builds start only after the first useful move is clear.</p>
          </aside>
        </div>
      </section>

      <section className="section section-tray" id="what-i-fix">
        <div className="section-heading">
          <p className="section-label">What I fix</p>
          <h2>What I fix first</h2>
          <p>These are the practical problems that usually make a small starter fix worth doing.</p>
          <p className="contact-note">
            Best fit: custom HTML/CSS/JS, React/Tailwind pages, simple forms, embedded tools,
            Webflow-style page tweaks, Zapier-style handoffs, and lightweight website cleanup.
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

      <section className="section section-tray process-section" id="how-it-starts">
        <div className="section-heading">
          <p className="section-label">How it starts</p>
          <h2>How it starts</h2>
          <p>
            Send what you already have. I review the real friction point, then reply with the
            smallest useful next step.
          </p>
          <p>Submit first. I&apos;ll review it and send the smallest useful next step.</p>
          <p className="contact-note">
            I usually send a first read within 24 hours. Small starter fixes often ship in 1-2
            business days once the path is clear.
          </p>
        </div>
        <div className="process-strip">
          {processSteps.map((step) => (
            <article className="process-pill" key={step.title}>
              <span className="step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-tray" id="field-notes">
        <div className="section-heading split-heading">
          <div>
            <p className="section-label">Raw field notes</p>
            <h2>Raw field notes: common starter fixes</h2>
            <p>Most first moves look like one of these before anything bigger needs to happen.</p>
          </div>
          <a className="button tertiary" href="/field-notes">
            Browse all field notes
          </a>
        </div>
        <div className="category-grid">
          {starterFixes.map((item) => (
            <article className="category-card" key={item.title}>
              <p className="panel-label">{item.label}</p>
              <h3>{item.title}</h3>
              <p>
                <strong>Before:</strong> {item.before}
              </p>
              <p>
                <strong>After:</strong> {item.after}
              </p>
            </article>
          ))}
        </div>
        <p className="contact-note">
          The deeper archive lives on <a href="/field-notes">/field-notes</a>.
        </p>
      </section>

      <section className="section section-tray contact-section" id="contact">
        <div className="section-heading">
          <p className="section-label">Send me the messy version</p>
          <h2>Messy is okay. Send the thing.</h2>
          <p>I&apos;ll help find the first useful move and keep the starting scope practical.</p>
        </div>
        <div className="contact-console">
          <div className="contact-grid">
            <div className="contact-copy console-sidebar">
              <p className="panel-label">What happens next</p>
              <ol>
                <li>You send what already exists.</li>
                <li>I map the real friction point.</li>
                <li>I quote the smallest useful fix before anything gets overbuilt.</li>
              </ol>
              <p className="panel-label">Good fit:</p>
              <ul>
                <li>one confusing offer</li>
                <li>one intake form</li>
                <li>one quote flow</li>
                <li>one small page/tool</li>
              </ul>
              <p className="panel-label">Not a starter fix:</p>
              <ul>
                <li>full SaaS app</li>
                <li>full branding package</li>
                <li>database-heavy backend</li>
                <li>full e-commerce rebuild</li>
              </ul>
              <p className="contact-note">
                Submit first. I&apos;ll review it and send the smallest useful next step.
              </p>
              <p className="contact-note">
                If it needs a bigger rebuild instead of a starter fix, I&apos;ll tell you straight
                up before anything gets overbuilt.
              </p>
              <p className="contact-note">
                Start with the smallest useful move before turning it into a larger project.
              </p>
              <div className="human-anchor" aria-label="Jonathan note">
                <p className="stamp-mark" aria-hidden="true">
                  KW
                </p>
                <div>
                  <p className="human-anchor-title">Jonathan note</p>
                  <p className="contact-note">
                    Jonathan Killough builds small practical web fixes, intake flows, and
                    lightweight tools for people who have a messy business problem but not a
                    polished project brief.
                  </p>
                  <p className="contact-note">
                    You do not need to know the technical name for the problem. Send what you have
                    and I&apos;ll help name the bottleneck.
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
              <p className="section-label">Bigger projects</p>
              <h2>Need a bigger build or want to talk it through?</h2>
              <p>Book a quick call when the starter fix clearly opens into a larger system.</p>
            </div>
            <a className="button tertiary" href={bookingUrl} target="_blank" rel="noreferrer">
              Book a quick call
            </a>
          </div>
        </section>
      ) : null}
    </main>
  );
}
