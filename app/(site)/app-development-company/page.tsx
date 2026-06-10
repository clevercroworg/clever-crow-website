import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const pillarFaqs = [
  {
    question: "What types of apps do you build?",
    answer: "We build mobile apps, web apps, SaaS products, CRM dashboards, booking systems, admin panels, and customer portals for growing businesses.",
  },
  {
    question: "Do you build both Android and iOS apps?",
    answer: "Yes. Depending on your business goals, we can build for one platform first or launch across both Android and iOS simultaneously.",
  },
  {
    question: "Can you build an MVP first?",
    answer: "Yes. MVP development is one of the best ways to test an app idea before investing in a larger build.",
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer: "Yes. We offer ongoing maintenance, updates, bug fixes, and future improvements for all apps we build.",
  },
];

const pillarServices = [
  {
    icon: "smartphone",
    title: "Mobile App Development",
    description: "Design and develop mobile apps for business operations, customer engagement, booking, sales, and support.",
    href: "/mobile-app-development"
  },
  {
    icon: "monitor",
    title: "Web App Development",
    description: "Build custom web applications, dashboards, portals and internal tools that simplify operations.",
    href: "/web-app-development"
  },
  {
    icon: "database",
    title: "SaaS Product Development",
    description: "Turn your SaaS idea into a scalable product with planning, UI design, development, and launch support.",
    href: "/saas-product-development"
  },
  {
    icon: "target",
    title: "CRM & Dashboard Development",
    description: "Build custom CRM systems and business dashboards to track leads, sales, follow-ups, and customer activity.",
    href: "/crm-dashboard-development"
  },
  {
    icon: "calendar",
    title: "Booking System Development",
    description: "Create custom booking systems for hotels, resorts, clinics, events and service businesses.",
    href: "/booking-system-development"
  },
  {
    icon: "shield",
    title: "Admin Panel Development",
    description: "Manage users, content, bookings, orders, leads and reports with a secure custom admin panel.",
    href: "/admin-panel-development"
  }
];

export const metadata = {
  title: "App Development Company in India | Clever Crow",
  description:
    "Clever Crow builds mobile apps, web apps, SaaS products, CRM dashboards, booking systems, admin panels and customer portals for growing businesses.",
  keywords: "app development company in India, mobile app development, web app development, SaaS product development, CRM dashboard development",
};

export default function AppDevelopmentCompanyPage() {
  return (
    <main>
      <WebDevServiceLayout
        eyebrow="App Development Company"
        heroTitle="App Development Company for Scalable Digital Products"
        heroSubtitle="Clever Crow builds mobile apps, web apps, SaaS products, CRM dashboards, booking systems, admin panels and customer portals for growing businesses."
        serviceName="App Development"
        services={pillarServices}
        whyChoose={[
          "Custom-built apps tailored specifically to your business workflows and customer needs.",
          "Scalable architecture designed to handle growth without performance degradation.",
          "Clean, modern UI/UX that delivers a smooth experience across all devices.",
          "Secure development practices with proper authentication and data protection.",
          "Ongoing support, maintenance, and feature upgrades after launch.",
        ]}
        faqs={pillarFaqs}
        pageUrl="https://clevercrow.in/app-development-company"
      />

      <WebPageSchema
        title="App Development Company in India | Clever Crow"
        description="Clever Crow builds mobile apps, web apps, SaaS products, CRM dashboards, booking systems, admin panels and customer portals for growing businesses."
        url="https://clevercrow.in/app-development-company"
      />
      <ServiceSchema
        serviceName="App Development Services"
        serviceDescription="Professional app development company in India building mobile apps, web apps, SaaS products, CRM dashboards, and custom business platforms."
        pageUrl="https://clevercrow.in/app-development-company"
      />
      <FaqSchema faqs={pillarFaqs} />
    </main>
  );
}
