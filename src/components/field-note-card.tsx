import type { FieldNote } from "@/data/site";

import { BrandedImagePanel } from "@/components/branded-image-panel";

type FieldNoteCardProps = {
  note: FieldNote;
};

export function FieldNoteCard({ note }: FieldNoteCardProps) {
  return (
    <article className="note-card" id={note.slug}>
      <BrandedImagePanel imagePath={note.imagePath} title={note.title} category={note.category} />
      <div className="card-copy">
        <div className="card-meta">
          <span>{note.category}</span>
          <span>{note.date}</span>
        </div>
        <h3>{note.title}</h3>
        <p>{note.excerpt}</p>
      </div>
    </article>
  );
}
