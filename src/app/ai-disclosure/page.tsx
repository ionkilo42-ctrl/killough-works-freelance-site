import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { legalDocuments } from "@/data/legal";
import { getLegalDocument } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "AI Disclosure | Killough Works",
  description: legalDocuments["ai-disclosure"].description,
};

export default async function AiDisclosurePage() {
  const document = await getLegalDocument("ai-disclosure");

  return <LegalPage slug="ai-disclosure" version={document.version} content={document.content} />;
}