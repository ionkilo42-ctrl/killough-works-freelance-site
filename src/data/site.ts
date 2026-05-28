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
  imagePath: string;
  date: string;
  slug: string;
};

export const coreCategories: CoreCategory[] = [
  {
    title: "Field Notes",
    summary: "Simple insights. Useful clarity.",
  },
  {
    title: "Tiny Builds",
    summary: "Small tools. Big relief.",
  },
  {
    title: "Intake Repair",
    summary: "Clear intake. Better results.",
  },
  {
    title: "Signal Maps",
    summary: "Find the real call. Follow the signal.",
  },
];

export const featuredVisuals: FeaturedVisual[] = [
  {
    category: "Field Notes",
    imagePath: "/images/field-notes/clarity-is-a-service.jpg",
    title: "Clarity is a service.",
    excerpt: "A clearer offer, page, or intake path is often the smallest build that changes the whole conversation.",
    cta: "See what I build",
  },
  {
    category: "Tiny Builds",
    imagePath: "/images/field-notes/tiny-build-back-and-forth.jpg",
    title: "A small tool that saves a back-and-forth.",
    excerpt: "One tiny request form or quote helper can remove five messy follow-up messages from every lead.",
    cta: "Send me the messy version",
  },
  {
    category: "Signal Maps",
    imagePath: "/images/field-notes/follow-the-signal.jpg",
    title: "Follow the signal, not the noise.",
    excerpt: "The useful move is usually smaller than the client first imagines and more practical than a giant rebuild.",
  },
];

export const fieldNotes: FieldNote[] = [
  {
    title: "Clarity is a service.",
    category: "Field Notes",
    excerpt: "Useful clarity can be delivered through a headline, a form, a card, or a single page that makes the right next step obvious.",
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
    excerpt: "Small useful builds before giant projects means you get trust, screenshots, and working evidence before anyone talks about a large scope.",
    imagePath: "/images/field-notes/starter-fixes-create-proof.jpg",
    date: "May 2026",
    slug: "starter-fixes-create-proof",
  },
  {
    title: "Send a screenshot, not a polished brief.",
    category: "Field Notes",
    excerpt: "A rough caption, a busted lead form, or a screenshot of a messy inbox is enough to start shaping the smallest useful fix.",
    imagePath: "/images/field-notes/send-a-screenshot.jpg",
    date: "May 2026",
    slug: "send-a-screenshot-not-a-polished-brief",
  },
  {
    title: "Better intake makes better work possible.",
    category: "Intake Repair",
    excerpt: "When people know what to send and where to send it, the whole project gets easier to price, build, and deliver.",
    imagePath: "/images/field-notes/better-intake-better-work.jpg",
    date: "May 2026",
    slug: "better-intake-makes-better-work-possible",
  },
];

export const starterPricing = [
  "Starter fixes from $10-$35",
  "Small useful builds before giant projects",
  "Send a screenshot, post, caption, rough offer, or half-broken lead flow.",
];

export const processSteps = [
  "You send the messy version.",
  "I find the bottleneck and the smallest useful fix.",
  "We ship the first practical version before the giant project talk.",
];

export const practicalSignals = [
  "Useful first",
  "Practical magic",
  "Low-friction starts",
  "Built for real people",
];
