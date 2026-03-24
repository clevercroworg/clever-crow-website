"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
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
    <section className="relative overflow-hidden pt-[140px] sm:pt-[160px] pb-20 sm:pb-28">
      {/* ── background ── */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-white" />
        {/* grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* ambient glows */}
        <div className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-yellow-200/30 blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-200/20 blur-[150px]" />

      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-16 items-center">
          {/* ── LEFT COLUMN ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 border border-gray-200 px-4 py-1.5 mb-6">
              <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-700">
                {eyebrow}
              </span>
            </div>

            {/* title */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-gray-900 leading-[1.1] tracking-tight max-w-[600px]">
              {title}
            </h1>

            {/* subtitle */}
            <p className="mt-6 max-w-xl text-[16px] sm:text-[17px] text-gray-600 font-medium leading-relaxed">
              {subtitle}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-7 py-4 text-[15px] font-black text-gray-900 shadow-lg shadow-yellow-400/20 transition-all duration-300 hover:bg-yellow-300 hover:shadow-yellow-400/30"
              >
                {primaryCta}
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={secondaryCtaHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-4 text-[15px] font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:border-gray-300"
              >
                {secondaryCta}
              </a>
            </div>

            {/* trust points */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {trustPoints.map((point, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-[14px] text-gray-700 font-medium"
                >
                  <CheckCircle2 className="h-4 w-4 text-yellow-500 shrink-0" />
                  {point}
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN: CTA CARD ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="relative w-full max-w-md mx-auto lg:ml-auto"
          >
            {/* card glow */}
            <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-yellow-200/40 via-purple-200/20 to-blue-200/20 blur-2xl opacity-60" />

            <div className="relative rounded-[1.75rem] border border-gray-200 bg-white shadow-2xl shadow-gray-200/50 overflow-hidden">
              {/* top accent */}
              <div className="h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500" />

              <AnimatePresence mode="wait" initial={false}>
                {!isFormOpen ? (
                  <motion.div
                    key="cta"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="p-8 sm:p-10 text-center"
                  >
                    <div className="inline-flex items-center rounded-full bg-yellow-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-700 border border-yellow-200 mb-6">
                      Priority Access
                    </div>

                    <h3 className="text-2xl sm:text-[26px] font-extrabold text-gray-900 tracking-tight leading-tight mb-3">
                      Unlock Your Free{" "}
                      <span className="text-yellow-500">Growth Strategy</span>
                    </h3>

                    <p className="text-[15px] text-gray-500 font-medium mb-8 leading-relaxed">
                      Get a comprehensive audit and a custom execution plan
                      designed to scale your ROI.
                    </p>

                    <button
                      onClick={() => setIsFormOpen(true)}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-4 text-[15px] font-black text-gray-900 shadow-lg shadow-yellow-400/20 transition-all duration-300 hover:bg-yellow-300"
                    >
                      Request a Call Back
                      <ArrowRight className="h-4 w-4" />
                    </button>

                    <div className="flex items-center justify-center gap-8 mt-6">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xl font-black text-gray-900">
                          24<span className="text-sm">H</span>
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                          Response
                        </span>
                      </div>
                      <div className="h-8 w-px bg-gray-200" />
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xl font-black text-gray-900">0</span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                          Obligation
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="p-8 sm:p-10"
                  >
                    <button
                      onClick={() => setIsFormOpen(false)}
                      className="absolute right-4 top-6 p-1.5 text-gray-400 hover:text-gray-700 transition-colors"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>

                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                      Request a Call Back
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 font-medium">
                      Speak with a specialist within 24 hours.
                    </p>

                    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                      <input
                        name="name"
                        required
                        placeholder="Your Name *"
                        className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all"
                      />
                      <input
                        name="phone"
                        required
                        placeholder="Phone number *"
                        className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all"
                      />

                      {error && (
                        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`mt-2 h-14 w-full rounded-xl text-[15px] font-bold tracking-wide transition-all text-gray-900 ${
                          isLoading
                            ? "cursor-not-allowed bg-yellow-300 opacity-70"
                            : "bg-yellow-400 hover:bg-yellow-300 shadow-lg shadow-yellow-400/20"
                        }`}
                      >
                        {isLoading ? "Sending..." : "Request a Call Back"}
                      </button>
                    </form>

                    <p className="mt-5 text-center text-xs font-semibold uppercase tracking-wider text-gray-400">
                      No spam · No obligation · Clear guidance
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
