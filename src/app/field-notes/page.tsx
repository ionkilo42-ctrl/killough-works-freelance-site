import { FieldNoteCard } from "@/components/field-note-card";
import { fieldNotes } from "@/data/site";

export default function FieldNotesPage() {
  return (
    <main className="shell innovation-shell">
      <section className="section section-tray field-notes-page field-notes-archive">
        <div className="topline">
          <div>
            <p className="eyebrow">Killough Works</p>
            <p className="identity-note">Practical workshop notes for messy business problems.</p>
          </div>
          <nav className="route-nav" aria-label="Field Notes links">
            <a href="/">Home</a>
            <a href="/#contact">Send it</a>
            <a className="route-nav-cta" href="/pay">
              Start Here
            </a>
          </nav>
        </div>

        <div className="section-heading page-heading">
          <p className="section-label">Field Notes</p>
          <h1>Field Notes</h1>
          <p>
            A practical archive of common starter fixes: intake cleanup, offer pages, quote-flow
            repairs, and small web tools that turn messy business moments into a clearer next step.
          </p>
        </div>

        <div className="notes-grid full-notes-grid">
          {fieldNotes.map((note) => (
            <FieldNoteCard note={note} key={note.slug} />
          ))}
        </div>

        <div className="field-notes-cta quiet-cta">
          <div>
            <p className="section-label">Back to the intake desk</p>
            <h2>Got a messy business moment of your own?</h2>
            <p>
              Do not wait for it to become a giant project. Send the raw link, rough offer, broken
              form, or screenshot link and I&apos;ll help find the smallest useful fix.
            </p>
          </div>
          <div className="field-notes-cta-actions">
            <a className="button primary" href="/#contact">
              Submit a fix
            </a>
            <a className="button tertiary" href="/">
              Back to homepage
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
