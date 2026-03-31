import ServiceHero from "@/components/service/ServiceHero";
import WhatYouGet from "@/components/service/WhatYouGet";
import ServiceCTA from "@/components/service/ServiceCTA";
import ResultsCarousel from "@/components/ResultsCarousel";
import DynamicCTA from "@/components/DynamicCTA";
import HowItHelps from "@/components/service/HowItHelps";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";

/* ---------------- METADATA ---------------- */

export const metadata = {
  title: "Marketing Strategy & Growth Consulting Services | Clever Crow",
  description:
    "Data-driven marketing strategy services to help brands grow faster with clear positioning, channel planning, and scalable growth frameworks.",
  keywords: [
    "marketing strategy services",
    "growth marketing strategy",
    "go-to-market strategy",
    "digital marketing strategy consulting",
    "marketing planning services india",
  ],
};

/* ---------------- PAGE ---------------- */

export default function MarketingStrategyPage() {
  return (
    <main>
      {/* ================= HERO ================= */}
      <ServiceHero
        eyebrow="Marketing Strategy"
        title="Marketing Strategies Built for Scalable Growth"
        subtitle="We help businesses define clear positioning, choose the right channels, and build growth strategies that scale — not guesswork."
        serviceName="Marketing Strategy"
        highlights={[
          "Go-to-market planning",
          "Channel & funnel strategy",
          "Positioning & messaging",
          "Growth-focused frameworks",
        ]}
      />

      {/* ================= HOW IT HELPS ================= */}
      <HowItHelps
        badge="Strategic Growth"
        title="Clarity Before Execution"
        description="Most marketing fails due to lack of direction. Our marketing strategy services bring clarity on what to do, where to invest, and how to scale sustainably."
        imageSrc="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
        imageAlt="Marketing strategy planning illustration"
        pills={[
          "Clear market positioning",
          "Channel prioritisation",
          "Aligned marketing efforts",
          "Predictable growth roadmap",
        ]}
      />

      {/* ================= SOCIAL PROOF ================= */}
      <ResultsCarousel
        title="Strategy-Led Growth Results"
        items={[
          {
            client: "B2B SaaS Brand",
            industry: "SaaS",
            headline: "From Scattered Efforts to Focused Growth",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
            metrics: [
              { value: "3×", label: "Pipeline Growth" },
              { value: "42%", label: "Lower CAC" },
              { value: "2×", label: "Conversion Efficiency" },
            ],
          },
          {
            client: "D2C Brand",
            industry: "Ecommerce",
            headline: "Clear Strategy That Scaled Profitably",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
            metrics: [
              { value: "180%", label: "Revenue Growth" },
              { value: "35%", label: "Higher ROAS" },
              { value: "1.7×", label: "Customer Retention" },
            ],
          },
        ]}
      />

      {/* ================= MID CTA ================= */}
      <DynamicCTA />

      {/* ================= WHAT YOU GET ================= */}
      <WhatYouGet
        title="What’s Included in Our Marketing Strategy Services"
        subtitle="A complete strategic foundation before execution begins."
        items={[
          "Business & market analysis",
          "Audience & ICP definition",
          "Brand positioning & messaging",
          "Channel & funnel planning",
          "Content & campaign roadmap",
          "Paid vs organic growth strategy",
          "Budget & KPI planning",
          "Execution-ready strategic framework",
        ]}
      />

      {/* ================= SCHEMA ================= */}
      <WebPageSchema
        title="Marketing Strategy Services"
        description="Professional marketing strategy services focused on positioning, channel planning, and scalable business growth."
        url="https://clevercrow.in/services/marketing-strategy"
      />

      <ServiceSchema
        serviceName="Marketing Strategy Services"
        serviceDescription="Marketing strategy and growth consulting services designed to help businesses scale with clarity and direction."
        pageUrl="https://clevercrow.in/services/marketing-strategy"
      />

      {/* ================= FINAL CTA ================= */}
      <ServiceCTA />
    </main>
  );
}
