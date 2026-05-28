import { LeadForm } from "@/components/lead-form";
import { FeaturedVisualCard } from "@/components/featured-visual-card";
import {
  coreCategories,
  featuredVisuals,
  fieldNotes,
  processSteps,
} from "@/data/site";

const rawBookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();
const bookingUrl = rawBookingUrl || "#contact";
const hasBookingUrl = Boolean(rawBookingUrl);

export default function Home() {
  return (
    <main className="shell innovation-shell">
      <section className="hero-section" id="top">
        <div className="topline">
          <div>
            <p className="eyebrow">Killough Works</p>
            <p className="identity-note">Small digital fixes for rough, real business moments.</p>
          </div>
          <nav className="route-nav" aria-label="Section links">
            <a href="#what-i-fix">What I fix</a>
            <a href="#how-it-starts">How it starts</a>
            <a href="#field-notes">Field Notes</a>
            <a href="#contact">Send it</a>
            <a className="route-nav-cta" href="/pay">
              Pay / Start
            </a>
          </nav>
        </div>

        <div className="hero-grid home-hero-grid">
          <article className="hero-card hero-copy">
            <p className="micro-note">Send the messy version</p>
            <h1>Small coded tools for messy business moments.</h1>
            <p className="lede">
              Send a screenshot, rough offer, post, form, or messy lead flow. I&apos;ll find the
              smallest useful fix.
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
              <li>A screenshot of the current page</li>
              <li>A rough caption, offer, or promo idea</li>
              <li>A form, inbox, DM thread, or lead path that keeps getting stuck</li>
            </ul>
            <p className="contact-note">Starter fixes from $10-$35. Bigger builds start only after the first useful move is clear.</p>
          </aside>
        </div>
      </section>

      <section className="section visual-section">
        <div className="section-heading">
          <p className="section-label">Featured visuals</p>
          <h2>A visual system for practical clarity.</h2>
          <p>
            Image, language, and layout work together here, not as decoration, but as a way to make
            messy business problems easier to see.
          </p>
        </div>
        <div className="visual-grid">
          {featuredVisuals.map((item) => (
            <FeaturedVisualCard item={item} key={item.title} />
          ))}
        </div>
      </section>

      <section className="section" id="what-i-fix">
        <div className="section-heading">
          <p className="section-label">What I fix</p>
          <h2>Small fixes for the places business gets stuck.</h2>
          <p>Most projects do not need a giant plan to begin. They need one clear first move.</p>
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

      <section className="section process-section" id="how-it-starts">
        <div className="section-heading">
          <p className="section-label">How it starts</p>
          <h2>Send the messy version first.</h2>
          <p>
            No polished brief required. A screenshot, rough offer, caption, link, or half-broken
            lead flow is enough to find the smallest useful fix.
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

      <section className="section" id="field-notes">
        <div className="section-heading split-heading">
          <div>
            <p className="section-label">Field Notes</p>
            <h2>Field notes from small useful fixes.</h2>
            <p>
              Short observations from small coded tools, intake repairs, visual systems, and
              practical signals.
            </p>
          </div>
          <a className="button tertiary" href="/field-notes">
            Browse all field notes
          </a>
        </div>
        <div className="field-note-ledger">
          {fieldNotes.slice(0, 4).map((note) => (
            <a className="ledger-row" href={`/field-notes#${note.slug}`} key={note.slug}>
              <div className="ledger-meta">
                <span>{note.category}</span>
                <span>{note.date}</span>
              </div>
              <h3>{note.title}</h3>
              <p>{note.excerpt}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="section-heading">
          <p className="section-label">Send me the messy version</p>
          <h2>Messy is okay. Send the thing.</h2>
          <p>I&apos;ll help find the first useful move and keep the starting scope practical.</p>
        </div>
        <div className="contact-grid">
          <div className="contact-copy">
            <p className="panel-label">What happens next</p>
            <ol>
              <li>You send what already exists.</li>
              <li>I map the real friction point.</li>
              <li>I quote the smallest useful fix before anything gets overbuilt.</li>
            </ol>
            <p className="contact-note">
              Start with the smallest useful move before turning it into a larger project.
            </p>
          </div>
          <LeadForm />
        </div>
      </section>

      {hasBookingUrl ? (
        <section className="section quiet-cta-section">
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
