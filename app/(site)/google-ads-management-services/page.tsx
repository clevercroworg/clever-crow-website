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

const googleAdsDashboard = {
  leadsGenerated: {
    label: "Leads Generated",
    value: "1,840",
    change: "↑ 24.5%",
    isIncrease: true
  },
  conversions: {
    label: "Form Fills / Calls",
    value: "2.12K",
    change: "↑ 28.2%",
    isIncrease: true
  },
  revenue: {
    label: "Ad Spend",
    value: "₹4.4L",
    valueLong: "₹4,41,800",
    change: "↑ 15.6%",
    isIncrease: true
  },
  costPerLead: {
    label: "Cost per Conversion",
    value: "₹208",
    change: "↓ 12.4%",
    isIncrease: false
  },
  lineChart: {
    leadsLabel: "Clicks",
    conversionsLabel: "Conversions",
    leadsPath: "M0 100 Q 50 80, 80 60 T 160 30 T 240 50 T 320 25 T 400 10",
    conversionsPath: "M0 115 Q 50 110, 80 95 T 160 65 T 240 85 T 320 45 T 400 25",
    dates: ["Apr 7", "Apr 14", "Apr 21", "Apr 28", "May 5"]
  },
  activePlatforms: ["google", "youtube"],
  trafficGrowth: {
    value: "+48.6%",
    change: "↑ 8.2% vs last week",
    isIncrease: true
  },
  channelMix: {
    slices: [
      { name: "Search Ads", percentage: 60, colorClass: "bg-blue-500", strokeColor: "#3B82F6" },
      { name: "Performance Max", percentage: 25, colorClass: "bg-amber-500", strokeColor: "#F59E0B" },
      { name: "YouTube Ads", percentage: 10, colorClass: "bg-rose-500", strokeColor: "#F43F5E" },
      { name: "Display Ads", percentage: 5, colorClass: "bg-violet-500", strokeColor: "#8B5CF6" }
    ],
    primarySource: "Google Search"
  },
  whyChooseMetrics: {
    leadsMiniPath: "M0 25 Q20 18,40 22 T80 12 T100 2",
    conversionsMiniPath: "M0 28 Q20 20,40 18 T80 8 T100 2",
    cplMiniPath: "M0 6 Q20 8,40 12 T80 20 T100 24",
    revenueBars: [22, 30, 25, 38, 30, 45, 35, 50, 40, 55, 48, 58]
  }
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
        dashboard={googleAdsDashboard}
      />
      <WebPageSchema title="Google Ads Management Services | Clever Crow" description="Run Google Search, lead generation and conversion-focused ad campaigns with keyword planning, tracking and ongoing optimization." url="https://clevercrow.in/google-ads-management-services" />
      <ServiceSchema serviceName="Google Ads Management Services" serviceDescription="Professional Google Ads management with keyword planning, conversion tracking, and ongoing campaign optimization." pageUrl="https://clevercrow.in/google-ads-management-services" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
