import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "Are you based in Udupi?", answer: "Yes, Clever Crow is a website development company based in Udupi, working with clients locally in Udupi and Manipal, as well as globally." },
  { question: "What types of websites do you build in Udupi?", answer: "We build business websites, ecommerce stores, landing pages, React/Next.js applications, and custom web systems." },
  { question: "How long does it take to develop a website?", answer: "Most standard business websites take 2 to 4 weeks, while larger ecommerce or custom web applications take 4 to 8 weeks." },
  { question: "Will my website rank on Google in Udupi?", answer: "Yes. Every website we build is optimized for local SEO, helping you rank for search terms in Udupi, Manipal, and surrounding areas." }
];

const services = [
  { icon: "laptop", title: "Business Website Development", description: "Professional corporate and brand websites designed to build trust for businesses in Udupi.", href: "/business-website-development" },
  { icon: "code2", title: "React / Next.js Development", description: "High-performance React and Next.js applications for scaling Udupi businesses.", href: "/react-nextjs-website-development" },
  { icon: "shoppingcart", title: "Ecommerce Website Development", description: "Launch your online store in Udupi with secure payment gateways and product management.", href: "/ecommerce-website-development" },
  { icon: "layout", title: "Landing Page Development", description: "High-converting landing pages for your advertising campaigns in Udupi and Manipal.", href: "/landing-page-development" },
  { icon: "refreshcw", title: "Website Redesign", description: "Modernize your existing website's UI/UX to improve speed and conversion rates.", href: "/website-redesign-services" },
  { icon: "wrench", title: "Website Maintenance", description: "Keep your website updated, secure, and running smoothly with regular backups and support.", href: "/website-maintenance-services" }
];

export const metadata = {
  title: "Website Development Company in Udupi | Clever Crow",
  description: "Build a professional business website, ecommerce site, landing page or React/Next.js website with Clever Crow in Udupi.",
  keywords: "website development company in Udupi, web dev Udupi, website developers Udupi, ecommerce website Udupi, React developer Udupi",
};

export default function WebsiteDevelopmentCompanyUdupiPage() {
  return (
    <main>
      <WebDevServiceLayout
        eyebrow="Web Development in Udupi"
        heroTitle="Website Development Company in Udupi"
        heroSubtitle="Build a professional business website, ecommerce site, landing page or React/Next.js website with Clever Crow in Udupi."
        serviceName="Website Development (Udupi)"
        services={services}
        whyChoose={[
          "Udupi-based website development company with local support and meetings.",
          "Custom, modern designs engineered to build instant trust with your clients.",
          "Highly SEO-optimized and fast loading speeds for local search rankings in coastal Karnataka.",
          "Mobile-responsive designs that render perfectly on all devices.",
          "Ongoing maintenance, support, and consulting for local businesses."
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/website-development-company-udupi"
      />
      <WebPageSchema title="Website Development Company in Udupi | Clever Crow" description="Build a professional business website, ecommerce site, landing page or React/Next.js website with Clever Crow in Udupi." url="https://clevercrow.in/website-development-company-udupi" />
      <ServiceSchema serviceName="Website Development Company in Udupi" serviceDescription="Build a professional business website, ecommerce site, landing page or React/Next.js website with Clever Crow in Udupi." pageUrl="https://clevercrow.in/website-development-company-udupi" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
