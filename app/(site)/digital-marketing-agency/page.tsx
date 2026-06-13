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

const agencyDashboard = {
  leadsGenerated: {
    label: "Total Impressions",
    value: "1.2M",
    change: "↑ 62.4%",
    isIncrease: true
  },
  conversions: {
    label: "Leads Acquired",
    value: "5,420",
    change: "↑ 34.6%",
    isIncrease: true
  },
  revenue: {
    label: "Business Revenue",
    value: "₹35.8L",
    valueLong: "₹35,81,600",
    change: "↑ 41.2%",
    isIncrease: true
  },
  costPerLead: {
    label: "Cost per Acquisition",
    value: "₹145",
    change: "↓ 18.2%",
    isIncrease: false
  },
  lineChart: {
    leadsLabel: "Total Clicks",
    conversionsLabel: "Acquisitions",
    leadsPath: "M0 90 Q 50 85, 80 70 T 160 50 T 240 65 T 320 35 T 400 20",
    conversionsPath: "M0 105 Q 50 100, 80 90 T 160 70 T 240 80 T 320 50 T 400 30",
    dates: ["Apr 7", "Apr 14", "Apr 21", "Apr 28", "May 5"]
  },
  activePlatforms: ["google", "facebook", "linkedin", "youtube", "instagram"],
  trafficGrowth: {
    value: "+64.2%",
    change: "↑ 12.4% vs last week",
    isIncrease: true
  },
  channelMix: {
    slices: [
      { name: "Google Ads", percentage: 40, colorClass: "bg-blue-500", strokeColor: "#3B82F6" },
      { name: "Meta Ads", percentage: 28, colorClass: "bg-amber-500", strokeColor: "#F59E0B" },
      { name: "Organic Search", percentage: 18, colorClass: "bg-emerald-500", strokeColor: "#10B981" },
      { name: "Social Media", percentage: 14, colorClass: "bg-violet-500", strokeColor: "#8B5CF6" }
    ],
    primarySource: "Google Search"
  },
  whyChooseMetrics: {
    leadsMiniPath: "M0 25 Q15 20,30 22 T60 12 T100 5",
    conversionsMiniPath: "M0 28 Q20 22,40 18 T80 8 T100 3",
    cplMiniPath: "M0 8 Q20 10,40 15 T80 22 T100 25",
    revenueBars: [28, 35, 22, 40, 32, 48, 38, 55, 45, 60, 52, 65]
  }
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
        dashboard={agencyDashboard}
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
