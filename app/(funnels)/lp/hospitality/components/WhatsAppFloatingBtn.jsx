"use client";
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppFloatingBtn = () => {
  const trackWhatsAppClick = () => {
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', 'click', {
          'event_category': 'Contact',
          'event_label': 'WhatsApp Floating Button Click',
          'whatsapp_number': '09986389444'
        });
        window.gtag('event', 'Contact', {
          'phone_number': '09986389444',
          'method': 'WhatsApp'
        });
      }
      if (window.fbq) {
        window.fbq('track', 'Contact', {
          'content_name': 'WhatsApp Floating Button Click',
          'phone_number': '09986389444'
        });
      }
    }
  };

  return (
    <a
      href="https://wa.me/919986389444"
      onClick={trackWhatsAppClick}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-[#25d366] hover:bg-[#20ba5a] text-white w-14 h-14 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer whatsapp-pulsate"
      title="Chat on WhatsApp"
    >
      <FaWhatsapp className="w-8 h-8" />
    </a>
  );
};

export default WhatsAppFloatingBtn;
