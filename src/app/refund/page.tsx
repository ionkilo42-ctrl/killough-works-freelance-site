import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { legalDocuments } from "@/data/legal";
import { getLegalDocument } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Refund Policy | Killough Works",
  description: legalDocuments.refund.description,
};

export default async function RefundPage() {
  const document = await getLegalDocument("refund");

  return <LegalPage slug="refund" version={document.version} content={document.content} />;
}