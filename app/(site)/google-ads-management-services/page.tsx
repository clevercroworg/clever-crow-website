import DigitalMarketingServiceLayout from "@/components/service/DigitalMarketingServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "How soon can I start getting leads from Google Ads?", answer: "Most Google Ads campaigns start generating leads within 7–14 days after proper setup, keyword research, and conversion tracking." },
  { question: "Do you manage Google Ads campaigns across all of India?", answer: "Yes. We manage PAN India Google Ads campaigns with city, state, and location-based targeting." },
  { question: "Is Google Ads suitable for small businesses?", answer: "Absolutely. Google Ads works well for small and medium-sized businesses when campaigns are structured with clear goals and budget control." },
  { question: "Do you set up conversion tracking?", answer: "Yes. We set up GA4, Google Tag Manager, and Google Ads conversion tracking to measure real leads, not just clicks." },
];

const services = [
  { icon: "search", title: "Search Campaigns", description: "High-intent search ads that capture customers actively looking for your services.", href: "/google-ads-management-services" },
  { icon: "megaphone", title: "Performance Max", description: "AI-powered campaigns across Search, Display, YouTube, and Discover for maximum reach.", href: "/google-ads-management-services" },
  { icon: "target", title: "Lead Generation Ads", description: "Campaigns focused on generating quality leads with optimized cost per acquisition.", href: "/lead-generation-campaigns" },
  { icon: "layout", title: "Landing Page Design", description: "High-converting landing pages designed specifically for Google Ads traffic.", href: "/landing-page-development" },
  { icon: "monitor", title: "Conversion Tracking", description: "GA4, GTM, and Google Ads conversion tracking setup for accurate lead measurement.", href: "/analytics-tracking-setup" },
  { icon: "rocket", title: "Campaign Optimization", description: "Ongoing bid, keyword, and ad copy optimization for better ROI month over month.", href: "/google-ads-management-services" },
];

export const metadata = {
  title: "Google Ads Management Services | Clever Crow",
  description: "Run Google Search, lead generation and conversion-focused ad campaigns with keyword planning, tracking and ongoing optimization.",
  keywords: "Google Ads management services, Google Ads agency, PPC management, Google search ads, Google Ads optimization",
};

export default function GoogleAdsManagementServicesPage() {
  return (
    <main>
      <DigitalMarketingServiceLayout
        eyebrow="Google Ads Management"
        heroTitle="Google Ads Management Services for Quality Leads"
        heroSubtitle="Run Google Search, lead generation and conversion-focused ad campaigns with keyword planning, tracking and ongoing optimization."
        serviceName="Google Ads Management"
        services={services}
        whyChoose={[
          "Lead-focused campaign strategy designed to generate quality enquiries, not just clicks.",
          "Complete GA4, GTM, and conversion tracking setup for accurate performance measurement.",
          "Ongoing keyword, bid, and ad copy optimization for continuously improving ROI.",
          "High-converting landing page design optimized for Google Ads Quality Score.",
          "Transparent reporting with clear metrics on leads, cost per lead, and campaign ROI.",
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/google-ads-management-services"
      />
      <WebPageSchema title="Google Ads Management Services | Clever Crow" description="Run Google Search, lead generation and conversion-focused ad campaigns with keyword planning, tracking and ongoing optimization." url="https://clevercrow.in/google-ads-management-services" />
      <ServiceSchema serviceName="Google Ads Management Services" serviceDescription="Professional Google Ads management with keyword planning, conversion tracking, and ongoing campaign optimization." pageUrl="https://clevercrow.in/google-ads-management-services" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
