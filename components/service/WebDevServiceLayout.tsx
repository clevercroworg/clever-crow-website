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
      <svg className="w-9 h-9 text-[#61DAFB]" viewBox="-11.5 -10.23 23 20.463" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <svg className="w-9 h-9 text-black" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="90" cy="90" r="90" fill="currentColor"/>
        <path d="M149.508 157.52L69.142 54H54v72h13.5v-47.51l67.234 86.816a90.4 90.4 0 0014.774-17.786z" fill="white"/>
        <path d="M115.5 54h13.5v72h-13.5z" fill="white"/>
      </svg>
    )
  },
  {
    name: "WordPress",
    svg: (
      <svg className="w-9 h-9 text-[#21759B]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.393-2.325.609-3.582.609M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0"/>
      </svg>
    )
  },
  {
    name: "WooCommerce",
    svg: (
      <svg className="w-9 h-9 text-[#96588A]" viewBox="0 0 256 153" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M232.137523,0 L23.7592719,0 C10.5720702,0 -0.103257595,10.7799647 0.000639559736,23.862498 L0.000639559736,103.404247 C0.000639559736,116.591115 10.6767385,127.266612 23.8639402,127.266612 L122.558181,127.266612 L167.667206,152.384995 L157.410382,127.266612 L232.137523,127.266612 C245.325059,127.266612 255.999888,116.591115 255.999888,103.404247 L255.999888,23.862498 C255.999888,10.6752964 245.325059,0 232.137523,0 Z M19.3640061,18.4201481 C16.4334946,18.6294847 14.2355942,19.6761007 12.7703719,21.6645976 C11.3051496,23.5484931 10.781875,25.9556632 11.095813,28.6768382 C17.2707741,67.9247058 23.027062,94.4034429 28.3647436,108.113986 C30.4579757,113.137395 32.8651458,115.5451 35.690989,115.335764 C40.086656,115.021425 45.3196694,108.951332 51.4946305,97.1248185 C54.73908,90.4260478 59.7628237,80.3792294 66.5657276,66.9823567 C72.2170797,86.762992 79.9618646,101.625221 89.6956814,111.567705 C92.417057,114.393415 95.2427665,115.649434 97.9634733,115.440098 C100.371178,115.230761 102.254539,113.974742 103.510558,111.672039 C104.557241,109.683676 104.975914,107.380974 104.766578,104.764601 C104.138568,95.2407893 105.080917,81.9489193 107.69729,64.8892584 C110.417997,47.3063898 113.767382,34.6424627 117.849111,27.1069476 C118.686458,25.5370569 119.000128,23.9670994 118.895794,22.0832708 C118.686458,19.6760338 117.639775,17.6875369 115.651411,16.1176463 C113.663048,14.5477557 111.46468,13.8151445 109.057643,14.0244142 C106.022597,14.2337508 103.719895,15.6989731 102.150205,18.6294847 C95.6614396,30.4560654 91.0560348,49.6088916 88.335328,76.1924977 C84.3579328,66.145211 81.0085475,54.3185634 78.3921746,40.3987506 C77.2411578,34.2238564 74.4154483,31.2933449 69.8100434,31.6073497 C66.670329,31.8166194 64.0538892,33.9098515 61.9606572,37.8869122 L39.0401069,81.5302462 C35.2723159,66.3544807 31.7138615,47.8296643 28.4694119,25.9556632 C27.7368007,20.5133802 24.7016209,18.0014749 19.3640061,18.4201481 Z M221.044022,25.9559976 C228.475136,27.5259551 234.022221,29.9327854 237.581577,34.748536 C241.140933,39.5642867 242.499645,45.4262194 241.662298,52.3359676 C239.569066,69.1848526 236.428683,81.7470654 232.24115,89.9122822 C230.147918,94.0999335 227.636013,96.6118386 224.705501,97.4491856 C221.774989,98.2865325 218.844478,97.5539213 216.960582,95.2512187 C215.076686,92.9485161 214.344075,89.8088017 214.762747,85.831741 C215.18142,81.8546803 216.751378,77.3533449 219.472084,72.3299354 C222.192791,67.3065258 224.286023,63.2241285 225.751245,60.0844142 C227.216467,56.9446999 227.844477,54.1189893 227.635141,51.6070841 C227.425805,49.0951789 226.588458,47.0019468 225.123236,45.3273878 C223.658014,43.6528287 221.774653,42.8154817 219.471947,42.8154817 C217.169244,42.8154817 215.285883,43.6528287 213.820661,45.3273878 C212.355439,47.0019468 211.518092,49.0951789 211.308756,51.6070841 C211.09942,54.1189893 211.518092,56.9446999 212.564775,60.0844142 L212.564775,60.0844142 C210.680879,64.2720654 209.110921,68.8774702 207.854902,73.9008797 C206.598882,78.9242893 205.970872,83.5296941 205.970872,87.7173454 C205.970872,96.3011335 208.482777,103.529046 213.506596,109.401069 C218.530415,115.273091 224.806316,118.203603 232.334298,118.192605 L232.334298,118.192605 C239.86228,118.181607 246.340656,115.158375 251.777426,109.122915 C257.214196,103.087455 259.932903,95.5505436 259.933577,86.5121814 L259.933577,86.5121814 C259.933577,77.4738192 257.21487,69.9369075 251.777426,63.9014475 C246.339982,57.8659875 239.861606,54.8427554 232.334298,54.8317576 C230.450402,54.8317576 228.880444,55.1457624 227.624425,55.7737722 C226.368406,56.401782 225.426057,57.4484654 224.798047,58.9136877 C224.169375,60.37891 223.95937,62.053469 224.168706,63.9372976 C224.378042,65.8211262 225.215389,67.4956852 226.680611,68.9609075 C228.145833,70.4261298 229.925562,71.158741 232.018794,71.158741 C234.112026,71.158741 235.885078,70.4261298 237.3503,68.9609075 C238.815522,67.4956852 239.652869,65.8211262 239.862205,63.9372976 C240.071541,62.053469 239.862205,60.37891 239.234195,58.9136877 C238.606186,57.4484654 237.559502,56.6111078 236.09428,56.4017712 C234.629058,56.1924346 233.163836,56.3021028 231.698614,56.7307758 C230.233392,57.1594488 228.977373,57.9967958 227.93069,59.2528151 L227.93069,59.2528151 Z" />
      </svg>
    )
  },
  {
    name: "HTML5",
    svg: (
      <svg className="w-9 h-9 text-[#E34F26]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm15.4 6H7.2l.2 2.3h7.9l-.3 3.6-3 1-3-1-.2-2.1H6.5l.4 4.5 5.1 1.7 5.1-1.7.7-7.3H16.9z"/>
      </svg>
    )
  },
  {
    name: "CSS3",
    svg: (
      <svg className="w-9 h-9 text-[#1572B6]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm15.2 6H7.1l.2 2.3h7.9l-.3 3.5-3 1-3-1-.2-2.1H6.4l.4 4.4 5.2 1.7 5.2-1.7.7-7.2H16.7z"/>
      </svg>
    )
  },
  {
    name: "JavaScript",
    svg: (
      <svg className="w-9 h-9 text-[#F7DF1E] bg-black rounded" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0V0zm19.5 16.5c-.8 0-1.4-.4-1.7-.9l-1.3.8c.5.9 1.5 1.5 2.9 1.5 2.1 0 3.3-1.1 3.3-2.9v-6H20.7v6.1c0 .8-.4 1.4-1.2 1.4zm-8.8-1.4c-.8 0-1.3-.4-1.6-.9l-1.3.8c.6 1.1 1.7 1.6 2.9 1.6 2.3 0 3.8-1.4 3.8-3.5 0-2-1.4-2.8-2.9-3.4-.9-.4-1.5-.7-1.5-1.3 0-.5.4-.9 1-.9.6 0 1 .3 1.2.8l1.3-.8c-.5-1-1.5-1.5-2.5-1.5-2.1 0-3.4 1.3-3.4 3.2 0 1.9 1.2 2.7 2.8 3.3 1 .4 1.6.7 1.6 1.4 0 .6-.5 1-1.1 1z"/>
      </svg>
    )
  },
  {
    name: "Tailwind CSS",
    svg: (
      <svg className="w-9 h-9 text-[#06B6D4]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
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
                <div className="grid grid-cols-4 gap-4 w-full mt-6">
                  {defaultTechnologies.map((tech, i) => (
                    <div
                      key={i}
                      className="bg-slate-50/50 border border-slate-100/60 rounded-2xl py-6 px-3 flex flex-col items-center justify-center text-center hover:border-slate-200 hover:shadow-sm transition-all gap-3 cursor-default"
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
                    <div className="mt-6 flex flex-col gap-4 md:pr-6">
                      {whyChoose.slice(0, 5).map((point, i) => (
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
                    className="w-[110%] md:w-[120%] max-w-[260px] md:max-w-none object-contain mix-blend-multiply md:absolute md:right-[-15px] md:top-[50%] md:-translate-y-1/2 md:bottom-auto select-none pointer-events-none"
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
                    Ready to Build or <br className="hidden md:inline" />Redesign Your Website?
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
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 h-[105%] md:h-[110%] w-auto object-contain object-bottom md:object-right-bottom select-none pointer-events-none"
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
