import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  {
    question: "What is React/Next.js website development?",
    answer: "React is a JavaScript library for building user interfaces, and Next.js is a framework built on top of React that adds server-side rendering, SEO optimization, and faster performance.",
  },
  {
    question: "Is Next.js better than WordPress?",
    answer: "For performance, scalability, and custom design, Next.js is significantly better. WordPress works well for simple blogs and template-based sites.",
  },
  {
    question: "Will my React/Next.js website be SEO-friendly?",
    answer: "Yes. Next.js provides built-in server-side rendering and static generation, making it one of the best frameworks for SEO.",
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes. We offer ongoing maintenance, updates, performance optimization, and technical support after launch.",
  },
];

const services = [
  {
    icon: "code2",
    title: "Custom React Websites",
    description: "Tailored component styling for a highly branded and responsive experience.",
    href: "/react-nextjs-website-development"
  },
  {
    icon: "laptop",
    title: "Headless CMS & Next.js",
    description: "Blazing fast static site generation paired with user-friendly dashboard backends.",
    href: "/react-nextjs-website-development"
  },
  {
    icon: "layout",
    title: "SaaS Product Frontend",
    description: "Sleek user interfaces and smooth state management built for complex web apps.",
    href: "/saas-product-development"
  },
  {
    icon: "shoppingcart",
    title: "Headless Commerce Stores",
    description: "High-performance ecommerce builds leveraging APIs for fast transaction flows.",
    href: "/ecommerce-website-development"
  },
  {
    icon: "refreshcw",
    title: "Legacy Code Redesign",
    description: "Porting legacy codebases to React and Next.js for cutting edge performance.",
    href: "/website-redesign-services"
  },
  {
    icon: "wrench",
    title: "Performance Audit",
    description: "Fine-tuning hydration, bundling, image sizes, and CDN delivery to pass Core Web Vitals.",
    href: "/website-maintenance-services"
  }
];

export const metadata = {
  title: "React & Next.js Website Development Company | Clever Crow",
  description:
    "Build fast, secure and scalable React and Next.js websites with premium UI, strong performance and SEO-friendly structure.",
  keywords: "React Next.js website development company, React website development, Next.js development services, custom React website",
};

export default function ReactNextjsWebsiteDevelopmentPage() {
  return (
    <main>
      <WebDevServiceLayout
        eyebrow="React & Next.js Development"
        heroTitle="React and Next.js Website Development Company"
        heroSubtitle="Build fast, secure and scalable React and Next.js websites with premium UI, strong performance and SEO-friendly structure."
        serviceName="React & Next.js Website Development"
        services={services}
        whyChoose={[
          "Custom-crafted codebase that avoids the heavy bloat of default page builders.",
          "Zero-configuration static site builds that load in milliseconds for maximum SEO advantages.",
          "Modern component-based design allowing simple UI updates and painless long-term scaling.",
          "Highly secure architecture using decoupled frontend setups and secure API calls.",
          "Integrated tracking analytics, server-side rendering, and performance optimization.",
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/react-nextjs-website-development"
      />

      <WebPageSchema
        title="React & Next.js Website Development Company | Clever Crow"
        description="Build fast, secure and scalable React and Next.js websites with premium UI, strong performance and SEO-friendly structure."
        url="https://clevercrow.in/react-nextjs-website-development"
      />
      <ServiceSchema
        serviceName="React & Next.js Website Development"
        serviceDescription="Professional React and Next.js website development services for businesses seeking fast, scalable, and SEO-optimized websites."
        pageUrl="https://clevercrow.in/react-nextjs-website-development"
      />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
