"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { 
  Phone, Award, Users, Headphones, Sparkles, CheckCircle, 
  ShieldCheck, User, Send, ArrowRight, X, ChevronDown,
  Video, BarChart3, Megaphone, Flame, Rocket, Leaf, GraduationCap
} from 'lucide-react';
import { FaWhatsapp, FaGoogle, FaInstagram } from 'react-icons/fa';
import './smm.css';

// Self-contained stat card with count-up animation on scroll
function StatCard({ value, label, color, img }: { value: string; label: string; color: string; img: string }) {
  const numericVal = parseFloat(value.replace(/[^0-9.]/g, ''));
  const prefix = value.startsWith('+') ? '+' : '';
  const suffix = value.includes('%') ? '%' : '';
  const hasDecimal = value.includes('.');
  const [display, setDisplay] = useState(hasDecimal ? '0.0' : '0');
  const cardRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          observer.disconnect();

          const duration = 1800;
          const step = numericVal / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= numericVal) {
              setDisplay(hasDecimal ? numericVal.toFixed(1) : numericVal.toString());
              clearInterval(timer);
            } else {
              setDisplay(hasDecimal ? current.toFixed(1) : Math.floor(current).toString());
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []); // stable — runs once

  return (
    <div ref={cardRef} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm hover:border-amber-400 hover:-translate-y-0.5 transition-all duration-300">
      <p className={`text-3xl font-extrabold ${color}`}>{prefix}{display}{suffix}</p>
      <p className="mt-1 text-slate-600 font-medium text-sm">{label}</p>
      <img src={img} alt="" className="mx-auto mt-4 h-10 object-contain" />
    </div>
  );
}

export default function SmmLandingPage() {
  const router = useRouter();
  const whatsappUrl = "https://wa.me/919986389444?text=Hi%20Clever%20Crow%2C%20I%27m%20interested%20in%20Social%20Media%20Management%20services.%20(Ref:%20LP/SMM)";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllReels, setShowAllReels] = useState(false);
  const [status, setStatus] = useState<{ loading: boolean; success: boolean; error: string | null }>({ loading: false, success: false, error: null });
  const [modalStatus, setModalStatus] = useState<{ loading: boolean; success: boolean; error: string | null }>({ loading: false, success: false, error: null });

  // State for forms
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [modalFormData, setModalFormData] = useState({ name: '', phone: '' });

  // Lazy-load and lazy-play reels: only load and play when visible
  const reelObserverRef = useRef<IntersectionObserver | null>(null);
  const reelCallback = useCallback((node: HTMLVideoElement | null) => {
    if (!node) return;
    if (!reelObserverRef.current) {
      reelObserverRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            const video = entry.target as HTMLVideoElement;
            if (entry.isIntersecting) {
              // Dynamically inject source to lazy-load video bytes
              let source = video.querySelector('source');
              const dataSrc = video.getAttribute('data-src');
              if (!source && dataSrc) {
                source = document.createElement('source');
                source.src = dataSrc;
                source.type = 'video/mp4';
                video.appendChild(source);
                video.load();
              }
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.1, rootMargin: '100px' }
      );
    }
    reelObserverRef.current.observe(node);
  }, []);

  const clientLogos = [
    "client1.png", "client2.png", "client3.png", "client4.png", "client5.png",
    "client6.png", "client7.png", "client8.png", "client9.png", "client10.png",
    "client11.png", "client12.png", "client13.png", "client14.png", "client16.png",
    "client18.png"
  ].map(name => `/lp/digital-marketing/${name}`);

  const reels = Array.from({ length: 20 }, (_, i) => `/lp/digital-marketing/assets/reels/reel${i + 1}.mp4`);

  const trackWhatsAppClick = () => {
    if (typeof window !== 'undefined') {
      if ((window as any).gtag) {
        (window as any).gtag('event', 'click', {
          'event_category': 'Contact',
          'event_label': 'WhatsApp Chat Click',
          'whatsapp_number': '09986389444'
        });
      }
    }
  };

  const trackCallClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== 'undefined') {
      if ((window as any).gtag_report_conversion) {
        e.preventDefault();
        (window as any).gtag_report_conversion(e.currentTarget.href);
      } else if ((window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-17335403082/ul0ECKr5i_QaEMqElcpA',
        });
        (window as any).gtag('event', 'click', {
          'event_category': 'Contact',
          'event_label': 'Phone Call Click',
          'phone_number': '09986389444'
        });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleModalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModalFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitLead = async (name: string, phone: string, source: string) => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        phone,
        email: "",
        message: `New enquiry received. Source Page: ${source}. Referrer/Landed URL: ${currentUrl}`,
        source: source
      })
    });

    if (!response.ok) {
      throw new Error('Something went wrong. Please try again.');
    }
    return await response.json();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setStatus({ loading: false, success: false, error: 'Please fill all required fields.' });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      await submitLead(formData.name, formData.phone, "SMM Landing Page");
      // Fire Google conversion tracking
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-17335403082/YwV4CJ-q_e8YEPq9me49',
        });
        (window as any).gtag('event', 'GenerateLead', {
          'event_category': 'Leads',
          'event_label': 'Lead Form Submit'
        });
      }
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', phone: '' });
      router.push('/thank-you');
    } catch (err: any) {
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  const handleModalFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalFormData.name || !modalFormData.phone) {
      setModalStatus({ loading: false, success: false, error: 'Please fill all required fields.' });
      return;
    }

    setModalStatus({ loading: true, success: false, error: null });

    try {
      await submitLead(modalFormData.name, modalFormData.phone, "SMM Landing Page (Modal)");
      // Fire Google conversion tracking
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-17335403082/YwV4CJ-q_e8YEPq9me49',
        });
        (window as any).gtag('event', 'GenerateLead', {
          'event_category': 'Leads',
          'event_label': 'Lead Form Submit'
        });
      }
      setModalStatus({ loading: false, success: true, error: null });
      setModalFormData({ name: '', phone: '' });
      setIsModalOpen(false);
      router.push('/thank-you');
    } catch (err: any) {
      setModalStatus({ loading: false, success: false, error: err.message });
    }
  };

  const pricingPlans = [
    {
      title: "Essential Plan",
      description: "Ideal for startups and small businesses building their online presence.",
      price: "₹10,000",
      period: "/ month",
      icon: Leaf,
      features: [
        "Platforms: Facebook & Instagram",
        "12-15 posts/month (Static + Carousel)",
        "Content calendar + captions + hashtags",
        "Basic design, scheduling & publishing",
        "Monthly performance report"
      ],
      image: "/lp/digital-marketing/images/smm.jpg"
    },
    {
      title: "Advanced Plan",
      description: "Ideal for growing brands focused on engagement and audience expansion.",
      price: "₹18,000",
      period: "/ month",
      icon: Flame,
      features: [
        "Everything in Essential package",
        "Platforms: FB, Instagram & LinkedIn",
        "20-25 posts/month + 4-5 reels/month",
        "Weekly analytics + monthly strategy call",
        "Engagement support (comments/messages)"
      ],
      image: "/lp/digital-marketing/images/metabg.jpg"
    },
    {
      title: "Performance Plan",
      description: "Ideal for established brands scaling multi-platform communication.",
      price: "₹35,000",
      period: "/ month",
      icon: Rocket,
      features: [
        "Everything in Advanced package",
        "Platforms: FB, Instagram, LinkedIn & X",
        "30-35 posts/month + 8-10 reels/month",
        "Brand/community management + collaboration support",
        "Dedicated manager + priority support"
      ],
      image: "/lp/digital-marketing/images/aibg.jpg"
    }
  ];

  const results = [
    { value: "+218%", label: "eCommerce Orders", color: "text-blue-600", img: "/lp/digital-marketing/client1.png" },
    { value: "+343.2%", label: "Conversion Rate", color: "text-emerald-600", img: "/lp/digital-marketing/client2.png" },
    { value: "+147%", label: "Top 5 Keyword Rankings", color: "text-rose-600", img: "/lp/digital-marketing/client3.png" },
    { value: "+120%", label: "Lead Generation", color: "text-amber-600", img: "/lp/digital-marketing/client4.png" },
    { value: "+85%", label: "Organic Traffic", color: "text-cyan-600", img: "/lp/digital-marketing/client5.png" },
    { value: "+200%", label: "Social Media Engagement", color: "text-indigo-600", img: "/lp/digital-marketing/client6.png" }
  ];

  const testimonials = [
    {
      initial: "G",
      stars: "★★★★★",
      quote: "After Clever Crow took over our Google Ads, we started seeing 8–10 solid leads per day. Within 3 weeks, we sold 4 units directly from ad-generated leads.",
      client: "Arun R., Director, Riva Builders (Bangalore)"
    },
    {
      initial: "G",
      stars: "★★★★★",
      quote: "The team delivered 300+ leads in less than a month. The creatives and messaging felt tailor-made for our audience.",
      client: "Ramesh Shetty, Founder, BrightEdge Academy (Udupi)"
    },
    {
      initial: "G",
      stars: "★★★★★",
      quote: "Within 2 months of SEO work, we ranked in top results for our target terms and started getting 5–6 new patients weekly.",
      client: "Dr. Priya B., DDC Smiles Dental Clinic (Bangalore)"
    },
    {
      initial: "G",
      stars: "★★★★★",
      quote: "Clevercrow restructured our campaign tracking and CPL dropped by 37% in under 6 weeks. Reporting is very clear and actionable.",
      client: "Neha M., Marketing Lead, Apex Interiors (Hyderabad)"
    },
    {
      initial: "G",
      stars: "★★★★★",
      quote: "From website revamp to lead funnel setup, everything was handled end-to-end. We now get consistent inbound enquiries every week.",
      client: "Karthik S., Founder, EduSpring Consultants (Mysuru)"
    },
    {
      initial: "G",
      stars: "★★★★★",
      quote: "Their SEO and content strategy helped us rank for multiple local keywords. Organic enquiries have gone up steadily month after month.",
      client: "Faizan A., Director, PrimeCare Clinics (Bangalore)"
    }
  ];

  const faqs = [
    { q: "How long before results show?", a: "Usually 3–6 months for SEO and faster with Ads." },
    { q: "Is ad spend included?", a: "No, ad spend is billed separately from management fees." },
    { q: "Do you guarantee leads or sales?", a: "We do not guarantee sales, but we optimize campaigns for lead quality and ROI." },
    { q: "Can I pause or cancel anytime?", a: "Yes, campaigns can be paused or cancelled with prior notice." },
    { q: "Do you provide monthly reports?", a: "Yes, we share monthly performance reports with insights and actions." }
  ];

  const processSteps = [
    { step: "Step 01", title: "Discovery", desc: "Business goals, audience and content direction alignment." },
    { step: "Step 02", title: "Planning", desc: "Monthly calendar, platform mix, and topic buckets finalized." },
    { step: "Step 03", title: "Creation", desc: "Designs, captions, hashtags, reels and motion creatives produced." },
    { step: "Step 04", title: "Publishing", desc: "Approval-based scheduling, posting, and engagement support." },
    { step: "Step 05", title: "Optimization", desc: "Weekly/monthly insights and next-cycle improvements." }
  ];

  const microProcessItems = [
    { title: "1) Onboarding & Audit", items: ["Brand questionnaire and kickoff call", "Profile and content audit", "Competitor benchmark setup"] },
    { title: "2) Monthly Strategy Setup", items: ["Content pillars and campaign themes", "Posting frequency and format plan", "KPI and reporting structure lock"] },
    { title: "3) Content Production", items: ["Static, carousel, story and reel creation", "Caption writing and hashtag mapping", "Brand consistency quality check"] },
    { title: "4) Review & Scheduling", items: ["Internal QA and client approvals", "Publishing calendar and slot optimization", "Cross-platform scheduling"] },
    { title: "5) Engagement & Monitoring", items: ["Comment/message support (as per plan)", "Trend and content performance tracking", "Escalation for priority responses"] },
    { title: "6) Reporting & Scale", items: ["Weekly/monthly analytics report", "What worked / what to improve", "Next-month optimization roadmap"] }
  ];

  return (
    <div className="bg-slate-50 pb-24 text-slate-800 hospitality-funnel">
      {/* Google tag (gtag.js) */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-17335403082"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'AW-17335403082');

          // Phone conversion tracking configuration
          gtag('config', 'AW-17335403082/uHSsCKf5i_QaEMqElcpA', {
            'phone_conversion_number': '09986389444'
          });
        `}
      </Script>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#" className="inline-flex items-center gap-3">
            <img src="/lp/digital-marketing/images/logo-dark.svg" alt="Clevercrow" className="h-11 w-auto" />
          </a>
          <div className="flex items-center gap-2">
            <a 
              href="tel:09986389444" 
              onClick={trackCallClick}
              className="inline-flex items-center gap-2 rounded-full bg-[#FFCE1B] px-4 py-2 text-sm font-bold text-slate-900 shadow-sm transition hover:bg-[#d99a00]"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">09986389444</span>
            </a>
            <a 
              href={whatsappUrl} 
              onClick={trackWhatsAppClick}
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-400"
            >
              <FaWhatsapp className="text-base" />
              <span className="hidden sm:inline">Chat</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-bg-smm pt-8 pb-16 text-white sm:py-20">
        <div className="hero-grid-pattern" aria-hidden="true" />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[11px] font-bold text-slate-200 backdrop-blur-sm">
                Social media growth systems
              </span>
            </div>
            <h1 className="mt-3 text-[28px] leading-tight font-medium sm:text-5xl">
              Build a Strong Brand Presence <br className="sm:hidden" />
              with{" "}
              <span className="font-extrabold bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                Social Media Management
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-slate-200 sm:text-lg leading-relaxed">From content strategy to publishing and reporting, we manage your social media end-to-end so you can focus on business growth.</p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="hero-badge-capsule">
                <div className="hero-badge-icon-wrap">
                  <Award className="w-5 h-5" />
                </div>
                <span className="hero-badge-text">15+ Years of SEO Experience</span>
              </div>
              <div className="hero-badge-capsule">
                <div className="hero-badge-icon-wrap">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="hero-badge-text">Technical + Content SEO Experts</span>
              </div>
              <div className="hero-badge-capsule">
                <div className="hero-badge-icon-wrap">
                  <Users className="w-5 h-5" />
                </div>
                <span className="hero-badge-text">550+ Businesses Served</span>
              </div>
              <div className="hero-badge-capsule">
                <div className="hero-badge-icon-wrap">
                  <Headphones className="w-5 h-5" />
                </div>
                <span className="hero-badge-text">Transparent Monthly Reporting</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/30 bg-white/80 p-5 text-slate-900 shadow-[0_20px_50px_rgba(15,23,42,0.15)] backdrop-blur-xl lg:col-span-4 self-center">
            <h2 className="text-lg font-bold">Request a Call Back</h2>
            <form onSubmit={handleFormSubmit} className="mt-3 space-y-2.5">
              <div>
                <div className="relative group/input">
                  <User className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-amber-500 transition-colors w-4 h-4" />
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name" 
                    disabled={status.loading}
                    className="w-full rounded-lg border border-slate-300 pl-10 pr-4 py-2.5 text-sm outline-none transition bg-white/90 focus:border-amber-500 focus:ring-2 focus:ring-amber-100" 
                  />
                </div>
              </div>
              <div>
                <div className="relative group/input">
                  <Phone className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-amber-500 transition-colors w-4 h-4" />
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    required 
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone" 
                    disabled={status.loading}
                    className="w-full rounded-lg border border-slate-300 pl-10 pr-4 py-2.5 text-sm outline-none transition bg-white/90 focus:border-amber-500 focus:ring-2 focus:ring-amber-100" 
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={status.loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-700 disabled:opacity-50 cursor-pointer hover:scale-[1.02] active:scale-98 transition-all duration-200"
              >
                <Send className="w-4 h-4" />
                {status.loading ? 'Submitting...' : 'Submit Request'}
              </button>
              {status.error && <p className="text-xs text-rose-600 mt-1.5">{status.error}</p>}
              {status.success && <p className="text-xs text-emerald-600 mt-1.5">Request submitted successfully!</p>}
            </form>
            <p className="mt-2.5 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />We respect your privacy</p>
            <div className="mt-4 pt-4 border-t border-slate-200/60 grid grid-cols-3 gap-2 text-center text-[10px] text-slate-500 font-semibold">
              <div>
                <div className="mx-auto flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-[9px] mb-1">1</div>
                Submit Form
              </div>
              <div>
                <div className="mx-auto flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-[9px] mb-1">2</div>
                Quick Call
              </div>
              <div>
                <div className="mx-auto flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-[9px] mb-1">3</div>
                Growth Plan
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands We Work With */}
      <section className="section-grid relative overflow-hidden bg-slate-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-bold text-slate-900 sm:text-2xl">Brands We Work With</h2>
          <div className="fade-edge relative mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white py-4">
            <div className="logo-track">
              <div className="flex items-center gap-10 px-8">
                {clientLogos.map((src, i) => (
                  <img key={i} src={src} alt={`Client ${i + 1}`} className="h-12 w-auto object-contain" />
                ))}
              </div>
              <div className="flex items-center gap-10 px-8" aria-hidden="true">
                {clientLogos.map((src, i) => (
                  <img key={`dup-${i}`} src={src} alt="" className="h-12 w-auto object-contain" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Plans / Pricing Section */}
      <section id="pricing" className="section-grid py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl text-slate-900">Social Media Management Packages</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">Choose the plan that fits your current stage and scale with clear deliverables.</p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pricingPlans.map((plan, index) => {
              const IconComp = plan.icon;
              return (
                <article key={index} className={`group relative overflow-hidden rounded-3xl border bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${plan.title === 'Advanced Plan' ? 'border-violet-500 ring-2 ring-violet-500/20' : 'border-slate-200'}`}>
                  {plan.title === 'Advanced Plan' && (
                    <div className="absolute top-4 right-4 z-10 rounded-full bg-violet-500 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm">Most Popular</div>
                  )}
                  <img src={plan.image} alt={plan.title} className="h-44 w-full object-cover" />
                  <div className="p-6">
                    <h3 className="inline-flex items-center gap-2 text-lg font-black uppercase tracking-[0.06em] text-slate-900">
                      <IconComp className="w-5 h-5 text-violet-500 shrink-0 group-hover:scale-110 transition-transform duration-300" />
                      {plan.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 min-h-[40px]">{plan.description}</p>
                    <ul className="mt-4 space-y-2 text-sm text-slate-700 min-h-[180px]">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <CheckCircle className="text-emerald-500 w-4 h-4 shrink-0 group-hover:scale-110 group-hover:text-emerald-600 transition-all duration-300" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 rounded-2xl border border-violet-500/60 bg-violet-50/30 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">Starting Price</p>
                      <p className="mt-1 text-3xl font-bold leading-tight tracking-tight text-slate-900">
                        {plan.price} <span className="text-sm font-semibold text-slate-500">{plan.period}</span>
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm">
            <p><strong>Note:</strong> Pricing covers service fees only. Paid promotions and ad boosts are billed separately based on campaign goals.</p>
          </div>

          {/* Custom Strategy Banner */}
          <div className="mt-12 rounded-3xl border border-violet-200 bg-violet-50/30 p-8 text-center backdrop-blur-sm">
            <p className="text-lg text-slate-700 font-medium flex items-center justify-center gap-2 flex-wrap">
              <Sparkles className="text-violet-600 w-5 h-5" />
              Not every business fits into a box. Let’s build a custom strategy tailored to your growth goals.
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#FFCE1B] px-6 py-3 text-sm font-extrabold text-slate-900 hover:bg-[#d99a00] cursor-pointer shadow-sm hover:shadow hover:scale-[1.03] active:scale-95 transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
              Get a Custom Proposal
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SMM Process Section */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold sm:text-4xl text-slate-900">Our Process</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">A clear execution system to plan, create, publish, and scale your social media results.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <article key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm hover:border-violet-300 hover:shadow-md transition-all duration-300">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-violet-600">{step.step}</p>
                <h3 className="mt-3 text-lg font-extrabold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{step.desc}</p>
              </article>
            ))}
          </div>

          {/* Micro Process */}
          <div className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h3 className="text-2xl font-extrabold text-slate-900">Micro Process</h3>
            <p className="mt-2 text-sm text-slate-600">Detailed workflow we follow each month for consistent quality and growth.</p>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {microProcessItems.map((item, index) => (
                <div key={index} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:-translate-y-0.5 transition-all duration-300">
                  <p className="text-sm font-bold text-slate-900">{item.title}</p>
                  <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                    {item.items.map((sub, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-1.5 before:content-['•'] before:text-violet-500 before:font-bold">
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Performance Marketing Experts */}
      <section className="bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <div className="grid items-start gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Performance Marketing Experts</h2>
                <p className="mt-3 max-w-3xl text-slate-600">With over 15 years of experience helping brands grow online, Clevercrow creates marketing systems that drive ROI, not just traffic.</p>
                <ul className="mt-5 space-y-3.5 text-[18px] text-slate-700">
                  <li className="flex items-center"><CheckCircle className="mr-2 text-emerald-500 w-5 h-5 shrink-0" />15+ Years of Marketing Experience</li>
                  <li className="flex items-center"><CheckCircle className="mr-2 text-emerald-500 w-5 h-5 shrink-0" />Google & Meta Certified Professionals</li>
                  <li className="flex items-center"><CheckCircle className="mr-2 text-emerald-500 w-5 h-5 shrink-0" />100+ Businesses Grown Across India</li>
                  <li className="flex items-center"><CheckCircle className="mr-2 text-emerald-500 w-5 h-5 shrink-0" />Transparent Reporting & Real ROI Tracking</li>
                </ul>
              </div>

              <div className="lg:col-span-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-2">Certified Partners</p>
                <div className="mt-3 space-y-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm hover:-translate-y-0.5 hover:border-violet-400/40 hover:shadow transition-all duration-300">
                    <div className="flex h-16 items-center justify-center rounded-xl bg-slate-50">
                      <img src="/lp/digital-marketing/images/google-partner25.svg" alt="Google Partner" className="h-8 w-32 object-contain" />
                    </div>
                    <p className="mt-2 text-center text-sm font-semibold text-slate-800">Google Partner</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm hover:-translate-y-0.5 hover:border-violet-400/40 hover:shadow transition-all duration-300">
                    <div className="flex h-16 items-center justify-center rounded-xl bg-slate-50">
                      <img src="/lp/digital-marketing/images/meta.png" alt="Meta Certified" className="h-8 w-32 object-contain" />
                    </div>
                    <p className="mt-2 text-center text-sm font-semibold text-slate-800">Meta Certified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Direct CTA Panel */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold sm:text-4xl text-white">Grow Your Business with Digital Marketing</h2>
          <p className="mt-3 text-slate-200">SEO, Social Media, Google Ads, and conversion-focused strategy.</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a 
              href="tel:09986389444" 
              onClick={trackCallClick}
              className="inline-flex items-center gap-2 rounded-full bg-[#FFCE1B] px-6 py-3 font-bold text-slate-900 hover:bg-[#d99a00] hover:scale-[1.03] active:scale-95 transition-all duration-200 shadow-sm"
            >
              <Phone className="w-4 h-4" />
              09986389444
            </a>
            <a 
              href={whatsappUrl} 
              onClick={trackWhatsAppClick}
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-bold text-white hover:bg-emerald-400 hover:scale-[1.03] active:scale-95 transition-all duration-200 shadow-sm"
            >
              <FaWhatsapp className="text-lg" />
              Chat with Us on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Reels Section */}
      <section id="our-work" className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold text-slate-900 mb-2">Our Work: Trending Reels</h2>
          <p className="text-center text-slate-600 mb-8 max-w-xl mx-auto">Take a look at high-impact content crafted by our social production teams.</p>
          <div className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            {(showAllReels ? reels : reels.slice(0, 10)).map((src, i) => (
              <video 
                key={i} 
                ref={reelCallback}
                data-src={src}
                className="w-full rounded-2xl shadow-sm aspect-[9/16] object-cover bg-black border border-slate-200 hover:scale-[1.02] hover:border-violet-400/40 transition-all duration-300 cursor-pointer" 
                muted 
                loop 
                playsInline
                preload="none"
              />
            ))}
          </div>
          {!showAllReels && reels.length > 10 && (
            <div className="mt-8 text-center">
              <button 
                onClick={() => setShowAllReels(true)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 cursor-pointer"
              >
                View All Reels
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Client Stats Grid */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold text-slate-900">Our Clients Get Results</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((res, index) => (
              <StatCard key={index} value={res.value} label={res.label} color={res.color} img={res.img} />
            ))}
          </div>
        </div>
      </section>

      {/* Success Testimonial Cards */}
      <section className="py-14 sm:py-16 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold text-slate-900">Join Our Success Stories</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((test, index) => (
              <article key={index} className="relative rounded-2xl border border-slate-200 border-l-4 border-l-amber-400 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <span className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 z-10">
                  <FaGoogle className="w-4 h-4 text-[#4285F4]" />
                </span>
                <span className="absolute right-6 bottom-2 text-7xl font-serif text-slate-100 select-none pointer-events-none leading-none">”</span>
                <p className="text-amber-500 font-bold text-sm tracking-wide">{test.stars}</p>
                <p className="mt-3 text-slate-600 text-[14.7px] leading-relaxed relative z-10">"{test.quote}"</p>
                <p className="mt-4 text-xs font-bold text-slate-900 tracking-wide uppercase relative z-10">{test.client}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Details Accordion */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold text-slate-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <details key={index} className="group rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors duration-300 open:bg-amber-50/20 faq-details" open={index === 0}>
                <summary className="cursor-pointer font-semibold text-slate-800 hover:text-amber-600 transition-colors duration-300 list-none flex items-center justify-between">
                  <span>{faq.q}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-open:text-amber-500 transition-all duration-300 group-open:rotate-180 shrink-0 ml-2" />
                </summary>
                <div className="faq-answer">
                  <p className="pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-200/50 mt-2">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 py-12 text-center text-white border-t border-slate-700/50">
        <div className="mx-auto inline-flex items-center justify-center bg-white px-5 py-2.5 rounded-2xl mb-6 shadow-sm">
          <img src="/lp/digital-marketing/images/logo-dark.svg" alt="Clevercrow" className="h-9 w-auto" />
        </div>
        <h3 className="text-2xl font-extrabold text-white">Start Scaling Your Business Today</h3>
        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a 
            href="tel:09986389444" 
            onClick={trackCallClick}
            className="inline-flex items-center gap-2 rounded-full bg-[#FFCE1B] px-6 py-3 font-bold text-slate-900 transition hover:bg-[#d99a00] hover:shadow-lg hover:shadow-amber-500/20"
          >
            <Phone className="w-4 h-4" />
            09986389444
          </a>
          <a 
            href={whatsappUrl} 
            onClick={trackWhatsAppClick}
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-bold text-white hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20"
          >
            <FaWhatsapp className="text-lg" />
            Chat with Us on WhatsApp
          </a>
        </div>
        <p className="mt-6 text-sm text-slate-400">Clever Crow Strategies LLP. © All rights reserved.</p>
        <p className="mt-1 text-xs text-slate-500">
          <a className="underline hover:text-amber-400 transition-colors duration-300" href="/privacy-policy">Privacy Policy</a>
          <span className="mx-2">|</span>
          <a className="underline hover:text-amber-400 transition-colors duration-300" href="/terms-and-conditions">Terms & Conditions</a>
        </p>
      </footer>

      {/* Sticky bottom bar (Desktop / Tablet) */}
      <div className="fixed inset-x-0 bottom-0 z-50 hidden items-center justify-center border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-8px_22px_rgba(15,23,42,0.15)] backdrop-blur sm:flex">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-center gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-[#FFCE1B] px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-[#d99a00] cursor-pointer shadow-sm"
          >
            <Phone className="w-4 h-4" />
            Request a Call Back
          </button>
          <a 
            href={whatsappUrl} 
            onClick={trackWhatsAppClick}
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-400 shadow-sm"
          >
            <FaWhatsapp className="text-base" />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Sticky bottom bar (Mobile) */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center border-t border-slate-200 bg-white/95 px-4 py-2.5 shadow-[0_-8px_22px_rgba(15,23,42,0.15)] backdrop-blur sm:hidden">
        <div className="flex w-full max-w-md items-center justify-center gap-3">
          <a 
            href="tel:09986389444" 
            onClick={trackCallClick}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#FFCE1B] text-slate-900 active:scale-95 transition-transform" 
            aria-label="Call us"
          >
            <Phone className="w-5 h-5" />
          </a>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex-1 inline-flex h-11 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-xs uppercase px-4 active:scale-95 transition-transform cursor-pointer"
          >
            Get Free Callback
          </button>
          <a 
            href={whatsappUrl} 
            onClick={trackWhatsAppClick}
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-white active:scale-95 transition-transform whatsapp-mobile-pulse" 
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp className="text-xl" />
          </a>
        </div>
      </div>

      {/* Callback Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-soft relative border border-slate-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 rounded-full p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors" 
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mt-2">
              <Phone className="w-5 h-5 text-violet-500" />
              Request a Call Back
            </h3>
            <p className="text-slate-500 text-xs mt-1 mb-6">Leave your details and our team will get back to you shortly.</p>

            <form onSubmit={handleModalFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="quoteName" className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-slate-600">Full Name</label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                  <input 
                    type="text" 
                    id="quoteName" 
                    required 
                    name="name"
                    value={modalFormData.name}
                    onChange={handleModalInputChange}
                    placeholder="Enter your name" 
                    disabled={modalStatus.loading}
                    className="w-full rounded-xl border border-slate-300 pl-11 pr-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition" 
                  />
                </div>
              </div>
              <div>
                <label htmlFor="quotePhone" className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-slate-600">Phone Number</label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                  <input 
                    type="tel" 
                    id="quotePhone" 
                    required 
                    name="phone"
                    value={modalFormData.phone}
                    onChange={handleModalInputChange}
                    placeholder="Enter your phone number" 
                    disabled={modalStatus.loading}
                    className="w-full rounded-xl border border-slate-300 pl-11 pr-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition" 
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={modalStatus.loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-700 disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                {modalStatus.loading ? 'Submitting...' : 'Submit Request'}
              </button>
              {modalStatus.error && <p className="text-xs text-rose-600 mt-2">{modalStatus.error}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
