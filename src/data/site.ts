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
  archived?: boolean;
};

export type NowBuildingProject = {
  name: string;
  status: string;
  summary: string;
  collaborationNote: string;
  githubUrl: string;
  githubLabel: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  summary: string;
};

export type PricingTier = {
  name?: string;
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
  imageSrc: string;
  imageAlt: string;
  checkoutMode?: "live" | "scoped" | "starting-payment";
  featured?: boolean;
};

export type AvailabilitySlot = {
  title: string;
  note: string;
};

export type StarterFix = {
  title: string;
  label: string;
  explanation: string;
  imageSrc: string;
  imageAlt: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const employmentSignal =
  "Currently seeking product, AI, software, and workflow-focused opportunities. Open to collaboration and selective project work." as const;

export const nowBuildingProject: NowBuildingProject = {
  name: "Feltabout",
  status: "Work in progress",
  summary:
    "Safety-first reflection and conversation-prep tooling that helps someone slow down, clarify what happened, and prepare calmer language before a difficult conversation.",
  collaborationNote:
    "An ongoing project Jonathan is building with his father — focused on practical reflection flows, not a product launch.",
  githubUrl: "https://github.com/ionkilo42-ctrl/feltabout",
  githubLabel: "View Feltabout on GitHub",
};

export const profileLinks = {
  githubUrl: "https://github.com/ionkilo42-ctrl/feltabout",
  githubLabel: "GitHub — active projects and experiments",
} as const;

export const contactDetails = {
  name: "Jonathan",
  email: "jonathan@killough.works",
  directLabel: "Direct contact",
  mailtoHref: "mailto:jonathan@killough.works?subject=Killough%20Works%20Inquiry",
  location: "South Jersey",
  trustBlurb:
    "Jonathan Killough builds workflows, interfaces, and small systems. Killough Works is his portfolio home for active projects, prototypes, and experiments — with code and builds on GitHub.",
} as const;

export const studioHighlights: ProcessStep[] = [
  {
    number: "Build",
    title: "",
    summary: "Ship interfaces, flows, and small systems with clear scope.",
  },
  {
    number: "Explore",
    title: "",
    summary: "Prototype ideas through working demos and field notes.",
  },
  {
    number: "Collaborate",
    title: "",
    summary: "Partner with teams, employers, and clients who want a direct builder.",
  },
];

export const studioFaqs: FaqItem[] = [
  {
    question: "What is Killough Works right now?",
    answer:
      "A professional portfolio and project studio. The site showcases what I build, how I think, and how collaboration starts — not a public service menu.",
  },
  {
    question: "How do new engagements work?",
    answer:
      "They begin with a conversation. I consider new work individually during this selective collaboration phase. There is no public checkout on the homepage.",
  },
  {
    question: "Who should reach out?",
    answer:
      "Employers reviewing my work, collaborators with a build or prototype in mind, and future clients who want to discuss scope before committing.",
  },
  {
    question: "Can I see working examples?",
    answer:
      "Yes. The Demos section contains interactive prototypes for intake flows, dashboards, booking, payments, and landing pages.",
  },
  {
    question: "What kind of work do you focus on?",
    answer:
      "Workflow design, front-end builds, lead capture, operational dashboards, payment handoffs, and the small systems that connect product intent to something shippable.",
  },
  {
    question: "How do I contact you?",
    answer:
      "Use the conversation form on this page or email jonathan@killough.works with a short note about what you're exploring.",
  },
];

const stripeLinkDefaults = {
  frictionCheck: "https://buy.stripe.com/28E4gz2DDf66bXA0m41ZS04",
  firstFix: "https://buy.stripe.com/5kQbJ11zzaPQ9Ps7Ow1ZS05",
  miniBuild: "https://buy.stripe.com/aFa4gz6TTaPQ4v81q81ZS03",
} as const;

const envStripeFrictionCheckUrl = process.env.NEXT_PUBLIC_STRIPE_FRICTION_CHECK_URL?.trim();
const envStripeFirstFixUrl = process.env.NEXT_PUBLIC_STRIPE_FIRST_FIX_URL?.trim();
const envStripeMiniBuildUrl = process.env.NEXT_PUBLIC_STRIPE_MINI_BUILD_URL?.trim();

export const stripePaymentLinks = {
  frictionCheck: envStripeFrictionCheckUrl || stripeLinkDefaults.frictionCheck,
  firstFix: envStripeFirstFixUrl || stripeLinkDefaults.firstFix,
  miniBuild: envStripeMiniBuildUrl || stripeLinkDefaults.miniBuild,
} as const;

export const stripeBrandingSettings = {
  primaryColor: "#0f172a",
  accentColor: "#c2410c",
  surfaceColor: "#f7f9fa",
  logoPath: "/public/brand/killough-works-logo-full.png",
  markPath: "/public/brand/killough-works-mark.png",
} as const;

export const paymentFollowUpContact = {
  label: "Payment follow-up",
  email: "jonathan@killough.works",
  mailtoHref:
    "mailto:jonathan@killough.works?subject=Killough%20Works%20Payment%20Follow-Up",
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
    label: "Workflow pattern",
    before: "DM me for a quote.",
    after: "A short intake path that collects service type, location, photos/link, and urgency.",
    why: "Less back-and-forth before the first reply.",
    slug: "quote-request-cleanup",
  },
  {
    title: "Offer page cleanup",
    category: "Offer Cleanup",
    label: "Interface pattern",
    before: "A good idea buried inside a social post.",
    after: "A simple page with the offer, price range, next step, and contact/payment path.",
    why: "The next action becomes obvious.",
    slug: "offer-page-cleanup",
  },
  {
    title: "Lead flow repair",
    category: "Lead Flow",
    label: "Workflow pattern",
    before: "Messages arrive with missing details.",
    after: "A cleaner form asks the right questions once.",
    why: "Fewer follow-up messages and cleaner quote context.",
    slug: "lead-flow-repair",
    archived: true,
  },
  {
    title: "Form friction audit",
    category: "Intake Repair",
    label: "Interface pattern",
    before: "A long form asks too much too soon.",
    after: "The first step collects only the details needed to qualify the request.",
    why: "Less drop-off and less confusion.",
    slug: "form-friction-audit",
  },
  {
    title: "Small page/tool",
    category: "Tiny Build",
    label: "Workflow pattern",
    before: "A repeated manual explanation happens in every DM.",
    after: "A small page or helper tool explains the options once.",
    why: "The owner stops retyping the same answer.",
    slug: "small-page-tool",
  },
  {
    title: "Payment/contact path cleanup",
    category: "Conversion Path",
    label: "Interface pattern",
    before: "A visitor does not know whether to message, book, or pay.",
    after: "The page separates submit-first, quote-next, and payment-after-agreement.",
    why: "Fewer trust leaks.",
    slug: "payment-contact-path-cleanup",
  },
];

export const publicFieldNotes = fieldNotes.filter((note) => !note.archived);

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Choose the right starting option",
    summary: "Pick Friction Check, First Fix, or Mini Build based on how clear the problem already is.",
  },
  {
    number: "02",
    title: "Complete secure checkout",
    summary: "Use the live Stripe checkout for Friction Check, First Fix, or the Mini Build starter payment.",
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
    name: "Friction Check",
    title: "$35 — Friction Check",
    badge: "Best place to start",
    bestFor: "I know something feels off, but I’m not sure what.",
    description:
      "A focused review of your page, post, link, offer, or lead flow. I’ll identify what is confusing, missing, or costing you responses and give you the clearest first fix.",
    deliverable: "A 3-minute Loom-style video teardown plus a 3-bullet takeaway email.",
    handoff:
      "Secure your Friction Check. After checkout, you land on a short handoff page where you can send your link, screenshots, and the issue you want reviewed.",
    includes: [
      "Focused review of one page, post, link, or lead path",
      "What is confusing, missing, or slowing responses",
      "One practical first step based on what customers actually see",
      "Clear notes you can act on or build from proof",
    ],
    timeline: "Delivered within 48 hours.",
    cta: "Start with Friction Check — $35",
    href: stripePaymentLinks.frictionCheck,
    imageSrc: "/images/offers/friction-check.png",
    imageAlt: "Killough Works Friction Check offer graphic with blueprint styling and $35 price.",
    checkoutMode: "live",
    featured: true,
  },
  {
    name: "First Fix",
    title: "$75 — First Fix",
    badge: "One useful improvement",
    bestFor: "I already know the problem and want one thing fixed.",
    description:
      "One practical improvement completed for you, such as offer cleanup, a DM pitch, landing page section, intake form, payment/start link, CTA rewrite, or small lead-flow improvement.",
    handoff:
      "Pick the closest starting point. After payment, send the page, post, screenshot, or idea you want fixed. If the job needs more than this tier, I’ll say so before doing extra work.",
    includes: [
      "One first useful fix completed for you",
      "Offer, CTA, intake, message, or payment-path cleanup",
      "Clearer next step for customers",
      "Build from proof before doing anything bigger",
    ],
    timeline: "Usually handled quickly once access is shared.",
    cta: "Get a First Fix — $75",
    href: stripePaymentLinks.firstFix,
    imageSrc: "/images/offers/first-fix.png",
    imageAlt: "Killough Works First Fix offer graphic showing one useful improvement and $75 price.",
    checkoutMode: "live",
  },
  {
    name: "Mini Build",
    title: "$150+ — Mini Build",
    bestFor: "I need a small system, not just a tweak.",
    description:
      "A small custom build around your actual business, such as a quote flow, booking page, QR hub, intake system, simple dashboard, partner page, landing page, or lightweight automation.",
    handoff:
      "Use the starter payment to begin a small custom build. After payment, send the workflow, page, or problem you want built first, and I confirm the exact scope before building beyond the starter step.",
    includes: [
      "Small starter build around one real business workflow",
      "Quote, booking, intake, QR, landing page, or dashboard setup",
      "Lightweight automation where useful",
      "Clear scope before the build expands",
    ],
    cta: "Request a Mini Build — $150+",
    href: stripePaymentLinks.miniBuild,
    imageSrc: "/images/offers/mini-build.png",
    imageAlt: "Killough Works Mini Build offer graphic with blueprint workflow styling and $150+ starting point.",
    checkoutMode: "starting-payment",
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
    label: "Design study",
    explanation: "Turns buried contact details into a clear quote path.",
    imageSrc: "/examples/missing-quote-button.png",
    imageAlt: "Before and after mockup showing a landscaping website with no quote button transformed into a page with a prominent request a quote path.",
  },
  {
    title: "Messy intake process",
    label: "Design study",
    explanation:
      "Turns scattered messages into one simple form with the details needed to quote faster.",
    imageSrc: "/examples/messy-intake-process.png",
    imageAlt: "Before and after mockup showing quote details scattered across messages replaced by a clean pressure washing quote form.",
  },
  {
    title: "Scattered Facebook info",
    label: "Design study",
    explanation: "Turns posts, captions, and comments into one organized service page.",
    imageSrc: "/examples/scattered-facebook-info.png",
    imageAlt: "Before and after mockup showing a Facebook business page replaced by a focused service website with one clear quote action.",
  },
  {
    title: "No next step after payment",
    label: "Design study",
    explanation:
      "Turns a generic success screen into a reassuring handoff page with clear next steps.",
    imageSrc: "/examples/no-next-step-after-payment.png",
    imageAlt: "Before and after mockup showing a generic payment confirmation replaced by a clear handoff page with next steps and a send project details button.",
  },
  {
    title: "Missed review opportunity",
    label: "Design study",
    explanation:
      "Turns happy customers into easier review requests and stronger local proof.",
    imageSrc: "/examples/missed-review-opportunity.png",
    imageAlt: "Before and after mockup showing a completed job screen upgraded into a review request flow with visible social proof.",
  },
  {
    title: "Leads lost in Messenger",
    label: "Design study",
    explanation: "Turns buried chats into a simple lead tracker with visible follow-up.",
    imageSrc: "/examples/leads-lost-in-messenger.png",
    imageAlt: "Before and after mockup showing Messenger leads scattered across chats replaced by an organized lead tracking dashboard.",
  },
  {
    title: "Realtor lead capture",
    label: "Design study",
    explanation:
      "Turns listing traffic into actual buyer, seller, or showing inquiries.",
    imageSrc: "/examples/realtor-lead-capture.png",
    imageAlt: "Before and after mockup showing a realtor listing profile upgraded into a dedicated lead capture page with inquiry forms.",
  },
  {
    title: "Contractor inspection request",
    label: "Design study",
    explanation:
      "Turns call-only intake into an inspection request form with photos and scheduling details.",
    imageSrc: "/examples/contractor-inspection-request.png",
    imageAlt: "Before and after mockup showing a contractor site with call-only intake replaced by a structured inspection request form.",
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
