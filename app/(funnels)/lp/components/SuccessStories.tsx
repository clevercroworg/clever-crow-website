"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";
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
  logo?: string; // brand logo image; overrides the auto-fetched favicon
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
  // "tabs": category pills (scrollable row on mobile, wrapped on desktop) instead of the dropdown.
  filterStyle?: "dropdown" | "tabs";
  isAppPortfolio?: boolean;
  // Phones: tapping a card opens the client's live site straight away (with a short "opening" animation)
  // instead of the details popup. "Project Details" still opens the popup. Desktop is unchanged.
  openSiteOnMobile?: boolean;
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

function getDomain(link?: string) {
  if (!link) return undefined;
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

// Brand mark: the site's own icon on a white tile, falling back to the coloured monogram when the
// site has no usable icon (the favicon service returns a tiny generic globe for those).
function BrandLogo({ title, category, link, logo, size = "md" }: { title: string; category: string; link?: string; logo?: string; size?: "md" | "lg" }) {
  const [failed, setFailed] = useState(false);
  const domain = getDomain(link);
  const theme = getBrandLogoTheme(title, category);
  const box = size === "lg" ? "w-12 h-12 sm:w-14 sm:h-14 rounded-2xl" : "w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl";
  if (logo) {
    return (
      <div className={`${box} flex items-center justify-center bg-white border border-slate-200 shadow-sm shrink-0 overflow-hidden`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt={`${title} logo`} loading="lazy" className="w-full h-full object-contain p-0.5" />
      </div>
    );
  }
  if (!domain || failed) {
    return (
      <div className={`${box} flex items-center justify-center font-black ${size === "lg" ? "text-xl sm:text-2xl" : "text-base sm:text-lg"} shadow-sm shrink-0 ${theme.bg}`}>
        {theme.letter}
      </div>
    );
  }
  return (
    <div className={`${box} flex items-center justify-center bg-white border border-slate-200 shadow-sm shrink-0 overflow-hidden`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
        alt={`${title} logo`}
        loading="lazy"
        className="w-3/5 h-3/5 object-contain"
        onLoad={(e) => e.currentTarget.naturalWidth < 32 && setFailed(true)}
        onError={() => setFailed(true)}
      />
    </div>
  );
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
  filterStyle = "dropdown",
  isAppPortfolio = false,
  openSiteOnMobile = false,
}: SuccessStoriesProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openingId, setOpeningId] = useState<string | null>(null);
  const openingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Card / title tap. The site is opened inside the tap itself (phone browsers block new tabs opened
  // after a delay); the overlay animation plays on the card at the same time.
  const openCase = (cs: CaseStudy) => {
    if (openSiteOnMobile && cs.link && window.matchMedia("(max-width: 639px)").matches) {
      setOpeningId(cs.id);
      window.open(cs.link, "_blank", "noopener,noreferrer");
      if (openingTimer.current) clearTimeout(openingTimer.current);
      openingTimer.current = setTimeout(() => setOpeningId(null), 1600);
      return;
    }
    setSelectedId(cs.id);
  };
  useEffect(() => () => {
    if (openingTimer.current) clearTimeout(openingTimer.current);
  }, []);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mobile tab row: edge fades show there is more to scroll; a one-time "peek" nudge hints at swiping.
  const tabRowRef = useRef<HTMLDivElement>(null);
  const [tabEdges, setTabEdges] = useState({ start: false, end: true });
  const [hasSwiped, setHasSwiped] = useState(false);
  const peekingRef = useRef(false);

  useEffect(() => {
    const row = tabRowRef.current;
    if (!row || filterStyle !== "tabs") return;
    const update = () => {
      const max = row.scrollWidth - row.clientWidth;
      setTabEdges({ start: row.scrollLeft > 4, end: max > 4 && row.scrollLeft < max - 4 });
      // Only a real swipe hides the hint; the automatic peek doesn't count.
      if (!peekingRef.current && row.scrollLeft > 12) setHasSwiped(true);
    };
    update();
    row.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    // Peek once when the row first comes into view (skipped for reduced-motion users).
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (reduce || row.scrollWidth <= row.clientWidth || row.scrollLeft > 0) return;
        timer = window.setTimeout(() => {
          // Pause snapping so the nudge stays small, then settle back to the start.
          peekingRef.current = true;
          row.style.scrollSnapType = "none";
          row.scrollTo({ left: 48, behavior: "smooth" });
          timer = window.setTimeout(() => {
            row.scrollTo({ left: 0, behavior: "smooth" });
            timer = window.setTimeout(() => {
              row.style.scrollSnapType = "";
              peekingRef.current = false;
            }, 600);
          }, 600);
        }, 500);
      },
      { threshold: 0.6 }
    );
    observer.observe(row);
    return () => {
      row.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [filterStyle]);

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

  // While the project popup is open: lock page scroll and close on Escape.
  useEffect(() => {
    if (!selectedId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelectedId(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedId]);

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

        {filterStyle === "tabs" ? (
          <div className="mb-10 sm:mb-12">
            {/* Search */}
            <div className="relative mx-auto max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(9);
                }}
                placeholder="Search websites by brand or keyword..."
                aria-label="Search websites"
                className="w-full pl-11 pr-10 py-3.5 rounded-full bg-white border border-slate-200/90 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/20 transition shadow-sm font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Industry tabs: one scrollable row on mobile, wrapped and centred from md up */}
            <div className="relative">
            <div
              ref={tabRowRef}
              role="tablist"
              aria-label="Filter websites by industry"
              className="-mx-4 mt-6 flex snap-x snap-mandatory scroll-px-4 gap-2 overflow-x-auto px-4 pb-2 sm:scroll-px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6 md:mx-0 md:flex-wrap md:justify-center md:gap-2.5 md:overflow-visible md:px-0 md:pb-0 md:![mask-image:none] md:![-webkit-mask-image:none]"
              style={{
                maskImage: `linear-gradient(90deg, ${tabEdges.start ? "transparent 0, black 36px" : "black 0"}, ${tabEdges.end ? "black calc(100% - 56px), transparent 100%" : "black 100%"})`,
                WebkitMaskImage: `linear-gradient(90deg, ${tabEdges.start ? "transparent 0, black 36px" : "black 0"}, ${tabEdges.end ? "black calc(100% - 56px), transparent 100%" : "black 100%"})`,
              }}
            >
              {categoriesWithCounts.map(({ name, count }) => {
                const isSelected = activeCategory === name;
                return (
                  <button
                    key={name}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={(e) => {
                      handleSelectCategory(name);
                      // Centre the tapped tab within the row only (never scrolls the page itself).
                      const tab = e.currentTarget;
                      const row = tab.parentElement;
                      if (row && row.scrollWidth > row.clientWidth) {
                        row.scrollTo({ left: tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2, behavior: "smooth" });
                      }
                    }}
                    className={`inline-flex shrink-0 snap-start items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-bold transition cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f59e0b] ${
                      isSelected
                        ? "border-slate-900 bg-slate-900 text-white shadow-md"
                        : "border-slate-200 bg-white text-slate-700 hover:border-[#f59e0b] hover:text-slate-900"
                    }`}
                  >
                    {name}
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-black ${
                        isSelected ? "bg-[#fcd34d] text-slate-900" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
            {/* Swipe hint (mobile): small chevron at the right edge until the first swipe or the end of the row */}
            <button
              type="button"
              aria-label="Show more industries"
              onClick={() => tabRowRef.current?.scrollBy({ left: 160, behavior: "smooth" })}
              className={`absolute -right-1 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-600 shadow-sm transition-opacity duration-300 md:hidden ${
                tabEdges.end && !hasSwiped ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            </div>
          </div>
        ) : (
        <>
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
        </>
        )}

        {/* Portfolio Showcase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 relative z-10">
          <AnimatePresence mode="popLayout">
            {filteredCaseStudies.slice(0, visibleCount).map((cs) => {
              const isImageBroken = failedImages[cs.id];
              const mediaBoxGrad = getMediaBoxGradient(cs.category);

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.97, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: 15 }}
                  transition={{ duration: 0.25 }}
                  whileTap={openSiteOnMobile && cs.link ? { scale: 0.97 } : undefined}
                  key={cs.id}
                  className="group relative bg-white rounded-[24px] sm:rounded-[28px] border border-slate-100 p-3 sm:p-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Top Inner Rounded Media Container */}
                  <div className="relative aspect-[16/10] w-full rounded-[18px] sm:rounded-[22px] overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-100/60 shadow-inner cursor-pointer" onClick={() => openCase(cs)}>
                    {!isImageBroken ? (
                      <Image
                        src={cs.image}
                        alt={cs.title}
                        fill
                        onError={() => handleImageError(cs.id)}
                        className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-105"
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

                    {/* Category badge: only useful in "All"; inside a category tab it just repeats the tab */}
                    {activeCategory === "All" && (
                    <div className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 z-10">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-white text-slate-900 px-3.5 py-1.5 rounded-full shadow-md border border-slate-100">
                        {cs.category}
                      </span>
                    </div>
                    )}

                    {/* Phones: "opening the site" feedback after a tap */}
                    <AnimatePresence>
                      {openingId === cs.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 bg-slate-950/70 backdrop-blur-[2px]"
                          aria-live="polite"
                        >
                          <motion.span
                            initial={{ scale: 0.6, x: -6, y: 6 }}
                            animate={{ scale: 1, x: [-6, 4, 0], y: [6, -4, 0] }}
                            transition={{ duration: 0.45, ease: "easeOut" }}
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg"
                          >
                            <ArrowUpRight className="h-6 w-6 stroke-[2.5]" />
                          </motion.span>
                          <motion.span
                            initial={{ y: 8, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.3 }}
                            className="max-w-[85%] truncate text-sm font-bold text-white"
                          >
                            Opening {getDomain(cs.link) || "website"}…
                          </motion.span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Floating White Capsule Live Badge Top-Right */}
                    <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 z-10">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-slate-900 bg-white px-3 py-1.5 rounded-full shadow-md border border-slate-100">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        LIVE
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body Below Thumbnail (Sleek Clean Layout) */}
                  <div className="pt-3 sm:pt-4 px-1 pb-0.5 sm:pb-1 flex flex-col justify-between flex-grow">
                    
                    {/* Brand Header: Logo Monogram + Title + Location */}
                    <div className="flex items-center justify-between gap-3 mb-1 sm:mb-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Brand Logo Monogram Box */}
                        <BrandLogo title={cs.title} category={cs.category} link={cs.link} logo={cs.logo} />

                        {/* Title & Short Summary */}
                        <div className="min-w-0">
                          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-[#6366F1] transition-colors leading-tight truncate cursor-pointer" onClick={() => openCase(cs)}>
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
                    <div className="mt-3 sm:mt-4 pt-3 border-t border-slate-100/80 flex items-center justify-between text-xs">
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

      {/* Project detail popup: browser-framed preview, key facts, and a "build me something similar" CTA */}
      <AnimatePresence>
        {selectedId && selectedCase && (() => {
          const domain = getDomain(selectedCase.link);
          const facts = [
            { label: "Industry", value: selectedCase.category },
            { label: "Location", value: selectedCase.location },
            { label: "Project", value: selectedCase.duration },
            { label: "Status", value: "Live" },
          ];
          const similarMessage = `Hi Clever Crow, I saw ${selectedCase.title} in your portfolio and would like a similar ${isAppPortfolio ? "app" : "website"} for my business.`;
          return (
          <div
            className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center sm:p-6 bg-slate-950/75 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 cursor-pointer"
            />
            <motion.div
              className="relative z-10 w-full sm:max-w-[880px] bg-white rounded-t-[28px] sm:rounded-[28px] shadow-2xl overflow-hidden text-slate-900 max-h-[92dvh] flex flex-col"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <button
                onClick={() => setSelectedId(null)}
                aria-label="Close project details"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-600 hover:text-slate-950 border border-slate-200 shadow-md transition cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              <div className="overflow-y-auto overscroll-contain no-scrollbar">
                {/* Preview in a browser frame */}
                <div className="bg-gradient-to-br from-amber-50 via-orange-50/60 to-indigo-50 px-4 pt-12 pb-0 sm:px-10 sm:pt-12">
                  <div className="mx-auto rounded-t-2xl border border-b-0 border-slate-200 bg-white shadow-[0_-10px_40px_rgba(15,23,42,0.10)] overflow-hidden">
                    <div className="flex items-center gap-3 px-3.5 py-2.5 border-b border-slate-100 bg-slate-50">
                      <div className="flex gap-1.5 shrink-0">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                      </div>
                      <div className="flex-1 min-w-0 flex items-center justify-center gap-1.5 rounded-md bg-white border border-slate-200 px-3 py-1 text-[11px] font-semibold text-slate-500">
                        <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span className="truncate">{domain ?? selectedCase.title}</span>
                      </div>
                      <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        LIVE
                      </span>
                    </div>
                    <div className="relative aspect-[16/9] w-full bg-slate-100">
                      {!failedImages[selectedCase.id] ? (
                        <Image
                          src={selectedCase.image}
                          alt={`${selectedCase.title} website preview`}
                          fill
                          sizes="(max-width: 640px) 100vw, 800px"
                          onError={() => handleImageError(selectedCase.id)}
                          className="object-cover object-left-top"
                          unoptimized
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${getMediaBoxGradient(selectedCase.category)} flex items-center justify-center`}>
                          <span className="text-3xl font-black">{selectedCase.title}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-10 sm:py-9">
                  {/* Brand header */}
                  <div className="flex items-start gap-4">
                    <BrandLogo title={selectedCase.title} category={selectedCase.category} link={selectedCase.link} logo={selectedCase.logo} size="lg" />
                    <div className="min-w-0">
                      <h3 id="project-modal-title" className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 leading-tight">
                        {selectedCase.title}
                      </h3>
                      {domain && selectedCase.link ? (
                        <a
                          href={selectedCase.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#6366F1] hover:text-[#4F46E5]"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          {domain}
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-500">{selectedCase.category} · {selectedCase.location}</p>
                      )}
                    </div>
                  </div>

                  <p className="mt-5 text-[15px] sm:text-base text-slate-600 leading-relaxed">
                    {selectedCase.summary}
                  </p>

                  {/* Results */}
                  {!hideMetrics && (
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {[
                        { icon: TrendingUp, label: "Key result", value: selectedCase.primaryMetric },
                        { icon: Zap, label: "Highlight", value: selectedCase.secondaryMetric },
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-4 sm:p-5">
                          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-amber-700">
                            <Icon className="w-3.5 h-3.5" />
                            {label}
                          </div>
                          <div className="mt-1.5 text-lg sm:text-2xl font-black text-slate-900 leading-tight">{value}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Project facts */}
                  <dl className="mt-6 grid grid-cols-2 sm:grid-cols-4 rounded-2xl border border-slate-100 bg-slate-50/70 divide-slate-100 overflow-hidden">
                    {facts.map((f, i) => (
                      <div
                        key={f.label}
                        className={`p-4 min-w-0 ${i % 2 === 1 ? "border-l border-slate-100" : ""} ${i > 1 ? "border-t sm:border-t-0 border-slate-100" : ""} ${i === 2 ? "sm:border-l" : ""}`}
                      >
                        <dt className="text-[10px] font-black uppercase tracking-widest text-slate-400">{f.label}</dt>
                        <dd className="mt-1 text-sm font-bold text-slate-800 truncate flex items-center gap-1.5" title={f.value}>
                          {f.label === "Status" && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
                          {f.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {/* Highlights */}
                  {selectedCase.tags && selectedCase.tags.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2.5">Highlights</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCase.tags.map((tag) => (
                          <span key={tag} className="inline-flex items-center gap-1.5 text-xs font-bold bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="mt-8 rounded-2xl bg-slate-900 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
                    <div>
                      <p className="text-base sm:text-lg font-black text-white">Want a {isAppPortfolio ? "app" : "website"} like this?</p>
                      <p className="text-xs sm:text-sm text-slate-400 mt-0.5">Share your idea and get a free quote within 24 hours.</p>
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row gap-2.5 shrink-0">
                      {selectedCase.link && (
                        <a
                          href={selectedCase.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 font-bold text-sm transition"
                        >
                          Visit Live Site
                          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                        </a>
                      )}
                      <a
                        href={`https://wa.me/919986389444?text=${encodeURIComponent(similarMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#fcd34d] hover:bg-[#fbbf24] text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition"
                      >
                        <FaWhatsapp className="w-4 h-4" />
                        Get a Similar {isAppPortfolio ? "App" : "Website"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
