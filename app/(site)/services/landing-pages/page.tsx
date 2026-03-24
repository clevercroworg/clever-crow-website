import ServiceHero from "@/components/service/ServiceHero";
import HowItHelps from "@/components/service/HowItHelps";
import WhatYouGet from "@/components/service/WhatYouGet";
import DynamicCTA from "@/components/DynamicCTA";
import FaqSection from "@/components/service/FaqSection";
import ServiceCTA from "@/components/service/ServiceCTA";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";
import CustomQuoteForm from "@/components/modals/CustomQuoteForm";

/* ---------------- FAQ DATA ---------------- */

const landingPageFaqs = [
  {
    question: "What is a landing page?",
    answer:
      "A landing page is a focused, single-purpose page designed to convert visitors into leads or customers through a clear message, strong CTA, and conversion-focused design.",
  },
  {
    question: "Are landing pages different from websites?",
    answer:
      "Yes. Landing pages are built for specific campaigns or goals, whereas websites serve broader informational purposes.",
  },
  {
    question: "Do you design landing pages for ads?",
    answer:
      "Absolutely. We design landing pages optimised for Google Ads, Meta Ads, and other paid traffic sources.",
  },
  {
    question: "Will my landing page be mobile-friendly?",
    answer:
      "Yes. All our landing pages are designed mobile-first and tested across devices.",
  },
  {
    question: "Do you optimise landing pages for conversions?",
    answer:
      "Yes. We follow CRO best practices including layout, messaging hierarchy, page speed, and CTA optimisation.",
  },
];

/* ---------------- METADATA ---------------- */

export const metadata = {
  title: "Landing Page Design Services in India | Clever Crow",
  description:
    "High-converting landing page design services in India. Campaign-focused, fast, and conversion-optimised landing pages.",
};

/* ---------------- PAGE ---------------- */

export default function LandingPagesPage() {
  return (
    <main>
      {/* ================= HERO ================= */}
      <ServiceHero
        eyebrow="Conversion Focused"
        title="Landing Pages Designed to Convert"
        subtitle="We design high-performing landing pages that turn traffic into leads and customers."
        serviceName="Landing Page Design"
        highlights={[
          "Conversion-focused layouts",
          "Campaign-specific messaging",
          "Mobile-first design",
          "Fast-loading pages",
          "Clear CTAs & forms",
        ]}
        tools={[
          { src: "/logos/google.svg", alt: "Google Ads" },
          { src: "/logos/meta.svg", alt: "Meta Ads" },
          { src: "/logos/analytics.svg", alt: "Analytics" },
        ]}
      />

      {/* ================= HOW IT HELPS ================= */}
      <HowItHelps
        badge="CRO"
        title="Landing Pages Built for Performance"
        description="Our landing page design services help businesses maximise conversions from paid and organic traffic through focused design and messaging."
        imageSrc="/images/landing-page-design.jpg"
        imageAlt="Landing page design and conversion optimisation illustration"
        pills={[
          "Higher Conversion Rates",
          "Clear Value Proposition",
          "Optimised User Flow",
          "Ad-Friendly Layouts",
          "Fast Performance",
        ]}
      />

      {/* ================= MID CTA ================= */}
      <DynamicCTA />

      {/* ================= WHAT YOU GET ================= */}
      <WhatYouGet
        title="What’s Included in Our Landing Page Design Services"
        subtitle="Everything required to launch and scale high-converting landing pages."
        items={[
          "Landing page strategy & structure",
          "Custom UI/UX design",
          "Mobile-first responsive design",
          "Form & CTA integration",
          "Speed & performance optimisation",
          "SEO & on-page best practices",
          "Conversion optimisation setup",
        ]}
      />

      {/* ================= WHO THIS IS FOR ================= */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">
            Who Should Use Landing Pages?
          </h2>
          <p className="mt-4 text-gray-600 max-w-3xl">
            Landing pages are ideal for businesses running campaigns,
            promotions, or lead generation initiatives.
          </p>

          <ul className="mt-6 grid sm:grid-cols-2 gap-4 text-gray-700">
            <li>✔ Google Ads & Meta Ads campaigns</li>
            <li>✔ Lead generation funnels</li>
            <li>✔ Product launches</li>
            <li>✔ Service-based businesses</li>
            <li>✔ Conversion-focused marketing</li>
          </ul>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">
            Our Landing Page Design Process
          </h2>

          <ol className="mt-8 space-y-4 text-gray-700">
            <li><strong>1. Goal Definition</strong> – Campaign & conversion goals</li>
            <li><strong>2. Messaging</strong> – Value proposition & copy structure</li>
            <li><strong>3. Design</strong> – Conversion-focused UI/UX</li>
            <li><strong>4. Build</strong> – Responsive & fast implementation</li>
            <li><strong>5. Optimisation</strong> – CRO & performance tuning</li>
            <li><strong>6. Launch</strong> – Testing & deployment</li>
          </ol>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <FaqSection
        title="Landing Page Design – FAQs"
        description="Common questions about landing page design and conversion optimisation."
        faqs={landingPageFaqs}
      />

       

      {/* ================= SCHEMA ================= */}
      <WebPageSchema
        title="Landing Page Design Services in India"
        description="Landing page design services focused on conversions, performance, and campaign success."
        url="https://clevercrow.in/services/landing-pages"
      />

      <ServiceSchema
        serviceName="Landing Page Design Services"
        serviceDescription="High-converting landing page design services for campaigns and lead generation."
        pageUrl="https://clevercrow.in/services/landing-pages"
      />

      <FaqSchema faqs={landingPageFaqs} />

      {/* ================= FINAL CTA ================= */}
      <ServiceCTA />
    </main>
  );
}
