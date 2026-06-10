import AppDevServiceLayout from "@/components/service/AppDevServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "What is an admin panel?", answer: "An admin panel is a secure backend interface where you can manage your website or app content, users, orders, data, and business operations." },
  { question: "Can I control user roles and permissions?", answer: "Yes. We build role-based access control so different team members have appropriate access levels." },
  { question: "Can it integrate with my existing systems?", answer: "Yes. We can integrate admin panels with your existing website, app, CRM, payment gateways, and third-party tools." },
  { question: "Is the admin panel mobile-friendly?", answer: "Yes. All admin panels we build are responsive and work smoothly on tablets and mobile devices." },
];

const services = [
  { icon: "shield", title: "Content Management", description: "Manage website and app content, pages, blog posts, and media from a centralized dashboard.", href: "/admin-panel-development" },
  { icon: "users", title: "User Management", description: "Add, edit, and manage users with role-based access control and activity tracking.", href: "/admin-panel-development" },
  { icon: "shoppingcart", title: "Order & Booking Management", description: "Track and manage orders, bookings, payments, and customer transactions.", href: "/admin-panel-development" },
  { icon: "database", title: "Reports & Analytics", description: "Generate custom reports with data exports, charts, and business intelligence dashboards.", href: "/admin-panel-development" },
  { icon: "target", title: "Lead Management", description: "View, assign, and track leads with pipeline views and follow-up reminders.", href: "/crm-dashboard-development" },
  { icon: "wrench", title: "System Settings", description: "Configure business settings, notifications, integrations, and automated workflows.", href: "/admin-panel-development" },
];

export const metadata = {
  title: "Admin Panel Development Company | Clever Crow",
  description: "Manage users, content, bookings, orders, leads and reports with a secure custom admin panel built for your business workflow.",
  keywords: "admin panel development company, custom admin panel, admin dashboard development, backend management system",
};

export default function AdminPanelDevelopmentPage() {
  return (
    <main>
      <AppDevServiceLayout
        eyebrow="Admin Panel Development"
        heroTitle="Admin Panel Development for Custom Platforms"
        heroSubtitle="Manage users, content, bookings, orders, leads and reports with a secure custom admin panel built for your business workflow."
        serviceName="Admin Panel Development"
        services={services}
        whyChoose={[
          "Custom admin panels designed specifically for your business workflows and data structure.",
          "Role-based access control with proper security and activity logging.",
          "Clean, intuitive interfaces that your team can use without technical training.",
          "Real-time data management with search, filters, exports, and bulk actions.",
          "Seamless integration with your existing website, app, and third-party tools.",
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/admin-panel-development"
      />
      <WebPageSchema title="Admin Panel Development Company | Clever Crow" description="Manage users, content, bookings, orders, leads and reports with a secure custom admin panel built for your business workflow." url="https://clevercrow.in/admin-panel-development" />
      <ServiceSchema serviceName="Admin Panel Development" serviceDescription="Custom admin panel development for managing business operations, content, users, and data." pageUrl="https://clevercrow.in/admin-panel-development" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
