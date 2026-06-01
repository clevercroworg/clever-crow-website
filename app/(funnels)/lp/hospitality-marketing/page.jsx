import React from 'react';
import HeroSection from './components/HeroSection';
import BrandsWeWorkWith from './components/BrandsWeWorkWith';
import ProblemSection from './components/ProblemSection';
import IndustryCategories from './components/IndustryCategories';
import GrowthSystemTimeline from './components/GrowthSystemTimeline';
import TestimonialsStats from './components/TestimonialsStats';
import WhyExperience from './components/WhyExperience';
import FinalCTASection from './components/FinalCTASection';
import WhatsAppFloatingBtn from './components/WhatsAppFloatingBtn';

export default function HospitalityLandingPage() {
  return (
    <main className="min-h-screen bg-brand-dark text-white overflow-x-hidden">
      {/* 1. Hero Section (containing integrated Right Form + Left Badges) */}
      <HeroSection />

      {/* 2. Brand Marquee Section (NEW, light background, right below Hero) */}
      <BrandsWeWorkWith />

      {/* 3. Section 1: The Problem Cards */}
      <ProblemSection />

      {/* 4. Section 2: Built for Hospitality Grid & What We Review Audit Grid */}
      <IndustryCategories />

      {/* 5. Section 3: Process System Roadmap */}
      <GrowthSystemTimeline />

      {/* 6. Section 4: Why Beyond Reach & Experience Stats (Minimalized layout) */}
      <WhyExperience />

      {/* 7. Testimonials segment (White background, moved just above footer) */}
      <TestimonialsStats />

      {/* 8. Final CTA & Footer */}
      <FinalCTASection />

      {/* Floating Interactive WhatsApp CTA */}
      <WhatsAppFloatingBtn />
    </main>
  );
}
