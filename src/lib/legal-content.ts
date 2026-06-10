import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  LEGAL_PACKAGE_VERSION,
  legalRoutes,
  type LegalDocumentSlug,
} from "@/data/legal";

const linkMap: Record<string, string> = {
  "./TERMS_OF_SERVICE.md": legalRoutes.terms,
  "./PRIVACY_POLICY.md": legalRoutes.privacy,
  "./REFUND_POLICY.md": legalRoutes.refund,
  "./AI_DISCLOSURE.md": "/ai-disclosure",
  "./INTELLECTUAL_PROPERTY_POLICY.md": "/intellectual-property",
  "./SERVICE_AGREEMENT_TEMPLATE.md": "/service-agreement",
  "./COMPLIANCE_CHECKLIST.md": "/compliance",
  "./RISK_ASSESSMENT.md": "/risk-assessment",
  "./BUSINESS_RECOMMENDATIONS.md": "/business-recommendations",
  "./README.md": "/legal",
};

export function rewriteLegalLinks(markdown: string) {
  let output = markdown;

  for (const [from, to] of Object.entries(linkMap)) {
    output = output.replaceAll(`](${from})`, `](${to})`);
  }

  return output;
}

export async function getLegalDocument(
  slug: LegalDocumentSlug,
  version: string = LEGAL_PACKAGE_VERSION,
) {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "legal",
    `v${version}`,
    `${slug}.md`,
  );

  const raw = await readFile(filePath, "utf8");
  const content = rewriteLegalLinks(raw);

  return {
    slug,
    version,
    content,
  };
}