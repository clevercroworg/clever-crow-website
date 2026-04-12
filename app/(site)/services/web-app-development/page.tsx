import ServiceHero from "@/components/service/ServiceHero";
import DynamicCTA from "@/components/DynamicCTA";
import FaqSection from "@/components/service/FaqSection";
import WebAppSections from "@/components/service/WebAppSections";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

/* ---------------- FAQ DATA ---------------- */

const webAppFaqs = [
  {
    question: "What is the difference between a website and a web app?",
    answer:
      "A website provides information, while a web app allows users to interact, manage data, and perform actions.",
  },
  {
    question: "Can you build custom dashboards?",
    answer:
      "Yes. We build dashboards tailored to your business needs.",
  },
  {
    question: "Do you develop SaaS platforms?",
    answer:
      "Yes. We build scalable SaaS applications for startups and businesses.",
  },
  {
    question: "Do you provide maintenance?",
    answer:
      "Yes. We offer ongoing support, updates, and improvements.",
  },
];

/* ---------------- METADATA ---------------- */

export const metadata = {
  title: "Web Application Development Services | Clever Crow",
  description:
    "We design and develop custom web applications that streamline operations, improve efficiency, and scale with your business.",
};

/* ---------------- PAGE ---------------- */

export default function WebAppDevelopmentPage() {
  return (
    <main>
      {/* ═══════════ HERO ═══════════ */}
      <ServiceHero
        eyebrow="Web Application Development"
        title="Build Powerful Web Applications for Your Business"
        subtitle="We design and develop custom web applications that streamline operations, improve efficiency, and scale with your business."
        serviceName="Web Application Development"
        highlights={[
          "Custom-Built Solutions",
          "Secure & Scalable Architecture",
          "Modern UI/UX",
          "Ongoing Support",
        ]}
      />

      {/* ═══════════ ANIMATED SECTIONS ═══════════ */}
      <WebAppSections />

      {/* ═══════════ MID CTA ═══════════ */}
      <DynamicCTA />

      {/* ═══════════ FAQ ═══════════ */}
      <FaqSection
        title="Frequently Asked Questions"
        description="Common questions about our web application development services."
        faqs={webAppFaqs}
      />

      {/* ═══════════ SCHEMA ═══════════ */}
      <WebPageSchema
        title="Web Application Development Services | Clever Crow"
        description="We design and develop custom web applications that streamline operations, improve efficiency, and scale with your business."
        url="https://clevercrow.in/services/web-app-development"
      />
      <ServiceSchema
        serviceName="Web Application Development Services"
        serviceDescription="Custom web application development for businesses including SaaS platforms, admin dashboards, CRM systems, and API integrations."
        pageUrl="https://clevercrow.in/services/web-app-development"
      />
      <FaqSchema faqs={webAppFaqs} />
    </main>
  );
}
