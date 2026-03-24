import ServiceHero from "@/components/service/ServiceHero";
import WhatYouGet from "@/components/service/WhatYouGet";
import ServiceCTA from "@/components/service/ServiceCTA";
import DynamicCTA from "@/components/DynamicCTA";
import HowItHelps from "@/components/service/HowItHelps";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";

/* ---------------- METADATA ---------------- */

export const metadata = {
  title: "Video Script Writing Services in India | Clever Crow",
  description:
    "High-converting video script writing services in India. Scripts for reels, ads, YouTube videos, explainers, and brand storytelling.",
  keywords: [
    "video script writing services",
    "reel script writing",
    "youtube script writer india",
    "ad video script writing",
    "short form video scripts",
  ],
};

/* ---------------- PAGE ---------------- */

export default function VideoScriptWritingPage() {
  return (
    <main>
      {/* ================= HERO ================= */}
      <ServiceHero
        eyebrow="Video Script Writing"
        title="Video Scripts That Hook Attention and Drive Action"
        subtitle="We write performance-focused video scripts designed to capture attention, hold viewers, and convert across reels, ads, and long-form videos."
        serviceName="Video Script Writing"
        highlights={[
          "Reels & short-form scripts",
          "Ad & performance scripts",
          "YouTube & long-form scripts",
          "Hook-first storytelling",
          "CTA-driven messaging",
        ]}
      />

      {/* ================= HOW IT HELPS ================= */}
      <HowItHelps
        badge="Scripts That Perform"
        title="Words That Make Videos Perform Better"
        description="Great visuals alone don’t convert. Our video scripts are written to hook viewers in the first few seconds, maintain watch time, and guide them toward clear actions."
        imageSrc="/images/video-script-writing.jpg"
        imageAlt="Video script writing services"
        pills={[
          "Stronger hooks",
          "Higher watch time",
          "Clear messaging",
          "Better conversions",
        ]}
      />

      {/* ================= MID CTA ================= */}
      <DynamicCTA />

      {/* ================= WHAT YOU GET ================= */}
      <WhatYouGet
        title="What’s Included in Our Video Script Writing Services"
        subtitle="End-to-end scripting support built for performance."
        items={[
          "Short-form reel & video scripts",
          "Ad scripts for Meta & YouTube",
          "YouTube & long-form video scripts",
          "Multiple hook & opening variations",
          "CTA-focused storytelling",
          "Brand voice alignment",
          "Platform-specific script formats",
        ]}
      />

      {/* ================= WHO THIS IS FOR ================= */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">
            Who Should Use Video Script Writing?
          </h2>
          <p className="mt-4 text-gray-600 max-w-3xl">
            Video script writing is ideal for brands and creators who want their
            videos to perform — not just look good.
          </p>

          <ul className="mt-6 grid sm:grid-cols-2 gap-4 text-gray-700">
            <li>✔ Brands creating reels & short videos</li>
            <li>✔ Businesses running video ads</li>
            <li>✔ YouTubers & content creators</li>
            <li>✔ B2B brands using video explainers</li>
            <li>✔ Startups building brand stories</li>
          </ul>
        </div>
      </section>

      {/* ================= SCHEMA ================= */}
      <WebPageSchema
        title="Video Script Writing Services in India"
        description="Professional video script writing services in India for reels, ads, YouTube videos, and brand storytelling."
        url="https://clevercrow.in/services/video-script-writing"
      />

      <ServiceSchema
        serviceName="Video Script Writing Services"
        serviceDescription="Video script writing services in India focused on engagement, watch time, and conversions."
        pageUrl="https://clevercrow.in/services/video-script-writing"
      />

      {/* ================= FINAL CTA ================= */}
      <ServiceCTA />
    </main>
  );
}
