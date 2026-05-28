import { FieldNoteCard } from "@/components/field-note-card";
import { fieldNotes } from "@/data/site";

export default function FieldNotesPage() {
  return (
    <main className="shell innovation-shell">
      <section className="section field-notes-page">
        <div className="topline">
          <div>
            <p className="eyebrow">Killough Works</p>
            <p className="identity-note">A working archive for practical clarity.</p>
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
            A working archive of small coded tools, intake repairs, visual systems, and practical
            signals for messy business moments.
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
