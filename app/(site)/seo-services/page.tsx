import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
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

export default function SeoServicesPage() {
  return (
    <main>
      <WebDevServiceLayout
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
      />
      <WebPageSchema title="SEO Services in India | Clever Crow" description="Improve organic visibility with keyword research, on-page SEO, technical SEO, content planning, local SEO and performance tracking." url="https://clevercrow.in/seo-services" />
      <ServiceSchema serviceName="SEO Services" serviceDescription="Professional SEO services including keyword research, on-page optimization, technical SEO, and local SEO." pageUrl="https://clevercrow.in/seo-services" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
