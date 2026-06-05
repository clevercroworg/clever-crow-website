"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Calendar, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const scrollToForm = () => {
    const element = document.getElementById('contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const trackCallClick = () => {
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-17335403082/ul0ECKr5i_QaEMqElcpA',
        });
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
      
      {/* Desktop Background Image (Covering the right 70% from the very top to bottom) */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[70%] z-0 lg:block hidden">
        <img 
          src="/lp/hospitality/resort_hero.png" 
          alt="Luxury Resort Building at Night" 
          className="w-full h-full object-cover"
        />
        {/* Subtle gradient overlay to blend into the left column's solid black background */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/40 to-transparent w-[30%]"></div>
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
        <div className="bg-white/95 px-4.5 py-2.5 rounded-full shadow-md flex items-center justify-center border border-white/10 backdrop-blur-md">
          <Link href="/" className="flex items-center transition-transform hover:scale-105 active:scale-95 shrink-0">
            <img 
              src="/logo-dark.svg" 
              alt="Clever Crow" 
              className="h-6 md:h-6.5 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Right Phone Button */}
        <a 
          href="tel:09986389444" 
          onClick={trackCallClick}
          className="flex items-center justify-center bg-brand-accent hover:bg-white text-brand-dark w-11 h-11 rounded-full transition-all duration-300 shadow-md hover:shadow-brand-accent/25 cursor-pointer"
          title="Call 09986389444"
        >
          <Phone className="w-5 h-5 stroke-[2.5]" />
        </a>
      </header>

      {/* Main Split Grid (Content Left, Right side is overlaid by the background image) */}
      <div className="relative z-10 flex-grow grid grid-cols-1 lg:grid-cols-12 items-center lg:items-start lg:pt-28 max-w-[95rem] w-full mx-auto px-6 py-12 lg:py-0">
        
        {/* Left Side: Headings & CTA Buttons (Col Span 8) */}
        <div className="lg:col-span-8 flex flex-col justify-center items-start text-left lg:pr-12">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-5xl md:text-7xl lg:text-[4.2rem] xl:text-[4.6rem] text-white uppercase mb-6 hero-heading leading-[1.08] tracking-wide">
              Get More Direct <br className="block lg:hidden"/>
              <span className="text-brand-accent">Enquiries & Bookings</span> <br className="block lg:hidden"/>
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
            {/* Primary Phone button (Direct Call link + event track) */}
            <a 
              href="tel:09986389444"
              onClick={trackCallClick}
              className="glow-btn bg-brand-accent text-brand-dark hover:bg-white font-heading text-lg font-bold px-10 py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer tracking-[0.08em] shadow-lg shadow-brand-accent/15"
              style={{ padding: '1.125rem 2.5rem' }}
            >
              <Phone className="w-5 h-5 stroke-[2.5] text-brand-dark" />
              <span>09986389444</span>
            </a>
            
            {/* Secondary Request Call Back button (Scrolls to form) */}
            <button 
              onClick={scrollToForm}
              className="border border-brand-accent/40 hover:border-brand-accent text-brand-accent hover:text-white bg-transparent font-heading text-base font-bold px-10 py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer tracking-[0.05em]"
              style={{ padding: '1.125rem 2.5rem' }}
            >
              <span>Request a Call Back</span>
              <ArrowRight className="w-4.5 h-4.5 text-brand-accent" />
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
