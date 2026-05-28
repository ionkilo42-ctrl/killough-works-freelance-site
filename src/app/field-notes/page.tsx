import { FieldNoteCard } from "@/components/field-note-card";
import { fieldNotes } from "@/data/site";

export default function FieldNotesPage() {
  return (
    <main className="shell innovation-shell">
      <section className="section field-notes-page">
        <div className="topline">
          <div>
            <p className="eyebrow">Killough Works</p>
            <p className="identity-note">Field Notes archive for small coded tools and practical clarity.</p>
          </div>
          <nav className="route-nav" aria-label="Field Notes links">
            <a href="/">Home</a>
            <a href="/#contact">Send it</a>
            <a className="route-nav-cta" href="/pay">
              Pay / Start
            </a>
          </nav>
        </div>

        <div className="section-heading page-heading">
          <p className="section-label">Field Notes</p>
          <h1>Field Notes</h1>
          <p>
            A working shelf of small coded tools, intake repairs, and practical signals. Three
            notes are illustrated now; the rest still hold as blueprint proofs.
          </p>
        </div>

        <div className="notes-grid full-notes-grid">
          {fieldNotes.map((note) => (
            <FieldNoteCard note={note} key={note.slug} />
          ))}
        </div>
      </section>
    </main>
  );
}
