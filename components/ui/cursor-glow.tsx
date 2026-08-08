"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Soft desktop cursor glow trail — disabled on touch / reduced motion. */
export function CursorGlow() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    if (reduceMotion) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    const onMove = (event: MouseEvent) => {
      setPos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduceMotion]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[70] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-multiply dark:mix-blend-soft-light max-md:hidden"
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 180, damping: 28, mass: 0.35 }}
      style={{
        background:
          "radial-gradient(circle, var(--cursor-glow), transparent 65%)",
      }}
    />
  );
}
