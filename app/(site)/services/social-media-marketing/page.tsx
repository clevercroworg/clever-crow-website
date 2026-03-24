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

const smmFaqs = [
  {
    question: "What is social media marketing?",
    answer:
      "Social media marketing involves using platforms like Instagram, Facebook, LinkedIn, and YouTube to grow brand awareness, engage audiences, and generate leads or sales.",
  },
  {
    question: "Which platforms do you manage?",
    answer:
      "We manage Instagram, Facebook, LinkedIn, YouTube, and Twitter depending on your business goals and audience.",
  },
  {
    question: "How long does social media marketing take to show results?",
    answer:
      "Brand engagement and reach typically improve within the first month, while lead generation and sales grow steadily over 2–3 months.",
  },
  {
    question: "Do you run paid ads as part of social media marketing?",
    answer:
      "Yes. Our social media marketing strategy includes paid ads, retargeting, and campaign optimisation when required.",
  },
  {
    question: "Is social media marketing suitable for all businesses?",
    answer:
      "Social media marketing works best for brands, service businesses, startups, ecommerce, and companies looking to build long-term audience trust.",
  },
];

/* ---------------- METADATA ---------------- */

export const metadata = {
  title:
    "Social Media Marketing Services in India | Clever Crow",
  description:
    "Results-driven social media marketing services in India to grow your brand, engage audiences, and generate leads across Instagram, Facebook, and LinkedIn.",
  keywords: [
    "social media marketing services india",
    "instagram marketing agency",
    "facebook marketing services",
    "social media advertising india",
    "brand growth on social media",
  ],
};

/* ---------------- PAGE ---------------- */

export default function SocialMediaMarketingPage() {
  return (
    <main>
      {/* ================= HERO ================= */}
      <ServiceHero
        eyebrow="For Growth-Focused Brands"
        title="Social Media Marketing That Builds Brands & Drives Growth"
        subtitle="We help businesses grow their audience, engagement, and leads through strategic social media marketing across Instagram, Facebook, and LinkedIn."
        serviceName="Social Media Marketing"
        highlights={[
          "Platform-specific strategy",
          "Content & campaign planning",
          "Paid social advertising",
          "Audience growth & engagement",
          "Lead & sales generation",
          "Pan-India campaigns",
        ]}
        tools={[
          { src: "/images/meta.png", alt: "Meta Ads" },
        ]}
      />

      {/* ================= HOW IT HELPS ================= */}
      <HowItHelps
        badge="Social Media Growth"
        title="Social Media Marketing for Consistent Business Growth"
        description="Our social media marketing services combine content, creatives, and paid campaigns to help businesses grow visibility, trust, and conversions."
        imageSrc="/images/smm.jpg"
        imageAlt="Social media marketing growth illustration"
        pills={[
          "Brand Awareness",
          "Audience Engagement",
          "Paid Social Campaigns",
          "Lead Generation",
          "Sales Growth",
        ]}
      />

      {/* ================= WHAT YOU GET ================= */}
      <WhatYouGet
        title="What’s Included in Our Social Media Marketing Services"
        subtitle="Everything you need to grow and monetise your social media presence."
        items={[
          "Social media audit & strategy",
          "Content calendar & campaign planning",
          "Creative & caption strategy",
          "Paid social ad campaigns",
          "Audience targeting & retargeting",
          "Performance tracking & optimisation",
          "Monthly reporting & insights",
        ]}
      />

      {/* ================= MID CTA ================= */}
      <DynamicCTA />

      {/* ================= SOCIAL PROOF ================= */}
      <StandardResults />

      {/* ================= FAQ ================= */}
      <FaqSection
        title="Social Media Marketing – Frequently Asked Questions"
        description="Common questions about social media marketing services."
        faqs={smmFaqs}
      />

      {/* ================= SCHEMA ================= */}
      <WebPageSchema
        title="Social Media Marketing Services in India"
        description="Professional social media marketing services in India focused on brand growth, engagement, and lead generation."
        url="https://clevercrow.in/services/social-media-marketing"
      />

      <ServiceSchema
        serviceName="Social Media Marketing Services"
        serviceDescription="Social media marketing services in India to grow brands, engage audiences, and generate leads."
        pageUrl="https://clevercrow.in/services/social-media-marketing"
      />

      <FaqSchema faqs={smmFaqs} />

      {/* ================= FINAL CTA ================= */}
      <ServiceCTA />
    </main>
  );
}
