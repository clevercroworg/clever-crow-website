"use client";

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

/* ---------------- FAQ DATA ---------------- */

const creativesFaqs = [
  {
    question: "What are social media creatives?",
    answer:
      "Social media creatives include static posts, carousel designs, story creatives, banners, and visual content designed to attract attention and drive engagement.",
  },
  {
    question: "Which platforms do you design creatives for?",
    answer:
      "We design creatives for Instagram, Facebook, LinkedIn, WhatsApp, and paid social advertising platforms.",
  },
  {
    question: "Can these creatives be used for ads?",
    answer:
      "Yes. All creatives are optimised for both organic posting and paid advertising.",
  },
  {
    question: "Is this suitable for startups and enterprises?",
    answer:
      "Yes. Our creative services scale from startups to large enterprise teams.",
  },
];

export default function SocialMediaCreativesClient() {
  return (
    <main>
      <ServiceHero
        eyebrow="Social Media Creatives"
        title="Scroll-stopping social content designed to increase engagement"
        subtitle="Create social media visuals that don’t just look good — they make people pause, engage, and remember your brand."
        serviceName="Social Media Creatives"
        highlights={[
          "Instagram, Facebook & LinkedIn",
          "Paid ad creative formats",
          "Brand-consistent design systems",
          "Organic & paid-ready assets",
        ]}
      />

      <HowItHelps
        badge="Designed to Stand Out"
        title="Designed for brands that want to stand out"
        description="Brands that post irregularly or use inconsistent visuals lose attention. We help brands stay visible with high-quality, consistent creative."
        imageSrc="/images/metabg.jpg"
        imageAlt="Social media creative design"
        pills={[
          "Consistent brand presence",
          "Higher engagement",
          "Better brand recall",
        ]}
      />

      <WhatYouGet
        title="End-to-End Social Creative, Tailored to Your Goals"
        subtitle="Platform-ready content designed for engagement and consistency."
        items={[
          "Static posts & carousels",
          "Reels & short-form videos",
          "Story & ad creatives",
          "Brand-consistent layouts",
          "Creative optimisation for ads",
        ]}
      />

      <DynamicCTA />

      <StandardResults />

      <FaqSection
        title="Social Media Creatives – FAQs"
        description="Common questions about our creative services."
        faqs={creativesFaqs}
      />

      <WebPageSchema
        title="Social Media Creative Design Services in India"
        description="Professional social media creative design services in India."
        url="https://clevercrow.in/services/social-media-creatives"
      />

      <ServiceSchema
        serviceName="Social Media Creative Design Services"
        serviceDescription="Creative design services for social media marketing and advertising."
        pageUrl="https://clevercrow.in/services/social-media-creatives"
      />

      <FaqSchema faqs={creativesFaqs} />

      <ServiceCTA />
    </main>
  );
}
