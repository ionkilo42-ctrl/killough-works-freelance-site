import { describe, expect, it, vi } from "vitest";

import {
  detectBibleCompanionMatches,
  fetchBiblePassage,
} from "@/lib/live-bible-companion";

describe("live Bible companion helpers", () => {
  it("detects supported Bible references and story phrases", () => {
    const matches = detectBibleCompanionMatches(
      "We mentioned John 3:16, Romans 8, Genesis 1:1-3, the woman at the well, and the armor of God.",
    );

    expect(matches.map((match) => match.display)).toEqual([
      "John 3:16",
      "Romans 8",
      "Genesis 1:1-3",
      "John 4",
      "Ephesians 6",
    ]);
    expect(matches.find((match) => match.display === "John 4")?.reason).toBe(
      "Matched phrase: woman at the well",
    );
  });

  it("maps David and Bathsheba to 2 Samuel 11 without duplicating the same passage", () => {
    const matches = detectBibleCompanionMatches(
      "David and Bathsheba came up right after someone said 2 Samuel 11.",
    );

    expect(matches.map((match) => match.display)).toEqual(["2 Samuel 11"]);
    expect(matches[0]?.reason).toContain("2 Samuel 11");
  });

  it("fetches the requested chapter from Hello AO and trims verse ranges", async () => {
    const [reference] = detectBibleCompanionMatches("Read Genesis 1:1-3.");
    const fetcher = vi.fn(async () =>
      new Response(
        JSON.stringify({
          translation: { shortName: "BSB" },
          book: { commonName: "Genesis" },
          chapter: {
            content: [
              { type: "verse", number: 1, content: ["In the beginning God created the heavens and the earth."] },
              { type: "verse", number: 2, content: ["Now the earth was formless and void."] },
              {
                type: "verse",
                number: 3,
                content: ["And God said, ", { text: "Let there be light" }, ", and there was light."],
              },
              { type: "verse", number: 4, content: ["And God saw that the light was good."] },
            ],
          },
        }),
        { status: 200 },
      ),
    );

    const passage = await fetchBiblePassage(reference, { fetcher });

    expect(fetcher).toHaveBeenCalledWith(
      "https://bible.helloao.org/api/BSB/GEN/1.json",
      expect.objectContaining({ signal: undefined }),
    );
    expect(passage.status).toBe("ready");
    expect(passage.verses.map((verse) => verse.number)).toEqual([1, 2, 3]);
    expect(passage.verses[2]?.text).toContain("Let there be light");
  });

  it("returns a graceful fallback when the Bible API fails", async () => {
    const [reference] = detectBibleCompanionMatches("Can we talk through John 3:16?");
    const fetcher = vi.fn(async () => new Response("Not found", { status: 500 }));

    const passage = await fetchBiblePassage(reference, { fetcher });

    expect(passage.status).toBe("fallback");
    expect(passage.fallbackMessage).toMatch(/could not load John 3:16/i);
    expect(passage.sourceUrl).toBe("https://bible.helloao.org/api/BSB/JHN/3.json");
  });
});
