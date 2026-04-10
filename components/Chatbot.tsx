"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { X, Send, Sparkles, MessageCircleMore } from "lucide-react";
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

// Premium Fully 3D Animated Bot Component with Speech, Smile, and Lighting Engine
const AnimatedBot = ({ isSpeaking, className }: { isSpeaking: boolean, className?: string }) => (
  <svg viewBox="0 0 50 50" fill="none" overflow="visible" xmlns="http://www.w3.org/2000/svg" className={`drop-shadow-[0_4px_16px_rgba(251,191,36,0.5)] ${className || "w-10 h-10"}`}>
    <defs>
      {/* Gunmetal 3D Metallic Effect */}
      <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#52525b" />
        <stop offset="50%" stopColor="#27272a" />
        <stop offset="100%" stopColor="#09090b" />
      </linearGradient>
      {/* 24K Gold 3D Metallic Shading */}
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fde047" />
        <stop offset="50%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#b45309" />
      </linearGradient>
      {/* Depth Shadow Filter */}
      <filter id="meshShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.8"/>
      </filter>
    </defs>
    
    {/* Left Arm (Static, resting in shadow) */}
    <path d="M 15 36 L 7 46 L 11 48 L 17 40 Z" fill="url(#bodyGrad)" stroke="url(#goldGrad)" strokeWidth="1.5" strokeLinejoin="round" filter="url(#meshShadow)" />

    {/* Right Arm (Waving Animation every 3 seconds) */}
    <g>
      <animateTransform 
         attributeName="transform" 
         type="rotate" 
         values="0 35 36; -130 35 36; -70 35 36; -130 35 36; -70 35 36; 0 35 36; 0 35 36" 
         keyTimes="0; 0.1; 0.15; 0.2; 0.25; 0.35; 1"
         dur="3s" 
         repeatCount="indefinite" 
      />
      <path d="M 35 36 L 43 46 L 39 48 L 33 40 Z" fill="url(#bodyGrad)" stroke="url(#goldGrad)" strokeWidth="1.5" strokeLinejoin="round" filter="url(#meshShadow)" />
    </g>

    {/* Body Base Casing */}
    <rect x="15" y="34" width="20" height="15" rx="5" fill="url(#bodyGrad)" stroke="url(#goldGrad)" strokeWidth="1.5" filter="url(#meshShadow)" />
    
    {/* Neck Joint Assembly */}
    <rect x="22" y="32" width="6" height="3" fill="url(#goldGrad)" filter="url(#meshShadow)" />

    {/* Main Head Structure */}
    <rect x="14" y="15" width="22" height="17" rx="6" fill="url(#bodyGrad)" stroke="url(#goldGrad)" strokeWidth="1.5" filter="url(#meshShadow)" />

    {/* Laser Antenna Unit */}
    <rect x="23" y="12" width="4" height="3" fill="url(#goldGrad)" />
    <line x1="25" y1="12" x2="25" y2="6" stroke="url(#goldGrad)" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="25" cy="5" r="2.5" fill="#ef4444">
      <animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" />
    </circle>

    {/* Integrated Black Glass Visor */}
    <rect x="17" y="17" width="16" height="13" rx="3" fill="#000000" />

    {/* Holographic Glowing Eyes Inside Visor */}
    <circle cx="21" cy="21" r="2.5" fill="#fbbf24">
      <animate attributeName="opacity" values="1;0.4;1" dur="4s" repeatCount="indefinite" />
      <animate attributeName="cy" values="21;20;21" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="29" cy="21" r="2.5" fill="#fbbf24">
      <animate attributeName="opacity" values="1;0.4;1" dur="4s" repeatCount="indefinite" />
      <animate attributeName="cy" values="21;20;21" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* 3D Organic Smiling Mouth Interface */}
    <path d="M 22 26 Q 25 29 28 26" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round">
      {isSpeaking ? (
        <animate attributeName="d" values="M 22 26 Q 25 30 28 26; M 21 27 Q 25 32 29 27; M 22 26 Q 25 30 28 26" dur="0.4s" repeatCount="indefinite" />
      ) : (
        <animate attributeName="d" values="M 22 26 Q 25 28.5 28 26; M 22 26.5 Q 25 29.5 28 26.5; M 22 26 Q 25 28.5 28 26" dur="3s" repeatCount="indefinite" />
      )}
    </path>

    {/* Full 3D Speech Bubble ("Hi!") */}
    {!isSpeaking && (
      <g opacity="0">
        <animate attributeName="opacity" values="0; 1; 1; 0; 0" keyTimes="0; 0.1; 0.3; 0.4; 1" dur="3s" repeatCount="indefinite" />
        <animateTransform attributeName="transform" type="translate" values="0 5; 0 0; 0 0; 0 5; 0 5" keyTimes="0; 0.1; 0.3; 0.4; 1" dur="3s" repeatCount="indefinite" />
        <rect x="29" y="3" width="20" height="13" rx="4" fill="url(#goldGrad)" filter="url(#meshShadow)" />
        <polygon points="33,16 37,20 37,16" fill="url(#goldGrad)" />
        <text x="39" y="11.5" fontSize="7" fontFamily="sans-serif" fontWeight="900" fill="#000" textAnchor="middle">Hi!</text>
      </g>
    )}
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
            className="fixed bottom-[80px] left-4 right-4 sm:left-auto sm:bottom-[100px] sm:right-6 z-[9999] w-auto sm:w-[320px] max-w-[calc(100vw-2rem)] h-[70dvh] sm:h-[32rem] max-h-[600px] flex flex-col rounded-3xl bg-black shadow-[0_25px_70px_rgba(0,0,0,1)] border border-zinc-800 overflow-hidden font-sans"
          >
            {/* Header - Compact */}
            <div className="p-4 flex justify-between items-center bg-zinc-950 border-b border-zinc-900">
              <div className="flex items-center gap-2">
                <AnimatedBot isSpeaking={isTyping} className="w-10 h-10" />
                <div>
                  <h3 className="font-bold text-[15px] text-white tracking-tight">Clever Crow</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></span>
                    <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest">Active</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-900 text-zinc-500 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>
            
            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-black scrollbar-hide">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} items-end gap-2`}
                >
                  <div
                    className={`px-4 py-3 text-[18px] leading-[1.3] tracking-tight font-semibold ${
                      msg.sender === "user"
                        ? "bg-yellow-500 text-black rounded-2xl rounded-tr-sm"
                        : "bg-zinc-900 text-white border border-zinc-800 rounded-2xl rounded-tl-sm"
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
                  <div className="px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tl-sm flex items-center">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }}></div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {!isTyping && messages[messages.length - 1]?.options && messages[messages.length - 1].sender === "bot" && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {messages[messages.length - 1].options?.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(opt)}
                      className="text-[13px] font-semibold bg-zinc-900 border border-zinc-800 text-white px-3.5 py-2 rounded-full hover:bg-yellow-500 hover:text-black transition-all shadow-md"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input - Compact */}
            <div className="p-3 bg-zinc-950 border-t border-zinc-900">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }} className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isTyping}
                  placeholder="Type..."
                  className="w-full pl-4 pr-12 py-3 bg-zinc-900 border border-zinc-800 rounded-full text-[16px] font-semibold focus:outline-none focus:border-yellow-500 text-white placeholder-zinc-700 transition-all"
                />
                <button type="submit" disabled={!inputValue.trim() || isTyping} className="absolute right-1.5 top-1.5 w-9 h-9 rounded-full bg-yellow-500 text-black flex items-center justify-center disabled:opacity-20 transition-transform active:scale-90">
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[10000] flex items-center justify-center w-[54px] h-[54px] sm:w-[60px] sm:h-[60px] rounded-full shadow-2xl transition-all duration-500 hover:scale-110 border-[1.5px] ${
          isOpen ? 'bg-zinc-900 border-zinc-800' : 'bg-black border-yellow-500 hover:shadow-[0_10px_40px_rgba(251,191,36,0.3)]'
        }`}
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <div className="relative flex items-center justify-center">
            <AnimatedBot isSpeaking={false} className="w-[40px] h-[40px] sm:w-[44px] sm:h-[44px]" />
            <span className="absolute top-0 right-auto -left-1 w-3 h-3 bg-red-500 rounded-full border border-black animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span>
          </div>
        )}
      </button>
    </>
  );
}



