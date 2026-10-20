"use client";

import React, { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Phone, Monitor, Search, Sparkles, Award, Users, Star, BadgeCheck,
  Megaphone, CheckCircle, ShieldCheck, User, Send, ArrowRight, X, 
  ChevronDown 
} from 'lucide-react';
import { FaWhatsapp, FaGoogle, FaInstagram } from 'react-icons/fa';
import { SiGoogleads, SiGoogleanalytics, SiGooglesearchconsole, SiGoogletagmanager, SiMeta, SiWhatsapp } from 'react-icons/si';
import './service.css';
import ResultsShowcase from './ResultsShowcase';
import IndustriesServed from './IndustriesServed';
import StickyCtaBar from './StickyCtaBar';
import ServiceFooter from './ServiceFooter';
import SectionHeading from './SectionHeading';
import HeroDoodles from './HeroDoodles';
import ArcBackground from './ArcBackground';
import { MotionConfig } from 'framer-motion';
import { Reveal, RiseText, Stagger, StaggerItem } from './motion';

export default function DigitalMarketingServiceClient() {
  const router = useRouter();
  const whatsappUrl = "https://wa.me/919986389444?text=Hi%20Clever%20Crow%2C%20I%27m%20interested%20in%20digital%20marketing%20services.%20(Ref:%20LP/Digital-Marketing/Service)";
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
      await submitLead(formData.name, formData.phone, "Digital Marketing Service Landing Page");
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
      await submitLead(modalFormData.name, modalFormData.phone, "Digital Marketing Service Landing Page (Modal)");
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
      title: "Website Development",
      description: "Professional business website focused on trust and enquiries.",
      icon: Monitor,
      features: [
        "Responsive across all devices",
        "Lead-focused page structure",
        "Fast and secure setup",
        "WhatsApp and call CTA integration",
        "Basic on-page SEO setup"
      ],
      image: "/lp/digital-marketing/images/webbg.jpg"
    },
    {
      title: "SEO, AIO, GEO",
      description: "Boost search visibility and get steady organic leads.",
      icon: Search,
      features: [
        "Keyword and competitor research",
        "On-page and technical SEO",
        "Monthly growth reporting",
        "Google Business profile optimization",
        "Content gap and topic mapping"
      ],
      image: "/lp/digital-marketing/images/seobg.jpg"
    },
    {
      title: "Google Ads",
      description: "Run high-intent campaigns that bring qualified enquiries.",
      icon: FaGoogle,
      features: [
        "Search and display campaigns",
        "Conversion tracking setup",
        "Weekly optimization review",
        "Negative keyword refinement",
        "Landing page quality improvement notes"
      ],
      image: "/lp/digital-marketing/images/googleadsbg.jpg"
    },
    {
      title: "Meta Ads",
      description: "Generate leads from Facebook and Instagram campaigns.",
      icon: FaInstagram,
      features: [
        "Creative and audience strategy",
        "Retargeting setup",
        "Monthly ROI reports",
        "Lead form campaign optimization",
        "Creative testing framework"
      ],
      image: "/lp/digital-marketing/images/metabg.jpg"
    },
    {
      title: "AI Automation",
      description: "Automate lead follow-ups and sales workflows efficiently.",
      icon: Sparkles,
      features: [
        "Email and WhatsApp automation",
        "CRM and chatbot integration",
        "Custom workflow setup",
        "Lead assignment and routing logic",
        "Follow-up reminder automation"
      ],
      image: "/lp/digital-marketing/images/aibg.jpg"
    },
    {
      title: "Social Media Management",
      description: "Build a strong brand presence with consistent social content.",
      icon: Megaphone,
      features: [
        "Content planning and creatives",
        "Post scheduling and publishing",
        "Monthly insight reports",
        "Reel and short-video content plan",
        "Community response guidance"
      ],
      image: "/lp/digital-marketing/images/smm.jpg"
    }
  ];

  // Figures already published on Clever Crow's pages; confirm before changing.
  const heroAchievements = [
    { value: "15+ Years", label: "Marketing experience", icon: Award },
    { value: "550+", label: "Businesses served", icon: Users },
    { value: "4.9/5", label: "Average client rating", icon: Star },
    { value: "Certified", label: "Google & Meta experts", icon: BadgeCheck },
  ];

  // Ad, analytics and tracking platforms the team works in.
  const heroPlatforms = [
    { name: "Google Ads", icon: SiGoogleads, color: "#4285F4" },
    { name: "Meta Ads", icon: SiMeta, color: "#0866FF" },
    { name: "Google Analytics", icon: SiGoogleanalytics, color: "#E37400" },
    { name: "Google Tag Manager", icon: SiGoogletagmanager, color: "#246FDB" },
    { name: "Search Console", icon: SiGooglesearchconsole, color: "#458CF5" },
    { name: "WhatsApp Business", icon: SiWhatsapp, color: "#25D366" },
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

  return (
    <MotionConfig reducedMotion="user">
    <div className="svc-root bg-slate-50 text-slate-800 hospitality-funnel">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#" className="inline-flex min-w-0 items-center gap-3">
            <img src="/CSS.svg" alt="Clever Crow" className="h-6 w-auto min-[380px]:h-7 sm:h-8" />
          </a>
          <div className="flex items-center gap-2">
            <a 
              href="tel:09986389444" 
              onClick={trackCallClick}
              aria-label="Call 099863 89444"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-[#FFCE1B] text-sm font-bold text-slate-900 shadow-sm transition hover:bg-[#d99a00] sm:w-auto sm:px-4"
            >
              <Phone className="h-[18px] w-[18px] shrink-0" />
              <span className="hidden sm:inline">09986389444</span>
            </a>
            <a 
              href={whatsappUrl} 
              onClick={trackWhatsAppClick}
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Chat on WhatsApp"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-[#25D366] text-sm font-bold text-white shadow-sm transition hover:brightness-110 sm:w-auto sm:px-4"
            >
              <FaWhatsapp className="h-5 w-5 shrink-0" />
              <span className="hidden sm:inline">Chat</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="top" className="relative isolate overflow-hidden bg-[#040a1c] text-white">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          {/* Base: navy with a lighter spotlight behind the headline */}
          <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_20%_10%,#163a8f_0%,#0b1c4d_38%,#040a1c_78%)]" />
          {/* Aurora sweep across the top right */}
          <div className="absolute -top-40 right-[-10%] h-[620px] w-[820px] rotate-12 rounded-full bg-[conic-gradient(from_200deg_at_50%_50%,rgba(59,130,246,0.0),rgba(59,130,246,0.28),rgba(255,206,27,0.18),rgba(59,130,246,0.0))] blur-[110px]" />
          {/* Warm glow behind the form */}
          <div className="absolute bottom-[-12%] right-[8%] h-[420px] w-[520px] rounded-full bg-amber-400/[0.13] blur-[130px]" />
          {/* Dot grid, fading toward the edges */}
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.22) 1px, transparent 1.2px)",
              backgroundSize: "26px 26px",
              maskImage: "radial-gradient(ellipse 65% 60% at 30% 40%, black, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse 65% 60% at 30% 40%, black, transparent 75%)",
            }}
          />
          {/* Target rings behind the form (desktop) */}
          <div className="absolute right-[2%] top-1/2 hidden h-[760px] w-[760px] -translate-y-1/2 lg:block xl:right-[6%]">
            {[100, 78, 56, 34].map((size) => (
              <div
                key={size}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]"
                style={{ width: `${size}%`, height: `${size}%` }}
              />
            ))}
          </div>
          {/* Edge highlights */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#040a1c]/80" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
          <HeroDoodles />
          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Copy */}
            <div className="lg:col-span-8">
              <h1 className="text-[2.2rem] font-extrabold leading-[1.06] tracking-[-0.035em] sm:text-[3.25rem] lg:text-[3rem] xl:text-[3.85rem]">
                Turn More Searches &amp; Clicks Into{" "}
                <span className="bg-gradient-to-r from-[#FFE27A] via-[#FFCE1B] to-[#F5A623] bg-clip-text text-transparent sm:whitespace-nowrap">
                  Business Enquiries<span className="-ml-[0.1em]">.</span>
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Grow your business with digital marketing that brings more leads and sales.
              </p>

              <ul className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:gap-4">
                {heroAchievements.map(({ value, label, icon: Icon }) => (
                  <li key={label} className="flex flex-col items-start gap-2.5 rounded-2xl border border-white/10 bg-white/[0.05] p-3.5 backdrop-blur-sm min-[380px]:flex-row min-[380px]:items-center min-[380px]:gap-3 sm:gap-4 sm:p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-[#071330] sm:h-11 sm:w-11">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-lg font-extrabold leading-none text-white sm:text-2xl">{value}</span>
                      <span className="mt-1 block text-xs font-medium leading-snug text-slate-300 sm:text-sm">{label}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 hidden flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold sm:flex">
                <a href="tel:09986389444" onClick={trackCallClick} className="inline-flex items-center gap-2 text-white transition hover:text-amber-300">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"><Phone className="h-4 w-4 text-amber-300" /></span>
                  099863 89444
                </a>
                <a href="#results" className="inline-flex items-center gap-1.5 text-slate-300 transition hover:text-white">
                  See real client results
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Callback form */}
            <div className="relative lg:col-span-4 lg:w-full lg:max-w-[360px] lg:justify-self-end">
              <div className="relative">
                <div className="pointer-events-none absolute -inset-px rounded-[1.6rem] bg-gradient-to-b from-amber-300/70 via-white/15 to-white/5" aria-hidden="true" />
                <div className="relative rounded-3xl bg-white p-6 text-slate-900 shadow-[0_40px_90px_-25px_rgba(0,0,0,0.75)] sm:p-8 lg:p-6">
                  <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">Request a Call Back</h2>

                  <form onSubmit={handleFormSubmit} className="mt-5 space-y-3">
                    <label className="relative block">
                      <span className="sr-only">Your name</span>
                      <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        disabled={status.loading}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100"
                      />
                    </label>
                    <label className="relative block">
                      <span className="sr-only">Your phone number</span>
                      <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        autoComplete="tel"
                        inputMode="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone number"
                        disabled={status.loading}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100"
                      />
                    </label>
                    <button
                      type="submit"
                      disabled={status.loading}
                      className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#FFCE1B] text-sm font-bold text-[#071330] shadow-lg shadow-amber-500/25 transition hover:brightness-105 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                    >
                      {status.loading ? 'Submitting...' : 'Get My Free Callback'}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                    {status.error && <p className="text-xs text-rose-600">{status.error}</p>}
                    {status.success && <p className="text-xs text-emerald-600">Request submitted successfully!</p>}
                  </form>

                  <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-500">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                    We respect your privacy
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Partner platforms bar spanning the full width */}
          <div className="mt-12 border-t border-white/10 py-8 sm:mt-14 lg:mt-16">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-10">
              <p className="shrink-0 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Partnered with
              </p>
              <ul className="grid flex-1 grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
                {heroPlatforms.map(({ name, icon: Icon, color }) => (
                  <li key={name} className="flex h-14 items-center gap-2.5 rounded-xl bg-white px-3.5 shadow-sm transition duration-300 hover:-translate-y-0.5 sm:h-16">
                    <Icon className="h-6 w-6 shrink-0" style={{ color }} aria-hidden="true" />
                    <span className="text-[13px] font-bold leading-tight text-slate-800">{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* One continuous patterned surface behind the logo strip and the services, so the pattern never restarts */}
      <div className="svc-pattern svc-pattern--arcs relative isolate">
        <ArcBackground />
      {/* Brands We Work With */}
      <section className="overflow-hidden py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">Brands We Work With</h2>
          <Reveal y={20}>
          <div className="fade-edge relative overflow-hidden rounded-2xl border border-slate-200 bg-white py-4">
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
          </Reveal>
        </div>
      </section>

      {/* Smart Plans / Pricing Section */}
      <section id="pricing" className="overflow-hidden pb-14 pt-8 sm:pb-20 sm:pt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our services"
            title="Smart Plans, Tailored for Business Growth"
            subtitle="Solutions designed to drive real growth."
          />

          <Stagger className="mt-10 grid gap-6 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
            {pricingPlans.map((plan, index) => {
              const IconComp = plan.icon;
              return (
                <StaggerItem key={index} variant="tilt" className="h-full">
                <article className="group relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="overflow-hidden">
                    <img src={plan.image} alt={plan.title} className="h-44 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
                  </div>
                  <div className="p-6">
                    <h3 className="inline-flex items-center gap-2 text-lg font-black uppercase tracking-[0.06em] text-slate-900">
                      <IconComp className="w-5 h-5 text-amber-500 shrink-0 group-hover:scale-110 transition-transform duration-300" />
                      {plan.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 min-h-[40px]">{plan.description}</p>
                    <ul className="mt-4 space-y-2 text-sm text-slate-700 min-h-[140px]">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <CheckCircle className="text-emerald-500 w-4 h-4 shrink-0 group-hover:scale-110 group-hover:text-emerald-600 transition-all duration-300" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="mt-5 inline-flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-bold text-slate-900 transition-colors duration-300 group-hover:border-amber-300 group-hover:bg-[#fff9e3] cursor-pointer"
                    >
                      Get a Custom Quote
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#071330] text-[#FFCE1B] transition-transform duration-300 group-hover:translate-x-0.5">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </button>
                  </div>
                </article>
                </StaggerItem>
              );
            })}
          </Stagger>

          {/* Custom Strategy Banner */}
          <Reveal y={24} scale={0.98}>
          <div className="mt-12 rounded-3xl border border-amber-200 bg-amber-50/50 p-8 text-center backdrop-blur-sm">
            <p className="text-lg text-slate-700 font-medium flex items-center justify-center gap-2 flex-wrap">
              <Sparkles className="text-amber-600 w-5 h-5" />
              Not every business fits into a box. Let’s build a custom strategy tailored to your growth goals.
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#FFCE1B] px-6 py-3 text-sm font-extrabold text-slate-900 hover:bg-[#d99a00] cursor-pointer shadow-sm hover:shadow hover:scale-[1.03] active:scale-95 transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
              Request a Call Back
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          </Reveal>
        </div>
      </section>
      </div>

      {/* Direct CTA Panel */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold sm:text-4xl text-white"><RiseText text="Grow Your Business with Digital Marketing" /></h2>
          <Reveal y={16} delay={0.2}>
            <p className="mt-3 text-slate-200">SEO, Social Media, Google Ads, and conversion-focused strategy.</p>
          </Reveal>
          <Reveal y={20} delay={0.32} className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
          </Reveal>
        </div>
      </section>

      {/* Reels Section — Improvement #2: Lazy-load, show 10 initially */}
      <section id="our-work" className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our work"
            title="Trending Reels We've Produced"
            subtitle="Take a look at high-impact content crafted by our social production teams."
          />
          <Stagger className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5" stagger={0.06}>
            {(showAllReels ? reels : reels.slice(0, 10)).map((src, i) => (
              <StaggerItem key={i} variant="pop">
              <video 
                ref={reelCallback}
                data-src={src}
                className="w-full rounded-2xl shadow-sm aspect-[9/16] object-cover bg-black border border-slate-200 hover:scale-[1.02] hover:border-amber-400/40 transition-all duration-300 cursor-pointer" 
                muted 
                loop 
                playsInline
                preload="none"
              />
              </StaggerItem>
            ))}
          </Stagger>
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

      {/* Our Results: case studies with scroll-driven galleries */}
      <ResultsShowcase />

      {/* Industries We've Served */}
      <IndustriesServed onOpenModal={() => setIsModalOpen(true)} />

      {/* Success Testimonial Cards — Improvement #4: Google icon + left border */}
      <section className="overflow-hidden py-14 sm:py-16 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Client testimonials" title="What Our Clients Say" />
          <Stagger className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {testimonials.map((test, index) => (
              <StaggerItem key={index} variant={index % 3 === 0 ? "slide-left" : index % 3 === 2 ? "slide-right" : "rise"} className="h-full">
              <article className="relative h-full rounded-2xl border border-slate-200 border-l-4 border-l-amber-400 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <span className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 z-10">
                  <FaGoogle className="w-4 h-4 text-[#4285F4]" />
                </span>
                <span className="absolute right-6 bottom-2 text-7xl font-serif text-slate-100 select-none pointer-events-none leading-none">”</span>
                <p className="text-amber-500 font-bold text-sm tracking-wide">{test.stars}</p>
                <p className="mt-3 text-slate-600 text-[14.7px] leading-relaxed relative z-10">&ldquo;{test.quote}&rdquo;</p>
                <p className="mt-4 text-xs font-bold text-slate-900 tracking-wide uppercase relative z-10">{test.client}</p>
              </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FAQ Details Accordion */}
      <section id="faq" className="scroll-mt-20 overflow-hidden bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQs" title="Frequently Asked Questions" className="mb-10" />
          <Stagger className="space-y-3" stagger={0.07}>
            {faqs.map((faq, index) => (
              <StaggerItem key={index} variant="slide-left">
              <details className="group rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors duration-300 open:bg-amber-50/20 faq-details" open={index === 0}>
                <summary className="cursor-pointer font-semibold text-slate-800 hover:text-amber-600 transition-colors duration-300 list-none flex items-center justify-between">
                  <span>{faq.q}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-open:text-amber-500 transition-all duration-300 group-open:rotate-180 shrink-0 ml-2" />
                </summary>
                <div className="faq-answer">
                  <p className="pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-200/50 mt-2">{faq.a}</p>
                </div>
              </details>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <ServiceFooter
        whatsappUrl={whatsappUrl}
        services={pricingPlans.map((plan) => plan.title)}
        onOpenModal={() => setIsModalOpen(true)}
        onCallClick={trackCallClick}
        onWhatsAppClick={trackWhatsAppClick}
      />

      <StickyCtaBar
        whatsappUrl={whatsappUrl}
        onCallClick={trackCallClick}
        onWhatsAppClick={trackWhatsAppClick}
      />

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
              <Phone className="w-5 h-5 text-amber-500" />
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
                    className="w-full rounded-xl border border-slate-300 pl-11 pr-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition" 
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
                    className="w-full rounded-xl border border-slate-300 pl-11 pr-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition" 
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
    </MotionConfig>
  );
}
