"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MotionConfig } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  CheckCircle,
  ChevronDown,
  FileText,
  Globe,
  Info,
  Lock,
  MapPin,
  MessageCircleQuestion,
  Phone,
  Search,
  SearchCheck,
  Send,
  Settings2,
  Sparkles,
  Star,
  User,
  X,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { SiGoogleads, SiGoogleanalytics, SiGooglesearchconsole, SiGoogletagmanager, SiMeta, SiWhatsapp } from "react-icons/si";
import "../digital-marketing-service/service.css";
import SectionHeading from "../digital-marketing-service/SectionHeading";
import ArcBackground from "../digital-marketing-service/ArcBackground";
import HeroDoodles from "../digital-marketing-service/HeroDoodles";
import ServiceFooter from "../digital-marketing-service/ServiceFooter";
import ResultsShowcase from "../digital-marketing-service/ResultsShowcase";
import IndustriesServed from "../digital-marketing-service/IndustriesServed";
import StickyCtaBar from "../digital-marketing-service/StickyCtaBar";
import { Reveal, RiseText, Stagger, StaggerItem } from "../digital-marketing-service/motion";
import { noOrphan } from "../digital-marketing-service/text";
import { ADS_CALL_CONVERSION, gtag, trackLead } from "@/lib/tracking";
import {
  AUDIT,
  EXPLAINED,
  FAQS,
  FINAL_CTA,
  HERO,
  LEAD_SOURCE,
  PACKAGES,
  PROCESS,
  REPORTING,
  WHATSAPP_MESSAGE,
  WHAT_WE_DO,
  type SeoPackage,
} from "./content";

const WHAT_WE_DO_ICONS = [SearchCheck, Settings2, FileText, MapPin, Bot, BarChart3];
const EXPLAINED_ICONS = [Search, MessageCircleQuestion, Sparkles];

// Same client logos and partner platforms as /lp/seo-service.
const CLIENT_LOGOS = [
  "client1.png", "client2.png", "client3.png", "client4.png", "client5.png", "client6.png", "client7.png", "client8.png",
  "client9.png", "client10.png", "client11.png", "client12.png", "client13.png", "client14.png", "client16.png", "client18.png",
].map((name) => `/lp/digital-marketing/${name}`);

const PLATFORMS = [
  { name: "Google Ads", icon: SiGoogleads, color: "#4285F4" },
  { name: "Meta Ads", icon: SiMeta, color: "#0866FF" },
  { name: "Google Analytics", icon: SiGoogleanalytics, color: "#E37400" },
  { name: "Google Tag Manager", icon: SiGoogletagmanager, color: "#246FDB" },
  { name: "Search Console", icon: SiGooglesearchconsole, color: "#458CF5" },
  { name: "WhatsApp Business", icon: SiWhatsapp, color: "#25D366" },
];

const WHATSAPP_URL = `https://wa.me/919986389444?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

function trackCall() {
  gtag("event", "conversion", { send_to: ADS_CALL_CONVERSION });
}

async function postLead(body: Record<string, string>) {
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Something went wrong. Please try again.");
}

function scrollToAudit() {
  document.getElementById("audit")?.scrollIntoView({ behavior: "smooth", block: "start" });
  setTimeout(() => (document.getElementById("audit-website") as HTMLInputElement | null)?.focus({ preventScroll: true }), 600);
}

/** Free SEO audit form (section 3). */
function AuditForm() {
  const router = useRouter();
  const [values, setValues] = useState({ website: "", name: "", phone: "", goal: "" });
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<{ loading: boolean; error: string }>({ loading: false, error: "" });
  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const field =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.website.trim() || !values.name.trim() || !values.phone.trim()) {
      setState({ loading: false, error: "Please fill in your website, name and phone number." });
      return;
    }
    if (!consent) {
      setState({ loading: false, error: "Please tick the box so we can contact you about your review." });
      return;
    }
    setState({ loading: true, error: "" });
    try {
      await postLead({
        name: values.name.trim(),
        phone: values.phone.trim(),
        email: "",
        company: values.website.trim(),
        service: values.goal || "Free SEO audit",
        message: `Free SEO audit request. Website: ${values.website.trim()}. Wants to improve: ${values.goal || "Not specified"}.`,
        source: `${LEAD_SOURCE} (Free SEO Audit)`,
        consent: "Yes",
      });
      await trackLead("SEO Growth Audit Form");
      router.push("/thank-you");
    } catch (err) {
      setState({ loading: false, error: err instanceof Error ? err.message : "Something went wrong. Please try again." });
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-24px_rgba(7,19,48,0.25)] sm:p-8">
      <h3 className="text-2xl font-extrabold tracking-tight text-[#071330]">{AUDIT.form.heading}</h3>
      <p className="mt-1.5 text-sm text-slate-600">{AUDIT.form.subtitle}</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">
            Website URL<span className="text-rose-500">*</span>
          </span>
          <span className="relative block">
            <Globe className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              id="audit-website"
              type="text"
              inputMode="url"
              autoComplete="url"
              placeholder="yourbusiness.com"
              value={values.website}
              onChange={set("website")}
              disabled={state.loading}
              required
              className={`${field} pl-11`}
            />
          </span>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">
            Your name<span className="text-rose-500">*</span>
          </span>
          <span className="relative block">
            <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input type="text" autoComplete="name" placeholder="Your name" value={values.name} onChange={set("name")} disabled={state.loading} required className={`${field} pl-11`} />
          </span>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">
            Phone / WhatsApp number<span className="text-rose-500">*</span>
          </span>
          <span className="relative block">
            <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="10-digit mobile number"
              value={values.phone}
              onChange={set("phone")}
              disabled={state.loading}
              required
              className={`${field} pl-11`}
            />
          </span>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">What would you like to improve?</span>
          <span className="relative block">
            <select value={values.goal} onChange={set("goal")} disabled={state.loading} className={`${field} appearance-none pr-10 ${values.goal ? "" : "text-slate-400"}`}>
              <option value="">Select an option</option>
              {AUDIT.form.goals.map((g) => (
                <option key={g} value={g} className="text-slate-900">
                  {g}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          </span>
        </label>
        <label className="flex items-start gap-3 text-sm leading-snug text-slate-600">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            disabled={state.loading}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-[#071330]"
          />
          {AUDIT.form.consent}
        </label>
        <button
          type="submit"
          disabled={state.loading}
          className="group inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FFD84D] via-[#FFC21A] to-[#F5A10A] text-sm font-bold text-[#071330] shadow-lg shadow-amber-500/25 transition hover:brightness-105 active:scale-[0.99] disabled:opacity-60"
        >
          {state.loading ? "Sending..." : AUDIT.form.button}
          {!state.loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />}
        </button>
        {state.error && (
          <p className="text-sm text-rose-600" role="alert">
            {state.error}
          </p>
        )}
      </form>
      <p className="mt-5 flex items-center justify-center gap-1.5 border-t border-slate-100 pt-4 text-xs text-slate-500">
        <Lock className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
        We respect your privacy. 100% confidential.
      </p>
    </div>
  );
}

/** "Request a Call Back" popup for the package cards. */
function CallbackModal({ pkg, onClose }: { pkg: SeoPackage; onClose: () => void }) {
  const router = useRouter();
  const [values, setValues] = useState({ name: "", phone: "" });
  const [state, setState] = useState<{ loading: boolean; error: string }>({ loading: false, error: "" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.name.trim() || !values.phone.trim()) {
      setState({ loading: false, error: "Please fill in your name and phone number." });
      return;
    }
    setState({ loading: true, error: "" });
    try {
      await postLead({
        name: values.name.trim(),
        phone: values.phone.trim(),
        email: "",
        service: pkg.name,
        message: `Call back requested for ${pkg.name}${pkg.price ? ` (${pkg.price}/month + GST)` : ""}.`,
        source: `${LEAD_SOURCE} (${pkg.name})`,
      });
      await trackLead("SEO Growth Package Callback");
      router.push("/thank-you");
    } catch (err) {
      setState({ loading: false, error: err instanceof Error ? err.message : "Something went wrong. Please try again." });
    }
  }

  const input =
    "w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 text-[15px] outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="seo-modal-title">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
        <button onClick={onClose} className="absolute right-4 top-4 cursor-pointer rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
        <h3 id="seo-modal-title" className="mt-2 flex items-center gap-2 text-xl font-extrabold text-slate-900">
          <Phone className="h-5 w-5 text-amber-500" aria-hidden="true" />
          {pkg.cta}
        </h3>
        <p className="mb-5 mt-1 text-sm text-slate-500">Leave your details and our team will get back to you shortly.</p>
        <p className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-sm text-slate-700">
          Package: <span className="font-bold text-slate-900">{pkg.name}</span>
          {pkg.price && <span className="text-slate-500"> · {pkg.price}/month + GST</span>}
        </p>
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <label className="relative block">
            <span className="sr-only">Your name</span>
            <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
            <input type="text" autoComplete="name" placeholder="Your name" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} disabled={state.loading} className={input} />
          </label>
          <label className="relative block">
            <span className="sr-only">Phone / WhatsApp number</span>
            <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
            <input type="tel" inputMode="tel" autoComplete="tel" placeholder="Phone / WhatsApp number" value={values.phone} onChange={(e) => setValues({ ...values, phone: e.target.value })} disabled={state.loading} className={input} />
          </label>
          <button type="submit" disabled={state.loading} className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-700 disabled:opacity-50">
            <Send className="h-4 w-4" aria-hidden="true" />
            {state.loading ? "Sending..." : "Submit Request"}
          </button>
          {state.error && (
            <p className="text-sm text-rose-600" role="alert">
              {state.error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

/** Desktop hero illustration: a search page where the business shows up on Google, Maps and AI answers. */
function SearchPreview() {
  return (
    <div className="relative rounded-3xl border border-white/15 bg-white/[0.07] p-5 text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] ring-1 ring-inset ring-white/[0.04] backdrop-blur-xl" aria-hidden="true">
      <div className="flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 text-sm text-slate-500">
        <Search className="h-4 w-4 text-slate-400" />
        best service near me
      </div>
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-amber-300">
          <Sparkles className="h-3.5 w-3.5" /> AI answer
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-200">
          A trusted option nearby is <span className="font-bold text-white">Your Business</span>, known for clear pricing and quick response.
        </p>
      </div>
      <div className="mt-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-[#071330]">
          <MapPin className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-white">Your Business</p>
          <p className="flex items-center gap-1 text-xs text-slate-300">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> 4.9 · Open now · 1.2 km
          </p>
        </div>
      </div>
      <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
        <p className="text-xs text-emerald-300">yourbusiness.com</p>
        <p className="mt-0.5 text-sm font-bold text-white">Your Service in Your City | Your Business</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-300">Clear answers, real reviews and an easy way to call or WhatsApp.</p>
      </div>
    </div>
  );
}

export default function SeoGrowthClient() {
  const [modalPkg, setModalPkg] = useState<SeoPackage | null>(null);
  const [growth, essential] = [PACKAGES.items[1], PACKAGES.items[0]];

  return (
    <MotionConfig reducedMotion="user">
      <div className="svc-root bg-slate-50 text-slate-800 hospitality-funnel">
        {/* Navbar (same as /lp/seo-service) */}
        <nav className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <a href="#top" className="inline-flex min-w-0 items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/CSS.svg" alt="Clever Crow" className="h-6 w-auto min-[380px]:h-7 sm:h-8" />
            </a>
            <div className="flex items-center gap-2">
              <a
                href={FINAL_CTA.phoneHref}
                onClick={trackCall}
                aria-label={`Call ${FINAL_CTA.phoneDisplay}`}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-[#FFCE1B] text-sm font-bold text-slate-900 shadow-sm transition hover:bg-[#d99a00] sm:w-auto sm:px-4"
              >
                <Phone className="h-[18px] w-[18px] shrink-0" />
                <span className="hidden sm:inline">{FINAL_CTA.phoneDisplay}</span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-[#25D366] text-sm font-bold text-white shadow-sm transition hover:brightness-110 sm:w-auto sm:px-4"
              >
                <FaWhatsapp className="h-5 w-5 shrink-0" />
                <span className="hidden sm:inline">Chat</span>
              </a>
            </div>
          </div>
        </nav>

        {/* 1. Hero */}
        <section id="top" className="relative isolate overflow-hidden bg-[#040a1c] text-white">
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
            <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_20%_10%,#163a8f_0%,#0b1c4d_38%,#040a1c_78%)]" />
            <div className="absolute -top-40 right-[-10%] h-[620px] w-[820px] rotate-12 rounded-full bg-[conic-gradient(from_200deg_at_50%_50%,rgba(59,130,246,0.0),rgba(59,130,246,0.28),rgba(255,206,27,0.18),rgba(59,130,246,0.0))] blur-[110px]" />
            <div className="absolute bottom-[-12%] right-[8%] h-[420px] w-[520px] rounded-full bg-amber-400/[0.13] blur-[130px]" />
            <div
              className="absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage: "radial-gradient(rgba(255,255,255,0.22) 1px, transparent 1.2px)",
                backgroundSize: "26px 26px",
                maskImage: "radial-gradient(ellipse 65% 60% at 30% 40%, black, transparent 75%)",
                WebkitMaskImage: "radial-gradient(ellipse 65% 60% at 30% 40%, black, transparent 75%)",
              }}
            />
            <div className="absolute right-[2%] top-1/2 hidden h-[760px] w-[760px] -translate-y-1/2 lg:block xl:right-[6%]">
              {[100, 78, 56, 34].map((size) => (
                <div
                  key={size}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]"
                  style={{ width: `${size}%`, height: `${size}%` }}
                />
              ))}
            </div>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#040a1c]/80" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
            <HeroDoodles />
            <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-7 xl:col-span-8">
                <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300 backdrop-blur-sm sm:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden="true" />
                  {HERO.eyebrow}
                </p>
                <h1 className="text-[1.75rem] font-extrabold leading-[1.08] tracking-[-0.035em] min-[360px]:text-[2rem] min-[400px]:text-[2.25rem] sm:text-[3.25rem] lg:text-[3rem] xl:text-[3.85rem]">
                  {HERO.titleLead}{" "}
                  <span className="block bg-gradient-to-r from-[#FFE27A] via-[#FFCE1B] to-[#F5A623] bg-clip-text text-transparent">{HERO.titleAccent}</span>
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">{HERO.subtitle}</p>

                <p className="mt-6 inline-flex items-center gap-2 rounded-xl border border-amber-300/30 bg-amber-400/10 px-4 py-2.5 text-sm font-bold text-amber-200 sm:text-base">
                  <Sparkles className="h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
                  {HERO.priceHighlight}
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={scrollToAudit}
                    className="group inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FFD84D] via-[#FFC21A] to-[#F5A10A] px-6 text-sm font-bold text-[#071330] shadow-lg shadow-amber-500/25 transition hover:brightness-105 active:scale-[0.99]"
                  >
                    {HERO.primaryCta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </button>
                  <a
                    href="#packages"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.06] px-6 text-sm font-bold text-white transition hover:bg-white/[0.12]"
                  >
                    {HERO.secondaryCta}
                  </a>
                </div>

                <ul className="mt-7 flex flex-col gap-2.5 text-sm font-semibold text-slate-200 sm:flex-row sm:flex-wrap sm:gap-x-6">
                  {HERO.badges.map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                        <Check className="h-3 w-3 stroke-[3]" aria-hidden="true" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hidden lg:col-span-5 lg:block xl:col-span-4">
                <SearchPreview />
              </div>
            </div>

            {/* Partner platforms bar */}
            <div className="mt-12 border-t border-white/10 py-8 sm:mt-14 lg:mt-16">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-10">
                <p className="shrink-0 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Partnered with</p>
                <ul className="grid flex-1 grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
                  {PLATFORMS.map(({ name, icon: Icon, color }) => (
                    <li key={name} className="flex h-14 items-center gap-2.5 rounded-xl bg-white px-3.5 shadow-sm sm:h-16">
                      <Icon className="h-6 w-6 shrink-0" style={{ color }} aria-hidden="true" />
                      <span className="text-[13px] font-bold leading-tight text-slate-800">{name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="svc-pattern svc-pattern--arcs relative isolate">
          <ArcBackground />

          {/* Client logos */}
          <section className="overflow-hidden py-6 sm:py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="sr-only">Brands We Work With</h2>
              <Reveal y={20}>
                <div className="fade-edge relative overflow-hidden rounded-2xl border border-slate-200 bg-white py-4">
                  <div className="logo-track">
                    {[0, 1].map((copy) => (
                      <div key={copy} className="flex items-center gap-10 px-8" aria-hidden={copy === 1}>
                        {CLIENT_LOGOS.map((src, i) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img key={`${copy}-${i}`} src={src} alt={copy === 0 ? `Client ${i + 1}` : ""} className="h-12 w-auto object-contain" />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* 2. What we do */}
          <section id="services" className="overflow-hidden pb-14 pt-8 sm:pb-20 sm:pt-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionHeading eyebrow={WHAT_WE_DO.eyebrow} title={WHAT_WE_DO.title} subtitle={WHAT_WE_DO.intro} />
              <Stagger className="mt-10 grid gap-5 [perspective:1200px] sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6" stagger={0.08}>
                {WHAT_WE_DO.items.map(({ title, desc }, idx) => {
                  const Icon = WHAT_WE_DO_ICONS[idx];
                  return (
                    <StaggerItem key={title} variant="tilt" className="h-full">
                      <article className="group relative flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg sm:p-7">
                        <div className="flex items-center justify-between">
                          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#071330] text-[#FFCE1B] transition-transform duration-300 group-hover:scale-110">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <span className="font-mono text-sm font-bold text-slate-300" aria-hidden="true">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className="mt-5 text-lg font-bold leading-snug text-[#071330]">{noOrphan(title)}</h3>
                        <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{desc}</p>
                      </article>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </div>
          </section>
        </div>

        {/* 3. Free SEO audit */}
        <section id="audit" className="scroll-mt-20 bg-[#FFF9E3] py-14 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
            <div className="lg:col-span-6 xl:col-span-7">
              <Reveal y={14}>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600">{AUDIT.eyebrow}</p>
              </Reveal>
              <h2 className="mt-3 text-balance text-[1.85rem] leading-[1.15] tracking-[-0.025em] text-[#071330] sm:text-4xl lg:text-[2.6rem]">
                <RiseText text={AUDIT.title} delay={0.08} />
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">{AUDIT.intro}</p>

              <p className="mt-8 text-sm font-bold uppercase tracking-[0.12em] text-[#071330]">{AUDIT.coversTitle}</p>
              <Stagger className="mt-4 grid gap-3 sm:grid-cols-2" stagger={0.05}>
                {AUDIT.covers.map((c) => (
                  <StaggerItem key={c.title} className="h-full">
                    <div className="flex h-full gap-3 rounded-2xl border border-amber-200/70 bg-white p-4">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" aria-hidden="true" />
                      <div>
                        <p className="text-[15px] font-bold text-[#071330]">{c.title}</p>
                        <p className="mt-0.5 text-sm leading-relaxed text-slate-600">{c.desc}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
              <p className="mt-6 flex items-start gap-2.5 text-[15px] font-bold text-[#071330]">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
                {AUDIT.reassurance}
              </p>
            </div>
            <div className="lg:col-span-6 lg:self-start xl:col-span-5 lg:sticky lg:top-24">
              <AuditForm />
            </div>
          </div>
        </section>

        {/* 4. Packages */}
        <section id="packages" className="scroll-mt-20 overflow-hidden py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow={PACKAGES.eyebrow} title={PACKAGES.title} subtitle={PACKAGES.intro} />
            <Stagger className="mt-10 grid items-stretch gap-6 lg:grid-cols-3" stagger={0.1}>
              {PACKAGES.items.map((pkg) => {
                const custom = !pkg.price;
                return (
                  <StaggerItem key={pkg.name} className="h-full">
                    <article
                      className={`flex h-full flex-col rounded-3xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7 ${
                        custom ? "border-amber-200 bg-[#FFF9E3]" : "border-slate-200 bg-white"
                      }`}
                    >
                      <h3 className="text-xl font-extrabold tracking-tight text-[#071330]">{pkg.name}</h3>
                      <p className="mt-1 text-[15px] text-slate-600">{pkg.tagline}</p>
                      {pkg.price ? (
                        <p className="mt-5 flex flex-wrap items-baseline gap-x-2">
                          <span className="text-4xl font-extrabold tracking-tight text-[#071330]">{pkg.price}</span>
                          <span className="text-sm font-semibold text-slate-500">/month + GST</span>
                        </p>
                      ) : (
                        <p className="mt-5 text-[15px] leading-relaxed text-slate-700">{pkg.description}</p>
                      )}
                      {pkg.deliverables && (
                        <ul className="mt-6 flex-1 space-y-3 text-[15px] text-slate-700">
                          {pkg.deliverables.map(({ text, bold }) => {
                            const at = text.indexOf(bold);
                            return (
                              <li key={text} className="flex items-start gap-2.5">
                                <Check className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-emerald-50 p-0.5 text-emerald-600" aria-hidden="true" />
                                <span>
                                  {at >= 0 ? (
                                    <>
                                      {text.slice(0, at)}
                                      <strong className="font-bold text-[#071330]">{bold}</strong>
                                      {text.slice(at + bold.length)}
                                    </>
                                  ) : (
                                    text
                                  )}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                      {custom && <div className="flex-1" />}
                      <button
                        type="button"
                        onClick={() => setModalPkg(pkg)}
                        className={`group mt-7 inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl text-sm font-bold transition ${
                          custom ? "bg-[#071330] text-white hover:bg-slate-800" : "bg-[#FFCE1B] text-[#071330] hover:brightness-105"
                        }`}
                      >
                        {pkg.cta}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      </button>
                    </article>
                  </StaggerItem>
                );
              })}
            </Stagger>

            {/* Compare full deliverables */}
            <Reveal y={20} className="mt-8">
              <details className="group rounded-3xl border border-slate-200 bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-base font-bold text-[#071330] sm:px-7 sm:py-5">
                  {PACKAGES.compareLabel}
                  <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="border-t border-slate-100 px-5 pb-5 sm:px-7 sm:pb-7">
                  <div className="hidden grid-cols-[1.3fr_1fr_1fr] gap-4 border-b border-slate-200 py-3 text-xs font-bold uppercase tracking-[0.1em] text-slate-500 md:grid">
                    <span>Deliverable</span>
                    <span>{essential.name}</span>
                    <span>{growth.name}</span>
                  </div>
                  <dl className="divide-y divide-slate-100">
                    {PACKAGES.compare.map(([label, a, b]) => (
                      <div key={label} className="grid grid-cols-2 gap-x-4 gap-y-1.5 py-3.5 md:grid-cols-[1.3fr_1fr_1fr] md:items-center">
                        <dt className="col-span-2 text-[15px] font-bold text-[#071330] md:col-span-1">{label}</dt>
                        <dd className="text-sm text-slate-700">
                          <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 md:hidden">{essential.name}</span>
                          {a}
                        </dd>
                        <dd className="text-sm text-slate-700">
                          <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 md:hidden">{growth.name}</span>
                          {b}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </details>
            </Reveal>

            <Reveal y={20} className="mt-6">
              <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white/90 p-5 sm:p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <Info className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="space-y-2 text-sm leading-relaxed text-slate-600">
                  <p>
                    <span className="font-bold text-[#071330]">Package notes: </span>
                    {PACKAGES.notes[0]}
                  </p>
                  <p>{PACKAGES.notes[1]}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 5. SEO, AEO, GEO explained */}
        <section className="bg-[#071330] py-14 text-white sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow={EXPLAINED.eyebrow} title={EXPLAINED.title} subtitle={EXPLAINED.intro} tone="dark" />
            <Stagger className="mt-10 grid gap-5 md:grid-cols-3 lg:gap-6" stagger={0.1}>
              {EXPLAINED.items.map((item, idx) => {
                const Icon = EXPLAINED_ICONS[idx];
                return (
                  <StaggerItem key={item.tag} className="h-full">
                    <article className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.05] p-6 sm:p-7">
                      <div className="flex items-center gap-3">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFCE1B] text-[#071330]">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="text-2xl font-extrabold tracking-tight text-[#FFCE1B]">{item.tag}</span>
                      </div>
                      <h3 className="mt-5 text-lg font-bold leading-snug text-white">{noOrphan(item.title)}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-slate-300">{item.desc}</p>
                    </article>
                  </StaggerItem>
                );
              })}
            </Stagger>
            <p className="mt-8 text-center text-sm italic text-slate-400">{EXPLAINED.note}</p>
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={scrollToAudit}
                className="group inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-[#FFCE1B] px-7 text-sm font-extrabold text-[#071330] shadow-sm transition hover:brightness-105 active:scale-95"
              >
                {EXPLAINED.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

        {/* 6. Process */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow={PROCESS.eyebrow} title={PROCESS.title} subtitle={PROCESS.intro} />
            <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6" stagger={0.1}>
              {PROCESS.steps.map((s) => (
                <StaggerItem key={s.step} className="h-full">
                  <article className="relative flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-baseline justify-between">
                      <span className="text-4xl font-extrabold tracking-tight text-[#FFCE1B]">{s.step}</span>
                      <span className="rounded-full bg-[#071330] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">{s.label}</span>
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-[#071330]">{s.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{s.desc}</p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* 7. Monthly reporting */}
        <section className="bg-white py-14 sm:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
            <div>
              <Reveal y={14}>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600">{REPORTING.eyebrow}</p>
              </Reveal>
              <h2 className="mt-3 text-balance text-[1.85rem] leading-[1.15] tracking-[-0.025em] text-[#071330] sm:text-4xl lg:text-[2.6rem]">
                <RiseText text={REPORTING.title} delay={0.08} />
              </h2>
              <p className="mt-4 text-lg font-bold text-slate-700">{REPORTING.subtitle}</p>
            </div>
            <Reveal y={20}>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-[#071330]">
                  <BarChart3 className="h-4 w-4 text-amber-600" aria-hidden="true" />
                  {REPORTING.coversTitle}
                </p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {REPORTING.covers.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 rounded-xl bg-white p-3.5 text-[15px] text-slate-700 shadow-sm">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" aria-hidden="true" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Our results and sectors we serve (same sections as /lp/seo-service) */}
        <ResultsShowcase />
        <IndustriesServed onOpenModal={() => setModalPkg({ name: "SEO enquiry", tagline: "", cta: "Request a Call Back" })} />

        {/* 8. FAQ */}
        <section id="faq" className="scroll-mt-20 overflow-hidden py-14 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="FAQs" title="Frequently Asked Questions" className="mb-10" />
            <Stagger className="space-y-3" stagger={0.07}>
              {FAQS.map((faq, index) => (
                <StaggerItem key={faq.q} variant="slide-left">
                  <details className="faq-details group rounded-xl border border-slate-200 bg-white p-4 transition-colors duration-300 open:bg-amber-50/30" open={index === 0}>
                    <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-slate-800 transition-colors duration-300 hover:text-amber-600">
                      <span>{faq.q}</span>
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-slate-400 transition-all duration-300 group-open:rotate-180 group-open:text-amber-500" />
                    </summary>
                    <div className="faq-answer">
                      <p className="mt-2 border-t border-slate-200/50 pt-2 text-sm leading-relaxed text-slate-600">{faq.a}</p>
                    </div>
                  </details>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* 9. Final call to action */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-14 text-white sm:py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-balance text-3xl font-extrabold text-white sm:text-4xl">
              <RiseText text={FINAL_CTA.title} />
            </h2>
            <Reveal y={16} delay={0.2}>
              <p className="mt-3 text-slate-200">{FINAL_CTA.subtitle}</p>
            </Reveal>
            <Reveal y={20} delay={0.32} className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={scrollToAudit}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#FFCE1B] px-6 py-3 font-bold text-slate-900 shadow-sm transition-all duration-200 hover:scale-[1.03] hover:bg-[#d99a00] active:scale-95"
              >
                {FINAL_CTA.primary}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-bold text-white shadow-sm transition-all duration-200 hover:scale-[1.03] hover:bg-emerald-400 active:scale-95"
              >
                <FaWhatsapp className="text-lg" />
                {FINAL_CTA.secondary}
              </a>
            </Reveal>
            <p className="mt-6 text-sm text-slate-300">
              Or call us:{" "}
              <a href={FINAL_CTA.phoneHref} onClick={trackCall} className="font-bold text-white underline-offset-4 hover:underline">
                {FINAL_CTA.phoneDisplay}
              </a>
            </p>
          </div>
        </section>

        <ServiceFooter
          whatsappUrl={WHATSAPP_URL}
          onOpenModal={() => setModalPkg({ name: "SEO enquiry", tagline: "", cta: "Request a Call Back" })}
          onCallClick={trackCall}
          onWhatsAppClick={() => {}}
        />
        <StickyCtaBar whatsappUrl={WHATSAPP_URL} onCallClick={trackCall} onWhatsAppClick={() => {}} />

        {modalPkg && <CallbackModal pkg={modalPkg} onClose={() => setModalPkg(null)} />}
      </div>
    </MotionConfig>
  );
}
