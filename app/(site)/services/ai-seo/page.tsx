import ServiceHero from "@/components/service/ServiceHero";
import HowItHelps from "@/components/service/HowItHelps";
import WhatYouGet from "@/components/service/WhatYouGet";
import DynamicCTA from "@/components/DynamicCTA";
import { StandardResults } from "@/components/service/StandardResults";
import FaqSection from "@/components/service/FaqSection";
import ServiceCTA from "@/components/service/ServiceCTA";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

/* ---------------- FAQ DATA ---------------- */

const aiSeoFaqs = [
  {
    question: "What are AI SEO Algorithms?",
    answer:
      "AI SEO involves using machine learning, Natural Language Processing (NLP), and predictive analytics to optimize websites. Instead of guessing what Google wants, our algorithms process massive amounts of data to give precise optimization recommendations.",
  },
  {
    question: "How is AI SEO different from traditional SEO?",
    answer:
      "Traditional SEO relies heavily on manual keyword research and audits. AI SEO automates these processes, clustering keywords semantically, predicting content gaps, and optimizing for user intent at scale.",
  },
  {
    question: "Will AI SEO penalize my website?",
    answer:
      "No. We use AI to analyze data and improve strategy—not to spam or generate low-quality content. Our approach strictly adheres to Google's guidelines, focusing on helpful, high-quality information.",
  },
  {
    question: "Does this include AI-generated content?",
    answer:
      "While we use AI to structure and outline content for maximum relevance, our expert copywriters add the human touch, ensuring the final copy is engaging, factual, and persuasive.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "Because AI accelerates the analysis and implementation phases, you can often see ranking improvements faster than traditional methods, typically within a few months of deployment.",
  },
];

/* ---------------- METADATA ---------------- */

export const metadata = {
  title: "AI SEO Algorithms & Optimization Services in India | Clever Crow",
  description:
    "Dominate search rankings with our advanced AI SEO algorithms. Semantic search, NLP optimization, and predictive analytics for scalable organic growth.",
};

/* ---------------- PAGE ---------------- */

export default function AiSeoPage() {
  return (
    <main>
      {/* ================= HERO ================= */}
      <ServiceHero
        eyebrow="Next-Gen Search"
        title="AI SEO Algorithms: The Future of Search Rankings"
        subtitle="Dominate search results by leveraging advanced AI algorithms, predictive analytics, and automated on-page optimization designed to outrank the competition."
        serviceName="AI SEO"
        highlights={[
          "Predictive keyword analysis",
          "Semantic entity optimization",
          "Automated technical SEO fixes",
          "Competitor gap algorithms",
          "NLP content scoring",
        ]}
        tools={[
          { src: "/logos/ga4.png", alt: "Data Analytics" },
        ]}
      />

      {/* ================= HOW IT HELPS ================= */}
      <HowItHelps
        badge="Data-Driven"
        title="Stay Ahead of Constant Algorithm Updates"
        description="Traditional SEO is slow and manual. Our AI SEO Algorithms use machine learning to adapt to Google's continuous core updates, predict search trends, and optimize your website faster and more accurately."
        imageSrc="/images/aibg.jpg"
        imageAlt="AI SEO and Data Analytics dashboard"
        pills={[
          "Faster Rankings",
          "Data-Driven Insights",
          "Semantic Optimization",
          "Algorithmic Precision",
          "Future-Proof Strategy",
        ]}
      />

      {/* ================= WHAT YOU GET ================= */}
      <WhatYouGet
        title="What’s Included in Our AI SEO Services"
        subtitle="End-to-end optimization powered by machine learning and natural language processing."
        items={[
          "AI-assisted technical site audits",
          "Semantic keyword & entity clustering",
          "Predictive content gap analysis",
          "Automated schema markup generation",
          "NLP-driven content optimization",
          "Algorithmic penalty recovery",
          "Real-time ranking volatility tracking",
        ]}
      />

      {/* ================= MID CTA ================= */}
      <DynamicCTA />

      {/* ================= SOCIAL PROOF ================= */}
      <StandardResults />

      {/* ================= FAQ ================= */}
      <FaqSection
        title="AI SEO Algorithms – FAQs"
        description="Common questions about leveraging AI for search engine optimization."
        faqs={aiSeoFaqs}
      />

      {/* ================= SCHEMA ================= */}
      <WebPageSchema
        title="AI SEO Algorithms & Services in India"
        description="Advanced AI SEO services focusing on machine learning, precise analytics, and semantic search for superior rankings."
        url="https://clevercrow.in/services/ai-seo"
      />

      <ServiceSchema
        serviceName="AI SEO Algorithms & Optimization"
        serviceDescription="Machine learning and predictive AI search engine optimization services."
        pageUrl="https://clevercrow.in/services/ai-seo"
      />

      <FaqSchema faqs={aiSeoFaqs} />

      {/* ================= FINAL CTA ================= */}
      <ServiceCTA />
    </main>
  );
}
