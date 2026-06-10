import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const wordpressFaqs = [
  {
    question: "Do you design custom WordPress websites?",
    answer: "Yes. We design and develop fully custom WordPress websites tailored to your brand, goals, and content requirements—without bloated templates.",
  },
  {
    question: "Will my WordPress site be mobile-friendly?",
    answer: "Absolutely. All our WordPress websites are fully responsive and optimised for mobile, tablet, and desktop devices.",
  },
  {
    question: "Can you redesign an existing WordPress website?",
    answer: "Yes. We redesign outdated WordPress sites to improve performance, UX, conversions, and visual appeal.",
  },
  {
    question: "Do you provide ongoing WordPress support?",
    answer: "Yes. We offer ongoing WordPress maintenance, plugin updates, security monitoring, and speed performance reviews.",
  },
  {
    question: "Is WordPress good for SEO?",
    answer: "WordPress is highly SEO-friendly when built correctly. We optimize site speed, meta structure, schema markup, and content flow for search engines.",
  },
];

const wordpressServices = [
  {
    icon: "laptop",
    title: "Custom WordPress Design",
    description: "Fully custom visual designs engineered as clean, bespoke, and fast WordPress themes.",
    href: "/services/wordpress-website-design"
  },
  {
    icon: "shoppingcart",
    title: "WooCommerce Setup & Growth",
    description: "Scalable ecommerce solutions with customized product structures and catalog layouts.",
    href: "/services/ecommerce"
  },
  {
    icon: "code2",
    title: "Page Builder Customizations",
    description: "Building clean blocks in Elementor, Gutenberg, or Divi for easy non-technical team editing.",
    href: "/services/wordpress-website-design"
  },
  {
    icon: "refreshcw",
    title: "Weekly Backups & Security",
    description: "Setting up firewalls, malware scanning, database optimization, and automatic cloud backups.",
    href: "/services/wordpress-website-design"
  },
  {
    icon: "wrench",
    title: "Core & Plugin Maintenance",
    description: "Safe updates of themes, core WordPress files, and plugin extensions to prevent code conflicts.",
    href: "/services/wordpress-website-design"
  },
  {
    icon: "layout",
    title: "WordPress Speed Tuning",
    description: "Database cleanups, caching rule setups, and asset delivery optimizations for instant load times.",
    href: "/services/wordpress-website-design"
  }
];

export const metadata = {
  title: "WordPress Website Design Services in India | Clever Crow",
  description:
    "Professional WordPress website design services in India. Custom, SEO-friendly, and high-converting WordPress websites.",
};

export default function WordPressWebsiteDesignPage() {
  return (
    <main>
      <WebDevServiceLayout
        eyebrow="WordPress & Maintenance"
        heroTitle="WordPress Websites Designed for Performance & Growth"
        heroSubtitle="We design, build, and maintain custom WordPress websites that are fast, secure, easy to manage, and fully supported."
        serviceName="WordPress Website Design"
        services={wordpressServices}
        whyChoose={[
          "Bespoke theme builds that avoid bloated plugins and slow loading templates.",
          "Regular, automated backups stored securely off-site for rapid restore recovery.",
          "Active security monitoring to prevent hacks, malware, and unexpected downtime.",
          "Easy-to-use Gutenberg or element builder block setups tailored for non-developers.",
          "Integrated tracking analytics, contact forms, and automated performance updates.",
          "Direct developer support channel for content changes, troubleshooting, and code tweaks."
        ]}
        faqs={wordpressFaqs}
        pageUrl="https://clevercrow.in/services/wordpress-website-design"
      />

      <WebPageSchema
        title="WordPress Website Design Services in India"
        description="Custom WordPress website design services focused on performance, SEO, and conversions."
        url="https://clevercrow.in/services/wordpress-website-design"
      />
      <ServiceSchema
        serviceName="WordPress Website Design Services"
        serviceDescription="Professional WordPress website design services for businesses and brands."
        pageUrl="https://clevercrow.in/services/wordpress-website-design"
      />
      <FaqSchema faqs={wordpressFaqs} />
    </main>
  );
}
