import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { legalDocuments } from "@/data/legal";
import { getLegalDocument } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Terms of Service | Killough Works",
  description: legalDocuments.terms.description,
};

export default async function TermsPage() {
  const document = await getLegalDocument("terms");

  return <LegalPage slug="terms" version={document.version} content={document.content} />;
}