"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";

type ServiceFooterProps = {
  whatsappUrl: string;
  services: string[];
  onOpenModal: () => void;
  onCallClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onWhatsAppClick: () => void;
};

const PAGE_LINKS = [
  { label: "Services", href: "#pricing" },
  { label: "Our Results", href: "#results" },
  { label: "Industries", href: "#industries" },
  { label: "Our Work", href: "#our-work" },
  { label: "FAQs", href: "#faq" },
];

// Profiles listed in the site's Organization schema (components/seo/OrganizationSchema.tsx).
const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/clevercrow.strategies", icon: FaInstagram },
  { label: "Facebook", href: "https://www.facebook.com/people/Clever-Crow-Strategies/61579261586907/", icon: FaFacebookF },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/clever-crow-strategies/", icon: FaLinkedinIn },
];

const linkClass = "text-sm text-slate-400 transition hover:text-white";

export default function ServiceFooter({ whatsappUrl, services, onOpenModal, onCallClick, onWhatsAppClick }: ServiceFooterProps) {
  return (
    <footer id="site-footer" className="relative overflow-hidden bg-[#050b1f] text-white">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-blue-700/20 blur-[140px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        {/* CTA band */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f2257] via-[#0b1a44] to-[#071330] p-8 sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl" aria-hidden="true" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">Let&apos;s grow together</p>
              <p className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">Ready to get more leads and sales?</p>
              <p className="mt-3 text-base text-slate-300">
                Share your goals and we&apos;ll map out the right mix of SEO, ads, website and automation for your business.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <button
                type="button"
                onClick={onOpenModal}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#FFCE1B] px-6 text-sm font-bold text-[#071330] transition hover:brightness-105 cursor-pointer"
              >
                Get Free Callback
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </button>
              <a
                href={whatsappUrl}
                onClick={onWhatsAppClick}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-6 text-sm font-bold text-white transition hover:bg-white/10"
              >
                <FaWhatsapp className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 sm:py-16 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-4">
            <span className="inline-flex items-center rounded-2xl bg-white px-5 py-2.5 shadow-sm">
              <Image src="/lp/digital-marketing/images/logo-dark.svg" alt="Clever Crow" width={160} height={44} className="h-9 w-auto" />
            </span>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              Clever Crow Strategies LLP is a performance marketing agency helping businesses grow with SEO, Google &amp; Meta
              Ads, websites and marketing automation.
            </p>
            <div className="mt-6 flex gap-2.5">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-amber-400 hover:bg-amber-400 hover:text-[#071330]"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white">Services</p>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a href="#pricing" className={linkClass}>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white">On this page</p>
            <ul className="mt-5 space-y-3">
              {PAGE_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white">Contact</p>
            <ul className="mt-5 space-y-4 text-sm text-slate-400">
              <li>
                <a href="tel:09986389444" onClick={onCallClick} className="flex items-center gap-3 transition hover:text-white">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5">
                    <Phone className="h-4 w-4 text-amber-400" aria-hidden="true" />
                  </span>
                  +91 99863 89444
                </a>
              </li>
              <li>
                <a href={whatsappUrl} onClick={onWhatsAppClick} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition hover:text-white">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5">
                    <FaWhatsapp className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
                  </span>
                  Chat on WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5">
                  <MapPin className="h-4 w-4 text-amber-400" aria-hidden="true" />
                </span>
                <span className="leading-relaxed">
                  Business Bay Center, Udupi–Manipal Highway, Kunjibettu, Udupi, Karnataka 576102
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Clever Crow Strategies LLP. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="/privacy-policy" className="transition hover:text-white">
              Privacy Policy
            </a>
            <a href="/terms-and-conditions" className="transition hover:text-white">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
