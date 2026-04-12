import ServiceHero from "@/components/service/ServiceHero";
import DynamicCTA from "@/components/DynamicCTA";
import FaqSection from "@/components/service/FaqSection";
import EcommerceSections from "@/components/service/EcommerceSections";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

/* ---------------- FAQ DATA ---------------- */

const ecommerceFaqs = [
  {
    question: "Can I manage products myself?",
    answer:
      "Yes. You will have a dashboard to manage products, pricing, and orders.",
  },
  {
    question: "Do you integrate payment gateways?",
    answer:
      "Yes. We integrate secure payment systems like Razorpay and Stripe.",
  },
  {
    question: "Will my website be mobile-friendly?",
    answer:
      "Yes. All e-commerce websites are optimized for mobile users.",
  },
  {
    question: "Can you redesign my existing store?",
    answer:
      "Yes. We can redesign and improve your current e-commerce website.",
  },
];

/* ---------------- METADATA ---------------- */

export const metadata = {
  title: "E-commerce Website Development Services | Clever Crow",
  description:
    "We design and develop high-performance e-commerce websites that are fast, user-friendly, and optimized to convert visitors into customers.",
};

/* ---------------- PAGE ---------------- */

export default function EcommerceWebsiteDevelopmentPage() {
  return (
    <main>
      {/* ═══════════ HERO ═══════════ */}
      <ServiceHero
        eyebrow="E-commerce Website Development"
        title="Build an E-commerce Website That Drives Sales"
        subtitle="We design and develop high-performance e-commerce websites that are fast, user-friendly, and optimized to convert visitors into customers."
        serviceName="E-commerce Website Development"
        highlights={[
          "Mobile-Optimized Design",
          "Secure Payment Integration",
          "Fast Loading Speed",
          "Conversion-Focused Layout",
        ]}
      />

      {/* ═══════════ ANIMATED SECTIONS ═══════════ */}
      <EcommerceSections />

      {/* ═══════════ MID CTA ═══════════ */}
      <DynamicCTA />

      {/* ═══════════ FAQ ═══════════ */}
      <FaqSection
        title="Frequently Asked Questions"
        description="Common questions about our e-commerce website development services."
        faqs={ecommerceFaqs}
      />

      {/* ═══════════ SCHEMA ═══════════ */}
      <WebPageSchema
        title="E-commerce Website Development Services | Clever Crow"
        description="We design and develop high-performance e-commerce websites that are fast, user-friendly, and optimized to convert visitors into customers."
        url="https://clevercrow.in/services/ecommerce"
      />
      <ServiceSchema
        serviceName="E-commerce Website Development Services"
        serviceDescription="Professional e-commerce website design and development services with payment integration, product management, and mobile-first design."
        pageUrl="https://clevercrow.in/services/ecommerce"
      />
      <FaqSchema faqs={ecommerceFaqs} />
    </main>
  );
}
