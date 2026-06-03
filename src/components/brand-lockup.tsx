type BrandLockupProps = {
  note?: string;
};

export function BrandLockup({ note }: BrandLockupProps) {
  return (
    <div className="brand-lockup" aria-label="Killough Works brand">
      <div className="brand-seal" aria-hidden="true">
        <span className="brand-seal-star" />
        <span className="brand-seal-k">K</span>
        <span className="brand-seal-w">W</span>
      </div>
      <div className="brand-lockup-copy">
        <p className="eyebrow">Killough Works</p>
        <p className="identity-note">{note ?? "Design with intent. Build with purpose."}</p>
      </div>
    </div>
  );
}
