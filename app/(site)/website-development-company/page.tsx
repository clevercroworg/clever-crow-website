import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const pillarFaqs = [
  {
    question: "What types of websites do you build?",
    answer: "We build business websites, React/Next.js websites, ecommerce stores, landing pages, web apps, and custom platforms for companies of all sizes.",
  },
  {
    question: "How long does it take to build a website?",
    answer: "Most business websites take 2–4 weeks depending on the scope. Larger projects like ecommerce stores or web apps may take 4–8 weeks.",
  },
  {
    question: "Do you provide SEO with website development?",
    answer: "Yes. Every website we build is SEO-optimized with clean code, fast loading speeds, proper meta tags, and mobile-friendly design.",
  },
  {
    question: "Can you redesign my existing website?",
    answer: "Yes. We can redesign and modernize your current website to improve speed, design, user experience, and conversion rates.",
  },
];

const pillarServices = [
  {
    icon: "laptop",
    title: "Business Website Development",
    description: "Professional business websites designed to build trust, explain your services, and convert visitors into enquiries.",
    href: "/business-website-development"
  },
  {
    icon: "code2",
    title: "React / Next.js Development",
    description: "Fast, secure and scalable React and Next.js websites with premium UI and SEO-friendly structure.",
    href: "/react-nextjs-website-development"
  },
  {
    icon: "shoppingcart",
    title: "Ecommerce Website Development",
    description: "Launch an ecommerce website with clean product pages, smooth checkout, and performance-focused design.",
    href: "/ecommerce-website-development"
  },
  {
    icon: "layout",
    title: "Landing Page Development",
    description: "High-converting landing pages for Google Ads, Meta Ads, lead generation campaigns, and product launches.",
    href: "/landing-page-development"
  },
  {
    icon: "refreshcw",
    title: "Website Redesign",
    description: "Redesign your outdated website into a faster, cleaner and more conversion-focused experience.",
    href: "/website-redesign-services"
  },
  {
    icon: "wrench",
    title: "Website Maintenance",
    description: "Keep your website updated, secure and working smoothly with regular content updates, fixes, and backups.",
    href: "/website-maintenance-services"
  }
];

export const metadata = {
  title: "Website Development Company in India | Clever Crow",
  description:
    "Build fast, modern and conversion-focused business websites, React/Next.js websites, ecommerce stores, landing pages and website redesigns with Clever Crow.",
  keywords: "website development company in India, web development services, business website development, ecommerce website, React Next.js website development",
};

export default function WebsiteDevelopmentCompanyPage() {
  return (
    <main>
      <WebDevServiceLayout
        eyebrow="Website Development Company"
        heroTitle="Website Development Company for Modern Businesses"
        heroSubtitle="Build fast, modern and conversion-focused business websites, React/Next.js websites, ecommerce stores, landing pages and website redesigns with Clever Crow."
        serviceName="Website Development"
        services={pillarServices}
        whyChoose={[
          "Conversion-focused layouts engineered to turn website visitors into active leads.",
          "Clean, SEO-optimized structure and code that ranks higher on organic search results.",
          "Blazing-fast loading speeds under 1.5s for maximum user retention and better search signals.",
          "Responsive, mobile-first design that renders flawlessly on every smartphone and tablet.",
          "Integrated tracking analytics, contact forms, CRM sync, and marketing tools.",
        ]}
        faqs={pillarFaqs}
        pageUrl="https://clevercrow.in/website-development-company"
      />

      <WebPageSchema
        title="Website Development Company in India | Clever Crow"
        description="Build fast, modern and conversion-focused business websites, React/Next.js websites, ecommerce stores, landing pages and website redesigns with Clever Crow."
        url="https://clevercrow.in/website-development-company"
      />
      <ServiceSchema
        serviceName="Website Development Services"
        serviceDescription="Professional website development company in India building business websites, React/Next.js sites, ecommerce stores, landing pages, and website redesigns."
        pageUrl="https://clevercrow.in/website-development-company"
      />
      <FaqSchema faqs={pillarFaqs} />
    </main>
  );
}
