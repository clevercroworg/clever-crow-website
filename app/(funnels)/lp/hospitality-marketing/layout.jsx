import React from 'react';
import Script from 'next/script';
import './hospitality.css';

export const metadata = {
  title: 'Beyond Reach | Hospitality Growth Partner',
  description: 'Improve your online presence, enquiry flow and booking growth. Get more direct enquiries and bookings for your hotel, resort, homestay or villa.',
};

export default function HospitalityLayout({ children }) {
  return (
    <div className="hospitality-funnel min-h-screen bg-brand-dark text-white font-body">
      {/* Google Tag (gtag.js) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17335403082"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17335403082');
        `}
      </Script>
      {children}
    </div>
  );
}
