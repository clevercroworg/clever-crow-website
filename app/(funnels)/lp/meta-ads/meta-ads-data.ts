import { CaseStudy, FaqData } from "../website/website-data";

export const metaAdsData = {
  hero: {
    badges: ["Meta Ads Experts", "FB & Instagram Certified", "Performance Focused", "Lead Generation"],
    title: "Meta Ads Management",
    accentTitle: "@ Just ₹7,999",
    subtitle: "Get More Qualified Leads with Facebook & Instagram Ads Management",
    highlights: ["15+ Years of Experience", "Certified Professionals", "550+ Happy Clients", "Best Customer Support"],
    ctaLabel: "View Pricing",
  },
  pricing: {
    title: "Flexible Pricing for Meta Ads Scaling",
    subtitle: "Choose the plan that fits your growth stage, from initial setup to aggressive scaling.",
    packages: [
      {
        label: "Basic",
        name: "Meta Ads Management",
        price: "₹7,999",
        description: "Best if: Best-in-budget social marketing for instant leads.",
        features: ["Campaign setup", "Audience targeting", "Ad creative support", "Conversion tracking setup", "7 days basic optimisation"],
      },
      {
        label: "Growth",
        name: "Growth Scaling",
        price: "₹29,999",
        description: "Best if: Aggressively dominate your social market with advanced scaling.",
        features: ["Everything in Basic", "Ongoing monthly optimisation", "Weekly creative testing", "Budget scaling & management", "Detailed performance reporting", "Retargeting campaign setup"],
        featured: true,
      },
    ],
  },
  faqs: [
    {
      question: "How much budget do I need for Meta Ads?",
      answer: "We recommend starting with at least ₹500–₹1,500 per day depending on your industry and competition. Facebook and Instagram usually deliver leads steadily with a modest starting budget."
    },
    {
      question: "When will I start getting leads?",
      answer: "Most Meta campaigns start generating leads within 2–5 days. The algorithm usually finds your target audience quickly once the initial learning phase begins."
    },
    {
      question: "Is ₹7,999 the ad spend or your service fee?",
      answer: "₹7,999 is our professional management fee for the Basic package. Your ad spend is paid directly to Meta (Facebook) from your own account."
    },
    {
      question: "Will I get guaranteed leads or sales?",
      answer: "While we can't guarantee a specific number, we focus on high-intent social traffic and audience-first targeting to improve your lead volume and quality."
    },
    {
      question: "Do I need a website or landing page?",
      answer: "Yes, you need a functional landing page or website. For Meta Ads, you can also use 'On-Facebook' Lead Forms, which we can set up for you."
    },
    {
      question: "How do you track the performance of my ads?",
      answer: "We set up Meta Pixel and Conversions API (CAPI) to track leads and sales accurately across Facebook and Instagram."
    },
    {
      question: "What industries do you specialise in?",
      answer: "We have experience across real estate, education, healthcare, e-commerce, and professional services, helping businesses scale their social presence."
    },
    {
      question: "Can I cancel the service anytime?",
      answer: "Yes, our monthly packages are flexible. No long-term contracts; we focus on delivering results month-over-month."
    }
  ] as FaqData[],
  caseStudies: [
    // META ADS
    {
      id: "baatu-meta",
      title: "Baatu",
      category: "E-Commerce",
      location: "India",
      primaryMetric: "₹25 L Revenue",
      secondaryMetric: "+120% Conversion",
      platform: "meta" as const,
      tags: ["Meta Ads", "Reels"],
      duration: "2 Months",
      summary: "Creative built for thumb-stopping Reels plus catalog-based retargeting drove a step-change in add-to-cart rates. We scaled winners with controlled frequency to protect ROAS.",
      image: "/landing-page/google-ads/case-studies/baatu.jpg"
    },
    {
      id: "wedding-meta",
      title: "Wedding Planning Unzipped",
      category: "Events",
      location: "USA",
      primaryMetric: "₹8.9 L Revenue",
      secondaryMetric: "+190% Conversion",
      platform: "meta" as const,
      tags: ["Lead Campaign", "21 Days"],
      duration: "21 Days",
      summary: "Lead forms paired with testimonial creatives captured couples early in planning. Automated follow-ups helped qualify dates and budgets quickly.",
      image: "/landing-page/google-ads/case-studies/wedding.jpg"
    },
    {
      id: "aesthetic-meta",
      title: "Aesthetic Image",
      category: "Beauty",
      location: "India",
      primaryMetric: "₹25 L Revenue",
      secondaryMetric: "+120% Conversion",
      platform: "meta" as const,
      tags: ["Influencer", "Meta Ads"],
      duration: "Scale",
      summary: "We blended influencer-style creatives with education hooks to build trust. Structured retargeting sequences moved prospects from curiosity to course sign-ups.",
      image: "/landing-page/google-ads/case-studies/aesthetic.jpg"
    },
    {
      id: "british-meta",
      title: "British Darts",
      category: "E-commerce",
      location: "UK",
      primaryMetric: "ROI 5.1x",
      secondaryMetric: "+220% Orders",
      platform: "meta",
      tags: ["Meta Ads", "Global"],
      duration: "Scale",
      summary: "We paired creator-style product demos with dynamic catalog retargeting across major seasons. Controlled frequency capped costs while order volume scaled.",
      image: "/landing-page/google-ads/case-studies/britishdarts.jpg"
    },
    {
      id: "bellalash-meta",
      title: "Bella Lash",
      category: "Beauty",
      location: "USA",
      primaryMetric: "ROI 3.9x",
      secondaryMetric: "+180% Sales",
      platform: "meta",
      tags: ["UGC", "Bundles"],
      duration: "Ongoing",
      summary: "UGC-style creatives and bundled offers lifted AOV while staying brand-safe. We scaled best-performing audiences and suppressed promo-fatigue.",
      image: "/landing-page/google-ads/case-studies/bellalash.jpg"
    },
    {
      id: "gato-meta",
      title: "Gato Dates",
      category: "Food",
      location: "GCC",
      primaryMetric: "ROI 4.6x",
      secondaryMetric: "+320% Revenue",
      platform: "meta",
      tags: ["GCC Market", "Localized"],
      duration: "Ongoing",
      summary: "For GCC markets, we localized messaging and tuned delivery windows before Ramadan. Catalog sales with regional lookalikes unlocked steady revenue growth.",
      image: "/landing-page/google-ads/case-studies/gato.jpg"
    },
    {
      id: "lon-meta",
      title: "Lon Retreat",
      category: "Hospitality",
      location: "AU",
      primaryMetric: "ROI 4.2x",
      secondaryMetric: "Reels Success",
      platform: "meta" as const,
      tags: ["Meta + Instagram", "Reach"],
      duration: "Ongoing",
      summary: "Destination-led visuals and Reels built awareness, while mid-funnel retargeting nudged viewers to check availability. Result: stronger booking intent without discounting.",
      image: "/landing-page/google-ads/case-studies/lonretreat.jpg"
    },
    {
      id: "terranea-meta",
      title: "Terranea Resort",
      category: "Hospitality",
      location: "USA",
      primaryMetric: "ROI 3.5x",
      secondaryMetric: "Engage +80%",
      platform: "meta" as const,
      tags: ["Luxury", "Season"],
      duration: "Bursts",
      summary: "We ran seasonally tuned creatives, highlighting signature experiences. Layered lookalikes from high-value guests kept prospecting efficient.",
      image: "/landing-page/google-ads/case-studies/terranea.jpg"
    },
    {
      id: "anatomy-meta",
      title: "Anatomy Fitness",
      category: "Fitness",
      location: "USA",
      primaryMetric: "+280% Leads",
      secondaryMetric: "CPL -32%",
      platform: "meta" as const,
      tags: ["Lead Ads", "15 Days"],
      duration: "15 Days",
      summary: "For local lead gen, we used short-form transformations and class-taster offers. Lead forms with instant WhatsApp replies helped the team lock in trial sessions quickly.",
      image: "/landing-page/google-ads/case-studies/anatomyfitness.jpg"
    },
  ] as CaseStudy[]
};
