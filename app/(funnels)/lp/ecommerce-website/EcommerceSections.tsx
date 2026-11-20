"use client";

import { BarChart3, CreditCard, LayoutDashboard, MessageCircle, Package, Phone, ShieldCheck, Smartphone, Tag, Truck, type LucideIcon } from "lucide-react";
import { ADS_CALL_CONVERSION, gtag } from "@/lib/tracking";
import type { EcommerceLandingData } from "./ecommerce-data";

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
      <h2 className={`mt-2 text-[1.7rem] font-bold leading-tight tracking-tight sm:text-4xl ${dark ? "text-white" : "text-slate-900"}`}>{title}</h2>
      <p className={`mx-auto mt-3 max-w-2xl text-[15px] leading-7 sm:text-lg ${dark ? "text-slate-300" : "text-slate-600"}`}>{subtitle}</p>
    </div>
  );
}

export function EcommerceFeatures({ data }: { data: EcommerceLandingData["features"] }) {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <SectionHeading {...data} />
        <div className="mt-9 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-4">
          {data.items.map((item) => {
            const Icon = ICONS[item.icon] ?? Package;
            return (
              <article key={item.title} className="rounded-2xl border border-slate-200/80 bg-[#fbf8f3] p-4 sm:p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4c542] text-slate-950 sm:h-11 sm:w-11">
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
        <ol className="mt-9 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {data.steps.map((step, i) => (
            <li key={step.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:block sm:p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFC72C] text-base font-black text-slate-950">{i + 1}</span>
              <div className="min-w-0 sm:mt-4">
                <p className="text-[12px] font-bold uppercase tracking-wider text-amber-300">{step.days}</p>
                <h3 className="mt-0.5 text-base font-bold">{step.title}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-slate-300">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mx-auto mt-6 max-w-2xl text-center text-[13px] text-slate-400">{data.note}</p>
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
        <a href="#quote" className="flex h-11 items-center justify-center rounded-xl bg-[#FFC72C] text-[14px] font-bold text-slate-950">
          Get Free Quote
        </a>
      </div>
    </div>
  );
}
