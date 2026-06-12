"use client";

import ContactForm from "@/components/contact/ContactForm";
import WebPageSchema from "@/components/seo/WebPageSchema";
import { PhoneCall, Mail, MapPin, Building2, Clock, Globe2, ArrowRight } from "lucide-react";
import { FaWhatsapp, FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ContactPage() {
  const trackCallClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "conversion", {
        send_to: "AW-17335403082/ul0ECKr5i_QaEMqElcpA",
      });
    }
  };

  const contactMethods = [
    {
      icon: PhoneCall,
      title: "Call Us",
      value: "+91 99863 89444",
      href: "tel:+919986389444",
      color: "text-blue-600",
      bg: "bg-blue-50 border border-blue-100/50",
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      value: "Chat With Experts",
      href: "https://wa.me/919986389444",
      color: "text-emerald-600",
      bg: "bg-emerald-50 border border-emerald-100/50",
    },
    {
      icon: Mail,
      title: "Email Us",
      value: "hello@clevercrow.in",
      href: "mailto:hello@clevercrow.in",
      color: "text-purple-600",
      bg: "bg-purple-50 border border-purple-100/50",
    },
  ];

  const socialLinks = [
    { icon: FaLinkedinIn, href: "https://www.linkedin.com/company/clever-crow-strategies/", color: "hover:bg-[#0077B5] hover:text-white" },
    { icon: FaInstagram, href: "https://www.instagram.com/clevercrow.strategies", color: "hover:bg-[#E4405F] hover:text-white" },
    { icon: FaFacebookF, href: "https://www.facebook.com/people/Clever-Crow-Strategies/61579261586907/", color: "hover:bg-[#1877F2] hover:text-white" },
  ];

  return (
    <main className="bg-[#FAF9F6] selection:bg-yellow-500/30 min-h-screen font-sans">
      {/* ================= HERO & INFO SPLIT ================= */}
      <section className="relative pt-36 lg:pt-40 pb-12 overflow-hidden">
        
        {/* ───────────────── BACKGROUND DOTS & RADIAL GLOW ───────────────── */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.55]"
            style={{
              backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.05) 1.2px, transparent 1.2px)`,
              backgroundSize: "24px 24px"
            }}
          />
          {/* Modern radial flares for warm light aesthetics */}
          <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-amber-200/20 blur-[100px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-100/30 blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 z-10">
          {/* Header Text (Mobile Only) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden mb-8"
          >
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4 leading-[1.1]">
              Let's Build Your <br />
              <span className="text-amber-500 italic pb-2 inline-block">
                Growth Engine
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
              Stop guessing with your marketing. Reach out to our team of growth engineers and engineer a predictable revenue system for your business.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-start">
            
            {/* LEFT: TEXT & INFO */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col gap-8 order-2 lg:order-1"
            >
              {/* Header Text (Desktop Only) */}
              <div className="hidden lg:block">
                <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black text-slate-900 tracking-tight mb-4 leading-[1.1]">
                  Let's Build Your <br />
                  <span className="text-amber-500 italic pb-2 inline-block">
                    Growth Engine
                  </span>
                </h1>
                
                <p className="text-base sm:text-lg text-slate-600 max-w-xl font-medium leading-relaxed">
                  Stop guessing with your marketing. Reach out to our team of growth engineers and engineer a predictable revenue system for your business.
                </p>
              </div>

              {/* Direct Connect Cards */}
              <div className="grid sm:grid-cols-3 gap-4">
                {contactMethods.map((method, idx) => (
                  <a
                    key={idx}
                    href={method.href}
                    onClick={method.href.startsWith("tel:") ? trackCallClick : undefined}
                    target={method.icon === FaWhatsapp ? "_blank" : undefined}
                    className="group flex flex-col items-center text-center p-5 rounded-[2rem] border border-slate-200/60 bg-white/70 backdrop-blur-md transition-all duration-300 hover:bg-white hover:border-amber-500/40 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-2xl ${method.bg} transition-all duration-300 group-hover:scale-105`}>
                      <method.icon className={`h-5.5 w-5.5 ${method.color}`} strokeWidth={2} />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{method.title}</span>
                    <span className="text-xs font-bold text-slate-800 uppercase truncate w-full px-1">{method.value}</span>
                  </a>
                ))}
              </div>

              {/* Social Connect & Address Stack */}
              <div className="flex flex-col gap-6">
                {/* Social Connect */}
                <div className="flex items-center gap-5">
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Follow Us</span>
                   <div className="flex gap-2.5">
                     {socialLinks.map((social, i) => (
                       <a 
                         key={i} 
                         href={social.href} 
                         className={`flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 transition-all duration-300 ${social.color} hover:-translate-y-0.5 hover:shadow`}
                       >
                         <social.icon className="h-4 w-4" />
                       </a>
                     ))}
                   </div>
                </div>

                {/* HQ DETAILS CARD */}
                <div className="rounded-[2.5rem] bg-white border border-slate-200/60 p-6 sm:p-8 text-slate-800 relative overflow-hidden shadow-sm">
                  {/* Visual Ambient Flare */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0">
                        <Building2 className="h-4.5 w-4.5 text-amber-600" />
                      </div>
                      <h2 className="text-lg font-black text-slate-900 tracking-tight">Global Headquarters</h2>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <MapPin className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Office Address</h4>
                          <p className="text-sm font-bold leading-relaxed text-slate-600">
                            2nd Floor, Business Bay Centre<br />
                            Udupi–Manipal Highway, Kunjibettu<br />
                            Udupi, Karnataka, Pin: 576102, India
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Clock className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Working Hours</h4>
                          <p className="text-sm font-bold text-slate-600">
                            Mon - Sat: 9:30 AM - 6:30 PM (IST)<br />
                            Sun: Closed
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Globe2 className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Timezone</h4>
                          <p className="text-sm font-bold text-slate-600">Asia/Kolkata (GMT +5:30)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: FORM */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative order-1 lg:order-2"
            >
              <ContactForm />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= HQ & MAP SECTION ================= */}
      <section className="relative px-6 pb-20 pt-8 lg:pt-12">
        <div className="max-w-7xl mx-auto">
          {/* MAP CARD */}
          <div className="relative group rounded-[3rem] border border-slate-200/60 bg-white overflow-hidden shadow-xl h-[450px] sm:h-[500px] w-full">
             <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3882.0683301323256!2d74.75867481153196!3d13.346025606502767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcbb00641988d9%3A0x1910b2d04006bb2c!2sBusiness%20Bay%20Centre%2C%20Udupi!5e0!3m2!1sen!2sin!4v1769259024312!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[0.1] contrast-[1.05]"
            />
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 rounded-[3rem]" />
          </div>
        </div>
      </section>

      {/* ================= SCHEMA ================= */}
      <WebPageSchema
        title="Contact Clever Crow Strategies"
        description="Book a consultation with Clever Crow Strategies. Start engineering your business growth today."
        url="https://clevercrow.in/contact"
      />
    </main>
  );
}
