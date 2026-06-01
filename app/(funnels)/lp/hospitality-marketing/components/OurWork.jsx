"use client";
import React from 'react';
import { motion } from 'framer-motion';

const OurWork = () => {
  const videoReels = [
    "/lp/hospitality/reel1.mp4",
    "/lp/hospitality/reel2.mp4",
    "/lp/hospitality/reel7.mp4",
    "/lp/hospitality/reel8.mp4",
    "/lp/hospitality/reel18.mp4",
    "/lp/hospitality/reel20.mp4"
  ];

  return (
    <section id="our-work" className="py-24 px-6 bg-[#fafbfa] relative overflow-hidden border-t border-neutral-200/40">
      {/* Background soft radial glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[95rem] mx-auto relative z-10">
        
        {/* Section Header with Massive Typographic Font */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h3 
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#0a0e0b] uppercase tracking-[0.06em] leading-none mb-4" 
            style={{ fontWeight: 300 }}
          >
            Our <span className="text-brand-accent font-bold-important">Works</span>
          </h3>
          <div className="w-24 h-[3px] bg-brand-accent mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Clean, direct 6-video grid layout in portrait aspect-[9/16] (reels format) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {videoReels.map((videoPath, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="w-full aspect-[9/16] bg-black rounded-[1.8rem] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-neutral-200/50 hover:border-brand-accent/45 hover:shadow-[0_15px_45px_rgba(200,127,76,0.12)] hover:scale-[1.02] transition-all duration-500 ease-out"
            >
              <video
                src={videoPath}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurWork;
