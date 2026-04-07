"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
 
export default function Header() {
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
 
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 16);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 
  return (
    <header id="site-header" className={`fixed inset-x-0 top-3 z-50 transition-all duration-300 ${isHeaderScrolled ? "header-scrolled" : ""}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <Image 
            src="/logo-dark.svg" 
            alt="Clever Crow Strategies" 
            width={130} 
            height={36} 
            className="h-8 w-auto sm:h-10" 
            priority
          />
        </a>
        <div className="flex items-center gap-2 sm:gap-3">
          <a href="tel:+919986389444" className="inline-flex h-[38px] w-[38px] sm:h-11 sm:w-11 items-center justify-center rounded-full bg-[#f4c542] text-black transition hover:brightness-110 shadow-sm border border-transparent" aria-label="Call Us">
            <svg className="h-[18px] w-[18px] sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </a>
          <a href="https://wa.me/919986389444?text=Hi%20Clever%20crow%20Team%20%2C%20I%27m%20intresered%20in%20google%20ads%20%2C%20can%20we%20have%20a%20converstaion" target="_blank" rel="noreferrer" className="inline-flex h-[38px] w-[38px] sm:h-11 sm:w-11 items-center justify-center rounded-full bg-green-500 text-white transition hover:bg-green-600 shadow-sm" aria-label="Chat on WhatsApp">
            <svg className="h-[18px] w-[18px] sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 21l1.65-4.06A9 9 0 1 1 8 20.3L3 21"></path>
              <path d="M9 10c0 3 2 5 5 5"></path>
              <path d="M9.5 9.5c.3-.9 1-.9 1.4-.2l.5.9c.2.4.1.9-.2 1.2l-.3.3"></path>
              <path d="M14.5 14.5c.9-.3.9-1 .2-1.4l-.9-.5c-.4-.2-.9-.1-1.2.2l-.3.3"></path>
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
