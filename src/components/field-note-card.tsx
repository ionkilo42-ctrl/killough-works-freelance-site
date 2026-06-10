import type { FieldNote } from "@/data/site";

type FieldNoteCardProps = {
  note: FieldNote;
  variant?: "widget" | "article" | "editorial";
};

export function FieldNoteCard({ note, variant = "editorial" }: FieldNoteCardProps) {
  if (variant === "widget") {
    return (
      <article className="note-card workshop-note-card" id={note.slug}>
        <div className="card-copy">
          <div className="note-badges">
            <span className="note-category-badge">{note.category}</span>
            <span className="note-type-badge">{note.label}</span>
          </div>
          <h3>{note.title}</h3>
          <div className="repair-note-fields">
            <p>
              <strong>Before:</strong> {note.before}
            </p>
            <p>
              <strong>After:</strong> {note.after}
            </p>
            <p>
              <strong>Why it matters:</strong> {note.why}
            </p>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "article") {
    return (
      <article className="field-note-article" id={note.slug}>
        <p className="field-note-meta">
          <span>{note.category}</span>
          <span aria-hidden="true">·</span>
          <span>{note.label}</span>
        </p>
        <h3 className="field-note-title">{note.title}</h3>
        <p className="field-note-summary">{note.why}</p>
      </article>
    );
  }

  return (
    <article className="note-entry" id={note.slug}>
      <h3 className="note-entry-title">{note.title}</h3>
      <p className="note-entry-meta">
        {note.category} · {note.label}
      </p>
      <p className="note-entry-summary">{note.why}</p>
    </article>
  );
}