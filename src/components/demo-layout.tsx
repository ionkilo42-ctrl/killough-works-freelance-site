import Link from "next/link";

import { BrandLockup } from "@/components/brand-lockup";
import { DemoFormSection } from "@/components/demo-form-section";
import type { DemoDefinition } from "@/data/demos";

type DemoLayoutProps = {
  demo: DemoDefinition;
};

export function DemoLayout({ demo }: DemoLayoutProps) {
  return (
    <main className="shell inner-page">
      <section className="subpage-hero">
        <div className="identity-strip utility-strip">
          <BrandLockup note="Digital fix-it shop for local service businesses." />
          <nav className="route-nav" aria-label="Demo page links">
            <span className="route-nav-label">Route</span>
            <div className="route-nav-links">
              <Link href="/">Home</Link>
              <Link href="/demos">All demos</Link>
              <Link className="route-nav-cta" href={demo.ctaHref}>
                Start
              </Link>
            </div>
          </nav>
        </div>

        <div className="hero-ledger demo-hero-ledger">
          <article className="hero-essay pay-essay">
            <p className="micro-note">Simple digital fixes for local service businesses.</p>
            <div className="hero-poster">
              <p className="headline-note">Working demo.</p>
              <div className="headline-stack">
                <span className="poster-mark">KW-DEMO</span>
                <h1>{demo.title}</h1>
              </div>
              <div className="hero-orbit">
                <span>{demo.category.toLowerCase()}</span>
                <span>{demo.demoKind === "landing" ? "screen preview" : "mobile first"}</span>
                <span>{demo.starterPrice.toLowerCase()}</span>
              </div>
            </div>
            <p className="lede">{demo.problem}</p>
            <p className="hero-quick-note">{demo.solutionLine}</p>
            <div className="hero-actions">
              <Link className="button primary" href={demo.ctaHref}>
                Start with this demo idea
              </Link>
              <Link className="button secondary" href="/demos">
                Back to demos
              </Link>
            </div>
          </article>

          <aside className="artifact-card signal-card pay-note-card">
            <p className="panel-label">Category</p>
            <p className="demo-category-tag">{demo.category}</p>
            <p className="panel-label">Best for</p>
            <ul className="signal-bullets">
              {demo.bestFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <DemoFormSection demo={demo} />

      <section className="section section-tray demo-detail-grid">
        <article className="demo-detail-card">
          <p className="section-label">What this fixes</p>
          <h2>What this fixes</h2>
          <ul className="messy-list">
            {demo.whatThisFixes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="demo-detail-card">
          <p className="section-label">Best for</p>
          <h2>Best for</h2>
          <ul className="messy-list">
            {demo.bestFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}
