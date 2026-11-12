import React from "react";
import { SiMeta } from "react-icons/si";

// "Partner of" strip under the hero: Google Partner + Meta Business Partner.
// Shown only on pages that set `partnerBadges: true` in page-content.ts.
// If you have Google's official Partner badge embed code, it can replace the Google card below.

function GoogleG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export default function PartnerBadges() {
  return (
    <div className="mt-12 border-t border-white/10 py-8 sm:mt-14 lg:mt-16">
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-start sm:gap-8">
        <p className="shrink-0 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Partner of</p>
        <span className="hidden h-12 w-px bg-white/15 sm:block" aria-hidden="true" />
        <ul className="flex items-center gap-3 sm:gap-4">
          <li className="flex h-16 items-center gap-3 rounded-xl bg-white px-4 shadow-sm sm:h-[72px] sm:px-5">
            <GoogleG className="h-8 w-8 shrink-0 sm:h-9 sm:w-9" />
            <span className="leading-tight">
              <span className="block text-[15px] font-bold text-slate-800 sm:text-base">Google</span>
              <span className="block text-xs font-medium text-slate-500 sm:text-[13px]">Partner</span>
            </span>
          </li>
          <li className="flex h-16 items-center gap-3 rounded-xl bg-white px-4 shadow-sm sm:h-[72px] sm:px-5">
            <SiMeta className="h-8 w-8 shrink-0 sm:h-9 sm:w-9" style={{ color: "#0866FF" }} aria-hidden="true" />
            <span className="leading-tight">
              <span className="block text-[15px] font-bold text-slate-800 sm:text-base">Meta</span>
              <span className="block text-xs font-medium text-slate-500 sm:text-[13px]">Business Partner</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
