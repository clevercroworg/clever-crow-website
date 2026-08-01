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
      preTitle: "Transparent Pricing",
      title: "High-Performance Website Packages",
      subtitle: "Get conversion-focused websites with launch-ready setup and fast delivery.",
      packages: [
        {
          label: "Starter",
          name: "Basic Website",
          oldPrice: "₹10,000",
          price: "₹9,999",
          description: "",
          features: [
            "Up to 6 pages",
            "100% mobile responsive",
            "WhatsApp chat",
            "Google forms",
            "Gallery",
            "Delivery within 4 days"
          ],
        },
        {
          label: "Professional",
          name: "Website Package",
          price: "₹18,000",
          description: "",
          features: [
             "Everything in Basic plan",
             "Up to 20 pages",
             "Basic SEO",
             "Sitemap setup",
             "Google Analytics",
             "Social media integration",
             "Delivery within 6 days"
          ],
        },
        {
          label: "Most Popular",
          name: "Premium Website",
          oldPrice: "₹35,000",
          price: "₹29,999",
          description: "",
          features: [
            "Everything in Pro plan",
            "Up to 30 pages",
            "Blog posts",
            "Admin dashboard",
            "Advanced SEO",
            "Speed Optimization",
            "Delivery within 12 days",
            "<div class='mt-2 p-3.5 rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 shadow-sm relative overflow-hidden'><div class='flex items-center justify-between mb-1.5'><span class='text-[11px] font-extrabold uppercase tracking-widest text-amber-700'>Bonus Included 🎁</span><span class='text-[10px] font-bold px-2 py-0.5 bg-white border border-amber-100 text-amber-600 rounded-full shadow-sm'>Value ₹6,000</span></div><p class='text-[14.5px] font-extrabold text-slate-900 leading-snug'>6 Free Instagram Posts</p><p class='text-[12.5px] text-slate-600 font-medium leading-tight mt-1'>Kickstart your digital presence seamlessly alongside your website launch—completely free!</p></div>"
          ],
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
      // 1. Hospitality
      { id: "manuallaya", title: "Manuallaya", category: "Hospitality", location: "India", primaryMetric: "+280% Bookings", secondaryMetric: "ROI 9.5x", platform: "web", tags: ["Resort", "Luxury"], duration: "Ongoing", summary: "Resort & spa booking portal experience.", image: "/images/manuallaya.webp", link: "https://www.manuallaya.com/" },
      { id: "orchardgreens", title: "The Orchard Greens", category: "Hospitality", location: "India", primaryMetric: "₹45L Direct Rev", secondaryMetric: "CPL -35%", platform: "web", tags: ["Hotel", "Manali"], duration: "Full Launch", summary: "High-converting hotel portal in Manali.", image: "/images/orchardgreens.webp", link: "https://www.theorchardgreens.com/" },
      { id: "woodrock", title: "Woodrock Hotels", category: "Hospitality", location: "India", primaryMetric: "+210% Enquiries", secondaryMetric: "ROI 8x", platform: "web", tags: ["Hospitality", "Resort"], duration: "Scale", summary: "Luxury hotel booking and experience showcase.", image: "/images/woodrock.webp", link: "https://woodrockhotels.com/" },
      { id: "snowvalley", title: "Snow Valley Resorts", category: "Hospitality", location: "India", primaryMetric: "ROI 11x", secondaryMetric: "Direct Bookings", platform: "web", tags: ["Resort", "Mountain"], duration: "Ongoing", summary: "Multi-destination luxury resort portal.", image: "/images/snowvalley.webp", link: "https://www.snowvalleyresorts.com/" },
      { id: "whisperinginn", title: "The Whispering Inn", category: "Hospitality", location: "India", primaryMetric: "+195% Enquiries", secondaryMetric: "Conv +40%", platform: "web", tags: ["Heritage", "Manali"], duration: "Sprint", summary: "Boutique heritage resort digital storefront.", image: "/images/whisperinginn.webp", link: "https://thewhisperinginn.co.in/" },
      { id: "kolahoigreen", title: "Kolahoi Green", category: "Hospitality", location: "Kashmir", primaryMetric: "ROI 10.2x", secondaryMetric: "Leads +230%", platform: "web", tags: ["Kashmir", "Resort"], duration: "Ongoing", summary: "Kashmir luxury hotel chain booking website.", image: "/images/kolahoigreen.webp", link: "https://kolahoigreen.com/" },
      { id: "edenresorts", title: "Eden Resorts", category: "Hospitality", location: "India", primaryMetric: "+250% Direct", secondaryMetric: "CPL -30%", platform: "web", tags: ["Nature", "Eco"], duration: "Full Launch", summary: "Eco-nature resort booking and enquiry hub.", image: "/images/edenresorts.webp", link: "https://edenresorts.in/" },
      { id: "chembarathi", title: "Chembarathi Wayanad", category: "Hospitality", location: "Wayanad", primaryMetric: "ROI 12x", secondaryMetric: "Rev +180%", platform: "web", tags: ["Wayanad", "Villas"], duration: "Scale", summary: "Wayanad luxury eco-resort digital experience.", image: "/images/chembarathi.webp", link: "https://www.chembarathi.com/" },
      { id: "mountxanadu", title: "Mount Xanadu", category: "Hospitality", location: "Wayanad", primaryMetric: "+320% Leads", secondaryMetric: "ROI 14x", platform: "web", tags: ["Luxury", "Hilltop"], duration: "Ongoing", summary: "Premium hilltop resort lead & direct booking site.", image: "/images/mountxanadu.webp", link: "https://www.mountxanadu.com/" },
      { id: "willowresorts", title: "Willow Resorts", category: "Hospitality", location: "Wayanad", primaryMetric: "+175% Bookings", secondaryMetric: "CTR +85%", platform: "web", tags: ["Boutique", "Nature"], duration: "Sprint", summary: "Nature retreat and luxury villa portal.", image: "/images/willowresorts.webp", link: "https://www.willowresorts.in/" },
      { id: "wayanadsilverwoods", title: "Wayanad Silverwoods", category: "Hospitality", location: "Wayanad", primaryMetric: "₹85L Direct Rev", secondaryMetric: "ROI 11.5x", platform: "web", tags: ["Lakefront", "Resort"], duration: "Scale", summary: "5-Star lakefront resort booking engine site.", image: "/images/wayanadsilverwoods.webp", link: "https://www.wayanadsilverwoods.com/" },
      { id: "peppertrail", title: "Pepper Trail", category: "Hospitality", location: "Wayanad", primaryMetric: "+290% Direct", secondaryMetric: "ROI 13x", platform: "web", tags: ["Heritage", "Plantation"], duration: "Ongoing", summary: "Treehouse and heritage plantation resort site.", image: "/images/peppertrail.webp", link: "https://www.peppertrail.in/" },
      { id: "sirinatureroost", title: "Siri Nature Roost", category: "Hospitality", location: "Chikkamagaluru", primaryMetric: "+340% Enquiries", secondaryMetric: "ROI 15x", platform: "web", tags: ["Resort", "Wellness"], duration: "Full Launch", summary: "Luxury Chikmagalur resort digital storefront.", image: "/images/sirinatureroost.webp", link: "https://www.sirinatureroost.com/" },
      { id: "vismitacounty", title: "Vismita County", category: "Hospitality", location: "Chikkamagaluru", primaryMetric: "+210% Direct", secondaryMetric: "CPL -40%", platform: "web", tags: ["Resort", "Stay"], duration: "Scale", summary: "Coffee estate luxury resort booking site.", image: "/images/vismitacounty.webp", link: "https://vismitacounty.com/" },
      { id: "mookanana", title: "Mookanana", category: "Hospitality", location: "Sakleshpur", primaryMetric: "+190% Bookings", secondaryMetric: "ROI 8.5x", platform: "web", tags: ["Jungle", "Resort"], duration: "Sprint", summary: "Jungle resort and wilderness retreat site.", image: "/images/mookanana.webp", link: "https://mookanana.com/" },
      { id: "vialakhela", title: "Via Lakhela", category: "Hospitality", location: "Kumbhalgarh", primaryMetric: "ROI 10.5x", secondaryMetric: "Leads +240%", platform: "web", tags: ["Lake", "Heritage"], duration: "Ongoing", summary: "Lakeside luxury resort & spa digital portal.", image: "/images/vialakhela.webp", link: "https://www.vialakhela.com/" },
      { id: "anopura", title: "Anopura", category: "Hospitality", location: "Jaipur", primaryMetric: "+260% Enquiries", secondaryMetric: "ROI 12x", platform: "web", tags: ["Boutique", "Micro-Resort"], duration: "Scale", summary: "Countryside luxury micro-resort site.", image: "/images/anopura.webp", link: "https://anopura.com/" },
      { id: "vasantkunjresort", title: "Vasant Kunj Resort", category: "Hospitality", location: "Rajasthan", primaryMetric: "+220% Direct", secondaryMetric: "CPL -30%", platform: "web", tags: ["Palace", "Resort"], duration: "Sprint", summary: "Heritage royal resort digital showcase.", image: "/images/vasantkunjresort.webp", link: "https://vasantkunjresort.com/" },
      { id: "shahpura", title: "Shahpura Hotels", category: "Hospitality", location: "Rajasthan", primaryMetric: "₹1.8 Cr Rev", secondaryMetric: "ROI 14x", platform: "web", tags: ["Royal", "Heritage"], duration: "Ongoing", summary: "Royal heritage hotels & palaces group site.", image: "/images/shahpura.webp", link: "https://shahpura.com/" },
      { id: "johrijaipur", title: "The Johri Jaipur", category: "Hospitality", location: "Jaipur", primaryMetric: "+310% Enquiries", secondaryMetric: "ROI 15x", platform: "web", tags: ["Luxury", "Heritage"], duration: "Scale", summary: "Historic haveli luxury boutique hotel site.", image: "/images/johrijaipur.webp", link: "https://www.thejohrijaipur.com/" },
      { id: "seashellslakshadweep", title: "Seashells Lakshadweep", category: "Hospitality", location: "Lakshadweep", primaryMetric: "+270% Bookings", secondaryMetric: "ROI 9.5x", platform: "web", tags: ["Island", "Beach"], duration: "Full Launch", summary: "Island beach resort & water sports portal.", image: "/images/seashellslakshadweep.webp", link: "http://www.seashellslakshadweep.in/" },
      { id: "machan", title: "The Machan", category: "Hospitality", location: "Lonavala", primaryMetric: "₹2.2 Cr Direct", secondaryMetric: "ROI 16x", platform: "web", tags: ["Treehouse", "Eco"], duration: "Ongoing", summary: "Exclusive eco-friendly treehouse resort site.", image: "/images/machan.webp", link: "https://www.themachan.com/" },
      { id: "vaikundamlegacy", title: "Vaikundam Legacy", category: "Hospitality", location: "Kerala", primaryMetric: "+180% Direct", secondaryMetric: "ROI 7.5x", platform: "web", tags: ["Heritage", "Kerala"], duration: "Sprint", summary: "Traditional Kerala heritage stay portal.", image: "/images/vaikundamlegacy.webp", link: "https://www.vaikundamlegacy.com/" },
      { id: "belgadiapalace", title: "The Belgadia Palace", category: "Hospitality", location: "Odisha", primaryMetric: "+290% Leads", secondaryMetric: "ROI 11x", platform: "web", tags: ["Palace", "Royal"], duration: "Scale", summary: "Victorian royal palace hotel digital hub.", image: "/images/belgadiapalace.webp", link: "https://www.thebelgadiapalace.com/" },
      { id: "suryagarh", title: "Suryagarh Collection", category: "Hospitality", location: "Jaisalmer", primaryMetric: "ROI 18x", secondaryMetric: "Direct Rev +350%", platform: "web", tags: ["Luxury", "Desert Fortress"], duration: "Ongoing", summary: "Ultra-luxury desert fortress hotel portal.", image: "/images/suryagarh.webp", link: "https://www.suryagarhcollection.com/" },
      { id: "ahilyafort", title: "Ahilya Fort", category: "Hospitality", location: "Madhya Pradesh", primaryMetric: "+240% Bookings", secondaryMetric: "ROI 12x", platform: "web", tags: ["Fort", "Heritage"], duration: "Ongoing", summary: "Historic fort hotel on Narmada river site.", image: "/images/ahilyafort.webp", link: "https://ahilyafort.com/" },
      { id: "eliteexped", title: "Elite Exped", category: "Hospitality", location: "Global", primaryMetric: "ROI 10x", secondaryMetric: "Global Bookings", platform: "web", tags: ["Expedition", "Adventure"], duration: "Scale", summary: "World-class mountaineering & expedition site.", image: "/images/eliteexped.webp", link: "https://www.eliteexped.com/" },
      { id: "skydivedubai", title: "Skydive Dubai", category: "Hospitality", location: "Dubai", primaryMetric: "1M+ Visitors", secondaryMetric: "ROI 15x", platform: "web", tags: ["Adventure", "Tourism"], duration: "Ongoing", summary: "Global premier extreme sports experience site.", image: "/images/skydivedubai.webp", link: "https://www.skydivedubai.ae/" },

      // 2. Healthcare
      { id: "amahahealth", title: "Amaha Health", category: "Healthcare", location: "India", primaryMetric: "+350% Users", secondaryMetric: "ROI 12x", platform: "web", tags: ["Mental Health", "Care"], duration: "Scale", summary: "Mental health ecosystem and tele-consultation platform.", image: "/images/amahahealth.webp", link: "https://amahahealth.com/" },
      { id: "whatsupwellness-hc", title: "What's Up Wellness", category: "Healthcare", location: "India", primaryMetric: "₹1.5 Cr Monthly", secondaryMetric: "ROI 8x", platform: "web", tags: ["Nutraceuticals", "Health"], duration: "Ongoing", summary: "Wellness gummies & health supplement storefront.", image: "/images/whatsupwellness.webp", link: "https://whatsupwellness.in/" },
      { id: "qonaqhealth", title: "Qonaq Health", category: "Healthcare", location: "India", primaryMetric: "+210% Leads", secondaryMetric: "CPL -40%", platform: "web", tags: ["Diagnostics", "Clinics"], duration: "Full Launch", summary: "Digital diagnostic clinic network site.", image: "/images/qonaqhealth.webp", link: "https://qonaqhealth.com/" },
      { id: "motherhoodcare", title: "Motherhood Care", category: "Healthcare", location: "India", primaryMetric: "₹2.8 Cr Revenue", secondaryMetric: "ROI 11x", platform: "web", tags: ["Maternity", "Hospitals"], duration: "Ongoing", summary: "Premier women & child hospital chain site.", image: "/images/motherhoodcare.webp", link: "https://motherhoodcare.com/" },
      { id: "calmwave", title: "Calmwave", category: "Healthcare", location: "USA", primaryMetric: "+190% Conversions", secondaryMetric: "ROI 9x", platform: "web", tags: ["AI", "ICU Care"], duration: "Scale", summary: "AI-driven hospital ICU alarm intelligence site.", image: "/images/calmwave.webp", link: "https://calmwave.com/" },
      { id: "superpower", title: "Superpower", category: "Healthcare", location: "USA", primaryMetric: "+400% Waitlist", secondaryMetric: "Viral Launch", platform: "web", tags: ["Preventative", "Longevity"], duration: "Sprint", summary: "Next-gen healthcare longevity testing platform.", image: "/images/superpower.webp", link: "https://superpower.com/" },
      { id: "citizenhealth", title: "Citizen Health", category: "Healthcare", location: "USA", primaryMetric: "+280% Signups", secondaryMetric: "ROI 10x", platform: "web", tags: ["Rare Disease", "Data"], duration: "Ongoing", summary: "Patient-powered rare disease research platform.", image: "/images/citizenhealth.webp", link: "https://citizenhealth.com/" },
      { id: "foundationhealth", title: "Foundation Health", category: "Healthcare", location: "USA", primaryMetric: "ROI 8.5x", secondaryMetric: "B2B Deals", platform: "web", tags: ["Digital Health", "API"], duration: "Scale", summary: "API-first healthcare developer infrastructure.", image: "/images/foundationhealth.webp", link: "https://foundationhealth.com/" },
      { id: "develophealthai", title: "Develop Health AI", category: "Healthcare", location: "USA", primaryMetric: "+310% Enquiries", secondaryMetric: "ROI 12x", platform: "web", tags: ["AI", "HealthTech"], duration: "Sprint", summary: "AI automation for healthcare provider workflows.", image: "/images/develophealthai.webp", link: "https://develophealth.ai/" },
      { id: "caryhealth", title: "Cary Health", category: "Healthcare", location: "USA", primaryMetric: "+220% Users", secondaryMetric: "ROI 7.5x", platform: "web", tags: ["Pharmacy", "AI"], duration: "Scale", summary: "AI pharmacy & medication optimization platform.", image: "/images/caryhealth.webp", link: "https://cary.health/" },
      { id: "wellsync", title: "Wellsync", category: "Healthcare", location: "USA", primaryMetric: "ROI 10x", secondaryMetric: "Scale +250%", platform: "web", tags: ["Telehealth", "API"], duration: "Ongoing", summary: "Embedded telehealth solution infrastructure.", image: "/images/wellsync.webp", link: "https://wellsync.com/" },
      { id: "houserx", title: "House RX", category: "Healthcare", location: "USA", primaryMetric: "ROI 11.5x", secondaryMetric: "$25M Meds Managed", platform: "web", tags: ["Specialty Care", "Pharma"], duration: "Scale", summary: "Specialty pharmacy integration platform for clinics.", image: "/images/houserx.webp", link: "https://houserx.com/" },
      { id: "truepill", title: "Truepill", category: "Healthcare", location: "USA", primaryMetric: "5M+ Prescriptions", secondaryMetric: "Unicorn Scale", platform: "web", tags: ["Digital Pharmacy", "B2B"], duration: "Ongoing", summary: "Digital pharmacy infrastructure for healthcare brands.", image: "/images/truepill.webp", link: "https://truepill.com/" },
      { id: "videaai", title: "Videa AI", category: "Healthcare", location: "USA", primaryMetric: "+380% Dental Clinics", secondaryMetric: "FDA Cleared AI", platform: "web", tags: ["Dental AI", "Radiology"], duration: "Ongoing", summary: "Dental AI diagnostics & X-ray intelligence portal.", image: "/images/videaai.webp", link: "https://videa.ai/" },
      { id: "mrbur", title: "Mr Bur", category: "Healthcare", location: "Global", primaryMetric: "+175% B2B Sales", secondaryMetric: "ROI 6.5x", platform: "web", tags: ["Dental Equipment", "Ecom"], duration: "Scale", summary: "Specialized dental instrument ecommerce site.", image: "/images/mrbur.webp", link: "https://mrbur.com/" },
      { id: "denta", title: "Denta", category: "Healthcare", location: "Global", primaryMetric: "+230% Appointments", secondaryMetric: "CPL -35%", platform: "web", tags: ["Dental", "SaaS"], duration: "Sprint", summary: "Modern dental practice management platform.", image: "/images/denta.webp", link: "https://denta.com/" },
      { id: "bitelabs", title: "Bite Labs", category: "Healthcare", location: "Global", primaryMetric: "ROI 9x", secondaryMetric: "CTR +95%", platform: "web", tags: ["Oral Care", "BioTech"], duration: "Full Launch", summary: "Next-generation oral health biotechnology site.", image: "/images/bitelabs.webp", link: "https://bitelabs.io/" },
      { id: "augmedit", title: "Augmedit", category: "Healthcare", location: "EU", primaryMetric: "ROI 14x", secondaryMetric: "3D AR Surgical", platform: "web", tags: ["AR", "Surgical AI"], duration: "Ongoing", summary: "Medical AR 3D surgical preparation software.", image: "/images/augmedit.webp", link: "https://augmedit.com/" },
      { id: "sonendo", title: "Sonendo", category: "Healthcare", location: "USA", primaryMetric: "1M+ Patients Treated", secondaryMetric: "NASDAQ Listed", platform: "web", tags: ["Endodontics", "MedTech"], duration: "Ongoing", summary: "GentleWave dental technology corporate portal.", image: "/images/sonendo.webp", link: "https://sonendo.com/" },

      // 3. SaaS
      { id: "topmate", title: "Topmate", category: "SaaS", location: "Global", primaryMetric: "100K+ Creators", secondaryMetric: "ROI 15x", platform: "web", tags: ["Creator Economy", "Monetization"], duration: "Ongoing", summary: "Personal branding & advisory booking platform.", image: "/images/topmate.webp", link: "https://topmate.io/" },
      { id: "bitespeed-saas", title: "Bitespeed", category: "SaaS", location: "India", primaryMetric: "2000+ Shopify Brands", secondaryMetric: "ROI 12x", platform: "web", tags: ["WhatsApp Marketing", "Shopify"], duration: "Scale", summary: "Conversational commerce platform for ecommerce.", image: "/images/bitespeed.webp", link: "https://bitespeed.co/" },
      { id: "murfai", title: "Murf AI", category: "SaaS", location: "Global", primaryMetric: "1M+ Creators", secondaryMetric: "ROI 18x", platform: "web", tags: ["AI Voice", "Text to Speech"], duration: "Ongoing", summary: "AI voice generator & audio creation platform.", image: "/images/murfai.webp", link: "https://murf.ai/" },
      { id: "zluri", title: "Zluri", category: "SaaS", location: "Global", primaryMetric: "$20M ARR Scale", secondaryMetric: "ROI 14x", platform: "web", tags: ["SaaS Ops", "IT Automation"], duration: "Ongoing", summary: "SaaS management & identity governance platform.", image: "/images/zluri.webp", link: "https://zluri.com/" },
      { id: "dovetail", title: "Dovetail", category: "SaaS", location: "Global", primaryMetric: "500K+ Researchers", secondaryMetric: "ROI 16x", platform: "web", tags: ["User Research", "Customer Insights"], duration: "Ongoing", summary: "Customer insights & research analysis platform.", image: "/images/dovetail.webp", link: "https://dovetailapp.com/" },
      { id: "clueso", title: "Clueso", category: "SaaS", location: "Global", primaryMetric: "+400% Video Creation", secondaryMetric: "ROI 11x", platform: "web", tags: ["Product Documentation", "AI Video"], duration: "Scale", summary: "AI-powered product video & documentation tool.", image: "/images/clueso.webp", link: "https://clueso.io/" },
      { id: "herondata", title: "Heron Data", category: "SaaS", location: "Global", primaryMetric: "ROI 10x", secondaryMetric: "Fintech Data API", platform: "web", tags: ["Bank Data", "ML Classifier"], duration: "Full Launch", summary: "Bank transaction categorization API for fintechs.", image: "/images/herondata.webp", link: "https://herondata.io/" },
      { id: "candoriq", title: "Candoriq", category: "SaaS", location: "USA", primaryMetric: "+280% Demo Requests", secondaryMetric: "ROI 9x", platform: "web", tags: ["Sales Enablement", "Interactive Demo"], duration: "Sprint", summary: "Interactive product demo platform for B2B SaaS.", image: "/images/candoriq.webp", link: "https://candoriq.com/" },
      { id: "sierraai", title: "Sierra AI", category: "SaaS", location: "USA", primaryMetric: "$110M Funding", secondaryMetric: "Enterprise AI", platform: "web", tags: ["Conversational AI", "Customer Experience"], duration: "Ongoing", summary: "Enterprise AI agent platform for customer service.", image: "/images/sierraai.webp", link: "https://sierra.ai/" },
      { id: "graasai", title: "Graas AI", category: "SaaS", location: "Global", primaryMetric: "ROI 12.5x", secondaryMetric: "Growth Engine", platform: "web", tags: ["Ecom AI", "Analytics"], duration: "Scale", summary: "Growth-as-a-service AI analytics for ecommerce.", image: "/images/graasai.webp", link: "https://graas.ai/" },
      { id: "shopdeck", title: "Shopdeck", category: "SaaS", location: "India", primaryMetric: "5000+ Stores", secondaryMetric: "ROI 10x", platform: "web", tags: ["Ecom Infrastructure", "D2C"], duration: "Scale", summary: "Complete ecommerce storefront & order logistics SaaS.", image: "/images/shopdeck.webp", link: "https://shopdeck.com/" },
      { id: "rutter", title: "Rutter", category: "SaaS", location: "USA", primaryMetric: "Universal Commerce API", secondaryMetric: "Y Combinator", platform: "web", tags: ["API", "Integration"], duration: "Ongoing", summary: "Universal API for e-commerce, accounting & payment data.", image: "/images/rutter.webp", link: "https://rutter.com/" },
      { id: "disco", title: "Disco", category: "SaaS", location: "Global", primaryMetric: "ROI 11x", secondaryMetric: "Media Asset Mgmt", platform: "web", tags: ["Music Tech", "Asset Manager"], duration: "Ongoing", summary: "Music & media asset management for entertainment industry.", image: "/images/disco.webp", link: "https://disco.ac/" },

      // 4. Ecommerce
      { id: "brownliving", title: "Brown Living", category: "Ecommerce", location: "India", primaryMetric: "₹2.5 Cr GMV", secondaryMetric: "ROI 9.5x", platform: "web", tags: ["Sustainable", "Zero Waste"], duration: "Ongoing", summary: "India's first plastic-free sustainable marketplace.", image: "/images/brownliving.webp", link: "https://brownliving.in" },
      { id: "koparoclean", title: "Koparo Clean", category: "Ecommerce", location: "India", primaryMetric: "₹1.8 Cr Monthly", secondaryMetric: "ROI 8.5x", platform: "web", tags: ["Eco-Friendly", "Home Care"], duration: "Scale", summary: "Plant-based home cleaning & wellness products.", image: "/images/koparoclean.webp", link: "https://koparoclean.com" },
      { id: "k9jets", title: "K9 JETS", category: "Ecommerce", location: "Global", primaryMetric: "$12M Ticket Sales", secondaryMetric: "ROI 15x", platform: "web", tags: ["Pet Travel", "Private Jet"], duration: "Scale", summary: "Pay-per-seat pet-friendly private jet charter portal.", image: "/images/k9jets.webp", link: "https://k9jets.com" },
      { id: "perfectted", title: "PerfectTED", category: "Ecommerce", location: "UK", primaryMetric: "+400% Sales Lift", secondaryMetric: "Dragons' Den Winner", platform: "web", tags: ["Matcha", "Energy Drink"], duration: "Scale", summary: "Organic matcha energy drink D2C storefront.", image: "/images/perfectted.webp", link: "https://perfectted.com" },
      { id: "foodcourt", title: "Foodcourt", category: "Ecommerce", location: "Global", primaryMetric: "100K+ Orders", secondaryMetric: "ROI 10x", platform: "web", tags: ["Food Delivery", "Quick Commerce"], duration: "Scale", summary: "Multi-restaurant virtual food hall & ordering app.", image: "/images/foodcourt.webp", link: "https://foodcourt.com" },
      { id: "gohighlevel", title: "GoHighLevel Store", category: "Ecommerce", location: "USA", primaryMetric: "500K+ Agencies", secondaryMetric: "Unicorn Scale", platform: "web", tags: ["Agency SaaS", "Ecom Hub"], duration: "Ongoing", summary: "All-in-one marketing & CRM platform portal.", image: "/images/gohighlevel.webp", link: "https://gohighlevel.com" },
      { id: "cococart", title: "Cococart", category: "Ecommerce", location: "Global", primaryMetric: "1M+ Stores Created", secondaryMetric: "ROI 14x", platform: "web", tags: ["No-Code Ecom", "Instant Shop"], duration: "Ongoing", summary: "No-code instant online store builder for SMBs.", image: "/images/cococart.webp", link: "https://cococart.com" },
      { id: "artebella-ecom", title: "Artebella", category: "Ecommerce", location: "India", primaryMetric: "₹18 L Orders", secondaryMetric: "ROI 15x", platform: "web", tags: ["Art", "Decor"], duration: "Full Cycle", summary: "Premium art and home decor boutique storefront.", image: "/images/artebella.webp", link: "https://artebella.in/" },
      { id: "bellalash-ecom", title: "Bella Lash", category: "Ecommerce", location: "USA", primaryMetric: "2.5M Views", secondaryMetric: "+300% Rev", platform: "web", tags: ["Beauty", "Global"], duration: "Ongoing", summary: "Lash artist supply and global training platform.", image: "/images/bellalash.webp", link: "https://bellalash.com/" },
      { id: "britishdarts-ecom", title: "British Darts", category: "Ecommerce", location: "USA", primaryMetric: "ROI 8.5x", secondaryMetric: "Orders +210%", platform: "web", tags: ["Sports", "Equip"], duration: "Scale", summary: "Heritage sports equipment e-commerce storefront.", image: "/images/britishdarts.webp", link: "https://britishdarts.com/" },
      { id: "gatodates-ecom", title: "Gatodates", category: "Ecommerce", location: "India", primaryMetric: "+150% Orders", secondaryMetric: "CTR +95%", platform: "web", tags: ["Food", "Healthy"], duration: "Full Launch", summary: "Direct sales platform for premium healthy dates.", image: "/images/gatodates.webp", link: "https://gatodates.com/" },
      { id: "anatomy-ecom", title: "Anatomy Fitness", category: "Ecommerce", location: "USA", primaryMetric: "₹35 L Rev", secondaryMetric: "+175% Sales", platform: "web", tags: ["Fitness", "App"], duration: "Scale", summary: "Direct-to-consumer fitness apparel and app site.", image: "/images/anatomyfitness.webp", link: "https://anatomyfitness.co/" },

      // 5. Real Estate
      { id: "thesettl", title: "The Settl", category: "Real Estate", location: "India", primaryMetric: "4000+ Beds Occupied", secondaryMetric: "ROI 12x", platform: "web", tags: ["Co-Living", "PropTech"], duration: "Scale", summary: "Premium co-living & managed rental apartment platform.", image: "/images/thesettl.webp", link: "https://thesettl.com" },
      { id: "housr", title: "Housr", category: "Real Estate", location: "India", primaryMetric: "₹50 Cr Valuation", secondaryMetric: "ROI 14x", platform: "web", tags: ["Luxury Co-Living", "Apartments"], duration: "Ongoing", summary: "Luxury co-living & serviced apartment booking portal.", image: "/images/housr.webp", link: "https://housr.in" },
      { id: "blox", title: "Blox", category: "Real Estate", location: "India", primaryMetric: "$12M Funding", secondaryMetric: "ROI 10x", platform: "web", tags: ["Home Buying", "AI PropTech"], duration: "Scale", summary: "AI-driven home buying & property discovery platform.", image: "/images/blox.webp", link: "https://blox.xyz" },
      { id: "realtylabs", title: "Realty Labs", category: "Real Estate", location: "Canada", primaryMetric: "+310% Enquiries", secondaryMetric: "ROI 9x", platform: "web", tags: ["Real Estate Tech", "Canada"], duration: "Scale", summary: "Canadian real estate software and lead engine.", image: "/images/realtylabs.webp", link: "https://realtylabs.ca" },
      { id: "magicdoor", title: "Magic Door", category: "Real Estate", location: "USA", primaryMetric: "ROI 8.5x", secondaryMetric: "Leads +220%", platform: "web", tags: ["Rental Mgmt", "Property"], duration: "Full Launch", summary: "Smart property management & tenant portal.", image: "/images/magicdoor.webp", link: "https://magicdoor.com" },
      { id: "agorareal", title: "Agora Real Estate", category: "Real Estate", location: "USA", primaryMetric: "+190% Inquiries", secondaryMetric: "ROI 7.5x", platform: "web", tags: ["Commercial", "Brokerage"], duration: "Sprint", summary: "Commercial real estate advisory digital portal.", image: "/images/agorareal.webp", link: "https://agorareal.com" },
      { id: "bilt", title: "Bilt Rewards", category: "Real Estate", location: "USA", primaryMetric: "Unicorn Scale", secondaryMetric: "$3.1B Valuation", platform: "web", tags: ["Rent Rewards", "PropTech Fintech"], duration: "Ongoing", summary: "Rent payment rewards & real estate loyalty platform.", image: "/images/bilt.webp", link: "https://bilt.com" },
      { id: "inspectify", title: "Inspectify", category: "Real Estate", location: "USA", primaryMetric: "100K+ Inspections", secondaryMetric: "ROI 11x", platform: "web", tags: ["Home Inspection", "API"], duration: "Ongoing", summary: "Property inspection platform for lenders & buyers.", image: "/images/inspectify.webp", link: "https://inspectify.com" },

      // 6. Education
      { id: "criodo", title: "Crio.do", category: "Education", location: "India", primaryMetric: "50K+ Learners", secondaryMetric: "ROI 14x", platform: "web", tags: ["Developer Upskilling", "EdTech"], duration: "Ongoing", summary: "Project-based developer learning & career platform.", image: "/images/criodo.webp", link: "https://crio.do" },
      { id: "the10xacademy", title: "The 10x Academy", category: "Education", location: "India", primaryMetric: "93% Placement", secondaryMetric: "ROI 12x", platform: "web", tags: ["Coding Bootcamp", "Placements"], duration: "Scale", summary: "Full-stack developer bootcamp & placement platform.", image: "/images/the10xacademy.webp", link: "https://www.the10xacademy.com/" },
      { id: "synthesis", title: "Synthesis", category: "Education", location: "USA", primaryMetric: "$12M Seed", secondaryMetric: "SpaceX Origin", platform: "web", tags: ["Child Education", "Problem Solving"], duration: "Ongoing", summary: "Gamified problem-solving school for young innovators.", image: "/images/synthesis.webp", link: "https://synthesis.is" },
      { id: "speak", title: "Speak AI", category: "Education", location: "Global", primaryMetric: "5M+ Downloads", secondaryMetric: "ROI 16x", platform: "web", tags: ["AI Language", "App"], duration: "Ongoing", summary: "AI-powered English tutor & spoken language app portal.", image: "/images/speak.webp", link: "https://speak.com" },
      { id: "dreambox", title: "DreamBox Learning", category: "Education", location: "USA", primaryMetric: "6M+ Students", secondaryMetric: "K-12 Math Leader", platform: "web", tags: ["Adaptive Math", "K-12 EdTech"], duration: "Ongoing", summary: "Adaptive learning math & reading platform for schools.", image: "/images/dreambox.webp", link: "https://dreambox.com" },
      { id: "knewton", title: "Knewton", category: "Education", location: "USA", primaryMetric: "15M+ Students Served", secondaryMetric: "Acquired Wiley", platform: "web", tags: ["Adaptive Learning", "EdTech API"], duration: "Ongoing", summary: "Adaptive learning engine for higher education courseware.", image: "/images/knewton.webp", link: "https://knewton.com" },
      { id: "liulishuo", title: "LAIX / Liulishuo", category: "Education", location: "Global", primaryMetric: "100M+ Users", secondaryMetric: "NYSE Listed", platform: "web", tags: ["AI English", "Global EdTech"], duration: "Ongoing", summary: "AI-driven English learning & voice evaluation platform.", image: "/images/liulishuo.webp", link: "https://liulishuo.com" },
      { id: "getsetup", title: "GetSetup", category: "Education", location: "Global", primaryMetric: "4M+ Senior Learners", secondaryMetric: "ROI 11x", platform: "web", tags: ["Active Aging", "Lifelong Learning"], duration: "Ongoing", summary: "Peer-to-peer learning community for active adults.", image: "/images/getsetup.webp", link: "https://getsetup.com" },

      // 7. Manufacturing & Hardware
      { id: "sundaydesign", title: "Sunday Design", category: "Manufacturing", location: "India", primaryMetric: "₹15 Cr Annual", secondaryMetric: "ROI 9.5x", platform: "web", tags: ["Italian Furniture", "Interior"], duration: "Scale", summary: "Luxury Italian furniture manufacturing D2C brand.", image: "/images/sundaydesign.webp", link: "https://sundaydesign.co.in/" },
      { id: "beco", title: "Beco", category: "Manufacturing", location: "India", primaryMetric: "₹3 Cr Monthly", secondaryMetric: "ROI 10x", platform: "web", tags: ["Eco Manufacturing", "D2C"], duration: "Ongoing", summary: "100% eco-friendly bamboo tissue & home product brand.", image: "/images/beco.webp", link: "https://beco.co.in" },
      { id: "oorjaa", title: "Oorjaa", category: "Manufacturing", location: "India", primaryMetric: "+180% Enquiries", secondaryMetric: "ROI 7.5x", platform: "web", tags: ["Handmade Lighting", "Sustainable"], duration: "Full Launch", summary: "Handcrafted sustainable architectural lighting manufacturer.", image: "/images/oorjaa.webp", link: "https://oorjaa.in" },
      { id: "sabaidesign", title: "Sabai Design", category: "Manufacturing", location: "USA", primaryMetric: "+310% Online Sales", secondaryMetric: "B-Corp Certified", platform: "web", tags: ["Sustainable Furniture", "US Mfg"], duration: "Scale", summary: "Sustainable & recycled modular furniture manufacturer.", image: "/images/sabaidesign.webp", link: "https://sabaidesign.com" },
      { id: "fernish", title: "Fernish", category: "Manufacturing", location: "USA", primaryMetric: "$45M Series A", secondaryMetric: "ROI 12x", platform: "web", tags: ["Furniture Rental", "Circular Ecom"], duration: "Ongoing", summary: "Circular home furniture manufacturing & rental service.", image: "/images/fernish.webp", link: "https://fernish.com" },
      { id: "eva", title: "Eva Mattress", category: "Manufacturing", location: "Australia", primaryMetric: "+260% Sales Lift", secondaryMetric: "ROI 11x", platform: "web", tags: ["Sleep Tech", "Bedding Mfg"], duration: "Scale", summary: "Award-winning Australian mattress & bedroom furniture.", image: "/images/eva.webp", link: "https://eva.com.au" },
      { id: "furnishka", title: "Furnishka", category: "Manufacturing", location: "India", primaryMetric: "₹2 Cr Monthly", secondaryMetric: "ROI 9x", platform: "web", tags: ["Solid Wood", "Furniture"], duration: "Scale", summary: "Solid wood furniture manufacturing & retail storefront.", image: "/images/furnishka.webp", link: "https://furnishka.com" },
      { id: "honbaymall", title: "Honbay Mall", category: "Manufacturing", location: "Global", primaryMetric: "100K+ Sofas Sold", secondaryMetric: "Amazon Leader", platform: "web", tags: ["Modular Sofa", "Mfg Direct"], duration: "Ongoing", summary: "Direct-from-factory modular sofa & sectional manufacturer.", image: "/images/honbaymall.webp", link: "https://honbaymall.com" },
      { id: "vaaree", title: "Vaaree", category: "Manufacturing", location: "India", primaryMetric: "₹4 Cr Monthly", secondaryMetric: "ROI 12x", platform: "web", tags: ["Home Furnishing", "Factory Direct"], duration: "Scale", summary: "Factory-direct curated home decor & bed linen marketplace.", image: "/images/vaaree.webp", link: "https://vaaree.com" },
      { id: "underdog", title: "Underdog Shop", category: "Manufacturing", location: "India", primaryMetric: "+190% Orders", secondaryMetric: "ROI 8x", platform: "web", tags: ["Apparel Mfg", "Streetwear"], duration: "Sprint", summary: "Custom apparel manufacturing & urban streetwear brand.", image: "/images/underdog.webp", link: "https://underdog.shop" },
      { id: "cleanfoodgroup", title: "Clean Food Group", category: "Manufacturing", location: "UK", primaryMetric: "£10M Funding", secondaryMetric: "BioTech Mfg", platform: "web", tags: ["Cellular Agriculture", "Bio-Fats"], duration: "Ongoing", summary: "Bio-tech sustainable palm oil alternative manufacturer.", image: "/images/cleanfoodgroup.webp", link: "https://cleanfood.group/" },
      { id: "bubblepaper", title: "Bubble Paper", category: "Manufacturing", location: "USA", primaryMetric: "+350% B2B Orders", secondaryMetric: "ROI 10x", platform: "web", tags: ["Paper Packaging", "Eco Packaging"], duration: "Scale", summary: "Plastic-free paper bubble wrap packaging manufacturer.", image: "/images/bubblepaper.webp", link: "https://bubblepaper.com" },
      { id: "nucicer", title: "NuCicer", category: "Manufacturing", location: "USA", primaryMetric: "$15M Funding", secondaryMetric: "AgriTech Bio", platform: "web", tags: ["Chickpea Protein", "Food Tech"], duration: "Ongoing", summary: "High-protein chickpea plant protein ingredient maker.", image: "/images/nucicer.webp", link: "https://nucicer.com" },
      { id: "metalchemy", title: "Metalchemy", category: "Manufacturing", location: "UK", primaryMetric: "ROI 9.5x", secondaryMetric: "Nano Packaging", platform: "web", tags: ["Nanotech", "Bio Packaging"], duration: "Sprint", summary: "Nanotechnology antimicrobial bioplastic packaging maker.", image: "/images/metalchemy.webp", link: "https://metalchemy.tech" },
      { id: "bioweg", title: "Bioweg", category: "Manufacturing", location: "Germany", primaryMetric: "€12M Grant & Equity", secondaryMetric: "Circular Bio", platform: "web", tags: ["Bio-Microplastics", "Chemical Mfg"], duration: "Ongoing", summary: "Bio-based microplastic replacement ingredient manufacturer.", image: "/images/bioweg.webp", link: "https://bioweg.com" },
      { id: "actualveggies", title: "Actual Veggies", category: "Manufacturing", location: "USA", primaryMetric: "5,000+ Stores Nationwide", secondaryMetric: "ROI 13x", platform: "web", tags: ["Whole Food", "Burger Mfg"], duration: "Scale", summary: "Chef-crafted whole food veggie burger brand.", image: "/images/actualveggies.webp", link: "https://actualveggies.com" },
      { id: "arcoind", title: "Arco Industries", category: "Manufacturing", location: "Canada", primaryMetric: "50+ Years Mfg", secondaryMetric: "B2B Deals", platform: "web", tags: ["Industrial Gaskets", "Custom Metal"], duration: "Ongoing", summary: "Industrial rubber, gasket & precision metal fabricator.", image: "/images/arcoind.webp", link: "https://www.arcoind.ca" },
      { id: "orangecharger", title: "Orange Charger", category: "Manufacturing", location: "USA", primaryMetric: "10K+ EV Outlets", secondaryMetric: "ROI 11x", platform: "web", tags: ["EV Charger Mfg", "CleanTech"], duration: "Ongoing", summary: "Affordable apartment EV charger hardware manufacturer.", image: "/images/orangecharger.webp", link: "https://orangecharger.com" },
      { id: "wiffyai", title: "Wiffy AI", category: "Manufacturing", location: "Global", primaryMetric: "+220% Leads", secondaryMetric: "ROI 8.5x", platform: "web", tags: ["Smart Hardware", "AI Sensor"], duration: "Full Launch", summary: "Smart IoT sensor hardware & AI environmental monitor.", image: "/images/wiffyai.webp", link: "https://wiffy.ai/" },
      { id: "reflectorbital", title: "Reflect Orbital", category: "Manufacturing", location: "USA", primaryMetric: "$6M Funding", secondaryMetric: "Space Hardware", platform: "web", tags: ["Space Satellite", "Solar Reflection"], duration: "Sprint", summary: "In-space solar reflector satellite hardware manufacturer.", image: "/images/reflectorbital.webp", link: "https://reflectorbital.com" },
      { id: "pikaart", title: "Pika Art", category: "Manufacturing", location: "Global", primaryMetric: "10M+ Video Generation", secondaryMetric: "$55M Funding", platform: "web", tags: ["AI Video", "Creative Platform"], duration: "Ongoing", summary: "Leading AI video generation & creative animation platform.", image: "/images/pikaart.webp", link: "https://pika.art" },
      { id: "atmeto", title: "Atmeto", category: "Manufacturing", location: "Global", primaryMetric: "+180% B2B Inquiries", secondaryMetric: "Precision Metal", platform: "web", tags: ["Industrial Components", "Machining"], duration: "Sprint", summary: "Precision industrial components & CNC machining partner.", image: "/images/atmeto.webp", link: "https://atmeto.com" },
      { id: "apex", title: "Apex Space", category: "Manufacturing", location: "USA", primaryMetric: "$95M Series B", secondaryMetric: "Space Satellite Mfg", platform: "web", tags: ["Satellite Bus", "Spacecraft Mfg"], duration: "Ongoing", summary: "Standardized satellite bus & spacecraft bus manufacturer.", image: "/images/apex.webp", link: "https://apex.com" },

      // 8. Wellness
      { id: "nirvasa", title: "Nirvasa", category: "Wellness", location: "India", primaryMetric: "1M+ Tele-consults", secondaryMetric: "ROI 14x", platform: "web", tags: ["Digital Health", "Telemedicine"], duration: "Ongoing", summary: "Personalized digital healthcare & customized therapy portal.", image: "/images/nirvasa.webp", link: "https://www.nirvasa.com/" },
      { id: "ayurvedaexperience", title: "The Ayurveda Experience", category: "Wellness", location: "Global", primaryMetric: "1M+ Customers Worldwide", secondaryMetric: "ROI 16x", platform: "web", tags: ["Ayurveda", "Global Skincare"], duration: "Ongoing", summary: "Global authentic Ayurvedic beauty & wellness storefront.", image: "/images/ayurvedaexperience.webp", link: "https://www.theayurvedaexperience.com/" },
      { id: "forestessentials", title: "Forest Essentials", category: "Wellness", location: "India", primaryMetric: "₹500 Cr Brand", secondaryMetric: "Luxury Ayurvedic", platform: "web", tags: ["Lux Beauty", "Ayurvedic Skincare"], duration: "Ongoing", summary: "India's premier luxury Ayurvedic skincare & beauty flagship.", image: "/images/forestessentials.webp", link: "https://www.forestessentialsindia.com/" },
      { id: "kamaayurveda", title: "Kama Ayurveda", category: "Wellness", location: "India", primaryMetric: "100+ Global Outlets", secondaryMetric: "Puig Partnership", platform: "web", tags: ["Pure Ayurveda", "Wellness D2C"], duration: "Ongoing", summary: "Pure traditional Ayurvedic beauty & clinical treatment site.", image: "/images/kamaayurveda.webp", link: "https://www.kamaayurveda.com/" },
      { id: "kapiva", title: "Kapiva Ayurveda", category: "Wellness", location: "India", primaryMetric: "₹200 Cr ARR", secondaryMetric: "ROI 12x", platform: "web", tags: ["Modern Ayurveda", "Health Drinks"], duration: "Ongoing", summary: "Modern Ayurvedic nutrition, juices & Shilajit supplements.", image: "/images/kapiva.webp", link: "https://www.kapiva.in/" },
      { id: "oziva", title: "OZiva", category: "Wellness", location: "India", primaryMetric: "Acquired by HUL", secondaryMetric: "Clean Nutrition", platform: "web", tags: ["Plant Protein", "Clean Nutrition"], duration: "Ongoing", summary: "India's leading plant-based clean nutrition brand.", image: "/images/oziva.webp", link: "https://www.oziva.in/" },
      { id: "fastandup", title: "Fast&Up", category: "Wellness", location: "India", primaryMetric: "10M+ Tubes Sold", secondaryMetric: "Effervescent Leader", platform: "web", tags: ["Sports Nutrition", "Effervescent"], duration: "Ongoing", summary: "Active sports nutrition & effervescent vitamin storefront.", image: "/images/fastandup.webp", link: "https://www.fastandup.in/" },
      { id: "himalayawellness", title: "Himalaya Wellness", category: "Wellness", location: "Global", primaryMetric: "100+ Countries", secondaryMetric: "90 Year Heritage", platform: "web", tags: ["Herbal Care", "Global Brand"], duration: "Ongoing", summary: "Global herbal healthcare & personal care wellness portal.", image: "/images/himalayawellness.webp", link: "https://www.himalayawellness.in/" },
      { id: "healthkart", title: "HealthKart", category: "Wellness", location: "India", primaryMetric: "$200M+ Revenue", secondaryMetric: "Market Leader", platform: "web", tags: ["Fitness Ecom", "HK Vitals"], duration: "Ongoing", summary: "India's premier health & fitness nutrition marketplace.", image: "/images/healthkart.webp", link: "https://www.healthkart.com/" },
      { id: "nyumi", title: "Nyumi", category: "Wellness", location: "India", primaryMetric: "+220% Sales Lift", secondaryMetric: "ROI 8x", platform: "web", tags: ["Gummy Vitamins", "Women Health"], duration: "Scale", summary: "Scientifically formulated health gummies for women.", image: "/images/nyumi.webp", link: "https://www.nyumi.com/" },
      { id: "plumgoodness", title: "Plum Goodness", category: "Wellness", location: "India", primaryMetric: "₹300 Cr Brand", secondaryMetric: "100% Vegan", platform: "web", tags: ["Vegan Beauty", "Clean Care"], duration: "Ongoing", summary: "India's first 100% vegan beauty & personal care brand.", image: "/images/plumgoodness.webp", link: "https://www.plumgoodness.com/" },
      { id: "whatsupwellness-well", title: "What's Up Wellness", category: "Wellness", location: "India", primaryMetric: "Shark Tank Funded", secondaryMetric: "ROI 10x", platform: "web", tags: ["Wellness Gummies", "D2C"], duration: "Ongoing", summary: "Nutrition gummies & daily wellness D2C storefront.", image: "/images/whatsupwellness.webp", link: "https://www.whatsupwellness.in/" },

      // 9. FinTech
      { id: "credfino", title: "Credfino", category: "FinTech", location: "USA", primaryMetric: "$50M+ Loans Processed", secondaryMetric: "ROI 12x", platform: "web", tags: ["Mortgage Tech", "US Finance"], duration: "Ongoing", summary: "Automated mortgage processing & fintech platform.", image: "/images/credfino.webp", link: "https://credfino.com/" },
      { id: "fisdom", title: "Fisdom", category: "FinTech", location: "India", primaryMetric: "5M+ Investors", secondaryMetric: "ROI 15x", platform: "web", tags: ["WealthTech", "Mutual Funds"], duration: "Ongoing", summary: "Digital wealth management & mutual fund investment app.", image: "/images/fisdom.webp", link: "https://www.fisdom.com/" },
      { id: "finarkein", title: "Finarkein", category: "FinTech", location: "India", primaryMetric: "AA Ecosystem Leader", secondaryMetric: "$4.7M Series A", platform: "web", tags: ["Account Aggregator", "Open Finance"], duration: "Scale", summary: "Data orchestration platform on Account Aggregator framework.", image: "/images/finarkein.webp", link: "https://finarkein.com/" },
      { id: "mymudra", title: "MyMudra", category: "FinTech", location: "India", primaryMetric: "NSE Emerge Listed", secondaryMetric: "ROI 11x", platform: "web", tags: ["Loan Marketplace", "Fintech"], duration: "Ongoing", summary: "Digital credit distribution & business loan marketplace.", image: "/images/mymudra.webp", link: "https://www.mymudra.com/" },
      { id: "loanframe", title: "Loan Frame", category: "FinTech", location: "India", primaryMetric: "₹2000 Cr Disbursed", secondaryMetric: "Supply Chain Finance", platform: "web", tags: ["MSME Loans", "B2B Credit"], duration: "Ongoing", summary: "Digital supply chain finance engine for MSMEs.", image: "/images/loanframe.webp", link: "https://www.loanframe.com/" },
      { id: "credmudra", title: "Credmudra", category: "FinTech", location: "India", primaryMetric: "1M+ Loan Applicants", secondaryMetric: "ROI 10x", platform: "web", tags: ["Instant Loans", "Personal Credit"], duration: "Ongoing", summary: "AI-matched instant short-term personal loan platform.", image: "/images/credmudra.webp", link: "https://www.credmudra.com/" },
      { id: "rupeek", title: "Rupeek", category: "FinTech", location: "India", primaryMetric: "$1B+ Gold Loans", secondaryMetric: "Sequoia Funded", platform: "web", tags: ["Doorstep Gold Loan", "Asset Tech"], duration: "Ongoing", summary: "India's leading doorstep gold loan digital platform.", image: "/images/rupeek.webp", link: "https://www.rupeek.com/" },
      { id: "finhaat", title: "Finhaat", category: "FinTech", location: "India", primaryMetric: "2M+ Policyholders", secondaryMetric: "InsurTech Leader", platform: "web", tags: ["Emerging InsurTech", "Micro Insurance"], duration: "Scale", summary: "Digital financial product delivery platform for emerging markets.", image: "/images/finhaat.webp", link: "https://www.finhaat.com/" },
      { id: "myshubhlife", title: "MyShubhLife", category: "FinTech", location: "India", primaryMetric: "Acquired by UGRO", secondaryMetric: "Full Stack Credit", platform: "web", tags: ["Embedded Credit", "Blue Collar Credit"], duration: "Ongoing", summary: "Embedded credit platform for next-billion income earners.", image: "/images/myshubhlife.webp", link: "https://www.myshubhlife.com/" },
      { id: "ambak", title: "Ambak", category: "FinTech", location: "India", primaryMetric: "₹500 Cr Disbursed", secondaryMetric: "ROI 9.5x", platform: "web", tags: ["Home Loan Tech", "Fintech Partner"], duration: "Scale", summary: "Technology platform connecting home loan advisors to lenders.", image: "/images/ambak.webp", link: "https://www.ambak.com/" },

      // 10. Retail & Lifestyle
      { id: "bonorganik", title: "Bon Organik", category: "Retail & Lifestyle", location: "India", primaryMetric: "2M+ Families Dressed", secondaryMetric: "ROI 11x", platform: "web", tags: ["Matching Apparel", "Family Fashion"], duration: "Ongoing", summary: "Matching family apparel & kids fashion D2C website.", image: "/images/bonorganik.webp", link: "https://www.bonorganik.in/" },
      { id: "themessycorner", title: "The Messy Corner", category: "Retail & Lifestyle", location: "India", primaryMetric: "₹1.2 Cr Monthly", secondaryMetric: "ROI 9x", platform: "web", tags: ["Personalized Gifts", "Leather Accessories"], duration: "Scale", summary: "Personalized travel accessories & custom lifestyle goods.", image: "/images/themessycorner.webp", link: "https://www.themessycorner.in/" },
      { id: "cavemanorganics", title: "Caveman Organics", category: "Retail & Lifestyle", location: "Global", primaryMetric: "+190% Orders", secondaryMetric: "ROI 8x", platform: "web", tags: ["Organic Grooming", "Men Wellness"], duration: "Sprint", summary: "100% natural organic men's beard care & grooming site.", image: "/images/cavemanorganics.webp", link: "https://www.cavemanorganics.com/" },
      { id: "nativeclanorganics", title: "Native Clan Organics", category: "Retail & Lifestyle", location: "India", primaryMetric: "+175% Sales", secondaryMetric: "ROI 7.5x", platform: "web", tags: ["Cold Pressed Oils", "Organic Food"], duration: "Full Launch", summary: "Pure cold-pressed wood pressed oils & organic pantry.", image: "/images/nativeclanorganics.webp", link: "https://www.nativeclanorganics.com/" },
      { id: "homesake", title: "Homesake", category: "Retail & Lifestyle", location: "India", primaryMetric: "₹2 Cr Sales", secondaryMetric: "ROI 10x", platform: "web", tags: ["Handcrafted Lighting", "Home Decor"], duration: "Ongoing", summary: "Handcrafted artisan lighting & decorative accents storefront.", image: "/images/homesake.webp", link: "https://www.homesake.in/" },
      { id: "copperh2o", title: "Copper H2O", category: "Retail & Lifestyle", location: "USA", primaryMetric: "100K+ Water Bottles", secondaryMetric: "ROI 12x", platform: "web", tags: ["Copper Bottles", "Ayurvedic Lifestyle"], duration: "Scale", summary: "Handmade pure copper water bottle D2C ecommerce site.", image: "/images/copperh2o.webp", link: "https://www.copperh2o.com/" },
      { id: "ragecoffee", title: "Rage Coffee", category: "Retail & Lifestyle", location: "India", primaryMetric: "₹100 Cr Brand", secondaryMetric: "ROI 14x", platform: "web", tags: ["Flavored Coffee", "D2C Leader"], duration: "Ongoing", summary: "Plant-based micro-ground flavored instant coffee brand.", image: "/images/ragecoffee.webp", link: "https://www.ragecoffee.com/" },
      { id: "happilo", title: "Happilo", category: "Retail & Lifestyle", location: "India", primaryMetric: "₹500 Cr Brand", secondaryMetric: "Market Leader", platform: "web", tags: ["Dry Fruits", "Healthy Snacks"], duration: "Ongoing", summary: "India's premier dry fruits, nuts & healthy snack D2C flagship.", image: "/images/happilo.webp", link: "https://www.happilo.com/" },
      { id: "ecokaari", title: "Ecokaari", category: "Retail & Lifestyle", location: "India", primaryMetric: "1M Plastic Bags Upcycled", secondaryMetric: "Social Impact", platform: "web", tags: ["Upcycled Fabric", "Eco Crafts"], duration: "Ongoing", summary: "Upcycled waste plastic handwoven eco-friendly lifestyle goods.", image: "/images/ecokaari.webp", link: "https://www.ecokaari.org/" },
      { id: "ikkai", title: "Ikkai Beauty", category: "Retail & Lifestyle", location: "India", primaryMetric: "+210% Orders", secondaryMetric: "ROI 8.5x", platform: "web", tags: ["Organic Beauty", "Face Masks"], duration: "Scale", summary: "Organic fruit-powered skincare & dessert face mask site.", image: "/images/ikkai.webp", link: "https://www.ikkai.com/" },
      { id: "countrybean-lifestyle", title: "Country Bean", category: "Retail & Lifestyle", location: "India", primaryMetric: "₹50 Cr Brand", secondaryMetric: "ROI 13x", platform: "web", tags: ["Artisanal Coffee", "Cafe at Home"], duration: "Ongoing", summary: "Artisanal instant coffee & cafe-style drink D2C brand.", image: "/images/countrybean.webp", link: "https://www.countrybean.in/" },
      { id: "koparo-lifestyle", title: "Koparo Clean", category: "Retail & Lifestyle", location: "India", primaryMetric: "Shark Tank Brand", secondaryMetric: "ROI 10x", platform: "web", tags: ["Toxin Free", "Clean Living"], duration: "Ongoing", summary: "Toxin-free plant powered home cleaning D2C platform.", image: "/images/koparoclean.webp", link: "https://www.koparoclean.com/" },

      // 11. F&B (Food & Beverage)
      { id: "countrybean-fb", title: "Country Bean", category: "F&B", location: "India", primaryMetric: "1M+ Coffee Lovers", secondaryMetric: "ROI 14x", platform: "web", tags: ["Flavored Coffee", "Instant Brew"], duration: "Ongoing", summary: "Flavored instant coffees & frothers for cafe-at-home experience.", image: "/images/countrybean.webp", link: "https://www.countrybean.in/" },
      { id: "trueelements", title: "True Elements", category: "F&B", location: "India", primaryMetric: "₹100 Cr+ ARR", secondaryMetric: "Clean Label Certified", platform: "web", tags: ["Clean Breakfast", "Oats & Seeds"], duration: "Ongoing", summary: "100% certified clean label breakfast cereals & seeds brand.", image: "/images/trueelements.webp", link: "https://www.true-elements.com/" },
      { id: "slurrpfarm", title: "Slurrp Farm", category: "F&B", location: "India", primaryMetric: "₹150 Cr Brand", secondaryMetric: "Anushka Sharma Backed", platform: "web", tags: ["Millet Kids Food", "Healthy Snacks"], duration: "Ongoing", summary: "Millet-based healthy kids food & breakfast mix brand.", image: "/images/slurrpfarm.webp", link: "https://www.slurrpfarm.com/" },
      { id: "thewholetruth", title: "The Whole Truth", category: "F&B", location: "India", primaryMetric: "₹200 Cr Valuation", secondaryMetric: "100% Transparent", platform: "web", tags: ["No Added Sugar", "Clean Bars"], duration: "Ongoing", summary: "100% clean label protein bars & sugar-free chocolates.", image: "/images/thewholetruth.webp", link: "https://www.thewholetruthfoods.com/" },
      { id: "teaorigin", title: "Tea Origin", category: "F&B", location: "India", primaryMetric: "+180% Orders", secondaryMetric: "ROI 8x", platform: "web", tags: ["Whole Leaf Tea", "Artisanal"], duration: "Full Launch", summary: "Fresh garden-direct whole leaf artisanal teas D2C portal.", image: "/images/teaorigin.webp", link: "https://www.teaorigin.in/" },
      { id: "bluebrew", title: "Blue Brew", category: "F&B", location: "India", primaryMetric: "+210% Subscriptions", secondaryMetric: "ROI 9x", platform: "web", tags: ["Specialty Coffee", "Cold Brew"], duration: "Scale", summary: "Specialty cold brew coffee concentrate & roastery site.", image: "/images/bluebrew.webp", link: "https://www.bluebrew.in/" },
      { id: "tagzfoods", title: "TagZ Foods", category: "F&B", location: "India", primaryMetric: "Shark Tank Winner", secondaryMetric: "50% Less Fat", platform: "web", tags: ["Popped Chips", "GenZ Snacks"], duration: "Ongoing", summary: "Popped potato chips & gourmet dips for active GenZ.", image: "/images/tagzfoods.webp", link: "https://www.tagzfoods.com/" },
      { id: "bevzilla", title: "Bevzilla", category: "F&B", location: "India", primaryMetric: "10M+ Cubes Sold", secondaryMetric: "ROI 11x", platform: "web", tags: ["Coffee Cubes", "Instant Drinks"], duration: "Ongoing", summary: "Date palm jaggery coffee cubes & instant beverage mixes.", image: "/images/bevzilla.webp", link: "https://www.bevzilla.co/" },
      { id: "chaayos", title: "Chaayos", category: "F&B", location: "India", primaryMetric: "200+ Cafes", secondaryMetric: "Tiger Global Funded", platform: "web", tags: ["Custom Chai", "Tea Outlets"], duration: "Ongoing", summary: "India's leading tea cafe chain & packaged chai storefront.", image: "/images/chaayos.webp", link: "https://www.chaayos.com/" },
      { id: "namhyafoods", title: "Namhya Foods", category: "F&B", location: "India", primaryMetric: "Shark Tank Brand", secondaryMetric: "Ayurvedic Teas", platform: "web", tags: ["Ayurvedic Foods", "Health Teas"], duration: "Ongoing", summary: "Ayurvedic health teas, Sattu & diabetic care food portal.", image: "/images/namhyafoods.webp", link: "https://www.namhyafoods.com/" },
    ],
  };
}
