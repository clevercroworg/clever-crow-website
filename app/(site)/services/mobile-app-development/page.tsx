import ServicePageHero from "@/components/service/ServicePageHero";
import DynamicCTA from "@/components/DynamicCTA";
import FaqSection from "@/components/service/FaqSection";
import MobileAppSections from "@/components/service/MobileAppSections";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

/* ---------------- FAQ DATA ---------------- */

const mobileAppFaqs = [
  {
    question: "Do you build both Android and iOS apps?",
    answer:
      "Yes. Depending on your business goals, we can build for one platform first or launch across both.",
  },
  {
    question: "Can you build an MVP first?",
    answer:
      "Yes. MVP development is one of the best ways to test an app idea before investing in a larger build.",
  },
  {
    question: "Do you provide support after launch?",
    answer:
      "Yes. We can help with maintenance, updates, bug fixes, and future improvements.",
  },
  {
    question: "How long does it take to build a mobile app?",
    answer:
      "The timeline depends on the scope and complexity of the project. Simple MVPs can be launched much faster than large feature-rich apps.",
  },
];

/* ---------------- METADATA ---------------- */

export const metadata = {
  title: "Mobile App Development Services | Clever Crow",
  description:
    "We design and develop custom mobile apps for startups, service businesses, and growing brands. Fast, user-friendly, and built to scale.",
};

/* ---------------- PAGE ---------------- */

export default function MobileAppDevelopmentPage() {
  return (
    <main>
      {/* ═══════════ HERO ═══════════ */}
      <ServicePageHero
        eyebrow="Mobile App Development"
        title="Build a Mobile App That Grows Your Business"
        subtitle="We design and develop custom mobile apps for startups, service businesses, and growing brands. From idea to launch, we create apps that are fast, user-friendly, and built to scale."
        serviceName="Mobile App Development"
        primaryCta="Get Free Consultation"
        secondaryCta="View Our Process"
        secondaryCtaHref="#process"
        trustPoints={[
          "Android & iOS App Development",
          "Modern UI/UX Design",
          "Scalable Architecture",
          "Ongoing Support",
        ]}
      />

      {/* ═══════════ ANIMATED SECTIONS (Problem+Solution, Services, App Types, Why Choose, Process, Tech, Final CTA) ═══════════ */}
      <MobileAppSections />

      {/* ═══════════ MID CTA ═══════════ */}
      <DynamicCTA />

      {/* ═══════════ FAQ ═══════════ */}
      <FaqSection
        title="Frequently Asked Questions"
        description="Common questions about our mobile app development services."
        faqs={mobileAppFaqs}
      />

      {/* ═══════════ SCHEMA ═══════════ */}
      <WebPageSchema
        title="Mobile App Development Services | Clever Crow"
        description="We design and develop custom mobile apps for startups, service businesses, and growing brands."
        url="https://clevercrow.in/services/mobile-app-development"
      />
      <ServiceSchema
        serviceName="Mobile App Development Services"
        serviceDescription="Professional mobile app development services for iOS and Android platforms."
        pageUrl="https://clevercrow.in/services/mobile-app-development"
      />
      <FaqSchema faqs={mobileAppFaqs} />
    </main>
  );
}
