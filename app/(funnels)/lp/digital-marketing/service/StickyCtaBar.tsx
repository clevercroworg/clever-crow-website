"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

type StickyCtaBarProps = {
  whatsappUrl: string;
  onOpenModal: () => void;
  onCallClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onWhatsAppClick: () => void;
};

// Floating CTA dock. Hidden while the hero (which has its own form) or the footer (which has its own CTAs)
// is on screen, so it never duplicates them.
export default function StickyCtaBar({ whatsappUrl, onOpenModal, onCallClick, onWhatsAppClick }: StickyCtaBarProps) {
  const [heroVisible, setHeroVisible] = useState(true);
  const [footerVisible, setFooterVisible] = useState(false);
  const hidden = heroVisible || footerVisible;

  useEffect(() => {
    const hero = document.getElementById("top");
    const footer = document.getElementById("site-footer");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) setHeroVisible(entry.isIntersecting);
        if (entry.target === footer) setFooterVisible(entry.isIntersecting);
      }
    });
    if (hero) observer.observe(hero);
    if (footer) observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-all duration-500 ease-out sm:bottom-5 ${
        hidden ? "pointer-events-none translate-y-full opacity-0 sm:translate-y-24" : "translate-y-0 opacity-100"
      }`}
      aria-hidden={hidden}
      inert={hidden}
    >
      {/* Desktop / tablet: floating pill */}
      <div className="mx-auto hidden max-w-3xl items-center justify-between gap-4 rounded-full border border-white/10 bg-[#071330]/90 py-2 pl-6 pr-2 text-white shadow-[0_24px_60px_-12px_rgba(7,19,48,0.65)] ring-1 ring-black/5 backdrop-blur-xl sm:flex">
        <div className="flex min-w-0 items-center gap-3">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">Get a free growth strategy call</p>
            <p className="truncate text-xs text-slate-400">Talk to a digital marketing expert</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href="tel:09986389444"
            onClick={onCallClick}
            className="hidden h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-semibold text-white transition hover:bg-white/10 md:inline-flex"
          >
            <Phone className="h-4 w-4 text-amber-400" aria-hidden="true" />
            099863 89444
          </a>
          <a
            href={whatsappUrl}
            onClick={onWhatsAppClick}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white transition hover:brightness-110"
          >
            <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={onOpenModal}
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-[#FFCE1B] pl-5 pr-4 text-sm font-bold text-[#071330] transition hover:brightness-105 cursor-pointer"
          >
            Get Free Callback
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile: three-action dock */}
      <div className="border-t border-white/10 bg-[#071330]/95 px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-12px_30px_-10px_rgba(7,19,48,0.5)] backdrop-blur-xl sm:hidden">
        <div className="grid grid-cols-[1fr_1fr_1.6fr] gap-2">
          <a
            href="tel:09986389444"
            onClick={onCallClick}
            className="flex h-12 flex-col items-center justify-center gap-0.5 rounded-xl bg-white/10 text-[11px] font-semibold text-white active:scale-95 transition-transform"
          >
            <Phone className="h-4 w-4 text-amber-400" aria-hidden="true" />
            Call
          </a>
          <a
            href={whatsappUrl}
            onClick={onWhatsAppClick}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 flex-col items-center justify-center gap-0.5 rounded-xl bg-[#25D366] text-[11px] font-semibold text-white active:scale-95 transition-transform"
          >
            <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={onOpenModal}
            className="flex h-12 items-center justify-center gap-1.5 rounded-xl bg-[#FFCE1B] text-sm font-bold text-[#071330] active:scale-95 transition-transform cursor-pointer"
          >
            Free Callback
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
