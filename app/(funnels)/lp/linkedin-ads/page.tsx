"use client";

import React, { useState } from "react";
import Image from "next/image";
import "../lp.css";

// Components
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import PricingSection from "../components/PricingSection";
import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";
import CallbackModal from "../components/CallbackModal";
import WhatsAppButton from "../components/WhatsAppButton";

/* ──────────── LOGO BASE PATH ──────────── */
const LOGO_DIR = "/linkedin-ads/logos";

/* ──────────── PORTFOLIO DATA (categorised) ──────────── */
interface PortfolioClient {
  name: string;
  stat: string;
  metric: string;
  logo: string;
}

interface PortfolioCategory {
  category: string;
  icon: string;          // emoji or unicode icon
  color: string;         // accent colour for category pill
  clients: PortfolioClient[];
}

const portfolioData: PortfolioCategory[] = [
  {
    category: "Food & Beverage",
    icon: "🍽️",
    color: "#ef4444",
    clients: [
      { name: "Apsara Ice Creams", stat: "15+", metric: "B2B Franchise Leads/mo", logo: `${LOGO_DIR}/apsara-ice-creams.png` },
      { name: "Snacket", stat: "30+", metric: "Retail Dist. Inquiries", logo: `${LOGO_DIR}/snacket.png` },
      { name: "Dil Foods", stat: "120+", metric: "Cloud Kitchen Leads", logo: `${LOGO_DIR}/dil-foods.png` },
      { name: "Foodstories", stat: "4x", metric: "Organic brand reach", logo: `${LOGO_DIR}/foodstories.png` },
      { name: "Curefoods", stat: "35%", metric: "Drop in Hiring CPL", logo: `${LOGO_DIR}/curefoods.png` },
      { name: "Truffles", stat: "40+", metric: "Corporate Catering Leads", logo: `${LOGO_DIR}/truffles.png` },
    ],
  },
  {
    category: "Hospitality",
    icon: "🏨",
    color: "#8b5cf6",
    clients: [
      { name: "Loyal Hospitality", stat: "60+", metric: "Strategic connections", logo: `${LOGO_DIR}/loyal-hospitality.png` },
      { name: "Shangri-La", stat: "150+", metric: "HNI event inquiries", logo: `${LOGO_DIR}/shangri-la.png` },
      { name: "Dan Hospitality", stat: "2x", metric: "Employer brand engagement", logo: `${LOGO_DIR}/dan-hospitality.png` },
      { name: "AA Hospitality", stat: "45+", metric: "Partnership Discussions", logo: `${LOGO_DIR}/aa-hospitality.png` },
    ],
  },
  {
    category: "Luxury & Lifestyle",
    icon: "💎",
    color: "#ec4899",
    clients: [
      { name: "Svaraa Jewels", stat: "12x", metric: "ROAS on HNI campaigns", logo: `${LOGO_DIR}/svaraa-jewels.png` },
      { name: "Paresh Lamba", stat: "80+", metric: "Bespoke styling appts", logo: `${LOGO_DIR}/paresh-lamba.png` },
      { name: "Aquarelle India", stat: "200+", metric: "Leadership Applications", logo: `${LOGO_DIR}/aquarelle-india.png` },
      { name: "Speedo", stat: "3x", metric: "Distributor engagement", logo: `${LOGO_DIR}/speedo.png` },
    ],
  },
  {
    category: "Finance & Consulting",
    icon: "📊",
    color: "#0ea5e9",
    clients: [
      { name: "Trigen Wealth", stat: "50+", metric: "Qualified HNI discussions", logo: `${LOGO_DIR}/trigen-wealth.png` },
    ],
  },
  {
    category: "Corporate & B2B Tech",
    icon: "🏢",
    color: "#0284c7",
    clients: [
      { name: "MAC Sources", stat: "180+", metric: "Global B2B leads", logo: `${LOGO_DIR}/mac-sources.png` },
      { name: "Agnile", stat: "45", metric: "Enterprise Demos Booked", logo: `${LOGO_DIR}/agnile.png` },
      { name: "HVAC Contractors", stat: "30+", metric: "Commercial site visits", logo: `${LOGO_DIR}/hvac-contractors.png` },
    ],
  },
  {
    category: "Marketing & Creative",
    icon: "🎨",
    color: "#f59e0b",
    clients: [
      { name: "Orange & Teal", stat: "3x", metric: "Agency profile views", logo: `${LOGO_DIR}/orange-and-teal.png` },
    ],
  },
  {
    category: "Personal Brand & Coaching",
    icon: "🎤",
    color: "#10b981",
    clients: [
      { name: "Mirchi Excellence", stat: "250+", metric: "Coaching Signups", logo: `${LOGO_DIR}/mirchi-excellence.png` },
    ],
  },
];

export default function LinkedInAdsLandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>("Food & Beverage");

  const visibleCategories = activeCategory
    ? portfolioData.filter((c) => c.category === activeCategory)
    : portfolioData;

  return (
    <main className="landing-page-container">
      <div className="site-shell">
        <Header />
        <main id="top">
          {/* SECTION 1 - HERO */}
          <HeroSection data={{
            badges: ["LinkedIn Experts", "Lead Generation", "Brand Building", "Organic Growth"],
            title: "LinkedIn Management",
            accentTitle: "@ Just ₹8,999",
            subtitle: "Build Authority. Attract Clients. Grow Organically.",
            highlights: [
              "8 Professional Posts Every Month",
              "Profile & Page Optimization",
              "Organic Growth Strategy"
            ],
            ctaLabel: "Start LinkedIn Growth Today"
          }} />

          {/* SECTION 2 - PROBLEM */}
          <section className="py-16 sm:py-24 bg-white relative border-b border-slate-100">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-8">
                Not Getting Leads from LinkedIn?
              </h2>
              <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                Most professionals post randomly on LinkedIn but don't see results.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                <div className="flex flex-col items-center p-6 bg-gradient-to-b from-white to-red-50/30 border border-red-100/50 rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-red-200">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-xl tracking-tight">No Strategy</h3>
                </div>
                <div className="flex flex-col items-center p-6 bg-gradient-to-b from-white to-red-50/30 border border-red-100/50 rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-red-200">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-xl tracking-tight">No Positioning</h3>
                </div>
                <div className="flex flex-col items-center p-6 bg-gradient-to-b from-white to-red-50/30 border border-red-100/50 rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-red-200">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-xl tracking-tight">No Consistency</h3>
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-6">
                That's why LinkedIn doesn't convert.
              </p>
            </div>
          </section>

          {/* SECTION 3 - SOLUTION */}
          <section className="py-16 sm:py-24 bg-slate-900 text-white relative">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8 text-[#f4c542]">
                We Turn Your LinkedIn Into a Lead Machine
              </h2>
              <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                We handle everything — from profile optimization to content creation — so your LinkedIn starts bringing real business.
              </p>
            </div>
          </section>

          {/* ══════════════════ SECTION PORTFOLIO ══════════════════ */}
          <section className="py-20 sm:py-28 bg-slate-50 relative border-b border-slate-200 overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#f4c542]/5 blur-3xl rounded-full pointer-events-none"></div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
              {/* Section Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-5">
                  Our Portfolio
                </h2>
                <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
                  Measured, scaled, and delivered for top brands across industries.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-14">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`px-4 py-2 rounded-full text-sm font-bold border transition-all duration-300 ${
                    activeCategory === null
                      ? "bg-slate-900 text-white border-slate-900 shadow-lg"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-900"
                  }`}
                >
                  All Industries
                </button>
                {portfolioData.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => setActiveCategory(cat.category === activeCategory ? null : cat.category)}
                    className={`px-4 py-2 rounded-full text-sm font-bold border transition-all duration-300 flex items-center gap-1.5 ${
                      activeCategory === cat.category
                        ? "text-white shadow-lg"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-900"
                    }`}
                    style={activeCategory === cat.category ? { backgroundColor: cat.color, borderColor: cat.color } : {}}
                  >
                    <span>{cat.icon}</span>
                    {cat.category}
                  </button>
                ))}
              </div>

              {/* Category Groups */}
              <div className="space-y-16">
                {visibleCategories.map((cat) => (
                  <div key={cat.category}>
                    {/* Category Label */}
                    <div className="flex items-center gap-3 mb-8">
                      <span className="text-2xl">{cat.icon}</span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">
                        {cat.category}
                      </h3>
                      <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent ml-2"></div>
                      <span
                        className="text-xs font-bold px-3 py-1 rounded-full text-white"
                        style={{ backgroundColor: cat.color }}
                      >
                        {cat.clients.length} {cat.clients.length === 1 ? "client" : "clients"}
                      </span>
                    </div>

                    {/* Client Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {cat.clients.map((client, idx) => (
                        <div
                          key={idx}
                          className="group relative w-full h-[360px] rounded-3xl overflow-hidden shadow-lg border border-slate-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-amber-300"
                        >
                          {/* Logo / Image Layer */}
                          <div className="absolute inset-0 flex flex-col items-center pt-8 bg-gradient-to-br from-slate-50 via-white to-slate-100 transition-transform duration-700 ease-out group-hover:scale-105 z-0">
                            {/* Dot pattern */}
                            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>

                            {/* Logo */}
                            <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center z-10 mb-2">
                              <Image
                                src={client.logo}
                                alt={`${client.name} logo`}
                                fill
                                className="object-contain drop-shadow-sm"
                                sizes="256px"
                              />
                            </div>

                            {/* Client Name below logo */}
                            <h4 className="text-slate-700 text-base sm:text-lg font-bold tracking-tight text-center z-10 px-6 mt-1">
                              {client.name}
                            </h4>
                          </div>

                          {/* Gradient Overlay for stats contrast */}
                          <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100 z-10 pointer-events-none"></div>

                          {/* Stats Overlay Block */}
                          <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                              <div className="backdrop-blur-md bg-white/10 p-5 sm:p-6 rounded-2xl border border-white/20 shadow-2xl flex flex-col gap-1.5 relative overflow-hidden">
                                {/* Light streak hover effect */}
                                <div className="absolute top-0 right-0 w-32 h-full bg-white/10 -skew-x-12 translate-x-[200%] group-hover:translate-x-[-200%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>

                                <span className="text-4xl md:text-5xl font-extrabold text-[#f4c542] tracking-tight leading-none drop-shadow-md">
                                  {client.stat}
                                </span>
                                <span className="text-sm sm:text-base font-semibold text-white/90 leading-snug drop-shadow-sm">
                                  {client.metric}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 4 - WHAT YOU GET */}
          <PricingSection data={{
            title: "What's Included in Just ₹8,999",
            subtitle: "Everything you need to build authority and drive leads on LinkedIn.",
            packages: [
              {
                label: "Starter",
                name: "Growth Plan",
                price: "₹8,999",
                description: "Best if: You want to attract clients and grow your brand organically.",
                features: [
                  "8 High-Quality LinkedIn Posts / Month",
                  "Profile & Page Optimization",
                  "Content Strategy & Planning",
                  "Hashtag & Audience Targeting",
                  "Personal Brand Positioning",
                  "Consistent Growth Management"
                ],
                featured: false
              },
              {
                label: "All-Inclusive",
                name: "Scale Plan",
                price: "₹29,999",
                description: "Best if: You want to aggressively dominate your industry with paid and organic reach.",
                features: [
                  "Everything in Growth Plan",
                  "16 High-Quality Posts / Month",
                  "LinkedIn Ads Management",
                  "Lead Generation Funnels",
                  "Weekly Performance Reporting",
                  "Priority Support"
                ],
                featured: true
              }
            ],
            quoteText: "Ready to get started?",
            quoteHref: "tel:+919986389444"
          }} />

          {/* SECTION 5 - BENEFITS & SECTION 6 - WHO IS THIS FOR */}
          <section className="py-16 sm:py-24 bg-slate-50 relative">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 lg:gap-12 lg:grid-cols-2">
              {/* Benefits */}
              <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-md transition-all hover:shadow-lg">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8">What You Can Expect</h3>
                <ul className="space-y-5">
                  {[
                    "More Profile Visibility",
                    "Better Engagement",
                    "Inbound Leads",
                    "Strong Personal Brand"
                  ].map(point => (
                    <li key={point} className="flex items-center gap-4 text-lg sm:text-1xl text-slate-800 font-bold">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-100 rounded-full text-green-600">
                        <svg className="w-5 h-5 auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                      </div>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Who Is This For */}
              <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-md transition-all hover:shadow-lg">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8">Who Is This For?</h3>
                <ul className="space-y-5">
                  {[
                    "Business Owners",
                    "Founders & Entrepreneurs",
                    "Coaches & Consultants",
                    "Recruiters & HR Professionals"
                  ].map(point => (
                     <li key={point} className="flex items-center gap-4 text-lg sm:text-1xl text-slate-800 font-bold">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#f4c542]/20 rounded-full text-amber-600">
                        <svg className="w-5 h-5 auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                      </div>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION 7 - CTA BLOCK */}
          <section className="py-20 bg-[#f4c542] relative overflow-hidden">
             <div className="absolute inset-0 bg-white/10 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight drop-shadow-sm">
                Start Building Your LinkedIn Presence Today
              </h2>
              <p className="text-xl font-bold text-slate-800 mb-10 bg-white/40 inline-block px-6 py-2 rounded-full">
                Limited slots available for this pricing.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button onClick={() => setIsModalOpen(true)} className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition shadow-xl">
                  Book Free Consultation
                </button>
                <a href="https://wa.me/919986389444?text=Hi%20Clever%20Crow%20Team,%20I'm%20interested%20in%20LinkedIn%20Growth%20services." target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-slate-50 transition shadow-xl flex items-center justify-center gap-2">
                  <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </section>

          {/* SECTION 8 - FAQ */}
          <FaqSection data={[
            {
              question: "How soon will I see results?",
              answer: "Typically within 3–4 weeks of consistent posting."
            },
            {
              question: "Do I need to create content?",
              answer: "No, we handle everything."
            },
            {
              question: "Is this for personal or company profile?",
              answer: "Both."
            },
            {
              question: "Will this generate leads?",
              answer: "Yes, with proper positioning and consistency."
            }
          ]} />

        </main>
        <Footer />
      </div>

      <CallbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <WhatsAppButton message="Hi Clever Crow Team, I'm interested in LinkedIn Growth services." />
    </main>
  );
}
