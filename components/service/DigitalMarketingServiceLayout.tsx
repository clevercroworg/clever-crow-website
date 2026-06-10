"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Search,
  Megaphone,
  Target,
  Pencil,
  Rocket,
  Monitor,
  TrendingUp,
  BarChart3,
  LineChart,
  MousePointerClick,
  Eye,
  Users,
  Heart,
  Building,
  Home,
  GraduationCap,
  ShoppingCart,
  Layers,
  Database,
  Code2,
  Layout,
  Smartphone,
  Cpu,
  Headphones,
  Calendar,
  Briefcase,
  Award,
  Network,
  Wrench,
  Shield,
  RefreshCw
} from "lucide-react";
import { FaWhatsapp, FaGoogle, FaFacebookF, FaInstagram } from "react-icons/fa";

// ─── Icon Map ───
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  search: Search,
  megaphone: Megaphone,
  target: Target,
  pencil: Pencil,
  rocket: Rocket,
  monitor: Monitor,
  trendingup: TrendingUp,
  barchart3: BarChart3,
  linechart: LineChart,
  mousepointerclick: MousePointerClick,
  eye: Eye,
  users: Users,
  home: Home,
  graduationcap: GraduationCap,
  shoppingcart: ShoppingCart,
  layers: Layers,
  database: Database,
  code2: Code2,
  layout: Layout,
  smartphone: Smartphone,
  cpu: Cpu,
  headphones: Headphones,
  calendar: Calendar,
  briefcase: Briefcase,
  award: Award,
  network: Network,
  wrench: Wrench,
  shield: Shield,
  refreshcw: RefreshCw,
  checkcircle2: CheckCircle2
};

// ─── Service Config Helper (color-coded branded icons) ───
function getMarketingServiceConfig(title: string, iconKey: string) {
  const t = title.toLowerCase();

  if (t.includes("google")) {
    return {
      icon: Search,
      bgColor: "bg-blue-500/10 border border-blue-500/20",
      textColor: "text-blue-600",
      borderColor: "hover:border-blue-500/35",
      arrowColor: "group-hover:text-blue-600"
    };
  }
  if (t.includes("meta") || t.includes("facebook") || t.includes("instagram")) {
    return {
      icon: Megaphone,
      bgColor: "bg-indigo-500/10 border border-indigo-500/20",
      textColor: "text-indigo-600",
      borderColor: "hover:border-indigo-500/35",
      arrowColor: "group-hover:text-indigo-600"
    };
  }
  if (t.includes("seo") || t.includes("organic")) {
    return {
      icon: Target,
      bgColor: "bg-emerald-500/10 border border-emerald-500/20",
      textColor: "text-emerald-600",
      borderColor: "hover:border-emerald-500/35",
      arrowColor: "group-hover:text-emerald-600"
    };
  }
  if (t.includes("social") || t.includes("content") || t.includes("community") || t.includes("reels") || t.includes("hashtag")) {
    return {
      icon: Pencil,
      bgColor: "bg-pink-500/10 border border-pink-500/20",
      textColor: "text-pink-600",
      borderColor: "hover:border-pink-500/35",
      arrowColor: "group-hover:text-pink-600"
    };
  }
  if (t.includes("lead") || t.includes("landing") || t.includes("funnel") || t.includes("whatsapp")) {
    return {
      icon: Rocket,
      bgColor: "bg-orange-500/10 border border-orange-500/20",
      textColor: "text-orange-600",
      borderColor: "hover:border-orange-500/35",
      arrowColor: "group-hover:text-orange-600"
    };
  }
  if (t.includes("performance") || t.includes("retarget") || t.includes("conversion") || t.includes("creative") || t.includes("a/b")) {
    return {
      icon: TrendingUp,
      bgColor: "bg-teal-500/10 border border-teal-500/20",
      textColor: "text-teal-600",
      borderColor: "hover:border-teal-500/35",
      arrowColor: "group-hover:text-teal-600"
    };
  }
  if (t.includes("analytics") || t.includes("tracking") || t.includes("ga4") || t.includes("gtm") || t.includes("pixel") || t.includes("dashboard") || t.includes("data layer") || t.includes("attribution")) {
    return {
      icon: BarChart3,
      bgColor: "bg-violet-500/10 border border-violet-500/20",
      textColor: "text-violet-600",
      borderColor: "hover:border-violet-500/35",
      arrowColor: "group-hover:text-violet-600"
    };
  }
  if (t.includes("crm") || t.includes("follow")) {
    return {
      icon: Database,
      bgColor: "bg-purple-500/10 border border-purple-500/20",
      textColor: "text-purple-600",
      borderColor: "hover:border-purple-500/35",
      arrowColor: "group-hover:text-purple-600"
    };
  }
  if (t.includes("paid search") || t.includes("search campaign")) {
    return {
      icon: Search,
      bgColor: "bg-blue-500/10 border border-blue-500/20",
      textColor: "text-blue-600",
      borderColor: "hover:border-blue-500/35",
      arrowColor: "group-hover:text-blue-600"
    };
  }
  if (t.includes("paid social")) {
    return {
      icon: Megaphone,
      bgColor: "bg-indigo-500/10 border border-indigo-500/20",
      textColor: "text-indigo-600",
      borderColor: "hover:border-indigo-500/35",
      arrowColor: "group-hover:text-indigo-600"
    };
  }

  // Fallback
  const FallbackIcon = iconMap[iconKey.toLowerCase().replace(/[^a-z0-9]/g, "")] || Monitor;
  return {
    icon: FallbackIcon,
    bgColor: "bg-amber-500/10 border border-amber-500/20",
    textColor: "text-amber-500",
    borderColor: "hover:border-amber-500/35",
    arrowColor: "group-hover:text-amber-500"
  };
}

// ─── Types ───
type ServiceItem = {
  icon: string;
  title: string;
  description: string;
  href: string;
};

type FAQItem = {
  question: string;
  answer: string;
};

type DigitalMarketingServiceLayoutProps = {
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  serviceName: string;
  services: ServiceItem[];
  whyChoose: string[];
  faqs: FAQItem[];
  pageUrl: string;
};

export default function DigitalMarketingServiceLayout({
  eyebrow,
  heroTitle,
  heroSubtitle,
  serviceName,
  services,
  whyChoose,
  faqs,
  pageUrl
}: DigitalMarketingServiceLayoutProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Hero Bullets
  const heroBullets = [
    { title: "Higher ROI", desc: "Optimize every rupee for maximum lead generation.", icon: "trendingup" },
    { title: "Quality Leads", desc: "Attract customers who are ready to buy.", icon: "target" },
    { title: "Data-Driven", desc: "Every decision backed by real analytics data.", icon: "barchart3" },
    { title: "Full-Funnel Strategy", desc: "From awareness to conversion and beyond.", icon: "layers" }
  ];

  // Marketing Funnel Steps (Hero Right Side)
  const funnelSteps = [
    {
      title: "Awareness",
      desc: "Reach your audience via Google, Meta & social channels.",
      colorClass: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      icon: <Eye size={16} className="stroke-[2.5]" />
    },
    {
      title: "Interest & Engagement",
      desc: "Engage with compelling content, ads and creatives.",
      colorClass: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
      icon: <MousePointerClick size={16} className="stroke-[2.5]" />
    },
    {
      title: "Lead Capture",
      desc: "Convert visitors into leads with landing pages and forms.",
      colorClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      icon: <Target size={16} className="stroke-[2.5]" />
    },
    {
      title: "Conversion & Growth",
      desc: "Nurture leads, track results and scale what works.",
      colorClass: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      icon: <TrendingUp size={16} className="stroke-[2.5]" />
    }
  ];

  // How It Works Steps
  const howItWorksSteps = [
    { step: "01", title: "Strategy & Research", desc: "Analyse your business, market and competitors to build a data-led plan.", icon: "search" },
    { step: "02", title: "Campaign Setup", desc: "Create ads, landing pages, tracking and audience targeting.", icon: "layout" },
    { step: "03", title: "Launch & Optimize", desc: "Go live, A/B test creatives and optimize for best results.", icon: "rocket" },
    { step: "04", title: "Report & Scale", desc: "Transparent reporting, insights and scaling what works.", icon: "barchart3" }
  ];

  // Industries We Help
  const industryHelps = [
    { title: "Real Estate", desc: "Generate enquiries for projects, plots and villas.", icon: "home" },
    { title: "Healthcare", desc: "Drive patient appointments and health leads.", icon: "heart" },
    { title: "Education", desc: "Boost admissions and course enrollments.", icon: "graduationcap" },
    { title: "eCommerce", desc: "Increase orders, ROAS and repeat customers.", icon: "shoppingcart" },
    { title: "Service Businesses", desc: "Fill your pipeline with quality service leads.", icon: "briefcase" }
  ];

  const industryIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    home: Home,
    heart: Heart,
    graduationcap: GraduationCap,
    shoppingcart: ShoppingCart,
    briefcase: Briefcase
  };

  return (
    <div className="bg-white min-h-screen text-slate-800 antialiased font-body pt-24 pb-0 selection:bg-amber-500/20">
      
      {/* ───────────────── 1. HERO SECTION ───────────────── */}
      <section className="relative overflow-hidden pt-6 pb-12 md:pb-16 bg-gradient-to-b from-slate-100/60 via-slate-50/50 to-slate-50/20">
        
        {/* Dot grid bg */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div 
            className="absolute inset-0 opacity-[0.3]"
            style={{
              backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.04) 1.2px, transparent 1.2px)`,
              backgroundSize: "24px 24px"
            }}
          />
          <div className="absolute top-12 left-12 w-[300px] h-[300px] rounded-full bg-blue-200/10 blur-[80px]" />
          <div className="absolute bottom-12 right-12 w-[350px] h-[350px] rounded-full bg-amber-100/15 blur-[90px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-6 uppercase tracking-wider">
            <Link href="/" className="hover:text-slate-600 transition-colors font-sans">Home</Link>
            <span>/</span>
            <span className="hover:text-slate-600 transition-colors cursor-default font-sans">Services</span>
            <span>/</span>
            <span className="text-amber-500 font-extrabold font-sans">{eyebrow}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Text & Buttons */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/5 text-amber-600 mb-5 font-sans font-black text-[9px] uppercase tracking-widest shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                {eyebrow}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[50px] font-black leading-[1.12] tracking-tight text-slate-900 font-sans">
                {heroTitle}
              </h1>

              <p className="mt-6 text-sm md:text-base text-slate-600 leading-relaxed font-semibold max-w-xl">
                {heroSubtitle}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a
                  href="#contact-form"
                  className="group flex items-center justify-center gap-2 rounded-2xl bg-amber-500 px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-900 shadow-md shadow-amber-500/15 hover:bg-amber-600 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
                >
                  Get a Growth Plan
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="#marketing-services"
                  className="group flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:scale-[1.01] active:scale-95 transition-all"
                >
                  Explore Services
                </a>
              </div>

            </div>

            {/* Right Column: Marketing Funnel Visual */}
            <div className="lg:col-span-6 w-full flex flex-col justify-center">
              <div className="relative bg-white border border-slate-200/80 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.01)] max-w-lg mx-auto w-full font-sans">
                
                <p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 mb-6 leading-none text-center">
                  MARKETING GROWTH FUNNEL
                </p>

                <div className="flex flex-col gap-4 relative">
                  
                  {funnelSteps.map((step, idx) => (
                    <div key={idx} className="relative flex items-stretch gap-4">
                      
                      {/* Connecting Line (Vertical) */}
                      {idx < funnelSteps.length - 1 && (
                        <div className="absolute left-6 top-10 bottom-[-16px] w-[2px] border-l-2 border-dashed border-slate-200" />
                      )}

                      {/* Step Icon Container */}
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl shrink-0 border shadow-sm z-10 ${step.colorClass}`}>
                        {step.icon}
                      </div>

                      {/* Step content */}
                      <div className="flex flex-col justify-center bg-slate-50/40 border border-slate-200/40 rounded-2xl px-4 py-3 flex-grow shadow-xs">
                        <span className="text-[11px] font-black text-slate-800 tracking-tight leading-none">
                          {step.title}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500 leading-normal mt-1 block">
                          {step.desc}
                        </span>
                      </div>
                    </div>
                  ))}

                </div>

                {/* Platform Logos Row */}
                <div className="mt-6 pt-4 border-t border-slate-100/60 flex items-center justify-center gap-5">
                  <FaGoogle className="w-4 h-4 text-slate-300 hover:text-[#4285F4] transition-colors" />
                  <FaFacebookF className="w-4 h-4 text-slate-300 hover:text-[#1877F2] transition-colors" />
                  <FaInstagram className="w-4 h-4 text-slate-300 hover:text-[#E4405F] transition-colors" />
                  <FaWhatsapp className="w-4 h-4 text-slate-300 hover:text-[#25D366] transition-colors" />
                </div>

              </div>
            </div>

          </div>

          {/* Hero Bottom Bullets */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {heroBullets.map((bullet, idx) => {
              const BulletIcon = iconMap[bullet.icon] || TrendingUp;
              return (
                <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex gap-3.5 items-start">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 shrink-0">
                    <BulletIcon size={18} className="stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-slate-800 tracking-tight leading-none mb-1.5">
                      {bullet.title}
                    </h3>
                    <p className="text-[10px] font-semibold text-slate-500 leading-normal">
                      {bullet.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </section>

      {/* ───────────────── 2. OUR MARKETING SERVICES GRID ───────────────── */}
      <section id="marketing-services" className="py-8 md:py-10 max-w-7xl mx-auto px-6 lg:px-8 border-t border-slate-100/80">
        
        {/* Title */}
        <div className="mb-6 text-center max-w-2xl mx-auto">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-500 mb-2 font-sans">
            OUR SERVICES
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-3 font-sans">
            Digital Marketing Services
          </h2>
        </div>

        {/* 3×2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {services.map((svc, i) => {
            const config = getMarketingServiceConfig(svc.title, svc.icon);
            const IconComponent = config.icon;
            return (
              <Link
                href={svc.href}
                key={i}
                className={`group bg-white border border-slate-200/80 rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all duration-300 flex gap-4 items-start font-sans relative cursor-pointer min-h-[110px] ${config.borderColor}`}
              >
                {/* Icon */}
                <div className={`flex h-10 w-10 items-center justify-center rounded-full shrink-0 mt-0.5 ${config.bgColor} ${config.textColor}`}>
                  <IconComponent size={20} className="w-5 h-5 shrink-0" />
                </div>
                {/* Text */}
                <div className="flex flex-col justify-start pr-6">
                  <h3 className="text-xs md:text-[13px] font-black text-slate-800 tracking-tight leading-snug group-hover:text-slate-900 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-[10px] md:text-[11px] font-bold text-slate-500 mt-2 leading-relaxed">
                    {svc.description}
                  </p>
                </div>
                {/* Arrow CTA */}
                <div className="absolute bottom-4 right-4 text-slate-300 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight size={15} className={`stroke-[2.5] ${config.arrowColor}`} />
                </div>
              </Link>
            );
          })}
        </div>

      </section>

      {/* ───────────────── 3. HOW IT WORKS ───────────────── */}
      <section className="py-10 md:py-16 bg-slate-50/50 border-t border-b border-slate-100/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-500 mb-3 font-sans">
              OUR PROCESS
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-4 font-sans">
              How It Works
            </h2>
          </div>

          {/* 4-Step horizontal timeline */}
          <div className="relative">
            <div className="absolute top-[38px] left-[7%] right-[7%] h-[2px] bg-slate-200/60 hidden lg:block z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start relative z-10">
              {howItWorksSteps.map((step, idx) => {
                const StepIcon = iconMap[step.icon.toLowerCase()] || Search;
                return (
                  <div key={idx} className="flex flex-col items-center text-center group">
                    <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm group-hover:border-amber-500 transition-all shrink-0">
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-white border border-amber-500 text-[10px] font-black text-amber-500 shadow-sm font-sans">
                        {step.step}
                      </div>
                      <StepIcon className="w-8 h-8 text-amber-500 stroke-[1.5]" />
                    </div>

                    <h4 className="text-xs font-black text-slate-800 tracking-tight mt-5 leading-tight font-sans">
                      {step.title}
                    </h4>
                    <p className="text-[10px] font-semibold text-slate-500 mt-2 leading-relaxed max-w-[150px] mx-auto font-sans">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ───────────────── 4. INDUSTRIES WE HELP ───────────────── */}
      <section className="py-10 md:py-16 max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-500 mb-3 font-sans">
            INDUSTRIES WE HELP
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-4 font-sans">
            Marketing That Works for Your Industry
          </h2>
        </div>

        {/* 5 columns of industry helper cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {industryHelps.map((ind, i) => {
            const IndIcon = industryIconMap[ind.icon] || Building;
            return (
              <div key={i} className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-row items-center gap-4 hover:border-amber-500/20 transition-colors font-sans">
                {/* Large Outline Icon (no background container) */}
                <IndIcon size={46} className="text-[#F59E0B] shrink-0 stroke-[1.3]" />
                {/* Text content */}
                <div className="flex flex-col justify-start">
                  <span className="text-[11px] font-black text-slate-800 tracking-tight leading-none block mb-1.5">
                    {ind.title}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 leading-normal block">
                    {ind.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* ───────────────── 5. WHY CHOOSE, FAQ, CTA BLOCK ───────────────── */}
      <section id="contact-form" className="py-8 md:py-12 bg-slate-50/30 border-t border-b border-slate-100/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Column 1: Why Choose (4/12 width) */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-500 mb-3 leading-none font-sans">
                  WHY CHOOSE CLEVER CROW
                </p>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight font-sans mb-6">
                  Marketing That <br />Drives Results
                </h2>

                <div className="flex flex-col gap-4 font-sans">
                  {whyChoose.slice(0, 4).map((point, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-slate-950 shrink-0 shadow-sm shadow-amber-500/15">
                        <Check size={11} className="stroke-[3.5]" />
                      </div>
                      <span className="text-[12px] font-black text-slate-800 tracking-tight leading-snug">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini Dashboard Card — Leads Generated */}
              <div className="bg-slate-50/60 border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-col gap-3 font-sans mt-6">
                
                {/* Live Pulse Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/40">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-1.5 w-1.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                    </span>
                    <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">Leads Generated</span>
                  </div>
                  <span className="text-[8px] font-extrabold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                    Live
                  </span>
                </div>

                {/* Leads Generated Segment */}
                <div className="flex justify-between items-center py-0.5">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 block tracking-wider uppercase">Total Leads</span>
                    <span className="text-xl font-black text-slate-900 mt-0.5 block leading-none font-sans">4,820</span>
                    <span className="text-[9px] font-extrabold text-green-500 block mt-1">+41.3% this month</span>
                  </div>
                  {/* SVG graph line */}
                  <div className="w-24 h-10 shrink-0 relative flex items-center">
                    <svg className="w-full h-full text-green-500 overflow-visible" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="dmLeadsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0 35 Q 20 22, 40 28 T 80 12 T 100 5" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M0 35 Q 20 22, 40 28 T 80 12 T 100 5 L 100 40 L 0 40 Z" fill="url(#dmLeadsGradient)" />
                      <circle cx="100" cy="5" r="3" fill="currentColor" className="animate-pulse" />
                    </svg>
                  </div>
                </div>

              </div>

            </div>

            {/* Column 2: FAQs Accordion (5/12 width) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-slate-400 mb-3 leading-none font-sans">
                  FREQUENTLY ASKED QUESTIONS
                </p>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight font-sans mb-6">
                  Got Questions?
                </h2>

                <div className="flex flex-col gap-3 font-sans">
                  {faqs.map((faq, i) => (
                    <div 
                      key={i} 
                      className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-[0_2px_15px_rgba(0,0,0,0.01)] transition-colors hover:border-amber-500/30"
                    >
                      <button
                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                        className="flex w-full items-center justify-between text-left font-bold text-slate-800 text-[12px] md:text-[13px] hover:text-amber-500 transition-colors"
                      >
                        <span>{faq.question}</span>
                        <span className="text-slate-400 shrink-0 text-sm font-bold ml-4 select-none">
                          {activeFaq === i ? "−" : "+"}
                        </span>
                      </button>
                      <AnimatePresence>
                        {activeFaq === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pb-1 pt-3 text-[11px] font-semibold text-slate-500 leading-relaxed border-t border-slate-100/50 mt-3">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Campaign ROAS Metrics Card */}
              <div className="bg-slate-50/60 border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-col gap-3 font-sans mt-6">
                
                {/* Live Speed Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/40">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-1.5 w-1.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                    </span>
                    <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">Campaign ROAS</span>
                  </div>
                  <span className="text-[8px] font-extrabold text-amber-600 bg-amber-500/10 px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                    Active
                  </span>
                </div>

                {/* ROAS Segment */}
                <div className="flex justify-between items-center py-0.5">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 block tracking-wider uppercase">Return on Ad Spend</span>
                    <span className="text-xl font-black text-slate-900 mt-0.5 block leading-none font-sans">5.2x avg</span>
                    <span className="text-[9px] font-extrabold text-amber-500 block mt-1">Above industry avg</span>
                  </div>
                  {/* SVG graph line */}
                  <div className="w-24 h-10 shrink-0 relative flex items-center">
                    <svg className="w-full h-full text-amber-500 overflow-visible" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="dmRoasGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0 32 Q 25 30, 50 15 T 100 8" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M0 32 Q 25 30, 50 15 T 100 8 L 100 40 L 0 40 Z" fill="url(#dmRoasGradient)" />
                      <circle cx="100" cy="8" r="3" fill="currentColor" className="animate-pulse" />
                    </svg>
                  </div>
                </div>

              </div>

            </div>

            {/* Column 3: CTA + Metrics (3/12 width) */}
            <div className="lg:col-span-3 flex flex-col justify-between">
              
              {/* Cream CTA Card */}
              <div className="bg-[#FFFBF2] border border-amber-500/15 rounded-[2rem] p-5 md:p-6 shadow-[0_2px_15px_rgba(245,158,11,0.02)] flex flex-col items-center text-center justify-between py-6 flex-grow">
                
                {/* Mascot & Text Group */}
                <div className="flex flex-col items-center justify-center flex-grow py-2">
                  {/* Marketing Growth Visual */}
                  <div className="w-48 h-48 relative flex items-center justify-center mb-4">
                    <img 
                      src="/images/cute-robot-mascot.png" 
                      alt="Clever Crow Digital Marketing Mascot" 
                      className="w-full h-full object-contain relative z-10 scale-110 hover:scale-115 transition-transform duration-300 select-none pointer-events-none"
                    />
                  </div>

                  {/* Text Block */}
                  <div className="flex flex-col items-center">
                    <h3 className="text-base md:text-lg font-black text-slate-900 tracking-tight leading-tight font-sans">
                      Ready to Grow <br />Your Business?
                    </h3>
                  </div>
                </div>

                {/* Button inside the cream card */}
                <div className="w-full mt-4 font-sans">
                  <a
                    href="#contact-form"
                    className="group flex items-center justify-center gap-2 rounded-2xl bg-amber-500 px-5 py-3 text-xs font-black uppercase tracking-wider text-slate-900 shadow-md shadow-amber-500/10 hover:bg-amber-600 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer w-full text-center"
                  >
                    Get Started
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>

              </div>

              {/* Bottom Metrics Card: Conversion Rate */}
              <div className="bg-slate-50/60 border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-col gap-3 font-sans mt-6">
                
                {/* Live Success Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/40">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-1.5 w-1.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                    </span>
                    <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">Conversion Rate</span>
                  </div>
                  <span className="text-[8px] font-extrabold text-blue-600 bg-blue-500/10 px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                    Tracking
                  </span>
                </div>

                {/* Conversion Rate Segment */}
                <div className="flex justify-between items-center py-0.5">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 block tracking-wider uppercase">Avg Conversion</span>
                    <span className="text-xl font-black text-slate-900 mt-0.5 block leading-none font-sans">12.4%</span>
                    <span className="text-[9px] font-extrabold text-blue-500 block mt-1">3x industry avg</span>
                  </div>
                  {/* SVG graph line */}
                  <div className="w-24 h-10 shrink-0 relative flex items-center">
                    <svg className="w-full h-full text-blue-500 overflow-visible" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="dmConvGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0 35 Q 25 15, 50 22 T 85 8 T 100 2" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M0 35 Q 25 15, 50 22 T 85 8 T 100 2 L 100 40 L 0 40 Z" fill="url(#dmConvGradient)" />
                      <circle cx="100" cy="2" r="3" fill="currentColor" className="animate-pulse" />
                    </svg>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ───────────────── 6. BOTTOM BANNER STRIP ───────────────── */}
      <section className="py-6 md:py-8 max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="bg-amber-500 rounded-[2rem] p-5 md:px-8 md:py-5 text-slate-950 shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left section: Icon and Text */}
          <div className="flex items-center gap-4 flex-1">
            {/* Chart Growth SVG Icon */}
            <svg className="w-11 h-11 text-white shrink-0 overflow-visible select-none pointer-events-none" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="40" height="40" rx="10" fill="white" fillOpacity="0.15" />
              <rect x="10" y="26" width="6" height="14" rx="2" fill="white" />
              <rect x="21" y="18" width="6" height="22" rx="2" fill="white" />
              <rect x="32" y="10" width="6" height="30" rx="2" fill="white" />
              <polygon points="39,6 41,11 46,13 41,15 39,20 37,15 32,13 37,11" fill="white" />
            </svg>
            
            <div className="flex flex-col">
              <h4 className="text-sm md:text-base font-black leading-tight text-slate-950 font-sans">
                Let data drive your growth.
              </h4>
              <p className="text-sm md:text-base font-black leading-tight text-slate-950 font-sans">
                We handle the campaigns.
              </p>
            </div>
          </div>

          {/* Vertical dashed divider line (desktop only) */}
          <div className="hidden md:block h-10 border-l border-dashed border-slate-950/20 mx-4" />

          {/* Right section: Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 w-full md:w-auto shrink-0 font-sans">
            <a
              href="#contact-form"
              className="flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 text-white hover:scale-[1.01] active:scale-95 transition-all px-6 py-3.5 rounded-full font-black text-xs shadow-sm cursor-pointer"
            >
              <span>Book a Free Consultation</span>
              <ArrowRight size={13} className="stroke-[3]" />
            </a>

            <a
              href={`https://wa.me/919986389444?text=Hi%2C%20I'm%20interested%20in%20your%20${encodeURIComponent(serviceName)}%20service.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 hover:scale-[1.01] active:scale-95 transition-all px-6 py-3.5 rounded-full text-slate-800 font-bold text-xs shadow-sm"
            >
              <FaWhatsapp size={16} className="text-[#25D366] shrink-0" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

        </div>

      </section>

    </div>
  );
}
