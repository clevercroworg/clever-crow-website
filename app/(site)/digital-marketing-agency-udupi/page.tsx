import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "Do you work with businesses in Udupi?", answer: "Yes. Clever Crow is based in Udupi and works with local businesses across Udupi district for digital marketing services." },
  { question: "What digital marketing services do you offer in Udupi?", answer: "We offer Google Ads, Meta Ads, SEO, social media management, lead generation, and complete digital marketing solutions." },
  { question: "Can you manage Google Ads for my Udupi business?", answer: "Yes. We manage Google Ads campaigns with local targeting for businesses in Udupi, Manipal, and surrounding areas." },
  { question: "Do you offer in-person consultations?", answer: "Yes. Being based in Udupi, we offer both in-person and virtual consultations for local businesses." },
];

const services = [
  { icon: "search", title: "Google Ads Management", description: "Local Google Ads campaigns targeting customers searching for services in Udupi and nearby areas.", href: "/google-ads-management-services" },
  { icon: "megaphone", title: "Meta Ads Management", description: "Facebook and Instagram ads targeting Udupi audiences for lead generation and brand awareness.", href: "/meta-ads-management-services" },
  { icon: "target", title: "SEO Services", description: "Local SEO to help your Udupi business rank higher in Google for location-based searches.", href: "/seo-services" },
  { icon: "pencil", title: "Social Media Management", description: "Consistent social media presence for Udupi businesses with local content and engagement.", href: "/social-media-management-services" },
  { icon: "rocket", title: "Lead Generation", description: "Multi-channel lead generation campaigns tailored for Udupi and Manipal businesses.", href: "/lead-generation-campaigns" },
  { icon: "monitor", title: "Analytics & Tracking", description: "Complete tracking setup to measure marketing performance for your local campaigns.", href: "/analytics-tracking-setup" },
];

export const metadata = {
  title: "Digital Marketing Agency in Udupi | Clever Crow",
  description: "Clever Crow is a Udupi-based digital marketing agency helping businesses with Google Ads, Meta Ads, SEO, social media and lead generation.",
  keywords: "digital marketing agency in Udupi, Udupi digital marketing, Google Ads Udupi, SEO Udupi, social media marketing Udupi",
};

export default function DigitalMarketingAgencyUdupiPage() {
  return (
    <main>
      <WebDevServiceLayout
        eyebrow="Digital Marketing in Udupi"
        heroTitle="Digital Marketing Agency in Udupi"
        heroSubtitle="Clever Crow is a Udupi-based digital marketing agency helping businesses with Google Ads, Meta Ads, SEO, social media and lead generation."
        serviceName="Digital Marketing (Udupi)"
        services={services}
        whyChoose={[
          "Udupi-based agency with deep understanding of local market dynamics.",
          "Proven track record with businesses across Udupi, Manipal, and surrounding areas.",
          "Complete digital marketing services from Google Ads to social media management.",
          "Local SEO expertise to help your business rank for Udupi-specific searches.",
          "In-person and virtual consultations available for local businesses.",
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/digital-marketing-agency-udupi"
      />
      <WebPageSchema title="Digital Marketing Agency in Udupi | Clever Crow" description="Clever Crow is a Udupi-based digital marketing agency helping businesses with Google Ads, Meta Ads, SEO, social media and lead generation." url="https://clevercrow.in/digital-marketing-agency-udupi" />
      <ServiceSchema serviceName="Digital Marketing Agency in Udupi" serviceDescription="Udupi-based digital marketing agency offering Google Ads, Meta Ads, SEO, social media, and lead generation." pageUrl="https://clevercrow.in/digital-marketing-agency-udupi" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
