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
    question: "Which social media platforms do you manage?",
    answer:
      "We manage Instagram, Facebook, LinkedIn, Twitter (X), and YouTube based on your business goals and target audience.",
  },
  {
    question: "Do you create posts and captions?",
    answer:
      "Yes. Our social media management includes post creatives, captions, hashtags, and a structured content calendar.",
  },
  {
    question: "How many posts do you publish per month?",
    answer:
      "Posting frequency depends on the package. Typically, we post between 12 to 30 posts per month per platform.",
  },
  {
    question: "Can social media generate leads for my business?",
    answer:
      "Yes. With the right strategy, content, and audience targeting, social media can generate enquiries, leads, and sales.",
  },
  {
    question: "Do you run paid social media ads?",
    answer:
      "Paid social media ads are optional and can be added to boost reach, engagement, and lead generation.",
  },
  {
    question: "Do you provide monthly reports?",
    answer:
      "Yes. We provide monthly performance reports covering reach, engagement, follower growth, and insights.",
  },
];

/* ---------------- METADATA ---------------- */

export const metadata = {
  title:
    "Social Media Management Services in India | SMM Agency – Clever Crow",
  description:
    "Professional social media management services in India. Grow your brand, engagement, and leads on Instagram, Facebook & LinkedIn.",
  keywords: [
    "social media management services",
    "smm agency india",
    "social media marketing company",
    "instagram marketing services",
    "facebook marketing agency",
    "linkedin marketing services",
  ],
};

/* ---------------- PAGE ---------------- */

export default function SocialMediaManagementPage() {
  return (
    <main>
      {/* ================= HERO ================= */}
      <ServiceHero
        title="Social Media Management That Builds Brands & Leads"
        subtitle="Consistent content, audience growth, and conversions across all major platforms."
        serviceName="Social Media Management"
        highlights={[
          "Content strategy & planning",
          "Creative posts & captions",
          "Audience growth & engagement",
          "Optional paid social ads",
        ]}
        tools={[
          { src: "/images/meta.png", alt: "Meta Ads" },
        ]}
      />

      {/* ================= HOW IT HELPS ================= */}
      <HowItHelps
        badge="SMM Growth"
        title="Social Media Management Services for Business Growth"
        description="Our social media management services help businesses build brand awareness, engage their audience, and generate consistent leads through strategic content and platform optimisation."
        imageSrc="/images/smm.jpg"
        imageAlt="Social media marketing growth illustration"
        pills={[
          "Brand Visibility",
          "Audience Engagement",
          "Consistent Posting",
          "Lead Generation",
          "Paid Social Support",
        ]}
      />

      {/* ================= WHAT YOU GET ================= */}
      <WhatYouGet
        title="What’s Included in Our Social Media Management"
        subtitle="Everything required to grow your brand on social platforms."
        items={[
          "Social media strategy & planning",
          "Monthly content calendar",
          "Creative post designs",
          "Caption writing & hashtags",
          "Scheduled posting",
          "Audience engagement & replies",
          "Platform analytics & reporting",
          "Paid ads support (optional)",
        ]}
      />

      {/* ================= MID FUNNEL CTA ================= */}
      <DynamicCTA />

      {/* ================= SOCIAL PROOF ================= */}
      <StandardResults />

      {/* ================= FAQ ================= */}
      <FaqSection
        title="Social Media Management – Frequently Asked Questions"
        description="Common questions about social media management and growth."
        faqs={smmFaqs}
      />

      {/* ================= SCHEMA ================= */}
      <WebPageSchema
        title="Social Media Management Services in India"
        description="Professional social media management services focused on growth, engagement, and lead generation."
        url="https://clevercrow.in/social-media-management"
      />

      <ServiceSchema
        serviceName="Social Media Management"
        serviceDescription="Social media management services including content creation, posting, engagement, and reporting."
        pageUrl="https://clevercrow.in/social-media-management"
      />

      <FaqSchema faqs={smmFaqs} />

      {/* ================= FINAL CTA ================= */}
      <ServiceCTA />
    </main>
  );
}
