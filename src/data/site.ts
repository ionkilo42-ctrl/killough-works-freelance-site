export type CoreCategory = {
  title: string;
  summary: string;
};

export type FeaturedVisual = {
  category: string;
  imagePath: string;
  title: string;
  excerpt: string;
  cta?: string;
};

export type FieldNote = {
  title: string;
  category: string;
  excerpt: string;
  imagePath?: string;
  date: string;
  slug: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  summary: string;
};

export const coreCategories: CoreCategory[] = [
  {
    title: "Unclear offers",
    summary: "Turn the rough pitch into a clear next step.",
  },
  {
    title: "Messy intake",
    summary: "Make it easier for people to send the right details.",
  },
  {
    title: "Quote back-and-forth",
    summary: "Collect context once instead of chasing it in messages.",
  },
  {
    title: "Simple pages, forms, and tools",
    summary: "Ship a small useful version before it becomes a giant project.",
  },
];

export const featuredVisuals: FeaturedVisual[] = [
  {
    category: "Field Notes",
    imagePath: "/images/field-notes/clarity-is-a-service.jpg",
    title: "Clarity is a service.",
    excerpt: "A clear frame can make the next useful move easier to see.",
  },
  {
    category: "Tiny Builds",
    imagePath: "/images/field-notes/tiny-build-back-and-forth.jpg",
    title: "A small tool that saves a back-and-forth.",
    excerpt: "The smallest working tool can remove the same repeated question.",
  },
  {
    category: "Signal Maps",
    imagePath: "/images/field-notes/follow-the-signal.jpg",
    title: "Follow the signal, not the noise.",
    excerpt: "A messy flow usually has one real bottleneck worth fixing first.",
  },
];

export const fieldNotes: FieldNote[] = [
  {
    title: "Clarity is a service.",
    category: "Field Notes",
    excerpt: "Useful clarity can live in a headline, a form, a card, or a single page that makes the right next step obvious.",
    imagePath: "/images/field-notes/clarity-is-a-service.jpg",
    date: "May 2026",
    slug: "clarity-is-a-service",
  },
  {
    title: "A small tool that saves a back-and-forth.",
    category: "Tiny Builds",
    excerpt: "The fastest win is often a tiny system that collects the right details once instead of asking for them three different ways.",
    imagePath: "/images/field-notes/tiny-build-back-and-forth.jpg",
    date: "May 2026",
    slug: "small-tool-saves-back-and-forth",
  },
  {
    title: "Follow the signal, not the noise.",
    category: "Signal Maps",
    excerpt: "If the page, post, or inbox feels noisy, the work is to find the real decision point and build around that.",
    imagePath: "/images/field-notes/follow-the-signal.jpg",
    date: "May 2026",
    slug: "follow-the-signal-not-the-noise",
  },
  {
    title: "Starter fixes create proof before giant projects.",
    category: "Intake Repair",
    excerpt: "A small working version creates proof before anyone turns the problem into a large scope.",
    date: "May 2026",
    slug: "starter-fixes-create-proof",
  },
  {
    title: "Send a screenshot, not a polished brief.",
    category: "Field Notes",
    excerpt: "A rough caption, a busted lead form, or a screenshot of a messy inbox is enough to start.",
    date: "May 2026",
    slug: "send-a-screenshot-not-a-polished-brief",
  },
  {
    title: "Better intake makes better work possible.",
    category: "Intake Repair",
    excerpt: "When people know what to send and where to send it, the whole project gets easier to price and deliver.",
    date: "May 2026",
    slug: "better-intake-makes-better-work-possible",
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Send what exists",
    summary: "A screenshot, post, form, page, or rough idea is enough to start.",
  },
  {
    number: "02",
    title: "Find the bottleneck",
    summary: "I map the real friction point and identify the smallest useful fix.",
  },
  {
    number: "03",
    title: "Ship the first version",
    summary: "We build something practical before turning it into a giant project.",
  },
];
