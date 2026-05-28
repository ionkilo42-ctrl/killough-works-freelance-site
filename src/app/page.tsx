import { LeadForm } from "@/components/lead-form";
import { FeaturedVisualCard } from "@/components/featured-visual-card";
import { FieldNoteCard } from "@/components/field-note-card";
import {
  coreCategories,
  featuredVisuals,
  fieldNotes,
  practicalSignals,
  processSteps,
  starterPricing,
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
            <p className="identity-note">I build small digital bridges between attention and action.</p>
          </div>
          <nav className="route-nav" aria-label="Section links">
            <a href="#categories">What I build</a>
            <a href="#field-notes">Field Notes</a>
            <a href="#contact">Send it</a>
            <a className="route-nav-cta" href="/pay">
              Pay / Start
            </a>
          </nav>
        </div>

        <div className="hero-grid">
          <aside className="stamp-card maker-stamp">
            <span className="stamp-kicker">KW maker&apos;s stamp</span>
            <div className="stamp-monogram" aria-hidden="true">
              <span>K</span>
              <span>W</span>
            </div>
            <p>Blueprint dark. Gold edge. Field-note energy. Built to feel handcrafted, not techy.</p>
          </aside>

          <article className="hero-card hero-copy">
            <p className="micro-note">Project Innovation / Phase One</p>
            <h1>Small coded tools for messy business moments.</h1>
            <p className="lede">
              I turn screenshots, posts, rough offers, and broken intake flows into simple pages,
              forms, visuals, and tiny systems people can actually use.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#contact">
                Send me the messy version
              </a>
              <a className="button secondary" href="#categories">
                See what I build
              </a>
            </div>
            <div className="signal-row">
              {practicalSignals.map((signal) => (
                <span key={signal}>{signal}</span>
              ))}
            </div>
          </article>

          <aside className="stamp-card process-card">
            <p className="panel-label">Starter build signal</p>
            <ul className="process-list">
              {starterPricing.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="section" id="categories">
        <div className="section-heading">
          <p className="section-label">Core categories</p>
          <h2>Small useful builds before giant projects.</h2>
          <p>
            The work starts with a practical first move: clearer signal, better intake, a tighter
            offer, or a tiny build that removes friction.
          </p>
        </div>
        <div className="category-grid">
          {coreCategories.map((item) => (
            <article className="category-card" key={item.title}>
              <p className="card-kicker">{item.title}</p>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="section-label">Featured visuals</p>
          <h2>Useful frames for practical work.</h2>
          <p>
            Three active image panels carry the signal now. The same card system still holds cleanly
            when other notes stay in blueprint fallback.
          </p>
        </div>
        <div className="visual-grid">
          {featuredVisuals.map((item) => (
            <FeaturedVisualCard item={item} key={item.title} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="section-label">How it starts</p>
          <h2>Low-friction starter work with a real next step.</h2>
        </div>
        <div className="process-strip">
          {processSteps.map((step, index) => (
            <article className="process-pill" key={step}>
              <span className="step-number">0{index + 1}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="field-notes">
        <div className="section-heading split-heading">
          <div>
            <p className="section-label">Field Notes</p>
            <h2>Simple insights. Useful clarity.</h2>
            <p>
              A running shelf of practical observations, starter builds, and intake fixes from the
              work.
            </p>
          </div>
          <a className="button tertiary" href="/field-notes">
            Browse all field notes
          </a>
        </div>
        <div className="notes-grid">
          {fieldNotes.slice(0, 3).map((note) => (
            <FieldNoteCard note={note} key={note.slug} />
          ))}
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="section-heading">
          <p className="section-label">Send me the messy version</p>
          <h2>Send a screenshot, post, caption, rough offer, or half-broken lead flow.</h2>
          <p>
            I&apos;ll trace the bottleneck, suggest the smallest useful build, and keep the first move
            grounded.
          </p>
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
              Starter fixes from $10-$35. Small useful builds before giant projects.
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
