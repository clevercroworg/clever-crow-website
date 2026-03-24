import ServiceHero from "@/components/service/ServiceHero";
import WhatYouGet from "@/components/service/WhatYouGet";
import ServiceCTA from "@/components/service/ServiceCTA";
import { StandardResults } from "@/components/service/StandardResults";
import FaqSection from "@/components/service/FaqSection";
import DynamicCTA from "@/components/DynamicCTA";
import HowItHelps from "@/components/service/HowItHelps";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

/* ---------------- FAQ DATA (UI + SCHEMA) ---------------- */

const linkedinAdsFaqs = [
  {
    question: "Is LinkedIn Ads suitable for B2B businesses?",
    answer:
      "Yes. LinkedIn Ads are highly effective for B2B companies looking to reach decision-makers, founders, CXOs, and professionals by role, industry, and company size.",
  },
  {
    question: "How soon can LinkedIn Ads start generating leads?",
    answer:
      "Most LinkedIn Ads campaigns start generating qualified leads within 2–3 weeks after proper audience targeting, creative testing, and conversion setup.",
  },
  {
    question: "Do you run LinkedIn Ads across India?",
    answer:
      "Yes. We manage PAN India LinkedIn Ads campaigns with precise targeting based on location, job role, industry, and seniority.",
  },
  {
    question: "Do you set up LinkedIn Insight Tag and tracking?",
    answer:
      "Yes. We configure the LinkedIn Insight Tag and conversion tracking to measure real leads and optimise campaigns accurately.",
  },
  {
    question: "Which industries do you work with?",
    answer:
      "We work with B2B services, SaaS, IT companies, healthcare, education, real estate, and enterprise-focused businesses across India.",
  },
];

/* ---------------- METADATA ---------------- */

export const metadata = {
  title: "LinkedIn Ads Management Services in India | Clever Crow",
  description:
    "Professional LinkedIn Ads management services in India focused on B2B lead generation, decision-maker targeting, and ROI-driven growth.",
  keywords: [
    "linkedin ads management services",
    "linkedin advertising agency india",
    "b2b lead generation linkedin",
    "linkedin marketing services",
    "paid social advertising india",
  ],
};

/* ---------------- PAGE ---------------- */

export default function LinkedInAdsPage() {
  return (
    <main>
      {/* ================= HERO ================= */}
      <ServiceHero
        eyebrow="For B2B & Growth-Focused Businesses"
        title="LinkedIn Ads Management Services"
        subtitle="We help B2B companies generate qualified leads from LinkedIn by targeting decision-makers, founders, and professionals with precision."
        serviceName="LinkedIn Ads"
        highlights={[
          "B2B Lead Generation",
          "Decision-Maker Targeting",
          "Job Title & Company Targeting",
          "LinkedIn Lead Gen Forms",
          "Insight Tag & Conversion Tracking",
          "Pan-India Campaigns",
        ]}
        tools={[
          { src: "/images/logos/linkedin.svg", alt: "LinkedIn Ads" },
          { src: "/images/logos/linkedin-insight.svg", alt: "LinkedIn Insight Tag" },
        ]}
      />

      {/* ================= HOW IT HELPS ================= */}
      <HowItHelps
        badge="LinkedIn Ads Growth"
        title="LinkedIn Ads for B2B Lead Generation"
        description="Our LinkedIn Ads services are designed for businesses that want to reach professionals, founders, and decision-makers with predictable, high-quality B2B leads."
        imageSrc="/images/smm.jpg"
        imageAlt="LinkedIn Ads B2B lead generation illustration"
        pills={[
          "B2B Lead Generation",
          "Decision-Maker Targeting",
          "Job Title & Industry Targeting",
          "High-Quality Leads",
          "LinkedIn Insight Tag Tracking",
          "Account-Based Marketing",
          "Pan-India Reach",
        ]}
      />

      {/* ================= WHAT YOU GET ================= */}
      <WhatYouGet
        title="Deliverables & Scope of Work"
        subtitle="Our LinkedIn Ads management covers strategy, targeting, creative execution, conversion tracking, and ongoing optimisation to drive qualified B2B leads."
        items={[
          "Business & ICP understanding",
          "LinkedIn Ads account & campaign setup",
          "Audience & job-role targeting strategy",
          "Sponsored content & lead gen ads",
          "LinkedIn Insight Tag & conversion tracking",
          "Ad creative & copy testing",
          "Bid, budget & audience optimisation",
          "Retargeting & ABM campaigns",
          "Performance tracking & reporting",
        ]}
      />

      {/* ================= MID CTA ================= */}
      <DynamicCTA />

      {/* ================= RESULTS ================= */}
      <StandardResults />

      {/* ================= FAQ UI ================= */}
      <FaqSection
        title="LinkedIn Ads – Frequently Asked Questions"
        description="Common questions businesses ask before running LinkedIn Ads."
        faqs={linkedinAdsFaqs}
      />

      {/* ================= SCHEMA (NON-VISUAL) ================= */}
      <WebPageSchema
        title="LinkedIn Ads Management Services in India"
        description="Professional LinkedIn Ads management services in India focused on B2B lead generation and ROI-driven growth."
        url="https://clevercrow.in/services/linkedin-ads"
      />

      <ServiceSchema
        serviceName="LinkedIn Ads Management Services"
        serviceDescription="B2B-focused LinkedIn Ads management services in India designed to generate qualified leads from decision-makers."
        pageUrl="https://clevercrow.in/services/linkedin-ads"
      />

      <FaqSchema faqs={linkedinAdsFaqs} />

      {/* ================= FINAL CTA ================= */}
      <ServiceCTA />
    </main>
  );
}
