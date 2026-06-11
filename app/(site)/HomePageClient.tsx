"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Puzzle,
  Unlink,
  Clock,
  Compass,
  TrendingDown,
  Globe,
  Smartphone,
  Cpu,
  Megaphone,
  Magnet,
  MessageSquare,
  Coins,
  Workflow,
  Activity,
  FileText,
  Database,
  Bot,
  Target,
  Layers,
  HeartPulse,
  ShoppingBag,
  GraduationCap,
  Home,
  DollarSign,
  Car,
  Hotel,
  Cloud,
  Rocket,
  MoreHorizontal,
  CheckCircle,
  Users,
  Award,
  ArrowRight,
  MapPin,
  Star,
  Quote
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import PremiumHero from "@/components/PremiumHero";
import TechStack from "@/components/TechStack";
import CallbackModal from "@/components/CallbackModal";

interface Service {
  title: string;
  text: string;
  icon: string;
  href: string;
}

interface HomePageClientProps {
  services: Service[];
}

const portfolioProjects = [
  {
    title: "Riva Beach Resort",
    category: "Resorts",
    subCategory: "Luxury Resort • 100 Rooms",
    location: "Goa, India",
    headline: "+310% Booking Surge",
    description: "Scaled luxury guests acquisition with highly targeted Google Search & Meta Retargeting, bypassing commission-heavy OTA channels.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { value: "8.4x", label: "Ads ROAS" },
      { value: "₹7.78 Cr", label: "Revenue" },
      { value: "35%", label: "Direct Share" }
    ]
  },
  {
    title: "Anahata Yoga Retreat",
    category: "Resorts",
    subCategory: "Eco-Retreat • 20 Rooms",
    location: "Goa, India",
    headline: "+185% Inbound Sales",
    description: "Deployed geo-targeted lookalike campaigns for high-spending international wellness travelers, driving direct room bookings.",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { value: "6.2x", label: "Campaign ROI" },
      { value: "₹1.56 Cr", label: "Ad Bookings" },
      { value: "42%", label: "Direct Share" }
    ]
  },
  {
    title: "Manuallaya Valley Resort",
    category: "Resorts",
    subCategory: "Mountain Resort • 85 Rooms",
    location: "Manali, HP",
    headline: "+120% Occupancy Rate",
    description: "Sustained high off-season occupancy through contextual local search campaigns and exclusive dynamic package landing pages.",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { value: "5.0x", label: "Search ROAS" },
      { value: "₹6.61 Cr", label: "Ad Revenue" },
      { value: "31%", label: "Direct Share" }
    ]
  }
];

export default function HomePageClient({ services }: HomePageClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="bg-[#FAF9F6] text-slate-800 font-sans min-h-screen overflow-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <PremiumHero onCallbackClick={() => setIsModalOpen(true)} />

      {/* ================= LOGO CAROUSEL SECTION ================= */}
      <TechStack />

      {/* Container wrapper for consistent maximum width */}
      <div className="mx-auto max-w-[1360px] px-6 lg:px-8 space-y-16 md:space-y-24 pb-20">
        
        {/* ================= 1. DISCONNECTION BANNER ================= */}
        <section className="relative mt-12">
          <div className="bg-[#FFFDF9] border border-amber-500/10 rounded-[2.5rem] p-8 md:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.015)] flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            
            {/* Left Badge & Message */}
            <div className="flex items-center gap-5 w-full lg:w-1/2">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 text-white shrink-0 shadow-md shadow-amber-500/20">
                <Puzzle className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug tracking-tight">
                  Most businesses don't have a strategy problem. They have a <span className="text-amber-500">disconnection problem.</span>
                </h3>
              </div>
            </div>

            {/* Vertical Divider for Desktop */}
            <div className="hidden lg:block h-16 w-[1px] bg-slate-200/80" />

            {/* Right 4 Columns Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full lg:w-1/2">
              
              {/* Disconnected Tools */}
              <div className="flex flex-col items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 mb-3 border border-slate-200/40">
                  <Unlink className="h-6 w-6" />
                </div>
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Disconnected Tools</h4>
                <p className="text-[11px] font-semibold text-slate-500 mt-2 leading-relaxed">Too many tools. No single source.</p>
              </div>

              {/* Manual Workflows */}
              <div className="flex flex-col items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 mb-3 border border-slate-200/40">
                  <Clock className="h-6 w-6" />
                </div>
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Manual Workflows</h4>
                <p className="text-[11px] font-semibold text-slate-500 mt-2 leading-relaxed">Wasting time. Missing data.</p>
              </div>

              {/* No Clear Strategy */}
              <div className="flex flex-col items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 mb-3 border border-slate-200/40">
                  <Compass className="h-6 w-6" />
                </div>
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">No Clear Strategy</h4>
                <p className="text-[11px] font-semibold text-slate-500 mt-2 leading-relaxed">Hard to measure. Harder to scale.</p>
              </div>

              {/* Limited Growth */}
              <div className="flex flex-col items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 mb-3 border border-slate-200/40">
                  <TrendingDown className="h-6 w-6" />
                </div>
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Limited Growth</h4>
                <p className="text-[11px] font-semibold text-slate-500 mt-2 leading-relaxed">Leads dry up. Growth stalls.</p>
              </div>

            </div>

          </div>
        </section>

      </div>

      {/* ================= 2. END-TO-END SOLUTIONS (DARK BACKGROUND SECTION 1) ================= */}
      <section id="services" className="w-full bg-[#0B0F19] text-white py-16 md:py-20 mt-6">
        <div className="mx-auto max-w-[1360px] px-6 lg:px-8">
          
          <div className="mb-12">
            <p className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.3em] text-amber-500 mb-3">
              What We Build
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-black text-white leading-tight tracking-tight">
              End-to-end digital solutions<br className="hidden md:inline" />
              that drive measurable growth.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            
            {/* Website Development */}
            <div className="group bg-white/5 border border-white/10 rounded-[2.2rem] p-8 sm:p-10 shadow-lg hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between min-h-[260px]">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400">
                  <Globe className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-black text-white mt-6">Website Development</h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-300 mt-3 leading-relaxed">
                  Custom, responsive websites built for performance and business results.
                </p>
              </div>
              <Link href="/website-development-company" className="inline-flex items-center gap-1.5 text-xs font-black text-amber-400 uppercase tracking-widest mt-8 group-hover:text-amber-300 transition-colors">
                Learn More <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* App Development */}
            <div className="group bg-white/5 border border-white/10 rounded-[2.2rem] p-8 sm:p-10 shadow-lg hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between min-h-[260px]">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400">
                  <Smartphone className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-black text-white mt-6">App Development</h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-300 mt-3 leading-relaxed">
                  Custom iOS & Android apps that solve real problems and deliver real impact.
                </p>
              </div>
              <Link href="/app-development-company" className="inline-flex items-center gap-1.5 text-xs font-black text-amber-400 uppercase tracking-widest mt-8 group-hover:text-amber-300 transition-colors">
                Learn More <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* AI Automation */}
            <div className="group bg-white/5 border border-white/10 rounded-[2.2rem] p-8 sm:p-10 shadow-lg hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between min-h-[260px]">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400">
                  <Cpu className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-black text-white mt-6">AI Automation</h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-300 mt-3 leading-relaxed">
                  Intelligent automations that optimize workflows and scale productivity.
                </p>
              </div>
              <Link href="/ai-automation-agency" className="inline-flex items-center gap-1.5 text-xs font-black text-amber-400 uppercase tracking-widest mt-8 group-hover:text-amber-300 transition-colors">
                Learn More <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Digital Marketing */}
            <div className="group bg-white/5 border border-white/10 rounded-[2.2rem] p-8 sm:p-10 shadow-lg hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between min-h-[260px]">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400">
                  <Megaphone className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-black text-white mt-6">Digital Marketing</h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-300 mt-3 leading-relaxed">
                  Data-driven marketing that attracts, engages and converts at scale.
                </p>
              </div>
              <Link href="/digital-marketing-agency" className="inline-flex items-center gap-1.5 text-xs font-black text-amber-400 uppercase tracking-widest mt-8 group-hover:text-amber-300 transition-colors">
                Learn More <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      <div className="mx-auto max-w-[1360px] px-6 lg:px-8 space-y-16 md:space-y-24 pb-20 mt-16 md:mt-24">
        
        {/* ================= 3. PROVEN PROCESS ================= */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight tracking-tight">
              A proven process.<br className="hidden md:inline" />
              Predictable results.
            </h2>
          </div>

          <div className="hidden lg:flex items-start justify-between">
            
            {[
              { num: "01", label: "Attract", Icon: Magnet, desc: "Bring in right audience with clarity." },
              { num: "02", label: "Engage", Icon: MessageSquare, desc: "Build trust and nurture real conversations." },
              { num: "03", label: "Convert", Icon: Coins, desc: "Turn interest into leads and paying customers." },
              { num: "04", label: "Automate", Icon: Workflow, desc: "Streamline operations and drive efficiency." },
              { num: "05", label: "Scale", Icon: Activity, desc: "Optimize, retain and scale with measurable ROI." }
            ].map((step, idx, arr) => (
              <div key={idx} className="flex items-start flex-1">
                {/* Step content */}
                <div className="flex flex-col items-start">
                  {/* Number + Icon row */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm font-black text-amber-500">{step.num}</span>
                    <div className="flex h-12 w-12 items-center justify-center text-slate-600">
                      <step.Icon className="h-9 w-9" strokeWidth={1.5} />
                    </div>
                  </div>
                  {/* Title + Description */}
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">{step.label}</h4>
                  <p className="text-[11px] font-semibold text-slate-400 mt-2 leading-relaxed max-w-[180px]">
                    {step.desc}
                  </p>
                </div>
                {/* Dashed arrow connector */}
                {idx < arr.length - 1 && (
                  <div className="flex-1 flex items-center pt-5 px-2 min-w-[40px]">
                    <div className="w-full border-t-2 border-dashed border-slate-200" />
                    <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-slate-300 shrink-0 -ml-px" />
                  </div>
                )}
              </div>
            ))}

          </div>

          {/* Mobile/Tablet fallback: stacked layout */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { num: "01", label: "Attract", Icon: Magnet, desc: "Bring in right audience with clarity." },
              { num: "02", label: "Engage", Icon: MessageSquare, desc: "Build trust and nurture real conversations." },
              { num: "03", label: "Convert", Icon: Coins, desc: "Turn interest into leads and paying customers." },
              { num: "04", label: "Automate", Icon: Workflow, desc: "Streamline operations and drive efficiency." },
              { num: "05", label: "Scale", Icon: Activity, desc: "Optimize, retain and scale with measurable ROI." }
            ].map((step, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <span className="text-sm font-black text-amber-500">{step.num}</span>
                  <step.Icon className="h-8 w-8 text-slate-600" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">{step.label}</h4>
                  <p className="text-[11px] font-semibold text-slate-400 mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </section>

      </div>

      {/* ================= 4. READY TO DEPLOY SYSTEMS (DARK BACKGROUND SECTION 2) ================= */}
      <section className="w-full bg-[#0A0D16] text-white py-16 md:py-20 mt-6">
        <div className="mx-auto max-w-[1360px] px-6 lg:px-8">
          
          <div className="mb-12">
            <p className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.3em] text-amber-500 mb-3">
              Standard Architectures
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-black text-white leading-tight tracking-tight">
              Ready-to-deploy systems<br className="hidden md:inline" />
              that drive real outcomes.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            
            {/* System 1 */}
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 shadow-lg hover:bg-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between min-h-[190px]">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                  <FileText className="h-6 w-6" />
                </div>
                <h4 className="text-[14px] font-black text-white leading-tight mt-5">Business Website Launch System</h4>
                <p className="text-[11px] font-semibold text-slate-400 mt-2 leading-relaxed">
                  Everything you need for a fast, high-converting website launch.
                </p>
              </div>
            </div>

            {/* System 2 */}
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 shadow-lg hover:bg-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between min-h-[190px]">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                  <Database className="h-6 w-6" />
                </div>
                <h4 className="text-[14px] font-black text-white leading-tight mt-5">Custom CMS & Booking System</h4>
                <p className="text-[11px] font-semibold text-slate-400 mt-2 leading-relaxed">
                  Capture leads, automate bookings and run your business on autopilot.
                </p>
              </div>
            </div>

            {/* System 3 */}
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 shadow-lg hover:bg-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between min-h-[190px]">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                  <Bot className="h-6 w-6" />
                </div>
                <h4 className="text-[14px] font-black text-white leading-tight mt-5">AI Automation Accelerator</h4>
                <p className="text-[11px] font-semibold text-slate-400 mt-2 leading-relaxed">
                  Automate your workflows and scale hours every week.
                </p>
              </div>
            </div>

            {/* System 4 */}
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 shadow-lg hover:bg-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between min-h-[190px]">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                  <Target className="h-6 w-6" />
                </div>
                <h4 className="text-[14px] font-black text-white leading-tight mt-5">Performance Marketing System</h4>
                <p className="text-[11px] font-semibold text-slate-400 mt-2 leading-relaxed">
                  Full-funnel campaigns that generate quality leads and sales.
                </p>
              </div>
            </div>

            {/* System 5 */}
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 shadow-lg hover:bg-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between min-h-[190px]">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                  <Layers className="h-6 w-6" />
                </div>
                <h4 className="text-[14px] font-black text-white leading-tight mt-5">SaaS / Product Development</h4>
                <p className="text-[11px] font-semibold text-slate-400 mt-2 leading-relaxed">
                  Build scalable digital products with modern technology.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      <div className="mx-auto max-w-[1360px] px-6 lg:px-8 space-y-16 md:space-y-24 pb-20 mt-16 md:mt-24">
        
        {/* ================= 5. PORTFOLIO SHOWCASE ================= */}
        <section id="portfolio">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.3em] text-slate-400 mb-3">
                Case Studies
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-[42px] font-black text-slate-900 leading-tight tracking-tight">
                Results we're proud of.
              </h2>
            </div>
            <Link href="/contact" className="group flex items-center gap-1 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-amber-500 transition-colors shrink-0">
              Get in touch 
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {portfolioProjects.map((project, idx) => (
              <div 
                key={idx}
                className="bg-white border-2 border-amber-500/10 hover:border-amber-500/50 rounded-[1.8rem] overflow-hidden hover:scale-[1.01] hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] transition-all duration-500 flex flex-col h-full group"
              >
                <div className="relative w-full h-[220px] overflow-hidden bg-slate-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent z-10" />
                  
                  {/* Location & Category Badges */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20 pointer-events-none">
                    <div className="inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full text-[10px] font-black tracking-wider text-white">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" />
                      <span>{project.location.toUpperCase()}</span>
                    </div>
                    <div className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full text-[10px] font-black tracking-wider text-amber-500">
                      <span>{project.category.toUpperCase()}</span>
                    </div>
                  </div>

                  {/* Title & Metadata overlays */}
                  <div className="absolute bottom-4 left-5 right-5 z-20 pointer-events-none">
                    <span className="text-[10px] font-extrabold tracking-widest text-slate-300 block mb-0.5 uppercase">
                      {project.subCategory}
                    </span>
                    <h4 className="text-xl font-black text-white tracking-wide uppercase">
                      {project.title}
                    </h4>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between bg-white">
                  <div>
                    {/* Direct Response Headline */}
                    <h5 className="text-[15px] font-black text-amber-500 mb-2 uppercase tracking-wide leading-snug">
                      {project.headline}
                    </h5>
                    <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Divider */}
                    <div className="w-full h-[1px] bg-slate-100 mb-5" />

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      {project.metrics.map((metric, mi) => (
                        <div key={mi} className="flex flex-col">
                          <span className="text-base sm:text-lg font-black text-slate-800 tracking-tight leading-none mb-1.5">
                            {metric.value}
                          </span>
                          <span className="text-[9px] font-extrabold tracking-widest text-slate-400 uppercase leading-none">
                            {metric.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 6. INDUSTRIES & STATS SECTION ================= */}
        <section id="industries" className="space-y-12">
          
          {/* Industry Grid */}
          <div>
            <div className="mb-10 text-center">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Digital solutions for every industry.
              </h2>
            </div>
            
            <div className="flex flex-wrap items-center justify-center">
              
              {[
                { label: "Healthcare", Icon: HeartPulse },
                { label: "E-commerce", Icon: ShoppingBag },
                { label: "Education", Icon: GraduationCap },
                { label: "Real Estate", Icon: Home },
                { label: "Finance", Icon: DollarSign },
                { label: "Automotive", Icon: Car },
                { label: "Hospitality", Icon: Hotel },
                { label: "SaaS", Icon: Cloud },
                { label: "Startups", Icon: Rocket },
                { label: "More", Icon: MoreHorizontal }
              ].map((ind, idx, arr) => (
                <div key={idx} className="flex items-center">
                  <div className="group flex flex-col items-center justify-center text-center gap-3 px-6 py-4 hover:-translate-y-1 transition-all cursor-pointer">
                    <div className="flex h-14 w-14 items-center justify-center text-slate-500 group-hover:text-amber-500 transition-all">
                      <ind.Icon className="h-10 w-10" strokeWidth={1.5} />
                    </div>
                    <span className="text-[9px] font-extrabold text-slate-600 uppercase tracking-wider">{ind.label}</span>
                  </div>
                  {idx < arr.length - 1 && (
                    <div className="h-12 w-px bg-slate-200/80 shrink-0" />
                  )}
                </div>
              ))}

            </div>
          </div>

          {/* White Stats Strip */}
          <div className="bg-white border border-slate-200/80 rounded-[2.2rem] p-8 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-8 items-center shadow-[0_4px_25px_rgba(0,0,0,0.01)]">
            
            {/* Stat 1 */}
            <div className="flex items-center gap-4 md:border-r border-slate-100 last:border-0 py-2 justify-center md:justify-start">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 shrink-0">
                <CheckCircle className="h-5.5 w-5.5" />
              </div>
              <div>
                <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight block leading-none">145+</span>
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mt-1 block">Projects Delivered</span>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-4 md:border-r border-slate-100 last:border-0 py-2 justify-center md:justify-start">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 shrink-0">
                <Users className="h-5.5 w-5.5" />
              </div>
              <div>
                <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight block leading-none">95+</span>
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mt-1 block">Happy Clients</span>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-4 md:border-r border-slate-100 last:border-0 py-2 justify-center md:justify-start">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 shrink-0">
                <Award className="h-5.5 w-5.5" />
              </div>
              <div>
                <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight block leading-none">5+</span>
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mt-1 block">Years of Excellence</span>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex items-center gap-4 py-2 justify-center md:justify-start">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 shrink-0">
                <Globe className="h-5.5 w-5.5" />
              </div>
              <div>
                <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight block leading-none">10+</span>
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mt-1 block">Industries Served</span>
              </div>
            </div>

          </div>

        </section>

        {/* ================= 7. TESTIMONIALS ================= */}
        <section className="space-y-8">
          <div className="text-center">
            <span className="text-[9px] font-extrabold text-amber-500 uppercase tracking-[0.3em]">Client Testimonials</span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-2">
              Trusted by brands that<br className="hidden md:inline" /> demand results.
            </h2>
            <p className="text-sm text-slate-400 font-medium mt-3 max-w-md mx-auto">
              Don't just take our word for it. Hear from the businesses we've helped grow.
            </p>
          </div>

          {/* 2-Row Scrolling Testimonials */}
          <div className="relative isolate">
            {/* Edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-40 bg-gradient-to-r from-[#FAFAF7] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-40 bg-gradient-to-l from-[#FAFAF7] to-transparent" />

            <div className="flex flex-col gap-4 overflow-hidden">
              {/* Row 1 - scrolls left */}
              <div className="flex overflow-hidden">
                <motion.div
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                  className="flex w-max gap-5 px-2"
                >
                  {[...[
                    { name: "Anand Shetty", source: "Google", text: "We partnered with CleverCrow to improve our digital presence and lead generation. Their understanding of SEO, Google Ads, and automation is extremely practical. Within a few months, we saw consistent inbound leads.", rating: 5 },
                    { name: "Rohit Kulkarni", source: "Trustpilot", text: "CleverCrow helped us restructure our paid ads and website funnels. What stood out was their data-driven approach and clear communication. The transition was seamless and results were immediate.", rating: 5 },
                    { name: "Pooja Rao", source: "Google", text: "The CleverCrow team understood our business goals clearly and implemented solutions that genuinely saved us time and increased our ROI. Highly recommended for any growing brand.", rating: 5 },
                    { name: "Suresh Nayak", source: "Google", text: "CleverCrow stands out for their honesty and execution. Everything was delivered on time and with clear outcomes. They transformed our digital strategy completely.", rating: 5 },
                  ], ...[
                    { name: "Anand Shetty", source: "Google", text: "We partnered with CleverCrow to improve our digital presence and lead generation. Their understanding of SEO, Google Ads, and automation is extremely practical. Within a few months, we saw consistent inbound leads.", rating: 5 },
                    { name: "Rohit Kulkarni", source: "Trustpilot", text: "CleverCrow helped us restructure our paid ads and website funnels. What stood out was their data-driven approach and clear communication. The transition was seamless and results were immediate.", rating: 5 },
                    { name: "Pooja Rao", source: "Google", text: "The CleverCrow team understood our business goals clearly and implemented solutions that genuinely saved us time and increased our ROI. Highly recommended for any growing brand.", rating: 5 },
                    { name: "Suresh Nayak", source: "Google", text: "CleverCrow stands out for their honesty and execution. Everything was delivered on time and with clear outcomes. They transformed our digital strategy completely.", rating: 5 },
                  ]].map((t, i) => (
                    <div key={i} className="relative flex flex-col justify-between w-[85vw] sm:w-[420px] rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:border-amber-300/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 shrink-0">
                      <Quote className="absolute top-4 right-4 h-6 w-6 text-slate-100" fill="currentColor" />
                      <div>
                        <div className="mb-3 flex items-center gap-0.5 text-amber-400">
                          {[...Array(t.rating)].map((_, j) => <Star key={j} className="h-3.5 w-3.5" fill="currentColor" />)}
                        </div>
                        <p className="text-sm font-medium leading-relaxed text-slate-600 mb-6">&ldquo;{t.text}&rdquo;</p>
                      </div>
                      <div className="flex items-center gap-3 border-t border-slate-50 pt-4 mt-auto">
                        <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-sm font-black text-slate-400">{t.name.charAt(0)}</div>
                        <div>
                          <span className="text-sm font-black text-slate-900 block">{t.name}</span>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{t.source}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Row 2 - scrolls right */}
              <div className="flex overflow-hidden">
                <motion.div
                  animate={{ x: ["-50%", "0%"] }}
                  transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                  className="flex w-max gap-5 px-2"
                >
                  {[...[
                    { name: "Neha Deshpande", source: "Trustpilot", text: "Their strategic inputs and AI-driven optimizations made a noticeable difference in lead quality. We've seen a 40% jump in conversion rates since starting with them.", rating: 5 },
                    { name: "Vivek Hegde", source: "Google", text: "From audit to execution, everything was planned well. The automation systems reduced a lot of manual work and allowed us to focus on our core business operations.", rating: 5 },
                    { name: "Karan Johar", source: "Trustpilot", text: "Remarkable growth in just 3 months. Their tech-first approach to marketing is exactly what we needed. The ROI speaks for itself.", rating: 5 },
                    { name: "Megha Singh", source: "Google", text: "The best agency we've worked with. No fluff, just pure performance and data-backed strategies that deliver real measurable results.", rating: 5 },
                  ], ...[
                    { name: "Neha Deshpande", source: "Trustpilot", text: "Their strategic inputs and AI-driven optimizations made a noticeable difference in lead quality. We've seen a 40% jump in conversion rates since starting with them.", rating: 5 },
                    { name: "Vivek Hegde", source: "Google", text: "From audit to execution, everything was planned well. The automation systems reduced a lot of manual work and allowed us to focus on our core business operations.", rating: 5 },
                    { name: "Karan Johar", source: "Trustpilot", text: "Remarkable growth in just 3 months. Their tech-first approach to marketing is exactly what we needed. The ROI speaks for itself.", rating: 5 },
                    { name: "Megha Singh", source: "Google", text: "The best agency we've worked with. No fluff, just pure performance and data-backed strategies that deliver real measurable results.", rating: 5 },
                  ]].map((t, i) => (
                    <div key={i} className="relative flex flex-col justify-between w-[85vw] sm:w-[420px] rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:border-amber-300/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 shrink-0">
                      <Quote className="absolute top-4 right-4 h-6 w-6 text-slate-100" fill="currentColor" />
                      <div>
                        <div className="mb-3 flex items-center gap-0.5 text-amber-400">
                          {[...Array(t.rating)].map((_, j) => <Star key={j} className="h-3.5 w-3.5" fill="currentColor" />)}
                        </div>
                        <p className="text-sm font-medium leading-relaxed text-slate-600 mb-6">&ldquo;{t.text}&rdquo;</p>
                      </div>
                      <div className="flex items-center gap-3 border-t border-slate-50 pt-4 mt-auto">
                        <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-sm font-black text-slate-400">{t.name.charAt(0)}</div>
                        <div>
                          <span className="text-sm font-black text-slate-900 block">{t.name}</span>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{t.source}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 8. CTA BANNER ================= */}
        <section>
          <div className="relative overflow-hidden bg-[#FFFDF9] border border-amber-500/10 rounded-[2.5rem] p-10 md:p-14 shadow-[0_15px_45px_rgba(0,0,0,0.01)] flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[2.5rem]" style={{ opacity: 0.4 }}>
              <Image
                src="/images/cta-bg-office.png"
                alt="CTA Background"
                fill
                className="object-cover select-none"
                quality={90}
              />
            </div>

            {/* Text details */}
            <div className="relative z-10 flex flex-col items-start gap-1">
              <span className="text-[9px] font-extrabold text-amber-500 uppercase tracking-[0.25em]">Ready to Grow?</span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight max-w-[500px] mt-2">
                Let's build the right digital system for your business.
              </h2>
            </div>

            {/* Action buttons */}
            <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0 justify-end">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="group flex items-center justify-center gap-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 px-7 py-4.5 text-xs font-black uppercase tracking-widest text-slate-900 shadow-md shadow-amber-500/10 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                Request a Strategy Call
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </button>

              <a 
                href="https://wa.me/919986389444"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 px-7 py-4.5 text-xs font-black uppercase tracking-widest text-slate-700 active:scale-95 transition-all duration-200"
              >
                <FaWhatsapp className="h-5 w-5 text-emerald-500" />
                Chat on WhatsApp
              </a>
            </div>

          </div>
        </section>

      </div>

      {/* Modal Popup */}
      <CallbackModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </main>
  );
}
