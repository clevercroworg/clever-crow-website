"use client";

import { useState } from "react";
import {
  IconCheck,
  IconChartBar,
  IconRocket,
  IconUsers,
} from "@tabler/icons-react";

type PPCHeroProps = {
  serviceName: string;
  title?: string;
  subtitle?: string;
  highlight?: string;
};

export default function PPCHero({
  serviceName,
  title,
  subtitle,
  highlight,
}: PPCHeroProps) {
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

      if (!response.ok) throw new Error("Failed");

      window.location.href = "/thank-you";
    } catch {
      setError("Failed to send request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#0b0b12] pt-14">
      {/* BACKGROUND */}
      <div className="ppc-hero-bg" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-12 items-start">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-8">
            {/* TRUST BADGE */}
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs text-gray-200">
              <IconUsers size={14} className="text-[#f4b400]" />
              <span>Driving Predictable Leads, Sales & ROI Since 2010</span>
            </div>

            {/* HEADLINE */}
            <h1 className="ppc-hero-title">
              {title ? (
                <>
                  {title.replace(
                    highlight || serviceName,
                    ""
                  )}
                  <span className="text-[#f4b400] font-bold">
                    {highlight || serviceName}
                  </span>
                </>
              ) : (
                <>
                  End-to-End{" "}
                  <span className="text-[#f4b400] font-bold">
                    {serviceName}
                  </span>
                  <br />
                  for Growing Businesses
                </>
              )}
            </h1>

            {/* SUBTITLE */}
            <p className="mt-3 max-w-2xl text-[22px] leading-relaxed text-gray-300">
              {subtitle ||
                "We plan, launch, optimise, and scale performance-driven campaigns using data, AI, and proven growth systems."}
            </p>

            {/* TRUST POINTS */}
            <div className="mt-5 rounded-xl border border-white/10 bg-black/30 p-4">
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {[
                  { icon: IconChartBar, text: "ROI-Focused Campaigns" },
                  { icon: IconUsers, text: "550+ Businesses Served" },
                  { icon: IconRocket, text: "15+ Years of Experience" },
                  { icon: IconCheck, text: "Certified Google & Meta Experts" },
                ].map(({ icon: Icon, text }, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg
                               bg-white/10 backdrop-blur-sm
                               border border-white/20
                               px-4 py-3
                               text-sm font-medium text-white"
                  >
                    <Icon size={20} className="text-[#f4b400] opacity-90" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl bg-white p-6 shadow-2xl border border-gray-100">
              <h3 className="text-base font-semibold text-gray-900">
                Request a Call Back
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Speak with a specialist within 4 hours.
              </p>

              <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
                <input
                  name="name"
                  required
                  placeholder="Your Name *"
                  className="h-10 w-full rounded-lg border px-3 text-sm text-gray-900 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />

                <input
                  name="phone"
                  required
                  placeholder="Phone number *"
                  className="h-10 w-full rounded-lg border px-3 text-sm text-gray-900 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />

                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-2 text-xs text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`h-10 w-full rounded-xl text-sm font-semibold transition text-black
                    ${
                      isLoading
                        ? "bg-yellow-300 cursor-not-allowed"
                        : "bg-yellow-400 hover:bg-yellow-500"
                    }
                  `}
                >
                  {isLoading ? "Sending..." : "Request a Call Back"}
                </button>
              </form>

              <p className="mt-3 text-[11px] text-gray-400">
                No spam • No obligation • Clear guidance
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
