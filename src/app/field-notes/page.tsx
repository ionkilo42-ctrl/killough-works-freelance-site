import Link from "next/link";

import { BrandLockup } from "@/components/brand-lockup";
import { FieldNoteCard } from "@/components/field-note-card";
import { publicFieldNotes } from "@/data/site";

export default function FieldNotesPage() {
  return (
    <main className="shell portfolio-editorial">
      <header className="site-header">
        <div className="topline">
          <BrandLockup note="Build. Explore. Collaborate." />
          <nav className="route-nav" aria-label="Field Notes links">
            <Link href="/">Home</Link>
            <Link href="/demos">Prototypes</Link>
            <Link className="route-nav-cta" href="/#contact">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <div className="intro">
        <p className="block-eyebrow">Build Notes</p>
        <h1>How I think about product problems</h1>
        <p className="intro-detail">
          Secondary notes on intake design, offer clarity, workflow friction, and small interface
          decisions — supporting context, not primary portfolio proof.
        </p>
      </div>

      <div className="note-entry-list note-entry-list-archive">
        {publicFieldNotes.map((note) => (
          <FieldNoteCard note={note} key={note.slug} variant="editorial" />
        ))}
      </div>

      <p className="block-cta">
        <Link className="text-link" href="/#contact">
          Contact →
        </Link>
        <span aria-hidden="true"> · </span>
        <Link className="text-link" href="/">
          Back to homepage
        </Link>
      </p>
    </main>
  );
}