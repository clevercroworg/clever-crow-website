import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
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

const services = [
  {
    icon: "laptop",
    title: "Business Website Development",
    description: "Professional corporate and brand websites that establish instant trust and authority online.",
    href: "/business-website-development"
  },
  {
    icon: "code2",
    title: "React / Next.js Development",
    description: "Bespoke high-performance web applications built using cutting-edge React and Next.js frameworks.",
    href: "/react-nextjs-website-development"
  },
  {
    icon: "shoppingcart",
    title: "Ecommerce Website Development",
    description: "Scalable digital shops with smooth product management and secure payment flows.",
    href: "/ecommerce-website-development"
  },
  {
    icon: "layout",
    title: "Landing Page Development",
    description: "Conversion-optimized landing pages designed for PPC, Google Ads, and Meta Ads campaign traffic.",
    href: "/landing-page-development"
  },
  {
    icon: "refreshcw",
    title: "Website Redesign",
    description: "Modern updates for legacy websites to improve load speed, visual appeal, and sales conversions.",
    href: "/website-redesign-services"
  },
  {
    icon: "wrench",
    title: "Website Maintenance",
    description: "Ongoing updates, hosting management, technical support, and backup configurations.",
    href: "/website-maintenance-services"
  }
];

export const metadata = {
  title: "Business Website Development Company | Clever Crow",
  description:
    "Get a professional business website designed to build trust, explain your services clearly and convert visitors into enquiries.",
  keywords: "business website development company, professional business website design, corporate website services, lead generation website",
};

export default function BusinessWebsiteDevelopmentPage() {
  return (
    <main>
      <WebDevServiceLayout
        eyebrow="Business Website Development"
        heroTitle="Business Website Development"
        heroSubtitle="Get a professional business website designed to build trust, explain your services clearly and convert visitors into enquiries."
        serviceName="Business Website Development"
        services={services}
        whyChoose={[
          "Conversion-focused layouts engineered to turn website visitors into active leads.",
          "Clean, SEO-optimized structure and code that ranks higher on organic search results.",
          "Blazing-fast loading speeds under 1.5s for maximum user retention.",
          "Responsive, mobile-first design that renders flawlessly on every device.",
          "Integrated tracking analytics, contact forms, CRM sync, and marketing tools.",
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/business-website-development"
      />

      <WebPageSchema
        title="Business Website Development Company | Clever Crow"
        description="Get a professional business website designed to build trust, explain your services clearly and convert visitors into enquiries."
        url="https://clevercrow.in/business-website-development"
      />
      <ServiceSchema
        serviceName="Business Website Development Services"
        serviceDescription="Professional business website design and development services for companies, agencies, and growing brands."
        pageUrl="https://clevercrow.in/business-website-development"
      />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
