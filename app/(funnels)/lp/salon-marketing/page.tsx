"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import salonsData from "./salons_data.json";
import { 
  Scissors, Sparkles, CheckCircle2, AlertCircle, Calendar, 
  MapPin, Award, ArrowRight, MessageSquare, Phone, 
  Target, TrendingUp, Instagram, Share2, Eye, 
  HelpCircle, ChevronDown, Check, Loader2, Sparkle,
  Compass, Users, MessageCircle, Globe
} from "lucide-react";

const cleanUrl = (urlStr: string): string => {
  if (!urlStr) return "";
  try {
    const url = new URL(urlStr);
    return `${url.origin}/`;
  } catch (e) {
    return urlStr;
  }
};

export default function SalonLandingPage() {
  const router = useRouter();

  const trackWhatsAppClick = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "click", {
        event_category: "Contact",
        event_label: "WhatsApp Chat Click",
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
          event_label: "Phone Call Click",
          phone_number: "09986389444"
        });
      }
    }
  };

  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Form state
  const [formState, setFormState] = useState({
    name: "",
    salonName: "",
    phone: "",
    location: "",
    instagram: "",
    website: "",
    salonType: "",
    services: "",
    budget: "",
    message: ""
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
    setFormState(prev => ({ ...prev, preferredPackage: pkgName }));
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
      // Map form fields to match /api/leads endpoint
      const payload = {
        name: formState.name,
        phone: formState.phone,
        company: `${formState.salonName} | Location: ${formState.location} | Instagram: ${formState.instagram} | Website: ${formState.website || 'None'} | Type: ${formState.salonType}`,
        service: `Services: ${formState.services}`,
        budget: formState.budget,
        timeline: `Preferred Package: ${selectedPackage || "Not Selected"}`,
        message: formState.message || "No message provided",
        source: "LP/Salon-Marketing"
      };

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Fire Google Ads & Analytics conversion tracking
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
        // Reset form
        setFormState({
          name: "",
          salonName: "",
          phone: "",
          location: "",
          instagram: "",
          website: "",
          salonType: "",
          services: "",
          budget: "",
          message: ""
        });
        setTimeout(() => {
          router.push("/");
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

  // 12 Salon Types (Section 4)
  const salonTypes = [
    { label: "Hair Salons", icon: Scissors },
    { label: "Beauty Salons", icon: Sparkles },
    { label: "Luxury Salons", icon: Sparkle },
    { label: "Unisex Salons", icon: Users },
    { label: "Men's Salons", icon: Scissors },
    { label: "Barbershops", icon: Scissors },
    { label: "Skin Care Studios", icon: Sparkles },
    { label: "Hair Treatment Clinics", icon: Sparkle },
    { label: "Bridal Makeup Studios", icon: Sparkles },
    { label: "Nail Studios", icon: Sparkle },
    { label: "Men's Grooming Studios", icon: Users },
    { label: "Multi-location Brands", icon: MapPin }
  ];

  // Services We Can Promote (Section 5)
  const servicesRow1 = [
    {
      title: "Keratin / Smoothening",
      tagline: "High Ticket Volume",
      desc: "Generate premium smoothing enquiries that drive high-ticket walk-ins.",
      image: "/images/salon/salon_keratin.png",
      badge: "High Margin"
    },
    {
      title: "Hydra Facial",
      tagline: "Esthetic Treatments",
      desc: "Target skin-conscious audiences for advanced aesthetic facial bookings.",
      image: "/images/salon/salon_hydrafacial.png",
      badge: "Trending"
    },
    {
      title: "Bridal Makeup",
      tagline: "Seasonal Scaling",
      desc: "Capture high-value bridal bookings months in advance.",
      image: "/images/salon/salon_bridal.png",
      badge: "High Ticket"
    },
    {
      title: "Hair Colouring",
      tagline: "Fashion Shades",
      desc: "Promote Balayage & Highlights to premium local demographics.",
      image: "/images/salon/salon_haircolour.png",
      badge: "High Demand"
    },
    {
      title: "Hair Extensions",
      tagline: "Luxury Styling",
      desc: "Promote extensions to customers looking for length & volume additions.",
      image: "/images/salon/salon_hairextensions.png",
      badge: "Luxury"
    }
  ];

  const servicesRow2 = [
    {
      title: "Skin Treatments",
      tagline: "Dermaceutic Focus",
      desc: "Target customers looking for anti-acne, glow, or anti-aging skin sessions.",
      image: "/images/salon/salon_skintreatment.png",
      badge: "Premium"
    },
    {
      title: "Men’s Grooming",
      tagline: "Sharp Shaves",
      desc: "Promote haircut bundles, beard styling & premium grooming.",
      image: "/images/salon/salon_mengrooming.png",
      badge: "Frequent Visit"
    },
    {
      title: "Nail Services",
      tagline: "Nail Art & Extensions",
      desc: "Acquire loyal nail art customers who booking refills every 3 weeks.",
      image: "/images/salon/salon_nailart.png",
      badge: "High Repeat"
    },
    {
      title: "Membership Offers",
      tagline: "Recurring Cashflow",
      desc: "Promote salon memberships & advance loyalty plans to lock-in clients.",
      image: "/images/salon/salon_membership.png",
      badge: "Retention"
    },
    {
      title: "Festival Packages",
      tagline: "Seasonal Campaigns",
      desc: "Capitalize on festive rushes (Diwali, Eid, weddings) with custom campaigns.",
      image: "/images/salon/salon_festival.png",
      badge: "Viral"
    }
  ];

  // 12 Deliverables what we handle (Section 3)
  const solutionsWeHandle = [
    { title: "Social Media Marketing", desc: "Build a premium online presence across Instagram and Facebook.", icon: Instagram },
    { title: "Instagram Content Planning", desc: "Structured, aesthetic layout planning tailored for beauty audiences.", icon: Share2 },
    { title: "Creative Post Design", desc: "Stunning visual graphics showcasing your treatments and client results.", icon: Sparkles },
    { title: "Reels & Short Video Editing", desc: "Polished, trending video formats that show before & after processes.", icon: Eye },
    { title: "Meta Ads Management", desc: "Expert setup, optimization, and scaling for social media ad platforms.", icon: Target },
    { title: "WhatsApp Lead Campaigns", desc: "Direct client inquiries straight to your phone for instant bookings.", icon: MessageSquare },
    { title: "Local Audience Targeting", desc: "Target high-intent customers residing within a 3-5 km radius of your salon.", icon: MapPin },
    { title: "Monthly Offer Campaign Planning", desc: "Strategic offers to drive walk-ins during off-peak weekdays.", icon: Calendar },
    { title: "Retargeting Campaigns", desc: "Stay top-of-mind for users who previously visited your page or ads.", icon: Target },
    { title: "Local SEO & Google Business", desc: "Rank #1 on Google Maps for local salon searches near you.", icon: Compass },
    { title: "Lead Tracking Support", desc: "Simple sheets and tools to track inquiries, walk-ins, and conversions.", icon: TrendingUp },
    { title: "Monthly Reporting", desc: "Transparent performance summaries highlighting spend, leads, and ROI.", icon: Award }
  ];

  // FAQs (Section 11)
  const faqs = [
    {
      q: "Is ad budget included in the package?",
      a: "No. The ad budget is separate and paid directly by the client to Meta (Facebook/Instagram) or Google. Our packages cover the professional management fee, creative design, copywriting, and strategy."
    },
    {
      q: "What is the minimum ad budget required?",
      a: "For the Starter Package, we recommend an ad budget of ₹10,000–₹15,000/month. For the Growth and Premium packages, ₹20,000–₹30,000/month is recommended to run active lead campaigns and drive consistent appointments."
    },
    {
      q: "Can you guarantee appointments?",
      a: "We do not give fake guarantees. Real results depend on various local factors: your salon's location, service pricing, active offers, local competition, ad budget, and most importantly, how quickly your team follows up with the leads we generate."
    },
    {
      q: "Do you create reels?",
      a: "Yes. Reels editing is included based on the selected package (Starter: 2-4, Growth: 4-6, Premium: 8-10). Note that you will need to provide the raw video clips of your services and salon space; professional on-site shoots can be charged separately if required."
    },
    {
      q: "Do you handle Instagram posting?",
      a: "Yes. We handle content planning, creative design, caption writing, hashtag research, and posting support as part of our monthly retainer packages."
    },
    {
      q: "Do you run WhatsApp lead campaigns?",
      a: "Yes. We specialize in setting up Meta Ads that send interested local clients directly to your WhatsApp Business number, making it extremely easy for your front desk to chat and secure appointments."
    },
    {
      q: "Can you help with Google Business Profile?",
      a: "Yes. Basic Google Business Profile support (local SEO setup, keyword optimization, and review collection strategy) is included in both our Growth and Premium packages."
    },
    {
      q: "Is there any minimum contract?",
      a: "We recommend a minimum duration of 3 months. Digital marketing campaigns require initial testing, creative optimization, and pixel training to establish a steady and consistent flow of appointment enquiries."
    }
  ];

  return (
    <div className="salon-grid-pattern min-h-screen font-sans-modern bg-[#FAF9F6]">
      {/* --- HEADER --- */}
      <header 
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 bg-white border-b border-[#c29438]/10 shadow-sm ${
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
              className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white border border-[#c29438]/20 text-[#8c641c] hover:bg-[#FAF9F6] transition-colors shadow-sm"
              aria-label="Call Us"
            >
              <Phone className="h-4.5 w-4.5" />
            </a>
            
            <a 
              href="https://wa.me/919986389444?text=Hi%20Clever%20Crow%2C%20I%27m%20interested%20in%20salon%20marketing%20services.%20(Ref:%20LP/Salon-Marketing)" 
              onClick={trackWhatsAppClick}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors shadow-sm"
              aria-label="Chat on WhatsApp"
            >
              <FaWhatsapp className="h-5 w-5" />
            </a>
            
            <button 
              onClick={() => scrollToSection(formRef)}
              className="hidden md:inline-flex px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider btn-salon-primary cursor-pointer"
            >
              Free Consultation
            </button>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#0d0d0d] text-white">
        {/* Background Image & Overlays */}
        {/* Mobile Background */}
        <div className="absolute inset-0 z-0 lg:hidden">
          <Image 
            src="/images/salon/salon_hero_mobile.png" 
            alt="Luxury Salon Interior Clever Crow Marketing Mobile" 
            fill 
            className="object-cover opacity-45"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0d0d0d]" />
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none salon-grid-pattern" />
        </div>

        {/* Desktop Background */}
        <div className="absolute inset-0 z-0 hidden lg:block">
          <Image 
            src="/images/salon/salon_hero_desktop.png" 
            alt="Luxury Salon Interior Clever Crow Marketing Desktop" 
            fill 
            className="object-cover opacity-75"
            sizes="100vw"
            priority
          />
          {/* Left-to-right gradient to keep text readable on the left but keep the image on the right fully clear */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
          {/* Subtle top-to-bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#0d0d0d]" />
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none salon-grid-pattern" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-4xl lg:max-w-3xl space-y-6">
            
            {/* Title & Subtitle */}
            <div className="space-y-4 w-full">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-serif-luxury tracking-tight leading-tight text-white">
                Want More <span className="text-gold-gradient block sm:inline">Salon Appointments?</span>
              </h1>
              <h2 className="text-[15px] xs:text-base sm:text-xl md:text-2xl font-medium text-[#f7e7c4] max-w-3xl lg:max-w-none leading-relaxed mx-auto lg:mx-0">
                <span className="block sm:inline whitespace-nowrap sm:whitespace-normal">Digital Marketing for Salons, Beauty Studios,</span>
                <span className="hidden sm:inline"> </span>
                <br className="sm:hidden" />
                <span className="block sm:inline whitespace-nowrap sm:whitespace-normal">Unisex Salons & Men’s Grooming Brands</span>
              </h2>
            </div>
            
            {/* 4 Trust & Service Badges (2x2 Grid, centered stacked layout on mobile) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-xl lg:mx-0">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-3 py-3 sm:px-4 sm:py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-[#c29438]/30 transition-colors select-none group justify-center lg:justify-start text-center sm:text-left">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#c29438]/10 text-[#c29438] border border-[#c29438]/20 group-hover:scale-110 transition-transform">
                  <Award className="h-4.5 w-4.5" />
                </div>
                <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-slate-200 block mt-1 sm:mt-0 max-w-[120px] sm:max-w-none">15+ Years Experience</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-3 py-3 sm:px-4 sm:py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-[#c29438]/30 transition-colors select-none group justify-center lg:justify-start text-center sm:text-left">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#c29438]/10 text-[#c29438] border border-[#c29438]/20 group-hover:scale-110 transition-transform">
                  <Users className="h-4.5 w-4.5" />
                </div>
                <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-slate-200 block mt-1 sm:mt-0 max-w-[120px] sm:max-w-none">20+ Salons Served</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-3 py-3 sm:px-4 sm:py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-[#c29438]/30 transition-colors select-none group justify-center lg:justify-start text-center sm:text-left">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#c29438]/10 text-[#c29438] border border-[#c29438]/20 group-hover:scale-110 transition-transform">
                  <MapPin className="h-4.5 w-4.5" />
                </div>
                <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-slate-200 block mt-1 sm:mt-0 max-w-[120px] sm:max-w-none">Local Enquiries</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-3 py-3 sm:px-4 sm:py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-[#c29438]/30 transition-colors select-none group justify-center lg:justify-start text-center sm:text-left">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#c29438]/10 text-[#c29438] border border-[#c29438]/20 group-hover:scale-110 transition-transform">
                  <Calendar className="h-4.5 w-4.5" />
                </div>
                <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-slate-200 block mt-1 sm:mt-0 max-w-[120px] sm:max-w-none">Appointment Requests</span>
              </div>
            </div>

            {/* Dual CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start pt-2">
              <a 
                href="tel:+919986389444" 
                onClick={trackCallClick}
                className="px-8 py-4 rounded-full text-base sm:text-lg font-extrabold uppercase tracking-wider btn-salon-primary cursor-pointer flex items-center justify-center gap-2 group shadow-lg"
              >
                <Phone className="h-5 w-5 shrink-0" />
                <span>+91 99863 89444</span>
              </a>
              <button 
                onClick={() => scrollToSection(packagesRef)}
                className="px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider btn-salon-secondary cursor-pointer flex items-center justify-center gap-2"
              >
                <span>View Pricing Packages</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 2: PORTFOLIO SECTION --- */}
      <section className="py-20 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8c641c] mb-2 block">Our Reach</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-serif-luxury text-slate-900 leading-tight">
              Featured Salon Portfolio & Brand Reach
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
              We help premium salons, chains, and luxury styling brands scale their local bookings and build elite digital presences. Filter by city to explore local markets.
            </p>
          </div>

          {/* City Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {["All", "Hyderabad", "Bangalore", "Noida", "New Delhi", "Mumbai", "Goa"].map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedCity === city
                    ? "bg-[#c29438] text-white shadow-md scale-105"
                    : "bg-white border border-[#c29438]/10 text-slate-700 hover:bg-[#FAF9F6] hover:border-[#c29438]/30"
                }`}
              >
                {city === "All" ? "All Cities" : city}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {salonsData
              .filter(salon => selectedCity === "All" || salon.City === selectedCity)
              .map((salon: any, idx: number) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-3xl p-6 border border-[#c29438]/10 hover:border-[#c29438]/30 shadow-sm transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Header: Category & City */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#8c641c] bg-[#c29438]/5 px-2.5 py-1 rounded-full">
                        {salon["Category / Angle"]}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-[#c29438]" /> {salon.City}
                      </span>
                    </div>

                    {/* Salon Title */}
                    <div>
                      <h3 className="text-lg font-black text-slate-900 leading-snug">{salon["Salon Name"]}</h3>
                      <p className="text-xs text-slate-500 mt-1">{salon.Location}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <div className="flex flex-col gap-2">
                      {salon["Instagram Account Link"] && (
                        <a 
                          href={salon["Instagram Account Link"]}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full py-2 px-4 rounded-xl text-xs font-bold text-white bg-[#c29438] hover:bg-[#b0812d] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <Instagram className="h-3.5 w-3.5" /> Instagram Profile
                        </a>
                      )}
                      <div className="flex gap-2">
                        {salon["Source URL"] && (
                          <a 
                            href={cleanUrl(salon["Source URL"])}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 py-2 px-3 rounded-xl text-[11px] font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors flex items-center justify-center gap-1"
                          >
                            <Globe className="h-3.5 w-3.5 text-[#c29438]" /> Website
                          </a>
                        )}
                        {salon["GMB / Google Maps Link"] && (
                          <a 
                            href={salon["GMB / Google Maps Link"]}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 py-2 px-3 rounded-xl text-[11px] font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors flex items-center justify-center gap-1"
                          >
                            <MapPin className="h-3.5 w-3.5 text-[#c29438]" /> Google Maps
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 3: SOLUTION SECTION --- */}
      <section className="py-20 bg-gradient-to-b from-[#0d0d0d] via-[#161616] to-[#0d0d0d] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c29438] mb-2 block">Our Solution</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-serif-luxury text-white leading-tight">
              A Complete Salon Growth System
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-4 leading-relaxed">
              Clever Crow creates focused digital marketing plans for salons to improve visibility, enquiries, and appointments. We promote the right services to the right local audience using high-end content, advertising, and campaign structures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutionsWeHandle.map((solution, idx) => (
              <div 
                key={idx} 
                className="salon-glass-card rounded-3xl p-8 border border-white/5 hover:border-[#c29438]/20 transition-all duration-300 flex flex-col items-center justify-center text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c29438]/10 text-[#c29438] mb-4 border border-[#c29438]/20 mx-auto">
                  <solution.icon className="h-5.5 w-5.5" />
                </div>
                <h3 className="text-base font-bold text-white leading-snug text-center">{solution.title}</h3>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- SECTION 6: PACKAGE OVERVIEW (PRICING) --- */}
      <section id="packages" ref={packagesRef} className="py-20 bg-[#FAF9F6] scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8c641c] mb-2 block">Transparent retains Plans</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-serif-luxury text-slate-900 leading-tight">
              Salon Marketing Packages
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
              Choose a monthly retainer based on your salon size, target location reach, and monthly booking growth objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            
            {/* Retainer 1: Starter */}
            <div className="bg-white border border-[#c29438]/15 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between transition-all hover:scale-[1.01] hover:shadow-md">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-[#8c641c] bg-[#c29438]/5 px-3 py-1 rounded-full">Starter Growth</span>
                  <h3 className="text-2xl font-black text-slate-900 mt-4">Starter Salon Growth</h3>
                  <p className="text-xs text-slate-500 mt-1">Best for small salons or single locations starting out.</p>
                </div>

                <div className="py-4 border-y border-slate-100">
                  <span className="text-4xl font-black text-slate-900">₹18,000</span>
                  <span className="text-xs text-slate-400 font-bold block mt-1">/ month + GST</span>
                </div>

                <div>
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-3">Key Deliverables:</h4>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" /> Instagram content planning</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" /> 15–25 static posts / month</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" /> 10+ edited reels / month</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" /> Meta Ads management</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" /> WhatsApp lead campaigns</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" /> Local audience targeting</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <button 
                  onClick={() => handlePackageSelect("Starter Growth Package (₹18,000)")}
                  className="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider btn-salon-secondary-light cursor-pointer text-center"
                >
                  Enquire for Starter
                </button>
              </div>
            </div>

            {/* Retainer 2: Growth (FEATURED) */}
            <div className="bg-[#161616] text-white border-2 border-[#c29438] rounded-[2.5rem] p-8 shadow-xl flex flex-col justify-between relative transform lg:-translate-y-4 transition-all hover:scale-[1.01]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#c29438] text-black text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                Most Popular
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-[#f7e7c4] bg-white/5 px-3 py-1 rounded-full">Appointment Growth</span>
                  <h3 className="text-2xl font-black text-white mt-4">Salon Appointment Growth</h3>
                  <p className="text-xs text-slate-400 mt-1">Ideal for salons looking to scale inquiries & bookings.</p>
                </div>

                <div className="py-4 border-y border-white/5">
                  <span className="text-4xl font-black text-[#c29438]">₹30,000</span>
                  <span className="text-xs text-[#f7e7c4] font-bold block mt-1">/ month + GST</span>
                </div>

                <div>
                  <h4 className="text-xs font-black text-[#f7e7c4] uppercase tracking-widest mb-3">Key Deliverables:</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 text-[#c29438] shrink-0 mt-0.5" /> 25–35 premium posts / month</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 text-[#c29438] shrink-0 mt-0.5" /> 15+ edited reels / month</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 text-[#c29438] shrink-0 mt-0.5" /> Lead & Appointment campaigns</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 text-[#c29438] shrink-0 mt-0.5" /> Retargeting campaigns</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 text-[#c29438] shrink-0 mt-0.5" /> Google Business Profile support</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 text-[#c29438] shrink-0 mt-0.5" /> 1 Monthly strategy planning call</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <button 
                  onClick={() => handlePackageSelect("Appointment Growth Package (₹30,000)")}
                  className="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider btn-salon-primary cursor-pointer text-center"
                >
                  Enquire for Growth
                </button>
              </div>
            </div>

            {/* Retainer 3: Premium */}
            <div className="bg-white border border-[#c29438]/15 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between transition-all hover:scale-[1.01] hover:shadow-md">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-[#8c641c] bg-[#c29438]/5 px-3 py-1 rounded-full">Premium Scale</span>
                  <h3 className="text-2xl font-black text-slate-900 mt-4">Premium Salon Growth</h3>
                  <p className="text-xs text-slate-500 mt-1">For multi-locations, luxury chains, or high-ticket focus.</p>
                </div>

                <div className="py-4 border-y border-slate-100">
                  <span className="text-4xl font-black text-slate-900">₹45,000</span>
                  <span className="text-xs text-slate-400 font-bold block mt-1">/ month + GST</span>
                </div>

                <div>
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-3">Key Deliverables:</h4>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" /> 35+ premium posts / month</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" /> 20+ edited reels / month</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" /> Meta & Google Ads management</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" /> High-ticket service campaigns</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" /> Lead tracking sheet support</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" /> Weekly updates & reporting</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <button 
                  onClick={() => handlePackageSelect("Premium Salon Growth Package (₹45,000)")}
                  className="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider btn-salon-secondary-light cursor-pointer text-center"
                >
                  Enquire for Premium
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 7: COMPARISON TABLE --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8c641c] mb-2 block">Side-by-side</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-serif-luxury text-slate-900 leading-tight">
              Compare Packages
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
              Analyze deliverables closely to pick the perfect retainer setup for your salon’s capacity.
            </p>
          </div>

          <div className="overflow-x-auto max-w-4xl mx-auto border border-slate-200/80 rounded-[2rem] shadow-sm bg-white">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/80">
                  <th className="p-5 text-xs font-black uppercase tracking-wider text-slate-700">Deliverables</th>
                  <th className="p-5 text-xs font-black uppercase tracking-wider text-slate-700 text-center">Starter</th>
                  <th className="p-5 text-xs font-black uppercase tracking-wider text-slate-700 text-center bg-[#c29438]/5">Growth</th>
                  <th className="p-5 text-xs font-black uppercase tracking-wider text-slate-700 text-center">Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                <tr>
                  <td className="p-5 font-bold text-slate-800">Monthly Fee</td>
                  <td className="p-5 text-center text-slate-600">₹18,000</td>
                  <td className="p-5 text-center font-black text-[#8c641c] bg-[#c29438]/5">₹30,000</td>
                  <td className="p-5 text-center text-slate-600">₹45,000</td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-slate-800">Static Posts</td>
                  <td className="p-5 text-center text-slate-600">15–25</td>
                  <td className="p-5 text-center text-slate-600 bg-[#c29438]/5">25–35</td>
                  <td className="p-5 text-center text-slate-600">35+</td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-slate-800">Reels / Short Videos</td>
                  <td className="p-5 text-center text-slate-600">10+</td>
                  <td className="p-5 text-center text-slate-600 bg-[#c29438]/5">15+</td>
                  <td className="p-5 text-center text-slate-600">20+</td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-slate-800">Meta Ads Management</td>
                  <td className="p-5 text-center text-slate-600"><Check className="h-4.5 w-4.5 mx-auto text-green-600" /></td>
                  <td className="p-5 text-center bg-[#c29438]/5"><Check className="h-4.5 w-4.5 mx-auto text-green-600" /></td>
                  <td className="p-5 text-center"><Check className="h-4.5 w-4.5 mx-auto text-green-600" /></td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-slate-800">WhatsApp Lead Campaign</td>
                  <td className="p-5 text-center text-slate-600"><Check className="h-4.5 w-4.5 mx-auto text-green-600" /></td>
                  <td className="p-5 text-center bg-[#c29438]/5"><Check className="h-4.5 w-4.5 mx-auto text-green-600" /></td>
                  <td className="p-5 text-center"><Check className="h-4.5 w-4.5 mx-auto text-green-600" /></td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-slate-800">Retargeting Campaign</td>
                  <td className="p-5 text-center text-slate-400">Not Included</td>
                  <td className="p-5 text-center bg-[#c29438]/5"><Check className="h-4.5 w-4.5 mx-auto text-green-600" /></td>
                  <td className="p-5 text-center"><Check className="h-4.5 w-4.5 mx-auto text-green-600" /></td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-slate-800">Google Business Profile Support</td>
                  <td className="p-5 text-center text-slate-600">Basic</td>
                  <td className="p-5 text-center bg-[#c29438]/5"><Check className="h-4.5 w-4.5 mx-auto text-green-600" /></td>
                  <td className="p-5 text-center"><Check className="h-4.5 w-4.5 mx-auto text-green-600" /></td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-slate-800">Google Ads Management</td>
                  <td className="p-5 text-center text-slate-400">Not Included</td>
                  <td className="p-5 text-center bg-[#c29438]/5">Not Included</td>
                  <td className="p-5 text-center text-slate-600">If Required</td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-slate-800">Monthly Strategy Call</td>
                  <td className="p-5 text-center text-slate-400">Not Included</td>
                  <td className="p-5 text-center bg-[#c29438]/5"><Check className="h-4.5 w-4.5 mx-auto text-green-600" /></td>
                  <td className="p-5 text-center"><Check className="h-4.5 w-4.5 mx-auto text-green-600" /></td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-slate-800">Weekly Updates</td>
                  <td className="p-5 text-center text-slate-400">Not Included</td>
                  <td className="p-5 text-center bg-[#c29438]/5">Not Included</td>
                  <td className="p-5 text-center"><Check className="h-4.5 w-4.5 mx-auto text-green-600" /></td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-slate-800">Lead Tracking Support</td>
                  <td className="p-5 text-center text-slate-400">Not Included</td>
                  <td className="p-5 text-center bg-[#c29438]/5 font-semibold text-slate-600">Basic</td>
                  <td className="p-5 text-center"><Check className="h-4.5 w-4.5 mx-auto text-green-600" /></td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* --- SECTION 5: SERVICES WE CAN PROMOTE --- */}
      <section className="py-20 bg-[#0d0d0d] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none salon-grid-pattern" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c29438] mb-2 block">Campaign Focus</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-serif-luxury text-white leading-tight">
              Promote High-Value Salon Services
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-4 leading-relaxed">
              We do not promote your salon randomly. We structure campaign plans targeting services that bring high ticket values, high profit margins, and maximum customer lifetime value.
            </p>
          </div>
        </div>

        {/* Dynamic Scrolling Carousel */}
        <div className="relative space-y-6 max-w-none overflow-hidden select-none">
          {/* Row 1 - Scrolls Left */}
          <div className="flex overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="flex w-max gap-6 px-3"
            >
              {[...servicesRow1, ...servicesRow1].map((service, idx) => (
                <div 
                  key={idx} 
                  className="relative rounded-[2rem] overflow-hidden w-[310px] sm:w-[350px] aspect-[4/3] shrink-0 border border-white/10 group cursor-pointer"
                >
                  {/* Service Image */}
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80"
                    sizes="350px"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#c29438] bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#c29438]/20">
                      {service.badge}
                    </span>
                  </div>

                  {/* Text Details at bottom */}
                  <div className="absolute bottom-5 left-5 right-5 space-y-1 text-left pointer-events-none">
                    <span className="text-[10px] font-bold tracking-widest text-[#f7e7c4] uppercase">
                      {service.tagline}
                    </span>
                    <h4 className="text-lg font-black text-white">
                      {service.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-normal line-clamp-2">
                      {service.desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2 - Scrolls Right */}
          <div className="flex overflow-hidden">
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex w-max gap-6 px-3"
            >
              {[...servicesRow2, ...servicesRow2].map((service, idx) => (
                <div 
                  key={idx} 
                  className="relative rounded-[2rem] overflow-hidden w-[310px] sm:w-[350px] aspect-[4/3] shrink-0 border border-white/10 group cursor-pointer"
                >
                  {/* Service Image */}
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80"
                    sizes="350px"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#c29438] bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#c29438]/20">
                      {service.badge}
                    </span>
                  </div>

                  {/* Text Details at bottom */}
                  <div className="absolute bottom-5 left-5 right-5 space-y-1 text-left pointer-events-none">
                    <span className="text-[10px] font-bold tracking-widest text-[#f7e7c4] uppercase">
                      {service.tagline}
                    </span>
                    <h4 className="text-lg font-black text-white">
                      {service.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-normal line-clamp-2">
                      {service.desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mt-16">
            <p className="text-sm text-slate-400 max-w-xl mx-auto italic">
              "We coordinate monthly campaigns centered around your specific priority services, localized audience demographics, and special monthly packages."
            </p>
          </div>
        </div>
      </section>



      {/* --- SECTION 8: WHY CHOOSE CLEVER CROW --- */}
      <section className="py-20 bg-gradient-to-b from-[#0d0d0d] to-[#161616] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c29438] mb-2 block">Our Methodology</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-serif-luxury text-white leading-tight">
              Why Salons Work With Clever Crow
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-4 leading-relaxed">
              Effective salon marketing requires more than posting pretty pictures. It requires building local trust, driving direct response bookings, and maintaining strong local visibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { title: "We create content that builds trust.", desc: "Custom photography design guidelines, premium aesthetic layouts, and client-centric reels showing real work." },
              { title: "We run ads focused on enquiries.", desc: "No vanity likes campaigns. Every rupee goes into driving high-intent appointment calls or WhatsApp chats." },
              { title: "We target customers near your location.", desc: "Hyper-local geo-fencing captures customers residing or working right in your immediate neighborhood." },
              { title: "We promote high-value salon services.", desc: "Focus campaigns specifically on your premium services (bridal, hair color, keratin) to increase average ticket values." },
              { title: "We plan monthly offers & campaigns.", desc: "Run special seasonal packages, weekday happy hours, or member offers to maintain fully occupied chairs." },
              { title: "We help connect leads through WhatsApp.", desc: "Build automated links that deliver user details straight to your reception desk Business WhatsApp chat." },
              { title: "We track performance and improve monthly.", desc: "Provide clear data-driven reports, optimizing ad copy and visual concepts month-over-month." }
            ].map((approach, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#c29438]/30 transition-colors flex gap-4"
              >
                <div className="h-6 w-6 rounded-full bg-[#c29438]/20 flex items-center justify-center shrink-0 text-[#c29438] mt-0.5">
                  <CheckCircle2 className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-2 leading-snug">{approach.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{approach.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- SECTION 9: HOW IT WORKS --- */}
      <section className="py-20 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8c641c] mb-2 block">Step By Step</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-serif-luxury text-slate-900 leading-tight">
              Simple 4-Step Process
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
              How we launch, run, and scale your salon’s local digital marketing campaigns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto relative">
            {[
              { step: "01", name: "Salon Review", desc: "We review your Instagram page, services, location, offers and current marketing setups to find growth blocks." },
              { step: "02", name: "Monthly Plan", desc: "We build a detailed content calendar and campaign structure aligned with your priority high-value services." },
              { step: "03", name: "Campaign Launch", desc: "We design premium creatives, publish optimized posts, and go live with hyper-local Meta & WhatsApp ads." },
              { step: "04", name: "Track & Improve", desc: "We track leads, conversion costs, and platform engagement to refine ad copies and creatives every month." }
            ].map((stepObj, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-3xl p-6 border border-[#c29438]/10 shadow-sm relative flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-black text-[#c29438]/20 block mb-4">{stepObj.step}</span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug mb-2">{stepObj.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{stepObj.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- SECTION 10: LEAD FORM SECTION --- */}
      <section id="consultation" ref={formRef} className="py-20 bg-gradient-to-b from-[#161616] to-[#0d0d0d] text-white scroll-mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c29438] mb-2 block">Consultation Request</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-serif-luxury text-white leading-tight">
              Get a Free Salon Marketing Consultation
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-3">
              Share your salon details and our growth specialist will suggest the right marketing approach for your business.
            </p>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-[#c29438]/15 text-slate-800 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#dfb05b] via-[#c29438] to-[#a0731f]" />

            <form onSubmit={handleFormSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-black uppercase text-slate-600 tracking-wider mb-2">Your Name *</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name" 
                    className="salon-form-input p-3.5 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="salonName" className="block text-xs font-black uppercase text-slate-600 tracking-wider mb-2">Salon / Studio Name *</label>
                  <input 
                    type="text" 
                    id="salonName"
                    name="salonName"
                    value={formState.salonName}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Bella Beauty Studio" 
                    className="salon-form-input p-3.5 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-xs font-black uppercase text-slate-600 tracking-wider mb-2">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter 10-digit mobile number" 
                    className="salon-form-input p-3.5 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block text-xs font-black uppercase text-slate-600 tracking-wider mb-2">City / Location *</label>
                  <input 
                    type="text" 
                    id="location"
                    name="location"
                    value={formState.location}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Indiranagar, Bangalore" 
                    className="salon-form-input p-3.5 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="instagram" className="block text-xs font-black uppercase text-slate-600 tracking-wider mb-2">Instagram Page Link *</label>
                  <input 
                    type="text" 
                    id="instagram"
                    name="instagram"
                    value={formState.instagram}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. instagram.com/yoursalon" 
                    className="salon-form-input p-3.5 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="website" className="block text-xs font-black uppercase text-slate-600 tracking-wider mb-2">Website Link (if available)</label>
                  <input 
                    type="text" 
                    id="website"
                    name="website"
                    value={formState.website}
                    onChange={handleInputChange}
                    placeholder="e.g. www.yoursalon.com" 
                    className="salon-form-input p-3.5 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="salonType" className="block text-xs font-black uppercase text-slate-600 tracking-wider mb-2">Type of Salon *</label>
                  <select 
                    id="salonType"
                    name="salonType"
                    value={formState.salonType}
                    onChange={handleInputChange}
                    required
                    className="salon-form-input p-3.5 text-sm"
                  >
                    <option value="">Select Salon Type</option>
                    <option value="Ladies Salon">Ladies Salon</option>
                    <option value="Men's Salon">Men’s Salon</option>
                    <option value="Unisex Salon">Unisex Salon</option>
                    <option value="Beauty Studio">Beauty Studio</option>
                    <option value="Hair Clinic">Hair Clinic</option>
                    <option value="Skin Clinic">Skin Clinic</option>
                    <option value="Nail Studio">Nail Studio</option>
                    <option value="Bridal Makeup Studio">Bridal Makeup Studio</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="block text-xs font-black uppercase text-slate-600 tracking-wider mb-2">Current Monthly Marketing Budget *</label>
                  <select 
                    id="budget"
                    name="budget"
                    value={formState.budget}
                    onChange={handleInputChange}
                    required
                    className="salon-form-input p-3.5 text-sm"
                  >
                    <option value="">Select Budget Range</option>
                    <option value="Below ₹18,000">Below ₹18,000</option>
                    <option value="₹18,000–₹30,000">₹18,000–₹30,000</option>
                    <option value="₹30,000–₹50,000">₹30,000–₹50,000</option>
                    <option value="₹50,000+">₹50,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="services" className="block text-xs font-black uppercase text-slate-600 tracking-wider mb-2">Services You Want to Promote *</label>
                <input 
                  type="text" 
                  id="services"
                  name="services"
                  value={formState.services}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Hair color, Keratin, Hydra Facial" 
                  className="salon-form-input p-3.5 text-sm"
                />
              </div>

              {selectedPackage && (
                <div className="bg-[#c29438]/10 border border-[#c29438]/20 rounded-xl p-3 flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700">Preferred Retainer Package:</span>
                  <span className="font-black text-[#8c641c] bg-white px-3 py-1 rounded-full border border-[#c29438]/20">{selectedPackage}</span>
                </div>
              )}

              <div>
                <label htmlFor="message" className="block text-xs font-black uppercase text-slate-600 tracking-wider mb-2">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  rows={3} 
                  placeholder="Tell us about your salon goals or specific challenges..." 
                  className="salon-form-input p-3.5 text-sm resize-none"
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full text-sm font-bold uppercase tracking-wider btn-salon-primary cursor-pointer flex justify-center items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4.5 w-4.5 animate-spin" /> Submitting Request...
                    </>
                  ) : (
                    <>
                      Get Free Consultation <ArrowRight className="h-4.5 w-4.5" />
                    </>
                  )}
                </button>
              </div>

              {/* Status Alert */}
              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-xs font-semibold flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="h-4.5 w-4.5 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-green-950">Lead captured successfully!</h5>
                      <p className="mt-0.5 font-medium">Thank you! Our salon marketing specialist will reach out within 24 hours.</p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-start gap-2.5"
                  >
                    <AlertCircle className="h-4.5 w-4.5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-red-950">Submission Error</h5>
                      <p className="mt-0.5 font-medium">Please double check your inputs. Ensure Name, Salon Name, Phone, and Instagram are filled.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </form>
          </div>

        </div>
      </section>

      {/* --- SECTION 11: FAQ SECTION --- */}
      <section className="py-20 bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8c641c] mb-2 block">Answering Queries</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-serif-luxury text-slate-900 leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 mt-4 leading-relaxed">
              Clear, transparent details about ad spend, reels deliverables, contract models, and lead outcomes.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-[#c29438]/15 rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-sm"
                >
                  <button 
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-bold text-slate-900 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm md:text-base leading-snug">{faq.q}</span>
                    <ChevronDown className={`h-4.5 w-4.5 text-[#c29438] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <div 
                    className={`accordion-transition overflow-hidden ${
                      isOpen ? 'max-h-56 opacity-100 p-5 pt-0 border-t border-slate-50' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* --- SECTION 12: FINAL CTA SECTION --- */}
      <section className="py-20 bg-gradient-to-b from-[#0d0d0d] via-[#161616] to-black text-white text-center relative border-t border-[#c29438]/15">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none salon-grid-pattern" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <h2 className="text-3xl md:text-5xl font-extrabold font-serif-luxury text-white leading-tight">
            Ready to Grow Your Salon?
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Let’s build a proper digital marketing system for your salon — with better content, better ads and more appointment enquiries.
          </p>
          <div className="text-lg sm:text-xl font-bold text-[#c29438] py-2">
            Salon Growth Retainers Starting from <span className="underline decoration-wavy">₹18,000</span>/month
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button 
              onClick={() => scrollToSection(formRef)}
              className="px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider btn-salon-primary cursor-pointer flex items-center justify-center gap-2"
            >
              Get Free Consultation <ArrowRight className="h-4 w-4" />
            </button>
            <a 
              href="https://wa.me/919986389444?text=Hi%20Clever%20Crow%2C%20I%27m%20interested%20in%20salon%20marketing%20services.%20(Ref:%20LP/Salon-Marketing)"
              onClick={trackWhatsAppClick}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider btn-salon-secondary cursor-pointer flex items-center justify-center gap-2 bg-[#22c55e]/10 border-[#22c55e]/40 text-[#22c55e] hover:bg-[#22c55e]/20"
            >
              <FaWhatsapp className="h-5 w-5" /> WhatsApp Us Now
            </a>
          </div>

          {/* Important notes under final CTA */}
          <div className="pt-12 text-slate-500 text-[10px] sm:text-xs max-w-2xl mx-auto text-left space-y-2 border-t border-white/5">
            <p className="font-semibold text-slate-400">Important Notes:</p>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li>Ad budget is not included in the monthly service fee and is paid directly by the client to Meta / Google.</li>
              <li>Photography, professional video shoot, influencer marketing, website development and advanced CRM setups are charged separately if required.</li>
              <li>Minimum campaign duration recommended is 3 months to see optimal, consistent leads and pixel calibration.</li>
              <li>Results depend on location demographics, service pricing, offers, competition, ad budget, and follow-up speed of the salon team.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-8 bg-black border-t border-white/5 text-center text-[10px] sm:text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Clever Crow. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="/privacy-policy" className="hover:text-[#c29438] transition-colors">Privacy Policy</a>
            <a href="/terms-conditions" className="hover:text-[#c29438] transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </footer>

      {/* Sticky WhatsApp Floating Icon (Bottom Right) */}
      <a 
        href="https://wa.me/919986389444?text=Hi%20Clever%20Crow%2C%20I%27m%20interested%20in%20salon%20marketing%20services.%20(Ref:%20LP/Salon-Marketing)" 
        target="_blank"
        rel="noreferrer"
        onClick={trackWhatsAppClick}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#22c55e] text-white shadow-xl hover:bg-[#1ebd50] transition-transform hover:scale-110 whatsapp-pulse cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="h-7 w-7 text-white" />
      </a>
    </div>
  );
}
