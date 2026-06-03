export type CoreCategory = {
  title: string;
  summary: string;
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

export type PricingTier = {
  title: string;
  badge?: string;
  bestFor: string;
  description: string;
  deliverable?: string;
  handoff?: string;
  includes: string[];
  timeline?: string;
  cta: string;
  href: string;
  featured?: boolean;
};

export type AvailabilitySlot = {
  title: string;
  note: string;
};

export type StarterFix = {
  title: string;
  label: string;
  before: string;
  after: string;
  why: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const contactDetails = {
  name: "Jonathan",
  email: "jonathan@killough.works",
  directLabel: "Direct contact",
  mailtoHref: "mailto:jonathan@killough.works?subject=Killough%20Works%20Inquiry",
  location: "South Jersey",
  trustBlurb:
    "Killough Works is run by Jonathan, helping local service businesses turn messy websites, forms, profiles, and customer handoffs into clearer digital systems.",
} as const;

export const coreCategories: CoreCategory[] = [
  {
    title: "Broken contact forms",
    summary: "Customers try to reach you, but the form is confusing, broken, or too long.",
  },
  {
    title: "Confusing booking pages",
    summary: "People are interested, but they do not know what to click next.",
  },
  {
    title: "Mobile layout problems",
    summary: "Buttons, text, or sections look messy on phones.",
  },
  {
    title: "Quote requests stuck in DMs",
    summary: "You keep chasing basic job details over Facebook, Instagram, or text.",
  },
  {
    title: "Weak calls-to-action",
    summary: "Your page says contact us, but does not guide people to the next step.",
  },
  {
    title: "Missing payment/start links",
    summary: "Customers are ready, but there is no simple way to start or pay.",
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
    title: "Choose the right starting option",
    summary: "Pick Friction Check, First Fix, or Mini Build based on how clear the problem already is.",
  },
  {
    number: "02",
    title: "Complete secure checkout",
    summary: "For Friction Check, checkout is live now. For larger work, I confirm scope before charging more.",
  },
  {
    number: "03",
    title: "Send the messy version",
    summary: "Share your link, screenshots, or notes on the handoff page so I can review the right thing.",
  },
  {
    number: "04",
    title: "Get the clearest next move",
    summary: "I show what customers see, what is getting in the way, and the first practical fix.",
  },
];

export const pricingTiers: PricingTier[] = [
  {
    title: "$35 — Friction Check",
    badge: "Best place to start",
    bestFor: "I know something feels off, but I’m not sure what.",
    description:
      "I review your website, landing page, form, or social profile and send you a short video showing where customers are getting stuck.",
    deliverable: "A 3-minute Loom-style video teardown plus a 3-bullet takeaway email.",
    handoff:
      "Secure your Friction Check. After checkout, you land on a short handoff page where you can send your link, screenshots, and the issue you want reviewed.",
    includes: [
      "Website, form, or social profile review",
      "Lead-loss and trust-friction notes",
      "Clear first-fix recommendation",
      "Simple next step if you want help fixing it",
    ],
    timeline: "Delivered within 48 hours.",
    cta: "Get a $35 Friction Check",
    href: "https://buy.stripe.com/7sY7sLba91fgaTwb0I1ZS02",
    featured: true,
  },
  {
    title: "$75 — First Fix",
    badge: "Most popular for known problems",
    bestFor: "I already know the problem and want one thing fixed.",
    description:
      "I clean up one specific issue: a broken button, weak contact section, messy mobile layout, form cleanup, CTA rewrite, payment link, or simple page fix.",
    handoff: "Message first. I confirm the exact problem and scope before you pay for anything bigger.",
    includes: [
      "One focused website or workflow fix",
      "Cleaner wording or layout",
      "Better next step for customers",
      "Simple handoff when complete",
    ],
    timeline: "Usually handled quickly once access is shared.",
    cta: "Get one fix",
    href: "#start",
  },
  {
    title: "$150+ — Mini Build",
    bestFor: "I need a small system, not just a tweak.",
    description:
      "I build a simple landing page, intake form, quote request flow, review request system, booking helper, or lead-capture setup.",
    handoff: "Message first. This stays small on purpose: a practical page or workflow, not a giant agency project.",
    includes: [
      "Small landing page or workflow",
      "Intake or quote form setup",
      "Payment/start link integration if needed",
      "Lightweight automation where useful",
    ],
    cta: "Plan a mini build",
    href: "#start",
  },
];

export const availabilitySlots: AvailabilitySlot[] = [
  {
    title: "3 Friction Checks",
    note: "Weekly intake is limited so each Friction Check gets focused attention.",
  },
  {
    title: "2 First Fixes",
    note: "Best for one known problem that needs a practical cleanup without bloating the scope.",
  },
  {
    title: "1 Mini Build",
    note: "I only take a small number of builds at a time so the work stays fast, clear, and useful.",
  },
];

export const starterFixes: StarterFix[] = [
  {
    title: "Missing quote button",
    label: "Simple mockup",
    before: "A service page says Call us today but has no clear quote button above the fold.",
    after: "A clear Request a Quote button appears high on the page and leads to the right intake form.",
    why: "The next step becomes obvious before the visitor drifts into DMs or leaves the page.",
  },
  {
    title: "Messy intake process",
    label: "Simple mockup",
    before: "Customers bounce between texts, screenshots, and half-complete messages before you even know the job.",
    after: "One clean intake form collects service, location, photos, and the key job details in one place.",
    why: "You spend less time chasing basics and reply with cleaner quotes faster.",
  },
  {
    title: "Scattered Facebook info",
    label: "Simple mockup",
    before: "Business info lives across posts, captions, and comments, so people have to piece together what you do.",
    after: "A simple service page pulls the offer, service area, pricing cues, and contact step into one organized page.",
    why: "Visitors stop guessing and start taking the next step with more confidence.",
  },
  {
    title: "No next step after payment",
    label: "Simple mockup",
    before: "Checkout ends on a generic success state that does not tell the customer what to send next.",
    after: "A calm handoff page confirms payment, explains the review process, and points to one Send Project Details action.",
    why: "The buyer feels reassured instead of wondering whether the payment disappeared into a void.",
  },
];

export const supportedPlatforms = [
  "WordPress",
  "Squarespace",
  "Wix",
  "Shopify",
  "Carrd",
  "Stripe",
  "Jotform",
  "Google Forms",
  "Facebook / Instagram business pages",
  "Custom websites",
] as const;

export const faqs: FaqItem[] = [
  {
    question: "Do I need to give you my password?",
    answer:
      "Usually, no. For a Friction Check, I only need your public site, page, or profile. For actual fixes, we can use safe handoff steps depending on your platform.",
  },
  {
    question: "What if you can’t fix it?",
    answer:
      "I’ll tell you clearly. If it is outside the scope of a small fix, I’ll recommend the next best step instead of pretending a quick patch can solve a full rebuild problem.",
  },
  {
    question: "Is this a full website redesign?",
    answer:
      "Not by default. Killough Works starts with small, practical fixes first. Bigger builds can happen later, but the first goal is to remove the thing blocking customers from contacting, booking, or paying you.",
  },
  {
    question: "How fast is the $35 Friction Check?",
    answer:
      "Your short video teardown and 3-bullet takeaway email are delivered within 48 hours.",
  },
  {
    question: "Who is this best for?",
    answer:
      "Local service businesses: contractors, landscapers, roofers, HVAC, junk removal, mobile detailers, party rentals, pet services, small shops, and anyone who needs a cleaner path from interest to inquiry.",
  },
  {
    question: "What should I pick if I’m not sure?",
    answer:
      "Start with the $35 Friction Check. I’ll show you the first useful fix before you spend more.",
  },
];
