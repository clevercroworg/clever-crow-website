"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Search,
  Megaphone,
  Target,
  Pencil,
  Rocket,
  Monitor,
  TrendingUp,
  BarChart3,
  LineChart,
  MousePointerClick,
  Eye,
  Users,
  Heart,
  Building,
  Home,
  GraduationCap,
  ShoppingCart,
  Layers,
  Database,
  Code2,
  Layout,
  Smartphone,
  Cpu,
  Headphones,
  Calendar,
  Briefcase,
  Award,
  Network,
  Wrench,
  Shield,
  RefreshCw,
  Globe,
  LayoutGrid,
  ChevronDown,
  MessageSquare,
  Phone
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

// ─── Icon Map ───
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  search: Search,
  megaphone: Megaphone,
  target: Target,
  pencil: Pencil,
  rocket: Rocket,
  monitor: Monitor,
  trendingup: TrendingUp,
  barchart3: BarChart3,
  linechart: LineChart,
  mousepointerclick: MousePointerClick,
  eye: Eye,
  users: Users,
  home: Home,
  graduationcap: GraduationCap,
  shoppingcart: ShoppingCart,
  layers: Layers,
  database: Database,
  code2: Code2,
  layout: Layout,
  smartphone: Smartphone,
  cpu: Cpu,
  headphones: Headphones,
  calendar: Calendar,
  briefcase: Briefcase,
  award: Award,
  network: Network,
  wrench: Wrench,
  shield: Shield,
  refreshcw: RefreshCw,
  checkcircle2: CheckCircle2,
  globe: Globe,
  layoutgrid: LayoutGrid
};

// ─── Service Branded Icon SVGs ───
function GoogleAdsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.9998 22.9291C1.7908 22.9291 0 21.1383 0 18.9293s1.7908-3.9998 3.9998-3.9998 3.9998 1.7908 3.9998 3.9998-1.7908 3.9998-3.9998 3.9998z" fill="#34A853"/>
      <path d="M23.4641 16.9287L15.4632 3.072C14.3586 1.1587 11.9121.5028 9.9988 1.6074S7.4295 5.1585 8.5341 7.0718l8.0009 13.8567c1.1046 1.9133 3.5511 2.5679 5.4644 1.4646 1.9134-1.1046 2.568-3.5511 1.4647-5.4644z" fill="#FBBC05"/>
      <path d="M7.5137 4.8438L1.5645 15.1484A4.5 4.5 0 0 1 4 14.4297c2.5597-.0075 4.6248 2.1585 4.4941 4.7148l3.2168-5.5723-3.6094-6.25c-.4499-.7793-.6322-1.6394-.5878-2.4784z" fill="#4285F4"/>
    </svg>
  );
}

function MetaAdsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z" fill="#0064E0"/>
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="#25D366"/>
    </svg>
  );
}

function SeoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.698 11.911c0 .444-.226.516-.79.516-.596 0-.706-.1-.77-.554-.118-1.152-.896-2.13-2.201-2.24-.418-.034-.518-.19-.518-.706 0-.48.074-.708.446-.708 2.265.01 3.833 1.832 3.833 3.69v.002zm3.3 0c0-3.456-2.338-7.11-7.74-7.11H5.52c-.218 0-.354.11-.354.31 0 .109.082.209.156.26.388.31.97.654 1.73 1.036.743.372 1.323.616 1.903.852.246.1.336.208.336.344 0 .19-.136.308-.4.308H.372c-.254 0-.372.164-.372.326 0 .136.044.254.162.372.69.726 1.796 1.596 3.4 2.604 1.466.91 2.98 1.74 4.533 2.492.236.11.308.236.308.372-.008.154-.126.28-.4.28H4.1c-.216 0-.344.12-.344.3 0 .1.08.226.19.326.888.808 2.311 1.688 4.207 2.494 2.53 1.08 5.094 1.721 7.98 1.721 5.465 0 7.867-4.087 7.867-7.289l-.002.002zm-7.133 5.104c-2.794 0-5.132-2.276-5.132-5.114 0-2.794 2.33-5.04 5.132-5.04 2.863 0 5.111 2.24 5.111 5.04a5.086 5.086 0 0 1-5.111 5.114z" fill="#FF6600"/>
    </svg>
  );
}

function LandingPageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="m24 4.515-7.658 14.97H9.149l3.205-6.204h-.144C9.566 16.713 5.621 18.973 0 19.485v-6.118s3.596-.213 5.71-2.435H0V4.515h6.417v5.278l.144-.001 2.622-5.277h4.854v5.244h.144l2.72-5.244H24Z" fill="#4353FF"/>
    </svg>
  );
}

function CrmIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z" fill="#FF7A59"/>
    </svg>
  );
}

function AnalyticsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 284" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
      <g>
        <path d="M256.003159,247.933017 C256.055907,258.030289 251.77298,267.664804 244.241349,274.390297 C236.709718,281.11579 226.653817,284.285366 216.626905,283.094249 C198.58347,280.424364 185.360959,264.722632 185.800619,246.488035 L185.800619,36.8452103 C185.364944,18.5907614 198.619678,2.88144681 216.687112,0.238996295 C226.704325,-0.933476157 236.743571,2.24455542 244.261279,8.9678962 C251.778988,15.691237 256.053811,25.3147619 256.003159,35.4002282 L256.003159,247.933017 Z" fill="#F9AB00"></path>
        <path d="M35.1010243,213.193238 C54.4867848,213.193238 70.2020487,228.908502 70.2020487,248.294263 C70.2020487,267.680023 54.4867848,283.395287 35.1010243,283.395287 C15.7152639,283.395287 0,267.680023 0,248.294263 C0,228.908502 15.7152639,213.193238 35.1010243,213.193238 Z M127.459466,106.806429 C107.981896,107.874068 92.8698765,124.212107 93.3217628,143.713681 L93.3217628,237.998765 C93.3217628,263.58699 104.580582,279.120548 121.077461,282.431965 C131.434034,284.530959 142.185473,281.860819 150.356699,275.160414 C158.527925,268.460009 163.252393,258.439904 163.222912,247.872809 L163.222912,142.088076 C163.240039,132.641687 159.462041,123.584285 152.737293,116.950107 C146.012546,110.315928 136.904752,106.661084 127.459466,106.806429 L127.459466,106.806429 Z" fill="#E37400"></path>
      </g>
    </svg>
  );
}

function SocialMediaIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" fill="#E1306C"/>
    </svg>
  );
}

function PerformanceMarketingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="18" stroke="#0D9488" strokeWidth="3" fill="none" />
      <circle cx="24" cy="24" r="12" stroke="#0D9488" strokeWidth="3" fill="none" />
      <circle cx="24" cy="24" r="6" fill="#0D9488" />
      <path d="M38 10L28 20" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
      <polygon points="28,20 28,15 33,20" fill="#F59E0B" />
    </svg>
  );
}

function GoogleBrandIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.5 24c0-1.61-.15-3.16-.42-4.69H24v9.09h12.64c-.55 2.87-2.17 5.31-4.61 6.95l7.2 5.58C43.43 36.29 46.5 30.73 46.5 24z"/>
      <path fill="#FBBC05" d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.98-6.19z"/>
      <path fill="#34A853" d="M24 46.5c6.47 0 11.9-2.13 15.88-5.81l-7.2-5.58c-2.2 1.47-5.01 2.39-8.68 2.39-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48.5 24 46.5z"/>
    </svg>
  );
}

function FacebookBrandIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function LinkedInBrandIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function YouTubeBrandIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="#FF0000" d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.53 3.545 12 3.545 12 3.545s-7.53 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.022 0 12 0 12s0 3.978.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.858.508 9.388.508 9.388.508s7.53 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.978 24 12 24 12s0-3.978-.502-5.837z"/>
      <polygon fill="#FFFFFF" points="9.545 15.568 15.818 12 9.545 8.432"/>
    </svg>
  );
}

// ─── Service config for color themes ───
function getMarketingServiceConfig(title: string, iconKey: string) {
  const t = title.toLowerCase();
  const k = iconKey.toLowerCase();

  // 1. Google Ads
  if (t.includes("google") || k === "google" || k === "googleads") {
    return {
      IconSvg: GoogleAdsIcon,
      borderColor: "hover:border-amber-500/35",
      arrowColor: "group-hover:text-amber-600"
    };
  }

  // 2. Meta Ads
  if (t.includes("meta") || t.includes("facebook") || t.includes("instagram") || k === "meta" || k === "metaads" || k === "facebook" || k === "instagram") {
    return {
      IconSvg: MetaAdsIcon,
      borderColor: "hover:border-blue-500/35",
      arrowColor: "group-hover:text-blue-600"
    };
  }

  // 3. WhatsApp Automation
  if (t.includes("whatsapp") || k === "whatsapp" || k === "smartphone") {
    return {
      IconSvg: WhatsAppIcon,
      borderColor: "hover:border-emerald-500/35",
      arrowColor: "group-hover:text-emerald-600"
    };
  }

  // 4. SEO / Organic Search
  if (t.includes("seo") || t.includes("organic") || k === "search" || k === "target") {
    return {
      IconSvg: SeoIcon,
      borderColor: "hover:border-orange-500/35",
      arrowColor: "group-hover:text-orange-600"
    };
  }

  // 5. Landing Pages
  if (t.includes("landing") || t.includes("funnel") || k === "layout" || k === "browser") {
    return {
      IconSvg: LandingPageIcon,
      borderColor: "hover:border-blue-600/35",
      arrowColor: "group-hover:text-blue-600"
    };
  }

  // 6. CRM & Follow-Up
  if (t.includes("crm") || t.includes("follow") || k === "database" || k === "server") {
    return {
      IconSvg: CrmIcon,
      borderColor: "hover:border-orange-500/35",
      arrowColor: "group-hover:text-orange-600"
    };
  }

  // 7. Analytics & Tracking
  if (t.includes("analytics") || t.includes("tracking") || t.includes("tag") || k === "monitor" || k === "chart" || k === "linechart") {
    return {
      IconSvg: AnalyticsIcon,
      borderColor: "hover:border-amber-500/35",
      arrowColor: "group-hover:text-amber-600"
    };
  }

  // 8. Social Media Management
  if (t.includes("social") || t.includes("content") || t.includes("copywriting") || k === "pencil" || k === "megaphone") {
    return {
      IconSvg: SocialMediaIcon,
      borderColor: "hover:border-pink-500/35",
      arrowColor: "group-hover:text-pink-600"
    };
  }

  // 9. Performance Marketing (General)
  if (t.includes("performance") || k === "rocket") {
    return {
      IconSvg: PerformanceMarketingIcon,
      borderColor: "hover:border-teal-500/35",
      arrowColor: "group-hover:text-teal-600"
    };
  }

  // Fallback
  return {
    IconSvg: PerformanceMarketingIcon,
    borderColor: "hover:border-amber-500/35",
    arrowColor: "group-hover:text-amber-500"
  };
}

// ─── Types ───
type ServiceItem = {
  icon: string;
  title: string;
  description: string;
  href: string;
};

type FAQItem = {
  question: string;
  answer: string;
};

type DigitalMarketingServiceLayoutProps = {
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  serviceName: string;
  services: ServiceItem[];
  whyChoose: string[];
  faqs: FAQItem[];
  pageUrl: string;
};

export default function DigitalMarketingServiceLayout({
  eyebrow,
  heroTitle,
  heroSubtitle,
  serviceName,
  services,
  whyChoose,
  faqs,
  pageUrl
}: DigitalMarketingServiceLayoutProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Hero Bottom Bullets (matching design image)
  const heroBullets = [
    { title: "Performance Focused", desc: "Every campaign is built for measurable ROI.", icon: "target" },
    { title: "Data-Driven Strategy", desc: "Smarter decisions backed by real insights.", icon: "barchart3" },
    { title: "Transparent Reporting", desc: "Clear dashboards & real-time updates.", icon: "monitor" },
    { title: "Growth Guaranteed", desc: "We're committed to your long-term growth.", icon: "trendingup" }
  ];

  // Growth Funnel Steps (5 steps as per design)
  const growthFunnelSteps = [
    { title: "Understand", desc: "We analyse your business, audience & goals.", icon: "search" },
    { title: "Strategize", desc: "We craft a data-driven marketing strategy.", icon: "layers" },
    { title: "Execute", desc: "We launch & optimize high-performing campaigns.", icon: "rocket" },
    { title: "Measure", desc: "We track, analyse & report real-time results.", icon: "barchart3" },
    { title: "Scale", desc: "We scale what works and maximize growth.", icon: "trendingup" }
  ];

  // Industries (as per design)
  const industries = [
    { title: "Real Estate", icon: "home" },
    { title: "Healthcare", icon: "heart" },
    { title: "Education", icon: "graduationcap" },
    { title: "E-commerce", icon: "shoppingcart" },
    { title: "Service Business", icon: "briefcase" }
  ];

  const industryIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    home: Home,
    heart: Heart,
    graduationcap: GraduationCap,
    shoppingcart: ShoppingCart,
    briefcase: Briefcase
  };

  return (
    <div className="bg-white min-h-screen text-slate-800 antialiased font-body pt-0 pb-0 selection:bg-amber-500/20">
      
      {/* ═══════════════════ 1. HERO SECTION ═══════════════════ */}
      <section className="relative overflow-hidden pt-28 md:pt-32 pb-8 md:pb-10 bg-gradient-to-b from-slate-50/80 via-white to-white">
        
        {/* Subtle bg pattern */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div 
            className="absolute inset-0 opacity-[0.25]"
            style={{
              backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px)`,
              backgroundSize: "22px 22px"
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* ── Left Column: Text & CTAs ── */}
            <div className="lg:col-span-5 flex flex-col items-start text-left pt-4">
              
              {/* Title — "Drives Growth" in amber */}
              <h1 className="service-h1 text-4xl sm:text-5xl lg:text-[54px] leading-[1.12] text-slate-900">
                {heroTitle.includes("Better Marketing Decisions") ? (
                  <>
                    {heroTitle.split("Better Marketing Decisions")[0]}
                    <span className="text-amber-500">Better Marketing Decisions</span>
                    {heroTitle.split("Better Marketing Decisions")[1]}
                  </>
                ) : heroTitle.includes("Quality Leads") ? (
                  <>
                    {heroTitle.split("Quality Leads")[0]}
                    <span className="text-amber-500">Quality Leads</span>
                    {heroTitle.split("Quality Leads")[1]}
                  </>
                ) : heroTitle.includes("Lead Generation") ? (
                  <>
                    {heroTitle.split("Lead Generation")[0]}
                    <span className="text-amber-500">Lead Generation</span>
                    {heroTitle.split("Lead Generation")[1]}
                  </>
                ) : heroTitle.includes("Growing") ? (
                  <>
                    {heroTitle.split("Growing")[0]}
                    <span className="text-amber-500">Growing</span>
                    {heroTitle.split("Growing")[1]}
                  </>
                ) : heroTitle.includes("Drives Growth") ? (
                  <>
                    {heroTitle.split("Drives Growth")[0]}
                    <span className="text-amber-500">Drives Growth</span>
                    {heroTitle.split("Drives Growth")[1]}
                  </>
                ) : heroTitle.includes("Growth") ? (
                  <>
                    {heroTitle.split("Growth")[0]}
                    <span className="text-amber-500">Growth</span>
                    {heroTitle.split("Growth")[1]}
                  </>
                ) : (
                  heroTitle
                )}
              </h1>

              {/* Subtitle */}
              <p className="mt-5 text-sm md:text-[15px] text-slate-500 leading-relaxed font-semibold max-w-md">
                {heroSubtitle}
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-row gap-4 w-full sm:w-auto">
                <a
                  href={`https://wa.me/919986389444?text=Hi%2C%20I'm%20interested%20in%20your%20${encodeURIComponent(serviceName)}%20services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-slate-900 shadow-md shadow-amber-500/15 hover:bg-amber-600 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
                >
                  Chat with Us
                  <FaWhatsapp size={14} className="text-slate-900" />
                </a>

                <a
                  href="tel:+919986389444"
                  className="group flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-5 py-3.5 text-xs font-black uppercase tracking-wider text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:scale-[1.01] active:scale-95 transition-all"
                >
                  +91 99863 89444
                  <Phone size={14} className="text-slate-700 stroke-[2.5]" />
                </a>
              </div>

            </div>

            {/* ── Right Column: Performance Dashboard Cards ── */}
            <div className="lg:col-span-7 w-full flex flex-col gap-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                
                {/* Main Performance Overview Card */}
                <div className="sm:col-span-7 lg:col-span-7 xl:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.04)] font-sans flex flex-col justify-between">
                  
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 shadow-sm shadow-amber-500/10">
                        <BarChart3 size={18} className="text-white stroke-[2.5]" />
                      </div>
                      <span className="text-base font-black text-slate-800 tracking-tight">Performance Overview</span>
                    </div>

                    {/* 4 Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                      <div className="bg-slate-50/70 rounded-xl p-3">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Leads Generated</span>
                        <span className="text-xl sm:text-2xl font-black text-slate-900 block leading-none mt-1.5">2,548</span>
                        <span className="text-[9px] font-bold text-green-500 mt-1 block">↑ 28.6%</span>
                      </div>
                      <div className="bg-slate-50/70 rounded-xl p-3">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Conversions</span>
                        <span className="text-xl sm:text-2xl font-black text-slate-900 block leading-none mt-1.5">4.32K</span>
                        <span className="text-[9px] font-bold text-green-500 mt-1 block">↑ 31.2%</span>
                      </div>
                      <div className="bg-slate-50/70 rounded-xl p-3">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Revenue Generated</span>
                        <span className="text-xl sm:text-2xl font-black text-slate-900 block leading-none mt-1.5">₹23.5L</span>
                        <span className="text-[9px] font-bold text-green-500 mt-1 block">↑ 34.8%</span>
                      </div>
                      <div className="bg-slate-50/70 rounded-xl p-3">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Cost per Lead</span>
                        <span className="text-xl sm:text-2xl font-black text-slate-900 block leading-none mt-1.5">₹135</span>
                        <span className="text-[9px] font-bold text-green-500 mt-1 block">↓ 18.7%</span>
                      </div>
                    </div>

                    {/* Line Chart Area */}
                    <div className="relative h-[130px] w-full">
                      {/* Legend */}
                      <div className="absolute top-0 right-0 flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                          <span className="text-[9px] font-bold text-slate-400">Leads</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                          <span className="text-[9px] font-bold text-slate-400">Conversions</span>
                        </div>
                      </div>
                      {/* SVG Chart */}
                      <svg className="w-full h-full" viewBox="0 0 400 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Grid lines */}
                        <line x1="0" y1="20" x2="400" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="0" y1="60" x2="400" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="0" y1="100" x2="400" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                        {/* Leads line (amber) */}
                        <path d="M0 90 Q 50 85, 80 70 T 160 50 T 240 65 T 320 35 T 400 20" stroke="#F59E0B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        {/* Conversions line (blue) */}
                        <path d="M0 105 Q 50 100, 80 90 T 160 70 T 240 80 T 320 50 T 400 30" stroke="#3B82F6" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="6 4" />
                        {/* X-axis labels */}
                        <text x="0" y="123" fill="#94a3b8" fontSize="9" fontWeight="600">Apr 7</text>
                        <text x="90" y="123" fill="#94a3b8" fontSize="9" fontWeight="600">Apr 14</text>
                        <text x="185" y="123" fill="#94a3b8" fontSize="9" fontWeight="600">Apr 21</text>
                        <text x="280" y="123" fill="#94a3b8" fontSize="9" fontWeight="600">Apr 28</text>
                        <text x="370" y="123" fill="#94a3b8" fontSize="9" fontWeight="600">May 5</text>
                      </svg>
                    </div>
                  </div>

                  {/* Active Platforms Row */}
                  <div className="mt-4 pt-4 border-t border-slate-100/60 flex items-center gap-3">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Active Platforms</span>
                    <div className="flex items-center gap-2 ml-auto">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 border border-slate-100/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:scale-105 hover:bg-slate-100 transition-all"><GoogleBrandIcon className="w-3.5 h-3.5" /></div>
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 border border-slate-100/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:scale-105 hover:bg-slate-100 transition-all"><FacebookBrandIcon className="w-3.5 h-3.5" /></div>
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 border border-slate-100/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:scale-105 hover:bg-slate-100 transition-all"><LinkedInBrandIcon className="w-3.5 h-3.5" /></div>
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 border border-slate-100/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:scale-105 hover:bg-slate-100 transition-all"><YouTubeBrandIcon className="w-3.5 h-3.5" /></div>
                    </div>
                  </div>
                </div>

                {/* Right sidebar cards */}
                <div className="sm:col-span-5 lg:col-span-5 xl:col-span-4 flex flex-col gap-4">
                  
                  {/* Traffic Growth Card */}
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_4px_25px_rgba(0,0,0,0.04)] font-sans flex flex-col justify-between h-[135px] shrink-0">
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Traffic Growth</span>
                      <span className="text-3xl font-black text-emerald-600 block leading-none mt-2">+64.2%</span>
                    </div>
                    <span className="text-[9px] font-bold text-slate-400/85 block mt-2">
                      <span className="text-emerald-500">↑ 12.4%</span> vs last week
                    </span>
                  </div>

                  {/* Channel Mix Card */}
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_4px_25px_rgba(0,0,0,0.04)] font-sans flex flex-col justify-between flex-grow">
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-3.5">Channel Mix</span>
                      
                      {/* Donut chart visual */}
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 shrink-0 relative">
                          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#f1f5f9" strokeWidth="5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#3B82F6" strokeWidth="5" strokeDasharray="35 65" strokeDashoffset="0" strokeLinecap="round" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#F59E0B" strokeWidth="5" strokeDasharray="25 75" strokeDashoffset="-35" strokeLinecap="round" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#10B981" strokeWidth="5" strokeDasharray="20 80" strokeDashoffset="-60" strokeLinecap="round" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#8B5CF6" strokeWidth="5" strokeDasharray="15 85" strokeDashoffset="-80" strokeLinecap="round" />
                          </svg>
                        </div>
                        <div className="flex flex-col gap-1.5 text-[9px] font-bold text-slate-600">
                          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />Google Ads 40%</div>
                          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />Meta Ads 28%</div>
                          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />Organic Search 18%</div>
                          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-violet-500 shrink-0" />Social Media 7%</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100/60 text-[9px] font-bold text-slate-400">
                      Primary Source: <span className="text-blue-500">Google Search</span>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* ── Hero Bottom Bullets ── */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full border-t border-slate-100 pt-10">
            {heroBullets.map((bullet, idx) => {
              const BulletIcon = iconMap[bullet.icon] || TrendingUp;
              return (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 border border-slate-200/60 shrink-0">
                    <BulletIcon size={20} className="text-slate-600 stroke-[1.8]" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-black text-slate-800 tracking-tight leading-tight">
                      {bullet.title}
                    </h3>
                    <p className="text-[11px] font-semibold text-slate-400 leading-relaxed mt-1">
                      {bullet.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ═══════════════════ 2. OUR SERVICES — Complete Digital Marketing Solutions ═══════════════════ */}
      <section id="marketing-services" className="pt-6 md:pt-10 pb-12 md:pb-20 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-500 mb-3 font-sans">
            OUR SERVICES
          </p>
          <h2 className="text-2xl md:text-[32px] font-black text-slate-900 tracking-tight mt-3 font-sans leading-tight">
            Complete Digital Marketing Solutions
          </h2>
        </div>

        {/* 3×2 Grid — horizontal card layout matching design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => {
            const config = getMarketingServiceConfig(svc.title, svc.icon);
            const SvcIcon = config.IconSvg;
            return (
              <Link
                href={svc.href}
                key={i}
                className={`group bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)] transition-all duration-300 flex gap-5 items-start font-sans relative cursor-pointer ${config.borderColor}`}
              >
                {/* Branded SVG Icon */}
                <div className="w-12 h-12 shrink-0 mt-0.5">
                  <SvcIcon className="w-full h-full" />
                </div>
                {/* Text */}
                <div className="flex flex-col justify-start pr-8">
                  <h3 className="text-sm font-black text-slate-800 tracking-tight leading-snug group-hover:text-slate-900 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-[11px] font-semibold text-slate-500 mt-1.5 leading-relaxed">
                    {svc.description}
                  </p>
                </div>
                {/* Arrow */}
                <div className="absolute top-1/2 -translate-y-1/2 right-5 text-slate-300 transition-all duration-300 group-hover:translate-x-1">
                  <ArrowRight size={16} className={`stroke-[2.5] ${config.arrowColor}`} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════ 3. HOW WE DRIVE RESULTS — Our Growth Funnel ═══════════════════ */}
      <section className="py-12 md:py-20 bg-slate-50/50 border-t border-b border-slate-100/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-500 mb-3 font-sans">
              HOW WE DRIVE RESULTS
            </p>
            <h2 className="text-2xl md:text-[32px] font-black text-slate-900 tracking-tight mt-3 font-sans leading-tight">
              Our Growth Funnel
            </h2>
          </div>

          {/* 5-Step horizontal funnel */}
          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="absolute top-[38px] left-[5%] right-[5%] h-[2px] bg-slate-200/60 hidden lg:block z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 items-start relative z-10">
              {growthFunnelSteps.map((step, idx) => {
                const StepIcon = iconMap[step.icon.toLowerCase()] || Search;
                return (
                  <div key={idx} className="flex flex-col items-center text-center group">
                    <div className="relative flex items-center gap-3">
                      <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm group-hover:border-amber-500 transition-all shrink-0">
                        <StepIcon className="w-8 h-8 text-amber-500 stroke-[1.5]" />
                      </div>
                      {/* Arrow connector (except last) */}
                      {idx < growthFunnelSteps.length - 1 && (
                        <ArrowRight size={16} className="text-amber-500/50 hidden lg:block absolute -right-8 top-1/2 -translate-y-1/2 stroke-[2]" />
                      )}
                    </div>

                    <h4 className="text-xs font-black text-slate-800 tracking-tight mt-4 leading-tight font-sans">
                      {step.title}
                    </h4>
                    <p className="text-[10px] font-semibold text-slate-500 mt-1.5 leading-relaxed max-w-[140px] mx-auto font-sans">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════ 4. WHY CHOOSE CLEVER CROW + METRICS DASHBOARD ═══════════════════ */}
      <section className="py-12 md:py-20 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Why Choose */}
          <div className="lg:col-span-5">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-500 mb-3 font-sans">
              WHY CHOOSE CLEVER CROW
            </p>
            <h2 className="text-2xl md:text-[28px] font-black text-slate-900 tracking-tight leading-tight font-sans mb-6">
              Your Growth. Our Priority.
            </h2>
            <div className="flex flex-col gap-4 font-sans">
              {whyChoose.slice(0, 5).map((point, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white shrink-0 shadow-sm mt-0.5">
                    <Check size={11} className="stroke-[3.5]" />
                  </div>
                  <span className="text-[13px] font-bold text-slate-700 leading-snug">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 4-Card Metrics Dashboard */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Leads Generated Card */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm font-sans">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Leads Generated</span>
                <span className="text-2xl font-black text-slate-900 block leading-none mt-1.5">2.54K</span>
                <span className="text-[9px] font-bold text-green-500 block mt-1">↑ 28.6% <span className="text-slate-400">vs last 30 days</span></span>
                <div className="w-full h-8 mt-2">
                  <svg className="w-full h-full text-green-500" viewBox="0 0 100 30" fill="none">
                    <defs><linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="currentColor" stopOpacity="0.2"/><stop offset="100%" stopColor="currentColor" stopOpacity="0"/></linearGradient></defs>
                    <path d="M0 25 Q15 20,30 22 T60 12 T100 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    <path d="M0 25 Q15 20,30 22 T60 12 T100 5 L100 30 L0 30Z" fill="url(#lg1)"/>
                  </svg>
                </div>
              </div>

              {/* Conversions Card */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm font-sans">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Conversions</span>
                <span className="text-2xl font-black text-slate-900 block leading-none mt-1.5">4.32K</span>
                <span className="text-[9px] font-bold text-green-500 block mt-1">↑ 31.2% <span className="text-slate-400">vs last 30 days</span></span>
                <div className="w-full h-8 mt-2">
                  <svg className="w-full h-full text-blue-500" viewBox="0 0 100 30" fill="none">
                    <defs><linearGradient id="lg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="currentColor" stopOpacity="0.2"/><stop offset="100%" stopColor="currentColor" stopOpacity="0"/></linearGradient></defs>
                    <path d="M0 28 Q20 22,40 18 T80 8 T100 3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    <path d="M0 28 Q20 22,40 18 T80 8 T100 3 L100 30 L0 30Z" fill="url(#lg2)"/>
                  </svg>
                </div>
              </div>

              {/* Cost per Lead Card */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm font-sans">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Cost per Lead</span>
                <span className="text-2xl font-black text-slate-900 block leading-none mt-1.5">₹135</span>
                <span className="text-[9px] font-bold text-green-500 block mt-1">↓ 18.7% <span className="text-slate-400">vs last 30 days</span></span>
                <div className="w-full h-8 mt-2">
                  <svg className="w-full h-full text-amber-500" viewBox="0 0 100 30" fill="none">
                    <defs><linearGradient id="lg3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="currentColor" stopOpacity="0.2"/><stop offset="100%" stopColor="currentColor" stopOpacity="0"/></linearGradient></defs>
                    <path d="M0 8 Q20 10,40 15 T80 22 T100 25" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    <path d="M0 8 Q20 10,40 15 T80 22 T100 25 L100 30 L0 30Z" fill="url(#lg3)"/>
                  </svg>
                </div>
              </div>

            </div>

            {/* Revenue Generated Card — Full Width */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm font-sans mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Revenue Generated</span>
                  <span className="text-2xl font-black text-slate-900 block leading-none mt-1.5">₹23,51,600</span>
                  <span className="text-[9px] font-bold text-green-500 block mt-1">↑ 34.8% vs last 30 days</span>
                </div>
                {/* Bar chart visual */}
                <div className="flex items-end gap-1.5 h-16">
                  {[28, 35, 22, 40, 32, 48, 38, 55, 45, 60, 52, 65].map((h, i) => (
                    <div
                      key={i}
                      className="w-3 rounded-t-sm bg-amber-500"
                      style={{ height: `${h}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ═══════════════════ 5. INDUSTRIES STRIP ═══════════════════ */}
      <section className="py-10 md:py-14 bg-slate-50/50 border-t border-b border-slate-100/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {industries.map((ind, i) => {
              const IndIcon = industryIconMap[ind.icon] || Building;
              return (
                <div key={i} className="flex flex-col items-center text-center gap-3 group">
                  <IndIcon size={36} className="text-slate-400 group-hover:text-amber-500 stroke-[1.3] transition-colors" />
                  <span className="text-xs font-black text-slate-700 tracking-tight">
                    {ind.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 6. FAQs ═══════════════════ */}
      <section id="contact-form" className="py-12 md:py-20 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Title */}
          <div className="lg:col-span-4">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-500 mb-3 font-sans">
              FREQUENTLY ASKED QUESTIONS
            </p>
            <h2 className="text-2xl md:text-[28px] font-black text-slate-900 tracking-tight leading-tight font-sans">
              Got Questions?<br />We&apos;ve Got Answers.
            </h2>
          </div>

          {/* Right: FAQ accordion in 2-column grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
              {faqs.map((faq, i) => (
                <div 
                  key={i} 
                  className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-[0_2px_15px_rgba(0,0,0,0.01)] transition-colors hover:border-amber-500/30"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="flex w-full items-center justify-between text-left font-bold text-slate-800 text-[12px] md:text-[13px] hover:text-amber-500 transition-colors gap-3"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown size={16} className={`text-slate-400 shrink-0 transition-transform duration-200 ${activeFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.18, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-1 pt-3 text-[11px] font-semibold text-slate-500 leading-relaxed border-t border-slate-100/50 mt-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════ 7. BOTTOM CTA BANNER ═══════════════════ */}
      <section className="py-6 md:py-8 max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="bg-amber-500 rounded-[2rem] p-6 md:px-10 md:py-8 text-slate-950 shadow-md relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            
            {/* Left Side: Inline leaf/feather icon + Text content */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-4 md:gap-6 w-full lg:w-auto text-center sm:text-left">
              <div className="shrink-0 text-slate-950 flex items-center justify-center">
                <svg className="w-16 h-16 md:w-20 md:h-20" viewBox="10 50 270 210" fill="currentColor">
                  {/* Stylized bird silhouette path from brand logo */}
                  <path d="M261.587,141.693c-9.76,20.75-25.32,39.43-60.4,54.58-5.81,5.6-8.5,14.13-7.88,19.31.62,5.19,3.32,23.87,3.32,23.87,0,0,21.47,4.99,25.15,10.64-7.2,1.41-14.64,2.14-22.25,2.14-13.47,0-26.41-2.29-38.44-6.51,3.81-3.02,13.38-5.01,24.34-6.06-.21-3.32-1.46-8.51-1.46-8.51,0,0-13.69-12.25-8.71-15.77,4.98-3.53,8.29-8.94,8.29-13.09-11.08,1.21-40.51,6.76-71.18,10.61-6.08.76-12.22,1.46-18.27,2.05-37.35,10.79-68.28,21.17-73.78,20.55,28.3-17.6,53.5-33.29,75.44-47.03,53.37-33.44,87.42-55.34,99.62-65.05,17.23-13.69,13.08-31.33-.62-40.47-17.64-2.49-24.7-2.69-34.45,3.53,4.98-11.21,11.41-19.09,32.79-20.96,16.19-11,35.07-16.19,54.79,2.7,19.72,18.88,23.45,52.71,13.7,73.47Z" />
                  {/* Eye of the bird (colored to match bg-amber-500 exactly) */}
                  <ellipse cx="218.699" cy="66.896" rx="5" ry="2.5" fill="#f59e0b" />
                </svg>
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl md:text-[22px] font-black leading-tight text-slate-950 font-sans">
                  Ready to Grow Your Business?
                </h3>
                <p className="text-xs md:text-sm font-bold text-slate-950/80 mt-1 max-w-lg leading-relaxed">
                  Let&apos;s build a digital marketing strategy that drives more leads, more sales, and more growth.
                </p>
              </div>
            </div>

            {/* Right Side: Horizontal Actions */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0 font-sans">
              <a
                href="#contact-form"
                className="flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 text-white hover:scale-[1.01] active:scale-95 transition-all px-6 py-3.5 rounded-xl font-black text-xs shadow-sm cursor-pointer whitespace-nowrap"
              >
                <span>Get a Free Growth Plan</span>
                <ArrowRight size={13} className="stroke-[3]" />
              </a>

              <a
                href={`https://wa.me/919986389444?text=Hi%2C%20I'm%20interested%20in%20your%20${encodeURIComponent(serviceName)}%20service.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 hover:scale-[1.01] active:scale-95 transition-all px-6 py-3.5 rounded-xl text-slate-950 font-bold text-xs shadow-sm whitespace-nowrap"
              >
                <MessageSquare size={16} className="text-slate-950 shrink-0 stroke-[2.5]" />
                <span>Talk to an Expert</span>
              </a>
            </div>

          </div>
        </div>

      </section>

    </div>
  );
}
