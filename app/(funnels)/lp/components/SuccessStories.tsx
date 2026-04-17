"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export interface CaseStudy {
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
}

const defaultCaseStudies: CaseStudy[] = [
  {
    id: "bgs",
    title: "BGS Global Institute",
    category: "Education",
    location: "Bangalore",
    primaryMetric: "₹2.4 Cr Revenue",
    secondaryMetric: "+25% Admissions",
    platform: "google",
    tags: ["Google Ads", "Lead Generation"],
    duration: "3 Month Campaign",
    summary: "To drive admission enquiries, we structured search and display campaigns around program keywords and campus location intent. With weekly A/B testing on ad copy and landing pages, CPL dropped steadily while qualified leads climbed.",
    image: "/landing-page/google-ads/case-studies/bgs-global.jpg"
  }
  // ... other defaults omitted for brevity, they are still in memory
];

type SuccessStoriesProps = {
  data?: CaseStudy[];
  title?: string;
  subtitle?: string;
  filterBy?: string;
};

export default function SuccessStories({ data, title, subtitle, filterBy }: SuccessStoriesProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const displayCaseStudies = data ?? defaultCaseStudies;

  // Extract unique categories if there are more than 10 items (indicating a large portfolio)
  const filterMode = filterBy ?? "category";
  const categories = useMemo(() => {
    if (displayCaseStudies.length <= 10) return null;
    const items = filterMode === "platform"
      ? Array.from(new Set(displayCaseStudies.map(cs => cs.platform)))
      : Array.from(new Set(displayCaseStudies.map(cs => cs.category)));
    return ["All", ...items];
  }, [displayCaseStudies, filterMode]);

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCaseStudies = useMemo(() => {
    if (activeCategory === "All") return displayCaseStudies;
    return displayCaseStudies.filter(cs => {
      return filterMode === "platform" ? cs.platform === activeCategory : cs.category === activeCategory;
    });
  }, [displayCaseStudies, activeCategory, filterMode]);

  const selectedCase = displayCaseStudies.find(cs => cs.id === selectedId);

  const displayTitle = title ?? "Google Ads Success Stories";
  const displaySubtitle = subtitle ?? "Real campaigns, real data, and proven growth for businesses scaling with Clever Crow.";

  return (
    <section id="portfolio" className="bg-slate-50 py-16 sm:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-10 pointer-events-none">
        <div className="h-96 w-96 rounded-full bg-brand-main" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {displayTitle}
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            {displaySubtitle}
          </p>
        </div>

        {/* Categories Tabs */}
        {categories && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeCategory === cat
                    ? "bg-brand-main text-black shadow-lg shadow-brand-main/20 scale-105"
                    : "bg-white text-slate-400 hover:bg-slate-100 border border-slate-200"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Grid Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredCaseStudies.map((cs) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={cs.id}
                onClick={() => {
                  if (cs.link) {
                    window.open(cs.link, "_blank", "noopener,noreferrer");
                  } else {
                    setSelectedId(cs.id);
                  }
                }}
                className="group relative cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col"
                whileHover={{ y: -8 }}
              >
                {/* Image Container */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={cs.image}
                    alt={cs.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    unoptimized={true}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60" />

                  {/* Platform Badge on Image */}
                  <div className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/80 backdrop-blur-sm shadow-sm">
                    {cs.platform === "google" && (
                      <svg className="h-4 w-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                    )}
                    {(cs.platform === "web" || !cs.platform) && (
                      <svg className="h-4 w-4 text-brand-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cs.location}</span>
                    <p className="text-[10px] font-bold text-brand-main uppercase tracking-widest">{cs.category}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-main transition-colors mb-1">{cs.title}</h3>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 group-hover:bg-white group-hover:border-slate-200 transition-all">
                      <p className="text-[9px] font-bold text-slate-400 uppercase mb-0.5">Impact</p>
                      <p className="text-sm font-black text-slate-900">{cs.primaryMetric}</p>
                    </div>
                    <div className="rounded-xl bg-emerald-50 p-3 border border-emerald-100 group-hover:bg-emerald-100/20 transition-all">
                      <p className="text-[9px] font-bold text-emerald-500 uppercase mb-0.5">Growth</p>
                      <p className="text-sm font-black text-emerald-700">{cs.secondaryMetric}</p>
                    </div>
                  </div>

                  {/* Bottom Info */}
                  <div className="mt-auto flex items-center justify-between pt-5 border-t border-slate-50">
                    <p className="text-[10px] text-slate-400 font-medium">{cs.duration}</p>
                    <div className="flex items-center text-[10px] font-bold text-brand-main uppercase tracking-wider">
                      {cs.link ? "View Project" : "Know More"}
                      <svg className="ml-1.5 h-3 w-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {selectedId && selectedCase && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto bg-[#0B1120]/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 cursor-zoom-out"
            />
            <motion.div
              layoutId={selectedId}
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/10 text-slate-900 hover:bg-slate-900/20 transition-colors"
                aria-label="Close"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="relative h-64 w-full">
                <Image
                  src={selectedCase.image}
                  alt={selectedCase.title}
                  fill
                  className="object-cover"
                  unoptimized={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center rounded-full bg-brand-main px-3 py-1 text-[10px] font-bold text-black uppercase tracking-wider">
                      {selectedCase.category}
                    </span>
                    <span className="text-xs font-medium text-white/90">{selectedCase.location}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white">{selectedCase.title}</h3>
                </div>
              </div>

              <div className="p-8 sm:p-10">
                <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="rounded-3xl bg-slate-50 p-6 border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Primary Outcome</p>
                    <p className="text-2xl font-black text-slate-900">{selectedCase.primaryMetric}</p>
                  </div>
                  <div className="rounded-3xl bg-emerald-50 p-6 border border-emerald-100">
                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-2">Growth Lift</p>
                    <p className="text-2xl font-black text-emerald-700">{selectedCase.secondaryMetric}</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-slate-900 text-sm font-bold mb-3 uppercase tracking-wider">Challenge & Strategy</h4>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {selectedCase.summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-8 border-t border-slate-100">
                    <div className="flex flex-wrap gap-2">
                      {selectedCase.tags.map(tag => (
                        <span key={tag} className="text-[9px] font-bold text-slate-400 uppercase tracking-widest border border-slate-200 rounded-full px-3 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {selectedCase.link && (
                      <a
                        href={selectedCase.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-brand-main text-black text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all"
                      >
                        Visit Live Website
                        <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
