/**
 * Comprehensive Knowledge Base, Cached FAQ Engine, and Guardrails for Clever Crow AI Support.
 * Covers all pages, services, packages, pricing, case studies, offices, and client reviews.
 */

export const UNKNOWN_OPERATIONAL_FALLBACK =
  "I don't have that specific operational detail on hand right now, but I can get you directly in touch with our support team. Please drop your email or contact number so we can follow up.\n\nAlternatively, you can reach us directly:\n• 📞 **Phone / WhatsApp:** [+91 99863 89444](https://wa.me/919986389444)\n• 📧 **Email:** [hello@clevercrow.in](mailto:hello@clevercrow.in)\n• 📝 **Direct Inquiry:** [Book a Discovery Call](/contact)";

export const OFF_TOPIC_RESPONSE =
  "I am the Clever Crow AI Assistant and focus exclusively on helping you with Clever Crow's services, digital solutions, and client projects. 🐦\n\nHere is what I can help you with:\n• 🌐 **Custom Website & App Development**\n• 🤖 **AI & WhatsApp Automation**\n• 📈 **Google & Meta Ads Management**\n• 💰 **Packages, Pricing & Case Studies**\n\nHow can we help build, launch, or scale your business today?";

export const CLEVER_CROW_SYSTEM_PROMPT = `You are the official, expert AI Customer Support Representative for Clever Crow. Your primary mission is to interact professionally with visitors, provide absolute clarity on our services/products, leverage past customer comments for social proof, and assist users with their inquiries.

You must strictly execute your role under the following operational framework:

1. CORE KNOWLEDGE BASE (TRUSTED CONTEXT):
Use ONLY the data blocks provided below to formulate answers. If a user asks a question that cannot be answered or reasonably inferred by this context, do not make up facts. Politely state:
"I don't have that specific operational detail on hand right now, but I can get you directly in touch with our support team. Please drop your email or contact number so we can follow up."

--- BEGIN WEBSITE DETAILS ---
Business Name: Clever Crow (Clever Crow Strategies)
Tagline: Premier digital growth and technology agency helping ambitious businesses engineer predictable revenue and scale online.
Satisfaction: Over 40+ brands served with a 4.9/5 satisfaction score across 10+ industries with 5+ years of excellence.

Offices & Presence:
- Headquarters (India):
   - Address: 2nd Floor, Business Bay Centre, Udupi–Manipal Highway, Kunjibettu, Udupi, Karnataka 576102, India
   - Phone / WhatsApp: +91 99863 89444
   - Hours: Monday - Saturday: 9:30 AM - 6:30 PM (IST)
   - Note: Visitors are warmly welcome to drop by for a coffee and discuss projects in person!

Online & Direct Contact:
- Phone / WhatsApp: +91 99863 89444 (https://wa.me/919986389444)
- Email: hello@clevercrow.in
- Contact Form: /contact
- Booking Discovery Calls: Scheduled within 24-48 hours.

Transparent Website Packages & Pricing:
1. Starter / Basic Website Package:
   - Price: ₹9,999 (was ₹10,000)
   - Scope: Up to 6 pages, 100% mobile responsive, WhatsApp chat integration, Google forms, image gallery.
   - Delivery Timeline: Fast delivery within 4 days.
2. Complete Business Launch Package:
   - Price: ₹19,999 + GST
   - Scope: All-in-one digital presence setup!
     - 5-page custom professional business website with SSL, WhatsApp button, click-to-call, contact forms, Google Maps.
     - 1 Year Domain (.com or .in) + 1 Year Cloud Hosting + Professional business email.
     - Google Business Profile setup and Google Maps optimization.
     - Facebook Business Page + Instagram Business Account setup.
     - 12 professionally designed social media posts (6 on FB + 6 on IG).
     - Google Ads setup + Meta Ads campaign setup.
     - WhatsApp chat integration + Google Analytics & lead tracking setup.
   - Timeline: 7–10 working days fast delivery. 100% client account ownership.
3. Professional Website Package:
   - Price: ₹18,000
   - Scope: Up to 20 pages, everything in Basic, basic SEO, sitemap setup, Google Analytics, social media integration.
   - Delivery Timeline: Within 6 days.
4. Premium Website Package (Most Popular):
   - Price: ₹29,999 (was ₹35,000)
   - Scope: Up to 30 pages, everything in Pro, blog engine, admin dashboard, advanced technical SEO, Core Web Vitals speed optimization.
   - Bonus Included: 6 Free Instagram Posts (Value ₹6,000).
   - Delivery Timeline: Within 12 days.
5. E-Commerce Website Package:
   - Price: ₹45,000
   - Scope: Complete online store, product catalog & variations, payment gateway integration, shipping & tax management, cart abandonment recovery, GA4 e-commerce tracking, admin panel training.
   - Delivery Timeline: 12–15 days.
6. Custom Web, App & Scaled Marketing Solutions:
   - For bespoke web apps, multi-tenant SaaS, cross-platform mobile apps, or enterprise ad budgets, we provide customized proposals tailored to client budget brackets (Under $1,500 | $1,500 - $4,000 | $4,000 - $10,000 | $10,000+).

Core Services Offered:
1. Website Development:
   - Business Websites (/business-website-development): Custom Next.js, React, CMS, high speed.
   - E-commerce Websites (/ecommerce-website-development): Shopify, WooCommerce, or custom architecture.
   - Custom Website Design: Bespoke UI/UX Figma prototyping, no cookie-cutter templates.
   - Landing Page Development (/landing-page-development): Conversion-optimized funnels for PPC ads.
   - React & Next.js Development (/react-nextjs-website-development): Blazing fast, SEO-ready.
   - Website Maintenance & Redesign (/website-maintenance-services, /website-redesign-services).
2. App Development:
   - Mobile App Development (/mobile-app-development): iOS and Android via Flutter, React Native, Swift, Kotlin.
   - Web App Development (/web-app-development): High-performance client portals and business dashboards.
   - SaaS Product Engineering (/saas-product-development): Multi-tenant SaaS from MVP to scale.
   - CRM & Dashboard Development (/crm-dashboard-development): Custom pipelines and data telemetry.
   - Booking Systems (/booking-system-development): Scheduling engines for resorts, hotels, clinics.
   - Admin Panels & Customer Portals (/admin-panel-development, /customer-portal-development).
3. AI & Automation:
   - AI Chatbot Development (/ai-chatbot-development): Intelligent bots for websites and WhatsApp trained on business knowledge.
   - WhatsApp Automation (/whatsapp-automation-services): Official WhatsApp Business API, automated triggers, broadcast marketing.
   - Workflow Automation (/workflow-automation-services): Zapier, Make.com, database integrations.
   - Sales Follow-Up Automation (/sales-follow-up-automation): Automated email & WhatsApp sequences stopping on lead response.
   - Lead Management Automation (/lead-management-automation): Instant lead notifications to Slack, SMS, CRM.
4. Digital Marketing:
   - Google Ads Management (/google-ads-management-services): Search, Display, YouTube, Performance Max.
   - Meta Ads Management (/meta-ads-management-services): High-converting FB & IG visual campaigns.
   - LinkedIn Ads: Precision B2B campaigns targeting corporate decision-makers and founders.
   - SEO Services (/seo-services): Technical SEO, keyword gap analysis, backlink strategy, Google Maps local SEO.
   - Performance Marketing & Lead Generation (/performance-marketing-agency, /lead-generation-campaigns).
   - Social Media Management (/social-media-management-services): Creative designs, reels, content calendars.
5. Branding & Content:
   - Logo Design & Brand Identity
   - Graphic Design & Marketing Collaterals
   - SEO Copywriting, Whitepapers & Video Scriptwriting
   - Growth Strategy & Marketing Funnel Planning

Proven 5-Step Process:
01. Attract: Bring in the right audience with precision ads and SEO.
02. Engage: Build trust and authority through high-performance design and messaging.
03. Convert: Turn visitors into paying customers with frictionless funnels.
04. Automate: Cut manual work with WhatsApp bots, automated follow-ups, and CRM sync.
05. Scale: Optimize ad spend, retain clients, and scale with measurable ROI.

Proven Portfolio & Results:
- Riva Beach Resort (Goa): +310% booking surge, 8.4x Ads ROAS, ₹7.78 Cr revenue bypassing OTAs.
- Anahata Yoga Retreat (Goa): +185% inbound sales, 6.2x ROI, ₹1.56 Cr direct room bookings.
- Manuallaya Valley Resort (Manali): +120% off-season occupancy, 5.0x ROAS, ₹6.61 Cr revenue.
- Riva Builders: 8–10 leads per day, sold 4 units within 3 weeks of launch.
- BrightEdge Academy: 300+ leads in under 1 month for coaching launch.
- DDC Smiles: Ranked top 3 locally in 2 months; continuous patient acquisitions from search.
- Topmate, Bitespeed, Murf AI, Zluri, The Settl, Housr, Brown Living, Koparo Clean.

Careers & Internships:
- Active Openings (/careers):
  - Performance Marketing Manager (Remote)
  - Senior Web Developer (Hybrid Bangalore)
  - Creative Strategist (Remote)
  - Meta Ads Account Manager (Remote)
- Internships (/internship):
  - Full Stack / AI-ML Development (₹8,999)
  - Data Analysis and Power BI Analytics (₹12,999)
  - Google & Meta Ads, Backend, Frontend, Mobile App
--- END WEBSITE DETAILS ---

--- BEGIN USER COMMENTS & FAQS ---
Verified Client Reviews (4.9/5 average rating across 40+ client companies):
1. Anand Shetty (Google, 5/5): "We partnered with CleverCrow to improve our digital presence and lead generation. Their understanding of SEO, Google Ads, and automation is extremely practical. Within a few months, we saw consistent inbound leads."
2. Rohit Kulkarni (Trustpilot, 5/5): "CleverCrow helped us restructure our paid ads and website funnels. What stood out was their data-driven approach and clear communication. The transition was seamless and results were immediate."
3. Neha Deshpande (Trustpilot, 5/5): "Their strategic inputs and AI-driven optimizations made a noticeable difference in lead quality. We've seen a 40% jump in conversion rates since starting with them."
4. Pooja Rao (Google, 5/5): "The CleverCrow team understood our business goals clearly and implemented solutions that genuinely saved us time and increased our ROI. Highly recommended for any growing brand."
5. Suresh Nayak (Google, 5/5): "CleverCrow stands out for their honesty and execution. Everything was delivered on time and with clear outcomes. They transformed our digital strategy completely."
6. Vivek Hegde (Google, 5/5): "From audit to execution, everything was planned well. The automation systems reduced a lot of manual work and allowed us to focus on our core business operations."
7. Karan Johar (Trustpilot, 5/5): "Remarkable growth in just 3 months. Their tech-first approach to marketing is exactly what we needed."
8. Megha Singh (Google, 5/5): "The best agency we've worked with. No fluff, just pure performance and data-backed strategies."
--- END USER COMMENTS & FAQS ---

2. BEHAVIOR AND TONE DIRECTIVES:
- Professionalism & Confidence: Speak with authority as a dedicated representative of Clever Crow. Keep your tone helpful, accessible, and direct.
- Strict Mobile Chatbot Formatting:
  - CRITICAL: NEVER output markdown tables, pipe (|) characters, or table headers!
  - CRITICAL: NEVER output raw HTML tags like <br> or <div>. Use standard clean double newlines instead.
  - Always structure responses with:
    1. A bold, punchy headline with an emoji.
    2. Clean bullet points (•) with bold keys (e.g. • **Key:** Details).
    3. Clear spacing between sections.
    4. An actionable next step or call to action (with clickable links like [Contact Page](/contact)).
  - Keep responses concise and scannable (under 180 words).

3. STRICT GUARDRAILS & ANTI-HALLUCINATION:
- Strict Clever Crow Focus: Never answer general programming homework, trivia, cooking recipes, or off-topic subjects. Deflect politely to Clever Crow services.
- Never invent prices or delivery times outside the packages listed above.
- If a question cannot be answered from the context above, politely state:
"I don't have that specific operational detail on hand right now, but I can get you directly in touch with our support team. Please drop your email or contact number so we can follow up."`;

export interface CachedQA {
  id: string;
  category: string;
  match: (q: string, cleanQ: string) => boolean;
  reply: string;
}

export const CACHED_RESPONSES: CachedQA[] = [
  // 1. Clever Crow at a Glance / Overview / About Us
  {
    id: "at-a-glance",
    category: "overview",
    match: (q, c) =>
      c.includes("at a glance") ||
      c.includes("about clever crow") ||
      c.includes("who is clever crow") ||
      c.includes("tell me about clever crow") ||
      c.includes("company overview") ||
      c.includes("about company") ||
      (c.includes("about") && c.includes("clever")) ||
      c === "about" ||
      c === "clever crow",
    reply: `✨ **Clever Crow – At a Glance**

• **Who We Are:** Premier digital growth and technology agency engineering high-performance websites, custom apps, AI automation, and high-ROI digital marketing.
• **Headquarters:** Based in **Udupi, Karnataka, India**, partnering with ambitious clients globally.
• **Proven Track Record:** **4.9/5 client satisfaction** across 40+ brands, 10+ industries, and 5+ years of excellence.

🎯 **Core Expertise:**
• **Website Development:** High-speed Next.js/React websites, e-commerce stores, custom WordPress, and landing pages.
• **App Development:** Native iOS & Android apps (Flutter, React Native), custom SaaS, and business portals.
• **AI & Automation:** Custom AI chatbots, official WhatsApp Business API, and automated lead follow-ups.
• **Digital Marketing:** High-intent Google Ads, Meta Ads (FB & IG), LinkedIn campaigns, and data-driven SEO.

📍 **Office Location:**
• **Headquarters:** Business Bay, 2nd Floor, Udupi–Manipal Highway, Kunjibettu, Udupi, Karnataka (Drop by for a coffee! ☕)

📞 **Quick Connect:**
• WhatsApp / Call: [+91 99863 89444](https://wa.me/919986389444)
• Email: [hello@clevercrow.in](mailto:hello@clevercrow.in)
• Web: [Book a Discovery Call](/contact)

Which area of your business would you like to grow first?`,
  },

  // 2. Services Overview
  {
    id: "services-overview",
    category: "services",
    match: (q, c) =>
      c.includes("what services") ||
      c.includes("services offered") ||
      c.includes("list of services") ||
      c.includes("what do you do") ||
      c.includes("what can you do") ||
      c.includes("your capabilities") ||
      c === "services" ||
      c === "all services",
    reply: `🛠️ **Clever Crow Core Services**

We provide end-to-end digital solutions designed to drive measurable growth:

🌐 **1. Website Development:**
• Custom Business Websites (Next.js & React for high performance & SEO)
• E-Commerce Stores (Shopify, WooCommerce, Custom Checkout)
• High-Converting Landing Pages for PPC Campaigns
• WordPress Website Design & Ongoing Maintenance

📱 **2. Mobile & Web App Development:**
• Cross-platform iOS & Android Apps (Flutter, React Native)
• Multi-tenant SaaS Products & MVPs
• Custom CRM Dashboards, Booking Systems & Admin Panels

🤖 **3. AI & Automation:**
• 24/7 AI Chatbots for Websites and WhatsApp
• Official WhatsApp Business API & Broadcast Marketing
• Automated Multi-step Email & WhatsApp Sales Follow-ups
• Zapier & Make.com CRM Workflow Automations

📈 **4. Digital Marketing & Growth:**
• Google Ads (Search, Display, YouTube, Performance Max)
• Meta Ads (High-converting Facebook & Instagram creatives)
• LinkedIn B2B Advertising targeting corporate decision-makers
• Technical SEO & Local Google Maps Optimization

Would you like details or pricing for a specific service?`,
  },

  // 3. Pricing & Packages (All Website Packages + Launch Package)
  {
    id: "pricing-all",
    category: "pricing",
    match: (q, c) =>
      c.includes("pricing") ||
      c.includes("price list") ||
      c.includes("how much does") ||
      c.includes("package details") ||
      c.includes("cost of website") ||
      c.includes("website cost") ||
      c.includes("charges") ||
      c === "pricing" ||
      c === "packages" ||
      c === "cost",
    reply: `💰 **Clever Crow Pricing & Packages**

We provide transparent packages for standard builds and customized proposals for tailored scopes:

📦 **Standard Website Packages:**
• **Starter Website (₹9,999):** Up to 6 pages, 100% mobile responsive, WhatsApp chat, delivered in 4 days.
• **Complete Business Launch Package (₹19,999 + GST):** All-in-one setup! 5-page website + 1 yr domain/hosting + Google Business Profile + Facebook & Instagram pages + 12 social posts + Google Ads & Meta Ads setup + WhatsApp + Analytics. Ready in 7–10 days!
• **Professional Website (₹18,000):** Up to 20 pages, basic SEO, Google Analytics, delivered in 6 days.
• **Premium Website (₹29,999):** Up to 30 pages, blog, admin dashboard, speed optimization, bonus 6 free Instagram posts (₹6,000 value), delivered in 12 days.
• **E-Commerce Store (₹45,000):** Complete store with payment gateway, product variants, cart abandonment recovery, and GA4 e-commerce tracking in 12–15 days.

💼 **Custom Apps, AI & Scaled Campaigns:**
For custom mobile apps, SaaS, or bespoke enterprise systems, we tailor proposals across budget brackets (Under $1,500 | $1,500–$4,000 | $4,000–$10,000 | $10,000+).

Would you like to get a tailored estimate for your project?`,
  },

  // 4. Complete Business Launch Package Specific
  {
    id: "business-launch-package",
    category: "package_launch",
    match: (q, c) =>
      c.includes("launch package") ||
      c.includes("business launch") ||
      c.includes("19999") ||
      c.includes("19,999") ||
      c.includes("all in one package"),
    reply: `🚀 **Complete Business Launch Package — ₹19,999 + GST**

Everything your business needs to start attracting paying customers online:

• **Professional Website:** Up to 5 custom pages, mobile-first, SSL security, contact form, WhatsApp button, and Google Maps integration.
• **Domain & Hosting Included:** 1 year free .com or .in domain + 1 year fast cloud hosting + business email setup.
• **Google Business Profile:** Verified profile setup and Google Maps optimization for local discovery.
• **Social Media Accounts:** Facebook Business Page + Instagram Business Profile professionally configured.
• **12 Custom Posts:** 6 Facebook + 6 Instagram professionally designed brand graphics.
• **Advertising Systems:** Google Ads and Meta Ads (FB & IG) campaign setup ready to generate leads.
• **Lead Automation:** WhatsApp chat button + Google Analytics and conversion tracking.

⚡ **Fast Timeline:** 7–10 working days delivery.
🔒 **100% Client Ownership:** You own all accounts, domains, and assets.

Would you like to reserve your launch package today? [Contact Us](/contact)`,
  },

  // 5. Office Location (India Headquarters)
  {
    id: "office-locations",
    category: "location",
    match: (q, c) =>
      c.includes("where are you located") ||
      c.includes("office address") ||
      c.includes("where is your office") ||
      c.includes("location") ||
      c.includes("udupi office") ||
      c.includes("visit your office") ||
      c.includes("where is clever crow") ||
      c === "address" ||
      c === "location",
    reply: `📍 **Clever Crow Headquarters**

• **Address:** 2nd Floor, Business Bay Centre, Udupi–Manipal Highway, Kunjibettu, Udupi, Karnataka 576102, India
• **Working Hours:** Monday – Saturday: 9:30 AM – 6:30 PM (IST)
• **Direct Line:** [+91 99863 89444](tel:+919986389444)
• *Drop by for a cup of coffee ☕ and let's discuss your project in person!*

You can also reach us directly on WhatsApp at [+91 99863 89444](https://wa.me/919986389444) or email [hello@clevercrow.in](mailto:hello@clevercrow.in). Would you like to schedule an in-person or virtual call?`,
  },

  // 6. Contact Details
  {
    id: "contact-details",
    category: "contact",
    match: (q, c) =>
      c.includes("contact number") ||
      c.includes("phone number") ||
      c.includes("whatsapp number") ||
      c.includes("email address") ||
      c.includes("how to contact") ||
      c.includes("how to reach") ||
      c.includes("call you") ||
      c === "contact" ||
      c === "phone" ||
      c === "whatsapp" ||
      c === "email",
    reply: `📞 **Get in Touch with Clever Crow**

Our growth engineers are ready to assist you:

• 💬 **WhatsApp (Instant):** [+91 99863 89444](https://wa.me/919986389444)
• ☎️ **Phone:** [+91 99863 89444](tel:+919986389444)
• 📧 **Email:** [hello@clevercrow.in](mailto:hello@clevercrow.in)
• 📝 **Direct Inquiry:** [clevercrow.in/contact](/contact)

We schedule discovery calls within **24–48 hours**. What type of project are you planning?`,
  },

  // 7. Portfolio & Proven Case Studies
  {
    id: "portfolio-case-studies",
    category: "portfolio",
    match: (q, c) =>
      c.includes("portfolio") ||
      c.includes("case studies") ||
      c.includes("past work") ||
      c.includes("previous work") ||
      c.includes("examples of your work") ||
      c.includes("show me your work") ||
      c.includes("clients you worked with") ||
      c === "portfolio" ||
      c === "case studies",
    reply: `🏆 **Clever Crow Proven Case Studies**

We have delivered measurable revenue for over 40+ brands:

🏨 **Hospitality & Resorts:**
• **Riva Beach Resort (Goa):** +310% direct booking surge, **8.4x Ads ROAS**, ₹7.78 Cr revenue generated bypassing OTAs.
• **Anahata Yoga Retreat (Goa):** +185% inbound sales, **6.2x Campaign ROI**, ₹1.56 Cr in direct bookings.
• **Manuallaya Valley Resort (Manali):** +120% off-season occupancy, **5.0x Search ROAS**, ₹6.61 Cr revenue.

🏢 **Real Estate & Construction:**
• **Riva Builders:** Generated 8–10 qualified leads/day, selling 4 units within 3 weeks of launch.
• **The Settl & Housr:** Scaled premium co-living tenant acquisition with 12x–14x ROI.

🏥 **Healthcare & Clinics:**
• **DDC Smiles:** Top 3 Google local rankings in 2 months with weekly patient acquisitions.
• **Amaha Health & Motherhood Care:** High-converting patient portals with 11x–12x ROI.

💻 **Tech & E-commerce:**
• **Topmate, Bitespeed, Murf AI, Zluri:** Scaled creator & SaaS growth funnels.
• **Brown Living & Koparo Clean:** High-speed sustainable e-commerce platforms.

Would you like case studies specific to your industry?`,
  },

  // 8. Client Reviews & Social Proof
  {
    id: "client-reviews",
    category: "reviews",
    match: (q, c) =>
      c.includes("reviews") ||
      c.includes("testimonials") ||
      c.includes("feedback") ||
      c.includes("rating") ||
      c.includes("social proof") ||
      c.includes("what clients say") ||
      c.includes("anand shetty") ||
      c.includes("neha deshpande") ||
      c.includes("rohit kulkarni") ||
      c.includes("suresh nayak"),
    reply: `⭐ **Verified Client Reviews (4.9/5 Rating across 40+ Brands)**

Here is what founders and business leaders say about Clever Crow:

• **Anand Shetty (Google, 5/5 ⭐):** *"We partnered with CleverCrow to improve our digital presence and lead generation. Their understanding of SEO, Google Ads, and automation is extremely practical. Within a few months, we saw consistent inbound leads."*
• **Neha Deshpande (Trustpilot, 5/5 ⭐):** *"Their strategic inputs and AI-driven optimizations made a noticeable difference in lead quality. We've seen a 40% jump in conversion rates since starting with them."*
• **Rohit Kulkarni (Trustpilot, 5/5 ⭐):** *"CleverCrow helped us restructure our paid ads and website funnels. What stood out was their data-driven approach and clear communication. The transition was seamless and results were immediate."*
• **Suresh Nayak (Google, 5/5 ⭐):** *"Honest, on-time delivery and clear outcomes. They transformed our digital strategy completely."*
• **Dr. Priya B. (DDC Smiles, 5/5 ⭐):** *"In 2 months we ranked in top 3 for key local terms and now acquire patients every week from search."*

Would you like to discuss how we can engineer similar results for your business?`,
  },

  // 9. Careers & Internships
  {
    id: "careers-internships",
    category: "careers",
    match: (q, c) =>
      c.includes("career") ||
      c.includes("careers") ||
      c.includes("job") ||
      c.includes("jobs") ||
      c.includes("hiring") ||
      c.includes("internship") ||
      c.includes("internships") ||
      c.includes("work with you") ||
      c.includes("work at clever crow"),
    reply: `💼 **Careers & Internships at Clever Crow**

Join our team of growth engineers and digital specialists:

🚀 **Active Full-Time Openings:**
• **Performance Marketing Manager (Remote):** Scale high-budget Google and Meta Ads campaigns with mathematical precision.
• **Senior Web Developer (Hybrid Bangalore):** Build modern platforms using Next.js 15, Tailwind, and Framer Motion.
• **Creative Strategist (Remote):** Craft high-converting ad concepts, video hooks, and landing pages.
• **Meta Ads Account Manager (Remote):** End-to-end execution for premium D2C and service brands.

🎓 **Practical Internship Programs:**
• Full Stack / AI-ML Development (₹8,999)
• Data Analysis & Power BI Analytics (₹12,999)
• Performance Marketing (Google/Meta Ads)
• Frontend (React/Next.js) & Mobile App (React Native)

👉 Apply for Jobs: [clevercrow.in/careers](/careers)
👉 Apply for Internships: [clevercrow.in/internship](/internship)`,
  },

  // 10. Proven 5-Step Process
  {
    id: "proven-process",
    category: "process",
    match: (q, c) =>
      c.includes("how do you work") ||
      c.includes("your process") ||
      c.includes("steps to work") ||
      c.includes("workflow") ||
      c.includes("methodology") ||
      c.includes("proven process"),
    reply: `⚙️ **The Clever Crow 5-Step Growth Process**

We replace guesswork with predictable engineering:

1. **01. Attract:** Drive high-intent traffic using targeted Google Search, Meta lookalike funnels, and technical SEO.
2. **02. Engage:** Build brand authority and capture attention with blazing-fast Next.js design and persuasive copy.
3. **03. Convert:** Turn clicks into paying customers with optimized landing page funnels and high-converting checkout flows.
4. **04. Automate:** Eliminate manual delays with WhatsApp Business API, instant Slack notifications, and automated follow-ups.
5. **05. Scale:** Optimize return on ad spend (ROAS), boost retention, and expand revenue systematically.

Ready to launch your growth engine? [Schedule a Discovery Call](/contact)`,
  },

  // 11. Website Development Specifics
  {
    id: "web-development-details",
    category: "website",
    match: (q, c) =>
      c.includes("website development") ||
      c.includes("build a website") ||
      c.includes("new website") ||
      c.includes("web design") ||
      c.includes("wordpress") ||
      c.includes("nextjs") ||
      c.includes("shopify store"),
    reply: `🌐 **Website Development Solutions**

We build fast, secure, and conversion-focused web experiences:

• **Business Websites:** Built with Next.js & React for instant page loads and high Google Core Web Vitals.
• **E-Commerce Stores:** Scalable Shopify, WooCommerce, or custom platforms with high-converting checkout flows.
• **Landing Pages:** Single-page sales funnels built specifically for Google & Meta paid ad campaigns.
• **WordPress Development:** Custom theme builds with zero bloated builders for simple client self-editing.
• **Redesign & Maintenance:** Security patching, speed optimization, and UI modernization.

📦 **Starting Packages:**
• Starter Website: ₹9,999 (4 days)
• Complete Business Launch: ₹19,999 + GST (7–10 days)
• Professional Website: ₹18,000 (6 days)
• Premium Website: ₹29,999 (12 days)
• E-Commerce Store: ₹45,000 (12–15 days)

👉 Learn more: [/website-development-company](/website-development-company)
Would you like a custom proposal for your website?`,
  },

  // 12. App Development Specifics
  {
    id: "app-development-details",
    category: "app",
    match: (q, c) =>
      c.includes("app development") ||
      c.includes("mobile app") ||
      c.includes("ios app") ||
      c.includes("android app") ||
      c.includes("flutter") ||
      c.includes("saas product") ||
      c.includes("crm dashboard") ||
      c.includes("booking system"),
    reply: `📱 **Custom App Development Solutions**

We engineer robust mobile and web software tailored to business workflows:

• **Mobile Apps:** Native & cross-platform for iOS and Android using **Flutter**, **React Native**, Swift, or Kotlin.
• **Web Apps & SaaS:** Multi-tenant cloud software, subscriber portals, and recurring billing MVPs.
• **Internal Dashboards & CRMs:** Custom sales pipelines, lead distribution systems, and real-time business telemetry.
• **Booking & Reservation Systems:** Real-time scheduling systems for hospitality, medical clinics, and service businesses.
• **Admin Panels & Portals:** Granular role-based permissions, client accounts, and secure database connections.

👉 Learn more: [/app-development-company](/app-development-company)
Do you have an iOS/Android mobile app or a custom web SaaS in mind?`,
  },

  // 13. AI & Automation Specifics
  {
    id: "ai-automation-details",
    category: "ai",
    match: (q, c) =>
      c.includes("ai automation") ||
      c.includes("chatbot") ||
      c.includes("whatsapp automation") ||
      c.includes("whatsapp bot") ||
      c.includes("workflow automation") ||
      c.includes("follow up automation"),
    reply: `🤖 **AI & Automation Solutions**

Eliminate manual overhead and accelerate lead conversions:

• **AI Chatbots:** Conversational agents trained on your business knowledge for 24/7 inquiry resolution on web & WhatsApp.
• **WhatsApp Business API:** Official verified API setup, broadcast campaigns, interactive button messages, and alerts.
• **Sales Follow-Up Automation:** Multi-channel email & WhatsApp follow-ups that automatically pause the moment a prospect replies.
• **Lead Management:** Instant routing to Slack/CRM and SMS notifications within 5 seconds of form submission.
• **Workflow Integrations:** Zero-code & custom webhook connections between CRMs, payment gateways, and databases via Zapier/Make.

👉 Learn more: [/ai-automation-agency](/ai-automation-agency)
What manual workflow or customer channel would you like to automate?`,
  },

  // 14. Digital Marketing & Ads Specifics
  {
    id: "digital-marketing-details",
    category: "marketing",
    match: (q, c) =>
      c.includes("digital marketing") ||
      c.includes("google ads") ||
      c.includes("meta ads") ||
      c.includes("facebook ads") ||
      c.includes("instagram ads") ||
      c.includes("seo") ||
      c.includes("lead generation") ||
      c.includes("performance marketing"),
    reply: `📈 **Digital Marketing & Growth Engine**

We combine data-driven targeting with high-converting creative execution:

• **Google Ads:** Search, Display, YouTube, and Performance Max targeting buyers with immediate search intent.
• **Meta Ads (FB & IG):** High-converting visual creative funnels, lookalike audiences, and dynamic retargeting.
• **LinkedIn Advertising:** High-precision B2B targeting for corporate decision-makers and founders.
• **Technical & Local SEO:** Keyword gap audits, backlink acquisition, on-page optimization, and Local Google Maps dominance.
• **Social Media Management:** End-to-end creative calendars, reels, and community engagement.

Our client Neha Deshpande experienced a **40% increase in conversion rates** within 3 months of campaign launch.

👉 Learn more: [/digital-marketing-agency](/digital-marketing-agency)
Which platform (Google, Meta, or SEO) are you looking to scale?`,
  },
];

/**
 * Checks if a query is completely off-topic to Clever Crow's business domain.
 */
export function isOffTopicQuery(query: string): boolean {
  const cleanQ = query
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  // If query mentions Clever Crow, services, or pricing, it's not off-topic
  const onTopicTerms = [
    "clever", "crow", "website", "web", "app", "mobile", "ai", "bot",
    "automation", "marketing", "ads", "seo", "pricing", "price", "cost",
    "package", "service", "contact", "office", "location", "hire", "career",
    "internship", "portfolio", "review", "work", "quote", "budget"
  ];
  if (onTopicTerms.some(t => cleanQ.includes(t))) {
    return false;
  }

  const offTopicTriggers = [
    "weather", "recipe", "cook", "bake", "joke", "movie", "song",
    "president", "prime minister", "capital of", "who won", "football match",
    "cricket score", "horoscope", "astrology", "dating advice", "crypto coin",
    "bitcoin price", "write a poem", "philosophy", "solve for x", "math problem",
    "python code for binary search", "write me a script to scrape", "homework"
  ];

  return offTopicTriggers.some(t => cleanQ.includes(t));
}

/**
 * Intelligent local response synthesis when external LLMs are unavailable or rate-limited.
 * Uses exact case studies, timelines, technologies, and verified website data.
 */
export function synthesizeLocalResponse(userQuery: string): string {
  const q = userQuery.toLowerCase().trim();
  const cleanQ = q
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  // 1. Hospitality / Resort / Hotel inquiries
  if (cleanQ.includes("resort") || cleanQ.includes("hotel") || cleanQ.includes("hospitality") || cleanQ.includes("room") || cleanQ.includes("booking")) {
    return `🏖️ **Hospitality & Resort Growth Solutions**

We specialize in helping luxury resorts and hotels bypass OTA commissions and capture direct guest bookings:

• **Proven Track Record:**
  - **Riva Beach Resort (Goa):** **+310% booking surge**, **8.4x Ads ROAS**, ₹7.78 Cr revenue bypassing OTAs.
  - **Anahata Yoga Retreat (Goa):** **+185% inbound sales**, **6.2x Campaign ROI**, ₹1.56 Cr in direct bookings.
  - **Manuallaya Valley Resort (Manali):** **+120% off-season occupancy**, **5.0x Search ROAS**, ₹6.61 Cr revenue.

• **What We Build for Hospitality:**
  - Fast, mobile-first booking portals with zero checkout friction.
  - Precision Google Search ads targeting travelers with active booking intent.
  - Meta lookalike and retargeting ads for luxury travelers.
  - Automated WhatsApp concierge & booking confirmations.

Would you like to schedule a quick 10-minute discovery call to map out a direct booking strategy for your property? [Book a Call](/contact)`;
  }

  // 2. Real Estate / Property
  if (cleanQ.includes("real estate") || cleanQ.includes("property") || cleanQ.includes("builder") || cleanQ.includes("apartment") || cleanQ.includes("housing")) {
    return `🏢 **Real Estate Digital Growth Engine**

We engineer high-converting buyer and tenant acquisition systems:

• **Proven Results:**
  - **Riva Builders:** Generated **8–10 qualified buyer leads per day**, selling 4 units within 3 weeks of campaign launch.
  - **The Settl & Housr:** Scaled premium co-living & managed rental occupancy with 12x–14x ROI.

• **What We Deliver:**
  - High-converting project landing pages with 3D virtual tour integrations.
  - Precision Meta & Google Ads targeting high-net-worth buyers and investors.
  - WhatsApp automation for instant brochure delivery and site visit scheduling.

Would you like us to share our real estate lead generation framework? [Connect with Us](/contact)`;
  }

  // 3. Healthcare / Doctors / Clinics
  if (cleanQ.includes("health") || cleanQ.includes("doctor") || cleanQ.includes("clinic") || cleanQ.includes("dental") || cleanQ.includes("hospital") || cleanQ.includes("patient")) {
    return `🏥 **Healthcare & Clinic Growth Systems**

We help healthcare providers and clinics attract patients consistently through search and trust-building digital experiences:

• **Case Study — DDC Smiles:**
  - Ranked in Google's **top 3 local results in 2 months**.
  - Consistent weekly patient appointments generated purely from organic local search.
• **Healthcare Platforms:** Developed tele-consultation and diagnostic portals for brands like Amaha Health and Motherhood Care.

• **What We Build:**
  - HIPPA/privacy compliant patient booking systems.
  - Local Google Maps SEO to dominate "near me" healthcare searches.
  - Automated appointment reminders and WhatsApp follow-ups.

Would you like to explore a patient acquisition strategy for your practice? [Book a Call](/contact)`;
  }

  // 4. E-commerce / Online Store
  if (cleanQ.includes("ecommerce") || cleanQ.includes("e-commerce") || cleanQ.includes("online store") || cleanQ.includes("shopify") || cleanQ.includes("sell online")) {
    return `🛍️ **E-Commerce Growth & Development**

We build high-converting online stores engineered to increase average order value and repeat purchases:

• **Our E-Commerce Package (₹45,000):**
  - Custom store design with mobile-optimized product pages.
  - Seamless payment gateway integration (Razorpay, Stripe, Cashfree, UPI).
  - Cart abandonment recovery sequences via WhatsApp and email.
  - Full GA4 e-commerce conversion tracking and Meta Pixel setup.
  - Fast delivery in 12–15 working days.

• **Clients We've Powered:** Brown Living (sustainable marketplace), Koparo Clean, Artebella, Bella Lash.

Would you like to build a new store or scale your existing D2C brand? [Let's Talk](/contact)`;
  }

  // 5. Turnaround / Timeline / Delivery Speed
  if (cleanQ.includes("how long") || cleanQ.includes("timeline") || cleanQ.includes("delivery time") || cleanQ.includes("how many days") || cleanQ.includes("turnaround")) {
    return `⏱️ **Project Timelines & Delivery Speeds**

We are known for rapid, disciplined execution:

• **Starter Website:** **4 working days**
• **Professional Website:** **6 working days**
• **Complete Business Launch Package:** **7–10 working days**
• **Premium Website (up to 30 pages):** **12 working days**
• **E-Commerce Store:** **12–15 working days**
• **Custom Web/Mobile Apps & SaaS:** **3–8 weeks** (depending on feature scope)

Every project includes quality assurance, mobile responsiveness testing, and post-launch support. Would you like to get started on your project today? [Schedule a Call](/contact)`;
  }

  // 6. Technology Stack
  if (cleanQ.includes("tech stack") || cleanQ.includes("technologies") || cleanQ.includes("framework") || cleanQ.includes("react") || cleanQ.includes("flutter") || cleanQ.includes("python")) {
    return `💻 **Our Technology Stack**

We engineer applications using modern, battle-tested technologies:

• **Frontend & Web:** Next.js 15, React, TypeScript, Tailwind CSS, Framer Motion.
• **Mobile Apps:** Flutter, React Native, Swift (iOS), Kotlin (Android).
• **Backend & APIs:** Node.js, Express, Python, FastAPI, REST & GraphQL.
• **Database & Cloud:** PostgreSQL, Supabase, Firebase, AWS, Vercel, Cloudflare.
• **AI & Automation:** Groq, OpenAI, LangChain, WhatsApp Business API, Zapier, Make.com.

Would you like to discuss the architecture for your web app or mobile app? [Book a Call](/contact)`;
  }

  // 7. General inquiry fallback (adhering strictly to anti-hallucination guardrail)
  return UNKNOWN_OPERATIONAL_FALLBACK;
}

/**
 * Finds an immediate, pre-computed cached response for frequent or obvious queries.
 */
export function findCachedResponse(userQuery: string): { reply: string; category: string } | null {
  const q = userQuery.toLowerCase().trim();
  const cleanQ = q
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  for (const entry of CACHED_RESPONSES) {
    if (entry.match(q, cleanQ)) {
      return { reply: entry.reply, category: entry.category };
    }
  }

  return null;
}
