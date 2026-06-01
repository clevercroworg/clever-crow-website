"use client";
import React from 'react';

const BrandsWeWorkWith = () => {
  const logos = [
    "MARRIOTT",
    "FOUR SEASONS",
    "RITZ-CARLTON",
    "AMAN",
    "MANDARIN ORIENTAL",
    "TAJ HOTELS",
    "OBEROI",
    "W HOTELS",
    "HYATT",
    "HILTON",
  ];

  // Duplicate logos once for seamless infinite loop scroll
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="relative bg-[#fafbfa] py-8 sm:py-12 overflow-hidden border-b border-neutral-200/40 z-10">
      <div className="mx-auto max-w-7xl px-6 mb-6 text-center">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400">
          Brands We Work With
        </span>
      </div>

      <div className="relative flex overflow-hidden">
        {/* Soft edge gradients for smooth premium transition */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#fafbfa] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#fafbfa] to-transparent z-10 pointer-events-none" />

        <div className="flex items-center whitespace-nowrap gap-12 sm:gap-20 py-2.5 animate-scroll-marquee select-none">
          {duplicatedLogos.map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-4 sm:gap-6 group"
            >
              <span className="text-neutral-300 text-xs select-none">●</span>
              <span 
                className="text-lg sm:text-2xl font-normal text-neutral-500 uppercase tracking-[0.25em] transition-colors duration-300 group-hover:text-[#c87f4c] cursor-pointer"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsWeWorkWith;
