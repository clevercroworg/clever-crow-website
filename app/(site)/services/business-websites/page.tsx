import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
import { Laptop, Code2, ShoppingCart, Layout, RefreshCw, Wrench } from "lucide-react";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const businessWebsiteFaqs = [
  {
    question: "How many pages will my website have?",
    answer: "It depends on your requirement. Most business websites range from 5 to 15 pages.",
  },
  {
    question: "Will my website be mobile-friendly?",
    answer: "Yes. All our websites are fully responsive and optimized for mobile devices.",
  },
  {
    question: "Can you redesign my existing website?",
    answer: "Yes. We can redesign and improve your current website to boost load speed and conversions.",
  },
  {
    question: "Do you provide hosting?",
    answer: "We can guide you or help set up hosting based on your needs, including domain linking and SSL setups.",
  },
];

const businessServices = [
  {
    icon: Laptop,
    title: "Business Website Development",
    description: "Professional corporate and brand websites that establish instant trust and authority online.",
    href: "/services/business-websites"
  },
  {
    icon: Code2,
    title: "React / Next.js Development",
    description: "Bespoke high-performance web applications built using cutting-edge React and Next.js frameworks.",
    href: "/services/custom-website-design"
  },
  {
    icon: ShoppingCart,
    title: "Ecommerce Website Development",
    description: "Scalable digital shops designed with smooth product management and secure payment flows.",
    href: "/services/ecommerce"
  },
  {
    icon: Layout,
    title: "Landing Page Development",
    description: "Conversion-optimized landing pages designed for PPC, Google Ads, and Meta Ads campaign traffic.",
    href: "/services/landing-pages"
  },
  {
    icon: RefreshCw,
    title: "Website Redesign",
    description: "Modern updates for legacy websites to improve load speed, visual appeal, and sales conversions.",
    href: "/services/custom-website-design"
  },
  {
    icon: Wrench,
    title: "Website Maintenance",
    description: "Ongoing updates, hosting management, technical support, and backup configurations.",
    href: "/services/wordpress-website-design"
  }
];

export const metadata = {
  title: "Business Website Development - Lead Generation Sites | Clever Crow",
  description:
    "Professional business websites designed for lead generation and brand authority. Custom-built, mobile-optimized, and conversion-focused. Get a quote.",
  keywords: "business website development, small business website design, corporate website services, lead generation website, professional business websites, company website development",
};

export default function BusinessWebsiteDevelopmentPage() {
  return (
    <main>
      <WebDevServiceLayout
        eyebrow="Business Website Development"
        heroTitle="High-Performance Websites That Build Trust & Drive Growth"
        heroSubtitle="We design and develop professional business websites that are fast, secure, SEO-friendly, and built to convert visitors into customers."
        serviceName="Business Website Development"
        services={businessServices}
        whyChoose={[
          "Conversion-focused layouts engineered to turn website visitors into active leads.",
          "Clean, SEO-optimized structure and code that ranks higher on organic search results.",
          "Blazing-fast loading speeds under 1.5s for maximum user retention and better search signals.",
          "Responsive, mobile-first design that renders flawlessly on every smartphone and tablet.",
          "Integrated tracking analytics, contact forms, CRM sync, and marketing tools.",
          "Reliable post-launch maintenance, secure backups, and direct tech support."
        ]}
        faqs={businessWebsiteFaqs}
        pageUrl="https://clevercrow.in/services/business-websites"
      />

      <WebPageSchema
        title="Business Website Development Services | Clever Crow"
        description="We design and develop modern, fast, and mobile-friendly websites that help your business attract leads, build trust, and grow online."
        url="https://clevercrow.in/services/business-websites"
      />
      <ServiceSchema
        serviceName="Business Website Development Services"
        serviceDescription="Professional business website design and development services for companies, agencies, and growing brands."
        pageUrl="https://clevercrow.in/services/business-websites"
      />
      <FaqSchema faqs={businessWebsiteFaqs} />
    </main>
  );
}
