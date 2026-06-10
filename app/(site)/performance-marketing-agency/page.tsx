import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
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

export default function PerformanceMarketingAgencyPage() {
  return (
    <main>
      <WebDevServiceLayout
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
      />
      <WebPageSchema title="Performance Marketing Agency | Clever Crow" description="Scale paid campaigns with data-led strategy, creative testing, conversion tracking and continuous optimization for better ROI." url="https://clevercrow.in/performance-marketing-agency" />
      <ServiceSchema serviceName="Performance Marketing" serviceDescription="Performance marketing agency providing data-driven paid advertising with creative testing and ROI optimization." pageUrl="https://clevercrow.in/performance-marketing-agency" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
