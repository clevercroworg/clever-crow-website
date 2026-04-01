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

// Custom Animated Bot Component
const AnimatedBot = ({ isSpeaking }: { isSpeaking: boolean }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
    <rect x="5" y="10" width="30" height="25" rx="6" fill="#18181b" stroke="#fbbf24" strokeWidth="2"/>
    <circle cx="13" cy="20" r="2.5" fill="#fbbf24">
      <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="27" cy="20" r="2.5" fill="#fbbf24">
      <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
    </circle>
    {/* Animated Mouth */}
    <rect x="15" y="28" width="10" height="2" rx="1" fill="#fbbf24">
      {isSpeaking && (
        <animate 
          attributeName="height" 
          values="2;6;2" 
          dur="0.4s" 
          repeatCount="indefinite" 
        />
      )}
      {isSpeaking && (
        <animate 
          attributeName="y" 
          values="28;26;28" 
          dur="0.4s" 
          repeatCount="indefinite" 
        />
      )}
    </rect>
    <path d="M15 5L25 5L20 10L15 5Z" fill="#fbbf24" />
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

  // Hide chatbot on all internship-related pages and specific landing pages
  if (pathname.startsWith("/internship") || pathname.startsWith("/landing-page/google-ads")) return null;

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
                <AnimatedBot isSpeaking={isTyping} />
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
        className={`fixed bottom-6 right-6 z-[10000] hidden sm:flex items-center justify-center w-[60px] h-[60px] rounded-full shadow-2xl transition-all duration-500 hover:scale-110 border-2 ${
          isOpen ? 'bg-zinc-900 border-zinc-800' : 'bg-black border-yellow-500'
        }`}
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <div className="relative">
            <MessageCircleMore size={30} className="text-yellow-500" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-black animate-pulse"></span>
          </div>
        )}
      </button>
    </>
  );
}



