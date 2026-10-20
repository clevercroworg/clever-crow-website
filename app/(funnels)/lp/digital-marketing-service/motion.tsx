"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import { motion, useAnimationControls, useInView, type Variants } from "framer-motion";
import { noOrphan } from "./text";

// Shared scroll micro-animations for this page. Only transform and opacity are animated (GPU-friendly,
// no layout work), each element animates once when it enters the viewport, and MotionConfig
// reducedMotion="user" on the page root turns them off for visitors who prefer less motion.

export const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -80px 0px" } as const;

/** Fades and rises a block into place. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  scale = 1,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const groupVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

// Gap between items that sit side by side on the same row.
const StaggerContext = createContext({ stagger: 0.08, delay: 0 });

/**
 * Grid/list wrapper. It does not trigger anything itself: every StaggerItem animates when IT scrolls
 * into view, so long single-column lists on mobile reveal card by card as you scroll. Items sharing a
 * row are offset left to right by `stagger`.
 */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  return (
    <StaggerContext.Provider value={{ stagger, delay }}>
      <div className={className}>{children}</div>
    </StaggerContext.Provider>
  );
}

// Entrance styles for StaggerItem. Springs give a natural settle without long tails.
const SPRING = { type: "spring", stiffness: 210, damping: 22, mass: 0.9 } as const;
export type EntranceVariant = "rise" | "pop" | "tilt" | "slide-left" | "slide-right";

const ITEM_VARIANTS: Record<EntranceVariant, Variants> = {
  // Fade and rise.
  rise: {
    hidden: { opacity: 0, y: 32, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: EASE } },
  },
  // Pops up from small with a soft spring.
  pop: {
    hidden: { opacity: 0, y: 26, scale: 0.82 },
    show: { opacity: 1, y: 0, scale: 1, transition: { ...SPRING, opacity: { duration: 0.35 } } },
  },
  // Tips up from below like a card being stood up (3D).
  tilt: {
    hidden: { opacity: 0, y: 60, rotateX: 22, scale: 0.94, transformPerspective: 1000 },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transformPerspective: 1000,
      transition: { ...SPRING, stiffness: 150, opacity: { duration: 0.45 } },
    },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -70 },
    show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 70 },
    show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
  },
};

export function StaggerItem({
  children,
  className,
  variant = "rise",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: EntranceVariant;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const { stagger, delay } = useContext(StaggerContext);
  // Trigger once a quarter of the item is on screen (works for tall cards on mobile too).
  const inView = useInView(ref, { once: true, amount: 0.25 });

  useEffect(() => {
    if (!inView || !ref.current) return;
    // Column position within its row: 0 for single-column mobile layouts, 0..n-1 on wider grids.
    const el = ref.current;
    const parent = el.parentElement;
    let column = 0;
    if (parent) {
      const box = el.getBoundingClientRect();
      const parentBox = parent.getBoundingClientRect();
      column = Math.max(0, Math.round((box.left - parentBox.left) / Math.max(box.width, 1)));
    }
    const timer = window.setTimeout(() => controls.start("show"), (delay + column * stagger) * 1000);
    return () => window.clearTimeout(timer);
  }, [inView, controls, stagger, delay]);

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={ITEM_VARIANTS[variant]} className={className}>
      {children}
    </motion.div>
  );
}

const iconPopVariants: Variants = {
  hidden: { scale: 0, rotate: -35 },
  show: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 320, damping: 15, delay: 0.12 } },
};

/** Icon that springs in just after its parent StaggerItem appears. */
export function PopIcon({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.span variants={iconPopVariants} className={className}>
      {children}
    </motion.span>
  );
}

const wordVariants: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.75, ease: EASE } },
};

/** Heading text that rises word by word from behind an invisible mask. Screen readers get the plain text. */
export function RiseText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = noOrphan(text).split(" ");
  return (
    <motion.span
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={groupVariants(0.06, delay)}
      className={className}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span variants={wordVariants} className="inline-block">
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </motion.span>
  );
}
