import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "What is WhatsApp automation?", answer: "WhatsApp automation uses chatbots and workflows to automatically reply to messages, qualify leads, send reminders, and manage customer conversations on WhatsApp Business." },
  { question: "Is WhatsApp automation allowed by WhatsApp?", answer: "Yes. We use the official WhatsApp Business API which allows automated messaging, chatbots, and workflow automation within WhatsApp's policies." },
  { question: "Can it send automated follow-ups?", answer: "Yes. You can set up automated follow-up sequences based on customer responses, time delays, and lead status." },
  { question: "Does it work with my CRM?", answer: "Yes. WhatsApp automation can be integrated with your CRM to log conversations, update lead stages, and trigger follow-up workflows." },
];

const services = [
  { icon: "smartphone", title: "Auto-Reply Setup", description: "Instant automated replies for common questions, business hours, and initial enquiries.", href: "/whatsapp-automation-services" },
  { icon: "target", title: "Lead Qualification", description: "Automated lead qualification flows that ask the right questions before passing leads to your team.", href: "/lead-management-automation" },
  { icon: "cpu", title: "AI-Powered Chat", description: "AI chatbots on WhatsApp that understand context and provide intelligent, relevant responses.", href: "/ai-chatbot-development" },
  { icon: "calendar", title: "Appointment Reminders", description: "Automated booking confirmations, appointment reminders, and follow-up messages.", href: "/booking-system-development" },
  { icon: "database", title: "CRM Integration", description: "Sync WhatsApp conversations with your CRM for unified lead tracking and management.", href: "/crm-automation-services" },
  { icon: "rocket", title: "Broadcast Campaigns", description: "Send targeted promotional messages, updates, and offers to segmented customer lists.", href: "/whatsapp-automation-services" },
];

export const metadata = {
  title: "WhatsApp Automation Services | Clever Crow",
  description: "Automate WhatsApp replies, lead qualification, follow-ups, reminders and customer communication with practical business workflows.",
  keywords: "WhatsApp automation services, WhatsApp chatbot, WhatsApp Business automation, WhatsApp lead management, WhatsApp marketing",
};

export default function WhatsappAutomationServicesPage() {
  return (
    <main>
      <WebDevServiceLayout
        eyebrow="WhatsApp Automation"
        heroTitle="WhatsApp Automation Services for Business Leads"
        heroSubtitle="Automate WhatsApp replies, lead qualification, follow-ups, reminders and customer communication with practical business workflows."
        serviceName="WhatsApp Automation"
        services={services}
        whyChoose={[
          "Official WhatsApp Business API integration for reliable, policy-compliant automation.",
          "Instant automated replies that improve response time and customer satisfaction.",
          "Lead qualification flows that filter and prioritize high-quality enquiries.",
          "CRM integration for unified lead tracking across WhatsApp and your sales pipeline.",
          "Broadcast campaigns for targeted promotions, updates, and customer engagement.",
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/whatsapp-automation-services"
      />
      <WebPageSchema title="WhatsApp Automation Services | Clever Crow" description="Automate WhatsApp replies, lead qualification, follow-ups, reminders and customer communication with practical business workflows." url="https://clevercrow.in/whatsapp-automation-services" />
      <ServiceSchema serviceName="WhatsApp Automation Services" serviceDescription="WhatsApp Business automation for lead qualification, customer communication, and follow-up workflows." pageUrl="https://clevercrow.in/whatsapp-automation-services" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
