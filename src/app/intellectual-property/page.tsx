import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { legalDocuments } from "@/data/legal";
import { getLegalDocument } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Intellectual Property Policy | Killough Works",
  description: legalDocuments["intellectual-property"].description,
};

export default async function IntellectualPropertyPage() {
  const document = await getLegalDocument("intellectual-property");

  return (
    <LegalPage slug="intellectual-property" version={document.version} content={document.content} />
  );
}