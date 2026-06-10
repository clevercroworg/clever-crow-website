import AppDevServiceLayout from "@/components/service/AppDevServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "What is a custom CRM?", answer: "A custom CRM is a customer relationship management system built specifically for your business workflows, unlike off-the-shelf tools like HubSpot or Zoho." },
  { question: "Can you integrate with WhatsApp and email?", answer: "Yes. We integrate CRM systems with WhatsApp, email, telephony, and other communication channels for seamless lead management." },
  { question: "Do you build analytics dashboards?", answer: "Yes. We build custom dashboards with real-time analytics, charts, reports, and KPI tracking for informed decision-making." },
  { question: "Can multiple team members use the CRM?", answer: "Yes. We build role-based access systems so different team members can access the features relevant to their responsibilities." },
];

const services = [
  { icon: "target", title: "Lead Management CRM", description: "Track leads from capture to conversion with automated pipelines and follow-up reminders.", href: "/crm-dashboard-development" },
  { icon: "monitor", title: "Sales Dashboard", description: "Real-time sales performance dashboards with team tracking, pipeline views, and revenue analytics.", href: "/crm-dashboard-development" },
  { icon: "users", title: "Team Management", description: "Assign leads, track team performance, manage tasks, and monitor daily activities.", href: "/crm-dashboard-development" },
  { icon: "database", title: "Reporting & Analytics", description: "Custom reports with charts, exports, and automated insights for data-driven decisions.", href: "/crm-dashboard-development" },
  { icon: "smartphone", title: "WhatsApp & Email Integration", description: "Connect your CRM with WhatsApp Business, email, and telephony for unified communication.", href: "/whatsapp-automation-services" },
  { icon: "calendar", title: "Booking & Appointment Tracking", description: "Built-in scheduling, appointment tracking, and follow-up automation within your CRM.", href: "/booking-system-development" },
];

export const metadata = {
  title: "CRM & Dashboard Development Company | Clever Crow",
  description: "Build custom CRM systems and business dashboards to track leads, sales, follow-ups, teams, bookings and customer activity.",
  keywords: "CRM dashboard development company, custom CRM development, business dashboard development, sales CRM, lead management CRM",
};

export default function CrmDashboardDevelopmentPage() {
  return (
    <main>
      <AppDevServiceLayout
        eyebrow="CRM & Dashboard Development"
        heroTitle="CRM and Dashboard Development for Businesses"
        heroSubtitle="Build custom CRM systems and business dashboards to track leads, sales, follow-ups, teams, bookings and customer activity."
        serviceName="CRM & Dashboard Development"
        services={services}
        whyChoose={[
          "Custom CRM built specifically for your sales process and business workflows.",
          "Real-time dashboards with visual analytics, charts, and actionable insights.",
          "Role-based access for team members with activity tracking and task management.",
          "WhatsApp, email, and telephony integrations for unified communication.",
          "Scalable architecture that grows with your team and customer base.",
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/crm-dashboard-development"
      />
      <WebPageSchema title="CRM & Dashboard Development Company | Clever Crow" description="Build custom CRM systems and business dashboards to track leads, sales, follow-ups, teams, bookings and customer activity." url="https://clevercrow.in/crm-dashboard-development" />
      <ServiceSchema serviceName="CRM & Dashboard Development" serviceDescription="Custom CRM and dashboard development for businesses to manage leads, sales, and customer activity." pageUrl="https://clevercrow.in/crm-dashboard-development" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
