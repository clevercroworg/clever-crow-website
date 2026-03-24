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

const videoFaqs = [
  {
    question: "What are social media videos?",
    answer:
      "Social media videos include short-form videos such as Instagram Reels, YouTube Shorts, Facebook videos, and promotional brand videos designed for engagement and reach.",
  },
  {
    question: "Which platforms do you create videos for?",
    answer:
      "We create videos for Instagram, Facebook, YouTube Shorts, LinkedIn, and other social platforms based on your audience and goals.",
  },
  {
    question: "Do you handle scripting and editing?",
    answer:
      "Yes. We handle video concepts, scripting, editing, captions, hooks, and platform-optimised formats.",
  },
  {
    question: "Can social media videos generate leads or sales?",
    answer:
      "Absolutely. With the right hooks, CTAs, and targeting, social media videos can drive traffic, leads, and conversions.",
  },
  {
    question: "Is this suitable for all businesses?",
    answer:
      "Social media videos work best for brands, creators, service businesses, ecommerce, and companies building visibility and trust online.",
  },
];

/* ---------------- METADATA ---------------- */

export const metadata = {
  title: "Social Media Video & Reels Creation Services in India | Clever Crow",
  description:
    "High-performing social media video creation services in India. Reels, Shorts, and brand videos designed for engagement, reach, and growth.",
  keywords: [
    "social media video creation",
    "instagram reels agency",
    "youtube shorts creation",
    "short form video marketing",
    "social media video services india",
  ],
};

/* ---------------- PAGE ---------------- */

export default function SocialMediaVideosPage() {
  return (
    <main>
      {/* ================= HERO ================= */}
      <ServiceHero
        eyebrow="For Brands & Creators"
        title="Social Media Videos That Capture Attention & Drive Engagement"
        subtitle="We create high-performing reels, shorts, and social media videos designed to stop the scroll, boost engagement, and grow your brand."
        serviceName="Social Media Videos"
        highlights={[
          "Instagram Reels & Shorts",
          "Hook-based video scripting",
          "Platform-optimised edits",
          "Captions & CTAs",
          "Brand & promotional videos",
          "Pan-India delivery",
        ]}
        tools={[
          { src: "/images/meta.png", alt: "Meta Ads" },
        ]}
      />

      {/* ================= HOW IT HELPS ================= */}
      <HowItHelps
        badge="Video Growth"
        title="Short-Form Videos for Social Media Growth"
        description="Our social media video services help brands increase reach, engagement, and conversions using scroll-stopping short-form content."
        imageSrc="/images/smm.jpg"
        imageAlt="Social media video creation and reels illustration"
        pills={[
          "Higher Engagement",
          "Increased Reach",
          "Brand Visibility",
          "Lead & Sales Support",
          "Platform-Specific Formats",
        ]}
      />

      {/* ================= WHAT YOU GET ================= */}
      <WhatYouGet
        title="What’s Included in Our Social Media Video Services"
        subtitle="Everything you need to grow through short-form video content."
        items={[
          "Video content strategy",
          "Reels & Shorts scripting",
          "Video editing & motion graphics",
          "Hook & retention optimisation",
          "Captions, hashtags & CTAs",
          "Brand-aligned visuals",
          "Performance-based optimisation",
        ]}
      />

      {/* ================= MID CTA ================= */}
      <DynamicCTA />

      {/* ================= SOCIAL PROOF ================= */}
      <StandardResults />

      {/* ================= FAQ ================= */}
      <FaqSection
        title="Social Media Videos – Frequently Asked Questions"
        description="Common questions about reels, shorts, and social media video creation."
        faqs={videoFaqs}
      />

      {/* ================= SCHEMA ================= */}
      <WebPageSchema
        title="Social Media Video Creation Services in India"
        description="Professional social media video creation services in India focused on engagement, reach, and brand growth."
        url="https://clevercrow.in/services/social-media-videos"
      />

      <ServiceSchema
        serviceName="Social Media Video Creation Services"
        serviceDescription="Social media video and reels creation services in India for brands and businesses."
        pageUrl="https://clevercrow.in/services/social-media-videos"
      />

      <FaqSchema faqs={videoFaqs} />

      {/* ================= FINAL CTA ================= */}
      <ServiceCTA />
    </main>
  );
}
