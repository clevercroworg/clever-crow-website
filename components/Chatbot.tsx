"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { X, Send } from "lucide-react";
import { services } from "@/data/services";
import { motion, AnimatePresence } from "framer-motion";
import { submitLead } from "@/components/lib/submitLead";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
  options?: string[];
  isTyping?: boolean;
};

type ChatMode = "chat" | "lead_gen";
type LeadStep = "name" | "email" | "phone" | "message" | "done";

// Custom Premium 3D-Styled Full-Body Robot Model (waving and bobbing)
const AnimatedBot = ({ isSpeaking, className }: { isSpeaking: boolean, className?: string }) => (
  <svg 
    viewBox="0 0 100 130" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={`overflow-visible ${className || "w-10 h-10"}`}
  >
    <defs>
      {/* 3D Sphere Radial Gradient - Polished Silver-White Metal */}
      <radialGradient id="whiteGloss" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="35%" stopColor="#f8fafc" />
        <stop offset="75%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#94a3b8" />
      </radialGradient>

      {/* Chrome Metallic joints */}
      <linearGradient id="silverMetal" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e2e8f0" />
        <stop offset="50%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>

      {/* Blue LED Accent Gradients */}
      <linearGradient id="blueAccent" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>

      {/* Visor Glass Screen */}
      <radialGradient id="visorGlass" cx="30%" cy="20%" r="80%">
        <stop offset="0%" stopColor="#0f172a" />
        <stop offset="75%" stopColor="#020617" />
        <stop offset="100%" stopColor="#000000" />
      </radialGradient>

      {/* Visor Glass Reflection */}
      <linearGradient id="glassReflect" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
        <stop offset="60%" stopColor="rgba(255, 255, 255, 0.05)" />
        <stop offset="100%" stopColor="transparent" />
      </linearGradient>

      {/* Blue Neon Glow Filter */}
      <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Drop Shadow for Depth */}
      <filter id="botShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#64748b" floodOpacity="0.2" />
      </filter>
    </defs>

    <style>{`
      @keyframes botFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
      }
      @keyframes botWave {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(-22deg); }
      }
      @keyframes botBlink {
        0%, 96%, 100% { transform: scaleY(1); }
        98% { transform: scaleY(0.1); }
      }
      @keyframes botBreathe {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
      }
      .bot-float-group {
        animation: botFloat 4s ease-in-out infinite;
        transform-origin: center;
      }
      .bot-waving-arm {
        animation: botWave 2.5s ease-in-out infinite;
        transform-origin: 32px 64px;
      }
      .bot-eye-l {
        animation: botBlink 4.5s ease-in-out infinite;
        transform-origin: 43px 39px;
      }
      .bot-eye-r {
        animation: botBlink 4.5s ease-in-out infinite;
        transform-origin: 57px 39px;
      }
      .bot-body-group {
        animation: botBreathe 3s ease-in-out infinite;
        transform-origin: 50px 76px;
      }
    `}</style>

    {/* Entire Floating Bot assembly */}
    <g className="bot-float-group" filter="url(#botShadow)">
      
      {/* 1. Hips / Leg Connectors */}
      <circle cx="42" cy="88" r="3.5" fill="url(#silverMetal)" />
      <circle cx="58" cy="88" r="3.5" fill="url(#silverMetal)" />

      {/* 2. Legs & Feet */}
      {/* Left Leg */}
      <path d="M 42 88 L 41 100" stroke="url(#whiteGloss)" strokeWidth="6" strokeLinecap="round" />
      <circle cx="41" cy="100" r="2.5" fill="url(#silverMetal)" />
      <path d="M 41 100 L 41 114" stroke="url(#whiteGloss)" strokeWidth="5.5" strokeLinecap="round" />
      <ellipse cx="41" cy="116" rx="5" ry="2.5" fill="url(#whiteGloss)" />
      
      {/* Right Leg */}
      <path d="M 58 88 L 59 100" stroke="url(#whiteGloss)" strokeWidth="6" strokeLinecap="round" />
      <circle cx="59" cy="100" r="2.5" fill="url(#silverMetal)" />
      <path d="M 59 100 L 59 114" stroke="url(#whiteGloss)" strokeWidth="5.5" strokeLinecap="round" />
      <ellipse cx="59" cy="116" rx="5" ry="2.5" fill="url(#whiteGloss)" />

      {/* 3. Torso (Breathes gently) */}
      <g className="bot-body-group">
        <rect x="34" y="58" width="32" height="30" rx="12" fill="url(#whiteGloss)" stroke="#e2e8f0" strokeWidth="0.5" />
        
        {/* Chest Plate Cover */}
        <path d="M 38 64 L 62 64 C 62 64 61 80 50 82 C 39 80 38 64 38 64 Z" fill="url(#whiteGloss)" stroke="#e2e8f0" strokeWidth="0.75" />
        
        {/* Glowing Accent Lines */}
        <path d="M 38 68 C 42 76 58 76 62 68" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.8" filter="url(#neonGlow)" />
        
        {/* "AI" Glowing Chest Badge */}
        <rect x="43" y="66" width="14" height="8" rx="4" fill="url(#blueAccent)" />
        <text x="50" y="72" fontSize="5" fontWeight="900" fontFamily="sans-serif" fill="#ffffff" textAnchor="middle">AI</text>
      </g>

      {/* 4. Left Arm (Relaxed) */}
      <g>
        {/* Upper Arm */}
        <path d="M 68 64 L 78 74" stroke="url(#whiteGloss)" strokeWidth="6" strokeLinecap="round" />
        {/* Elbow Joint */}
        <circle cx="78" cy="74" r="2.5" fill="url(#silverMetal)" />
        {/* Forearm */}
        <path d="M 78 74 L 84 88" stroke="url(#whiteGloss)" strokeWidth="5" strokeLinecap="round" />
        {/* Hand */}
        <circle cx="84" cy="88" r="4" fill="url(#whiteGloss)" />
        {/* Fingers */}
        <circle cx="82" cy="92" r="1.2" fill="url(#whiteGloss)" />
        <circle cx="85" cy="93" r="1.2" fill="url(#whiteGloss)" />
        <circle cx="87" cy="91" r="1.2" fill="url(#whiteGloss)" />
      </g>

      {/* 5. Right Arm (Waving animation) */}
      <g className="bot-waving-arm">
        {/* Upper Arm */}
        <path d="M 32 64 L 20 54" stroke="url(#whiteGloss)" strokeWidth="6" strokeLinecap="round" />
        {/* Elbow Joint */}
        <circle cx="20" cy="54" r="2.5" fill="url(#silverMetal)" />
        {/* Forearm */}
        <path d="M 20 54 L 14 38" stroke="url(#whiteGloss)" strokeWidth="5" strokeLinecap="round" />
        {/* Hand */}
        <circle cx="14" cy="38" r="4" fill="url(#whiteGloss)" />
        {/* Fingers */}
        <circle cx="11" cy="34" r="1.2" fill="url(#whiteGloss)" />
        <circle cx="14" cy="32" r="1.2" fill="url(#whiteGloss)" />
        <circle cx="17" cy="34" r="1.2" fill="url(#whiteGloss)" />
      </g>

      {/* 6. Neck Joint */}
      <rect x="46" y="52" width="8" height="6" rx="2" fill="url(#silverMetal)" />

      {/* 7. Robot Head Capsule */}
      <rect x="28" y="22" width="44" height="34" rx="17" fill="url(#whiteGloss)" stroke="#e2e8f0" strokeWidth="0.5" />

      {/* Antennas (Ears) */}
      {/* Left Ear */}
      <circle cx="28" cy="39" r="4" fill="url(#silverMetal)" />
      <line x1="26" y1="39" x2="21" y2="27" stroke="url(#silverMetal)" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="21" cy="27" r="1.8" fill="#22d3ee" filter="url(#neonGlow)" />
      
      {/* Right Ear */}
      <circle cx="72" cy="39" r="4" fill="url(#silverMetal)" />
      <line x1="74" y1="39" x2="79" y2="27" stroke="url(#silverMetal)" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="79" cy="27" r="1.8" fill="#22d3ee" filter="url(#neonGlow)" />

      {/* 8. Visor Screen */}
      <rect x="34" y="27" width="32" height="20" rx="9" fill="url(#visorGlass)" />

      {/* 9. Visor Glass Shiny Highlight */}
      <rect x="35" y="28" width="30" height="9" rx="4.5" fill="url(#glassReflect)" pointerEvents="none" />

      {/* 10. Glowing Smile-Eyes Inside Visor */}
      {/* Left Eye (Smile shape) */}
      <path 
        d="M 40 37 Q 43 34 46 37" 
        fill="none" 
        stroke="#22d3ee" 
        strokeWidth="2.2" 
        strokeLinecap="round" 
        className="bot-eye-l"
        filter="url(#neonGlow)" 
      />
      
      {/* Right Eye (Smile shape) */}
      <path 
        d="M 54 37 Q 57 34 60 37" 
        fill="none" 
        stroke="#22d3ee" 
        strokeWidth="2.2" 
        strokeLinecap="round" 
        className="bot-eye-r"
        filter="url(#neonGlow)" 
      />

      {/* 11. Smiling Mouth */}
      {isSpeaking ? (
        // Animated Mouth wave
        <path 
          d="M 45 42 Q 50 46 55 42" 
          fill="none" 
          stroke="#22d3ee" 
          strokeWidth="1.8" 
          strokeLinecap="round"
          filter="url(#neonGlow)"
        >
          <animate attributeName="d" values="M 45 42 Q 50 46 55 42; M 45 44 Q 50 41 55 44; M 45 42 Q 50 46 55 42" dur="0.5s" repeatCount="indefinite" />
        </path>
      ) : (
        // Standard Smile
        <path 
          d="M 46 42 Q 50 45 54 42" 
          fill="none" 
          stroke="#22d3ee" 
          strokeWidth="1.8" 
          strokeLinecap="round"
          filter="url(#neonGlow)"
        />
      )}

    </g>
  </svg>
);

export default function Chatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ChatMode>("chat");
  const [currentStep, setCurrentStep] = useState<LeadStep>("name");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hi! I'm the Clever Crow AI.\n\nAsk me about Web Development, Marketing, or Branding.",
      options: ["Web Dev", "Marketing", "Branding", "Connect"],
    },
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("toggle-chat", handleToggle);
    window.addEventListener("open-chat", handleOpen);
    return () => {
      window.removeEventListener("toggle-chat", handleToggle);
      window.removeEventListener("open-chat", handleOpen);
    };
  }, []);

  // Hide chatbot on all internship and landing pages
  if (pathname.startsWith("/internship") || pathname.startsWith("/landing-page") || pathname.startsWith("/lp")) return null;

  const addMessage = (message: Omit<Message, "id">) => {
    setMessages((prev) => [
      ...prev,
      { ...message, id: Date.now().toString() + Math.random().toString() },
    ]);
  };

  const validateName = (name: string) => name.trim().length >= 2;
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return phoneRegex.test(phone.trim());
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    addMessage({ sender: "user", text });
    setInputValue("");
    setIsTyping(true);
    setTimeout(() => processInput(text), 1500 + Math.random() * 1000); 
  };

  const generateAIResponse = (text: string) => {
    const lowerText = text.toLowerCase();
    
    // Greetings
    if (/^(hi|hello|hey)\b/.test(lowerText)) {
      addMessage({
        sender: "bot",
        text: "Hello! How can I help you today?",
        options: ["Web Dev", "Marketing", "Branding", "Connect"],
      });
      return;
    }

    // Contact & Address Info
    if (lowerText.includes("address") || lowerText.includes("location") || lowerText.includes("office") || lowerText.includes("where")) {
      addMessage({
        sender: "bot",
        text: "Our Global HQ is located at:\n\n**Business Bay, 2nd Floor, Udupi–Manipal Highway, Kunjibettu, KA, India.**\n\nWould you like to visit us or schedule a call?",
        options: ["Schedule Call", "Main Menu"],
      });
      return;
    }

    if (lowerText.includes("contact") || lowerText.includes("phone") || lowerText.includes("email") || lowerText.includes("number")) {
      addMessage({
        sender: "bot",
        text: "You can reach us at:\n\n📞 **+91 99863 89444**\n📧 **hello@clevercrow.in**\n\nOr I can collect your details and have our team call you?",
        options: ["Connect Now", "Main Menu"],
      });
      return;
    }

    // Lead Gen Triggers
    if (lowerText.includes("connect") || lowerText.includes("schedule") || lowerText === "yes, connect" || lowerText === "connect now" || lowerText === "schedule call") {
      setMode("lead_gen");
      setCurrentStep("name");
      addMessage({ sender: "bot", text: "Great! Let's get some details. What's your name?" });
      return;
    }

    // Reset / Main Menu
    if (lowerText.includes("main menu") || lowerText.includes("other services") || lowerText.includes("start over")) {
      addMessage({
        sender: "bot",
        text: "I'm here to help with Web, Marketing, and Branding. What would you like to explore?",
        options: ["Web Dev", "Marketing", "Branding", "Connect"],
      });
      return;
    }

    // --- CHECK FOR SPECIFIC SERVICES FIRST ---
    const matchedService = Object.values(services).find(s => 
      lowerText.includes(s.title.toLowerCase()) || 
      lowerText.includes(s.slug.replace("-", " ")) ||
      (s.title.toLowerCase() === "logo design" && lowerText === "logo design")
    );

    if (matchedService) {
      setSelectedServices(prev => Array.from(new Set([...prev, matchedService.title])));
      addMessage({
        sender: "bot",
        text: `${matchedService.title}: ${matchedService.heroSubtitle}\n\nShall we connect?`,
        options: ["Yes, connect", "Other services"],
      });
      return;
    }

    // --- BROAD CATEGORY CHECKS ---
    if (lowerText.includes("web") || lowerText.includes("site")) {
      setSelectedServices(prev => Array.from(new Set([...prev, "Web Development"])));
      addMessage({
        sender: "bot",
        text: "We build Business and E-commerce websites. Which do you need?",
        options: ["Business Website", "E-commerce Website", "Connect"],
      });
      return;
    }

    if (lowerText.includes("marketing") || lowerText.includes("ads") || lowerText.includes("seo")) {
      setSelectedServices(prev => Array.from(new Set([...prev, "Digital Marketing"])));
      addMessage({
        sender: "bot",
        text: "We offer Google Ads, Social Media Ads, and SEO. Interested in one?",
        options: ["Google Ads", "Social Media Ads", "SEO", "Connect"],
      });
      return;
    }

    if (lowerText.includes("branding") || lowerText.includes("logo") || lowerText.includes("design") || lowerText.includes("strategy")) {
      setSelectedServices(prev => Array.from(new Set([...prev, "Branding"])));
      addMessage({
        sender: "bot",
        text: "Our Branding includes Logo Design, Graphic Design, and Strategy & Planning. Need a refresh?",
        options: ["Logo Design", "Graphic Design", "Strategy & Planning", "Connect"],
      });
      return;
    }

    addMessage({
      sender: "bot",
      text: "I'm here to help with Web, Marketing, and Branding. What can I do for you?",
      options: ["Web Dev", "Marketing", "Branding", "Connect"],
    });
  };

  const processLeadGen = async (val: string) => {
    switch (currentStep) {
      case "name":
        if (!validateName(val)) { addMessage({ sender: "bot", text: "Please enter a valid name." }); return; }
        setUserData((prev) => ({ ...prev, name: val }));
        setCurrentStep("email");
        addMessage({ sender: "bot", text: `Hi ${val}! What is your email address?` });
        break;
      case "email":
        if (!validateEmail(val)) { addMessage({ sender: "bot", text: "Please enter a valid email." }); return; }
        setUserData((prev) => ({ ...prev, email: val }));
        setCurrentStep("phone");
        addMessage({ sender: "bot", text: "Great! And your phone number?" });
        break;
      case "phone":
        if (!validatePhone(val)) { addMessage({ sender: "bot", text: "Please enter a valid number." }); return; }
        const finalData = { ...userData, phone: val, message: selectedServices.join(", ") || "General Interest" };
        setUserData(finalData);
        setIsTyping(true);
        
        const result = await submitLead({
          name: finalData.name,
          email: finalData.email,
          phone: finalData.phone,
          message: finalData.message,
          source: "AI Chatbot"
        });

        setIsTyping(false);
        if (result.success) {
          setCurrentStep("done");
          addMessage({ 
            sender: "bot", 
            text: "Thank you! Your inquiry has been sent to our team. We will connect you shortly.",
            options: ["Start New Chat"]
          });
        } else {
          addMessage({ sender: "bot", text: "Oops, something went wrong. Could you please try again or contact us via phone?" });
        }
        break;
      case "done":
        if (val.toLowerCase().includes("new chat") || val.toLowerCase().includes("start")) {
          setMode("chat");
          setCurrentStep("name");
          setSelectedServices([]);
          setMessages([{
            id: "1",
            sender: "bot",
            text: "Hi! I'm the Clever Crow AI.\n\nAsk me about Web Development, Digital Marketing, or Branding.",
            options: ["Web Dev", "Marketing", "Branding", "Connect"],
          }]);
        } else {
          addMessage({ sender: "bot", text: "We have received your inquiry. Thank you!" });
        }
        break;
    }
  };

  const processInput = (text: string) => {
    setIsTyping(false);
    const val = text.trim();
    if (mode === "chat") generateAIResponse(val);
    else processLeadGen(val);
  };

  const handleOptionClick = (option: string) => handleSend(option);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="fixed bottom-[80px] left-4 right-4 sm:left-auto sm:bottom-[100px] sm:right-6 z-[9999] w-auto sm:w-[340px] md:w-[380px] max-w-[calc(100vw-2rem)] h-[70dvh] sm:h-[32rem] md:h-[36rem] max-h-[650px] flex flex-col rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_25px_60px_rgba(15,23,42,0.12)] overflow-hidden font-sans"
          >
            {/* Cybernetic Aura Background */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <div className="absolute top-[-10%] left-[-20%] w-[160px] h-[160px] bg-blue-400/5 rounded-full blur-[65px]" />
              <div className="absolute bottom-[-10%] right-[-20%] w-[180px] h-[180px] bg-amber-400/5 rounded-full blur-[80px]" />
            </div>

            {/* Header - Compact High Tech Glass */}
            <div className="relative p-4 flex justify-between items-center bg-slate-50/60 backdrop-blur-md border-b border-slate-200/60 z-10">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <AnimatedBot isSpeaking={isTyping} className="w-10 h-10" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-800 tracking-tight leading-none mb-1">Clever Crow AI</h3>
                  <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest leading-none">Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 border border-slate-200/40 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            
            {/* Chat Area */}
            <div className="relative flex-1 overflow-y-auto p-4 space-y-4 bg-transparent z-10 scrollbar-hide">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} items-end gap-2`}
                >
                  <div
                    className={`px-4 py-2.5 text-sm leading-relaxed font-semibold ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 rounded-2xl rounded-tr-sm shadow-sm"
                        : "bg-slate-100 border border-slate-200/80 text-slate-800 rounded-2xl rounded-tl-sm shadow-sm"
                    }`}
                    style={{ maxWidth: '88%' }}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start items-end gap-2">
                  <div className="px-4 py-3 bg-slate-100 border border-slate-200/80 rounded-2xl rounded-tl-sm flex items-center">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <div 
                          key={i} 
                          className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" 
                          style={{ animationDelay: `${i * 0.15}s` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {!isTyping && messages[messages.length - 1]?.options && messages[messages.length - 1].sender === "bot" && (
                <div className="flex flex-wrap gap-2 mt-2 z-10 relative">
                  {messages[messages.length - 1].options?.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(opt)}
                      className="text-xs font-bold bg-white border border-slate-200 hover:border-amber-500/50 hover:bg-amber-500 hover:text-zinc-950 text-slate-700 px-3.5 py-2 rounded-full transition-all duration-300 shadow-sm"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input - Compact Glass */}
            <div className="relative p-3 bg-slate-50/80 backdrop-blur-md border-t border-slate-200/60 z-10">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }} className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isTyping}
                  placeholder="Type a message..."
                  className="w-full pl-4 pr-12 py-3 bg-white border border-slate-200 rounded-full text-xs sm:text-sm font-semibold focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 text-slate-800 placeholder-slate-400 transition-all"
                />
                <button 
                  type="submit" 
                  disabled={!inputValue.trim() || isTyping} 
                  className="absolute right-1.5 top-1.5 w-9 h-9 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 flex items-center justify-center disabled:opacity-30 transition-transform active:scale-90 shadow-sm"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[10000] flex items-center justify-center transition-all duration-500 hover:scale-110 focus:outline-none ${
          isOpen 
            ? 'w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-full border bg-white border-slate-200 shadow-lg' 
            : 'w-[96px] h-[125px] sm:w-[104px] sm:h-[135px] md:w-[112px] md:h-[146px] bg-transparent border-none shadow-none'
        }`}
      >
        {isOpen ? (
          <X size={24} className="text-slate-600" />
        ) : (
          <div className="relative flex items-center justify-center w-full h-full p-0">
            <AnimatedBot isSpeaking={false} className="w-full h-full" />
            <span className="absolute top-[18%] left-[20%] -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)] z-20"></span>
          </div>
        )}
      </button>
    </>
  );
}
