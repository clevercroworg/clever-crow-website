"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Users, Percent, GitPullRequest, ArrowRight 
} from 'lucide-react';

const IndustryCategories = () => {
  const items = [
    {
      index: "01",
      title: "Hotels",
      tagline: "Luxury Brand Optimization",
      description: "Unifying brand authority, digital presence, and guest retention strategies to maximize premium hotel booking yields.",
      slug: "/hotels"
    },
    {
      index: "02",
      title: "Resorts",
      tagline: "Immersive Experience Yield",
      description: "Positioning destination resorts as experiential sanctuaries through narrative marketing and custom luxury CRM campaigns.",
      slug: "/resorts"
    },
    {
      index: "03",
      title: "Homestays & Villas",
      tagline: "Bespoke Private Retreats",
      description: "Curating high-end private property positioning and direct booking platforms for premium homestays and luxury estates.",
      slug: "/homestays-villas"
    },
    {
      index: "04",
      title: "Spas & Wellness",
      tagline: "Holistic Revenue Strategy",
      description: "Creating high-conversion booking structures and sensory digital campaigns for premium spas and wellness sanctuaries.",
      slug: "/spas-wellness"
    },
    {
      index: "05",
      title: "Clubs & Lounges",
      tagline: "VIP Membership & Loyalty",
      description: "Driving elite recurring membership revenue and high-value guest lifetime loyalty through bespoke social club engagement.",
      slug: "/clubs-lounges"
    },
    {
      index: "06",
      title: "Event Venues",
      tagline: "Elite Space Monetization",
      description: "Leveraging digital search dominance and visual narratives to drive premium inquiries and bookings for signature event spaces.",
      slug: "/event-venues"
    },
    {
      index: "07",
      title: "Yachts & Boats",
      tagline: "High-End Marine Booking",
      description: "Accelerating direct charter inquiries and luxury private boat rentals through custom digital booking systems.",
      slug: "/yachts-boats"
    },
    {
      index: "08",
      title: "Tours & Activities",
      tagline: "Curated Adventure Growth",
      description: "Transforming raw local excursions into elite, high-yield destination activities through targeted search optimization.",
      slug: "/tours-activities"
    }
  ];

  const stats = [
    {
      value: "+40%",
      label: "Direct Bookings",
      desc: "Increase in direct bookings with Google Ads.",
      icon: TrendingUp,
    },
    {
      value: "3.2x",
      label: "More Enquiries",
      desc: "Higher volume of quality enquiries that convert.",
      icon: Users,
    },
    {
      value: "28%",
      label: "Lower OTA Dependency",
      desc: "Reduced reliance on OTAs and commissions.",
      icon: Percent,
    },
    {
      value: "2.5x",
      label: "Better Lead Flow",
      desc: "Stronger & more consistent lead pipeline.",
      icon: GitPullRequest,
    }
  ];

  const scrollToForm = () => {
    const element = document.getElementById('contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Luxury Vector SVG icons matching the home page offerings exactly
  const renderIcon = (slug) => {
    switch (slug) {
      case "/hotels":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="1.2">
            <rect x="4" y="2" width="16" height="20" rx="1" />
            <line x1="8" y1="6" x2="16" y2="6" />
            <line x1="8" y1="10" x2="16" y2="10" />
            <line x1="8" y1="14" x2="16" y2="14" />
            <line x1="10" y1="18" x2="14" y2="18" />
          </svg>
        );
      case "/resorts":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="1.2">
            <path d="M12 22C12 22 12 12 19 8C19 8 13 11 12 12C11 11 5 8 5 8C12 12 12 22 12 22Z" />
            <path d="M12 14C12 14 15 11 17.5 11.5" />
            <path d="M12 16C12 16 16 13.5 18 14" />
            <path d="M12 14C12 14 9 11 6.5 11.5" />
            <path d="M12 16C12 16 8 13.5 6 14" />
          </svg>
        );
      case "/homestays-villas":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="1.2">
            <path d="M3 10L12 3L21 10V20C21 20.5 20.5 21 20 21H4C3.5 21 3 20.5 3 20V10Z" />
            <path d="M9 21V12H15V21" />
            <line x1="12" y1="3" x2="12" y2="21" strokeDasharray="2 2" />
          </svg>
        );
      case "/spas-wellness":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="1.2">
            <path d="M12 3C12 3 15 8 15 11C15 14 13 16 12 16C11 16 9 14 9 11C9 8 12 3 12 3Z" />
            <path d="M12 11C12 11 19 12 20 15C20 17 18 19 15 19C13 19 12 17 12 17" />
            <path d="M12 11C12 11 5 12 4 15C4 17 6 19 9 19C11 19 12 17 12 17" />
          </svg>
        );
      case "/clubs-lounges":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="1.2">
            <path d="M5 5H19L12 13L5 5Z" />
            <line x1="12" y1="13" x2="12" y2="19" />
            <line x1="8" y1="19" x2="16" y2="19" />
            <path d="M18.5 2L19.2 3.5L20.8 4L19.2 4.5L18.5 6L17.8 4.5L16.2 4L17.8 3.5L18.5 2Z" fill="currentColor" stroke="none" />
          </svg>
        );
      case "/event-venues":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="1.2">
            <path d="M4 21V10C4 5.58 7.58 2 12 2C16.42 2 20 5.58 20 10V21" />
            <line x1="8" y1="21" x2="8" y2="10" />
            <line x1="16" y1="21" x2="16" y2="10" />
            <rect x="2" y="21" width="20" height="1" fill="currentColor" />
          </svg>
        );
      case "/yachts-boats":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="1.2">
            <path d="M2 17C2 17 7 17.5 12 17.5C17 17.5 22 17 22 17C22 17 21 21 12 21C3 21 2 17 2 17Z" />
            <path d="M12 3V15" />
            <path d="M12 5C12 5 18 8 18 12C18 12 13 14 12 14" />
            <path d="M12 6C12 6 6 9 6 12C6 12 11 13 12 13" />
          </svg>
        );
      case "/tours-activities":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current fill-none" strokeWidth="1.2">
            <circle cx="12" cy="12" r="9" />
            <path d="M16.24 7.76L14.12 14.12L7.76 16.24L9.88 9.88L16.24 7.76Z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="who-we-help" className="py-24 px-6 bg-brand-dark overflow-hidden border-t border-brand-border/40">
      
      {/* ───────────────── 1. WHO WE HELP HEADER ───────────────── */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h3 className="font-heading text-[38px] sm:text-[46px] md:text-[56px] lg:text-[66px] xl:text-[72px] font-bold tracking-[0.06em] text-white uppercase mb-3 font-bold-important">
          Who We <span className="text-brand-accent font-bold-important">Help</span>
        </h3>
        <p className="font-body text-[15px] md:text-[16px] text-brand-textSecondary max-w-2xl mx-auto font-normal leading-[1.7]">
          Growth systems for premium hospitality and experience-led brands.
        </p>
      </div>
      
      {/* ───────────────── 2. DIRECTORY-STYLE ROWS CATALOG ───────────────── */}
      <div className="w-full max-w-[1500px] mx-auto border-t border-white/10 flex flex-col group/container mb-16">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={scrollToForm}
            className="relative w-full border-b border-white/10 transition-all duration-350 cursor-pointer group/row opacity-100 group-hover/container:opacity-40 hover:!opacity-100 hover:bg-white/[0.02]"
          >
            <div className="flex flex-col md:grid md:grid-cols-[120px_280px_1fr] lg:grid-cols-[140px_320px_1fr] items-start md:items-center p-6 md:py-10 md:px-8 gap-4 md:gap-0 relative">
              
              {/* Col 1: Identity (Index & SVG Vector) */}
              <div className="flex items-center gap-6">
                <span className="font-heading text-base font-bold text-white/25 group-hover/row:text-brand-accent transition-colors duration-300 leading-none">
                  {item.index}
                </span>
                <div className="text-white/25 group-hover/row:text-brand-accent transition-all duration-300 group-hover/row:scale-105 group-hover/row:drop-shadow-[0_0_8px_rgba(200,127,76,0.35)]">
                  {renderIcon(item.slug)}
                </div>
              </div>

              {/* Col 2: Title & Tagline */}
              <div className="flex flex-col gap-1 pr-4">
                <h4 className="font-heading text-[24px] md:text-[28px] font-bold text-brand-accent uppercase tracking-wide transition-colors duration-300 leading-none font-bold-important">
                  {item.title}
                </h4>
                <span className="font-body text-[11px] font-bold uppercase text-white/70 tracking-[0.15em] group-hover/row:text-brand-accent transition-colors duration-300 mt-1">
                  {item.tagline}
                </span>
              </div>

              {/* Col 3: Description */}
              <div className="pr-4 md:pr-10 lg:pr-16">
                <p className="font-body text-sm md:text-[15px] leading-relaxed text-white/90 transition-colors duration-300 font-normal">
                  {item.description}
                </p>
              </div>

              {/* Sliding Bottom Highlight Line */}
              <div className="absolute bottom-[-1px] left-0 h-[2px] bg-brand-accent w-0 group-hover/row:w-full transition-all duration-350 ease-out z-10"></div>
              
            </div>
          </div>
        ))}
      </div>

      {/* Subtle delicate copper horizontal divider line to visually group stats */}
      <div className="w-full max-w-[95rem] mx-auto my-14 px-4">
        <div className="border-t border-brand-accent/25 w-full"></div>
      </div>

      {/* ───────────────── 3. PERFORMANCE STATS CARDS ───────────────── */}
      <div className="w-full max-w-[95rem] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {stats.map((stat, index) => {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="bg-brand-card/35 border border-brand-border/60 py-10 px-6 rounded-2xl text-center flex flex-col items-center justify-center hover:border-brand-accent/35 hover:bg-brand-card/50 transition-all duration-300 min-h-[170px]"
            >
              <div className="font-heading text-[54px] sm:text-[62px] md:text-[70px] font-bold text-brand-accent mb-2 font-bold-important leading-none">
                {stat.value}
              </div>
              <h4 className="font-heading text-[22px] sm:text-[24px] md:text-[26px] font-bold text-white uppercase tracking-wider font-bold-important leading-tight mt-1">
                {stat.label}
              </h4>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
};

export default IndustryCategories;
