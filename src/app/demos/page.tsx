import type { Metadata } from "next";
import Link from "next/link";

import { BrandLockup } from "@/components/brand-lockup";
import { DemoCard } from "@/components/demo-card";
import { demoCategoryOrder, demoDefinitions } from "@/data/demos";

export const metadata: Metadata = {
  title: "Working Demos | Killough Works",
  description:
    "Working demos of quote forms, booking flows, review systems, and customer follow-up tools for local service businesses.",
};

export default function DemosPage() {
  const demosByCategory = demoCategoryOrder
    .map((category) => ({
      category,
      demos: demoDefinitions.filter((demo) => demo.category === category),
    }))
    .filter((group) => group.demos.length > 0);

  return (
    <main className="shell inner-page">
      <section className="subpage-hero">
        <div className="identity-strip utility-strip">
          <BrandLockup note="Digital fix-it shop for local service businesses." />
          <nav className="route-nav" aria-label="Demos page links">
            <span className="route-nav-label">Route</span>
            <div className="route-nav-links">
              <Link href="/">Home</Link>
              <Link href="/pay">Pay</Link>
              <Link className="route-nav-cta" href="/#start">
                Start
              </Link>
            </div>
          </nav>
        </div>

        <div className="hero-ledger demo-hero-ledger">
          <article className="hero-essay pay-essay">
            <p className="micro-note">Practical. Local. Built to fix lead friction.</p>
            <div className="hero-poster">
              <p className="headline-note">Killough Works demos.</p>
              <div className="headline-stack">
                <span className="poster-mark">KW-DEMOS</span>
                <h1>Simple digital fixes for local service businesses.</h1>
              </div>
              <div className="hero-orbit">
                <span>quote forms</span>
                <span>booking</span>
                <span>dashboards</span>
              </div>
            </div>
            <p className="lede">
              Working demos of quote forms, booking flows, deposit steps, review tools, landing
              pages, and follow-up systems built for contractors, landscapers, cleaners, junk
              removal crews, and other service businesses.
            </p>
            <div className="hero-actions">
              <Link className="button primary" href="/pay">
                Starting at $75
              </Link>
              <Link className="button secondary" href="/#start">
                Ask about your setup
              </Link>
            </div>
          </article>

          <aside className="artifact-card signal-card pay-note-card">
            <p className="panel-label">Built to solve</p>
            <ul className="signal-bullets">
              <li>Missed calls that turn into lost jobs</li>
              <li>Quote requests with no photos or details</li>
              <li>Booking friction that makes people give up</li>
              <li>Deposit and estimate steps that stall out</li>
              <li>Leads with no clear follow-up system</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section section-tray">
        <div className="section-heading">
          <p className="section-label">Working demos</p>
          <h2>Pick the kind of problem you want to fix first</h2>
          <p>
            These are working demo pages built around the exact starter offers on Killough Works.
            No backend yet. Just realistic front-end flows you can click through.
          </p>
        </div>

        <div className="demo-filter-row" aria-label="Demo categories">
          {demosByCategory.map((group) => (
            <a key={group.category} className="demo-filter-chip" href={`#${group.category.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`}>
              {group.category}
            </a>
          ))}
        </div>
      </section>

      {demosByCategory.map((group) => (
        <section
          key={group.category}
          id={group.category.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}
          className={`section section-tray demo-category-section${group.demos.length === 1 ? " demo-category-section-single" : ""}`}
        >
          <div className="section-heading">
            <p className="section-label">Demo category</p>
            <h2>{group.category}</h2>
            <p>
              {group.category === "Lead Capture & Intake"
                ? "Capture the right details without chasing people over the phone."
                : group.category === "Booking & Scheduling"
                  ? "Show a cleaner way for customers to ask for a time."
                  : group.category === "Sales & Conversion"
                    ? "Give people an obvious next step after the quote."
                    : group.category === "Reviews & Reputation"
                      ? "Make review follow-up feel easy and natural."
                      : group.category === "Customer Follow-Up"
                        ? "Bring old customers back without making it complicated."
                        : group.category === "Business Operations"
                          ? "See what needs attention instead of running the whole thing from memory."
                          : group.category === "Websites & Landing Pages"
                            ? "Turn confusing homepages into focused quote or start pages."
                            : "Build small tools that support teaching, conversation, and live notes."}
            </p>
          </div>

          <div
            className={`demo-card-grid${group.demos.length === 1 ? " demo-card-grid-single" : ""}`}
          >
            {group.demos.map((demo) => (
              <DemoCard key={demo.slug} demo={demo} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
