import {
  BarChart3,
  Camera,
  Globe,
  LineChart,
  Megaphone,
  MessageCircle,
  MessageSquareText,
  Search,
  Target,
  Workflow,
  type LucideIcon,
} from "lucide-react";

// Copy follows "College_Marketing_Landing_Page_Developer_Brief.docx" (14 Oct 2026).
// Only text marked "Website copy" in the brief belongs here.

// Confirm the WhatsApp destination with the project owner before launch.
export const WHATSAPP_NUMBER = "919986389444";
export const WHATSAPP_MESSAGE =
  "Hello Clever Crow, I’m interested in digital marketing for our college. College name: ___. City: ___. My role: ___. Courses to promote: ___.";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const PHONE_DISPLAY = "+91 99863 89444";
export const PHONE_HREF = "tel:+919986389444";

// Google Ads call conversion, the same label the shared LP header reports call clicks to.
export const ADS_CALL_CONVERSION = "AW-17335403082/ul0ECKr5i_QaEMqElcpA";

// Approved management discussion photograph in /public/images/college/.
export const HERO_IMAGE: { src: string; alt: string; width: number; height: number } | null = {
  src: "/images/college/hero-meeting.jpg",
  alt: "College leadership and marketing strategists in an admissions planning session",
  width: 1200,
  height: 896,
};

export const NAV_LINKS = [
  { label: "Our Experience", href: "#experience" },
  { label: "Results", href: "#results" },
  { label: "Services", href: "#services" },
  { label: "FAQs", href: "#faqs" },
];

export const HERO = {
  audience: "FOR COLLEGE OWNERS & MANAGEMENT",
  titleLead: "Increase College Admissions Through",
  titleAccent: "Digital Marketing",
  paragraph:
    "Reach prospective students, generate relevant enquiries and strengthen admission follow-up with targeted advertising, better websites and WhatsApp automation.",
  secondary: "A marketing strategy built around your courses, location, admission goals and budget.",
  services: ["Google & Meta Ads", "College Websites", "SEO", "WhatsApp & CRM"],
  secondaryCta: "Discuss on WhatsApp",
  clarification: "Marketing services for educational institutions.",
};

// Shown beside the hero copy while no approved photograph is available.
export const PLAN_BASIS = [
  { title: "Your courses", desc: "Priority programmes, departments and intakes." },
  { title: "Your location", desc: "The regions and cities your students come from." },
  { title: "Your admission goals", desc: "Seats to fill and the timeline to fill them." },
  { title: "Your budget", desc: "Advertising spend matched to realistic outcomes." },
];

type Institution = {
  name: string;
  logo?: { src: string; width: number; height: number };
};

// Use text labels where no approved logo file exists. Never recreate a college logo.
export const INSTITUTIONS: Institution[] = [
  { name: "Siddaganga Institute of Technology", logo: { src: "/images/logos/sit.png", width: 307, height: 140 } },
  { name: "Siddaganga Medical College and Research Institute" },
  { name: "VIMS, Bangalore" },
  { name: "BGS GIMS", logo: { src: "/images/logos/bgsgims.svg", width: 424, height: 101 } },
  { name: "Carver Aviation", logo: { src: "/images/logos/carver.png", width: 1631, height: 380 } },
  { name: "VSMA Aerospace", logo: { src: "/images/logos/vsmaerospace.png", width: 638, height: 174 } },
];

export const EXPERIENCE = {
  heading: "Experience Across Engineering, Medical & Aviation Education",
  intro:
    "We support educational institutions with digital marketing, stronger online visibility and admission-focused campaigns.",
};

export const RESULTS = {
  heading: "College Marketing Experience. Results You Can Review.",
  intro: "Explore examples from our work across specialised and professional education.",
};

export const IMPROVE = {
  heading: "Connect Your Marketing to Your Admission Goals",
  cards: [
    {
      title: "Reach Relevant Students",
      desc: "Promote the right courses to prospective students in the locations that matter to your institution.",
      icon: Target,
    },
    {
      title: "Generate Better Enquiries",
      desc: "Give students clear course information and a simple way to connect with your admissions team.",
      icon: MessageSquareText,
    },
    {
      title: "Strengthen Follow-up",
      desc: "Organise enquiries, assign them to your team and support timely communication through WhatsApp and CRM workflows.",
      icon: Workflow,
    },
    {
      title: "Understand Performance",
      desc: "See how campaigns contribute to enquiries, counselling, campus visits, applications and admissions.",
      icon: BarChart3,
    },
  ] satisfies { title: string; desc: string; icon: LucideIcon }[],
};

export const SERVICES = {
  heading: "Digital Marketing Built Around Your College",
  intro:
    "Choose a focused campaign or a broader marketing programme based on your courses, intake priorities and available budget.",
  items: [
    {
      title: "Google & Meta Advertising",
      desc: "Course-specific campaigns to reach prospective students, capture enquiries and reconnect with interested audiences.",
      icon: Megaphone,
    },
    {
      title: "College Websites & Landing Pages",
      desc: "Fast, mobile-friendly websites and course pages with clear information, enquiry forms, WhatsApp and call options.",
      icon: Globe,
    },
    {
      title: "SEO & Search Visibility",
      desc: "Improve course and institution content so prospective students can find useful, accurate information about your college.",
      icon: Search,
    },
    {
      title: "Social Media & Content",
      desc: "Showcase your faculty, facilities, campus life and verified student achievements through consistent, professional content.",
      icon: Camera,
    },
    {
      title: "WhatsApp Automation & CRM",
      desc: "Support enquiry acknowledgement, team assignment, follow-up reminders and admission-stage tracking.",
      icon: MessageCircle,
    },
    {
      title: "Tracking & Reporting",
      desc: "Connect campaign activity with enquiry quality and admission progress so management can make informed decisions.",
      icon: LineChart,
    },
  ] satisfies { title: string; desc: string; icon: LucideIcon }[],
};

export const REPORTING = {
  heading: "Know What Your Marketing Is Delivering",
  intro: "Review performance by course, campaign and admission stage—not just clicks and impressions.",
  marketing: [
    "Advertising spend",
    "Relevant enquiries",
    "Cost per relevant enquiry",
    "Enquiries by course and location",
    "Campaign and source performance",
  ],
  admissions: [
    "Enquiry contact rate",
    "Counselling bookings",
    "Campus visits",
    "Applications received",
    "Confirmed admissions",
  ],
  note: "Admission-stage reporting depends on consistent updates from your admissions team or CRM.",
};

export const FAQS = [
  {
    q: "Which colleges do you work with?",
    a: "We work with colleges and specialised educational institutions. We assess your courses, location, intake priorities and marketing needs before recommending a scope.",
  },
  {
    q: "Can you promote selected courses?",
    a: "Yes. Campaigns can focus on priority courses, departments or admission intakes instead of promoting every programme together.",
  },
  {
    q: "Do we need a new website?",
    a: "Not always. We review your existing website first. Depending on its condition, we may recommend improvements, dedicated landing pages or a rebuild.",
  },
  {
    q: "Can you help our team manage enquiries?",
    a: "Yes. Depending on the agreed scope, we can support CRM setup, enquiry routing, WhatsApp workflows and follow-up reminders. Your admissions team continues to handle counselling and admission decisions.",
  },
  {
    q: "Are advertising budgets included in your fee?",
    a: "Advertising spend is separate from our service fee. We recommend a scope and budget based on your requirements; applicable software and messaging costs are outlined in the proposal.",
  },
  {
    q: "Do you guarantee admissions?",
    a: "No. Admissions depend on factors including course demand, eligibility, fees, reputation and counselling. Our work focuses on improving visibility, relevant enquiries, follow-up and measurement.",
  },
];

export const FOOTER = {
  company: "Clever Crow Strategies LLP",
  tagline: "Digital marketing, websites and automation for educational institutions.",
  location: "Udupi, Karnataka",
};
