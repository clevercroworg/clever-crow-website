"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Video, Award, Eye, Calendar } from 'lucide-react';

const OurWork = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  const portfolioItems = [
    {
      id: 1,
      title: "The Grand Horizon Resort",
      subtitle: "Cinematic Resort Tour",
      desc: "Highlighting premium sea-facing villas & infinity pools to increase high-value conversions.",
      videoUrl: "/lp/hospitality/reel1.mp4",
      poster: "/lp/hospitality/hotel_card.png",
      metric: "+40% Direct Bookings",
      category: "Luxury Resort"
    },
    {
      id: 2,
      title: "Amanpuri Retreat Villas",
      subtitle: "Direct Booking Campaign",
      desc: "Driving direct guest interest and eliminating costly OTA intermediaries.",
      videoUrl: "/lp/hospitality/reel2.mp4",
      poster: "/lp/hospitality/resort_card.png",
      metric: "3.2x More Enquiries",
      category: "Boutique Villa"
    },
    {
      id: 3,
      title: "Boutique St. Regis Lounge",
      subtitle: "Social Media Showcase",
      desc: "Dynamic micro-storytelling and visual content tailored for the modern premium traveler.",
      videoUrl: "/lp/hospitality/reel7.mp4",
      poster: "/lp/hospitality/boutique_card.png",
      metric: "2.5x Lead Flow",
      category: "Hotel & Lounge"
    },
    {
      id: 4,
      title: "Azure Luxury Charters",
      subtitle: "Yacht Experience Campaign",
      desc: "Capturing direct booking enquiries for exclusive summer cruise experiences.",
      videoUrl: "/lp/hospitality/reel8.mp4",
      poster: "/lp/hospitality/yacht_card.png",
      metric: "28% Lower OTA Cost",
      category: "Yacht & Boat"
    },
    {
      id: 5,
      title: "Whispering Pines Cabin",
      subtitle: "Hidden Retreat Visuals",
      desc: "Enchanting forest retreat cinematography and rustic-luxe drone perspectives.",
      videoUrl: "/lp/hospitality/reel18.mp4",
      poster: "/lp/hospitality/cabin_card.png",
      metric: "94% Occupancy",
      category: "Cabins & Retreats"
    },
    {
      id: 6,
      title: "Nurture & Taste Beach Club",
      subtitle: "Sunset Dining Showcase",
      desc: "Vibrant beach club evening gastronomy and club teaser campaigns.",
      videoUrl: "/lp/hospitality/reel20.mp4",
      poster: "/lp/hospitality/restaurant_card.png",
      metric: "+150% Table Reservations",
      category: "Beach Club"
    }
  ];

  return (
    <section id="our-work" className="py-24 px-6 bg-[#fafbfa] relative overflow-hidden border-t border-neutral-200/40">
      {/* Background soft blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-brand-accent text-xs font-heading font-semibold tracking-widest uppercase mb-2">
            <Video className="w-3.5 h-3.5" />
            <span>Premium Video Portfolio</span>
          </div>
          <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[#0a0e0b] uppercase leading-none tracking-[0.015em]" style={{ fontWeight: 300, wordSpacing: '0.06em' }}>
            Our <span className="text-brand-accent font-bold-important">Work</span>
          </h3>
          <p className="font-body text-xs md:text-sm text-neutral-500 max-w-xl mx-auto mt-3 font-light">
            Explore our curated selection of high-impact hotel reels, cinematic hospitality storytelling, and conversion-focused performance campaigns.
          </p>
        </div>

        {/* 6-Video Grid: 3 columns on desktop, 1/2 on mobile/tablet */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="flex flex-col bg-white border border-neutral-200/50 rounded-2xl overflow-hidden hover:shadow-[0_15px_45px_rgba(200,127,76,0.08)] hover:border-brand-accent/30 transition-all duration-500 group"
            >
              {/* Playable Video Card aspect-video container */}
              <div 
                onClick={() => setActiveVideo(item)}
                className="w-full aspect-[16/10] bg-brand-dark overflow-hidden relative cursor-pointer group-hover:shadow-inner"
              >
                <img 
                  src={item.poster} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Premium Dark Glass Overlay */}
                <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-neutral-950/45 transition-colors duration-500 z-10" />

                {/* Top Corner Category Badge */}
                <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-200/40">
                  <span className="font-body text-[9px] text-[#0a0e0b] font-bold tracking-wider uppercase">
                    {item.category}
                  </span>
                </div>

                {/* Hover Play Pulsating Badge */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-14 h-14 rounded-full bg-white border border-brand-accent/30 flex items-center justify-center text-brand-accent shadow-lg group-hover:scale-115 transition-all duration-500 relative">
                    {/* Ring glow */}
                    <div className="absolute inset-0 rounded-full border-2 border-brand-accent scale-100 opacity-0 group-hover:scale-130 group-hover:opacity-100 transition-all duration-700 rounded-full" />
                    <Play className="w-5 h-5 fill-brand-accent ml-0.5" />
                  </div>
                </div>

                {/* Bottom Highlight stats banner */}
                <div className="absolute bottom-4 right-4 z-20 bg-brand-accent px-3 py-1 rounded-full shadow-md">
                  <span className="font-body text-[9px] text-[#0a0e0b] font-black tracking-wider uppercase">
                    {item.metric}
                  </span>
                </div>
              </div>

              {/* Title & Description under video card */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <span className="font-body text-[10px] text-brand-accent font-black tracking-widest uppercase block mb-1">
                    {item.subtitle}
                  </span>
                  <h4 className="font-heading text-[22px] font-bold text-[#0a0e0b] uppercase tracking-wide leading-tight mb-2.5" style={{ fontWeight: 300 }}>
                    {item.title}
                  </h4>
                  <p className="font-body text-xs text-neutral-500 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                <div 
                  onClick={() => setActiveVideo(item)}
                  className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-[#0a0e0b] group-hover:text-brand-accent transition-colors duration-300 cursor-pointer"
                >
                  <span className="font-body text-[10px] font-bold tracking-widest uppercase">
                    Launch Video Case Study
                  </span>
                  <span className="text-lg font-light transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cinematic theater lightbox Modal player */}
        <AnimatePresence>
          {activeVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#060807]/96 backdrop-blur-xl z-[999] flex items-center justify-center p-4"
            >
              {/* Tap backdrop to close */}
              <div 
                className="absolute inset-0 cursor-crosshair" 
                onClick={() => setActiveVideo(null)} 
              />

              {/* Lightbox Video Content container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="bg-brand-dark border border-[#c87f4c]/30 rounded-2xl w-full max-w-4xl overflow-hidden relative shadow-[0_30px_90px_rgba(200,127,76,0.18)] z-10"
              >
                {/* Premium Header */}
                <div className="px-6 py-4 bg-[#0a0e0b]/80 border-b border-[#c87f4c]/10 flex items-center justify-between">
                  <div>
                    <span className="font-body text-[9px] text-brand-accent font-black tracking-widest uppercase block mb-0.5">
                      {activeVideo.subtitle}
                    </span>
                    <h4 className="font-heading text-lg font-bold text-white uppercase tracking-wider" style={{ fontWeight: 300 }}>
                      {activeVideo.title}
                    </h4>
                  </div>
                  
                  {/* Floating luxury close button */}
                  <button 
                    onClick={() => setActiveVideo(null)}
                    className="w-9 h-9 rounded-full bg-white text-brand-dark flex items-center justify-center shadow-lg hover:bg-brand-accent hover:text-brand-dark transition-all duration-300"
                  >
                    <X className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>

                {/* HTML5 video element */}
                <div className="w-full aspect-[16/9] bg-black relative flex items-center justify-center">
                  <video
                    src={activeVideo.videoUrl}
                    poster={activeVideo.poster}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    {/* Placeholder fallback message */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-neutral-400 font-body">
                      <Award className="w-12 h-12 text-brand-accent mb-4 animate-pulse" />
                      <p className="text-sm font-semibold uppercase tracking-wider text-white">Video Case Study Loaded</p>
                      <p className="text-xs max-w-xs mt-1">Ready to link high-resolution asset.</p>
                    </div>
                  </video>
                </div>

                {/* Footer specs inside player */}
                <div className="bg-[#0a0e0b]/80 px-6 py-5 border-t border-[#c87f4c]/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="font-body text-xs text-brand-textSecondary leading-relaxed max-w-lg font-light">
                    {activeVideo.desc}
                  </p>
                  
                  {/* High performance metrics badge */}
                  <div className="flex-shrink-0 bg-[#c87f4c]/10 border border-[#c87f4c]/30 px-4 py-2 rounded-xl flex items-center gap-2">
                    <span className="font-body text-[10px] text-brand-accent font-black tracking-widest uppercase">
                      Impact: {activeVideo.metric}
                    </span>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default OurWork;
