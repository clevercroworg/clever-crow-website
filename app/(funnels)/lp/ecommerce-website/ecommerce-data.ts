import { getWebsiteLandingData, type CaseStudy, type FaqData, type PricingMeta } from "../website/website-data";

export type EcommerceFeature = { icon: string; title: string; text: string };
export type ProcessStep = { days: string; title: string; text: string };
export type ComparisonRow = { before: string; after: string };

export type EcommerceLandingData = {
  hero: { title: string; accentTitle: string; subtitle: string; highlights: string[]; ctaLabel?: string };
  pricing: PricingMeta;
  comparison: { preTitle: string; title: string; subtitle: string; beforeLabel: string; afterLabel: string; rows: ComparisonRow[] };
  sell: { title: string; items: string[] };
  features: { preTitle: string; title: string; subtitle: string; items: EcommerceFeature[] };
  process: { preTitle: string; title: string; subtitle: string; steps: ProcessStep[]; note: string };
  caseStudies: CaseStudy[];
  faqs: FaqData[];
  finalCta: { title: string; text: string };
};

// Product stores only, taken from the shared portfolio on /lp/website and regrouped by what they sell. Each is the
// kind of store our two packages build (no marketplaces, apps or SaaS). The card shows `highlight` instead of revenue
// figures. [portfolio id, tab, highlight]
const STORES: [string, string, string][] = [
  ["sleepyowl", "Food & Beverage", "Coffee subscriptions"],
  ["bombaysweetshop", "Food & Beverage", "Festive gift hampers"],
  ["cocofuse", "Food & Beverage", "D2C drinks store"],
  ["gatodates-ecom", "Food & Beverage", "Healthy snacks store"],
  ["perfectted", "Food & Beverage", "Energy drink store"],
  ["countrybean-fb", "Food & Beverage", "Coffee and combos"],
  ["teaorigin", "Food & Beverage", "Tea store"],
  ["bluebrew", "Food & Beverage", "Cold brew store"],
  ["nativeclanorganics", "Food & Beverage", "Organic pantry store"],
  ["namhyafoods", "Food & Beverage", "Health foods store"],
  ["slurrpfarm", "Food & Beverage", "Kids food store"],
  ["tagzfoods", "Food & Beverage", "Snacks store"],
  ["whatsupwellness-well", "Beauty & Wellness", "Wellness gummies store"],
  ["nyumi", "Beauty & Wellness", "Supplements store"],
  ["ikkai", "Beauty & Wellness", "Skincare store"],
  ["cavemanorganics", "Beauty & Wellness", "Men's grooming store"],
  ["bellalash-ecom", "Beauty & Wellness", "Beauty supplies store"],
  ["monaariyavastra", "Fashion & Lifestyle", "Saree store"],
  ["bonorganik", "Fashion & Lifestyle", "Family wear store"],
  ["underdog", "Fashion & Lifestyle", "Streetwear store"],
  ["themessycorner", "Fashion & Lifestyle", "Personalised gifts"],
  ["copperh2o", "Fashion & Lifestyle", "Copper bottles store"],
  ["artebella-ecom", "Home & Decor", "Art and decor store"],
  ["homesake", "Home & Decor", "Handcrafted lighting"],
  ["furnishka", "Home & Decor", "Furniture store"],
  ["koparoclean", "Home & Decor", "Home care store"],
  ["ecokaari", "Home & Decor", "Eco crafts store"],
  ["britishdarts-ecom", "Sports & Specialty", "Sports equipment store"],
  ["mrbur", "Sports & Specialty", "Dental supplies store"],
];

export function getEcommerceLandingData(): EcommerceLandingData {
  const byId = new Map(getWebsiteLandingData().caseStudies.map((cs) => [cs.id, cs]));
  const caseStudies = STORES.flatMap(([id, category, highlight]) => {
    const cs = byId.get(id);
    return cs ? [{ ...cs, category, primaryMetric: highlight, secondaryMetric: "Online store" }] : [];
  });

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
    comparison: {
      preTitle: "Why Your Own Store",
      title: "Still taking orders in DMs?",
      subtitle: "Instagram and WhatsApp are great for getting noticed. Your own store is where the selling gets easy.",
      beforeLabel: "Selling on DMs",
      afterLabel: "Your own online store",
      rows: [
        { before: "Replying to \"price?\" messages all day", after: "Prices, sizes and stock shown on every product" },
        { before: "Chasing payment screenshots", after: "UPI, cards and COD paid at checkout" },
        { before: "Orders lost in long chats", after: "Every order in one admin panel" },
        { before: "Sales stop when you sleep", after: "Customers order 24×7, even at 2 AM" },
        { before: "Hard to look trustworthy", after: "Your own brand, domain and secure checkout" },
      ],
    },
    sell: {
      title: "Built for every kind of product",
      items: ["Fashion & Sarees", "Beauty & Skincare", "Food & Snacks", "Home Decor", "Jewellery", "Gifts & Hampers", "Health & Wellness", "Handicrafts", "Kids & Toys", "Pet Supplies", "Electronics Accessories", "Organic Products"],
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
      { question: "Can I sell on Instagram and WhatsApp too?", answer: "Yes. Your store links work in your Instagram bio, stories and WhatsApp chats. Customers tap the link, choose a product and pay, without any back-and-forth messages." },
      { question: "Can you help us get sales after the store is live?", answer: "Yes. We run Instagram, Facebook and Google Shopping ads and SEO for online stores. Your store is set up with the tracking these need from day one." },
    ],
    finalCta: {
      title: "Start selling online in about 15 days",
      text: "Tell us what you sell. We'll suggest the right package and share a clear plan on a quick call.",
    },
  };
}
