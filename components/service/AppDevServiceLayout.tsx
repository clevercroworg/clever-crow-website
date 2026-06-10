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
  Pencil
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

// Map string identifiers to Lucide Icon components
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
  network: Network
};

const technologies = [
  {
    name: "React",
    svg: (
      <svg className="w-8 h-8 text-[#61DAFB]" viewBox="-11.5 -10.23 23 20.463" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
        <g stroke="currentColor" strokeWidth="1">
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
    name: "Node.js",
    svg: (
      <svg className="w-8 h-8 text-[#339933]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 .002a1.86 1.86 0 00-1.047.332l-9.1 5.25a1.865 1.865 0 00-.918 1.589v10.518a1.864 1.864 0 00.918 1.588l9.1 5.254A1.85 1.85 0 0012 24a1.85 1.85 0 001.046-.267l9.102-5.254a1.865 1.865 0 00.918-1.588V7.173a1.865 1.865 0 00-.918-1.589l-9.1-5.25A1.863 1.863 0 0012 .002zm0 1.258a.62.62 0 01.352.112l9.1 5.25a.618.618 0 01.305.526v10.518a.618.618 0 01-.305.527l-9.1 5.25a.619.619 0 01-.704 0l-9.1-5.25a.618.618 0 01-.305-.527V7.173c0-.23.12-.44.305-.526l9.1-5.25a.62.62 0 01.352-.112zm-3.08 6.467c-.675.006-1.189.176-1.542.508-.354.333-.532.793-.532 1.383 0 .548.156.966.467 1.254.31.288.756.495 1.334.621l1.107.242c.42.091.737.218.95.38.215.163.322.392.322.686 0 .28-.112.502-.338.666-.226.165-.544.248-.953.248-.466 0-.825-.106-1.077-.318-.252-.213-.393-.561-.424-1.046h-1.28c.036.784.305 1.385.807 1.802.502.417 1.155.626 1.959.626.685 0 1.232-.178 1.637-.534.405-.355.607-.822.607-1.4 0-.585-.164-1.025-.494-1.32-.33-.294-.783-.504-1.359-.629l-1.026-.222c-.417-.09-.728-.218-.934-.383-.205-.165-.308-.387-.308-.667 0-.256.108-.457.324-.603.216-.146.507-.22.873-.22.427 0 .759.108.995.324.236.216.368.528.397.935h1.281c-.03-.706-.282-1.264-.756-1.673-.474-.41-.1.548-.124.587l.001-.005z" />
      </svg>
    )
  },
  {
    name: "Flutter",
    svg: (
      <svg className="w-8 h-8 text-[#02569B]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.314 0L2.3 12 6 15.7 21.684 0h-7.37zM21.684 12.316h-7.37l-3.7 3.7 3.7 3.7h7.37l-3.7-3.7 3.7-3.7zM10.614 16.016l-3.7-3.7-4.614 4.614 4.614 4.614 3.7-3.7-3.7-3.7-.001.002z" />
      </svg>
    )
  },
  {
    name: "Dart",
    svg: (
      <svg className="w-8 h-8 text-[#00B4AB]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.302 6.772l-5.698-5.698A2.247 2.247 0 0014.975.43h-5.95a2.24 2.24 0 00-1.63.666l-5.7 5.698a2.25 2.25 0 000 3.184l5.698 5.698c.414.414.96.646 1.546.65h5.95a2.26 2.26 0 001.63-.666l5.7-5.698a2.25 2.25 0 000-3.184l.153.194zm-8.687 7.025a1.86 1.86 0 110-3.72 1.86 1.86 0 010 3.72z" />
      </svg>
    )
  },
  {
    name: "PostgreSQL",
    svg: (
      <svg className="w-8 h-8 text-[#336791]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.012.006c-1.424 0-2.812.227-4.084.664-1.3.447-2.433 1.139-3.238 2.052C3.89 3.633 3.4 4.863 3.402 6.311c.003 2.11 1.022 3.606 2.65 4.68.225.148.468.281.724.397a.12.12 0 01.07.135 12.392 12.392 0 00.323 2.502c.048.243.09.489.155.728-.157.065-.308.146-.452.243-1.07.728-1.777 1.742-1.996 2.87-.225 1.164.088 2.4.981 3.256.76.726 1.867 1.1 3.194 1.1.91 0 1.86-.18 2.748-.52 1.139-.438 2.152-1.127 2.846-1.956.126.007.25.011.378.011.83 0 1.633-.082 2.378-.236 1.096-.226 2.023-.628 2.68-1.21.666-.59.972-1.295.968-2.072-.005-1.018-.553-1.849-1.503-2.39-.234-.132-.49-.24-.761-.326-.067-.02-.093-.075-.084-.143.048-.37.078-.742.083-1.12.016-1.196-.187-2.355-.668-3.415a.125.125 0 01.066-.16c.307-.128.601-.284.877-.472.95-.647 1.536-1.579 1.63-2.736.095-1.166-.237-2.393-1.055-3.238-.809-.838-2.006-1.272-3.456-1.272m-8.156 5.4c.038-.934.373-1.7 1.036-2.222.65-.514 1.547-.783 2.753-.783.568 0 1.144.059 1.706.182 1.03.226 1.895.733 2.456 1.48.567.755.772 1.68.568 2.684a.125.125 0 01-.157.094c-.604-.154-1.222-.244-1.85-.262-1.276-.036-2.528.214-3.66.726a.125.125 0 01-.176-.09c-.067-.257-.14-.5-.224-.73-.207-.59-.39-1.026-.452-1.078" />
      </svg>
    )
  },
  {
    name: "MongoDB",
    svg: (
      <svg className="w-8 h-8 text-[#47A248]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0c-.394 0-.776.027-1.15.08a5.21 5.21 0 00-.54.12 11.233 11.233 0 00-4.086 2.378A11.758 11.758 0 002.7 7.7a11.966 11.966 0 00-.638 4.228 11.666 11.666 0 00.785 4.195c.574 1.53 1.488 2.894 2.653 3.96a12.632 12.632 0 004.14 2.464c.915.342 1.874.52 2.86.53v.001c.164.002.327.002.49 0v-.001c1.233-.013 2.428-.273 3.535-.747a12.39 12.39 0 004.103-2.825 11.666 11.666 0 002.533-4.14c.504-1.486.724-3.036.657-4.577a11.967 11.967 0 00-1.848-5.32A11.233 11.233 0 0013.916.34a5.166 5.166 0 00-.766-.26A11.785 11.785 0 0012 0zm.012 1.258c.288.003.57.025.848.067.142.02.285.05.424.09 1.344.372 2.502 1.156 3.324 2.197.822 1.04 1.257 2.322 1.257 3.654a8.1 8.1 0 01-1.196 4.143 8.358 8.358 0 01-3.32 3.067 8.528 8.528 0 01-1.337.525v-13.74zm-.848.09l.001 13.754a8.5 8.5 0 01-1.282-.497 8.358 8.358 0 01-3.31-3.048A8.099 8.099 0 015.4 7.25c0-1.332.435-2.614 1.257-3.654.823-1.04 1.98-1.825 3.324-2.197.106-.03.213-.056.321-.078a3.9 3.9 0 01.85-.067z" />
      </svg>
    )
  },
  {
    name: "Firebase",
    svg: (
      <svg className="w-8 h-8 text-[#FFCA28]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.89 19.824L1.054 6.786a.434.434 0 01.666-.465l10.022 5.568zm16.22-.003l-2.42-12.872a.434.434 0 01.758-.337l4.5 9.08zM12 .533a.433.433 0 00-.73 0l-3.32 6.305v.068l4.05 4.05zm-.397 12.012l-4.05-4.05-3.32 6.305a.434.434 0 00.198.577z" />
      </svg>
    )
  },
  {
    name: "AWS",
    svg: (
      <svg className="w-9 h-6 text-[#FF9900]" viewBox="0 0 24 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0c-4.8 0-8.4 2.8-9.6 6.8-.2.6-.1.8.4.8h1.6c.4 0 .7-.2.8-.5 1.0-2.8 3.5-4.7 6.8-4.7 3.8 0 6.6 2.5 6.6 6.2s-2.8 6.2-6.6 6.2c-3.3 0-5.8-1.9-6.8-4.7-.1-.3-.4-.5-.8-.5H2.8c-.5 0-.6.2-.4.8 1.2 4 4.8 6.8 9.6 6.8 5.6 0 9.6-3.8 9.6-9.6S17.6 0 12 0zm-.8 9.2c.4-.2.6-.6.6-1.1V6.3c0-.5-.2-.9-.6-1.1-.4-.2-.8-.2-1.2 0l-2.6 1.8c-.4.3-.6.7-.6 1.1s.2.8.6 1.1l2.6 1.8c.4.2.8.2 1.2 0zm-1.8-2.1l1.2-.8v1.6l-1.2-.8z" />
      </svg>
    )
  }
];

const processSteps = [
  { step: "01", title: "Discover", description: "We understand your business, goals and user needs.", icon: "search" },
  { step: "02", title: "Plan", description: "We plan features, workflows and technical structure.", icon: "pencil" },
  { step: "03", title: "Design", description: "We design intuitive UI/UX that users will love.", icon: "layout" },
  { step: "04", title: "Develop", description: "We build clean, scalable and secure applications.", icon: "code2" },
  { step: "05", title: "Test", description: "We test thoroughly for performance, security and usability.", icon: "checkcircle2" },
  { step: "06", title: "Launch", description: "We deploy smoothly and make your app live.", icon: "rocket" },
  { step: "07", title: "Support", description: "We provide ongoing support and improvements.", icon: "wrench" }
];

const testimonials = [
  {
    quote: "Clever Crow built a custom booking system for our resort. It has simplified our operations and improved customer experience significantly.",
    author: "Rohit Shetty",
    role: "Resort Owner",
    rating: 5,
    avatar: "/images/testimonial_avatar.png" // Fallback to initial name avatar if not existing
  }
];

type AppDevServiceLayoutProps = {
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  serviceName: string;
  services: {
    icon: string;
    title: string;
    description: string;
    href: string;
  }[];
  whyChoose: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  pageUrl: string;
};

export default function AppDevServiceLayout({
  eyebrow,
  heroTitle,
  heroSubtitle,
  serviceName,
  services,
  whyChoose,
  faqs,
  pageUrl
}: AppDevServiceLayoutProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const heroBullets = [
    { label: "Business-Focused Solutions", icon: "briefcase" },
    { label: "Scalable & Secure Architecture", icon: "shield" },
    { label: "On-Time Delivery", icon: "calendar" },
    { label: "Ongoing Support You Can Trust", icon: "wrench" }
  ];

  const whyChooseDetailed = [
    { title: "Business-first approach", desc: "We focus on solving real business problems with digital tools.", icon: "briefcase" },
    { title: "Scalable & future-ready", desc: "Built with modern technology that grows with your business.", icon: "database" },
    { title: "Secure & reliable", desc: "Best practices for security, data protection and performance.", icon: "shield" },
    { title: "User experience-driven", desc: "Intuitive interfaces that enhance user satisfaction and retention.", icon: "layout" },
    { title: "End-to-end support", desc: "From planning and UI design to post-launch support and updates.", icon: "rocket" },
    { title: "Transparent communication", desc: "Clear updates, staging links, and collaboration at every step.", icon: "users" }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-800 antialiased font-body pt-24 pb-0 selection:bg-yellow-500/20">
      
      {/* ───────────────── 1. HERO SECTION ───────────────── */}
      <section className="relative overflow-hidden pt-8 pb-20 bg-gradient-to-b from-slate-100/60 via-slate-50/50 to-slate-50/20">
        
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
            
            {/* Left Column (Text, CTAs & Horizontal Bullets) */}
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
                  Discuss Your App Idea
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="#what-we-build"
                  className="group flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:scale-[1.01] active:scale-95 transition-all"
                >
                  Explore Solutions
                </a>
              </div>

              {/* Spacing Divider */}
              <div className="w-full h-[1px] bg-slate-200/60 my-8" />

              {/* Horizontal Inline Bullets */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {heroBullets.map((bullet, i) => {
                  const BulletIcon = iconMap[bullet.icon] || CheckCircle2;
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 shrink-0">
                        <BulletIcon size={14} className="stroke-[2.5]" />
                      </div>
                      <span className="text-[11px] font-black text-slate-700 tracking-tight leading-snug">
                        {bullet.label}
                      </span>
                    </div>
                  );
                })}
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
                        src="/services/web_design.png" 
                        alt="App Layout Mockup"
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
                        src="/images/device-mockup.png" 
                        alt="Mobile App Mockup"
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
      <section id="what-we-build" className="py-12 md:py-24 max-w-7xl mx-auto px-6 lg:px-8 border-t border-slate-100/80">
        
        {/* Title */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-500 mb-3">
            WHAT WE BUILD
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-4 font-sans">
            App Development Services
          </h2>
          <p className="mt-3 text-slate-500 text-sm font-medium">
            We build high-performing mobile apps, web systems, portals, and custom SaaS platforms.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${services.length === 6 ? "md:grid-cols-3 lg:grid-cols-6" : "md:grid-cols-4 lg:grid-cols-7"} gap-4`}>
          {services.map((svc, i) => {
            const IconComponent = iconMap[svc.icon.toLowerCase().replace(/[^a-z0-9]/g, "")] || Smartphone;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="group relative bg-white border border-slate-200/60 rounded-[2rem] px-5 py-6 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.02)] flex flex-col items-center text-center justify-between min-h-[280px] h-auto cursor-pointer"
              >
                <div className="flex flex-col items-center w-full">
                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/5 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all shrink-0">
                    <IconComponent size={24} className="stroke-[1.5]" />
                  </div>
                  {/* Text */}
                  <h3 className="text-xs font-black text-slate-800 tracking-tight mt-5 leading-snug">
                    {svc.title}
                  </h3>
                  <p className="text-[10px] font-semibold text-slate-500 mt-3 leading-relaxed">
                    {svc.description}
                  </p>
                </div>

                {/* Bottom link */}
                <div className="mt-4 flex items-center justify-center gap-1 text-[9px] font-black text-amber-500 uppercase tracking-widest group-hover:text-amber-600 transition-colors">
                  <span>Learn More</span>
                  <ArrowRight size={8} className="stroke-[3] transition-transform group-hover:translate-x-0.5" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </section>

      {/* ───────────────── 3. OUR PROCESS (TIMELINE PROCESS) ───────────────── */}
      <section className="py-12 md:py-24 bg-slate-50/50 border-t border-b border-slate-100/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-500 mb-3">
              OUR PROCESS
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-4 font-sans">
              From Idea to Impact
            </h2>
          </div>

          {/* 7-Step horizontal timeline */}
          <div className="relative">
            {/* Background line connecting elements (desktop only) */}
            <div className="absolute top-[38px] left-[7%] right-[7%] h-[2px] bg-slate-200/60 hidden lg:block z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-8 items-start relative z-10">
              {processSteps.map((step, idx) => {
                const ProcessIcon = iconMap[step.icon.toLowerCase().replace(/[^a-z0-9]/g, "")] || Search;
                return (
                  <div key={idx} className="flex flex-col items-center text-center group">
                    {/* Step circle index badge */}
                    <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm group-hover:border-amber-500 transition-all shrink-0">
                      {/* Number badge on top edge */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-white border border-amber-500 text-[10px] font-black text-amber-500 shadow-sm">
                        {step.step}
                      </div>
                      <ProcessIcon className="w-8 h-8 text-amber-500 stroke-[1.5] transition-colors" />
                    </div>

                    {/* Title & Info */}
                    <h4 className="text-xs font-black text-slate-800 tracking-tight mt-5 text-center leading-tight">
                      {step.title}
                    </h4>
                    <p className="text-[10px] font-semibold text-slate-500 mt-2 leading-relaxed text-center max-w-[140px] mx-auto">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ───────────────── 4. WHY CHOOSE CLEVER CROW (TWO-COLUMN BENEFITS) ───────────────── */}
      <section className="py-12 md:py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (Pure CSS iPhone Mockup with Dashboard) */}
          <div className="lg:col-span-5 relative w-full flex justify-center items-center">
            
            {/* Custom Phone Frame */}
            <div className="relative mx-auto w-[250px] aspect-[9/18.5] bg-slate-900 border-[8px] border-slate-950 rounded-[2.5rem] shadow-2xl overflow-hidden">
              
              {/* Dynamic Island */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-slate-950 rounded-full z-20" />
              
              {/* Screen Content */}
              <div className="w-full h-full bg-[#050505] flex flex-col justify-between p-4 text-white font-sans relative">
                
                {/* Status Bar */}
                <div className="flex justify-between items-center text-[9px] font-bold opacity-80 pt-1">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-1.5 bg-white rounded-xs" />
                  </div>
                </div>

                {/* Sample App UI Dashboard */}
                <div className="flex-1 flex flex-col justify-start mt-6 gap-3">
                  <div className="text-[10px] font-bold tracking-wider opacity-60">ACTIVE USERS</div>
                  <div className="text-xl font-black text-amber-500">45,78,000</div>
                  
                  {/* Mini Bar Chart */}
                  <div className="h-24 flex items-end gap-1.5 pt-2">
                    <div className="w-full bg-amber-500/20 h-10 rounded-sm" />
                    <div className="w-full bg-amber-500/40 h-16 rounded-sm" />
                    <div className="w-full bg-amber-500 h-24 rounded-sm" />
                    <div className="w-full bg-amber-500/60 h-14 rounded-sm" />
                    <div className="w-full bg-amber-500/80 h-20 rounded-sm" />
                  </div>

                  {/* Mini cards */}
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-2.5 mt-2 flex flex-col gap-1">
                    <div className="text-[9px] font-bold text-slate-400">DAILY REVENUE</div>
                    <div className="text-[13px] font-black text-white">$12,450.00</div>
                  </div>
                </div>
                
              </div>
            </div>

          </div>

          {/* Right Column (Checkpoints List) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-500 mb-3">
              WHY CHOOSE CLEVER CROW?
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight font-sans mb-8">
              We Build Apps That Drive Real Results
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {whyChooseDetailed.map((point, i) => {
                const PointIcon = iconMap[point.icon] || CheckCircle2;
                return (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 shrink-0 shadow-sm">
                      <PointIcon size={16} className="stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 tracking-tight leading-none mb-1.5">
                        {point.title}
                      </h4>
                      <p className="text-[11px] font-bold text-slate-500 leading-relaxed">
                        {point.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ───────────────── 5. TECHNOLOGIES WE WORK WITH ───────────────── */}
      <section className="py-12 bg-slate-50/50 border-t border-b border-slate-100/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-slate-400 mb-6">
            TECHNOLOGIES WE WORK WITH
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {technologies.map((tech, i) => (
              <div key={i} className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200/50 shadow-sm shrink-0">
                {tech.svg}
                <span className="text-[11px] font-black text-slate-700 uppercase tracking-wider">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── 6. TESTIMONIALS & FAQ (TWO-COLUMN GRID) ───────────────── */}
      <section id="faq-section" className="py-12 md:py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column (Testimonial Card) */}
          <div className="lg:col-span-6 flex flex-col bg-white border border-slate-200/60 rounded-[2.5rem] p-8 md:p-10 shadow-sm justify-between min-h-[380px] h-auto relative overflow-hidden">
            <div className="absolute top-[-50px] right-[-50px] w-48 h-48 rounded-full bg-amber-500/5 blur-[80px] pointer-events-none" />
            
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-500 mb-4">
                BUILT FOR BUSINESSES. LOVED BY CLIENTS.
              </p>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                Helping businesses automate, simplify and scale.
              </h3>

              <div className="mt-8 relative">
                <span className="text-5xl font-serif text-amber-500/20 absolute -top-4 -left-2 select-none">“</span>
                <p className="text-xs font-bold text-slate-600 leading-relaxed pl-6 relative z-10">
                  {testimonials[activeTestimonial].quote}
                </p>
              </div>
            </div>

            {/* Author Profile */}
            <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center font-sans font-black text-xs">
                  RS
                </div>
                <div>
                  <span className="text-xs font-black text-slate-900 block leading-tight">
                    {testimonials[activeTestimonial].author}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 block mt-0.5">
                    {testimonials[activeTestimonial].role}
                  </span>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex gap-0.5 text-amber-500 text-xs">
                {"★".repeat(testimonials[activeTestimonial].rating)}
              </div>
            </div>
          </div>

          {/* Right Column (FAQs) */}
          <div className="lg:col-span-6 flex flex-col bg-white border border-slate-200/60 rounded-[2.5rem] p-8 md:p-10 shadow-sm justify-start">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-500 mb-4">
              FREQUENTLY ASKED QUESTIONS
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-sans mb-8">
              Got Questions? We've Got Answers.
            </h2>

            <div className="w-full flex flex-col gap-1">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-slate-100 py-2 last:border-0">
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

        </div>
      </section>

      {/* ───────────────── 7. BOTTOM CTA BANNER ───────────────── */}
      <section id="contact-form" className="py-10 md:py-16 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-[#FFFBF2] border border-amber-500/5 rounded-[2.5rem] p-8 md:p-12 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-[-50px] right-[-50px] w-48 h-48 rounded-full bg-amber-500/5 blur-[80px] pointer-events-none" />
          
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
              Have an App Idea? <br />Let's build something amazing together.
            </h3>
            <p className="mt-3.5 text-xs font-semibold text-slate-500 leading-relaxed max-w-md">
              Share your project requirements with us and get a free concept consultation and project estimate.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
            <Link
              href={`/contact?service=${encodeURIComponent(serviceName)}`}
              className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 active:scale-98 transition-all px-6 py-4 rounded-xl text-slate-950 font-bold text-xs shadow-sm"
            >
              <span>Get Started</span>
              <ArrowRight size={14} className="stroke-[3]" />
            </Link>

            <a
              href={`https://wa.me/919986389444?text=Hi%2C%20I'm%20interested%20in%20your%20${encodeURIComponent(serviceName)}%20service.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 active:scale-98 transition-all px-6 py-4 rounded-xl text-slate-800 font-bold text-xs shadow-sm"
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
