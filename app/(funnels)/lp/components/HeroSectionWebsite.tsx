"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowRight, Check, Globe, Lock, Phone, Star, User } from "lucide-react";

type HeroMeta = {
  title: string;
  accentTitle: string;
  subtitle: string;
  highlights: string[];
  ctaLabel?: string;
};

type HeroSectionWebsiteProps = {
  data: HeroMeta;
};

const STATS = [
  { icon: Globe, value: "150+", label: "Websites Delivered" },
  { icon: Check, value: "98%", label: "Client Satisfaction" },
  { icon: Star, value: "4.9/5", label: "Average Rating" },
];

// Thin line-art doodles on the web-design theme. Kept to the edges and the column gap so they never sit
// behind text. Desktop only: on stacked mobile layouts they would land on the copy.
function HeroDoodles() {
  const stroke = { fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block" aria-hidden="true">
      {/* Browser window sketch, top right */}
      <svg
        viewBox="0 0 220 150"
        className="absolute right-[6%] top-24 hidden h-36 w-52 -rotate-6 text-white/[0.14] xl:block"
        {...stroke}
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="6" y="6" width="208" height="138" rx="14" />
        <path d="M6 34h208" />
        <circle cx="24" cy="20" r="4" />
        <circle cx="38" cy="20" r="4" />
        <circle cx="52" cy="20" r="4" />
        <path d="M26 58h90M26 74h130M26 90h70" />
        <rect x="140" y="98" width="54" height="26" rx="8" />
      </svg>

      {/* Dashed hand-drawn arrow from the copy toward the form */}
      <svg
        viewBox="0 0 160 120"
        className="absolute left-[46%] top-[44%] h-28 w-40 text-[#FFC72C]/35"
        {...stroke}
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path d="M8 96C40 30 96 12 146 34" strokeDasharray="7 9" />
        <path d="M128 22l20 13-21 9" />
      </svg>

      {/* Cursor, bottom right of the form area */}
      <svg
        viewBox="0 0 48 48"
        className="absolute bottom-16 right-[8%] h-12 w-12 rotate-[-8deg] text-white/[0.18]"
        {...stroke}
        stroke="currentColor"
        strokeWidth="2.2"
      >
        <path d="M10 6l26 15-11 3-5 11z" />
        <path d="M25 24l9 13" />
      </svg>

      {/* Code brackets, low on the left */}
      <svg
        viewBox="0 0 80 48"
        className="absolute bottom-10 left-[2%] h-12 w-20 text-white/[0.12] xl:left-[4%]"
        {...stroke}
        stroke="currentColor"
        strokeWidth="3"
      >
        <path d="M24 10L8 24l16 14M56 10l16 14-16 14M46 6L34 42" />
      </svg>

      {/* Sparkles */}
      {[
        "right-[38%] top-28 h-5 w-5 text-[#FFC72C]/45",
        "left-[52%] bottom-24 h-4 w-4 text-white/25",
        "right-[4%] top-[52%] h-4 w-4 text-[#FFC72C]/35",
      ].map((cls) => (
        <svg key={cls} viewBox="0 0 24 24" className={`absolute ${cls}`} {...stroke} stroke="currentColor" strokeWidth="2">
          <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
        </svg>
      ))}
    </div>
  );
}

// Simple two-column hero for the website LP: copy on the left, callback form on the right.
export default function HeroSectionWebsite({ data }: HeroSectionWebsiteProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      setStatusMsg("Please enter both name and phone number.");
      return;
    }
    setLoading(true);
    setStatusMsg("");

    try {
      const source = document.title || "Website Landing Page Hero Form";
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email: "",
          message: `New enquiry received from Hero Section. Source Page: ${source}. Referrer/Landed URL: ${window.location.href}`,
          source,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again.");
      }

      // Same Google Ads lead conversion as the shared LP hero form.
      const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
      gtag?.("event", "conversion", { send_to: "AW-17335403082/YwV4CJ-q_e8YEPq9me49" });
      gtag?.("event", "GenerateLead", { event_category: "Leads", event_label: "Lead Form Submit" });

      setName("");
      setPhone("");
      router.push("/thank-you");
    } catch (err) {
      setStatusMsg(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#050a1c] pt-28 pb-16 text-white sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-28">
      {/* Quiet background: navy gradient, a grid that fades out from the centre, two soft glows, a bottom hairline */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050a1c] via-[#0a1433] to-[#0f1d4a]" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-[0.11]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute -left-40 -top-24 h-[480px] w-[560px] rounded-full bg-blue-600/15 blur-[140px]" aria-hidden="true" />
      <div className="absolute -right-32 top-1/3 h-[420px] w-[420px] rounded-full bg-amber-500/10 blur-[120px]" aria-hidden="true" />
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FFC72C]/40 to-transparent"
        aria-hidden="true"
      />
      <HeroDoodles />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Left: headline, supporting copy, proof */}
        <div className="lg:col-span-7">
          <h1 className="text-[2.6rem] font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-[4rem]">
            {data.title}
            <span className="mt-1 block bg-gradient-to-r from-[#FFC72C] to-[#F59E0B] bg-clip-text text-transparent">
              {data.accentTitle}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl">{data.subtitle}</p>

          <ul className="mt-8 grid max-w-xl grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {data.highlights.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[15px] font-semibold text-slate-100">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                  <Check className="h-3.5 w-3.5 stroke-[3]" aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <dl className="mt-10 grid max-w-xl grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-6">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col-reverse px-3 first:pl-0 sm:px-5">
                <dt className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">{label}</dt>
                <dd className="flex items-center gap-1.5 text-xl font-black text-white sm:text-2xl">
                  <Icon className="h-4 w-4 shrink-0 text-[#FFC72C]" aria-hidden="true" />
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          {data.ctaLabel && (
            <a
              href="#package"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#FFC72C] transition hover:text-amber-300"
            >
              {data.ctaLabel}
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>

        {/* Right: callback form */}
        <div className="w-full lg:col-span-5 lg:justify-self-end lg:max-w-md">
          <div className="rounded-3xl border border-white/15 bg-white/[0.06] p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:p-8">
            <h2 className="text-2xl font-black tracking-tight">
              Request a <span className="text-[#FFC72C]">Call Back</span>
            </h2>
            <p className="mt-1.5 text-sm text-slate-300">
              Get a free strategy consultation &amp; custom quote within 15 minutes.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <label className="relative block">
                <span className="sr-only">Your name</span>
                <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  type="text"
                  name="hero_name"
                  placeholder="Enter your name"
                  autoComplete="name"
                  className="w-full rounded-xl border border-white/15 bg-white/[0.05] py-3.5 pl-10 pr-4 text-sm font-medium text-white placeholder-slate-400 transition focus:border-[#FFC72C] focus:outline-none focus:ring-1 focus:ring-[#FFC72C]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                />
              </label>

              <label className="relative block">
                <span className="sr-only">Your phone number</span>
                <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  type="tel"
                  name="hero_phone"
                  placeholder="Enter your phone number"
                  autoComplete="tel"
                  inputMode="tel"
                  className="w-full rounded-xl border border-white/15 bg-white/[0.05] py-3.5 pl-10 pr-4 text-sm font-medium text-white placeholder-slate-400 transition focus:border-[#FFC72C] focus:outline-none focus:ring-1 focus:ring-[#FFC72C]"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  disabled={loading}
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FFC72C] to-[#F59E0B] px-5 py-3.5 text-sm font-black text-slate-950 transition hover:shadow-[0_10px_25px_rgba(255,199,44,0.35)] active:scale-[0.99] disabled:opacity-50"
              >
                <span>{loading ? "Submitting..." : "Request a Call"}</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
              </button>

              {statusMsg && (
                <p role="alert" className="rounded-lg border border-rose-500/20 bg-rose-500/10 p-2 text-center text-xs font-semibold text-rose-400">
                  {statusMsg}
                </p>
              )}
            </form>

            <p className="mt-6 flex items-center justify-center gap-1.5 border-t border-white/10 pt-5 text-xs font-medium text-slate-400">
              <Lock className="h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
              We respect your privacy. 100% Confidential.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
