"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, Eye, Image, Monitor, 
  MessageSquare, Globe, Tag, Star,
  CheckCircle, Loader2, AlertCircle 
} from 'lucide-react';

const ReviewFormSection = () => {
  const [formData, setFormData] = useState({
    contactName: '',
    hotelName: '',
    propertyType: '',
    phone: '',
    email: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const checks = [
    {
      title: "Brand Positioning",
      desc: "We evaluate how your property is positioned online.",
      icon: Target
    },
    {
      title: "Online Visibility",
      desc: "We review your presence across key travel platforms.",
      icon: Eye
    },
    {
      title: "Content Quality",
      desc: "We assess your visuals and messaging for impact.",
      icon: Image
    },
    {
      title: "Website Experience",
      desc: "We analyze your website for usability and conversion.",
      icon: Monitor
    },
    {
      title: "Enquiry Flow",
      desc: "We check how enquiries are generated and managed.",
      icon: MessageSquare
    },
    {
      title: "Booking Channels",
      desc: "We review your channel mix and dependency on OTAs.",
      icon: Globe
    },
    {
      title: "Pricing Strategy",
      desc: "We evaluate your pricing positioning and offers.",
      icon: Tag
    },
    {
      title: "Reputation & Reviews",
      desc: "We assess online reviews and guest perception.",
      icon: Star
    }
  ];

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic verification
    if (!formData.contactName || !formData.hotelName || !formData.propertyType || !formData.phone || !formData.email) {
      setStatus({ loading: false, success: false, error: 'Please fill in all fields.' });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      const payload = {
        name: formData.contactName,
        phone: formData.phone,
        email: formData.email,
        message: `Property Growth Review Request\nProperty Name: ${formData.hotelName}\nProperty Type: ${formData.propertyType}`,
        source: "Hospitality Landing Page"
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
        setFormData({
          contactName: '',
          hotelName: '',
          propertyType: '',
          phone: '',
          email: ''
        });
      } else {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  return (
    <section id="review-form-section" className="relative py-24 px-6 bg-[#fafbfa] overflow-hidden border-t border-neutral-200/50">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Checks Grid */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="text-center mb-12">
              <h2 className="font-heading text-[15px] md:text-[16px] tracking-[0.08em] text-brand-accent mb-3.5 font-bold uppercase">
                Before the Call
              </h2>
              <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a0e0b] uppercase leading-tight tracking-[0.015em]" style={{ wordSpacing: '0.06em' }}>
                What We Review <br/>
                For Your Property
              </h3>
            </div>
            
            {/* Grid of 8 Cards (4 columns on desktop) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 w-full">
              {checks.map((check, index) => {
                const IconComponent = check.icon;
                return (
                  <div 
                    key={index} 
                    className="flex flex-col items-center text-center py-8 px-5 bg-white border border-neutral-100/80 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.04)] hover:border-brand-accent/40 transition-all duration-300 group"
                  >
                    <div className="text-brand-accent mb-4 transition-transform duration-300 group-hover:scale-110">
                      <IconComponent className="w-10 h-10 stroke-[1.4]" />
                    </div>
                    <h4 className="font-heading text-[15px] md:text-[17px] font-bold text-[#0a0e0b] uppercase tracking-wider mb-2.5 leading-tight">
                      {check.title}
                    </h4>
                    <p className="font-body text-[12px] md:text-[13px] text-neutral-600 leading-relaxed">
                      {check.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="font-body text-xs text-neutral-500 mt-8 text-center max-w-xl">
              This is a quick review to identify growth opportunities. Get in touch and let's unlock more direct bookings for your property.
            </p>
          </div>

          {/* Right Column: Callback Form */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-[#0f1411] border border-[#1c2420] p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden">
              {/* Highlight bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-accent/30 via-brand-accent to-brand-accent/30"></div>
              
              <h3 className="font-heading text-3xl font-bold text-white uppercase tracking-wide mb-2">
                Request Your <span className="text-brand-accent">Call Back</span>
              </h3>
              <p className="font-body text-xs text-brand-textSecondary leading-relaxed mb-8">
                Leave your details and our team will call you back to discuss your property growth needs.
              </p>

              <AnimatePresence mode="wait">
                {status.success ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center text-center py-12"
                  >
                    <CheckCircle className="w-16 h-16 text-brand-accent mb-6 animate-pulse" />
                    <h4 className="font-heading text-2xl font-bold text-white uppercase mb-2">Review Requested!</h4>
                    <p className="font-body text-sm text-brand-textSecondary max-w-xs mb-8">
                      Thank you! Our hospitality growth team is reviewing your online presence and will call you back shortly.
                    </p>
                    <button
                      onClick={() => setStatus({ loading: false, success: false, error: null })}
                      className="border border-white/20 hover:border-brand-accent text-white hover:text-brand-accent font-body font-bold text-xs uppercase px-6 py-2.5 rounded-full transition-all duration-300"
                    >
                      Submit Another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {status.error && (
                      <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-xs font-body">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{status.error}</span>
                      </div>
                    )}

                    {/* Name */}
                    <div>
                      <input 
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        required
                        disabled={status.loading}
                        className="w-full bg-[#161d19] border border-[#26312a] focus:border-brand-accent text-white px-5 py-4 rounded-xl font-body text-sm transition-colors duration-300 outline-none placeholder:text-[#5c6e63] disabled:opacity-50"
                      />
                    </div>

                    {/* Property / Business Name */}
                    <div>
                      <input 
                        type="text"
                        name="hotelName"
                        value={formData.hotelName}
                        onChange={handleInputChange}
                        placeholder="Property / Business Name"
                        required
                        disabled={status.loading}
                        className="w-full bg-[#161d19] border border-[#26312a] focus:border-brand-accent text-white px-5 py-4 rounded-xl font-body text-sm transition-colors duration-300 outline-none placeholder:text-[#5c6e63] disabled:opacity-50"
                      />
                    </div>

                    {/* Property Type Dropdown */}
                    <div>
                      <select 
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        required
                        disabled={status.loading}
                        className="w-full bg-[#161d19] border border-[#26312a] focus:border-brand-accent text-white px-5 py-4 rounded-xl font-body text-sm transition-colors duration-300 outline-none placeholder:text-[#5c6e63] appearance-none disabled:opacity-50"
                      >
                        <option value="" disabled className="bg-[#0f1411] text-white/50">Select Property Type</option>
                        {propertyTypes.map((type, index) => (
                          <option key={index} value={type} className="bg-[#0f1411] text-white">{type}</option>
                        ))}
                      </select>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <input 
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        required
                        disabled={status.loading}
                        className="w-full bg-[#161d19] border border-[#26312a] focus:border-brand-accent text-white px-5 py-4 rounded-xl font-body text-sm transition-colors duration-300 outline-none placeholder:text-[#5c6e63] disabled:opacity-50"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address"
                        required
                        disabled={status.loading}
                        className="w-full bg-[#161d19] border border-[#26312a] focus:border-brand-accent text-white px-5 py-4 rounded-xl font-body text-sm transition-colors duration-300 outline-none placeholder:text-[#5c6e63] disabled:opacity-50"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status.loading}
                      className="glow-btn w-full bg-brand-accent text-brand-dark font-body font-bold text-sm uppercase py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-all duration-300 cursor-pointer disabled:opacity-50 tracking-[0.05em]"
                    >
                      {status.loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Requesting...</span>
                        </>
                      ) : (
                        <>
                          <span>Request Call Back</span>
                          <span>→</span>
                        </>
                      )}
                    </button>
                    
                    <p className="text-center font-body text-[10px] text-brand-textSecondary/60 mt-4">
                      We respect your privacy. No spam, ever.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ReviewFormSection;
