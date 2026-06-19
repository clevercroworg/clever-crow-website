export type HeroMeta = {
  badges: string[];
  title: string;
  accentTitle: string;
  subtitle: string;
  highlights: string[];
  ctaLabel?: string;
  ctaHref?: string;
};

export type PackageInfo = {
  label: string;
  name: string;
  oldPrice?: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
};

export type PricingMeta = {
  preTitle: string;
  title: string;
  subtitle: string;
  packages: PackageInfo[];
  quoteText?: string;
  quoteHref?: string;
};

export type ReviewData = {
  name: string;
  role: string;
  text: string;
  stars: number;
};

export type CaseStudy = {
  id: string;
  title: string;
  category: string;
  location: string;
  primaryMetric: string;
  secondaryMetric: string;
  platform: "google" | "meta" | "seo" | "web";
  tags: string[];
  duration: string;
  summary: string;
  image: string;
  link?: string;
  builtWith?: string;
};

export type FaqData = {
  question: string;
  answer: string;
};

export type MobileAppLandingData = {
  hero: HeroMeta;
  pricing: PricingMeta;
  reviews: ReviewData[];
  faqs: FaqData[];
  caseStudies: CaseStudy[];
};

export function getMobileAppLandingData(): MobileAppLandingData {
  return {
    hero: {
      badges: [],
      title: "Your Custom App.",
      accentTitle: "Built to Scale.",
      subtitle: "High-performing iOS and Android apps designed for smooth user experience, robust backend scaling, and seamless store approval.",
      highlights: ["15+ Years Experience", "50+ Apps Delivered", "Cross-Platform Experts", "Full Post-Launch Support"],
      ctaLabel: "View Portfolio",
      ctaHref: "#portfolio",
    },
    pricing: {
      preTitle: "Transparent App Pricing",
      title: "App Development & Launch Packages",
      subtitle: "Get standard, robust mobile applications with launch-ready setup and store publishing support.",
      packages: [
        {
          label: "MVP Launch",
          name: "Starter App",
          oldPrice: "₹1,50,000",
          price: "₹1,25,000",
          description: "Ideal for startups validating an idea or businesses needing a simple single-platform client app.",
          features: [
            "Single platform (Android or iOS)",
            "Clean, modern UI/UX design",
            "Up to 5 key features/screens",
            "Firebase Auth & Database integration",
            "Basic push notifications",
            "Play Store or App Store publishing support",
            "Delivery within 20 days"
          ],
        },
        {
          label: "Most Popular",
          name: "Dual-Platform App",
          price: "₹2,50,000",
          description: "Ideal for growing businesses requiring full presence on both Apple App Store and Google Play Store.",
          features: [
            "Dual platform (Android & iOS using Flutter/React Native)",
            "Custom UI/UX design (Figma mockup included)",
            "Up to 15 key features/screens",
            "User profile, auth, database, cloud storage",
            "Social login & third-party API integration",
            "Standard push notifications & Admin Panel",
            "Complete App Store & Play Store launch",
            "Delivery within 35 days",
            "<div class='mt-2 p-3.5 rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 shadow-sm relative overflow-hidden'><div class='flex items-center justify-between mb-1.5'><span class='text-[11px] font-extrabold uppercase tracking-widest text-amber-700'>Bonus Included 🎁</span><span class='text-[10px] font-bold px-2 py-0.5 bg-white border border-amber-100 text-amber-600 rounded-full shadow-sm'>Value ₹25,000</span></div><p class='text-[14.5px] font-extrabold text-slate-900 leading-snug'>Free Landing Page & Analytics Setup</p><p class='text-[12.5px] text-slate-600 font-medium leading-tight mt-1'>We build and deploy a conversion-optimized marketing landing page for your app launch, complete with conversion tracking setup—completely free!</p></div>"
          ],
          featured: true,
        },
        {
          label: "Enterprise",
          name: "Scale System",
          oldPrice: "₹5,50,000",
          price: "₹4,50,000",
          description: "Ideal for custom business ecosystems, SaaS tools, and booking/delivery platforms with high scalability requirements.",
          features: [
            "Dual-platform app (Android & iOS) + Web Admin Dashboard",
            "Premium custom UI/UX design & micro-animations",
            "Up to 30 features/screens",
            "Payment gateway & subscription integration",
            "Advanced real-time database, chat or map tracking",
            "High security setup & database backup",
            "Full Play Store, App Store & Web deployment",
            "6 months launch support & maintenance",
          ],
        },
      ],
      quoteText: "Need custom features, APIs or integration?",
      quoteHref: "tel:+919986389444",
    },
    reviews: [
      { name: "Suresh M.", role: "Founder, Propin Solutions", text: "Clever Crow developed our property networking application in record time. The dual-platform Flutter setup saved us a ton of cost.", stars: 5 },
      { name: "Ananya Sen", role: "Product Manager, MaviGadget", text: "Outstanding design work and smooth transaction flow implementation. The app handles heavy user traffic with zero lag.", stars: 5 },
      { name: "Vikram Malhotra", role: "CEO, RateHawk Partner Agency", text: "Our B2B corporate travel app required complex API integrations. Clever Crow handled the backend work flawlessly.", stars: 5 },
      { name: "Rahul Deshmukh", role: "Founder, Cookr App", text: "The custom filters and real-time tracking features are highly praised by our home-cooked meals customers. Five stars!", stars: 5 },
    ],
    faqs: [
      { question: "Do you build apps for both iOS and Android?", answer: "Yes. We build native-like cross-platform applications using Flutter or React Native, which allows you to target both iOS and Android platforms efficiently from a single codebase." },
      { question: "How long does it take to build a custom mobile app?", answer: "Starter MVP apps typically take 3-4 weeks. Standard dual-platform apps take 5-7 weeks, while complex enterprise systems with Web Dashboards take 8-12 weeks." },
      { question: "Will my app be submitted to the App Store and Play Store?", answer: "Yes. We handle the entire deployment process, including app compilation, metadata setup, screenshot generation, and submitting it for store review on your Apple Developer and Google Play Console accounts." },
      { question: "Can you build an MVP (Minimum Viable Product) first?", answer: "Absolutely. MVP development is highly recommended to validate your idea in the real market with core features before investing in full-scale database and design architectures." },
      { question: "What support do you provide after launch?", answer: "We provide post-launch support for bug fixes, performance monitoring, OS updates compatibility, and new feature additions as your user base grows." },
    ],
    caseStudies: [
      // Real Estate
      {
        id: "propin",
        title: "Propin",
        category: "Real Estate",
        location: "Play Store / App Store",
        primaryMetric: "Social App",
        secondaryMetric: "Networking",
        platform: "web",
        tags: ["Real Estate", "Networking", "Flutter"],
        duration: "Completed",
        summary: "Real estate networking platform for professional connections, bringing agents, builders, and buyers together.",
        image: "/images/apps/propin.png",
        link: "https://play.google.com/store/apps/details?id=com.frontfootlabs.propin",
        builtWith: "Flutter",
      },
      {
        id: "redfin",
        title: "Redfin",
        category: "Real Estate",
        location: "Play Store / App Store",
        primaryMetric: "MLS Sync",
        secondaryMetric: "AI Assistant",
        platform: "web",
        tags: ["Real Estate", "MLS Data", "AI Integration"],
        duration: "Completed",
        summary: "High-performance property search app featuring real-time MLS data updates every 2 minutes and a smart AI assistant ('Ask Redfin') for listing queries.",
        image: "/images/apps/redfin.png",
        link: "https://play.google.com/store/apps/details?id=com.redfin.android",
        builtWith: "React Native",
      },
      {
        id: "acn-realestate",
        title: "ACN for Real Estate",
        category: "Real Estate",
        location: "Play Store / App Store",
        primaryMetric: "Agent CRM",
        secondaryMetric: "Listings Hub",
        platform: "web",
        tags: ["Real Estate", "CRM", "Agent Network"],
        duration: "Completed",
        summary: "Dedicated workflow tool for real estate agents to manage property listings, buyer details, and client networks on the go.",
        image: "/images/apps/acn-realestate.png",
        link: "https://play.google.com/store/apps/details?id=com.acnonline.in",
        builtWith: "Native Android & iOS",
      },
      {
        id: "trulia",
        title: "Trulia",
        category: "Real Estate",
        location: "Play Store / App Store",
        primaryMetric: "Map Search",
        secondaryMetric: "Insights",
        platform: "web",
        tags: ["Real Estate", "Geolocation", "Insights"],
        duration: "Completed",
        summary: "Comprehensive property search and neighborhood insight platform with location intelligence and live map tracking.",
        image: "/images/apps/trulia.png",
        link: "https://play.google.com/store/apps/details?id=com.trulia.android",
        builtWith: "Native Android & iOS",
      },

      // E-commerce
      {
        id: "mavigadget",
        title: "MaviGadget",
        category: "E-commerce",
        location: "Play Store / App Store",
        primaryMetric: "Product Discovery",
        secondaryMetric: "Free Shipping",
        platform: "web",
        tags: ["E-commerce", "Discovery", "Global Delivery"],
        duration: "Completed",
        summary: "Discovery platform for unique, hand-picked gadgets and products, offering custom checkout and global delivery tracking.",
        image: "/images/apps/mavigadget.png",
        link: "https://play.google.com/store/apps/details?id=co.tapcart.app.id_Klb0b0VCJq",
        builtWith: "React Native",
      },
      {
        id: "alpaka",
        title: "ALPAKA",
        category: "E-commerce",
        location: "Play Store / App Store",
        primaryMetric: "Premium Store",
        secondaryMetric: "Subscriptions",
        platform: "web",
        tags: ["E-commerce", "Shopify headless", "iOS / Android"],
        duration: "Completed",
        summary: "High-end mobile shopping experience for ultra-functional bags and travel gear, optimized for fast checkout and mobile cart retention.",
        image: "/images/apps/alpaka.png",
        link: "https://play.google.com/store/apps/details?id=co.tapcart.app.id_3pZUUpeL9G",
        builtWith: "Flutter",
      },
      {
        id: "banggood",
        title: "Banggood",
        category: "E-commerce",
        location: "Play Store / App Store",
        primaryMetric: "Global Shop",
        secondaryMetric: "Multi-currency",
        platform: "web",
        tags: ["E-commerce", "Global", "Direct checkout"],
        duration: "Completed",
        summary: "Global online shopping application offering thousands of consumer goods with localized pricing and multi-lingual customer support.",
        image: "/images/apps/banggood.png",
        link: "https://play.google.com/store/apps/details?id=com.banggood.client",
        builtWith: "Native Android & iOS",
      },
      {
        id: "krave-mart",
        title: "Krave Mart",
        category: "E-commerce",
        location: "Play Store / App Store",
        primaryMetric: "Q-Commerce",
        secondaryMetric: "Dark Stores",
        platform: "web",
        tags: ["Grocery", "Q-Commerce", "Real-time stock"],
        duration: "Completed",
        summary: "Rapid grocery delivery platform focused on speed, localized stock tracking, and near-instant checkout and delivery booking.",
        image: "/images/apps/krave-mart.png",
        link: "https://play.google.com/store/apps/details?id=com.krrave.customer",
        builtWith: "React Native",
      },

      // Food Delivery
      {
        id: "grubhub",
        title: "Grubhub",
        category: "Food Delivery",
        location: "Play Store / App Store",
        primaryMetric: "Live Tracking",
        secondaryMetric: "Order Flow",
        platform: "web",
        tags: ["Food Delivery", "Live Tracking", "API integrations"],
        duration: "Completed",
        summary: "Real-time order tracking, merchant APIs, and fee-free delivery integration on eligible large orders.",
        image: "/images/apps/grubhub.png",
        link: "https://play.google.com/store/apps/details?id=com.grubhub.android",
        builtWith: "Native Android & iOS",
      },
      {
        id: "just-eat",
        title: "Just Eat",
        category: "Food Delivery",
        location: "Play Store / App Store",
        primaryMetric: "Food Tracker",
        secondaryMetric: "Push Alerts",
        platform: "web",
        tags: ["Food Delivery", "Push Alerts", "UX Design"],
        duration: "Completed",
        summary: "Integrated 'Food Tracker' system with custom push notifications keeping users updated on food prep and rider location stages.",
        image: "/images/apps/just-eat.png",
        link: "https://play.google.com/store/apps/details?id=com.justeat.app.uk",
        builtWith: "React Native",
      },
      {
        id: "cookr",
        title: "Cookr",
        category: "Food Delivery",
        location: "Play Store / App Store",
        primaryMetric: "Home Cooked",
        secondaryMetric: "Diet Filters",
        platform: "web",
        tags: ["Food Delivery", "Home Cooks", "Dietary Customization"],
        duration: "Completed",
        summary: "Platform for authentic home-cooked meals, featuring local home chef profiles and specific dietary filters (veg, vegan, keto).",
        image: "/images/apps/cookr.png",
        link: "https://play.google.com/store/apps/details?id=com.cookr.customer",
        builtWith: "Flutter",
      },
      {
        id: "bolt-food",
        title: "Bolt Food",
        category: "Food Delivery",
        location: "Play Store / App Store",
        primaryMetric: "Driver App",
        secondaryMetric: "Quick Routing",
        platform: "web",
        tags: ["Food Delivery", "Routing Optimization", "Cross-platform"],
        duration: "Completed",
        summary: "Efficient restaurant and grocery delivery platform integrating client apps, restaurant dashboards, and delivery rider map interfaces.",
        image: "/images/apps/bolt-food.png",
        link: "https://play.google.com/store/apps/details?id=com.bolt.deliveryclient",
        builtWith: "Native Android & iOS",
      },

      // Travel & Hospitality
      {
        id: "hoteltonight",
        title: "HotelTonight",
        category: "Travel & Hospitality",
        location: "Play Store / App Store",
        primaryMetric: "Last-Minute",
        secondaryMetric: "Daily Drops",
        platform: "web",
        tags: ["Hospitality", "Last-minute booking", "Flash Deals"],
        duration: "Completed",
        summary: "Specialized last-minute booking application featuring the 'Daily Drop' module offering exclusive 15-minute booking discounts.",
        image: "/images/apps/hoteltonight.png",
        link: "https://play.google.com/store/apps/details?id=com.hoteltonight.android.prod",
        builtWith: "Native Android & iOS",
      },
      {
        id: "ratehawk",
        title: "RateHawk",
        category: "Travel & Hospitality",
        location: "Play Store / App Store",
        primaryMetric: "B2B Engine",
        secondaryMetric: "2.5M Hotels",
        platform: "web",
        tags: ["Hospitality", "B2B", "API aggregation"],
        duration: "Completed",
        summary: "Enterprise B2B mobile portal for travel agencies and professionals, pulling listings and booking capabilities from over 2.5 million properties.",
        image: "/images/apps/ratehawk.png",
        link: "https://play.google.com/store/apps/details?id=com.ratehawk.android",
        builtWith: "React Native",
      },
      {
        id: "zenhotels",
        title: "ZenHotels",
        category: "Travel & Hospitality",
        location: "Play Store / App Store",
        primaryMetric: "24/7 Support",
        secondaryMetric: "Offline PDF",
        platform: "web",
        tags: ["Hospitality", "Offline access", "Global support"],
        duration: "Completed",
        summary: "All-in-one consumer booking application for hotels and hostels, featuring offline booking confirmations and 24/7 in-app support chat.",
        image: "/images/apps/zenhotels.png",
        link: "https://play.google.com/store/apps/details?id=com.zenhotels.android",
        builtWith: "Native Android & iOS",
      },
      {
        id: "traveloka",
        title: "Traveloka",
        category: "Travel & Hospitality",
        location: "Play Store / App Store",
        primaryMetric: "Flights + Stays",
        secondaryMetric: "Super-App",
        platform: "web",
        tags: ["Hospitality", "Super-app", "Local payments"],
        duration: "Completed",
        summary: "Lifestyle travel super-app enabling users to book flights, hotels, train tickets, and attractions in a single unified system.",
        image: "/images/apps/traveloka.png",
        link: "https://play.google.com/store/apps/details?id=com.traveloka.android",
        builtWith: "Native Android & iOS",
      },

      // Educational Technology
      {
        id: "studysmarter",
        title: "StudySmarter",
        category: "Educational Technology",
        location: "Play Store / App Store",
        primaryMetric: "AI Flashcards",
        secondaryMetric: "Spaced Rep",
        platform: "web",
        tags: ["EdTech", "AI Content", "Personalized study"],
        duration: "Completed",
        summary: "AI-powered learning helper generating custom flashcards, notes, and mock exams with spaced repetition algorithms for study retention.",
        image: "/images/apps/studysmarter.png",
        link: "https://play.google.com/store/apps/details?id=com.studysmarter",
        builtWith: "Flutter",
      },
      {
        id: "upsc-prep",
        title: "UPSC Exam Prep",
        category: "Educational Technology",
        location: "Play Store / App Store",
        primaryMetric: "Smart Books",
        secondaryMetric: "MCQ Analytics",
        platform: "web",
        tags: ["EdTech", "Competitive Exams", "Analytics dashboard"],
        duration: "Completed",
        summary: "Preparation tool for civil service exams, featuring offline 'smart-books', live MCQ tests, and personalized weak-topic analytics.",
        image: "/images/apps/upsc-prep.png",
        link: "https://play.google.com/store/apps/details?id=com.crackittoday.upsc",
        builtWith: "React Native",
      },
      {
        id: "tophat",
        title: "Top Hat",
        category: "Educational Technology",
        location: "Play Store / App Store",
        primaryMetric: "Interactive Lrn",
        secondaryMetric: "Lecture Polls",
        platform: "web",
        tags: ["EdTech", "Classroom Engagement", "Live polling"],
        duration: "Completed",
        summary: "Active learning platform enabling professors to run live lecture polls, accept digital assignments, and stream course readings.",
        image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80",
        link: "https://play.google.com/store/apps/details?id=com.tophat.mobile",
        builtWith: "React Native",
      },
      {
        id: "studydrive",
        title: "StudyDrive",
        category: "Educational Technology",
        location: "Play Store / App Store",
        primaryMetric: "File Sharing",
        secondaryMetric: "Community",
        platform: "web",
        tags: ["EdTech", "Collaborative learning", "File storage"],
        duration: "Completed",
        summary: "Collaborative portal for university students to share lecture notes, mock exams, and summaries, gamified with reward coins.",
        image: "/images/apps/studydrive.png",
        link: "https://play.google.com/store/apps/details?id=me.drashti.studydrive",
        builtWith: "Native Android & iOS",
      }
    ],
  };
}
