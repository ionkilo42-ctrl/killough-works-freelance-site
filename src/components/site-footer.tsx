import Link from "next/link";

import { contactDetails } from "@/data/site";
import { legalRoutes } from "@/data/legal";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p className="section-label">Killough Works</p>
        <p className="footer-line">Build. Explore. Collaborate.</p>
        <p className="footer-line">Portfolio home — South Jersey, nationwide.</p>
      </div>
      <nav className="footer-legal-links" aria-label="Site links">
        <Link href="/#now-building">Feltabout</Link>
        <Link href="/#prototypes">Prototypes</Link>
        <Link href="/#work-samples">Work Samples</Link>
        <Link href="/field-notes">Build Notes</Link>
        <Link href="/#contact">Contact</Link>
      </nav>
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