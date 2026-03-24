import ContactForm from "@/components/contact/ContactForm";
import WebPageSchema from "@/components/seo/WebPageSchema";
import { PhoneCall, Mail, MapPin, Building2, Clock, Globe2 } from "lucide-react";
import { FaWhatsapp, FaLinkedinIn, FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

export const metadata = {
  title: "Contact Us | Clever Crow Strategies",
  description:
    "Get in touch with Clever Crow Strategies LLP. Reach out for digital marketing, growth engineering, and AI-driven solutions.",
};

export default function ContactPage() {
  const contactMethods = [
    {
      icon: PhoneCall,
      title: "Call Us",
      value: "+91 99863 89444",
      href: "tel:+919986389444",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      value: "Chat With Experts",
      href: "https://wa.me/919986389444",
      color: "text-[#128C7E]",
      bg: "bg-[#128C7E]/5",
      border: "border-[#128C7E]/10",
    },
    {
      icon: Mail,
      title: "Email Us",
      value: "hello@clevercrow.in",
      href: "mailto:hello@clevercrow.in",
      color: "text-fuchsia-600",
      bg: "bg-fuchsia-50",
      border: "border-fuchsia-100",
    },
  ];

  const socialLinks = [
    { icon: FaLinkedinIn, href: "#", color: "hover:bg-[#0077B5]" },
    { icon: FaInstagram, href: "#", color: "hover:bg-[#E4405F]" },
    { icon: FaFacebookF, href: "#", color: "hover:bg-[#1877F2]" },
    { icon: FaTwitter, href: "#", color: "hover:bg-[#1DA1F2]" },
  ];

  return (
    <main className="bg-white selection:bg-yellow-500/30 min-h-screen">
      {/* ================= HERO & INFO SPLIT ================= */}
      <section className="relative pt-32 lg:pt-48 pb-20 overflow-hidden">
        {/* Subtle Ambient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.05),transparent_40%)] pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.03),transparent_50%)] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-center">
            
            {/* LEFT: TEXT & INFO */}
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 mb-8 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Ready to scale
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-[62px] font-black text-gray-950 tracking-tight mb-8 leading-[1.05]">
                Let's Build Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600">
                  Growth Engine
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 max-w-xl font-medium leading-relaxed mb-12 opacity-80">
                Stop guessing with your marketing. Reach out to our team of growth engineers and engineer a predictable revenue system for your business.
              </p>

              {/* Direct Connect Cards */}
              <div className="grid sm:grid-cols-3 lg:grid-cols-3 gap-4 mb-12">
                {contactMethods.map((method, idx) => (
                  <a
                    key={idx}
                    href={method.href}
                    target={method.icon === FaWhatsapp ? "_blank" : undefined}
                    className="group flex flex-col items-center text-center p-6 rounded-3xl bg-gray-50 border border-gray-100 transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${method.bg} text-black transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg`}>
                      <method.icon className="h-6 w-6" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-black/60 mb-1">{method.title}</span>
                    <span className="text-xs font-bold text-black group-hover:text-black transition-colors uppercase truncate w-full px-1">{method.value}</span>
                  </a>
                ))}
              </div>

              {/* Social Connect */}
              <div className="flex items-center gap-6">
                 <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Follow Us</span>
                 <div className="flex gap-3">
                   {socialLinks.map((social, i) => (
                     <a 
                       key={i} 
                       href={social.href} 
                       className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-400 border border-gray-100 transition-all duration-300 ${social.color} hover:text-white hover:shadow-lg hover:-translate-y-1`}
                     >
                       <social.icon className="h-4 w-4" />
                     </a>
                   ))}
                 </div>
              </div>
            </div>

            {/* RIGHT: FORM */}
            <div className="relative">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* ================= HQ & MAP SECTION ================= */}
      <section className="relative px-6 pb-32">
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
              <div className="flex-1 rounded-[3rem] bg-indigo-600 p-10 sm:p-12 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl mb-8">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  
                  <h2 className="text-3xl font-black tracking-tight mb-8">Global Headquarters</h2>
                  
                  <div className="space-y-8">
                    <div className="flex gap-5">
                      <MapPin className="h-6 w-6 text-indigo-200 shrink-0 mt-1" />
                      <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-indigo-200 mb-2">Office Address</h4>
                        <p className="text-lg font-bold leading-relaxed">
                          2nd Floor, Udupi–Manipal Highway<br />
                          Kunjibettu, Udupi, Karnataka<br />
                          Pin: 576102, India
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-5">
                      <Clock className="h-6 w-6 text-indigo-200 shrink-0 mt-1" />
                      <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-indigo-200 mb-2">Working Hours</h4>
                        <p className="text-lg font-bold">
                          Mon - Sat: 9:30 AM - 6:30 PM (IST)<br />
                          Sun: Closed
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-5 pt-4">
                      <Globe2 className="h-6 w-6 text-indigo-200 shrink-0 mt-1" />
                      <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-indigo-200 mb-2">Timezone</h4>
                        <p className="text-lg font-bold text-white">Asia/Kolkata (GMT +5:30)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Support Card */}
              <div className="rounded-[2.5rem] bg-gray-900 p-8 text-white flex items-center justify-between group cursor-pointer hover:bg-gray-800 transition-colors">
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-1">Need Urgent Help?</h4>
                  <p className="text-xl font-bold">hello@clevercrow.in</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-all">
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

function ArrowRight(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}
