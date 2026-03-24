"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { FaWhatsapp } from "react-icons/fa";

const navLinks = [
  {
    label: "App Development",
    key: "app-dev",
    items: [
      { href: "/services/mobile-app-development", label: "Mobile App Development", accent: true },
      { href: "/services/web-app-development", label: "Web Application Development" },
    ],
  },
  {
    label: "Website Development",
    key: "web-dev",
    items: [
      { href: "/services/business-websites", label: "Business Websites", accent: true },
      { href: "/services/ecommerce", label: "E-commerce Websites" },
    ],
  },
  {
    label: "Digital Marketing",
    key: "digi-marketing",
    items: [
      { href: "/services/google-ads", label: "Google Ads" },
      { href: "/services/meta-ads", label: "Meta Ads" },
      { href: "/services/social-media-management", label: "Social Media Management" },
      { href: "/services/linkedin-ads", label: "LinkedIn Advertising" },
      { href: "/services/seo", label: "Search Engine Optimisation" },
      { href: "/services/ai-seo", label: "AI SEO Algorithms", accent: true },
    ],
  },
  {
    label: "Branding",
    key: "branding",
    items: [
      { href: "/services/content-writing", label: "Content Writing" },
      { href: "/services/script-writing", label: "Script Writing" },
      { href: "/services/content-marketing", label: "Content Marketing" },
      { href: "/services/logo-design", label: "Logo Design", accent: true },
      { href: "/services/graphic-design", label: "Graphic Design" },
      { href: "/services/strategy-planning", label: "Strategy & Planning", accent: true },
    ],
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const phoneNumber = "9986389444";
  const whatsappLink = `https://wa.me/91${phoneNumber}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  let dropdownTimer: NodeJS.Timeout;
  const openDropdown = (key: string) => {
    clearTimeout(dropdownTimer);
    setActiveDropdown(key);
  };
  const closeDropdown = () => {
    dropdownTimer = setTimeout(() => setActiveDropdown(null), 120);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[100] pointer-events-none">
      <div className="mx-auto max-w-7xl px-4 pt-2 sm:pt-3">
        <motion.div
          initial={false}
          animate={{
            backgroundColor: scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.85)",
            boxShadow: scrolled
              ? "0 20px 48px rgba(0,0,0,0.12)"
              : "0 10px 30px rgba(0,0,0,0.06)",
            height: scrolled ? "64px" : "76px",
            y: 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="pointer-events-auto rounded-3xl sm:rounded-full backdrop-blur-xl border border-gray-200/50 shadow-2xl"
        >
          <div className="mx-auto px-6 h-full flex items-center justify-between">
            
            {/* LOGO: Exclusive usage of logo-dark.svg */}
            <Link href="/" className="relative z-10 flex shrink-0 items-center">
              <Image
                src="/logo-dark.svg"
                alt="Clever Crow"
                width={160}
                height={50}
                className="h-8 xl:h-9 w-auto object-contain transition-transform duration-300"
                priority
              />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden xl:flex items-center gap-0.5" onMouseLeave={closeDropdown}>
              {navLinks.map((group) => (
                <div key={group.key} className="relative" onMouseEnter={() => openDropdown(group.key)}>
                  <button
                    className={`flex items-center gap-1 rounded-full px-3 2xl:px-4 py-2 text-[13px] 2xl:text-[14px] font-semibold tracking-tight transition-all duration-200 ${
                      activeDropdown === group.key
                        ? "text-yellow-600 bg-yellow-50"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
                    }`}
                  >
                    {group.label}
                    <ChevronDownIcon
                      className={`h-3 w-3 transition-transform duration-300 ${
                        activeDropdown === group.key ? "rotate-180" : ""
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
                        className="absolute left-1/2 top-[calc(100%+8px)] -translate-x-1/2"
                        onMouseEnter={() => openDropdown(group.key)}
                      >
                        <div className="w-[300px] rounded-[1.75rem] bg-white ring-1 ring-black/[0.08] shadow-[0_20px_48px_rgba(0,0,0,0.12)] overflow-hidden">
                          <div className="h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-600" />
                          <div className="p-3">
                            {group.items.map((item, i) => (
                              <Link
                                key={i}
                                href={item.href}
                                className={`group flex items-center justify-between rounded-2xl px-4 py-3 text-[14px] font-medium transition-all duration-150 hover:bg-gray-50 ${
                                  item.accent
                                    ? "text-yellow-600 hover:text-yellow-700 font-bold"
                                    : "text-gray-600 hover:text-gray-900"
                                }`}
                              >
                                {item.label}
                                <ArrowRightIcon className="h-4 w-4 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-60 group-hover:translate-x-0" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <DesktopLink href="/contact">Contact</DesktopLink>
            </nav>

            {/* DESKTOP CTAs */}
            <div className="hidden xl:flex items-center gap-2.5">
              <a
                href={`tel:${phoneNumber}`}
                className="flex items-center gap-1.5 rounded-full border border-gray-200/80 bg-white/50 px-4 2xl:px-5 py-2.5 text-[13px] 2xl:text-[14px] font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md hover:-translate-y-px active:scale-95"
              >
                <PhoneIcon className="h-4 w-4 text-yellow-500" />
                {phoneNumber}
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                className="flex items-center gap-1.5 rounded-full bg-[#25D366] px-5 2xl:px-6 py-2.5 text-[13px] 2xl:text-[14px] font-black text-white shadow-lg shadow-[#25D366]/20 transition-all hover:bg-[#128C7E] hover:shadow-[#25D366]/30 hover:-translate-y-px active:scale-[0.98] ring-4 ring-[#25D366]/10"
              >
                <FaWhatsapp className="h-4 w-4 2xl:h-4.5 2xl:w-4.5" />
                WhatsApp
              </a>
            </div>

            {/* MOBILE TOGGLE */}
            <div className="flex items-center gap-2.5 xl:hidden relative z-10">
              <a
                href={whatsappLink}
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/25 transition-transform hover:scale-105"
              >
                <FaWhatsapp className="h-5 w-5" />
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 border border-gray-100 shadow-sm transition-transform hover:scale-105"
              >
                {menuOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* MOBILE MENU */}
      <div className="mx-auto max-w-7xl px-4 pointer-events-none">
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="xl:hidden overflow-hidden bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-2xl rounded-3xl mt-3 pointer-events-auto"
            >
              <div className="px-5 py-6 space-y-2">
                {navLinks.map((group) => (
                <div key={group.key} className="border-b border-gray-100 last:border-0 pb-1 mb-1">
                  <button
                    onClick={() => setMobileAccordion(mobileAccordion === group.key ? null : group.key)}
                    className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-[16px] font-semibold text-gray-900 transition-colors hover:bg-gray-50"
                  >
                    {group.label}
                    <ChevronDownIcon
                      className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                        mobileAccordion === group.key ? "rotate-180 text-yellow-500" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === group.key && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-5 border-l-2 border-yellow-400/30 pl-4 pb-4 space-y-1">
                          {group.items.map((item, i) => (
                            <Link
                              key={i}
                              href={item.href}
                              onClick={() => setMenuOpen(false)}
                              className={`block py-2.5 text-[15px] font-medium transition-colors ${
                                item.accent ? "text-yellow-600" : "text-gray-500 hover:text-gray-900"
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

              <MobileNavLink href="/contact" setOpen={setMenuOpen}>Contact Us</MobileNavLink>

              {/* Mobile CTAs */}
              <div className="pt-6 mt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
                <a
                  href={`tel:${phoneNumber}`}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-gray-100 py-4 text-[15px] font-semibold text-gray-900 transition-transform hover:scale-[0.98] active:scale-95"
                >
                  <PhoneIcon className="h-4.5 w-4.5" /> Call
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-4 text-[15px] font-bold text-white shadow-lg shadow-[#25D366]/20 transition-transform hover:scale-[0.98] active:scale-95"
                >
                  <FaWhatsapp className="h-4.5 w-4.5" /> WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function DesktopLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-full px-3 2xl:px-4 py-2 text-[13px] 2xl:text-[14px] font-semibold tracking-tight text-gray-700 transition-all duration-200 hover:text-gray-900 hover:bg-gray-100/50"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, setOpen, children }: { href: string; setOpen: (v: boolean) => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className="block rounded-2xl px-4 py-3.5 text-[16px] font-semibold text-gray-900 hover:bg-gray-50"
    >
      {children}
    </Link>
  );
}
