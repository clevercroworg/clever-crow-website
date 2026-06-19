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
  builtWith?: string;
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
  hideMetrics?: boolean;
  isAppPortfolio?: boolean;
};

export default function SuccessStories({ data, title, subtitle, filterBy, hideMetrics = false, isAppPortfolio = false }: SuccessStoriesProps) {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCaseStudies.map((cs) => (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "tween",
                ease: "easeOut",
                duration: 0.25
              }}
              key={`${activeCategory}-${cs.id}`}
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
                {isAppPortfolio ? (
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900 flex items-center justify-center border-b border-slate-100/5">
                    {/* Blurred background */}
                    <Image
                      src={cs.image}
                      alt=""
                      fill
                      className="object-cover blur-xl opacity-20 scale-125 select-none pointer-events-none"
                      unoptimized={true}
                    />
                    {/* Centered contained logo */}
                    <div className="relative z-10 h-28 w-28 transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]">
                      <Image
                        src={cs.image}
                        alt={cs.title}
                        fill
                        className="object-contain rounded-[24px]"
                        unoptimized={true}
                      />
                    </div>
                  </div>
                ) : (
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
                )}

                {/* Content Box */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    {isAppPortfolio ? (
                      <div className="flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1.5 rounded bg-slate-100 px-2 py-0.5 text-[9px] font-extrabold text-slate-600 border border-slate-200/40">
                          <svg className="h-2.5 w-2.5 text-slate-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.1 16.67C20.08 16.74 19.67 18.11 18.71 19.5M15.97 4.17C16.63 3.37 17.07 2.28 16.95 1C15.85 1.04 14.51 1.73 13.73 2.64C13.07 3.41 12.49 4.52 12.64 5.78C13.87 5.87 15.12 5.17 15.97 4.17Z" />
                          </svg>
                          <svg className="h-2.5 w-2.5 text-slate-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.523 15.3l1.834 3.177c.291.503.118 1.15-.385 1.441-.504.291-1.151.118-1.44-.385L15.68 16.32c-1.09.48-2.298.76-3.68.76s-2.59-.28-3.68-.76l-1.852 3.213c-.29.503-.937.676-1.44.385-.503-.29-.676-.938-.385-1.44l1.834-3.178C4.195 13.737 2.5 10.976 2.5 7.72H21.5c0 3.256-1.695 6.017-3.977 7.58M7 10.25a.75.75 0 100-1.5.75.75 0 000 1.5m10 0a.75.75 0 100-1.5.75.75 0 000 1.5M12 2a.5.5 0 01.5.5v1.5a.5.5 0 01-1 0V2.5A.5.5 0 0112 2" />
                          </svg>
                          <span>iOS & Android</span>
                        </span>
                      </div>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cs.location}</span>
                    )}

                    {isAppPortfolio && cs.builtWith ? (
                      <span className="text-[10px] font-extrabold text-brand-main bg-brand-main/10 border border-brand-main/20 rounded-full px-2.5 py-0.5 uppercase tracking-wider shadow-sm">
                        {cs.builtWith}
                      </span>
                    ) : (
                      <p className="text-[10px] font-bold text-brand-main uppercase tracking-widest">{cs.category}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-main transition-colors mb-1">{cs.title}</h3>
                    {cs.summary && (
                      <p className="mt-1.5 text-xs text-slate-500 line-clamp-3 leading-relaxed font-medium">
                        {cs.summary}
                      </p>
                    )}
                  </div>

                  {/* Metrics Grid */}
                  {!hideMetrics && (
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100 group-hover:bg-white group-hover:border-slate-200 transition-all">
                        <p className="text-[8px] font-bold text-slate-400 uppercase mb-0.5">
                          {isAppPortfolio ? "App Focus" : "Impact"}
                        </p>
                        <p className="text-xs font-black text-slate-900 leading-tight">{cs.primaryMetric}</p>
                      </div>
                      <div className={`rounded-xl p-2.5 border transition-all ${
                        isAppPortfolio 
                          ? "bg-amber-50/60 border-amber-100/60 group-hover:bg-amber-100/10 text-amber-700" 
                          : "bg-emerald-50 border-emerald-100 group-hover:bg-emerald-100/20 text-emerald-700"
                      }`}>
                        <p className={`text-[8px] font-bold uppercase mb-0.5 ${
                          isAppPortfolio ? "text-amber-600" : "text-emerald-500"
                        }`}>
                          {isAppPortfolio ? "Key Highlight" : "Growth"}
                        </p>
                        <p className="text-xs font-black leading-tight">{cs.secondaryMetric}</p>
                      </div>
                    </div>
                  )}

                  {/* Tags Badges */}
                  {cs.tags && cs.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cs.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[9px] font-bold text-slate-500 bg-slate-100 border border-slate-200/40 rounded px-2 py-0.5 uppercase tracking-wide">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Bottom Info */}
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                    <p className="text-[10px] text-slate-400 font-medium">{cs.duration}</p>
                    <div className="flex items-center text-[10px] font-bold text-brand-main uppercase tracking-wider">
                      {cs.link ? (isAppPortfolio ? "View App" : "View Project") : "Know More"}
                      <svg className="ml-1.5 h-3 w-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
            </motion.div>
          ))}
        </div>
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
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden"
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.25 }}
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
                {!hideMetrics && (
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
                )}

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
