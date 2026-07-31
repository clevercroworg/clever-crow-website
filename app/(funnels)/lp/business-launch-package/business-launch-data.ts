import { CaseStudy, FaqData } from "../website/website-data";

export const launchPackageData = {
  hero: {
    badges: [], // No badges in hero section as requested by user
    title: "Complete Business Launch Package",
    accentTitle: "@ Just ₹19,999 + GST",
    subtitle: "Everything Your Business Needs to Start Getting Customers Online",
    highlights: [
      "Website • Google • Facebook • Instagram • WhatsApp • Ads Setup",
      "One-Time Setup Only — No Compulsory Monthly Contract",
      "100% Client Account Ownership & Assets Included",
      "Fast 7–10 Working Days Delivery Timeline",
    ],
    ctaLabel: "View Package Details",
    ctaHref: "#package-details",
  },
  pricing: {
    preTitle: "COMPLETE ALL-IN-ONE SOLUTION",
    title: "10 Essential Digital Assets Built For Your Business",
    subtitle: "Stop juggling multiple agencies and freelancers. Get your entire digital ecosystem built by one expert team for ₹19,999 + GST.",
    packages: [
      {
        label: "Complete Business Launch Package",
        name: "One-Time Setup",
        oldPrice: "₹48,000+",
        price: "₹19,999",
        description: "Everything your business needs to establish credibility, drive enquiries, and launch online ads seamlessly.",
        featured: true,
        features: [
          "<strong>1. Professional Business Website (Value: ₹12,000)</strong><br/><span class='text-slate-600 text-xs'>Up to 5 pages, custom mobile design, Home, About, Services, Contact, Enquiry form, WhatsApp button, Click-to-call, Google Maps integration & SSL</span>",
          "<strong>2. Domain & Hosting Included Free (Value: ₹5,000)</strong><br/><span class='text-slate-600 text-xs'>1 year .com / .in domain, 1 year website hosting, SSL certificate, basic backup setup & 1 professional email setup</span>",
          "<strong>3. Google Business Profile (Value: ₹3,000)</strong><br/><span class='text-slate-600 text-xs'>Google Search & Maps setup, profile optimisation, working hours, product/service listings, address & photo uploads, verification assistance</span>",
          "<strong>4. Facebook Business Page (Value: ₹3,000)</strong><br/><span class='text-slate-600 text-xs'>Page creation/optimisation, cover banner design, business info, CTA button & 6 branded posts</span>",
          "<strong>5. Instagram Business Profile (Value: ₹3,000)</strong><br/><span class='text-slate-600 text-xs'>Business account setup/optimisation, bio writing, highlight covers & 6 branded posts</span>",
          "<strong>6. 12 Branded Social Media Posts (Value: ₹6,000)</strong><br/><span class='text-slate-600 text-xs'>6 Facebook + 6 Instagram posts with business-focused graphics, captions & hashtags</span>",
          "<strong>7. Google Ads Campaign Setup (Value: ₹5,000)</strong><br/><span class='text-slate-600 text-xs'>Account setup, 1 campaign, keyword research, ad groups, copy & enquiry extensions (ad budget extra)</span>",
          "<strong>8. Meta Ads Campaign Setup (Value: ₹5,000)</strong><br/><span class='text-slate-600 text-xs'>Meta Business Manager setup, FB & IG ads account setup, 1 campaign, lead form & targeting (ad budget extra)</span>",
          "<strong>9. WhatsApp Lead Generation Setup (Value: ₹2,000)</strong><br/><span class='text-slate-600 text-xs'>WhatsApp Business integration, click-to-chat on site, Meta connection & pre-filled messages</span>",
          "<strong>10. Analytics & Lead Tracking (Value: ₹4,000)</strong><br/><span class='text-slate-600 text-xs'>Google Analytics setup, contact form tracking, WhatsApp click tracking, Google Ads conversion & Meta Pixel setup</span>",
        ],
      },
    ],
    quoteText: "Have custom requirements or specific needs?",
    quoteHref: "tel:+919986389444",
  },
  modules: [
    {
      number: "01",
      title: "Professional Business Website",
      value: "₹12,000 Value",
      description: "A fast, mobile-friendly website designed to present your business professionally and generate enquiries.",
      included: [
        "Up to 5 website pages",
        "Custom professional design",
        "Mobile, tablet and desktop responsive",
        "Home page, About Us page, Services/Products page, Contact page",
        "Enquiry form & WhatsApp chat button",
        "Click-to-call button & Google Maps integration",
        "Basic search engine setup & SSL security certificate"
      ]
    },
    {
      number: "02",
      title: "Domain and Hosting Included Free",
      value: "₹5,000 Value",
      description: "Your website will be launched with its own custom domain name and high-speed hosting.",
      included: [
        "One .com or .in domain for one year",
        "Website hosting for one year",
        "SSL certificate & website deployment",
        "Basic backup setup",
        "1 professional business email setup",
        "Domain availability subject to confirmation"
      ]
    },
    {
      number: "03",
      title: "Google Business Profile",
      value: "₹3,000 Value",
      description: "Help local customers discover your business on Google Search and Google Maps.",
      included: [
        "Google Business Profile setup or optimisation",
        "Business name and category setup",
        "Business description, address & service area configuration",
        "Contact details, website linking & working hours",
        "Product or service listings & photo uploads",
        "Verification assistance"
      ]
    },
    {
      number: "04",
      title: "Facebook Business Page",
      value: "₹3,000 Value",
      description: "A professionally configured Facebook page that gives your business a credible online presence.",
      included: [
        "Facebook Business Page creation or optimisation",
        "Profile image setup & cover banner design",
        "Business info, About section & contact details",
        "Website & WhatsApp linking with Call-to-action button",
        "6 professionally designed posts"
      ]
    },
    {
      number: "05",
      title: "Instagram Business Profile",
      value: "₹3,000 Value",
      description: "A professional Instagram presence designed to build trust and showcase your business.",
      included: [
        "Instagram Business Account setup or optimisation",
        "Profile image setup & bio writing/optimisation",
        "Contact buttons & website/WhatsApp linking",
        "Highlight cover design",
        "6 professionally designed posts"
      ]
    },
    {
      number: "06",
      title: "12 Branded Social Media Posts",
      value: "₹6,000 Value",
      description: "Your business receives a ready-to-publish set of high quality branded content.",
      included: [
        "12 professionally designed social media posts",
        "6 Facebook posts + 6 Instagram posts",
        "Business-focused post designs",
        "Promotional & service-related content",
        "Captions for all posts & relevant hashtags"
      ]
    },
    {
      number: "07",
      title: "Google Ads Campaign Setup",
      value: "₹5,000 Value",
      description: "We prepare your business to start receiving enquiries from people searching for your services.",
      included: [
        "Google Ads account setup",
        "1 campaign setup & keyword research",
        "Location targeting & ad group structure",
        "Ad copy setup & call/enquiry extensions",
        "Basic conversion tracking & initial configuration",
        "(Google advertising budget is not included)"
      ]
    },
    {
      number: "08",
      title: "Facebook & Instagram Ads Setup",
      value: "₹5,000 Value",
      description: "We prepare your Meta advertising system to start generating leads through FB and IG.",
      included: [
        "Meta Business Manager setup & FB Ads Account setup",
        "Facebook and Instagram connection",
        "1 campaign setup & audience targeting setup",
        "Location targeting & lead form setup",
        "WhatsApp campaign setup & basic lead tracking",
        "(Meta advertising budget is not included)"
      ]
    },
    {
      number: "09",
      title: "WhatsApp Lead Generation Setup",
      value: "₹2,000 Value",
      description: "Make it easy for prospective customers to enquire directly through WhatsApp.",
      included: [
        "WhatsApp Business integration",
        "WhatsApp button on the website",
        "Click-to-chat setup",
        "Facebook & Instagram WhatsApp connection",
        "Pre-filled enquiry message & lead routing setup"
      ]
    },
    {
      number: "10",
      title: "Analytics & Lead Tracking",
      value: "₹4,000 Value",
      description: "Understand exactly where your website visitors and customer enquiries are coming from.",
      included: [
        "Google Analytics setup",
        "Website visitor tracking",
        "Contact form & WhatsApp click tracking",
        "Phone call click tracking",
        "Google Ads conversion tracking & Meta Pixel setup",
        "Basic performance tracking configuration"
      ]
    }
  ],
  targetAudience: [
    "New Businesses & Startups",
    "Local Businesses",
    "Restaurants & Cafés",
    "Salons & Spas",
    "Clinics & Healthcare",
    "Builders & Real Estate",
    "Retail Stores",
    "Manufacturers",
    "Consultants & Agencies",
    "Professional Service Providers",
    "Small & Medium Enterprises (SMEs)"
  ],
  requirementsNeeded: [
    "Business name and logo",
    "Business contact details (Phone, Email, Address)",
    "List of services or products offered",
    "Brief business description",
    "Photos and videos (if available)",
    "Address and service area locations",
    "Existing social media / Google account access (if created)",
    "Preferred domain name choice"
  ],
  ownershipItems: [
    "Website Code & Content",
    "Domain Name Registration",
    "Website Hosting Account",
    "Google Business Profile",
    "Facebook Business Page",
    "Instagram Business Account",
    "Google Ads Account",
    "Meta Ads Manager Account",
    "Google Analytics Account",
    "Website Enquiries & Lead Data"
  ],
  supportDetails: {
    included: [
      "Account access assistance",
      "Minor setup corrections",
      "Website bug fixes",
      "Tracking verification",
      "Platform connection support",
      "Basic technical guidance"
    ],
    notIncluded: [
      "Google Ads or Meta Ads ad budget",
      "Monthly advertising management",
      "Daily campaign optimisation",
      "Monthly social media management",
      "Video production & professional photography",
      "Advanced SEO & E-commerce payment gateways",
      "Ongoing hosting & domain renewals after Year 1"
    ]
  },
  faqs: [
    {
      question: "Is this a monthly package?",
      answer: "No. This is a one-time setup package for ₹19,999 + GST. There is no compulsory monthly commitment. Ongoing digital marketing management can be added separately based on your requirements."
    },
    {
      question: "Is the website included?",
      answer: "Yes! The package includes a custom-designed, fast, mobile-friendly business website with up to 5 pages (Home, About Us, Services/Products, Contact, Enquiry form, WhatsApp button, Google Maps integration, SSL certificate)."
    },
    {
      question: "Are domain and hosting included?",
      answer: "Yes. One .com or .in domain for one year and website hosting for one year are included free of charge, subject to domain name availability."
    },
    {
      question: "Are social media posts included?",
      answer: "Yes. The package includes 12 professionally designed social media posts (6 for Facebook and 6 for Instagram) with custom graphics, captions, and relevant hashtags."
    },
    {
      question: "Will you run advertisements?",
      answer: "We set up 1 complete Google Ads campaign and 1 complete Meta (Facebook & Instagram) Ads campaign with lead forms, conversion tracking, and extensions ready to launch. Note that the actual advertising budget paid to Google/Meta is not included."
    },
    {
      question: "Who owns the accounts created?",
      answer: "100% Client Ownership. The client retains full ownership of the website, domain, hosting, Google Business Profile, Facebook Page, Instagram Account, Google Ads Account, Meta Ads Account, Google Analytics, and lead data."
    },
    {
      question: "How quickly will the setup be completed?",
      answer: "The complete setup is generally delivered within 7–10 working days after receiving all required business details, logo, content, images, approvals, and account access."
    },
    {
      question: "What support is provided post-launch?",
      answer: "You receive 30 Days of Post-Launch Support including account access assistance, minor setup corrections, website bug fixes, tracking verification, platform connection support, and basic technical guidance."
    }
  ] as FaqData[],
  caseStudies: [
    { 
      id: "bgs-google", 
      title: "BGS Global Institute", 
      category: "Education", 
      location: "Bangalore", 
      primaryMetric: "₹2.4 Cr Revenue", 
      secondaryMetric: "+25% Admissions", 
      platform: "google" as const, 
      tags: ["Google Ads", "Lead Gen"], 
      duration: "3 Months", 
      summary: "Structured search and lead setup for program keywords. Qualified leads climbed steadily while conversion setup streamlined follow-ups.", 
      image: "/landing-page/google-ads/case-studies/bgs-global.jpg" 
    },
    { 
      id: "ashray-google", 
      title: "Ashray Developers", 
      category: "Real Estate", 
      location: "Bangalore", 
      primaryMetric: "₹1.2 Cr Revenue", 
      secondaryMetric: "+40% Conversion", 
      platform: "google" as const, 
      tags: ["Real Estate", "Search + WhatsApp"], 
      duration: "Quarterly", 
      summary: "Mapped campaigns to micro-markets with instant WhatsApp follow-up integration, improving client response and site visit conversion.", 
      image: "/landing-page/google-ads/case-studies/ashray.jpg" 
    },
    { 
      id: "baatu-meta", 
      title: "Baatu", 
      category: "E-Commerce", 
      location: "India", 
      primaryMetric: "₹25 L Revenue", 
      secondaryMetric: "+120% Conversion", 
      platform: "meta" as const, 
      tags: ["Meta Ads", "Social Setup"], 
      duration: "2 Months", 
      summary: "Full social media profile optimization and Meta campaign setup that delivered thumb-stopping product campaigns.", 
      image: "/landing-page/google-ads/case-studies/baatu.jpg" 
    },
    { 
      id: "ddc-google", 
      title: "DDC Smiles", 
      category: "Healthcare", 
      location: "Bangalore", 
      primaryMetric: "+310% Leads", 
      secondaryMetric: "ROI 5.2x", 
      platform: "google" as const, 
      tags: ["Google Business Profile", "Local Search"], 
      duration: "30 Days", 
      summary: "Google Business Profile optimization paired with hyper-local search ads for rapid local booking growth.", 
      image: "/landing-page/google-ads/case-studies/ddcsmiles.jpg" 
    }
  ] as CaseStudy[]
};
