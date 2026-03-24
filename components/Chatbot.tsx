"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles, MessageCircleMore } from "lucide-react";
import { services } from "@/data/services";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
  options?: string[];
  isTyping?: boolean;
};

type ChatMode = "chat" | "lead_gen";
type LeadStep = "name" | "contact" | "service" | "budget" | "other" | "done";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ChatMode>("chat");
  const [currentStep, setCurrentStep] = useState<LeadStep>("name");
  const [isTyping, setIsTyping] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hi there. I am the Clever Crow AI.\n\nYou can ask me about our services, pricing, or just type 'connect' if you'd like to get started with our team.",
      options: ["What services do you provide?", "Connect with team"],
    },
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    contact: "",
    service: "",
    budget: "",
    other: "",
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

  const addMessage = (message: Omit<Message, "id">) => {
    setMessages((prev) => [
      ...prev,
      { ...message, id: Date.now().toString() + Math.random().toString() },
    ]);
  };

  const validateName = (name: string) => name.trim().length >= 2;
  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return phoneRegex.test(phone.trim());
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    addMessage({ sender: "user", text });
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      processInput(text);
    }, 1000 + Math.random() * 800); 
  };

  const generateAIResponse = (text: string) => {
    const lowerText = text.toLowerCase();
    
    // Greetings
    if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)\b/.test(lowerText)) {
      addMessage({
        sender: "bot",
        text: "Hello! How can I help you today? You can ask me about our services, pricing, or type 'connect' to speak with a human.",
        options: ["What services do you provide?", "Connect with team"],
      });
      return;
    }

    if (lowerText.includes("how are you")) {
      addMessage({
        sender: "bot",
        text: "I'm functioning perfectly, thank you! I'm here to help you learn about Clever Crow's digital services or get your project started. How can I assist you today?",
        options: ["What services do you provide?", "Connect with team"],
      });
      return;
    }

    if (lowerText.includes("thank you") || lowerText === "thanks") {
      addMessage({
        sender: "bot",
        text: "You're very welcome! Let me know if there's anything else you need.",
        options: ["Connect with team"],
      });
      return;
    }

    if (lowerText.includes("bye") || lowerText.includes("goodbye")) {
      addMessage({
        sender: "bot",
        text: "Goodbye! Feel free to open this chat anytime if you have more questions.",
      });
      return;
    }

    if (lowerText.includes("connect") || lowerText.includes("contact") || lowerText.includes("hire") || lowerText.includes("quote") || lowerText.includes("talk")) {
      setMode("lead_gen");
      setCurrentStep("name");
      addMessage({
        sender: "bot",
        text: "Understood. Let's get a few details so our team can reach out to you properly. First, what's your name?",
      });
      return;
    }

    if (lowerText.includes("service") || lowerText.includes("provide") || lowerText.includes("what do you do") || lowerText.includes("offer")) {
      const serviceNames = Object.values(services).map(s => s.title).join(", ");
      addMessage({
        sender: "bot",
        text: `We provide bespoke digital strategy, app development, and AI-driven SEO. Our primary services currently include: ${serviceNames}.\n\nWhich one would you like to know more about?`,
        options: Object.values(services).map(s => s.title).concat(["Connect with team"]),
      });
      return;
    }

    const matchedService = Object.values(services).find(s => 
      lowerText.includes(s.title.toLowerCase()) || lowerText.includes(s.slug.toLowerCase().replace("-", " ")) || (lowerText.includes("google") && lowerText.includes("ads"))
    );

    if (matchedService) {
      addMessage({
        sender: "bot",
        text: `${matchedService.title}: ${matchedService.heroSubtitle}\n\nWe typically focus on: ${matchedService.outcomes.slice(0, 2).join(" & ")}. Would you like to connect with our team to discuss this further?`,
        options: ["Yes, connect", "What other services?"],
      });
      return;
    }

    if (lowerText.includes("price") || lowerText.includes("cost") || lowerText.includes("budget") || lowerText.includes("how much")) {
      addMessage({
        sender: "bot",
        text: "Our projects typically start around ₹50,000, but it completely depends on your bespoke requirements. The best way to get an accurate estimate is to share your details with us. Shall we connect on WhatsApp?",
        options: ["Yes, connect", "Not right now"],
      });
      return;
    }
    
    if (lowerText === "yes, connect" || lowerText === "yes") {
      setMode("lead_gen");
      setCurrentStep("name");
      addMessage({
        sender: "bot",
        text: "Great. Let's get started. What's your name?",
      });
      return;
    }

    addMessage({
      sender: "bot",
      text: "I'm not completely sure about that. I am an AI assistant for Clever Crow focused on helping you learn about our digital strategies and services.\n\nType 'services' to see what we do, or 'connect' to speak to a human.",
      options: ["What services do you provide?", "Connect with team"],
    });
  };

  const processLeadGen = (val: string) => {
    switch (currentStep) {
      case "name":
        if (!validateName(val)) {
          addMessage({
            sender: "bot",
            text: "Please enter a valid name.",
          });
          return;
        }
        setUserData((prev) => ({ ...prev, name: val }));
        setCurrentStep("contact");
        addMessage({
          sender: "bot",
          text: `Thank you, ${val}. Could you please provide your mobile number?`,
        });
        break;

      case "contact":
        if (!validatePhone(val)) {
          addMessage({
            sender: "bot",
            text: "Please enter a valid mobile number.",
          });
          return;
        }
        setUserData((prev) => ({ ...prev, contact: val }));
        setCurrentStep("service");
        
        const serviceOptions = Object.values(services).map((s) => s.title);
        addMessage({
          sender: "bot",
          text: "Noted. Which service are you primarily looking for?",
          options: serviceOptions,
        });
        break;

      case "service":
        setUserData((prev) => ({ ...prev, service: val }));
        setCurrentStep("budget");
        addMessage({
          sender: "bot",
          text: "Understood. What is your estimated budget for this project?",
          options: [
            "Under ₹50,000",
            "₹50,000 - ₹1,00,000",
            "₹1,00,000 - ₹5,00,000",
            "Above ₹5,00,000",
            "Not Sure",
          ],
        });
        break;

      case "budget":
        setUserData((prev) => ({ ...prev, budget: val }));
        setCurrentStep("other");
        addMessage({
          sender: "bot",
          text: "Almost done. Any other details about your website or specific goals you'd like to achieve?",
        });
        break;

      case "other":
        setUserData((prev) => ({ ...prev, other: val }));
        setCurrentStep("done");
        addMessage({
          sender: "bot",
          text: "Thank you for sharing your details. I am generating your inquiry and redirecting you to our WhatsApp to continue.",
        });
        
        setTimeout(() => {
          redirectWhatsApp({ ...userData, other: val });
        }, 2000);
        break;

      case "done":
        addMessage({
          sender: "bot",
          text: "Your request has been prepared. If WhatsApp didn't open automatically, please let us know.",
        });
        break;
    }
  };

  const processInput = (text: string) => {
    setIsTyping(false);
    const val = text.trim();

    if (mode === "chat") {
      generateAIResponse(val);
    } else {
      processLeadGen(val);
    }
  };

  const redirectWhatsApp = (data: typeof userData) => {
    const message = `*New Lead from AI Chatbot*
*Name:* ${data.name}
*Contact:* ${data.contact}
*Service Request:* ${data.service}
*Estimated Budget:* ${data.budget}
*Additional Info:* ${data.other || 'N/A'}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "919876543210"; 
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  };

  const handleOptionClick = (option: string) => {
    handleSend(option);
  };

  return (
    <>
      <style>{`
        @keyframes customSpringOpen {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes subtleWhitePulse {
          0% {
            border-color: rgba(255,255,255,0.1);
            box-shadow: 0 0 20px rgba(255,255,255,0.05);
          }
          50% {
            border-color: rgba(255,255,255,0.3);
            box-shadow: 0 0 30px rgba(255,255,255,0.1);
          }
          100% {
            border-color: rgba(255,255,255,0.1);
            box-shadow: 0 0 20px rgba(255,255,255,0.05);
          }
        }

        @keyframes typingDotWhite {
          0% { transform: translateY(0px); background-color: #52525b; }
          50% { transform: translateY(-3px); background-color: #ffffff; }
          100% { transform: translateY(0px); background-color: #52525b; }
        }

        .animate-spring-open {
          animation: customSpringOpen 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-typing-pulse {
          animation: subtleWhitePulse 2s infinite ease-in-out !important;
        }

        .typing-dot {
          animation: typingDotWhite 1.4s infinite ease-in-out;
        }
        .typing-dot:nth-child(1) { animation-delay: 0s; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
      `}</style>
      
      <>
        {/* Chat Window Container */}
        {isOpen && (
          <div 
            className={`fixed bottom-[80px] left-4 right-4 sm:left-auto sm:bottom-[100px] sm:right-6 z-[9999] sm:w-[400px] h-[75dvh] sm:h-[38rem] max-h-[650px] sm:max-h-[800px] flex flex-col rounded-2xl sm:rounded-3xl bg-zinc-950 shadow-[0_20px_60px_rgba(0,0,0,0.9)] border border-zinc-800 origin-bottom-right overflow-hidden transition-all duration-300 animate-spring-open ${isTyping ? 'animate-typing-pulse' : ''} font-sans`}
          >
            {/* Header - Minimalist Black/White */}
            <div className="p-5 flex justify-between items-center flex-shrink-0 border-b border-zinc-800 bg-zinc-950">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <Sparkles size={20} className="text-zinc-950" />
                </div>
                <div>
                  <h3 className="font-semibold text-[16px] tracking-wide text-white">Clever Crow Assistant</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                    </span>
                    <p className="text-xs text-zinc-400 font-medium">Online</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-900 hover:bg-white text-zinc-400 hover:text-zinc-950 transition-colors border border-zinc-800"
                aria-label="Close Chat"
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>
            
            {/* Main Chat Area - Deep Black Background */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 flex flex-col scroll-smooth bg-zinc-950">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} items-end gap-3 max-w-full`}
                >
                  {msg.sender === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0">
                      <Bot size={14} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`px-5 py-3.5 text-[15px] shadow-sm tracking-tight ${
                      msg.sender === "user"
                        ? "bg-white text-zinc-950 font-medium rounded-2xl rounded-tr-sm self-end"
                        : "bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-2xl rounded-tl-sm self-start"
                    }`}
                    style={{ maxWidth: msg.sender === 'user' ? '85%' : '90%' }}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start items-end gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="px-5 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
                    <div className="w-1.5 h-1.5 rounded-full typing-dot"></div>
                    <div className="w-1.5 h-1.5 rounded-full typing-dot"></div>
                    <div className="w-1.5 h-1.5 rounded-full typing-dot"></div>
                  </div>
                </div>
              )}
              
              {/* Quick Actions */}
              {!isTyping && messages[messages.length - 1]?.options && messages[messages.length - 1].sender === "bot" && currentStep !== "done" && (
                <div className="flex flex-wrap gap-2 mt-2 ml-11">
                  {messages[messages.length - 1].options?.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(opt)}
                      className="text-[13px] font-medium bg-zinc-900 border border-zinc-700 text-zinc-300 px-4 py-2 rounded-full hover:bg-white hover:text-zinc-950 transition-colors shadow-sm"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Box Area - Minimalist Dark */}
            <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex-shrink-0">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }} 
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={currentStep === "done" || isTyping}
                  placeholder={currentStep === "done" ? "Session complete." : isTyping ? "AI is typing..." : "Type your message..."}
                  className="w-full pl-5 pr-14 py-3.5 bg-zinc-900 border border-zinc-800 rounded-full text-[14px] focus:outline-none focus:border-zinc-500 focus:bg-zinc-800 transition-colors text-white placeholder-zinc-500 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || currentStep === "done" || isTyping}
                  className="absolute right-2 w-9 h-9 rounded-full bg-white text-zinc-950 flex items-center justify-center disabled:opacity-20 hover:scale-105 transition-transform"
                >
                  <Send size={16} className="ml-0.5" />
                </button>
              </form>
            </div>
          </div>
        )}

            </div>
          </div>
        )}
      </>
  );
}
