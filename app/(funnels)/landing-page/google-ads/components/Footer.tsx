"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#0B1120] py-12 px-4 sm:px-6 lg:px-8 text-center border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-white text-3xl sm:text-4xl font-extrabold mb-10 tracking-tight">
          Start Building Your Digital Presence Today
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          {/* Call Button */}
          <a 
            href="tel:+919986389444" 
            className="inline-flex items-center gap-3 bg-[#f4c542] hover:bg-[#e5b63b] text-black px-8 py-4 rounded-full text-lg font-bold transition-all shadow-lg hover:scale-105"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            09986389444
          </a>
          
          {/* WhatsApp Button */}
          <a 
            href="https://wa.me/919986389444?text=Hi%20Clever%20crow%20Team%20%2C%20I%27m%20intresered%20in%20google%20ads%20%2C%20can%20we%20have%20a%20converstaion" 
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-[#10b981] hover:bg-[#059669] text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-lg hover:scale-105"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 21l1.65-4.06A9 9 0 1 1 8 20.3L3 21"></path>
              <path d="M9 10c0 3 2 5 5 5"></path>
              <path d="M9.5 9.5c.3-.9 1-.9 1.4-.2l.5.9c.2.4.1.9-.2 1.2l-.3.3"></path>
              <path d="M14.5 14.5c.9-.3.9-1 .2-1.4l-.9-.5c-.4-.2-.9-.1-1.2.2l-.3.3"></path>
            </svg>
            Chat with Us on WhatsApp
          </a>
        </div>
        
        <div className="text-white/40 text-sm font-medium">
          <p className="mb-2">Clever Crow Strategies LLP. © All rights reserved.</p>
          <p>
            <a href="#" className="hover:text-white transition-colors underline underline-offset-4">Privacy Policy</a> 
            <span className="mx-2">|</span> 
            <a href="#" className="hover:text-white transition-colors underline underline-offset-4">Terms & Conditions</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
