"use client";

import ContactForm from "@/components/contact/ContactForm";
import WebPageSchema from "@/components/seo/WebPageSchema";
import { PhoneCall, Mail, MapPin, Building2, Clock, Globe2, Sparkles, ArrowRight } from "lucide-react";
import { FaWhatsapp, FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ContactPage() {
  const contactMethods = [
    {
      icon: PhoneCall,
      title: "Call Us",
      value: "+91 99863 89444",
      href: "tel:+919986389444",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      value: "Chat With Experts",
      href: "https://wa.me/919986389444",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    {
      icon: Mail,
      title: "Email Us",
      value: "hello@clevercrow.in",
      href: "mailto:hello@clevercrow.in",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
    },
  ];

  const socialLinks = [
    { icon: FaLinkedinIn, href: "https://www.linkedin.com/company/clever-crow-strategies/", color: "hover:bg-[#0077B5]" },
    { icon: FaInstagram, href: "https://www.instagram.com/clevercrow.strategies", color: "hover:bg-[#E4405F]" },
    { icon: FaFacebookF, href: "https://www.facebook.com/people/Clever-Crow-Strategies/61579261586907/", color: "hover:bg-[#1877F2]" },
  ];

  return (
    <main className="bg-white selection:bg-yellow-500/30 min-h-screen">
      {/* ================= HERO & INFO SPLIT ================= */}
      <section className="relative pt-36 lg:pt-48 pb-24 overflow-hidden">
        
        {/* ───────────────── BACKGROUND (Same as Homepage) ───────────────── */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 10% 20%, rgba(82, 168, 255, 0.12), transparent 25%),
                radial-gradient(circle at 90% 80%, rgba(122, 63, 194, 0.1), transparent 25%),
                radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02), transparent 30%),
                linear-gradient(180deg, #0f172a 0%, #111827 44%, #020617 100%)
              `
            }}
          />
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle at left center, rgba(255, 255, 255, 0.04) 1.5px, transparent 2px),
                radial-gradient(circle at right center, rgba(255, 255, 255, 0.04) 1.5px, transparent 2px),
                radial-gradient(circle at center, rgba(255, 255, 255, 0.01) 0.8px, transparent 1.2px)
              `,
              backgroundSize: "26px 26px, 26px 26px, 18px 18px"
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-center">
            
            {/* LEFT: TEXT & INFO */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100/60">
                  Engineering Scaling Systems
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-black text-white tracking-tight mb-8 leading-[1.05]">
                Let's Build Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 italic pb-2 inline-block">
                  Growth Engine
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-400 max-w-xl font-medium leading-relaxed mb-12 opacity-90">
                Stop guessing with your marketing. Reach out to our team of growth engineers and engineer a predictable revenue system for your business.
              </p>

              {/* Direct Connect Cards */}
              <div className="grid sm:grid-cols-3 lg:grid-cols-3 gap-4 mb-12">
                {contactMethods.map((method, idx) => (
                  <a
                    key={idx}
                    href={method.href}
                    target={method.icon === FaWhatsapp ? "_blank" : undefined}
                    className="group flex flex-col items-center text-center p-6 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:bg-white/10 hover:-translate-y-1 hover:shadow-2xl"
                  >
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${method.bg} text-white transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg`}>
                      <method.icon className={`h-6 w-6 ${method.color}`} />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">{method.title}</span>
                    <span className="text-xs font-bold text-white uppercase truncate w-full px-1">{method.value}</span>
                  </a>
                ))}
              </div>

              {/* Social Connect */}
              <div className="flex items-center gap-6">
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Follow Us</span>
                 <div className="flex gap-3">
                   {socialLinks.map((social, i) => (
                     <a 
                       key={i} 
                       href={social.href} 
                       className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-400 border border-white/10 transition-all duration-300 ${social.color} hover:text-white hover:shadow-lg hover:-translate-y-1 hover:bg-white/10`}
                     >
                       <social.icon className="h-4 w-4" />
                     </a>
                   ))}
                 </div>
              </div>
            </motion.div>

            {/* RIGHT: FORM */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <ContactForm />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= HQ & MAP SECTION ================= */}
      <section className="relative px-6 pt-24 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-stretch">
            
            {/* MAP CARD */}
            <div className="relative group rounded-[3rem] border border-gray-100 bg-gray-50 overflow-hidden shadow-2xl h-[500px] lg:h-full min-h-[500px]">
               <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3882.0683301323256!2d74.75867481153196!3d13.346025606502767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcbb00641988d9%3A0x1910b2d04006bb2c!2sBusiness%20Bay%20Centre%2C%20Udupi!5e0!3m2!1sen!2sin!4v1769259024312!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[0.2] contrast-[1.1] brightness-[1.05]"
              />
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 rounded-[3rem]" />
            </div>

            {/* HQ DETAILS CARD */}
            <div className="flex flex-col gap-6">
              <div className="flex-1 rounded-[3rem] bg-slate-900 p-10 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-white/5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-500/10 backdrop-blur-xl mb-8 border border-yellow-500/20">
                    <Building2 className="h-6 w-6 text-yellow-500" />
                  </div>
                  
                  <h2 className="text-3xl font-black tracking-tight mb-8">Global Headquarters</h2>
                  
                  <div className="space-y-8">
                    <div className="flex gap-5">
                      <MapPin className="h-6 w-6 text-slate-500 shrink-0 mt-1" />
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Office Address</h4>
                        <p className="text-lg font-bold leading-relaxed text-slate-200">
                          2nd Floor, Udupi–Manipal Highway<br />
                          Kunjibettu, Udupi, Karnataka<br />
                          Pin: 576102, India
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-5">
                      <Clock className="h-6 w-6 text-slate-500 shrink-0 mt-1" />
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Working Hours</h4>
                        <p className="text-lg font-bold text-slate-200">
                          Mon - Sat: 9:30 AM - 6:30 PM (IST)<br />
                          Sun: Closed
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-5 pt-4">
                      <Globe2 className="h-6 w-6 text-slate-500 shrink-0 mt-1" />
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Timezone</h4>
                        <p className="text-lg font-bold text-white">Asia/Kolkata (GMT +5:30)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Support Card */}
              <div className="rounded-[2.5rem] bg-gray-900 p-8 text-white flex items-center justify-between group cursor-pointer hover:bg-gray-800 transition-colors border border-white/5">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Need Urgent Help?</h4>
                  <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">hello@clevercrow.in</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-black transition-all">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </div>

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
