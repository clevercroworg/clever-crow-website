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
  Laptop,
  Smartphone,
  Cpu,
  Megaphone,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const servicesMegaMenu = [
  {
    category: "Website Development",
    icon: Laptop,
    color: "text-blue-500 bg-blue-50",
    items: [
      { label: "Business Website Development", href: "/business-website-development" },
      { label: "React / Next.js Website Development", href: "/react-nextjs-website-development" },
      { label: "Ecommerce Website Development", href: "/ecommerce-website-development" },
      { label: "Landing Page Development", href: "/landing-page-development" },
      { label: "Website Redesign", href: "/website-redesign-services" },
      { label: "Website Maintenance", href: "/website-maintenance-services" },
    ]
  },
  {
    category: "App Development",
    icon: Smartphone,
    color: "text-purple-500 bg-purple-50",
    items: [
      { label: "Mobile App Development", href: "/mobile-app-development" },
      { label: "Web App Development", href: "/web-app-development" },
      { label: "SaaS Product Development", href: "/saas-product-development" },
      { label: "CRM & Dashboard Development", href: "/crm-dashboard-development" },
      { label: "Booking System Development", href: "/booking-system-development" },
      { label: "Admin Panel Development", href: "/admin-panel-development" },
      { label: "Customer Portal Development", href: "/customer-portal-development" },
    ]
  },
  {
    category: "AI Automation",
    icon: Cpu,
    color: "text-emerald-500 bg-emerald-50",
    items: [
      { label: "AI Chatbot Development", href: "/ai-chatbot-development" },
      { label: "WhatsApp Automation", href: "/whatsapp-automation-services" },
      { label: "Lead Management Automation", href: "/lead-management-automation" },
      { label: "CRM Automation", href: "/crm-automation-services" },
      { label: "Sales Follow-Up Automation", href: "/sales-follow-up-automation" },
      { label: "Workflow Automation", href: "/workflow-automation-services" },
      { label: "AI Customer Support Automation", href: "/ai-customer-support-automation" },
    ]
  },
  {
    category: "Digital Marketing",
    icon: Megaphone,
    color: "text-amber-500 bg-amber-50",
    items: [
      { label: "Google Ads Management", href: "/google-ads-management-services" },
      { label: "Meta Ads Management", href: "/meta-ads-management-services" },
      { label: "SEO Services", href: "/seo-services" },
      { label: "Social Media Management", href: "/social-media-management-services" },
      { label: "Lead Generation Campaigns", href: "/lead-generation-campaigns" },
      { label: "Performance Marketing", href: "/performance-marketing-agency" },
      { label: "Analytics & Tracking Setup", href: "/analytics-tracking-setup" },
    ]
  }
];



export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [mobileSubAccordion, setMobileSubAccordion] = useState<string | null>(null);
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

  return (
    <header className="fixed inset-x-0 top-4 z-[100] flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex w-full max-w-[95%] items-center justify-between gap-2 rounded-full border border-white/40 bg-white/80 px-5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-2xl transition-all hover:bg-white/90 ring-1 ring-white/20">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center shrink-0 transition-transform hover:scale-105 active:scale-95">
          <Image
            src="/CSS.png"
            alt="Clever Crow"
            width={100}
            height={28}
            className="h-6 md:h-7 w-auto object-contain"
            priority
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden xl:flex items-center gap-0.5" onMouseLeave={closeDropdown}>
          
          {/* Services Dropdown */}
          <div className="relative" onMouseEnter={() => openDropdown("services")}>
            <button
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[10px] font-black transition-all tracking-[0.15em] uppercase ${
                activeDropdown === "services"
                  ? "text-yellow-600 bg-black/5"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Services
              <ChevronDown
                size={10}
                className={`transition-transform duration-300 ${
                  activeDropdown === "services" ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {activeDropdown === "services" && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute left-1/2 top-[calc(100%+12px)] -translate-x-1/2 z-50"
                  onMouseEnter={() => openDropdown("services")}
                >
                  <div className="w-[1020px] rounded-[2.5rem] bg-white ring-1 ring-black/[0.05] shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden p-8 border border-slate-100/50 grid grid-cols-4 gap-8">
                    {servicesMegaMenu.map((cat, i) => (
                      <div key={i} className="flex flex-col">
                        {/* Column Header */}
                        <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-slate-100">
                          <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${cat.color} shrink-0`}>
                            <cat.icon size={14} className="stroke-[2.5]" />
                          </div>
                          <span className="text-[11px] font-black tracking-widest text-slate-800 uppercase leading-none">
                            {cat.category}
                          </span>
                        </div>
                        
                        {/* Items */}
                        <div className="flex flex-col gap-0.5">
                          {cat.items.map((item, j) => (
                            <Link
                              key={j}
                              href={item.href}
                              className={`group flex items-center justify-between rounded-xl px-3 py-2 text-left hover:bg-slate-50/80 transition-colors ${
                                pathname === item.href ? "bg-yellow-50/50" : ""
                              }`}
                            >
                              <span className={`text-[11.5px] font-bold leading-snug transition-colors ${
                                pathname === item.href 
                                  ? "text-yellow-600" 
                                  : "text-slate-500 group-hover:text-yellow-600"
                              }`}>
                                {item.label}
                              </span>
                              <ArrowRight size={10} className={`text-yellow-500 transition-all duration-150 ${
                                pathname === item.href
                                  ? "opacity-100 translate-x-0"
                                  : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                              }`} />
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Industries Link */}
          <Link 
            href="/#industries" 
            className="rounded-full px-3.5 py-1.5 text-[10px] font-black transition-all tracking-[0.15em] uppercase text-slate-600 hover:text-slate-900"
          >
            Industries
          </Link>

          {/* About Us Link */}
          <Link 
            href="/" 
            className={`rounded-full px-3.5 py-1.5 text-[10px] font-black transition-all tracking-[0.15em] uppercase ${
              pathname === "/" ? "text-yellow-600 bg-black/5" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            About Us
          </Link>

          {/* Contact Link */}
          <Link 
            href="/contact" 
            className={`rounded-full px-3.5 py-1.5 text-[10px] font-black transition-all tracking-[0.15em] uppercase ${
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
              
              {/* Services Accordion */}
              <div className="border-b border-slate-50 pb-1">
                <button
                  onClick={() => setMobileAccordion(mobileAccordion === "services" ? null : "services")}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-[14px] transition-all duration-200 border ${
                    mobileAccordion === "services"
                      ? "text-yellow-600 bg-yellow-50/80 border-yellow-100/50 font-bold"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-50/50 border-transparent font-semibold"
                  }`}
                >
                  Services
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      mobileAccordion === "services" ? "rotate-180 text-yellow-600" : "text-slate-400"
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {mobileAccordion === "services" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="ml-3 border-l border-slate-100 pl-3 py-2 flex flex-col gap-1.5">
                        {servicesMegaMenu.map((cat, i) => (
                          <div key={i} className="mb-1">
                            <button
                              onClick={() => setMobileSubAccordion(mobileSubAccordion === cat.category ? null : cat.category)}
                              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[13px] transition-all duration-150 border ${
                                mobileSubAccordion === cat.category
                                  ? "text-yellow-600 font-bold bg-slate-50/50 border-slate-100/30"
                                  : "text-slate-600 font-semibold border-transparent"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <cat.icon size={13} className="text-yellow-600" />
                                <span>{cat.category}</span>
                              </div>
                              <ChevronDown
                                size={14}
                                className={`transition-transform duration-300 ${
                                  mobileSubAccordion === cat.category ? "rotate-180 text-yellow-600" : "text-slate-400"
                                }`}
                              />
                            </button>
                            <AnimatePresence>
                              {mobileSubAccordion === cat.category && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2, ease: "easeInOut" }}
                                  className="overflow-hidden"
                                >
                                  <div className="ml-4 border-l border-slate-100 pl-3 py-1 flex flex-col gap-1">
                                    {cat.items.map((item, j) => (
                                      <Link
                                        key={j}
                                        href={item.href}
                                        className={`flex items-center justify-between py-2 px-3 rounded-xl transition-all duration-150 border ${
                                          pathname === item.href
                                            ? "bg-yellow-50 text-yellow-600 font-bold border-yellow-100/30"
                                            : "hover:bg-slate-50 text-slate-500 hover:text-slate-900 border-transparent"
                                        }`}
                                      >
                                        <span className="text-[12px] font-bold leading-tight">{item.label}</span>
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Industries Link */}
              <Link
                href="/#industries"
                className="block rounded-xl px-4 py-3 text-[14px] transition-all duration-200 border text-slate-700 hover:text-slate-900 hover:bg-slate-50/50 border-transparent font-semibold"
              >
                Industries
              </Link>

              {/* About Us Link */}
              <Link
                href="/"
                className={`block rounded-xl px-4 py-3 text-[14px] transition-all duration-200 border ${
                  pathname === "/"
                    ? "text-yellow-600 bg-yellow-50/80 border-yellow-100/50 font-bold"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-50/50 border-transparent font-semibold"
                }`}
              >
                About Us
              </Link>

              {/* Contact Link */}
              <Link
                href="/contact"
                className={`block rounded-xl px-4 py-3 text-[14px] transition-all duration-200 border ${
                  pathname === "/contact"
                    ? "text-yellow-600 bg-yellow-50/80 border-yellow-100/50 font-bold"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-50/50 border-transparent font-semibold"
                }`}
              >
                Contact
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
