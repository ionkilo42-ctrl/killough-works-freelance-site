import { describe, expect, it } from "vitest";

import { validateIntake } from "@/lib/intake";

describe("validateIntake", () => {
  it("accepts the lighter starter-build intake payload", () => {
    expect(() =>
      validateIntake({
        name: "Jon",
        email: "jon@example.com",
        business: "Tree service quote flow",
        website: "instagram.com/treecrew",
        summary: "Need a better form for photo quotes.",
        budget: "$10-$35 — Starter fix",
      }),
    ).not.toThrow();
  });
});
