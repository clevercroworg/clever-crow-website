import { CaseStudy, FaqData } from "../website/website-data";

export const googleAdsData = {
  hero: {
    badges: ["Google Ads Experts", "Google Certified", "Performance Focused", "Lead Generation"],
    title: "Google Ads Management",
    accentTitle: "@ Just ₹15,000",
    subtitle: "Get More Qualified Leads with Google Ads Management",
    highlights: ["15+ Years of Experience", "Certified Professionals", "550+ Happy Clients", "Best Customer Support"],
    ctaLabel: "View Pricing",
  },
  pricing: {
    title: "Simple Pricing for Different Growth Stages",
    subtitle: "Start small or choose ongoing management for stronger long-term performance.",
    packages: [
      {
        label: "Basic",
        name: "Basic",
        price: "₹15,000",
        description: "Best if: Best-in-budget marketing for instant leads.",
        features: ["Campaign setup", "Keyword research", "Ad copy creation", "Conversion tracking setup", "7 days basic optimisation"],
      },
      {
        label: "Growth",
        name: "Growth",
        price: "₹29,999",
        description: "Best if: Aggressively dominate your local market.",
        features: ["Everything in Basic", "Ongoing campaign optimisation", "Weekly testing and improvements", "Budget optimisation", "Reporting support"],
        featured: true,
      },
    ],
    quoteText: "Need a broader scope or custom plan?",
    quoteHref: "tel:+919986389444",
  },
  faqs: [
    {
      question: "How much budget do I need for Google Ads?",
      answer: "We recommend starting with at least ₹500–₹1,500 per day depending on your industry and competition. You can increase this as you see positive ROI."
    },
    {
      question: "When will I start getting leads?",
      answer: "Most campaigns start generating leads within 3–7 days after going live. Google’s algorithm usually takes about a week to fully optimise for your target audience."
    },
    {
      question: "Is ₹15,000 the ad spend or your service fee?",
      answer: "₹15,000 is our professional management fee for the Basic package. Your ad spend is paid directly to Google from your own account."
    },
    {
      question: "Will I get guaranteed leads or sales?",
      answer: "While we can't guarantee a specific number of sales, we focus on bringing high-intent traffic to your site and improving conversion rates through expert optimisation."
    },
    {
      question: "Do I need a website or landing page?",
      answer: "Yes, you need a functional landing page or website. If you don't have one, we can build a high-converting landing page for you at an additional cost."
    },
    {
      question: "How do you track the performance of my ads?",
      answer: "We set up comprehensive conversion tracking through Google Analytics and Google Ads, so you can see exactly where your leads and sales are coming from."
    },
    {
      question: "What industries do you specialise in?",
      answer: "We have experience across real estate, education, healthcare, e-commerce, and professional services, helping businesses scale their lead generation."
    },
    {
      question: "Can I cancel the service anytime?",
      answer: "Yes, our monthly packages are flexible. We recommend at least a 3-month commitment for the best data-driven results, but you are not locked into a long-term contract."
    }
  ] as FaqData[],
  caseStudies: [
    // GOOGLE ADS
    { 
      id: "bgs-google", 
      title: "BGS Global Institute", 
      category: "Education", 
      location: "Bangalore", 
      primaryMetric: "₹2.4 Cr Revenue", 
      secondaryMetric: "+25% Admissions", 
      platform: "google" as const, 
      tags: ["Google Ads", "Lead Gen"], 
      duration: "3 Months", 
      summary: "To drive admission enquiries, we structured search and display campaigns around program keywords and campus location intent. With weekly A/B testing on ad copy and landing pages, CPL dropped steadily while qualified leads climbed.", 
      image: "/landing-page/google-ads/case-studies/bgs-global.jpg" 
    },
    { 
      id: "ashray-google", 
      title: "Ashray Developers", 
      category: "Real Estate", 
      location: "Bangalore", 
      primaryMetric: "₹1.2 Cr Revenue", 
      secondaryMetric: "+40% Conversion", 
      platform: "google" as const, 
      tags: ["Real Estate", "Search + Display"], 
      duration: "Quarterly", 
      summary: "We mapped campaigns to the project's micro-markets and intent tiers. By syncing form fills with instant WhatsApp follow-ups, the team shortened response times and improved show-up rates.", 
      image: "/landing-page/google-ads/case-studies/ashray.jpg" 
    },
    { 
      id: "ddc-google", 
      title: "DDC Smiles", 
      category: "Healthcare", 
      location: "Bangalore", 
      primaryMetric: "+310% Leads", 
      secondaryMetric: "ROI 5.2x", 
      platform: "google" as const, 
      tags: ["Local Search", "30 Days"], 
      duration: "30 Days", 
      summary: "Focusing on 'near me' and treatment-specific search themes, we built a tightly geofenced campaign to capture local patients. Streamlined landing pages nudged more prospects to book.", 
      image: "/landing-page/google-ads/case-studies/ddcsmiles.jpg" 
    },
    { 
      id: "urban-google", 
      title: "Urban Invisible Grills", 
      category: "Home Safety", 
      location: "Bangalore", 
      primaryMetric: "45 Leads", 
      secondaryMetric: "₹25K Spend", 
      platform: "google" as const, 
      tags: ["Local Leads", "Search"], 
      duration: "Ongoing", 
      summary: "We targeted homeowners in high-rise clusters with high-intent queries. A simple, trust-first landing experience helped convert cautious buyers into booked site visits.", 
      image: "/landing-page/google-ads/case-studies/urban-grills.jpg" 
    },
    { 
      id: "hyra-google", 
      title: "Hyra Healthcare", 
      category: "Healthcare", 
      location: "Hyderabad", 
      primaryMetric: "₹35 L Revenue", 
      secondaryMetric: "+175% Enquiries", 
      platform: "google" as const, 
      tags: ["Search + Display", "Launch"], 
      duration: "30 Days", 
      summary: "By separating branded, generic, and competitor themes, we maintained strong impression share. Creative testing and remarketing created a steady pipeline of qualified enquiries.", 
      image: "/landing-page/google-ads/case-studies/hyra-healthcare.jpg" 
    },
    { 
      id: "ravi-google", 
      title: "Ravi Traders", 
      category: "Retail & B2B", 
      location: "Hubli", 
      primaryMetric: "₹50 L Sales", 
      secondaryMetric: "+210% Orders", 
      platform: "google" as const, 
      tags: ["PMax", "Bellers"], 
      duration: "45 Days", 
      summary: "We used Performance Max with structured product groups and feed hygiene to surface bestsellers efficiently. Layered remarketing and dealer-intent signals delivered a clear jump.", 
      image: "/landing-page/google-ads/case-studies/ravi-traders.jpg" 
    },
    { 
      id: "educadd-google", 
      title: "Educadd Rajajinagar", 
      category: "Education", 
      location: "Bangalore", 
      primaryMetric: "+320 Leads", 
      secondaryMetric: "₹18K Spend", 
      platform: "google" as const, 
      tags: ["Lead Ads", "Courses"], 
      duration: "20 Days", 
      summary: "Program-specific ad groups captured learners by course intent, while quick-response WhatsApp handoffs increased enrollment conversions.", 
      image: "/landing-page/google-ads/case-studies/educadd.jpg" 
    },
    { 
      id: "intergy-google", 
      title: "Intergy Australia", 
      category: "SaaS", 
      location: "Australia", 
      primaryMetric: "+245% Traffic", 
      secondaryMetric: "ROI 3.4x", 
      platform: "google" as const, 
      tags: ["B2B Leads", "US Market"], 
      duration: "3 Months", 
      summary: "For B2B leads, we aligned campaigns to service lines and buyer roles, adding gated content for higher intent. CRM-integrated tracking let us optimize toward qualified pipeline.", 
      image: "/landing-page/google-ads/case-studies/intergy.jpg" 
    },
    { 
      id: "interior-google", 
      title: "Interior Buildouts", 
      category: "Construction", 
      location: "USA", 
      primaryMetric: "+300% Leads", 
      secondaryMetric: "CPL -40%", 
      platform: "google" as const, 
      tags: ["Search + Display", "US"], 
      duration: "Ongoing", 
      summary: "We captured commercial fit-out demand with location-modified queries and remarketed to specifiers. Simplified contact flows helped turn more quote requests into consultations.", 
      image: "/landing-page/google-ads/case-studies/interior-buildouts.jpg" 
    },

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

    // SEO
    { 
      id: "alchemist-seo", 
      title: "Alchemist PharmaRx", 
      category: "Pharma", 
      location: "USA", 
      primaryMetric: "+210% Traffic", 
      secondaryMetric: "Top 10 Rank", 
      platform: "seo" as const, 
      tags: ["Technical", "Posts"], 
      duration: "4 Months", 
      summary: "We resolved critical technical issues and organized product pages around manufacturing capabilities. A cadence of expert posts pushed priority terms into top results.", 
      image: "/landing-page/google-ads/case-studies/alchemist.jpg" 
    },
    { 
      id: "lakeview-seo", 
      title: "Lakeview Health", 
      category: "Healthcare", 
      location: "USA", 
      primaryMetric: "+180% Leads", 
      secondaryMetric: "#1 Rehab Rank", 
      platform: "seo" as const, 
      tags: ["Content", " pillars"], 
      duration: "Ongoing", 
      summary: "We built content pillars around treatment paths and family resources, then supported them with local SEO. The combination lifted organic enquiries.", 
      image: "/landing-page/google-ads/case-studies/lakeview.jpg" 
    },
    { 
      id: "gateway-seo", 
      title: "Gateway Foundation", 
      category: "Healthcare", 
      location: "USA", 
      primaryMetric: "+230% Visitors", 
      secondaryMetric: "Top SERP", 
      platform: "seo" as const, 
      tags: ["Authority", "Backlinks"], 
      duration: "Ongoing", 
      summary: "Fixing crawl inefficiencies and consolidating duplicate content unlocked sustainable traffic gains. High-authority backlinks boosted rankings for competitive terms.", 
      image: "/landing-page/google-ads/case-studies/gateway.jpg" 
    },
    { 
      id: "jumeirah-seo", 
      title: "Jumeirah Group", 
      category: "Hospitality", 
      location: "UAE", 
      primaryMetric: "+300% Reach", 
      secondaryMetric: "Luxury SEO", 
      platform: "seo" as const, 
      tags: ["Global", "Core Vitals"], 
      duration: "Ongoing", 
      summary: "We localized content for key markets and aligned property pages to high-value intents. Technical refinements improved Core Web Vitals, aiding visibility.", 
      image: "/landing-page/google-ads/case-studies/jumeirah.jpg" 
    },
    { 
      id: "exotel-seo", 
      title: "Exotel", 
      category: "IT / SaaS", 
      location: "India", 
      primaryMetric: "+260% Keywords", 
      secondaryMetric: "#1 CX SaaS", 
      platform: "seo" as const, 
      tags: ["Clusters", "Topical"], 
      duration: "Ongoing", 
      summary: "Topic clusters around UCaaS/CCaaS use cases built topical authority. Regular product-led posts and technical hygiene grew keyword coverage.", 
      image: "/landing-page/google-ads/case-studies/exotel.jpg" 
    },
    { 
      id: "triveni-seo", 
      title: "Triveni Group", 
      category: "Industrial", 
      location: "India", 
      primaryMetric: "+175% Traffic", 
      secondaryMetric: "#1 Industry Rank", 
      platform: "seo" as const, 
      tags: ["Product", "Snippet"], 
      duration: "Technical", 
      summary: "We restructured product taxonomy and optimized solution pages for industrial buyer queries. Consistent technical audits improved visibility for high-intent searches.", 
      image: "/landing-page/google-ads/case-studies/triveni.jpg" 
    }
  ] as CaseStudy[]
};
