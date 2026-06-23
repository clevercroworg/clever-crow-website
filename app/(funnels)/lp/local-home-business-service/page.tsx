"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { 
  Phone, Award, MapPin, Calendar, Users, Globe, Check, 
  Loader2, HelpCircle, ChevronDown, CheckCircle2, ArrowRight,
  Target, TrendingUp, Shield, Zap, Sparkles, MessageCircle, BarChart3
} from "lucide-react";

export default function LocalServicesLandingPage() {
  const router = useRouter();

  const trackWhatsAppClick = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "click", {
        event_category: "Contact",
        event_label: "WhatsApp Local Services Click",
        whatsapp_number: "09986389444"
      });
    }
  };

  const trackCallClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined") {
      if ((window as any).gtag_report_conversion) {
        e.preventDefault();
        (window as any).gtag_report_conversion(e.currentTarget.href);
      } else if ((window as any).gtag) {
        (window as any).gtag("event", "conversion", {
          send_to: "AW-17335403082/ul0ECKr5i_QaEMqElcpA",
        });
        (window as any).gtag("event", "click", {
          event_category: "Contact",
          event_label: "Phone Local Services Click",
          phone_number: "09986389444"
        });
      }
    }
  };

  const [selectedPackage, setSelectedPackage] = useState("");
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Form state
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    businessName: "",
    businessCategory: "",
    serviceArea: "",
    runningAds: "",
    budget: "",
    helpNeeded: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const formRef = useRef<HTMLDivElement>(null);
  const packagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement | null>) => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePackageSelect = (pkgName: string) => {
    setSelectedPackage(pkgName);
    scrollToSection(formRef);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.phone) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const payload = {
        name: formState.name,
        phone: formState.phone,
        company: `${formState.businessName || "Local Service Business"} | Category: ${formState.businessCategory} | Area: ${formState.serviceArea} | Running Ads: ${formState.runningAds}`,
        service: `Lead Gen for Local Services`,
        budget: formState.budget,
        timeline: `Preferred Package: ${selectedPackage || "Not Selected"}`,
        message: formState.helpNeeded || "Requesting Free Growth Review",
        source: "LP/Local-Home-Business-Service"
      };

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "conversion", {
            send_to: "AW-17335403082/YwV4CJ-q_e8YEPq9me49",
          });
          (window as any).gtag("event", "GenerateLead", {
            event_category: "Leads",
            event_label: "Lead Form Submit"
          });
        }

        setSubmitStatus("success");
        setFormState({
          name: "",
          phone: "",
          businessName: "",
          businessCategory: "",
          serviceArea: "",
          runningAds: "",
          budget: "",
          helpNeeded: ""
        });
        setTimeout(() => {
          router.push("/thank-you");
        }, 1200);
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const businessCategories = [
    "Cleaning Services",
    "Pest Control Companies",
    "Painting Services",
    "Repair & Maintenance Services",
    "AC / Appliance Repair",
    "Packers & Movers",
    "Plumbing & Electrical Services",
    "CCTV / Security Installation",
    "Property Maintenance",
    "Home Renovation Services",
    "Other Local Service Businesses"
  ];

  const setupDeliverables = [
    { 
      title: "Meta Ads", 
      desc: "Reach the right local audience on Facebook and Instagram with visually targeted ad sets.", 
      icon: Target 
    },
    { 
      title: "Google Ads", 
      desc: "Show your business when customers are actively searching for your specific services on Google.", 
      icon: SearchIcon 
    },
    { 
      title: "WhatsApp Follow-up", 
      desc: "Create a better, automated enquiry flow so incoming leads can be followed up quickly.", 
      icon: MessageCircle 
    },
    { 
      title: "Lead Tracking", 
      desc: "Track exactly where leads are coming from, cost-per-lead, and which campaigns are performing.", 
      icon: BarChart3 
    },
    { 
      title: "Creative Strategy", 
      desc: "Use high-converting, service-focused ad creatives designed to make local prospects click and call.", 
      icon: Sparkles 
    }
  ];

  const serviceBenefits = [
    "More local enquiries",
    "More service calls",
    "Better quality leads",
    "Better follow-up process",
    "Improved visibility in your target location",
    "Clear campaign reporting",
    "Better use of your ad budget"
  ];

  const campaignSteps = [
    {
      num: "1",
      title: "Business Review",
      desc: "We understand your service, location, target customers and current marketing setups."
    },
    {
      num: "2",
      title: "Campaign Planning",
      desc: "We decide the right strategic mix of Meta Ads, Google Ads and WhatsApp follow-up."
    },
    {
      num: "3",
      title: "Ad Creative Setup",
      desc: "We design clear, service-focused visual assets and ad copies built to generate high-intent enquiries."
    },
    {
      num: "4",
      title: "Lead Campaign Launch",
      desc: "We launch lead generation campaigns targeting local users actively seeking or in need of your services."
    },
    {
      num: "5",
      title: "Follow-up & Optimisation",
      desc: "We constantly review lead quality, exclude bad keyword matches, and optimise ad budget to reduce wasted leads."
    }
  ];

  const faqs = [
    {
      q: "Do I need a website to start?",
      a: "A website is helpful, but not compulsory. We can start with Meta lead forms or WhatsApp campaigns. For Google Ads, a landing page is recommended for better conversion rates."
    },
    {
      q: "Is ad budget included in the monthly fee?",
      a: "No. The monthly fee is for campaign management, creatives, copywriting, strategy, and optimisation. Ad budget is paid separately to Meta and Google."
    },
    {
      q: "How much ad budget should I start with?",
      a: "Ad budget depends on your business category, target location, competition, and lead volume goals. We will suggest a suitable starting budget after reviewing your business details."
    },
    {
      q: "Which businesses is this best for?",
      a: "This is best for cleaning, pest control, painting, repair, maintenance, packers & movers, AC repair, and other local service providers depending on regular call/message bookings."
    },
    {
      q: "Can you guarantee leads?",
      a: "We do not give fake guarantees. We build and optimise campaigns to improve lead volume and lead quality based on your service, city, budget, and competition."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFB] text-zinc-900 font-sans selection:bg-yellow-400 selection:text-zinc-950">
      
      {/* --- HEADER --- */}
      <header 
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 bg-white/95 border-b border-zinc-100 shadow-xs backdrop-blur-md ${
          isHeaderScrolled ? "py-3" : "py-4.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <Image 
              src="/logo-dark.svg" 
              alt="Clever Crow Logo" 
              width={140} 
              height={40} 
              className="h-8 w-auto sm:h-9"
              priority 
            />
          </a>
          
          <div className="flex items-center gap-3">
            <a 
              href="tel:+919986389444" 
              onClick={trackCallClick}
              className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-zinc-50 border border-zinc-200 text-zinc-800 hover:bg-yellow-400 hover:border-yellow-400 hover:text-zinc-950 transition-colors shadow-xs"
              aria-label="Call Us"
            >
              <Phone className="h-4.5 w-4.5" />
            </a>
            
            <a 
              href="https://wa.me/919986389444?text=Hi%20Clever%20Crow%2C%20I%27m%20interested%20in%20local%20service%20business%20marketing%20services.%20(Ref:%20LP/Local-Services)" 
              onClick={trackWhatsAppClick}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors shadow-xs"
              aria-label="Chat on WhatsApp"
            >
              <FaWhatsapp className="h-5 w-5" />
            </a>
            
            <button 
              onClick={() => scrollToSection(formRef)}
              className="hidden md:inline-flex px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-yellow-400 hover:bg-yellow-500 text-zinc-950 border border-yellow-400 hover:border-yellow-500 transition-all cursor-pointer shadow-sm"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION (Dark Section 1) --- */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-zinc-950 text-white">
        {/* Background Image & Overlays */}
        {/* Mobile Background */}
        <div className="absolute inset-0 z-0 lg:hidden">
          <Image 
            src="/images/local_services_hero_mobile.png" 
            alt="Local Home Services Clever Crow Marketing Mobile" 
            fill 
            className="object-cover opacity-40"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-zinc-950" />
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#eab308_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>

        {/* Desktop Background */}
        <div className="absolute inset-0 z-0 hidden lg:block">
          <Image 
            src="/images/local_services_hero_desktop.png" 
            alt="Local Home Services Clever Crow Marketing Desktop" 
            fill 
            className="object-cover opacity-55"
            sizes="100vw"
            priority
          />
          {/* Left-to-right gradient to keep text readable on the left but keep the image on the right fully clear */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent" />
          {/* Subtle top-to-bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-zinc-950" />
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#eab308_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>

        {/* Soft yellow radial background glow */}
        <div className="absolute -top-40 right-0 w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="absolute -bottom-40 left-0 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-4xl lg:max-w-3xl space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 select-none">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-300">Google & Meta Ads Strategy</span>
            </div>

            <div className="space-y-4 w-full">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-white">
                Get More Calls, Enquiries & Bookings for Your <span className="text-yellow-400">Local Service Business</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl font-medium text-zinc-300 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
                We help cleaning, pest control, painting, repair, maintenance and other local service businesses generate quality leads through Meta Ads, Google Ads and WhatsApp follow-up.
              </p>
            </div>

            {/* Dual CTAs & Pricing info */}
            <div className="space-y-3 pt-2 w-full">
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <button 
                  onClick={() => scrollToSection(formRef)}
                  className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-extrabold uppercase tracking-wider bg-yellow-400 hover:bg-yellow-500 text-zinc-950 border border-yellow-400 hover:border-yellow-500 transition-all shadow-lg hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Enquire Now</span>
                  <ArrowRight className="h-4.5 w-4.5" />
                </button>
                <button 
                  onClick={() => scrollToSection(packagesRef)}
                  className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer flex items-center justify-center"
                >
                  View Lead Plans
                </button>
              </div>
            </div>

            {/* Hero Highlights */}
            <div className="pt-8 border-t border-white/10 w-full">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  "Meta Ads",
                  "Google Ads",
                  "WhatsApp Follow-up",
                  "Lead Tracking",
                  "More Local Enquiries"
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-yellow-400/30 transition-all hover:bg-white/[0.07]"
                  >
                    <Check className="h-4 w-4 text-yellow-400 shrink-0" />
                    <span className="text-xs font-bold text-zinc-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- WHO THIS IS FOR (Light Section 1) --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-yellow-600 block">Who This Is For</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900">
              Built for Local Service Businesses That Need Regular Enquiries
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              This marketing plan is ideal for businesses that depend on calls, WhatsApp messages and booking enquiries to keep their operations busy.
            </p>
          </div>

          {/* Grid of Business Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {businessCategories.map((category, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-5 rounded-3xl bg-zinc-50 border border-zinc-100 hover:border-yellow-400/40 hover:bg-white transition-all shadow-xs group"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-600 group-hover:bg-yellow-400 group-hover:text-zinc-950 transition-all">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-zinc-900 group-hover:text-yellow-600 transition-colors">
                    {category}
                  </h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- SOLUTION SECTION (Dark Section 2) --- */}
      <section className="py-20 bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-yellow-400 block">Lead Generation System</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              We Build Lead Generation Systems for Local Services
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              We don’t just run ads. We create a simple, integrated lead generation flow that helps your business get more enquiries and follow up faster.
            </p>
          </div>

          {/* What We Set Up Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {setupDeliverables.map((item, index) => (
              <div 
                key={index}
                className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-yellow-400/30 transition-all hover:bg-zinc-900 group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-zinc-950 transition-all mb-5">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-black text-white mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- SERVICE BENEFITS (Light Section 2) --- */}
      <section className="py-20 bg-zinc-50 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-yellow-600 block">Campaign Benefits</span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900">
                What You Can Expect From Our Marketing Setup
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                By setting up campaigns tailored strictly to local search intent and visual geo-targeting, we ensure your daily budget drives tangible service volume.
              </p>
              <div className="pt-4">
                <button 
                  onClick={() => scrollToSection(formRef)}
                  className="px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider bg-yellow-400 hover:bg-yellow-500 text-zinc-950 transition-all cursor-pointer shadow-md inline-flex items-center gap-2"
                >
                  <span>Request Strategy Audit</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {serviceBenefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-zinc-100 shadow-xs"
                >
                  <Check className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                  <span className="text-sm font-bold text-zinc-800 leading-tight">{benefit}</span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* --- CAMPAIGN APPROACH --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-yellow-600 block">Our Process</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900">
              How We Run Your Campaign Step-by-Step
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              We guide you through a structured plan to ensure your advertisements reach local search queries and convert efficiently.
            </p>
          </div>

          {/* Timeline steps */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {campaignSteps.map((step, index) => (
              <div key={index} className="space-y-4 relative group">
                <div className="flex items-center justify-between md:block">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-yellow-400 font-black text-lg group-hover:bg-yellow-400 group-hover:text-zinc-950 transition-all shadow-md">
                    {step.num}
                  </div>
                  {index < campaignSteps.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-12 right-0 h-[2px] bg-zinc-100 z-0 group-hover:bg-yellow-200 transition-colors" />
                  )}
                </div>
                <h3 className="text-base font-black text-zinc-900 pt-2">{step.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- PACKAGES SECTION --- */}
      <section ref={packagesRef} className="py-20 bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-yellow-600 block">Pricing & Management Retainers</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900">
              Select Your Lead Generation Plan
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Choose the package that matches your targeted customer radius and daily enquiry requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Growth Plan */}
            <div className="relative rounded-3xl bg-white border border-zinc-200 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-zinc-900">Growth Plan</h3>
                  <p className="text-xs font-bold text-zinc-400 mt-1">Ideal for starting local service enquiries</p>
                </div>
                <div className="py-4 border-y border-zinc-100">
                  <span className="text-3xl font-black text-zinc-900">₹18,000</span>
                  <span className="text-xs font-bold text-zinc-400">/month</span>
                </div>
                <ul className="space-y-3">
                  {[
                    "Meta Ads campaign management",
                    "Google Ads campaign management",
                    "Lead form / landing page guidance",
                    "4–6 ad creatives per month",
                    "Basic retargeting setup",
                    "WhatsApp enquiry follow-up format",
                    "Weekly campaign optimisation",
                    "Monthly performance report"
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-600 leading-tight">
                      <Check className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-8">
                <button 
                  onClick={() => handlePackageSelect("Growth Plan")}
                  className="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider border border-zinc-200 hover:border-yellow-400 hover:bg-yellow-400 hover:text-zinc-950 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Select Growth Plan</span>
                </button>
              </div>
            </div>

            {/* Scale Plan */}
            <div className="relative rounded-3xl bg-white border-2 border-yellow-400 p-8 shadow-md hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 bg-yellow-400 text-zinc-950 text-[9px] font-black uppercase tracking-wider py-1 px-4 rounded-bl-2xl">
                Most Popular
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-zinc-900">Scale Plan</h3>
                  <p className="text-xs font-bold text-yellow-600 mt-1">Best for scaling volume & detailed tracking</p>
                </div>
                <div className="py-4 border-y border-zinc-100">
                  <span className="text-3xl font-black text-zinc-900">₹30,000</span>
                  <span className="text-xs font-bold text-zinc-400">/month</span>
                </div>
                <ul className="space-y-3">
                  {[
                    "Meta Ads campaign management",
                    "Google Ads campaign management",
                    "Multiple campaign structure",
                    "8–10 ad creatives per month",
                    "Retargeting campaign setup",
                    "Landing page improvement guidance",
                    "WhatsApp lead follow-up flow",
                    "Lead quality tracking sheet",
                    "Weekly performance review",
                    "Monthly strategy report"
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-600 leading-tight">
                      <Check className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-8">
                <button 
                  onClick={() => handlePackageSelect("Scale Plan")}
                  className="w-full py-3.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-yellow-400 hover:bg-yellow-500 text-zinc-950 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Select Scale Plan</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- WHY CHOOSE US (Dark Section 3) --- */}
      <section className="py-20 bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-yellow-400 block">Why Speed Matters</span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-white">
                Why Local Service Businesses Need a Proper Lead System
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                For service businesses, speed matters. When a customer searches for pest control, cleaning, painting, repair or any other local service, they usually contact multiple providers.
              </p>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                If your ad, form and WhatsApp follow-up are not connected properly, leads can get wasted before your team even gets to them. We help you create a simple system where enquiries come in, get tracked and can be followed up instantly.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
              <h3 className="text-lg font-black text-yellow-400">Core Performance Pillars</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white">Prevent Lead Wasting</h4>
                    <p className="text-xs text-zinc-400 mt-1">Attract real local customers and route them immediately into your sales inbox.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white">Instant Response setup</h4>
                    <p className="text-xs text-zinc-400 mt-1">Connect ads to direct phone triggers or clean WhatsApp templates for 2-minute follow-ups.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- LEAD FORM SECTION --- */}
      <section ref={formRef} className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="relative rounded-[2.5rem] border border-zinc-200 bg-[#FDFDFB] p-6 sm:p-10 shadow-xs">
            
            <div className="text-center space-y-3 mb-8">
              <span className="text-xs font-extrabold uppercase tracking-widest text-yellow-600 block">Growth Consultation</span>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">
                Request Your Free Growth Review
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
                Tell us about your business and our team will suggest what type of lead generation campaign can work for your service category and target location.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2 block">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={handleInputChange}
                    placeholder="Enter name"
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-3.5 text-sm font-semibold text-zinc-800 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/10 transition-all"
                  />
                </div>
                
                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2 block">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formState.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-3.5 text-sm font-semibold text-zinc-800 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/10 transition-all"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Business Name */}
                <div className="space-y-1.5">
                  <label htmlFor="businessName" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2 block">
                    Business Name
                  </label>
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    value={formState.businessName}
                    onChange={handleInputChange}
                    placeholder="Enter business name"
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-3.5 text-sm font-semibold text-zinc-800 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/10 transition-all"
                  />
                </div>

                {/* Business Category */}
                <div className="space-y-1.5">
                  <label htmlFor="businessCategory" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2 block">
                    Business Category *
                  </label>
                  <div className="relative">
                    <select
                      id="businessCategory"
                      name="businessCategory"
                      required
                      value={formState.businessCategory}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-3.5 text-sm font-semibold text-zinc-800 appearance-none focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/10 transition-all"
                    >
                      <option value="" disabled>Select category...</option>
                      {businessCategories.map((cat, i) => (
                        <option key={i} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                      <ChevronDown size={14} className="stroke-[2.5]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* City / Service Area */}
                <div className="space-y-1.5">
                  <label htmlFor="serviceArea" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2 block">
                    City / Service Area
                  </label>
                  <input
                    id="serviceArea"
                    name="serviceArea"
                    type="text"
                    value={formState.serviceArea}
                    onChange={handleInputChange}
                    placeholder="E.g., Bangalore, Mumbai"
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-3.5 text-sm font-semibold text-zinc-800 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/10 transition-all"
                  />
                </div>

                {/* Running Ads */}
                <div className="space-y-1.5">
                  <label htmlFor="runningAds" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2 block">
                    Are you currently running ads?
                  </label>
                  <div className="relative">
                    <select
                      id="runningAds"
                      name="runningAds"
                      value={formState.runningAds}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-3.5 text-sm font-semibold text-zinc-800 appearance-none focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/10 transition-all"
                    >
                      <option value="">Select...</option>
                      <option value="Yes, on Google & Meta">Yes, on Google & Meta</option>
                      <option value="Yes, Google only">Yes, Google only</option>
                      <option value="Yes, Meta only">Yes, Meta only</option>
                      <option value="No, never">No, never</option>
                      <option value="Tried previously, stopped">Tried previously, stopped</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                      <ChevronDown size={14} className="stroke-[2.5]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly Budget */}
              <div className="space-y-1.5">
                <label htmlFor="budget" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2 block">
                  Monthly Marketing Budget *
                </label>
                <div className="relative">
                  <select
                    id="budget"
                    name="budget"
                    required
                    value={formState.budget}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-3.5 text-sm font-semibold text-zinc-800 appearance-none focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/10 transition-all"
                  >
                    <option value="" disabled>Select marketing budget...</option>
                    <option value="Under ₹15,000/mo">Under ₹15,000/mo</option>
                    <option value="₹15,000 - ₹30,000/mo">₹15,000 - ₹30,000/mo</option>
                    <option value="₹30,000 - ₹60,000/mo">₹30,000 - ₹60,000/mo</option>
                    <option value="₹60,000+/mo">₹60,000+/mo</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                    <ChevronDown size={14} className="stroke-[2.5]" />
                  </div>
                </div>
              </div>

              {/* What do you need help with? */}
              <div className="space-y-1.5">
                <label htmlFor="helpNeeded" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2 block">
                  What do you need help with?
                </label>
                <textarea
                  id="helpNeeded"
                  name="helpNeeded"
                  rows={3}
                  value={formState.helpNeeded}
                  onChange={handleInputChange}
                  placeholder="E.g., we want to target AC repair calls in South Bangalore, etc."
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-3.5 text-sm font-semibold text-zinc-800 placeholder:text-zinc-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/10 transition-all resize-none"
                />
              </div>

              {selectedPackage && (
                <div className="text-xs text-yellow-600 bg-yellow-50 border border-yellow-200/50 rounded-xl p-3 font-semibold">
                  📌 Selected Plan Preference: <span className="font-extrabold">{selectedPackage}</span>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-xs font-bold text-red-500">
                  Something went wrong. Please check required fields and try again.
                </div>
              )}

              {submitStatus === "success" && (
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-xs font-bold text-emerald-600">
                  Enquiry submitted successfully! Redirecting...
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || submitStatus === "success"}
                className="group relative flex w-full items-center justify-center gap-2.5 rounded-2xl bg-yellow-400 px-6 py-4 font-black uppercase tracking-widest text-zinc-950 shadow-md hover:bg-yellow-500 transition-all active:scale-[0.99] disabled:opacity-75 disabled:pointer-events-none overflow-hidden cursor-pointer"
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <span className="relative z-10 text-[12px]">Submit Enquiry</span>
                    <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

            </form>

          </div>

        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-20 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-yellow-600 block">Got Questions?</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index}
                  className="rounded-3xl border border-zinc-200 bg-white overflow-hidden shadow-xs transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-black text-zinc-900 pr-4">{faq.q}</span>
                    <ChevronDown 
                      size={18} 
                      className={`text-zinc-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180 text-yellow-500" : ""
                      }`} 
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 border-t border-zinc-100 pt-4">
                          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">{faq.a}</p>
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

      {/* --- FINAL CTA SECTION (Dark Section 4) --- */}
      <section className="relative py-24 overflow-hidden bg-zinc-950 text-white border-t border-zinc-800">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#eab308_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8 relative z-10">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Ready to Get More Local Service Enquiries?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-2xl mx-auto">
              Start with a focused lead generation plan built for your business category and target location.
            </p>
          </div>

          <div className="pt-2 space-y-4">
            <button 
              onClick={() => scrollToSection(formRef)}
              className="px-10 py-4.5 rounded-full text-sm font-extrabold uppercase tracking-wider bg-yellow-400 hover:bg-yellow-500 text-zinc-950 transition-all shadow-lg hover:scale-[1.02] cursor-pointer inline-flex items-center gap-2"
            >
              <span>Enquire Now</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
              Plans start from ₹18,000/month. Ad budget separate.
            </p>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white py-12 border-t border-zinc-100 text-zinc-500 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex justify-center items-center">
            <Image 
              src="/logo-dark.svg" 
              alt="Clever Crow Logo" 
              width={130} 
              height={36} 
              className="h-7 w-auto opacity-80 hover:opacity-100 transition-opacity" 
            />
          </div>
          <p>© {new Date().getFullYear()} Clever Crow. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}

// Small inline helper component for Search icon in SetupDeliverables
function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
