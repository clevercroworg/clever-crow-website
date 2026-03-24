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

const metaAdsFaqs = [
  {
    question: "How fast can Meta Ads start generating leads?",
    answer:
      "Most Meta Ads campaigns start generating leads within 7–14 days after creative testing, audience setup, and conversion tracking are completed.",
  },
  {
    question: "Do you manage Facebook & Instagram Ads across India?",
    answer:
      "Yes. We manage PAN India Meta Ads campaigns with city, state, and audience-based targeting strategies.",
  },
  {
    question: "Is Meta Ads suitable for small businesses?",
    answer:
      "Yes. Meta Ads are highly effective for small and growing businesses when campaigns are structured around conversions and cost control.",
  },
  {
    question: "Do you set up Meta Pixel and Conversion API?",
    answer:
      "Yes. We configure Meta Pixel and Conversion API (CAPI) to ensure accurate tracking and better ad optimisation.",
  },
  {
    question: "Do you create ad creatives?",
    answer:
      "Yes. We design scroll-stopping image, video, and reel creatives optimised for Facebook and Instagram placements.",
  },
  {
    question: "Which industries do you work with?",
    answer:
      "We work with ecommerce, healthcare, education, service businesses, real estate, and B2B brands across India.",
  },
];

/* ---------------- METADATA ---------------- */

export const metadata = {
  title: "Meta Ads Management Services in India | Clever Crow",
  description:
    "ROI-driven Meta (Facebook & Instagram) Ads management services in India focused on lead generation, lower CPL, and scalable growth.",
  keywords: [
    "meta ads management services",
    "facebook ads agency india",
    "instagram ads management",
    "paid social advertising india",
    "performance marketing agency india",
  ],
};

/* ---------------- PAGE ---------------- */

export default function MetaAdsPage() {
  return (
    <main>
      {/* HERO — Optimised for Ad Message Match */}
     <ServiceHero
        eyebrow="Meta Ads Management"
        title="Meta Ads That Scale Leads & Sales"
        subtitle="Facebook & Instagram Ads built for conversions, not vanity metrics."
        serviceName="Meta Ads"
        highlights={[
          "Conversion-first campaigns",
          "Pixel + CAPI tracking",
          "Creative testing & scaling",
          "Retargeting funnels",
        ]}
        tools={[
          { src: "/logos/meta.svg", alt: "Meta Ads" },
          { src: "/logos/ga4.png", alt: "Google Analytics 4" },
        ]}
      />

      {/* HOW IT HELPS — Fast Scan Section */}
       <HowItHelps
        badge="Meta Ads Growth"
        title="Meta Ads Management Services"
        description="Our Meta Ads services are designed for businesses that want predictable leads and scalable growth across Facebook and Instagram."
        imageSrc="/images/metabg.jpg"
        imageAlt="Meta Ads performance growth illustration"
        pills={[
          "High-Quality Leads",
          "Lower Cost Per Lead",
          "Facebook & Instagram Ads",
          "Pixel + CAPI Tracking",
          "Retargeting Funnels",
        ]}
      />

      {/* WHAT YOU GET — Conversion Focus */}
      <WhatYouGet
        title="What’s Included in Our Meta Ads Management"
        subtitle="Everything required to run profitable Facebook & Instagram Ads campaigns."
        items={[
          "Meta Ads strategy & funnel planning",
          "Facebook & Instagram campaign setup",
          "Audience research & lookalike targeting",
          "Ad creative & copy testing",
          "Meta Pixel & Conversion API setup",
          "Retargeting & remarketing funnels",
          "Budget, bid & placement optimisation",
          "Weekly performance tracking & insights",
        ]}
      />

      {/* MID FUNNEL CTA */}
      <DynamicCTA />

      {/* SOCIAL PROOF — STANDARDIZED */}
      <StandardResults />

      {/* FAQ — Objection Handling */}
      <FaqSection
        title="Meta Ads – Frequently Asked Questions"
        description="Answers to common questions before running Facebook & Instagram Ads."
        faqs={metaAdsFaqs}
      />

      {/* ---------------- SCHEMA (NON-VISUAL) ---------------- */}
      <WebPageSchema
        title="Meta Ads Management Services in India"
        description="Professional Meta Ads management services in India focused on lead generation and ROI-driven growth."
        url="https://clevercrow.in/services/meta-ads"
      />

      <ServiceSchema
        serviceName="Meta Ads Management Services"
        serviceDescription="Conversion-focused Meta Ads management services in India designed to generate leads and sales at lower cost."
        pageUrl="https://clevercrow.in/services/meta-ads"
      />

      <FaqSchema faqs={metaAdsFaqs} />

      {/* FINAL CTA — Strong Conversion */}
      <ServiceCTA />
    </main>
  );
}
