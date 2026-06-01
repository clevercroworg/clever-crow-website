"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Users, Percent, GitPullRequest
} from 'lucide-react';

const IndustryCategories = () => {
  const categories = [
    {
      titleLine1: "Hotels",
      titleLine2: "",
      image: "/lp/hospitality/hotel_card.png"
    },
    {
      titleLine1: "Resorts",
      titleLine2: "",
      image: "/lp/hospitality/resort_card.png"
    },
    {
      titleLine1: "Boutique",
      titleLine2: "Hotels",
      image: "/lp/hospitality/boutique_card.png"
    },
    {
      titleLine1: "Villas &",
      titleLine2: "Holiday Homes",
      image: "/lp/hospitality/spa_card.png"
    },
    {
      titleLine1: "Cabins &",
      titleLine2: "Retreats",
      image: "/lp/hospitality/cabin_card.png"
    },
    {
      titleLine1: "Restaurants &",
      titleLine2: "Beach Clubs",
      image: "/lp/hospitality/restaurant_card.png"
    },
    {
      titleLine1: "Yachts &",
      titleLine2: "Boat Rentals",
      image: "/lp/hospitality/yacht_card.png"
    },
    {
      titleLine1: "Tours &",
      titleLine2: "Experiences",
      image: "/lp/hospitality/hiking_card.png"
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

  return (
    <section id="who-we-help" className="py-24 px-6 bg-brand-dark overflow-hidden border-t border-brand-border/40">
      
      {/* ───────────────── 1. BUILT FOR HOSPITALITY EXCELLENCE GRID ───────────────── */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h3 className="font-heading text-[38px] sm:text-[46px] md:text-[56px] lg:text-[66px] xl:text-[72px] font-bold tracking-[0.06em] text-white uppercase mb-3 font-bold-important">
          Built For <span className="text-brand-accent font-bold-important">Hospitality Excellence</span>
        </h3>
        <p className="font-body text-sm md:text-base text-brand-textSecondary max-w-2xl mx-auto font-light">
          We construct tailored visual and performance marketing channels for luxury stays and recreational experiences.
        </p>
      </div>
      
      {/* 8-Column Categories Grid layout */}
      <div className="w-full max-w-[95rem] mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-5 px-4">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            className="group flex flex-col cursor-pointer"
          >
            {/* Card aspect-square wrapper */}
            <div className="w-full aspect-square rounded-2xl overflow-hidden border border-brand-border/60 hover:border-brand-accent/40 transition-all duration-500 relative shadow-lg">
              <img 
                src={cat.image} 
                alt={cat.titleLine1} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              {/* Subtle top border glow on hover */}
              <div className="absolute inset-x-0 top-0 h-[2.5px] bg-brand-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>

            {/* Label below Card */}
            <div className="text-center mt-4 min-h-[3.2rem] flex flex-col justify-start px-1">
              <h4 className="font-heading text-[24px] sm:text-[26px] md:text-[28px] font-bold text-white uppercase tracking-[0.06em] leading-tight group-hover:text-brand-accent transition-colors duration-300 font-bold-important">
                <span className="block">{cat.titleLine1}</span>
                {cat.titleLine2 && <span className="block mt-0.5 text-white/90">{cat.titleLine2}</span>}
              </h4>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Subtle delicate copper horizontal divider line to visually group them as one singular merged section */}
      <div className="w-full max-w-[95rem] mx-auto my-14 px-4">
        <div className="border-t border-brand-accent/25 w-full"></div>
      </div>

      {/* ───────────────── 2. PERFORMANCE STATS CARDS (MERGED DIRECTLY HERE) ───────────────── */}
      <div className="w-full max-w-[95rem] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="bg-brand-card/35 border border-brand-border/60 p-8 rounded-2xl text-center flex flex-col items-center hover:border-brand-accent/35 hover:bg-brand-card/50 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-brand-accent/10 border border-brand-accent/25 flex items-center justify-center text-brand-accent mb-5">
                <IconComponent className="w-5 h-5" />
              </div>
              <div className="font-heading text-4xl lg:text-5xl font-bold text-brand-accent mb-2 font-bold-important">
                {stat.value}
              </div>
              <h4 className="font-heading text-lg font-bold text-white uppercase tracking-wider mb-2 font-bold-important">
                {stat.label}
              </h4>
              <p className="font-body text-xs text-brand-textSecondary leading-relaxed font-light">
                {stat.desc}
              </p>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
};

export default IndustryCategories;
