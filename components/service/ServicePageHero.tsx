"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

type ServicePageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  serviceName: string;
  primaryCta: string;
  secondaryCta: string;
  secondaryCtaHref?: string;
  trustPoints: string[];
};

export default function ServicePageHero({
  eyebrow,
  title,
  subtitle,
  serviceName,
  primaryCta,
  secondaryCta,
  secondaryCtaHref = "#process",
  trustPoints,
}: ServicePageHeroProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch("/api/send-lead-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          service: serviceName,
          pageUrl: window.location.href,
        }),
      });
      if (!response.ok) throw new Error("Failed to send");
      window.location.href = "/thank-you";
    } catch {
      setError("Failed to send request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-[85vh] overflow-hidden pt-[120px] pb-24 selection:bg-yellow-500/30">
      {/* ───────────────── BACKGROUND (Same as Homepage) ───────────────── */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 8% 10%, rgba(82, 168, 255, 0.1), transparent 25%),
              radial-gradient(circle at 82% 78%, rgba(122, 63, 194, 0.08), transparent 25%),
              radial-gradient(circle at 52% 52%, rgba(255, 255, 255, 0.02), transparent 26%),
              linear-gradient(180deg, #0f172a 0%, #111827 44%, #020617 100%)
            `
          }}
        />
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 26%, rgba(255, 255, 255, 0.03), transparent 16%),
              radial-gradient(circle at left center, rgba(255, 255, 255, 0.04) 1.5px, transparent 2px),
              radial-gradient(circle at right center, rgba(255, 255, 255, 0.04) 1.5px, transparent 2px),
              radial-gradient(circle at center, rgba(255, 255, 255, 0.01) 0.8px, transparent 1.2px)
            `,
            backgroundSize: "auto, 26px 26px, 26px 26px, 18px 18px"
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-20 items-center">
          
          {/* ── LEFT COLUMN ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 mb-8 backdrop-blur-md">
              <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 animate-pulse shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100/60">
                {eyebrow}
              </span>
            </div>

            {/* title */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-white leading-[1.05] tracking-tight text-balance">
              {title}
            </h1>

            {/* subtitle */}
            <p className="mt-8 max-w-xl text-lg sm:text-xl text-slate-400 font-medium leading-relaxed opacity-90">
              {subtitle}
            </p>

            {/* trust points */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {trustPoints.map((point, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-[15px] text-slate-300 font-bold"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
                    <CheckCircle2 size={14} />
                  </div>
                  {point}
                </div>
              ))}
            </div>

            {/* Bottom Actions for Mobile (Optional, currently button triggers form) */}
            <div className="mt-12 flex flex-col sm:flex-row gap-5 lg:hidden">
              <button
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow-500 px-8 py-5 text-[14px] font-black uppercase tracking-widest text-slate-900 shadow-xl shadow-yellow-500/20 transition-all hover:scale-105 active:scale-95"
              >
                {primaryCta}
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN: GLASS CARD ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg mx-auto lg:ml-auto"
          >
            {/* Ambient Background Glow for Card */}
            <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-yellow-500/10 via-transparent to-blue-500/10 blur-3xl opacity-50" />

            <div className="relative rounded-[2.5rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl overflow-hidden">
              {/* Form Header */}
              <div className="p-8 sm:p-10 text-center border-b border-white/5">
                <div className="inline-flex items-center gap-2 rounded-full bg-yellow-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500 border border-yellow-500/20 mb-6">
                  <ShieldCheck size={12} />
                  Growth Engineering
                </div>
                <h3 className="text-2xl sm:text-[28px] font-black text-white tracking-tight leading-tight mb-4">
                  Request a <span className="text-yellow-500 italic">Call Back</span>
                </h3>
                <p className="text-[14px] text-slate-400 font-medium">
                  Speak with a growth engineer within 24 hours. No cost, no obligation.
                </p>
              </div>

              {/* Form Body */}
              <div className="p-8 sm:p-10 bg-white/[0.02]">
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Full Name</label>
                    <input
                      name="name"
                      required
                      placeholder="e.g. John Doe"
                      className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-6 text-sm font-bold text-white placeholder:text-slate-600 focus:border-yellow-500 focus:bg-white/10 focus:outline-none transition-all ring-1 ring-white/5"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Phone Number</label>
                    <input
                      name="phone"
                      required
                      placeholder="+91 XXX XXX XXXX"
                      className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-6 text-sm font-bold text-white placeholder:text-slate-600 focus:border-yellow-500 focus:bg-white/10 focus:outline-none transition-all ring-1 ring-white/5"
                    />
                  </div>

                  {error && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-bold text-red-400">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative h-16 w-full overflow-hidden rounded-2xl bg-yellow-500 text-[14px] font-black uppercase tracking-widest text-slate-900 shadow-lg shadow-yellow-500/20 transition-all hover:scale-[1.02] hover:bg-yellow-400 active:scale-[0.98] disabled:opacity-70"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? "Sending..." : "Submit Inquiry"}
                      <Zap size={16} fill="currentColor" />
                    </span>
                  </button>
                </form>

                <div className="mt-8 flex items-center justify-between text-center border-t border-white/5 pt-8">
                  <div className="flex-1">
                    <div className="text-xl font-black text-white">24<span className="text-xs text-yellow-500 ml-0.5">H</span></div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">SLA Response</div>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div className="flex-1">
                    <div className="text-xl font-black text-white">100<span className="text-xs text-yellow-500 ml-0.5">%</span></div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">Free Audit</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
