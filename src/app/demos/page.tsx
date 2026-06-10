import type { Metadata } from "next";
import Link from "next/link";

import { BrandLockup } from "@/components/brand-lockup";
import { DemoCard } from "@/components/demo-card";
import { getPublicDemosByCategory } from "@/data/demos";

export const metadata: Metadata = {
  title: "Demos | Killough Works",
  description:
    "Working prototypes of intake flows, booking systems, dashboards, and conversion tools from Killough Works.",
};

export default function DemosPage() {
  const demosByCategory = getPublicDemosByCategory();

  return (
    <main className="shell portfolio-editorial">
      <header className="site-header">
        <div className="topline">
          <BrandLockup note="Build. Explore. Collaborate." />
          <nav className="route-nav" aria-label="Demos page links">
            <Link href="/">Home</Link>
            <Link href="/field-notes">Field Notes</Link>
            <Link className="route-nav-cta" href="/#contact">
              Talk
            </Link>
          </nav>
        </div>
      </header>

      <div className="intro">
        <p className="status-line" role="status">
          Killough Works is currently operating in a selective collaboration and portfolio phase.
          New engagements are considered individually. Scoped client work is still welcome by
          conversation.
        </p>
        <p className="block-eyebrow">Portfolio prototypes</p>
        <h1>Working prototypes across real business workflows.</h1>
        <p className="intro-detail">
          Interactive demos of quote forms, booking flows, deposit steps, review tools, landing
          pages, and follow-up systems — built to show how I design and ship practical digital
          tools.
        </p>
        <nav className="intro-nav" aria-label="Jump to demo categories">
          {demosByCategory.map((group) => (
            <a
              key={group.category}
              href={`#${group.category.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`}
            >
              {group.category}
            </a>
          ))}
        </nav>
      </div>

      {demosByCategory.map((group) => (
        <section
          key={group.category}
          id={group.category.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}
          className="editorial-block"
        >
          <h2>{group.category}</h2>
          <div className="work-entry-list">
            {group.demos.map((demo) => (
              <DemoCard key={demo.slug} demo={demo} variant="editorial" />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}