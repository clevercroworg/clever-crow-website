"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';

const FinalCTASection = () => {
  const scrollToForm = () => {
    const element = document.getElementById('contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const trackWhatsAppClick = () => {
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', 'click', {
          'event_category': 'Contact',
          'event_label': 'WhatsApp Click',
          'whatsapp_number': '09986389444'
        });
        window.gtag('event', 'Contact', {
          'phone_number': '09986389444',
          'method': 'WhatsApp'
        });
      }
      if (window.fbq) {
        window.fbq('track', 'Contact', {
          'content_name': 'WhatsApp Click',
          'phone_number': '09986389444'
        });
      }
    }
  };

  return (
    <footer className="relative py-16 px-6 bg-brand-dark overflow-hidden border-t border-brand-border/40 text-center">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Call to Action Content */}
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase mb-6 leading-none tracking-[0.015em]" style={{ wordSpacing: '0.06em' }}>
          Request Your Free <br/>
          <span className="text-brand-accent">Property Growth Review</span>
        </h2>
        
        <p className="font-body text-sm md:text-base text-brand-textSecondary max-w-xl mb-8 leading-relaxed">
          Share your property details and our hospitality marketing team will review your online visibility, brand positioning, photos/videos, ads readiness, and booking flow.
        </p>

        {/* Call CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
          <button 
            onClick={scrollToForm}
            className="glow-btn bg-brand-accent text-brand-dark hover:bg-white font-body font-bold text-sm uppercase px-8 py-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer tracking-[0.05em]"
          >
            <span>Get Free Property Growth Review</span>
          </button>
          
          <a 
            href="https://wa.me/919986389444"
            onClick={trackWhatsAppClick}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/20 hover:border-brand-accent text-white hover:text-brand-accent font-body font-bold text-sm uppercase px-8 py-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 tracking-[0.05em]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Talk on WhatsApp</span>
          </a>
        </div>

        {/* Footer Brand Info */}
        <div className="w-full border-t border-brand-border/40 pt-8 flex flex-col items-center justify-center gap-4">
          <p className="font-body text-[11px] text-brand-textSecondary/50 uppercase tracking-[0.2em] text-center font-bold">
            &copy; 2026 CLEVER CROW STRATEGIES LLP. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 text-[10px] font-body text-brand-textSecondary/40 uppercase tracking-[0.2em] font-bold">
            <Link href="/lp/hospitality-marketing/privacy-policy" className="hover:text-brand-accent transition-colors duration-300">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/lp/hospitality-marketing/terms-conditions" className="hover:text-brand-accent transition-colors duration-300">
              Terms & Conditions
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default FinalCTASection;
