"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight, BadgeCheck, Check, PackageCheck, ShoppingBag, Star, Truck, type LucideIcon } from "lucide-react";
import type { EcommerceLandingData } from "./ecommerce-data";
import { openQuote } from "./EcommerceQuoteModal";

// Compact hero: about one phone screen tall, so the offer and both buttons are visible without scrolling.
// The form opens as a pop-up to keep this short. Desktop adds a phone mockup; phones skip it to stay
// short and fast.

// A store notification that changes every few seconds: shows what running the store feels like.
// "yourbrand.in" makes clear it's an example, not a real client's order. Stays still for people who reduce motion.
const NOTIFICATIONS: { icon: LucideIcon; tone: string; text: string }[] = [
  { icon: ShoppingBag, tone: "bg-emerald-100 text-emerald-700", text: "New order · ₹1,299 · Paid via UPI" },
  { icon: BadgeCheck, tone: "bg-amber-100 text-amber-700", text: "COD order confirmed · ₹849" },
  { icon: Truck, tone: "bg-blue-100 text-blue-700", text: "Order #1042 shipped to Pune" },
  { icon: ShoppingBag, tone: "bg-emerald-100 text-emerald-700", text: "New order · ₹2,450 · Paid by card" },
];

function OrderToast({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % NOTIFICATIONS.length), 2800);
    return () => clearInterval(t);
  }, []);
  const n = NOTIFICATIONS[i];
  const Icon = n.icon;
  return (
    <div className={`inline-flex max-w-full items-center gap-2.5 rounded-2xl bg-white/95 py-1.5 pl-1.5 pr-3.5 text-slate-900 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6)] ${className}`} aria-hidden="true">
      <span key={i} className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl ${n.tone} motion-safe:animate-[ccToastIn_0.45s_ease-out]`}>
        <Icon className="h-4 w-4" />
      </span>
      <span key={`t${i}`} className="min-w-0 leading-tight motion-safe:animate-[ccToastIn_0.45s_ease-out]">
        <span className="block text-[10px] font-semibold uppercase tracking-wide text-slate-400">yourbrand.in · now</span>
        <span className="block truncate text-[13px] font-bold">{n.text}</span>
      </span>
    </div>
  );
}

export default function EcommerceHero({ data }: { data: EcommerceLandingData["hero"] }) {
  return (
    <section className="relative overflow-hidden bg-[#050a1c] pt-[5.25rem] pb-7 text-white sm:pt-28 sm:pb-14 lg:pt-32 lg:pb-16">
      <style>{`
        @keyframes ccToastIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @keyframes ccFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
      `}</style>
      <div className="absolute inset-0 bg-gradient-to-br from-[#050a1c] via-[#0a1433] to-[#0f1d4a]" aria-hidden="true" />
      <div className="absolute -left-40 -top-24 h-[420px] w-[520px] rounded-full bg-blue-600/15 blur-[130px]" aria-hidden="true" />
      <div className="absolute -right-32 top-1/3 h-[380px] w-[380px] rounded-full bg-amber-500/10 blur-[120px]" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FFC72C]/40 to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-7">
          {/* Phones: the live notification takes the label's place, so the hero doesn't grow */}
          <OrderToast className="sm:hidden" />
          <p className="hidden items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-[12px] font-semibold text-amber-200 sm:inline-flex sm:text-[13px]">
            <PackageCheck className="h-3.5 w-3.5" aria-hidden="true" />
            E-commerce Website Development
          </p>

          <h1 className="mt-3 text-[clamp(1.85rem,8.6vw,2.6rem)] font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            <span className="block">{data.title}</span>
            <span className="block bg-gradient-to-r from-[#FFC72C] to-[#F59E0B] bg-clip-text pb-1 text-transparent">{data.accentTitle}</span>
          </h1>

          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-300 sm:mt-5 sm:text-lg">{data.subtitle}</p>

          <ul className="mt-4 grid max-w-xl grid-cols-2 gap-x-3 gap-y-2 sm:mt-7 sm:gap-x-6">
            {data.highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-[13px] font-semibold leading-snug text-slate-100 sm:text-[15px]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                  <Check className="h-3 w-3 stroke-[3]" aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-8 sm:flex sm:flex-wrap">
            <button
              type="button"
              onClick={() => openQuote()}
              className="inline-flex h-12 items-center justify-center gap-1.5 rounded-xl bg-[#FFC72C] px-4 text-[15px] font-bold text-slate-950 shadow-[0_10px_30px_-10px_rgba(255,199,44,0.7)] transition hover:brightness-105 sm:px-7"
            >
              Get Free Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <a
              href="#package"
              className="inline-flex h-12 items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-4 text-[15px] font-bold text-white transition hover:bg-white/10 sm:px-7"
            >
              {data.ctaLabel ?? "View Packages"} <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-slate-400 sm:mt-5">
            <span className="flex items-center gap-1 font-semibold text-slate-200">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" /> 4.9/5 rating
            </span>
            <span aria-hidden="true">·</span>
            <span>150+ websites delivered</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span className="hidden sm:inline">15+ years experience</span>
          </p>
        </div>

        <div className="relative hidden lg:col-span-5 lg:block">
          {/* Edges faded into the hero background so the photo's own backdrop doesn't show as a box. */}
          <Image
            src="/lp/ecommerce/hero-phone-mockup.jpg"
            alt="An online store on a phone, with a new order paid by UPI and an order out for delivery"
            width={896}
            height={1200}
            sizes="420px"
            className="mx-auto h-auto w-[420px] max-w-full motion-safe:animate-[ccFloat_6s_ease-in-out_infinite]"
            style={{
              maskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, black 72%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, black 72%, transparent 100%)",
            }}
          />
          <OrderToast className="absolute bottom-10 left-0 xl:left-4" />
        </div>
      </div>
    </section>
  );
}
