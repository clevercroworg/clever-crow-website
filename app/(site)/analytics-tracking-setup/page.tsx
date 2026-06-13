import DigitalMarketingServiceLayout from "@/components/service/DigitalMarketingServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "What is GA4?", answer: "GA4 (Google Analytics 4) is the latest version of Google Analytics that provides event-based tracking, cross-platform measurement, and privacy-focused analytics." },
  { question: "What is Google Tag Manager?", answer: "Google Tag Manager (GTM) is a tool that lets you manage tracking codes, conversion tags, and analytics scripts without modifying your website code directly." },
  { question: "Do you set up Meta Pixel?", answer: "Yes. We set up Meta Pixel and Conversion API for accurate tracking of leads and conversions from Facebook and Instagram ads." },
  { question: "Why is tracking important?", answer: "Without proper tracking, you can't measure which campaigns are generating leads and which are wasting budget. Tracking is essential for data-driven marketing decisions." },
];

const services = [
  { icon: "monitor", title: "GA4 Setup", description: "Complete Google Analytics 4 setup with event tracking, goals, and custom reports.", href: "/analytics-tracking-setup" },
  { icon: "code2", title: "Google Tag Manager", description: "GTM implementation for managing tags, triggers, and conversion tracking without code changes.", href: "/analytics-tracking-setup" },
  { icon: "target", title: "Meta Pixel Setup", description: "Meta Pixel and Conversion API setup for accurate Facebook and Instagram ad tracking.", href: "/analytics-tracking-setup" },
  { icon: "search", title: "Google Ads Tracking", description: "Google Ads conversion tracking with proper event setup and attribution configuration.", href: "/google-ads-management-services" },
  { icon: "layout", title: "Dashboard & Reporting", description: "Custom analytics dashboards with key metrics, conversion data, and performance insights.", href: "/analytics-tracking-setup" },
  { icon: "database", title: "Data Layer Setup", description: "Structured data layer implementation for advanced tracking and audience segmentation.", href: "/analytics-tracking-setup" },
];

export const metadata = {
  title: "Analytics & Tracking Setup Services | Clever Crow",
  description: "Set up GA4, Google Tag Manager, Meta Pixel, conversion events and lead tracking to measure every campaign properly.",
  keywords: "analytics tracking setup, GA4 setup, Google Tag Manager, Meta Pixel setup, conversion tracking, marketing analytics",
};

const analyticsDashboard = {
  leadsGenerated: {
    label: "Events Tracked",
    value: "184K",
    change: "↑ 100%",
    isIncrease: true
  },
  conversions: {
    label: "Conversions Mapped",
    value: "12.8K",
    change: "↑ 100%",
    isIncrease: true
  },
  revenue: {
    label: "Data Accuracy",
    value: "99.9%",
    valueLong: "99.9% Accurate",
    change: "↑ 100%",
    isIncrease: true
  },
  costPerLead: {
    label: "Tracking Errors",
    value: "0",
    change: "↓ 100% reduction",
    isIncrease: false
  },
  lineChart: {
    leadsLabel: "Custom Events",
    conversionsLabel: "Conversions",
    leadsPath: "M0 120 Q 50 100, 80 80 T 160 40 T 240 50 T 320 20 T 400 5",
    conversionsPath: "M0 125 Q 50 115, 80 95 T 160 60 T 240 70 T 320 35 T 400 15",
    dates: ["Apr 7", "Apr 14", "Apr 21", "Apr 28", "May 5"]
  },
  activePlatforms: ["google"],
  trafficGrowth: {
    value: "+100%",
    change: "↑ 100% vs last week",
    isIncrease: true
  },
  channelMix: {
    slices: [
      { name: "GA4 Events", percentage: 45, colorClass: "bg-amber-500", strokeColor: "#F59E0B" },
      { name: "GTM Tags", percentage: 30, colorClass: "bg-blue-500", strokeColor: "#3B82F6" },
      { name: "Facebook Pixel", percentage: 20, colorClass: "bg-emerald-500", strokeColor: "#10B981" },
      { name: "LinkedIn Insight", percentage: 5, colorClass: "bg-violet-500", strokeColor: "#8B5CF6" }
    ],
    primarySource: "Google Tag Manager"
  },
  whyChooseMetrics: {
    leadsMiniPath: "M0 25 Q20 18,40 22 T80 12 T100 2",
    conversionsMiniPath: "M0 28 Q20 20,40 18 T80 8 T100 2",
    cplMiniPath: "M0 20 Q20 15,40 10 T80 5 T100 2",
    revenueBars: [45, 48, 50, 52, 55, 60, 62, 65, 70, 75, 80, 85]
  }
};

export default function AnalyticsTrackingSetupPage() {
  return (
    <main>
      <DigitalMarketingServiceLayout
        eyebrow="Analytics & Tracking"
        heroTitle="Analytics and Tracking Setup for Better Marketing Decisions"
        heroSubtitle="Set up GA4, Google Tag Manager, Meta Pixel, conversion events and lead tracking to measure every campaign properly."
        serviceName="Analytics & Tracking Setup"
        services={services}
        whyChoose={[
          "Complete GA4 setup with custom events, goals, and conversion tracking.",
          "Google Tag Manager implementation for easy tag management without developer dependency.",
          "Meta Pixel and Conversion API for accurate Facebook and Instagram ad measurement.",
          "Google Ads conversion tracking with proper attribution configuration.",
          "Custom dashboards that give you clear visibility into marketing performance.",
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/analytics-tracking-setup"
        dashboard={analyticsDashboard}
      />
      <WebPageSchema title="Analytics & Tracking Setup Services | Clever Crow" description="Set up GA4, Google Tag Manager, Meta Pixel, conversion events and lead tracking to measure every campaign properly." url="https://clevercrow.in/analytics-tracking-setup" />
      <ServiceSchema serviceName="Analytics & Tracking Setup" serviceDescription="Professional analytics and tracking setup including GA4, GTM, Meta Pixel, and conversion event configuration." pageUrl="https://clevercrow.in/analytics-tracking-setup" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
