import DigitalMarketingServiceLayout from "@/components/service/DigitalMarketingServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "How long does SEO take to show results?", answer: "SEO is a long-term strategy. Most businesses start seeing measurable improvements in 3–6 months with consistent effort." },
  { question: "Do you do both on-page and off-page SEO?", answer: "Yes. We handle on-page optimization, technical SEO, content planning, link building, and local SEO." },
  { question: "Can you do local SEO?", answer: "Yes. We optimize your Google Business Profile, local citations, and location-based keywords for better local visibility." },
  { question: "Do you provide SEO reports?", answer: "Yes. We provide monthly reports with keyword rankings, traffic data, and actionable recommendations." },
];

const services = [
  { icon: "search", title: "Keyword Research", description: "In-depth keyword research to identify high-value search terms your customers are using.", href: "/seo-services" },
  { icon: "layout", title: "On-Page SEO", description: "Optimize page titles, meta descriptions, headings, content, and internal linking.", href: "/seo-services" },
  { icon: "code2", title: "Technical SEO", description: "Fix crawl issues, improve site speed, implement schema markup, and optimize site structure.", href: "/seo-services" },
  { icon: "pencil", title: "Content Planning", description: "Strategic content planning with topic clusters, blog strategy, and content calendars.", href: "/seo-services" },
  { icon: "target", title: "Local SEO", description: "Google Business Profile optimization, local citations, and location-based keyword targeting.", href: "/seo-services" },
  { icon: "monitor", title: "Performance Tracking", description: "Monthly ranking reports, traffic analysis, and Search Console monitoring.", href: "/analytics-tracking-setup" },
];

export const metadata = {
  title: "SEO Services in India | Clever Crow",
  description: "Improve organic visibility with keyword research, on-page SEO, technical SEO, content planning, local SEO and performance tracking.",
  keywords: "SEO services in India, search engine optimization, on-page SEO, technical SEO, local SEO, keyword research",
};

const seoDashboard = {
  leadsGenerated: {
    label: "Organic Clicks",
    value: "12.4K",
    change: "↑ 42.1%",
    isIncrease: true
  },
  conversions: {
    label: "Organic Leads",
    value: "1,150",
    change: "↑ 35.8%",
    isIncrease: true
  },
  revenue: {
    label: "Est. Traffic Value",
    value: "₹6.8L",
    valueLong: "₹6,80,400",
    change: "↑ 44.2%",
    isIncrease: true
  },
  costPerLead: {
    label: "Avg. Rank Position",
    value: "14.2",
    change: "↓ 28.1%",
    isIncrease: false
  },
  lineChart: {
    leadsLabel: "Organic Sessions",
    conversionsLabel: "Organic Leads",
    leadsPath: "M0 120 Q 50 110, 80 90 T 160 50 T 240 70 T 320 40 T 400 10",
    conversionsPath: "M0 125 Q 50 120, 80 110 T 160 85 T 240 95 T 320 65 T 400 30",
    dates: ["Apr 7", "Apr 14", "Apr 21", "Apr 28", "May 5"]
  },
  activePlatforms: ["google"],
  trafficGrowth: {
    value: "+82.5%",
    change: "↑ 14.8% vs last week",
    isIncrease: true
  },
  channelMix: {
    slices: [
      { name: "Google Organic", percentage: 65, colorClass: "bg-orange-500", strokeColor: "#FF6600" },
      { name: "Direct Search", percentage: 20, colorClass: "bg-blue-500", strokeColor: "#3B82F6" },
      { name: "Referral Link", percentage: 10, colorClass: "bg-emerald-500", strokeColor: "#10B981" },
      { name: "Social Organic", percentage: 5, colorClass: "bg-violet-500", strokeColor: "#8B5CF6" }
    ],
    primarySource: "Google Organic"
  },
  whyChooseMetrics: {
    leadsMiniPath: "M0 25 Q20 18,40 22 T80 12 T100 2",
    conversionsMiniPath: "M0 28 Q20 20,40 18 T80 8 T100 2",
    cplMiniPath: "M0 12 Q20 10,40 8 T80 4 T100 2",
    revenueBars: [40, 45, 38, 52, 48, 58, 50, 68, 62, 75, 70, 85]
  }
};

export default function SeoServicesPage() {
  return (
    <main>
      <DigitalMarketingServiceLayout
        eyebrow="SEO Services"
        heroTitle="SEO Services for Long-Term Organic Growth"
        heroSubtitle="Improve organic visibility with keyword research, on-page SEO, technical SEO, content planning, local SEO and performance tracking."
        serviceName="SEO Services"
        services={services}
        whyChoose={[
          "Data-driven keyword research that targets terms your customers are actually searching for.",
          "Comprehensive on-page and technical SEO that improves crawlability and relevance.",
          "Content strategy aligned with search intent for sustainable organic traffic growth.",
          "Local SEO optimization for businesses targeting specific cities and regions.",
          "Monthly performance reporting with actionable insights and ranking improvements.",
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/seo-services"
        dashboard={seoDashboard}
      />
      <WebPageSchema title="SEO Services in India | Clever Crow" description="Improve organic visibility with keyword research, on-page SEO, technical SEO, content planning, local SEO and performance tracking." url="https://clevercrow.in/seo-services" />
      <ServiceSchema serviceName="SEO Services" serviceDescription="Professional SEO services including keyword research, on-page optimization, technical SEO, and local SEO." pageUrl="https://clevercrow.in/seo-services" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
