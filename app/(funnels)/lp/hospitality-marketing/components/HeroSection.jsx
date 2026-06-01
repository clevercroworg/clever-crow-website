"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, Award, Users, CheckCircle, 
  Loader2, AlertCircle 
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const HeroSection = () => {
  const router = useRouter();
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          setIsModalOpen(false);
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

  const trackWhatsAppClick = () => {
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', 'click', {
          'event_category': 'Contact',
          'event_label': 'Hero WhatsApp Click',
          'whatsapp_number': '09986389444'
        });
        window.gtag('event', 'Contact', {
          'phone_number': '09986389444',
          'method': 'WhatsApp'
        });
      }
      if (window.fbq) {
        window.fbq('track', 'Contact', {
          'content_name': 'Hero WhatsApp Click',
          'phone_number': '09986389444'
        });
      }
    }
  };

  // Centered premium stats
  const stats = [
    { label: "145+ Clients", icon: Users },
    { label: "Google & Meta Experts", icon: Award },
    { label: "Hospitality-Focused", icon: CheckCircle }
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-brand-dark">
      
      {/* Full Page Luxury Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lp/hospitality/resort_hero.png" 
          alt="Luxury Resort Pool at Night" 
          className="w-full h-full object-cover"
        />
        {/* Dark overlay gradients to make centering typography extremely legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e0b]/90 via-[#0a0e0b]/80 to-[#0a0e0b]/95"></div>
      </div>
      
      {/* Top Header Bar */}
      <header className="relative z-20 w-full max-w-[95rem] mx-auto px-6 pt-4 pb-2 lg:py-4 flex justify-between items-center bg-transparent">
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
          className="flex items-center justify-center bg-[#22c55e] hover:bg-[#16a34a] text-white w-11 h-11 rounded-full transition-all duration-300 shadow-md hover:shadow-[#22c55e]/30 cursor-pointer"
          title="Call 09986389444"
        >
          <Phone className="w-5 h-5 stroke-[2.5]" />
        </a>
      </header>

      {/* Centered Typography & CTAs Grid */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center max-w-[95rem] w-full mx-auto px-6 py-12 lg:py-6 -mt-8 sm:-mt-12">
        
        {/* Animated Headline Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Tagline using Poppins font, copper color accent */}
          <h1 className="font-heading font-black text-[25px] xs:text-[31px] sm:text-[42px] md:text-[54px] lg:text-[3.2rem] xl:text-[3.8rem] 2xl:text-[4.4rem] text-white tracking-tight uppercase leading-[1.08] mb-6 max-w-5xl">
            Hospitality Digital Marketing <br className="hidden sm:block"/>
            <span className="text-brand-accent font-bold-important text-[0.82em] sm:text-[0.88em] block mt-1.5 leading-[1.05]">
              For Hotels, Resorts, <br className="block sm:hidden"/> Homestays & Villas
            </span>
          </h1>
        </motion.div>

        {/* Golden Horizontal Glowing Divider */}
        <div className="relative w-48 sm:w-64 h-[1px] bg-gradient-to-r from-transparent via-[#c87f4c] to-transparent mx-auto mb-6 shrink-0">
          <div className="absolute inset-0 bg-[#c87f4c] blur-[3px] opacity-80"></div>
        </div>

        {/* Centered Grey Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-sm xs:text-base sm:text-lg md:text-xl text-white/80 mb-10 max-w-2xl font-normal leading-relaxed tracking-wide"
        >
          More visibility. More enquiries. Better growth.
        </motion.p>

        {/* CTA Buttons - Stacked on Mobile, Row on Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4.5 w-full sm:w-auto items-center justify-center"
        >
          {/* Talk on WhatsApp */}
          <a
            href="https://wa.me/919986389444"
            onClick={trackWhatsAppClick}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 border border-[#c87f4c]/50 hover:border-[#c87f4c] bg-[#0a0e0b]/55 hover:bg-[#0a0e0b]/75 text-white font-heading text-xs sm:text-sm font-bold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-[#c87f4c]/10 tracking-wider uppercase w-full sm:w-auto shrink-0 cursor-pointer"
          >
            <FaWhatsapp className="w-5 h-5 text-[#25d366]" />
            <span>Talk on WhatsApp</span>
          </a>

          {/* Request a Call Back */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-3 border border-[#c87f4c]/50 hover:border-[#c87f4c] bg-[#0a0e0b]/55 hover:bg-[#0a0e0b]/75 text-white font-heading text-xs sm:text-sm font-bold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-[#c87f4c]/10 tracking-wider uppercase w-full sm:w-auto shrink-0 cursor-pointer"
          >
            <Phone className="w-4 h-4 text-[#c87f4c] stroke-[2.5]" />
            <span>Request a Call Back</span>
          </button>
        </motion.div>

        {/* Desktop-Only Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full max-w-3xl mt-12 bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-5 flex flex-col sm:flex-row justify-around items-center gap-6 shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-t-white/[0.07]"
        >
          {stats.map((stat, idx) => {
            const IconComp = stat.icon;
            return (
              <React.Fragment key={idx}>
                {idx > 0 && <div className="hidden sm:block w-[1px] h-8 bg-white/10"></div>}
                <div className="flex items-center gap-3">
                  <IconComp className="w-5 h-5 text-[#c87f4c] stroke-[2]" />
                  <span className="font-heading text-sm sm:text-base font-semibold tracking-wide text-white select-none">{stat.label}</span>
                </div>
              </React.Fragment>
            );
          })}
        </motion.div>

      </div>

      {/* Spacer */}
      <div className="relative z-10 w-full h-8 lg:h-2"></div>

      {/* Sleek Callback Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-[#c87f4c]/20 p-8 md:p-9 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] relative overflow-hidden w-full max-w-md"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-[#0a0e0b] w-8 h-8 rounded-full border border-slate-200 hover:border-slate-400 flex items-center justify-center transition-all duration-300 active:scale-90 cursor-pointer"
              >
                &times;
              </button>

              {/* Top copper highlight border */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-accent/30 via-brand-accent to-brand-accent/30"></div>
              
              <h3 className="font-heading text-[22px] sm:text-[26px] font-bold text-[#0a0e0b] mb-6 leading-none mt-2">
                Request <span className="text-brand-accent font-bold-important">Call Back</span>
              </h3>

              <AnimatePresence mode="wait">
                {status.success ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center text-center py-6"
                  >
                    <CheckCircle className="w-14 h-14 text-brand-accent mb-6 animate-pulse" />
                    <h4 className="font-heading text-xl sm:text-2xl font-bold text-[#0a0e0b] mb-2 whitespace-nowrap">Review Requested!</h4>
                    <p className="font-body text-sm text-slate-500 max-w-xs mb-8 font-normal">
                      Thank you! Our growth desk is reviewing your online presence and will call you back shortly.
                    </p>
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
                        className="w-full bg-[#f8fafc] border border-slate-200 focus:border-brand-accent text-[#0a0e0b] px-5 py-4 rounded-xl font-body text-sm transition-colors duration-300 outline-none placeholder:text-slate-400 disabled:opacity-50 font-normal"
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
                        className="w-full bg-[#f8fafc] border border-slate-200 focus:border-brand-accent text-[#0a0e0b] px-5 py-4 rounded-xl font-body text-sm transition-colors duration-300 outline-none placeholder:text-slate-400 disabled:opacity-50 font-normal"
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
                        className="w-full bg-[#f8fafc] border border-slate-200 focus:border-brand-accent text-[#0a0e0b] px-5 py-4 rounded-xl font-body text-sm transition-colors duration-300 outline-none placeholder:text-slate-400 appearance-none disabled:opacity-50 cursor-pointer font-normal"
                      >
                        <option value="" disabled className="text-slate-400">Select Property Type</option>
                        {propertyTypes.map((type, index) => (
                          <option key={index} value={type} className="bg-white text-[#0a0e0b] font-normal">{type}</option>
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
                      className="w-full bg-brand-accent text-white font-body font-bold text-sm uppercase py-4.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#b06a3a] transition-all duration-300 cursor-pointer disabled:opacity-50 tracking-[0.05em] shadow-md hover:shadow-lg"
                    >
                      {status.loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span className="font-bold-important text-white text-sm uppercase">Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span className="font-bold-important text-white text-sm uppercase">Submit</span>
                          <span className="font-bold-important text-white">→</span>
                        </>
                      )}
                    </button>
                    
                    <p className="text-center font-body text-[10px] text-slate-400 mt-4 font-normal tracking-wide">
                      We respect your privacy. No spam, ever.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
