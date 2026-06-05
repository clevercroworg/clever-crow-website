"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const StickyContactBar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show bar as soon as user starts scrolling down (past 100px)
      const threshold = 100;
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

  const trackCallClick = (e) => {
    if (typeof window !== 'undefined') {
      if (window.gtag_report_conversion) {
        if (e && e.preventDefault) e.preventDefault();
        const href = e && e.currentTarget ? e.currentTarget.href : 'tel:09986389444';
        window.gtag_report_conversion(href);
      } else {
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
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-4 right-4 mx-auto z-50 flex items-center justify-between gap-3 bg-[#0a0e0b]/90 backdrop-blur-xl border border-white/10 p-2 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.5)] w-[calc(100%-2rem)] max-w-sm"
        >
          {/* Call Option */}
          <a
            href="tel:09986389444"
            onClick={trackCallClick}
            className="flex-1 flex items-center justify-center gap-2 bg-[#c1781f] hover:bg-[#9a6118] text-white py-3 px-4 rounded-full font-heading font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 active:scale-95 shadow-md shadow-[#c1781f]/25 shrink-0"
          >
            <Phone className="w-4 h-4 stroke-[2.5]" />
            <span>Call Us</span>
          </a>

          {/* WhatsApp Option */}
          <a
            href="https://wa.me/919986389444?text=Hi%20Clever%20Crow%2C%20I%27m%20interested%20in%20hospitality%20marketing%20services.%20(Ref:%20LP/Hospitality-Marketing)"
            onClick={trackWhatsAppClick}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#20ba5a] text-white py-3 px-4 rounded-full font-heading font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 active:scale-95 shadow-md shadow-[#25d366]/25 shrink-0"
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
