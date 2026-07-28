import { CaseStudy, FaqData } from "../website/website-data";

export interface SetupModule {
  id: number;
  title: string;
  badge: string;
  description: string;
  iconName: string;
  items: string[];
}

export const digitalMarketingSetupData = {
  hero: {
    badges: [
      "Complete Setup 2026",
      "One-Time Setup",
      "No Monthly Commitment",
      "100% Client Ownership",
    ],
    title: "Complete Digital Marketing Setup",
    accentTitle: "@ ₹19,999 + GST",
    subtitle: "A professionally configured digital marketing foundation for businesses ready to advertise, track leads, and scale online.",
    highlights: [
      "10 Complete Setup Modules",
      "Google & Meta Infrastructure",
      "End-to-End Lead & Event Tracking",
      "5–7 Working Days Handover",
    ],
    ctaLabel: "View Full Setup Scope",
  },
  readiness: {
    title: "Your Business Will Be Ready For",
    subtitle: "Everything configured from day one so your growth campaigns perform seamlessly with zero data gaps.",
    items: [
      {
        title: "Google Ads Campaigns",
        description: "Search campaigns, ad group structures, extensions, and keyword targeting pre-built.",
        icon: "Search",
      },
      {
        title: "Meta (Facebook & Instagram) Ads",
        description: "Business Manager verified, pixel connected, custom audiences, and instant lead forms.",
        icon: "Share2",
      },
      {
        title: "Lead Generation Campaigns",
        description: "High-intent lead forms, click-to-WhatsApp, and instant call routing.",
        icon: "Target",
      },
      {
        title: "Conversion Tracking",
        description: "GA4 e-commerce/lead events and Meta Conversions API mapping.",
        icon: "BarChart3",
      },
      {
        title: "Performance Measurement",
        description: "Custom GTM containers and GA4 dashboards for ROI visibility.",
        icon: "LineChart",
      },
      {
        title: "Data-Driven Marketing",
        description: "Consolidated event tracking to train AI ad algorithms faster.",
        icon: "Cpu",
      },
      {
        title: "Future Marketing Scale-Up",
        description: "Solid digital infrastructure built for scaling spend without breaking tracking.",
        icon: "TrendingUp",
      },
    ],
  },
  modules: [
    {
      id: 1,
      title: "Business Profile Setup",
      badge: "Module 01",
      iconName: "Store",
      description: "Establish & optimize your core brand profiles across Google, Facebook, Instagram, and LinkedIn.",
      items: [
        "Google Business Profile Setup / Optimisation",
        "Facebook Business Page Optimisation",
        "Instagram Business Profile Optimisation",
        "LinkedIn Company Page Setup (Optional)",
        "Business information verification",
        "Business category optimisation",
        "Contact information setup",
        "Website linking",
        "Service listing setup",
      ],
    },
    {
      id: 2,
      title: "Meta Business Infrastructure",
      badge: "Module 02",
      iconName: "Share2",
      description: "Complete setup of Meta Business Suite, Pixel, Ads Manager, and team permissions.",
      items: [
        "Meta Business Manager Setup",
        "Business Verification Assistance",
        "Facebook Ads Account Setup",
        "Instagram Account Connection",
        "Meta Pixel Creation",
        "Meta Conversion Events Configuration",
        "User Access & Permissions Configuration",
      ],
    },
    {
      id: 3,
      title: "Google Marketing Infrastructure",
      badge: "Module 03",
      iconName: "Search",
      description: "End-to-end setup of Google Ads, GA4, GTM, Search Console, and domain verification.",
      items: [
        "Google Ads Account Setup",
        "Google Analytics 4 (GA4) Setup",
        "Google Tag Manager Setup",
        "Google Search Console Setup",
        "Google Ads Conversion Tracking",
        "Website Verification",
        "Domain Verification",
      ],
    },
    {
      id: 4,
      title: "Website Tracking & Integrations",
      badge: "Module 04",
      iconName: "Code2",
      description: "Precision event tracking across form fills, WhatsApp clicks, phone calls, and page triggers.",
      items: [
        "Google Analytics Integration",
        "Meta Pixel Installation",
        "Google Tag Manager Installation",
        "Contact Form Tracking",
        "WhatsApp Click Tracking",
        "Phone Call Tracking",
        "Lead Conversion Tracking",
        "Event Configuration Testing",
      ],
    },
    {
      id: 5,
      title: "Lead Generation Setup",
      badge: "Module 05",
      iconName: "Magnet",
      description: "Optimize conversion pathways, WhatsApp routing, CTA placement, and landing page UX.",
      items: [
        "WhatsApp Business Integration",
        "Contact Form Optimisation",
        "Lead Capture Configuration",
        "Call-to-Action Optimisation",
        "Landing Page Review",
        "Basic Landing Page Recommendations",
      ],
    },
    {
      id: 6,
      title: "Campaign Planning",
      badge: "Module 06",
      iconName: "Compass",
      description: "Strategic blueprinting including competitor research, keyword planning, and audience mapping.",
      items: [
        "Business Goal Discussion",
        "Competitor Analysis",
        "Keyword Research",
        "Audience Research",
        "Location Targeting",
        "Campaign Structure Planning",
        "Budget Recommendation",
      ],
    },
    {
      id: 7,
      title: "Advertising Setup (Google & Meta)",
      badge: "Module 07",
      iconName: "Megaphone",
      description: "Ready-to-launch campaign structures for Google Search and Meta Ads with ad extensions.",
      items: [
        "Google Ads Search Campaign Setup",
        "Google Ad Groups & Keyword Configuration",
        "Google Ad Extensions & Conversion Linking",
        "Meta Ads Campaign & Objective Configuration",
        "Meta Audience Setup & Lead Form Setup",
        "Meta Pixel Event Mapping",
      ],
    },
    {
      id: 8,
      title: "Dashboard & Reporting",
      badge: "Module 08",
      iconName: "LayoutDashboard",
      description: "Custom GA4 visual dashboards, conversion monitors, and monthly reporting templates.",
      items: [
        "Google Analytics Custom Dashboard",
        "Conversion Tracking Dashboard",
        "Basic Performance Report Template",
        "Monthly Reporting Format & Metrics Framework",
      ],
    },
    {
      id: 9,
      title: "Documentation & Handover",
      badge: "Module 09",
      iconName: "FileCheck",
      description: "Full account access transfer, configuration guides, and tracking verification reports.",
      items: [
        "Account Ownership & Full Access Verification",
        "Login & Permission Verification",
        "Setup Completion Checklist",
        "Campaign Structure Documentation",
        "Tracking Verification Report",
        "Support & Maintenance Guide",
      ],
    },
    {
      id: 10,
      title: "Post-Setup Technical Support",
      badge: "Module 10",
      iconName: "ShieldCheck",
      description: "30 days of included technical assistance to handle questions or fine-tune tracking.",
      items: [
        "30 Days Technical Support",
        "Minor Configuration Assistance",
        "Tracking Issue Resolution",
        "Account Access Support",
      ],
    },
  ] as SetupModule[],
  scope: {
    title: "Scope Breakdown & Transparency",
    subtitle: "Clear boundaries ensure you know exactly what is included in your one-time setup fee.",
    included: [
      "10 Complete Digital Marketing Setup Modules",
      "Full ownership transfer of all ad & analytics accounts",
      "30 Days post-setup technical support",
      "Custom GTM & Meta Pixel conversion event setup",
      "Google Ads Search Campaign & Meta Lead Form structure",
      "Delivery within 5‒7 Working Days",
      "No recurring monthly fees or commitments",
    ],
    notIncluded: [
      "Monthly Digital Marketing Management",
      "Google Ads Budget (Paid directly to Google)",
      "Meta Ads Budget (Paid directly to Meta)",
      "Daily Campaign Optimisation & Scaling",
      "SEO Content Services",
      "Social Media Content Creation",
      "Graphic Design & Video Production",
      "Custom Website / Landing Page Development",
      "Ad Copywriting",
      "Ongoing Monthly Reporting",
    ],
    note: "Ongoing ad management, content creation, or custom landing page development can be added separately as add-on services.",
  },
  pricing: {
    title: "Transparent One-Time Investment",
    subtitle: "Everything you need to launch, track, and scale digital ads without monthly lock-ins.",
    package: {
      label: "One-Time Setup",
      name: "Complete Digital Marketing Setup",
      price: "₹19,999",
      tax: "+ GST",
      description: "A professionally configured digital marketing foundation for businesses ready to advertise, track leads, and scale online.",
      features: [
        "<strong>10 Core Infrastructure Modules</strong> setup & verified",
        "<strong>Google Ads & GA4 & GTM</strong> full integration",
        "<strong>Meta Business Manager & Pixel</strong> configuration",
        "<strong>Website Form, Call & WhatsApp</strong> conversion tracking",
        "<strong>5–7 Working Days</strong> estimated delivery timeline",
        "<strong>30 Days Post-Setup</strong> technical support included",
        "<strong>100% Client Ownership</strong> of all created assets",
      ],
    },
  },
  faqs: [
    {
      question: "Are there any recurring monthly charges after this setup?",
      answer: "No. This is a 100% one-time setup fee of ₹19,999 + GST. There are no monthly commitments or hidden subscription costs. Once delivered, all assets belong entirely to your business."
    },
    {
      question: "Who will own the Google Ads, Meta Business Manager, and Analytics accounts?",
      answer: "Your business will have 100% ownership of all accounts. We create or configure everything under your business email address and transfer super-admin permissions upon completion."
    },
    {
      question: "Is the ad budget included in the ₹19,999 fee?",
      answer: "No, the ad budget (for Google Ads or Meta Ads) is paid directly by you to Google and Meta using your own credit/debit card or billing method attached to your accounts."
    },
    {
      question: "How long does the setup take to complete?",
      answer: "Standard delivery timeline is 5 to 7 working days. Timeline may vary slightly depending on how quickly platform access is granted and business verification approvals are processed by Google/Meta."
    },
    {
      question: "What is included in the 30-Day Post-Setup Technical Support?",
      answer: "During the first 30 days after handover, our team is available to assist with any minor configuration tweaks, account access issues, or tracking verification questions to ensure your campaigns launch smoothly."
    },
    {
      question: "Can Clever Crow manage our ad campaigns after the setup is completed?",
      answer: "Yes! If you would like our experts to handle daily campaign optimization, budget scaling, and ad management, we offer flexible monthly digital marketing management packages as an add-on."
    },
    {
      question: "What if I don't have a website or landing page yet?",
      answer: "We include a basic Landing Page Review & Recommendations in Module 5. If you need a brand-new high-converting landing page built from scratch, our team can develop one for you as a separate add-on service."
    }
  ] as FaqData[],
  caseStudies: [
    { 
      id: "ashray-digital", 
      title: "Ashray Developers", 
      category: "Real Estate", 
      location: "Bangalore", 
      primaryMetric: "₹1.2 Cr Revenue", 
      secondaryMetric: "+40% Lead Quality", 
      platform: "google" as const, 
      tags: ["Infrastructure Setup", "Google Ads", "Meta Ads"], 
      duration: "One-Time Setup", 
      summary: "Full digital infrastructure setup including Meta Business Manager, GA4 conversion tracking, and Google Search campaigns. Enabled instant lead capture & WhatsApp routing.", 
      image: "/landing-page/google-ads/case-studies/ashray.jpg" 
    },
    { 
      id: "bgs-digital", 
      title: "BGS Global Institute", 
      category: "Education", 
      location: "Bangalore", 
      primaryMetric: "+25% Admissions", 
      secondaryMetric: "100% Tracking Accuracy", 
      platform: "google" as const, 
      tags: ["GA4 & GTM", "Tracking Setup"], 
      duration: "One-Time Setup", 
      summary: "Implemented GTM event tracking across form fills, call clicks, and application downloads, resulting in granular ROI visibility across Search and Display channels.", 
      image: "/landing-page/google-ads/case-studies/bgs-global.jpg" 
    },
  ] as CaseStudy[],
};
