"use client";

import React from "react";

const clientLogoItems = [
  { src: "/landing-page/google-ads/clients/client4.png", alt: "Client 4" },
  { src: "/landing-page/google-ads/clients/client5.png", alt: "Client 5" },
  { src: "/landing-page/google-ads/clients/client6.png", alt: "Client 6" },
  { src: "/landing-page/google-ads/clients/client7.png", alt: "Client 7" },
  { src: "/landing-page/google-ads/clients/client8.png", alt: "Client 8" },
  { src: "/landing-page/google-ads/clients/client9.png", alt: "Client 9" },
  { src: "/landing-page/google-ads/clients/client10.png", alt: "Client 10" },
  { src: "/landing-page/google-ads/clients/client11.png", alt: "Client 11" },
  { src: "/landing-page/google-ads/clients/client12.png", alt: "Client 12" },
  { src: "/landing-page/google-ads/clients/client13.png", alt: "Client 13" },
  { src: "/landing-page/google-ads/clients/client14.png", alt: "Client 14" },
  { src: "/landing-page/google-ads/clients/client16.png", alt: "Client 16" },
  { src: "/landing-page/google-ads/clients/client18.png", alt: "Client 18" }
];

// Cardless logo strip: transparent logos sit directly on white, in full colour, at one height.
function LogoTrack({ hidden }: { hidden?: boolean }) {
  return (
    <div className="logo-track" aria-hidden={hidden || undefined}>
      {clientLogoItems.map((item) => (
        <div key={item.src} className="flex h-16 w-40 shrink-0 items-center justify-center px-4 sm:w-48 sm:px-6">
          <img
            src={item.src}
            alt={hidden ? "" : item.alt}
            loading="lazy"
            className="max-h-12 w-auto max-w-full object-contain transition duration-300 hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <section className="border-y border-slate-100 bg-white py-12 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Brands We&apos;ve Empowered</h2>
      </div>
      <div className="logo-marquee mt-8 [&:hover_.logo-track]:[animation-play-state:paused]">
        <LogoTrack />
        <LogoTrack hidden />
      </div>
    </section>
  );
}
