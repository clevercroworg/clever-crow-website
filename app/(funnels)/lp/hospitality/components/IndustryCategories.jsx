"use client";
import React from 'react';
import { motion } from 'framer-motion';

const IndustryCategories = () => {
  const categories = [
    {
      title: "Hotels",
      subtag: "Luxury Stays",
      image: "/lp/hospitality/hotel_card.png"
    },
    {
      title: "Resorts",
      subtag: "Experiential Yield",
      image: "/lp/hospitality/resort_card.png"
    },
    {
      title: "Homestays & Villas",
      subtag: "Private Retreats",
      image: "/lp/hospitality/boutique_card.png"
    },
    {
      title: "Spas & Wellness",
      subtag: "Holistic Health",
      image: "/lp/hospitality/spa_card.png"
    },
    {
      title: "Clubs & Lounges",
      subtag: "VIP Membership",
      image: "/lp/hospitality/restaurant_card.png"
    },
    {
      title: "Event Venues",
      subtag: "Space Monetization",
      image: "/lp/hospitality/cabin_card.png"
    },
    {
      title: "Yachts & Boats",
      subtag: "Marine Charter",
      image: "/lp/hospitality/yacht_card.png"
    },
    {
      title: "Tours & Activities",
      subtag: "Destination Growth",
      image: "/lp/hospitality/hiking_card.png"
    }
  ];

  const scrollToForm = () => {
    const element = document.getElementById('contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="who-we-help" className="py-24 px-6 bg-brand-dark overflow-hidden border-t border-brand-border/40">
      
      {/* WHO WE HELP HEADER (No subtitle/supporting text) */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h3 className="font-heading text-3xl md:text-4xl font-bold tracking-[0.06em] text-white uppercase leading-none">
          Who We Help
        </h3>
      </div>
      
      {/* 2-Column Home Style Project Grid layout */}
      <div className="w-full max-w-[85rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 px-4">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: (index % 2) * 0.1 }}
            onClick={scrollToForm}
            className="group flex flex-col gap-4 cursor-pointer"
          >
            {/* Aspect Square Card Wrapper */}
            <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-brand-border/60 hover:border-brand-accent/40 transition-all duration-500 relative shadow-lg">
              {/* Background Image */}
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Subtle top border glow on hover */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-brand-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>

            {/* Label below the Card in horizontal alignment */}
            <div className="flex justify-between items-baseline px-1 mt-1">
              <h4 className="font-heading text-[22px] md:text-[26px] font-bold text-white uppercase tracking-wide group-hover:text-brand-accent transition-colors duration-300 font-bold-important leading-none">
                {cat.title}
              </h4>
              <span className="font-body text-[11px] font-bold uppercase text-brand-textSecondary group-hover:text-brand-accent transition-colors duration-300 tracking-[0.12em]">
                {cat.subtag}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default IndustryCategories;
