import AiAutomationServiceLayout from "@/components/service/AiAutomationServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const pillarFaqs = [
  {
    question: "What is AI automation for businesses?",
    answer: "AI automation uses smart workflows and AI tools to handle repetitive tasks like lead follow-ups, customer support, WhatsApp replies, CRM updates, and sales processes automatically.",
  },
  {
    question: "Do I need technical knowledge to use AI automation?",
    answer: "No. We build simple, user-friendly automation systems that your team can use without any coding or technical skills.",
  },
  {
    question: "Can AI automation work with my existing CRM?",
    answer: "Yes. We integrate AI automation with your existing CRM, WhatsApp Business, email systems, and other business tools.",
  },
  {
    question: "How quickly can I see results from automation?",
    answer: "Most businesses see improved response times and better lead management within the first 2–4 weeks of implementing automation.",
  },
];

const pillarServices = [
  {
    icon: "cpu",
    title: "AI Chatbot Development",
    description: "Build AI chatbots for websites, WhatsApp and support workflows to answer queries and capture leads.",
    href: "/ai-chatbot-development"
  },
  {
    icon: "smartphone",
    title: "WhatsApp Automation",
    description: "Automate WhatsApp replies, lead qualification, follow-ups, reminders and customer communication.",
    href: "/whatsapp-automation-services"
  },
  {
    icon: "target",
    title: "Lead Management Automation",
    description: "Capture, assign, track and follow up with leads automatically using CRM workflows and alerts.",
    href: "/lead-management-automation"
  },
  {
    icon: "database",
    title: "CRM Automation",
    description: "Automate CRM updates, lead stages, reminders, task assignments and reporting for your sales team.",
    href: "/crm-automation-services"
  },
  {
    icon: "rocket",
    title: "Sales Follow-Up Automation",
    description: "Set up automated follow-up sequences across WhatsApp, email and CRM to improve lead conversion.",
    href: "/sales-follow-up-automation"
  },
  {
    icon: "wrench",
    title: "Workflow Automation",
    description: "Reduce repetitive work by automating approvals, lead routing, notifications, and daily processes.",
    href: "/workflow-automation-services"
  }
];

export const metadata = {
  title: "AI Automation Agency in India | Clever Crow",
  description:
    "Automate lead follow-ups, WhatsApp conversations, CRM workflows, customer support and sales processes with practical AI automation solutions.",
  keywords: "AI automation agency India, AI chatbot development, WhatsApp automation, lead management automation, CRM automation, workflow automation",
};

export default function AIAutomationAgencyPage() {
  return (
    <main>
      <AiAutomationServiceLayout
        eyebrow="AI Automation Agency"
        heroTitle="AI Automation Agency"
        heroSubtitle="Automate lead follow-ups, WhatsApp conversations, CRM workflows, customer support and sales processes with practical AI automation solutions."
        serviceName="AI Automation"
        services={pillarServices}
        whyChoose={[
          "Practical AI automation solutions designed for real business workflows, not just experiments.",
          "Seamless integration with your existing CRM, WhatsApp, email, and business tools.",
          "Faster response times that improve lead conversion and customer satisfaction.",
          "Reduced manual work so your team can focus on high-value activities.",
          "Ongoing optimization and support to keep your automation systems performing.",
        ]}
        faqs={pillarFaqs}
        pageUrl="https://clevercrow.in/ai-automation-agency"
      />

      <WebPageSchema
        title="AI Automation Agency in India | Clever Crow"
        description="Automate lead follow-ups, WhatsApp conversations, CRM workflows, customer support and sales processes with practical AI automation solutions."
        url="https://clevercrow.in/ai-automation-agency"
      />
      <ServiceSchema
        serviceName="AI Automation Services"
        serviceDescription="AI automation agency in India helping businesses automate lead follow-ups, WhatsApp conversations, CRM workflows, customer support and sales processes."
        pageUrl="https://clevercrow.in/ai-automation-agency"
      />
      <FaqSchema faqs={pillarFaqs} />
    </main>
  );
}
