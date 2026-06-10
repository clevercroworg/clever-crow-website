import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  {
    question: "Which ecommerce platforms do you work with?",
    answer: "We build custom ecommerce solutions using React, Next.js, WooCommerce, and headless commerce architectures depending on your business needs.",
  },
  {
    question: "Can you integrate payment gateways?",
    answer: "Yes. We integrate Razorpay, Stripe, PayPal, and other payment gateways for smooth and secure checkout experiences.",
  },
  {
    question: "Do you provide product management tools?",
    answer: "Yes. We build admin panels and dashboards for managing products, inventory, orders, and customer data.",
  },
  {
    question: "Will my ecommerce website be mobile-friendly?",
    answer: "Yes. All our ecommerce websites are fully responsive and optimized for mobile shopping experiences.",
  },
];

const services = [
  {
    icon: "shoppingcart",
    title: "Custom Ecommerce Stores",
    description: "Full-featured online stores with product catalogs, filters, and seamless checkout flows.",
    href: "/ecommerce-website-development"
  },
  {
    icon: "code2",
    title: "Headless Commerce",
    description: "API-driven ecommerce with React/Next.js frontends for blazing-fast shopping experiences.",
    href: "/react-nextjs-website-development"
  },
  {
    icon: "laptop",
    title: "WooCommerce Stores",
    description: "WordPress-powered ecommerce with WooCommerce for easy product and order management.",
    href: "/ecommerce-website-development"
  },
  {
    icon: "layout",
    title: "Product Landing Pages",
    description: "High-converting product launch pages designed to drive sales and capture leads.",
    href: "/landing-page-development"
  },
  {
    icon: "shield",
    title: "Payment Integration",
    description: "Secure payment gateway setup with Razorpay, Stripe, and other popular providers.",
    href: "/ecommerce-website-development"
  },
  {
    icon: "monitor",
    title: "Order Management Dashboard",
    description: "Custom admin panels for managing products, orders, inventory, and customer data.",
    href: "/admin-panel-development"
  }
];

export const metadata = {
  title: "Ecommerce Website Development Company | Clever Crow",
  description:
    "Launch an ecommerce website with clean product pages, smooth checkout, tracking setup and performance-focused design.",
  keywords: "ecommerce website development company, online store development, ecommerce web design, custom ecommerce development",
};

export default function EcommerceWebsiteDevelopmentPage() {
  return (
    <main>
      <WebDevServiceLayout
        eyebrow="Ecommerce Website Development"
        heroTitle="Ecommerce Website Development for Growing Brands"
        heroSubtitle="Launch an ecommerce website with clean product pages, smooth checkout, tracking setup and performance-focused design."
        serviceName="Ecommerce Website Development"
        services={services}
        whyChoose={[
          "Clean, conversion-focused product pages designed to maximize add-to-cart rates.",
          "Secure payment gateway integrations with Razorpay, Stripe, and more.",
          "Fast-loading pages optimized for mobile shopping and Core Web Vitals.",
          "Built-in SEO structure for product pages, categories, and brand visibility.",
          "Custom admin dashboards for easy product, order, and inventory management.",
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/ecommerce-website-development"
      />

      <WebPageSchema
        title="Ecommerce Website Development Company | Clever Crow"
        description="Launch an ecommerce website with clean product pages, smooth checkout, tracking setup and performance-focused design."
        url="https://clevercrow.in/ecommerce-website-development"
      />
      <ServiceSchema
        serviceName="Ecommerce Website Development"
        serviceDescription="Professional ecommerce website development with product management, payment integration, and performance optimization."
        pageUrl="https://clevercrow.in/ecommerce-website-development"
      />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
