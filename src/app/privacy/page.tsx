import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { legalDocuments } from "@/data/legal";
import { getLegalDocument } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Privacy Policy | Killough Works",
  description: legalDocuments.privacy.description,
};

export default async function PrivacyPage() {
  const document = await getLegalDocument("privacy");

  return <LegalPage slug="privacy" version={document.version} content={document.content} />;
}