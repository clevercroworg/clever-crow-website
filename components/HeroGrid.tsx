"use client";

import React, { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowRight, Target } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// ─────────────────────────────────────────────────────────
// WebGL Illusion Background
// Uses a fragment shader to create a flowing, hypnotic
// plasma/aurora illusion with infinite depth tunnelling.
// ─────────────────────────────────────────────────────────

const VERT_SRC = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// Crisp digital wave mesh — no nested loops, guaranteed WebGL compatible
const FRAG_SRC = `
  precision highp float;
  uniform float u_time;
  uniform vec2  u_resolution;

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float t = u_time * 0.1;

    // Aspect-corrected coordinates
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);

    // ── DIGITAL WAVE MESH ──
    // Multiple layers of sharp sine wave grid lines
    float mesh = 0.0;

    // Horizontal flowing waves (6 lines)
    for (int i = 0; i < 6; i++) {
      float fi = float(i);
      float yBase = -0.35 + fi * 0.14;
      float wave = yBase
        + sin(p.x * 4.0 + t * (1.5 + fi * 0.4) + fi * 0.8) * 0.04
        + sin(p.x * 8.0 - t * (2.0 + fi * 0.3) + fi * 1.5) * 0.02
        + sin(p.x * 2.0 + t * 0.8 + fi * 2.5) * 0.03;

      float d = abs(p.y - wave);
      // Sharp crisp line — 1.5px effective width
      float line = smoothstep(0.003, 0.0008, d);
      // Tight glow halo
      float glow = smoothstep(0.025, 0.003, d) * 0.15;
      mesh += (line + glow) * (0.3 + 0.12 * fi);
    }

    // Vertical wave lines crossing (4 lines)
    for (int i = 0; i < 4; i++) {
      float fi = float(i);
      float xBase = -0.4 + fi * 0.25;
      float wave = xBase
        + sin(p.y * 5.0 + t * (1.2 + fi * 0.5) + fi * 1.3) * 0.03
        + cos(p.y * 10.0 - t * (1.8 + fi * 0.2)) * 0.015;

      float d = abs(p.x - wave);
      float line = smoothstep(0.002, 0.0005, d);
      float glow = smoothstep(0.02, 0.002, d) * 0.1;
      mesh += (line + glow) * 0.2;
    }

    // ── NODE DOTS at wave intersections ──
    float nodes = 0.0;
    for (int i = 0; i < 6; i++) {
      float fi = float(i);
      float ny = -0.35 + fi * 0.14;
      ny += sin(fi * 2.1 + t * 1.2) * 0.04;

      for (int j = 0; j < 4; j++) {
        float fj = float(j);
        float nx = -0.4 + fj * 0.25;
        nx += sin(fj * 1.7 + t * 0.9 + fi) * 0.03;

        float d = length(p - vec2(nx, ny));
        // Sharp dot
        float pulse = 0.5 + 0.5 * sin(t * 4.0 + fi * 2.0 + fj * 3.0);
        float dotR = 0.004 + 0.002 * pulse;
        float dot = smoothstep(dotR, dotR * 0.3, d);
        // Ring
        float ring = smoothstep(0.001, 0.0, abs(d - dotR * 2.5)) * 0.5;
        nodes += (dot + ring) * 0.6;
      }
    }

    // ── COMPOSITE ──
    float intensity = clamp(mesh + nodes, 0.0, 1.0);

    // Single navy tone
    vec3 base   = vec3(0.008, 0.012, 0.04);
    vec3 mid    = vec3(0.03,  0.06,  0.18);
    vec3 bright = vec3(0.08,  0.14,  0.38);

    vec3 col = mix(base, mid, smoothstep(0.0, 0.3, intensity));
    col      = mix(col, bright, smoothstep(0.25, 0.7, intensity));

    // Extra brightness on nodes
    col += vec3(0.05, 0.1, 0.35) * nodes;

    // Vignette
    float vig = smoothstep(1.6, 0.4, length(p) * 1.2);
    col *= vig;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function IllusionCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const glRef     = useRef<{
    gl: WebGLRenderingContext;
    prog: WebGLProgram;
    uTime: WebGLUniformLocation;
    uRes: WebGLUniformLocation;
  } | null>(null);

  const initWebGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "high-performance" });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(s));
      }
      return s;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT_SRC));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG_SRC));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    // Fullscreen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    glRef.current = {
      gl,
      prog,
      uTime: gl.getUniformLocation(prog, "u_time")!,
      uRes:  gl.getUniformLocation(prog, "u_resolution")!,
    };
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx    = glRef.current;
    if (!canvas || !ctx) return;
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.gl.viewport(0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    initWebGL();
    resize();
    const observer = new ResizeObserver(resize);
    if (canvasRef.current) observer.observe(canvasRef.current);

    let start = performance.now();
    const render = () => {
      const ctx = glRef.current;
      if (!ctx) return;
      const t = (performance.now() - start) / 1000;
      const { gl, uTime, uRes } = ctx;
      const c = canvasRef.current!;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, c.width, c.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, [initWebGL, resize]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ imageRendering: "auto", display: "block" }}
    />
  );
}

// ─────────────────────────────────────────────────────────
// HERO GRID
// ─────────────────────────────────────────────────────────
export default function HeroGrid({ onCallbackClick }: { onCallbackClick?: () => void }) {
  const cards = [
    { id: 1, title: "Business Websites", desc: "Conversion-optimised digital experiences.", image: "/services/web_design.png" },
    { id: 2, title: "Google Ads",         desc: "Capture high-intent traffic.",             image: "/services/google_ads.png" },
    { id: 3, title: "Social Ads",         desc: "Targeted ads to scale your brand.",        image: "/services/social_ads.png" },
    { id: 4, title: "SEO",                desc: "Data-driven organic growth.",              image: "/services/seo.png" },
  ];

  return (
    <section className="relative w-full min-h-[100dvh] bg-[#020202] text-white flex items-center pt-24 pb-16 overflow-hidden">

      {/* ── BACKGROUND ─────────────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Single WebGL illusion shader — handles its own vignette */}
        <IllusionCanvas />
      </div>

      {/* ── CONTENT ────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT: Text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            {/* Badge */}
            <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-500/10 px-5 py-2 backdrop-blur-md shadow-[0_0_20px_rgba(244,197,66,0.15)]">
              <Target className="h-4 w-4 text-yellow-400" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.15em] text-yellow-100 uppercase">
                Precision Engineering
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-[3rem] sm:text-[4rem] lg:text-[4.5rem] leading-[1.06] font-black tracking-tight text-white mb-6">
              Your Digital<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500">
                Presence
              </span><br />
              Worldwide.
            </h1>

            {/* Body */}
            <p className="text-lg sm:text-xl leading-relaxed text-gray-300 max-w-lg font-medium mb-10 text-balance">
              From high-converting ad campaigns to full-stack web applications, we build{" "}
              <strong className="text-white font-bold">scalable, data-driven systems</strong> to capture intent and maximize ROI.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 w-full">
              <button
                onClick={onCallbackClick}
                className="group relative flex items-center gap-4 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 px-2 py-2 pr-7 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(244,197,66,0.4)] w-full sm:w-auto"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-700" />
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 z-10 shadow-md group-hover:scale-95 transition-transform">
                  <ArrowRight className="h-5 w-5 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <span className="text-[16px] font-extrabold text-gray-900 z-10 whitespace-nowrap">
                  Get a Free Consultation
                </span>
              </button>

              <Link href="#services" className="text-[15px] font-bold text-gray-300 hover:text-white transition-colors h-14 flex items-center gap-2">
                Explore our services
                <ArrowRight className="h-4 w-4 opacity-50" />
              </Link>
            </div>
          </motion.div>

          {/* RIGHT: 2×2 Service Cards */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.18 }}
            className="w-full relative"
          >
            {/* Grid underlay glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-blue-500/15 blur-[90px] rounded-full pointer-events-none" />

            {/* ── Animated ring at center of 4 cards ── */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
              {/* Outer spinning ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, ease: "linear", repeat: Infinity }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-yellow-400/50 border-t-yellow-400 border-r-transparent"
              />
              {/* Inner counter-spinning ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                className="absolute inset-2 rounded-full border border-blue-400/40 border-b-blue-400 border-l-transparent"
              />
              {/* Center glowing dot */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-yellow-400 shadow-[0_0_15px_rgba(244,197,66,0.6),0_0_30px_rgba(244,197,66,0.3)]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-5 relative z-10">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gray-900/80 border border-white/8 h-[200px] sm:h-[270px] shadow-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-500/40 hover:shadow-[0_20px_50px_rgba(6,182,212,0.18)]"
                >
                  {/* Background image — brighter */}
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-95"
                    sizes="(max-width: 768px) 50vw, 30vw"
                  />

                  {/* Dark gradient overlay — lighter at top so face/scene is visible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/90 via-[#020202]/20 to-transparent pointer-events-none" />

                  {/* Warm amber/yellow tint overlay — always on */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-500/30 via-yellow-400/10 to-transparent mix-blend-multiply pointer-events-none" />
                  {/* Golden sheen that intensifies on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 to-amber-500/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Hover top-right arrow badge */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-400 hidden sm:flex">
                    <ArrowRight className="w-4 h-4 text-cyan-300 -rotate-45" />
                  </div>

                  {/* ── Title pinned at same position on every card ── */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                    {/* Desc — slides up on hover */}
                    <div className="overflow-hidden mb-1 hidden sm:block">
                      <p className="text-[13px] font-semibold text-cyan-200/80 leading-snug translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        {card.desc}
                      </p>
                    </div>
                    {/* Title — always at bottom, same position */}
                    <h3 className="text-[1.15rem] sm:text-[1.4rem] font-black text-white leading-tight tracking-tight drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)]">
                      {card.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
