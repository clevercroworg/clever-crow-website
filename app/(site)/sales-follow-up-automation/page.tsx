import AiAutomationServiceLayout from "@/components/service/AiAutomationServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "What is sales follow-up automation?", answer: "Sales follow-up automation sets up automated sequences via WhatsApp, email, and CRM to follow up with leads at the right time without manual effort." },
  { question: "How does it improve conversion rates?", answer: "Faster, consistent follow-ups ensure no lead goes cold. Automated sequences maintain engagement until the lead is ready to buy." },
  { question: "Can follow-ups be personalized?", answer: "Yes. Follow-up messages can be personalized with the lead's name, service interest, and previous interactions." },
  { question: "Does it work across WhatsApp and email?", answer: "Yes. We set up multi-channel follow-up sequences that work across WhatsApp, email, SMS, and CRM notifications." },
];

const services = [
  { icon: "rocket", title: "Automated Follow-Up Sequences", description: "Pre-built follow-up sequences that trigger based on lead status and time intervals.", href: "/sales-follow-up-automation" },
  { icon: "smartphone", title: "WhatsApp Follow-Ups", description: "Automated WhatsApp messages for initial contact, reminders, and re-engagement.", href: "/whatsapp-automation-services" },
  { icon: "pencil", title: "Email Follow-Up Campaigns", description: "Drip email sequences that nurture leads with relevant content and offers.", href: "/sales-follow-up-automation" },
  { icon: "target", title: "Lead Scoring", description: "Score leads based on engagement and activity to prioritize follow-up efforts.", href: "/lead-management-automation" },
  { icon: "database", title: "CRM Integration", description: "Sync follow-up activities with your CRM for complete visibility and tracking.", href: "/crm-automation-services" },
  { icon: "monitor", title: "Follow-Up Analytics", description: "Track open rates, response rates, and conversion from follow-up sequences.", href: "/analytics-tracking-setup" },
];

export const metadata = {
  title: "Sales Follow-Up Automation Services | Clever Crow",
  description: "Set up automated follow-up sequences across WhatsApp, email and CRM to improve response speed and lead conversion.",
  keywords: "sales follow up automation, automated follow-up, lead follow-up automation, WhatsApp follow-up, email drip campaigns",
};

export default function SalesFollowUpAutomationPage() {
  return (
    <main>
      <AiAutomationServiceLayout
        eyebrow="Sales Follow-Up Automation"
        heroTitle="Sales Follow-Up Automation for Better Conversions"
        heroSubtitle="Set up automated follow-up sequences across WhatsApp, email and CRM to improve response speed and lead conversion."
        serviceName="Sales Follow-Up Automation"
        services={services}
        whyChoose={[
          "Automated follow-up sequences that ensure consistent contact with every lead.",
          "Multi-channel reach via WhatsApp, email, and SMS for maximum engagement.",
          "Personalized messages based on lead data, interests, and previous interactions.",
          "Lead scoring to prioritize high-value prospects for manual attention.",
          "Analytics and tracking to measure follow-up performance and conversion rates.",
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/sales-follow-up-automation"
      />
      <WebPageSchema title="Sales Follow-Up Automation Services | Clever Crow" description="Set up automated follow-up sequences across WhatsApp, email and CRM to improve response speed and lead conversion." url="https://clevercrow.in/sales-follow-up-automation" />
      <ServiceSchema serviceName="Sales Follow-Up Automation" serviceDescription="Automated sales follow-up sequences across WhatsApp, email, and CRM for improved lead conversion." pageUrl="https://clevercrow.in/sales-follow-up-automation" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
