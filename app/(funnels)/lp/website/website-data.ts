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
  primaryMetric: string;
  secondaryMetric: string;
  platform: "google" | "meta" | "seo" | "web";
  tags: string[];
  duration: string;
  summary: string;
  image: string;
  link?: string;
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
          price: "₹8,999",
          description: "",
          features: ["Up to 6 Pages", "Contact Form + WhatsApp Chat", "Google Map + Gallery", "Delivery in 2-3 Days"],
        },
        {
          label: "Most Popular",
          name: "Premium Website",
          oldPrice: "₹35,000",
          price: "₹29,999",
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
      // Real Estate
      { id: "northern", title: "The Northern Group", category: "Real Estate", location: "NZ", primaryMetric: "+400% Leads", secondaryMetric: "ROI 12x", platform: "web", tags: ["Real Estate", "Search"], duration: "Full Project", summary: "High-converting digital storefront for a top NZ portal.", image: "/images/thenortherngroup.webp", link: "https://thenortherngroup.co.nz" },
      { id: "acquire", title: "Acquire Buyers Agency", category: "Real Estate", location: "AU", primaryMetric: "82% Conversions", secondaryMetric: "CPL -30%", platform: "web", tags: ["Real Estate", "Bidding"], duration: "Scale-up", summary: "Strategic web presence for an Australian buyers agency.", image: "/images/acquirebuyersagency.webp", link: "https://acquirebuyersagency.com.au/" },
      { id: "greencity", title: "Green City", category: "Real Estate", location: "India", primaryMetric: "₹2.4 Cr Rev", secondaryMetric: "Leads +210%", platform: "web", tags: ["Real Estate", "Sales"], duration: "Phase 1", summary: "Digital launch for a premium residential layout project.", image: "/images/greencity.webp", link: "https://www.futurearthgroup.com/green-city" },
      { id: "nivritifarms", title: "Nivriti Farms", category: "Real Estate", location: "India", primaryMetric: "+150% Enquiries", secondaryMetric: "Conversion 18%", platform: "web", tags: ["Real Estate", "Luxury"], duration: "3 Months", summary: "Luxury farm project landing experience and lead capture.", image: "/images/nivritifarms.webp", link: "https://www.nivritifarms.com" },
      { id: "shb", title: "SHB Developers", category: "Real Estate", location: "India", primaryMetric: "₹1.2 Cr Revenue", secondaryMetric: "ROI 8.5x", platform: "web", tags: ["Real Estate", "Build"], duration: "Ongoing", summary: "Full-scale corporate identity and lead generation site.", image: "/images/shbdeveloperss.webp", link: "https://shbdeveloperss.com" },
      { id: "iqonwest", title: "Iqon West", category: "Real Estate", location: "India", primaryMetric: "+310% Enquiries", secondaryMetric: "CPL Drop 40%", platform: "web", tags: ["Real Estate", "Launch"], duration: "Sprint", summary: "Focused project landing page for high-intent investors.", image: "/images/iqonwest.webp", link: "https://ankurahomes.in/iqonwest/index.html" },

      // Education
      { id: "adcritter", title: "Ad Critter", category: "Education", location: "USA", primaryMetric: "82% Conversion", secondaryMetric: "Growth +150%", platform: "web", tags: ["MarTech", "UX"], duration: "MVP", summary: "Education-tech platform interface for US advertisers.", image: "/images/adcritter.webp", link: "https://adcritter.ai/" },
      { id: "carver", title: "Carver Aviation", category: "Education", location: "India", primaryMetric: "+320 Leads", secondaryMetric: "CPL -45%", platform: "web", tags: ["Aviation", "Leads"], duration: "Scale", summary: "Digital presence for India's premier flight training academy.", image: "/images/carveraviation.webp", link: "https://carveraviation.com/" },
      { id: "intryc", title: "Intryc", category: "Education", location: "India", primaryMetric: "ROI 4.2x", secondaryMetric: "CTR +65%", platform: "web", tags: ["FinTech", "Trust"], duration: "Full Life", summary: "Global education and finance trust management interface.", image: "/images/intryc.webp", link: "https://www.intryc.com" },
      { id: "peoplemanager", title: "People Manager", category: "Education", location: "AU", primaryMetric: "ROI 3.4x", secondaryMetric: "Growth +245%", platform: "web", tags: ["HR", "Platform"], duration: "3 Months", summary: "Australian education and hiring platform interface.", image: "/images/peoplemanager.webp", link: "https://peoplemanager.co/" },
      { id: "rollins", title: "Rollins", category: "Education", location: "USA", primaryMetric: "+245% Traffic", secondaryMetric: "Conversions +80%", platform: "web", tags: ["University", "Global"], duration: "Scale", summary: "US-based college portal extension and optimization.", image: "/images/rollins.webp", link: "https://www.rollins.edu" },
      { id: "wgu", title: "WGU", category: "Education", location: "USA", primaryMetric: "1M+ Visitors", secondaryMetric: "CPL -50%", platform: "web", tags: ["EdTech", "LMS"], duration: "Ongoing", summary: "Conversion-optimized pages for global online university.", image: "/images/wgu.webp", link: "https://www.wgu.edu" },

      // Healthcare
      { id: "alchemist", title: "Alchemist Pharmarx", category: "Healthcare", location: "USA", primaryMetric: "82% Conv Lift", secondaryMetric: "Orders +150%", platform: "web", tags: ["Pharma", "Ecom"], duration: "Sprint", summary: "US-based prescription and pharmacy portal revamp.", image: "/images/alchemistpharmarx.webp", link: "https://alchemistpharmarx.com/" },
      { id: "bettertomorrow", title: "Better Tomorrow", category: "Healthcare", location: "USA", primaryMetric: "ROI 5.2x", secondaryMetric: "Leads +310%", platform: "web", tags: ["Selfcare", "Care"], duration: "Scale", summary: "Patient-centered digital strategy and lead flow.", image: "/images/bettertomorrowtc.webp", link: "https://bettertomorrowtc.com/" },
      { id: "ddcsmiles", title: "DDC Smiles", category: "Healthcare", location: "India", primaryMetric: "₹31L Revenue", secondaryMetric: "ROI 5x", platform: "web", tags: ["Healthcare", "Dental"], duration: "30 Days", summary: "Strategic patient acquisition for a dental chain.", image: "/images/ddcsmiles.webp", link: "https://ddcsmiles.in/" },
      { id: "gateway", title: "Gateway Foundation", category: "Healthcare", location: "USA", primaryMetric: "ROI 3.4x", secondaryMetric: "Growth +210%", platform: "web", tags: ["Wellness", "Charity"], duration: "Ongoing", summary: "Impact-driven web presence for healthcare foundation.", image: "/images/gatewayfoundation.webp", link: "https://www.gatewayfoundation.org" },
      { id: "lakeview", title: "Lakeview Health", category: "Healthcare", location: "USA", primaryMetric: "+310% Enquiries", secondaryMetric: "CPL -40%", platform: "web", tags: ["Medical", "US"], duration: "Scale", summary: "Primary capture portal for luxury US medical facility.", image: "/images/lakeviewhealth.webp", link: "https://www.lakeviewhealth.com" },
      { id: "slcompounding", title: "SL Compounding", category: "Healthcare", location: "USA", primaryMetric: "₹50 L Sales", secondaryMetric: "ROI 6x", platform: "web", tags: ["Pharma", "Custom"], duration: "MVP", summary: "Pharmacy compounding order system and interface.", image: "/images/slcompounding.webp", link: "https://slcompounding.com" },

      // Industrial
      { id: "b2bind", title: "B2Bind", category: "Industrial", location: "India", primaryMetric: "₹85L Orders", secondaryMetric: "+210% Deals", platform: "web", tags: ["B2B", "International"], duration: "Ongoing", summary: "Robust B2B industrial portal for global supply.", image: "/images/b2bind.webp", link: "https://www.b2bind.com/" },
      { id: "interiorbuildouts", title: "Interior Buildouts", category: "Industrial", location: "USA", primaryMetric: "+300% Leads", secondaryMetric: "CPL -42%", platform: "web", tags: ["Construction", "Fitout"], duration: "Scale", summary: "Construction fit-out demand capture in the US.", image: "/images/interiorbuildouts.webp", link: "https://interiorbuildouts.com/" },
      { id: "pcl", title: "PCL", category: "Industrial", location: "USA", primaryMetric: "ROI 4.2x", secondaryMetric: "CTR +90%", platform: "web", tags: ["Construction", "Global"], duration: "Ongoing", summary: "High-performance construction group digital assets.", image: "/images/pcl.webp", link: "https://www.pcl.com/" },
      { id: "rud", title: "RUD", category: "Industrial", location: "AU", primaryMetric: "+175% Quotes", secondaryMetric: "Rev +50%", platform: "web", tags: ["Mining", "Heavy"], duration: "3 Months", summary: "Lifting and mining equipment industrial solution.", image: "/images/rud.webp", link: "https://www.rud.com.au/" },
      { id: "stenhouse", title: "Sten House Lifting", category: "Industrial", location: "AU", primaryMetric: "ROI 6.5x", secondaryMetric: "Orders +210%", platform: "web", tags: ["Maintenance", "Safety"], duration: "Scale", summary: "Safety-first industrial equipment service portal.", image: "/images/stenhouselifting.webp", link: "https://www.stenhouselifting.com.au/" },
      { id: "triveni", title: "Triveni Group", category: "Industrial", location: "India", primaryMetric: "+320 Leads", secondaryMetric: "Spend 25K", platform: "web", tags: ["Energy", "Mfg"], duration: "Ongoing", summary: "Global energy solutions manufacturing presence.", image: "/images/trivenigroup.webp", link: "https://www.trivenigroup.com/" },

      // E-commerce
      { id: "anatomy", title: "Anatomy Fitness", category: "E-commerce", location: "USA", primaryMetric: "₹35 L Rev", secondaryMetric: "+175% Sales", platform: "web", tags: ["Fitness", "App"], duration: "Scale", summary: "Direct-to-consumer fitness apparel and app site.", image: "/images/anatomyfitness.webp", link: "https://anatomyfitness.co/" },
      { id: "artebella", title: "Artebella", category: "E-commerce", location: "India", primaryMetric: "₹18 L Orders", secondaryMetric: "ROI 15x", platform: "web", tags: ["Art", "Decor"], duration: "Full Cycle", summary: "Premium art and home decor boutique storefront.", image: "/images/artebella.webp", link: "https://artebella.in/" },
      { id: "baatu-ecom", title: "Baatu", category: "E-commerce", location: "India", primaryMetric: "100K Downloads", secondaryMetric: "ROI 5x", platform: "web", tags: ["Tech", "Lifestyle"], duration: "Scale", summary: "Tech-lifestyle brand e-commerce and app hub.", image: "/images/baatu.webp", link: "https://www.baatu.in/" },
      { id: "bellalash", title: "Bella Lash", category: "E-commerce", location: "USA", primaryMetric: "2.5M Views", secondaryMetric: "+300% Rev", platform: "web", tags: ["Beauty", "Global"], duration: "Ongoing", summary: "Lash artist supply and global training platform.", image: "/images/bellalash.webp", link: "https://bellalash.com/" },
      { id: "britishdarts", title: "British Darts", category: "E-commerce", location: "USA", primaryMetric: "ROI 8.5x", secondaryMetric: "Orders +210%", platform: "web", tags: ["Sports", "Equip"], duration: "Scale", summary: "Heritage sports equipment e-commerce storefront.", image: "/images/britishdarts.webp", link: "https://britishdarts.com/" },
      { id: "gatodates", title: "Gatodates", category: "E-commerce", location: "India", primaryMetric: "+150% Orders", secondaryMetric: "CTR +95%", platform: "web", tags: ["Food", "Healthy"], duration: "Full Launch", summary: "Direct sales platform for premium healthy dates.", image: "/images/gatodates.webp", link: "https://gatodates.com/" },

      // IT
      { id: "betterworld", title: "Betterworld Technology", category: "IT", location: "USA", primaryMetric: "+245% Traffic", secondaryMetric: "ROI 3.4x", platform: "web", tags: ["SaaS", "Network"], duration: "Ongoing", summary: "Sustainable IT and network solution management.", image: "/images/betterworldtechnology.webp", link: "https://www.betterworldtechnology.com/" },
      { id: "exotel", title: "Exotel", category: "IT", location: "India", primaryMetric: "ROI 12x", secondaryMetric: "Conv 25%", platform: "web", tags: ["Cloud", "Telecom"], duration: "Scale", summary: "Conversion flow optimization for telecom leader.", image: "/images/exotel.webp", link: "https://exotel.com/" },
      { id: "intergy-it", title: "Intergy", category: "IT", location: "AU", primaryMetric: "ROI 5.2x", secondaryMetric: "Leads +210%", platform: "web", tags: ["Software", "B2B"], duration: "Full Project", summary: "Custom software solutions and B2B digital hub.", image: "/images/intergy.webp", link: "https://www.intergy.com.au/" },
      { id: "uinno", title: "Uinno", category: "IT", location: "Global", primaryMetric: "ROI 6.5x", secondaryMetric: "Growth 245%", platform: "web", tags: ["UI/UX", "Product"], duration: "Sprint", summary: "Digital transformation and product engineering.", image: "/images/lionwood.webp", link: "https://uinno.io/" },
      { id: "pubmatic", title: "Pubmatic", category: "IT", location: "Global", primaryMetric: "3M+ Views", secondaryMetric: "+350% Reach", platform: "web", tags: ["AdTech", "Platform"], duration: "Ongoing", summary: "Global ad infrastructure and publisher network.", image: "/images/pubmatic.webp", link: "https://pubmatic.com/" },
      { id: "xenai", title: "Xenai Digital", category: "IT", location: "AU", primaryMetric: "ROI 4.2x", secondaryMetric: "Growth +175%", platform: "web", tags: ["Digital", "Search"], duration: "Ongoing", summary: "Australian strategic digital and search agency.", image: "/images/xenaidigital.webp", link: "https://xenaidigital.com.au/" },

      // Hospitality
      { id: "ahilya", title: "Ahilya By The Sea", category: "Hospitality", location: "Goa", primaryMetric: "+310% Bookings", secondaryMetric: "CPL -40%", platform: "web", tags: ["Luxury", "Goa"], duration: "Ongoing", summary: "Luxury boutique hotel experience and booking flow.", image: "/images/ahilyabythesea.webp", link: "https://ahilyabythesea.com/" },
      { id: "ananta", title: "Ananta Hotels", category: "Hospitality", location: "India", primaryMetric: "₹35 L Rev", secondaryMetric: "ROI 12x", platform: "web", tags: ["Resort", "Nation"], duration: "Scale", summary: "Digital revamp of luxury hotel chain web assets.", image: "/images/anantahotels.webp", link: "https://www.anantahotels.com/" },
      { id: "boutique", title: "Stay Boutique", category: "Hospitality", location: "Global", primaryMetric: "ROI 5.2x", secondaryMetric: "Conv +210%", platform: "web", tags: ["Curated", "Hub"], duration: "Sprint", summary: "Strategic boutique hotel curator and booking site.", image: "/images/boutique.webp", link: "https://stay-boutique.com/" },
      { id: "jumeirah", title: "Jumeirah", category: "Hospitality", location: "Global", primaryMetric: "10M+ Revenue", secondaryMetric: "ROI 15x", platform: "web", tags: ["Luxury", "Global"], duration: "Ongoing", summary: "Premier luxury group direct booking optimization.", image: "/images/jumeirah.webp", link: "https://www.jumeirah.com/en" },
      { id: "postcard", title: "Postcard Resorts", category: "Hospitality", location: "India", primaryMetric: "+250% Direct", secondaryMetric: "ROI 8x", platform: "web", tags: ["Experience", "India"], duration: "Full Revamp", summary: "Boutique experience portal for niche resorts.", image: "/images/postcardresorts.webp", link: "https://www.postcardresorts.com/" },
      { id: "raas", title: "Raas Hotels", category: "Hospitality", location: "India", primaryMetric: "+310% Leads", secondaryMetric: "CPL -30%", platform: "web", tags: ["Heritage", "Luxury"], duration: "Sprint", summary: "Heritage luxury property booking and leads hub.", image: "/images/raashotels.webp", link: "https://www.raashotels.com/" },

      // Corporate
      { id: "assetclass-corp", title: "Asset Class", category: "Corporate", location: "Global", primaryMetric: "ROI 12x", secondaryMetric: "Traffic +245%", platform: "web", tags: ["Finance", "Scale"], duration: "Ongoing", summary: "Multi-national asset management digital platform.", image: "/images/assetclass.webp", link: "https://www.assetclass.com/" },
      { id: "corp-prof", title: "Corporate Professionals", category: "Corporate", location: "AU", primaryMetric: "+310 Leads", secondaryMetric: "Conv +40%", platform: "web", tags: ["Legal", "Advisory"], duration: "Scale", summary: "Strategic advisory and legal corporate presence.", image: "/images/corporateprofessionals.webp", link: "https://www.corporatewebsite.com.au/" },
      { id: "graham", title: "Graham Partners", category: "Corporate", location: "USA", primaryMetric: "₹50 L Sales", secondaryMetric: "ROI 6x", platform: "web", tags: ["Equity", "US"], duration: "Ongoing", summary: "Investment equity and firm management portal.", image: "/images/grahampartners.webp", link: "https://www.grahampartners.net/" },
      { id: "jabil", title: "Jabil", category: "Corporate", location: "Global", primaryMetric: "ROI 5.2x", secondaryMetric: "Growth +175%", platform: "web", tags: ["Manufacturing", "IT"], duration: "Ongoing", summary: "Global manufacturing services corporate asset.", image: "/images/jabil.webp", link: "https://www.jabil.com/" },
      { id: "kochhar", title: "Kochhar", category: "Corporate", location: "India", primaryMetric: "+320 Leads", secondaryMetric: "CPL -35%", platform: "web", tags: ["Legal", "India"], duration: "Sprint", summary: "Leading law firm digital service and lead hub.", image: "/images/kochhar.webp", link: "https://kochhar.com/" },
      { id: "lpl", title: "LPL", category: "Corporate", location: "USA", primaryMetric: "3M+ Views", secondaryMetric: "ROI 4.2x", platform: "web", tags: ["Insurance", "Global"], duration: "Ongoing", summary: "Financial services and insurance group presence.", image: "/images/lpl.webp", link: "https://www.lpl.com/" },

      // Wellness
      { id: "littlepalm", title: "Little Palm Island", category: "Wellness", location: "USA", primaryMetric: "+310% Bookings", secondaryMetric: "ROI 12x", platform: "web", tags: ["Spa", "Private"], duration: "Scale", summary: "Exclusive private island wellness resort portal.", image: "/images/littlepalmisland.webp", link: "https://www.littlepalmisland.com/" },
      { id: "lonretreat", title: "Lon Retreat", category: "Wellness", location: "AU", primaryMetric: "ROI 5.2x", secondaryMetric: "Leads +210%", platform: "web", tags: ["Organic", "Retreat"], duration: "Ongoing", summary: "Sustainable retreat and wellness experience site.", image: "/images/lonretreat.webp", link: "https://lonretreat.com.au/" },
      { id: "niramaya", title: "Niramaya", category: "Wellness", location: "AU", primaryMetric: "100K Views", secondaryMetric: "ROI 8x", platform: "web", tags: ["Holistic", "Villas"], duration: "Scale", summary: "Tropical wellness villas and spa booking hub.", image: "/images/niramaya.webp", link: "https://www.niramaya.com.au/" },
      { id: "terranea", title: "Terranea", category: "Wellness", location: "USA", primaryMetric: "+320% Leads", secondaryMetric: "ROI 15x", platform: "web", tags: ["Oceanfront", "Lux"], duration: "Ongoing", summary: "Oceanfront luxury wellness resort digital assets.", image: "/images/terranea-2.webp", link: "https://www.terranea.com/" },
      { id: "dolphinbay", title: "The Dolphin Bay", category: "Wellness", location: "Thailand", primaryMetric: "ROI 4.2x", secondaryMetric: "Conv +175%", platform: "web", tags: ["Beach", "Yoga"], duration: "Sprint", summary: "Beachfront yoga and wellness retreat experience.", image: "/images/thedolphinbay.webp", link: "https://www.thedolphinbay.com" }
    ],
  };
}
