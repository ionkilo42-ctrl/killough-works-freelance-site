import { describe, expect, it } from "vitest";

import { getLegalDocument } from "@/lib/legal-content";

const legalSlugs = [
  "terms",
  "privacy",
  "refund",
  "ai-disclosure",
  "intellectual-property",
  "service-agreement",
] as const;

describe("legal routes content", () => {
  it.each(legalSlugs)("loads published document %s without placeholders", async (slug) => {
    const document = await getLegalDocument(slug);

    expect(document.version).toBe("1.1");
    expect(document.content).toContain("June 10, 2026");
    expect(document.content).not.toContain("[EFFECTIVE DATE]");
    expect(document.content).not.toContain("[LEGAL ENTITY NAME AFTER LLC FORMATION]");
    expect(document.content).not.toContain("**[ATTORNEY REVIEW]:**");
  });

  it("rewrites terms cross-links to live routes", async () => {
    const document = await getLegalDocument("terms");

    expect(document.content).toContain("](/privacy)");
    expect(document.content).toContain("](/refund)");
    expect(document.content).toContain("](/ai-disclosure)");
    expect(document.content).toContain("](/intellectual-property)");
    expect(document.content).toContain("](/service-agreement)");
    expect(document.content).not.toContain("](./AI_DISCLOSURE.md)");
  });
});