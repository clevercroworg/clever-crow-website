import React from 'react';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import ReviewFormSection from './components/ReviewFormSection';
import IndustryCategories from './components/IndustryCategories';
import GrowthSystemTimeline from './components/GrowthSystemTimeline';
import TestimonialsStats from './components/TestimonialsStats';
import WhyExperience from './components/WhyExperience';
import FinalCTASection from './components/FinalCTASection';

export default function HospitalityLandingPage() {
  return (
    <main className="min-h-screen bg-brand-dark text-white overflow-x-hidden">
      {/* Hero Header & Intro */}
      <HeroSection />

      {/* Section 1: The Problem Cards */}
      <ProblemSection />

      {/* Section 2: Before Call Review & Form Inquiry Submission */}
      <ReviewFormSection />

      {/* Section 3: Built for Hospitality Grid */}
      <IndustryCategories />

      {/* Section 4: Process System Roadmap */}
      <GrowthSystemTimeline />

      {/* Testimonials & Growth Stats */}
      <TestimonialsStats />

      {/* Section 5 & 6: Why Beyond Reach & Experience Stats */}
      <WhyExperience />

      {/* Final CTA & Footer */}
      <FinalCTASection />
    </main>
  );
}
