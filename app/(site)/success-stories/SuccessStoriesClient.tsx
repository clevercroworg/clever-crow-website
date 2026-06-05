"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

/* ───────────────────────── DATA ───────────────────────── */

type Category = "google" | "meta" | "seo";

interface CaseStudy {
  id: string;
  category: Category;
  name: string;
  platform: string;
  industry: string;
  location: string;
  result: string;
  badge: string;
  period: string;
  image: string;
  description: string;
}

const cases: CaseStudy[] = [
  { id: "modalBGS", category: "google", name: "BGS Global Institute", platform: "Google Ads", industry: "Education", location: "Bangalore", result: "₹2.4 Cr Revenue", badge: "+25% Admissions", period: "3 Month Campaign", image: "/success-stories/case-thumbs/bgs-global.jpg", description: "To drive admission enquiries, we structured search and display campaigns around program keywords and campus location intent. Weekly A/B testing on ad copy and landing pages reduced CPL while qualified leads climbed." },
  { id: "modalAshray", category: "google", name: "Ashray Developers", platform: "Google Ads", industry: "Real Estate", location: "Bangalore", result: "₹1.2 Cr Revenue", badge: "+40% Conversion", period: "Quarterly Push", image: "/success-stories/case-thumbs/ashray.jpg", description: "Campaigns were mapped to micro-markets and intent tiers. Syncing lead forms with quick WhatsApp follow-ups improved response time and on-site visit conversion." },
  { id: "modalDDC", category: "google", name: "DDC Smiles", platform: "Google Ads", industry: "Healthcare / Dental", location: "Bangalore", result: "+310% Patient Leads", badge: "ROI 5.2×", period: "30 Day Sprint", image: "/success-stories/case-thumbs/ddcsmiles.jpg", description: "We focused on near-me and treatment-intent searches with tight geofencing. Trust-led landing pages and call extensions drove more consultations." },
  { id: "modalUrban", category: "google", name: "Urban Invisible Grills", platform: "Google Ads", industry: "Home Safety", location: "Bangalore", result: "45 Leads", badge: "₹25K Spend", period: "Ongoing Campaign", image: "/success-stories/case-thumbs/urban-grills.jpg", description: "High-intent queries and call extensions targeted homeowners in high-rise clusters. A trust-first landing flow helped maintain lead quality within CPL targets." },
  { id: "modalHyra", category: "google", name: "Hyra Healthcare", platform: "Google Ads", industry: "Healthcare", location: "Hyderabad", result: "₹35 L Revenue", badge: "+175% Enquiries", period: "30 Day Launch", image: "/success-stories/case-thumbs/hyra-healthcare.jpg", description: "Branded, generic, and competitor campaign separation protected impression share. Creative testing and remarketing built a consistent enquiry pipeline." },
  { id: "modalRavi", category: "google", name: "Ravi Traders", platform: "Google Ads", industry: "Retail & B2B", location: "Hubli", result: "₹50 L Sales", badge: "+210% Orders", period: "45 Day Scale-Up", image: "/success-stories/case-thumbs/ravi-traders.jpg", description: "Performance Max with clean feeds surfaced high-performing products. Remarketing and dealer-intent audience layers produced rapid order growth." },
  { id: "modalEducadd", category: "google", name: "Educadd Rajajinagar", platform: "Google Ads", industry: "Education", location: "Bangalore", result: "+320 Leads", badge: "₹18K Spend", period: "20 Day Sprint", image: "/success-stories/case-thumbs/educadd.jpg", description: "Course-specific ad groups captured learners by intent, while quick-response WhatsApp handoffs lifted enrollment conversion rates." },
  { id: "modalIntergy", category: "google", name: "Intergy Australia", platform: "Google Ads", industry: "Software / SaaS", location: "Australia", result: "+245% Traffic", badge: "+3.4× ROI", period: "3 Month Scale", image: "/success-stories/case-thumbs/intergy.jpg", description: "B2B campaigns aligned by service lines and buyer roles. CRM-integrated conversion tracking shifted optimization toward qualified pipeline." },
  { id: "modalInterior", category: "google", name: "Interior Buildouts", platform: "Google Ads", industry: "Construction", location: "USA", result: "+300% Leads", badge: "Cost/Lead ↓40%", period: "US Expansion", image: "/success-stories/case-thumbs/interior-buildouts.jpg", description: "Location-modified demand capture and remarketing to specifiers improved quote-to-consultation conversion at lower acquisition costs." },
  { id: "modalBaatu", category: "meta", name: "Baatu", platform: "Meta Ads", industry: "E-Commerce", location: "India", result: "₹25 L Revenue", badge: "+120% Conversion", period: "2 Month Scale", image: "/success-stories/case-thumbs/baatu.jpg", description: "Reels-first creative and catalog retargeting improved add-to-cart rates. Frequency controls helped scale without hurting ROAS." },
  { id: "modalWPU", category: "meta", name: "Wedding Planning Unzipped", platform: "Meta Ads", industry: "Events", location: "USA", result: "₹8.9 L Revenue", badge: "+190% Conversion", period: "21 Day Sprint", image: "/success-stories/case-thumbs/wedding.jpg", description: "Lead forms combined with testimonial creatives captured prospects early. Automated follow-up improved speed-to-qualification." },
  { id: "modalAesthetic", category: "meta", name: "Aesthetic Image", platform: "Meta Ads", industry: "Beauty & Education", location: "India", result: "₹25 L Revenue", badge: "+120% Conversion", period: "Multi-Creative Test", image: "/success-stories/case-thumbs/aesthetic.jpg", description: "Influencer-style creatives and educational hooks built trust. Sequential retargeting nudged users from awareness to purchase and sign-up." },
  { id: "modalLon", category: "meta", name: "Lon Retreat", platform: "Meta Ads", industry: "Hospitality", location: "Australia", result: "+4.2× ROI", badge: "Meta Reels", period: "Always-On", image: "/success-stories/case-thumbs/lonretreat.jpg", description: "Destination visuals and reels grew awareness while mid-funnel remarketing nudged booking checks without heavy discounting." },
  { id: "modalTerranea", category: "meta", name: "Terranea Resort", platform: "Meta Ads", industry: "Luxury Hospitality", location: "USA", result: "+3.5× ROI", badge: "Engagement ↑80%", period: "Seasonal Bursts", image: "/success-stories/case-thumbs/terranea.jpg", description: "Seasonal creatives and high-value lookalike segments improved reach efficiency while preserving premium brand perception." },
  { id: "modalAnatomy", category: "meta", name: "Anatomy Fitness", platform: "Meta Ads", industry: "Fitness", location: "India", result: "+280% Leads", badge: "CPL ↓32%", period: "Lead Burst", image: "/success-stories/case-thumbs/anatomyfitness.jpg", description: "Short-form transformation creatives and trial offers increased lead intent. Instant WhatsApp replies improved appointment conversion." },
  { id: "modalBDarts", category: "meta", name: "British Darts", platform: "Meta Ads", industry: "Sports E-Commerce", location: "UK", result: "+5.1× ROAS", badge: "+220% Orders", period: "International Scale", image: "/success-stories/case-thumbs/britishdarts.jpg", description: "Creator-led demos plus dynamic product retargeting helped scale orders across international markets with controlled frequency." },
  { id: "modalBella", category: "meta", name: "Bella Lash", platform: "Meta Ads", industry: "Beauty Brand", location: "USA", result: "+180% Sales", badge: "ROAS 3.9×", period: "Always-On", image: "/success-stories/case-thumbs/bellalash.jpg", description: "UGC-style creative and bundle-led offers lifted AOV. Refreshing top-performing angles minimized fatigue and kept conversion stable." },
  { id: "modalGato", category: "meta", name: "Gato Dates", platform: "Meta Ads", industry: "Organic Foods", location: "GCC", result: "+320% Revenue", badge: "ROAS 4.6×", period: "Cross-Border Scale", image: "/success-stories/case-thumbs/gato.jpg", description: "Localized messaging and seasonal delivery tuning for GCC buyers improved purchase intent and repeat sales." },
  { id: "modalAlchemist", category: "seo", name: "Alchemist PharmaRx", platform: "SEO", industry: "Pharma Manufacturing", location: "Florida, USA", result: "+210% Organic Traffic", badge: "Top 10 Rankings", period: "4 Month SEO", image: "/success-stories/case-thumbs/alchemist.jpg", description: "Technical SEO cleanup and capability-first information architecture improved crawl efficiency and ranking depth for high-intent terms." },
  { id: "modalLakeview", category: "seo", name: "Lakeview Health", platform: "SEO", industry: "Healthcare / Recovery", location: "USA", result: "+180% Organic Leads", badge: "#1 Rehab Terms", period: "Content-Led SEO", image: "/success-stories/case-thumbs/lakeview.jpg", description: "Content pillars and local optimization improved lead quality and reduced seasonality swings in organic demand." },
  { id: "modalGateway", category: "seo", name: "Gateway Foundation", platform: "SEO", industry: "Healthcare", location: "USA", result: "+230% Visitors", badge: "Top SERP Results", period: "Authority Building", image: "/success-stories/case-thumbs/gateway.jpg", description: "Crawl optimization and duplicate-content consolidation unlocked scalable growth. Relevant authority links supported difficult keyword wins." },
  { id: "modalJumeirah", category: "seo", name: "Jumeirah Group", platform: "SEO", industry: "Hospitality / Hotels", location: "UAE", result: "+300% Organic Reach", badge: "Luxury SEO", period: "Global SEO", image: "/success-stories/case-thumbs/jumeirah.jpg", description: "Localized market pages and Core Web Vitals improvements increased visibility for premium hospitality keyword sets." },
  { id: "modalExotel", category: "seo", name: "Exotel", platform: "SEO", industry: "SaaS / Cloud", location: "NCR, India", result: "+260% Keywords", badge: "Rank #1 CX SaaS", period: "Topic Clusters", image: "/success-stories/case-thumbs/exotel.jpg", description: "Product-led topical clusters and technical hygiene expanded keyword coverage and demo-intent organic sessions." },
  { id: "modalTriveni", category: "seo", name: "Triveni Group", platform: "SEO", industry: "Engineering / Industrial", location: "India", result: "+175% Organic Visitors", badge: "#1 Industry Terms", period: "B2B SEO", image: "/success-stories/case-thumbs/triveni.jpg", description: "Taxonomy redesign and high-intent solution-page optimization improved visibility in technical B2B search categories." },
];

const categoryPlaybook: Record<Category, { objective: string; strategy: string[]; channels: string[] }> = {
  google: {
    objective: "Capture high-intent demand, lower acquisition cost, and increase qualified pipeline.",
    strategy: [
      "Segment campaigns by intent tier (brand, generic, competitor, and remarketing).",
      "Tighten landing page relevance with offer-message match and trust elements.",
      "Weekly query mining and bid/budget reallocation based on lead quality signals.",
    ],
    channels: ["Search", "Performance Max", "Display Remarketing", "Call Extensions"],
  },
  meta: {
    objective: "Scale awareness-to-conversion journeys with creative-led audience testing.",
    strategy: [
      "Structure full-funnel campaigns with distinct creative for prospecting and retargeting.",
      "Rotate hooks, formats, and offers to control fatigue and maintain conversion velocity.",
      "Use event-quality optimization and audience exclusions to improve efficiency.",
    ],
    channels: ["Meta Feed", "Instagram Reels", "Lead Forms", "Dynamic Retargeting"],
  },
  seo: {
    objective: "Grow non-paid pipeline with stronger ranking depth and conversion-focused organic traffic.",
    strategy: [
      "Prioritize technical SEO hygiene (indexing, internal links, and page speed foundations).",
      "Map content clusters to buying intent stages and strengthen topical authority.",
      "Track ranking movement with on-page refresh cycles and link-quality expansion.",
    ],
    channels: ["Technical SEO", "Content Clusters", "On-Page Optimization", "Authority Links"],
  },
};

const badgeByCategory: Record<Category, string> = {
  google: "bg-red-50 text-red-700",
  meta: "bg-sky-50 text-sky-700",
  seo: "bg-emerald-50 text-emerald-700",
};

function getBenchmarksForIndustry(industry: string) {
  const ref = industry.toLowerCase();
  if (ref.includes("education")) return [{ label: "Lead to Admission", value: "8-16%" }, { label: "Cost per Lead", value: "₹350-₹1,200" }, { label: "Peak Window", value: "45-90 days" }];
  if (ref.includes("real estate") || ref.includes("construction")) return [{ label: "MQL Rate", value: "18-35%" }, { label: "Cost per Lead", value: "₹900-₹3,500" }, { label: "Site Visit Rate", value: "12-24%" }];
  if (ref.includes("healthcare") || ref.includes("dental")) return [{ label: "Call/Lead Rate", value: "10-22%" }, { label: "Booking Rate", value: "20-38%" }, { label: "Cost per Lead", value: "₹250-₹1,100" }];
  if (ref.includes("e-commerce") || ref.includes("retail") || ref.includes("beauty") || ref.includes("organic")) return [{ label: "ROAS Range", value: "2.5x-5.0x" }, { label: "Add-to-Cart Rate", value: "4-9%" }, { label: "Repeat Buyers", value: "12-28%" }];
  if (ref.includes("hospitality") || ref.includes("events")) return [{ label: "Inquiry Rate", value: "7-15%" }, { label: "Booking Window", value: "14-45 days" }, { label: "Retargeting Lift", value: "+20-55%" }];
  if (ref.includes("saas") || ref.includes("software")) return [{ label: "MQL to SQL", value: "20-40%" }, { label: "Demo CTR", value: "2.5-6.5%" }, { label: "Pipeline Lift", value: "+25-80%" }];
  return [{ label: "Conversion Lift", value: "+15-45%" }, { label: "Acquisition Cost", value: "-10-35%" }, { label: "Revenue Impact", value: "+20-70%" }];
}

/* ───────────────────────── ICONS ───────────────────────── */

function IconSparkles() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-emerald-300 shrink-0">
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
  );
}

function IconCheckGreen() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5">
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
    </svg>
  );
}

function IconSend() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-emerald-600">
      <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
    </svg>
  );
}

function IconApps() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clipRule="evenodd" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
    </svg>
  );
}

function IconLocation() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
      <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.274 1.765 11.307 11.307 0 00.757.433c.113.058.2.1.281.14l.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
    </svg>
  );
}

function IconPulse() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>
  );
}

function GoogleG() {
  return (
    <span
      className="inline-block font-extrabold text-lg leading-none"
      style={{
        background: "conic-gradient(#ea4335 0deg 110deg, #fbbc05 110deg 180deg, #34a853 180deg 270deg, #4285f4 270deg 360deg)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      G
    </span>
  );
}

/* stat icons */
function IconCash() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600">
      <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
      <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 16.125V4.875zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clipRule="evenodd" />
    </svg>
  );
}

function IconTrending() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600">
      <path fillRule="evenodd" d="M15.22 6.268a.75.75 0 01.968-.432l5.942 2.28a.75.75 0 01.431.97l-2.28 5.941a.75.75 0 11-1.4-.537l1.63-4.251-1.086.484a11.2 11.2 0 00-5.45 5.173.75.75 0 01-1.199.19L9 12.31l-6.22 6.22a.75.75 0 11-1.06-1.06l6.75-6.75a.75.75 0 011.06 0l3.606 3.605a12.694 12.694 0 015.68-4.974l1.086-.483-4.251-1.632a.75.75 0 01-.432-.968z" clipRule="evenodd" />
    </svg>
  );
}

function IconRocket() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600">
      <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.615 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd" />
      <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
    </svg>
  );
}

function IconPeople() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600">
      <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
    </svg>
  );
}

function IconMeta() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4">
      <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
    </svg>
  );
}

/* ───────────────────────── COMPONENT ───────────────────────── */

export default function SuccessStoriesClient() {
  const [activeCategory, setActiveCategory] = useState<"all" | Category>("all");
  const [modalCase, setModalCase] = useState<CaseStudy | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const filteredCases = activeCategory === "all" ? cases : cases.filter((c) => c.category === activeCategory);

  const openModal = useCallback((c: CaseStudy) => {
    setModalCase(c);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setModalCase(null);
    document.body.style.overflow = "";
  }, []);

  /* close on Escape */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeModal]);

  /* Handle phone click tracking */
  const handlePhoneClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined" && (window as any).gtag_report_conversion) {
      (window as any).gtag_report_conversion("tel:+919986389444");
    } else {
      window.location.href = "tel:+919986389444";
    }
  };

  /* Form submit */
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          source: "success-stories-page",
        }),
      });
      if (res.ok) {
        // Track lead conversion
        if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
          (window as any).gtag("event", "conversion", {
            send_to: "AW-17335403082/YwV4CJ-q_e8YEPq9me49",
          });
        }
        setFormStatus("sent");
        setFormData({ name: "", phone: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  /* modal playbook/benchmarks */
  const playbook = modalCase ? categoryPlaybook[modalCase.category] : null;
  const benchmarks = modalCase ? getBenchmarksForIndustry(modalCase.industry) : [];

  return (
    <main className="success-stories-page">
      {/* ─── HERO + FORM ─── */}
      <section className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 lg:mt-14 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-700 p-7 text-white shadow-lg lg:col-span-8 lg:p-10">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-blue-100">
            <IconSparkles />
            Growth Marketing Partner
          </p>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
            Digital Strategy Meets Performance Marketing
          </h1>
          <p className="mt-4 max-w-3xl text-base text-slate-100 sm:text-lg">
            We partner with established businesses and growing brands to scale leads, revenue, and visibility through measurable digital performance.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {["15+ Years of Experience", "Certified Professionals", "550+ Happy Clients", "Fast Response Support"].map((item) => (
              <p key={item} className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold">
                <IconCheck />
                {item}
              </p>
            ))}
          </div>
        </div>

        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg lg:col-span-4">
          <h2 className="text-xl font-bold">Request a Call Back</h2>
          <p className="mt-2 text-sm text-slate-600">Drop your details and our growth team will contact you shortly.</p>

          <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Enter your name"
              required
              value={formData.name}
              onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              placeholder="Enter your phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={formStatus === "sending"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              <IconSend />
              {formStatus === "sending" ? "Sending..." : formStatus === "sent" ? "Submitted ✓" : "Submit Request"}
            </button>
          </form>

          {formStatus === "sent" && (
            <p className="mt-3 text-sm font-medium text-emerald-600">Thank you! We&apos;ll call you shortly.</p>
          )}
          {formStatus === "error" && (
            <p className="mt-3 text-sm font-medium text-red-600">Something went wrong. Please try again.</p>
          )}

          <p className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-slate-500">
            <IconShield />
            We respect your privacy.
          </p>
        </aside>
      </section>

      {/* ─── STATS ─── */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg">
          <h2 className="text-3xl font-extrabold">Performance That Speaks</h2>
          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
            {[
              { icon: <IconCash />, value: "₹1.2Cr+", label: "Ad Spend Managed" },
              { icon: <IconTrending />, value: "4.7×", label: "Average ROI" },
              { icon: <IconRocket />, value: "250+", label: "Campaigns" },
              { icon: <IconPeople />, value: "180+", label: "Happy Clients" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-slate-50 p-5">
                {stat.icon}
                <p className="mt-2 text-2xl font-extrabold">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CASE STUDIES ─── */}
      <section className="mx-auto mt-4 max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Case Studies</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Success Stories by Platform</h2>
        </div>

        {/* Filter tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {([
            { key: "all" as const, label: "All", icon: <IconApps /> },
            { key: "google" as const, label: "Google Ads", icon: <GoogleG /> },
            { key: "meta" as const, label: "Meta Ads", icon: <IconMeta /> },
            { key: "seo" as const, label: "SEO", icon: <IconSearch /> },
          ]).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveCategory(tab.key)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition ${
                activeCategory === tab.key
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-500 hover:text-blue-700"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCases.map((item) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              style={{ animation: "fadeUp 0.35s ease both" }}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={400}
                  height={170}
                  className="h-[170px] w-full object-cover transition-transform duration-300 group-hover:scale-[1.06]"
                />
                <span className="absolute bottom-3.5 left-3.5 z-[2] inline-flex items-center gap-1 rounded-full border border-white/50 bg-slate-900/50 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                  <IconPulse />
                  {item.platform}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-extrabold leading-snug">{item.name}</h3>
                  {item.category === "google" ? <GoogleG /> : item.category === "meta" ? <IconMeta /> : <IconSearch />}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-1 font-semibold ${badgeByCategory[item.category]}`}>
                    {item.industry}
                  </span>
                  <span className="inline-flex items-center gap-1 text-slate-500">
                    <IconLocation />
                    {item.location}
                  </span>
                </div>
                <p className="mt-4 text-sm font-bold text-slate-900">
                  {item.result}{" "}
                  <span className="ml-1 rounded-md bg-emerald-100 px-2 py-1 text-xs text-emerald-700">{item.badge}</span>
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{item.platform} · {item.period}</span>
                  <button
                    type="button"
                    onClick={() => openModal(item)}
                    className="inline-flex items-center gap-1 text-sm font-bold text-blue-700 hover:text-blue-600"
                  >
                    Know More
                    <IconArrow />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          Results shown are from <strong>3-month+</strong> active campaign windows unless stated otherwise.
        </p>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="mx-auto mb-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-slate-900 px-8 py-12 text-center text-white shadow-lg">
          <h2 className="text-3xl font-extrabold">Your Brand Could Be Our Next Success Story</h2>
          <a
            href="tel:+919986389444"
            onClick={handlePhoneClick}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-amber-600"
          >
            <IconPhone />
            Start a Project
          </a>
        </div>
      </section>

      {/* ─── MODAL ─── */}
      {modalCase && playbook && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 px-4 py-6"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="max-h-[90vh] overflow-y-auto p-5 sm:p-7">
              {/* Header */}
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-extrabold sm:text-2xl">{modalCase.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {modalCase.industry} · {modalCase.location} · {modalCase.platform}
                  </p>
                </div>
                <button type="button" onClick={closeModal} className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100">
                  <IconClose />
                </button>
              </div>

              {/* Image */}
              <Image
                src={modalCase.image}
                alt={modalCase.name}
                width={960}
                height={288}
                className="h-72 w-full rounded-xl object-cover"
              />

              {/* Stats */}
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Primary Outcome</p>
                  <p className="mt-1 text-lg font-extrabold text-slate-900">{modalCase.result}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Performance Lift</p>
                  <p className="mt-1 text-lg font-extrabold text-emerald-700">{modalCase.badge}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Campaign Window</p>
                  <p className="mt-1 text-lg font-extrabold text-slate-900">{modalCase.period}</p>
                </div>
              </div>

              {/* Objective + Strategy */}
              <div className="mt-5 grid gap-5 lg:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">Campaign Objective</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    {playbook.objective} {modalCase.description}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">Execution Strategy</p>
                  <ul className="mt-2 space-y-2 text-sm text-slate-700">
                    {playbook.strategy.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <IconCheckGreen />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Channel Stack */}
              <div className="mt-5 rounded-xl border border-slate-200 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">Channel Stack</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {playbook.channels.map((ch) => (
                    <span key={ch} className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700">
                      {ch}
                    </span>
                  ))}
                </div>
              </div>

              {/* Benchmarks */}
              <div className="mt-5 rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">Indicative Industry Benchmarks</p>
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700">Reference Data</span>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {benchmarks.map((b) => (
                    <div key={b.label} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-xs font-semibold text-slate-500">{b.label}</p>
                      <p className="mt-1 text-base font-extrabold text-slate-900">{b.value}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs text-slate-500">Benchmarks are directional planning ranges for similar industries and markets, not guaranteed outcomes.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── INLINE STYLES ─── */}
      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
