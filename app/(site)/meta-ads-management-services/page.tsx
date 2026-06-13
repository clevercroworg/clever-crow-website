import DigitalMarketingServiceLayout from "@/components/service/DigitalMarketingServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "What are Meta Ads?", answer: "Meta Ads are paid advertisements on Facebook and Instagram. They help businesses reach targeted audiences based on demographics, interests, and behaviors." },
  { question: "How much budget do I need for Meta Ads?", answer: "The budget depends on your goals and industry. We work with budgets of all sizes and focus on maximizing lead quality within your budget." },
  { question: "Do you create the ad creatives?", answer: "Yes. We handle ad creative design, copywriting, and video production as part of our Meta Ads management service." },
  { question: "How do you track leads from Meta Ads?", answer: "We set up Meta Pixel, conversion API, and lead tracking to measure form submissions, calls, and other conversion events accurately." },
];

const services = [
  { icon: "megaphone", title: "Facebook Ads", description: "Targeted Facebook ad campaigns for lead generation, brand awareness, and conversions.", href: "/meta-ads-management-services" },
  { icon: "pencil", title: "Instagram Ads", description: "Visually engaging Instagram ads with stories, reels, and feed placements.", href: "/meta-ads-management-services" },
  { icon: "target", title: "Lead Generation Ads", description: "Meta lead form ads and landing page campaigns optimized for quality enquiries.", href: "/lead-generation-campaigns" },
  { icon: "layout", title: "Creative Design", description: "Scroll-stopping ad creatives, carousels, videos, and copy designed for performance.", href: "/meta-ads-management-services" },
  { icon: "monitor", title: "Pixel & Tracking Setup", description: "Meta Pixel, Conversion API, and event tracking for accurate campaign measurement.", href: "/analytics-tracking-setup" },
  { icon: "rocket", title: "Campaign Optimization", description: "A/B testing, audience refinement, and bid optimization for better cost per lead.", href: "/meta-ads-management-services" },
];

export const metadata = {
  title: "Meta Ads Management Services | Clever Crow",
  description: "Generate leads and enquiries through Facebook and Instagram ads with strong creatives, targeting, testing and campaign optimization.",
  keywords: "Meta Ads management services, Facebook Ads agency, Instagram Ads management, social media advertising, Meta lead generation",
};

const metaAdsDashboard = {
  leadsGenerated: {
    label: "Leads Generated",
    value: "3,120",
    change: "↑ 32.4%",
    isIncrease: true
  },
  conversions: {
    label: "Meta Conversions",
    value: "5.43K",
    change: "↑ 38.6%",
    isIncrease: true
  },
  revenue: {
    label: "Ad Spend",
    value: "₹3.8L",
    valueLong: "₹3,80,600",
    change: "↑ 20.1%",
    isIncrease: true
  },
  costPerLead: {
    label: "Cost per Lead",
    value: "₹122",
    change: "↓ 22.4%",
    isIncrease: false
  },
  lineChart: {
    leadsLabel: "Impressions",
    conversionsLabel: "Conversions",
    leadsPath: "M0 110 Q 50 90, 80 80 T 160 40 T 240 60 T 320 30 T 400 15",
    conversionsPath: "M0 120 Q 50 115, 80 100 T 160 80 T 240 90 T 320 60 T 400 35",
    dates: ["Apr 7", "Apr 14", "Apr 21", "Apr 28", "May 5"]
  },
  activePlatforms: ["facebook", "instagram"],
  trafficGrowth: {
    value: "+78.4%",
    change: "↑ 16.2% vs last week",
    isIncrease: true
  },
  channelMix: {
    slices: [
      { name: "Instagram Reels", percentage: 45, colorClass: "bg-pink-500", strokeColor: "#E1306C" },
      { name: "Instagram Feed", percentage: 30, colorClass: "bg-amber-500", strokeColor: "#F59E0B" },
      { name: "Facebook Feed", percentage: 20, colorClass: "bg-blue-600", strokeColor: "#2563EB" },
      { name: "Audience Network", percentage: 5, colorClass: "bg-violet-500", strokeColor: "#8B5CF6" }
    ],
    primarySource: "Instagram Reels"
  },
  whyChooseMetrics: {
    leadsMiniPath: "M0 20 Q20 15,40 18 T80 10 T100 2",
    conversionsMiniPath: "M0 25 Q20 22,40 15 T80 6 T100 2",
    cplMiniPath: "M0 12 Q20 14,40 18 T80 22 T100 28",
    revenueBars: [35, 42, 30, 48, 40, 52, 45, 60, 50, 65, 58, 70]
  }
};

export default function MetaAdsManagementServicesPage() {
  return (
    <main>
      <DigitalMarketingServiceLayout
        eyebrow="Meta Ads Management"
        heroTitle="Meta Ads Management Services for Lead Generation"
        heroSubtitle="Generate leads and enquiries through Facebook and Instagram ads with strong creatives, targeting, testing and campaign optimization."
        serviceName="Meta Ads Management"
        services={services}
        whyChoose={[
          "Performance-focused campaigns designed to generate quality leads from Facebook and Instagram.",
          "Professional ad creatives and copy that stop the scroll and drive action.",
          "Advanced audience targeting based on demographics, interests, and behavior data.",
          "Complete Meta Pixel and Conversion API setup for accurate lead tracking.",
          "Continuous A/B testing and optimization for improving cost per lead over time.",
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/meta-ads-management-services"
        dashboard={metaAdsDashboard}
      />
      <WebPageSchema title="Meta Ads Management Services | Clever Crow" description="Generate leads and enquiries through Facebook and Instagram ads with strong creatives, targeting, testing and campaign optimization." url="https://clevercrow.in/meta-ads-management-services" />
      <ServiceSchema serviceName="Meta Ads Management Services" serviceDescription="Facebook and Instagram ad management for lead generation with creative design, targeting, and optimization." pageUrl="https://clevercrow.in/meta-ads-management-services" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
