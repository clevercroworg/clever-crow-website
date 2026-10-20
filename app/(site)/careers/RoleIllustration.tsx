import React from "react";
import { Heart, MessageCircle, Play, Send } from "lucide-react";

// Line-and-shape illustrations matching the hiring posters. Pure markup, so they stay crisp at any size.
// Sizes are percentages of a square box, so the whole drawing scales with its container.

function Sparks({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`absolute ${className}`} aria-hidden="true">
      <path d="M8 30 L2 36 M20 6 V0 M30 14 L37 9" stroke="#F5B800" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

function PostCard({ className }: { className: string }) {
  return (
    <div className={`absolute rounded-[10%] bg-white p-[5%] shadow-[0_20px_40px_-12px_rgba(15,23,42,0.25)] ${className}`}>
      <div className="flex items-center gap-[6%]">
        <span className="aspect-square w-[14%] rounded-full bg-slate-300" />
        <span className="h-[0.35rem] w-[40%] rounded-full bg-slate-200" />
      </div>
      <div className="relative mt-[7%] aspect-[4/3] overflow-hidden rounded-[8%] bg-[#FFE79A]">
        <span className="absolute right-[18%] top-[16%] aspect-square w-[24%] rounded-full bg-[#FFC21A]" />
        <span className="absolute -bottom-[20%] -left-[10%] h-[60%] w-[80%] rounded-[50%] bg-[#FFCE3A]" />
        <span className="absolute -bottom-[30%] right-[-20%] h-[70%] w-[80%] rounded-[50%] bg-[#F5B800]" />
      </div>
      <div className="mt-[7%] flex items-center gap-[8%] text-slate-400">
        <Heart className="h-auto w-[11%] fill-[#F5B800] text-[#F5B800]" />
        <MessageCircle className="h-auto w-[11%]" />
        <Send className="h-auto w-[11%]" />
      </div>
    </div>
  );
}

function PhoneVideo({ className, large = false }: { className: string; large?: boolean }) {
  return (
    <div className={`absolute rounded-[14%] bg-white p-[4%] shadow-[0_24px_48px_-14px_rgba(15,23,42,0.3)] ${className}`}>
      {large && (
        <div className="mb-[6%] flex items-center gap-[6%] px-[2%]">
          <span className="aspect-square w-[12%] rounded-full bg-slate-300" />
          <span className="h-[0.35rem] w-[45%] rounded-full bg-slate-200" />
        </div>
      )}
      <div className="relative aspect-[3/4] overflow-hidden rounded-[10%] bg-gradient-to-b from-[#FFD84D] to-[#F5B800]">
        <span className="absolute -bottom-[10%] left-[-10%] h-[45%] w-[120%] rounded-[50%] bg-[#FFC21A]/80" />
        <span className="absolute left-1/2 top-1/2 flex aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-lg">
          <Play className="ml-[8%] h-auto w-[45%] fill-[#F5B800] text-[#F5B800]" />
        </span>
        {large && (
          <span className="absolute bottom-[10%] left-[10%] right-[10%] h-[3%] rounded-full bg-white/60">
            <span className="absolute inset-y-0 left-0 w-[30%] rounded-full bg-white" />
          </span>
        )}
      </div>
      {large && (
        <div className="mt-[6%] flex items-center gap-[8%] px-[3%] text-slate-400">
          <Heart className="h-auto w-[10%] fill-[#F5B800] text-[#F5B800]" />
          <MessageCircle className="h-auto w-[10%]" />
          <Send className="h-auto w-[10%]" />
        </div>
      )}
    </div>
  );
}

export function SocialIllustration() {
  return (
    <div className="relative aspect-square w-full" aria-hidden="true">
      <Sparks className="right-[4%] top-[2%] w-[12%]" />
      {/* Chat bubble */}
      <div className="absolute right-[10%] top-[8%] flex w-[34%] items-center justify-center gap-[10%] rounded-[30%] bg-gradient-to-b from-[#FFD84D] to-[#F5B800] py-[7%] shadow-[0_16px_30px_-10px_rgba(245,184,0,0.6)] motion-safe:animate-[careers-float_6s_ease-in-out_infinite]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="aspect-square w-[16%] rounded-full bg-white" />
        ))}
        <span className="absolute -bottom-[14%] left-[22%] h-[30%] w-[18%] rotate-45 rounded-sm bg-[#F5B800]" />
      </div>
      <PostCard className="left-[4%] top-[24%] w-[56%] -rotate-3" />
      <PhoneVideo className="right-[4%] top-[44%] w-[34%] rotate-6 motion-safe:animate-[careers-float_7s_ease-in-out_infinite_0.6s]" />
      {/* Hashtag card */}
      <div className="absolute bottom-[2%] left-[16%] w-[34%] -rotate-6 rounded-[12%] bg-white p-[5%] shadow-[0_18px_36px_-12px_rgba(15,23,42,0.25)]">
        <span className="block text-[clamp(1.5rem,6vw,3.5rem)] font-black leading-none text-[#F5B800]">#</span>
        <span className="mt-[10%] block h-[0.4rem] w-[80%] rounded-full bg-slate-200" />
        <span className="mt-[6%] block h-[0.4rem] w-[55%] rounded-full bg-slate-200" />
      </div>
      {/* Heart tile */}
      <div className="absolute bottom-[8%] right-[10%] flex aspect-square w-[16%] items-center justify-center rounded-[22%] bg-white shadow-lg motion-safe:animate-[careers-float_5s_ease-in-out_infinite_1s]">
        <Heart className="h-auto w-[50%] fill-[#F5B800] text-[#F5B800]" />
      </div>
      <Sparks className="bottom-[2%] left-[4%] w-[9%] rotate-180" />
    </div>
  );
}

export function UgcIllustration() {
  return (
    <div className="relative aspect-square w-full" aria-hidden="true">
      <Sparks className="right-[2%] top-[0%] w-[12%]" />
      <PhoneVideo large className="right-[8%] top-[4%] w-[52%] rotate-3" />
      {/* Microphone */}
      <svg
        viewBox="0 0 100 140"
        className="absolute bottom-[3%] left-[8%] w-[26%] drop-shadow-[0_14px_20px_rgba(15,23,42,0.18)] motion-safe:animate-[careers-float_6s_ease-in-out_infinite]"
      >
        <defs>
          <linearGradient id="mic-head" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFD84D" />
            <stop offset="1" stopColor="#F5B800" />
          </linearGradient>
        </defs>
        <path d="M16 52v6a34 34 0 0 0 68 0v-6" fill="none" stroke="#CBD5E1" strokeWidth="7" strokeLinecap="round" />
        <rect x="28" y="4" width="44" height="70" rx="22" fill="url(#mic-head)" />
        {[18, 28, 38, 48, 58].map((y) => (
          <path key={y} d={`M34 ${y}h32`} stroke="#fff" strokeOpacity="0.45" strokeWidth="2.5" strokeLinecap="round" />
        ))}
        <rect x="45" y="92" width="10" height="26" rx="2" fill="#CBD5E1" />
        <rect x="22" y="116" width="56" height="13" rx="6.5" fill="#94A3B8" />
      </svg>
      {/* Clapperboard */}
      <div className="absolute bottom-[2%] right-[4%] w-[40%] -rotate-3 motion-safe:animate-[careers-float_7s_ease-in-out_infinite_0.8s]">
        <div className="relative -mb-[2%] h-[14%] origin-bottom-left -rotate-6 overflow-hidden rounded-t-md bg-white [background-image:repeating-linear-gradient(-45deg,#F5B800_0_10%,#fff_10%_20%)] shadow-sm" style={{ height: "1.9rem" }} />
        <div className="rounded-b-xl rounded-tr-md bg-white p-[8%] shadow-[0_18px_36px_-12px_rgba(15,23,42,0.25)]">
          <div className="h-[0.45rem] w-[70%] rounded-full bg-slate-200" />
          <div className="mt-[8%] h-[0.45rem] w-[50%] rounded-full bg-slate-200" />
          <div className="mt-[8%] h-[0.45rem] w-[60%] rounded-full bg-slate-200" />
        </div>
      </div>
      <Sparks className="bottom-[36%] right-[0%] w-[9%] rotate-90" />
    </div>
  );
}
