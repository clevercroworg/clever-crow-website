import ServicePageHero from "@/components/service/ServicePageHero";
import DynamicCTA from "@/components/DynamicCTA";
import FaqSection from "@/components/service/FaqSection";
import BusinessWebsiteSections from "@/components/service/BusinessWebsiteSections";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

/* ---------------- FAQ DATA ---------------- */

const businessWebsiteFaqs = [
  {
    question: "How many pages will my website have?",
    answer:
      "It depends on your requirement. Most business websites range from 5 to 15 pages.",
  },
  {
    question: "Will my website be mobile-friendly?",
    answer:
      "Yes. All our websites are fully responsive and optimized for mobile devices.",
  },
  {
    question: "Can you redesign my existing website?",
    answer:
      "Yes. We can redesign and improve your current website.",
  },
  {
    question: "Do you provide hosting?",
    answer:
      "We can guide you or help set up hosting based on your needs.",
  },
];

/* ---------------- METADATA ---------------- */

export const metadata = {
  title: "Business Website Development Services | Clever Crow",
  description:
    "We design and develop modern, fast, and mobile-friendly websites that help your business attract leads, build trust, and grow online.",
};

/* ---------------- PAGE ---------------- */

export default function BusinessWebsiteDevelopmentPage() {
  return (
    <main>
      {/* ═══════════ HERO ═══════════ */}
      <ServicePageHero
        eyebrow="Business Website Development"
        title="Professional Business Websites That Convert Visitors into Customers"
        subtitle="We design and develop modern, fast, and mobile-friendly websites that help your business attract leads, build trust, and grow online."
        serviceName="Business Website Development"
        primaryCta="Get Free Consultation"
        secondaryCta="Start Your Website Project"
        secondaryCtaHref="#process"
        trustPoints={[
          "Mobile Responsive Design",
          "SEO-Ready Structure",
          "Fast Loading Speed",
          "Conversion-Focused Layout",
        ]}
      />

      {/* ═══════════ ANIMATED SECTIONS (Problem+Solution, Services, Website Types, Why Choose, Process, Tech, Pricing, Final CTA) ═══════════ */}
      <BusinessWebsiteSections />

      {/* ═══════════ MID CTA ═══════════ */}
      <DynamicCTA />

      {/* ═══════════ FAQ ═══════════ */}
      <FaqSection
        title="Frequently Asked Questions"
        description="Common questions about our business website development services."
        faqs={businessWebsiteFaqs}
      />

      {/* ═══════════ SCHEMA ═══════════ */}
      <WebPageSchema
        title="Business Website Development Services | Clever Crow"
        description="We design and develop modern, fast, and mobile-friendly websites that help your business attract leads, build trust, and grow online."
        url="https://clevercrow.in/services/business-websites"
      />
      <ServiceSchema
        serviceName="Business Website Development Services"
        serviceDescription="Professional business website design and development services for companies, agencies, and growing brands."
        pageUrl="https://clevercrow.in/services/business-websites"
      />
      <FaqSchema faqs={businessWebsiteFaqs} />
    </main>
  );
}
