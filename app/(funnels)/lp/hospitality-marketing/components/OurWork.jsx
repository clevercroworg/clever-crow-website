"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';

const projects = [
  // Paid Ads Category
  {
    id: "riva-beach-resort",
    title: "Riva Beach Resort",
    category: "Paid Ads",
    subCategory: "Resort • 100 Rooms",
    location: "Goa, India",
    headline: "+310% Booking Surge",
    description: "Scaled luxury guests acquisition with highly targeted Google Search & Meta Retargeting, bypassing commission-heavy OTA channels.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { value: "8.4x", label: "Ads ROAS" },
      { value: "₹7.78 Cr", label: "Revenue" },
      { value: "35%", label: "Direct Share" }
    ],
    tags: ["Meta Ads", "Google Search", "Retargeting"]
  },
  {
    id: "anahata-retreat",
    title: "Anahata Yoga Retreat",
    category: "Paid Ads",
    subCategory: "Eco-Retreat • 20 Rooms",
    location: "Goa, India",
    headline: "+185% Inbound Sales",
    description: "Deployed geo-targeted lookalike campaigns for high-spending international wellness travelers, driving direct room bookings.",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { value: "6.2x", label: "Campaign ROI" },
      { value: "₹1.56 Cr", label: "Ad Bookings" },
      { value: "42%", label: "Direct Share" }
    ],
    tags: ["Paid Social", "Geo-Targeting", "Wellness LAL"]
  },
  {
    id: "manuallaya-resort",
    title: "Manuallaya Valley Resort",
    category: "Paid Ads",
    subCategory: "Mountain Resort • 85 Rooms",
    location: "Manali, HP",
    headline: "+120% Occupancy Rate",
    description: "Sustained high off-season occupancy through contextual local search campaigns and exclusive dynamic package landing pages.",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { value: "5.0x", label: "Search ROAS" },
      { value: "₹6.61 Cr", label: "Ad Revenue" },
      { value: "31%", label: "Direct Share" }
    ],
    tags: ["Google Search", "Local SEO", "PPC Campaigns"]
  },

  // Social Growth Category
  {
    id: "palma-goa-boutique",
    title: "Palma Goa Boutique",
    category: "Social Growth",
    subCategory: "Boutique Hotel • 15 Rooms",
    location: "Goa, India",
    headline: "+340% Instagram Reach",
    description: "Created a visual-first organic narrative strategy with high-production aesthetic reel storytelling, scaling direct inbound DMs.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { value: "1.2M+", label: "Reel Views" },
      { value: "12.5k+", label: "New Followers" },
      { value: "45%", label: "Inquiry Growth" }
    ],
    tags: ["Visual Curation", "Reel Strategy", "DM Funnel"]
  },
  {
    id: "woodrock-forest-hotel",
    title: "Woodrock Forest Hotel",
    category: "Social Growth",
    subCategory: "Eco-Lodge • 41 Rooms",
    location: "Manali, HP",
    headline: "+210% Profile Activity",
    description: "Curated experiential forest stay content that positioned the property as Manali's premier high-end nature escape.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { value: "1.5M", label: "Impressions" },
      { value: "5.0x", label: "Follower ROI" },
      { value: "40%", label: "Direct Share" }
    ],
    tags: ["Content Creation", "Influencer Collabs", "Reels"]
  },
  {
    id: "hazaar-dastaan-homestay",
    title: "Hazaar Dastaan",
    category: "Social Growth",
    subCategory: "Heritage Stay • 10 Rooms",
    location: "Kashmir, India",
    headline: "+420% Organic Leads",
    description: "Leveraged storytelling and local culture content to build a cult aesthetic following, filling inventory months in advance.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { value: "920k+", label: "Organic Reach" },
      { value: "44%", label: "Direct Bookings" },
      { value: "₹36.9L", label: "Direct Sales" }
    ],
    tags: ["Storytelling", "Aesthetic Curation", "DM Automation"]
  },

  // Web Design Category
  {
    id: "the-orchard-greens",
    title: "The Orchard Greens",
    category: "Web Design",
    subCategory: "Luxury Resort • 54 Rooms",
    location: "Manali, HP",
    headline: "36% Direct Booking Share",
    description: "Re-engineered a slow legacy site into a high-speed, custom React-based direct booking engine with visual room builders.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { value: "3.2s", label: "Load Speed" },
      { value: "₹4.20 Cr", label: "Web Revenue" },
      { value: "+85%", label: "Conv. Rate" }
    ],
    tags: ["Custom Next.js", "Direct Engine", "UI/UX Design"]
  },
  {
    id: "the-whispering-inn",
    title: "The Whispering Inn",
    category: "Web Design",
    subCategory: "Luxury Inn • 24 Rooms",
    location: "Manali, HP",
    headline: "+150% Site Conversions",
    description: "Designed a clean, responsive mobile-first booking interface with transparent rate parity comparison widgets to build trust.",
    image: "https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { value: "46%", label: "Direct Share" },
      { value: "₹1.87 Cr", label: "Direct Sales" },
      { value: "+150%", label: "Conversion" }
    ],
    tags: ["Mobile-First UX", "Parity Engine", "Speed Optimization"]
  },
  {
    id: "snow-valley-retreat",
    title: "Snow Valley Resorts",
    category: "Web Design",
    subCategory: "Resort Hotel • 72 Rooms",
    location: "Manali, HP",
    headline: "+110% Web Traffic",
    description: "Designed a premium luxury visual hotel catalog system, optimized for high organic Google Core Web Vitals and lightning speeds.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { value: "28%", label: "Direct Rate" },
      { value: "₹5.60 Cr", label: "Web Bookings" },
      { value: "98/100", label: "Speed Score" }
    ],
    tags: ["React Frontend", "Core Web Vitals", "Direct Parity"]
  },

  // Branding Category
  {
    id: "kolahoi-green-resort",
    title: "Kolahoi Green Resort",
    category: "Branding",
    subCategory: "Eco-Resort • 35 Rooms",
    location: "Kashmir, India",
    headline: "95% Recall Score",
    description: "Repositioned property identity from a standard resort to a premium eco-adventure retreat, shifting target demographics.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { value: "95%", label: "Brand Recall" },
      { value: "+130%", label: "Group Bookings" },
      { value: "₹2.72 Cr", label: "Direct Sales" }
    ],
    tags: ["Brand Identity", "Repositioning", "Asset Design"]
  },
  {
    id: "eden-resorts-spa",
    title: "Eden Resorts & Spa",
    category: "Branding",
    subCategory: "Wellness Spa • 45 Rooms",
    location: "Kashmir, India",
    headline: "98/100 Brand Rating",
    description: "Created a high-luxury sensory identity and digital assets, reinforcing premium spa treatments and wilderness excursions.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { value: "38%", label: "Repeat Guests" },
      { value: "₹3.50 Cr", label: "Direct Sales" },
      { value: "98/100", label: "Satisfaction" }
    ],
    tags: ["Sensory Identity", "Cinematic Branding", "Logo System"]
  },
  {
    id: "wayanad-wild-retreat",
    title: "Wayanad Wild Retreat",
    category: "Branding",
    subCategory: "Jungle Villa • 12 Cottages",
    location: "Kerala, India",
    headline: "+175% Premium Bookings",
    description: "Established the luxury eco-wilderness visual identity and custom assets, scaling high-value room tier direct bookings.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { value: "8.2x", label: "Brand ROI" },
      { value: "₹2.20 Cr", label: "Revenue" },
      { value: "52%", label: "Direct Share" }
    ],
    tags: ["Eco-Luxury Brand", "Corporate Identity", "Visual Assets"]
  }
];

const categories = ["All", "Paid Ads", "Social Growth", "Web Design", "Branding"];

const OurWork = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="our-work" className="py-24 px-6 bg-brand-dark relative overflow-hidden border-t border-brand-border/60">
      {/* Background soft radial glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h3 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white uppercase tracking-[0.06em] leading-none mb-4">
            OUR <span className="text-brand-accent font-bold-important">WORKS</span>
          </h3>
          <div className="w-24 h-[3px] bg-brand-accent mx-auto mt-6"></div>
        </div>

        {/* Filter Pills Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-3xl mx-auto">
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-brand-accent text-brand-dark shadow-[0_4px_20px_rgba(200,127,76,0.35)]"
                    : "bg-brand-card/50 text-neutral-400 hover:text-white border border-brand-border/30 hover:border-brand-accent/40"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Premium Portfolio Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="bg-brand-card border border-brand-border/40 hover:border-brand-accent/30 rounded-[1.5rem] overflow-hidden hover:scale-[1.01] hover:shadow-[0_20px_40px_rgba(200,127,76,0.06)] transition-all duration-500 flex flex-col h-full"
              >
                {/* Card Property Photo Header */}
                <div className="relative w-full h-[220px] overflow-hidden group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/40 to-transparent z-10" />
                  
                  {/* Location & Category Badges */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20 pointer-events-none">
                    <div className="inline-flex items-center gap-1.5 bg-brand-dark/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[0.72rem] font-bold tracking-wider text-white">
                      <MapPin className="w-3.5 h-3.5 text-brand-accent" />
                      <span>{project.location.toUpperCase()}</span>
                    </div>
                    <div className="inline-flex items-center gap-1 bg-brand-dark/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[0.72rem] font-bold tracking-wider text-brand-accent">
                      <span>{project.category.toUpperCase()}</span>
                    </div>
                  </div>

                  {/* Title & Metadata overlays */}
                  <div className="absolute bottom-4 left-5 right-5 z-20 pointer-events-none">
                    <span className="text-[0.7rem] font-bold tracking-widest text-neutral-400 block mb-0.5 uppercase">
                      {project.subCategory}
                    </span>
                    <h4 className="text-xl font-heading font-bold text-white tracking-wide uppercase">
                      {project.title}
                    </h4>
                  </div>
                </div>

                {/* Card Details Body */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    {/* Direct Response Headline */}
                    <h5 className="text-lg font-bold text-brand-accent mb-2 uppercase tracking-wide leading-snug font-heading">
                      {project.headline}
                    </h5>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-light">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Divider */}
                    <div className="w-full h-[1px] bg-neutral-800/40 mb-5" />

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      {project.metrics.map((metric, idx) => (
                        <div key={idx} className="flex flex-col">
                          <span className="text-lg font-heading font-black text-white tracking-tight leading-none mb-1">
                            {metric.value}
                          </span>
                          <span className="text-[0.62rem] font-bold tracking-widest text-neutral-500 uppercase leading-none">
                            {metric.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default OurWork;
