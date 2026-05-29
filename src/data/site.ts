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
  label: string;
  before: string;
  after: string;
  why: string;
  slug: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  summary: string;
};

export type StarterFix = {
  title: string;
  label: string;
  before: string;
  after: string;
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
    title: "Quote request cleanup",
    category: "Intake Repair",
    label: "Common starter fix",
    before: "DM me for a quote.",
    after: "A short intake path that collects service type, location, photos/link, and urgency.",
    why: "Less back-and-forth before the first reply.",
    slug: "quote-request-cleanup",
  },
  {
    title: "Offer page cleanup",
    category: "Offer Cleanup",
    label: "Example repair",
    before: "A good idea buried inside a social post.",
    after: "A simple page with the offer, price range, next step, and contact/payment path.",
    why: "The next action becomes obvious.",
    slug: "offer-page-cleanup",
  },
  {
    title: "Lead flow repair",
    category: "Lead Flow",
    label: "Common starter fix",
    before: "Messages arrive with missing details.",
    after: "A cleaner form asks the right questions once.",
    why: "Fewer follow-up messages and cleaner quote context.",
    slug: "lead-flow-repair",
  },
  {
    title: "Form friction audit",
    category: "Intake Repair",
    label: "Example repair",
    before: "A long form asks too much too soon.",
    after: "The first step collects only the details needed to qualify the request.",
    why: "Less drop-off and less confusion.",
    slug: "form-friction-audit",
  },
  {
    title: "Small page/tool",
    category: "Tiny Build",
    label: "Common starter fix",
    before: "A repeated manual explanation happens in every DM.",
    after: "A small page or helper tool explains the options once.",
    why: "The owner stops retyping the same answer.",
    slug: "small-page-tool",
  },
  {
    title: "Payment/contact path cleanup",
    category: "Conversion Path",
    label: "Example repair",
    before: "A visitor does not know whether to message, book, or pay.",
    after: "The page separates submit-first, quote-next, and payment-after-agreement.",
    why: "Fewer trust leaks.",
    slug: "payment-contact-path-cleanup",
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

export const starterFixes: StarterFix[] = [
  {
    title: "Quote request cleanup",
    label: "Common starter fix",
    before: "DM me for a quote.",
    after: "A short intake path that collects service type, location, photos/link, and urgency.",
  },
  {
    title: "Offer page cleanup",
    label: "Example fix",
    before: "A good idea buried in a social post.",
    after: "A simple page with the offer, price range, next step, and payment/contact link.",
  },
  {
    title: "Lead flow repair",
    label: "Common starter fix",
    before: "Back-and-forth messages with missing details.",
    after: "A cleaner form that asks the right questions once.",
  },
];
