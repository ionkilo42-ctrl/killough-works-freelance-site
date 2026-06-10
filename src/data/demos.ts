export type DemoCategory =
  | "Lead Capture & Intake"
  | "Booking & Scheduling"
  | "Sales & Conversion"
  | "Reviews & Reputation"
  | "Customer Follow-Up"
  | "Business Operations"
  | "Websites & Landing Pages"
  | "Experiments";

export const demoCategoryOrder: DemoCategory[] = [
  "Lead Capture & Intake",
  "Booking & Scheduling",
  "Sales & Conversion",
  "Reviews & Reputation",
  "Customer Follow-Up",
  "Business Operations",
  "Websites & Landing Pages",
  "Experiments",
] as const;

export type DemoVisibility = "public" | "unlisted";

export type DemoFieldOption = {
  value: string;
  label: string;
};

export type DemoField =
  | {
      name: string;
      label: string;
      type: "text" | "tel" | "email";
      placeholder: string;
      required?: boolean;
      help?: string;
    }
  | {
      name: string;
      label: string;
      type: "textarea";
      placeholder: string;
      rows?: number;
      required?: boolean;
      help?: string;
    }
  | {
      name: string;
      label: string;
      type: "select";
      options: DemoFieldOption[];
      required?: boolean;
      help?: string;
    }
  | {
      name: string;
      label: string;
      type: "file";
      accept?: string;
      multiple?: boolean;
      help?: string;
    };

export type DemoKind = "form" | "payment" | "landing" | "dashboard" | "estimate" | "companion";

export type DemoLeadCard = {
  customer: string;
  service: string;
  town: string;
  status: "New" | "Contacted" | "Quoted" | "Booked" | "Follow Up";
  urgency: "Today" | "This week" | "Hot lead" | "Soon";
};

export type DemoLineItem = {
  label: string;
  value: string;
};

export type DemoDefinition = {
  slug:
    | "missed-call-quote-form"
    | "pressure-washing-quote"
    | "junk-removal-request"
    | "landscaping-request"
    | "review-request-flow"
    | "customer-reactivation"
    | "service-booking-flow"
    | "deposit-payment-flow"
    | "local-service-landing-page"
    | "lead-follow-up-dashboard"
    | "estimate-approval-flow"
    | "live-bible-companion";
  title: string;
  category: DemoCategory;
  demoKind: DemoKind;
  cardDescription: string;
  intro: string;
  problem: string;
  solutionLine: string;
  whatThisFixes: string[];
  bestFor: string[];
  starterPrice: string;
  ctaHref: "/pay" | "/start";
  ctaLabel: string;
  formIntro: string;
  submitLabel: string;
  successTitle: string;
  successMessage: string;
  fields?: DemoField[];
  serviceCards?: string[];
  trustMarkers?: string[];
  highlightTitle?: string;
  highlightCopy?: string;
  packageSummary?: {
    title: string;
    items: string[];
    options?: string[];
  };
  estimateSummary?: {
    projectTitle: string;
    lineItems: DemoLineItem[];
    note: string;
  };
  leadCards?: DemoLeadCard[];
  visibility?: DemoVisibility;
};

export const demoDefinitions: DemoDefinition[] = [
  {
    slug: "missed-call-quote-form",
    title: "Missed Call Quote Form",
    category: "Lead Capture & Intake",
    demoKind: "form",
    cardDescription: "Capture job details, photos, and phone numbers when the owner is busy on a job.",
    intro: "Stop losing jobs when you miss calls.",
    problem:
      "A lot of local service businesses miss the first call because they are driving, working, or with another customer. This kind of form gives people a clear place to leave the job details instead of disappearing.",
    solutionLine: "Let customers send photos instead of explaining everything over the phone.",
    whatThisFixes: [
      "Missed calls that turn into lost leads",
      "Voicemails with no job details",
      "Back-and-forth texting just to figure out the basics",
    ],
    bestFor: [
      "Contractors and owner-operators who work in the field all day",
      "Businesses that get quote requests from Facebook, Google, or yard signs",
    ],
    starterPrice: "Starting at $75",
    ctaHref: "/pay",
    ctaLabel: "Want this customized for your business?",
    formIntro: "A simple intake form for the call you could not answer.",
    submitLabel: "Send quote request",
    successTitle: "Request sent.",
    successMessage: "The real version would send this lead straight to the business owner by email or text.",
    fields: [
      { name: "name", label: "Customer name", type: "text", placeholder: "Jane Miller", required: true },
      { name: "phone", label: "Best phone number", type: "tel", placeholder: "(609) 555-0182", required: true },
      {
        name: "service",
        label: "What do you need help with?",
        type: "select",
        required: true,
        options: [
          { value: "", label: "Select one" },
          { value: "repair", label: "Repair" },
          { value: "quote", label: "New quote" },
          { value: "follow-up", label: "Follow-up on a job" },
          { value: "not-sure", label: "Not sure yet" },
        ],
      },
      {
        name: "address",
        label: "Job address or town",
        type: "text",
        placeholder: "Vineland, NJ",
        required: true,
      },
      {
        name: "details",
        label: "What is going on?",
        type: "textarea",
        placeholder: "Need a quote for replacing two broken fence sections and a gate.",
        rows: 5,
        required: true,
      },
      {
        name: "photos",
        label: "Add photos",
        type: "file",
        accept: "image/*",
        multiple: true,
        help: "Photo upload UI shown for demo purposes.",
      },
    ],
  },
  {
    slug: "pressure-washing-quote",
    title: "Pressure Washing Quote Form",
    category: "Lead Capture & Intake",
    visibility: "unlisted",
    demoKind: "form",
    cardDescription: "Let homeowners request quotes with photos, surface type, town, and preferred callback time.",
    intro: "Make it easier for people to ask for a quote.",
    problem:
      "Pressure washing leads usually start with quick messages and missing details. This kind of form helps homeowners send the surface info, photos, and callback timing in one step.",
    solutionLine: "Let customers send photos instead of explaining everything over the phone.",
    whatThisFixes: [
      "Quote requests with no photos",
      "Homeowners describing square footage badly over the phone",
      "Wasted time chasing town, surface type, and best callback time",
    ],
    bestFor: [
      "Pressure washing and exterior cleaning businesses",
      "Operators who want cleaner quote requests from mobile traffic",
    ],
    starterPrice: "Starting at $75",
    ctaHref: "/pay",
    ctaLabel: "Want this customized for your business?",
    formIntro: "A mobile-first quote form built for homeowners standing outside with their phone.",
    submitLabel: "Request pressure washing quote",
    successTitle: "Request sent.",
    successMessage: "The real version would send this lead straight to the business owner by email or text.",
    fields: [
      { name: "name", label: "Homeowner name", type: "text", placeholder: "Chris Parker", required: true },
      { name: "phone", label: "Phone number", type: "tel", placeholder: "(856) 555-0149", required: true },
      {
        name: "surface",
        label: "Main surface",
        type: "select",
        required: true,
        options: [
          { value: "", label: "Select one" },
          { value: "house", label: "House siding" },
          { value: "driveway", label: "Driveway" },
          { value: "deck", label: "Deck or patio" },
          { value: "fence", label: "Fence" },
          { value: "other", label: "Something else" },
        ],
      },
      { name: "town", label: "Town", type: "text", placeholder: "Washington Township", required: true },
      {
        name: "callback",
        label: "Best callback time",
        type: "select",
        required: true,
        options: [
          { value: "", label: "Select one" },
          { value: "morning", label: "Morning" },
          { value: "afternoon", label: "Afternoon" },
          { value: "evening", label: "Evening" },
          { value: "text-first", label: "Text first" },
        ],
      },
      {
        name: "notes",
        label: "Anything to know before quoting?",
        type: "textarea",
        placeholder: "Mostly mildew on the north side. Looking to get it done this month.",
        rows: 5,
      },
      {
        name: "photos",
        label: "Upload photos",
        type: "file",
        accept: "image/*",
        multiple: true,
        help: "Customers can show the surface instead of describing every detail.",
      },
    ],
  },
  {
    slug: "junk-removal-request",
    title: "Junk Removal Pickup Request",
    category: "Lead Capture & Intake",
    visibility: "unlisted",
    demoKind: "form",
    cardDescription: "Let customers send item photos, pickup address, stairs/elevator info, and urgency.",
    intro: "Make it easier for people to ask for a quote.",
    problem:
      "Junk removal leads often break down because the crew has to keep asking what the items are, where they are, and how hard the pickup will be. This kind of request form gets that upfront.",
    solutionLine: "Let customers send photos instead of explaining everything over the phone.",
    whatThisFixes: [
      "Pickup requests with no item photos",
      "Surprise stairs, tight hallways, or elevator-only jobs",
      "Slow replies while the customer keeps shopping around",
    ],
    bestFor: [
      "Junk removal crews and hauling businesses",
      "Businesses handling same-day and next-day pickup requests",
    ],
    starterPrice: "Starting at $75",
    ctaHref: "/pay",
    ctaLabel: "Want this customized for your business?",
    formIntro: "A cleaner pickup request for customers who want a fast answer.",
    submitLabel: "Send pickup request",
    successTitle: "Request sent.",
    successMessage: "The real version would send this lead straight to the business owner by email or text.",
    fields: [
      { name: "name", label: "Customer name", type: "text", placeholder: "Morgan Lee", required: true },
      { name: "phone", label: "Phone number", type: "tel", placeholder: "(215) 555-0118", required: true },
      { name: "address", label: "Pickup address", type: "text", placeholder: "123 Maple Ave, Cherry Hill, NJ", required: true },
      {
        name: "access",
        label: "Access info",
        type: "select",
        required: true,
        options: [
          { value: "", label: "Select one" },
          { value: "curb", label: "Curbside" },
          { value: "ground-floor", label: "Ground floor" },
          { value: "stairs", label: "Stairs" },
          { value: "elevator", label: "Elevator" },
        ],
      },
      {
        name: "urgency",
        label: "When do you need pickup?",
        type: "select",
        required: true,
        options: [
          { value: "", label: "Select one" },
          { value: "today", label: "Today" },
          { value: "tomorrow", label: "Tomorrow" },
          { value: "this-week", label: "This week" },
          { value: "flexible", label: "Flexible" },
        ],
      },
      {
        name: "items",
        label: "What needs to go?",
        type: "textarea",
        placeholder: "Old couch, broken treadmill, and a few bags from the garage cleanout.",
        rows: 5,
        required: true,
      },
      {
        name: "photos",
        label: "Upload item photos",
        type: "file",
        accept: "image/*",
        multiple: true,
        help: "Photo upload UI shown for demo purposes.",
      },
    ],
  },
  {
    slug: "landscaping-request",
    title: "Landscaping Job Request",
    category: "Lead Capture & Intake",
    visibility: "unlisted",
    demoKind: "form",
    cardDescription: "Capture mowing, mulch, cleanup, hardscaping, and recurring service requests.",
    intro: "Make it easier for people to ask for a quote.",
    problem:
      "Landscaping leads can come in scattered across texts, Facebook messages, and missed calls. A simple request page helps homeowners choose the job type and explain what they need without a long back-and-forth.",
    solutionLine: "Stop losing jobs when you miss calls.",
    whatThisFixes: [
      "Homeowners sending vague messages like need yard work",
      "Confusion between one-time cleanups and recurring service",
      "Lost leads during spring rush",
    ],
    bestFor: [
      "Landscapers, mowing crews, and seasonal cleanup businesses",
      "Businesses that offer both recurring work and one-off jobs",
    ],
    starterPrice: "Starting at $75",
    ctaHref: "/pay",
    ctaLabel: "Want this customized for your business?",
    formIntro: "A straightforward job request that works for one-time jobs and recurring service.",
    submitLabel: "Request landscaping quote",
    successTitle: "Request sent.",
    successMessage: "The real version would send this lead straight to the business owner by email or text.",
    fields: [
      { name: "name", label: "Customer name", type: "text", placeholder: "Nicole Harris", required: true },
      { name: "phone", label: "Phone number", type: "tel", placeholder: "(609) 555-0135", required: true },
      {
        name: "service",
        label: "Service needed",
        type: "select",
        required: true,
        options: [
          { value: "", label: "Select one" },
          { value: "mowing", label: "Mowing" },
          { value: "mulch", label: "Mulch or beds" },
          { value: "cleanup", label: "Cleanup" },
          { value: "hardscaping", label: "Hardscaping" },
          { value: "recurring", label: "Recurring service" },
        ],
      },
      { name: "town", label: "Town", type: "text", placeholder: "Mullica Hill", required: true },
      {
        name: "schedule",
        label: "Timing",
        type: "select",
        required: true,
        options: [
          { value: "", label: "Select one" },
          { value: "asap", label: "As soon as possible" },
          { value: "this-month", label: "This month" },
          { value: "seasonal", label: "Seasonal plan" },
          { value: "recurring", label: "Ongoing service" },
        ],
      },
      {
        name: "details",
        label: "Project details",
        type: "textarea",
        placeholder: "Front beds need fresh mulch and edge cleanup. Also looking for weekly mowing.",
        rows: 5,
        required: true,
      },
      {
        name: "photos",
        label: "Upload yard photos",
        type: "file",
        accept: "image/*",
        multiple: true,
        help: "Helpful for showing beds, overgrowth, or hardscape areas.",
      },
    ],
  },
  {
    slug: "service-booking-flow",
    title: "Service Booking Request Flow",
    category: "Booking & Scheduling",
    demoKind: "form",
    cardDescription: "Let customers request a service and a time window without going back and forth over calls or DMs.",
    intro: "Make booking feel simple instead of scattered.",
    problem:
      "Customers want to book or request a time, but the current process is scattered across calls, DMs, and vague messages. A simple booking request flow gets the basics in one place.",
    solutionLine: "Give people a clear way to request a day and time without chasing them later.",
    whatThisFixes: [
      "Missed booking chances buried in texts or Facebook messages",
      "Vague messages like can you come sometime this week",
      "Extra back-and-forth just to pin down the service and time window",
    ],
    bestFor: [
      "Handyman services, cleaners, landscapers, mobile detailing, consultants, and appointment-based local businesses",
    ],
    starterPrice: "Starting at $75",
    ctaHref: "/pay",
    ctaLabel: "Want this customized for your business?",
    formIntro: "A simple booking request that feels easy on a phone.",
    submitLabel: "Request time window",
    successTitle: "Booking request sent.",
    successMessage: "The real version would send this request to the business owner so they could confirm the time by text or email.",
    fields: [
      {
        name: "serviceType",
        label: "Service type",
        type: "select",
        required: true,
        options: [
          { value: "", label: "Select one" },
          { value: "cleaning", label: "Cleaning" },
          { value: "handyman", label: "Handyman visit" },
          { value: "landscaping", label: "Landscaping" },
          { value: "detailing", label: "Mobile detailing" },
          { value: "estimate", label: "On-site estimate" },
        ],
      },
      {
        name: "timeWindow",
        label: "Preferred day and time",
        type: "select",
        required: true,
        options: [
          { value: "", label: "Select one" },
          { value: "mon-am", label: "Monday morning" },
          { value: "wed-pm", label: "Wednesday afternoon" },
          { value: "fri-am", label: "Friday morning" },
          { value: "next-week", label: "Next week, flexible" },
        ],
      },
      { name: "name", label: "Customer name", type: "text", placeholder: "Jordan Miles", required: true },
      { name: "phone", label: "Phone number", type: "tel", placeholder: "(856) 555-0124", required: true },
      { name: "town", label: "Town", type: "text", placeholder: "Sewell", required: true },
      {
        name: "notes",
        label: "Job notes",
        type: "textarea",
        placeholder: "Need a kitchen deep clean before family comes in this weekend.",
        rows: 5,
      },
    ],
  },
  {
    slug: "deposit-payment-flow",
    title: "Deposit Payment Flow",
    category: "Sales & Conversion",
    demoKind: "payment",
    cardDescription: "Show a clean next step for collecting a deposit after the customer says yes.",
    intro: "Stop losing momentum after the customer is ready to book.",
    problem:
      "Customers say yes, but there is no clean next step to pay a deposit and lock in the job. This kind of page gives them one obvious action.",
    solutionLine: "Make it easy for people to pay the first step instead of waiting for manual follow-up.",
    whatThisFixes: [
      "Customers saying yes and then going quiet",
      "No clean handoff from estimate to deposit",
      "Manual payment instructions scattered across text messages",
    ],
    bestFor: [
      "Party rentals, contractors, mobile detailing, service appointments, and custom jobs",
    ],
    starterPrice: "Starting at $75",
    ctaHref: "/pay",
    ctaLabel: "Want this customized for your business?",
    formIntro: "A simple deposit page that locks in the next step.",
    submitLabel: "Pay deposit",
    successTitle: "Deposit step ready.",
    successMessage:
      "The real version would connect this step to Stripe, PayPal, Venmo, Cash App, or your Killough Works pay flow so the owner gets paid and the job gets locked in.",
    packageSummary: {
      title: "Spring driveway and walkway wash",
      items: [
        "House-front concrete cleaning",
        "Text confirmation after payment",
        "Preferred job date held after deposit",
      ],
      options: ["$50 deposit", "$100 deposit", "$150 full starter package"],
    },
    fields: [
      {
        name: "package",
        label: "Choose deposit or package",
        type: "select",
        required: true,
        options: [
          { value: "", label: "Select one" },
          { value: "50", label: "$50 deposit" },
          { value: "100", label: "$100 deposit" },
          { value: "150", label: "$150 starter package" },
        ],
      },
      { name: "name", label: "Customer name", type: "text", placeholder: "Ashley Ford", required: true },
      { name: "phone", label: "Phone number", type: "tel", placeholder: "(609) 555-0144", required: true },
      { name: "email", label: "Email", type: "email", placeholder: "ashley@example.com", required: true },
    ],
  },
  {
    slug: "estimate-approval-flow",
    title: "Estimate Approval Flow",
    category: "Sales & Conversion",
    demoKind: "estimate",
    cardDescription: "Give customers a clean way to approve the estimate, ask a question, or move to deposit.",
    intro: "Make the yes step obvious after the estimate goes out.",
    problem:
      "Customers receive quotes manually but do not have a clean way to approve, ask questions, or pay a deposit. This flow keeps the quote moving.",
    solutionLine: "Turn a loose quote conversation into a simple approve-or-ask flow.",
    whatThisFixes: [
      "Quotes that stall after being sent",
      "Customers asking scattered follow-up questions by text",
      "No clean path from estimate to deposit",
    ],
    bestFor: [
      "Contractors, landscapers, junk removal, handyman jobs, and project-based service businesses",
    ],
    starterPrice: "Starting at $75",
    ctaHref: "/pay",
    ctaLabel: "Want this customized for your business?",
    formIntro: "A cleaner estimate page with one obvious next move.",
    submitLabel: "Approve estimate",
    successTitle: "Estimate approved.",
    successMessage:
      "The real version would notify the business owner, save the approval, and move the customer into a deposit or scheduling step.",
    estimateSummary: {
      projectTitle: "Backyard cleanup and mulch refresh",
      lineItems: [
        { label: "Spring cleanup", value: "$220" },
        { label: "Fresh mulch install", value: "$180" },
        { label: "Debris haul-away", value: "$65" },
      ],
      note: "Optional deposit step: customer can lock in the date after approval.",
    },
    fields: [
      {
        name: "deposit",
        label: "Optional deposit step",
        type: "select",
        options: [
          { value: "", label: "Choose later" },
          { value: "none", label: "Approve now, pay later" },
          { value: "50", label: "Approve with $50 deposit" },
          { value: "100", label: "Approve with $100 deposit" },
        ],
      },
      {
        name: "question",
        label: "Ask a question first",
        type: "textarea",
        placeholder: "Can you also price out trimming the shrubs along the fence?",
        rows: 4,
      },
    ],
  },
  {
    slug: "review-request-flow",
    title: "Review Request Flow",
    category: "Reviews & Reputation",
    demoKind: "form",
    cardDescription: "A simple customer follow-up page that helps happy customers leave Google reviews.",
    intro: "Make it easier for happy customers to leave a review.",
    problem:
      "A lot of businesses do solid work but never ask at the right moment. A simple review page makes the next step easy while the customer is still happy.",
    solutionLine: "Give people a simple next step instead of hoping they remember later.",
    whatThisFixes: [
      "Happy customers who never leave a review",
      "Awkward manual follow-up after the job",
      "Review requests buried in long text messages",
    ],
    bestFor: [
      "Home service businesses that rely on local trust and Google visibility",
      "Teams who want a cleaner follow-up after finished jobs",
    ],
    starterPrice: "Starting at $75",
    ctaHref: "/pay",
    ctaLabel: "Want this customized for your business?",
    formIntro: "A simple follow-up flow that nudges satisfied customers toward a review.",
    submitLabel: "Leave feedback",
    successTitle: "Thanks for the feedback.",
    successMessage: "The real version would send this feedback to the business owner and route happy customers to Google reviews.",
    fields: [
      { name: "name", label: "Your name", type: "text", placeholder: "Dana Brooks", required: true },
      {
        name: "rating",
        label: "How did the job go?",
        type: "select",
        required: true,
        options: [
          { value: "", label: "Select one" },
          { value: "great", label: "Great" },
          { value: "good", label: "Good" },
          { value: "needs-help", label: "Needs follow-up" },
        ],
      },
      {
        name: "review",
        label: "Quick note",
        type: "textarea",
        placeholder: "Crew showed up on time and cleaned everything up. Very easy to work with.",
        rows: 4,
      },
      {
        name: "share",
        label: "Share this publicly?",
        type: "select",
        required: true,
        options: [
          { value: "", label: "Select one" },
          { value: "yes", label: "Yes, send me to Google" },
          { value: "not-yet", label: "Not yet" },
        ],
      },
    ],
  },
  {
    slug: "customer-reactivation",
    title: "Customer Reactivation Message",
    category: "Customer Follow-Up",
    demoKind: "form",
    cardDescription: "A simple tool for sending past customers seasonal reminders and comeback offers.",
    intro: "Give past customers a reason to come back.",
    problem:
      "Many local businesses already have a customer list but rarely use it. A simple reactivation tool helps you send timely reminders and small comeback offers without making it complicated.",
    solutionLine: "Give past customers a reason to come back.",
    whatThisFixes: [
      "Past customers forgetting to book again",
      "Slow seasons with no follow-up system",
      "Seasonal offers that only live in your head",
    ],
    bestFor: [
      "Pressure washing, landscaping, cleaning, and maintenance businesses",
      "Owners who want an easy seasonal follow-up system",
    ],
    starterPrice: "Starting at $75",
    ctaHref: "/pay",
    ctaLabel: "Want this customized for your business?",
    formIntro: "A simple message builder for seasonal reminders and comeback offers.",
    submitLabel: "Preview reactivation message",
    successTitle: "Preview ready.",
    successMessage: "The real version would send this campaign to the business owner so they could review and send it to past customers.",
    fields: [
      {
        name: "campaign",
        label: "Reminder type",
        type: "select",
        required: true,
        options: [
          { value: "", label: "Select one" },
          { value: "spring", label: "Spring reminder" },
          { value: "fall", label: "Fall cleanup reminder" },
          { value: "holiday", label: "Holiday cleanup offer" },
          { value: "maintenance", label: "Regular maintenance reminder" },
        ],
      },
      { name: "offer", label: "Simple offer", type: "text", placeholder: "Book by Friday and get gutter cleaning added.", required: true },
      {
        name: "audience",
        label: "Send to",
        type: "select",
        required: true,
        options: [
          { value: "", label: "Select one" },
          { value: "all", label: "All past customers" },
          { value: "last-year", label: "Last year only" },
          { value: "vip", label: "Best repeat customers" },
        ],
      },
      {
        name: "message",
        label: "Message draft",
        type: "textarea",
        placeholder: "Hey, this is a quick spring reminder from Northfield Wash Co. If you want the house and concrete cleaned before summer, reply here and we’ll get you scheduled.",
        rows: 5,
        required: true,
      },
    ],
  },
  {
    slug: "lead-follow-up-dashboard",
    title: "Lead Follow-Up Dashboard",
    category: "Business Operations",
    demoKind: "dashboard",
    cardDescription: "Show who still needs a callback, quote, or follow-up instead of losing track across calls and Facebook.",
    intro: "See which lead needs attention next.",
    problem:
      "Leads come in from calls, forms, and Facebook, but the owner has no clear view of who needs a callback, quote, or follow-up. A simple dashboard makes the next move obvious.",
    solutionLine: "Stop guessing who to call back first.",
    whatThisFixes: [
      "Leads slipping through the cracks",
      "No simple view of who is new, quoted, or booked",
      "Busy owners trying to remember everything from memory",
    ],
    bestFor: [
      "Busy owner-operators, contractors, and service businesses getting multiple requests per week",
    ],
    starterPrice: "Starting at $75",
    ctaHref: "/pay",
    ctaLabel: "Want this customized for your business?",
    formIntro: "A lightweight operations screen for callbacks and status updates.",
    submitLabel: "Mark lead followed up",
    successTitle: "Lead updated.",
    successMessage: "The real version would save the status change and show the owner which lead was followed up.",
    leadCards: [
      { customer: "Sarah T.", service: "Fence repair", town: "Deptford", status: "New", urgency: "Today" },
      { customer: "Mike R.", service: "House wash quote", town: "Washington Twp", status: "Quoted", urgency: "Hot lead" },
      { customer: "Alicia P.", service: "Weekly mowing", town: "Sewell", status: "Follow Up", urgency: "Soon" },
      { customer: "Tom B.", service: "Garage cleanout", town: "Glassboro", status: "Contacted", urgency: "This week" },
    ],
    fields: [],
  },
  {
    slug: "local-service-landing-page",
    title: "Local Service Landing Page",
    category: "Websites & Landing Pages",
    demoKind: "landing",
    cardDescription: "Show a clearer homepage path with services, trust markers, and one obvious quote action.",
    intro: "Turn a confusing homepage into a clear first step.",
    problem:
      "Traffic lands on a confusing homepage with no clear quote or start path. A focused local service landing page gives people a reason to stay and one thing to click next.",
    solutionLine: "Make the quote path obvious the second someone lands on the page.",
    whatThisFixes: [
      "Busy homepages with no clear next action",
      "Trust leaks from weak proof and missing service clarity",
      "Traffic from Google or Facebook that does not convert",
    ],
    bestFor: [
      "Pressure washing, landscaping, junk removal, tree service, waterproofing, HVAC, and handyman businesses",
    ],
    starterPrice: "Starting at $75",
    ctaHref: "/pay",
    ctaLabel: "Want this customized for your business?",
    formIntro: "A landing-page style preview instead of a long generic homepage.",
    submitLabel: "Request a quote",
    successTitle: "Quote path ready.",
    successMessage: "The real version would send the customer into a quote form, booking request, or direct contact step for the business owner.",
    serviceCards: ["House washing", "Driveway cleaning", "Deck and patio cleaning"],
    trustMarkers: ["Fast local replies", "Before and after project photos", "Clear pricing conversation"],
    highlightTitle: "Before and after project highlight",
    highlightCopy: "Show one recent project, one strong customer line, and one obvious request-a-quote button.",
    fields: [],
  },
  {
    slug: "live-bible-companion",
    title: "Live Bible Companion",
    category: "Experiments",
    demoKind: "companion",
    cardDescription:
      "Paste or stream conversation notes and surface Bible passages when references or familiar story phrases appear.",
    intro: "Turn a live conversation into a Scripture-aware companion feed.",
    problem:
      "Bible study, sermon prep, and ministry conversations can mention passages faster than someone can look them up. This demo watches transcript-style text and keeps the relevant Scripture close by.",
    solutionLine: "Detect references and story phrases, then fetch the matching passage from the Hello AO Bible API.",
    whatThisFixes: [
      "Bible references getting missed during fast conversations",
      "Story phrases that need a passage handoff",
      "Manual lookup slowing down group discussion or prep",
    ],
    bestFor: [
      "Church groups, teachers, podcasters, and ministry teams who want Scripture context beside live notes",
      "Prototype conversations around Bible study tools, sermon prep, and transcript assistants",
    ],
    starterPrice: "Prototype demo",
    ctaHref: "/start",
    ctaLabel: "Ask about a custom companion",
    formIntro: "A live transcript box, sample prompts, and a passage feed with API fallback states.",
    submitLabel: "Run companion",
    successTitle: "Companion ready.",
    successMessage: "The real version could connect this to microphone transcription, saved sessions, or a team workspace.",
    fields: [],
  },
];

export function getDemoDefinition(slug: string) {
  return demoDefinitions.find((demo) => demo.slug === slug);
}

export const publicDemoDefinitions = demoDefinitions.filter(
  (demo) => demo.visibility !== "unlisted",
);

export function getPublicDemosByCategory() {
  return demoCategoryOrder
    .map((category) => ({
      category,
      demos: publicDemoDefinitions.filter((demo) => demo.category === category),
    }))
    .filter((group) => group.demos.length > 0);
}
