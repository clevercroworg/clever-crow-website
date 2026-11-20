// All copy for /lp/ai-chatbot. Prices are placeholders until the packages are finalised: change them here only.

export type ChatLine = { from: "user" | "bot"; text: string };

export type ChatbotPackage = {
  name: string;
  tagline: string;
  setup: string; // one-time, e.g. "₹9,999"
  strikeSetup?: string;
  monthly: string; // e.g. "₹1,499"
  limit: string; // highlighted line, e.g. "Up to 1,000 chats a month"
  features: string[];
  featured?: boolean;
  custom?: boolean; // "from" price, quote on call
};

export const HERO = {
  title: "AI Chatbot for Your",
  accent: "Website & WhatsApp",
  subtitle:
    "Answers customer questions, captures leads and books appointments 24×7, in English, Hindi, Kannada and more. Setup from ₹9,999 + GST.",
  highlights: ["Trained on your business", "Replies in seconds", "Leads sent to your team", "Live in about 7 days"],
};

/** The conversation the hero chat window plays on a loop. */
export const HERO_CHAT: ChatLine[] = [
  { from: "user", text: "Hi, what are your timings on Sunday?" },
  { from: "bot", text: "Hi! We're open 10 AM to 6 PM on Sundays. 😊 Would you like to book a visit?" },
  { from: "user", text: "Yes, tomorrow at 11 please" },
  { from: "bot", text: "Done! You're booked for 11:00 AM tomorrow. May I have your name and number for the confirmation?" },
];

export const NIGHT_SHIFT = {
  preTitle: "Works While You Sleep",
  title: "Your best salesperson never logs off",
  subtitle: "Most enquiries come in the evening and at night, when no one is at the desk. Your chatbot answers every one of them.",
  events: [
    { time: "9:48 PM", text: "Answered a question about fees and sent the brochure" },
    { time: "11:15 PM", text: "Booked a site visit for Sunday, 11 AM" },
    { time: "1:32 AM", text: "Told a customer their order is out for delivery" },
    { time: "7:05 AM", text: "Sent 6 new leads, with name and number, to your team's WhatsApp" },
  ],
};

export const CHANNELS = {
  preTitle: "One Bot, Every Channel",
  title: "Be there wherever customers message you",
  subtitle: "One chatbot, trained once, replying on your website and the apps your customers already use.",
  items: [
    { id: "web", name: "Website", text: "A friendly chat bubble on every page that answers, guides and collects enquiries." },
    { id: "whatsapp", name: "WhatsApp", text: "Instant replies on your WhatsApp Business number, with quick-reply buttons and brochures." },
    { id: "instagram", name: "Instagram", text: "Replies to DMs and story replies, so no \"price?\" message goes unanswered." },
    { id: "facebook", name: "Facebook Messenger", text: "Handles enquiries from your Facebook page and ads automatically." },
  ],
};

export const FEATURES = {
  preTitle: "What It Can Do",
  title: "Much more than a FAQ bot",
  subtitle: "A real AI assistant trained on your business, set up and looked after by our team.",
  lead: {
    title: "Trained on your business",
    text: "We train it on your services, prices, timings, FAQs and brochures, so it answers like your best team member, not like a robot reading a script.",
  },
  items: [
    { icon: "leads", title: "Captures every lead", text: "Collects name, number and requirement, and sends it to your WhatsApp, email or Google Sheet." },
    { icon: "calendar", title: "Books appointments", text: "Offers free slots and confirms bookings for visits, consultations and demos." },
    { icon: "language", title: "Speaks their language", text: "English, Hindi, Kannada, Tamil, Telugu and more, switching as the customer does." },
    { icon: "handover", title: "Hands over to a human", text: "When a customer wants a person, it passes the chat to your team with the full history." },
    { icon: "qualify", title: "Qualifies enquiries", text: "Asks budget, location and timeline, so your team calls the serious buyers first." },
    { icon: "analytics", title: "Reports that make sense", text: "See chats, leads and the most asked questions every month." },
  ],
};

export const USE_CASES = {
  preTitle: "Built for Your Industry",
  title: "See how it talks to your customers",
  subtitle: "Pick your business to see a sample conversation.",
  items: [
    {
      id: "realestate",
      name: "Real Estate",
      chat: [
        { from: "user", text: "Is the 2 BHK in Whitefield still available?" },
        { from: "bot", text: "Yes! 2 BHK homes start at ₹78 lakh. Would you like a site visit on Saturday or Sunday?" },
        { from: "user", text: "Sunday morning" },
        { from: "bot", text: "Booked for Sunday, 11 AM ✅ Our advisor will call you today to confirm." },
      ],
    },
    {
      id: "clinic",
      name: "Clinics",
      chat: [
        { from: "user", text: "Can I see a dentist tomorrow?" },
        { from: "bot", text: "Of course. Tomorrow we have 10:30 AM, 1:00 PM and 5:30 PM free. Which works for you?" },
        { from: "user", text: "5:30 PM" },
        { from: "bot", text: "Your appointment is booked for 5:30 PM tomorrow ✅ You'll get a reminder on WhatsApp." },
      ],
    },
    {
      id: "education",
      name: "Education",
      chat: [
        { from: "user", text: "What is the fee for the data science course?" },
        { from: "bot", text: "The 6-month course is ₹45,000, with EMI options. Would you like to join a free demo class?" },
        { from: "user", text: "Yes" },
        { from: "bot", text: "Great! The next demo is on Saturday at 4 PM. I've sent the link to your WhatsApp 📲" },
      ],
    },
    {
      id: "ecommerce",
      name: "E-commerce",
      chat: [
        { from: "user", text: "Where is my order #1042?" },
        { from: "bot", text: "Your order is out for delivery and should reach you today by 7 PM 🚚" },
        { from: "user", text: "Do you have this kurta in XL?" },
        { from: "bot", text: "Yes, XL is in stock in blue and white. Shall I add it to your cart?" },
      ],
    },
    {
      id: "hospitality",
      name: "Hotels & Resorts",
      chat: [
        { from: "user", text: "Do you have rooms for 2 adults this weekend?" },
        { from: "bot", text: "Yes! A Deluxe Room with breakfast is ₹6,500 a night. Shall I hold it for Saturday and Sunday?" },
        { from: "user", text: "Yes please" },
        { from: "bot", text: "Held for you ✅ Our reservations team will call in 10 minutes to confirm the booking." },
      ],
    },
    {
      id: "salon",
      name: "Salons & Spas",
      chat: [
        { from: "user", text: "Price for a haircut and hair spa?" },
        { from: "bot", text: "Haircut is ₹499 and hair spa is ₹1,199. Together it's ₹1,499 this week. Want to book?" },
        { from: "user", text: "Saturday 3 PM" },
        { from: "bot", text: "You're booked for Saturday at 3 PM ✅ See you soon!" },
      ],
    },
  ] as { id: string; name: string; chat: ChatLine[] }[],
};

export const PRICING = {
  preTitle: "Chatbot Packages",
  title: "Simple setup. Low monthly cost.",
  subtitle: "A one-time setup fee, then a small monthly fee for AI usage, hosting and support. No hidden charges.",
  packages: [
    {
      name: "Starter Bot",
      tagline: "An AI chatbot for your website.",
      setup: "₹9,999",
      strikeSetup: "₹14,999",
      monthly: "₹1,499",
      limit: "Up to 1,000 chats a month",
      features: [
        "AI chatbot on your website",
        "Trained on your services, prices and FAQs",
        "Lead capture: name, number and requirement",
        "Leads sent to your email and Google Sheet",
        "English + 1 Indian language",
        "Your logo, colours and welcome message",
        "Monthly chat report",
        "Live in 5–7 days",
      ],
    },
    {
      name: "Growth Bot",
      tagline: "Website and WhatsApp, working together.",
      setup: "₹19,999",
      strikeSetup: "₹29,999",
      monthly: "₹2,999",
      limit: "Up to 3,000 chats a month",
      features: [
        "Everything in Starter Bot",
        "WhatsApp Business API chatbot",
        "Appointment and visit booking",
        "Lead qualification questions",
        "Instant lead alerts on your WhatsApp",
        "Human handover with full chat history",
        "English + 3 Indian languages",
        "Google Sheet or CRM integration",
        "Live in 7–10 days",
      ],
      featured: true,
    },
    {
      name: "Custom AI Agent",
      tagline: "For bigger teams and custom workflows.",
      setup: "₹49,999",
      monthly: "Custom",
      limit: "Higher chat volumes",
      features: [
        "Everything in Growth Bot",
        "Instagram and Facebook Messenger",
        "Custom integrations (CRM, booking, order status)",
        "Multiple bots or departments",
        "All supported languages",
        "Priority support and a dedicated manager",
      ],
      custom: true,
    },
  ] as ChatbotPackage[],
  note: "Prices exclude GST. WhatsApp message charges are billed by Meta at actual cost.",
};

export const PROCESS = {
  preTitle: "How It Works",
  title: "Live in about a week",
  subtitle: "You share your business details. We do the rest.",
  steps: [
    { days: "Day 1", title: "Quick call", text: "We understand your business, customers and the questions you get most." },
    { days: "Days 2–4", title: "We train your bot", text: "Your services, prices, FAQs and brochures go in. We write its personality and replies." },
    { days: "Days 5–6", title: "You test it", text: "Chat with it, ask tricky questions and tell us what to change." },
    { days: "Day 7", title: "Go live", text: "It goes live on your website and WhatsApp. We keep improving it every month." },
  ],
};

export const DEMO = {
  title: "Don't take our word for it. Talk to one.",
  text: "Our own AI assistant runs on the same technology we build for clients. Ask it anything about Clever Crow.",
};

export const FAQS = [
  {
    question: "What can an AI chatbot do for my business?",
    answer:
      "It answers customer questions instantly, captures leads with their name and number, books appointments, and shares brochures or prices, any time of the day. Your team gets the leads and only steps in when needed.",
  },
  {
    question: "Will it give wrong answers to my customers?",
    answer:
      "We train it only on your business information and set clear rules. If it doesn't know something, it says so politely and passes the chat to your team instead of guessing.",
  },
  {
    question: "Does it work on WhatsApp?",
    answer:
      "Yes. The Growth Bot works on your WhatsApp Business number through the official WhatsApp Business API. We help you with the setup and approval.",
  },
  {
    question: "Which languages does it support?",
    answer: "English, Hindi, Kannada, Tamil, Telugu, Malayalam and more. It replies in the language the customer uses.",
  },
  {
    question: "What does the monthly fee cover?",
    answer:
      "AI usage, hosting, security updates, support and monthly improvements to your bot. WhatsApp message charges are billed separately by Meta at actual cost.",
  },
  {
    question: "Can I see the leads it collects?",
    answer: "Yes. Every lead is sent to your WhatsApp or email straight away, and saved in a Google Sheet or your CRM.",
  },
  {
    question: "How long does setup take?",
    answer: "Starter Bot is usually live in 5–7 days, and Growth Bot in 7–10 days, depending on how quickly we receive your business details.",
  },
];

export const FINAL_CTA = {
  title: "Never miss an enquiry again",
  text: "Tell us about your business. We'll show you what your chatbot can do and suggest the right package.",
};
