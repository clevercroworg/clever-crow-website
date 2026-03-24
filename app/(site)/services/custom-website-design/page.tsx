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

const customWebsiteFaqs = [
  {
    question: "What is custom website design?",
    answer:
      "Custom website design means designing and developing a website from scratch, tailored specifically to your brand, goals, and business requirements—without relying on generic templates.",
  },
  {
    question: "Is custom website design better than templates?",
    answer:
      "Yes. Custom websites offer better performance, scalability, branding, and conversion optimisation compared to pre-built templates.",
  },
  {
    question: "Will my website be mobile-friendly?",
    answer:
      "Absolutely. All our custom websites are built mobile-first and optimised for all devices and screen sizes.",
  },
  {
    question: "Do you build websites using WordPress or custom code?",
    answer:
      "We build both. Depending on the project, we use WordPress, headless CMS, or custom front-end frameworks for maximum flexibility.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes. We offer ongoing maintenance, updates, performance optimisation, and technical support after launch.",
  },
];

/* ---------------- METADATA ---------------- */

export const metadata = {
  title: "Custom Website Design Services in India | Clever Crow",
  description:
    "Custom website design services in India. High-performance, conversion-focused websites tailored to your brand and business goals.",
};

/* ---------------- PAGE ---------------- */

export default function CustomWebsiteDesignPage() {
  return (
    <main>
      {/* ================= HERO ================= */}
      <ServiceHero
        eyebrow="Custom Web Design"
        title="Custom Websites Designed for Performance & Growth"
        subtitle="We design and build custom websites that reflect your brand, engage users, and support long-term business growth."
        serviceName="Custom Website Design"
        highlights={[
          "Fully custom UI/UX design",
          "Mobile-first & responsive",
          "High-performance builds",
          "SEO-friendly architecture",
          "Conversion-focused layouts",
        ]}
        tools={[
          { src: "/logos/html.svg", alt: "HTML" },
          { src: "/logos/css.svg", alt: "CSS" },
          { src: "/logos/javascript.svg", alt: "JavaScript" },
        ]}
      />

      {/* ================= HOW IT HELPS ================= */}
      <HowItHelps
        badge="Custom Build"
        title="Custom Websites Built Around Your Business"
        description="Our custom website design services focus on performance, usability, and scalability—giving your business a strong digital foundation."
        imageSrc="/images/custom-website-design.jpg"
        imageAlt="Custom website design and development illustration"
        pills={[
          "Unique Brand Identity",
          "Better UX",
          "Faster Load Times",
          "SEO Optimised",
          "Scalable Architecture",
        ]}
      />

      {/* ================= MID CTA ================= */}
      <DynamicCTA />

      {/* ================= WHAT YOU GET ================= */}
      <WhatYouGet
        title="What’s Included in Our Custom Website Design Services"
        subtitle="Everything required to build a high-performing custom website."
        items={[
          "Custom UI/UX design",
          "Responsive front-end development",
          "Performance optimisation",
          "SEO-friendly structure",
          "Accessibility best practices",
          "Content integration",
          "Security & best practices",
          "Launch & post-launch support",
        ]}
      />

      {/* ================= WHO THIS IS FOR ================= */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">
            Who Is Custom Website Design For?
          </h2>
          <p className="mt-4 text-gray-600 max-w-3xl">
            Custom website design is ideal for businesses that need flexibility,
            scalability, and a strong brand presence online.
          </p>

          <ul className="mt-6 grid sm:grid-cols-2 gap-4 text-gray-700">
            <li>✔ Growing businesses & startups</li>
            <li>✔ Brands needing unique design</li>
            <li>✔ Companies with complex requirements</li>
            <li>✔ SaaS & service-based businesses</li>
            <li>✔ Businesses redesigning legacy websites</li>
          </ul>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">
            Our Custom Website Design Process
          </h2>

          <ol className="mt-8 space-y-4 text-gray-700">
            <li><strong>1. Discovery</strong> – Business goals & requirements</li>
            <li><strong>2. UX Planning</strong> – Information architecture</li>
            <li><strong>3. Visual Design</strong> – Custom UI & branding</li>
            <li><strong>4. Development</strong> – Front-end & CMS build</li>
            <li><strong>5. Optimisation</strong> – Speed, SEO & accessibility</li>
            <li><strong>6. Launch</strong> – Testing & go-live</li>
          </ol>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <FaqSection
        title="Custom Website Design – FAQs"
        description="Common questions about custom website design and development."
        faqs={customWebsiteFaqs}
      />

      

      {/* ================= SCHEMA ================= */}
      <WebPageSchema
        title="Custom Website Design Services in India"
        description="Custom website design services focused on performance, scalability, and conversions."
        url="https://clevercrow.in/services/custom-website-design"
      />

      <ServiceSchema
        serviceName="Custom Website Design Services"
        serviceDescription="Professional custom website design services for businesses and brands."
        pageUrl="https://clevercrow.in/services/custom-website-design"
      />

      <FaqSchema faqs={customWebsiteFaqs} />

      {/* ================= FINAL CTA ================= */}
      <ServiceCTA />
    </main>
  );
}
