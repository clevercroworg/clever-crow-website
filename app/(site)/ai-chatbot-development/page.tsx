import AiAutomationServiceLayout from "@/components/service/AiAutomationServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "What can an AI chatbot do for my business?", answer: "An AI chatbot can answer common customer questions, capture leads, qualify enquiries, provide instant support, and reduce manual follow-up work." },
  { question: "Can the chatbot work on WhatsApp?", answer: "Yes. We build AI chatbots that work on your website, WhatsApp Business, and other messaging platforms." },
  { question: "Does it replace human support?", answer: "No. AI chatbots handle routine queries and capture leads, while complex issues are escalated to your human support team." },
  { question: "How quickly can an AI chatbot be set up?", answer: "A basic AI chatbot can be set up in 1–2 weeks. More complex chatbots with custom integrations may take 3–4 weeks." },
];

const services = [
  { icon: "cpu", title: "Website Chatbots", description: "AI chatbots for your website that answer questions, capture leads, and guide visitors.", href: "/ai-chatbot-development" },
  { icon: "smartphone", title: "WhatsApp Chatbots", description: "Automated WhatsApp chatbots for lead capture, customer support, and follow-ups.", href: "/whatsapp-automation-services" },
  { icon: "target", title: "Lead Qualification Bots", description: "AI-powered bots that qualify leads by asking the right questions before passing them to your team.", href: "/lead-management-automation" },
  { icon: "headphones", title: "Customer Support Bots", description: "Automated support bots that handle FAQs, status queries, and common customer requests.", href: "/ai-customer-support-automation" },
  { icon: "database", title: "CRM-Integrated Chatbots", description: "Chatbots that sync with your CRM to log conversations, update lead status, and trigger workflows.", href: "/crm-automation-services" },
  { icon: "rocket", title: "Multi-Channel Bots", description: "Deploy chatbots across website, WhatsApp, Instagram, and Facebook from a single platform.", href: "/ai-chatbot-development" },
];

export const metadata = {
  title: "AI Chatbot Development Company | Clever Crow",
  description: "Build AI chatbots for websites, WhatsApp and support workflows to answer queries, capture leads and reduce manual follow-up.",
  keywords: "AI chatbot development company, chatbot development, WhatsApp chatbot, AI customer support chatbot, lead capture chatbot",
};

export default function AiChatbotDevelopmentPage() {
  return (
    <main>
      <AiAutomationServiceLayout
        eyebrow="AI Chatbot Development"
        heroTitle="AI Chatbot Development for Business Support and Leads"
        heroSubtitle="Build AI chatbots for websites, WhatsApp and support workflows to answer queries, capture leads and reduce manual follow-up."
        serviceName="AI Chatbot Development"
        services={services}
        whyChoose={[
          "AI chatbots trained on your business data for accurate, relevant responses.",
          "Multi-channel deployment across website, WhatsApp, and social media.",
          "Lead capture and qualification to ensure your sales team talks to the right people.",
          "Seamless CRM integration for automatic lead logging and workflow triggers.",
          "24/7 availability that never misses a customer query or business opportunity.",
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/ai-chatbot-development"
      />
      <WebPageSchema title="AI Chatbot Development Company | Clever Crow" description="Build AI chatbots for websites, WhatsApp and support workflows to answer queries, capture leads and reduce manual follow-up." url="https://clevercrow.in/ai-chatbot-development" />
      <ServiceSchema serviceName="AI Chatbot Development" serviceDescription="AI chatbot development for websites and WhatsApp to automate customer support and lead capture." pageUrl="https://clevercrow.in/ai-chatbot-development" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
