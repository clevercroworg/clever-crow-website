import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  {
    question: "What does website maintenance include?",
    answer: "Website maintenance includes regular content updates, security patches, plugin updates, performance monitoring, backups, bug fixes, and technical support.",
  },
  {
    question: "How often do you update the website?",
    answer: "We offer flexible maintenance plans with weekly, bi-weekly, or monthly updates based on your business needs.",
  },
  {
    question: "Do you provide emergency support?",
    answer: "Yes. We provide priority support for critical issues like downtime, security vulnerabilities, and broken functionality.",
  },
  {
    question: "Can you maintain a website built by someone else?",
    answer: "Yes. We can take over maintenance of websites built on WordPress, React, Next.js, and other popular platforms.",
  },
];

const services = [
  {
    icon: "wrench",
    title: "Regular Updates & Fixes",
    description: "Keep your website content, plugins, and dependencies up to date with regular maintenance.",
    href: "/website-maintenance-services"
  },
  {
    icon: "shield",
    title: "Security Monitoring",
    description: "Protect your website with regular security scans, SSL management, and vulnerability patches.",
    href: "/website-maintenance-services"
  },
  {
    icon: "database",
    title: "Backups & Recovery",
    description: "Automated backups and disaster recovery plans to protect your website data.",
    href: "/website-maintenance-services"
  },
  {
    icon: "rocket",
    title: "Performance Optimization",
    description: "Ongoing speed optimization, image compression, and Core Web Vitals monitoring.",
    href: "/website-maintenance-services"
  },
  {
    icon: "monitor",
    title: "Uptime Monitoring",
    description: "24/7 uptime monitoring with instant alerts if your website goes down.",
    href: "/website-maintenance-services"
  },
  {
    icon: "headphones",
    title: "Technical Support",
    description: "Dedicated technical support for bug fixes, feature requests, and website improvements.",
    href: "/website-maintenance-services"
  }
];

export const metadata = {
  title: "Website Maintenance Services | Clever Crow",
  description:
    "Keep your website updated, secure and working smoothly with regular content updates, fixes, backups and performance support.",
  keywords: "website maintenance services, website support, website updates, website security, website backup services",
};

export default function WebsiteMaintenanceServicesPage() {
  return (
    <main>
      <WebDevServiceLayout
        eyebrow="Website Maintenance"
        heroTitle="Website Maintenance Services for Businesses"
        heroSubtitle="Keep your website updated, secure and working smoothly with regular content updates, fixes, backups and performance support."
        serviceName="Website Maintenance"
        services={services}
        whyChoose={[
          "Regular updates to keep your website content fresh and software secure.",
          "Automated backups with disaster recovery plans to protect your data.",
          "Ongoing performance monitoring and speed optimization for fast load times.",
          "Priority technical support for urgent fixes and critical issues.",
          "Transparent reporting on website health, uptime, and maintenance activities.",
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/website-maintenance-services"
      />

      <WebPageSchema
        title="Website Maintenance Services | Clever Crow"
        description="Keep your website updated, secure and working smoothly with regular content updates, fixes, backups and performance support."
        url="https://clevercrow.in/website-maintenance-services"
      />
      <ServiceSchema
        serviceName="Website Maintenance Services"
        serviceDescription="Professional website maintenance services including updates, security, backups, performance monitoring, and technical support."
        pageUrl="https://clevercrow.in/website-maintenance-services"
      />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
