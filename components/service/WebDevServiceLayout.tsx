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
  CheckCircle2
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

// Map string identifiers to Lucide Icon components to avoid non-serializable objects error
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
  checkcircle2: CheckCircle2
};

// Default technologies list with custom SVG badges
const defaultTechnologies = [
  {
    name: "React",
    svg: (
      <svg className="w-8 h-8 text-[#61DAFB]" viewBox="-11.5 -10.23 23 20.463" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
        <g stroke="currentColor" strokeWidth="1" filter="url(#a)">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    )
  },
  {
    name: "Next.js",
    svg: (
      <svg className="w-8 h-8 text-black" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="90" cy="90" r="90" fill="currentColor"/>
        <path d="M149.508 157.52L69.142 54H54v72h13.5v-47.51l67.234 86.816a90.4 90.4 0 0014.774-17.786z" fill="white"/>
        <path d="M115.5 54h13.5v72h-13.5z" fill="white"/>
      </svg>
    )
  },
  {
    name: "WordPress",
    svg: (
      <svg className="w-8 h-8 text-[#21759B]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.176l5.24-14.37a9.92 9.92 0 013.322-.058L12.01 2.001zm3.708 14.542c-.08-.18-.17-.37-.28-.58-.16-.3-.36-.67-.53-1.02-.38-.8-.68-1.42-.68-1.89 0-.48.43-.88.82-1.28.38-.41.79-.84.79-1.39 0-.58-.46-.94-.97-.94-.37 0-.7.15-.99.35-.38.27-.61.64-.61.64s-.11.13-.23.13-.19-.07-.19-.17 0-.25.13-.42c.38-.46.88-.86 1.62-.86 1.07 0 1.83.67 1.83 1.62 0 .84-.52 1.39-.99 1.89-.32.33-.65.65-.65.99 0 .28.18.66.42 1.15.17.34.35.7.53 1.05.08.18.17.35.25.53a8 8 0 01-2.4-.67zM12 22a9.94 9.94 0 01-5.176-1.438l4.43-12.16L12 22zm5.176-3.438a9.92 9.92 0 01-1.854 1.854l3.29-9.02a9.92 9.92 0 01-1.436 7.166z"/>
      </svg>
    )
  },
  {
    name: "WooCommerce",
    svg: (
      <svg className="w-8 h-8 text-[#96588A]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 13.5h-9L6 8h12l-1.5 7.5z"/>
      </svg>
    )
  },
  {
    name: "HTML5",
    svg: (
      <svg className="w-8 h-8 text-[#E34F26]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm15.4 6H7.2l.2 2.3h7.9l-.3 3.6-3 1-3-1-.2-2.1H6.5l.4 4.5 5.1 1.7 5.1-1.7.7-7.3H16.9z"/>
      </svg>
    )
  },
  {
    name: "CSS3",
    svg: (
      <svg className="w-8 h-8 text-[#1572B6]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm15.2 6H7.1l.2 2.3h7.9l-.3 3.5-3 1-3-1-.2-2.1H6.4l.4 4.4 5.2 1.7 5.2-1.7.7-7.2H16.7z"/>
      </svg>
    )
  },
  {
    name: "JavaScript",
    svg: (
      <svg className="w-8 h-8 text-[#F7DF1E] bg-black rounded" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0V0zm19.5 16.5c-.8 0-1.4-.4-1.7-.9l-1.3.8c.5.9 1.5 1.5 2.9 1.5 2.1 0 3.3-1.1 3.3-2.9v-6H20.7v6.1c0 .8-.4 1.4-1.2 1.4zm-8.8-1.4c-.8 0-1.3-.4-1.6-.9l-1.3.8c.6 1.1 1.7 1.6 2.9 1.6 2.3 0 3.8-1.4 3.8-3.5 0-2-1.4-2.8-2.9-3.4-.9-.4-1.5-.7-1.5-1.3 0-.5.4-.9 1-.9.6 0 1 .3 1.2.8l1.3-.8c-.5-1-1.5-1.5-2.5-1.5-2.1 0-3.4 1.3-3.4 3.2 0 1.9 1.2 2.7 2.8 3.3 1 .4 1.6.7 1.6 1.4 0 .6-.5 1-1.1 1z"/>
      </svg>
    )
  },
  {
    name: "Tailwind CSS",
    svg: (
      <svg className="w-8 h-8 text-[#06B6D4]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4.5C7 4.5 3.5 7.5 3.5 12.5S7 20.5 12 20.5s8.5-3 8.5-8S17 4.5 12 4.5zm0 13c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"/>
      </svg>
    )
  }
];

// Default 8 business goals list
const defaultBusinessGoals = [
  { label: "Company Profile Websites", icon: Laptop },
  { label: "Lead Generation Websites", icon: Search },
  { label: "Ecommerce Stores", icon: ShoppingCart },
  { label: "SaaS Product Websites", icon: Cpu },
  { label: "Landing Pages for Ads", icon: Layout },
  { label: "Booking & Enquiry Websites", icon: ChevronDown },
  { label: "Portfolio Websites", icon: Layers },
  { label: "Service Business Websites", icon: Megaphone }
];

type WebDevServiceLayoutProps = {
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  highlights?: string[];
  mockupImage?: string;
  servicesTitle?: string;
  servicesSubtitle?: string;
  services: {
    icon: string;
    title: string;
    description: string;
    href: string;
  }[];
  processTitle?: string;
  process?: {
    step: string;
    title: string;
    description: string;
    icon: string;
  }[];
  whyChooseTitle?: string;
  whyChoose: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  serviceName: string;
  pageUrl: string;
};

export default function WebDevServiceLayout({
  eyebrow,
  heroTitle,
  heroSubtitle,
  highlights = ["SEO Ready", "Mobile Friendly", "Lightning Fast", "Easy to Manage"],
  mockupImage = "/services/web_design.png",
  servicesTitle = "Website Development Services",
  servicesSubtitle = "We build high-performing digital solutions tailored to your business needs.",
  services,
  processTitle = "Our Website Development Process",
  process = [
    { step: "01", title: "Discovery", description: "We understand your business, goals and target audience.", icon: "search" },
    { step: "02", title: "Planning", description: "We plan the sitemap, structure and content layout.", icon: "chevrondown" },
    { step: "03", title: "Design", description: "We create clean and modern UI/UX that represents your brand.", icon: "layout" },
    { step: "04", title: "Development", description: "We build fast, responsive and SEO-friendly websites.", icon: "code2" },
    { step: "05", title: "Testing", description: "We test for speed, responsiveness and functionality.", icon: "checkcircle2" },
    { step: "06", title: "Launch", description: "We deploy your website and make it live for your audience.", icon: "cpu" },
    { step: "07", title: "Support", description: "We provide ongoing support and maintenance.", icon: "wrench" }
  ],
  whyChooseTitle = "Why Choose Clever Crow for Website Development?",
  whyChoose,
  faqs,
  serviceName,
  pageUrl
}: WebDevServiceLayoutProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="bg-white min-h-screen text-slate-800 antialiased font-body pt-24 pb-20 selection:bg-yellow-500/20">
      
      {/* ───────────────── 1. HERO SECTION ───────────────── */}
      <section className="relative overflow-hidden pt-8 pb-20 bg-gradient-to-b from-slate-50/70 to-white">
        
        {/* Subtle dot grid and radial light flare */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div 
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.05) 1.2px, transparent 1.2px)`,
              backgroundSize: "24px 24px"
            }}
          />
          <div className="absolute top-12 left-12 w-[350px] h-[350px] rounded-full bg-amber-200/10 blur-[90px]" />
          <div className="absolute bottom-12 right-12 w-[400px] h-[400px] rounded-full bg-blue-100/20 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-6 uppercase tracking-wider">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="hover:text-slate-600 transition-colors cursor-default">Services</span>
            <span>/</span>
            <span className="text-amber-500 font-extrabold">{eyebrow}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column (Text & CTAs) */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              {/* Eyebrow kicker */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/5 text-amber-600 mb-6 font-sans font-black text-[9px] uppercase tracking-widest shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                {eyebrow}
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black leading-[1.12] tracking-tight text-slate-900 font-sans">
                {heroTitle}
              </h1>

              {/* Subtitle */}
              <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed font-medium max-w-xl">
                {heroSubtitle}
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a
                  href="#contact-form"
                  className="group flex items-center justify-center gap-2 rounded-2xl bg-amber-500 px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-900 shadow-md shadow-amber-500/20 hover:bg-amber-600 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
                >
                  Get Website Quote
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="#what-we-build"
                  className="group flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:scale-[1.01] active:scale-95 transition-all"
                >
                  Explore Services
                </a>
              </div>

              {/* Highlights below buttons */}
              <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {highlights.map((hl, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px] font-black text-slate-500 uppercase tracking-wider">
                    <CheckCircle2 size={14} className="text-amber-500 shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column (Pure CSS Laptop & Phone Mockups) */}
            <div className="lg:col-span-5 relative w-full flex justify-center items-center">
              
              {/* Device frame wrapper */}
              <div className="relative w-full max-w-[480px] md:max-w-[540px] aspect-[16/11]">
                
                {/* Laptop Mockup Bezel */}
                <div className="relative mx-auto bg-slate-900 border-slate-950 border-[8px] rounded-t-2xl shadow-2xl overflow-hidden aspect-[16/10] w-[90%]">
                  {/* Laptop Web Page Screen */}
                  <div className="w-full h-full relative overflow-hidden bg-slate-50 flex flex-col">
                    {/* Fake Browser Topbar */}
                    <div className="flex items-center gap-1 px-3 py-1 bg-slate-200 border-b border-slate-300/50 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <div className="h-3.5 bg-white border border-slate-300/40 rounded px-4 ml-4 flex-1 max-w-[140px] text-[8px] text-slate-400 font-semibold flex items-center leading-none">
                        clevercrow.in
                      </div>
                    </div>
                    {/* Simulated Web View Background Image */}
                    <div className="flex-1 w-full h-full relative">
                      <img 
                        src={mockupImage} 
                        alt="Website Layout Mockup"
                        className="w-full h-full object-cover object-top"
                      />
                      {/* Premium overlay shadow */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Laptop Base */}
                <div className="relative mx-auto bg-slate-800 rounded-b-xl h-[12px] w-[96%] shadow-lg">
                  {/* Trackpad Cutout */}
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 w-16 h-1 bg-slate-900/60 rounded-b-md" />
                </div>

                {/* iPhone Overlapping on bottom right */}
                <div className="absolute bottom-[-10px] right-[4px] w-[105px] md:w-[125px] aspect-[9/18.5] bg-slate-900 border-[5px] border-slate-950 rounded-[1.8rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden hidden sm:block">
                  <div className="w-full h-full relative bg-white flex flex-col">
                    {/* Dynamic Island Notching */}
                    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-10 h-2 bg-slate-950 rounded-full z-20" />
                    {/* Mobile screen background */}
                    <div className="flex-1 w-full h-full relative">
                      <img 
                        src={mockupImage} 
                        alt="Mobile Website Layout Mockup"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ───────────────── 2. WHAT WE BUILD (SERVICES GRID) ───────────────── */}
      <section id="what-we-build" className="py-24 max-w-7xl mx-auto px-6 lg:px-8 border-t border-slate-100/80">
        
        {/* Title */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/25">
            WHAT WE BUILD
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-4 font-sans">
            {servicesTitle}
          </h2>
          <p className="mt-3 text-slate-500 text-sm font-medium">
            {servicesSubtitle}
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc, i) => {
            const IconComponent = iconMap[svc.icon.toLowerCase().replace(/[^a-z0-9]/g, "")] || Laptop;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="group relative bg-white border border-slate-100 rounded-[2.2rem] p-8 shadow-sm hover:shadow-[0_25px_50px_rgba(0,0,0,0.025)] flex flex-col justify-between h-[255px] cursor-pointer"
              >
                <div>
                  {/* Circular Icon badge */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 shadow-sm border border-amber-500/10 shrink-0">
                    <IconComponent size={18} className="stroke-[2.5]" />
                  </div>
                  {/* Text content */}
                  <h3 className="text-base font-black text-slate-900 tracking-tight mt-5">
                    {svc.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 mt-2.5 leading-relaxed line-clamp-3">
                    {svc.description}
                  </p>
                </div>

                {/* Bottom Arrow */}
                <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-4">
                  <Link href={svc.href} className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-amber-500 transition-colors">
                    Learn More
                  </Link>
                  <ArrowRight size={14} className="text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </section>

      {/* ───────────────── 3. OUR APPROACH (TIMELINE PROCESS) ───────────────── */}
      <section className="py-24 bg-slate-50/50 border-t border-b border-slate-100/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/25">
              OUR APPROACH
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-4 font-sans">
              {processTitle}
            </h2>
          </div>

          {/* 7-Step horizontal scroll timeline (scroll on md, stack on mobile) */}
          <div className="relative">
            {/* Background line connecting elements (desktop only) */}
            <div className="absolute top-[37px] left-12 right-12 h-0.5 bg-slate-200/80 hidden lg:block z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8 items-start relative z-10">
              {process.map((step, idx) => {
                const ProcessIcon = iconMap[step.icon.toLowerCase().replace(/[^a-z0-9]/g, "")] || Search;
                return (
                  <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left group">
                    {/* Step circle index badge */}
                    <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm group-hover:border-amber-500 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.15)] transition-all shrink-0">
                      <span className="absolute top-[-8px] text-[10px] font-black text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        {step.step}
                      </span>
                      <ProcessIcon size={20} className="text-slate-600 group-hover:text-amber-500 transition-colors stroke-[2.2]" />
                    </div>

                    {/* Title & Info */}
                    <h4 className="text-[14px] font-black text-slate-800 tracking-tight mt-5">
                      {step.title}
                    </h4>
                    <p className="text-[11px] font-semibold text-slate-400 mt-2 leading-relaxed max-w-[150px] mx-auto lg:mx-0">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ───────────────── 4. TWO-COLUMN FEATURES (TECHNOLOGIES & BENEFITS) ───────────────── */}
      <section className="py-16 bg-slate-50/40 border-t border-b border-slate-100/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column Card (Technologies) */}
            <div className="lg:col-span-6 flex flex-col bg-white border border-slate-100 rounded-[2.5rem] p-8 md:px-10 md:py-8 shadow-sm justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight font-sans">
                  Modern Technologies We Work With
                </h2>
                <div className="grid grid-cols-4 gap-4 w-full mt-8">
                  {defaultTechnologies.map((tech, i) => (
                    <div
                      key={i}
                      className="bg-slate-50/50 border border-slate-100/60 rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:border-slate-200 hover:shadow-sm transition-all gap-3 cursor-default"
                    >
                      <div className="flex h-11 w-11 items-center justify-center shrink-0">
                        {tech.svg}
                      </div>
                      <span className="text-[11px] font-black text-slate-700 tracking-tight leading-tight">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <Link href="/contact" className="inline-flex items-center gap-1.5 text-[11px] font-black text-amber-500 hover:text-amber-600 uppercase tracking-widest transition-colors">
                  More Tools & Integrations
                  <ArrowRight size={12} className="stroke-[2.5]" />
                </Link>
              </div>
            </div>

            {/* Right Column Card (Why Choose Clever Crow) */}
            <div className="lg:col-span-6 flex flex-col bg-white border border-slate-100 rounded-[2.5rem] p-8 md:px-10 md:py-8 shadow-sm relative overflow-hidden justify-between">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full">
                
                {/* Left part of this card: Checkpoints (60%) */}
                <div className="md:col-span-7 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight font-sans">
                      {whyChooseTitle}
                    </h2>
                    <div className="mt-6 flex flex-col gap-4">
                      {whyChoose.map((point, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white shrink-0 shadow-sm shadow-amber-500/10">
                            <Check size={11} className="stroke-[3]" />
                          </div>
                          <span className="text-[12px] font-bold text-slate-600 leading-tight">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right part of this card: Mockup Image (40%) */}
                <div className="md:col-span-5 flex items-center justify-center md:h-full relative min-h-[200px] md:min-h-0 overflow-visible">
                  <img
                    src="/images/device-mockup.png"
                    alt="Clever Crow website design mockups"
                    className="w-[125%] md:w-[155%] max-w-[280px] md:max-w-none object-contain mix-blend-multiply md:absolute md:right-[-35px] md:bottom-[-20px] select-none pointer-events-none"
                  />
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ───────────────── 5. GOALS SECTION ───────────────── */}
      <section className="py-24 bg-slate-50/50 border-t border-b border-slate-100/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/25">
              BUSINESS GOALS
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-4 font-sans">
              Websites for Different Business Goals
            </h2>
          </div>

          {/* Grid of 8 Goal items */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {defaultBusinessGoals.map((goal, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all gap-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 shrink-0">
                  <goal.icon size={22} className="stroke-[2.2]" />
                </div>
                <span className="text-[12px] font-black text-slate-700 tracking-tight leading-snug">
                  {goal.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ───────────────── 6. FAQ & FINAL CTA (TWO-COLUMN GRID) ───────────────── */}
      <section id="contact-form" className="py-16 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column (FAQs) - 6/12 width to reduce height */}
          <div className="lg:col-span-6 flex flex-col items-start bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-sans mb-8">
              Frequently Asked Questions
            </h2>

            {/* Accordion list */}
            <div className="w-full flex flex-col">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="border-b border-slate-100 py-2 last:border-0"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="flex w-full items-center justify-between text-left font-semibold text-slate-800 text-[14px] hover:text-amber-500 transition-colors py-2"
                  >
                    <span>{faq.question}</span>
                    <span className="text-slate-400 shrink-0 text-lg font-bold ml-4 w-5 h-5 flex items-center justify-center transition-transform duration-200 select-none">
                      {activeFaq === i ? "−" : "+"}
                    </span>
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        <div className="pb-3 pt-0.5 text-xs font-semibold text-slate-500 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Cream CTA Card) - 6/12 width */}
          <div className="lg:col-span-6 flex flex-col bg-[#FFFBF2] border border-amber-500/5 rounded-[2.5rem] shadow-sm relative overflow-hidden min-h-[380px]">
            {/* Background radial highlight */}
            <div className="absolute top-[-50px] right-[-50px] w-48 h-48 rounded-full bg-amber-500/5 blur-[80px] pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-stretch h-full w-full relative z-10 flex-grow">
              {/* Left Side: Text and Buttons (50% width on desktop) */}
              <div className="w-full md:w-[50%] flex flex-col justify-center gap-6 p-6 md:py-8 md:pl-8 md:pr-0">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-tight md:max-w-[280px]">
                    Ready to Build or<br className="hidden md:inline" />Redesign Your Website?
                  </h3>
                  <p className="mt-3.5 text-[13px] font-semibold text-slate-500 leading-relaxed max-w-[280px]">
                    Let's build a website that reflects your brand, loads fast and helps your business grow.
                  </p>
                </div>

                <div className="flex flex-col gap-3 w-full max-w-[240px]">
                  <Link
                    href={`/contact?service=${encodeURIComponent(serviceName)}`}
                    className="flex items-center justify-between bg-amber-500 hover:bg-amber-600 active:scale-98 transition-all px-5 py-3 rounded-xl text-slate-950 font-bold text-[13px] shadow-sm"
                  >
                    <span>Discuss Your Project</span>
                    <ArrowRight size={14} className="stroke-[3]" />
                  </Link>

                  <a
                    href={`https://wa.me/919986389444?text=Hi%2C%20I'm%20interested%20in%20your%20${encodeURIComponent(serviceName)}%20service.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 active:scale-98 transition-all px-5 py-3 rounded-xl text-slate-800 font-bold text-[13px] shadow-sm"
                  >
                    <FaWhatsapp size={16} className="text-[#25D366] shrink-0" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Right Side: Image container (50% width on desktop) */}
              <div className="w-full md:w-[50%] relative min-h-[220px] md:min-h-0 self-stretch overflow-hidden">
                <img
                  src="/images/laptop-guy.png"
                  alt="Clever Crow consultant typing on laptop"
                  className="absolute bottom-0 right-0 h-[105%] md:h-[110%] w-auto object-contain object-right-bottom select-none pointer-events-none"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ───────────────── 7. STATS STRIP ───────────────── */}
      <section className="bg-slate-50/50 border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="flex flex-col items-center text-center">
            <span className="text-3xl font-black text-slate-900 tracking-tight leading-none">90+</span>
            <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mt-2 block">Websites Delivered</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="text-3xl font-black text-slate-900 tracking-tight leading-none">50+</span>
            <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mt-2 block">Happy Clients</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="text-3xl font-black text-slate-900 tracking-tight leading-none">5+</span>
            <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mt-2 block">Years Experience</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="text-3xl font-black text-slate-900 tracking-tight leading-none">10+</span>
            <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mt-2 block">Industries Served</span>
          </div>

        </div>
      </section>

    </div>
  );
}
