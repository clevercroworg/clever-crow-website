"use client";

import { useState } from "react";
import Link from "next/link";
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
  Database,
  Monitor,
  Users,
  Award,
  Network,
  Pencil,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

// Map string identifiers to Lucide Icon components
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
  database: Database,
  monitor: Monitor,
  users: Users,
  award: Award,
  network: Network
};

// ─── High-Fidelity Custom SVG Icons for App Development Services ───
function MobileAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="2" width="14" height="20" rx="3" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5" />
      <rect x="10" y="4" width="4" height="1" rx="0.5" fill="#3B82F6" />
      <rect x="8" y="7" width="3" height="3" rx="0.5" fill="#3B82F6" opacity="0.6" />
      <rect x="13" y="7" width="3" height="3" rx="0.5" fill="#F59E0B" opacity="0.7" />
      <rect x="8" y="12" width="8" height="4" rx="1" fill="#3B82F6" />
      <circle cx="12" cy="19" r="1" fill="#3B82F6" />
    </svg>
  );
}

function WebAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="20" height="13" rx="2" fill="#FAF5FF" stroke="#8B5CF6" strokeWidth="1.5" />
      <path d="M9 16h6v4H9z" fill="#E9D5FF" />
      <line x1="6" y1="20" x2="18" y2="20" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 11l4-4 4 3 6-5" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="19" cy="5" r="1.5" fill="#10B981" />
      <circle cx="9" cy="7" r="1" fill="#10B981" />
    </svg>
  );
}

function SaasProductIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="5" rx="1" fill="#EEF2F6" stroke="#4F46E5" strokeWidth="1.5" />
      <rect x="3" y="10" width="18" height="5" rx="1" fill="#EEF2F6" stroke="#4F46E5" strokeWidth="1.5" />
      <rect x="3" y="17" width="18" height="5" rx="1" fill="#EEF2F6" stroke="#4F46E5" strokeWidth="1.5" />
      <circle cx="6" cy="5.5" r="0.75" fill="#10B981" />
      <circle cx="6" cy="12.5" r="0.75" fill="#10B981" />
      <circle cx="6" cy="19.5" r="0.75" fill="#10B981" />
      <line x1="9" y1="5.5" x2="17" y2="5.5" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9" y1="12.5" x2="15" y2="12.5" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9" y1="19.5" x2="16" y2="19.5" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CrmDashboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="20" height="18" rx="2" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="1.5" />
      <circle cx="8" cy="12" r="4" stroke="#EF4444" strokeWidth="1.2" fill="none" />
      <circle cx="8" cy="12" r="2" fill="#EF4444" />
      <rect x="14" y="8" width="5" height="2" rx="0.5" fill="#F59E0B" />
      <rect x="14" y="12" width="5" height="2" rx="0.5" fill="#94A3B8" />
      <rect x="14" y="16" width="4" height="2" rx="0.5" fill="#94A3B8" />
    </svg>
  );
}

function BookingSystemIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="16" rx="2" fill="#FFF5F5" stroke="#F87171" strokeWidth="1.5" />
      <path d="M3 8h18" stroke="#F87171" strokeWidth="1.5" />
      <circle cx="15" cy="14" r="3.5" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="1.2" />
      <path d="M15 12.5V14h1" stroke="#F59E0B" strokeWidth="1" strokeLinecap="round" />
      <rect x="6" y="11" width="2" height="2" rx="0.5" fill="#F87171" />
      <rect x="9" y="11" width="2" height="2" rx="0.5" fill="#F87171" />
      <rect x="6" y="15" width="2" height="2" rx="0.5" fill="#F87171" />
    </svg>
  );
}

function AdminPanelIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="20" height="18" rx="2" fill="#F0FDF4" stroke="#10B981" strokeWidth="1.5" />
      <path d="M12 7c2 0 4 1 4 3v3c0 2-2 4-4 5-2-1-4-3-4-5V10c0-2 2-3 4-3Z" fill="#10B981" opacity="0.3" stroke="#10B981" strokeWidth="1.2" />
      <circle cx="12" cy="11.5" r="1" fill="#10B981" />
      <line x1="12" y1="12.5" x2="12" y2="14.5" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="5" y1="6" x2="9" y2="6" stroke="#94A3B8" strokeWidth="1.2" />
    </svg>
  );
}

function CustomerPortalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="20" height="18" rx="2" fill="#F0F9FF" stroke="#0EA5E9" strokeWidth="1.5" />
      <circle cx="8" cy="11" r="2" fill="#0EA5E9" />
      <path d="M4 16.5c0-1.5 1.5-2.5 4-2.5s4 1 4 2.5v.5H4v-.5Z" fill="#0EA5E9" opacity="0.6" />
      <circle cx="16" cy="11" r="2" fill="#F59E0B" />
      <path d="M12 16.5c0-1.5 1.5-2.5 4-2.5s4 1 4 2.5v.5h-8v-.5Z" fill="#F59E0B" opacity="0.6" />
      <line x1="2" y1="7" x2="22" y2="7" stroke="#0EA5E9" strokeWidth="1" />
    </svg>
  );
}

const serviceIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  smartphone: MobileAppIcon,
  monitor: WebAppIcon,
  database: SaasProductIcon,
  target: CrmDashboardIcon,
  calendar: BookingSystemIcon,
  shield: AdminPanelIcon,
  users: CustomerPortalIcon
};

const technologies = [
  {
    name: "React",
    svg: (
      <svg className="w-8 h-8 text-[#61DAFB]" viewBox="-11.5 -10.23 23 20.463" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
        <g stroke="currentColor" strokeWidth="1">
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
      <svg className="w-8 h-8 text-black" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="90" cy="90" r="90" fill="currentColor"/>
        <path d="M149.508 157.52L69.142 54H54v72h13.5v-47.51l67.234 86.816a90.4 90.4 0 0014.774-17.786z" fill="white"/>
        <path d="M115.5 54h13.5v72h-13.5z" fill="white"/>
      </svg>
    )
  },
  {
    name: "Node.js",
    svg: (
      <svg className="w-8 h-8 text-[#339933]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0 l8.795-5.076c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/>
      </svg>
    )
  },
  {
    name: "Flutter",
    svg: (
      <svg className="w-8 h-8 text-[#02569B]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z"/>
      </svg>
    )
  },
  {
    name: "Dart",
    svg: (
      <svg className="w-8 h-8 text-[#00B4AB]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.105 4.105S9.158 1.58 11.684.316a3.079 3.079 0 0 1 1.481-.315c.766.047 1.677.788 1.677.788L24 9.948v9.789h-4.263V24H9.789l-9-9C.303 14.5 0 13.795 0 13.105c0-.319.18-.818.316-1.105l3.789-7.895zm.679.679v11.787c.002.543.021 1.024.498 1.508L10.204 23h8.533v-4.263L4.784 4.784zm12.055-.678c-.899-.896-1.809-1.78-2.74-2.643-.302-.267-.567-.468-1.07-.462-.37.014-.87.195-.87.195L6.341 4.105l10.498.001z"/>
      </svg>
    )
  },
  {
    name: "PostgreSQL",
    svg: (
      <svg className="w-8 h-8 text-[#336791]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698zM2.371 11.8765c-.7435-2.4358-1.1779-4.8851-1.2123-5.5719-.1086-2.1714.4171-3.6829 1.5623-4.4927 1.8367-1.2986 4.8398-.5408 6.108-.13-.0032.0032-.0066.0061-.0098.0094-2.0238 2.044-1.9758 5.536-1.9708 5.7495-.0002.0823.0066.1989.0162.3593.0348.5873.0996 1.6804-.0735 2.9184-.1609 1.1504.1937 2.2764.9728 3.0892.0806.0841.1648.1631.2518.2374-.3468.3714-1.1004 1.1926-1.9025 2.1576-.5677.6825-.9597.5517-1.0886.5087-.3919-.1307-.813-.5871-1.2381-1.3223-.4796-.839-.9635-2.0317-1.4155-3.5126zm6.0072 5.0871c-.1711-.0428-.3271-.1132-.4322-.1772.0889-.0394.2374-.0902.4833-.1409 1.2833-.2641 1.4815-.4506 1.9143-1.0002.0992-.126.2116-.2687.3673-.4426a.3549.3549 0 0 0 .0737-.1298c.1708-.1513.2724-.1099.4369-.0417.156.0646.3078.26.3695.4752.0291.1016.0619.2945-.0452.4444-.9043 1.2658-2.2216 1.2494-3.1676 1.0128zm2.094-3.988-.0525.141c-.133.3566-.2567.6881-.3334 1.003-.6674-.0021-1.3168-.2872-1.8105-.8024-.6279-.6551-.9131-1.5664-.7825-2.5004.1828-1.3079.1153-2.4468.079-3.0586-.005-.0857-.0095-.1607-.0122-.2199.2957-.2621 1.6659-.9962 2.6429-.7724.4459.1022.7176.4057.8305.928.5846 2.7038.0774 3.8307-.3302 4.7363-.084.1866-.1633.3629-.2311.5454zm7.3637 4.5725c-.0169.1768-.0358.376-.0618.5959l-.146.4383a.3547.3547 0 0 0-.0182.1077c-.0059.4747-.054.6489-.115.8693-.0634.2292-.1353.4891-.1794 1.0575-.11 1.4143-.8782 2.2267-2.4172 2.5565-1.5155.3251-1.7843-.4968-2.0212-1.2217a6.5824 6.5824 0 0 0-.0769-.2266c-.2154-.5858-.1911-1.4119-.1574-2.5551.0165-.5612-.0249-1.9013-.3302-2.6462.0044-.2932.0106-.5909.019-.8918a.3529.3529 0 0 0-.0153-.1126 1.4927 1.4927 0 0 0-.0439-.208c-.1226-.4283-.4213-.7866-.7797-.9351-.1424-.059-.4038-.1672-.7178-.0869.067-.276.1831-.5875.309-.9249l.0529-.142c.0595-.16.134-.3257.213-.5012.4265-.9476 1.0106-2.2453.3766-5.1772-.2374-1.0981-1.0304-1.6343-2.2324-1.5098-.7207.0746-1.3799.3654-1.7088.5321a5.6716 5.6716 0 0 0-.1958.1041c.0918-1.1064.4386-3.1741 1.7357-4.4823a4.0306 4.0306 0 0 1 .3033-.276.3532.3532 0 0 0 .1447-.0644c.7524-.5706 1.6945-.8506 2.802-.8325.4091.0067.8017.0339 1.1742.081 1.939.3544 3.2439 1.4468 4.0359 2.3827.8143.9623 1.2552 1.9315 1.4312 2.4543-1.3232-.1346-2.2234.1268-2.6797.779-.9926 1.4189.543 4.1729 1.2811 5.4964.1353.2426.2522.4522.2889.5413.2403.5825.5515.9713.7787 1.2552.0696.087.1372.1714.1885.245-.4008.1155-1.1208.3825-1.0552 1.717-.0123.1563-.0423.4469-.0834.8148-.0461.2077-.0702.4603-.0994.7662zm.8905-1.6211c-.0405-.8316.2691-.9185.5967-1.0105a2.8566 2.8566 0 0 0 .135-.0406 1.202 1.202 0 0 0 .1342.103c.5703.3765 1.5823.4213 3.0068.1344-.2016.1769-.5189.3994-.9533.6011-.4098.1903-1.0957.333-1.7473.3636-.7197.0336-1.0859-.0807-1.1721-.151zm.5695-9.2712c-.0059.3508-.0542.6692-.1054 1.0017-.055.3576-.112.7274-.1264 1.1762-.0142.4368.0404.8909.0932 1.3301.1066.887.216 1.8003-.2075 2.7014a3.5272 3.5272 0 0 1-.1876-.3856c-.0527-.1276-.1669-.3326-.3251-.6162-.6156-1.1041-2.0574-3.6896-1.3193-4.7446.3795-.5427 1.3408-.5661 2.1781-.463zm.2284 7.0137a12.3762 12.3762 0 0 0-.0853-.1074l-.0355-.0444c.7262-1.1995.5842-2.3862.4578-3.4385-.0519-.4318-.1009-.8396-.0885-1.2226.0129-.4061.0666-.7543.1185-1.0911.0639-.415.1288-.8443.1109-1.3505.0134-.0531.0188-.1158.0118-.1902-.0457-.4855-.5999-1.938-1.7294-3.253-.6076-.7073-1.4896-1.4972-2.6889-2.0395.5251-.1066 1.2328-.2035 2.0244-.1859 2.0515.0456 3.6746.8135 4.8242 2.2824a.908.908 0 0 1 .0667.1002c.7231 1.3556-.2762 6.2751-2.9867 10.5405zm-8.8166-6.1162c-.025.1794-.3089.4225-.6211.4225a.5821.5821 0 0 1-.0809-.0056c-.1873-.026-.3765-.144-.5059-.3156-.0458-.0605-.1203-.178-.1055-.2844.0055-.0401.0261-.0985.0925-.1488.1182-.0894.3518-.1226.6096-.0867.3163.0441.6426.1938.6113.4186zm7.9305-.4114c.0111.0792-.049.201-.1531.3102-.0683.0717-.212.1961-.4079.2232a.5456.5456 0 0 1-.075.0052c-.2935 0-.5414-.2344-.5607-.3717-.024-.1765.2641-.3106.5611-.352.297-.0414.6111.0088.6356.1851z"/>
      </svg>
    )
  },
  {
    name: "MongoDB",
    svg: (
      <svg className="w-8 h-8 text-[#47A248]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>
      </svg>
    )
  },
  {
    name: "Firebase",
    svg: (
      <svg className="w-8 h-8 text-[#FFCA28]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.455 8.369c-.538-.748-1.778-2.285-3.681-4.569-.826-.991-1.535-1.832-1.884-2.245a146 146 0 0 0-.488-.576l-.207-.245-.113-.133-.022-.032-.01-.005L12.57 0l-.609.488c-1.555 1.246-2.828 2.851-3.681 4.64-.523 1.064-.864 2.105-1.043 3.176-.047.241-.088.489-.121.738-.209-.017-.421-.028-.632-.033-.018-.001-.035-.002-.059-.003a7.46 7.46 0 0 0-2.28.274l-.317.089-.163.286c-.765 1.342-1.198 2.869-1.252 4.416-.07 2.01.477 3.954 1.583 5.625 1.082 1.633 2.61 2.882 4.42 3.611l.236.095.071.025.003-.001a9.59 9.59 0 0 0 2.941.568q.171.006.342.006c1.273 0 2.513-.249 3.69-.742l.008.004.313-.145a9.63 9.63 0 0 0 3.927-3.335c1.01-1.49 1.577-3.234 1.641-5.042.075-2.161-.643-4.304-2.133-6.371m-7.083 6.695c.328 1.244.264 2.44-.191 3.558-1.135-1.12-1.967-2.352-2.475-3.665-.543-1.404-.87-2.74-.974-3.975.48.157.922.366 1.315.622 1.132.737 1.914 1.902 2.325 3.461zm.207 6.022c.482.368.99.712 1.513 1.028-.771.21-1.565.302-2.369.273a8 8 0 0 1-.373-.022c.458-.394.869-.823 1.228-1.279zm1.347-6.431c-.516-1.957-1.527-3.437-3.002-4.398-.647-.421-1.385-.741-2.194-.95.011-.134.026-.268.043-.4.014-.113.03-.216.046-.313.133-.689.332-1.37.589-2.025.099-.25.206-.499.321-.74l.004-.008c.177-.358.376-.719.61-1.105l.092-.152-.003-.001c.544-.851 1.197-1.627 1.942-2.311l.288.341c.672.796 1.304 1.548 1.878 2.237 1.291 1.549 2.966 3.583 3.612 4.48 1.277 1.771 1.893 3.579 1.83 5.375-.049 1.395-.461 2.755-1.195 3.933-.694 1.116-1.661 2.05-2.8 2.708-.636-.318-1.559-.839-2.539-1.599.79-1.575.952-3.28.479-5.072zm-2.575 5.397c-.725.939-1.587 1.55-2.09 1.856-.081-.029-.163-.06-.243-.093l-.065-.026c-1.49-.616-2.747-1.656-3.635-3.01-.907-1.384-1.356-2.993-1.298-4.653.041-1.19.338-2.327.882-3.379.316-.07.638-.114.96-.131l.084-.002c.162-.003.324-.003.478 0 .227.011.454.035.677.07.073 1.513.445 3.145 1.105 4.852.637 1.644 1.694 3.162 3.144 4.515z"/>
      </svg>
    )
  },
  {
    name: "AWS",
    svg: (
      <svg className="w-8 h-8 text-[#FF9900]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z" />
      </svg>
    )
  }
];

const processSteps = [
  { step: "01", title: "Discover", description: "We understand your business, goals and user needs.", icon: "search" },
  { step: "02", title: "Plan", description: "We plan features, workflows and technical structure.", icon: "pencil" },
  { step: "03", title: "Design", description: "We design intuitive UI/UX that users will love.", icon: "layout" },
  { step: "04", title: "Develop", description: "We build clean, scalable and secure applications.", icon: "code2" },
  { step: "05", title: "Test", description: "We test thoroughly for performance, security and usability.", icon: "checkcircle2" },
  { step: "06", title: "Launch", description: "We deploy smoothly and make your app live.", icon: "rocket" },
  { step: "07", title: "Support", description: "We provide ongoing support and improvements.", icon: "wrench" }
];

const testimonials = [
  {
    quote: "Clever Crow built a custom booking system for our resort. It has simplified our operations and improved customer experience significantly.",
    author: "Rohit Shetty",
    role: "Resort Owner",
    rating: 5,
    avatar: "RS"
  },
  {
    quote: "The custom CRM and dashboard built by Clever Crow has transformed how our sales team manages leads. Our conversion rate increased by 22% in the first quarter.",
    author: "Sneha Iyer",
    role: "Sales Director",
    rating: 5,
    avatar: "SI"
  },
  {
    quote: "Our SaaS MVP was delivered ahead of schedule and with clean, scalable code. Their team's technical expertise and business-first approach was outstanding.",
    author: "David Miller",
    role: "Tech Co-founder",
    rating: 5,
    avatar: "DM"
  }
];

type AppDevServiceLayoutProps = {
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  serviceName: string;
  services: {
    icon: string;
    title: string;
    description: string;
    href: string;
  }[];
  whyChoose: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  pageUrl: string;
};

export default function AppDevServiceLayout({
  eyebrow,
  heroTitle,
  heroSubtitle,
  serviceName,
  services,
  whyChoose,
  faqs,
  pageUrl
}: AppDevServiceLayoutProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const heroBullets = [
    { label: "Business-Focused Solutions", icon: "briefcase" },
    { label: "Scalable & Secure Architecture", icon: "shield" },
    { label: "On-Time Delivery", icon: "calendar" },
    { label: "Ongoing Support You Can Trust", icon: "wrench" }
  ];

  const whyChooseDetailed = [
    { title: "Business-first approach", desc: "We focus on solving real business problems.", icon: "briefcase" },
    { title: "Scalable & future-ready", desc: "Built with modern technology that grows with your business.", icon: "database" },
    { title: "Secure & reliable", desc: "Best practices for security, data protection and performance.", icon: "shield" },
    { title: "User experience-driven", desc: "Intuitive interfaces that enhance user satisfaction.", icon: "layout" },
    { title: "End-to-end support", desc: "From planning to post-launch support, we're with you.", icon: "rocket" },
    { title: "Transparent communication", desc: "Clear updates and collaboration at every step.", icon: "users" }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-800 antialiased font-body pt-0 pb-0 selection:bg-yellow-500/20">
      
      {/* ───────────────── 1. HERO SECTION ───────────────── */}
      <section className="relative overflow-hidden pt-28 md:pt-32 pb-12 md:pb-16 bg-gradient-to-b from-slate-100/60 via-slate-50/50 to-slate-50/20">
        
        {/* Subtle dot grid and radial light flare */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div 
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.05) 1.2px, transparent 1.2px)`,
              backgroundSize: "24px 24px"
            }}
          />
          <div className="absolute top-12 left-12 w-[350px] h-[350px] rounded-full bg-amber-200/10 blur-[90px]" />
          <div className="absolute bottom-12 right-12 w-[400px] h-[400px] rounded-full bg-blue-100/20 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-6 uppercase tracking-wider">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="hover:text-slate-600 transition-colors cursor-default">Services</span>
            <span>/</span>
            <span className="text-amber-500 font-extrabold">{eyebrow}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column (Text, CTAs & Horizontal Bullets) */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              {/* Eyebrow kicker */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/5 text-amber-600 mb-6 font-sans font-black text-[9px] uppercase tracking-widest shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                {eyebrow}
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black leading-[1.12] tracking-tight text-slate-900 font-sans">
                {heroTitle}
              </h1>

              {/* Subtitle */}
              <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed font-medium max-w-xl">
                {heroSubtitle}
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a
                  href="#contact-form"
                  className="group flex items-center justify-center gap-2 rounded-2xl bg-amber-500 px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-900 shadow-md shadow-amber-500/20 hover:bg-amber-600 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
                >
                  Discuss Your App Idea
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="#what-we-build"
                  className="group flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:scale-[1.01] active:scale-95 transition-all"
                >
                  Explore Solutions
                </a>
              </div>

              {/* Spacing Divider */}
              <div className="w-full h-[1px] bg-slate-200/60 my-8" />

              {/* Horizontal Inline Bullets */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {heroBullets.map((bullet, i) => {
                  const BulletIcon = iconMap[bullet.icon] || CheckCircle2;
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 shrink-0">
                        <BulletIcon size={14} className="stroke-[2.5]" />
                      </div>
                      <span className="text-[11px] font-black text-slate-700 tracking-tight leading-snug">
                        {bullet.label}
                      </span>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Right Column (Pure CSS Laptop & Phone Mockups) */}
            <div className="lg:col-span-5 relative w-full flex justify-center items-center">
              
              {/* Device frame wrapper */}
              <div className="relative w-full max-w-[480px] md:max-w-[540px] aspect-[16/11]">
                
                {/* Laptop Mockup Bezel */}
                <div className="relative mx-auto bg-slate-900 border-slate-950 border-[8px] rounded-t-2xl shadow-2xl overflow-hidden aspect-[16/10] w-[90%]">
                  {/* Laptop Web Page Screen */}
                  <div className="w-full h-full relative overflow-hidden bg-slate-50 flex flex-col">
                    {/* Fake Browser Topbar */}
                    <div className="flex items-center gap-1 px-3 py-1 bg-slate-200 border-b border-slate-300/50 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <div className="h-3.5 bg-white border border-slate-300/40 rounded px-4 ml-4 flex-1 max-w-[140px] text-[8px] text-slate-400 font-semibold flex items-center leading-none">
                        clevercrow.in
                      </div>
                    </div>
                    {/* Simulated Web View Background Image */}
                    <div className="flex-1 w-full h-full relative">
                      <img 
                        src="/services/web_design.png" 
                        alt="App Layout Mockup"
                        className="w-full h-full object-cover object-top"
                      />
                      {/* Premium overlay shadow */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Laptop Base */}
                <div className="relative mx-auto bg-slate-800 rounded-b-xl h-[12px] w-[96%] shadow-lg">
                  {/* Trackpad Cutout */}
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 w-16 h-1 bg-slate-900/60 rounded-b-md" />
                </div>

                {/* iPhone Overlapping on bottom right */}
                <div className="absolute bottom-[-10px] right-[4px] w-[105px] md:w-[125px] aspect-[9/18.5] bg-slate-900 border-[5px] border-slate-950 rounded-[1.8rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden hidden sm:block">
                  <div className="w-full h-full relative bg-white flex flex-col">
                    {/* Dynamic Island Notching */}
                    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-10 h-2 bg-slate-950 rounded-full z-20" />
                    {/* Mobile screen background */}
                    <div className="flex-1 w-full h-full relative">
                      <img 
                        src="/images/device-mockup.png" 
                        alt="Mobile App Mockup"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ───────────────── 2. WHAT WE BUILD (SERVICES GRID) ───────────────── */}
      <section id="what-we-build" className="py-10 md:py-16 max-w-7xl mx-auto px-6 lg:px-8 border-t border-slate-100/80">
        
        {/* Title */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-500 mb-3">
            WHAT WE BUILD
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-4 font-sans">
            App Development Services
          </h2>
          <p className="mt-3 text-slate-500 text-sm font-medium">
            We build high-performing mobile apps, web systems, portals, and custom SaaS platforms.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${services.length === 6 ? "md:grid-cols-3 lg:grid-cols-6" : "md:grid-cols-4 lg:grid-cols-7"} gap-4`}>
          {services.map((svc, i) => {
            const ServiceIconComponent = serviceIconMap[svc.icon.toLowerCase().replace(/[^a-z0-9]/g, "")] || MobileAppIcon;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="group relative bg-white border border-slate-200/60 rounded-[2rem] px-5 py-6 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.02)] flex flex-col items-center text-center justify-between min-h-[280px] h-auto cursor-pointer"
              >
                <div className="flex flex-col items-center w-full">
                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center shrink-0">
                    <ServiceIconComponent className="w-full h-full" />
                  </div>
                  {/* Text */}
                  <h3 className="text-xs font-black text-slate-800 tracking-tight mt-5 leading-snug">
                    {svc.title}
                  </h3>
                  <p className="text-[10px] font-semibold text-slate-500 mt-3 leading-relaxed">
                    {svc.description}
                  </p>
                </div>

                {/* Bottom link */}
                <div className="mt-4 flex items-center justify-center gap-1 text-[9px] font-black text-amber-500 uppercase tracking-widest group-hover:text-amber-600 transition-colors">
                  <span>Learn More</span>
                  <ArrowRight size={8} className="stroke-[3] transition-transform group-hover:translate-x-0.5" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </section>

      {/* ───────────────── 3. OUR PROCESS (TIMELINE PROCESS) ───────────────── */}
      <section className="py-10 md:py-16 bg-slate-50/50 border-t border-b border-slate-100/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-500 mb-3">
              OUR PROCESS
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-4 font-sans">
              From Idea to Impact
            </h2>
          </div>

          {/* 7-Step horizontal timeline */}
          <div className="relative">
            {/* Background line connecting elements (desktop only) */}
            <div className="absolute top-[38px] left-[7%] right-[7%] h-[2px] bg-slate-200/60 hidden lg:block z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-8 items-start relative z-10">
              {processSteps.map((step, idx) => {
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
                    <h4 className="text-xs font-black text-slate-800 tracking-tight mt-5 text-center leading-tight">
                      {step.title}
                    </h4>
                    <p className="text-[10px] font-semibold text-slate-500 mt-2 leading-relaxed text-center max-w-[140px] mx-auto">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ───────────────── 4. WHY CHOOSE CLEVER CROW (PIXEL-PERFECT CARD) ───────────────── */}
      <section className="py-8 md:py-12 bg-slate-50/30 border-b border-slate-100/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Main White Border Card Container */}
          <div className="bg-white border border-slate-200/80 rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              
              {/* 1. Phone Mockup (Left) */}
              <div className="lg:col-span-3 flex justify-center">
                <div className="relative w-[190px] aspect-[9/18.5] bg-slate-900 border-[7px] border-slate-950 rounded-[2.2rem] shadow-2xl overflow-hidden shrink-0">
                  {/* Dynamic Island */}
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-3 bg-slate-950 rounded-full z-20" />
                  
                  {/* Screen Content */}
                  <div className="w-full h-full bg-[#18182b] flex flex-col justify-between p-3 text-white font-sans relative">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center text-[8px] font-bold opacity-80 pt-0.5">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-1 bg-white rounded-xs" />
                      </div>
                    </div>

                    {/* Sample App UI Dashboard */}
                    <div className="flex-1 flex flex-col justify-start mt-4 gap-2">
                      <div className="text-[8px] font-black tracking-wider opacity-60">MONTHLY REVENUE</div>
                      <div className="text-base font-black text-white">₹ 45,78,000</div>
                      
                      {/* Mini Bar/Line Chart */}
                      <div className="h-20 flex items-end gap-1 pt-2 relative">
                        {/* Custom visual wave lines */}
                        <div className="absolute inset-x-0 bottom-4 h-[1px] bg-white/10" />
                        <div className="w-full bg-amber-500/25 h-8 rounded-xs" />
                        <div className="w-full bg-amber-500/40 h-12 rounded-xs" />
                        <div className="w-full bg-amber-500 h-18 rounded-xs" />
                        <div className="w-full bg-amber-500/50 h-10 rounded-xs" />
                        <div className="w-full bg-amber-500/70 h-14 rounded-xs" />
                        <div className="w-full bg-amber-500/90 h-16 rounded-xs" />
                      </div>

                      {/* Mini cards list */}
                      <div className="flex flex-col gap-1.5 mt-2 bg-slate-950/40 border border-slate-800/40 rounded-lg p-2">
                        <div className="flex justify-between items-center text-[7px] text-slate-400 font-bold">
                          <span>Top Products</span>
                          <span>Sales</span>
                        </div>
                        <div className="w-full h-[1px] bg-slate-800/40" />
                        <div className="flex justify-between items-center text-[7px] text-white font-black">
                          <span>Product X</span>
                          <span className="text-amber-500">12,450</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Middle Title Block (Middle-Left) */}
              <div className="lg:col-span-4 flex flex-col items-start text-left">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-500 mb-2 leading-none">
                  WHY CHOOSE CLEVER CROW?
                </p>
                <h2 className="text-xl md:text-2xl lg:text-[26px] font-black text-slate-900 tracking-tight leading-tight font-sans">
                  We Build Apps That <br />Drive Real Results
                </h2>
              </div>

              {/* 3. Vertical Divider Line (Desktop only) */}
              <div className="hidden lg:block lg:col-span-1 justify-self-center">
                <div className="w-[1px] h-24 bg-slate-200/60" />
              </div>

              {/* Mobile Horizontal Divider */}
              <div className="w-full h-[1px] bg-slate-200/60 my-2 lg:hidden col-span-1" />

              {/* 4. 2-Column Checklist (Right) */}
              <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {whyChooseDetailed.map((point, i) => {
                  const PointIcon = Check;
                  return (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-slate-950 shrink-0 shadow-sm shadow-amber-500/15">
                        <PointIcon size={11} className="stroke-[3.5]" />
                      </div>
                      <div>
                        <h4 className="text-[12px] font-black text-slate-800 tracking-tight leading-none mb-1">
                          {point.title}
                        </h4>
                        <p className="text-[10px] font-bold text-slate-400 leading-normal">
                          {point.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ───────────────── 5. TECHNOLOGIES WE WORK WITH (PIXEL-PERFECT CARD) ───────────────── */}
      <section className="py-6 md:py-8 bg-slate-50/10 border-b border-slate-100/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="bg-white border border-slate-200/80 rounded-[2rem] py-5 px-6 shadow-sm flex flex-col items-center gap-4">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-slate-400 mb-1 leading-none">
              TECHNOLOGIES WE WORK WITH
            </p>
            
            <div className="flex flex-nowrap justify-start lg:justify-center items-center gap-3.5 md:gap-5 w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-2.5 lg:pb-0">
              {technologies.map((tech, i) => (
                <div key={i} className="flex items-center gap-2 bg-slate-50/50 hover:bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/40 shadow-sm shrink-0 transition-colors cursor-default">
                  <div className="flex items-center justify-center shrink-0 [&_svg]:!h-5 [&_svg]:!w-auto">
                    {tech.svg}
                  </div>
                  <span className="text-[9px] font-black text-slate-700 uppercase tracking-wider">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ───────────────── 6. TESTIMONIALS & FAQ (PIXEL-PERFECT TWO-COLUMN GRID) ───────────────── */}
      <section id="faq-section" className="py-8 md:py-12 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column (Testimonial Card + Banner CTA Stack) */}
          <div className="lg:col-span-6 flex flex-col justify-between relative z-10">
            
            {/* 1. Testimonial Card */}
            <div className="bg-white border border-slate-200/80 rounded-[2rem] p-6 md:p-8 shadow-sm relative flex flex-col justify-between flex-grow min-h-[280px] mb-4">
              
              {/* Navigation Arrows Overlapping Card Edges */}
              <button 
                type="button"
                onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="absolute -left-4 top-[50%] -translate-y-1/2 h-9 w-9 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-md hover:border-amber-500 hover:text-amber-500 hover:shadow-lg hover:shadow-amber-500/10 hover:scale-105 active:scale-95 transition-all z-30 cursor-pointer text-slate-500"
              >
                <ChevronLeft size={16} className="stroke-[2.5]" />
              </button>

              <button 
                type="button"
                onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="absolute -right-4 top-[50%] -translate-y-1/2 h-9 w-9 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-md hover:border-amber-500 hover:text-amber-500 hover:shadow-lg hover:shadow-amber-500/10 hover:scale-105 active:scale-95 transition-all z-30 cursor-pointer text-slate-500"
              >
                <ChevronRight size={16} className="stroke-[2.5]" />
              </button>

              <div className="min-h-[160px] flex-grow flex flex-col justify-between overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="flex flex-col justify-between flex-grow"
                  >
                    <div>
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-amber-500 mb-3 leading-none">
                        BUILT FOR BUSINESSES. LOVED BY CLIENTS.
                      </p>
                      <h3 className="text-base md:text-lg font-black text-slate-900 tracking-tight leading-tight font-sans">
                        Helping businesses automate, simplify and scale.
                      </h3>

                      <div className="mt-6 relative">
                        <span className="text-4xl font-serif text-amber-500/20 absolute -top-4 -left-1 select-none">“</span>
                        <p className="text-xs font-bold text-slate-500 leading-relaxed pl-6 relative z-10 min-h-[50px]">
                          {testimonials[activeTestimonial].quote}
                        </p>
                      </div>
                    </div>

                    {/* Author & Star Rating Footer */}
                    <div className="mt-6 flex items-center justify-between border-t border-slate-100/80 pt-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center font-sans font-black text-xs shrink-0 shadow-sm border border-amber-500/5">
                          {testimonials[activeTestimonial].avatar}
                        </div>
                        <div>
                          <span className="text-xs font-black text-slate-900 block leading-tight">
                            {testimonials[activeTestimonial].author}
                          </span>
                          <span className="text-[9px] font-bold text-slate-400 block mt-1 leading-none">
                            {testimonials[activeTestimonial].role}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-0.5 text-amber-500 text-xs select-none">
                        {"★".repeat(testimonials[activeTestimonial].rating)}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* iOS-Style Progress dots */}
              <div className="flex justify-center gap-1.5 mt-5">
                {testimonials.map((_, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeTestimonial === idx ? "w-6 bg-amber-500" : "w-1.5 bg-slate-200 hover:bg-slate-300"}`}
                  />
                ))}
              </div>

            </div>

            {/* 2. Have an App Idea? Solid Amber Card */}
            <div className="bg-amber-500 rounded-[2rem] p-6 md:p-8 text-slate-950 shadow-md relative overflow-hidden flex items-center justify-between gap-6">
              <div>
                <h4 className="text-base md:text-[17px] font-black leading-tight text-slate-950 font-sans">
                  Have an App Idea?
                </h4>
                <p className="text-[11px] font-bold text-slate-950/80 leading-snug mt-1">
                  Let's build something amazing together.
                </p>
              </div>

              <Link
                href={`/contact?service=${encodeURIComponent(serviceName)}`}
                className="flex items-center justify-center gap-1.5 bg-slate-950 hover:bg-slate-900 text-white hover:scale-[1.01] active:scale-95 transition-all px-5 py-3 rounded-xl font-black text-[11px] shrink-0 shadow-sm cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight size={12} className="stroke-[3.5]" />
              </Link>
            </div>

          </div>

          {/* Right Column (FAQ Card Rows) */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-amber-500 mb-4 leading-none">
              FREQUENTLY ASKED QUESTIONS
            </p>
            <h2 className="text-2xl md:text-[26px] font-black text-slate-900 tracking-tight font-sans mb-8">
              Got Questions? We've Got Answers.
            </h2>

            {/* Stack of individual White Rounded Cards */}
            <div className="flex flex-col gap-4">
              {faqs.map((faq, i) => (
                <div 
                  key={i} 
                  className="bg-white border border-slate-200/80 rounded-2xl p-4 md:p-5 shadow-[0_2px_15px_rgba(0,0,0,0.01)] transition-colors hover:border-amber-500/40"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="flex w-full items-center justify-between text-left font-bold text-slate-800 text-[13px] md:text-[14px] hover:text-amber-500 transition-colors"
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
                        className="overflow-hidden"
                      >
                        <div className="pb-1 pt-4 text-xs font-semibold text-slate-500 leading-relaxed border-t border-slate-100/50 mt-3.5">
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

    </div>
  );
}
