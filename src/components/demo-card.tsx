import Link from "next/link";

import type { DemoDefinition } from "@/data/demos";

type DemoCardProps = {
  demo: DemoDefinition;
};

export function DemoCard({ demo }: DemoCardProps) {
  return (
    <article className="pricing-card demo-card">
      <p className="card-kicker">{demo.category}</p>
      <h2>{demo.title}</h2>
      <p>{demo.cardDescription}</p>
      <p className="demo-card-best-for">
        <strong>Best for:</strong> {demo.bestFor[0]}
      </p>
      <p className="contact-note">{demo.starterPrice}</p>
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
