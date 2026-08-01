"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Search, ExternalLink, Sparkles, ChevronRight, X, ChevronDown, Filter, ArrowUpRight, Globe, ShieldCheck, TrendingUp, Zap, CheckCircle2 } from "lucide-react";

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
    summary: "To drive admission enquiries, we structured search and display campaigns around program keywords and campus location intent.",
    image: "/landing-page/google-ads/case-studies/bgs-global.jpg"
  }
];

type SuccessStoriesProps = {
  data?: CaseStudy[];
  title?: string;
  subtitle?: string;
  filterBy?: string;
  hideMetrics?: boolean;
  isAppPortfolio?: boolean;
};

// Brand logo background color palette generator based on title
function getBrandLogoTheme(title: string, category: string) {
  const t = title.toLowerCase();
  if (t.includes("topmate")) return { bg: "bg-black text-[#F97316]", letter: "t" };
  if (t.includes("bitespeed")) return { bg: "bg-[#6366F1] text-white", letter: "B" };
  if (t.includes("murf")) return { bg: "bg-[#0F172A] text-[#F59E0B]", letter: "M" };

  switch (category.toLowerCase()) {
    case "hospitality":
      return { bg: "bg-gradient-to-br from-amber-600 to-orange-700 text-white", letter: title.charAt(0) };
    case "healthcare":
      return { bg: "bg-gradient-to-br from-emerald-600 to-teal-700 text-white", letter: title.charAt(0) };
    case "saas":
      return { bg: "bg-gradient-to-br from-blue-600 to-indigo-700 text-white", letter: title.charAt(0) };
    case "ecommerce":
      return { bg: "bg-gradient-to-br from-purple-600 to-pink-700 text-white", letter: title.charAt(0) };
    case "real estate":
      return { bg: "bg-gradient-to-br from-amber-700 to-yellow-800 text-white", letter: title.charAt(0) };
    case "education":
      return { bg: "bg-gradient-to-br from-cyan-600 to-sky-700 text-white", letter: title.charAt(0) };
    default:
      return { bg: "bg-slate-900 text-amber-400", letter: title.charAt(0) };
  }
}

// Media box fallback theme generator
function getMediaBoxGradient(category: string) {
  switch (category.toLowerCase()) {
    case "hospitality":
      return "from-[#1a0f0a] via-[#2d1810] to-[#0f0a07] text-amber-200 border-amber-900/40";
    case "healthcare":
      return "from-[#0a1f18] via-[#0d2e24] to-[#071410] text-emerald-200 border-emerald-900/40";
    case "saas":
      return "from-[#0f172a] via-[#1e1b4b] to-[#090d16] text-indigo-200 border-indigo-900/40";
    case "ecommerce":
      return "from-[#1e102a] via-[#2d123d] to-[#12081a] text-purple-200 border-purple-900/40";
    case "real estate":
      return "from-[#1c130b] via-[#2b1c0e] to-[#100b06] text-amber-200 border-amber-900/40";
    case "education":
      return "from-[#0c1a24] via-[#132838] to-[#071017] text-sky-200 border-sky-900/40";
    default:
      return "from-slate-900 via-slate-950 to-black text-slate-200 border-slate-800";
  }
}

export default function SuccessStories({
  data,
  title,
  subtitle,
  filterBy,
  hideMetrics = false,
  isAppPortfolio = false
}: SuccessStoriesProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const displayCaseStudies = data ?? defaultCaseStudies;
  const filterMode = filterBy ?? "category";

  // Calculate unique categories with item counts
  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = { All: displayCaseStudies.length };
    displayCaseStudies.forEach((cs) => {
      const key = filterMode === "platform" ? cs.platform : cs.category;
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [displayCaseStudies, filterMode]);

  // URL Query Sync: Load selected category from URL search parameter on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const categoryParam = params.get("category");
      if (categoryParam) {
        const match = categoriesWithCounts.find(
          (c) => c.name.toLowerCase() === categoryParam.toLowerCase()
        );
        if (match) {
          setActiveCategory(match.name);
        }
      }
    }
  }, [categoriesWithCounts]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update category and sync state with URL query parameter
  const handleSelectCategory = (categoryName: string) => {
    setActiveCategory(categoryName);
    setIsDropdownOpen(false);
    setVisibleCount(9);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (categoryName === "All") {
        url.searchParams.delete("category");
      } else {
        url.searchParams.set("category", categoryName);
      }
      window.history.replaceState({}, "", url.toString());
    }
  };

  // Filter case studies by active category & search query
  const filteredCaseStudies = useMemo(() => {
    return displayCaseStudies.filter((cs) => {
      const matchesCategory =
        activeCategory === "All" ||
        (filterMode === "platform" ? cs.platform === activeCategory : cs.category === activeCategory);

      const matchesSearch =
        searchQuery.trim() === "" ||
        cs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cs.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cs.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cs.link && cs.link.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [displayCaseStudies, activeCategory, searchQuery, filterMode]);

  const selectedCase = displayCaseStudies.find((cs) => cs.id === selectedId);

  const displayTitle = title ?? "Our Website";
  const displaySubtitle =
    subtitle ??
    "Explore 150+ live client websites built across 11 key industries: Hospitality, Healthcare, SaaS, E-commerce, Real Estate, Education, Manufacturing, Wellness, FinTech, Retail & Lifestyle, and F&B.";

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const activeCategoryObj = categoriesWithCounts.find((c) => c.name === activeCategory) || {
    name: activeCategory,
    count: filteredCaseStudies.length
  };

  return (
    <section id="portfolio" className="bg-[#faf9f6] text-slate-900 py-16 sm:py-24 relative overflow-visible border-t border-slate-200/70">
      {/* Soft Golden Background Ambient Glows */}
      <div className="absolute top-10 left-10 w-[600px] h-[500px] bg-[#fef3c7]/50 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[600px] h-[500px] bg-[#fff7ed]/60 rounded-full blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#fceabb] bg-[#fff8e6] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#b8860b] shadow-xs mb-4">
            <ShieldCheck className="w-4 h-4 text-[#d97706]" />
            VERIFIED CLIENT WEBSITES
          </span>

          <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl flex items-center justify-center gap-2 flex-wrap">
            <span>Our Website</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d97706] via-[#f59e0b] to-[#b45309]">
              Portfolio
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-medium max-w-2xl mx-auto">
            {displaySubtitle}
          </p>
        </div>

        {/* Search Bar & Industry Dropdown Filter Control Bar */}
        <div className="mb-12 max-w-3xl mx-auto relative z-40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Box Pill */}
            <div className="relative md:col-span-7">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(9);
                }}
                placeholder="Search websites by brand or keyword..."
                className="w-full pl-11 pr-8 py-3.5 rounded-full bg-white border border-slate-200/90 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/20 transition shadow-sm font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dropdown Industry Selector Pill */}
            <div className="relative md:col-span-5 z-50" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between gap-3 px-5 py-3.5 rounded-full bg-white border border-slate-200/90 text-sm font-bold text-slate-800 hover:border-[#f59e0b] transition shadow-sm group cursor-pointer"
              >
                <div className="flex items-center gap-2 truncate">
                  <Filter className="w-4 h-4 text-[#d97706] shrink-0" />
                  <span className="text-slate-500 text-xs font-semibold">Industry:</span>
                  <span className="truncate text-slate-900 font-extrabold">{activeCategoryObj.name}</span>
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-[#fcd34d] text-slate-900 shrink-0 shadow-xs">
                    {activeCategoryObj.count}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${isDropdownOpen ? "rotate-180 text-[#d97706]" : ""}`} />
              </button>

              {/* Dropdown Options Popup with Elegant Custom Scrollbar */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-full min-w-[250px] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-[100] p-2 max-h-80 overflow-y-auto ring-1 ring-black/5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-slate-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#f59e0b]"
                  >
                    {categoriesWithCounts.map(({ name, count }) => {
                      const isSelected = activeCategory === name;
                      return (
                        <button
                          key={name}
                          onClick={() => handleSelectCategory(name)}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-left cursor-pointer mb-0.5 ${
                            isSelected
                              ? "bg-[#fcd34d] text-slate-950 font-extrabold shadow-xs"
                              : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                          }`}
                        >
                          <span className="truncate">{name}</span>
                          <span
                            className={`text-[10px] px-2.5 py-0.5 rounded-full font-black ml-2 shrink-0 ${
                              isSelected ? "bg-black/15 text-slate-950" : "bg-slate-100 text-slate-600 border border-slate-200"
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Portfolio Showcase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          <AnimatePresence mode="popLayout">
            {filteredCaseStudies.slice(0, visibleCount).map((cs) => {
              const isImageBroken = failedImages[cs.id];
              const logoTheme = getBrandLogoTheme(cs.title, cs.category);
              const mediaBoxGrad = getMediaBoxGradient(cs.category);

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.97, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: 15 }}
                  transition={{ duration: 0.25 }}
                  key={cs.id}
                  className="group relative bg-white rounded-[28px] border border-slate-100 p-3.5 sm:p-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Top Inner Rounded Media Container */}
                  <div className="relative aspect-[16/11] w-full rounded-[22px] overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-100/60 shadow-inner cursor-pointer" onClick={() => setSelectedId(cs.id)}>
                    {!isImageBroken ? (
                      <Image
                        src={cs.image}
                        alt={cs.title}
                        fill
                        onError={() => handleImageError(cs.id)}
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        unoptimized
                      />
                    ) : (
                      /* Rich Color Theme Fallback when screenshot image is not locally present */
                      <div className={`w-full h-full bg-gradient-to-br ${mediaBoxGrad} p-6 flex flex-col justify-between relative overflow-hidden`}>
                        <div className="absolute -bottom-4 -right-4 opacity-15 select-none">
                          <span className="text-9xl font-black">{cs.title.charAt(0)}</span>
                        </div>
                        <div className="relative z-10">
                          <h4 className="text-2xl font-black text-white leading-tight tracking-tight drop-shadow-md">
                            {cs.title}
                          </h4>
                          <p className="text-xs text-slate-300 mt-1 font-medium line-clamp-2">
                            {cs.summary}
                          </p>
                        </div>
                        <div className="relative z-10 flex items-center justify-between text-xs pt-3 border-t border-white/10">
                          <span className="font-extrabold text-amber-300">⚡ {cs.primaryMetric}</span>
                          <span className="text-[11px] font-semibold text-slate-300">{cs.location}</span>
                        </div>
                      </div>
                    )}

                    {/* Floating White Capsule Category Badge Top-Left */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-white text-slate-900 px-3.5 py-1.5 rounded-full shadow-md border border-slate-100">
                        {cs.category}
                      </span>
                    </div>

                    {/* Floating White Capsule Live Badge Top-Right */}
                    <div className="absolute top-3.5 right-3.5 z-10">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-slate-900 bg-white px-3 py-1.5 rounded-full shadow-md border border-slate-100">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        LIVE
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body Below Thumbnail (Sleek Clean Layout) */}
                  <div className="pt-4 px-1 pb-1 flex flex-col justify-between flex-grow">
                    
                    {/* Brand Header: Logo Monogram + Title + Location */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Brand Logo Monogram Box */}
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm shrink-0 ${logoTheme.bg}`}>
                          {logoTheme.letter}
                        </div>

                        {/* Title & Short Summary */}
                        <div className="min-w-0">
                          <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#6366F1] transition-colors leading-tight truncate cursor-pointer" onClick={() => setSelectedId(cs.id)}>
                            {cs.title}
                          </h3>
                          <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                            {cs.summary}
                          </p>
                        </div>
                      </div>

                      {/* Location Indicator */}
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
                        <Globe className="w-3 h-3 text-slate-400" />
                        {cs.location}
                      </span>
                    </div>

                    {/* Footer Action Links */}
                    <div className="mt-4 pt-3 border-t border-slate-100/80 flex items-center justify-between text-xs">
                      {cs.link ? (
                        <a
                          href={cs.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-extrabold text-[#6366F1] hover:text-[#4F46E5] transition"
                        >
                          <span>View Live Site</span>
                          <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                        </a>
                      ) : (
                        <span className="font-extrabold text-[#6366F1] flex items-center gap-1">
                          View Live Site <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      )}

                      <button
                        onClick={() => setSelectedId(cs.id)}
                        className="font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition cursor-pointer"
                      >
                        <span>Project Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredCaseStudies.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 max-w-xl mx-auto shadow-sm">
            <p className="text-lg font-bold text-slate-900">No websites found matching your search</p>
            <p className="text-sm text-slate-600 mt-1">Try selecting a different category or clearing your search term.</p>
            <button
              onClick={() => handleSelectCategory("All")}
              className="mt-4 inline-flex items-center px-5 py-2.5 rounded-full bg-[#fcd34d] text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow-sm hover:brightness-105 transition"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* View More Projects Center Pill Button */}
        {visibleCount < filteredCaseStudies.length && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + 9)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-900 text-sm font-extrabold border border-slate-200 transition shadow-md hover:border-[#f59e0b] hover:shadow-lg cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#f59e0b]" />
              <span>View More Projects</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        )}
      </div>

      {/* World-Class Project Detail Modal Popup */}
      <AnimatePresence>
        {selectedId && selectedCase && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 cursor-pointer"
            />
            <motion.div
              className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-[32px] shadow-2xl overflow-hidden text-slate-900 my-8 max-h-[90vh] flex flex-col z-10"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {/* Floating Close Button */}
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-slate-950 border border-slate-200 shadow-md transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Scrollable Container inside Modal */}
              <div className="overflow-y-auto max-h-[90vh] no-scrollbar">

                {/* Top Full-Width Hero Preview Image Box */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950 flex items-center justify-center border-b border-slate-100">
                  {!failedImages[selectedCase.id] ? (
                    <Image
                      src={selectedCase.image}
                      alt={selectedCase.title}
                      fill
                      onError={() => handleImageError(selectedCase.id)}
                      className="object-cover object-top"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 p-8 flex flex-col justify-end text-white">
                      <h3 className="text-3xl font-black">{selectedCase.title}</h3>
                      <p className="text-sm text-slate-300 mt-1">{selectedCase.summary}</p>
                    </div>
                  )}

                  {/* Overlaid Badges on Image */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-xs font-black uppercase tracking-wider bg-white text-slate-900 px-4 py-1.5 rounded-full shadow-md border border-slate-100">
                      {selectedCase.category}
                    </span>
                  </div>

                  <div className="absolute top-4 right-16 z-10">
                    <span className="inline-flex items-center gap-1.5 text-xs font-black text-slate-900 bg-white px-3.5 py-1.5 rounded-full shadow-md border border-slate-100">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      LIVE SITE
                    </span>
                  </div>
                </div>

                {/* Modal Main Content Body */}
                <div className="p-6 sm:p-8 space-y-6">
                  
                  {/* Brand Header */}
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl shadow-md shrink-0 ${getBrandLogoTheme(selectedCase.title, selectedCase.category).bg}`}>
                      {getBrandLogoTheme(selectedCase.title, selectedCase.category).letter}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5 text-slate-400" />
                          {selectedCase.location}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs font-bold text-[#6366F1]">Verified Case Study</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900">{selectedCase.title}</h3>
                    </div>
                  </div>



                  {/* Project Overview */}
                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#6366F1]" />
                      PROJECT SUMMARY & STRATEGY
                    </h4>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                      {selectedCase.summary}
                    </p>
                  </div>

                  {/* Tags */}
                  {selectedCase.tags && selectedCase.tags.length > 0 && (
                    <div>
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">SERVICES & SCOPE</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCase.tags.map((tag) => (
                          <span key={tag} className="text-xs font-bold bg-slate-100 border border-slate-200 text-slate-700 px-3.5 py-1.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Footer */}
                  {selectedCase.link && (
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedId(null)}
                        className="text-xs font-bold text-slate-500 hover:text-slate-800 px-4 py-2"
                      >
                        Back to Portfolio
                      </button>
                      <a
                        href={selectedCase.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#6366F1] hover:bg-[#4F46E5] text-white font-extrabold text-sm shadow-lg shadow-[#6366F1]/25 transition"
                      >
                        <span>Visit Live Website</span>
                        <ArrowUpRight className="w-4.5 h-4.5 stroke-[2.5]" />
                      </a>
                    </div>
                  )}

                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
