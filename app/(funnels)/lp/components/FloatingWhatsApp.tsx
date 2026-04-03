"use client";

import React from "react";

export default function FloatingWhatsApp() {
  return (
    <a href="https://wa.me/919986389444?text=Hi%20Clever%20crow%20Team%20%2C%20I%27m%20intresered%20in%20google%20ads%20%2C%20can%20we%20have%20a%20converstaion"
       target="_blank"
       rel="noreferrer"
       className="fixed bottom-6 right-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-[0_10px_40px_rgba(34,197,94,0.3)] transition-transform hover:scale-110 hover:bg-green-600 sm:bottom-8 sm:right-8"
       aria-label="Chat on WhatsApp"
    >
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21l1.65-4.06A9 9 0 1 1 8 20.3L3 21"></path>
        <path d="M9 10c0 3 2 5 5 5"></path>
        <path d="M9.5 9.5c.3-.9 1-.9 1.4-.2l.5.9c.2.4.1.9-.2 1.2l-.3.3"></path>
        <path d="M14.5 14.5c.9-.3.9-1 .2-1.4l-.9-.5c-.4-.2-.9-.1-1.2.2l-.3.3"></path>
      </svg>
    </a>
  );
}
