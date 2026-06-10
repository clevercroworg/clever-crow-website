import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "Do you work with businesses in Mangalore?", answer: "Yes, Clever Crow works with local businesses across Mangalore, coastal Karnataka, and globally for web development services." },
  { question: "What types of websites do you build in Mangalore?", answer: "We build corporate business websites, ecommerce platforms, high-converting landing pages, Next.js web applications, and custom software panels." },
  { question: "How long does a website project take?", answer: "Standard business websites take 2 to 4 weeks. E-commerce sites or custom platforms typically take 4 to 8 weeks depending on the complexity of features." },
  { question: "Will my website rank on Google for Mangalore local searches?", answer: "Yes, we integrate local SEO best practices (structure, metadata, schema markup) to help your site gain visibility in Mangalore search queries." }
];

const services = [
  { icon: "laptop", title: "Business Website Development", description: "Professional corporate and brand websites designed to build trust for businesses in Mangalore.", href: "/business-website-development" },
  { icon: "code2", title: "React / Next.js Development", description: "High-performance React and Next.js applications for scaling Mangalore businesses.", href: "/react-nextjs-website-development" },
  { icon: "shoppingcart", title: "Ecommerce Website Development", description: "Launch your online store in Mangalore with secure payment gateways and product management.", href: "/ecommerce-website-development" },
  { icon: "layout", title: "Landing Page Development", description: "High-converting landing pages for your advertising campaigns in Mangalore.", href: "/landing-page-development" },
  { icon: "refreshcw", title: "Website Redesign", description: "Modernize your existing website's UI/UX to improve speed and conversion rates.", href: "/website-redesign-services" },
  { icon: "wrench", title: "Website Maintenance", description: "Keep your website updated, secure, and running smoothly with regular backups and support.", href: "/website-maintenance-services" }
];

export const metadata = {
  title: "Website Development Company in Mangalore | Clever Crow",
  description: "Clever Crow builds business websites, ecommerce websites, landing pages and web apps for companies in and around Mangalore.",
  keywords: "website development company in Mangalore, web developers Mangalore, web design Mangalore, website company Mangalore, React Nextjs Mangalore",
};

export default function WebsiteDevelopmentCompanyMangalorePage() {
  return (
    <main>
      <WebDevServiceLayout
        eyebrow="Web Development in Mangalore"
        heroTitle="Website Development Company in Mangalore"
        heroSubtitle="Clever Crow builds business websites, ecommerce websites, landing pages and web apps for companies in and around Mangalore."
        serviceName="Website Development (Mangalore)"
        services={services}
        whyChoose={[
          "Local expertise building high-performance websites for Mangalore companies.",
          "Custom UI/UX designs that elevate your brand and build trust.",
          "Fast page load times (under 1.5s) and mobile-responsive layouts.",
          "Strong focus on search engine optimization and local search visibility.",
          "Full-cycle support from planning to launch and monthly maintenance."
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/website-development-company-mangalore"
      />
      <WebPageSchema title="Website Development Company in Mangalore | Clever Crow" description="Clever Crow builds business websites, ecommerce websites, landing pages and web apps for companies in and around Mangalore." url="https://clevercrow.in/website-development-company-mangalore" />
      <ServiceSchema serviceName="Website Development Company in Mangalore" serviceDescription="Clever Crow builds business websites, ecommerce websites, landing pages and web apps for companies in and around Mangalore." pageUrl="https://clevercrow.in/website-development-company-mangalore" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
