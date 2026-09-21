"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Target,
  Phone,
  MessageSquare,
  ArrowRight,
  AlertCircle,
  Calendar,
  MapPin,
  TrendingUp,
  Award,
  ChevronDown,
  Loader2,
  Sparkles,
  School,
  Compass,
  Check,
  Building2,
  PieChart,
  ShieldCheck,
  Clock,
  HelpCircle,
  Megaphone,
  Smartphone,
  Globe,
  Star,
  CheckCircle,
  ArrowUpRight,
  Search,
  BarChart3
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import {
  SiGoogle,
  SiGooglemaps,
  SiFacebook,
  SiInstagram,
  SiWhatsapp,
  SiYoutube,
  SiOpenai
} from "react-icons/si";
import Footer from "@/components/Footer";
import Header from "../components/Header";
import "../lp.css";

// -------------------------------------------------------------
// Data & Content Definitions
// -------------------------------------------------------------

const PROBLEMS_DATA = [
  {
    id: "p1",
    title: "Parents are not finding your preschool",
    gap: "Neighborhood Invisibility",
    detail:
      "When young parents living within 3 to 5 km search for nurseries, playgroups, or daycares on Google Maps and Instagram, your preschool is buried under competitors.",
    impact: "Zero inbound enquiry flow from your immediate, high-intent residential catchment area.",
    icon: Compass,
  },
  {
    id: "p2",
    title: "Enquiries are coming from outside your locality",
    gap: "Wasted Distance Targeting",
    detail:
      "Uncalibrated campaigns target city-wide pincodes, delivering calls from parents 10-15 km away who inevitably cancel once they realize daily commute time isn't viable.",
    impact: "Wasted ad budget and counseling hours on leads that cannot physically enroll.",
    icon: MapPin,
  },
  {
    id: "p3",
    title: "WhatsApp leads are not being followed up properly",
    gap: "Slow Front-Desk Response",
    detail:
      "Staff reply hours late, send overwhelming generic fee PDFs, or forget follow-ups. In early schooling, parents reach out to 3 centers—the fastest professional responder wins.",
    impact: "Over 60% of interested enquiries turn cold within the first 3 hours.",
    icon: MessageSquare,
  },
  {
    id: "p4",
    title: "Parents enquire but do not book a visit",
    gap: "Premature Fee Quoting",
    detail:
      "Admissions staff share the annual fee immediately over chat without understanding the child's development needs or securing a scheduled campus tour.",
    impact: "High initial chat curiosity but empty Saturday campus visit slots.",
    icon: Calendar,
  },
  {
    id: "p5",
    title: "Campus visits are not converting into admissions",
    gap: "Weak Post-Visit Counseling",
    detail:
      "Parents complete the tour, say 'we will discuss at home', and stall. Without systematic counselor follow-up templates and parent reassurance, seats stay empty.",
    impact: "Low visit-to-enrolment ratio and lost seasonal admissions.",
    icon: School,
  },
  {
    id: "p6",
    title: "Marketing performance is not being tracked",
    gap: "Zero Attribution Clarity",
    detail:
      "Preschools spend every academic season on print flyers, directories, or generic digital agencies without knowing which specific campaign yielded confirmed student enrolments.",
    impact: "Zero visibility into true Cost Per Enrolled Student or marketing ROI.",
    icon: PieChart,
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    stepNum: "01",
    title: "Admission Growth Audit",
    timeframe: "Days 1 - 3",
    desc: "We review your preschool branch location, seat capacity, fee tiers, 3 km competitor landscape, and current enquiry-to-visit bottlenecks.",
  },
  {
    stepNum: "02",
    title: "Campaign Strategy",
    timeframe: "Days 4 - 7",
    desc: "We design hyperlocal creatives, build program landing pages, craft the offer, and set up direct Click-to-WhatsApp admission funnels.",
  },
  {
    stepNum: "03",
    title: "Lead Generation",
    timeframe: "Launch Day",
    desc: "Targeted campaigns go live. Nearby families in your 3-5 km catchment see your campus highlights and enquire directly with child details.",
  },
  {
    stepNum: "04",
    title: "Follow-Up System",
    timeframe: "Ongoing",
    desc: "We equip your admissions desk with scripts, visit scheduling templates, and automatic WhatsApp reminders to drive parents into the center.",
  },
  {
    stepNum: "05",
    title: "Performance Review",
    timeframe: "Weekly & Monthly",
    desc: "We track parent enquiries, qualified leads, campus visits, and confirmed student enrolments—optimizing continuously for maximum fill rate.",
  },
];

const PORTFOLIO_CLIENTS = [
  {
    id: "kautilya",
    name: "Kautilya Vidyalaya",
    displayUrl: "kautilyavidyalaya.edu.in",
    url: "https://kautilyavidyalaya.edu.in/",
    category: "CBSE & Kindergarten",
    type: "school",
    location: "Mysuru",
    image: "/images/portfolio/kautilya.png",
    logo: "/images/logos/kautilya.webp?v=3",
  },
  {
    id: "klay",
    name: "KLAY Prep Schools and DayCare",
    displayUrl: "klay.co.in",
    url: "https://klay.co.in/foundational-development-program/chennai/anna-nagar/",
    category: "Prep School & DayCare",
    type: "preschool",
    location: "Anna Nagar, Chennai",
    image: "/images/portfolio/klay.png",
    logo: "/images/logos/klay.png?v=3",
  },
  {
    id: "maplebear",
    name: "Maple Bear Canadian Preschool",
    displayUrl: "maplebearsouthasia.com",
    url: "https://www.maplebearsouthasia.com/jubileehills/",
    category: "Canadian Preschool",
    type: "preschool",
    location: "Jubilee Hills, Hyd",
    image: "/images/portfolio/maplebear.png",
    logo: "/images/logos/maplebear.png?v=3",
  },
  {
    id: "kangarookids",
    name: "Kangaroo Kids International",
    displayUrl: "kangarookids.in",
    url: "https://www.kangarookids.in/",
    category: "International Preschool",
    type: "preschool",
    location: "Pan-India",
    image: "/images/portfolio/kangarookids.png",
    logo: "/images/logos/kangarookids.svg?v=3",
  },
  {
    id: "littlemillennium",
    name: "Little Millennium",
    displayUrl: "littlemillennium.com",
    url: "https://www.littlemillennium.com/",
    category: "Preschool Network",
    type: "preschool",
    location: "Pan-India",
    image: "/images/portfolio/littlemillennium.png",
    logo: "/images/logos/littlemillennium.png?v=3",
  },
  {
    id: "bgsnps",
    name: "BGS National Public School",
    displayUrl: "bgsnps.edu.in",
    url: "https://bgsnps.edu.in/",
    category: "Public School & Early Years",
    type: "school",
    location: "Bangalore",
    image: "/images/portfolio/bgsnps.png",
    logo: "/images/logos/bgsnps.png?v=3",
  },
  {
    id: "iamyello",
    name: "Yello Early Learning Center",
    displayUrl: "iamyello.com",
    url: "https://iamyello.com/",
    category: "Preschool & Daycare",
    type: "preschool",
    location: "Bangalore",
    image: "/images/portfolio/iamyello.png",
    logo: "/images/logos/iamyello.svg?v=3",
  },
  {
    id: "vishwavidyapeeth",
    name: "Vishwa Vidyapeeth",
    displayUrl: "vishwavidyapeeth.edu.in",
    url: "https://vishwavidyapeeth.edu.in/",
    category: "ICSE / CBSE & Kindergarten",
    type: "school",
    location: "Bangalore",
    image: "/images/portfolio/vishwavidyapeeth.png",
    logo: "/images/logos/vishwavidyapeeth.webp?v=3",
  },
  {
    id: "kidscastle",
    name: "Kids Castle Preschool",
    displayUrl: "kidscastlepreschool.com",
    url: "https://kidscastlepreschool.com/",
    category: "Playgroup & Daycare",
    type: "preschool",
    location: "Bangalore",
    image: "/images/portfolio/kidscastle.png",
    logo: "/images/logos/kidscastle.png?v=3",
  },
  {
    id: "timekids",
    name: "T.I.M.E. Kids Preschool",
    displayUrl: "timekidspreschoolsannanagar.com",
    url: "https://timekidspreschoolsannanagar.com/",
    category: "Early Childhood Education",
    type: "preschool",
    location: "Anna Nagar, Chennai",
    image: "/images/portfolio/timekids.png",
    logo: "/images/logos/timekids.png?v=3",
  },
  {
    id: "pepschool",
    name: "PEP School V2",
    displayUrl: "pepschoolv2.com",
    url: "https://www.pepschoolv2.com/",
    category: "Progressive Early Years & K-12",
    type: "school",
    location: "Bangalore",
    image: "/images/portfolio/pepschool.png",
    logo: "/images/logos/pepschool.webp?v=3",
  },
  {
    id: "ampasishya",
    name: "Ampa Sishya School",
    displayUrl: "ampasishya.com",
    url: "https://ampasishya.com/",
    category: "Early Learning & School",
    type: "school",
    location: "Chennai",
    image: "/images/portfolio/ampasishya.png",
    logo: "/images/logos/ampasishya.png?v=3",
  },
  {
    id: "mylittleberries",
    name: "My Little Berries",
    displayUrl: "mylittleberries.in",
    url: "https://mylittleberries.in/",
    category: "Preschool & Activity Centre",
    type: "preschool",
    location: "Bangalore",
    image: "/images/portfolio/mylittleberries.png",
    logo: "/images/logos/mylittleberries.png?v=3",
  },
];

const CASE_STUDIES_DATA = [
  {
    id: "kautilya",
    name: "Kautilya Vidyalaya",
    category: "CBSE & Kindergarten Campus",
    logo: "/images/logos/kautilya.webp",
    stat: "95%",
    statLabel: "Seats Filled",
    headline: "95% of Available Seats Filled Across Campus",
    context: "Kindergarten & primary batch admissions secured",
    services: "End-to-End Digital Marketing",
    duration: "3-year engagement",
    url: "https://kautilyavidyalaya.edu.in/",
    displayUrl: "kautilyavidyalaya.edu.in",
  },
  {
    id: "sit",
    name: "SIT",
    subName: "Siddaganga Institute of Technology",
    category: "Higher Education & Engineering",
    logo: "/images/logos/sit.png",
    stat: "80%",
    statLabel: "Organic Inbound",
    headline: "80% of Enquiries via Search & Google Business Profile",
    context: "Dominated organic student search and local rankings",
    services: "SEO & Google Business Profile",
    duration: "2-year engagement",
    url: "https://sit.ac.in/",
    displayUrl: "sit.ac.in",
  },
  {
    id: "bgsgims",
    name: "BGS GIMS",
    subName: "BGS Global Institute of Medical Sciences",
    category: "Medical Sciences Institution",
    logo: "/images/logos/bgsgims.svg",
    stat: "100%",
    statLabel: "Intake Secured",
    headline: "100% of Available Seats Filled for Batch Intake",
    context: "Structured enrollment funnel for medical programs",
    services: "End-to-End Digital Marketing",
    duration: "4-year engagement",
    url: "https://www.bgsgims.edu.in/",
    displayUrl: "bgsgims.edu.in",
  },
  {
    id: "carver",
    name: "Carver Aviation",
    subName: "Academy of Aviation",
    category: "Flight Training & Pilot Academy",
    logo: "/images/logos/carver.png",
    stat: "80%",
    statLabel: "Pilot Intake",
    headline: "80% of Available Seats Filled Across Hubs",
    context: "Commercial flight student lead acquisition pan-India",
    services: "Lead Generation & Intake",
    duration: "1-year engagement",
    url: "https://carveraviation.com/",
    displayUrl: "carveraviation.com",
  },
  {
    id: "vsmaerospace",
    name: "VSM Aerospace",
    subName: "Aviation Academy",
    category: "Aerospace & Aircraft Maintenance",
    logo: "/images/logos/vsmaerospace.png",
    stat: "10% → 60%",
    statLabel: "Occupancy Growth",
    headline: "Seat Occupancy Grew from 10% to 60% in 1 Year",
    context: "Turnaround enrollment for aircraft maintenance batch",
    services: "End-to-End Digital Marketing",
    duration: "2-year engagement",
    url: "https://vsmaerospace.in/",
    displayUrl: "vsmaerospace.in",
  },
  {
    id: "cambridge",
    name: "The Cambridge International School",
    category: "Early Years & International School",
    logo: "/images/logos/cambridge.png",
    stat: "100%",
    statLabel: "Early Closure",
    headline: "100% of Available Seats Filled by February",
    context: "Early admissions target closed ahead of academic cycle",
    services: "End-to-End Digital Marketing",
    duration: "3-year engagement",
    url: "https://thecambridgeinternationalschool.com/",
    displayUrl: "thecambridgeinternationalschool.com",
  },
];

const TRUST_STATS = [
  { label: "Preschools & Daycares Supported", value: "25+", sub: "Pan-India Centers" },
  { label: "Neighborhood Radius Targeting", value: "3 - 5 km", sub: "Hyperlocal Precision" },
  { label: "Campus Visit Booking Surge", value: "40%+", sub: "Structured Follow-Up" },
  { label: "Admission Conversion Transparency", value: "100%", sub: "Enquiry-to-Seat Tracking" },
];

const WORK_COMPLETED_AREAS = [
  {
    title: "Admission Campaigns",
    desc: "Season-specific and mid-term enrolment ad campaigns crafted specifically for preschools, montessori schools, and daycare centers.",
    icon: Megaphone,
  },
  {
    title: "Parent Enquiry Generation",
    desc: "Consistent pipeline of qualified local parents actively looking for playgroup, nursery, kindergarten, and daycare admissions.",
    icon: Users,
  },
  {
    title: "Website & Landing-Page Development",
    desc: "Fast, mobile-optimized admission landing pages designed to build trust with millennial parents and spur immediate visit bookings.",
    icon: Globe,
  },
  {
    title: "WhatsApp Follow-Up Systems",
    desc: "Instant auto-responders, qualification flows, and follow-up templates that ensure no parent enquiry slips through the cracks.",
    icon: MessageSquare,
  },
  {
    title: "Local SEO & Google Visibility",
    desc: "Google Business Profile optimization to dominate Google Maps rankings when neighborhood parents search 'best preschool near me'.",
    icon: MapPin,
  },
  {
    title: "Campaign Tracking & Reporting",
    desc: "End-to-end attribution showing cost per parent enquiry, cost per campus visit, and verified admission outcomes.",
    icon: TrendingUp,
  },
];

const WHAT_WE_DO_SERVICES = [
  {
    id: "website",
    num: "01",
    title: "Preschool Website",
    tagline: "Mobile-first admissions portal built to convert visiting parents into campus tours.",
    icon: Globe,
    accentColor: "text-amber-700 bg-amber-50 border-amber-200/70",
  },
  {
    id: "search",
    num: "02",
    title: "Search Visibility (SEO & AI)",
    tagline: "Rank at the top of Google and AI tools when parents search in your neighborhood.",
    icon: Search,
    accentColor: "text-sky-700 bg-sky-50 border-sky-200/70",
  },
  {
    id: "gbp",
    num: "03",
    title: "Google Business Profile",
    tagline: "Turn Google Maps into your steady daily stream of direct phone calls and visits.",
    icon: MapPin,
    accentColor: "text-emerald-700 bg-emerald-50 border-emerald-200/70",
  },
  {
    id: "social",
    num: "04",
    title: "Active Social Media",
    tagline: "Consistent branded posts that build high credibility and trust with local parents.",
    icon: Megaphone,
    accentColor: "text-rose-700 bg-rose-50 border-rose-200/70",
  },
  {
    id: "ads",
    num: "05",
    title: "Targeted Admission Ads",
    tagline: "Hyperlocal ad campaigns reaching parents living strictly within a 3–5 km radius.",
    icon: Target,
    accentColor: "text-orange-700 bg-orange-50 border-orange-200/70",
  },
  {
    id: "crm",
    num: "06",
    title: "Enquiry Tracking & CRM",
    tagline: "Full visibility into every parent enquiry, campus visit, and confirmed admission.",
    icon: BarChart3,
    accentColor: "text-indigo-700 bg-indigo-50 border-indigo-200/70",
  },
];

const PLATFORM_PARTNERS = [
  {
    name: "Google",
    role: "Search & Ads",
    sub: "High-Intent Discovery",
    icon: SiGoogle,
    color: "text-[#4285F4]",
    bg: "bg-blue-50",
    border: "border-blue-200/80",
  },
  {
    name: "Google Maps",
    role: "Local Discovery",
    sub: "3–5 km Catchment Area",
    icon: SiGooglemaps,
    color: "text-[#EA4335]",
    bg: "bg-red-50",
    border: "border-red-200/80",
  },
  {
    name: "Facebook",
    role: "Meta Ad Campaigns",
    sub: "Hyperlocal Parent Feeds",
    icon: SiFacebook,
    color: "text-[#1877F2]",
    bg: "bg-blue-50",
    border: "border-blue-200/80",
  },
  {
    name: "Instagram",
    role: "Visual Branding",
    sub: "Campus Reels & Stories",
    icon: SiInstagram,
    color: "text-[#E4405F]",
    bg: "bg-pink-50",
    border: "border-pink-200/80",
  },
  {
    name: "WhatsApp",
    role: "1-Tap Inquiries",
    sub: "Fast Admission Chats",
    icon: SiWhatsapp,
    color: "text-[#25D366]",
    bg: "bg-emerald-50",
    border: "border-emerald-200/80",
  },
  {
    name: "YouTube",
    role: "Video Showcase",
    sub: "Parent Walkthroughs",
    icon: SiYoutube,
    color: "text-[#FF0000]",
    bg: "bg-red-50",
    border: "border-red-200/80",
  },
  {
    name: "ChatGPT",
    role: "AI Search & AEO",
    sub: "AI Answer Optimization",
    icon: SiOpenai,
    color: "text-[#10A37F]",
    bg: "bg-emerald-50",
    border: "border-emerald-200/80",
  },
];

const AUDIT_INCLUDES = [
  "Local competitor review (benchmarking fees, digital footprint, and positioning of preschools in your 3 km radius)",
  "Current online visibility check across Google Maps, local search, and social platforms",
  "Campaign opportunity assessment with estimated addressable parent audience in your neighborhood",
  "Website and WhatsApp enquiry funnel review identifying exact leak points",
  "Follow-up process review (auditing how your front desk currently responds to inquiries)",
  "Recommended campaign structure and optimal monthly ad budget to reach your admission targets",
];

const FAQS = [
  {
    q: "Do you guarantee admissions?",
    a: "No ethical agency can guarantee a fixed number of admissions. Final enrolments depend on your center's campus environment, staff demeanor, and fee alignment. What we build and optimize is the complete growth system: generating qualified enquiries from nearby parents, booking campus visits, and improving counselling conversion.",
  },
  {
    q: "Do you work with individual preschools and franchise groups?",
    a: "Yes. The strategy is customised for single centres, multi-branch preschools and daycare groups. Standalone centres benefit from hyper-local neighborhood positioning, while franchise operators (EuroKids, Kidzee, Little Elly, Kangaroo Kids, Podar Prep, etc.) get help outperforming nearby branches.",
  },
  {
    q: "What advertising budget is required?",
    a: "It depends on the city, competition, target radius and number of admissions required. We recommend a budget after the audit based on your specific seat vacancies and neighborhood potential.",
  },
  {
    q: "Can you manage WhatsApp follow-ups?",
    a: "We can create the qualification flow, response templates, automation and lead-tracking process. While your admissions staff gives the campus tour, we ensure they have every template and reminder script needed to follow up professionally.",
  },
  {
    q: "Do you also create websites and landing pages?",
    a: "Yes. We build admission-focused landing pages, websites and enquiry funnels engineered specifically for mobile-first parent conversion.",
  },
  {
    q: "How quickly can campaigns begin?",
    a: "Campaign timelines depend on asset readiness, but the strategy, tracking, creative and funnel should be completed before launch. Typically, we launch within 5 to 7 business days after the audit.",
  },
];

// -------------------------------------------------------------
// Main Preschool Landing Page Client Component
// -------------------------------------------------------------

export default function PreschoolLandingClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [portfolioFilter, setPortfolioFilter] = useState<"all" | "preschool" | "school">("all");

  const filteredPortfolio = PORTFOLIO_CLIENTS.filter((item) => {
    if (portfolioFilter === "all") return true;
    return item.type === portfolioFilter;
  });

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const PHONE_NUMBER = "+91 99863 89444";
  const PHONE_HREF = "tel:+919986389444";

  const WHATSAPP_EXPERT_LINK =
    "https://wa.me/919986389444?text=Hi%20Clever%20Crow%20Team%2C%20I%20am%20a%20preschool%20%2F%20daycare%20director%20interested%20in%20the%20Free%20Admission%20Growth%20Audit.";

  return (
    <main className="landing-page-container bg-white text-slate-900 selection:bg-amber-300 selection:text-slate-900 font-sans min-h-screen">
      <div className="site-shell">
        <Header whatsappMessage="Hi Clever Crow Team, I am a preschool / daycare director interested in the Free Admission Growth Audit." />

        <main id="top">
          {/* ----------------------------------------------------------- */}
          {/* 1. HERO SECTION (Editorial Agency Vibe, Not SaaS) */}
          {/* ----------------------------------------------------------- */}
          {/* ----------------------------------------------------------- */}
          {/* 1. HERO SECTION (Wide Background Image, No Right Card) */}
          {/* ----------------------------------------------------------- */}
          <section
            className="relative pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24 overflow-hidden border-b border-slate-200 bg-[#faf8f5]"
          >
            {/* Full-width Wide Background Image for Web Version */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <Image
                src="/images/preschool-hero-bg.jpg"
                alt="Modern Preschool Learning Environment"
                fill
                priority
                className="object-cover object-center lg:object-[right_center] opacity-90 sm:opacity-95 lg:opacity-100"
              />
              {/* Soft Gradient Overlay: Clean visible background with solid readable wash on the left content side */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 via-35% to-white/70 lg:to-transparent w-full lg:w-[62%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl space-y-6 sm:space-y-6 text-left">
                
                {/* Eyebrow / Small Label */}
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-950 text-white text-[11px] sm:text-xs font-black tracking-wider uppercase shadow-xs">
                  <School className="w-3.5 h-3.5 text-[#f4c542]" />
                  <span>MARKETING FOR PRESCHOOLS &amp; DAYCARE CENTRES</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-black text-slate-950 tracking-tight leading-[1.12]">
                  <span className="block">More Local Parents.</span>
                  <span className="block text-slate-950 mt-1 sm:mt-1.5">More Admission Enquiries.</span>
                </h1>

                {/* Supporting Copy */}
                <p className="text-base sm:text-lg lg:text-[19px] text-slate-600 leading-relaxed max-w-2xl font-normal">
                  We help nearby parents discover your centre and enquire through Google, Instagram, Facebook and WhatsApp.
                </p>

                {/* Trust Line */}
                <div className="flex items-center gap-2.5 pt-0.5">
                  <div className="flex -space-x-1.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white bg-[#f4c542] text-slate-950 flex items-center justify-center text-[10px] font-black shadow-2xs"
                      >
                        ✓
                      </div>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800">
                    Experience working with 25+ preschools and daycare centres.
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                  <a
                    href={PHONE_HREF}
                    className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-[#f4c542] hover:brightness-105 active:scale-[0.99] text-slate-950 font-black text-sm sm:text-base shadow-xs transition shrink-0 cursor-pointer whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call {PHONE_NUMBER}</span>
                  </a>

                  <a
                    href={WHATSAPP_EXPERT_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm sm:text-base transition shadow-2xs shrink-0 cursor-pointer whitespace-nowrap"
                  >
                    <FaWhatsapp className="w-4 h-4 text-emerald-600" />
                    <span>Talk on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

        {/* ----------------------------------------------------------- */}
        {/* PARTNER SCHOOLS & PRESCHOOLS LOGO CAROUSEL */}
        {/* ----------------------------------------------------------- */}
        <section className="school-logo-marquee-section" aria-label="Partner School Logos">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-3.5 text-center">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-500">
              Trusted Admission Marketing Partner Across 25+ Leading Preschools &amp; Schools
            </p>
          </div>

          <div className="school-logo-marquee">
            <div className="school-logo-track">
              {PORTFOLIO_CLIENTS.map((item) => (
                <a
                  key={`track1-${item.id}`}
                  href="#our-work"
                  title={`${item.name} (${item.location}) — View Showcase`}
                  className="school-logo-item group"
                >
                  <img
                    src={item.logo}
                    alt={`${item.name} logo`}
                    className="school-logo-img"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
            <div className="school-logo-track" aria-hidden="true">
              {PORTFOLIO_CLIENTS.map((item) => (
                <a
                  key={`track2-${item.id}`}
                  href="#our-work"
                  tabIndex={-1}
                  title={`${item.name} (${item.location}) — View Showcase`}
                  className="school-logo-item group"
                >
                  <img
                    src={item.logo}
                    alt={`${item.name} logo`}
                    className="school-logo-img"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- */}
        {/* Trust Stats Bar */}
        {/* ----------------------------------------------------------- */}
        <div className="bg-slate-50 border-b border-slate-200 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {TRUST_STATS.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-slate-700">
                    {stat.label}
                  </p>
                  <p className="text-[11px] text-amber-800 font-medium">
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------- */}
        {/* 2. WHAT WE CAN DO FOR YOUR PRESCHOOL */}
        {/* ----------------------------------------------------------- */}
        <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-14 sm:mb-16">
              <span className="inline-block rounded-full bg-amber-100/70 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-900 border border-amber-200/80 mb-3">
                Full-Service Admission Growth
              </span>
              <h2 className="text-[1.05rem] min-[360px]:text-[1.12rem] min-[390px]:text-[1.22rem] min-[420px]:text-[1.32rem] sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-950 tracking-[-0.03em] whitespace-nowrap text-center">
                What We Can Do for Your Preschool
              </h2>
              <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
                We help your centre reach nearby parents, build trust and generate admission enquiries.
              </p>
            </div>

            {/* 6 Tangible Service Capability Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {WHAT_WE_DO_SERVICES.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    className="group rounded-2xl bg-white p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-200 flex flex-col justify-between text-left"
                  >
                    <div>
                      {/* Top Header: Icon & Number */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center border shadow-2xs group-hover:scale-105 transition-transform ${item.accentColor}`}
                        >
                          <IconComponent className="w-5 h-5 stroke-[2.2]" />
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-400">
                          {item.num}
                        </span>
                      </div>

                      {/* Title & Concise Value Proposition */}
                      <h3 className="text-lg sm:text-xl font-bold text-slate-950 leading-snug tracking-tight">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal min-h-[38px]">
                        {item.tagline}
                      </p>
                    </div>

                    {/* Deliverable Mockup / Concrete Preview (No pills, no badges) */}
                    <div className="mt-5">
                      {item.id === "website" && (
                        <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3 shadow-2xs">
                          <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-slate-200/60">
                            <div className="flex gap-1">
                              <span className="w-2 h-2 rounded-full bg-rose-400" />
                              <span className="w-2 h-2 rounded-full bg-amber-400" />
                              <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono bg-white px-2 py-0.5 rounded border border-slate-200/60 mx-auto">
                              yourpreschool.in
                            </span>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-bold text-slate-900">Admissions Open 2026-27</span>
                            <span className="text-[9px] font-semibold text-amber-800 bg-amber-100/80 px-1.5 py-0.5 rounded">Ages 1.5–6</span>
                          </div>
                          <div className="grid grid-cols-2 gap-1.5">
                            <div className="h-6 rounded bg-[#f4c542] text-slate-950 text-[10px] font-bold flex items-center justify-center">
                              Book Visit
                            </div>
                            <div className="h-6 rounded bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center gap-1">
                              <FaWhatsapp className="w-2.5 h-2.5" />
                              <span>WhatsApp</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {item.id === "search" && (
                        <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3 shadow-2xs space-y-2">
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-200 text-[10px] text-slate-600">
                            <Search className="w-3 h-3 text-sky-600 shrink-0" />
                            <span className="truncate font-medium">best preschool near me</span>
                          </div>
                          <div className="bg-white rounded-lg p-2 border border-slate-200/60 shadow-2xs">
                            <div className="text-[9px] font-bold text-emerald-700">#1 Result • Google Search</div>
                            <div className="text-[11px] font-bold text-sky-800 truncate mt-0.5">
                              Your Preschool Campus — Enrol Today
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-amber-500 mt-1">
                              <span>★★★★★</span>
                              <span className="text-slate-500 text-[9px] font-medium">4.9 (80+ Reviews)</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {item.id === "gbp" && (
                        <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3 shadow-2xs space-y-2">
                          <div className="bg-white rounded-lg p-2.5 border border-slate-200/60 shadow-2xs">
                            <div className="flex items-start justify-between gap-1">
                              <div>
                                <div className="text-[11px] font-bold text-slate-900">Your Preschool &amp; Daycare</div>
                                <div className="text-[9px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                  <span>Verified Pin • Open 8:30 AM</span>
                                </div>
                              </div>
                              <span className="text-[9px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">0.8 km</span>
                            </div>
                            <div className="grid grid-cols-2 gap-1.5 pt-2">
                              <div className="h-6 rounded bg-slate-100 text-slate-800 text-[10px] font-bold flex items-center justify-center gap-1">
                                <Phone className="w-2.5 h-2.5 text-slate-600" />
                                <span>Call Centre</span>
                              </div>
                              <div className="h-6 rounded bg-sky-50 text-sky-700 text-[10px] font-bold flex items-center justify-center gap-1">
                                <Compass className="w-2.5 h-2.5 text-sky-600" />
                                <span>Directions</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {item.id === "social" && (
                        <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3 shadow-2xs space-y-2">
                          <div className="bg-white rounded-lg p-2.5 border border-slate-200/60 shadow-2xs space-y-1.5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-[9px] font-black">
                                  P
                                </div>
                                <span className="text-[10px] font-bold text-slate-800">yourpreschool</span>
                              </div>
                              <span className="text-[9px] font-medium text-slate-400">20 Posts / Mo</span>
                            </div>
                            <div className="rounded bg-rose-50/50 p-2 text-center border border-rose-100/70">
                              <p className="text-[10px] font-bold text-slate-800">
                                🎨 Sensory Play &amp; Montessori Activity Day!
                              </p>
                              <span className="text-[9px] text-slate-500 font-normal">Parent Community Highlights</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {item.id === "ads" && (
                        <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3 shadow-2xs space-y-2">
                          <div className="bg-white rounded-lg p-2.5 border border-slate-200/60 shadow-2xs space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-extrabold uppercase text-slate-400 tracking-wider">
                                Sponsored Ad
                              </span>
                              <span className="text-[9px] font-semibold text-orange-800 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200/60">
                                3–5 km Catchment Only
                              </span>
                            </div>
                            <p className="text-[10px] font-medium text-slate-700 leading-snug">
                              Admissions open for Playgroup &amp; Nursery. Connect with our campus director.
                            </p>
                            <div className="h-6 rounded bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center gap-1 shadow-2xs">
                              <FaWhatsapp className="w-2.5 h-2.5" />
                              <span>Enquire on WhatsApp</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {item.id === "crm" && (
                        <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3 shadow-2xs">
                          <div className="bg-white rounded-lg p-2.5 border border-slate-200/60 shadow-2xs">
                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                              Admission Funnel Tracking
                            </div>
                            <div className="grid grid-cols-3 gap-1.5 text-center">
                              <div className="p-1 rounded bg-slate-50 border border-slate-100">
                                <div className="text-xs font-black text-slate-900">45</div>
                                <div className="text-[8px] font-semibold text-slate-500 uppercase">Enquiries</div>
                              </div>
                              <div className="p-1 rounded bg-amber-50/70 border border-amber-100">
                                <div className="text-xs font-black text-amber-900">28</div>
                                <div className="text-[8px] font-semibold text-amber-700 uppercase">Tours</div>
                              </div>
                              <div className="p-1 rounded bg-emerald-50/70 border border-emerald-100">
                                <div className="text-xs font-black text-emerald-900">19</div>
                                <div className="text-[8px] font-semibold text-emerald-700 uppercase">Enrolled</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* -------------------------------------------------------- */}
            {/* PLATFORM PARTNERS CAROUSEL */}
            {/* -------------------------------------------------------- */}
            <div className="mt-12 sm:mt-14 pt-8 border-t border-slate-200/80">
              <div className="text-center mb-4 sm:mb-5">
                <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-slate-500">
                  Integrated Across Official Ad &amp; AI Search Channels
                </span>
              </div>

              <div className="partner-carousel-marquee py-1">
                <div className="partner-carousel-track">
                  {PLATFORM_PARTNERS.map((partner) => {
                    const Icon = partner.icon;
                    return (
                      <div
                        key={`p1-${partner.name}`}
                        className="group flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-400 hover:shadow-xs transition-all duration-200 shrink-0"
                      >
                        <div
                          className={`w-9 h-9 rounded-xl ${partner.bg} ${partner.border} border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                        >
                          <Icon className={`w-4 h-4 ${partner.color}`} />
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                            {partner.name}
                          </span>
                          <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 leading-tight">
                            {partner.role}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="partner-carousel-track" aria-hidden="true">
                  {PLATFORM_PARTNERS.map((partner) => {
                    const Icon = partner.icon;
                    return (
                      <div
                        key={`p2-${partner.name}`}
                        className="group flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-400 hover:shadow-xs transition-all duration-200 shrink-0"
                      >
                        <div
                          className={`w-9 h-9 rounded-xl ${partner.bg} ${partner.border} border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                        >
                          <Icon className={`w-4 h-4 ${partner.color}`} />
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                            {partner.name}
                          </span>
                          <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 leading-tight">
                            {partner.role}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- */}
        {/* 5. OUR WORK / CLIENT PORTFOLIO SECTION */}
        {/* ----------------------------------------------------------- */}
        <section id="our-work" className="py-20 sm:py-28 bg-[#faf8f5] border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-950 text-white text-[11px] font-black tracking-wider uppercase shadow-xs mb-3">
                <School className="w-3.5 h-3.5 text-[#f4c542]" />
                <span>Featured Client Portfolio</span>
              </div>
              <h2 className="text-[1.05rem] min-[360px]:text-[1.12rem] min-[390px]:text-[1.22rem] min-[420px]:text-[1.32rem] sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-950 tracking-[-0.03em] whitespace-nowrap text-center">
                Preschools &amp; Schools We Work With
              </h2>
              <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
                Real partner campuses, live web platforms, and admissions ecosystems engineered to convert parent interest into confirmed enrolments.
              </p>

              {/* Filter Tabs */}
              <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
                <button
                  onClick={() => setPortfolioFilter("all")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                    portfolioFilter === "all"
                      ? "bg-slate-950 text-[#f4c542] shadow-sm"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  All Institutions ({PORTFOLIO_CLIENTS.length})
                </button>
                <button
                  onClick={() => setPortfolioFilter("preschool")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                    portfolioFilter === "preschool"
                      ? "bg-slate-950 text-[#f4c542] shadow-sm"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  Preschools & Daycares ({PORTFOLIO_CLIENTS.filter((c) => c.type === "preschool").length})
                </button>
                <button
                  onClick={() => setPortfolioFilter("school")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                    portfolioFilter === "school"
                      ? "bg-slate-950 text-[#f4c542] shadow-sm"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  Schools & K-12 ({PORTFOLIO_CLIENTS.filter((c) => c.type === "school").length})
                </button>
              </div>
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {filteredPortfolio.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-400/80 transition-all duration-300"
                >
                  {/* Browser Window Header */}
                  <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-900 border-b border-slate-800 text-slate-400 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90" />
                    </div>
                    <div className="truncate max-w-[210px] font-mono text-[10px] text-slate-300 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60">
                      {item.displayUrl}
                    </div>
                    <div className="w-6" />
                  </div>

                  {/* Screenshot Viewport */}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block aspect-[16/10] overflow-hidden bg-slate-100 group/link"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={720}
                      height={450}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/30 transition-colors duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/95 text-white text-xs font-bold shadow-lg backdrop-blur-xs">
                        <span>Visit Website</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#f4c542]" />
                      </span>
                    </div>
                  </a>

                  {/* Minimal Card Footer */}
                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-3">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200/70">
                          {item.category}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {item.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200/80 p-1 flex items-center justify-center shrink-0">
                          <img
                            src={item.logo}
                            alt={`${item.name} logo`}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                        <h3 className="text-base font-black text-slate-900 tracking-tight group-hover:text-amber-800 transition line-clamp-1">
                          {item.name}
                        </h3>
                      </div>
                    </div>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs font-bold text-slate-600 hover:text-slate-950 transition"
                    >
                      <span>Explore Live Website</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Proof Metric Banner */}
            <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div>
                <h4 className="text-lg font-black text-slate-900">
                  Want your school or preschool featured with predictable admissions?
                </h4>
                <p className="text-sm text-slate-600 mt-1">
                  We build customized hyperlocal ad campaigns and WhatsApp conversion systems for your specific 3-5 km catchment area.
                </p>
              </div>
              <a
                href={PHONE_HREF}
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#f4c542] hover:brightness-105 text-slate-950 font-black text-sm px-6 py-3 shadow-xs transition cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Call {PHONE_NUMBER}</span>
              </a>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- */}
        {/* 1-ON-1 GROWTH CONSULTATION */}
        {/* ----------------------------------------------------------- */}
        <section
          id="free-audit-offer"
          className="py-12 sm:py-16 bg-white border-b border-slate-200 scroll-mt-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-200/90 bg-[#faf8f5] p-6 sm:p-10 lg:p-12 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Column: Scope & Value */}
                <div className="lg:col-span-7 space-y-4 text-left">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-950 text-white text-[11px] font-black tracking-wider uppercase shadow-xs">
                    <School className="w-3.5 h-3.5 text-[#f4c542]" />
                    <span>1-on-1 Growth Consultation</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-snug">
                    <span className="sm:block">Speak Directly With a</span>
                    <span className="sm:block">Preschool Admission Strategist</span>
                  </h2>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl">
                    Skip long forms. Connect directly with our education campaign leads to evaluate your branch locality, 3–5 km parent catchment, and enquiry-to-visit conversion bottlenecks.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>Custom 3-5 km catchment analysis</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>Local competitor fee benchmarking</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>WhatsApp follow-up scripts review</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>Zero obligation • 100% confidential</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: High-Vibe CTA Card */}
                <div className="lg:col-span-5">
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-4 text-center sm:text-left">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 inline-flex items-center gap-1.5 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Admissions Specialists Online
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                        Start Your Growth Discussion
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Talk directly with our team. We typically respond within minutes during campus hours.
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-1">
                      {/* Primary WhatsApp Action */}
                      <a
                        href={WHATSAPP_EXPERT_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-sm sm:text-base px-6 py-3.5 shadow-sm transition"
                      >
                        <FaWhatsapp className="w-5 h-5 text-white" />
                        <span>Talk to Admission Expert</span>
                      </a>

                      {/* Secondary Call Request Button */}
                      <a
                        href={PHONE_HREF}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#f4c542] hover:brightness-105 active:scale-[0.99] text-slate-950 font-black text-sm px-6 py-3 transition cursor-pointer"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Call {PHONE_NUMBER}</span>
                      </a>
                    </div>

                    <p className="text-[11px] text-slate-400 text-center pt-1 font-medium">
                      Direct WhatsApp: <span className="font-semibold text-slate-600">+91 99863 89444</span> • Mon–Sat (9:30 AM – 6:30 PM)
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- */}
        {/* EXECUTION ROADMAP: From Campaign Launch to Enrolment */}
        {/* ----------------------------------------------------------- */}
        <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <span className="inline-block rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 border border-emerald-200 mb-3">
                Execution Roadmap
              </span>
              <h2 className="text-[1.05rem] min-[360px]:text-[1.12rem] min-[390px]:text-[1.22rem] min-[420px]:text-[1.32rem] sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-950 tracking-[-0.03em] whitespace-nowrap text-center">
                From Campaign Launch to Enrolment
              </h2>
              <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
                A seamless 5-step operational rollout designed to get qualified parent
                enquiries flowing without disruption to your daily school schedule.
              </p>
            </div>

            {/* 5 Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {HOW_IT_WORKS_STEPS.map((step) => (
                <div
                  key={step.stepNum}
                  className="rounded-2xl border border-slate-200/90 bg-[#faf8f5] hover:bg-white p-5 flex flex-col justify-between hover:border-amber-400 hover:shadow-xs transition"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center">
                        {step.stepNum}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                        {step.timeframe}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] font-bold text-amber-800">
                    Stage {step.stepNum}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- */}
        {/* 7. OUR EDUCATION EXPERIENCE (Case Studies & Proven Outcomes) */}
        {/* ----------------------------------------------------------- */}
        <section
          id="education-experience"
          className="py-16 sm:py-24 bg-[#faf9f6] border-b border-slate-200/80 scroll-mt-16"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-300/80 text-amber-950 text-[11px] font-black tracking-wider uppercase shadow-2xs mb-3.5">
                <Award className="w-3.5 h-3.5 text-amber-700" />
                <span>Our Education Experience</span>
              </div>

              <h2 className="text-2xl min-[390px]:text-[1.75rem] sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight text-center leading-tight">
                <span className="sm:block">Results From Our Work </span>
                <span className="sm:block">With Education Institutions</span>
              </h2>

              <p className="mt-3.5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
                Our education marketing experience spans early childhood, K-12 campuses, medical colleges, and aviation academies. Here are selected outcomes reported during client engagements.
              </p>
            </div>

            {/* Display six cards in a 3 x 2 desktop grid. Two columns on tablets, one on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {CASE_STUDIES_DATA.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between text-left"
                >
                  <div>
                    {/* Top Row: Clean Logo on Left, Tenure Badge on Right */}
                    <div className="flex items-center justify-between gap-3 h-10 mb-4">
                      <div className="h-9 w-32 sm:w-36 flex items-center justify-start shrink-0">
                        <Image
                          src={item.logo}
                          alt={item.name}
                          width={130}
                          height={36}
                          className="max-h-8 sm:max-h-9 w-auto object-contain object-left"
                        />
                      </div>

                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-slate-600 bg-slate-100/90 border border-slate-200/80 shrink-0">
                        <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{item.duration}</span>
                      </span>
                    </div>

                    {/* Institution Name & Sector Header */}
                    <div className="min-h-[50px] flex flex-col justify-center mb-3">
                      <h3 className="text-base sm:text-lg font-bold text-slate-950 leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-0.5">
                        {item.category}
                      </p>
                    </div>

                    {/* Metric & Outcome Block (Hairline-Divided, Perfectly Aligned) */}
                    <div className="py-4 border-y border-slate-100 flex flex-col justify-between min-h-[120px] mb-3.5">
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="text-3xl sm:text-[2rem] font-black text-slate-950 tracking-tight leading-none">
                          {item.stat}
                        </div>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/70 shrink-0">
                          <TrendingUp className="w-3 h-3 text-emerald-600" />
                          <span>{item.statLabel}</span>
                        </span>
                      </div>

                      <div className="mt-2.5">
                        <p className="text-xs sm:text-[13px] font-bold text-slate-800 leading-snug">
                          {item.headline}
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium mt-1 leading-normal">
                          {item.context}
                        </p>
                      </div>
                    </div>

                    {/* Services Scope Row */}
                    <div className="flex items-center justify-between text-xs min-h-[26px] mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Scope
                      </span>
                      <span className="font-semibold text-slate-700">
                        {item.services}
                      </span>
                    </div>
                  </div>

                  {/* Card Footer: Verified Website Source */}
                  <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-slate-500 hover:text-slate-900 transition-colors group/link"
                      >
                        <span className="hover:underline underline-offset-2">{item.displayUrl}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover/link:text-slate-700 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400">Education Partner</span>
                    )}
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>Verified Outcome</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Small Note Below the Cards */}
            <div className="mt-10 sm:mt-12 text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/90 text-xs text-slate-600 font-medium shadow-2xs">
                <span>Selected past outcomes. Results vary by institution, location, budget and admissions follow-up.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- */}
        {/* THE ADMISSION BOTTLENECK (Admission Friction Points) */}
        {/* ----------------------------------------------------------- */}
        <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-14">
              <span className="inline-block rounded-full bg-rose-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-rose-700 border border-rose-200 mb-3">
                The Admission Bottleneck
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
                <span className="sm:block">Getting Enquiries,</span>
                <span className="sm:block">But Not Enough Enrolments?</span>
              </h2>
              <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
                Most preschools lose admissions not because their campus is bad, but because
                their marketing and enquiry follow-ups are broken.
              </p>
            </div>

            {/* 6 Problem Cards (Clean Educational Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROBLEMS_DATA.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-200/90 bg-[#faf8f5] hover:bg-white p-6 shadow-xs hover:border-amber-400 hover:shadow-sm transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-bold text-slate-400">
                          Problem 0{idx + 1}
                        </span>
                        <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                          {item.gap}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-950 leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {item.detail}
                      </p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-rose-800 font-semibold leading-tight">
                        {item.impact}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Closing Statement Callout Banner */}
            <div className="mt-12 rounded-2xl border-2 border-amber-300 bg-[#fffdf7] p-6 sm:p-8 text-center max-w-3xl mx-auto shadow-xs">
              <p className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
                “More leads alone will not solve the problem. You need the right parents,
                a clear follow-up process and an admission-focused campaign.”
              </p>
              <p className="mt-2.5 text-xs font-bold text-amber-900 uppercase tracking-widest">
                — The Clever Crow Admission Growth Method
              </p>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- */}
        {/* 8. FREQUENTLY ASKED QUESTIONS (FAQ) */}
        {/* ----------------------------------------------------------- */}
        <section id="faq" className="py-16 sm:py-24 bg-[#faf8f5] border-b border-slate-200">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block rounded-full bg-slate-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-800 border border-slate-200 mb-3">
                Direct Answers
              </span>
              <h2 className="text-xl min-[390px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight whitespace-nowrap text-center mx-auto">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-base text-slate-600 font-normal">
                Transparent information on how we work with preschool and daycare owners.
              </p>
            </div>

            <div className="space-y-3.5">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs transition"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:text-amber-800 transition cursor-pointer"
                    >
                      <span className="font-bold text-base sm:text-lg text-slate-900">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-amber-600 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 font-normal">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- */}
        {/* 9. FINAL CTA (Refined, Non-Gimmicky Banner) */}
        {/* ----------------------------------------------------------- */}
        <section className="py-20 sm:py-24 bg-[#0a1224] text-white text-center relative overflow-hidden">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
            <span className="inline-block rounded-full bg-amber-400/20 px-4 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 border border-amber-400/30">
              Fill Your Vacant Seats
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              <span className="sm:block">Your Next Admissions Could Be</span>
              <span className="sm:block">Coming From Parents Nearby</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Let’s identify what is stopping your preschool from generating and converting
              more admission enquiries.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={PHONE_HREF}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#f4c542] hover:brightness-105 text-slate-950 font-black text-base px-8 py-3.5 shadow-md transition cursor-pointer"
              >
                <Phone className="w-5 h-5" />
                <span>Call {PHONE_NUMBER}</span>
              </a>

              <a
                href={WHATSAPP_EXPERT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base px-7 py-3.5 shadow-sm transition"
              >
                <FaWhatsapp className="w-5 h-5" />
                <span>Chat With an Admission Expert</span>
              </a>
            </div>

            <p className="text-xs text-slate-400 pt-2 font-medium">
              Zero obligation • Custom 3-5 km catchment analysis • Built specifically for preschool owners
            </p>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>

      {/* Floating WhatsApp Action Button */}
      <a
        href={WHATSAPP_EXPERT_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-xl hover:bg-emerald-700 hover:scale-105 active:scale-95 transition duration-200"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="w-6 h-6 text-white" />
        <span className="hidden sm:inline">Chat With Admission Expert</span>
      </a>
    </main>
  );
}
