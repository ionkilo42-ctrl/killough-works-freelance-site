import Link from "next/link";

import { LegalMarkdown } from "@/components/legal-markdown";
import { SiteFooter } from "@/components/site-footer";
import { LEGAL_PACKAGE_VERSION, legalDocuments, legalRoutes } from "@/data/legal";
import type { LegalDocumentSlug } from "@/data/legal";

type LegalPageProps = {
  slug: LegalDocumentSlug;
  version: string;
  content: string;
};

export function LegalPage({ slug, version, content }: LegalPageProps) {
  const meta = legalDocuments[slug];

  return (
    <main className="shell inner-page legal-page-shell">
      <section className="section section-tray legal-document-shell">
        <div className="legal-document-top">
          <p className="section-label">Killough Works</p>
          <h1>{meta.title}</h1>
          <p className="legal-document-lede">{meta.description}</p>
          <nav className="legal-document-nav" aria-label="Legal documents">
            <Link href={legalRoutes.terms}>Terms</Link>
            <Link href={legalRoutes.privacy}>Privacy</Link>
            <Link href={legalRoutes.refund}>Refund</Link>
            <Link href="/">Home</Link>
          </nav>
        </div>

        <article className="legal-document-body">
          <LegalMarkdown content={content} />
        </article>

        <p className="legal-version-footer">
          Killough Works legal package v{LEGAL_PACKAGE_VERSION}.
        </p>
      </section>
      <SiteFooter />
    </main>
  );
}