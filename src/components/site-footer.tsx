import Link from "next/link";

import { contactDetails } from "@/data/site";
import { legalRoutes } from "@/data/legal";

export function SiteFooter() {
  return (
    <footer className="section section-tray site-footer">
      <div>
        <p className="section-label">Killough Works</p>
        <p className="footer-line">Website handyman for local businesses.</p>
        <p className="footer-line">Based in South Jersey. Fixing websites nationwide.</p>
      </div>
      <div className="footer-legal-links" aria-label="Legal links">
        <Link href={legalRoutes.terms}>Terms</Link>
        <Link href={legalRoutes.privacy}>Privacy</Link>
        <Link href={legalRoutes.refund}>Refund</Link>
      </div>
      <p className="footer-contact">
        {contactDetails.directLabel}:{" "}
        <a className="text-link" href={contactDetails.mailtoHref}>
          {contactDetails.email}
        </a>
      </p>
    </footer>
  );
}