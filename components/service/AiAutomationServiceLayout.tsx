"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Menu,
  ChevronDown,
  ArrowRight,
  Phone,
  Laptop,
  Smartphone,
  Cpu,
  Megaphone,
  Check,
  Layout,
  ShoppingCart,
  Code2,
  RefreshCw,
  Wrench,
  Search,
  MessageSquare,
  Shield,
  Layers,
  HelpCircle,
  CheckCircle2,
  Target,
  Rocket,
  Headphones,
  Home,
  Calendar,
  Database,
  Monitor,
  Users,
  Award,
  Network,
  Pencil,
  ChevronLeft,
  Clock,
  TrendingUp,
  MessageCircle,
  Building,
  Heart,
  Bed,
  GraduationCap,
  Bot,
  User,
  Send,
  Workflow
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  laptop: Laptop,
  smartphone: Smartphone,
  cpu: Cpu,
  megaphone: Megaphone,
  layout: Layout,
  shoppingcart: ShoppingCart,
  code2: Code2,
  refreshcw: RefreshCw,
  wrench: Wrench,
  search: Search,
  chevrondown: ChevronDown,
  checkcircle2: CheckCircle2,
  target: Target,
  shield: Shield,
  pencil: Pencil,
  rocket: Rocket,
  headphones: Headphones,
  home: Home,
  calendar: Calendar,
  database: Database,
  monitor: Monitor,
  users: Users,
  award: Award,
  network: Network,
  clock: Clock,
  trendingup: TrendingUp,
  messagecircle: MessageCircle,
  building: Building,
  heart: Heart,
  bed: Bed,
  graduationcap: GraduationCap
};

function getServiceConfig(title: string, iconKey: string) {
  const t = title.toLowerCase();
  const k = iconKey.toLowerCase();
  
  if (t.includes("whatsapp")) {
    return {
      icon: FaWhatsapp,
      bgColor: "bg-emerald-500/10 border border-emerald-500/20",
      textColor: "text-[#25D366]",
      borderColor: "hover:border-emerald-500/35",
      arrowColor: "group-hover:text-emerald-500"
    };
  }
  if (t.includes("chatbot") || t.includes("bot") || k === "cpu") {
    return {
      icon: Bot,
      bgColor: "bg-amber-500/10 border border-amber-500/20",
      textColor: "text-[#F59E0B]",
      borderColor: "hover:border-amber-500/35",
      arrowColor: "group-hover:text-amber-500"
    };
  }
  if (t.includes("lead") || k === "target") {
    return {
      icon: User,
      bgColor: "bg-orange-500/10 border border-orange-500/20",
      textColor: "text-orange-500",
      borderColor: "hover:border-orange-500/35",
      arrowColor: "group-hover:text-orange-500"
    };
  }
  if (t.includes("crm") || k === "database") {
    return {
      icon: Database,
      bgColor: "bg-purple-500/10 border border-purple-500/20",
      textColor: "text-purple-500",
      borderColor: "hover:border-purple-500/35",
      arrowColor: "group-hover:text-purple-500"
    };
  }
  if (t.includes("sales") || t.includes("follow") || k === "rocket") {
    return {
      icon: Send,
      bgColor: "bg-amber-500/10 border border-amber-500/20",
      textColor: "text-amber-500",
      borderColor: "hover:border-amber-500/35",
      arrowColor: "group-hover:text-amber-500"
    };
  }
  if (t.includes("workflow") || t.includes("process") || k === "wrench" || k === "network") {
    return {
      icon: Workflow,
      bgColor: "bg-blue-500/10 border border-blue-500/20",
      textColor: "text-blue-500",
      borderColor: "hover:border-blue-500/35",
      arrowColor: "group-hover:text-blue-500"
    };
  }

  // Fallback default
  const FallbackIcon = iconMap[k] || Cpu;
  return {
    icon: FallbackIcon,
    bgColor: "bg-amber-500/10 border border-amber-500/20",
    textColor: "text-amber-500",
    borderColor: "hover:border-amber-500/35",
    arrowColor: "group-hover:text-amber-500"
  };
}

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

type AiAutomationServiceLayoutProps = {
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  serviceName: string;
  services: ServiceItem[];
  whyChoose: string[];
  faqs: FAQItem[];
  pageUrl: string;
};

export default function AiAutomationServiceLayout({
  eyebrow,
  heroTitle,
  heroSubtitle,
  serviceName,
  services,
  whyChoose,
  faqs,
  pageUrl
}: AiAutomationServiceLayoutProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Hero bullets
  const heroBullets = [
    { title: "Faster Response", desc: "Instant replies and automated follow-ups.", icon: "cpu" },
    { title: "Less Manual Work", desc: "Automate repetitive tasks and save hours daily.", icon: "clock" },
    { title: "Better Lead Tracking", desc: "Capture, score and track every lead in one place.", icon: "target" },
    { title: "Scalable Workflows", desc: "Automation that grows with your business.", icon: "trendingup" }
  ];

  // Hero Right-Side Flowchart steps
  const flowchartSteps = [
    {
      title: "Lead Enquiry",
      desc: "New leads come in via website, ads or forms.",
      colorClass: "bg-green-500/10 text-green-600 border-green-500/20",
      icon: <Users size={16} className="stroke-[2.5]" />
    },
    {
      title: "Instant WhatsApp Reply",
      desc: "AI instantly replies, engages and qualifies the lead.",
      colorClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      icon: <MessageCircle size={16} className="stroke-[2.5]" />
    },
    {
      title: "CRM Update",
      desc: "Lead details are captured and updated in CRM.",
      colorClass: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      icon: <Database size={16} className="stroke-[2.5]" />
    },
    {
      title: "Follow-Up",
      desc: "Auto follow-ups nurture leads until they convert.",
      colorClass: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      icon: <Check size={16} className="stroke-[3]" />
    }
  ];

  // How It Works Steps
  const howItWorksSteps = [
    { step: "01", title: "Enquiry Received", desc: "Leads come in from website, ads, WhatsApp or forms.", icon: "messagecircle" },
    { step: "02", title: "AI Qualification", desc: "AI asks key questions and qualifies the lead.", icon: "cpu" },
    { step: "03", title: "CRM Capture", desc: "Lead data is saved in CRM and assigned to the team.", icon: "database" },
    { step: "04", title: "Follow-Up & Reporting", desc: "Automated follow-ups and performance tracking.", icon: "checkcircle2" }
  ];

  // Where Automation Helps
  const industryHelps = [
    { title: "Real Estate", desc: "Capture leads, schedule visits and close faster.", icon: "building" },
    { title: "Healthcare", desc: "Manage appointments, reminders and patient queries.", icon: "heart" },
    { title: "Hospitality", desc: "Handle bookings, inquiries and guest communication.", icon: "bed" },
    { title: "Education", desc: "Nurture enquiries and improve admissions.", icon: "graduationcap" },
    { title: "Service Businesses", desc: "Automate follow-ups and delight your customers.", icon: "users" }
  ];

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
          <div className="absolute top-12 left-12 w-[300px] h-[300px] rounded-full bg-amber-200/10 blur-[80px]" />
          <div className="absolute bottom-12 right-12 w-[350px] h-[350px] rounded-full bg-blue-100/20 blur-[90px]" />
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
                {heroTitle.includes("Replies") || heroTitle.includes("Replies,") ? (
                  <span>
                    AI Automation for <br />
                    <span className="text-amber-500">Faster Replies</span>, Better <br className="hidden sm:inline" />
                    Follow-Ups & <br className="hidden sm:inline" />
                    Smarter Workflows
                  </span>
                ) : (
                  heroTitle
                )}
              </h1>

              <p className="mt-6 text-sm md:text-base text-slate-600 leading-relaxed font-semibold max-w-xl">
                {heroSubtitle}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a
                  href="#contact-form"
                  className="group flex items-center justify-center gap-2 rounded-2xl bg-amber-500 px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-900 shadow-md shadow-amber-500/15 hover:bg-amber-600 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
                >
                  Book a Free Consultation
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="#automation-services"
                  className="group flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:scale-[1.01] active:scale-95 transition-all"
                >
                  Explore Automation Services
                </a>
              </div>

            </div>

            {/* Right Column: Visual 4-Step Flowchart */}
            <div className="lg:col-span-6 w-full flex flex-col justify-center">
              <div className="relative bg-white border border-slate-200/80 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.01)] max-w-lg mx-auto w-full font-sans">
                
                <p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 mb-6 leading-none text-center">
                  CUSTOMER ACQUISITION FLOW
                </p>

                <div className="flex flex-col gap-4 relative">
                  
                  {flowchartSteps.map((step, idx) => (
                    <div key={idx} className="relative flex items-stretch gap-4">
                      
                      {/* Connecting Line (Vertical) */}
                      {idx < flowchartSteps.length - 1 && (
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

              </div>
            </div>

          </div>

          {/* Hero Bottom Bullets */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {heroBullets.map((bullet, idx) => {
              const BulletIcon = iconMap[bullet.icon] || Clock;
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

      {/* ───────────────── 2. OUR SERVICES GRID ───────────────── */}
      <section id="automation-services" className="py-8 md:py-10 max-w-7xl mx-auto px-6 lg:px-8 border-t border-slate-100/80">
        
        {/* Title */}
        <div className="mb-6 text-center max-w-2xl mx-auto">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-500 mb-2 font-sans">
            AUTOMATION SERVICES
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-3 font-sans">
            Our Automation Services
          </h2>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {services.map((svc, i) => {
            const config = getServiceConfig(svc.title, svc.icon);
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
              HOW IT WORKS
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-4 font-sans">
              How It Works
            </h2>
          </div>

          {/* Dotted horizontal line timeline */}
          <div className="relative">
            <div className="absolute top-[38px] left-[7%] right-[7%] h-[2px] bg-slate-200/60 hidden lg:block z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start relative z-10">
              {howItWorksSteps.map((step, idx) => {
                const StepIcon = iconMap[step.icon.toLowerCase()] || Cpu;
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

      {/* ───────────────── 4. WHERE AUTOMATION HELPS ───────────────── */}
      <section className="py-10 md:py-16 max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-500 mb-3 font-sans">
            WHERE AUTOMATION HELPS
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-4 font-sans">
            Where Automation Helps
          </h2>
        </div>

        {/* 5 columns of horizontal industry helper cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {industryHelps.map((ind, i) => {
            const IndIcon = iconMap[ind.icon.toLowerCase()] || Building;
            return (
              <div key={i} className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-col gap-3 items-start hover:border-amber-500/20 transition-colors font-sans">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 shrink-0">
                  <IndIcon size={18} className="stroke-[2]" />
                </div>
                <div>
                  <span className="text-[11px] font-black text-slate-800 tracking-tight leading-none block mb-1">
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
      <section id="faq-section" className="py-8 md:py-12 bg-slate-50/30 border-t border-b border-slate-100/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Column 1: Why Choose (4/12 width) */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-500 mb-3 leading-none font-sans">
                  WHY CHOOSE CLEVER CROW
                </p>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight font-sans mb-6">
                  Automation That <br />Drives Growth
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

              {/* Mini Dashboard Card Component - Leads Captured */}
              <div className="bg-slate-50/60 border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-col gap-3 font-sans mt-6">
                
                {/* Live Pulse Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/40">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-1.5 w-1.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                    </span>
                    <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">Live Performance</span>
                  </div>
                  <span className="text-[8px] font-extrabold text-amber-600 bg-amber-500/10 px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                    Pulse
                  </span>
                </div>

                {/* Leads Captured Segment */}
                <div className="flex justify-between items-center py-0.5">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 block tracking-wider uppercase">Leads Captured</span>
                    <span className="text-xl font-black text-slate-900 mt-0.5 block leading-none font-sans">2,548</span>
                    <span className="text-[9px] font-extrabold text-green-500 block mt-1">+32.6% this month</span>
                  </div>
                  {/* SVG graph line with linear gradient fill */}
                  <div className="w-24 h-10 shrink-0 relative flex items-center">
                    <svg className="w-full h-full text-green-500 overflow-visible" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="leadsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0 35 Q 20 20, 40 25 T 80 10 T 100 5" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M0 35 Q 20 20, 40 25 T 80 10 T 100 5 L 100 40 L 0 40 Z" fill="url(#leadsGradient)" />
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

              {/* Response Time Metrics Card */}
              <div className="bg-slate-50/60 border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-col gap-3 font-sans mt-6">
                
                {/* Live Speed Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/40">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-1.5 w-1.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                    </span>
                    <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">Response Efficiency</span>
                  </div>
                  <span className="text-[8px] font-extrabold text-green-600 bg-green-500/10 px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                    Active
                  </span>
                </div>

                {/* Avg Response Time Segment */}
                <div className="flex justify-between items-center py-0.5">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 block tracking-wider uppercase">Response Time</span>
                    <span className="text-xl font-black text-slate-900 mt-0.5 block leading-none font-sans">&lt; 20s avg</span>
                    <span className="text-[9px] font-extrabold text-amber-500 block mt-1">Instant resolution</span>
                  </div>
                  {/* SVG graph line with linear gradient fill - matching Leads Captured */}
                  <div className="w-24 h-10 shrink-0 relative flex items-center">
                    <svg className="w-full h-full text-amber-500 overflow-visible" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="responseGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0 32 Q 25 30, 50 15 T 100 8" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M0 32 Q 25 30, 50 15 T 100 8 L 100 40 L 0 40 Z" fill="url(#responseGradient)" />
                      <circle cx="100" cy="8" r="3" fill="currentColor" className="animate-pulse" />
                    </svg>
                  </div>
                </div>

              </div>

            </div>

            {/* Column 3: Ready to Automate + Mascot (3/12 width) */}
            <div className="lg:col-span-3 flex flex-col justify-between">
              
              {/* Mascot Cream Card - Compact with Button inside */}
              <div className="bg-[#FFFBF2] border border-amber-500/15 rounded-[2rem] p-5 md:p-6 shadow-[0_2px_15px_rgba(245,158,11,0.02)] flex flex-col items-center text-center justify-between py-6 flex-grow">
                
                {/* Mascot & Text Group */}
                <div className="flex flex-col items-center justify-center flex-grow py-2">
                  {/* High-fidelity 3D Robot Mascot PNG */}
                  <div className="w-48 h-48 relative flex items-center justify-center mb-4">
                    <img 
                      src="/images/cute-robot-mascot.png" 
                      alt="Clever Crow AI Robot Mascot" 
                      className="w-full h-full object-contain relative z-10 scale-110 hover:scale-115 transition-transform duration-300 select-none pointer-events-none"
                    />
                  </div>

                  {/* Text Block */}
                  <div className="flex flex-col items-center">
                    <h3 className="text-base md:text-lg font-black text-slate-900 tracking-tight leading-tight font-sans">
                      Ready to Automate <br />Your Business?
                    </h3>
                  </div>
                </div>

                {/* Button inside the cream card */}
                <div className="w-full mt-4 font-sans">
                  <a
                    href="#contact-form"
                    className="group flex items-center justify-center gap-2 rounded-2xl bg-amber-500 px-5 py-3 text-xs font-black uppercase tracking-wider text-slate-900 shadow-md shadow-amber-500/10 hover:bg-amber-600 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer w-full text-center"
                  >
                    Book Consultation
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>

              </div>

              {/* Bottom Metrics Card 3: AI Resolution */}
              <div className="bg-slate-50/60 border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-col gap-3 font-sans mt-6">
                
                {/* Live Success Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/40">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-1.5 w-1.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                    </span>
                    <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">Automation Rate</span>
                  </div>
                  <span className="text-[8px] font-extrabold text-blue-600 bg-blue-500/10 px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                    Success
                  </span>
                </div>

                {/* AI Resolution Segment */}
                <div className="flex justify-between items-center py-0.5">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 block tracking-wider uppercase">AI Resolution</span>
                    <span className="text-xl font-black text-slate-900 mt-0.5 block leading-none font-sans">88% rate</span>
                    <span className="text-[9px] font-extrabold text-blue-500 block mt-1">Automated support</span>
                  </div>
                  {/* SVG graph line with linear gradient fill - matching Leads/Response */}
                  <div className="w-24 h-10 shrink-0 relative flex items-center">
                    <svg className="w-full h-full text-blue-500 overflow-visible" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="resolutionGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0 35 Q 25 15, 50 22 T 85 8 T 100 2" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M0 35 Q 25 15, 50 22 T 85 8 T 100 2 L 100 40 L 0 40 Z" fill="url(#resolutionGradient)" />
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
            {/* Custom Sparkle Speech Bubble SVG Icon */}
            <svg className="w-11 h-11 text-white shrink-0 overflow-visible select-none pointer-events-none" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M 8 10 C 8 7, 10 5, 13 5 L 35 5 C 38 5, 40 7, 40 10 L 40 26 C 40 29, 38 31, 35 31 L 20 31 L 11 39 L 11 31 C 9.5 31, 8 29.5, 8 26 Z" 
                fill="white" 
              />
              <circle cx="21" cy="18" r="2.5" fill="#0f172a" />
              <circle cx="27" cy="18" r="2.5" fill="#0f172a" />
              <polygon 
                points="39,2 41,7 46,9 41,11 39,16 37,11 32,9 37,7" 
                fill="white" 
              />
            </svg>
            
            <div className="flex flex-col">
              <h4 className="text-sm md:text-base font-black leading-tight text-slate-950 font-sans">
                Let AI handle the repetitive.
              </h4>
              <p className="text-sm md:text-base font-black leading-tight text-slate-950 font-sans">
                You focus on growth.
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
