import AppDevServiceLayout from "@/components/service/AppDevServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "What is SaaS product development?", answer: "SaaS (Software as a Service) development is building a cloud-based software product that users access via subscription, typically through a web browser." },
  { question: "Can you help with the product idea and planning?", answer: "Yes. We help with product strategy, feature planning, UI/UX design, technical architecture, and go-to-market planning." },
  { question: "How long does it take to build a SaaS product?", answer: "An MVP can be built in 6–10 weeks. Full-featured SaaS products typically take 3–6 months depending on complexity." },
  { question: "Do you handle subscriptions and billing?", answer: "Yes. We integrate subscription management, billing, payment gateways, and user account management into your SaaS product." },
];

const services = [
  { icon: "database", title: "SaaS MVP Development", description: "Launch your minimum viable product quickly to validate your idea and attract early users.", href: "/saas-product-development" },
  { icon: "layout", title: "SaaS UI/UX Design", description: "Clean, intuitive dashboard interfaces designed for user engagement and easy onboarding.", href: "/saas-product-development" },
  { icon: "code2", title: "Full-Stack Development", description: "Complete frontend and backend development with modern frameworks and scalable architecture.", href: "/saas-product-development" },
  { icon: "shield", title: "Multi-Tenant Architecture", description: "Secure multi-tenant systems with role-based access, data isolation, and scalable infrastructure.", href: "/saas-product-development" },
  { icon: "target", title: "Subscription & Billing", description: "Integrated subscription management with payment gateways, invoicing, and usage tracking.", href: "/saas-product-development" },
  { icon: "wrench", title: "Ongoing Support & Scaling", description: "Post-launch support, feature development, performance optimization, and infrastructure scaling.", href: "/saas-product-development" },
];

export const metadata = {
  title: "SaaS Product Development Company | Clever Crow",
  description: "Turn your SaaS idea into a scalable product with planning, UI design, development, dashboards, subscriptions and launch support.",
  keywords: "SaaS product development company, SaaS MVP development, SaaS platform development, cloud software development",
};

export default function SaasProductDevelopmentPage() {
  return (
    <main>
      <AppDevServiceLayout
        eyebrow="SaaS Product Development"
        heroTitle="SaaS Product Development Company"
        heroSubtitle="Turn your SaaS idea into a scalable product with planning, UI design, development, dashboards, subscriptions and launch support."
        serviceName="SaaS Product Development"
        services={services}
        whyChoose={[
          "End-to-end SaaS development from idea validation to market launch.",
          "Scalable cloud architecture designed to grow with your user base.",
          "Clean, modern dashboards with intuitive navigation and user onboarding.",
          "Integrated subscription billing, payment processing, and user management.",
          "Post-launch support with continuous feature development and optimization.",
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/saas-product-development"
      />
      <WebPageSchema title="SaaS Product Development Company | Clever Crow" description="Turn your SaaS idea into a scalable product with planning, UI design, development, dashboards, subscriptions and launch support." url="https://clevercrow.in/saas-product-development" />
      <ServiceSchema serviceName="SaaS Product Development" serviceDescription="Professional SaaS product development from MVP to full-scale cloud platforms." pageUrl="https://clevercrow.in/saas-product-development" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
