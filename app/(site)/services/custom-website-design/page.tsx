import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const customWebsiteFaqs = [
  {
    question: "What is custom website design?",
    answer: "Custom website design means designing and developing a website from scratch, tailored specifically to your brand, goals, and business requirements—without relying on generic templates.",
  },
  {
    question: "Is custom website design better than templates?",
    answer: "Yes. Custom websites offer better performance, scalability, branding, and conversion optimisation compared to pre-built templates.",
  },
  {
    question: "Will my website be mobile-friendly?",
    answer: "Absolutely. All our custom websites are built mobile-first and optimised for all devices and screen sizes.",
  },
  {
    question: "Do you build websites using WordPress or custom code?",
    answer: "We build both. Depending on the project, we use WordPress, headless CMS, or custom front-end frameworks like React and Next.js for maximum speed.",
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes. We offer ongoing maintenance, updates, performance optimisation, and technical support after launch.",
  },
];

const customServices = [
  {
    icon: "code2",
    title: "Custom UI/UX React Sites",
    description: "Tailored component styling for a highly branded and responsive experience.",
    href: "/services/custom-website-design"
  },
  {
    icon: "laptop",
    title: "Headless CMS & Next.js",
    description: "Blazing fast static site generation paired with user-friendly dashboard backends.",
    href: "/services/custom-website-design"
  },
  {
    icon: "layout",
    title: "SaaS Product Frontend",
    description: "Sleek user interfaces and smooth state management built for complex web apps.",
    href: "/services/custom-website-design"
  },
  {
    icon: "shoppingcart",
    title: "Headless Commerce Stores",
    description: "High-performance ecommerce builds leveraging APIs for fast transaction flows.",
    href: "/services/ecommerce"
  },
  {
    icon: "refreshcw",
    title: "Legacy Code Redesign",
    description: "Porting legacy codebases to React and Next.js for cutting edge performance.",
    href: "/services/custom-website-design"
  },
  {
    icon: "wrench",
    title: "Dedicated Performance Audit",
    description: "Fine-tuning hydration, bundling, image sizes, and CDN delivery to pass Core Web Vitals.",
    href: "/services/custom-website-design"
  }
];

export const metadata = {
  title: "Website Development Services - Business & E-commerce | Clever Crow",
  description:
    "Custom website development with React, Next.js & modern tech stack. High-converting business websites and e-commerce stores. Get started now.",
  keywords: "website development company, custom website development, business website design, responsive website development, high performance websites, corporate website development",
};

export default function CustomWebsiteDesignPage() {
  return (
    <main>
      <WebDevServiceLayout
        eyebrow="React & Next.js Development"
        heroTitle="Custom Websites Built for Speed, Scalability, and Sales"
        heroSubtitle="We build bespoke web applications and high-performance React and Next.js sites tailored from scratch—no templates, no limits."
        serviceName="Custom Website Design"
        services={customServices}
        whyChoose={[
          "Custom-crafted codebase that avoids the heavy bloat of default page builders.",
          "Zero-configuration static site builds that load in milliseconds, ensuring maximum SEO advantages.",
          "Modern component-based design allowing simple UI updates and painless long-term scaling.",
          "Highly secure architecture using decoupled frontend setups and secure API calls.",
          "Integrated tracking analytics, server-side rendering, and performance optimization.",
          "Reliable developer support, clear documentation, and direct code management."
        ]}
        faqs={customWebsiteFaqs}
        pageUrl="https://clevercrow.in/services/custom-website-design"
      />

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
    </main>
  );
}
