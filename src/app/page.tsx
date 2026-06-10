import Link from "next/link";

import { BrandLockup } from "@/components/brand-lockup";
import { DemoCard } from "@/components/demo-card";
import { LeadForm } from "@/components/lead-form";
import { NowBuildingProjectBlock } from "@/components/now-building-project";
import { SiteFooter } from "@/components/site-footer";
import { SampleFixGallery } from "@/components/sample-fix-gallery";
import { demoDefinitions } from "@/data/demos";
import {
  contactDetails,
  employmentSignal,
  nowBuildingProject,
  profileLinks,
  starterFixes,
} from "@/data/site";

const rawBookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();
const bookingUrl = rawBookingUrl || "#contact";
const hasBookingUrl = Boolean(rawBookingUrl);

const featuredDemoSlugs = [
  "live-bible-companion",
  "lead-follow-up-dashboard",
  "estimate-approval-flow",
] as const;

const featuredDemos = featuredDemoSlugs
  .map((slug) => demoDefinitions.find((demo) => demo.slug === slug))
  .filter((demo): demo is (typeof demoDefinitions)[number] => Boolean(demo));

const previewWorkSamples = starterFixes.slice(0, 4);

export default function Home() {
  return (
    <main className="shell portfolio-editorial">
      <header className="site-header">
        <div className="topline">
          <BrandLockup note="Build. Explore. Collaborate." />
          <nav className="route-nav" aria-label="Section links">
            <a href="#now-building">Feltabout</a>
            <a href="#prototypes">Prototypes</a>
            <a href="#work-samples">Work Samples</a>
            <a href="#about-jonathan">About</a>
            <a className="route-nav-cta" href="#contact">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <div className="intro">
        <p className="employment-signal" role="status">
          {employmentSignal}
        </p>
        <h1>I build workflows, interfaces, and small systems that turn messy ideas into clear next steps.</h1>
        <p className="intro-summary">
          Killough Works is Jonathan Killough&apos;s portfolio home — active projects, working prototypes,
          and design studies for employers, collaborators, and selective project conversations.
        </p>
        <p className="intro-detail">
          Product thinking, front-end development, and practical automation. Based in South Jersey,
          building nationwide.
        </p>
        <nav className="intro-nav" aria-label="Jump to work">
          <a href="#now-building">Now Building: Feltabout</a>
          <a href="#prototypes">Portfolio prototypes</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>

      <NowBuildingProjectBlock project={nowBuildingProject} />

      <section className="editorial-block" id="prototypes">
        <p className="block-eyebrow">Portfolio Prototypes</p>
        <h2>Interactive proof you can click through</h2>
        <p className="block-lede">
          Working prototypes across Scripture tooling, operations dashboards, and approval workflows —
          built to show how ideas become usable interfaces.
        </p>
        <div className="prototype-preview-list">
          {featuredDemos.map((demo) => (
            <DemoCard key={demo.slug} demo={demo} variant="portfolio" />
          ))}
        </div>
        <p className="block-cta">
          <Link className="text-link" href="/demos">
            Browse all prototypes →
          </Link>
        </p>
      </section>

      <section className="editorial-block" id="work-samples">
        <p className="block-eyebrow">Work Samples</p>
        <h2>Design studies</h2>
        <p className="block-lede">
          Interface exercises showing conversion paths, intake design, and operational clarity — click
          any study to view the full before-and-after.
        </p>
        <SampleFixGallery items={previewWorkSamples} variant="preview" />
      </section>

      <section className="editorial-block" id="about-jonathan">
        <p className="block-eyebrow">About Jonathan</p>
        <h2>Builder, systems thinker, collaborator</h2>
        <p className="block-lede">{contactDetails.trustBlurb}</p>
        <div className="prose-block">
          <h3>How I work</h3>
          <p>
            Plain language, practical scope, and direct collaboration. I design the workflow first,
            then ship the interface or automation that makes it real.
          </p>
          <h3>What I build</h3>
          <p>
            Websites, forms, lead capture, quote systems, lightweight dashboards, payment handoffs,
            and small automations that clarify the next step.
          </p>
          <h3>Who this is for</h3>
          <p>
            Employers reviewing my work, collaborators exploring a build together, and future
            clients who want a conversation before any engagement begins.
          </p>
          <p>
            <a className="text-link" href={profileLinks.githubUrl} target="_blank" rel="noreferrer">
              {profileLinks.githubLabel} →
            </a>
          </p>
        </div>
      </section>

      <section className="editorial-block contact-block" id="contact">
        <p className="block-eyebrow">Contact</p>
        <h2>Get in touch</h2>
        <p className="block-lede">
          Hiring managers and collaborators: a short note is enough. Say if you&apos;re exploring a role,
          a build together, or a selective project conversation.
        </p>
        <ol className="conversation-steps">
          <li>Share whether you&apos;re hiring, collaborating, or exploring a scoped project.</li>
          <li>I reply with questions, context, or next steps.</li>
          <li>If there&apos;s alignment, we figure out what makes sense from there.</li>
        </ol>
        <p className="contact-note">
          {contactDetails.directLabel}:{" "}
          <a className="text-link" href={contactDetails.mailtoHref}>
            {contactDetails.email}
          </a>
        </p>
        <LeadForm />
      </section>

      {hasBookingUrl ? (
        <section className="editorial-block">
          <h2>Prefer a live conversation?</h2>
          <p className="block-lede">
            Book a short call to talk through a role, collaboration, or project idea.
          </p>
          <p className="block-cta">
            <a className="text-link" href={bookingUrl} target="_blank" rel="noreferrer">
              Book a call →
            </a>
          </p>
        </section>
      ) : null}

      <SiteFooter />
    </main>
  );
}