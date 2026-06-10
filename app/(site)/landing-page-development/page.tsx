import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  {
    question: "What makes a landing page different from a website?",
    answer: "A landing page is a single focused page designed to drive one specific action, like a form submission or a purchase, while a website has multiple pages with broader information.",
  },
  {
    question: "Can you create landing pages for Google Ads?",
    answer: "Yes. We design high-converting landing pages specifically optimized for Google Ads, Meta Ads, and other paid campaigns.",
  },
  {
    question: "How quickly can a landing page be built?",
    answer: "Most landing pages can be designed, developed, and launched within 5–10 business days depending on complexity.",
  },
  {
    question: "Do you include tracking and analytics?",
    answer: "Yes. We set up GA4, Google Tag Manager, Meta Pixel, and conversion tracking on every landing page we build.",
  },
];

const services = [
  {
    icon: "layout",
    title: "Ad Campaign Landing Pages",
    description: "High-converting landing pages designed specifically for Google Ads and Meta Ads traffic.",
    href: "/landing-page-development"
  },
  {
    icon: "target",
    title: "Lead Generation Pages",
    description: "Focused lead capture pages with forms, CTAs, and trust signals to maximize enquiries.",
    href: "/lead-generation-campaigns"
  },
  {
    icon: "rocket",
    title: "Product Launch Pages",
    description: "Stunning product launch pages designed to create buzz and drive early adopter signups.",
    href: "/landing-page-development"
  },
  {
    icon: "shoppingcart",
    title: "Ecommerce Offer Pages",
    description: "Promotional landing pages for seasonal sales, flash deals, and special offers.",
    href: "/ecommerce-website-development"
  },
  {
    icon: "monitor",
    title: "Event Registration Pages",
    description: "Clean event and webinar registration pages with form integrations and confirmations.",
    href: "/landing-page-development"
  },
  {
    icon: "search",
    title: "SEO Landing Pages",
    description: "Keyword-optimized pages designed to rank organically and capture search traffic.",
    href: "/seo-services"
  }
];

export const metadata = {
  title: "Landing Page Development Services | Clever Crow",
  description:
    "Create high-converting landing pages for Google Ads, Meta Ads, lead generation campaigns, product launches and service offers.",
  keywords: "landing page development services, landing page design, high converting landing pages, Google Ads landing page, lead generation landing page",
};

export default function LandingPageDevelopmentPage() {
  return (
    <main>
      <WebDevServiceLayout
        eyebrow="Landing Page Development"
        heroTitle="Landing Page Development for Better Conversions"
        heroSubtitle="Create high-converting landing pages for Google Ads, Meta Ads, lead generation campaigns, product launches and service offers."
        serviceName="Landing Page Development"
        services={services}
        whyChoose={[
          "Conversion-focused designs with clear CTAs, trust signals, and persuasive copy structures.",
          "Optimized for Google Ads Quality Score to reduce your cost per click and cost per lead.",
          "Fast-loading pages that score high on Core Web Vitals for better ad performance.",
          "Mobile-first responsive design for consistent experience across all devices.",
          "Full tracking setup with GA4, GTM, Meta Pixel, and conversion event configuration.",
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/landing-page-development"
      />

      <WebPageSchema
        title="Landing Page Development Services | Clever Crow"
        description="Create high-converting landing pages for Google Ads, Meta Ads, lead generation campaigns, product launches and service offers."
        url="https://clevercrow.in/landing-page-development"
      />
      <ServiceSchema
        serviceName="Landing Page Development Services"
        serviceDescription="Professional landing page development for Google Ads, Meta Ads, lead generation campaigns, and product launches."
        pageUrl="https://clevercrow.in/landing-page-development"
      />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
