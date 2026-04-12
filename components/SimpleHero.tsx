"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Bot, TrendingUp, Users, Briefcase, CheckCircle, Sparkles, Hexagon, Zap, AlertCircle, Cpu, PartyPopper } from "lucide-react";

enum HeroStage {
  LOADING,
  READY,
  BADGE_BROKEN,
  REPAIRING,
  FIXED,
  THANK_YOU,
  FINALE
}

const Typewriter = ({ text, className, speed = 0.05, delay = 0 }: { text: string, className?: string, speed?: number, delay?: number }) => {
  return (
    <motion.span
      key={text}
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: speed,
            delayChildren: delay
          }
        }
      }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, display: "none" },
            visible: { opacity: 1, display: "inline" }
          }}
          transition={{ duration: 0 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function SimpleHero({ onCallbackClick }: { onCallbackClick?: () => void }) {
  const containerRef = useRef<HTMLElement>(null);

  // Background spotlight (Disabled as per request)
  const spotlightBg = `none`;

  const [stage, setStage] = useState<HeroStage>(HeroStage.LOADING);
  const [holdProgress, setHoldProgress] = useState(0);
  const hasBrokenRef = useRef(false);

  useEffect(() => {
    setStage(HeroStage.LOADING);
  }, []);

  useEffect(() => {
    let t1: NodeJS.Timeout;
    let t2: NodeJS.Timeout;

    if (stage === HeroStage.LOADING) {
      t1 = setTimeout(() => setStage(HeroStage.READY), 2000);
    }

    if (stage === HeroStage.READY && !hasBrokenRef.current) {
      t2 = setTimeout(() => {
        setStage(HeroStage.BADGE_BROKEN);
        hasBrokenRef.current = true;
      }, 1200); // Trigger shortly after subheading appears
    }

    if (stage === HeroStage.FIXED) {
      t2 = setTimeout(() => {
        setStage(HeroStage.THANK_YOU);
      }, 1000); // Wait for physical alignment
    }

    if (stage === HeroStage.THANK_YOU) {
      t2 = setTimeout(() => {
        setStage(HeroStage.FINALE);
      }, 1800); // Show thanks before final message
    }

    return () => {
      if (t1) clearTimeout(t1);
      if (t2) clearTimeout(t2);
    };
  }, [stage]);

  // Hold-to-Repair Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (stage === HeroStage.REPAIRING) {
      interval = setInterval(() => {
        setHoldProgress(prev => {
          if (prev >= 100) {
            setStage(HeroStage.FIXED);
            return 100;
          }
          return prev + 2; // ~2 seconds for 100% (50 ticks of 40ms)
        });
      }, 40);
    } else if (stage !== HeroStage.FINALE) {
      setHoldProgress(0);
    }
    return () => clearInterval(interval);
  }, [stage]);

  const startRepair = () => {
    if (stage === HeroStage.BADGE_BROKEN) setStage(HeroStage.REPAIRING);
  };

  const stopRepair = () => {
    if (stage === HeroStage.REPAIRING && holdProgress < 100) {
      setStage(HeroStage.BADGE_BROKEN);
    }
  };

  const getBadgeContent = () => {
    switch (stage) {
      case HeroStage.LOADING:
      case HeroStage.READY:
      case HeroStage.BADGE_BROKEN:
      case HeroStage.REPAIRING:
        return {
          left: "Build fast. Rank higher. Grow faster",
          right: "",
          icon: Bot,
          color: (stage === HeroStage.BADGE_BROKEN || stage === HeroStage.REPAIRING) ? "text-yellow-200/60" : "text-yellow-50"
        };
      case HeroStage.FIXED:
        return {
          left: "Build fast. Rank higher. Grow faster",
          right: "",
          icon: Bot,
          color: "text-yellow-400"
        };
      case HeroStage.THANK_YOU:
        return {
          left: "Oh, thanks bro! You fixed it!",
          right: "",
          icon: Bot,
          color: "text-yellow-400"
        };
      case HeroStage.FINALE:
        return {
          left: "You fixed our website, we build yours, let's connect",
          right: "",
          icon: Bot,
          color: "text-yellow-400"
        };
      default:
        return {
          left: "AI-Powered Marketing",
          right: "Scale Your Business Worldwide",
          icon: Bot,
          color: "text-yellow-50"
        };
    }
  };

  const badge = getBadgeContent();

  // Restore mouse and touch tracking for web interaction - Using Ref for performance
  const mousePosRef = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const handleMove = (x: number, y: number) => {
      mousePosRef.current = { x, y };
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchstart", onTouchMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onTouchMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[95dvh] flex flex-col items-center justify-center bg-[#020202] text-white overflow-hidden pt-24"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* ───────────────── BACKGROUND AMBIENCE ───────────────── */}
        <div
          style={{ background: spotlightBg }}
          className="absolute inset-0 pointer-events-none z-0"
        />

        {/* ───────────────── STATIC BACKGROUND BASE (CLEAN) ───────────────── */}
        <div className="z-1 relative" />

        {/* ───────────────── LAYERED ANIMATION SYSTEM ───────────────── */}
        <div className="z-2 relative">
          <FloatingGlowOrbs />
          <LightSweep />
        </div>

        {/* Layer 1: Deep Slow Blobs (Far) */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] rounded-full bg-yellow-600/10 blur-[150px] animate-pulse" />
          <div className="absolute bottom-[-15%] right-[-5%] w-[900px] h-[900px] rounded-full bg-yellow-500/10 blur-[180px] animate-pulse" />
        </div>

        {/* Layer 2: Middle Drifting Accents */}
        <div className="absolute inset-0 z-0">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute top-[20%] left-[15%] w-[500px] h-[500px] border border-yellow-500/5 rounded-full blur-sm"
          />
          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1.1, 1, 1.1],
            }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[20%] right-[15%] w-[600px] h-[600px] border border-yellow-500/5 rounded-full blur-sm"
          />
        </div>

        <div className="z-3 relative">
          <ParticleSystem />
          <NeuralWeb mousePosRef={mousePosRef} />
        </div>

        {/* Layer 5: Simple Moving Slabs */}
        <div className="z-2 relative">
          <SimpleSlabs />
        </div>

        {/* ───────────────── SWEEPING LIGHT BEAMS ───────────────── */}
        <div className="absolute inset-0 z-0">
          {[...Array(3)].map((_, i) => (
            <LightBeam key={i} index={i} />
          ))}
        </div>

        {/* Static Grid with Grain */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(234,179,8,0.1)_1.5px,transparent_1.5px)] [background-size:80px_80px] opacity-40" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* ───────────────── CIRCUITRY GRID PULSES ───────────────── */}
        <div className="absolute inset-0 z-0">
          {[...Array(6)].map((_, i) => (
            <GridLine key={i} index={i} />
          ))}
        </div>

        {/* ───────────────── DECORATIVE FLOATING SHAPES ───────────────── */}
        <div className="absolute inset-0 z-0 select-none">
          <FloatingShape Icon={Hexagon} size={45} top="15%" left="10%" delay={1} />
          <FloatingShape Icon={Zap} size={35} top="65%" left="8%" delay={3} />
          <FloatingShape Icon={Sparkles} size={40} top="25%" right="12%" delay={2} />
          <FloatingShape Icon={Hexagon} size={30} top="75%" right="15%" delay={4} />
        </div>

        {/* ───────────────── VIGNETTE / CONTRAST MASK ───────────────── */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)] z-[5]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center">

        {/* Authority Badge - Physical Split & Hold-to-Repair Interaction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="group mb-12 flex flex-col items-center relative z-50 select-none"
        >
          {/* INTERACTIVE FIX BUTTON (NOW FLOATING) */}
          <AnimatePresence>
            {(stage === HeroStage.BADGE_BROKEN || stage === HeroStage.REPAIRING) && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  boxShadow: stage === HeroStage.REPAIRING
                    ? "0 0 30px rgba(234,179,8,0.4)"
                    : "0 0 15px rgba(234,179,8,0.1)"
                }}
                transition={{
                  duration: 0.6,
                  delay: stage === HeroStage.BADGE_BROKEN ? 1.0 : 0 // Delay only on first appearance
                }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseDown={startRepair}
                onMouseUp={stopRepair}
                onMouseLeave={stopRepair}
                onTouchStart={startRepair}
                onTouchEnd={stopRepair}
                className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap overflow-hidden px-8 py-3 rounded-xl border border-yellow-500/30 bg-yellow-500/10 backdrop-blur-xl group/btn z-40"
              >
                {/* Button Progress Fill */}
                <motion.div
                  className="absolute inset-0 bg-yellow-500/30 origin-left"
                  style={{ scaleX: holdProgress / 100 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                />

                <span className="relative z-10 flex items-center gap-2 text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase text-yellow-500">
                  {stage === HeroStage.REPAIRING ? (
                    <Cpu className="h-4 w-4 animate-spin-slow" />
                  ) : (
                    <Zap className="h-4 w-4 animate-pulse" />
                  )}
                  {stage === HeroStage.REPAIRING ? (
                    <div className="flex items-center gap-1">
                      <Typewriter text="Repairing" speed={0.02} />
                      <span className="min-w-[2.5em] text-right">{holdProgress}%</span>
                    </div>
                  ) : (
                    <Typewriter text="Hold me to fix it" speed={0.02} />
                  )}
                </span>

                {/* Subtle Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent translate-x-[-100%] group-hover/btn:animate-shimmer" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* THE PHYSICAL BADGE (NOW A SINGLE PIECE) */}
          <motion.div
            animate={
              (stage === HeroStage.FIXED || stage === HeroStage.FINALE)
                ? { y: 0, rotate: 0, x: 0 }
                : stage === HeroStage.BADGE_BROKEN
                  ? { y: 25, rotate: 10, x: [0, -1, 1, -1, 0] }
                  : stage === HeroStage.REPAIRING
                    ? { y: 10, rotate: 3, x: [-2, 2, -2, 2, 0] }
                    : { y: 0, rotate: 0, x: 0 }
            }
            transition={{
              x: stage === HeroStage.REPAIRING
                ? { repeat: Infinity, duration: 0.1 }
                : { type: "tween", duration: 0.5 },
              y: { type: "spring", stiffness: 80, damping: 20 },
              rotate: { type: "spring", stiffness: 80, damping: 20 },
              default: { duration: 0.5 }
            }}
            className={`relative flex items-center justify-start px-8 gap-3 bg-yellow-500/[0.03] backdrop-blur-3xl border border-yellow-500/20 py-3 rounded-full w-[340px] sm:w-[520px] max-w-[95vw]
              ${stage === HeroStage.FINALE ? 'border-yellow-500 font-bold shadow-[0_0_30px_rgba(234,179,8,0.3)]' : ''}
              ${(stage === HeroStage.READY || stage === HeroStage.FIXED || stage === HeroStage.FINALE) ? '!transform-none !top-0 !left-0 !relative' : ''}
              ${stage === HeroStage.BADGE_BROKEN || stage === HeroStage.REPAIRING ? 'shadow-xl' : ''}
            `}
          >
            <div className="w-5 h-5 flex items-center justify-center shrink-0">
              <badge.icon className={`h-5 w-5 ${badge.color} transition-colors duration-500`} />
            </div>

            <div className="flex items-center gap-1.5 relative z-10 text-[10px] sm:text-xs font-black tracking-[0.1em] sm:tracking-[0.2em] uppercase">
              {stage === HeroStage.LOADING || stage === HeroStage.READY || stage === HeroStage.BADGE_BROKEN || stage === HeroStage.REPAIRING || stage === HeroStage.FIXED ? (
                <span className={badge.color}>{badge.left}</span>
              ) : (
                <Typewriter
                  text={badge.left}
                  className={badge.color}
                />
              )}

              {badge.right && (
                <div className="flex items-center gap-1.5">
                  <span className={`${badge.color}`}>•</span>
                  {stage === HeroStage.LOADING || stage === HeroStage.READY || stage === HeroStage.BADGE_BROKEN || stage === HeroStage.REPAIRING || stage === HeroStage.FIXED ? (
                    <span className={badge.color}>{badge.right}</span>
                  ) : (
                    <Typewriter
                      text={badge.right}
                      className={badge.color}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Internal Repair Progress Fill */}
            <motion.div
              className="absolute inset-0 bg-yellow-500/10 origin-left z-0"
              style={{ scaleX: holdProgress / 100 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
          </motion.div>

        </motion.div>

        {/* Main Headline - Interactive Gamified Segments */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative text-4xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-tight mb-10"
        >
          <span className="text-white">Smart Strategies. </span>
          <motion.span
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ backgroundSize: "200% auto" }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-500 to-yellow-600"
          >
            Clever Design.
          </motion.span>
        </motion.h1>

        {/* Subheading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mb-14"
        >
          <p className="text-lg sm:text-2xl md:text-3xl text-gray-300 leading-relaxed font-bold">
            We create <span className="text-white relative inline-block">
              high performance websites
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, delay: 1 }}
                className="absolute bottom-1 left-0 h-[3px] bg-yellow-500"
              />
            </span> and <span className="text-white">AI driven marketing strategies</span> to help you <span className="text-yellow-500 italic underline underline-offset-4 decoration-yellow-500/20">scale faster worldwide.</span>
          </p>

        </motion.div>

        {/* High-Impact CTAs - MATCHING YELLOW-500 (NO SHADOW GLOW) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-7"
        >
          <button
            onClick={onCallbackClick}
            className="group relative flex w-full sm:w-auto h-18 py-5 items-center justify-center gap-4 rounded-2xl bg-yellow-500 px-8 sm:px-14 text-[16px] sm:text-[18px] font-black text-black transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              Get a Free Consultation
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <a
            href="#portfolio"
            className="group flex w-full sm:w-auto h-18 py-5 items-center justify-center px-8 sm:px-12 text-[16px] sm:text-[18px] font-bold text-white border-2 border-white/20 hover:border-yellow-500 rounded-2xl backdrop-blur-3xl transition-all duration-300"
          >
            View Our Portfolio
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="w-full border-t border-white/5 mt-auto relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-16">
          {[
            { Icon: Users, label: "Experience", value: "8+ Years" },
            { Icon: Briefcase, label: "Experts", value: "35+ In-House" },
            { Icon: CheckCircle, label: "Delivered", value: "100k+ Hours" },
            { Icon: TrendingUp, label: "Projects", value: "500+ Done" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, backgroundColor: "rgba(255,255,255,0.08)" }}
              className="flex flex-col items-center lg:items-start text-center lg:text-left gap-1 p-5 sm:p-0 rounded-[2rem] bg-white/[0.03] sm:bg-transparent border border-white/10 sm:border-0 backdrop-blur-2xl sm:backdrop-blur-none transition-all duration-300 shadow-2xl sm:shadow-none"
            >
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-yellow-500 mb-1">
                <stat.Icon className="h-5 w-5 sm:h-7 sm:w-7 shrink-0" strokeWidth={2.5} />
                <span className="text-xl sm:text-3xl font-black text-white leading-none tracking-tighter">{stat.value}</span>
              </div>
              <span className="text-[9px] sm:text-[12px] font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gray-400">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ──────────────────────────────────────────────
// SUB-COMPONENTS FOR CLEANER CODE
// ──────────────────────────────────────────────

function SimpleSlabs() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: i % 2 === 0 ? "-100%" : "100%" }}
          animate={{
            x: i % 2 === 0 ? ["-100%", "100%"] : ["100%", "-100%"],
          }}
          transition={{
            duration: 20 + i * 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute h-32 w-full bg-yellow-500/10 blur-[80px]"
          style={{ top: `${25 + i * 40}%` }}
        />
      ))}
    </div>
  );
}

function ParticleSystem() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {[...Array(35)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            scale: Math.random() * 0.7 + 0.3,
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`
          }}
          animate={{
            opacity: [0, 0.7, 0],
            y: ["0%", "-30%"],
            x: [`${Math.random() * 100}%`, `${Math.random() * 100 + (Math.random() - 0.5) * 10}%`]
          }}
          transition={{
            duration: Math.random() * 8 + 8,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
          className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.8)]"
        />
      ))}
    </div>
  );
}

function LightSweep() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{
          x: ["-150%", "150%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatDelay: 8,
          ease: "linear",
        }}
        className="absolute inset-0 opacity-[0.25]"
        style={{
          background: "linear-gradient(110deg, transparent 35%, rgba(234,179,8,0.6) 50%, transparent 65%)",
        }}
      />
    </div>
  );
}

function NeuralWeb({ mousePosRef }: { mousePosRef: React.RefObject<{ x: number, y: number }> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    const particleCount = 85;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number; y: number; vx: number; vy: number;

      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
      }

      update(mousePos: { x: number; y: number }) {
        // Base movement
        this.x += this.vx;
        this.y += this.vy;

        // Interaction with mouse position from Ref - accessed via prop
        const dx = this.x - mousePos.x;
        const dy = this.y - mousePos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 250;

        if (dist < radius) {
          const force = (radius - dist) / radius;
          this.x += dx * force * 0.03;
          this.y += dy * force * 0.03;
        }

        if (this.x < 0 || this.x > window.innerWidth) this.vx *= -1;
        if (this.y < 0 || this.y > window.innerHeight) this.vy *= -1;
      }
    }

    const init = () => {
      resize();
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Web connections base - EVEN BRIGHTER
      ctx.strokeStyle = "rgba(234, 179, 8, 0.6)";
      ctx.lineWidth = 1.1;

      particles.forEach((p, i) => {
        p.update(mousePosRef.current || { x: 0, y: 0 });

        // Nodes (Points) - Brighter
        ctx.fillStyle = "rgba(234, 179, 8, 1.0)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.0, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 220) {
            // Adjust opacity based on distance for a "webbing" feel - Brighter connections
            const opacity = (1 - dist / 220) * 0.7;
            ctx.strokeStyle = `rgba(234, 179, 8, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    init();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-90"
    />
  );
}

function FloatingGlowOrbs() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, (i + 1) * 150, -(i + 1) * 150, 0],
            y: [0, -(i + 1) * 100, (i + 1) * 100, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 12 + i * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-[900px] h-[900px] bg-[radial-gradient(circle,rgba(234,179,8,0.2),transparent_70%)] blur-[140px]"
          style={{
            top: `${5 + i * 35}%`,
            left: `${-15 + i * 45}%`,
          }}
        />
      ))}
    </div>
  );
}

function GridLine({ index }: { index: number }) {
  const isVertical = index < 6;
  const position = 10 + (index % 6) * 16;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.4, 0],
        [isVertical ? "top" : "left"]: ["0%", "100%"]
      }}
      transition={{
        duration: 4 + index,
        repeat: Infinity,
        delay: index * 1.2,
        ease: "linear"
      }}
      className={`absolute bg-gradient-to-b from-transparent via-yellow-500/20 to-transparent ${isVertical ? "w-[1.5px] h-32" : "h-[1.5px] w-32 bg-gradient-to-r"
        } will-change-transform`}
      style={{
        [isVertical ? "left" : "top"]: `${position}%`
      }}
    />
  );
}

function FloatingShape({ Icon, size, top, left, right, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.25, 0],
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
        y: [0, -40, 0]
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
      className="absolute text-yellow-400/20 will-change-transform"
      style={{ top, left, right }}
    >
      <Icon size={size} strokeWidth={1} />
    </motion.div>
  );
}

function LightBeam({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0.7, rotate: -45 }}
      animate={{
        opacity: [0, 0.2, 0],
        x: ["-30%", "130%"],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        delay: index * 4,
        ease: "linear"
      }}
      className="absolute top-[-60%] left-0 w-48 h-[250%] bg-gradient-to-b from-transparent via-yellow-400/10 to-transparent blur-[120px] will-change-transform"
    />
  );
}
