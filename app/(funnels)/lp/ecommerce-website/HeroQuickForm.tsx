"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowRight, Loader2, Lock } from "lucide-react";
import { submitQuoteLead } from "../components/QuoteModal";

// Phones only: a two-field quote form right in the hero, so Meta ad visitors can enquire without scrolling or
// opening the pop-up. Same lead path as the pop-up (dashboard, email, Google Ads lead conversion).
export default function HeroQuickForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState({ loading: false, error: "" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || phone.replace(/\D/g, "").length < 10) {
      setState({ loading: false, error: "Please enter your name and a 10-digit mobile number." });
      return;
    }
    setState({ loading: true, error: "" });
    try {
      await submitQuoteLead({ name, phone, service: "E-commerce website", pkg: "Not sure yet", formName: "E-commerce Hero Form", formLabel: "Hero form" });
      router.push("/thank-you");
    } catch (err) {
      setState({ loading: false, error: err instanceof Error ? err.message : "Something went wrong. Please try again." });
    }
  }

  const input =
    "h-11 w-full min-w-0 rounded-xl border border-white/15 bg-white px-3 text-[16px] text-slate-900 placeholder:text-slate-400 focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-300/30";

  return (
    <form onSubmit={submit} noValidate className="mt-5 rounded-2xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur sm:hidden">
      <p className="mb-2 text-[13px] font-bold text-white">Get a free quote in 2 minutes</p>
      <div className="grid grid-cols-2 gap-2">
        <label>
          <span className="sr-only">Your name</span>
          <input className={input} placeholder="Your name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          <span className="sr-only">Mobile number</span>
          <input className={input} placeholder="Mobile number" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
      </div>
      {state.error && (
        <p role="alert" className="mt-2 rounded-lg bg-rose-500/15 px-2.5 py-1.5 text-[12px] font-medium text-rose-200">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={state.loading}
        className="mt-2 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-[#FFC72C] text-[15px] font-bold text-slate-950 shadow-[0_10px_30px_-10px_rgba(255,199,44,0.7)] disabled:opacity-70"
      >
        {state.loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
        {state.loading ? "Sending…" : "Get Free Quote"}
        {!state.loading && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
      </button>
      <div className="mt-2 flex items-center justify-between text-[12px]">
        <span className="flex items-center gap-1 text-slate-400">
          <Lock className="h-3 w-3" aria-hidden="true" /> No spam
        </span>
        <a href="#package" className="flex items-center gap-1 font-bold text-amber-300">
          View packages <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </form>
  );
}
