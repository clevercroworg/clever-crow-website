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
    label: "App Development",
    key: "apps",
    items: [
      { href: "/services/mobile-app-development", label: "Mobile App Development" },
      { href: "/services/web-app-development", label: "Web Application Development" },
    ],
  },
  {
    label: "Website Development",
    key: "web",
    items: [
      { href: "/services/business-websites", label: "Business Websites" },
      { href: "/services/ecommerce", label: "E-commerce Websites" },
    ],
  },
  {
    label: "Digital Marketing",
    key: "marketing",
    items: [
      { href: "/services/google-ads", label: "Google Ads" },
      { href: "/services/meta-ads", label: "Meta Ads" },
      { href: "/services/linkedin-ads", label: "LinkedIn Advertising" },
      { href: "/services/seo", label: "Search Engine Optimization" },
    ],
  },
  {
    label: "Branding",
    key: "branding",
    items: [
      { href: "/services/strategy-planning", label: "Branding & Strategy" },
      { href: "/services/content-writing", label: "Content Creation" },
      { href: "/services/logo-design", label: "Logo Design" },
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
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.99 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-1/2 top-[calc(100%+12px)] -translate-x-1/2"
                    onMouseEnter={() => openDropdown(group.key)}
                  >
                    <div className="w-[280px] rounded-[2rem] bg-white ring-1 ring-black/[0.05] shadow-[0_20px_48px_rgba(0,0,0,0.15)] overflow-hidden p-2">
                        {group.items.map((item, i) => (
                          <Link
                            key={i}
                            href={item.href}
                            className={`group flex items-center justify-between rounded-2xl px-4 py-3 text-[13px] font-bold transition-all duration-150 ${
                              pathname === item.href
                                ? "bg-yellow-50 text-yellow-600"
                                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                            }`}
                          >
                            {item.label}
                            <ArrowRight size={14} className={`transition-all duration-200 ${pathname === item.href ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0"}`} />
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
            className="flex items-center gap-2 rounded-full border border-black/5 bg-black/[0.03] px-4 py-2 text-[11px] font-black text-slate-700 hover:bg-black/[0.08] transition-all tracking-tight uppercase"
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 text-slate-900 shadow-md shadow-yellow-500/20">
              <Phone size={10} fill="currentColor" />
            </div>
            {phoneNumber}
          </a>
          <a
            href={whatsappLink}
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
            className="absolute top-20 left-4 right-4 z-50 rounded-[2rem] border border-black/10 bg-white shadow-2xl xl:hidden max-h-[75vh] overflow-y-auto pointer-events-auto"
          >
            <nav className="p-6 flex flex-col gap-2">
              {navLinks.map((group) => (
                <div key={group.key} className="border-b border-slate-50 last:border-0 pb-1">
                  <button
                    onClick={() => setMobileAccordion(mobileAccordion === group.key ? null : group.key)}
                    className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-[14px] font-bold transition-colors ${
                      mobileAccordion === group.key || group.items.some(item => item.href === pathname)
                        ? "text-yellow-600 bg-yellow-50"
                        : "text-slate-900"
                    }`}
                  >
                    {group.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${
                        mobileAccordion === group.key || group.items.some(item => item.href === pathname) ? "rotate-180" : "text-slate-400"
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === group.key && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-4 border-l-2 border-slate-50 pl-4 py-2 flex flex-col gap-1">
                          {group.items.map((item, i) => (
                            <Link
                              key={i}
                              href={item.href}
                              className={`block py-2 text-[13px] font-medium transition-colors ${
                                pathname === item.href
                                  ? "text-yellow-600 font-bold"
                                  : "text-slate-500 hover:text-slate-900"
                              }`}
                            >
                              {item.label}
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
                className={`block rounded-2xl px-4 py-3 text-[14px] font-bold transition-colors ${
                  pathname === "/contact" ? "text-yellow-600 bg-yellow-50" : "text-slate-900"
                }`}
              >
                Contact Us
              </Link>
            </nav>

            <div className="pt-6 mt-4 border-t border-slate-100 flex gap-4">
              <a
                href={`tel:${phoneNumber}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-50 py-4 text-[13px] font-bold text-slate-900 active:scale-95 transition-transform"
              >
                <Phone size={16} /> Call
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-4 text-[13px] font-black text-white shadow-lg active:scale-95 transition-transform"
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
