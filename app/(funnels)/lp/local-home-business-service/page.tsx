"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { 
  Phone, Award, MapPin, Calendar, Users, Globe, Check, 
  Loader2, HelpCircle, ChevronDown, CheckCircle2, ArrowRight,
  Target, TrendingUp, Shield, Zap, Sparkles, MessageCircle, BarChart3,
  Search, Bug, Paintbrush, Wrench, Wind, Truck, Camera, Home, Hammer,
  Briefcase, Instagram
} from "lucide-react";
import homeServicesData from "./home_services_data.json";

const getCategoryCover = (category: string, index: number) => {
  const mapping: { [key: string]: string[] } = {
    "Pest Control": [
      "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587324438673-56c52a0a2df3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590644365607-1c5a519a9a37?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563453392-2d114a84e637?q=80&w=600&auto=format&fit=crop"
    ],
    "Deep Cleaning": [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583907608452-714758a6a4b8?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563453392-1911da0f44f3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603796846097-bee99e4a60c9?q=80&w=600&auto=format&fit=crop"
    ],
    "Packers & Movers": [
      "https://images.unsplash.com/photo-1524522173746-f628baad3644?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595348020949-87cdfcd44174?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501862700950-1894815a4e22?q=80&w=600&auto=format&fit=crop"
    ],
    "Appliance Repair": [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1626886750760-b3052824cf40?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop"
    ],
    "AC Repair & Service": [
      "https://images.unsplash.com/photo-1621905252507-b354bc25edac?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=600&auto=format&fit=crop"
    ],
    "Waterproofing": [
      "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595844730298-b959547b891f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600&auto=format&fit=crop"
    ],
    "Water Purifier Service": [
      "https://images.unsplash.com/photo-1527018601619-a508a2be00cd?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585832770485-e289c25f3c4c?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608220179579-3994874132a7?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518081461904-9d8f136351c2?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?q=80&w=600&auto=format&fit=crop"
    ],
    "Electrical Services": [
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460574283810-2aab119d8511?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558224494-ef8b21880a2b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621905252251-de433604f329?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=600&auto=format&fit=crop"
    ],
    "Plumbing Services": [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607472586893-edb5ca094e7d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542013936693-8848e5740a7a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1609770206529-67d6d4794ed7?q=80&w=600&auto=format&fit=crop"
    ],
    "Balcony Grill": [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=600&auto=format&fit=crop"
    ],
    "Safety Nets": [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598156690779-b0b3ed35fc97?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548345680-f5475ea5df84?q=80&w=600&auto=format&fit=crop"
    ],
    "Solar Services": [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509390219972-e5623db636e1?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542332213-9b5a5a3f8c4c?q=80&w=600&auto=format&fit=crop"
    ]
  };
  const list = mapping[category] || ["https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop"];
  return list[index % list.length];
};

const getInitials = (name: string): string => {
  const clean = name.replace(/services|company|providers|india|unisex|&/gi, "").trim();
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return words[0] ? words[0][0].toUpperCase() : "S";
};

const cleanUrl = (url: string) => {
  if (!url) return "";
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
};

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
  const [selectedCategory, setSelectedCategory] = useState("Electrical Services");
  
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
    { name: "Cleaning Services", icon: Sparkles },
    { name: "Pest Control Companies", icon: Bug },
    { name: "Painting Services", icon: Paintbrush },
    { name: "Repair & Maintenance Services", icon: Wrench },
    { name: "AC / Appliance Repair", icon: Wind },
    { name: "Packers & Movers", icon: Truck },
    { name: "Plumbing & Electrical Services", icon: Zap },
    { name: "CCTV / Security Installation", icon: Camera },
    { name: "Property Maintenance", icon: Home },
    { name: "Home Renovation Services", icon: Hammer },
    { name: "Other Local Service Businesses", icon: Briefcase }
  ];

  const setupDeliverables = [
    { title: "Meta Ads", icon: Target },
    { title: "Google Ads", icon: Search },
    { title: "WhatsApp Follow-up", icon: FaWhatsapp },
    { title: "Lead Tracking", icon: BarChart3 },
    { title: "Social Media", icon: Instagram },
    { title: "Google Maps / GBP", icon: MapPin }
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
              src="/CSS.svg" 
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
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-4xl lg:max-w-3xl gap-6">
            
            <div className="space-y-4 w-full order-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-white">
                Get More Calls & Enquiries for Your <span className="text-yellow-400">Local Service Business</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl font-medium text-zinc-300 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
                We help cleaning, pest control, painting, repair, maintenance and other local service businesses generate quality leads through Meta Ads, Google Ads and WhatsApp follow-up.
              </p>
            </div>

            {/* Dual CTAs & Pricing info */}
            <div className="space-y-3 pt-2 w-full order-4 lg:order-3">
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <a 
                  href="tel:+919986389444"
                  onClick={trackCallClick}
                  className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-extrabold uppercase tracking-wider bg-yellow-400 hover:bg-yellow-500 text-zinc-950 border border-yellow-400 hover:border-yellow-500 transition-all shadow-lg hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
                >
                  <Phone className="h-4.5 w-4.5 shrink-0" />
                  <span>+91 99863 89444</span>
                </a>
                <button 
                  onClick={() => scrollToSection(packagesRef)}
                  className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer flex items-center justify-center"
                >
                  View Pricing
                </button>
              </div>
            </div>

            {/* Hero Highlights */}
            <div className="pt-8 border-t border-white/10 w-full order-3 lg:order-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "12+ Years Experience", icon: Award },
                  { label: "550+ Happy Clients", icon: Users },
                  { label: "Meta & Google Ads", icon: Target },
                  { label: "More Local Enquiries", icon: TrendingUp }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="flex flex-col items-center justify-center text-center gap-3 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-yellow-400/30 transition-all hover:bg-white/[0.07]"
                  >
                    <item.icon className="h-7 w-7 text-yellow-400 shrink-0" />
                    <span className="text-sm sm:text-base font-extrabold text-zinc-100 leading-tight">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- PORTFOLIO SECTION --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-yellow-600 block">Our Reach</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900">
              Featured Home Service Portfolio & Campaigns
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              We help local home service businesses scale their bookings and build a dominant local presence. Filter by category to explore campaigns.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-5xl mx-auto">
            {["All", "Pest Control", "Deep Cleaning", "Packers & Movers", "Appliance Repair", "AC Repair & Service", "Waterproofing", "Water Purifier Service", "Electrical Services", "Plumbing Services", "Balcony Grill", "Safety Nets", "Solar Services"].map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-yellow-400 border-yellow-400 text-zinc-950 shadow-md shadow-yellow-400/20"
                    : "bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeServicesData
              .filter(prospect => selectedCategory === "All" || prospect["Service Category"] === selectedCategory)
              .map((prospect: any, idx: number) => {
                const cover = getCategoryCover(prospect["Service Category"], idx);
                return (
                  <div 
                    key={idx} 
                    className="relative overflow-hidden bg-white rounded-3xl border border-zinc-100 hover:border-yellow-400/30 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col group"
                  >
                    {/* Cover Image */}
                    <div className="h-44 w-full relative overflow-hidden bg-zinc-50 border-b border-zinc-100">
                      <Image 
                        src={cover} 
                        alt={prospect["Business Name"]} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      
                      {/* Overlaid Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-700 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs">
                          {prospect["Service Category"]}
                        </span>
                        <span className="text-[9px] font-bold text-zinc-600 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-yellow-500" /> {prospect["Location / Coverage"]}
                        </span>
                      </div>
                    </div>

                    {/* Logo/Icon Container */}
                    <div className="relative px-6">
                      <div className="absolute -top-7 left-6 h-14 w-14 rounded-2xl bg-white border border-zinc-100 shadow-sm p-1 flex items-center justify-center z-10 overflow-hidden">
                        <div className="w-full h-full rounded-xl bg-gradient-to-br from-yellow-400/20 to-zinc-800/10 flex items-center justify-center">
                          <span className="text-sm font-black text-yellow-600">
                            {getInitials(prospect["Business Name"])}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Info Section */}
                    <div className="pt-9 px-6 pb-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="text-base font-black text-zinc-900 leading-snug group-hover:text-yellow-600 transition-colors duration-300">
                          {prospect["Business Name"]}
                        </h3>
                        {prospect.Notes && (
                          <p className="text-xs text-zinc-500 mt-1.5 line-clamp-2 leading-relaxed">{prospect.Notes}</p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="pt-4 border-t border-zinc-100">
                        <div className="flex flex-col gap-2">
                          {prospect.Instagram && (
                            <a 
                              href={prospect.Instagram}
                              target="_blank"
                              rel="noreferrer"
                              className="w-full py-2 px-4 rounded-xl text-xs font-bold text-zinc-950 bg-yellow-400 hover:bg-yellow-500 transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                            >
                              <Instagram className="h-3.5 w-3.5" /> Instagram Profile
                            </a>
                          )}
                          <div className="flex gap-2">
                            {prospect.Website && (
                              <a 
                                href={cleanUrl(prospect.Website)}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 py-2 px-3 rounded-xl text-[11px] font-bold text-zinc-700 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/80 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <Globe className="h-3.5 w-3.5 text-yellow-500" /> Website
                              </a>
                            )}
                            {prospect["GMB / Google Maps Link"] && (
                              <a 
                                href={prospect["GMB / Google Maps Link"]}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 py-2 px-3 rounded-xl text-[11px] font-bold text-zinc-700 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/80 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <MapPin className="h-3.5 w-3.5 text-yellow-500" /> Google Maps
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {businessCategories.map((category, index) => (
              <div 
                key={index}
                className="flex items-center gap-2.5 sm:gap-4 p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-zinc-50 border border-zinc-100 hover:border-yellow-400/40 hover:bg-white transition-all shadow-xs group"
              >
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-yellow-400/10 text-yellow-600 group-hover:bg-yellow-400 group-hover:text-zinc-950 transition-all">
                  <category.icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-zinc-900 group-hover:text-yellow-600 transition-colors leading-tight">
                    {category.name}
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
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {setupDeliverables.map((item, index) => (
              <div 
                key={index}
                className="flex flex-col items-center justify-center text-center p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-yellow-400/30 transition-all hover:bg-zinc-900 group col-span-1"
              >
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-yellow-400/10 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-zinc-950 transition-all mb-3.5 sm:mb-5">
                  <item.icon className="h-5.5 w-5.5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-xs sm:text-sm md:text-base font-extrabold text-white leading-tight">
                  {item.title}
                </h3>
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
          <div className="flex flex-col md:grid md:grid-cols-5 gap-6 relative">
            {campaignSteps.map((step, index) => (
              <div 
                key={index} 
                className="flex flex-row md:flex-col items-start gap-4 md:gap-0 md:space-y-4 relative group"
              >
                <div className="flex items-center shrink-0">
                  <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-zinc-900 text-yellow-400 font-black text-sm md:text-lg group-hover:bg-yellow-400 group-hover:text-zinc-950 transition-all shadow-md">
                    {step.num}
                  </div>
                  {index < campaignSteps.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-12 right-0 h-[2px] bg-zinc-100 z-0 group-hover:bg-yellow-200 transition-colors" />
                  )}
                </div>
                <div className="space-y-1 md:space-y-2 pt-0.5 md:pt-0">
                  <h3 className="text-sm md:text-base font-black text-zinc-900 leading-tight">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-sm">{step.desc}</p>
                </div>
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
                    "15 ad creatives per month",
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
                    "25 ad creatives per month",
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
                <div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={handleInputChange}
                    placeholder="Full Name *"
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-3.5 text-sm font-semibold text-zinc-800 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/10 transition-all"
                  />
                </div>
                
                {/* Phone Number */}
                <div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formState.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number *"
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-3.5 text-sm font-semibold text-zinc-800 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/10 transition-all"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Business Name */}
                <div>
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    value={formState.businessName}
                    onChange={handleInputChange}
                    placeholder="Business Name"
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-3.5 text-sm font-semibold text-zinc-800 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/10 transition-all"
                  />
                </div>

                {/* Business Category */}
                <div>
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
                        <option key={i} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                      <ChevronDown size={14} className="stroke-[2.5]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* City / Service Area */}
              <div>
                <input
                  id="serviceArea"
                  name="serviceArea"
                  type="text"
                  value={formState.serviceArea}
                  onChange={handleInputChange}
                  placeholder="City / Service Area"
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-3.5 text-sm font-semibold text-zinc-800 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/10 transition-all"
                />
              </div>

              {/* What do you need help with? */}
              <div>
                <textarea
                  id="helpNeeded"
                  name="helpNeeded"
                  rows={3}
                  value={formState.helpNeeded}
                  onChange={handleInputChange}
                  placeholder="What do you need help with? (E.g., target AC repair calls in South Bangalore)"
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
              src="/CSS.svg" 
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
