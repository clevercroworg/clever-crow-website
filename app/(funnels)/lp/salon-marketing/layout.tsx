import React from 'react';
import './salon.css';

export const metadata = {
  title: 'Salon Marketing Services & Appointment Systems | Clever Crow',
  description: 'Attract local clients, improve Instagram visibility, and fill your booking calendar. Premium digital marketing packages for beauty, hair, unisex salons, and grooming studios starting at ₹18,000/month.',
  keywords: 'salon marketing, beauty salon advertising, hair salon growth, unisex salon ads, bridal makeup leads, local SEO for salons',
};

export default function SalonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="salon-funnel min-h-screen bg-[#FAF9F6] text-slate-800 font-sans-modern antialiased">
      {children}
    </div>
  );
}
