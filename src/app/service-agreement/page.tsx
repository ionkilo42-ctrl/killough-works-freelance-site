import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { legalDocuments } from "@/data/legal";
import { getLegalDocument } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Service Agreement Template | Killough Works",
  description: legalDocuments["service-agreement"].description,
};

export default async function ServiceAgreementPage() {
  const document = await getLegalDocument("service-agreement");

  return <LegalPage slug="service-agreement" version={document.version} content={document.content} />;
}