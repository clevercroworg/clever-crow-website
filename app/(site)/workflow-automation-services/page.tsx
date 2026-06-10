import AiAutomationServiceLayout from "@/components/service/AiAutomationServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "What is workflow automation?", answer: "Workflow automation uses technology to automate repetitive business processes like approvals, notifications, lead routing, reporting, and daily operations." },
  { question: "Which business processes can be automated?", answer: "Common processes include lead assignment, approval workflows, invoice generation, report scheduling, task routing, and customer notifications." },
  { question: "Do I need coding skills?", answer: "No. We build the automation for you and create simple interfaces that your team can use without technical knowledge." },
  { question: "Can it integrate with my existing tools?", answer: "Yes. We integrate workflow automation with your CRM, email, WhatsApp, project management tools, and other business software." },
];

const services = [
  { icon: "wrench", title: "Process Automation", description: "Automate repetitive business processes like approvals, routing, and notifications.", href: "/workflow-automation-services" },
  { icon: "target", title: "Lead Routing", description: "Automatically route leads to the right team members based on custom business rules.", href: "/lead-management-automation" },
  { icon: "monitor", title: "Report Automation", description: "Schedule and generate business reports automatically with real-time data.", href: "/workflow-automation-services" },
  { icon: "smartphone", title: "Notification Workflows", description: "Automated alerts via email, WhatsApp, and SMS for important business events.", href: "/whatsapp-automation-services" },
  { icon: "database", title: "Data Sync & Integration", description: "Sync data across multiple platforms and tools for unified business operations.", href: "/workflow-automation-services" },
  { icon: "shield", title: "Approval Workflows", description: "Digital approval chains for documents, expenses, leave requests, and business decisions.", href: "/workflow-automation-services" },
];

export const metadata = {
  title: "Workflow Automation Services | Clever Crow",
  description: "Reduce repetitive work by automating approvals, lead routing, notifications, reports and daily business processes.",
  keywords: "workflow automation services, business process automation, automated workflows, process optimization, task automation",
};

export default function WorkflowAutomationServicesPage() {
  return (
    <main>
      <AiAutomationServiceLayout
        eyebrow="Workflow Automation"
        heroTitle="Workflow Automation Services for Business Operations"
        heroSubtitle="Reduce repetitive work by automating approvals, lead routing, notifications, reports and daily business processes."
        serviceName="Workflow Automation"
        services={services}
        whyChoose={[
          "Eliminate repetitive manual tasks that waste your team's time every day.",
          "Smart routing and assignment rules that ensure work reaches the right people.",
          "Automated reporting that delivers insights without manual data collection.",
          "Multi-platform integration connecting all your business tools in one workflow.",
          "Scalable automation that grows with your team and business complexity.",
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/workflow-automation-services"
      />
      <WebPageSchema title="Workflow Automation Services | Clever Crow" description="Reduce repetitive work by automating approvals, lead routing, notifications, reports and daily business processes." url="https://clevercrow.in/workflow-automation-services" />
      <ServiceSchema serviceName="Workflow Automation Services" serviceDescription="Business workflow automation for approvals, lead routing, notifications, and daily operational processes." pageUrl="https://clevercrow.in/workflow-automation-services" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
