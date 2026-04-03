export type HeroMeta = {
  badges: string[];
  title: string;
  accentTitle: string;
  subtitle: string;
  highlights: string[];
  ctaLabel?: string;
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
  ecommerceCard?: PackageInfo;
  quoteText?: string;
  quoteHref?: string;
};

export type PortfolioItem = {
  title: string;
  link: string;
  image: string;
};

export type PortfolioCategory = {
  id: string;
  name: string;
  items: PortfolioItem[];
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
  result: string;
  growth: string;
  tags: string[];
  duration: string;
  summary: string;
  image: string;
};

export type FaqData = {
  question: string;
  answer: string;
};

export type WebsiteLandingData = {
  hero: HeroMeta;
  pricing: PricingMeta;
  portfolio: PortfolioCategory[];
  reviews: ReviewData[];
  faqs: FaqData[];
  caseStudies: CaseStudy[];
};

export function getWebsiteLandingData(): WebsiteLandingData {
  return {
    hero: {
      badges: ["Website Growth Packages", "Conversion-Focused Design", "SEO-Ready Structure", "Fast Launch"],
      title: "Your Website.",
      accentTitle: "Built to Convert.",
      subtitle: "High-performing websites for businesses that need leads, not just pages. Fast load. Mobile first. SEO-ready structure from day one.",
      highlights: ["15+ Years Experience", "550+ Happy Clients", "Certified Team", "Fast Delivery & Support"],
      ctaLabel: "View Prices",
    },
    pricing: {
      preTitle: "February Special Offer",
      title: "Valentine Website Packages",
      subtitle: "Get conversion-focused websites with launch-ready setup and fast delivery.",
      packages: [
        {
          label: "Starter",
          name: "Basic Website",
          oldPrice: "₹10,000",
          price: "₹7,999",
          description: "",
          features: ["Up to 6 Pages", "Contact Form + WhatsApp Chat", "Google Map + Gallery", "Delivery in 2-3 Days"],
        },
        {
          label: "Most Popular",
          name: "Premium Website",
          oldPrice: "₹35,000",
          price: "₹28,000",
          description: "",
          features: ["Up to 30 Pages + CMS", "Blog, Gallery, Advanced Forms", "Basic On-page SEO", "Delivery in 8-10 Days"],
          featured: true,
        },
      ],
      ecommerceCard: {
        label: "Scale Online",
        name: "E-Commerce Website",
        price: "₹45,000",
        description: "Built for brands ready to sell online with optimized checkout and product management.",
        features: [
          "Products and Variations",
          "Payment Gateway Integration",
          "Coupons and Discounts",
          "Shipping and Tax Management",
          "Admin Panel Training",
          "Delivery in 12-15 Days",
          "Cart Abandonment Recovery",
          "Order Tracking and Status Emails",
          "Meta Pixel and GA4 E-commerce Tracking",
        ],
      },
      quoteText: "Need a broader scope or custom plan?",
      quoteHref: "tel:+919986389444",
    },
    portfolio: [
      {
        id: "realestate",
        name: "Real Estate",
        items: [
          { title: "The Northern Group", link: "https://thenortherngroup.co.nz", image: "/images/thenortherngroup.webp" },
          { title: "Acquire Buyers Agency", link: "https://acquirebuyersagency.com.au/", image: "/images/acquirebuyersagency.webp" },
          { title: "Green City", link: "https://www.futurearthgroup.com/green-city", image: "/images/greencity.webp" },
          { title: "Nivriti Farms", link: "https://www.nivritifarms.com", image: "/images/nivritifarms.webp" },
          { title: "SHB Developers", link: "https://shbdeveloperss.com", image: "/images/shbdeveloperss.webp" },
          { title: "Iqon West", link: "https://ankurahomes.in/iqonwest/index.html", image: "/images/iqonwest.webp" },
        ],
      },
      {
        id: "education",
        name: "Education",
        items: [
          { title: "Ad Critter", link: "https://adcritter.ai/", image: "/images/adcritter.webp" },
          { title: "Carver Aviation", link: "https://carveraviation.com/", image: "/images/carveraviation.webp" },
          { title: "Intryc", link: "https://www.intryc.com", image: "/images/intryc.webp" },
          { title: "People Manager", link: "https://peoplemanager.co/", image: "/images/peoplemanager.webp" },
          { title: "Rollins", link: "https://www.rollins.edu", image: "/images/rollins.webp" },
          { title: "WGU", link: "https://www.wgu.edu", image: "/images/wgu.webp" },
        ],
      },
      {
        id: "healthcare",
        name: "Healthcare",
        items: [
          { title: "Alchemist Pharmarx", link: "https://alchemistpharmarx.com/", image: "/images/alchemistpharmarx.webp" },
          { title: "Better Tomorrow", link: "https://bettertomorrowtc.com/", image: "/images/bettertomorrowtc.webp" },
          { title: "DDC Smiles", link: "https://ddcsmiles.in/", image: "/images/ddcsmiles.webp" },
          { title: "Gateway Foundation", link: "https://www.gatewayfoundation.org", image: "/images/gatewayfoundation.webp" },
          { title: "Lakeview Health", link: "https://www.lakeviewhealth.com", image: "/images/lakeviewhealth.webp" },
          { title: "SL Compounding", link: "https://slcompounding.com", image: "/images/slcompounding.webp" },
        ],
      },
      {
        id: "industrial",
        name: "Industrial",
        items: [
          { title: "B2Bind", link: "https://www.b2bind.com/", image: "/images/b2bind.webp" },
          { title: "Interior Buildouts", link: "https://interiorbuildouts.com/", image: "/images/interiorbuildouts.webp" },
          { title: "PCL", link: "https://www.pcl.com/", image: "/images/pcl.webp" },
          { title: "RUD", link: "https://www.rud.com.au/", image: "/images/rud.webp" },
          { title: "Sten House Lifting", link: "https://www.stenhouselifting.com.au/", image: "/images/stenhouselifting.webp" },
          { title: "Triveni Group", link: "https://www.trivenigroup.com/", image: "/images/trivenigroup.webp" },
        ],
      },
      {
        id: "ecommerce",
        name: "E-commerce",
        items: [
          { title: "Anatomy Fitness", link: "https://anatomyfitness.co/", image: "/images/anatomyfitness.webp" },
          { title: "Artebella", link: "https://artebella.in/", image: "/images/artebella.webp" },
          { title: "Baatu", link: "https://www.baatu.in/", image: "/images/baatu.webp" },
          { title: "Bella Lash", link: "https://bellalash.com/", image: "/images/bellalash.webp" },
          { title: "British Darts", link: "https://britishdarts.com/", image: "/images/britishdarts.webp" },
          { title: "Gatodates", link: "https://gatodates.com/", image: "/images/gatodates.webp" },
        ],
      },
      {
        id: "it",
        name: "IT",
        items: [
          { title: "Betterworld Technology", link: "https://www.betterworldtechnology.com/", image: "/images/betterworldtechnology.webp" },
          { title: "Exotel", link: "https://exotel.com/", image: "/images/exotel.webp" },
          { title: "Intergy", link: "https://www.intergy.com.au/", image: "/images/intergy.webp" },
          { title: "Uinno", link: "https://uinno.io/", image: "/images/lionwood.webp" },
          { title: "Pubmatic", link: "https://pubmatic.com/", image: "/images/pubmatic.webp" },
          { title: "Xenai Digital", link: "https://xenaidigital.com.au/", image: "/images/xenaidigital.webp" },
        ],
      },
      {
        id: "hospitality",
        name: "Hospitality",
        items: [
          { title: "Ahilya", link: "https://ahilyabythesea.com/", image: "/images/ahilyabythesea.webp" },
          { title: "Ananta Hotels", link: "https://www.anantahotels.com/", image: "/images/anantahotels.webp" },
          { title: "Stay Boutique", link: "https://stay-boutique.com/", image: "/images/boutique.webp" },
          { title: "Jumeirah", link: "https://www.jumeirah.com/en", image: "/images/jumeirah.webp" },
          { title: "Postcard Resorts", link: "https://www.postcardresorts.com/", image: "/images/postcardresorts.webp" },
          { title: "Raas Hotels", link: "https://www.raashotels.com/", image: "/images/raashotels.webp" },
        ],
      },
      {
        id: "corporate",
        name: "Corporate",
        items: [
          { title: "Asset Class", link: "https://www.assetclass.com/", image: "/images/assetclass.webp" },
          { title: "Corporate Professionals", link: "https://www.corporatewebsite.com.au/", image: "/images/corporateprofessionals.webp" },
          { title: "Graham Partners", link: "https://www.grahampartners.net/", image: "/images/grahampartners.webp" },
          { title: "Jabil", link: "https://www.jabil.com/", image: "/images/jabil.webp" },
          { title: "Kochhar", link: "https://kochhar.com/", image: "/images/kochhar.webp" },
          { title: "LPL", link: "https://www.lpl.com/", image: "/images/lpl.webp" },
        ],
      },
      {
        id: "wellness",
        name: "Wellness",
        items: [
          { title: "Little Palm Island", link: "https://www.littlepalmisland.com/", image: "/images/littlepalmisland.webp" },
          { title: "Lon Retreat", link: "https://lonretreat.com.au/", image: "/images/lonretreat.webp" },
          { title: "Niramaya", link: "https://www.niramaya.com.au/", image: "/images/niramaya.webp" },
          { title: "Terranea", link: "https://www.terranea.com/", image: "/images/terranea-2.webp" },
          { title: "The Dolphin Bay", link: "https://www.thedolphinbay.com", image: "/images/thedolphinbay.webp" },
        ],
      },
    ],
    reviews: [
      { name: "Arun R.", role: "Director, Riva Builders", text: "We started getting 8-10 solid leads per day. Within 3 weeks, we sold 4 units directly from ad-generated leads.", stars: 5 },
      { name: "Ramesh Shetty", role: "BrightEdge Academy", text: "Clevercrow delivered 300+ leads in under a month for our coaching centre launch. Messaging and creatives were spot on.", stars: 5 },
      { name: "Dr. Priya B.", role: "DDC Smiles", text: "In 2 months we ranked in top 3 for key local terms and now acquire patients every week from search.", stars: 5 },
      { name: "Shyam Patel", role: "ARR Engineering", text: "They transformed our outdated website into a modern, client-focused digital storefront with better enquiry flow.", stars: 5 },
      { name: "Client Team", role: "Growth Brand", text: "Execution was fast and communication stayed clear across design, development, and campaign launch.", stars: 5 },
      { name: "Client Team", role: "Services Company", text: "From branding alignment to conversion tracking, the final website was built for business outcomes.", stars: 5 },
    ],
    faqs: [
      { question: "How long does it take to build a website?", answer: "Landing pages: 3-5 days. Business websites: 7-10 days. E-commerce websites: 12-15 days depending on content and functionality scope." },
      { question: "What do I need to provide to get started?", answer: "Your logo, service details, and any existing content. If needed, we help with structure, content direction, and design assets." },
      { question: "Will my website be mobile-friendly and SEO-ready?", answer: "Yes. Every build is responsive and includes clean URL structure, metadata setup, and on-page technical SEO basics." },
      { question: "Can you help with hosting, domain, and business email setup?", answer: "Yes. We support domain, hosting, SSL, and email setup during project onboarding and launch." },
      { question: "What happens after launch?", answer: "We run final QA, speed checks, and provide post-launch support for updates and fixes." },
    ],
    caseStudies: [
      {
        id: "northern",
        title: "The Northern Group",
        category: "Real Estate",
        location: "New Zealand",
        result: "+400% Leads",
        growth: "Top Rank in NZ",
        tags: ["SEO", "Web Development"],
        duration: "Full Project",
        summary: "Created a high-converting digital storefront that became a top-ranking real estate portal in New Zealand, resulting in a significant increase in client enquiries.",
        image: "/images/thenortherngroup.webp"
      },
      {
        id: "adcritter",
        title: "Ad Critter AI",
        category: "MarTech",
        location: "USA",
        result: "Launch Ready",
        growth: "High Performance",
        tags: ["Next.js", "AI Integration"],
        duration: "MVP Launch",
        summary: "Developed a modern SaaS interface for an AI-powered advertising platform, focusing on user experience and conversion optimization.",
        image: "/images/adcritter.webp"
      },
      {
        id: "ananta",
        title: "Ananta Hotels",
        category: "Hospitality",
        location: "Rajasthan",
        result: "+300% Direct Bookings",
        growth: "Digital Transformation",
        tags: ["Web Design", "Hospitality"],
        duration: "Digital Revamp",
        summary: "Transformed the digital presence of a luxury hotel chain, improving the direct booking pipeline and brand perception through immersive design.",
        image: "/images/anantahotels.webp"
      },
      {
        id: "b2bind",
        title: "B2Bind",
        category: "Industrial",
        location: "Hubli",
        result: "+210% Orders",
        growth: "Global Outreach",
        tags: ["B2B Portal", "International"],
        duration: "Scale-Up",
        summary: "Built a robust B2B industrial portal to manage global orders and supply chains, streamlining the procurement process for international clients.",
        image: "/images/b2bind.webp"
      },
      {
        id: "baatu",
        title: "Baatu",
        category: "Technology",
        location: "India",
        result: "+100K Downloads",
        growth: "Market Leader",
        tags: ["FinTech", "App Interface"],
        duration: "Full Lifecycle",
        summary: "Engineered a user-centric web interface and app support system for a high-growth FinTech startup, supporting over 100k active users.",
        image: "/images/baatu.webp"
      },
      {
        id: "assetclass",
        title: "Asset Class",
        category: "Corporate",
        location: "USA",
        result: "+245% Traffic",
        growth: "Investor Trust",
        tags: ["FinTech", "Corporate"],
        duration: "Digital Trust",
        summary: "Developed a secure and professional digital platform for a multi-national asset management firm, enhancing investor engagement and transparency.",
        image: "/images/assetclass.webp"
      }
    ],
  };
}
