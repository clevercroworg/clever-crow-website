// All copy for /lp/seo-growth, taken from SEO_Landing_Page_Content_Spec.md. Edit text here.

export const HERO = {
  eyebrow: "SEO · Local Search · AI Visibility",
  titleLead: "Get Found. Get Chosen.",
  titleAccent: "Grow Your Business.",
  subtitle:
    "Help the right customers find you on Google and AI search. Turn your website into a stronger source of enquiries with SEO built around your business.",
  priceHighlight: "SEO packages from ₹14,999/month + GST",
  primaryCta: "Get My Free SEO Audit",
  secondaryCta: "Explore Packages",
  badges: ["Clear monthly deliverables", "SEO + AEO + GEO", "Monthly reporting and review calls"],
};

export const WHAT_WE_DO = {
  eyebrow: "What we do",
  title: "Your Customers Are Searching. Help Them Find You.",
  intro: "We bring together website improvements, helpful content and local visibility to help your business compete in search.",
  items: [
    {
      title: "Keyword & Competitor Research",
      desc: "Identify the services, locations and questions your customers search for. Map each opportunity to the right website page.",
    },
    {
      title: "On-Page & Technical SEO",
      desc: "Improve page titles, headings, content and internal links. Identify and prioritise indexing, mobile usability and website performance issues.",
    },
    {
      title: "Content That Helps Customers",
      desc: "Create useful articles and service-page content that explain your expertise and help visitors make a decision.",
    },
    {
      title: "Local SEO & Google Maps",
      desc: "Optimise eligible Google Business Profiles and improve location information so nearby customers can discover your services.",
    },
    {
      title: "AEO & GEO Optimisation",
      desc: "Structure clear answers and accurate business information to help search engines and AI platforms understand your content.",
    },
    {
      title: "Tracking & Monthly Reporting",
      desc: "Review organic traffic, search visibility and tracked enquiries. See the work completed and the next priorities.",
    },
  ],
};

export const AUDIT = {
  eyebrow: "Start with a free SEO audit",
  title: "What’s Stopping Your Website From Getting Found?",
  intro: "Share your website. We’ll review the key gaps and help you understand what to improve first.",
  coversTitle: "What your free review covers",
  covers: [
    { title: "Website issues", desc: "Problems that could affect crawling, indexing and usability." },
    { title: "Keyword opportunities", desc: "Relevant searches your website could target." },
    { title: "Content gaps", desc: "Missing or unclear information on important pages." },
    { title: "Local visibility", desc: "Opportunities to improve your local search presence." },
    { title: "Competitor gaps", desc: "Areas where competing businesses have stronger coverage." },
    { title: "AI search readiness", desc: "How clearly your website explains your business and answers customer questions." },
    { title: "Next steps", desc: "A prioritised list of recommended improvements." },
  ],
  reassurance: "A team-reviewed overview, explained in simple English. No obligation to buy.",
  form: {
    heading: "Get Your Free Website Review",
    subtitle: "Tell us where to look and how to reach you.",
    goals: [
      "More enquiries from Google",
      "Local visibility & Google Maps",
      "Google & AI search visibility",
      "Understand why my traffic dropped",
      "Not sure — help me decide",
    ],
    consent: "I agree to be contacted by Clever Crow about my website and this enquiry.",
    button: "Request My Free SEO Audit",
  },
};

export type SeoPackage = {
  name: string;
  tagline: string;
  price?: string; // without "+ GST"
  description?: string;
  deliverables?: { text: string; bold: string }[]; // "bold" is the highlighted part within text
  cta: string;
};

export const PACKAGES = {
  eyebrow: "Straightforward SEO packages",
  title: "Choose the Right Starting Point.",
  intro: "Clear scope. Consistent work. A plan that matches the size of your website and the support you need.",
  items: [
    {
      name: "Essential SEO",
      tagline: "For a focused start.",
      price: "₹14,999",
      deliverables: [
        { text: "One website with up to 20 core pages", bold: "20 core pages" },
        { text: "Up to 5 existing pages optimised per month", bold: "5 existing pages optimised per month" },
        { text: "2 new content pieces per month", bold: "2 new content pieces per month" },
        { text: "Up to 2 hours of routine technical implementation per month", bold: "2 hours of routine technical implementation per month" },
        { text: "1 eligible Google Business Profile", bold: "1 eligible Google Business Profile" },
        { text: "Monthly performance report", bold: "Monthly performance report" },
        { text: "1 review call per month", bold: "1 review call per month" },
      ],
      cta: "Request a Call Back",
    },
    {
      name: "Growth SEO",
      tagline: "For a broader search presence.",
      price: "₹24,999",
      deliverables: [
        { text: "One website with up to 50 core pages", bold: "50 core pages" },
        { text: "Up to 10 existing pages optimised per month", bold: "10 existing pages optimised per month" },
        { text: "4 new content pieces per month", bold: "4 new content pieces per month" },
        { text: "Up to 4 hours of routine technical implementation per month", bold: "4 hours of routine technical implementation per month" },
        { text: "Up to 3 eligible Google Business Profiles", bold: "3 eligible Google Business Profiles" },
        { text: "Monthly performance report", bold: "Monthly performance report" },
        { text: "2 review calls per month", bold: "2 review calls per month" },
      ],
      cta: "Request a Call Back",
    },
    {
      name: "Custom SEO",
      tagline: "Need something more specific?",
      description:
        "Custom plans for ecommerce, large websites, multilingual SEO, migrations and competitive national or international campaigns.",
      cta: "Request a Quote",
    },
  ] as SeoPackage[],
  compareLabel: "Compare full deliverables",
  compare: [
    ["Keyword research & page mapping", "Included", "Included"],
    ["Technical SEO audit", "Initial audit", "Initial audit + quarterly reassessment"],
    ["Existing pages optimised", "Up to 5/month", "Up to 10/month"],
    ["New content pieces", "2/month", "4/month"],
    ["Content length", "Up to 1,000 words each", "Up to 1,200 words each"],
    ["Titles, descriptions & headings", "Within page allocation", "Within page allocation"],
    ["Internal linking", "Within page allocation", "Within page allocation"],
    ["GA4 & Search Console setup/review", "Included", "Included"],
    ["Sitemap & indexing checks", "Included", "Included"],
    ["Relevant structured data", "Initial setup/review", "Setup + ongoing review"],
    ["Google Business Profile optimisation", "1 eligible location", "Up to 3 eligible locations"],
    ["AEO/GEO content formatting", "Within included content", "Within included content"],
    ["Routine technical implementation", "Up to 2 hours/month", "Up to 4 hours/month"],
    ["Reporting", "Monthly", "Monthly"],
    ["Review calls", "1/month", "2/month"],
  ] as [string, string, string][],
  notes: [
    "Prices exclude GST. Standard initial setup is included within the listed scope. Content pieces may be articles or service-page copy, agreed in the monthly plan. Implementation requires suitable website access. Website redesign, major development, paid placements and specialist content production are separate. Additional work is quoted before proceeding.",
    "Allow an initial three-month engagement, then review progress and scope. Rankings, traffic, backlinks and AI-generated answer mentions are not guaranteed.",
  ],
};

export const EXPLAINED = {
  eyebrow: "SEO, AEO and GEO",
  title: "SEO, AEO, GEO. Simply Explained.",
  intro:
    "Your customers may search on Google, ask a question or use an AI assistant. Our approach starts with helpful, credible content that is easy to understand.",
  items: [
    {
      tag: "SEO",
      title: "Help Customers Find Your Website",
      desc: "Improve your pages and technical foundations for relevant searches on Google and other search engines.",
    },
    {
      tag: "AEO",
      title: "Give Clear Answers to Their Questions",
      desc: "Organise FAQs, service details and useful answers so people and search systems can understand them.",
    },
    {
      tag: "GEO",
      title: "Make Your Business Easier for AI to Understand",
      desc: "Strengthen original information, supporting evidence and consistent business details to help AI platforms understand and potentially reference your business.",
    },
  ],
  note: "AI platforms decide what to reference. Inclusion is not guaranteed.",
  cta: "Check My Website’s Search Readiness",
};

export const PROCESS = {
  eyebrow: "Our process",
  title: "Know What Happens Next.",
  intro: "We prioritise the work around your website, your market and the searches that matter to your business.",
  steps: [
    { step: "01", label: "Review", title: "Find the Gaps", desc: "Review your website, search visibility and competitors. Understand your services and enquiry goals." },
    { step: "02", label: "Plan", title: "Set the Priorities", desc: "Agree on target pages, keywords and a monthly content plan. Establish a baseline for reporting." },
    { step: "03", label: "Improve", title: "Put the Work Live", desc: "Optimise pages, create content and address technical issues within your package scope." },
    { step: "04", label: "Refine", title: "Review & Build on It", desc: "Check performance, report completed work and use the findings to guide the next month." },
  ],
};

export const REPORTING = {
  eyebrow: "Monthly reporting",
  title: "A Monthly Report You Can Actually Use.",
  subtitle: "What changed. What we completed. What comes next.",
  coversTitle: "Your report covers",
  covers: [
    "Search visibility and keyword movement",
    "Organic website traffic",
    "Tracked website enquiries",
    "Pages and content completed",
    "Technical work completed",
    "Priorities for the next month",
  ],
};

export const FAQS = [
  {
    q: "What do I get in the free SEO audit?",
    a: "A team-reviewed overview of key website issues, content opportunities, local search gaps and AI search readiness, with recommended priorities. It is an initial review, not a full implementation project.",
  },
  {
    q: "How long should I plan to invest in SEO?",
    a: "We start with a three-month engagement, then review progress and scope. SEO is an ongoing process. The time required depends on your starting point, competition and the work needed. We do not promise results by a fixed date.",
  },
  {
    q: "Do you guarantee first-page rankings?",
    a: "No. Search engines and AI platforms control their results. We commit to the agreed work, clear reporting and ongoing improvement, without promising rankings, traffic or AI mentions.",
  },
  {
    q: "Are AEO and GEO included?",
    a: "Yes. AEO/GEO formatting is included within your content allocation. This includes clear answers and helpful content structure, supported by the relevant structured-data work in your package.",
  },
  {
    q: "Will you make the changes on my website?",
    a: "Routine technical implementation is included for up to 2 hours per month in Essential and 4 hours in Growth, with suitable website access. Major development and work beyond the included scope are quoted separately.",
  },
  {
    q: "Can you improve my Google Maps visibility?",
    a: "Local optimisation is included for one eligible Google Business Profile in Essential and up to three in Growth. Profile eligibility and search visibility depend on Google’s requirements and your business circumstances.",
  },
  {
    q: "Is content writing included?",
    a: "Yes. Essential includes 2 pieces per month, up to 1,000 words each. Growth includes 4 pieces, up to 1,200 words each. Articles or service-page copy are agreed in the monthly plan. Specialist content production is quoted separately.",
  },
];

export const FINAL_CTA = {
  title: "Make Your Website Easier to Find. Start With a Clear Plan.",
  subtitle: "Get a free SEO review and discover what to improve first.",
  primary: "Get My Free SEO Audit",
  secondary: "Chat on WhatsApp",
  phoneDisplay: "+91 99863 89444",
  phoneHref: "tel:+919986389444",
};

export const LEAD_SOURCE = "SEO Growth Landing Page";
export const WHATSAPP_MESSAGE = "Hi Clever Crow, I'd like a free SEO audit for my website. (Ref: LP/SEO-Growth)";
