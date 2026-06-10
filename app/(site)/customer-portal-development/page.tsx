import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "What is a customer portal?", answer: "A customer portal is a secure self-service platform where your customers can view their requests, bookings, documents, payments, and account information." },
  { question: "Can customers track their orders?", answer: "Yes. We build order tracking, status updates, and notification systems so customers always know where things stand." },
  { question: "Is the portal secure?", answer: "Yes. We implement proper authentication, encrypted data storage, and role-based access to keep customer data safe." },
  { question: "Can it integrate with my existing systems?", answer: "Yes. Customer portals can be connected to your CRM, billing system, support desk, and other business tools." },
];

const services = [
  { icon: "users", title: "Account Management", description: "Secure login and profile management for customers to view and update their information.", href: "/customer-portal-development" },
  { icon: "monitor", title: "Order & Request Tracking", description: "Real-time tracking of orders, service requests, and support tickets.", href: "/customer-portal-development" },
  { icon: "database", title: "Document Access", description: "Secure document sharing for invoices, contracts, reports, and other important files.", href: "/customer-portal-development" },
  { icon: "target", title: "Payment History", description: "View payment history, download invoices, and manage billing information.", href: "/customer-portal-development" },
  { icon: "headphones", title: "Support Integration", description: "Built-in support ticket system or integration with existing helpdesk tools.", href: "/customer-portal-development" },
  { icon: "smartphone", title: "Notifications", description: "Email and WhatsApp notifications for status updates, reminders, and important announcements.", href: "/whatsapp-automation-services" },
];

export const metadata = {
  title: "Customer Portal Development Company | Clever Crow",
  description: "Give customers a secure portal to view requests, bookings, documents, payments, support updates and account information.",
  keywords: "customer portal development company, client portal development, self-service portal, customer management portal",
};

export default function CustomerPortalDevelopmentPage() {
  return (
    <main>
      <WebDevServiceLayout
        eyebrow="Customer Portal Development"
        heroTitle="Customer Portal Development for Better Customer Experience"
        heroSubtitle="Give customers a secure portal to view requests, bookings, documents, payments, support updates and account information."
        serviceName="Customer Portal Development"
        services={services}
        whyChoose={[
          "Self-service portals that reduce support load and improve customer satisfaction.",
          "Secure authentication with encrypted data storage and role-based access.",
          "Real-time tracking for orders, requests, and support tickets.",
          "Integration with your existing CRM, billing, and business tools.",
          "Clean, mobile-friendly interface that customers can use on any device.",
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/customer-portal-development"
      />
      <WebPageSchema title="Customer Portal Development Company | Clever Crow" description="Give customers a secure portal to view requests, bookings, documents, payments, support updates and account information." url="https://clevercrow.in/customer-portal-development" />
      <ServiceSchema serviceName="Customer Portal Development" serviceDescription="Custom customer portal development for secure self-service access to bookings, documents, payments, and support." pageUrl="https://clevercrow.in/customer-portal-development" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
