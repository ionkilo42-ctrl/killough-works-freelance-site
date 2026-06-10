import Link from "next/link";

import type { DemoDefinition } from "@/data/demos";

type DemoCardProps = {
  demo: DemoDefinition;
  variant?: "full" | "compact" | "editorial" | "portfolio";
};

export function DemoCard({ demo, variant = "full" }: DemoCardProps) {
  if (variant === "portfolio") {
    return (
      <Link
        href={`/demos/${demo.slug}`}
        className="prototype-preview-row"
        aria-label={`Open prototype: ${demo.title}`}
      >
        <span className="prototype-preview-copy">
          <span className="prototype-preview-eyebrow">{demo.category}</span>
          <span className="prototype-preview-title">{demo.title}</span>
          <span className="prototype-preview-summary">{demo.cardDescription}</span>
        </span>
        <span className="prototype-preview-action">Open prototype →</span>
      </Link>
    );
  }

  if (variant === "editorial") {
    return (
      <article className="work-entry work-entry-demo">
        <h3 className="work-entry-title">
          <Link href={`/demos/${demo.slug}`}>{demo.title}</Link>
        </h3>
        <p className="work-entry-eyebrow">{demo.category}</p>
        <p className="work-entry-summary">{demo.cardDescription}</p>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="demo-preview-row">
        <p className="demo-preview-kicker">{demo.category}</p>
        <h3 className="demo-preview-title">
          <Link href={`/demos/${demo.slug}`}>{demo.title}</Link>
        </h3>
        <p className="demo-preview-description">{demo.cardDescription}</p>
        <Link className="text-link demo-preview-link" href={`/demos/${demo.slug}`}>
          View demo →
        </Link>
      </article>
    );
  }

  return (
    <article className="pricing-card demo-card">
      <p className="card-kicker">{demo.category}</p>
      <h2>{demo.title}</h2>
      <p>{demo.cardDescription}</p>
      <p className="demo-card-best-for">
        <strong>Best for:</strong> {demo.bestFor[0]}
      </p>
      <Link
        className="button primary"
        href={`/demos/${demo.slug}`}
        aria-label={`View Demo: ${demo.title}`}
      >
        View Demo
      </Link>
    </article>
  );
}