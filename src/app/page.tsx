import { LeadForm } from "@/components/lead-form";
import {
  bestFit,
  buildCards,
  examples,
  processSteps,
  signalPoints,
  starterPricing,
} from "@/data/site";

const rawBookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();
const bookingUrl = rawBookingUrl || "#contact";
const hasBookingUrl = Boolean(rawBookingUrl);

export default function Home() {
  return (
    <main className="shell">
      <section className="hero-workshop" id="top">
        <div className="identity-strip">
          <div>
            <p className="eyebrow">Killough Works</p>
            <p className="identity-note">
              Small coded tools, offer visuals, and lead flows for local businesses and creators.
            </p>
          </div>
          <nav className="route-nav" aria-label="Section links">
            <span className="route-nav-label">Jump</span>
            <div className="route-nav-links">
              <a href="#builds">What I build</a>
              <a href="#examples">Use cases</a>
              <a href="#pricing">Starter pricing</a>
              <a href="#process">How it works</a>
              <a href="#contact">Send it</a>
            </div>
          </nav>
        </div>

        <div className="hero-ledger">
          <aside className="artifact-card signal-card">
            <p className="panel-label">Field notes</p>
            <p className="signal-card-title">Most small businesses do not need a giant agency project first.</p>
            <ul className="signal-bullets">
              <li>One useful page.</li>
              <li>One clearer offer.</li>
              <li>One better intake flow.</li>
              <li>One small tool that saves a back-and-forth.</li>
            </ul>
            <div className="tag-row">
              <span>$10-$25</span>
              <span>send screenshot</span>
              <span>DM-ready</span>
            </div>
          </aside>

          <article className="hero-essay">
            <p className="micro-note">Offer workshop / intake repair / tiny build energy</p>
            <div className="headline-stack">
              <p className="headline-note">Not a discovery-call funnel.</p>
              <h1>Small useful builds for messy business problems.</h1>
            </div>
            <p className="lede">
              I turn posts, screenshots, DMs, rough ideas, and broken lead flows into simple
              pages, visuals, forms, and tools people can actually use.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#contact">
                Send me what you have
              </a>
              <a className="button secondary" href="#pricing">
                See starter offers
              </a>
            </div>
            <div className="signal-row">
              <span>Useful first</span>
              <span>Fast to ship</span>
              <span>Taste over template</span>
              <span>Tailored to what exists</span>
            </div>
          </article>

          <aside className="artifact-card process-board">
            <p className="panel-label">Mini signal path</p>
            <div className="mini-steps">
              <p>
                <span>01</span> send the messy version
              </p>
              <p>
                <span>02</span> I map the bottleneck
              </p>
              <p>
                <span>03</span> I price the smallest useful fix
              </p>
              <p>
                <span>04</span> first version ships
              </p>
            </div>
            <p className="panel-note">
              You can start with a screenshot, a post, a caption, a rough offer, or a half-broken
              lead flow. If the work is clearly bigger, the call comes later.
            </p>
          </aside>
        </div>

        <div className="example-rail" id="examples">
          {examples.slice(0, 5).map((item) => (
            <article className="example-tile" key={item.title}>
              <p className="panel-label">{item.tag}</p>
              <h3>{item.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section field-section" id="builds">
        <div className="section-heading">
          <p className="section-label">Field notes</p>
          <h2>Small things that help a real person say yes faster.</h2>
          <p>
            This is not positioned like a giant agency retainer. The work starts with one useful
            thing that makes the business easier to understand, easier to contact, or easier to buy
            from.
          </p>
        </div>
        <div className="build-grid">
          {buildCards.map((item) => (
            <article className="build-card" key={item.title}>
              <span className="card-index">{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="pricing">
        <div className="section-heading">
          <p className="section-label">Starter prices</p>
          <h2>Low pricing on purpose.</h2>
          <p>
            Cheap first builds create trust, screenshots, proof, testimonials, and momentum before
            bigger projects. The point is to start with something useful, not force a giant scope
            too early.
          </p>
        </div>
        <div className="pricing-grid">
          {starterPricing.map((item) => (
            <article className="pricing-card" key={item.title}>
              <p className="pricing-note">{item.note}</p>
              <p className="price">{item.range}</p>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
        <div className="signal-board">
          {signalPoints.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>

      <section className="section" id="process">
        <div className="section-heading">
          <p className="section-label">Signal path</p>
          <h2>Start with the smallest useful move.</h2>
        </div>
        <div className="process-grid">
          {processSteps.map((step, index) => (
            <article className="process-card" key={step}>
              <span className="step-number">Step {index + 1}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section two-column-section" id="fit">
        <div>
          <div className="section-heading compact">
            <p className="section-label">Best fit</p>
            <h2>Built for people who already have something real, just not clean yet.</h2>
          </div>
          <div className="fit-grid">
            {bestFit.map((item) => (
              <article className="fit-pill" key={item}>
                {item}
              </article>
            ))}
          </div>
        </div>

        <div>
          <div className="section-heading compact">
            <p className="section-label">Use cases</p>
            <h2>Useful first builds I can shape around what you already have.</h2>
          </div>
          <div className="examples-grid">
            {examples.map((item) => (
              <article className="example-card" key={item.title}>
                <p className="panel-label">{item.tag}</p>
                <h3>{item.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="section-heading">
          <p className="section-label">Send me the messy version</p>
          <h2>Send a link, screenshot, post, business, or rough idea.</h2>
          <p>
            I will look at what is already there, map the bottleneck, and suggest the smallest
            useful thing to build first.
          </p>
        </div>
        <div className="contact-grid">
          <div className="contact-copy">
            <p className="panel-label">What happens next</p>
            <ol>
              <li>You send what you have.</li>
              <li>I reply with the bottleneck and the smallest useful build.</li>
              <li>If it is clearly bigger than a starter build, then a call makes sense.</li>
            </ol>
            <p className="contact-note">
              Plainspoken scope, tailored suggestions, and no pressure to turn a small problem into
              a giant project.
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
              <h2>Already have a bigger project or want to talk it through?</h2>
              <p>Book a quick call.</p>
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
