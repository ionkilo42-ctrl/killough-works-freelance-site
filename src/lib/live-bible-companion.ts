export type BibleCompanionReference = {
  id: string;
  display: string;
  bookId: string;
  bookName: string;
  chapter: number;
  verseStart?: number;
  verseEnd?: number;
  reason: string;
};

export type BiblePassageVerse = {
  number: number;
  text: string;
};

export type BiblePassageResult = {
  status: "ready" | "fallback";
  reference: BibleCompanionReference;
  translation: string;
  sourceUrl: string;
  verses: BiblePassageVerse[];
  fallbackMessage?: string;
};

type ReferencePattern = Omit<BibleCompanionReference, "id" | "reason"> & {
  id: string;
  patterns: RegExp[];
  reason: string;
};

type Fetcher = (input: string, init?: RequestInit) => Promise<Response>;

type FetchBiblePassageOptions = {
  fetcher?: Fetcher;
  signal?: AbortSignal;
};

type ChapterContentItem =
  | string
  | {
      text?: string;
      heading?: string;
      lineBreak?: true;
      noteId?: number;
    };

type ChapterVerse = {
  type: "verse";
  number: number;
  content: ChapterContentItem[];
};

type ChapterResponse = {
  translation?: {
    shortName?: string;
  };
  chapter?: {
    content?: Array<ChapterVerse | { type: string }>;
  };
};

const HELLO_AO_TRANSLATION = "BSB";
const HELLO_AO_API_BASE = "https://bible.helloao.org/api";

const directReferences: ReferencePattern[] = [
  {
    id: "john-3-16",
    display: "John 3:16",
    bookId: "JHN",
    bookName: "John",
    chapter: 3,
    verseStart: 16,
    verseEnd: 16,
    reason: "Detected reference: John 3:16",
    patterns: [/\b(?:john|jn)\s*3\s*:\s*16\b/i],
  },
  {
    id: "romans-8",
    display: "Romans 8",
    bookId: "ROM",
    bookName: "Romans",
    chapter: 8,
    reason: "Detected reference: Romans 8",
    patterns: [/\b(?:romans|rom)\s*8\b(?!\s*:)/i],
  },
  {
    id: "2-samuel-11",
    display: "2 Samuel 11",
    bookId: "2SA",
    bookName: "2 Samuel",
    chapter: 11,
    reason: "Detected reference: 2 Samuel 11",
    patterns: [/\b(?:2\s*samuel|2\s*sam|second\s+samuel|ii\s+samuel)\s*11\b/i],
  },
  {
    id: "genesis-1-1-3",
    display: "Genesis 1:1-3",
    bookId: "GEN",
    bookName: "Genesis",
    chapter: 1,
    verseStart: 1,
    verseEnd: 3,
    reason: "Detected reference: Genesis 1:1-3",
    patterns: [/\b(?:genesis|gen)\s*1\s*:\s*1\s*(?:-|to)\s*3\b/i],
  },
];

const topicReferences: ReferencePattern[] = [
  {
    id: "2-samuel-11",
    display: "2 Samuel 11",
    bookId: "2SA",
    bookName: "2 Samuel",
    chapter: 11,
    reason: "Matched phrase: David and Bathsheba",
    patterns: [/\bdavid\s+and\s+bathsheba\b/i],
  },
  {
    id: "john-4",
    display: "John 4",
    bookId: "JHN",
    bookName: "John",
    chapter: 4,
    reason: "Matched phrase: woman at the well",
    patterns: [/\bwoman\s+at\s+the\s+well\b/i],
  },
  {
    id: "ephesians-6",
    display: "Ephesians 6",
    bookId: "EPH",
    bookName: "Ephesians",
    chapter: 6,
    reason: "Matched phrase: armor of God",
    patterns: [/\barmor\s+of\s+god\b/i],
  },
  {
    id: "luke-15",
    display: "Luke 15",
    bookId: "LUK",
    bookName: "Luke",
    chapter: 15,
    reason: "Matched phrase: prodigal son",
    patterns: [/\bprodigal\s+son\b/i],
  },
  {
    id: "matthew-5",
    display: "Matthew 5",
    bookId: "MAT",
    bookName: "Matthew",
    chapter: 5,
    reason: "Matched phrase: Sermon on the Mount",
    patterns: [/\bsermon\s+on\s+the\s+mount\b/i],
  },
  {
    id: "genesis-1",
    display: "Genesis 1",
    bookId: "GEN",
    bookName: "Genesis",
    chapter: 1,
    reason: "Matched phrase: creation",
    patterns: [/\bcreation\b/i],
  },
  {
    id: "genesis-4",
    display: "Genesis 4",
    bookId: "GEN",
    bookName: "Genesis",
    chapter: 4,
    reason: "Matched phrase: Cain and Abel",
    patterns: [/\bcain\s+and\s+abel\b/i],
  },
];

export const bibleCompanionSamples = [
  {
    label: "John 3:16",
    transcript:
      "Pastor mentioned John 3:16 while talking about love, trust, and what it means that God gave his Son.",
  },
  {
    label: "David and Bathsheba",
    transcript:
      "The group is discussing David and Bathsheba, power, confession, and what happens when someone tries to hide sin.",
  },
  {
    label: "Creation thread",
    transcript:
      "Someone asked about creation, Genesis 1:1-3, and how Cain and Abel fits into the early chapters of Genesis.",
  },
  {
    label: "Armor of God",
    transcript:
      "The conversation moved to the armor of God, prayer, and how Romans 8 speaks to fear and endurance.",
  },
] as const;

export const liveListeningTranscript = [
  "We are talking through a counseling-style conversation.",
  "Someone brought up the woman at the well and feeling seen.",
  "Another person connected it to John 3:16 and the love of God.",
  "Now they are asking about the prodigal son and what repentance looks like.",
  "A final comment mentions the Sermon on the Mount and the armor of God.",
] as const;

function toReference(pattern: ReferencePattern): BibleCompanionReference {
  return {
    id: pattern.id,
    display: pattern.display,
    bookId: pattern.bookId,
    bookName: pattern.bookName,
    chapter: pattern.chapter,
    verseStart: pattern.verseStart,
    verseEnd: pattern.verseEnd,
    reason: pattern.reason,
  };
}

export function detectBibleCompanionMatches(transcript: string): BibleCompanionReference[] {
  const normalizedTranscript = transcript.trim();

  if (!normalizedTranscript) {
    return [];
  }

  const matches = new Map<string, BibleCompanionReference>();

  [...directReferences, ...topicReferences].forEach((pattern) => {
    if (!matches.has(pattern.id) && pattern.patterns.some((matcher) => matcher.test(normalizedTranscript))) {
      matches.set(pattern.id, toReference(pattern));
    }
  });

  return Array.from(matches.values());
}

function passageUrl(reference: BibleCompanionReference) {
  return `${HELLO_AO_API_BASE}/${HELLO_AO_TRANSLATION}/${reference.bookId}/${reference.chapter}.json`;
}

function formatContentItem(item: ChapterContentItem) {
  if (typeof item === "string") {
    return item;
  }

  if ("text" in item && item.text) {
    return item.text;
  }

  if ("heading" in item && item.heading) {
    return item.heading;
  }

  if ("lineBreak" in item && item.lineBreak) {
    return "\n";
  }

  return "";
}

function fallbackPassage(reference: BibleCompanionReference, sourceUrl: string): BiblePassageResult {
  return {
    status: "fallback",
    reference,
    translation: HELLO_AO_TRANSLATION,
    sourceUrl,
    verses: [],
    fallbackMessage: `We could not load ${reference.display} from the Bible API right now. Keep the reference in the feed and try again shortly.`,
  };
}

export async function fetchBiblePassage(
  reference: BibleCompanionReference,
  options: FetchBiblePassageOptions = {},
): Promise<BiblePassageResult> {
  const sourceUrl = passageUrl(reference);
  const fetcher = options.fetcher ?? fetch;

  try {
    const response = await fetcher(sourceUrl, { signal: options.signal });

    if (!response.ok) {
      return fallbackPassage(reference, sourceUrl);
    }

    const data = (await response.json()) as ChapterResponse;
    const verses =
      data.chapter?.content
        ?.filter((item): item is ChapterVerse => item.type === "verse")
        .filter((verse) => {
          if (reference.verseStart === undefined) {
            return true;
          }

          const verseEnd = reference.verseEnd ?? reference.verseStart;
          return verse.number >= reference.verseStart && verse.number <= verseEnd;
        })
        .map((verse) => ({
          number: verse.number,
          text: verse.content.map(formatContentItem).join("").replace(/\s+/g, " ").trim(),
        }))
        .filter((verse) => verse.text.length > 0) ?? [];

    if (verses.length === 0) {
      return fallbackPassage(reference, sourceUrl);
    }

    return {
      status: "ready",
      reference,
      translation: data.translation?.shortName ?? HELLO_AO_TRANSLATION,
      sourceUrl,
      verses,
    };
  } catch {
    return fallbackPassage(reference, sourceUrl);
  }
}
