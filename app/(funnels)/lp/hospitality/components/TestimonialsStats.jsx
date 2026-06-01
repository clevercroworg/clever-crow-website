"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles, TrendingUp, Users, Percent, GitPullRequest } from 'lucide-react';

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
    <section className="py-24 px-6 bg-brand-dark overflow-hidden border-t border-brand-border/40">
      <div className="max-w-7xl mx-auto">
        
        {/* Testimonials Title */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-brand-accent text-xs font-heading font-semibold tracking-widest uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Trusted By Hospitality Brands</span>
          </div>
          <h3 className="font-heading text-4xl md:text-5xl font-bold text-white uppercase">
            What Our Clients Say
          </h3>
          <p className="font-body text-xs md:text-sm text-brand-textSecondary max-w-xl mx-auto mt-2">
            We help hospitality brands grow enquiries, direct bookings, and visibility that lasts.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-28">
          {testimonials.map((test, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="bg-brand-card/50 border border-brand-border p-6 rounded-2xl flex flex-col justify-between hover:border-brand-accent/30 transition-all duration-300 group"
            >
              <div>
                <div className="text-brand-accent mb-4">
                  <Quote className="w-8 h-8 opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <p className="font-body text-sm text-white/90 leading-relaxed mb-6 font-light">
                  "{test.quote}"
                </p>
              </div>

              <div>
                <div className="border-t border-brand-border/80 pt-4 mb-4">
                  <h4 className="font-heading text-lg font-bold text-white uppercase leading-none">
                    {test.clientName}
                  </h4>
                  <span className="font-body text-[10px] text-brand-textSecondary uppercase tracking-widest">
                    {test.category}
                  </span>
                </div>
                
                {/* Neon High-Impact Tag */}
                <div className="inline-block bg-brand-accent/5 border border-brand-accent/20 px-3 py-1 rounded-full">
                  <span className="font-body text-[10px] text-brand-accent font-semibold tracking-wider uppercase">
                    {test.tag}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Title */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h3 className="font-heading text-3xl md:text-4xl font-bold tracking-wider text-white uppercase">
            Proven Results That Drive Growth
          </h3>
          <p className="font-body text-xs text-brand-textSecondary max-w-xl mx-auto mt-1">
            Real performance. Real impact. For hospitality brands like yours.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-brand-card/30 border border-brand-border/60 p-8 rounded-2xl text-center flex flex-col items-center hover:border-brand-accent/30 hover:bg-brand-card/50 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent mb-4">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="font-heading text-4xl lg:text-5xl font-bold text-brand-accent mb-2">
                  {stat.value}
                </div>
                <h4 className="font-heading text-lg font-bold text-white uppercase tracking-wider mb-2">
                  {stat.label}
                </h4>
                <p className="font-body text-xs text-brand-textSecondary leading-relaxed">
                  {stat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsStats;
