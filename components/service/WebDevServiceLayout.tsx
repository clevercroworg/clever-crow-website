"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Menu,
  ChevronDown,
  ArrowRight,
  Phone,
  Laptop,
  Smartphone,
  Cpu,
  Megaphone,
  Check,
  Layout,
  ShoppingCart,
  Code2,
  RefreshCw,
  Wrench,
  Search,
  MessageSquare,
  Shield,
  Layers,
  HelpCircle,
  CheckCircle2,
  Target,
  Rocket,
  Headphones,
  Home,
  Calendar,
  Briefcase,
  Database,
  Monitor,
  Users,
  Award,
  Network,
  Pencil
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

// Map string identifiers to Lucide Icon components to avoid non-serializable objects error
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  laptop: Laptop,
  smartphone: Smartphone,
  cpu: Cpu,
  megaphone: Megaphone,
  layout: Layout,
  shoppingcart: ShoppingCart,
  code2: Code2,
  refreshcw: RefreshCw,
  wrench: Wrench,
  search: Search,
  chevrondown: ChevronDown,
  checkcircle2: CheckCircle2,
  target: Target,
  shield: Shield,
  pencil: Pencil,
  rocket: Rocket,
  headphones: Headphones,
  home: Home,
  calendar: Calendar,
  briefcase: Briefcase,
  database: Database,
  monitor: Monitor,
  users: Users,
  award: Award,
  network: Network
};

// ─── High-Fidelity Custom SVG Icons for Business Goals & Services ───
function CompanyProfileIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="20" height="18" rx="3" fill="#EEF2F6" stroke="#4F46E5" strokeWidth="1.5" />
      <line x1="2" y1="8" x2="22" y2="8" stroke="#4F46E5" strokeWidth="1.5" />
      <circle cx="5" cy="5.5" r="0.75" fill="#EF4444" />
      <circle cx="7.5" cy="5.5" r="0.75" fill="#F59E0B" />
      <circle cx="10" cy="5.5" r="0.75" fill="#10B981" />
      <rect x="5" y="11" width="5" height="7" rx="0.5" fill="#4F46E5" />
      <rect x="6.5" y="13" width="2" height="1.5" fill="#FFFFFF" opacity="0.8" />
      <rect x="6.5" y="15.5" width="2" height="1.5" fill="#FFFFFF" opacity="0.8" />
      <line x1="13" y1="12" x2="19" y2="12" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="13" y1="15" x2="17" y2="15" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19 17l.5 1 .5-1-.5-1z" fill="#F59E0B" />
    </svg>
  );
}

function LeadGenerationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="#EF4444" strokeWidth="1.5" fill="#FEF2F2" />
      <circle cx="12" cy="12" r="6" stroke="#EF4444" strokeWidth="1.5" fill="none" strokeDasharray="2 2" />
      <circle cx="12" cy="12" r="3" fill="#EF4444" />
      <path d="M18.5 5.5L12.5 11.5" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      <polygon points="12.5,11.5 15,11 12.5,9" fill="#F59E0B" />
      <path d="M5.5 5.5l.5.5.5-.5-.5-.5zM18.5 18.5l.5.5.5-.5-.5-.5z" fill="#FBBC05" />
    </svg>
  );
}

function EcommerceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 8v11a2 2 0 002 2h8a2 2 0 002-2V8H6z" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.5" />
      <path d="M9 8V5a3 3 0 016 0v3" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="14" r="2.5" fill="#10B981" />
      <path d="M12 12.5l.4 1 .9.1-.7.6.2.9-.8-.5-.8.5.2-.9-.7-.6.9-.1z" fill="#FFFFFF" />
      <path d="M4 10l.5.75.5-.75-.5-.75z" fill="#F59E0B" />
    </svg>
  );
}

function SaasIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="6" rx="1.5" fill="#EEF2F6" stroke="#4F46E5" strokeWidth="1.5" />
      <rect x="3" y="13" width="18" height="6" rx="1.5" fill="#EEF2F6" stroke="#4F46E5" strokeWidth="1.5" />
      <circle cx="6" cy="7" r="1" fill="#10B981" />
      <circle cx="6" cy="16" r="1" fill="#10B981" />
      <line x1="9" y1="7" x2="17" y2="7" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9" y1="16" x2="15" y2="16" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 10v3" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="2 2" />
      <circle cx="18" cy="11.5" r="1.5" fill="#F59E0B" />
    </svg>
  );
}

function LandingPagesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="20" height="18" rx="2" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5" />
      <line x1="2" y1="8" x2="22" y2="8" stroke="#3B82F6" strokeWidth="1.5" />
      <rect x="13" y="11" width="6" height="7" rx="1" fill="#3B82F6" />
      <path d="M15 14.5l1 1 2-2" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="5" y1="11" x2="10" y2="11" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5" y1="14" x2="9" y2="14" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5" y1="17" x2="8" y2="17" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BookingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="16" rx="2" fill="#FDF2F8" stroke="#EC4899" strokeWidth="1.5" />
      <path d="M3 8h18" stroke="#EC4899" strokeWidth="1.5" />
      <line x1="7" y1="2" x2="7" y2="5" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" />
      <line x1="17" y1="2" x2="17" y2="5" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="14" r="4" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="1.5" />
      <path d="M16 12v2.5h1.5" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round" />
      <rect x="6" y="11" width="3" height="3" rx="0.5" fill="#EC4899" opacity="0.6" />
      <rect x="10" y="11" width="2" height="3" rx="0.5" fill="#EC4899" opacity="0.6" />
    </svg>
  );
}

function PortfolioIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="7" width="14" height="14" rx="2" fill="#FAF5FF" stroke="#8B5CF6" strokeWidth="1.5" />
      <rect x="7" y="3" width="14" height="14" rx="2" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.5" />
      <circle cx="11" cy="7" r="2" fill="#10B981" opacity="0.5" />
      <line x1="15" y1="6" x2="18" y2="6" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="15" y1="8" x2="17" y2="8" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 14l5-5 1 1-5 5z" fill="#F59E0B" />
    </svg>
  );
}

function ServiceBusinessIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="7" width="18" height="13" rx="2" fill="#F0F9FF" stroke="#0EA5E9" strokeWidth="1.5" />
      <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="11" y="12" width="2" height="3" rx="0.5" fill="#0EA5E9" />
      <line x1="5" y1="10" x2="7" y2="10" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="17" y1="10" x2="19" y2="10" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19 5l.5.75.5-.75-.5-.75z" fill="#F59E0B" />
    </svg>
  );
}

function LaptopBusinessIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="11" rx="1.5" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5" />
      <path d="M1 16h22v2a2 2 0 01-2 2H3a2 2 0 01-2-2v-2Z" fill="#3B82F6" stroke="#3B82F6" strokeWidth="1" />
      <rect x="10" y="17" width="4" height="1.5" rx="0.5" fill="#FFFFFF" opacity="0.8" />
      <rect x="6" y="7" width="5" height="6" fill="#3B82F6" opacity="0.6" />
      <line x1="13" y1="8" x2="18" y2="8" stroke="#94A3B8" strokeWidth="1.2" />
      <line x1="13" y1="10" x2="17" y2="10" stroke="#94A3B8" strokeWidth="1.2" />
    </svg>
  );
}

function ReactNextIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="20" height="18" rx="2" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.5" />
      <path d="M8 10l-3 2 3 2" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 10l3 2-3 2" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="13" y1="9" x2="11" y2="15" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19 6l.5.75.5-.75-.5-.75z" fill="#F59E0B" />
    </svg>
  );
}

function WebsiteRedesignIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="20" height="18" rx="2" fill="#FAF5FF" stroke="#8B5CF6" strokeWidth="1.5" />
      <path d="M7 17L15 9" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 9l1.5-1.5L18 9l-1.5 1.5z" fill="#8B5CF6" />
      <path d="M14 6l.3.45.3-.45-.3-.45zM19 10l.3.45.3-.45-.3-.45zM10 12l.3.45.3-.45-.3-.45z" fill="#F59E0B" />
      <path d="M4 14q6-4 12 1" stroke="#8B5CF6" strokeWidth="1.2" strokeDasharray="2 2" />
    </svg>
  );
}

function WebsiteMaintenanceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="20" height="18" rx="2" fill="#F8FAFC" stroke="#64748B" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3.5" stroke="#64748B" strokeWidth="1.5" fill="none" />
      <path d="M13.5 10.5l4-4M17.5 6.5a1.5 1.5 0 010 2l-1 1M14.5 9.5a1.5 1.5 0 01-2 0" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="18" cy="6" r="3" fill="#10B981" />
      <path d="M17 6l.75.75 1.5-1.5" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const goalIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  home: CompanyProfileIcon,
  target: LeadGenerationIcon,
  shoppingcart: EcommerceIcon,
  database: SaasIcon,
  layout: LandingPagesIcon,
  calendar: BookingIcon,
  layers: PortfolioIcon,
  briefcase: ServiceBusinessIcon
};

const serviceIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  laptop: LaptopBusinessIcon,
  code2: ReactNextIcon,
  shoppingcart: EcommerceIcon,
  layout: LandingPagesIcon,
  refreshcw: WebsiteRedesignIcon,
  wrench: WebsiteMaintenanceIcon
};

// Default technologies list with custom SVG badges
const defaultTechnologies = [
  {
    name: "React",
    svg: (
      <svg className="w-9 h-9 text-[#61DAFB]" viewBox="-11.5 -10.23 23 20.463" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
        <g stroke="currentColor" strokeWidth="1" filter="url(#a)">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    )
  },
  {
    name: "Next.js",
    svg: (
      <svg className="w-9 h-9 text-black" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="90" cy="90" r="90" fill="currentColor"/>
        <path d="M149.508 157.52L69.142 54H54v72h13.5v-47.51l67.234 86.816a90.4 90.4 0 0014.774-17.786z" fill="white"/>
        <path d="M115.5 54h13.5v72h-13.5z" fill="white"/>
      </svg>
    )
  },
  {
    name: "WordPress",
    svg: (
      <svg className="w-9 h-9 text-[#21759B]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.393-2.325.609-3.582.609M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0"/>
      </svg>
    )
  },
  {
    name: "WooCommerce",
    svg: (
      <svg className="w-9 h-9" viewBox="0 0 503.81 299.89" xmlns="http://www.w3.org/2000/svg">
        <path fill="#96588A" d="M46.75,0H456.84a46.94,46.94,0,0,1,47,47V203.5a46.94,46.94,0,0,1-47,47H309.78L330,299.89l-88.78-49.43H47a46.94,46.94,0,0,1-47-47V47A46.77,46.77,0,0,1,46.76,0Z"/>
        <path fill="#FFFFFF" d="M28.69,42.8c2.86-3.89,7.16-5.94,12.9-6.35Q57.25,35.24,59.41,51.2,68.94,115.4,80.09,160l44.85-85.4q6.15-11.67,15.36-12.29c9-.61,14.54,5.12,16.8,17.2,5.12,27.24,11.67,50.38,19.45,70q8-78,27-112.64c3.07-5.73,7.57-8.6,13.51-9A17.8,17.8,0,0,1,230,32a16,16,0,0,1,6.35,11.67,17.79,17.79,0,0,1-2,9.83c-8,14.75-14.55,39.53-19.87,73.93-5.12,33.39-7,59.4-5.73,78a24.29,24.29,0,0,1-2.46,13.52c-2.46,4.51-6.15,7-10.86,7.37-5.32.41-10.85-2.05-16.17-7.57Q150.64,189.54,134,131.48q-20,39.32-29.49,59c-12.09,23.14-22.33,35-30.93,35.64C68,226.51,63.3,221.8,59.2,212Q43.54,171.72,25.41,56.52A17.44,17.44,0,0,1,28.69,42.8ZM468.81,75C461.43,62.05,450.58,54.27,436,51.2A53.72,53.72,0,0,0,425,50c-19.66,0-35.63,10.24-48.13,30.72a108.52,108.52,0,0,0-16,57.75q0,23.66,9.83,40.55c7.37,12.91,18.23,20.69,32.77,23.76A53.64,53.64,0,0,0,414.54,204c19.86,0,35.83-10.24,48.12-30.72a109.73,109.73,0,0,0,16-58C478.84,99.33,475.36,86,468.81,75ZM443,131.69c-2.86,13.51-8,23.55-15.56,30.31-5.94,5.32-11.47,7.57-16.59,6.55-4.92-1-9-5.32-12.08-13.31a52,52,0,0,1-3.69-18.64,71.48,71.48,0,0,1,1.43-14.95,66.29,66.29,0,0,1,10.86-24.37c6.76-10,13.92-14.13,21.3-12.7,4.91,1,9,5.33,12.08,13.31a52,52,0,0,1,3.69,18.64A71.47,71.47,0,0,1,443,131.69ZM340.6,75c-7.37-12.91-18.43-20.69-32.76-23.76A53.79,53.79,0,0,0,296.78,50c-19.66,0-35.64,10.24-48.13,30.72a108.52,108.52,0,0,0-16,57.75q0,23.66,9.83,40.55c7.37,12.91,18.22,20.69,32.76,23.76A53.72,53.72,0,0,0,286.33,204c19.87,0,35.84-10.24,48.13-30.72a109.72,109.72,0,0,0,16-58C350.43,99.33,347.16,86,340.6,75Zm-26,56.73c-2.86,13.51-8,23.55-15.56,30.31-5.94,5.32-11.47,7.57-16.59,6.55-4.91-1-9-5.32-12.08-13.31a52,52,0,0,1-3.69-18.64,71.48,71.48,0,0,1,1.43-14.95A66.29,66.29,0,0,1,279,97.28c6.76-10,13.92-14.13,21.3-12.7,4.91,1,9,5.33,12.08,13.31A52,52,0,0,1,316,116.53a60.45,60.45,0,0,1-1.44,15.16Z"/>
      </svg>
    )
  },
  {
    name: "HTML5",
    svg: (
      <svg className="w-9 h-9 text-[#E34F26]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm15.4 6H7.2l.2 2.3h7.9l-.3 3.6-3 1-3-1-.2-2.1H6.5l.4 4.5 5.1 1.7 5.1-1.7.7-7.3H16.9z"/>
      </svg>
    )
  },
  {
    name: "CSS3",
    svg: (
      <svg className="w-9 h-9 text-[#1572B6]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm15.2 6H7.1l.2 2.3h7.9l-.3 3.5-3 1-3-1-.2-2.1H6.4l.4 4.4 5.2 1.7 5.2-1.7.7-7.2H16.7z"/>
      </svg>
    )
  },
  {
    name: "JavaScript",
    svg: (
      <svg className="w-9 h-9 text-[#F7DF1E] bg-black rounded" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
      </svg>
    )
  },
  {
    name: "Tailwind CSS",
    svg: (
      <svg className="w-9 h-9 text-[#06B6D4]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
      </svg>
    )
  }
];

// Default 8 business goals list
const defaultBusinessGoals = [
  { label: "Company Profile Websites", icon: "home" },
  { label: "Lead Generation Websites", icon: "target" },
  { label: "Ecommerce Stores", icon: "shoppingcart" },
  { label: "SaaS Product Websites", icon: "database" },
  { label: "Landing Pages for Ads", icon: "layout" },
  { label: "Booking & Enquiry Websites", icon: "calendar" },
  { label: "Portfolio Websites", icon: "layers" },
  { label: "Service Business Websites", icon: "briefcase" }
];

type WebDevServiceLayoutProps = {
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  highlights?: string[];
  mockupImage?: string;
  heroBgImage?: string;
  servicesTitle?: string;
  servicesSubtitle?: string;
  services: {
    icon: string;
    title: string;
    description: string;
    href: string;
  }[];
  processTitle?: string;
  process?: {
    step: string;
    title: string;
    description: string;
    icon: string;
  }[];
  whyChooseTitle?: string;
  whyChoose: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  serviceName: string;
  pageUrl: string;
};

export default function WebDevServiceLayout({
  eyebrow,
  heroTitle,
  heroSubtitle,
  highlights = ["SEO Ready", "Mobile Friendly", "Lightning Fast", "Easy to Manage"],
  mockupImage = "/services/web_design.png",
  heroBgImage,
  servicesTitle = "Website Development Services",
  servicesSubtitle = "We build high-performing digital solutions tailored to your business needs.",
  services,
  processTitle = "Our Website Development Process",
  process = [
    { step: "01", title: "Discovery", description: "We understand your business, goals and target audience.", icon: "search" },
    { step: "02", title: "Planning", description: "We plan the sitemap, structure and content layout.", icon: "chevrondown" },
    { step: "03", title: "Design", description: "We create clean and modern UI/UX that represents your brand.", icon: "layout" },
    { step: "04", title: "Development", description: "We build fast, responsive and SEO-friendly websites.", icon: "code2" },
    { step: "05", title: "Testing", description: "We test for speed, responsiveness and functionality.", icon: "checkcircle2" },
    { step: "06", title: "Launch", description: "We deploy your website and make it live for your audience.", icon: "cpu" },
    { step: "07", title: "Support", description: "We provide ongoing support and maintenance.", icon: "wrench" }
  ],
  whyChooseTitle = "Why Choose Clever Crow for Website Development?",
  whyChoose,
  faqs,
  serviceName,
  pageUrl
}: WebDevServiceLayoutProps) {
  const renderHeroTitle = (title: string) => {
    const match = title.match(/(.*)\s+(for|For)\s+(.*)/);
    if (match) {
      return (
        <>
          {match[1]}
          <br />
          <span className="font-caveat-brush text-amber-500 text-[1.15em] normal-case">
            for {match[3]}
          </span>
        </>
      );
    }
    return title;
  };

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="bg-white min-h-screen text-slate-800 antialiased font-body pt-0 pb-0 selection:bg-yellow-500/20">
      
      {/* ───────────────── 1. HERO SECTION ───────────────── */}
      <section className="relative overflow-hidden pt-28 md:pt-36 pb-24 bg-[#0B0F19] text-white">
        
        {/* Ambient background image and dark overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src={heroBgImage || "/images/webbg.png"}
            alt="Service Background"
            fill
            priority
            className="object-cover object-center opacity-[0.25]"
          />
          {/* Dark high-contrast overlay gradients */}
          <div className="absolute inset-0 bg-[#0B0F19]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-[#0B0F19]/35" />
          
          {/* Subtle dot grid */}
          <div 
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1.2px, transparent 1.2px)`,
              backgroundSize: "24px 24px"
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
          
          {/* Breadcrumbs */}
          <div className="flex items-center justify-center gap-2 text-[11px] font-bold text-slate-400 mb-6 uppercase tracking-wider">
            <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <span>/</span>
            <span className="hover:text-slate-300 transition-colors cursor-default">Services</span>
            <span>/</span>
            <span className="text-amber-500 font-extrabold">{eyebrow}</span>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col items-center">
            
            {/* Left Column (Text & CTAs) */}
            <div className="flex flex-col items-center text-center">
              
              {/* Title */}
              <h1 className="service-h1 text-5xl sm:text-6xl lg:text-[76px] leading-[1.05] text-white">
                {renderHeroTitle(heroTitle)}
              </h1>

              {/* Subtitle */}
              <p className="mt-6 text-base md:text-lg text-slate-300 leading-relaxed font-medium max-w-2xl mx-auto">
                {heroSubtitle}
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
                <a
                  href="tel:9986389444"
                  className="group flex items-center justify-center gap-2 rounded-2xl bg-amber-500 px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-900 shadow-md shadow-amber-500/20 hover:bg-amber-600 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
                >
                  <Phone size={18} className="shrink-0" fill="currentColor" />
                  +91 9986389444
                </a>

                <a
                  href={`https://wa.me/919986389444?text=Hi%2C%20I'm%20interested%20in%20your%20${encodeURIComponent(serviceName)}%20services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-xs font-black uppercase tracking-wider text-white hover:border-white/20 hover:bg-white/10 hover:scale-[1.01] active:scale-95 transition-all"
                >
                  <FaWhatsapp size={20} className="text-[#25D366] shrink-0" />
                  Chat with us
                </a>
              </div>

              {/* Highlights below buttons */}
              <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 w-full justify-items-center">
                {highlights.map((hl, i) => (
                  <div key={i} className="flex items-center gap-2 text-[14px] font-black text-slate-400 uppercase tracking-wider">
                    <CheckCircle2 size={14} className="text-amber-500 shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ───────────────── 2. WHAT WE BUILD (SERVICES GRID) ───────────────── */}
      <section id="what-we-build" className="py-12 md:py-24 max-w-7xl mx-auto px-6 lg:px-8 border-t border-slate-100/80">
        
        {/* Title */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-500 mb-3">
            WHAT WE BUILD
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-4 font-sans">
            {servicesTitle}
          </h2>
          <h2 className="mt-3 text-slate-500 text-sm font-medium">
            {servicesSubtitle}
          </h2>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {services.map((svc, i) => {
            const ServiceIconComponent = serviceIconMap[svc.icon.toLowerCase().replace(/[^a-z0-9]/g, "")] || LaptopBusinessIcon;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="group relative bg-white border border-slate-200/60 rounded-[2.2rem] px-6 py-8 md:py-6 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.02)] flex flex-col items-center text-center justify-between md:min-h-[330px] min-h-0 h-auto cursor-pointer"
              >
                <div className="flex flex-col items-center">
                  {/* Large Outline Icon (no box) */}
                  <div className="flex items-center justify-center shrink-0">
                    <ServiceIconComponent className="w-12 h-12" />
                  </div>
                  {/* Text content */}
                  <h3 className="text-sm font-black text-slate-800 tracking-tight mt-6 leading-tight">
                    {svc.title}
                  </h3>
                  <p className="text-[11px] font-semibold text-slate-500 mt-3.5 leading-relaxed">
                    {svc.description}
                  </p>
                </div>

                {/* Bottom link (centered, no border top divider) */}
                <div className="mt-6 flex items-center justify-center gap-1 text-[10px] font-black text-amber-500 uppercase tracking-widest group-hover:text-amber-600 transition-colors">
                  <span>Learn More</span>
                  <ArrowRight size={10} className="stroke-[3] transition-transform group-hover:translate-x-0.5" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </section>

      {/* ───────────────── 3. OUR APPROACH (TIMELINE PROCESS) ───────────────── */}
      <section className="py-12 md:py-24 bg-slate-50/50 border-t border-b border-slate-100/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-500 mb-3">
              OUR APPROACH
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-4 font-sans">
              {processTitle}
            </h2>
          </div>

          {/* 7-Step horizontal timeline */}
          <div className="relative">
            {/* Background line connecting elements (desktop only) */}
            <div className="absolute top-[38px] left-[8%] right-[8%] h-[2px] bg-slate-100 hidden lg:block z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-8 items-start relative z-10">
              {process.map((step, idx) => {
                const ProcessIcon = iconMap[step.icon.toLowerCase().replace(/[^a-z0-9]/g, "")] || Search;
                return (
                  <div key={idx} className="flex flex-col items-center text-center group">
                    {/* Step circle index badge */}
                    <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm group-hover:border-amber-500 transition-all shrink-0">
                      {/* Number badge on top edge */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-white border border-amber-500 text-[10px] font-black text-amber-500 shadow-sm">
                        {step.step}
                      </div>
                      <ProcessIcon className="w-8 h-8 text-amber-500 stroke-[1.5] transition-colors" />
                    </div>

                    {/* Title & Info */}
                    <h4 className="text-sm font-black text-slate-800 tracking-tight mt-5 text-center">
                      {step.title}
                    </h4>
                    <p className="text-[11px] font-semibold text-slate-500 mt-2 leading-relaxed text-center max-w-[150px] mx-auto">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ───────────────── 4. TWO-COLUMN FEATURES (TECHNOLOGIES & BENEFITS) ───────────────── */}
      <section className="py-10 md:py-16 bg-slate-50/40 border-t border-b border-slate-100/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column Card (Technologies) */}
            <div className="lg:col-span-6 flex flex-col bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-8 md:px-10 md:py-8 shadow-sm justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight font-sans">
                  Modern Technologies We Work With
                </h2>
                <div className="grid grid-cols-4 gap-4 w-full mt-6">
                  {defaultTechnologies.map((tech, i) => (
                    <div
                      key={i}
                      className="bg-slate-50/50 border border-slate-100/60 rounded-2xl py-6 px-3 flex flex-col items-center justify-center text-center hover:border-slate-200 hover:shadow-sm transition-all gap-3 cursor-default"
                    >
                      <div className="flex h-11 w-11 items-center justify-center shrink-0">
                        {tech.svg}
                      </div>
                      <span className="text-[11px] font-black text-slate-700 tracking-tight leading-tight">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <Link href="/contact" className="inline-flex items-center gap-1.5 text-[11px] font-black text-amber-500 hover:text-amber-600 uppercase tracking-widest transition-colors">
                  More Tools & Integrations
                  <ArrowRight size={12} className="stroke-[2.5]" />
                </Link>
              </div>
            </div>

            {/* Right Column Card (Why Choose Clever Crow) */}
            <div className="lg:col-span-6 flex flex-col bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-8 md:px-10 md:py-8 shadow-sm relative overflow-hidden justify-between">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full">
                
                {/* Left part of this card: Checkpoints (60%) */}
                <div className="md:col-span-7 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight font-sans">
                      {whyChooseTitle}
                    </h2>
                    <div className="mt-6 flex flex-col gap-4 md:pr-6">
                      {whyChoose.slice(0, 5).map((point, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white shrink-0 shadow-sm shadow-amber-500/10">
                            <Check size={11} className="stroke-[3]" />
                          </div>
                          <span className="text-[12px] font-bold text-slate-600 leading-tight">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right part of this card: Mockup Image (40%) */}
                <div className="md:col-span-5 flex items-center justify-center md:h-full relative min-h-[200px] md:min-h-0 overflow-visible">
                  <img
                    src="/images/device-mockup.png"
                    alt="Clever Crow website design mockups"
                    className="w-[110%] md:w-[120%] max-w-[260px] md:max-w-none object-contain mix-blend-multiply md:absolute md:right-[-15px] md:top-[50%] md:-translate-y-1/2 md:bottom-auto select-none pointer-events-none"
                  />
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ───────────────── 5. GOALS SECTION ───────────────── */}
      <section className="py-12 md:py-24 bg-slate-50/50 border-t border-b border-slate-100/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-500 mb-3">
              BUSINESS GOALS
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-4 font-sans">
              Websites for Different Business Goals
            </h2>
          </div>

          {/* Grid of 8 Goal items (no outer cards, small icon containers) */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {defaultBusinessGoals.map((goal, idx) => {
              const GoalIconComponent = goalIconMap[goal.icon.toLowerCase()] || CompanyProfileIcon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center gap-3 group"
                >
                  {/* Small rounded icon box */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-200/60 shadow-sm shrink-0 group-hover:border-amber-500 transition-colors">
                    <GoalIconComponent className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] md:text-xs font-black text-slate-700 leading-snug mt-1">
                    {goal.label}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ───────────────── 6. FAQ & FINAL CTA (TWO-COLUMN GRID) ───────────────── */}
      <section id="contact-form" className="py-10 md:py-16 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column (FAQs) - 6/12 width to reduce height */}
          <div className="lg:col-span-6 flex flex-col items-start bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-sans mb-8">
              Frequently Asked Questions
            </h2>
 
            {/* Accordion list */}
            <div className="w-full flex flex-col">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="border-b border-slate-100 py-2 last:border-0"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="flex w-full items-center justify-between text-left font-semibold text-slate-800 text-[14px] hover:text-amber-500 transition-colors py-2"
                  >
                    <span>{faq.question}</span>
                    <span className="text-slate-400 shrink-0 text-lg font-bold ml-4 w-5 h-5 flex items-center justify-center transition-transform duration-200 select-none">
                      {activeFaq === i ? "−" : "+"}
                    </span>
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        <div className="pb-3 pt-0.5 text-xs font-semibold text-slate-500 leading-relaxed">
                           {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
 
          {/* Right Column (Cream CTA Card) - 6/12 width */}
          <div className="lg:col-span-6 flex flex-col bg-[#FFFBF2] border border-amber-500/5 rounded-[2.5rem] shadow-sm relative overflow-hidden md:min-h-[380px] min-h-0 h-auto">
            {/* Background radial highlight */}
            <div className="absolute top-[-50px] right-[-50px] w-48 h-48 rounded-full bg-amber-500/5 blur-[80px] pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-stretch h-full w-full relative z-10 flex-grow">
              {/* Left Side: Text and Buttons (50% width on desktop) */}
              <div className="w-full md:w-[50%] flex flex-col justify-center gap-6 p-6 md:py-8 md:pl-8 md:pr-0">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-tight md:max-w-[280px]">
                    Ready to Build or <br className="hidden md:inline" />Redesign Your Website?
                  </h3>
                  <p className="mt-3.5 text-[13px] font-semibold text-slate-500 leading-relaxed max-w-[280px]">
                    Let's build a website that reflects your brand, loads fast and helps your business grow.
                  </p>
                </div>
 
                <div className="flex flex-col gap-3 w-full max-w-[240px]">
                  <Link
                    href={`/contact?service=${encodeURIComponent(serviceName)}`}
                    className="flex items-center justify-between bg-amber-500 hover:bg-amber-600 active:scale-98 transition-all px-5 py-3 rounded-xl text-slate-950 font-bold text-[13px] shadow-sm"
                  >
                    <span>Discuss Your Project</span>
                    <ArrowRight size={14} className="stroke-[3]" />
                  </Link>
 
                  <a
                    href={`https://wa.me/919986389444?text=Hi%2C%20I'm%20interested%20in%20your%20${encodeURIComponent(serviceName)}%20service.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 active:scale-98 transition-all px-5 py-3 rounded-xl text-slate-800 font-bold text-[13px] shadow-sm"
                  >
                    <FaWhatsapp size={16} className="text-[#25D366] shrink-0" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
 
              {/* Right Side: Image container (50% width on desktop) */}
              <div className="w-full md:w-[50%] relative min-h-[160px] md:min-h-0 self-stretch overflow-hidden">
                <img
                  src="/images/laptop-guy.png"
                  alt="Clever Crow consultant typing on laptop"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 h-[105%] md:h-[110%] w-auto object-contain object-bottom md:object-right-bottom select-none pointer-events-none"
                />
              </div>
            </div>
          </div>
 
        </div>
      </section>
 
      {/* ───────────────── 7. STATS STRIP ───────────────── */}
      <section className="bg-slate-50/50 border-t border-slate-100 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="bg-white border border-slate-200/80 rounded-[2.2rem] p-6 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-8 items-center shadow-[0_4px_25px_rgba(0,0,0,0.01)]">
            
            {/* Stat 1 */}
            <div className="flex flex-row items-center gap-4 py-2 justify-center md:justify-start">
              <Monitor className="w-10 h-10 text-amber-500 stroke-[1.5] shrink-0" />
              <div>
                <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight block leading-none">90+</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1 block">Websites Delivered</span>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-row items-center gap-4 py-2 justify-center md:justify-start">
              <Users className="w-10 h-10 text-amber-500 stroke-[1.5] shrink-0" />
              <div>
                <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight block leading-none">50+</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1 block">Happy Clients</span>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-row items-center gap-4 py-2 justify-center md:justify-start">
              <Award className="w-10 h-10 text-amber-500 stroke-[1.5] shrink-0" />
              <div>
                <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight block leading-none">5+</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1 block">Years Experience</span>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-row items-center gap-4 py-2 justify-center md:justify-start">
              <Network className="w-10 h-10 text-amber-500 stroke-[1.5] shrink-0" />
              <div>
                <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight block leading-none">10+</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1 block">Industries Served</span>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
