import React from "react";

// Faint marketing-themed line doodles for the hero. Placed only in empty space so they never sit
// behind text or form fields; decorative, so hidden from assistive tech.
const line = { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Sparkle({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`absolute ${className}`} {...line} strokeWidth="2">
      <path d="M12 3v5M12 16v5M3 12h5M16 12h5" />
    </svg>
  );
}

export default function HeroDoodles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* ---------- Desktop ---------- */}
      <div className="absolute inset-0 hidden lg:block">
        {/* Growth chart above the form */}
        <svg viewBox="0 0 300 140" className="absolute -top-2 right-[1%] w-[300px] text-white/[0.16]" {...line} strokeWidth="2">
          <path d="M10 130h280M10 130V10" strokeOpacity="0.6" />
          <path d="M20 110l50-28 45 18 55-48 45 14 60-50" />
          <path d="M20 110l50-28 45 18 55-48 45 14 60-50V130H20z" fill="currentColor" fillOpacity="0.06" stroke="none" />
          <path d="M262 16h15v15" />
          {[[70, 82], [115, 100], [170, 52], [215, 66]].map(([cx, cy]) => (
            <circle key={cx} cx={cx} cy={cy} r="4.5" fill="#FFCE1B" fillOpacity="0.55" stroke="none" />
          ))}
        </svg>

        {/* Dashed arrow from the copy toward the form */}
        <svg viewBox="0 0 160 110" className="absolute left-[56%] top-[30%] w-36 text-[#FFCE1B]/40" {...line} strokeWidth="2.5">
          <path d="M8 92C46 30 100 12 146 30" strokeDasharray="7 9" />
          <path d="M128 18l20 13-21 9" />
        </svg>

        {/* Click cursor beside the form's lower-left corner */}
        <svg viewBox="0 0 64 64" className="absolute bottom-[26%] left-[55%] w-14 text-white/[0.2]" {...line} strokeWidth="2.2">
          <path d="M22 18l24 13-10 3-4 11z" />
          <path d="M14 10l-4-4M22 8V3M30 10l4-4M12 18H7" strokeOpacity="0.8" />
        </svg>

        {/* Megaphone, bottom-right below the form */}
        <svg viewBox="0 0 80 64" className="absolute bottom-[19%] right-[2%] w-20 -rotate-12 text-white/[0.14]" {...line} strokeWidth="2.2">
          <path d="M8 26v12h10l26 14V12L18 26z" />
          <path d="M18 38l4 14h8l-3-12" />
          <path d="M54 22c4 3 4 17 0 20M62 16c8 7 8 25 0 32" />
        </svg>

        {/* Search bar sketch, low between the columns */}
        <svg viewBox="0 0 170 44" className="absolute bottom-[18%] left-[46%] w-40 text-white/[0.12]" {...line} strokeWidth="2">
          <rect x="2" y="2" width="166" height="40" rx="20" />
          <circle cx="24" cy="22" r="7" />
          <path d="M29 27l6 6M48 22h70" />
        </svg>

        <Sparkle className="right-[38%] top-[12%] h-5 w-5 text-[#FFCE1B]/50" />
        <Sparkle className="right-[1%] top-[48%] h-4 w-4 text-white/30" />
        <Sparkle className="left-[50%] top-[64%] h-4 w-4 text-[#FFCE1B]/40" />
      </div>

      {/* ---------- Mobile / tablet: lighter set at the edges ---------- */}
      <div className="absolute inset-0 lg:hidden">
        <svg viewBox="0 0 300 140" className="absolute -right-6 top-2 w-48 text-white/[0.09] sm:w-64" {...line} strokeWidth="2.5">
          <path d="M20 110l50-28 45 18 55-48 45 14 60-50" />
          <path d="M262 16h15v15" />
          {[[70, 82], [170, 52]].map(([cx, cy]) => (
            <circle key={cx} cx={cx} cy={cy} r="5" fill="#FFCE1B" fillOpacity="0.35" stroke="none" />
          ))}
        </svg>
        <Sparkle className="right-6 top-[38%] h-4 w-4 text-[#FFCE1B]/40" />
        <Sparkle className="left-3 top-[30%] h-3 w-3 text-white/25" />
      </div>
    </div>
  );
}
