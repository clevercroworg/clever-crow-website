import DigitalMarketingServiceLayout from "@/components/service/DigitalMarketingServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "What is a lead generation campaign?", answer: "A lead generation campaign is a structured marketing effort using ads, landing pages, and follow-up systems to capture and convert potential customers." },
  { question: "Which platforms do you use for lead generation?", answer: "We run lead generation campaigns on Google Ads, Meta Ads (Facebook & Instagram), landing pages, and WhatsApp." },
  { question: "How do you track leads?", answer: "We set up proper conversion tracking, CRM integration, and lead attribution so you know exactly where each lead came from." },
  { question: "What industries do you work with?", answer: "We work with service businesses, healthcare, education, real estate, ecommerce, and B2B companies across India." },
];

const services = [
  { icon: "target", title: "Google Ads Lead Gen", description: "Search and Performance Max campaigns designed to capture high-intent leads.", href: "/google-ads-management-services" },
  { icon: "megaphone", title: "Meta Ads Lead Gen", description: "Facebook and Instagram lead form ads with targeted audience segmentation.", href: "/meta-ads-management-services" },
  { icon: "layout", title: "Landing Page Funnels", description: "High-converting landing pages with forms, CTAs, and trust signals.", href: "/landing-page-development" },
  { icon: "smartphone", title: "WhatsApp Lead Capture", description: "WhatsApp-based lead capture with automated qualification and follow-up.", href: "/whatsapp-automation-services" },
  { icon: "database", title: "CRM & Follow-Up", description: "Automatic lead capture into CRM with follow-up sequences and alerts.", href: "/lead-management-automation" },
  { icon: "monitor", title: "Lead Tracking & Analytics", description: "End-to-end tracking from ad click to lead conversion with attribution data.", href: "/analytics-tracking-setup" },
];

export const metadata = {
  title: "Lead Generation Campaigns Agency | Clever Crow",
  description: "Plan and run lead generation campaigns across Google, Meta, landing pages and WhatsApp with tracking and follow-up systems.",
  keywords: "lead generation agency, lead generation campaigns, lead capture, Google Ads lead generation, Meta Ads lead generation",
};

export default function LeadGenerationCampaignsPage() {
  return (
    <main>
      <DigitalMarketingServiceLayout
        eyebrow="Lead Generation"
        heroTitle="Lead Generation Campaigns for Business Growth"
        heroSubtitle="Plan and run lead generation campaigns across Google, Meta, landing pages and WhatsApp with tracking and follow-up systems."
        serviceName="Lead Generation Campaigns"
        services={services}
        whyChoose={[
          "Multi-channel lead generation across Google Ads, Meta Ads, and WhatsApp.",
          "High-converting landing page funnels designed for maximum lead capture.",
          "Automated CRM integration with follow-up sequences for lead nurturing.",
          "End-to-end tracking and attribution to measure campaign performance accurately.",
          "Continuous optimization for improving lead quality and reducing cost per lead.",
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/lead-generation-campaigns"
      />
      <WebPageSchema title="Lead Generation Campaigns Agency | Clever Crow" description="Plan and run lead generation campaigns across Google, Meta, landing pages and WhatsApp with tracking and follow-up systems." url="https://clevercrow.in/lead-generation-campaigns" />
      <ServiceSchema serviceName="Lead Generation Campaigns" serviceDescription="Multi-channel lead generation campaigns with tracking, landing pages, and follow-up automation." pageUrl="https://clevercrow.in/lead-generation-campaigns" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
