import ServiceHero from "@/components/service/ServiceHero";
import WhatYouGet from "@/components/service/WhatYouGet";
import ServiceCTA from "@/components/service/ServiceCTA";
import { StandardResults } from "@/components/service/StandardResults";
import DynamicCTA from "@/components/DynamicCTA";
import HowItHelps from "@/components/service/HowItHelps";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";

/* ---------------- METADATA ---------------- */

export const metadata = {
  title: "Video Script Writing Services in India | Clever Crow",
  description:
    "Professional video script writing services in India. High-converting scripts for reels, ads, YouTube videos, brand stories, and explainers.",
  keywords: [
    "video script writing services",
    "reel script writing",
    "youtube video script writer",
    "ad script writing services",
    "short video script writing india",
  ],
};

/* ---------------- PAGE ---------------- */

export default function VideoScriptWritingPage() {
  return (
    <main>
      {/* ================= HERO ================= */}
      <ServiceHero
        eyebrow="Video Script Writing"
        title="Video Scripts That Hook, Hold Attention, and Convert"
        subtitle="We write scroll-stopping video scripts designed for reels, ads, and long-form videos — built to capture attention and drive action."
        serviceName="Video Script Writing"
        highlights={[
          "Reels & short-form scripts",
          "YouTube video scripts",
          "Ad & performance scripts",
          "Hook-first storytelling",
          "Brand-aligned messaging",
        ]}
      />

      {/* ================= HOW IT HELPS ================= */}
      <HowItHelps
        badge="Scripts That Perform"
        title="Strategic Video Scripts Built for Engagement"
        description="Great visuals fail without strong scripts. Our video scripts are designed to hook viewers in the first few seconds, maintain retention, and drive clear outcomes."
        imageSrc="/images/smm.jpg"
        imageAlt="Video script writing services"
        pills={[
          "Stronger hooks",
          "Higher watch time",
          "Clear messaging",
          "Better conversions",
        ]}
      />

      {/* ================= WHAT YOU GET ================= */}
      <WhatYouGet
        title="What’s Included in Our Video Script Writing Services"
        subtitle="End-to-end scripting support tailored to your platform and goals."
        items={[
          "Reels & short-form video scripts",
          "YouTube & long-form scripts",
          "Ad scripts for Meta & YouTube",
          "Hook & opening line variations",
          "CTA-driven storytelling",
          "Brand voice alignment",
          "Platform-specific scripting",
        ]}
      />

      {/* ================= MID CTA ================= */}
      <DynamicCTA />

      {/* ================= SOCIAL PROOF ================= */}
      <StandardResults />

      {/* ================= SCHEMA ================= */}
      <WebPageSchema
        title="Video Script Writing Services in India"
        description="Professional video script writing services in India for reels, ads, YouTube videos, and brand storytelling."
        url="https://clevercrow.in/services/video-script-writing"
      />

      <ServiceSchema
        serviceName="Video Script Writing Services"
        serviceDescription="Video script writing services in India for short-form videos, ads, and long-form content."
        pageUrl="https://clevercrow.in/services/video-script-writing"
      />

      {/* ================= FINAL CTA ================= */}
      <ServiceCTA />
    </main>
  );
}
