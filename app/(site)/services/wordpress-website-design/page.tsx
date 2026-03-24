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

const wordpressFaqs = [
  {
    question: "Do you design custom WordPress websites?",
    answer:
      "Yes. We design and develop fully custom WordPress websites tailored to your brand, goals, and content requirements.",
  },
  {
    question: "Will my WordPress site be mobile-friendly?",
    answer:
      "Absolutely. All our WordPress websites are fully responsive and optimised for mobile, tablet, and desktop devices.",
  },
  {
    question: "Can you redesign an existing WordPress website?",
    answer:
      "Yes. We redesign outdated WordPress sites to improve performance, UX, conversions, and visual appeal.",
  },
  {
    question: "Do you provide ongoing WordPress support?",
    answer:
      "Yes. We offer ongoing WordPress maintenance, updates, security monitoring, and performance optimisation.",
  },
  {
    question: "Is WordPress good for SEO?",
    answer:
      "WordPress is highly SEO-friendly when built correctly. We follow best practices for speed, structure, and on-page SEO.",
  },
];

/* ---------------- METADATA ---------------- */

export const metadata = {
  title: "WordPress Website Design Services in India | Clever Crow",
  description:
    "Professional WordPress website design services in India. Custom, SEO-friendly, and high-converting WordPress websites.",
};

/* ---------------- PAGE ---------------- */

export default function WordPressWebsiteDesignPage() {
  return (
    <main>
      {/* ================= HERO ================= */}
      <ServiceHero
        eyebrow="WordPress Experts"
        title="WordPress Websites Designed for Growth"
        subtitle="We design fast, scalable, and conversion-focused WordPress websites that reflect your brand and support long-term growth."
        serviceName="WordPress Website Design"
        highlights={[
          "Custom WordPress design",
          "Mobile-first & responsive",
          "SEO-friendly structure",
          "High performance & speed",
          "Easy content management",
        ]}
        tools={[
          { src: "/logos/wordpress.svg", alt: "WordPress" },
          { src: "/logos/elementor.svg", alt: "Elementor" },
          { src: "/logos/woocommerce.svg", alt: "WooCommerce" },
        ]}
      />

      {/* ================= HOW IT HELPS ================= */}
      <HowItHelps
        badge="WordPress Growth"
        title="WordPress Websites That Convert Visitors into Customers"
        description="Our WordPress website design services focus on performance, usability, and conversion—helping businesses build trust and generate leads online."
        imageSrc="/images/wordpress-website-design.jpg"
        imageAlt="WordPress website design illustration"
        pills={[
          "Better UX",
          "Faster Load Speed",
          "SEO Optimised",
          "Conversion Focused",
          "Scalable Architecture",
        ]}
      />

      {/* ================= MID CTA ================= */}
      <DynamicCTA />

      {/* ================= WHAT YOU GET ================= */}
      <WhatYouGet
        title="What’s Included in Our WordPress Website Design Services"
        subtitle="Everything required to launch and grow a professional WordPress website."
        items={[
          "Custom UI/UX design",
          "WordPress theme development",
          "Mobile & responsive optimisation",
          "SEO-friendly structure",
          "Speed & performance optimisation",
          "Security best practices",
          "Content management setup",
          "Launch & post-launch support",
        ]}
      />

      {/* ================= WHO THIS IS FOR ================= */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">
            Who Is This WordPress Website Service For?
          </h2>
          <p className="mt-4 text-gray-600 max-w-3xl">
            Our WordPress website design services are ideal for businesses that
            want a scalable, professional, and easy-to-manage website.
          </p>

          <ul className="mt-6 grid sm:grid-cols-2 gap-4 text-gray-700">
            <li>✔ Small & medium businesses</li>
            <li>✔ Startups & founders</li>
            <li>✔ Service-based companies</li>
            <li>✔ Ecommerce brands</li>
            <li>✔ Businesses redesigning outdated sites</li>
          </ul>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">
            Our WordPress Website Design Process
          </h2>

          <ol className="mt-8 space-y-4 text-gray-700">
            <li><strong>1. Discovery</strong> – Business goals & requirements</li>
            <li><strong>2. Design</strong> – UI/UX wireframes & visuals</li>
            <li><strong>3. Development</strong> – Custom WordPress build</li>
            <li><strong>4. Optimisation</strong> – Speed, SEO & responsiveness</li>
            <li><strong>5. Testing</strong> – Cross-device & browser checks</li>
            <li><strong>6. Launch</strong> – Go live & post-launch support</li>
          </ol>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <FaqSection
        title="WordPress Website Design – FAQs"
        description="Common questions about WordPress website design, development, and support."
        faqs={wordpressFaqs}
      />

      {/* ================= EDITORIAL CONTACT (GRAVITATE STYLE) ================= */}
       

      {/* ================= SCHEMA ================= */}
      <WebPageSchema
        title="WordPress Website Design Services in India"
        description="Custom WordPress website design services focused on performance, SEO, and conversions."
        url="https://clevercrow.in/services/wordpress-website-design"
      />

      <ServiceSchema
        serviceName="WordPress Website Design Services"
        serviceDescription="Professional WordPress website design services for businesses and brands."
        pageUrl="https://clevercrow.in/services/wordpress-website-design"
      />

      <FaqSchema faqs={wordpressFaqs} />

      {/* ================= FINAL CTA ================= */}
      <ServiceCTA />
    </main>
  );
}
