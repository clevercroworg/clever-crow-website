import DigitalMarketingServiceLayout from "@/components/service/DigitalMarketingServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const pillarFaqs = [
  {
    question: "Which digital marketing services do you offer?",
    answer: "We offer Google Ads, Meta Ads (Facebook & Instagram), SEO, social media management, lead generation campaigns, performance marketing, and analytics setup.",
  },
  {
    question: "How soon can I start getting leads?",
    answer: "Most paid advertising campaigns start generating leads within 7–14 days after proper setup, keyword research, and conversion tracking.",
  },
  {
    question: "Do you work with small businesses?",
    answer: "Yes. Our digital marketing services are designed for businesses of all sizes, from startups to established enterprises.",
  },
  {
    question: "Do you set up tracking and analytics?",
    answer: "Yes. We set up GA4, Google Tag Manager, Meta Pixel, conversion events, and lead tracking to measure every campaign properly.",
  },
];

const pillarServices = [
  {
    icon: "search",
    title: "Google Ads Management",
    description: "Run Google Search, lead generation and conversion-focused ad campaigns with keyword planning and tracking.",
    href: "/google-ads-management-services"
  },
  {
    icon: "megaphone",
    title: "Meta Ads Management",
    description: "Generate leads through Facebook and Instagram ads with strong creatives, targeting, and optimization.",
    href: "/meta-ads-management-services"
  },
  {
    icon: "target",
    title: "SEO Services",
    description: "Improve organic visibility with keyword research, on-page SEO, technical SEO, and content planning.",
    href: "/seo-services"
  },
  {
    icon: "pencil",
    title: "Social Media Management",
    description: "Build a consistent social media presence with content planning, post design, reels, and publishing.",
    href: "/social-media-management-services"
  },
  {
    icon: "rocket",
    title: "Lead Generation Campaigns",
    description: "Plan and run lead generation campaigns across Google, Meta, landing pages and WhatsApp.",
    href: "/lead-generation-campaigns"
  },
  {
    icon: "monitor",
    title: "Performance Marketing",
    description: "Scale paid campaigns with data-led strategy, creative testing, and continuous optimization for better ROI.",
    href: "/performance-marketing-agency"
  }
];

export const metadata = {
  title: "Digital Marketing Agency in India | Clever Crow",
  description:
    "Grow enquiries and sales with Google Ads, Meta Ads, SEO, social media management, lead generation campaigns and performance marketing.",
  keywords: "digital marketing agency in India, Google Ads management, Meta Ads management, SEO services, social media management, lead generation, performance marketing",
};

export default function DigitalMarketingAgencyPage() {
  return (
    <main>
      <DigitalMarketingServiceLayout
        eyebrow="Digital Marketing Agency"
        heroTitle="Digital Marketing Agency Focused on Leads and Growth"
        heroSubtitle="Grow enquiries and sales with Google Ads, Meta Ads, SEO, social media management, lead generation campaigns and performance marketing."
        serviceName="Digital Marketing"
        services={pillarServices}
        whyChoose={[
          "Performance-focused campaigns designed to generate quality leads, not just impressions.",
          "Full-funnel marketing strategy from awareness to conversion and follow-up.",
          "Data-driven optimization with proper GA4, GTM, and conversion tracking setup.",
          "Transparent reporting with clear metrics on leads, cost per lead, and ROI.",
          "Dedicated team managing your campaigns with regular reviews and improvements.",
        ]}
        faqs={pillarFaqs}
        pageUrl="https://clevercrow.in/digital-marketing-agency"
      />

      <WebPageSchema
        title="Digital Marketing Agency in India | Clever Crow"
        description="Grow enquiries and sales with Google Ads, Meta Ads, SEO, social media management, lead generation campaigns and performance marketing."
        url="https://clevercrow.in/digital-marketing-agency"
      />
      <ServiceSchema
        serviceName="Digital Marketing Services"
        serviceDescription="Digital marketing agency in India helping businesses grow with Google Ads, Meta Ads, SEO, social media management, and lead generation campaigns."
        pageUrl="https://clevercrow.in/digital-marketing-agency"
      />
      <FaqSchema faqs={pillarFaqs} />
    </main>
  );
}
