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
 
export default function LogoMarquee() {
  return (
    <section className="bg-white py-12 sm:py-16 border-y border-slate-100 min-h-[150px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl tracking-tight">Brands We've Empowered</h2>
        </div>
      </div>
      <div className="logo-marquee mt-10">
        <div className="logo-track">
          {clientLogoItems.map((item, idx) => (
            <div className="logo-item" key={`a-${idx}`} style={{ background: 'rgba(248,250,252,0.8)', borderColor: 'rgba(15,23,42,0.08)' }}>
              <img 
                src={item.src} 
                alt={item.alt} 
                className="logo-image object-contain" 
              />
            </div>
          ))}
        </div>
        <div className="logo-track" aria-hidden="true">
          {clientLogoItems.map((item, idx) => (
            <div className="logo-item" key={`b-${idx}`} style={{ background: 'rgba(248,250,252,0.8)', borderColor: 'rgba(15,23,42,0.08)' }}>
              <img 
                src={item.src} 
                alt={item.alt} 
                className="logo-image object-contain" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
