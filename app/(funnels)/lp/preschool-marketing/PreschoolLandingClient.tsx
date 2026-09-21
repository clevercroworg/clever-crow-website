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
  CheckCircle2,
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
  ArrowUpRight
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
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

const THREE_STEP_SYSTEM = [
  {
    step: "Step 01",
    phase: "Hyperlocal Awareness",
    title: "Reach Nearby Parents",
    description:
      "Preschool choice is strictly hyperlocal. We reach families living within a tight 3 to 5 km radius of your campus using pinpoint geographic and demographic targeting.",
    features: [
      "Local Meta advertising (Facebook & Instagram Feed + Story campaigns)",
      "Radius-bounded geo-fencing focused on parents with toddlers & young kids (ages 1.5 - 6)",
      "Admission-focused creatives showcasing infrastructure, hygiene, safety, and curriculum",
      "Google Search & Google Maps visibility for high-intent 'preschool near me' searches",
    ],
    highlight: "Zero ad spend wasted on long-distance parents",
  },
  {
    step: "Step 02",
    phase: "High-Intent Inflow",
    title: "Generate Qualified Enquiries",
    description:
      "We replace high-friction long forms with direct WhatsApp funnels and high-speed mobile landing pages that capture genuine parent intent immediately.",
    features: [
      "Direct Click-to-WhatsApp admission campaigns with automated conversational greetings",
      "High-converting, mobile-first landing pages tailored to each program (Playgroup, Nursery, Daycare)",
      "Parent qualification filters (child's age, target academic session, program requirement)",
      "Enquiry tracking and instant routing to your center counselor or director",
    ],
    highlight: "Pre-qualified parents, not casual clickers",
  },
  {
    step: "Step 03",
    phase: "Enrolment Engine",
    title: "Convert Enquiries Into Admissions",
    description:
      "Generating parent enquiries is only half the battle. We systematize your admission desk follow-ups to maximize campus visit show-ups and close confirmed enrolments.",
    features: [
      "Proven WhatsApp response templates & counselor phone scripts",
      "Structured 5-touch follow-up sequences that revive hesitant parents",
      "Campus-visit booking architecture with automated calendar reminders",
      "Lead status tracking, visit conversion analytics, and transparent admission reporting",
    ],
    highlight: "Predictable conversion from enquiry to confirmed seat",
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
    logo: "/images/logos/kautilya.webp",
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
    logo: "/images/logos/klay.png",
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
    logo: "/images/logos/maplebear.png",
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
    logo: "/images/logos/kangarookids.svg",
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
    logo: "/images/logos/littlemillennium.png",
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
    logo: "/images/logos/bgsnps.png",
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
    logo: "/images/logos/iamyello.svg",
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
    logo: "/images/logos/vishwavidyapeeth.webp",
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
    logo: "/images/logos/kidscastle.png",
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
    logo: "/images/logos/timekids.png",
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
    logo: "/images/logos/pepschool.webp",
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
    logo: "/images/logos/ampasishya.png",
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
    logo: "/images/logos/mylittleberries.png",
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

const DELIVERABLE_PILLARS = [
  {
    pillar: "Pillar 1: Hyperlocal Parent Reach",
    subtitle: "Getting your campus discovered by parents living within 3 to 5 km",
    items: [
      {
        title: "Admission Campaign Strategy",
        desc: "Tailored enrolment roadmap factoring in campus capacity, intake cycles, and nearby competitor preschools.",
      },
      {
        title: "Meta & Google Advertising",
        desc: "Targeted Facebook, Instagram, and Google Search campaigns focused on parents of kids aged 1.5 to 6 years.",
      },
      {
        title: "Static & Video Creatives",
        desc: "Clean, professional banners and short video ads highlighting classroom safety, infrastructure, and care.",
      },
      {
        title: "Local SEO & Google Business Profile",
        desc: "Campus map pin optimization and parent review strategies for top organic ranking on Google Maps.",
      },
    ],
  },
  {
    pillar: "Pillar 2: Enquiry Capture & Digital Funnel",
    subtitle: "Turning parent clicks into qualified phone calls and WhatsApp chats",
    items: [
      {
        title: "Landing-Page Development",
        desc: "High-converting, mobile-first admission pages that convert paid traffic into phone numbers and visits.",
      },
      {
        title: "WhatsApp Enquiry Funnel",
        desc: "Frictionless Click-to-WhatsApp setups that let parents connect with your admissions desk in one tap.",
      },
      {
        title: "Lead Qualification Process",
        desc: "Clear criteria to capture child age, target grade (Playgroup, Nursery, Jr/Sr KG), and joining date.",
      },
      {
        title: "Website Improvement",
        desc: "Conversion-rate audits and enhancements for your existing school website to eliminate drop-offs.",
      },
    ],
  },
  {
    pillar: "Pillar 3: Conversion & Admission Operations",
    subtitle: "Empowering your counselors to turn enquiries into confirmed admissions",
    items: [
      {
        title: "Follow-Up Message Templates",
        desc: "Copy-paste WhatsApp scripts for brochure sharing, campus visit invites, reminders, and fee handling.",
      },
      {
        title: "CRM & Admission Automation",
        desc: "Instant routing of new parent leads to center directors and counselors with automated reminders.",
      },
      {
        title: "Performance Reporting",
        desc: "Transparent dashboards showing ad spend, enquiries, booked campus visits, and cost per enrolled child.",
      },
    ],
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
// Component: Modal Form for Instant Audit
// -------------------------------------------------------------

function AuditModal({
  isOpen,
  onClose,
  prefilledGoal = "Fill Vacant Seats",
}: {
  isOpen: boolean;
  onClose: () => void;
  prefilledGoal?: string;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [location, setLocation] = useState("");
  const [centerType, setCenterType] = useState("Standalone Preschool");
  const [goal, setGoal] = useState(prefilledGoal);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !schoolName) {
      setStatusMsg("Please enter your name, phone number, and preschool name.");
      return;
    }
    setLoading(true);
    setStatusMsg("");

    try {
      const currentUrl = typeof window !== "undefined" ? window.location.href : "";
      const message = `Preschool Admission Growth Audit Request (Modal Form):
- Preschool/Daycare: ${schoolName}
- City & Locality: ${location || "Not specified"}
- Center Type: ${centerType}
- Primary Objective: ${goal}
- Landing Page URL: ${currentUrl}`;

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          company: schoolName,
          service: "Preschool Admission Growth Audit",
          message,
          source: "Preschool Admission Landing Page (Audit Modal)",
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to submit. Please try again.");
      }

      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "conversion", {
          send_to: "AW-17335403082/YwV4CJ-q_e8YEPq9me49",
        });
        (window as any).gtag("event", "GenerateLead", {
          event_category: "Preschool Admission Audit",
          event_label: "Audit Modal Submit",
        });
      }

      onClose();
      router.push("/thank-you");
    } catch (err: any) {
      setStatusMsg(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 z-10 my-8">
        <button
          type="button"
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-5">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold uppercase tracking-wider mb-2">
            100% Free • No Obligation
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Request Your Admission Growth Audit
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            We&apos;ll review your current admission process and identify practical opportunities to generate and convert more parent enquiries.
          </p>
        </div>

        <form className="space-y-3.5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Your Name & Role *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Shalini Sharma (Center Director / Owner)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                WhatsApp / Phone *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="director@preschool.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Preschool / Daycare Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Maple Tree Montessori"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                City & Locality *
              </label>
              <input
                type="text"
                placeholder="e.g. Whitefield, Bengaluru"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Center Setup
              </label>
              <select
                value={centerType}
                onChange={(e) => setCenterType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 transition"
              >
                <option value="Standalone Preschool">Standalone Preschool</option>
                <option value="Franchise Branch">Franchise Branch</option>
                <option value="Multi-Center Group">Multi-Center / Chain</option>
                <option value="Daycare & Playgroup">Daycare & Playgroup</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Primary Goal
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 transition"
              >
                <option value="Fill Vacant Seats">Fill Vacant Seats</option>
                <option value="Book More Campus Visits">Book More Campus Visits</option>
                <option value="Fix WhatsApp Follow-ups">Fix WhatsApp Follow-ups</option>
                <option value="Launch New Academic Year">New Academic Year</option>
                <option value="Expand Daycare Enrollment">Expand Daycare Enrollment</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 px-6 rounded-xl bg-[#f4c542] hover:brightness-105 active:scale-[0.99] text-slate-950 font-black text-sm sm:text-base shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Preparing Audit Request...</span>
              </>
            ) : (
              <>
                <span>Request My Free Audit</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {statusMsg && (
            <p className="text-xs text-rose-600 text-center mt-2 font-semibold">{statusMsg}</p>
          )}

          <p className="text-[11px] text-slate-500 text-center pt-1">
            🔒 100% Confidential. Custom neighborhood assessment delivered within 24-48 hours.
          </p>
        </form>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Main Preschool Landing Page Client Component
// -------------------------------------------------------------

export default function PreschoolLandingClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const openAuditModal = () => setIsModalOpen(true);

  const scrollToAuditSection = () => {
    const el = document.getElementById("free-audit-offer");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      openAuditModal();
    }
  };

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
          <section
            className="relative pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 bg-gradient-to-b from-[#faf8f5] via-white to-white border-b border-slate-200"
          >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Direct Educational Marketing Copy */}
              <div className="lg:col-span-7 space-y-6 text-left">
                {/* Eyebrow / Category Tag */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-950 text-white text-[11px] font-black tracking-wider uppercase shadow-xs">
                    <School className="w-3.5 h-3.5 text-[#f4c542]" />
                    <span>Education Growth</span>
                  </div>
                  <span className="hidden sm:inline-block h-3.5 w-px bg-slate-300" />
                  <span className="text-xs sm:text-[13px] font-bold text-slate-800 tracking-tight">
                    Preschool & Daycare Admission System
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black text-slate-950 tracking-tight leading-[1.12]">
                  Turn Parent Enquiries Into{" "}
                  <span className="text-amber-800 underline decoration-[#f4c542] decoration-4 underline-offset-4">
                    Preschool Enrolments
                  </span>
                </h1>

                {/* Supporting Copy */}
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl font-normal">
                  We help preschools and daycare centres reach nearby parents, generate
                  qualified admission enquiries and improve follow-ups—so more families
                  book visits and complete admissions.
                </p>

                {/* Trust Line */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex -space-x-1.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full border-2 border-white bg-amber-400 text-slate-950 flex items-center justify-center text-[10px] font-black shadow-2xs"
                      >
                        ✓
                      </div>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800">
                    Experience supporting 25+ preschools and daycare centres
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                  <button
                    onClick={scrollToAuditSection}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f4c542] hover:brightness-105 active:scale-[0.99] text-slate-950 font-black text-base px-7 py-3.5 shadow-sm transition group cursor-pointer"
                  >
                    <span>Get a Free Admission Growth Audit</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <a
                    href={WHATSAPP_EXPERT_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm sm:text-base px-6 py-3.5 transition shadow-2xs"
                  >
                    <FaWhatsapp className="w-5 h-5 text-emerald-600" />
                    <span>Chat With an Admission Expert</span>
                  </a>
                </div>

                {/* Assurance Points */}
                <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-600 font-medium border-t border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    3-5 km Radius Targeting
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    WhatsApp Follow-Up Scripts
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Campus Visit Scheduling
                  </span>
                </div>
              </div>

              {/* Right Column: Clean Editorial Photo Showcase */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-slate-200/90 bg-white p-3 shadow-lg">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                    <Image
                      src="/images/preschool-director-parents.jpg"
                      alt="Preschool Center Director consulting with prospective parents in an admission office"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* Clean Editorial Caption Strip */}
                  <div className="p-4 bg-slate-50 rounded-2xl mt-3 flex items-center justify-between border border-slate-100">
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        Preschool Admission Consultation
                      </p>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Equipping directors to turn parent visits into confirmed admissions
                      </p>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 shrink-0 ml-3">
                      Admission Growth
                    </span>
                  </div>
                </div>
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
        {/* 2. PROBLEM SECTION (Restructured: Admission Friction Points) */}
        {/* ----------------------------------------------------------- */}
        <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-block rounded-full bg-rose-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-rose-700 border border-rose-200 mb-3">
                The Admission Bottleneck
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
                Getting Enquiries, But Not Enough Enrolments?
              </h2>
              <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
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
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-amber-400 hover:shadow-sm transition flex flex-col justify-between"
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
        {/* 3. THE SOLUTION (3-Step Growth System) */}
        {/* ----------------------------------------------------------- */}
        <section className="py-16 sm:py-24 bg-[#faf8f5] border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-900 border border-amber-200 mb-3">
                Proven Methodology
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
                A Complete Preschool Admission Growth System
              </h2>
              <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                A structured, repeatable framework engineered specifically to bridge the
                gap between neighborhood parent impressions and paid preschool enrolments.
              </p>
            </div>

            {/* 3 Step Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {THREE_STEP_SYSTEM.map((step) => (
                <div
                  key={step.step}
                  className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-xs hover:border-amber-400 hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                        {step.step}
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        {step.phase}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                      {step.description}
                    </p>

                    <div className="space-y-3 pt-1">
                      {step.features.map((feat, fidx) => (
                        <div key={fidx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-slate-800 leading-snug font-medium">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100">
                    <span className="inline-block text-xs font-bold text-amber-900 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                      ★ {step.highlight}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={scrollToAuditSection}
                className="inline-flex items-center gap-2 rounded-xl bg-[#f4c542] hover:brightness-105 px-8 py-3.5 text-sm sm:text-base font-black text-slate-950 shadow-sm transition cursor-pointer"
              >
                <span>Audit Your Admission Process</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- */}
        {/* 4. HOW IT WORKS (Timeline) */}
        {/* ----------------------------------------------------------- */}
        <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 border border-emerald-200 mb-3">
                Execution Roadmap
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
                From Campaign Launch to Enrolment
              </h2>
              <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                A seamless 5-step operational rollout designed to get qualified parent
                enquiries flowing without disruption to your daily school schedule.
              </p>
            </div>

            {/* 5 Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {HOW_IT_WORKS_STEPS.map((step) => (
                <div
                  key={step.stepNum}
                  className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 flex flex-col justify-between hover:bg-white hover:border-amber-400 hover:shadow-xs transition"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center">
                        {step.stepNum}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
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
        {/* 5. OUR WORK / CLIENT PORTFOLIO SECTION */}
        {/* ----------------------------------------------------------- */}
        <section id="our-work" className="py-20 sm:py-28 bg-[#faf8f5] border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-950 text-white text-[11px] font-black tracking-wider uppercase shadow-xs mb-3">
                <School className="w-3.5 h-3.5 text-[#f4c542]" />
                <span>Featured Client Portfolio</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
                Preschools & Schools We Work With
              </h2>
              <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
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
              <button
                onClick={openAuditModal}
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#f4c542] hover:brightness-105 text-slate-950 font-black text-sm px-6 py-3 shadow-xs transition cursor-pointer"
              >
                <span>Request Free Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- */}
        {/* 6. DELIVERABLES SECTION (Capabilities, Not Fixed Packages) */}
        {/* ----------------------------------------------------------- */}
        <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-block rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-800 border border-blue-200 mb-3">
                Full Scope of Management
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
                What We Can Manage for Your Preschool
              </h2>
              <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                We don’t force rigid cookie-cutter packages. We manage the exact combination of
                capabilities required to fill your vacant seats.
              </p>
            </div>

            {/* 3 Structured Capability Pillars */}
            <div className="space-y-8">
              {DELIVERABLE_PILLARS.map((pillar, pIdx) => (
                <div
                  key={pIdx}
                  className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8"
                >
                  <div className="mb-6">
                    <h3 className="text-xl font-black text-slate-900">
                      {pillar.pillar}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      {pillar.subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {pillar.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between shadow-2xs hover:border-amber-400 transition"
                      >
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                        <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Managed In Scope</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- */}
        {/* 7. TALK TO AN ADMISSION EXPERT / CONSULTATION SECTION */}
        {/* ----------------------------------------------------------- */}
        <section
          id="free-audit-offer"
          className="py-12 sm:py-16 bg-[#faf8f5] border-b border-slate-200 scroll-mt-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 lg:p-12 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Column: Scope & Value */}
                <div className="lg:col-span-7 space-y-4 text-left">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-950 text-white text-[11px] font-black tracking-wider uppercase shadow-xs">
                    <School className="w-3.5 h-3.5 text-[#f4c542]" />
                    <span>1-on-1 Growth Consultation</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-snug">
                    Speak Directly With a Preschool Admission Strategist
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
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-7 shadow-xs space-y-4 text-center sm:text-left">
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
                      <button
                        onClick={openAuditModal}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#f4c542] hover:brightness-105 active:scale-[0.99] text-slate-950 font-black text-sm px-6 py-3 transition cursor-pointer"
                      >
                        <span>Schedule Growth Audit Call</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
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
        {/* 8. FREQUENTLY ASKED QUESTIONS (FAQ) */}
        {/* ----------------------------------------------------------- */}
        <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block rounded-full bg-slate-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-800 border border-slate-200 mb-3">
                Direct Answers
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
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

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Your Next Admissions Could Be Coming From Parents Nearby
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Let’s identify what is stopping your preschool from generating and converting
              more admission enquiries.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={openAuditModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#f4c542] hover:brightness-105 text-slate-950 font-black text-base px-8 py-3.5 shadow-md transition cursor-pointer"
              >
                <span>Request My Free Audit</span>
                <ArrowRight className="w-5 h-5" />
              </button>

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

      {/* Instant Audit Modal */}
      <AuditModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
