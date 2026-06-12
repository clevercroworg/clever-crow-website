import AiAutomationServiceLayout from "@/components/service/AiAutomationServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "What is lead management automation?", answer: "Lead management automation captures, assigns, tracks, and follows up with leads automatically using CRM workflows, WhatsApp alerts, and email sequences." },
  { question: "Can it integrate with my existing CRM?", answer: "Yes. We integrate lead automation with popular CRMs as well as custom-built CRM systems." },
  { question: "Will it work with my Google Ads and Meta Ads leads?", answer: "Yes. We set up automatic lead capture from Google Ads, Meta Ads, website forms, and WhatsApp into your automation system." },
  { question: "How does lead assignment work?", answer: "Leads are automatically assigned to team members based on rules like location, service type, lead source, or round-robin distribution." },
];

const services = [
  { icon: "target", title: "Lead Capture Automation", description: "Automatically capture leads from ads, forms, WhatsApp, and website into your CRM.", href: "/lead-management-automation" },
  { icon: "users", title: "Lead Assignment", description: "Auto-assign leads to team members based on custom rules and round-robin distribution.", href: "/lead-management-automation" },
  { icon: "rocket", title: "Follow-Up Sequences", description: "Automated follow-up sequences via WhatsApp, email, and SMS to nurture leads.", href: "/sales-follow-up-automation" },
  { icon: "database", title: "Pipeline Tracking", description: "Visual lead pipeline with stage tracking, status updates, and conversion analytics.", href: "/crm-dashboard-development" },
  { icon: "smartphone", title: "WhatsApp Alerts", description: "Instant WhatsApp notifications for new leads, status changes, and follow-up reminders.", href: "/whatsapp-automation-services" },
  { icon: "monitor", title: "Lead Analytics", description: "Track lead sources, conversion rates, response times, and team performance.", href: "/analytics-tracking-setup" },
];

export const metadata = {
  title: "Lead Management Automation Services | Clever Crow",
  description: "Capture, assign, track and follow up with leads automatically using CRM workflows, WhatsApp alerts and sales pipeline automation.",
  keywords: "lead management automation, lead capture automation, automated lead follow-up, sales pipeline automation, CRM lead management",
};

export default function LeadManagementAutomationPage() {
  return (
    <main>
      <AiAutomationServiceLayout
        eyebrow="Lead Management Automation"
        heroTitle="Lead Management Automation"
        heroSubtitle="Capture, assign, track and follow up with leads automatically using CRM workflows, WhatsApp alerts and sales pipeline automation."
        serviceName="Lead Management Automation"
        services={services}
        whyChoose={[
          "Automatic lead capture from all channels — ads, forms, WhatsApp, and website.",
          "Smart lead assignment rules that route leads to the right team member instantly.",
          "Automated follow-up sequences that nurture leads without manual effort.",
          "Visual pipeline tracking with real-time status updates and conversion data.",
          "WhatsApp and email alerts that ensure no lead is ever missed or forgotten.",
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/lead-management-automation"
      />
      <WebPageSchema title="Lead Management Automation Services | Clever Crow" description="Capture, assign, track and follow up with leads automatically using CRM workflows, WhatsApp alerts and sales pipeline automation." url="https://clevercrow.in/lead-management-automation" />
      <ServiceSchema serviceName="Lead Management Automation" serviceDescription="Lead management automation services for capturing, assigning, tracking, and following up with leads automatically." pageUrl="https://clevercrow.in/lead-management-automation" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
