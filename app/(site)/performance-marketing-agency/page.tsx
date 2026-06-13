import DigitalMarketingServiceLayout from "@/components/service/DigitalMarketingServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "What is performance marketing?", answer: "Performance marketing is a data-driven approach to digital advertising where every rupee spent is tracked and optimized for measurable results like leads and sales." },
  { question: "How is it different from regular advertising?", answer: "Performance marketing focuses on measurable outcomes (leads, sales, ROI) rather than just impressions or reach. Every campaign is optimized based on real data." },
  { question: "Which channels do you use?", answer: "We use Google Ads, Meta Ads (Facebook & Instagram), landing pages, and retargeting across display and social networks." },
  { question: "Do you provide regular reports?", answer: "Yes. We provide transparent reports with clear metrics on leads, cost per lead, conversion rates, and return on ad spend." },
];

const services = [
  { icon: "search", title: "Paid Search Campaigns", description: "Google Ads search campaigns optimized for high-intent traffic and lead conversion.", href: "/google-ads-management-services" },
  { icon: "megaphone", title: "Paid Social Campaigns", description: "Meta Ads campaigns on Facebook and Instagram for targeted lead generation.", href: "/meta-ads-management-services" },
  { icon: "target", title: "Conversion Optimization", description: "A/B testing, landing page optimization, and funnel improvements for better ROI.", href: "/performance-marketing-agency" },
  { icon: "monitor", title: "Retargeting Campaigns", description: "Re-engage website visitors and warm leads with targeted retargeting ads.", href: "/performance-marketing-agency" },
  { icon: "layout", title: "Creative Testing", description: "Systematic ad creative testing to find the best-performing visuals and copy.", href: "/performance-marketing-agency" },
  { icon: "database", title: "Attribution & Analytics", description: "Multi-touch attribution and analytics setup for accurate campaign measurement.", href: "/analytics-tracking-setup" },
];

export const metadata = {
  title: "Performance Marketing Agency | Clever Crow",
  description: "Scale paid campaigns with data-led strategy, creative testing, conversion tracking and continuous optimization for better ROI.",
  keywords: "performance marketing agency, performance advertising, data-driven marketing, paid media optimization, ROI-focused marketing",
};

const performanceDashboard = {
  leadsGenerated: {
    label: "Leads Generated",
    value: "4,850",
    change: "↑ 44.6%",
    isIncrease: true
  },
  conversions: {
    label: "Sales / Signups",
    value: "7.2K",
    change: "↑ 49.8%",
    isIncrease: true
  },
  revenue: {
    label: "Client Revenue",
    value: "₹48.2L",
    valueLong: "₹48,24,500",
    change: "↑ 52.4%",
    isIncrease: true
  },
  costPerLead: {
    label: "Blended CPL",
    value: "₹160",
    change: "↓ 24.1%",
    isIncrease: false
  },
  lineChart: {
    leadsLabel: "Paid Leads",
    conversionsLabel: "Paid Sales",
    leadsPath: "M0 100 Q 50 85, 80 65 T 160 40 T 240 55 T 320 20 T 400 5",
    conversionsPath: "M0 115 Q 50 105, 80 90 T 160 70 T 240 80 T 320 45 T 400 20",
    dates: ["Apr 7", "Apr 14", "Apr 21", "Apr 28", "May 5"]
  },
  activePlatforms: ["google", "facebook", "linkedin", "youtube", "instagram"],
  trafficGrowth: {
    value: "+92.4%",
    change: "↑ 22.8% vs last week",
    isIncrease: true
  },
  channelMix: {
    slices: [
      { name: "Google Ads", percentage: 38, colorClass: "bg-blue-500", strokeColor: "#3B82F6" },
      { name: "Meta Ads", percentage: 32, colorClass: "bg-amber-500", strokeColor: "#F59E0B" },
      { name: "LinkedIn Ads", percentage: 18, colorClass: "bg-blue-700", strokeColor: "#0A66C2" },
      { name: "YouTube Ads", percentage: 12, colorClass: "bg-rose-600", strokeColor: "#DC2626" }
    ],
    primarySource: "Google & Meta Ads"
  },
  whyChooseMetrics: {
    leadsMiniPath: "M0 25 Q20 18,40 22 T80 12 T100 2",
    conversionsMiniPath: "M0 28 Q20 20,40 18 T80 8 T100 2",
    cplMiniPath: "M0 10 Q20 12,40 16 T80 22 T100 26",
    revenueBars: [30, 38, 32, 45, 40, 55, 48, 62, 55, 72, 65, 80]
  }
};

export default function PerformanceMarketingAgencyPage() {
  return (
    <main>
      <DigitalMarketingServiceLayout
        eyebrow="Performance Marketing"
        heroTitle="Performance Marketing Agency for Measurable Growth"
        heroSubtitle="Scale paid campaigns with data-led strategy, creative testing, conversion tracking and continuous optimization for better ROI."
        serviceName="Performance Marketing"
        services={services}
        whyChoose={[
          "Data-led strategy where every campaign decision is backed by performance data.",
          "Systematic creative testing to identify the best-performing ads and messaging.",
          "Full-funnel tracking with proper attribution for accurate ROI measurement.",
          "Continuous optimization for improving cost per lead and return on ad spend.",
          "Transparent reporting with clear, actionable insights delivered regularly.",
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/performance-marketing-agency"
        dashboard={performanceDashboard}
      />
      <WebPageSchema title="Performance Marketing Agency | Clever Crow" description="Scale paid campaigns with data-led strategy, creative testing, conversion tracking and continuous optimization for better ROI." url="https://clevercrow.in/performance-marketing-agency" />
      <ServiceSchema serviceName="Performance Marketing" serviceDescription="Performance marketing agency providing data-driven paid advertising with creative testing and ROI optimization." pageUrl="https://clevercrow.in/performance-marketing-agency" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
