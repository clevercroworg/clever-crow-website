"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const StickyContactBar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show bar once scrolled past the hero section (approx. 80% viewport height)
      const threshold = window.innerHeight * 0.8;
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const trackCallClick = () => {
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', 'click', {
          'event_category': 'Contact',
          'event_label': 'Sticky Bar Call Click',
          'phone_number': '09986389444'
        });
        window.gtag('event', 'Contact', {
          'phone_number': '09986389444',
          'method': 'Phone'
        });
      }
      if (window.fbq) {
        window.fbq('track', 'Contact', {
          'content_name': 'Sticky Bar Call Click',
          'phone_number': '09986389444'
        });
      }
    }
  };

  const trackWhatsAppClick = () => {
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', 'click', {
          'event_category': 'Contact',
          'event_label': 'Sticky Bar WhatsApp Click',
          'whatsapp_number': '09986389444'
        });
        window.gtag('event', 'Contact', {
          'phone_number': '09986389444',
          'method': 'WhatsApp'
        });
      }
      if (window.fbq) {
        window.fbq('track', 'Contact', {
          'content_name': 'Sticky Bar WhatsApp Click',
          'phone_number': '09986389444'
        });
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          exit={{ y: 80, x: "-50%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-3 bg-[#0a0e0b]/90 backdrop-blur-xl border border-white/10 px-4 py-3 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.6)] w-[90%] sm:w-auto max-w-[24rem]"
        >
          {/* Call Option */}
          <a
            href="tel:09986389444"
            onClick={trackCallClick}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white px-6 py-3 rounded-full font-heading font-bold text-sm tracking-wider uppercase transition-all duration-300 active:scale-95 shadow-md shadow-[#22c55e]/25 shrink-0"
          >
            <Phone className="w-4 h-4 stroke-[2.5]" />
            <span>Call Us</span>
          </a>

          {/* Divider Dot */}
          <div className="w-1.5 h-1.5 rounded-full bg-white/20 hidden sm:block shrink-0"></div>

          {/* WhatsApp Option */}
          <a
            href="https://wa.me/919986389444"
            onClick={trackWhatsAppClick}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2.5 bg-[#25d366] hover:bg-[#20ba5a] text-white px-6 py-3 rounded-full font-heading font-bold text-sm tracking-wider uppercase transition-all duration-300 active:scale-95 shadow-md shadow-[#25d366]/25 shrink-0"
          >
            <FaWhatsapp className="w-4.5 h-4.5" />
            <span>WhatsApp</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyContactBar;
