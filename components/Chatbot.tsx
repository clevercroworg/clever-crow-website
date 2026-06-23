"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { X, Send } from "lucide-react";
import { services } from "@/data/services";
import { motion, AnimatePresence } from "framer-motion";
import { submitLead } from "@/components/lib/submitLead";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
  options?: string[];
  isTyping?: boolean;
  cta?: {
    text: string;
    url: string;
  };
};

type ChatbotState = {
  stage:
    | "start"
    | "category-select"
    | "service-select"
    | "service-details"
    | "project-goal"
    | "project-budget"
    | "lead-name"
    | "lead-email"
    | "lead-phone"
    | "completed";
  selectedCategory: string | null;
  selectedServiceKey: string | null;
  projectGoal: string | null;
  projectBudget: string | null;
};

type HistoryItem = {
  state: ChatbotState;
  messages: Message[];
};

type ChatbotService = {
  title: string;
  category: string;
  description: string;
  highlights: string[];
  slug: string;
  customGoalPrompt?: string;
  customGoalOptions?: string[];
};

// Custom Premium 3D-Styled Full-Body Robot Model (waving and bobbing)
const AnimatedBot = ({ 
  isSpeaking, 
  className, 
  animate = false,
  expression = "happy"
}: { 
  isSpeaking: boolean, 
  className?: string, 
  animate?: boolean,
  expression?: "happy" | "thinking" | "focused" | "excited"
}) => (
  <svg 
    viewBox="18 10 64 64" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={`overflow-visible ${className || "w-10 h-10"}`}
  >
    <defs>
      {/* 3D Sphere Radial Gradient - Polished Silver-White Metal */}
      <radialGradient id="whiteGloss" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="35%" stopColor="#f8fafc" />
        <stop offset="75%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#94a3b8" />
      </radialGradient>

      {/* Chrome Metallic joints */}
      <linearGradient id="silverMetal" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e2e8f0" />
        <stop offset="50%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>

      {/* Blue LED Accent Gradients */}
      <linearGradient id="blueAccent" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>

      {/* Visor Glass Screen */}
      <radialGradient id="visorGlass" cx="30%" cy="20%" r="80%">
        <stop offset="0%" stopColor="#0f172a" />
        <stop offset="75%" stopColor="#020617" />
        <stop offset="100%" stopColor="#000000" />
      </radialGradient>

      {/* Visor Glass Reflection */}
      <linearGradient id="glassReflect" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
        <stop offset="60%" stopColor="rgba(255, 255, 255, 0.05)" />
        <stop offset="100%" stopColor="transparent" />
      </linearGradient>

      {/* Blue Neon Glow Filter */}
      <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Drop Shadow for Depth */}
      <filter id="botShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#64748b" floodOpacity="0.2" />
      </filter>
    </defs>

    <style>{`
      @keyframes botBlink {
        0%, 96%, 100% { transform: scaleY(1); }
        98% { transform: scaleY(0.1); }
      }
      @keyframes botHeadTurn3D {
        0%, 100% { transform: perspective(400px) rotateY(0deg); }
        20%, 40% { transform: perspective(400px) rotateY(-22deg); }
        60%, 80% { transform: perspective(400px) rotateY(22deg); }
      }
      @keyframes botFaceParallax {
        0%, 100% { transform: translateX(0px); }
        20%, 40% { transform: translateX(-4.5px); }
        60%, 80% { transform: translateX(4.5px); }
      }
      .bot-head-group {
        animation: botHeadTurn3D 6s ease-in-out infinite;
        transform-origin: 50px 39px;
        transform-style: preserve-3d;
      }
      .bot-face-group {
        animation: botFaceParallax 6s ease-in-out infinite;
        transform-origin: 50px 39px;
      }
      .bot-eye-l {
        animation: botBlink 4.5s ease-in-out infinite;
        transform-origin: 43px 39px;
      }
      .bot-eye-r {
        animation: botBlink 4.5s ease-in-out infinite;
        transform-origin: 57px 39px;
      }
    `}</style>

    {/* Entire Head assembly */}
    <g className={animate ? "bot-head-group" : ""} filter="url(#botShadow)">
      {/* Neck Joint */}
      <rect x="46" y="52" width="8" height="6" rx="2" fill="url(#silverMetal)" />

      {/* Robot Head Capsule */}
      <rect x="28" y="22" width="44" height="34" rx="17" fill="url(#whiteGloss)" stroke="#e2e8f0" strokeWidth="0.5" />

      {/* Antennas (Ears) */}
      {/* Left Ear */}
      <circle cx="28" cy="39" r="4" fill="url(#silverMetal)" />
      <line x1="26" y1="39" x2="21" y2="27" stroke="url(#silverMetal)" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="21" cy="27" r="1.8" fill="#22d3ee" filter="url(#neonGlow)" />
      
      {/* Right Ear */}
      <circle cx="72" cy="39" r="4" fill="url(#silverMetal)" />
      <line x1="74" y1="39" x2="79" y2="27" stroke="url(#silverMetal)" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="79" cy="27" r="1.8" fill="#22d3ee" filter="url(#neonGlow)" />

      {/* Face elements (Visor and Eyes/Mouth) */}
      <g className={animate ? "bot-face-group" : ""}>
        {/* Visor Screen */}
        <rect x="34" y="27" width="32" height="20" rx="9" fill="url(#visorGlass)" />

        {/* Visor Glass Shiny Highlight */}
        <rect x="35" y="28" width="30" height="9" rx="4.5" fill="url(#glassReflect)" pointerEvents="none" />

        {/* Left Eye */}
        {expression === "happy" && (
          <path 
            d="M 40 37 Q 43 34 46 37" 
            fill="none" 
            stroke="#22d3ee" 
            strokeWidth="2.2" 
            strokeLinecap="round" 
            className="bot-eye-l"
            filter="url(#neonGlow)" 
          />
        )}
        {expression === "thinking" && (
          <line 
            x1="40" y1="36" x2="46" y2="36" 
            stroke="#22d3ee" 
            strokeWidth="2.2" 
            strokeLinecap="round" 
            className="bot-eye-l"
            filter="url(#neonGlow)" 
          />
        )}
        {expression === "focused" && (
          <circle 
            cx="42.5" cy="35.5" r="2.2" 
            fill="#22d3ee" 
            className="bot-eye-l"
            filter="url(#neonGlow)" 
          />
        )}
        {expression === "excited" && (
          <path 
            d="M 39.5 38.5 L 42.5 35 L 45.5 38.5" 
            fill="none" 
            stroke="#22d3ee" 
            strokeWidth="2.2" 
            strokeLinecap="round" 
            className="bot-eye-l"
            filter="url(#neonGlow)" 
          />
        )}

        {/* Right Eye */}
        {expression === "happy" && (
          <path 
            d="M 54 37 Q 57 34 60 37" 
            fill="none" 
            stroke="#22d3ee" 
            strokeWidth="2.2" 
            strokeLinecap="round" 
            className="bot-eye-r"
            filter="url(#neonGlow)" 
          />
        )}
        {expression === "thinking" && (
          <line 
            x1="54" y1="36" x2="60" y2="36" 
            stroke="#22d3ee" 
            strokeWidth="2.2" 
            strokeLinecap="round" 
            className="bot-eye-r"
            filter="url(#neonGlow)" 
          />
        )}
        {expression === "focused" && (
          <circle 
            cx="57.5" cy="35.5" r="2.2" 
            fill="#22d3ee" 
            className="bot-eye-r"
            filter="url(#neonGlow)" 
          />
        )}
        {expression === "excited" && (
          <path 
            d="M 54.5 38.5 L 57.5 35 L 60.5 38.5" 
            fill="none" 
            stroke="#22d3ee" 
            strokeWidth="2.2" 
            strokeLinecap="round" 
            className="bot-eye-r"
            filter="url(#neonGlow)" 
          />
        )}

        {/* Mouth */}
        {isSpeaking ? (
          <path 
            d="M 45 42 Q 50 46 55 42" 
            fill="none" 
            stroke="#22d3ee" 
            strokeWidth="1.8" 
            strokeLinecap="round"
            filter="url(#neonGlow)"
          >
            <animate attributeName="d" values="M 45 42 Q 50 46 55 42; M 45 44 Q 50 41 55 44; M 45 42 Q 50 46 55 42" dur="0.5s" repeatCount="indefinite" />
          </path>
        ) : (
          <>
            {expression === "happy" && (
              <path 
                d="M 46 43 Q 50 46 54 43" 
                fill="none" 
                stroke="#22d3ee" 
                strokeWidth="1.8" 
                strokeLinecap="round"
                filter="url(#neonGlow)"
              />
            )}
            {expression === "thinking" && (
              <line 
                x1="46" y1="43" x2="54" y2="43" 
                stroke="#22d3ee" 
                strokeWidth="1.8" 
                strokeLinecap="round"
                filter="url(#neonGlow)"
              />
            )}
            {expression === "focused" && (
              <path 
                d="M 47 43 Q 50 45.5 53 43" 
                fill="none" 
                stroke="#22d3ee" 
                strokeWidth="1.8" 
                strokeLinecap="round"
                filter="url(#neonGlow)"
              />
            )}
            {expression === "excited" && (
              <path 
                d="M 45 42 Q 50 48 55 42 Z" 
                fill="#22d3ee" 
                stroke="#22d3ee" 
                strokeWidth="1" 
                strokeLinejoin="round"
                filter="url(#neonGlow)"
              />
            )}
          </>
        )}
      </g>
    </g>
  </svg>
);;

const CHATBOT_SERVICES: Record<string, ChatbotService> = {
  // Website Development
  "business-website": {
    title: "Business Website Development",
    category: "Website Development",
    description: "High-performance, custom-built corporate and business websites optimized for lead generation, speed, and brand credibility.",
    highlights: ["Custom Next.js & React Frontend", "Modern CMS (WordPress / Sanity)", "Fully Responsive Layouts", "Technical SEO Foundations"],
    slug: "business-website-development",
    customGoalPrompt: "What is the primary goal of your business website?",
    customGoalOptions: ["Brand Presence", "Lead Generation", "Corporate Info", "Other"]
  },
  "ecommerce-website": {
    title: "E-commerce Website Development",
    category: "Website Development",
    description: "Secure, lightning-fast online stores designed to showcase your products, streamline checkout, and drive sales.",
    highlights: ["Shopify / WooCommerce / Custom Dev", "Payment Gateway Integrations", "Order & Inventory Syncing", "Conversion Rate Optimization"],
    slug: "ecommerce-website-development",
    customGoalPrompt: "Are you starting a new e-commerce store or migrating/upgrading an existing one?",
    customGoalOptions: ["New Shopify Store", "Migrate/Upgrade Site", "Custom E-commerce", "Other"]
  },
  "wordpress-design": {
    title: "WordPress Website Design",
    category: "Website Development",
    description: "Custom-designed WordPress websites that are easy to manage, fast, secure, and optimized for marketing.",
    highlights: ["Custom Elementor / Gutenberg themes", "Speed & Performance Tuning", "Advanced Security Hardening", "No-code admin editing dashboard"],
    slug: "services/wordpress-website-design",
    customGoalPrompt: "What type of website are you planning to build on WordPress?",
    customGoalOptions: ["Business Blog", "Corporate/Service Site", "WooCommerce Store", "Other"]
  },
  "custom-website-design": {
    title: "Custom Website Design",
    category: "Website Development",
    description: "Bespoke UI/UX design and custom-coded frontends built specifically for unique brand aesthetics and speed.",
    highlights: ["Tailored Figma UI/UX prototyping", "Ultra-fast loading times", "Zero cookie-cutter templates", "Unique interactive micro-animations"],
    slug: "services/custom-website-design",
    customGoalPrompt: "Do you have custom design files (Figma, Adobe XD) ready, or do we start from layout design?",
    customGoalOptions: ["Need UI/UX Design", "Have Figma ready", "Not sure", "Other"]
  },
  "landing-page-dev": {
    title: "Landing Page Development",
    category: "Website Development",
    description: "High-converting, performance-oriented landing pages built to turn campaign traffic into qualified leads.",
    highlights: ["Designed for PPC and Social campaigns", "Speed-optimized for low bounce rates", "Focused single-action CTA design", "A/B testing ready setups"],
    slug: "landing-page-development",
    customGoalPrompt: "What campaign is this landing page for (e.g. Google Ads, Meta Ads, Email marketing)?",
    customGoalOptions: ["Google Ads Campaign", "Meta Ads Campaign", "Product Launch", "Other"]
  },
  "react-nextjs": {
    title: "React & Next.js Development",
    category: "Website Development",
    description: "State-of-the-art web development using React and Next.js for maximum performance, SEO indexability, and scalability.",
    highlights: ["Static Site Generation (SSG) & SSR", "Optimized Core Web Vitals", "Scalable component-based code", "API route integrations"],
    slug: "react-nextjs-website-development",
    customGoalPrompt: "What is the scope of your React/Next.js project?",
    customGoalOptions: ["Headless CMS Site", "Interactive Web Portal", "SaaS Frontend", "Other"]
  },
  "website-redesign": {
    title: "Website Redesign Services",
    category: "Website Development",
    description: "Modernize your existing website with a fresh, contemporary UI, improved navigation, and better conversion paths.",
    highlights: ["Complete UI/UX overhaul", "SEO rankings preservation", "Performance and speed upgrade", "Mobile layout optimization"],
    slug: "website-redesign-services",
    customGoalPrompt: "What is the primary reason you want to redesign your website?",
    customGoalOptions: ["Modernize UI/UX", "Improve Page Speed", "Boost Conversions", "Other"]
  },
  "website-maintenance": {
    title: "Website Maintenance Services",
    category: "Website Development",
    description: "Proactive care, security monitoring, daily backups, and regular content updates to keep your site running flawlessly.",
    highlights: ["Regular plugin and core updates", "Daily cloud backups", "Malware scanning & cleanups", "On-demand development support hours"],
    slug: "website-maintenance-services",
    customGoalPrompt: "What kind of maintenance support do you need most?",
    customGoalOptions: ["Regular Updates & Backups", "Technical Support/Fixes", "Monthly SEO Checks", "Other"]
  },

  // App Development
  "mobile-app-dev": {
    title: "Mobile App Development",
    category: "App Development",
    description: "Custom native and cross-platform mobile apps for iOS and Android, built to engage users and power business workflows.",
    highlights: ["iOS & Android App Store publishing", "React Native & Flutter expertise", "Real-time sync and push notifications", "Offline support & local storage"],
    slug: "mobile-app-development",
    customGoalPrompt: "Do you need your app built for iOS, Android, or both platforms?",
    customGoalOptions: ["iOS & Android (Flutter/RN)", "iOS Only (Swift)", "Android Only (Kotlin)", "Other"]
  },
  "web-app-dev": {
    title: "Web App Development",
    category: "App Development",
    description: "Custom web-based applications, client portals, interactive dashboards, and business automation platforms.",
    highlights: ["Complex database & API backends", "Secure user role authentication", "Interactive analytics charts", "Responsive web app frontends"],
    slug: "web-app-development",
    customGoalPrompt: "What type of custom web application are you building?",
    customGoalOptions: ["Internal Dashboard", "Customer Login Portal", "Operational Tool", "Other"]
  },
  "saas-product-dev": {
    title: "SaaS Product Development",
    category: "App Development",
    description: "Full-cycle SaaS product engineering from initial MVP launch to subscription system integration and scaling.",
    highlights: ["Multi-tenant architecture", "Stripe / Razorpay subscriptions", "Interactive user onboarding", "Robust API documentation"],
    slug: "saas-product-development",
    customGoalPrompt: "What is the core functionality or industry category of your SaaS idea?",
    customGoalOptions: ["B2B SaaS Portal", "D2C/Consumer SaaS", "MVP Prototype", "Other"]
  },
  "crm-dashboards": {
    title: "CRM & Dashboard Development",
    category: "App Development",
    description: "Custom CRM portals and dashboards to track your leads, sales pipelines, client actions, and business operations.",
    highlights: ["Custom sales pipeline boards", "Interactive reporting & metrics", "Lead routing automation", "Integrations with email & WhatsApp"],
    slug: "crm-dashboard-development",
    customGoalPrompt: "What CRM integrations or main tracking pipelines do you need on your dashboard?",
    customGoalOptions: ["Lead Tracking Pipeline", "Sales & Invoicing", "Client Support Hub", "Other"]
  },
  "booking-systems": {
    title: "Booking System Development",
    category: "App Development",
    description: "Tailored online booking and scheduling systems for hotels, resorts, clinics, events, and service businesses.",
    highlights: ["Real-time availability calendars", "Online deposit payments", "Automated SMS / email reminders", "Staff calendar sync (Google / Outlook)"],
    slug: "booking-system-development",
    customGoalPrompt: "What type of booking scheduling do you need?",
    customGoalOptions: ["Appointment Booking", "Hotel/Resort Booking", "Event Ticket Booking", "Other"]
  },
  "admin-panels": {
    title: "Admin Panel Development",
    category: "App Development",
    description: "Secure, easy-to-use custom backend admin portals to manage your app data, content, orders, and user permissions.",
    highlights: ["Role-based access control (RBAC)", "Bulk import/export tools", "System logs and user auditing", "Tailored database managers"],
    slug: "admin-panel-development",
    customGoalPrompt: "What major features are critical for your admin panel?",
    customGoalOptions: ["User Management & RBAC", "Order & Product Control", "Content/CMS Admin", "Other"]
  },
  "customer-portals": {
    title: "Customer Portal Development",
    category: "App Development",
    description: "Self-service online portals where your clients can log in, view project status, download invoices, and access support.",
    highlights: ["Secure client login accounts", "Invoice payment integrations", "File sharing and messaging", "Ticket-based customer support"],
    slug: "customer-portal-development",
    customGoalPrompt: "What self-service features should the customer portal provide?",
    customGoalOptions: ["Invoice & Payment Pay", "File Sharing / Reports", "Support Ticket Console", "Other"]
  },

  // AI & Automation
  "ai-chatbot-dev": {
    title: "AI Chatbot Development",
    category: "AI & Automation",
    description: "Intelligent AI assistant agents trained on your business data to handle customer inquiries, capture leads, and support workflows.",
    highlights: ["Website & WhatsApp deployments", "Trained on your custom documents/FAQs", "CRM syncing & automatic handoffs", "Multi-language support"],
    slug: "ai-chatbot-development",
    customGoalPrompt: "Where do you want to deploy the AI chatbot?",
    customGoalOptions: ["Website Chatbot", "WhatsApp Automation Bot", "Multi-Channel Bot", "Other"]
  },
  "whatsapp-automation": {
    title: "WhatsApp Automation Services",
    category: "AI & Automation",
    description: "Official WhatsApp Business API setups to send notifications, automate replies, run broadcasts, and qualify incoming leads.",
    highlights: ["Official API access green tick help", "Interactive button template messages", "Automated order/booking updates", "Shared team inbox routing"],
    slug: "whatsapp-automation-services",
    customGoalPrompt: "What is the main use case for WhatsApp automation?",
    customGoalOptions: ["Send Alerts/Updates", "Lead Qualification Bot", "Broadcast Marketing", "Other"]
  },
  "ai-customer-support": {
    title: "AI Customer Support Automation",
    category: "AI & Automation",
    description: "AI-driven customer service systems that resolve common queries instantly and create tickets for complex issues.",
    highlights: ["24/7 instant FAQ answering", "Auto-resolves order status checks", "Seamless human support escalation", "Helpdesk ticketing tool sync"],
    slug: "ai-customer-support-automation",
    customGoalPrompt: "Which customer support systems or helpdesks do you want to integrate with the AI?",
    customGoalOptions: ["Freshdesk/Zendesk Sync", "Custom Website Widget", "Slack/Email Ticketing", "Other"]
  },
  "workflow-automation": {
    title: "Workflow Automation Services",
    category: "AI & Automation",
    description: "Integration of different business applications to eliminate manual data entry, errors, and repetitive workflows.",
    highlights: ["Zapier / Make.com expert builds", "Automated invoice/agreement generation", "Lead distribution & alert slack/email", "No-code backend orchestration"],
    slug: "workflow-automation-services",
    customGoalPrompt: "Which business applications do you want to connect to automate your workflow?",
    customGoalOptions: ["CRM to Email/WhatsApp", "Forms to Sheets & Slack", "ERP/Accounting Sync", "Other"]
  },
  "sales-followup": {
    title: "Sales Follow-Up Automation",
    category: "AI & Automation",
    description: "Automated, multi-step email and WhatsApp follow-up campaigns to convert cold leads and inquiries into sales.",
    highlights: ["Drip email & WhatsApp schedules", "Smart delay triggers", "Automatic stop upon user reply", "Sales pipeline stage transition triggers"],
    slug: "sales-follow-up-automation",
    customGoalPrompt: "What is the primary channel you want to automate follow-ups for?",
    customGoalOptions: ["WhatsApp Follow-Ups", "Email Sequences", "Multi-Channel Drips", "Other"]
  },
  "lead-management": {
    title: "Lead Management Automation",
    category: "AI & Automation",
    description: "Instantly capture, route, filter, and score new leads coming from your ads and landing pages.",
    highlights: ["Instant SMS/Slack lead notifications", "Auto-assignment based on region/service", "Duplicate lead detection", "Lead scoring systems"],
    slug: "lead-management-automation",
    customGoalPrompt: "Where do your leads currently come from?",
    customGoalOptions: ["Facebook/Instagram Ads", "Google Search Ads", "Website Webforms", "Other"]
  },

  // Digital Marketing
  "google-ads": {
    title: "Google Ads Management",
    category: "Digital Marketing",
    description: "Maximize your ROI with search ads, display networks, YouTube, and Performance Max campaigns targeting high-intent buyers.",
    highlights: ["Intent-based keyword targeting", "Performance Max (PMax) setups", "Conversion rate tracking audit", "Ad copy copywriting & testing"],
    slug: "google-ads-management-services",
    customGoalPrompt: "What is the primary goal of your Google Ads campaigns?",
    customGoalOptions: ["Inquiries & Calls", "E-commerce Sales", "App Downloads", "Other"]
  },
  "meta-ads": {
    title: "Meta Ads Management",
    category: "Digital Marketing",
    description: "Targeted campaigns on Facebook and Instagram using high-converting creative ad formats, targeting, and custom funnels.",
    highlights: ["Visual ad creative production", "Lookalike & Retargeting funnels", "Lead capture forms on Facebook/IG", "CAPI (Conversions API) setups"],
    slug: "meta-ads-management-services",
    customGoalPrompt: "What is the primary objective of your Meta (Facebook & Instagram) ads?",
    customGoalOptions: ["Lead Generation", "Direct Purchase (D2C)", "Brand Visibility", "Other"]
  },
  "linkedin-ads": {
    title: "LinkedIn Ads Management",
    category: "Digital Marketing",
    description: "High-precision B2B advertising targeting founders, executives, decision-makers, and specific companies.",
    highlights: ["Targeting by job title/company size", "Sponsored content & message ads", "High-quality B2B lead generation", "Account-based marketing (ABM)"],
    slug: "services/linkedin-ads",
    customGoalPrompt: "What industry or job roles are you targeting with your LinkedIn Campaigns?",
    customGoalOptions: ["B2B Decision Makers", "HR/Recruiters", "Tech/Founders", "Other"]
  },
  "seo-services": {
    title: "SEO Services",
    category: "Digital Marketing",
    description: "Drive consistent organic search traffic and dominate Google rankings with on-page, off-page, and technical SEO.",
    highlights: ["Detailed keyword gap research", "Technical site speed optimization", "High-quality backlink building", "Local SEO & Google Maps optimization"],
    slug: "seo-services",
    customGoalPrompt: "Are you looking to optimize an existing website or a brand new one?",
    customGoalOptions: ["Optimize Existing Site", "SEO for New Site", "Local SEO (Google Maps)", "Other"]
  },
  "performance-marketing": {
    title: "Performance Marketing",
    category: "Digital Marketing",
    description: "Scale your revenue through goal-focused, data-driven paid advertising across multiple networks with detailed analytics.",
    highlights: ["Cross-channel budget scaling", "Advanced marketing analytics", "Cohort analysis & LTV tracking", "Weekly growth dashboard reviews"],
    slug: "performance-marketing-agency",
    customGoalPrompt: "What is your current average monthly marketing budget?",
    customGoalOptions: ["Under $1,500/mo", "$1,500 - $5,000/mo", "$5,000+/mo", "Deciding"]
  },
  "lead-gen-campaigns": {
    title: "Lead Generation Campaigns",
    category: "Digital Marketing",
    description: "Custom lead acquisition funnels designed to fill your sales team's pipeline with warm, pre-qualified business inquiries.",
    highlights: ["Ad-to-landing-page optimized funnels", "Pre-qualification lead forms", "Automated email/SMS follow-ups", "Ad spend vs Lead Cost tracking"],
    slug: "lead-generation-campaigns",
    customGoalPrompt: "What is the average ticket size or value of a qualified lead for your business?",
    customGoalOptions: ["High-ticket B2B", "Mid-range services", "Local consumer leads", "Other"]
  },
  "social-media-management": {
    title: "Social Media Management",
    category: "Digital Marketing",
    description: "Grow your organic presence, engage your audience, and build brand loyalty across Instagram, LinkedIn, and YouTube.",
    highlights: ["Weekly visual content calendars", "Copywriting & hashtag strategies", "Reels/Shorts video editing help", "Direct message & comment replying"],
    slug: "social-media-management-services",
    customGoalPrompt: "Which platforms do you want us to manage (e.g. Instagram, LinkedIn, YouTube, Facebook)?",
    customGoalOptions: ["Instagram & Facebook", "LinkedIn & Twitter/X", "YouTube & Reels", "Other"]
  }
};

const getOptionsForState = (state: ChatbotState): string[] => {
  switch (state.stage) {
    case "start":
      return [
        "🌐 Website Development",
        "📱 App Development",
        "🤖 AI & Automation",
        "📈 Digital Marketing",
        "💼 Quick Connect"
      ];
    case "category-select":
      if (state.selectedCategory === "Website Development") {
        return [
          "Business Website",
          "E-commerce Website",
          "WordPress Design",
          "Custom UI/UX Site",
          "Landing Page Dev",
          "React & Next.js",
          "Website Redesign",
          "Website Maintenance",
          "👈 Back",
          "🔙 Main Menu"
        ];
      }
      if (state.selectedCategory === "App Development") {
        return [
          "Mobile App Dev",
          "Web App Dev",
          "SaaS Product Dev",
          "CRM & Dashboards",
          "Booking Systems",
          "Admin Panels",
          "Customer Portals",
          "👈 Back",
          "🔙 Main Menu"
        ];
      }
      if (state.selectedCategory === "AI & Automation") {
        return [
          "AI Chatbots",
          "WhatsApp Automation",
          "AI Customer Support",
          "Workflow Automation",
          "Sales Follow-Up",
          "Lead Management",
          "👈 Back",
          "🔙 Main Menu"
        ];
      }
      if (state.selectedCategory === "Digital Marketing") {
        return [
          "Google Ads",
          "Meta Ads (FB & IG)",
          "LinkedIn Ads",
          "SEO Services",
          "Performance Marketing",
          "Lead Gen Campaigns",
          "Social Media Management",
          "👈 Back",
          "🔙 Main Menu"
        ];
      }
      return ["🔙 Main Menu"];
      
    case "service-details":
      return [
        "📋 Get a Quote",
        "👈 Back",
        "🔙 Main Menu"
      ];
      
    case "project-goal":
      const svcKey = state.selectedServiceKey;
      if (svcKey && CHATBOT_SERVICES[svcKey]?.customGoalOptions) {
        return [...(CHATBOT_SERVICES[svcKey].customGoalOptions || []), "👈 Back", "🔙 Main Menu"];
      }
      const cat = state.selectedCategory || "";
      let goalOptions = ["Other / Custom request"];
      if (cat === "Website Development") {
        goalOptions = ["Build a new site from scratch", "Redesign existing website", "Add new features", "Other / Custom request"];
      } else if (cat === "App Development") {
        goalOptions = ["Build a new MVP/product", "Develop custom web/mobile app", "Build internal tools/dashboard", "Other / Custom request"];
      } else if (cat === "AI & Automation") {
        goalOptions = ["Automate customer support", "Generate & qualify leads", "Connect tools & CRM workflows", "Other / Custom request"];
      } else if (cat === "Digital Marketing") {
        goalOptions = ["Increase leads & enquiries", "Drive e-commerce sales", "Boost brand awareness", "Other / Custom request"];
      }
      return [...goalOptions, "👈 Back", "🔙 Main Menu"];
      
    case "project-budget":
      return [
        "Under $1,500",
        "$1,500 - $4,000",
        "$4,000 - $10,000",
        "$10,000+",
        "Deciding / Discuss on call",
        "👈 Back",
        "🔙 Main Menu"
      ];
      
    case "lead-name":
    case "lead-email":
    case "lead-phone":
      return [
        "👈 Back",
        "🔙 Main Menu"
      ];
      
    case "completed":
      return [
        "🔄 Start New Inquiry",
        "🔙 Main Menu"
      ];
      
    default:
      return ["🔙 Main Menu"];
  }
};

const matchInputToNavigation = (text: string) => {
  const t = text.toLowerCase().trim();
  
  if (t === "back" || t === "go back" || t === "👈 back") return { type: "general", key: "back" };
  if (t === "menu" || t === "main menu" || t === "home" || t === "🔙 main menu" || t === "🔄 start new inquiry") return { type: "general", key: "menu" };
  
  // Clean punctuation for easier matching of conversational phrases
  const cleanText = t.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").replace(/\s+/g, " ").trim();

  // Contact inquiries
  if (
    t.includes("contact") || 
    t.includes("phone") || 
    t.includes("number") || 
    t.includes("email") || 
    t.includes("call") || 
    t.includes("get in touch") || 
    t.includes("reach you") || 
    t.includes("talk to") || 
    t.includes("speak to") || 
    t.includes("support")
  ) {
    return { type: "general", key: "contact" };
  }

  // Services & capabilities inquiries
  if (
    t.includes("services") || 
    t.includes("service") || 
    t.includes("offer") || 
    t.includes("provide") || 
    t.includes("portfolio") || 
    t.includes("do for me") || 
    t.includes("help with") || 
    t.includes("capability") || 
    t.includes("capabilities") || 
    t.includes("solution") || 
    t.includes("solutions") || 
    t.includes("skills") || 
    t.includes("what do you do")
  ) {
    return { type: "general", key: "services" };
  }

  if (t.includes("address") || t.includes("location") || t.includes("office") || t.includes("where")) {
    return { type: "general", key: "location" };
  }
  if (t.includes("career") || t.includes("job") || t.includes("internship") || t.includes("work")) {
    return { type: "general", key: "careers" };
  }
  if (t.includes("about") || t.includes("clever crow")) {
    return { type: "general", key: "about" };
  }
  if (t.includes("pricing") || t.includes("cost") || t.includes("price") || t.includes("how much") || t.includes("charges")) {
    return { type: "general", key: "pricing" };
  }

  // Greetings variations
  const greetings = [
    "hi", "hello", "hey", "good morning", "good afternoon", "good evening", 
    "gday", "namaste", "hola", "sup", "yo", "greeting", "greetings",
    "hey there", "hi there", "hello there", "nice to meet you"
  ];
  if (greetings.some(g => cleanText === g || cleanText.startsWith(g + " ") || cleanText.endsWith(" " + g))) {
    return { type: "general", key: "greeting" };
  }

  // Common conversational queries/status checks
  const conversationalQuestions = [
    "how are you", "how is it going", "hows it going", "how are you doing",
    "whats up", "what is up", "are you there", "anyone there", "is anyone here",
    "can you help me", "who are you", "what is your name", "whats your name",
    "what do you do"
  ];
  if (conversationalQuestions.some(q => cleanText.includes(q))) {
    return { type: "general", key: "greeting" };
  }

  // Match category
  if (t.includes("website") || t.includes("web site") || t.includes("wordpress") || t.includes("blog")) {
    return { type: "category", key: "Website Development" };
  }
  if (t.includes("app") || t.includes("mobile") || t.includes("saas") || t.includes("crm") || t.includes("portal") || t.includes("dashboard")) {
    return { type: "category", key: "App Development" };
  }
  if (t.includes("ai") || t.includes("chatbot") || t.includes("automation") || t.includes("zapier") || t.includes("whatsapp")) {
    return { type: "category", key: "AI & Automation" };
  }
  if (t.includes("marketing") || t.includes("ads") || t.includes("seo") || t.includes("google") || t.includes("facebook") || t.includes("meta") || t.includes("instagram") || t.includes("social")) {
    return { type: "category", key: "Digital Marketing" };
  }

  // Match specific service title
  for (const [key, svc] of Object.entries(CHATBOT_SERVICES)) {
    if (t.includes(svc.title.toLowerCase()) || svc.highlights.some(h => t.includes(h.toLowerCase())) || svc.slug.replace("-", " ").includes(t)) {
      return { type: "service", key };
    }
  }

  return null;
};

const parseMarkdown = (text: string, onLinkClick?: (url: string) => void) => {
  const lines = text.split("\n");
  
  return lines.map((line, lineIdx) => {
    const parts: React.ReactNode[] = [];
    const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
    let match;
    let lastIndex = 0;
    
    while ((match = regex.exec(line)) !== null) {
      const matchIndex = match.index;
      const matchText = match[0];
      
      if (matchIndex > lastIndex) {
        parts.push(line.substring(lastIndex, matchIndex));
      }
      
      if (matchText.startsWith("**") && matchText.endsWith("**")) {
        const boldText = matchText.slice(2, -2);
        parts.push(<strong key={matchIndex} className="font-extrabold text-slate-900">{boldText}</strong>);
      } else if (matchText.startsWith("[") && matchText.includes("](")) {
        const closeBracketIdx = matchText.indexOf("]");
        const linkText = matchText.slice(1, closeBracketIdx);
        const linkUrl = matchText.slice(closeBracketIdx + 2, -1);
        
        const isLocal = linkUrl.startsWith("/") || linkUrl.startsWith("file://");
        const cleanUrl = linkUrl.startsWith("file://") ? linkUrl.replace("file://", "") : linkUrl;
        
        if (isLocal) {
          parts.push(
            <a
              key={matchIndex}
              href={cleanUrl}
              onClick={(e) => {
                e.preventDefault();
                if (onLinkClick) {
                  onLinkClick(cleanUrl);
                }
              }}
              className="text-amber-600 hover:text-amber-500 font-extrabold underline transition-colors"
            >
              {linkText}
            </a>
          );
        } else {
          parts.push(
            <a
              key={matchIndex}
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 hover:text-amber-500 font-extrabold underline transition-colors"
            >
              {linkText}
            </a>
          );
        }
      }
      
      lastIndex = regex.lastIndex;
    }
    
    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }
    
    return (
      <div key={lineIdx} className="min-h-[1.25rem]">
        {parts.length > 0 ? parts : " "}
      </div>
    );
  });
};

export default function Chatbot() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [chatState, setChatState] = useState<ChatbotState>({
    stage: "start",
    selectedCategory: null,
    selectedServiceKey: null,
    projectGoal: null,
    projectBudget: null,
  });
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  let currentExpression: "happy" | "thinking" | "focused" | "excited" = "happy";
  if (isTyping) {
    currentExpression = "thinking";
  } else if (chatState.stage === "completed") {
    currentExpression = "excited";
  } else if (chatState.stage.startsWith("lead-") || chatState.stage.startsWith("project-")) {
    currentExpression = "focused";
  }

  const [bubbleText, setBubbleText] = useState<string | null>(null);
  const [isTriggerSpeaking, setIsTriggerSpeaking] = useState(false);
  const [bubbleExpression, setBubbleExpression] = useState<"happy" | "thinking" | "focused" | "excited">("happy");

  useEffect(() => {
    if (isOpen) {
      setBubbleText(null);
      setIsTriggerSpeaking(false);
      return;
    }

    const speakMessages = [
      { text: "Hi! 👋", expression: "excited" as const },
      { text: "Need any help?", expression: "focused" as const },
      { text: "Ask me anything!", expression: "happy" as const },
      { text: "Let's connect!", expression: "excited" as const },
    ];

    // Show initial bubble after 3 seconds
    const initialTimeout = setTimeout(() => {
      const msg = speakMessages[Math.floor(Math.random() * speakMessages.length)];
      setBubbleText(msg.text);
      setBubbleExpression(msg.expression);
      setIsTriggerSpeaking(true);

      // Stop speaking and hide bubble after 3 seconds
      setTimeout(() => {
        setBubbleText(null);
        setIsTriggerSpeaking(false);
      }, 3000);
    }, 3000);

    // Periodic loop
    const interval = setInterval(() => {
      const msg = speakMessages[Math.floor(Math.random() * speakMessages.length)];
      setBubbleText(msg.text);
      setBubbleExpression(msg.expression);
      setIsTriggerSpeaking(true);

      // Stop speaking and hide bubble after 3 seconds
      setTimeout(() => {
        setBubbleText(null);
        setIsTriggerSpeaking(false);
      }, 3000);
    }, 6000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isOpen]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hi! Welcome to Clever Crow. 😊 I can help you explore our services, get a quick project estimate, or put you in touch with our team.\n\nWhat can we build or grow for you today? 🐦",
      options: [
        "🌐 Website Development",
        "📱 App Development",
        "🤖 AI & Automation",
        "📈 Digital Marketing",
        "💼 Quick Connect"
      ],
    },
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("toggle-chat", handleToggle);
    window.addEventListener("open-chat", handleOpen);
    return () => {
      window.removeEventListener("toggle-chat", handleToggle);
      window.removeEventListener("open-chat", handleOpen);
    };
  }, []);

  // Hide chatbot on all internship and landing pages
  if (pathname.startsWith("/internship") || pathname.startsWith("/landing-page") || pathname.startsWith("/lp")) return null;

  const addMessage = (message: Omit<Message, "id">) => {
    setMessages((prev) => [
      ...prev,
      { ...message, id: Date.now().toString() + Math.random().toString() },
    ]);
  };

  const validateName = (name: string) => name.trim().length >= 2;
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return phoneRegex.test(phone.trim());
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    // Capture state and messages before user's text is appended
    const prevState = { ...chatState };
    const prevMessages = [...messages];
    
    addMessage({ sender: "user", text });
    setInputValue("");
    setIsTyping(true);
    
    setTimeout(() => {
      processInput(text, prevState, prevMessages);
    }, 1000 + Math.random() * 500); 
  };

  const handleGeneralFAQ = (key: string, text: string, state: ChatbotState, messagesBefore: Message[]) => {
    let faqText = "";
    let options = getOptionsForState(state);

    const t = text.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").replace(/\s+/g, " ").trim();
    
    // Check if the user also greeted us in the same message
    const hasGreeting = [
      "hi", "hello", "hey", "good morning", "good afternoon", "good evening", 
      "gday", "namaste", "hola", "sup", "yo", "greeting", "greetings",
      "hey there", "hi there", "hello there", "nice to meet you"
    ].some(g => t === g || t.startsWith(g + " ") || t.endsWith(" " + g));
    
    const hasHowAreYou = ["how are you", "how is it going", "hows it going", "how are you doing", "whats up", "what is up"].some(p => t.includes(p));

    let greetingPrefix = "";
    if (hasHowAreYou) {
      greetingPrefix = "I'm doing great, thanks for asking! 😊 Here is that info:\n\n";
    } else if (hasGreeting) {
      greetingPrefix = "Hello! Hope you're having a great day. 😊 Here is that info:\n\n";
    }

    if (key === "location") {
      faqText = `${greetingPrefix}📍 **Visit Our Office!**\n\nWe would love to have you over! Here's where our main office is located:\n🏢 **Business Bay, 2nd Floor, Udupi–Manipal Highway, Kunjibettu, Udupi, Karnataka, India.**\n\nDrop by for a cup of coffee ☕ and we can chat about your project! Would you like to schedule a call or go back?`;
    } else if (key === "contact") {
      faqText = `${greetingPrefix}📞 **Let's Connect!**\n\nHere's how you can reach our team:\n\n☎️ **Phone:** [+91 99863 89444](tel:+919986389444)\n💬 **WhatsApp:** [+91 99863 89444](https://wa.me/919986389444)\n📧 **Email:** [hello@clevercrow.in](mailto:hello@clevercrow.in)\n\n🔗 **Contact Form:** You can also fill out the form directly on our [Contact Page](/contact).\n\nIf you prefer, we can start estimating your project cost right now. It takes less than a minute. What would you like to do?`;
      options = [
        "📬 Contact Page",
        "📋 Get a Quote",
        "🔙 Main Menu"
      ];
    } else if (key === "careers") {
      faqText = `${greetingPrefix}💼 **Work With Us!**\n\nWe're always looking for talented developers, designers, and marketers. We offer internships and full-time roles in:\n\n💻 **Web & App Dev**\n📈 **Digital Marketing**\n🎨 **UI/UX Design**\n\nHave a look at our open roles and apply here:\n👉 [Internships](/internship)\n👉 [Careers](/careers)\n\nHope to see your application soon! 🚀`;
    } else if (key === "about") {
      faqText = `${greetingPrefix}🐦 **About Clever Crow**\n\nClever Crow is a premier digital growth agency dedicated to turning ambitious business goals into digital reality! Based in Udupi, India, we partner with clients globally to scale their digital footprint. 🌍\n\nHere is what we specialize in:\n🚀 **Custom Software Development** (Mobile & Web apps, SaaS products)\n🌐 **Stunning Web Experiences** (Corporate sites, E-commerce stores)\n🤖 **AI & Intelligent Automation** (Chatbots, WhatsApp integration, workflows)\n📈 **Performance Marketing** (Google Ads, Meta Ads, SEO, SMM)\n\nWe act as your extended technology and growth partner! What can we build or scale for you today?`;
    } else if (key === "pricing") {
      faqText = `${greetingPrefix}💰 **Pricing & Quotes**\n\nSince every project has unique features and design requirements, we don't have standard packages. Instead, we give you a customized quote that fits your exact needs.\n\nTo get a proposal:\n1️⃣ Answer a few quick questions here about your goals and budget\n2️⃣ We'll schedule a quick 10-minute call to align on the details\n3️⃣ We'll email you a transparent proposal!\n\nWould you like to get started now? It takes less than 60 seconds! ⚡`;
    } else if (key === "services") {
      faqText = `${greetingPrefix}🛠️ **What We Do**\n\nHere is a quick look at how we can help your business grow: 🐦\n\n🌐 **Website Dev**: Next.js/React apps, online stores, custom WordPress sites, and landing pages.\n📱 **App Dev**: Custom iOS/Android apps, client portals, internal dashboards, and SaaS products.\n🤖 **AI & Automation**: Website/WhatsApp AI chatbots and workflow integrations (Zapier/Make).\n📈 **Digital Marketing**: Google & Meta ads, LinkedIn campaigns, SEO, and social media management.\n\nWhich category would you like to check out? Click below or just type it in! 👇`;
      options = [
        "🌐 Website Development",
        "📱 App Development",
        "🤖 AI & Automation",
        "📈 Digital Marketing",
        "🔙 Main Menu"
      ];
    }
    
    setHistory(prev => [...prev, { state, messages: messagesBefore }]);
    addMessage({
      sender: "bot",
      text: faqText,
      options: options,
      cta: key === "contact" ? { text: "Go to Contact Page", url: "/contact" } : undefined
    });
  };

  const handleGreeting = (text: string, state: ChatbotState, messagesBefore: Message[]) => {
    const t = text.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").replace(/\s+/g, " ").trim();
    
    // Check if the user is asking "how are you" or "who are you" or if it is a general greeting
    const isHowAreYou = ["how are you", "how is it going", "hows it going", "how are you doing", "whats up", "what is up"].some(p => t.includes(p));
    const isWhoAreYou = ["who are you", "what is your name", "whats your name", "what do you do"].some(p => t.includes(p));
    const isAvailability = ["are you there", "anyone there", "is anyone here"].some(p => t.includes(p));
    const isHelp = ["can you help me"].some(p => t.includes(p));

    let prefix = "Hello there! 😊 Hope you're having a wonderful day. I'm the Clever Crow digital assistant.\n\n";

    if (isHowAreYou) {
      prefix = "I'm doing great, thanks for asking! 😊 Ready to help you build or scale your business.\n\n";
    } else if (isWhoAreYou) {
      prefix = "I'm the Clever Crow assistant! 🐦 We help businesses design custom websites, build web/mobile apps, automate workflows (like WhatsApp/AI bots), and run Google/Meta ads.\n\n";
    } else if (isAvailability) {
      prefix = "Yes, I'm right here and ready to help! 😊\n\n";
    } else if (isHelp) {
      prefix = "I'd love to help you! Let me know what you need. 😊\n\n";
    }

    let greetingResponse = prefix + "What can we build or grow for you today?";

    if (state.stage === "category-select") {
      greetingResponse = `${prefix}We were just exploring services under **${state.selectedCategory}**. Let's find the right service for your business. Please select an option below:`;
    } else if (state.stage === "service-details") {
      const serviceName = state.selectedServiceKey ? CHATBOT_SERVICES[state.selectedServiceKey].title : "this service";
      greetingResponse = `${prefix}We were looking at **${serviceName}**. Would you like to get a customized quote for this, or go back?`;
    } else if (state.stage === "project-goal") {
      const serviceName = state.selectedServiceKey ? CHATBOT_SERVICES[state.selectedServiceKey].title : "your project";
      const service = state.selectedServiceKey ? CHATBOT_SERVICES[state.selectedServiceKey] : null;
      const question = service?.customGoalPrompt 
        ? `Awesome choice! 😊 ${service.customGoalPrompt}` 
        : `Awesome choice! 😊 What's the main goal of your project or the key features you're looking to build?`;
      greetingResponse = `${prefix}We were just working on your custom quote for **${serviceName || "your project"}**. \n\n${question}`;
    } else if (state.stage === "project-budget") {
      greetingResponse = `${prefix}Let's finish setting up your quote. What estimated budget or timeline do you have in mind for this project?`;
    } else if (state.stage === "lead-name") {
      greetingResponse = `${prefix}Let's finish setting up your quote. To put together a customized proposal and schedule a quick 10-minute call, what's your name?`;
    } else if (state.stage === "lead-email") {
      greetingResponse = `${prefix}Almost done! What's the best email address to send the proposal to?`;
    } else if (state.stage === "lead-phone") {
      greetingResponse = `${prefix}Last step! What's your phone number (WhatsApp works best for quick updates)? 📞`;
    }

    setHistory(prev => [...prev, { state, messages: messagesBefore }]);
    addMessage({
      sender: "bot",
      text: greetingResponse,
      options: getOptionsForState(state)
    });
  };
 
  const transitionToCategory = (categoryName: string, prevState: ChatbotState, prevMessages: Message[]) => {
    setHistory(prev => [...prev, { state: prevState, messages: prevMessages }]);
    const nextState: ChatbotState = {
      ...prevState,
      stage: "category-select",
      selectedCategory: categoryName
    };
    setChatState(nextState);
    
    let text = "";
    if (categoryName === "Website Development") {
      text = "🌐 **Website Development**\n\nWe build fast corporate sites, custom e-commerce stores, easy-to-edit WordPress layouts, and high-performance React/Next.js frontends.\n\nWhich website service would you like to check out? 😊";
    } else if (categoryName === "App Development") {
      text = "📱 **App Development**\n\nWe design and build custom iOS/Android apps, web applications, SaaS platforms, custom CRM portals, and dashboards.\n\nWhich app development service fits your project best? 😊";
    } else if (categoryName === "AI & Automation") {
      text = "🤖 **AI & Automation**\n\nWe help automate your operations! We build custom AI chatbots, set up WhatsApp Business automation, connect workflows (Zapier/Make), and build automated sales follow-up systems.\n\nWhat would you like to automate? 😊";
    } else if (categoryName === "Digital Marketing") {
      text = "📈 **Digital Marketing**\n\nLet's get more leads and sales! We manage Google Search Ads, Meta (Facebook & Instagram) ads, LinkedIn campaigns, SEO, and social media branding.\n\nWhat are your marketing goals? 😊";
    }
    
    addMessage({
      sender: "bot",
      text,
      options: getOptionsForState(nextState)
    });
  };

  const processInput = async (
    text: string,
    prevState: ChatbotState,
    prevMessages: Message[]
  ) => {
    setIsTyping(false);
    const val = text.trim();
    const valLower = val.toLowerCase();

    // 1. Check for back/menu/contact-page commands globally
    if (val === "📬 Contact Page" || valLower === "contact page") {
      router.push("/contact");
      setIsOpen(false);
      return;
    }

    if (valLower === "back" || valLower === "go back" || val === "👈 Back") {
      if (history.length > 0) {
        const lastItem = history[history.length - 1];
        setHistory(prev => prev.slice(0, -1));
        setChatState(lastItem.state);
        setMessages(lastItem.messages);
        return;
      }
    }
    
    if (valLower === "menu" || valLower === "main menu" || val === "🔙 Main Menu" || val === "🔄 Start New Inquiry") {
      setHistory([]);
      const startState: ChatbotState = {
        stage: "start",
        selectedCategory: null,
        selectedServiceKey: null,
        projectGoal: null,
        projectBudget: null,
      };
      setChatState(startState);
      setMessages([
        {
          id: "1",
          sender: "bot",
          text: "Hi! Welcome to Clever Crow. 😊 I can help you explore our services, get a quick project estimate, or put you in touch with our team.\n\nWhat can we build or grow for you today? 🐦",
          options: getOptionsForState(startState)
        }
      ]);
      return;
    }

    const pushToHistory = () => {
      setHistory(prev => [...prev, { state: prevState, messages: prevMessages }]);
    };

    // 2. State-based processing
    switch (prevState.stage) {
      case "start": {
        const matched = matchInputToNavigation(val);
        if (matched) {
          if (matched.type === "general" && matched.key === "greeting") {
            handleGreeting(val, prevState, prevMessages);
            return;
          }
          if (matched.type === "category") {
            transitionToCategory(matched.key, prevState, prevMessages);
            return;
          }
          if (matched.type === "service") {
            pushToHistory();
            const service = CHATBOT_SERVICES[matched.key];
            const nextState: ChatbotState = {
              ...prevState,
              stage: "service-details",
              selectedCategory: service.category,
              selectedServiceKey: matched.key
            };
            setChatState(nextState);
            addMessage({
              sender: "bot",
              text: `I noticed you're asking about **${service.title}**.\n\n${service.description}\n\n**Key features & outcomes:**\n${service.highlights.map(h => `• ${h}`).join("\n")}`,
              options: getOptionsForState(nextState)
            });
            return;
          }
          if (matched.type === "general") {
            handleGeneralFAQ(matched.key, val, prevState, prevMessages);
            return;
          }
        }

        if (val.includes("Website Development")) {
          transitionToCategory("Website Development", prevState, prevMessages);
          return;
        }
        if (val.includes("App Development")) {
          transitionToCategory("App Development", prevState, prevMessages);
          return;
        }
        if (val.includes("AI & Automation")) {
          transitionToCategory("AI & Automation", prevState, prevMessages);
          return;
        }
        if (val.includes("Digital Marketing")) {
          transitionToCategory("Digital Marketing", prevState, prevMessages);
          return;
        }
        if (val.includes("Quick Connect") || valLower.includes("connect")) {
          pushToHistory();
          const nextState: ChatbotState = {
            ...prevState,
            stage: "project-goal"
          };
          setChatState(nextState);
          addMessage({
            sender: "bot",
            text: "Awesome! Let's get a few quick details about your project. What is the main goal of your project or the key features you need? 😊",
            options: getOptionsForState(nextState)
          });
          return;
        }

        addMessage({
          sender: "bot",
          text: "No problem! I can help you explore our services, get custom quotes, or put you in touch with the team. Just click one of the options below: 😊",
          options: getOptionsForState(prevState)
        });
        break;
      }

      case "category-select": {
        const matched = matchInputToNavigation(val);
        if (matched) {
          if (matched.type === "general" && matched.key === "greeting") {
            handleGreeting(val, prevState, prevMessages);
            return;
          }
          if (matched.type === "service") {
            pushToHistory();
            const service = CHATBOT_SERVICES[matched.key];
            const nextState: ChatbotState = {
              ...prevState,
              stage: "service-details",
              selectedCategory: service.category,
              selectedServiceKey: matched.key
            };
            setChatState(nextState);
            addMessage({
              sender: "bot",
              text: `**${service.title}**\n${service.description}\n\n✨ **Here are the key highlights:**\n${service.highlights.map(h => `• ${h}`).join("\n")}`,
              options: getOptionsForState(nextState)
            });
            return;
          }
          if (matched.type === "category" && matched.key !== prevState.selectedCategory) {
            transitionToCategory(matched.key, prevState, prevMessages);
            return;
          }
          if (matched.type === "general") {
            handleGeneralFAQ(matched.key, val, prevState, prevMessages);
            return;
          }
        }

        const foundServiceKey = Object.keys(CHATBOT_SERVICES).find(key => {
          const svc = CHATBOT_SERVICES[key];
          return svc.category === prevState.selectedCategory && val.toLowerCase().includes(svc.title.toLowerCase().substring(0, 15));
        });

        let serviceKey = foundServiceKey;
        if (!serviceKey) {
          const optionNameMap: Record<string, string> = {
            "Business Website": "business-website",
            "E-commerce Website": "ecommerce-website",
            "WordPress Design": "wordpress-design",
            "Custom UI/UX Site": "custom-website-design",
            "Landing Page Dev": "landing-page-dev",
            "React & Next.js": "react-nextjs",
            "Website Redesign": "website-redesign",
            "Website Maintenance": "website-maintenance",
            
            "Mobile App Dev": "mobile-app-dev",
            "Web App Dev": "web-app-dev",
            "SaaS Product Dev": "saas-product-dev",
            "CRM & Dashboards": "crm-dashboards",
            "Booking Systems": "booking-systems",
            "Admin Panels": "admin-panels",
            "Customer Portals": "customer-portals",
            
            "AI Chatbots": "ai-chatbot-dev",
            "WhatsApp Automation": "whatsapp-automation",
            "AI Customer Support": "ai-customer-support",
            "Workflow Automation": "workflow-automation",
            "Sales Follow-Up": "sales-followup",
            "Lead Management": "lead-management",
            
            "Google Ads": "google-ads",
            "Meta Ads (FB & IG)": "meta-ads",
            "LinkedIn Ads": "linkedin-ads",
            "SEO Services": "seo-services",
            "Performance Marketing": "performance-marketing",
            "Lead Gen Campaigns": "lead-gen-campaigns",
            "Social Media Management": "social-media-management"
          };
          const mappedKey = optionNameMap[val];
          if (mappedKey && CHATBOT_SERVICES[mappedKey]) {
            serviceKey = mappedKey;
          }
        }

        if (serviceKey) {
          pushToHistory();
          const service = CHATBOT_SERVICES[serviceKey];
          const nextState: ChatbotState = {
            ...prevState,
            stage: "service-details",
            selectedServiceKey: serviceKey
          };
          setChatState(nextState);
          addMessage({
            sender: "bot",
            text: `**${service.title}**\n${service.description}\n\n✨ **Here are the key highlights:**\n${service.highlights.map(h => `• ${h}`).join("\n")}`,
            options: getOptionsForState(nextState)
          });
          return;
        }

        addMessage({
          sender: "bot",
          text: `Take a look at the services under ${prevState.selectedCategory} or click one of the options below! 😊`,
          options: getOptionsForState(prevState)
        });
        break;
      }

      case "service-details": {
        const matched = matchInputToNavigation(val);
        if (matched) {
          if (matched.type === "general" && matched.key === "greeting") {
            handleGreeting(val, prevState, prevMessages);
            return;
          }
          if (matched.type === "general") {
            handleGeneralFAQ(matched.key, val, prevState, prevMessages);
            return;
          }
          if (matched.type === "service") {
            pushToHistory();
            const service = CHATBOT_SERVICES[matched.key];
            const nextState: ChatbotState = {
              ...prevState,
              stage: "service-details",
              selectedCategory: service.category,
              selectedServiceKey: matched.key
            };
            setChatState(nextState);
            addMessage({
              sender: "bot",
              text: `**${service.title}**\n${service.description}\n\n✨ **Here are the key highlights:**\n${service.highlights.map(h => `• ${h}`).join("\n")}`,
              options: getOptionsForState(nextState)
            });
            return;
          }
        }

        if (valLower.includes("quote") || valLower.includes("get a quote") || valLower.includes("connect")) {
          pushToHistory();
          const nextState: ChatbotState = {
            ...prevState,
            stage: "project-goal"
          };
          setChatState(nextState);
          
          const service = prevState.selectedServiceKey ? CHATBOT_SERVICES[prevState.selectedServiceKey] : null;
          const questionText = service?.customGoalPrompt 
            ? `Awesome choice! 😊 ${service.customGoalPrompt}` 
            : "Awesome choice! 😊 What's the main goal of your project or the key features you're looking to build?";
            
          addMessage({
            sender: "bot",
            text: questionText,
            options: getOptionsForState(nextState)
          });
          return;
        }

        addMessage({
          sender: "bot",
          text: "Would you like to get a customized quote for this service, or go back to look at other options? 😊",
          options: getOptionsForState(prevState)
        });
        break;
      }

      case "project-goal": {
        const matched = matchInputToNavigation(val);
        if (matched && matched.type === "general" && matched.key === "greeting") {
          handleGreeting(val, prevState, prevMessages);
          return;
        }
        pushToHistory();
        const nextState: ChatbotState = {
          ...prevState,
          stage: "project-budget",
          projectGoal: val
        };
        setChatState(nextState);
        addMessage({
          sender: "bot",
          text: "Got it! 👌 What estimated budget or timeline do you have in mind for this project?",
          options: getOptionsForState(nextState)
        });
        break;
      }

      case "project-budget": {
        const matched = matchInputToNavigation(val);
        if (matched && matched.type === "general" && matched.key === "greeting") {
          handleGreeting(val, prevState, prevMessages);
          return;
        }
        pushToHistory();
        const nextState: ChatbotState = {
          ...prevState,
          stage: "lead-name",
          projectBudget: val
        };
        setChatState(nextState);
        addMessage({
          sender: "bot",
          text: "Perfect! 😊 To put together a customized proposal and schedule a quick 10-minute call, what's your name?",
          options: getOptionsForState(nextState)
        });
        break;
      }

      case "lead-name": {
        const matched = matchInputToNavigation(val);
        if (matched && matched.type === "general" && matched.key === "greeting") {
          handleGreeting(val, prevState, prevMessages);
          return;
        }
        if (!validateName(val)) {
          addMessage({
            sender: "bot",
            text: "Could you enter a valid name? (Just need at least 2 characters) 😊",
            options: getOptionsForState(prevState)
          });
          return;
        }
        pushToHistory();
        setUserData(prev => ({ ...prev, name: val }));
        const nextState: ChatbotState = {
          ...prevState,
          stage: "lead-email"
        };
        setChatState(nextState);
        addMessage({
          sender: "bot",
          text: `Nice to meet you, ${val}! 😊 What's the best email address to send the proposal to?`,
          options: getOptionsForState(nextState)
        });
        break;
      }

      case "lead-email": {
        const matched = matchInputToNavigation(val);
        if (matched && matched.type === "general" && matched.key === "greeting") {
          handleGreeting(val, prevState, prevMessages);
          return;
        }
        if (!validateEmail(val)) {
          addMessage({
            sender: "bot",
            text: "Could you double check that email address? It looks like it might be missing a character or two! 😊",
            options: getOptionsForState(prevState)
          });
          return;
        }
        pushToHistory();
        setUserData(prev => ({ ...prev, email: val }));
        const nextState: ChatbotState = {
          ...prevState,
          stage: "lead-phone"
        };
        setChatState(nextState);
        addMessage({
          sender: "bot",
          text: "Perfect. And what's your phone number (WhatsApp works best for quick updates)? 📞",
          options: getOptionsForState(nextState)
        });
        break;
      }

      case "lead-phone": {
        const matched = matchInputToNavigation(val);
        if (matched && matched.type === "general" && matched.key === "greeting") {
          handleGreeting(val, prevState, prevMessages);
          return;
        }
        if (!validatePhone(val)) {
          addMessage({
            sender: "bot",
            text: "Could you double check your phone number? (Make sure to include your country code if you're outside India) 📞",
            options: getOptionsForState(prevState)
          });
          return;
        }
        
        setIsTyping(true);
        
        const serviceName = prevState.selectedServiceKey 
          ? CHATBOT_SERVICES[prevState.selectedServiceKey].title 
          : "General Business Connect";

        const finalMessageText = `Goal: ${prevState.projectGoal || "N/A"}\nBudget/Timeline: ${prevState.projectBudget || "N/A"}`;
        
        const payload = {
          name: userData.name,
          email: userData.email,
          phone: val,
          message: finalMessageText,
          service: serviceName,
          source: "AI Chatbot"
        };

        const result = await submitLead(payload);
        
        setIsTyping(false);

        if (result.success) {
          pushToHistory();
          const nextState: ChatbotState = {
            ...prevState,
            stage: "completed"
          };
          setChatState(nextState);
          addMessage({
            sender: "bot",
            text: `Awesome, thanks ${userData.name}! 🙌 I've sent your details directly to our developers and consultants.\n\nWe will review your project details and get back to you within 24 hours. Talk soon! 🚀\n\nIs there anything else I can help you with today?`,
            options: getOptionsForState(nextState)
          });
        } else {
          addMessage({
            sender: "bot",
            text: "Oops, something went wrong while submitting. Please try again or call us directly at +91 99863 89444.",
            options: getOptionsForState(prevState)
          });
        }
        break;
      }

      case "completed": {
        setHistory([]);
        const startState: ChatbotState = {
          stage: "start",
          selectedCategory: null,
          selectedServiceKey: null,
          projectGoal: null,
          projectBudget: null,
        };
        setChatState(startState);
        addMessage({
          sender: "bot",
          text: "Hi! I'm the Clever Crow AI. 🐦\n\nWhat can we build or grow for you today?",
          options: getOptionsForState(startState)
        });
        break;
      }
    }
  };

  const handleOptionClick = (option: string) => handleSend(option);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="fixed bottom-[80px] left-4 right-4 sm:left-auto sm:bottom-[100px] sm:right-6 z-[9999] w-auto sm:w-[340px] md:w-[380px] max-w-[calc(100vw-2rem)] h-[70dvh] sm:h-[32rem] md:h-[36rem] max-h-[650px] flex flex-col rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_25px_60px_rgba(15,23,42,0.12)] overflow-hidden font-sans"
          >
            {/* Cybernetic Aura Background */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <div className="absolute top-[-10%] left-[-20%] w-[160px] h-[160px] bg-blue-400/5 rounded-full blur-[65px]" />
              <div className="absolute bottom-[-10%] right-[-20%] w-[180px] h-[180px] bg-amber-400/5 rounded-full blur-[80px]" />
            </div>

            {/* Header - Compact High Tech Glass */}
            <div className="relative p-4 flex justify-between items-center bg-slate-50/60 backdrop-blur-md border-b border-slate-200/60 z-10">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <AnimatedBot isSpeaking={isTyping} className="w-10 h-10" expression={currentExpression} />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-800 tracking-tight leading-none mb-1">Clever Crow AI</h3>
                  <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest leading-none">Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 border border-slate-200/40 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            
            {/* Chat Area */}
            <div className="relative flex-1 overflow-y-auto p-4 space-y-4 bg-transparent z-10 scrollbar-hide">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} items-end gap-2`}
                >
                  <div
                    className={`px-4 py-2.5 text-sm leading-relaxed font-semibold ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 rounded-2xl rounded-tr-sm shadow-sm"
                        : "bg-slate-100 border border-slate-200/80 text-slate-800 rounded-2xl rounded-tl-sm shadow-sm"
                    }`}
                    style={{ maxWidth: '88%' }}
                  >
                    {msg.sender === "user" ? (
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    ) : (
                      <div className="space-y-2">
                        <div className="whitespace-pre-wrap">
                          {parseMarkdown(msg.text, (url) => {
                            router.push(url);
                            setIsOpen(false);
                          })}
                        </div>
                        {msg.cta && (
                          <div className="pt-2">
                            <button
                              onClick={() => {
                                router.push(msg.cta!.url);
                                setIsOpen(false);
                              }}
                              className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-zinc-950 text-xs font-bold rounded-xl shadow-[0_4px_12px_rgba(245,158,11,0.2)] transition-all duration-300 transform active:scale-95 cursor-pointer"
                            >
                              📬 {msg.cta.text}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start items-end gap-2">
                  <div className="px-4 py-3 bg-slate-100 border border-slate-200/80 rounded-2xl rounded-tl-sm flex items-center">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <div 
                          key={i} 
                          className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" 
                          style={{ animationDelay: `${i * 0.15}s` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {!isTyping && messages[messages.length - 1]?.options && messages[messages.length - 1].sender === "bot" && (
                <div className="flex flex-wrap gap-2 mt-2 z-10 relative">
                  {messages[messages.length - 1].options?.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(opt)}
                      className="text-xs font-bold bg-white border border-slate-200 hover:border-amber-500/50 hover:bg-amber-500 hover:text-zinc-950 text-slate-700 px-3.5 py-2 rounded-full transition-all duration-300 shadow-sm"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input - Compact Glass */}
            <div className="relative p-3 bg-slate-50/80 backdrop-blur-md border-t border-slate-200/60 z-10">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }} className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isTyping}
                  placeholder="Type a message..."
                  className="w-full pl-4 pr-12 py-3 bg-white border border-slate-200 rounded-full text-xs sm:text-sm font-semibold focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 text-slate-800 placeholder-slate-400 transition-all"
                />
                <button 
                  type="submit" 
                  disabled={!inputValue.trim() || isTyping} 
                  className="absolute right-1.5 top-1.5 w-9 h-9 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 flex items-center justify-center disabled:opacity-30 transition-transform active:scale-90 shadow-sm"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[10000] flex items-center justify-end">
        {/* Periodic Speak Message Bubble */}
        <AnimatePresence>
          {bubbleText && !isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20, y: "-50%" }}
              animate={{ opacity: 1, scale: 1, x: 0, y: "-50%" }}
              exit={{ opacity: 0, scale: 0.8, x: 20, y: "-50%" }}
              className="absolute right-[112px] sm:right-[132px] top-1/2 bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-[0_8px_25px_rgba(15,23,42,0.08)] px-4 py-2.5 rounded-2xl rounded-br-none text-slate-800 text-xs sm:text-sm font-bold whitespace-nowrap z-[10001] pointer-events-none select-none"
            >
              {bubbleText}
              {/* Tooltip Arrow pointing to the Chatbot trigger button */}
              <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-r border-b border-slate-200/80 rotate-[-45deg] z-[10002]" />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center transition-all duration-500 hover:scale-110 focus:outline-none rounded-full relative ${
            isOpen 
              ? "w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] border bg-white border-slate-200 shadow-lg" 
              : "w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] bg-transparent border-none shadow-none"
          }`}
        >
          {isOpen ? (
            <X size={24} className="text-slate-600" />
          ) : (
            <div className="relative flex items-center justify-center w-[84px] h-[84px] sm:w-[102px] sm:h-[102px] p-0">
              <AnimatedBot isSpeaking={isTriggerSpeaking} className="w-full h-full" animate={true} expression={bubbleExpression} />
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)] z-20"></span>
            </div>
          )}
        </button>
      </div>
    </>
  );
}
