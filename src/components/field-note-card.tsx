import type { FieldNote } from "@/data/site";

type FieldNoteCardProps = {
  note: FieldNote;
};

export function FieldNoteCard({ note }: FieldNoteCardProps) {
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
