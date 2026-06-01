"use client";
import React from 'react';
import { motion } from 'framer-motion';

const IndustryCategories = () => {
  const categories = [
    {
      title: "Hotels",
      image: "/lp/hospitality/hotel_card.png"
    },
    {
      title: "Resorts",
      image: "/lp/hospitality/resort_card.png"
    },
    {
      title: "Homestays & Villas",
      image: "/lp/hospitality/boutique_card.png"
    },
    {
      title: "Spas & Wellness",
      image: "/lp/hospitality/spa_card.png"
    },
    {
      title: "Clubs & Lounges",
      image: "/lp/hospitality/restaurant_card.png"
    },
    {
      title: "Event Venues",
      image: "/lp/hospitality/cabin_card.png"
    },
    {
      title: "Yachts & Boats",
      image: "/lp/hospitality/yacht_card.png"
    },
    {
      title: "Tours & Activities",
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
      {/* Section Header with no subtitle/supporting text */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h3 className="font-heading text-3xl md:text-4xl font-bold tracking-[0.06em] text-white uppercase leading-none">
          Who We Help
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
            onClick={scrollToForm}
            className="group flex flex-col cursor-pointer"
          >
            {/* Aspect Square Card Wrapper */}
            <div className="w-full aspect-square rounded-2xl overflow-hidden border border-brand-border/60 hover:border-brand-accent/40 transition-all duration-500 relative shadow-lg">
              {/* Background Image */}
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              
              {/* Subtle top border glow on hover */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-brand-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>

            {/* Label below the Card */}
            <div className="text-center mt-4 min-h-[3.2rem] flex flex-col justify-start px-1">
              <h4 className="font-heading text-[16px] md:text-[18px] font-bold text-white uppercase tracking-[0.06em] leading-tight group-hover:text-brand-accent transition-colors duration-300">
                <span className="block">{cat.title}</span>
              </h4>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default IndustryCategories;
