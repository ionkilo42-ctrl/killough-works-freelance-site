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
      <section className="hero-card" id="top">
        <div className="hero-shell">
          <div className="hero-copy">
            <div className="eyebrow">Killough Works</div>
            <nav className="nav">
              <a href="#builds">What I build</a>
              <a href="#pricing">Starter pricing</a>
              <a href="#process">How it works</a>
              <a href="#contact">Send it</a>
            </nav>
            <p className="micro-note">Offer cleanup, intake repair, and tiny build energy.</p>
            <p className="hero-kicker">
              Small coded tools, offer visuals, and lead flows for local businesses and creators.
            </p>
            <h1>Small useful builds for messy business problems.</h1>
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
            </div>
          </div>

          <aside className="hero-map">
            <p className="panel-label">Field notes</p>
            <div className="map-lines" aria-hidden="true" />
            <ul>
              <li>Send the messy version first.</li>
              <li>I map the bottleneck before I sell a bigger build.</li>
              <li>Most first wins are a page, a form, a visual, or a small tool.</li>
            </ul>
            <p className="panel-note">
              You do not need a discovery call to start. You can send a screenshot, link, caption,
              post, or rough idea and I will turn it into a clearer first move.
            </p>
          </aside>
        </div>
      </section>

      <section className="section constellation-section" id="builds">
        <div className="section-heading">
          <p className="section-label">What I actually build</p>
          <h2>Small things that help a real person say yes faster.</h2>
          <p>
            This is not positioned like a giant agency retainer. The work starts with one useful
            thing that makes the business easier to understand, easier to contact, or easier to buy
            from.
          </p>
        </div>
        <div className="build-grid">
          {buildCards.map((item, index) => (
            <article className="build-card" key={item.title}>
              <span className="card-index">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="pricing">
        <div className="section-heading">
          <p className="section-label">First build menu</p>
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
            <p className="section-label">Examples</p>
            <h2>Useful first builds I can shape around what you already have.</h2>
          </div>
          <div className="examples-grid">
            {examples.map((item) => (
              <article className="example-card" key={item}>
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="section-heading">
          <p className="section-label">Send the messy version</p>
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
