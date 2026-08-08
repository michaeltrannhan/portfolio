"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** Top-of-page scroll progress bar. */
export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[var(--accent-line)]"
      style={{ scaleX: reduceMotion ? scrollYProgress : scaleX }}
    />
  );
}
