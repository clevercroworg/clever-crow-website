"use client";

import { motion } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";

type PrimaryCTAProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimaryClick?: () => void;
  secondaryHref?: string;
};

export default function PrimaryCTA({
  title = "Ready to Build a Predictable Growth System?",
  description = "Combine digital marketing, AI automation, and execution that actually scales your business.",
  primaryLabel = "Book Free Consultation",
  secondaryLabel = "Request a Callback",
  onPrimaryClick,
  secondaryHref = "/contact",
}: PrimaryCTAProps) {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#05070a] py-16 sm:py-24">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(250,204,21,0.08),transparent)] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-4xl px-6"
      >
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] px-6 py-12 sm:px-12 sm:py-16 backdrop-blur-2xl text-center shadow-2xl">
          {/* Subtle Accent Glow */}
          <div className="absolute -top-12 -right-12 h-32 w-32 bg-yellow-500/20 blur-[40px] rounded-full" />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Status Badge - Mini */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/5 px-4 py-1.5 shadow-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-yellow-500"></span>
              </span>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-yellow-500/80">
                Next Slot Available: Today
              </span>
            </div>

            <h2 className="max-w-xl text-3xl sm:text-5xl font-black tracking-tighter text-white leading-[1.1]">
              Engineering Your <br className="hidden sm:block" />
              <span className="text-yellow-500">Growth Engine</span>
            </h2>

            <p className="mx-auto mt-6 max-w-lg text-sm sm:text-base font-medium text-gray-400 leading-relaxed">
              We don't just run ads. We build integrated systems that scale. 
              {description && <span className="block mt-1 italic opacity-60 text-xs font-normal">{description}</span>}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {/* PRIMARY CTA */}
              <button
                onClick={onPrimaryClick}
                className="
                  group relative inline-flex items-center gap-3
                  rounded-2xl bg-yellow-400 px-8 py-4
                  font-black text-black text-sm uppercase tracking-wide
                  transition-all duration-300
                  hover:bg-yellow-300 hover:shadow-[0_20px_40px_-10px_rgba(250,204,21,0.4)] 
                  hover:-translate-y-1
                "
              >
                {primaryLabel}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>

              {/* SECONDARY CTA */}
              <a
                href={secondaryHref}
                className="
                  group inline-flex items-center gap-3
                  rounded-2xl border border-white/10 bg-white/[0.05]
                  px-8 py-4 font-bold text-white text-sm
                  transition-all duration-300
                  hover:bg-white/10 hover:border-white/20
                  hover:-translate-y-1
                "
              >
                <PhoneCall size={14} className="text-white group-hover:text-yellow-500 transition-colors" />
                {secondaryLabel}
              </a>
            </div>

            {/* Results Footer - Compact */}
            <div className="mt-8 flex items-center justify-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all">
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">ROI Focused</span>
               <div className="h-0.5 w-0.5 rounded-full bg-white/40" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">AI Powered</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>



  );
}