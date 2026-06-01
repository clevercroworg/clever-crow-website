"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Calendar, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const scrollToForm = () => {
    const element = document.getElementById('review-form-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const trackCallClick = () => {
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', 'click', {
          'event_category': 'Contact',
          'event_label': 'Phone Call Click',
          'phone_number': '09986389444'
        });
        window.gtag('event', 'Contact', {
          'phone_number': '09986389444',
          'method': 'Phone'
        });
      }
      if (window.fbq) {
        window.fbq('track', 'Contact', {
          'content_name': 'Phone Call Click',
          'phone_number': '09986389444'
        });
      }
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-brand-dark">
      
      {/* Desktop Background Image (Covering the right 65% from the very top to bottom) */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[65%] z-0 lg:block hidden">
        <img 
          src="/lp/hospitality/resort_hero.png" 
          alt="Luxury Resort Building at Night" 
          className="w-full h-full object-cover"
        />
        {/* Subtle gradient overlay to blend into the left column's solid black background */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/50 to-transparent w-[45%]"></div>
        {/* Ambient shadow gradient at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent"></div>
      </div>

      {/* Mobile Background Fallback (Covering full screen from top to bottom) */}
      <div className="absolute inset-0 z-0 lg:hidden block">
        <img 
          src="/lp/hospitality/resort_hero.png" 
          alt="Luxury Resort Building" 
          className="w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent"></div>
      </div>
      
      {/* Top Header Bar (Transparent background) */}
      <header className="relative z-20 w-full max-w-[95rem] mx-auto px-6 py-6 flex justify-between items-center bg-transparent">
        {/* Logo Branding */}
        <div className="flex items-center">
          <div className="font-heading text-2xl leading-none font-bold tracking-wider text-white">BEYOND REACH</div>
        </div>

        {/* Right Phone Button */}
        <a 
          href="tel:09986389444" 
          onClick={trackCallClick}
          className="flex items-center gap-3 bg-brand-accent hover:bg-white text-brand-dark font-heading text-sm font-bold px-5 py-3 rounded-xl transition-all duration-300 tracking-[0.06em]"
        >
          <div className="w-5 h-5 rounded-full border border-brand-dark/30 flex items-center justify-center">
            <Phone className="w-3 h-3 stroke-[2.5]" />
          </div>
          <span>09986389444</span>
        </a>
      </header>

      {/* Main Split Grid (Content Left, Right side is overlaid by the background image) */}
      <div className="relative z-10 flex-grow grid grid-cols-1 lg:grid-cols-12 items-center max-w-[95rem] w-full mx-auto px-6 py-12 lg:py-0">
        
        {/* Left Side: Headings & CTA Buttons (Col Span 7) */}
        <div className="lg:col-span-7 flex flex-col justify-center items-start text-left lg:pr-12">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-5xl md:text-7xl lg:text-[5.5rem] text-white uppercase mb-6 hero-heading">
              Get More Direct <br/>
              <span className="text-brand-accent">Enquiries & Bookings</span> <br/>
              For Your Property
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="font-body text-base md:text-lg text-white/90 mb-10 max-w-xl font-light"
          >
            More direct bookings. Better visibility. Stronger enquiry flow.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            {/* Primary solid callback button */}
            <button 
              onClick={() => {
                scrollToForm();
                trackCallClick();
              }}
              className="glow-btn bg-brand-accent text-brand-dark hover:bg-white font-heading text-base font-bold px-10 py-4.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer tracking-[0.05em]"
              style={{ padding: '1.125rem 2.5rem' }}
            >
              <span>Request a Call Back</span>
              <span className="font-body text-xs ml-3">09986389444</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
            
            {/* Secondary bordered schedule button */}
            <button 
              onClick={scrollToForm}
              className="border border-brand-accent/50 hover:border-brand-accent text-brand-accent hover:text-white bg-transparent font-heading text-base font-bold px-10 py-4.5 rounded-xl flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer tracking-[0.05em]"
              style={{ padding: '1.125rem 2.5rem' }}
            >
              <Calendar className="w-4.5 h-4.5 text-brand-accent" />
              <span>Schedule a Meeting</span>
            </button>
          </motion.div>
        </div>

      </div>

      {/* Spacer */}
      <div className="relative z-10 w-full h-8"></div>
    </section>
  );
};

export default HeroSection;
