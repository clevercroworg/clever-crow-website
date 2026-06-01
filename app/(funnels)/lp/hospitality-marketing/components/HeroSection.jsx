"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, Calendar, ArrowRight, Award, 
  GraduationCap, Users, Headphones, CheckCircle, 
  Loader2, AlertCircle 
} from 'lucide-react';

const HeroSection = () => {
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState({
    contactName: '',
    propertyType: '',
    phone: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const propertyTypes = [
    "Hotels",
    "Resorts",
    "Homestays & Villas",
    "Spas & Wellness Brands",
    "Clubs & Lounges",
    "Event Venues",
    "Yachts & Boat Rentals",
    "Tours & Activities"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.contactName || !formData.propertyType || !formData.phone) {
      setStatus({ loading: false, success: false, error: 'Please fill in all fields.' });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      const payload = {
        name: formData.contactName,
        phone: formData.phone,
        email: `${formData.contactName.toLowerCase().replace(/\s+/g, '')}@clevercrow-lead.in`,
        message: `Property Growth Review Request\nProperty Type: ${formData.propertyType}`,
        source: "Hospitality Marketing Landing Page"
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        // Track Form Conversion in Google Ads / Meta Ads
        if (typeof window !== 'undefined') {
          if (window.gtag) {
            window.gtag('event', 'conversion', {
              'send_to': 'AW-17335403082',
              'event_category': 'Lead',
              'event_label': 'Hospitality Form Submission'
            });
            window.gtag('event', 'GenerateLead', {
              'phone_number': '09986389444'
            });
          }
          if (window.fbq) {
            window.fbq('track', 'Lead', {
              'content_name': 'Hospitality Form Submission',
              'phone_number': '09986389444'
            });
          }
        }

        setStatus({ loading: false, success: true, error: null });
        setFormData({ contactName: '', propertyType: '', phone: '' });

        // Redirect after a brief success delay
        setTimeout(() => {
          router.push('/thank-you');
        }, 1200);
      } else {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  const trackCallClick = () => {
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', 'click', {
          'event_category': 'Contact',
          'event_label': 'Phone Call Click',
          'phone_number': '09986389444'
        });
        window.gtag('event', 'Contact', {
          'phone_number': '09986389444',
          'method': 'Phone'
        });
      }
      if (window.fbq) {
        window.fbq('track', 'Contact', {
          'content_name': 'Phone Call Click',
          'phone_number': '09986389444'
        });
      }
    }
  };

  // Trust badges from 4th image
  const trustBadges = [
    { label: "15+ Years of Experience", icon: Award },
    { label: "Certified Professionals", icon: GraduationCap },
    { label: "550+ Happy Clients", icon: Users },
    { label: "Best Customer Support", icon: Headphones }
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-brand-dark">
      
      {/* Desktop Background Image (Covering the right 55% of the screen) */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[55%] z-0 lg:block hidden">
        <img 
          src="/lp/hospitality/resort_hero.png" 
          alt="Luxury Resort Building at Night" 
          className="w-full h-full object-cover"
        />
        {/* Gradients to blend resort photo into the left panel */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/45 to-transparent w-[50%]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent"></div>
      </div>

      {/* Mobile Background Fallback */}
      <div className="absolute inset-0 z-0 lg:hidden block">
        <img 
          src="/lp/hospitality/resort_hero.png" 
          alt="Luxury Resort Building" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent"></div>
      </div>
      
      {/* Top Header Bar */}
      <header className="relative z-20 w-full max-w-[95rem] mx-auto px-6 py-6 flex justify-between items-center bg-transparent">
        {/* Logo Branding */}
        <div className="bg-white/95 px-4.5 py-2.5 rounded-full shadow-md flex items-center justify-center border border-white/10 backdrop-blur-md">
          <Link href="/" className="flex items-center transition-transform hover:scale-105 active:scale-95 shrink-0">
            <img 
              src="/logo-dark.svg" 
              alt="Clever Crow" 
              className="h-6 md:h-6.5 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Right Phone Button */}
        <a 
          href="tel:09986389444" 
          onClick={trackCallClick}
          className="flex items-center justify-center bg-brand-accent hover:bg-white text-brand-dark w-11 h-11 rounded-full transition-all duration-300 shadow-md hover:shadow-brand-accent/25 cursor-pointer"
          title="Call 09986389444"
        >
          <Phone className="w-5 h-5 stroke-[2.5]" />
        </a>
      </header>

      {/* Main 2-Column Split Grid */}
      <div className="relative z-10 flex-grow grid grid-cols-1 lg:grid-cols-12 items-center lg:pt-16 max-w-[95rem] w-full mx-auto px-6 py-12 lg:py-0 gap-12">
        
        {/* Left Column: Heading, Badges, Direct Dial (Col Span 7) */}
        <div className="lg:col-span-7 flex flex-col justify-center items-start text-left lg:pr-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Tagline using Formula Condensed in weight 300, copper color accent */}
            <h1 className="font-heading text-5xl md:text-7xl lg:text-[4.5rem] xl:text-[5rem] text-white mb-6 hero-heading tracking-wide leading-[1.05]" style={{ fontWeight: 300 }}>
              Get More Direct <br className="block lg:hidden"/>
              <span className="text-brand-accent font-bold-important">Enquiries & Bookings</span> <br className="block lg:hidden"/>
              For Your Property
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-base md:text-lg text-white/95 mb-8 max-w-xl font-light"
          >
            More direct bookings. Better visibility. Stronger enquiry flow.
          </motion.p>

          {/* 4-Badge Trust Grid from 4th image (2x2 grid layout, custom translucent pills) */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-xl mb-10"
          >
            {trustBadges.map((badge, idx) => {
              const IconComp = badge.icon;
              return (
                <div 
                  key={idx} 
                  className="flex items-center gap-3.5 bg-white/[0.04] border border-white/10 px-5 py-3 rounded-full backdrop-blur-md hover:border-brand-accent/40 hover:bg-white/[0.08] transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-accent/15 border border-brand-accent/35 flex items-center justify-center text-brand-accent shadow-[0_0_10px_rgba(200,127,76,0.1)]">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span className="font-body text-xs md:text-sm text-white/90 font-light select-none tracking-wide">{badge.label}</span>
                </div>
              );
            })}
          </motion.div>

          {/* Dial Button CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full sm:w-auto"
          >
            <a 
              href="tel:09986389444"
              onClick={trackCallClick}
              className="glow-btn bg-brand-accent text-brand-dark hover:bg-white font-heading text-lg font-bold px-10 py-4.5 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer tracking-[0.08em] shadow-lg shadow-brand-accent/15 w-full sm:w-auto"
            >
              <Phone className="w-5 h-5 stroke-[2.5]" />
              <span className="font-bold-important">09986389444</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Embedded Callback Form (Col Span 5) - Overhauled to White background, black text, and copper highlights */}
        <div id="contact-form" className="lg:col-span-5 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white border border-[#c87f4c]/20 p-8 md:p-9 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.25)] relative overflow-hidden"
          >
            {/* Top copper highlight border */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-accent/30 via-brand-accent to-brand-accent/30"></div>
            
            <h3 className="font-heading text-3xl font-bold text-[#0a0e0b] mb-2 leading-none" style={{ fontWeight: 300 }}>
              Request Your <span className="text-brand-accent font-bold-important">Call Back</span>
            </h3>
            <p className="font-body text-xs text-slate-500 leading-relaxed mb-6 font-light">
              Leave your details below and our team will get back to you to discuss your property marketing needs.
            </p>

            <AnimatePresence mode="wait">
              {status.success ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center text-center py-10"
                >
                  <CheckCircle className="w-14 h-14 text-brand-accent mb-6 animate-pulse" />
                  <h4 className="font-heading text-2xl font-bold text-[#0a0e0b] mb-2" style={{ fontWeight: 300 }}>Review Requested!</h4>
                  <p className="font-body text-sm text-slate-500 max-w-xs mb-8 font-light">
                    Thank you! Our growth desk is reviewing your online presence and will call you back shortly.
                  </p>
                  <button
                    onClick={() => setStatus({ loading: false, success: false, error: null })}
                    className="border border-slate-200 hover:border-brand-accent text-slate-600 hover:text-brand-accent font-body font-bold text-xs uppercase px-6 py-2.5 rounded-full transition-all duration-300"
                  >
                    Submit Another
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleFormSubmit}
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {status.error && (
                    <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 text-red-500 rounded-lg text-xs font-body">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{status.error}</span>
                    </div>
                  )}

                  {/* Full Name Input */}
                  <div>
                    <input 
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      required
                      disabled={status.loading}
                      className="w-full bg-[#f8fafc] border border-slate-200 focus:border-brand-accent text-[#0a0e0b] px-5 py-4 rounded-xl font-body text-sm transition-colors duration-300 outline-none placeholder:text-slate-400 disabled:opacity-50 font-light"
                    />
                  </div>

                  {/* Phone Input */}
                  <div>
                    <input 
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      required
                      disabled={status.loading}
                      className="w-full bg-[#f8fafc] border border-slate-200 focus:border-brand-accent text-[#0a0e0b] px-5 py-4 rounded-xl font-body text-sm transition-colors duration-300 outline-none placeholder:text-slate-400 disabled:opacity-50 font-light"
                    />
                  </div>

                  {/* Property Type Dropdown */}
                  <div className="relative">
                    <select 
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      required
                      disabled={status.loading}
                      className="w-full bg-[#f8fafc] border border-slate-200 focus:border-brand-accent text-[#0a0e0b] px-5 py-4 rounded-xl font-body text-sm transition-colors duration-300 outline-none placeholder:text-slate-400 appearance-none disabled:opacity-50 cursor-pointer font-light"
                    >
                      <option value="" disabled className="text-slate-400">Select Property Type</option>
                      {propertyTypes.map((type, index) => (
                        <option key={index} value={type} className="bg-white text-[#0a0e0b] font-light">{type}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status.loading}
                    className="glow-btn w-full bg-brand-accent text-white font-body font-bold text-sm uppercase py-4.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#0a0e0b] transition-all duration-300 cursor-pointer disabled:opacity-50 tracking-[0.05em]"
                  >
                    {status.loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span className="font-bold-important text-white text-sm uppercase">Requesting...</span>
                      </>
                    ) : (
                      <>
                        <span className="font-bold-important text-white text-sm uppercase">Request Call Back</span>
                        <span className="font-bold-important text-white">→</span>
                      </>
                    )}
                  </button>
                  
                  <p className="text-center font-body text-[10px] text-slate-400 mt-4 font-light tracking-wide">
                    We respect your privacy. No spam, ever.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>

      {/* Spacer */}
      <div className="relative z-10 w-full h-8"></div>
    </section>
  );
};

export default HeroSection;
