// Case studies for the "Our Results" section. Figures and stories mirror the results already
// published on the Google Ads LP (app/(funnels)/lp/google-ads/google-ads-data.ts).
//
// `creatives` takes real exported ad creatives for that client (4:5 or 1:1). Until they are
// added, the gallery is built from the client's website screenshot and designed result tiles.
// Never add AI-generated "ads" for a named client.

export type ResultMetric = { value: string; label: string; trend: "up" | "down" | "rank" };

export type CaseStudy = {
  id: string;
  client: string;
  industry: string;
  channel: "Google Ads" | "Meta Ads" | "SEO";
  tags: string[];
  timeline: string;
  headline: string;
  story: string;
  metrics: [ResultMetric, ResultMetric];
  screenshot: string;
  logo?: { src: string; width: number; height: number };
  creatives?: string[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "bgs-global",
    client: "BGS Global Institute",
    industry: "Education",
    channel: "Google Ads",
    tags: ["Education", "Search + Display", "Lead Generation"],
    timeline: "3 months",
    headline: "₹2.4 Cr Revenue and 25% More Admissions for BGS Global Institute",
    story:
      "We structured search and display campaigns around program keywords and campus-location intent. Weekly A/B tests on ad copy and landing pages steadily lowered the cost per lead while qualified admission enquiries climbed.",
    metrics: [
      { value: "₹2.4 Cr", label: "Revenue generated", trend: "up" },
      { value: "+25%", label: "Increase in admissions", trend: "up" },
    ],
    screenshot: "/landing-page/google-ads/case-studies/bgs-global.jpg",
    logo: { src: "/images/logos/bgsgims.svg", width: 424, height: 101 },
  },
  {
    id: "ashray",
    client: "Ashray Developers",
    industry: "Real Estate",
    channel: "Google Ads",
    tags: ["Real Estate", "Search + Display", "WhatsApp Follow-up"],
    timeline: "Quarterly",
    headline: "Turning Property Searches into ₹1.2 Cr Revenue for Ashray Developers",
    story:
      "Campaigns were mapped to the project's micro-markets and buyer-intent tiers. Syncing form fills with instant WhatsApp follow-ups shortened response times and improved site-visit show-up rates.",
    metrics: [
      { value: "₹1.2 Cr", label: "Revenue generated", trend: "up" },
      { value: "+40%", label: "Higher conversion rate", trend: "up" },
    ],
    screenshot: "/landing-page/google-ads/case-studies/ashray.jpg",
  },
  {
    id: "baatu",
    client: "Baatu",
    industry: "E-commerce",
    channel: "Meta Ads",
    tags: ["E-commerce", "Reels", "Catalog Retargeting"],
    timeline: "2 months",
    headline: "Scaling Baatu to ₹25 L Revenue with Meta Ads & Reels",
    story:
      "Thumb-stopping Reels creative plus catalog-based retargeting drove a step-change in add-to-cart rates. Winning ads were scaled with controlled frequency to protect return on ad spend.",
    metrics: [
      { value: "₹25 L", label: "Revenue generated", trend: "up" },
      { value: "+120%", label: "Higher conversion rate", trend: "up" },
    ],
    screenshot: "/landing-page/google-ads/case-studies/baatu.jpg",
    logo: { src: "/lp/digital-marketing/BaatuLogo.png", width: 320, height: 63 },
  },
  {
    id: "ddc-smiles",
    client: "DDC Smiles",
    industry: "Healthcare",
    channel: "Google Ads",
    tags: ["Healthcare", "Local Search", "Appointment Funnel"],
    timeline: "30 days",
    headline: "310% More Patient Leads for DDC Smiles in 30 Days",
    story:
      "We built a tightly geofenced campaign around 'near me' and treatment-specific searches to capture local patients, then streamlined the landing pages so more visitors went on to book an appointment.",
    metrics: [
      { value: "+310%", label: "More patient leads", trend: "up" },
      { value: "5.2x", label: "Return on investment", trend: "up" },
    ],
    screenshot: "/landing-page/google-ads/case-studies/ddcsmiles.jpg",
  },
  {
    id: "alchemist",
    client: "Alchemist PharmaRx",
    industry: "Pharma",
    channel: "SEO",
    tags: ["Pharma", "Technical SEO", "Content"],
    timeline: "4 months",
    headline: "Taking Alchemist PharmaRx into Google's Top 10 with Technical SEO",
    story:
      "We resolved critical technical issues and reorganised product pages around manufacturing capabilities. A steady cadence of expert posts then pushed priority search terms into the top results.",
    metrics: [
      { value: "+210%", label: "Organic traffic growth", trend: "up" },
      { value: "Top 10", label: "Rankings for priority terms", trend: "rank" },
    ],
    screenshot: "/landing-page/google-ads/case-studies/alchemist.jpg",
  },
  {
    id: "ravi-traders",
    client: "Ravi Traders",
    industry: "Retail & B2B",
    channel: "Google Ads",
    tags: ["Retail & B2B", "Performance Max", "Remarketing"],
    timeline: "45 days",
    headline: "₹50 L in Sales for Ravi Traders with Performance Max",
    story:
      "Performance Max with structured product groups and clean feed hygiene surfaced bestsellers efficiently. Layered remarketing and dealer-intent signals delivered a clear jump in orders.",
    metrics: [
      { value: "₹50 L", label: "Sales generated", trend: "up" },
      { value: "+210%", label: "Increase in orders", trend: "up" },
    ],
    screenshot: "/landing-page/google-ads/case-studies/ravi-traders.jpg",
  },
];
