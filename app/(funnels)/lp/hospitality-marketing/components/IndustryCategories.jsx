"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, Eye, Image as ImageIcon, Monitor, 
  MessageSquare, Globe, Tag, Star 
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

  const checks = [
    {
      title: "Brand Positioning",
      icon: Target
    },
    {
      title: "Online Visibility",
      icon: Eye
    },
    {
      title: "Content Quality",
      icon: ImageIcon
    },
    {
      title: "Website Experience",
      icon: Monitor
    },
    {
      title: "Enquiry Flow",
      icon: MessageSquare
    },
    {
      title: "Booking Channels",
      icon: Globe
    },
    {
      title: "Pricing Strategy",
      icon: Tag
    },
    {
      title: "Reputation & Reviews",
      icon: Star
    }
  ];

  return (
    <section id="who-we-help" className="py-24 px-6 bg-brand-dark overflow-hidden border-t border-brand-border/40">
      
      {/* ───────────────── 1. BUILT FOR HOSPITALITY EXCELLENCE GRID ───────────────── */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h3 className="font-heading text-3xl md:text-5xl font-bold tracking-[0.06em] text-white uppercase mb-3" style={{ fontWeight: 300 }}>
          Built For <span className="text-brand-accent font-bold-important">Hospitality Excellence</span>
        </h3>
        <p className="font-body text-xs md:text-sm text-brand-textSecondary max-w-xl mx-auto font-light">
          We construct tailored visual and performance marketing channels for luxurystays and recreational experiences.
        </p>
      </div>
      
      {/* 8-Column Categories Grid layout */}
      <div className="w-full max-w-[95rem] mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-5 px-4 mb-28">
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
              <h4 className="font-heading text-[16px] md:text-[18px] font-bold text-white uppercase tracking-[0.06em] leading-tight group-hover:text-brand-accent transition-colors duration-300" style={{ fontWeight: 300 }}>
                <span className="block">{cat.titleLine1}</span>
                {cat.titleLine2 && <span className="block mt-0.5 text-white/90">{cat.titleLine2}</span>}
              </h4>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Elegant Horizontal Divider with copper gradient */}
      <div className="max-w-7xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent mb-24"></div>

      {/* ───────────────── 2. WHAT WE REVIEW FOR YOUR PROPERTY GRID ───────────────── */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h3 className="font-heading text-3xl md:text-5xl font-bold tracking-[0.06em] text-white uppercase mb-3" style={{ fontWeight: 300 }}>
          What We <span className="text-brand-accent font-bold-important">Review</span> For Your Property
        </h3>
        <p className="font-body text-xs md:text-sm text-brand-textSecondary max-w-xl mx-auto font-light">
          A comprehensive digital and commercial audit of your brand assets before our growth alignment strategy call.
        </p>
      </div>

      {/* 4-Column Grid for the 8 review cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-4">
        {checks.map((check, index) => {
          const IconComponent = check.icon;
          return (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.04 }}
              className="flex flex-col items-center text-center py-10 px-5 bg-brand-card/45 border border-brand-border/60 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(200,127,76,0.06)] hover:border-brand-accent/35 hover:bg-brand-card/75 transition-all duration-300 group min-h-[180px] justify-center"
            >
              <div className="text-brand-accent mb-4 transition-transform duration-300 group-hover:scale-110">
                <IconComponent className="w-9 h-9 stroke-[1.25]" />
              </div>
              <h4 className="font-heading text-[18px] md:text-[21px] font-bold text-white uppercase tracking-wider leading-snug" style={{ fontWeight: 300 }}>
                {check.title}
              </h4>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
};

export default IndustryCategories;
