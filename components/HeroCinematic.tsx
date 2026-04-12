"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Target, TrendingUp, Users, Briefcase, CheckCircle } from "lucide-react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// ──────────────────────────────────────────────
// CUSTOM SHADERS FOR GPU ACCELERATION
// ──────────────────────────────────────────────

const vertexShader = `
  uniform float uTime;
  uniform float uLerp;
  uniform vec3 uPointer;
  uniform float uPointerActive;
  uniform float uScroll;
  uniform float uSize;

  attribute vec3 posGlobe;
  attribute vec3 posFunnel;
  attribute vec3 colorGlobe;
  attribute vec3 colorFunnel;

  varying vec3 vColor;

  void main() {
    // 1. Morph positions
    vec3 targetPos = mix(posGlobe, posFunnel, uLerp);
    
    // 2. Ambience
    targetPos.y += sin(uTime * 0.5 + posGlobe.x) * 0.1;
    targetPos.x += cos(uTime * 0.5 + posGlobe.y) * 0.1;

    // 3. Pointer Repulsion
    if (uScroll < 0.4 && uPointerActive > 0.5) {
      float dist = distance(targetPos.xy, uPointer.xy);
      if (dist < 4.0 && dist > 0.01) {
        float force = (1.0 - dist / 4.0) * 2.0;
        vec3 dir = normalize(vec3(targetPos.xy - uPointer.xy, 0.0));
        targetPos.xy += dir.xy * force;
        targetPos.z += force * 0.5;
      }
    }

    vColor = mix(colorGlobe, colorFunnel, uLerp);

    vec4 mvPosition = modelViewMatrix * vec4(targetPos, 1.0);
    // Increased base point size for visibility
    gl_PointSize = uSize * (1000.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;

  void main() {
    // Simple circular point
    float r = 0.0, d = distance(gl_PointCoord, vec2(0.5));
    if (d > 0.5) discard;
    gl_FragColor = vec4(vColor, 0.82);
  }
`;

// ──────────────────────────────────────────────
// MORPHING PARTICLE SYSTEM (GPU VERSION)
// ──────────────────────────────────────────────
const DESKTOP_COUNT = 14000;
const MOBILE_COUNT = 6000; // Increased count since it's now GPU-accelerated

function MorphingParticles({ scrollProgress, pointerActive, isMobile }: { scrollProgress: any; pointerActive: React.RefObject<boolean>; isMobile: boolean }) {
  const count = isMobile ? MOBILE_COUNT : DESKTOP_COUNT;
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { pointer, viewport } = useThree();

  const { posGlobe, posFunnel, colGlobe, colFunnel } = useMemo(() => {
    const pg = new Float32Array(count * 3);
    const pf = new Float32Array(count * 3);
    const cg = new Float32Array(count * 3);
    const cf = new Float32Array(count * 3);

    const GLOBE_R = 5.5; 
    const LAT_LINES = 12;
    const LON_LINES = 18;

    for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        // GLOBE POSITIONS
        const globeRole = Math.random();
        let gx, gy, gz;

        if (globeRole < 0.30) {
            const latIdx = Math.floor(Math.random() * LAT_LINES);
            const phi = (Math.PI / (LAT_LINES + 1)) * (latIdx + 1);
            const theta = Math.random() * Math.PI * 2;
            gx = GLOBE_R * Math.sin(phi) * Math.cos(theta);
            gy = GLOBE_R * Math.cos(phi);
            gz = GLOBE_R * Math.sin(phi) * Math.sin(theta);
        } else if (globeRole < 0.55) {
            const lonIdx = Math.floor(Math.random() * LON_LINES);
            const theta = (Math.PI * 2 / LON_LINES) * lonIdx;
            const phi = Math.random() * Math.PI;
            gx = GLOBE_R * Math.sin(phi) * Math.cos(theta);
            gy = GLOBE_R * Math.cos(phi);
            gz = GLOBE_R * Math.sin(phi) * Math.sin(theta);
        } else if (globeRole < 0.72) {
            const phi = Math.acos(2 * Math.random() - 1);
            const theta = Math.random() * Math.PI * 2;
            gx = GLOBE_R * Math.sin(phi) * Math.cos(theta);
            gy = GLOBE_R * Math.cos(phi);
            gz = GLOBE_R * Math.sin(phi) * Math.sin(theta);
        } else {
            const radius = GLOBE_R + Math.pow(Math.random(), 1.6) * 18.0; 
            const phi = Math.acos(2 * Math.random() - 1);
            const theta = Math.random() * Math.PI * 2;
            gx = radius * Math.sin(phi) * Math.cos(theta);
            gy = radius * Math.cos(phi);
            gz = (radius * Math.sin(phi) * Math.sin(theta)) - 3.0; 
        }
        pg[i3] = gx; pg[i3+1] = gy; pg[i3+2] = gz;

        const cm = Math.random();
        if (cm > 0.7)      { cg[i3] = 1.0; cg[i3+1] = 0.8; cg[i3+2] = 0.1; }
        else if (cm > 0.4) { cg[i3] = 0.1; cg[i3+1] = 0.5; cg[i3+2] = 0.9; }
        else if (cm > 0.1) { cg[i3] = 0.0; cg[i3+1] = 0.3; cg[i3+2] = 0.7; }
        else               { cg[i3] = 1.0; cg[i3+1] = 0.9; cg[i3+2] = 0.3; }

        // FUNNEL POSITIONS
        const bars = 5;
        const bW = 1.0;
        const gap = 1.8;
        const totalW = bars * bW + (bars - 1) * gap;
        const bIdx = Math.floor(Math.random() * bars);
        const bHeight = ((bIdx + 1) / bars) * 7.0; 
        let fx = (Math.random() - 0.5) * bW;
        let fy = Math.random() * bHeight - 3.5;
        let fz = (Math.random() - 0.5) * bW;
        const fS = Math.random();
        if (fS < 0.25) { fx = (Math.random() > 0.5 ? 1 : -1) * bW/2; }
        else if (fS < 0.50) { fz = (Math.random() > 0.5 ? 1 : -1) * bW/2; }
        else if (fS < 0.75) { fy = bHeight - 3.5; }
        else { fy = -3.5; }
        fx += (bIdx * (bW + gap)) - totalW/2 + bW/2;
        const rRole = Math.random();
        if (rRole < 0.25) {
            const t = Math.random();
            fx = (t * totalW * 1.3) - (totalW * 1.3)/2;
            fy = (t * 7.0 * 1.3) - 3.5; 
            fz = Math.sin(t * Math.PI * 1.5) * 2.5; 
            cf[i3] = 0.3; cf[i3+1] = 0.8; cf[i3+2] = 1.0;
        } else {
            cf[i3] = 0.2; cf[i3+1] = 0.5; cf[i3+2] = 0.9;
        }
        const isoAngle = Math.PI * 0.15; 
        pf[i3] = fx * Math.cos(isoAngle) - fz * Math.sin(isoAngle);
        pf[i3+1] = fy;
        pf[i3+2] = fx * Math.sin(isoAngle) + fz * Math.cos(isoAngle);
    }
    return { posGlobe: pg, posFunnel: pf, colGlobe: cg, colFunnel: cf };
  }, [count]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uLerp: { value: 0 },
    uPointer: { value: new THREE.Vector3() },
    uPointerActive: { value: 0 },
    uScroll: { value: 0 },
    uSize: { value: 0.08 }
  }), []);

  useFrame((state) => {
    if (!materialRef.current) return;
    const scroll = (scrollProgress as any).get() as number;
    let raw = (scroll - 0.15) / 0.25;
    raw = Math.max(0, Math.min(1, raw));
    const smoothLerp = raw * raw * (3 - 2 * raw);

    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    materialRef.current.uniforms.uLerp.value = smoothLerp;
    materialRef.current.uniforms.uScroll.value = scroll;
    materialRef.current.uniforms.uPointerActive.value = pointerActive.current ? 1.0 : 0.0;
    materialRef.current.uniforms.uPointer.value.set(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
    );

    if (meshRef.current) {
        const time = state.clock.getElapsedTime();
        const targetRotY = Math.sin(time * 0.15) * 0.05 + (pointer.x * 0.05);
        const targetRotX = Math.cos(time * 0.2)  * 0.03 - (pointer.y * 0.05);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.06);
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.06);
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position"    args={[posGlobe, 3]} />
        <bufferAttribute attach="attributes-posGlobe"    args={[posGlobe, 3]} />
        <bufferAttribute attach="attributes-posFunnel"   args={[posFunnel, 3]} />
        <bufferAttribute attach="attributes-colorGlobe"  args={[colGlobe, 3]} />
        <bufferAttribute attach="attributes-colorFunnel" args={[colFunnel, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroCinematic({ onCallbackClick }: { onCallbackClick?: () => void }) {
  const containerRef = useRef<HTMLElement>(null);
  const scrollYProgress = useMotionValue(0);
  const [activePhase, setActivePhase] = useState(0);

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

  const smoothScroll = useSpring(scrollYProgress, 
    isMobileLayout 
      ? { stiffness: 90, damping: 20, restDelta: 0.001 }
      : { stiffness: 65, damping: 18, restDelta: 0.001 }
  );

  useEffect(() => {
    return smoothScroll.on("change", (v) => {
      if (v < 0.28) setActivePhase(0);
      else setActivePhase(1);
    });
  }, [smoothScroll]);

  const pointerActive = useRef(false);

  const textVariants: any = {
    initial: { opacity: 0, y: 30, filter: "blur(10px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -30, filter: "blur(10px)", transition: { duration: 0.4, ease: "easeIn" } }
  };

  return (
    <section ref={containerRef} className="relative w-full h-[350vh] md:h-[400vh] bg-[#020202] text-white">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-blue-700/15 blur-[160px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-violet-700/15 blur-[160px]" />
        </div>

        <div 
          className="absolute inset-0 z-[1] flex items-center justify-center opacity-80"
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
            <MorphingParticles 
              scrollProgress={smoothScroll} 
              pointerActive={pointerActive} 
              isMobile={isMobileLayout}
            />
            {/* Optimized Bloom for both Mobile and Desktop */}
            <EffectComposer enableNormalPass={false}>
              <Bloom 
                luminanceThreshold={isMobileLayout ? 0.35 : 0.2} 
                mipmapBlur 
                intensity={isMobileLayout ? 0.8 : 1.8} 
                radius={isMobileLayout ? 0.5 : 0.8} 
              />
            </EffectComposer>
          </Canvas>
          <div className="absolute inset-0 pointer-events-none z-[2] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,2,2,0.6)_100%)]" />
        </div>

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-10 pointer-events-none">
          <div className="relative w-full min-h-[400px] flex items-center justify-center text-center">
            <AnimatePresence mode="wait">
              {activePhase === 0 && (
                <motion.div
                  key="phase-1"
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-auto px-4"
                >
                  <div className="w-full max-w-4xl mx-auto px-5 py-8 sm:px-6 sm:py-16 md:px-10 flex flex-col items-center text-center rounded-[2rem] sm:rounded-[2.5rem] bg-[#020202]/50 backdrop-blur-3xl saturate-150 border border-white/[0.12] shadow-[0_20px_50px_0_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.3)] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                    <div className="relative z-10 flex flex-col items-center w-full">
                      <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-500/10 px-4 py-1.5 backdrop-blur-sm">
                        <Target className="h-4 w-4 text-cyan-400" />
                        <span className="text-[10px] sm:text-sm font-bold tracking-widest text-cyan-100 uppercase">Our Objective</span>
                      </div>
                      <h1 className="text-[2.75rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] leading-[1.05] font-black tracking-tight text-white mb-4 sm:mb-6">
                        Your Digital
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-300">Presence, Worldwide.</span>
                      </h1>
                      <p className="text-[0.95rem] sm:text-[1.05rem] md:text-xl leading-relaxed text-gray-300 mb-8 sm:mb-10 max-w-2xl font-medium text-balance">
                        We build <strong className="text-white font-bold">conversion-optimised websites and digital experiences</strong> that put your brand in front of customers&nbsp;worldwide.
                      </p>
                      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 justify-center w-full">
                        <button onClick={onCallbackClick} className="group flex h-12 sm:h-14 items-center justify-center gap-3 rounded-full bg-yellow-500 hover:bg-yellow-400 px-8 text-[15px] font-bold text-white shadow-[0_0_30px_rgba(234,179,8,0.25)] transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                          Get a Free Consultation
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <a href="#portfolio" className="text-[15px] font-bold text-gray-300 hover:text-white underline underline-offset-4 transition-colors h-14 flex items-center justify-center">View our portfolio</a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activePhase === 1 && (
                <motion.div
                  key="phase-2"
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-auto px-4"
                >
                  <div className="w-full max-w-4xl mx-auto px-5 py-8 sm:px-6 sm:py-16 md:px-10 flex flex-col items-center text-center rounded-[2rem] sm:rounded-[2.5rem] bg-[#020202]/50 backdrop-blur-3xl saturate-150 border border-white/[0.12] shadow-[0_20px_50px_0_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.3)] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                    <div className="relative z-10 flex flex-col items-center w-full">
                      <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-4 py-1.5 backdrop-blur-sm">
                        <TrendingUp className="h-4 w-4 text-violet-400" />
                        <span className="text-[10px] sm:text-sm font-bold tracking-widest text-violet-100 uppercase">What You Get</span>
                      </div>
                      <h1 className="text-[2.75rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] leading-[1.05] font-black tracking-tight text-white mb-4 sm:mb-6">
                        Marketing That
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-fuchsia-200 to-indigo-300">Fills Your Pipeline.</span>
                      </h1>
                      <p className="text-[0.95rem] sm:text-[1.05rem] md:text-xl leading-relaxed text-gray-300 mb-8 sm:mb-10 max-w-2xl font-medium text-balance">
                        We build <strong className="text-white font-bold">scalable, data-driven systems</strong> to capture intent, generate leads, and maximize&nbsp;ROI.
                      </p>
                      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 justify-center w-full">
                        <button onClick={onCallbackClick} className="group flex h-12 sm:h-14 items-center justify-center gap-3 rounded-full bg-violet-500 hover:bg-violet-400 px-8 text-[15px] font-bold text-white shadow-[0_0_30px_rgba(139,92,246,0.25)] transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                          Start Scaling Today
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <a href="#services" className="text-[15px] font-bold text-gray-300 hover:text-white underline underline-offset-4 transition-colors h-14 flex items-center justify-center">Explore our services</a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
          {[0, 1].map((dotIndex) => (
            <motion.div
              key={dotIndex}
              initial={false}
              animate={{ opacity: activePhase === dotIndex ? 1 : 0.2, scale: activePhase === dotIndex ? 1.2 : 1 }}
              transition={{ duration: 0.3 }}
              className="w-1.5 h-1.5 rounded-full bg-white"
            />
          ))}
        </div>

        <div className="absolute bottom-0 left-0 w-full border-t border-white/[0.05] bg-black/40 backdrop-blur-md z-30">
          <div className="max-w-[1200px] mx-auto px-4 py-4 sm:py-5 grid grid-cols-2 lg:flex lg:items-center lg:justify-center gap-y-4 gap-x-2 sm:gap-x-6 lg:gap-14">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-cyan-400 shrink-0" />
              <div className="text-[11.5px] sm:text-sm lg:text-base font-medium text-gray-300 tracking-wide leading-tight">
                <strong className="text-white font-bold text-sm sm:text-base lg:text-lg block lg:inline lg:mr-1">8+</strong> 
                Years of Experience
              </div>
            </div>
            <div className="flex items-center gap-2.5 sm:gap-3">
              <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-cyan-400 shrink-0" />
              <div className="text-[11.5px] sm:text-sm lg:text-base font-medium text-gray-300 tracking-wide leading-tight">
                <strong className="text-white font-bold text-sm sm:text-base lg:text-lg block lg:inline lg:mr-1">35+</strong> 
                In-House Experts
              </div>
            </div>
            <div className="flex items-center gap-2.5 sm:gap-3">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-violet-400 shrink-0" />
              <div className="text-[11.5px] sm:text-sm lg:text-base font-medium text-gray-300 tracking-wide leading-tight">
                <strong className="text-white font-bold text-sm sm:text-base lg:text-lg block lg:inline lg:mr-1">100k+</strong> 
                Hours Delivered
              </div>
            </div>
            <div className="flex items-center gap-2.5 sm:gap-3">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-violet-400 shrink-0" />
              <div className="text-[11.5px] sm:text-sm lg:text-base font-medium text-gray-300 tracking-wide leading-tight">
                <strong className="text-white font-bold text-sm sm:text-base lg:text-lg block lg:inline lg:mr-1">500+</strong> 
                Projects Delivered
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
