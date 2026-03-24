"use client";

import { motion } from "framer-motion";
import {
  Palette,
  Type,
  Droplets,
  FileImage,
  BookOpen,
  Share2,
  Search,
  Lightbulb,
  Paintbrush,
  CheckSquare,
  Send,
  Target,
  Eye,
  Zap,
  Rocket,
  MonitorSmartphone,
  Building2,
  RefreshCw,
  User,
  Globe,
  CheckCircle2,
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

const deliverables = [
  { icon: Lightbulb, label: "Custom Logo Concepts (2–4 initial ideas)" },
  { icon: Palette, label: "Logo Variations (Primary, Secondary, Icon)" },
  { icon: Type, label: "Typography Selection" },
  { icon: Droplets, label: "Color Palette Definition" },
  { icon: FileImage, label: "Scalable Vector Files (AI, SVG, PNG, JPG)" },
  { icon: BookOpen, label: "Logo Usage Guidelines" },
  { icon: Share2, label: "Social Media Profile Adaptations" },
];

const processSteps = [
  { icon: Search, step: "01", title: "Discovery & Research", text: "We understand your business, audience, and positioning." },
  { icon: Lightbulb, step: "02", title: "Concept Development", text: "We explore multiple creative directions aligned with your brand." },
  { icon: Paintbrush, step: "03", title: "Design Refinement", text: "We refine the selected concept based on feedback." },
  { icon: CheckSquare, step: "04", title: "Finalization", text: "We prepare all logo variations and formats." },
  { icon: Send, step: "05", title: "Delivery & Support", text: "You receive ready-to-use assets for all platforms." },
];

const whyChoose = [
  { icon: Target, title: "Strategy-Driven Design", text: "Every design decision is backed by brand strategy and research." },
  { icon: Eye, title: "Focus on Brand Recall", text: "We design logos that are simple, memorable, and recognizable." },
  { icon: Zap, title: "Fast Turnaround", text: "Quick delivery without compromising on quality." },
  { icon: Rocket, title: "Startup-Friendly", text: "Scalable solutions that grow with your brand." },
  { icon: MonitorSmartphone, title: "Built for Digital", text: "Designs optimized for digital and marketing use." },
];

const whoItsFor = [
  { icon: Rocket, label: "Startups launching a new brand" },
  { icon: RefreshCw, label: "Businesses rebranding" },
  { icon: User, label: "Founders building personal brands" },
  { icon: Globe, label: "Companies expanding into new markets" },
];

export default function LogoDesignSections() {
  return (
    <>
      {/* ═══════════ SERVICE OVERVIEW ═══════════ */}
      <section className="relative bg-white py-24 sm:py-32 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-check-grid" />
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div {...fadeUp()} className="glass-card">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block mb-5 rounded-full border border-gray-300/60 bg-white px-4 py-1.5 text-xs font-semibold text-gray-600">
                Brand Identity
              </span>
              <h2 className="text-gray-900">
                Your Logo Is the Face of Your Brand
              </h2>
              <p className="mt-6 text-[16px] sm:text-lg leading-relaxed text-gray-600">
                Your logo is more than just a symbol — it&apos;s the face of your brand. A strong logo communicates your values, builds credibility, and helps your business stand out in a crowded market.
              </p>
              <p className="mt-4 text-[16px] sm:text-lg leading-relaxed text-gray-700 font-medium">
                At CleverCrow, we design logos that are not only visually appealing but also strategically crafted to connect with your audience and support long-term growth.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-2.5">
                {["Strategic Design", "Brand Recall", "Scalable Assets", "Fast Delivery"].map((pill, i) => (
                  <span key={i} className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm">{pill}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ WHAT WE DELIVER ═══════════ */}
      <section className="relative py-24 sm:py-32 bg-[#fafafa] overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-100/30 rounded-full blur-[140px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[140px]" />
        </div>
        <div className="mx-auto max-w-7xl px-6">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 border border-indigo-100 mb-5">What We Deliver</span>
            <h2 className="text-gray-950">Complete Logo Design Package</h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {deliverables.map((item, i) => (
              <motion.div key={i} {...fadeUp(i * 0.05)} className="group flex flex-col items-center text-center gap-4 rounded-2xl bg-white border border-gray-100 p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.06)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-600 transition-all duration-300 group-hover:bg-yellow-400 group-hover:text-white group-hover:scale-105">
                  <item.icon className="h-6 w-6" />
                </div>
                <span className="text-[14px] sm:text-[15px] font-semibold text-gray-800 leading-snug">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ OUR APPROACH ═══════════ */}
      <section id="process" className="relative py-24 sm:py-32 bg-white overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_100%,rgba(147,51,234,0.03),transparent_60%)]" />
        </div>
        <div className="mx-auto max-w-7xl px-6">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-purple-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-purple-600 border border-purple-100 mb-5">Our Approach</span>
            <h2 className="text-gray-950">Our Logo Design Process</h2>
          </motion.div>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-300 via-purple-200 to-transparent" />
            <div className="space-y-8 sm:space-y-10">
              {processSteps.map((step, i) => (
                <motion.div key={i} {...fadeUp(i * 0.08)} className="relative flex gap-6 sm:gap-8 items-start">
                  <div className="relative z-10 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-white border-2 border-purple-200 shadow-md shrink-0 transition-all duration-300 hover:border-purple-400 hover:shadow-lg">
                    <step.icon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                  </div>
                  <div className="flex-1 pb-2">
                    <span className="text-[10px] font-black text-purple-500 tracking-widest uppercase mb-2 block">Step {step.step}</span>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight mb-2">{step.title}</h3>
                    <p className="text-[15px] text-gray-600 leading-relaxed max-w-xl">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CLEVERCROW ═══════════ */}
      <section className="relative py-24 sm:py-32 bg-neutral-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-yellow-900/8 rounded-full blur-[150px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-white/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400 border border-white/10 mb-5">Why Us</span>
            <h2 className="text-white">Why CleverCrow for Logo Design</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((item, i) => (
              <motion.div key={i} {...fadeUp(i * 0.07)} className={`group relative rounded-3xl bg-white/[0.04] border border-white/[0.08] p-8 sm:p-10 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.15] ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-400 mb-5 transition-all duration-300 group-hover:bg-yellow-400 group-hover:text-gray-900 group-hover:scale-105">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 tracking-tight">{item.title}</h3>
                <p className="text-[15px] text-gray-400 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ WHO IT'S FOR ═══════════ */}
      <section className="relative py-24 sm:py-32 bg-[#fafafa] overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-yellow-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-700 border border-yellow-200 mb-5">Who It&apos;s For</span>
            <h2 className="text-gray-950">Who This Service Is For</h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {whoItsFor.map((item, i) => (
              <motion.div key={i} {...fadeUp(i * 0.05)} className="group flex flex-col items-center text-center gap-4 rounded-2xl bg-white border border-gray-100 p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.06)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-600 transition-all duration-300 group-hover:bg-yellow-400 group-hover:text-white group-hover:scale-105">
                  <item.icon className="h-6 w-6" />
                </div>
                <span className="text-[14px] sm:text-[15px] font-semibold text-gray-800 leading-snug">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="relative bg-neutral-950 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-900/8 rounded-full blur-[200px]" />
        </div>
        <div className="bg-square-checks absolute inset-0 opacity-30" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div {...fadeUp()}>
            <span className="inline-flex items-center rounded-full bg-white/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400 border border-white/10 mb-6">Get Started</span>
          </motion.div>
          <motion.h2 {...fadeUp(0.1)} className="text-white">Ready to Build a Logo That Stands Out?</motion.h2>
          <motion.p {...fadeUp(0.15)} className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400 leading-relaxed">
            Let&apos;s create a brand identity your audience will remember.
          </motion.p>
          <motion.div {...fadeUp(0.2)} className="mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-4">
            <a href="/contact" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-8 py-4 text-[15px] font-black text-gray-900 shadow-xl shadow-yellow-400/15 transition-all duration-300 hover:bg-yellow-300">Get Started Today</a>
            <a href="https://wa.me/919986389444" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-700 bg-white/5 px-8 py-4 text-[15px] font-bold text-white transition-all duration-300 hover:bg-white/10">Talk to Our Team</a>
          </motion.div>
          <motion.p {...fadeUp(0.25)} className="mt-6 text-sm text-neutral-500">No obligation · Free consultation · Clear guidance</motion.p>
        </div>
      </section>
    </>
  );
}
