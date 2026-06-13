import AiAutomationServiceLayout from "@/components/service/AiAutomationServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "What is CRM automation?", answer: "CRM automation uses workflows to automatically update lead stages, send reminders, assign tasks, generate reports, and manage sales pipeline activities." },
  { question: "Which CRMs do you work with?", answer: "We work with custom-built CRMs as well as popular platforms. We can also build a custom CRM specifically for your business." },
  { question: "Can CRM automation reduce manual work?", answer: "Yes. CRM automation eliminates repetitive tasks like data entry, status updates, and follow-up scheduling, saving hours of manual work daily." },
  { question: "How long does CRM automation setup take?", answer: "Basic CRM automation can be set up in 1–2 weeks. Complex multi-channel workflows may take 3–4 weeks." },
];

const services = [
  { icon: "database", title: "Pipeline Automation", description: "Automatically move leads through sales stages based on actions, time, and engagement.", href: "/crm-automation-services" },
  { icon: "target", title: "Task Assignment", description: "Auto-assign tasks, follow-ups, and reminders to team members based on lead activity.", href: "/crm-automation-services" },
  { icon: "monitor", title: "Automated Reporting", description: "Generate daily, weekly, and monthly reports automatically with key sales metrics.", href: "/crm-automation-services" },
  { icon: "smartphone", title: "Notification Workflows", description: "WhatsApp, email, and in-app notifications for lead updates, deadlines, and activities.", href: "/whatsapp-automation-services" },
  { icon: "users", title: "Team Performance Tracking", description: "Track team activity, response times, and conversion rates with automated dashboards.", href: "/crm-dashboard-development" },
  { icon: "rocket", title: "Multi-Channel Sync", description: "Sync CRM data with ads, forms, WhatsApp, email, and other lead sources automatically.", href: "/lead-management-automation" },
];

export const metadata = {
  title: "CRM Automation Services | Clever Crow",
  description: "Automate CRM updates, lead stages, reminders, task assignments and reporting so your sales team never misses a follow-up.",
  keywords: "CRM automation services, CRM workflow automation, sales CRM automation, automated CRM, CRM task automation",
};

const crmFlowchart = {
  title: "CRM WORKFLOW AUTOMATION",
  icon: "database",
  steps: [
    {
      title: "New Lead Logged",
      desc: "Lead gets automatically created in the CRM database.",
      icon: "database",
      colorClass: "bg-purple-500/10 text-purple-400 border-purple-500/20"
    },
    {
      title: "Stage Auto-Promotion",
      desc: "Pipeline stage updates automatically based on activity.",
      icon: "trendingup",
      colorClass: "bg-blue-500/10 text-blue-400 border-blue-500/20"
    },
    {
      title: "Task Assignment",
      desc: "Follow-up tasks and calendar events assigned to reps.",
      icon: "calendar",
      colorClass: "bg-amber-500/10 text-amber-400 border-amber-500/20"
    },
    {
      title: "Auto Document Send",
      desc: "Sends brochures or proposals automatically to the lead.",
      icon: "send",
      colorClass: "bg-green-500/10 text-green-400 border-green-500/20"
    }
  ]
};

export default function CrmAutomationServicesPage() {
  return (
    <main>
      <AiAutomationServiceLayout
        eyebrow="CRM Automation"
        heroTitle="CRM Automation Services"
        heroSubtitle="Automate CRM updates, lead stages, reminders, task assignments and reporting so your sales team never misses a follow-up."
        serviceName="CRM Automation"
        services={services}
        whyChoose={[
          "Automated pipeline management that moves leads through stages without manual updates.",
          "Smart task assignment and follow-up reminders to keep your sales team on track.",
          "Automated reporting with daily and weekly summaries of key sales metrics.",
          "Multi-channel sync that connects your CRM with ads, forms, and WhatsApp.",
          "Team performance tracking with response time and conversion rate dashboards.",
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/crm-automation-services"
        flowchart={crmFlowchart}
      />
      <WebPageSchema title="CRM Automation Services | Clever Crow" description="Automate CRM updates, lead stages, reminders, task assignments and reporting so your sales team never misses a follow-up." url="https://clevercrow.in/crm-automation-services" />
      <ServiceSchema serviceName="CRM Automation Services" serviceDescription="CRM automation for sales teams including pipeline management, task assignment, and automated reporting." pageUrl="https://clevercrow.in/crm-automation-services" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
