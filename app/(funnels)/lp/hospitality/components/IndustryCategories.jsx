"use client";
import React from 'react';
import { motion } from 'framer-motion';

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

  return (
    <section id="who-we-help" className="py-20 px-4 bg-brand-dark overflow-hidden border-t border-brand-border/40">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h3 className="font-heading text-3xl md:text-4xl font-bold tracking-[0.06em] text-white uppercase leading-none">
          Built For Hospitality Excellence
        </h3>
      </div>
      
      {/* 8-Column Grid layout, collapsing nicely */}
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
            {/* Aspect Square Card Wrapper */}
            <div className="w-full aspect-square rounded-2xl overflow-hidden border border-brand-border/60 hover:border-brand-accent/40 transition-all duration-500 relative shadow-lg">
              {/* Background Image */}
              <img 
                src={cat.image} 
                alt={cat.titleLine1} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              
              {/* Subtle top border glow on hover */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-brand-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>

            {/* Label below the Card */}
            <div className="text-center mt-4 min-h-[3.2rem] flex flex-col justify-start px-1">
              <h4 className="font-heading text-[16px] md:text-[18px] font-bold text-white uppercase tracking-[0.06em] leading-tight group-hover:text-brand-accent transition-colors duration-300">
                <span className="block">{cat.titleLine1}</span>
                {cat.titleLine2 && <span className="block mt-0.5 text-white/90">{cat.titleLine2}</span>}
              </h4>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default IndustryCategories;
