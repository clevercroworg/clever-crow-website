import { getWebsiteLandingData, type CaseStudy, type FaqData, type PricingMeta } from "../website/website-data";

export type EcommerceFeature = { icon: string; title: string; text: string };
export type ProcessStep = { days: string; title: string; text: string };

export type EcommerceLandingData = {
  hero: { title: string; accentTitle: string; subtitle: string; highlights: string[]; ctaLabel?: string };
  pricing: PricingMeta;
  features: { preTitle: string; title: string; subtitle: string; items: EcommerceFeature[] };
  process: { preTitle: string; title: string; subtitle: string; steps: ProcessStep[]; note: string };
  caseStudies: CaseStudy[];
  faqs: FaqData[];
};

export function getEcommerceLandingData(): EcommerceLandingData {
  // Online stores we have built, from the shared portfolio on /lp/website.
  const caseStudies = getWebsiteLandingData().caseStudies.filter((cs) => cs.category === "Ecommerce" || cs.category === "Retail & Lifestyle");

  return {
    hero: {
      title: "Your Online Store.",
      accentTitle: "Ready to Sell.",
      subtitle:
        "A complete online store from ₹24,999 + GST, with online payments, Cash on Delivery, shipping and an easy admin panel.",
      highlights: ["UPI, Cards & COD", "Easy Admin Panel", "Mobile-First Design", "Order Tracking"],
      ctaLabel: "View Packages",
    },
    pricing: {
      preTitle: "E-commerce Packages",
      title: "A complete online store. A clear price.",
      subtitle: "Launch offer: save up to ₹20,000 on your store. Choose the package that fits your catalogue and growth plans.",
      packages: [
        {
          label: "Starter Store",
          name: "Starter Store",
          description: "Everything you need to start selling online.",
          price: "₹24,999",
          priceNote: "+ GST",
          strikePrice: "₹34,999",
          priceTerm: "One-time payment",
          pagesIncluded: "Up to 100 products included",
          features: [
            "Custom store design for your brand",
            "Mobile-first, fast-loading storefront",
            "Product categories, variants (size, colour) and filters",
            "Payment gateway: UPI, cards and net banking",
            "Cash on Delivery option",
            "Cart, checkout and order confirmation emails",
            "Coupons and discount codes",
            "Shipping charges and GST settings",
            "Admin panel to manage products, orders and stock",
            "WhatsApp chat button",
            "Free hosting and SSL for 1 year",
            "Delivery in 12–15 days",
          ],
        },
        {
          label: "Growth Store",
          name: "Growth Store",
          description: "For brands ready to scale sales and marketing.",
          price: "₹39,999",
          priceNote: "+ GST",
          strikePrice: "₹59,999",
          priceTerm: "One-time payment",
          pagesIncluded: "Up to 500 products included",
          features: [
            "Everything in Starter Store",
            "Premium design with custom homepage sections",
            "Courier integration with live order tracking",
            "Abandoned cart recovery emails",
            "Customer accounts, wishlist and product reviews",
            "Order status updates by email",
            "SEO setup for products and categories",
            "Meta Pixel and GA4 e-commerce tracking",
            "Google Merchant Center product feed (Shopping ads ready)",
            "Blog setup for content marketing",
            "Admin training session",
            "30 days of support after launch",
          ],
          featured: true,
        },
      ],
      quoteText: "Need more products, a marketplace or a custom feature?",
      quoteLinkText: "Custom packages are available.",
      quoteHref: "tel:+919986389444",
      cardCta: { label: "Call to Get Started", href: "tel:+919986389444" },
    },
    features: {
      preTitle: "Built to Sell",
      title: "Everything your store needs, set up for you",
      subtitle: "No plugins to figure out and no developer to chase. We set up the whole store, test it with real orders and hand it over ready to sell.",
      items: [
        { icon: "payments", title: "Payments that just work", text: "UPI, cards, net banking and Cash on Delivery, with money settled straight to your bank account." },
        { icon: "catalogue", title: "Easy product catalogue", text: "Categories, sizes, colours, stock levels and offers. Add or edit products in minutes." },
        { icon: "shipping", title: "Shipping and tracking", text: "Shipping charges by weight or location, and order tracking your customers can follow." },
        { icon: "mobile", title: "Made for mobile shoppers", text: "Most orders come from phones, so every page is designed and tested for mobile first." },
        { icon: "admin", title: "Simple admin panel", text: "See orders, customers and sales in one place. We train your team before launch." },
        { icon: "marketing", title: "Ready for ads", text: "Meta Pixel and Google Analytics tracking, so your Instagram and Google ads can measure sales." },
        { icon: "offers", title: "Coupons and offers", text: "Discount codes, festive sales and free-shipping offers to turn visitors into buyers." },
        { icon: "secure", title: "Secure and fast", text: "SSL security, secure checkout and fast-loading pages that keep shoppers from leaving." },
      ],
    },
    process: {
      preTitle: "How It Works",
      title: "From first call to first order in about 2 weeks",
      subtitle: "A clear plan, regular updates and no surprises.",
      steps: [
        { days: "Day 1", title: "Plan your store", text: "We understand your products, customers and payment and shipping needs." },
        { days: "Days 2–5", title: "Design", text: "You see your store design and approve it before we build." },
        { days: "Days 6–12", title: "Build and add products", text: "Payments, shipping, emails and your products are set up." },
        { days: "Days 13–15", title: "Test and launch", text: "We test real orders end to end, train your team and go live." },
      ],
      note: "Timelines depend on how quickly product photos and details are shared. Growth Store takes a few extra days.",
    },
    caseStudies,
    faqs: [
      { question: "How long does it take to build my online store?", answer: "Starter Store usually takes 12–15 days. Growth Store takes a few days more. The timeline starts once we have your logo, product photos and product details." },
      { question: "Which payment options will my customers get?", answer: "UPI, debit and credit cards, net banking and Cash on Delivery. We connect a payment gateway such as Razorpay, PhonePe or Cashfree in your business name, so payments go directly to your bank account." },
      { question: "Are there any charges after the one-time payment?", answer: "Hosting and SSL are free for the first year. After that, renewal is charged yearly. The payment gateway charges a small fee per transaction (usually around 2%), and courier charges depend on your shipping partner. We explain all of this before you start." },
      { question: "Can I add and manage products myself?", answer: "Yes. You get an easy admin panel to add products, change prices, manage stock and see orders. We also train your team before launch." },
      { question: "What do I need to provide to get started?", answer: "Your logo, product photos, product names, prices and descriptions, and your business details for the payment gateway. If you need help with product photos or descriptions, ask us." },
      { question: "Can you help us get sales after the store is live?", answer: "Yes. We run Instagram, Facebook and Google Shopping ads and SEO for online stores. Your store is set up with the tracking these need from day one." },
    ],
  };
}
