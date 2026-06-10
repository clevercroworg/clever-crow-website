import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "Which ecommerce platform do you recommend?", answer: "We recommend Shopify for fast, reliable launches and scaling, WooCommerce for custom flexibility, or Next.js for headless, high-speed commerce." },
  { question: "How do you recover abandoned carts?", answer: "We set up automated email and WhatsApp follow-up sequences that trigger when a customer leaves items in their cart, nudging them to complete checkout." },
  { question: "What is a healthy ROAS for an online store?", answer: "A healthy Return on Ad Spend (ROAS) typically ranges from 3.0x to 5.0x, depending on your product margins and repeat purchase rate." },
  { question: "Can you configure Meta Pixel and Conversions API (CAPI)?", answer: "Yes, we implement complete event tracking (ViewContent, AddToCart, InitiateCheckout, Purchase) via browser Pixel and server-side APIs for accurate data." }
];

const services = [
  { icon: "shoppingcart", title: "Conversion-Focused UX", description: "Designing high-speed, intuitive ecommerce store designs that reduce cart abandonment.", href: "/ecommerce-website-development" },
  { icon: "megaphone", title: "Meta Catalog Ads", description: "Dynamic Product Ads (DPA) showing relevant products to past visitors and lookalikes.", href: "/meta-ads-management-services" },
  { icon: "search", title: "Google Shopping & PMax", description: "Running product campaigns directly on Google Search, Shopping, and YouTube.", href: "/google-ads-management-services" },
  { icon: "target", title: "Ecommerce SEO", description: "Optimizing product descriptions, category pages, and schemas to capture organic searches.", href: "/seo-services" },
  { icon: "rocket", title: "WhatsApp Abandoned Cart", description: "Automated WhatsApp notifications to recover abandoned carts and share tracking codes.", href: "/whatsapp-automation-services" },
  { icon: "monitor", title: "Ecom Analytics & Pixel", description: "Advanced configuration of Meta Pixel, CAPI, and GA4 to track purchases and sales value.", href: "/analytics-tracking-setup" }
];

export const metadata = {
  title: "Ecommerce Growth Marketing Agency | Clever Crow",
  description: "Grow ecommerce sales with conversion-focused websites, product pages, Meta Ads, Google Ads, tracking and campaign optimization.",
  keywords: "ecommerce growth marketing agency, shopify marketing, ecommerce ads, WooCommerce sales growth, Meta Pixel setup",
};

export default function EcommerceGrowthMarketingPage() {
  return (
    <main>
      <WebDevServiceLayout
        eyebrow="Ecommerce Marketing"
        heroTitle="Ecommerce Growth Marketing for Online Brands"
        heroSubtitle="Grow ecommerce sales with conversion-focused websites, product pages, Meta Ads, Google Ads, tracking and campaign optimization."
        serviceName="Ecommerce Growth Marketing"
        services={services}
        whyChoose={[
          "Expertise building and growing ecommerce brands with multi-channel advertising.",
          "Deep knowledge of shop platforms like Shopify, WooCommerce, and custom Next.js storefronts.",
          "Strong focus on key metrics: Cost Per Acquisition (CPA), average order value, and ROAS.",
          "Experience recovering lost sales via automated cart-recovery systems.",
          "Detailed, transparent dashboards displaying marketing cost vs actual store revenue."
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/industries/ecommerce-growth-marketing"
      />
      <WebPageSchema title="Ecommerce Growth Marketing Agency | Clever Crow" description="Grow ecommerce sales with conversion-focused websites, product pages, Meta Ads, Google Ads, tracking and campaign optimization." url="https://clevercrow.in/industries/ecommerce-growth-marketing" />
      <ServiceSchema serviceName="Ecommerce Growth Marketing Services" serviceDescription="Grow ecommerce sales with conversion-focused websites, product pages, Meta Ads, Google Ads, tracking and campaign optimization." pageUrl="https://clevercrow.in/industries/ecommerce-growth-marketing" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
