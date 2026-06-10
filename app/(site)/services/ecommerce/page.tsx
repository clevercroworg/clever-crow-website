import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
import { Laptop, Code2, ShoppingCart, Layout, RefreshCw, Wrench } from "lucide-react";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const ecommerceFaqs = [
  {
    question: "Can I manage products myself?",
    answer: "Yes. You will have a user-friendly dashboard to manage products, pricing, inventory, and orders.",
  },
  {
    question: "Do you integrate payment gateways?",
    answer: "Yes. We integrate secure payment systems like Razorpay, Stripe, Paytm, and Cashfree based on your requirements.",
  },
  {
    question: "Will my website be mobile-friendly?",
    answer: "Yes. All our e-commerce websites are fully optimized for mobile devices to capture smartphone shoppers.",
  },
  {
    question: "Can you redesign my existing store?",
    answer: "Yes. We can redesign, migrate, and improve your current e-commerce website to boost loading speed and sales.",
  },
];

const ecommerceServices = [
  {
    icon: ShoppingCart,
    title: "Custom Storefront Development",
    description: "Bespoke digital storefronts built with seamless checkouts and rich product catalogs.",
    href: "/services/ecommerce"
  },
  {
    icon: Laptop,
    title: "Shopify Store Setup & Design",
    description: "Highly optimized Shopify store design, theme customizations, and app integrations.",
    href: "/services/ecommerce"
  },
  {
    icon: Code2,
    title: "WooCommerce Solutions",
    description: "Flexible and scalable e-commerce systems integrated into WordPress platforms.",
    href: "/services/ecommerce"
  },
  {
    icon: Layout,
    title: "Payment & Shipping Integrations",
    description: "Connecting Stripe, Razorpay, and logistics APIs for smooth payment and tracking operations.",
    href: "/services/ecommerce"
  },
  {
    icon: RefreshCw,
    title: "Inventory & Order Dashboards",
    description: "Admin panel configurations to easily manage products, stocks, and customer orders.",
    href: "/services/ecommerce"
  },
  {
    icon: Wrench,
    title: "E-commerce Speed Tuning",
    description: "Compressing images, lazy-loading catalogs, and optimizing code for better conversion rates.",
    href: "/services/ecommerce"
  }
];

export const metadata = {
  title: "E-commerce Website Development - Shopify & Custom Stores | Clever Crow",
  description:
    "Powerful e-commerce websites built for scale and speed. Shopify development and custom online stores with seamless shopping experiences.",
  keywords: "ecommerce website development, online store development, Shopify website development, ecommerce web design, ecommerce development company, online shopping website",
};

export default function EcommerceWebsiteDevelopmentPage() {
  return (
    <main>
      <WebDevServiceLayout
        eyebrow="E-commerce Website Development"
        heroTitle="Build an E-commerce Website That Drives Sales"
        heroSubtitle="We design and develop high-performance e-commerce websites that are fast, user-friendly, and optimized to convert visitors into customers."
        serviceName="E-commerce Website Development"
        services={ecommerceServices}
        whyChoose={[
          "User experience optimized checkouts that reduce cart abandonment rates.",
          "Mobile-first, responsive layouts ensuring a smooth shopping flow on smartphones.",
          "Secure, PCI-compliant payment gateways and customer data protection.",
          "Blazing-fast load speeds for product catalog pages to maximize sales retention.",
          "Integrated tracking analytics, abandoned cart marketing, and pixels setup.",
          "Easy-to-use admin dash to edit pricing, stock levels, and download reports."
        ]}
        faqs={ecommerceFaqs}
        pageUrl="https://clevercrow.in/services/ecommerce"
      />

      <WebPageSchema
        title="E-commerce Website Development Services | Clever Crow"
        description="We design and develop high-performance e-commerce websites that are fast, user-friendly, and optimized to convert visitors into customers."
        url="https://clevercrow.in/services/ecommerce"
      />
      <ServiceSchema
        serviceName="E-commerce Website Development Services"
        serviceDescription="Professional e-commerce website design and development services with payment integration, product management, and mobile-first design."
        pageUrl="https://clevercrow.in/services/ecommerce"
      />
      <FaqSchema faqs={ecommerceFaqs} />
    </main>
  );
}
