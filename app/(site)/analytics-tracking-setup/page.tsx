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
      />
      <WebPageSchema title="Analytics & Tracking Setup Services | Clever Crow" description="Set up GA4, Google Tag Manager, Meta Pixel, conversion events and lead tracking to measure every campaign properly." url="https://clevercrow.in/analytics-tracking-setup" />
      <ServiceSchema serviceName="Analytics & Tracking Setup" serviceDescription="Professional analytics and tracking setup including GA4, GTM, Meta Pixel, and conversion event configuration." pageUrl="https://clevercrow.in/analytics-tracking-setup" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
