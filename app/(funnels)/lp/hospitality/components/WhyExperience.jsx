"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Award, Calendar, ChevronRight } from 'lucide-react';

const WhyExperience = () => {
  const reasons = [
    "Hospitality-first thinking",
    "Strategy tailored to your property",
    "Focus on direct bookings & ROI",
    "Transparent reporting",
    "Google & Meta certified experts",
    "Premium content that converts",
    "Data-driven growth approach",
    "End-to-end campaign management",
    "Long-term growth partner",
    "Trusted by top hospitality brands"
  ];

  const stats = [
    { value: "50+", label: "Hospitality Brands" },
    { value: "35+", label: "Destinations Served" },
    { value: "120+", label: "Successful Campaigns" },
    { value: "5+", label: "Years of Marketing Expertise" }
  ];

  return (
    <section id="why-beyond-reach" className="py-24 px-6 bg-brand-card/20 relative overflow-hidden border-t border-brand-border/40">
      {/* Background soft blur */}
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Why Choose Us */}
          <div className="lg:col-span-7">
            <span className="font-heading text-xs tracking-widest text-brand-accent mb-2 font-semibold block">
              Why Choose Us
            </span>
            <h3 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 uppercase leading-none">
              Results Driven. <br/>
              Hospitality Focused. <br/>
              <span className="text-brand-accent">Growth Oriented.</span>
            </h3>
            <p className="font-body text-base md:text-lg text-brand-textSecondary max-w-xl mb-10 leading-relaxed">
              Beyond Reach is built for hospitality growth, not generic marketing. We understand stays, guest intent, location demand, seasonality, pricing, experience value and booking hesitation.
            </p>

            {/* Grid of Reasons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {reasons.map((reason, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="font-body text-xs md:text-sm text-white/95">{reason}</span>
                </div>
              ))}
            </div>

            {/* Bottom Trust Badge */}
            <div className="inline-flex items-center gap-4 bg-brand-dark border border-brand-border p-5 rounded-xl max-w-md">
              <div className="w-12 h-12 rounded-lg bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading text-lg font-bold text-white uppercase leading-none mb-1">
                  Trusted by 50+ Brands
                </h4>
                <p className="font-body text-xs text-brand-textSecondary">
                  Across resorts, hotels, and luxury villa rentals in India and the Middle East.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Experience Stats */}
          <div id="our-experience" className="lg:col-span-5 bg-brand-dark/40 border border-brand-border p-8 md:p-10 rounded-2xl relative overflow-hidden">
            <span className="font-heading text-xs tracking-widest text-brand-accent mb-2 font-semibold block">
              Our Experience
            </span>
            <h3 className="font-heading text-3xl font-bold text-white uppercase mb-8">
              Experience Across Hospitality & Leisure
            </h3>

            {/* Experience Stats Grid */}
            <div className="grid grid-cols-2 gap-8 border-b border-brand-border/60 pb-8 mb-8">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="font-heading text-4xl font-bold text-brand-accent leading-none mb-2">
                    {stat.value}
                  </div>
                  <div className="font-body text-xs uppercase tracking-wider text-white font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column Footer Info */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-brand-accent mt-1.5 animate-pulse"></div>
              <div>
                <h4 className="font-heading text-lg font-bold text-white uppercase tracking-wider mb-2">
                  Driven by Data & Insights
                </h4>
                <p className="font-body text-xs text-brand-textSecondary leading-relaxed">
                  We focus exclusively on direct bookings and measurable growth. Our strategy is built around stays, guest intent, seasonality, pricing, and experience value.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyExperience;
