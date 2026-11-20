"use client";

import { ArrowRight, BarChart3, Check, CreditCard, LayoutDashboard, MessageCircle, Package, Phone, ShieldCheck, Smartphone, Tag, Truck, X, type LucideIcon } from "lucide-react";
import { ADS_CALL_CONVERSION, gtag } from "@/lib/tracking";
import type { EcommerceLandingData } from "./ecommerce-data";
import { openQuote } from "../components/QuoteModal";

const ICONS: Record<string, LucideIcon> = {
  payments: CreditCard,
  catalogue: Package,
  shipping: Truck,
  mobile: Smartphone,
  admin: LayoutDashboard,
  marketing: BarChart3,
  offers: Tag,
  secure: ShieldCheck,
};

function SectionHeading({ preTitle, title, subtitle, dark = false }: { preTitle: string; title: string; subtitle: string; dark?: boolean }) {
  return (
    <div className="text-center">
      <p className={`flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-wide ${dark ? "text-amber-300" : "text-blue-600"}`}>
        <span className="h-[3px] w-8 rounded-full bg-[#f4c542] sm:w-12" aria-hidden="true" />
        {preTitle}
        <span className="h-[3px] w-8 rounded-full bg-[#f4c542] sm:w-12" aria-hidden="true" />
      </p>
      <h2 className={`mt-2 text-balance text-[1.7rem] font-bold leading-tight tracking-tight sm:text-4xl ${dark ? "text-white" : "text-slate-900"}`}>{title}</h2>
      <p className={`mx-auto mt-3 max-w-2xl text-[15px] leading-7 sm:text-lg ${dark ? "text-slate-300" : "text-slate-600"}`}>{subtitle}</p>
    </div>
  );
}

export function EcommerceComparison({ data }: { data: EcommerceLandingData["comparison"] }) {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <SectionHeading {...data} />
        <div className="mt-9 overflow-hidden rounded-3xl border border-slate-200 sm:mt-12">
          <div className="hidden grid-cols-2 bg-slate-50 text-sm font-bold uppercase tracking-wide sm:grid">
            <p className="px-6 py-4 text-rose-600">{data.beforeLabel}</p>
            <p className="border-l border-slate-200 bg-amber-50 px-6 py-4 text-slate-900">{data.afterLabel}</p>
          </div>
          <ul className="divide-y divide-slate-200">
            {data.rows.map((row) => (
              <li key={row.after} className="grid sm:grid-cols-2">
                <p className="flex items-start gap-2.5 px-5 pt-4 text-[14px] text-slate-500 sm:px-6 sm:py-4 sm:text-[15px]">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" aria-hidden="true" />
                  <span>
                    <span className="sr-only">{data.beforeLabel}: </span>
                    {row.before}
                  </span>
                </p>
                <p className="flex items-start gap-2.5 px-5 pb-4 pt-1.5 text-[15px] font-semibold text-slate-900 sm:border-l sm:border-slate-200 sm:bg-amber-50/40 sm:px-6 sm:py-4">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 stroke-[3] text-emerald-600" aria-hidden="true" />
                  <span>
                    <span className="sr-only">{data.afterLabel}: </span>
                    {row.after}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Drawn checkout screen for the payments card (large screens only, where the card has room). */
function CheckoutMock() {
  const options = [
    { label: "UPI", note: "GPay, PhonePe, Paytm", on: true },
    { label: "Card", note: "Debit or credit", on: false },
    { label: "Cash on Delivery", note: "Pay when it arrives", on: false },
  ];
  return (
    <div className="hidden self-center rounded-2xl bg-white p-4 text-slate-900 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.8)] lg:block lg:rotate-2" aria-hidden="true">
      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Checkout</p>
      <p className="mt-0.5 flex items-baseline justify-between text-[13px] font-semibold">
        Total <span className="text-lg font-black">₹1,848</span>
      </p>
      <ul className="mt-3 grid gap-2">
        {options.map((o) => (
          <li key={o.label} className={`flex items-center gap-2.5 rounded-xl border px-2.5 py-2 ${o.on ? "border-amber-400 bg-amber-50" : "border-slate-200"}`}>
            <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${o.on ? "border-amber-500" : "border-slate-300"}`}>
              {o.on && <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />}
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block text-[12px] font-bold">{o.label}</span>
              <span className="block truncate text-[10px] text-slate-500">{o.note}</span>
            </span>
          </li>
        ))}
      </ul>
      <span className="mt-3 flex h-9 items-center justify-center rounded-xl bg-slate-950 text-[12px] font-bold text-white">Pay ₹1,848</span>
      <p className="mt-2 flex items-center justify-center gap-1 text-[10px] text-slate-400">
        <ShieldCheck className="h-3 w-3" /> Secure payment
      </p>
    </div>
  );
}

export function EcommerceFeatures({ data, sell }: { data: EcommerceLandingData["features"]; sell: EcommerceLandingData["sell"] }) {
  const [lead, ...rest] = data.items;
  const LeadIcon = ICONS[lead.icon] ?? Package;
  return (
    <section className="bg-[#fbf8f3] py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <SectionHeading {...data} />

        {/* What they can sell: a swipeable row on phones, wrapped chips on larger screens */}
        <div className="mt-8 sm:mt-10">
          <p className="text-center text-[13px] font-bold uppercase tracking-wide text-slate-500">{sell.title}</p>
          <ul className="-mx-5 mt-3 flex snap-x gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
            {sell.items.map((item) => (
              <li key={item} className="shrink-0 snap-start rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[13px] font-semibold text-slate-700">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Bento: one large dark card, the rest in a grid */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5 lg:grid-cols-4">
          <article className="col-span-2 grid gap-6 overflow-hidden rounded-3xl bg-[#050a1c] p-5 text-white sm:p-7 lg:row-span-2 lg:grid-cols-[1fr_200px] xl:grid-cols-[1fr_220px]">
            <div className="flex flex-col justify-between gap-6">
              <div>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFC72C] text-slate-950">
                  <LeadIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-xl font-bold sm:text-2xl">{lead.title}</h3>
                <p className="mt-2 max-w-md text-[14px] leading-relaxed text-slate-300 sm:text-[15px]">{lead.text}</p>
              </div>
              <div className="flex flex-wrap gap-2" aria-hidden="true">
                {["UPI", "Cards", "Net banking", "Wallets", "Cash on Delivery"].map((m) => (
                  <span key={m} className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-[12px] font-semibold text-slate-200">
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <CheckoutMock />
          </article>
          {rest.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Package;
            // The last card fills the row's spare space, so no gap is left next to it.
            const wide = i === rest.length - 1 && rest.length % 2 === 1;
            return (
              <article key={item.title} className={`rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 ${wide ? "col-span-2" : ""}`}>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fdf0c4] text-slate-950 sm:h-11 sm:w-11">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-[15px] font-bold leading-snug text-slate-900 sm:mt-4 sm:text-base">{item.title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-slate-600 sm:text-[14px]">{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function EcommerceProcess({ data }: { data: EcommerceLandingData["process"] }) {
  return (
    <section className="bg-[#050a1c] py-14 text-white sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <SectionHeading {...data} dark />
        {/* Timeline: vertical on phones, horizontal from tablets up */}
        <ol className="relative mt-9 grid gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          <span className="absolute bottom-6 left-5 top-5 w-px bg-gradient-to-b from-[#FFC72C] to-white/10 sm:hidden" aria-hidden="true" />
          <span className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-[#FFC72C] via-white/20 to-white/10 lg:block" aria-hidden="true" />
          {data.steps.map((step, i) => (
            <li key={step.title} className="relative flex gap-4 sm:block">
              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFC72C] text-base font-black text-slate-950 ring-8 ring-[#050a1c]">
                {i + 1}
              </span>
              <div className="min-w-0 sm:mt-5">
                <p className="text-[12px] font-bold uppercase tracking-wider text-amber-300">{step.days}</p>
                <h3 className="mt-0.5 text-lg font-bold">{step.title}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-slate-300">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mx-auto mt-8 max-w-2xl text-center text-[13px] text-slate-400">{data.note}</p>
      </div>
    </section>
  );
}

export function EcommerceFinalCta({ data, whatsappMessage }: { data: EcommerceLandingData["finalCta"]; whatsappMessage: string }) {
  return (
    <section className="bg-white px-5 py-12 sm:px-6 sm:py-16">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#050a1c] via-[#0a1433] to-[#14245c] px-6 py-10 text-center text-white sm:px-12 sm:py-14">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-400/20 blur-[90px]" aria-hidden="true" />
        <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-blue-500/20 blur-[90px]" aria-hidden="true" />
        <div className="relative">
          <h2 className="text-[1.6rem] font-black leading-tight tracking-tight sm:text-4xl">{data.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-slate-300 sm:text-lg">{data.text}</p>
          <div className="mx-auto mt-7 grid max-w-md gap-3 sm:flex sm:max-w-none sm:justify-center">
            <button type="button" onClick={() => openQuote()} className="inline-flex h-12 items-center justify-center gap-1.5 rounded-xl bg-[#FFC72C] px-7 text-[15px] font-bold text-slate-950 hover:brightness-105">
              Get Free Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <a
              href={`https://wa.me/919986389444?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-7 text-[15px] font-bold text-white hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Phones only: call, WhatsApp and quote always one tap away. Replaces the floating WhatsApp button on small screens. */
export function MobileActionBar({ whatsappMessage }: { whatsappMessage: string }) {
  const wa = `https://wa.me/919986389444?text=${encodeURIComponent(whatsappMessage)}`;
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-3 pb-[calc(0.6rem+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur sm:hidden">
      <div className="grid grid-cols-[1fr_1fr_1.4fr] gap-2">
        <a
          href="tel:+919986389444"
          onClick={() => gtag("event", "conversion", { send_to: ADS_CALL_CONVERSION })}
          className="flex h-11 items-center justify-center gap-1.5 rounded-xl border border-slate-300 text-[14px] font-bold text-slate-900"
        >
          <Phone className="h-4 w-4" aria-hidden="true" /> Call
        </a>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="flex h-11 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] text-[14px] font-bold text-white">
          <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
        </a>
        <button type="button" onClick={() => openQuote()} className="flex h-11 items-center justify-center rounded-xl bg-[#FFC72C] text-[14px] font-bold text-slate-950">
          Get Free Quote
        </button>
      </div>
    </div>
  );
}
