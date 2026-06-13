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

const leadGenDashboard = {
  leadsGenerated: {
    label: "Leads Captured",
    value: "3,420",
    change: "↑ 38.2%",
    isIncrease: true
  },
  conversions: {
    label: "Qualified Leads",
    value: "2.14K",
    change: "↑ 41.5%",
    isIncrease: true
  },
  revenue: {
    label: "Campaign Spend",
    value: "₹3.6L",
    valueLong: "₹3,58,400",
    change: "↑ 10.0%",
    isIncrease: true
  },
  costPerLead: {
    label: "Avg. Cost per Lead",
    value: "₹105",
    change: "↓ 22.8%",
    isIncrease: false
  },
  lineChart: {
    leadsLabel: "Captured Leads",
    conversionsLabel: "Qualified Leads",
    leadsPath: "M0 110 Q 50 90, 80 75 T 160 45 T 240 55 T 320 25 T 400 10",
    conversionsPath: "M0 120 Q 50 110, 80 95 T 160 70 T 240 80 T 320 50 T 400 25",
    dates: ["Apr 7", "Apr 14", "Apr 21", "Apr 28", "May 5"]
  },
  activePlatforms: ["google", "facebook", "linkedin"],
  trafficGrowth: {
    value: "+71.8%",
    change: "↑ 14.5% vs last week",
    isIncrease: true
  },
  channelMix: {
    slices: [
      { name: "Meta Lead Ads", percentage: 42, colorClass: "bg-blue-500", strokeColor: "#3B82F6" },
      { name: "Google Search Leads", percentage: 38, colorClass: "bg-amber-500", strokeColor: "#F59E0B" },
      { name: "LinkedIn Lead Forms", percentage: 15, colorClass: "bg-emerald-500", strokeColor: "#10B981" },
      { name: "Landing Page Forms", percentage: 5, colorClass: "bg-violet-500", strokeColor: "#8B5CF6" }
    ],
    primarySource: "Meta Lead Ads"
  },
  whyChooseMetrics: {
    leadsMiniPath: "M0 25 Q20 18,40 22 T80 12 T100 2",
    conversionsMiniPath: "M0 28 Q20 20,40 18 T80 8 T100 2",
    cplMiniPath: "M0 10 Q20 12,40 16 T80 22 T100 26",
    revenueBars: [25, 30, 28, 38, 32, 45, 38, 50, 42, 55, 48, 62]
  }
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
        dashboard={leadGenDashboard}
      />
      <WebPageSchema title="Lead Generation Campaigns Agency | Clever Crow" description="Plan and run lead generation campaigns across Google, Meta, landing pages and WhatsApp with tracking and follow-up systems." url="https://clevercrow.in/lead-generation-campaigns" />
      <ServiceSchema serviceName="Lead Generation Campaigns" serviceDescription="Multi-channel lead generation campaigns with tracking, landing pages, and follow-up automation." pageUrl="https://clevercrow.in/lead-generation-campaigns" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
