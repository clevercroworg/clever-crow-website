"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles } from 'lucide-react';

const TestimonialsStats = () => {
  const testimonials = [
    {
      quote: "Beyond Reach transformed our Google Ads. Direct bookings are up 40% and our brand has never been stronger.",
      clientName: "The Grand Resort",
      category: "Resort",
      tag: "+40% Direct Bookings",
    },
    {
      quote: "Finally free from OTA commissions. Their Google Ads strategy is unmatched and results speak for themselves.",
      clientName: "Vitality Wellness Spa",
      category: "Wellness Retreat",
      tag: "Lower OTA Dependency",
    },
    {
      quote: "Our yacht charters are booked solid for the season through high-intent traffic and smart campaigns.",
      clientName: "Azure Charters",
      category: "Yacht Charter",
      tag: "More Enquiries",
    },
    {
      quote: "Their campaigns elevated our brand presence overnight. Incredible ROI and better occupancy across the board.",
      clientName: "Serenity Retreats",
      category: "Luxury Villa",
      tag: "Better Occupancy",
    }
  ];

  return (
    <section className="py-24 px-6 bg-[#fafbfa] overflow-hidden border-t border-neutral-200/40 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Testimonials Title (Styled for light background) */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-brand-accent text-xs font-heading font-semibold tracking-widest uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Trusted By Hospitality Brands</span>
          </div>
          <h3 className="font-heading text-4xl md:text-5xl font-bold text-[#0a0e0b] uppercase" style={{ fontWeight: 300 }}>
            What Our <span className="text-brand-accent font-bold-important">Clients Say</span>
          </h3>
          <p className="font-body text-xs md:text-sm text-neutral-500 max-w-xl mx-auto mt-2 font-light">
            We help hospitality brands grow enquiries, direct bookings, and premium visibility that lasts.
          </p>
        </div>

        {/* Testimonials Grid (White background styled cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((test, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="bg-white border border-neutral-200/60 p-6 rounded-2xl flex flex-col justify-between hover:border-brand-accent/40 hover:shadow-[0_12px_40px_rgba(200,127,76,0.06)] transition-all duration-300 group"
            >
              <div>
                <div className="text-brand-accent mb-4">
                  <Quote className="w-8 h-8 opacity-25 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <p className="font-body text-sm text-neutral-700 leading-relaxed mb-6 font-light">
                  "{test.quote}"
                </p>
              </div>

              <div>
                <div className="border-t border-neutral-100 pt-4 mb-4">
                  <h4 className="font-heading text-lg font-bold text-[#0a0e0b] uppercase leading-none mb-1" style={{ fontWeight: 300 }}>
                    {test.clientName}
                  </h4>
                  <span className="font-body text-[10px] text-neutral-400 uppercase tracking-widest font-bold">
                    {test.category}
                  </span>
                </div>
                
                {/* Copper Premium Tag */}
                <div className="inline-block bg-brand-accent/5 border border-brand-accent/20 px-3.5 py-1 rounded-full">
                  <span className="font-body text-[10px] text-brand-accent font-semibold tracking-wider uppercase font-bold-important">
                    {test.tag}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsStats;
