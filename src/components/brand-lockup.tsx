import Image from "next/image";

type BrandLockupProps = {
  note?: string;
};

export function BrandLockup({ note }: BrandLockupProps) {
  return (
    <div className="brand-lockup" aria-label="Killough Works brand">
      <div className="brand-lockup-head">
        <span className="brand-mark-frame brand-mark-frame-desktop" aria-hidden="true">
          <Image
            className="brand-mark-image"
            src="/brand/killough-works-mark.png"
            alt=""
            width={1254}
            height={1254}
            sizes="48px"
          />
        </span>
        <Image
          className="brand-logo-desktop"
          src="/brand/killough-works-logo-full.png"
          alt="Killough Works logo"
          width={2019}
          height={205}
          sizes="(max-width: 760px) 220px, 360px"
        />
      </div>
      <p className="identity-note">{note ?? "Build. Explore. Collaborate."}</p>
    </div>
  );
}
