import AppDevServiceLayout from "@/components/service/AppDevServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  {
    question: "What is the difference between a website and a web app?",
    answer: "A website provides information, while a web app allows users to interact, manage data, and perform actions like submitting forms, tracking orders, or managing accounts.",
  },
  {
    question: "Can you build custom dashboards?",
    answer: "Yes. We build custom dashboards tailored to your business needs for tracking leads, sales, operations, and more.",
  },
  {
    question: "Do you develop SaaS platforms?",
    answer: "Yes. We build scalable SaaS applications for startups and businesses with subscription management and multi-tenant architecture.",
  },
  {
    question: "Do you provide maintenance?",
    answer: "Yes. We offer ongoing support, updates, security patches, and feature improvements.",
  },
];

const services = [
  {
    icon: "monitor",
    title: "Custom Web Applications",
    description: "Build web apps tailored to your business workflows for operations, sales, and customer management.",
    href: "/web-app-development"
  },
  {
    icon: "database",
    title: "SaaS Platforms",
    description: "Scalable SaaS products with subscription management, user dashboards, and API integrations.",
    href: "/saas-product-development"
  },
  {
    icon: "target",
    title: "CRM Systems",
    description: "Custom CRM solutions to manage leads, sales pipelines, and customer relationships.",
    href: "/crm-dashboard-development"
  },
  {
    icon: "layout",
    title: "Admin Panels",
    description: "Secure admin panels for managing users, content, orders, and business data.",
    href: "/admin-panel-development"
  },
  {
    icon: "users",
    title: "Customer Portals",
    description: "Self-service portals for customers to manage accounts, view orders, and access support.",
    href: "/customer-portal-development"
  },
  {
    icon: "code2",
    title: "API Integrations",
    description: "Connect your web app with third-party services, payment gateways, and business tools.",
    href: "/web-app-development"
  }
];

export const metadata = {
  title: "Web App Development Company | Clever Crow",
  description:
    "Build custom web applications, dashboards, portals and internal tools that simplify operations and improve customer experience.",
  keywords: "web app development company, custom web application development, web app design, SaaS development, business web app",
};

export default function WebAppDevelopmentPage() {
  return (
    <main>
      <AppDevServiceLayout
        eyebrow="Web App Development"
        heroTitle="Web App Development for Custom Platforms"
        heroSubtitle="Build custom web applications, dashboards, portals and internal tools that simplify operations and improve customer experience."
        serviceName="Web App Development"
        services={services}
        whyChoose={[
          "Custom-built web apps designed specifically for your business workflows and processes.",
          "Scalable architecture that handles growth without performance degradation.",
          "Secure development with proper authentication, authorization, and data protection.",
          "Modern React/Next.js frontend with clean, responsive UI/UX design.",
          "Ongoing support, maintenance, and feature development after launch.",
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/web-app-development"
      />

      <WebPageSchema
        title="Web App Development Company | Clever Crow"
        description="Build custom web applications, dashboards, portals and internal tools that simplify operations and improve customer experience."
        url="https://clevercrow.in/web-app-development"
      />
      <ServiceSchema
        serviceName="Web App Development Services"
        serviceDescription="Custom web application development including dashboards, portals, CRM systems, and SaaS platforms."
        pageUrl="https://clevercrow.in/web-app-development"
      />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
