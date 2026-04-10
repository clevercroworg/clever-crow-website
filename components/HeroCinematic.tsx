"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Globe, TrendingUp, Megaphone, CheckCircle2, Users, Star, Code2 } from "lucide-react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// ──────────────────────────────────────────────
// MORPHING PARTICLE SYSTEM
// ──────────────────────────────────────────────
const PARTICLE_COUNT = 14000;

function MorphingParticles({ scrollProgress, pointerActive }: { scrollProgress: any; pointerActive: React.RefObject<boolean> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer, viewport } = useThree();

  const { positionsGlobe, positionsFunnel, positionsPhone, colorsGeneric, colorsGlobe, colorsFunnel } = useMemo(() => {
    const pGlobe = new Float32Array(PARTICLE_COUNT * 3); // Phase 1: Interactive Globe
    const pFunnel = new Float32Array(PARTICLE_COUNT * 3); // Phase 2
    const pPhone = new Float32Array(PARTICLE_COUNT * 3); // Phase 3
    const cGen  = new Float32Array(PARTICLE_COUNT * 3); // Generic Space Brand Colors (Phase 3)
    const cGlobe = new Float32Array(PARTICLE_COUNT * 3); // Globe Cyan/Blue/Teal Colors (Phase 1)
    const cFunnel = new Float32Array(PARTICLE_COUNT * 3); // Chart Green + Background (Phase 2)

    const GLOBE_R = 4.2; // Globe radius
    const LAT_LINES = 12;   // Latitude rings
    const LON_LINES = 18;   // Longitude meridians

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // ── INTERACTIVE GLOBE (Phase 1: Global Digital Reach) ──
      const globeRole = Math.random();
      let gx: number, gy: number, gz: number;

      if (globeRole < 0.30) {
        // [30%] Latitude rings — horizontal circles at fixed declinations
        const latIdx = Math.floor(Math.random() * LAT_LINES);
        const phi = (Math.PI / (LAT_LINES + 1)) * (latIdx + 1); // avoid poles
        const theta = Math.random() * Math.PI * 2;
        gx = GLOBE_R * Math.sin(phi) * Math.cos(theta);
        gy = GLOBE_R * Math.cos(phi);
        gz = GLOBE_R * Math.sin(phi) * Math.sin(theta);
      } else if (globeRole < 0.55) {
        // [25%] Longitude meridians — vertical great circles
        const lonIdx = Math.floor(Math.random() * LON_LINES);
        const theta = (Math.PI * 2 / LON_LINES) * lonIdx;
        const phi = Math.random() * Math.PI;
        gx = GLOBE_R * Math.sin(phi) * Math.cos(theta);
        gy = GLOBE_R * Math.cos(phi);
        gz = GLOBE_R * Math.sin(phi) * Math.sin(theta);
      } else if (globeRole < 0.72) {
        // [17%] Random surface scatter — dots on the sphere surface
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        gx = GLOBE_R * Math.sin(phi) * Math.cos(theta);
        gy = GLOBE_R * Math.cos(phi);
        gz = GLOBE_R * Math.sin(phi) * Math.sin(theta);
      } else {
        // [28%] Ambient background cloud for depth
        gx = (Math.random() - 0.5) * 16.0;
        gy = (Math.random() - 0.5) * 16.0;
        gz = (Math.random() - 0.5) * 8.0 - 2.0;
      }

      pGlobe[i3]     = gx;
      pGlobe[i3 + 1] = gy;
      pGlobe[i3 + 2] = gz;

      // ── SMARTPHONE (Phase 3: Digital Products / Apps) ──
      const pW = 3.6; 
      const pH = 7.4; 
      const pDepth = 0.4; 
      const r = 0.8;

      let px = (Math.random() - 0.5) * pW;
      let py = (Math.random() - 0.5) * pH;
      let pz = (Math.random() - 0.5) * pDepth;

      const w2 = pW / 2;
      const h2 = pH / 2;
      let dx = Math.max(0, Math.abs(px) - (w2 - r));
      let dy = Math.max(0, Math.abs(py) - (h2 - r));

      const rolePhone = Math.random();
      if (rolePhone < 0.55) {
        px = (Math.random() - 0.5) * 16.0;
        py = (Math.random() - 0.5) * 16.0;
        pz = (Math.random() - 0.5) * 8.0 - 2.0; 
      } else {
        if (dx > 0 && dy > 0) {
          let dist = Math.hypot(dx, dy);
          if (dist > r) {
            px = Math.sign(px) * ((w2 - r) + dx * (r / dist));
            py = Math.sign(py) * ((h2 - r) + dy * (r / dist));
          }
        }

        const faceRand = Math.random();
        if (faceRand < 0.15) { pz = pDepth / 2; }
        else if (faceRand < 0.20) { pz = -pDepth / 2; }
        else { 
          if (dx > 0 && dy > 0) {
             let dist = Math.hypot(dx, dy);
             px = Math.sign(px) * ((w2 - r) + dx * (r / dist));
             py = Math.sign(py) * ((h2 - r) + dy * (r / dist));
          } else if (Math.abs(px) > (w2 - r)) {
             px = Math.sign(px) * w2;
          } else {
             py = Math.sign(py) * h2;
          }
        }

        if (pz === pDepth / 2 && Math.abs(px) < (w2 - 0.3) && Math.abs(py) < (h2 - 0.4)) {
            const cols = 5;
            const rows = 7;
            const colIdx = Math.floor((px / pW + 0.5) * cols);
            const rowIdx = Math.floor((py / pH + 0.5) * rows);
            const cellCenterX = (colIdx + 0.5) / cols * pW - pW/2;
            const cellCenterY = (rowIdx + 0.5) / rows * pH - pH/2;
            px = cellCenterX + (Math.random() - 0.5) * 0.25;
            py = cellCenterY + (Math.random() - 0.5) * 0.25;
        }
      }

      const phoneNoise = 0.01;
      pPhone[i3]     = px + (Math.random() - 0.5) * phoneNoise;
      pPhone[i3 + 1] = py + (Math.random() - 0.5) * phoneNoise;
      pPhone[i3 + 2] = pz + (Math.random() - 0.5) * phoneNoise;

      // ── ANALYTICS CHART (Phase 2: Marketing Pipeline) ──
      const bars = 4;
      const bW = 0.8;
      const gap = 1.6;
      const totalW = bars * bW + (bars - 1) * gap;
      
      const bIdx = Math.floor(Math.random() * bars);
      const bHeight = ((bIdx + 1) / bars) * 6.0; 
      
      let fx = (Math.random() - 0.5) * bW;
      let fy = Math.random() * bHeight - 3.0;
      let fz = (Math.random() - 0.5) * bW;

      const fS = Math.random();
      if (fS < 0.25) { fx = (Math.random() > 0.5 ? 1 : -1) * bW/2; }
      else if (fS < 0.50) { fz = (Math.random() > 0.5 ? 1 : -1) * bW/2; }
      else if (fS < 0.75) { fy = bHeight - 3.0; }
      else { fy = -3.0; }
      
      const barCenterX = (bIdx * (bW + gap)) - totalW/2 + bW/2;
      fx += barCenterX;

      const rRole = Math.random();
      if (rRole < 0.25) {
        const t = Math.random();
        fx = (t * totalW * 1.3) - (totalW * 1.3)/2;
        fy = (t * 6.0 * 1.3) - 3.0; 
        fz = Math.sin(t * Math.PI * 1.5) * 2.0; 
        const arrowNoise = 0.15;
        fx += (Math.random() - 0.5) * arrowNoise;
        fy += (Math.random() - 0.5) * arrowNoise;
        fz += (Math.random() - 0.5) * arrowNoise;
        cFunnel[i3] = 0.2; cFunnel[i3+1] = 1.0; cFunnel[i3+2] = 0.4;
      } else if (rRole < 0.60) {
        fx = (Math.random() - 0.5) * 16.0;
        fy = (Math.random() - 0.5) * 16.0;
        fz = (Math.random() - 0.5) * 8.0 - 2.0; 
        const bgM = Math.random();
        if (bgM > 0.5) { cFunnel[i3] = 0;   cFunnel[i3+1] = 0.55; cFunnel[i3+2] = 1; }
        else           { cFunnel[i3] = 0.6; cFunnel[i3+1] = 0;    cFunnel[i3+2] = 1; }
      } else {
        cFunnel[i3] = 0.0; cFunnel[i3+1] = 0.85; cFunnel[i3+2] = 0.35; 
      }

      const isoAngle = Math.PI * 0.20; 
      const isoX = fx * Math.cos(isoAngle) - fz * Math.sin(isoAngle);
      const isoZ = fx * Math.sin(isoAngle) + fz * Math.cos(isoAngle);

      pFunnel[i3]     = isoX;
      pFunnel[i3 + 1] = fy;
      pFunnel[i3 + 2] = isoZ;

      // Generic Tech Brand Colors (Phase 3)
      const m = Math.random();
      if (m > 0.7)      { cGen[i3] = 0;   cGen[i3+1] = 0.55; cGen[i3+2] = 1;    }
      else if (m > 0.3) { cGen[i3] = 0.6; cGen[i3+1] = 0;    cGen[i3+2] = 1;    }
      else              { cGen[i3] = 1;   cGen[i3+1] = 0.6;  cGen[i3+2] = 0;    }

      // Globe Cyan/Blue/Teal Colors (Phase 1)
      const cM = Math.random();
      if (cM > 0.5)      { cGlobe[i3] = 0.0;  cGlobe[i3+1] = 0.85; cGlobe[i3+2] = 1.0;  } // Bright Cyan
      else if (cM > 0.2) { cGlobe[i3] = 0.15; cGlobe[i3+1] = 0.55; cGlobe[i3+2] = 1.0;  } // Deep Blue
      else               { cGlobe[i3] = 0.0;  cGlobe[i3+1] = 1.0;  cGlobe[i3+2] = 0.75; } // Teal Green
    }
    return { positionsGlobe: pGlobe, positionsFunnel: pFunnel, positionsPhone: pPhone, colorsGeneric: cGen, colorsGlobe: cGlobe, colorsFunnel: cFunnel };
  }, []);

  const [currentPos] = useState(() => new Float32Array(positionsGlobe));
  const [currentCol] = useState(() => new Float32Array(colorsGlobe));

  // Store the base (home) positions for mouse interaction restoration
  const basePos = useRef(new Float32Array(positionsGlobe));

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

    let t1: Float32Array, t2: Float32Array, c1: Float32Array, c2: Float32Array, raw: number;

    // Timeline Architecture with "Breathing Windows" (Deadzones)
    // 0.00 - 0.20: Solid Phase 1 (Interactive Globe)
    // 0.20 - 0.40: Transition 1 -> 2
    // 0.40 - 0.60: Solid Phase 2 (Analytics Chart)
    // 0.60 - 0.80: Transition 2 -> 3
    // 0.80 - 1.00: Solid Phase 3 (Smartphone)

    if (scroll < 0.5) {
      t1 = positionsGlobe;
      t2 = positionsFunnel;
      c1 = colorsGlobe;
      c2 = colorsFunnel;
      raw = (scroll - 0.20) / 0.20; 
    } else {
      t1 = positionsFunnel;
      t2 = positionsPhone;
      c1 = colorsFunnel;
      c2 = colorsGeneric;
      raw = (scroll - 0.60) / 0.20;
    }

    raw = Math.max(0, Math.min(1, raw));
    const lerp = raw * raw * (3 - 2 * raw);

    // ── MOUSE INTERACTION (Active only during Phase 1 Globe) ──
    // Convert screen pointer to 3D world-space coordinates using viewport
    const isGlobePhase = scroll < 0.20;
    const mouseWorld = new THREE.Vector3(
      (pointer.x * viewport.width) / 2,
      (pointer.y * viewport.height) / 2,
      0
    );
    // Offset to match the globe's desktop position (pushed right by 4.4 units)
    const globeOffset = isMobile ? new THREE.Vector3(0, 2.4, 0) : new THREE.Vector3(4.4, 0, 0);
    const REPULSE_RADIUS = 2.5;  // How close the mouse must be to affect particles
    const REPULSE_STRENGTH = 1.8; // How strongly particles are pushed away

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      let tx = t1[i3]   * (1 - lerp) + t2[i3]   * lerp;
      let ty = t1[i3+1] * (1 - lerp) + t2[i3+1] * lerp;
      let tz = t1[i3+2] * (1 - lerp) + t2[i3+2] * lerp;

      // Apply mouse/touch repulsion only during the Globe phase AND only when pointer is actively engaged
      if (isGlobePhase && pointerActive.current) {
        const worldX = tx + globeOffset.x;
        const worldY = ty + globeOffset.y;
        const distToMouse = Math.hypot(
          worldX - mouseWorld.x,
          worldY - mouseWorld.y
        );
        if (distToMouse < REPULSE_RADIUS && distToMouse > 0.01) {
          const force = (1 - distToMouse / REPULSE_RADIUS) * REPULSE_STRENGTH;
          const dirX = (worldX - mouseWorld.x) / distToMouse;
          const dirY = (worldY - mouseWorld.y) / distToMouse;
          tx += dirX * force;
          ty += dirY * force;
          tz += (Math.random() - 0.5) * force * 0.3; // Slight Z scatter for 3D feel
        }
      }
      
      currentPos[i3]   = THREE.MathUtils.lerp(currentPos[i3],   tx, 0.14);
      currentPos[i3+1] = THREE.MathUtils.lerp(currentPos[i3+1], ty, 0.14);
      currentPos[i3+2] = THREE.MathUtils.lerp(currentPos[i3+2], tz, 0.14);

      // Color Interpolation Engine
      const ctx = c1[i3]   * (1 - lerp) + c2[i3]   * lerp;
      const cty = c1[i3+1] * (1 - lerp) + c2[i3+1] * lerp;
      const ctz = c1[i3+2] * (1 - lerp) + c2[i3+2] * lerp;

      currentCol[i3]   = THREE.MathUtils.lerp(currentCol[i3],   ctx, 0.10);
      currentCol[i3+1] = THREE.MathUtils.lerp(currentCol[i3+1], cty, 0.10);
      currentCol[i3+2] = THREE.MathUtils.lerp(currentCol[i3+2], ctz, 0.10);
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      if (pointsRef.current.geometry.attributes.color) {
        pointsRef.current.geometry.attributes.color.needsUpdate = true;
      }
      
      // Globe: hold initial face during Phase 1. Only wobble during transitions/other phases.
      // Scrolling back up returns it smoothly to its original orientation.
      const globeActive = scroll < 0.20;
      const targetRotY = globeActive ? 0 : Math.sin(time * 0.3) * 0.06;
      const targetRotX = globeActive ? 0 : Math.cos(time * 0.4) * 0.04;
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, targetRotY, 0.06);
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, targetRotX, 0.06);

      // Desktop: push right. Mobile: move properly UP into the top clear area (but lower so the head doesn't clip!)
      const px = isMobile ? 0 : 4.4;
      const py = isMobile ? 2.4 : 0;
      const pScale = isMobile ? 0.46 : 1.0;
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, px, 0.05);
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, py, 0.05);
      pointsRef.current.scale.setScalar(pScale);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} args={[currentPos, 3]} />
        <bufferAttribute attach="attributes-color"    count={PARTICLE_COUNT} args={[currentCol, 3]} />
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

  // Detect mobile for touch-specific scroll physics
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  useEffect(() => {
    const check = () => setIsMobileLayout(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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

  // Mobile touch: softer spring (lower stiffness, higher damping) to absorb inertia flicks gracefully
  // Desktop mouse: snappier spring for precise wheel control
  const smoothScroll = useSpring(scrollYProgress, 
    isMobileLayout 
      ? { stiffness: 40, damping: 24, restDelta: 0.001 }
      : { stiffness: 60, damping: 18, restDelta: 0.001 }
  );

  // Perfectly sync the text phase strictly to the exact middle of the 3D transitional deadzones
  useEffect(() => {
    return smoothScroll.onChange((v) => {
      // 0.30 is exactly halfway through the 0.20-0.40 visual transition
      if (v < 0.30) setActivePhase(0);
      // 0.70 is exactly halfway through the 0.60-0.80 visual transition
      else if (v < 0.70) setActivePhase(1);
      else setActivePhase(2);
    });
  }, [smoothScroll]);

  // Pointer interaction state: desktop = hovering over canvas, mobile = finger touching
  const pointerActive = useRef(false);

  // Phase indicator dots active state logic
  const dots = [0, 1, 2];

  // Animation variants for cross-fading text
  const textVariants = {
    initial: { opacity: 0, y: 30, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4, ease: "easeOut" as const } },
    exit: { opacity: 0, y: -30, filter: "blur(8px)", transition: { duration: 0.3, ease: "easeIn" as const } }
  };

  return (
    <section ref={containerRef} className="relative w-full h-[470vh] md:h-[330vh] bg-[#020202] text-white">
      
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden">

        {/* Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-15%] left-[5%] w-[700px] h-[700px] rounded-full bg-blue-700/15 blur-[160px]" />
          <div className="absolute bottom-[-10%] right-[5%] w-[800px] h-[800px] rounded-full bg-violet-700/12 blur-[160px]" />
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:30px_30px]" />
        </div>

        {/* Full-Screen 3D Canvas */}
        <div 
          className="absolute inset-0 z-[1]"
          onPointerEnter={() => { if (!isMobileLayout) pointerActive.current = true; }}
          onPointerLeave={() => { pointerActive.current = false; }}
          onPointerDown={() => { if (isMobileLayout) pointerActive.current = true; }}
          onPointerUp={() => { if (isMobileLayout) pointerActive.current = false; }}
          onPointerCancel={() => { if (isMobileLayout) pointerActive.current = false; }}
        >
          <Canvas
            camera={{ position: [0, 0, 14], fov: 42 }}
            gl={{ antialias: false, powerPreference: "high-performance" }}
          >
            <color attach="background" args={["#020202"]} />
            <MorphingParticles scrollProgress={smoothScroll} pointerActive={pointerActive} />
            <EffectComposer enableNormalPass={false}>
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
                {/* ═══════ STAGE 1 (GLOBE / GLOBAL REACH) ═══════ */}
                {activePhase === 0 && (
                  <motion.div
                    key="p1-globe"
                    variants={textVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-x-0 bottom-0 md:top-1/2 md:bottom-auto md:-translate-y-1/2 pointer-events-auto"
                  >
                    <GlassCard>
                      <div className="mb-4 md:mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/50 bg-cyan-500/15 px-3 md:px-4 py-1.5 backdrop-blur-sm w-fit">
                        <Globe className="h-3 md:h-3.5 w-3 md:w-3.5 text-cyan-300" />
                        <span className="text-[10px] sm:text-[11px] font-black tracking-[0.2em] text-cyan-100 uppercase">
                          Websites · Apps · Digital Products
                        </span>
                      </div>

                      <h1 className="text-[2.4rem] sm:text-[3rem] md:text-[4.8rem] lg:text-[6rem] leading-[1.05] font-black tracking-tight text-white mb-4">
                        Your Digital
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-200">
                          Presence, Worldwide.
                        </span>
                      </h1>

                      <p className="max-w-[440px] text-[0.95rem] md:text-[1.05rem] leading-relaxed text-gray-200 mb-5 md:mb-7 font-medium">
                        We design and build conversion-optimised websites, mobile apps, and digital experiences
                        that put your brand in front of customers across the globe.
                      </p>

                      <ul className="space-y-2 md:space-y-3 mb-6 md:mb-9">
                        {[
                          "Custom Websites & Web Applications",
                          "Mobile App Development (iOS & Android)",
                          "E-Commerce & SaaS Platforms",
                          "UI/UX Design & Brand Identity",
                        ].map(item => (
                          <li key={item} className="flex items-center gap-2 md:gap-3 text-[0.82rem] md:text-sm lg:text-[0.95rem] text-gray-200 font-medium">
                            <CheckCircle2 className="h-3.5 md:h-4 w-3.5 md:w-4 text-cyan-300 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
                        <button
                          onClick={onCallbackClick}
                          className="group flex h-14 md:h-12 items-center justify-center gap-3 rounded-full bg-white hover:bg-cyan-50 px-7 text-[14px] md:text-[15px] font-bold text-black shadow-[0_0_28px_rgba(255,255,255,0.14)] transition-all duration-300 hover:scale-105 w-full sm:w-auto"
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

                {/* ═══════ STAGE 3 (GLOBE / DIGITAL PRODUCTS) ═══════ */}
                {activePhase === 2 && (
                  <motion.div
                    key="p3-globe"
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
                        <span className="w-5 h-px bg-gray-500 block" /> Scroll back to top
                      </span>
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
