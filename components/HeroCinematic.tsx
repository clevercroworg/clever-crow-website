"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Globe, TrendingUp, Megaphone, CheckCircle2, Users, Star, Code2 } from "lucide-react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// ──────────────────────────────────────────────
// MORPHING PARTICLE SYSTEM
// ──────────────────────────────────────────────
const PARTICLE_COUNT = 14000;

function MorphingParticles({ scrollProgress }: { scrollProgress: any }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positionsSphere, positionsFunnel, positionsDiamond, colors } = useMemo(() => {
    const pS = new Float32Array(PARTICLE_COUNT * 3);
    const pF = new Float32Array(PARTICLE_COUNT * 3); // Funnel (marketing pipeline)
    const pD = new Float32Array(PARTICLE_COUNT * 3); // Diamond (premium brand)
    const c  = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // ── SPHERE (Phase 1: Digital Products / Globe) ──
      const r = 3.5 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(Math.random() * 2 - 1);
      pS[i3]     = r * Math.sin(phi) * Math.cos(theta);
      pS[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pS[i3 + 2] = r * Math.cos(phi);

      // ── FUNNEL (Phase 2: Marketing Pipeline) ──
      // Wide at top (leads in), narrows to bottom (conversions out)
      const funnelH = 8;
      const fy = (Math.random() - 0.3) * funnelH; // skew upward for wider top
      const fNorm = (fy + funnelH * 0.3) / funnelH; // 0 at bottom, 1 at top
      const fRadius = 0.4 + fNorm * 3.8; // narrow at bottom, wide at top
      const fAngle = Math.random() * Math.PI * 2;
      const fNoise = (Math.random() - 0.5) * 0.2;
      pF[i3]     = fRadius * Math.cos(fAngle) + fNoise;
      pF[i3 + 1] = fy + fNoise;
      pF[i3 + 2] = fRadius * Math.sin(fAngle) + fNoise;

      // ── DIAMOND (Phase 3: Premium Brand / Trust) ──
      // Note: `rotation.x` reaches Math.PI at scroll=1.0, meaning Phase 3 renders 180 deg flipped.
      // We must model an INVERTED gem with a closed flat table so it appears UPRIGHT to the user!
      const dAngle = Math.random() * Math.PI * 2;
      const maxR = 4.2;
      let dY, dRadius;
      const randPart = Math.random();
      
      if (randPart < 0.15) {
        // 15% of particles form the solid flat table (Inverted: at y = -2.8, which becomes the top)
        dY = -2.8;
        dRadius = Math.sqrt(Math.random()) * (maxR * 0.55); 
      } else {
        // 85% of particles form the outer shell (Y ranges from -2.8 to +5.0)
        dY = (Math.random() * 7.8) - 2.8;
        if (dY > 0) {
          // Pavilion: equator(y=0) to point(y=5). Flipped, this is the downward point.
          dRadius = maxR * (1 - dY / 5.0);
        } else {
          // Crown: equator(y=0) to table(y=-2.8). Flipped, this is the slanted upper edge.
          dRadius = maxR * (1 - (-dY) / 2.8 * 0.45);
        }
      }
      
      const dNoise = (Math.random() - 0.5) * 0.15;
      pD[i3]     = dRadius * Math.cos(dAngle) + dNoise;
      pD[i3 + 1] = dY + dNoise;
      pD[i3 + 2] = dRadius * Math.sin(dAngle) + dNoise;

      // Colors
      const m = Math.random();
      if (m > 0.7)      { c[i3] = 0;   c[i3+1] = 0.55; c[i3+2] = 1;    }
      else if (m > 0.3) { c[i3] = 0.6; c[i3+1] = 0;    c[i3+2] = 1;    }
      else              { c[i3] = 1;   c[i3+1] = 0.6;  c[i3+2] = 0;    }
    }
    return { positionsSphere: pS, positionsFunnel: pF, positionsDiamond: pD, colors: c };
  }, []);

  const [currentPos] = useState(() => new Float32Array(positionsSphere));

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useFrame((state) => {
    const scroll = (scrollProgress as any).get() as number;
    const time   = state.clock.getElapsedTime();

    const inFirst = scroll < 0.5;
    const t1 = inFirst ? positionsSphere : positionsFunnel;
    const t2 = inFirst ? positionsFunnel : positionsDiamond;
    const raw = inFirst ? scroll / 0.5 : (scroll - 0.5) / 0.5;
    const lerp = raw * raw * (3 - 2 * raw);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const tx = t1[i3]   * (1 - lerp) + t2[i3]   * lerp;
      const ty = t1[i3+1] * (1 - lerp) + t2[i3+1] * lerp;
      const tz = t1[i3+2] * (1 - lerp) + t2[i3+2] * lerp;
      const n  = Math.sin(time * 1.5 + i * 0.01) * 0.04;
      currentPos[i3]   = THREE.MathUtils.lerp(currentPos[i3],   tx + n, 0.1);
      currentPos[i3+1] = THREE.MathUtils.lerp(currentPos[i3+1], ty + n, 0.1);
      currentPos[i3+2] = THREE.MathUtils.lerp(currentPos[i3+2], tz + n, 0.1);
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y = time * 0.14 + scroll * Math.PI * 2.5;
      pointsRef.current.rotation.x = Math.sin(time * 0.2) * 0.2 + scroll * Math.PI;
      // Desktop: push right. Mobile: move properly UP into the top clear area
      const px = isMobile ? 0 : 4.4;
      const py = isMobile ? 3.0 : 0;
      const pScale = isMobile ? 0.65 : 1.0;
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, px, 0.05);
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, py, 0.05);
      pointsRef.current.scale.setScalar(pScale);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} args={[currentPos, 3]} />
        <bufferAttribute attach="attributes-color"    count={PARTICLE_COUNT} args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.085} vertexColors transparent opacity={0.95}
        blending={THREE.AdditiveBlending} depthWrite={false} sizeAttenuation
      />
    </points>
  );
}

// ──────────────────────────────────────────────
// GLASSMORPHISM CARD WRAPPER
// On mobile: frosted glass container for text readability
// On desktop (md+): completely transparent/invisible
// ──────────────────────────────────────────────
function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`
      relative w-full
      md:bg-[#050505]/40 md:backdrop-blur-xl md:border md:border-white/[0.08] 
      md:rounded-2xl md:p-8 md:shadow-[0_8px_40px_rgba(0,0,0,0.5)]
      ${className}
    `}>
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// MAIN HERO COMPONENT
// ──────────────────────────────────────────────
export default function HeroCinematic({ onCallbackClick }: { onCallbackClick?: () => void }) {
  const containerRef = useRef<HTMLElement>(null);
  const scrollYProgress = useMotionValue(0);
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect   = el.getBoundingClientRect();
      const total  = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      scrollYProgress.set(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollYProgress]);

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 60, damping: 18, restDelta: 0.001 });

  // Perfectly sync the text phase strictly to the animated 3D spring state to prevent skipping
  useEffect(() => {
    return smoothScroll.onChange((v) => {
      if (v < 0.35) setActivePhase(0);
      else if (v < 0.65) setActivePhase(1);
      else setActivePhase(2);
    });
  }, [smoothScroll]);

  // Phase indicator dots active state logic
  const dots = [0, 1, 2];

  // Animation variants for cross-fading text
  const textVariants = {
    initial: { opacity: 0, y: 30, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -30, filter: "blur(8px)", transition: { duration: 0.3, ease: "easeIn" } }
  };

  return (
    <section ref={containerRef} className="relative w-full h-[250vh] bg-[#020202] text-white">
      
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden">

        {/* Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-15%] left-[5%] w-[700px] h-[700px] rounded-full bg-blue-700/15 blur-[160px]" />
          <div className="absolute bottom-[-10%] right-[5%] w-[800px] h-[800px] rounded-full bg-violet-700/12 blur-[160px]" />
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:30px_30px]" />
        </div>

        {/* Full-Screen 3D Canvas */}
        <div className="absolute inset-0 z-[1]">
          <Canvas
            camera={{ position: [0, 0, 14], fov: 42 }}
            gl={{ antialias: false, powerPreference: "high-performance" }}
          >
            <color attach="background" args={["#020202"]} />
            <MorphingParticles scrollProgress={smoothScroll} />
            <EffectComposer disableNormalPass>
              <Bloom luminanceThreshold={0.18} mipmapBlur intensity={2.0} radius={0.85} />
            </EffectComposer>
          </Canvas>
          {/* Desktop vignette: offset right. Mobile: centered */}
          <div className="absolute inset-0 pointer-events-none hidden md:block bg-[radial-gradient(ellipse_80%_80%_at_65%_50%,transparent_40%,#020202_100%)]" />
          <div className="absolute inset-x-0 bottom-0 top-[30%] pointer-events-none bg-gradient-to-t from-[#020202] via-[#020202] to-transparent md:hidden" />
          {/* Subtle mobile radial to darken edges slightly around the top */}
          <div className="absolute inset-0 pointer-events-none md:hidden bg-[radial-gradient(ellipse_100%_100%_at_50%_0%,transparent_40%,#020202_100%)]" />
        </div>

        {/* ─────────────────────────────────── */}
        {/* TEXT OVERLAY                        */}
        {/* Desktop: left 46%, no glass card    */}
        {/* Mobile: bottom text overlay         */}
        {/* ─────────────────────────────────── */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end pb-[7vh] md:pb-0 md:justify-center pointer-events-none">
          <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-14">
            <div className="relative w-full md:w-[50%] lg:w-[46%] h-[420px] md:h-[500px]">

              <AnimatePresence initial={false}>
                {/* ═══════ STAGE 1 ═══════ */}
                {activePhase === 0 && (
                  <motion.div
                    key="p1"
                    variants={textVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-x-0 bottom-0 md:top-1/2 md:bottom-auto md:-translate-y-1/2 pointer-events-auto"
                  >
                    <GlassCard>
                      <div className="mb-4 md:mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/50 bg-blue-500/15 px-3 md:px-4 py-1.5 backdrop-blur-sm w-fit">
                        <Globe className="h-3 md:h-3.5 w-3 md:w-3.5 text-blue-300" />
                        <span className="text-[10px] sm:text-[11px] font-black tracking-[0.2em] text-blue-100 uppercase">
                          Websites · Apps · Marketing
                        </span>
                      </div>

                      <h1 className="text-[2.4rem] sm:text-[3rem] md:text-[4.8rem] lg:text-[6rem] leading-[1.05] font-black tracking-tight text-white mb-4">
                        We Build Digital
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-200">
                          Products That Sell.
                        </span>
                      </h1>

                      <p className="max-w-[440px] text-[0.95rem] md:text-[1.05rem] leading-relaxed text-gray-200 mb-5 md:mb-8 font-medium">
                        From a conversion-optimised website to a full mobile app — we design, build, and launch
                        digital products that turn visitors into paying customers.
                      </p>

                      <div className="grid grid-cols-2 md:flex md:flex-wrap gap-x-6 gap-y-3 md:gap-7 mb-5 md:mb-8 border-t border-white/15 pt-4 md:pt-6">
                        {[
                          { icon: Code2,        value: "120+", label: "Projects Delivered" },
                          { icon: Users,        value: "80+",  label: "Happy Clients"      },
                          { icon: Star,         value: "5.0",  label: "Average Rating"     },
                          { icon: CheckCircle2, value: "6+",   label: "Years Experience"   },
                        ].map(({ icon: Icon, value, label }) => (
                          <div key={label} className="flex flex-col">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <Icon className="h-3 md:h-3.5 w-3 md:w-3.5 text-blue-300" />
                              <span className="text-lg md:text-2xl font-black text-white">{value}</span>
                            </div>
                            <span className="text-[10px] md:text-xs text-gray-400 font-semibold">{label}</span>
                          </div>
                        ))}
                      </div>

                      <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-[0.18em] flex items-center gap-2">
                        <span className="w-5 h-px bg-gray-500 block" /> Scroll to see what we do
                      </span>
                    </GlassCard>
                  </motion.div>
                )}

                {/* ═══════ STAGE 2 ═══════ */}
                {activePhase === 1 && (
                  <motion.div
                    key="p2"
                    variants={textVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-x-0 bottom-0 md:top-1/2 md:bottom-auto md:-translate-y-1/2 pointer-events-auto"
                  >
                    <GlassCard>
                      <div className="mb-4 md:mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/50 bg-violet-500/15 px-3 md:px-4 py-1.5 backdrop-blur-sm w-fit">
                        <TrendingUp className="h-3 md:h-3.5 w-3 md:w-3.5 text-violet-300" />
                        <span className="text-[10px] sm:text-[11px] font-black tracking-[0.2em] text-violet-100 uppercase">
                          SEO · Ads · Social · Analytics
                        </span>
                      </div>

                      <h1 className="text-[2.4rem] sm:text-[3rem] md:text-[4.8rem] lg:text-[6rem] leading-[1.05] font-black tracking-tight text-white mb-4">
                        Marketing That
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-200">
                          Fills Your Pipeline.
                        </span>
                      </h1>

                      <p className="max-w-[440px] text-[0.95rem] md:text-[1.05rem] leading-relaxed text-gray-200 mb-5 md:mb-7 font-medium">
                        We run data-driven campaigns that put you in front of the right audience — consistently
                        generating leads, enquiries, and sales every month.
                      </p>

                      <ul className="space-y-2 md:space-y-3">
                        {[
                          "Google Ads & Meta Ads Management",
                          "Search Engine Optimisation (SEO)",
                          "Social Media Growth & Content",
                          "Monthly Reports With Real ROI Data",
                        ].map(item => (
                          <li key={item} className="flex items-center gap-2 md:gap-3 text-[0.82rem] md:text-sm lg:text-[0.95rem] text-gray-200 font-medium">
                            <CheckCircle2 className="h-3.5 md:h-4 w-3.5 md:w-4 text-violet-300 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </GlassCard>
                  </motion.div>
                )}

                {/* ═══════ STAGE 3 ═══════ */}
                {activePhase === 2 && (
                  <motion.div
                    key="p3"
                    variants={textVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-x-0 bottom-0 md:top-1/2 md:bottom-auto md:-translate-y-1/2 pointer-events-auto"
                  >
                    <GlassCard>
                      <div className="mb-4 md:mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-amber-500/15 px-3 md:px-4 py-1.5 backdrop-blur-sm w-fit">
                        <Megaphone className="h-3 md:h-3.5 w-3 md:w-3.5 text-amber-300" />
                        <span className="text-[10px] sm:text-[11px] font-black tracking-[0.2em] text-amber-100 uppercase">
                          Logo · Brand Identity · UI/UX Design
                        </span>
                      </div>

                      <h1 className="text-[2.4rem] sm:text-[3rem] md:text-[4.8rem] lg:text-[6rem] leading-[1.05] font-black tracking-tight text-white mb-4">
                        A Brand Your
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-100">
                          Customers Trust.
                        </span>
                      </h1>

                      <p className="max-w-[440px] text-[0.95rem] md:text-[1.05rem] leading-relaxed text-gray-200 mb-5 md:mb-7 font-medium">
                        First impressions are everything online. We craft a consistent visual identity — logo,
                        colours, typography, and UI — that makes you look premium from day one.
                      </p>

                      <ul className="space-y-2 md:space-y-3 mb-6 md:mb-9">
                        {[
                          "Logo & Visual Identity Design",
                          "High-Converting UI/UX for Web & Apps",
                          "Brand Guidelines & Asset Kits",
                          "Pitch Decks & Marketing Collateral",
                        ].map(item => (
                          <li key={item} className="flex items-center gap-2 md:gap-3 text-[0.82rem] md:text-sm lg:text-[0.95rem] text-gray-200 font-medium">
                            <CheckCircle2 className="h-3.5 md:h-4 w-3.5 md:w-4 text-amber-300 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
                        <button
                          onClick={onCallbackClick}
                          className="group flex h-14 md:h-12 items-center justify-center gap-3 rounded-full bg-white hover:bg-amber-50 px-7 text-[14px] md:text-[15px] font-bold text-black shadow-[0_0_28px_rgba(255,255,255,0.14)] transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                        >
                          Get a Free Consultation
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <a href="#portfolio" className="text-sm font-bold text-gray-400 hover:text-white underline underline-offset-4 transition-colors text-center sm:text-left">
                          View our portfolio →
                        </a>
                      </div>
                    </GlassCard>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </div>

        {/* Phase Indicator Dots */}
        <div className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
          {dots.map((dotIndex) => (
            <motion.div
              key={dotIndex}
              initial={false}
              animate={{ opacity: activePhase === dotIndex ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
              className="w-1.5 h-1.5 rounded-full bg-white"
            />
          ))}
        </div>

      </div>
    </section>
  );
}
