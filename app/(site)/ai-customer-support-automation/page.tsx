import AiAutomationServiceLayout from "@/components/service/AiAutomationServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "What is AI customer support automation?", answer: "AI customer support automation uses chatbots and smart workflows to handle common customer queries, support requests, and status updates automatically." },
  { question: "Will it replace my support team?", answer: "No. AI handles routine queries and frees up your team to focus on complex issues that need human attention." },
  { question: "Can it handle multiple channels?", answer: "Yes. AI support can work across your website, WhatsApp, email, and social media channels simultaneously." },
  { question: "How does escalation work?", answer: "When the AI cannot resolve a query, it automatically escalates to a human agent with full context of the conversation." },
];

const services = [
  { icon: "headphones", title: "AI Support Chatbots", description: "Intelligent chatbots that handle FAQs, account queries, and common support requests.", href: "/ai-customer-support-automation" },
  { icon: "cpu", title: "Smart Ticket Routing", description: "Automatically categorize and route support tickets to the right team or agent.", href: "/ai-customer-support-automation" },
  { icon: "smartphone", title: "WhatsApp Support", description: "Automated customer support on WhatsApp with AI-powered responses and escalation.", href: "/whatsapp-automation-services" },
  { icon: "monitor", title: "Status Updates", description: "Automated order status, booking status, and request updates for customers.", href: "/ai-customer-support-automation" },
  { icon: "target", title: "Escalation Workflows", description: "Smart escalation rules that pass complex issues to human agents with full context.", href: "/ai-customer-support-automation" },
  { icon: "database", title: "Support Analytics", description: "Track resolution times, customer satisfaction, and support team performance.", href: "/analytics-tracking-setup" },
];

export const metadata = {
  title: "AI Customer Support Automation | Clever Crow",
  description: "Use AI automation to handle common customer questions, support requests, status updates and escalation workflows faster.",
  keywords: "AI customer support automation, automated customer support, AI support chatbot, customer service automation, support ticket automation",
};

export default function AiCustomerSupportAutomationPage() {
  return (
    <main>
      <AiAutomationServiceLayout
        eyebrow="AI Customer Support"
        heroTitle="AI Customer Support Automation for Faster Response"
        heroSubtitle="Use AI automation to handle common customer questions, support requests, status updates and escalation workflows faster."
        serviceName="AI Customer Support Automation"
        services={services}
        whyChoose={[
          "24/7 automated support that handles routine queries without human intervention.",
          "Smart escalation workflows that pass complex issues to the right team member.",
          "Multi-channel support across website, WhatsApp, email, and social media.",
          "Faster response times that improve customer satisfaction and retention.",
          "Support analytics that track resolution times and team performance.",
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/ai-customer-support-automation"
      />
      <WebPageSchema title="AI Customer Support Automation | Clever Crow" description="Use AI automation to handle common customer questions, support requests, status updates and escalation workflows faster." url="https://clevercrow.in/ai-customer-support-automation" />
      <ServiceSchema serviceName="AI Customer Support Automation" serviceDescription="AI-powered customer support automation for handling queries, support requests, and escalation workflows." pageUrl="https://clevercrow.in/ai-customer-support-automation" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
