"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Menu,
  ChevronDown,
  ArrowRight,
  Phone,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const navLinks = [
  {
    label: "Development",
    key: "development",
    items: [
      { href: "/services/mobile-app-development", label: "Mobile App Dev", desc: "iOS & Android apps built for scale" },
      { href: "/services/web-app-development", label: "Web App Dev", desc: "Scalable SaaS & business applications" },
      { href: "/services/business-websites", label: "Business Websites", desc: "Lead-generating brand & agency sites" },
      { href: "/services/ecommerce", label: "E-commerce Stores", desc: "High-performance digital shops" },
      { href: "/services/custom-website-design", label: "Custom UI/UX", desc: "Bespoke interface & design assets" },
      { href: "/services/wordpress-website-design", label: "WordPress Sites", desc: "Flexible, managed WordPress solutions" },
      { href: "/services/landing-pages", label: "Landing Pages", desc: "High-conversion product pages" },
    ],
  },
  {
    label: "Marketing",
    key: "marketing",
    items: [
      { href: "/services/google-ads", label: "Google Ads", desc: "Capture high-intent search traffic" },
      { href: "/services/meta-ads", label: "Meta Ads", desc: "Facebook & Instagram campaigns" },
      { href: "/services/linkedin-ads", label: "LinkedIn Ads", desc: "B2B client & lead acquisition" },
      { href: "/services/seo", label: "SEO Services", desc: "Organic search ranking & authority" },
      { href: "/services/ai-seo", label: "AI SEO", desc: "Next-gen algorithmic traffic growth" },
      { href: "/services/social-media-marketing", label: "SMM Campaigns", desc: "Grow organic audience & presence" },
      { href: "/services/social-media-management", label: "Social Management", desc: "End-to-end social operations" },
    ],
  },
  {
    label: "Branding",
    key: "branding",
    items: [
      { href: "/services/strategy-planning", label: "Brand Strategy", desc: "Market positioning & growth roadmap" },
      { href: "/services/logo-design", label: "Logo Design", desc: "Memorable corporate brand marks" },
      { href: "/services/graphic-design", label: "Graphic Design", desc: "High-impact visual marketing assets" },
      { href: "/services/content-writing", label: "Content Writing", desc: "Engaging, SEO-optimized copy" },
      { href: "/services/content-marketing", label: "Content Marketing", desc: "Audience nurturing & funnel setup" },
      { href: "/services/marketing-strategy", label: "Growth Strategy", desc: "Actionable scaling roadmaps" },
    ],
  },
  {
    label: "Creative",
    key: "creative",
    items: [
      { href: "/services/script-writing", label: "Script Writing", desc: "Scripts for videos, ads & reels" },
      { href: "/services/video-script-writing", label: "Video Scripts", desc: "Professional video storytelling" },
      { href: "/services/social-media-copywriting", label: "Social Copy", desc: "High-engagement copywriting" },
      { href: "/services/social-media-creatives", label: "Social Creatives", desc: "Scroll-stopping social visuals" },
      { href: "/services/social-media-videos", label: "Social Videos", desc: "Short-form video & Reels production" },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const phoneNumber = "9986389444";
  const whatsappLink = `https://wa.me/91${phoneNumber}`;

  const openDropdown = (key: string) => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setActiveDropdown(key);
  };

  const closeDropdown = () => {
    dropdownTimerRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const trackCallClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined") {
      if ((window as any).gtag_report_conversion) {
        e.preventDefault();
        (window as any).gtag_report_conversion(e.currentTarget.href);
      } else if ((window as any).gtag) {
        (window as any).gtag("event", "conversion", {
          send_to: "AW-17335403082/ul0ECKr5i_QaEMqElcpA",
        });
      }
    }
  };

  const trackWhatsAppClick = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "click", {
        event_category: "Contact",
        event_label: "Header WhatsApp Chat Click",
        whatsapp_number: "919986389444",
      });
    }
  };

  // Close menus on path change
  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Auto-expand accordion for active route when mobile menu opens
  useEffect(() => {
    if (menuOpen) {
      const activeGroup = navLinks.find(group =>
        group.items.some(item => item.href === pathname)
      );
      if (activeGroup) {
        setMobileAccordion(activeGroup.key);
      } else {
        setMobileAccordion(null);
      }
    }
  }, [menuOpen, pathname]);

  return (
    <header className="fixed inset-x-0 top-4 z-[100] flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex w-full max-w-[95%] items-center justify-between gap-2 rounded-full border border-white/40 bg-white/80 px-5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-2xl transition-all hover:bg-white/90 ring-1 ring-white/20">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center shrink-0 transition-transform hover:scale-105 active:scale-95">
          <Image
            src="/logo-dark.svg"
            alt="Clever Crow"
            width={100}
            height={28}
            className="h-6 md:h-7 w-auto object-contain"
            priority
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden xl:flex items-center gap-0.5" onMouseLeave={closeDropdown}>
          {navLinks.map((group) => (
            <div key={group.key} className="relative" onMouseEnter={() => openDropdown(group.key)}>
              <button
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-[10px] font-black transition-all tracking-[0.15em] uppercase ${
                  activeDropdown === group.key || group.items.some(item => item.href === pathname)
                    ? "text-yellow-600 bg-black/5"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {group.label}
                <ChevronDown
                  size={10}
                  className={`transition-transform duration-300 ${
                    activeDropdown === group.key || group.items.some(item => item.href === pathname) ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === group.key && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute left-1/2 top-[calc(100%+12px)] -translate-x-1/2"
                    onMouseEnter={() => openDropdown(group.key)}
                  >
                    <div className="w-[600px] rounded-[2rem] bg-white ring-1 ring-black/[0.05] shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden p-4 grid grid-cols-2 gap-1.5 border border-slate-100/50">
                        {group.items.map((item, i) => (
                          <Link
                            key={i}
                            href={item.href}
                            className={`group flex flex-col justify-center rounded-2xl px-4 py-3 text-left transition-all duration-150 border border-transparent ${
                              pathname === item.href
                                ? "bg-yellow-50/80 border-yellow-100/50"
                                : "hover:bg-slate-50/80 hover:border-slate-100/50"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-1.5">
                              <span className={`text-[12px] font-black tracking-tight transition-colors duration-150 ${
                                pathname === item.href ? "text-yellow-600" : "text-slate-800 group-hover:text-yellow-600"
                              }`}>
                                {item.label}
                              </span>
                              <ArrowRight size={13} className={`text-yellow-500 transition-all duration-200 ${
                                pathname === item.href 
                                  ? "opacity-100 translate-x-0" 
                                  : "opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0"
                              }`} />
                            </div>
                            {item.desc && (
                              <span className="text-[10px] font-medium text-slate-400 mt-0.5 leading-snug line-clamp-1 group-hover:text-slate-500 transition-colors">
                                {item.desc}
                              </span>
                            )}
                          </Link>
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          <Link 
            href="/contact" 
            className={`rounded-full px-3 py-1.5 text-[10px] font-black transition-all tracking-[0.15em] uppercase ${
                pathname === "/contact" ? "text-yellow-600 bg-black/5" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* DESKTOP CTAs */}
        <div className="hidden lg:flex items-center gap-2 ml-2">
          <a
            href={`tel:${phoneNumber}`}
            onClick={trackCallClick}
            className="flex items-center gap-2 rounded-full border border-black/5 bg-black/[0.03] px-4 py-2 text-[11px] font-black text-slate-700 hover:bg-black/[0.08] transition-all tracking-tight uppercase"
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 text-slate-900 shadow-md shadow-yellow-500/20">
              <Phone size={10} fill="currentColor" />
            </div>
            {phoneNumber}
          </a>
          <a
            href={whatsappLink}
            onClick={trackWhatsAppClick}
            target="_blank"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/20 transition-all hover:scale-110 active:scale-95"
          >
            <FaWhatsapp size={18} />
          </a>
        </div>

        {/* MOBILE TOGGLE */}
        <div className="flex items-center gap-2 xl:hidden">
          <a
            href={whatsappLink}
            target="_blank"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/25 transition-transform active:scale-95"
          >
            <FaWhatsapp size={20} />
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 border border-slate-100 shadow-sm active:scale-90 transition-transform"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-4 right-4 z-50 rounded-[2rem] border border-black/10 bg-white shadow-2xl xl:hidden max-h-[75vh] overflow-y-auto pointer-events-auto flex flex-col justify-between"
          >
            <nav className="p-6 flex flex-col gap-2">
              {navLinks.map((group) => (
                <div key={group.key} className="border-b border-slate-50 last:border-0 pb-1">
                  <button
                    onClick={() => setMobileAccordion(mobileAccordion === group.key ? null : group.key)}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-[14px] transition-all duration-200 border ${
                      mobileAccordion === group.key || group.items.some(item => item.href === pathname)
                        ? "text-yellow-600 bg-yellow-50/80 border-yellow-100/50 font-bold"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-50/50 border-transparent font-semibold"
                    }`}
                  >
                    {group.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${
                        mobileAccordion === group.key ? "rotate-180 text-yellow-600" : "text-slate-400"
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === group.key && (
                      <motion.div
                        key={group.key}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="ml-3 border-l border-slate-100 pl-3 py-1 flex flex-col gap-1">
                          {group.items.map((item, i) => (
                            <Link
                              key={i}
                              href={item.href}
                              className={`flex flex-col py-2 px-3 rounded-xl transition-all duration-150 border ${
                                pathname === item.href
                                  ? "bg-yellow-50 text-yellow-600 font-bold border-yellow-100/30"
                                  : "hover:bg-slate-50 text-slate-600 hover:text-slate-900 border-transparent"
                              }`}
                            >
                              <span className="text-[13px] font-bold tracking-tight">{item.label}</span>
                              {item.desc && (
                                <span className="text-[10px] font-medium text-slate-400 mt-0.5 leading-none">
                                  {item.desc}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <Link
                href="/contact"
                className={`block rounded-xl px-4 py-3 text-[14px] transition-all duration-200 border ${
                  pathname === "/contact"
                    ? "text-yellow-600 bg-yellow-50/80 border-yellow-100/50 font-bold"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-50/50 border-transparent font-semibold"
                }`}
              >
                Contact Us
              </Link>
            </nav>

            <div className="bg-slate-50/50 border-t border-slate-100/80 px-6 py-4 flex gap-3 rounded-b-[2rem]">
              <a
                href={`tel:${phoneNumber}`}
                onClick={trackCallClick}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white border border-slate-200 py-3.5 text-[13px] font-bold text-slate-700 active:scale-95 transition-all shadow-sm hover:bg-slate-50"
              >
                <Phone size={15} /> Call
              </a>
              <a
                href={whatsappLink}
                onClick={trackWhatsAppClick}
                target="_blank"
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-3.5 text-[13px] font-black text-white shadow-md shadow-[#25D366]/20 active:scale-95 transition-all hover:bg-[#20ba59]"
              >
                <FaWhatsapp size={18} /> WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
