"use client";

import { ArrowRight, PhoneCall, Sparkles } from "lucide-react";

type HeroSectionProps = {
  onCallbackClick: () => void;
};

export default function HeroSection({ onCallbackClick }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-white">

      {/* Subtle premium glow (NO texture, NO dots) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 18%, rgba(250,204,21,0.14), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-28 text-center">

        {/* Authority / trust badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur">
          <Sparkles size={14} className="text-yellow-500" />
          From Udupi to the world • Trusted by 50+ growing brands
        </div>

        {/* Headline */}
        <h1 className="mx-auto max-w-5xl text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.05] md:text-6xl lg:text-7xl">
          Growth Systems <br className="hidden sm:block" />
          Built to Scale
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600 md:text-xl">
          We design and operate AI-powered digital marketing systems 
          from social media and ads to websites and content focused on
          predictable business growth.
        </p>

        {/* CTAs */}
        <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">

          {/* PRIMARY CTA — Request a Call */}
          <button
            onClick={onCallbackClick}
            className="
              group inline-flex items-center gap-3
              rounded-2xl bg-yellow-400 px-8 py-4
              font-semibold text-black
              transition-all duration-300
              hover:bg-yellow-500 hover:-translate-y-0.5 hover:shadow-xl
              focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400
            "
          >
            {/* Animated intent icon (hover only) */}
            <PhoneCall
              size={18}
              className="transition-transform duration-300 group-hover:rotate-[-8deg]"
            />
            Request a Call
          </button>

          {/* SECONDARY CTA — View Services */}
          <a
            href="/services"
            className="
              group inline-flex items-center gap-2
              rounded-2xl px-6 py-4
              font-semibold text-gray-700
              transition hover:text-gray-900
            "
          >
            View Our Services
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>

        </div>

      </div>

      <div className="border-t border-gray-100">
  <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-gray-500">
    AI-first digital marketing • Ads • Social • Websites • Content
  </div>
</div>



    </section>
    
  );
}
