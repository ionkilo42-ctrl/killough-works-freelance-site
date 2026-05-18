import { LeadForm } from "@/components/lead-form";
import { caseStudyPlaceholders, pricing, proofBlocks, services } from "@/data/site";

const bookingUrl =
  process.env.NEXT_PUBLIC_BOOKING_URL ?? "https://cal.com/your-handle/discovery";

export default function Home() {
  return (
    <main className="shell">
      <section className="hero-card" id="top">
        <div className="eyebrow">Killough Works</div>
        <nav className="nav">
          <a href="#services">Services</a>
          <a href="#proof">Why It Works</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="hero-grid">
          <div>
            <p className="kicker">AI-powered systems builder for creators, local businesses, and modern service brands.</p>
            <h1>Launch pages, lead systems, and AI workflows that help small teams move faster.</h1>
            <p className="lede">
              Clear positioning, better intake, smarter follow-up, and practical AI integration.
              No bloated retainer theater. No generic agency language. Just useful systems that
              make a business easier to run and easier to buy from.
            </p>
            <div className="hero-actions">
              <a className="button primary" href={bookingUrl} target="_blank" rel="noreferrer">
                Book a Discovery Call
              </a>
              <a className="button secondary" href="#contact">
                Start With the Intake Form
              </a>
            </div>
            <div className="mini-proof">
              <span>Fast deployment</span>
              <span>Lead-focused</span>
              <span>Launch-first scope</span>
            </div>
          </div>
          <aside className="hero-panel">
            <p className="panel-label">Best Fit</p>
            <ul>
              <li>Creators who need a sharper digital front door</li>
              <li>Local businesses tired of losing inquiries</li>
              <li>Service brands that want useful automation without complexity</li>
              <li>Founders who need a prototype that feels real fast</li>
            </ul>
            <p className="panel-note">
              Typical first engagement: 1-3 weeks, clear scope, tangible deliverable.
            </p>
          </aside>
        </div>
      </section>

      <section className="section" id="services">
        <div className="section-heading">
          <p className="section-label">Services</p>
          <h2>Built around the fastest path to traction.</h2>
          <p>
            The focus is not enterprise complexity. It is getting a credible offer, better inquiry
            handling, and operational lift into the business quickly.
          </p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <ul>
                {service.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="proof">
        <div className="section-heading">
          <p className="section-label">Trust</p>
          <h2>Credibility comes from clarity and working systems.</h2>
        </div>
        <div className="proof-grid">
          {proofBlocks.map((item) => (
            <article className="proof-card" key={item}>
              <p>{item}</p>
            </article>
          ))}
        </div>
        <div className="trust-strip">
          <p>
            Ideal clients: creators, restaurants, agencies, service businesses, and startups
            needing a fast proof-of-concept.
          </p>
          <p>
            Engagement style: direct communication, practical AI use, and narrow scope before
            expansion.
          </p>
        </div>
      </section>

      <section className="section" id="portfolio">
        <div className="section-heading">
          <p className="section-label">Portfolio / Case Study Direction</p>
          <h2>Replace placeholders with live breakdowns as the first projects close.</h2>
          <p>
            These are intentionally framed as example engagement patterns, not fake client wins.
          </p>
        </div>
        <div className="case-grid">
          {caseStudyPlaceholders.map((study) => (
            <article className="case-card" key={study.title}>
              <span>{study.status}</span>
              <h3>{study.title}</h3>
              <p>{study.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="pricing">
        <div className="section-heading">
          <p className="section-label">Pricing Guidance</p>
          <h2>Simple starting ranges that help qualify real work.</h2>
          <p>
            These are starting points, not locked packages. The goal is to anchor expectations
            without sounding vague or overbuilt.
          </p>
        </div>
        <div className="pricing-grid">
          {pricing.map((item) => (
            <article className="pricing-card" key={item.title}>
              <h3>{item.title}</h3>
              <p className="price">{item.range}</p>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section cta-section">
        <div className="cta-card">
          <div>
            <p className="section-label">Discovery Call CTA</p>
            <h2>Need a fast second brain for launch, automation, or a prototype?</h2>
            <p>
              Start with a short call if the project already has motion. Use the intake form if you
              want a cleaner handoff first.
            </p>
          </div>
          <a className="button primary" href={bookingUrl} target="_blank" rel="noreferrer">
            Book the Call
          </a>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="section-heading">
          <p className="section-label">Intake / Contact</p>
          <h2>Send the project details in one shot.</h2>
          <p>
            This form is designed to qualify quickly: what you do, what you need, how fast, and
            what budget range makes sense.
          </p>
        </div>
        <div className="contact-grid">
          <div className="contact-copy">
            <h3>What happens next</h3>
            <ol>
              <li>You send the essentials.</li>
              <li>I review fit, scope, and likely approach.</li>
              <li>You get a reply with next steps or a call link.</li>
            </ol>
            <p className="contact-note">
              If you are still shaping the project, that is fine. Just be specific about the
              bottleneck.
            </p>
          </div>
          <LeadForm />
        </div>
      </section>
    </main>
  );
}
