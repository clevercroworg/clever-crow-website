import ServiceHero from "@/components/service/ServiceHero";
import WhatYouGet from "@/components/service/WhatYouGet";
import ServiceCTA from "@/components/service/ServiceCTA";
import FaqSection from "@/components/service/FaqSection";
import { StandardResults } from "@/components/service/StandardResults";
import DynamicCTA from "@/components/DynamicCTA";
import HowItHelps from "@/components/service/HowItHelps";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

/* ---------------- FAQ DATA (UI + SCHEMA) ---------------- */

const seoFaqs = [
  {
    question: "How long does SEO take to show results?",
    answer:
      "SEO typically starts showing measurable improvements within 2–3 months, with strong ranking and traffic growth visible over 4–6 months depending on competition.",
  },
  {
    question: "Do you provide SEO services across India?",
    answer:
      "Yes. We offer PAN India SEO services including local, national, and service-based SEO strategies.",
  },
  {
    question: "Is SEO better than Google Ads?",
    answer:
      "SEO and Google Ads serve different purposes. SEO builds long-term organic visibility, while Google Ads delivers immediate traffic. The best results come from using both together.",
  },
  {
    question: "Do you write SEO content?",
    answer:
      "Yes. We create SEO-optimised service pages, landing pages, blogs, and website content designed to rank and convert.",
  },
  {
    question: "Do you do technical SEO?",
    answer:
      "Yes. We handle technical SEO including site speed, Core Web Vitals, mobile SEO, indexing, schema, and crawl optimisation.",
  },
  {
    question: "Which businesses benefit most from SEO?",
    answer:
      "SEO works best for service businesses, startups, local businesses, ecommerce brands, and companies focused on long-term growth.",
  },
];

/* ---------------- METADATA ---------------- */

export const metadata = {
  title:
    "SEO Services in India | Website SEO Content & Optimization – Clever Crow",
  description:
    "Professional SEO services in India focused on rankings, organic traffic, and lead generation. Website SEO content, on-page & technical SEO.",
  keywords: [
    "seo services india",
    "website seo content",
    "search engine optimization services",
    "seo agency india",
    "local seo services india",
    "technical seo services",
  ],
};

/* ---------------- PAGE ---------------- */

export default function SeoServicesPage() {
  return (
    <main>
      {/* ================= HERO ================= */}
      <ServiceHero
        eyebrow="For Growth-Focused Businesses"
        title="SEO Services That Drive Long-Term Growth"
        subtitle="Rank higher on Google and generate consistent organic traffic and leads across India with data-driven SEO strategies."
        serviceName="SEO Services"
        highlights={[
          "Keyword-driven SEO strategy",
          "On-page & technical SEO",
          "SEO content creation",
          "Local & national SEO",
          "Core Web Vitals optimisation",
          "Long-term organic growth",
        ]}
        tools={[
          { src: "/logos/ga4.png", alt: "Google Analytics 4" },
          { src: "/logos/search-console.svg", alt: "Google Search Console" },
          { src: "/logos/gtm.svg", alt: "Google Tag Manager" },
        ]}
      />

      {/* ================= HOW IT HELPS ================= */}
      <HowItHelps
        badge="SEO Growth"
        title="SEO Services in India for Sustainable Business Growth"
        description="Our SEO services help businesses improve search visibility, attract high-intent traffic, and generate consistent leads through organic search."
        imageSrc="/images/seobg.jpg"
        imageAlt="SEO growth and organic traffic illustration"
        pills={[
          "Higher Google Rankings",
          "Organic Traffic Growth",
          "SEO Content Writing",
          "Technical SEO Fixes",
          "Local & National SEO",
        ]}
      />

      {/* ================= WHAT YOU GET ================= */}
      <WhatYouGet
        title="What’s Included in Our SEO Services"
        subtitle="Everything required to rank your website and grow organic traffic."
        items={[
          "SEO audit & competitor analysis",
          "Keyword research & search intent mapping",
          "On-page SEO optimisation",
          "Website SEO content writing",
          "Technical SEO & Core Web Vitals",
          "Internal linking & site structure",
          "Local SEO optimisation (if applicable)",
          "Monthly performance tracking & reporting",
        ]}
      />

      {/* ================= MID FUNNEL CTA ================= */}
      <DynamicCTA />

      {/* ================= SOCIAL PROOF ================= */}
      <StandardResults />

      {/* ================= FAQ ================= */}
      <FaqSection
        title="SEO Services – Frequently Asked Questions"
        description="Common questions about SEO, rankings, and organic growth."
        faqs={seoFaqs}
      />

      {/* ================= SCHEMA ================= */}
      <WebPageSchema
        title="SEO Services in India"
        description="Professional SEO services in India focused on organic traffic, rankings, and lead generation."
        url="https://clevercrow.in/seo-services"
      />

      <ServiceSchema
        serviceName="SEO Services"
        serviceDescription="SEO services in India including website SEO content, technical SEO, and on-page optimisation."
        pageUrl="https://clevercrow.in/seo-services"
      />

      <FaqSchema faqs={seoFaqs} />

      {/* ================= FINAL CTA ================= */}
      <ServiceCTA />
    </main>
  );
}
