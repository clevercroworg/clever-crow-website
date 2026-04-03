"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface CaseStudy {
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
}

const caseStudies: CaseStudy[] = [
  {
    id: "bgs",
    title: "BGS Global Institute",
    category: "Education",
    location: "Bangalore",
    result: "₹2.4 Cr Revenue",
    growth: "+25% Admissions",
    tags: ["Google Ads", "Lead Generation"],
    duration: "3 Month Campaign",
    summary: "To drive admission enquiries, we structured search and display campaigns around program keywords and campus location intent. With weekly A/B testing on ad copy and landing pages, CPL dropped steadily while qualified leads climbed, culminating in a measurable lift in confirmed admissions and tuition revenue.",
    image: "/landing-page/google-ads/case-studies/bgs-global.jpg"
  },
  {
    id: "ashray",
    title: "Ashray Developers",
    category: "Real Estate",
    location: "Bangalore",
    result: "₹1.2 Cr Revenue",
    growth: "+40% Conversion",
    tags: ["Real Estate Leads", "Search + Display"],
    duration: "Quarterly Push",
    summary: "We mapped campaigns to the project’s micro-markets and intent tiers (search, display remarketing). By syncing form fills with instant WhatsApp follow-ups, the team shortened response times and improved show-up rates, translating into stronger conversion efficiency and revenue.",
    image: "/landing-page/google-ads/case-studies/ashray.jpg"
  },
  {
    id: "ddc",
    title: "DDC Smiles",
    category: "Healthcare / Dental",
    location: "Bangalore",
    result: "+310% Patient Leads",
    growth: "ROI 5.2×",
    tags: ["Local Search Ads", "30 Days"],
    duration: "30 Day Sprint",
    summary: "Focusing on “near me” and treatment-specific search themes, we built a tightly geofenced campaign to capture local patients. Streamlined landing pages with proof elements and call extensions nudged more prospects to book, lifting lead volume significantly.",
    image: "/landing-page/google-ads/case-studies/ddcsmiles.jpg"
  },
  {
    id: "urban",
    title: "Urban Invisible Grills",
    category: "Home Safety",
    location: "Bangalore",
    result: "45 Leads",
    growth: "₹25K Spend",
    tags: ["Google Ads", "Local Lead Campaign"],
    duration: "Ongoing Campaign",
    summary: "We targeted homeowners in high-rise clusters with high-intent queries and call-based extensions. A simple, trust-first landing experience helped convert cautious buyers into booked site visits, keeping CPL within target.",
    image: "/landing-page/google-ads/case-studies/urban-grills.jpg"
  },
  {
    id: "hyra",
    title: "Hyra Healthcare",
    category: "Healthcare",
    location: "Hyderabad",
    result: "₹35 L Revenue",
    growth: "+175% Enquiries",
    tags: ["Search + Display", "30 Days"],
    duration: "30 Day Launch",
    summary: "By separating branded, generic, and competitor themes, we maintained strong impression share across categories. Creative testing and remarketing to page viewers created a steady pipeline of qualified enquiries.",
    image: "/landing-page/google-ads/case-studies/hyra-healthcare.jpg"
  },
  {
    id: "ravi",
    title: "Ravi Traders",
    category: "Retail & B2B",
    location: "Hubli",
    result: "₹50 L Sales",
    growth: "+210% Orders",
    tags: ["Performance Max", "45 Days"],
    duration: "45 Day Scale-Up",
    summary: "We used Performance Max with structured product groups and feed hygiene to surface bestsellers efficiently. Layered remarketing and dealer-intent signals delivered a clear jump in order volume within weeks.",
    image: "/landing-page/google-ads/case-studies/ravi-traders.jpg"
  },
  {
    id: "educadd",
    title: "Educadd Rajajinagar",
    category: "Education",
    location: "Bangalore",
    result: "+320 Leads",
    growth: "₹18K Spend",
    tags: ["Lead Ads", "20 Days"],
    duration: "20 Day Sprint",
    summary: "Program-specific ad groups captured learners by course intent, while quick-response WhatsApp handoffs increased enrollment conversions. Tight geo and device controls kept spend focused on likely enquirers.",
    image: "/landing-page/google-ads/case-studies/educadd.jpg"
  },
  {
    id: "intergy",
    title: "Intergy Australia",
    category: "Software / SaaS",
    location: "Australia",
    result: "+245% Traffic",
    growth: "ROI 3.4×",
    tags: ["Google Ads", "B2B Lead Campaign"],
    duration: "3 Month Scale",
    summary: "For B2B leads, we aligned campaigns to service lines and buyer roles, adding gated content for higher intent audiences. CRM-integrated tracking let us optimize toward qualified pipeline, not just form fills.",
    image: "/landing-page/google-ads/case-studies/intergy.jpg"
  },
  {
    id: "interior",
    title: "Interior Buildouts",
    category: "Construction",
    location: "USA",
    result: "+300% Leads",
    growth: "Cost/Lead ↓40%",
    tags: ["Search + Display", "US Market"],
    duration: "US Expansion",
    summary: "We captured commercial fit-out demand with location-modified queries and remarketed to specifiers. Simplified contact flows helped turn more quote requests into booked consultations.",
    image: "/landing-page/google-ads/case-studies/interior-buildouts.jpg"
  }
];

type SuccessStoriesProps = {
  data?: CaseStudy[];
  title?: string;
  subtitle?: string;
};

export default function SuccessStories({ data, title, subtitle }: SuccessStoriesProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const displayCaseStudies = data ?? caseStudies;
  const marqueeItems = [...displayCaseStudies, ...displayCaseStudies];
  const selectedCase = displayCaseStudies.find(cs => cs.id === selectedId);

  const displayTitle = title ?? "Google Ads Success Stories";
  const displaySubtitle = subtitle ?? "Real campaigns, real data, and proven growth for businesses scaling with Clever Crow.";

  return (
    <section id="case-studies" className="bg-slate-50 py-16 sm:py-24 overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {displayTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          {displaySubtitle}
        </p>
      </div>

      <div 
        className="relative flex overflow-hidden py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
           animate={!isPaused ? { x: ["0%", "-50%"] } : {}}
           transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
           className="flex gap-8 whitespace-nowrap px-4"
        >
          {marqueeItems.map((cs, index) => (
            <motion.div
              key={`${cs.id}-${index}`}
              onClick={() => setSelectedId(cs.id)}
              className="flex-shrink-0 w-[350px] sm:w-[400px] cursor-pointer rounded-2xl bg-white shadow-md overflow-hidden border border-slate-100/50 hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="relative h-48 w-full">
                <Image 
                  src={cs.image} 
                  alt={cs.title} 
                  fill 
                  className="object-cover"
                  unoptimized={true}
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold text-slate-900 shadow-sm backdrop-blur-sm uppercase">{cs.category}</span>
                </div>
              </div>
              <div className="p-6 whitespace-normal text-left">
                <div className="flex items-center justify-between mb-3 gap-2">
                  <h3 className="text-base font-bold text-slate-900 truncate">{cs.title}</h3>
                  <div className="flex items-center text-[10px] font-semibold text-slate-500 whitespace-nowrap">
                    <svg className="mr-1 h-3 w-3 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /></svg>
                    {cs.location}
                  </div>
                </div>
                <div className="mb-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{cs.result}</span>
                    <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">{cs.growth}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">{cs.tags.join(" · ")}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <span className="text-[10px] font-medium text-slate-400">{cs.duration}</span>
                  <button className="flex items-center text-[10px] font-bold text-[#f4c542] hover:underline">Know More<svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10" />
      </div>

      <AnimatePresence>
        {selectedId && selectedCase && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedId(null)} className="absolute inset-0 bg-[#0B1120]/80 backdrop-blur-md" />
            <motion.div layoutId={selectedId} className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
              <button onClick={() => setSelectedId(null)} className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md hover:bg-black/40 transition-colors" aria-label="Close"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              <div className="relative h-64 w-full">
                <Image 
                  src={selectedCase.image} 
                  alt={selectedCase.title} 
                  fill 
                  className="object-cover" 
                  unoptimized={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-8 right-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center rounded-full bg-[#f4c542] px-3 py-1 text-[10px] font-bold text-black uppercase tracking-wider">{selectedCase.category}</span>
                    <span className="text-xs font-medium text-white/90">{selectedCase.location}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{selectedCase.title}</h3>
                </div>
              </div>
              <div className="p-8 pb-10"><div className="grid grid-cols-2 gap-4 mb-8"><div className="rounded-2xl bg-slate-50 p-4 border border-slate-100"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Key Result</p><p className="text-xl font-bold text-slate-900">{selectedCase.result}</p></div><div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-100"><p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Growth</p><p className="text-xl font-bold text-emerald-700">{selectedCase.growth}</p></div></div><div className="mb-8"><h4 className="text-slate-900 text-sm font-bold mb-3 uppercase tracking-wider">Campaign Overview</h4><p className="text-slate-600 leading-relaxed italic text-sm">"{selectedCase.summary}"</p></div><div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100">{selectedCase.tags.map(tag => (<span key={tag} className="text-[9px] font-bold text-slate-400 uppercase tracking-widest border border-slate-200 rounded-full px-3 py-1">{tag}</span>))}<span className="ml-auto text-[10px] font-medium text-slate-400">{selectedCase.duration}</span></div></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
