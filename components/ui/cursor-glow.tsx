"use client";

import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";
import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useDesktopPointer } from "@/lib/use-media";

/** Soft desktop cursor glow trail — disabled on touch / reduced motion. */
export function CursorGlow() {
  const reduceMotion = useHydratedReducedMotion();
  const desktop = useDesktopPointer();
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 180, damping: 28, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 180, damping: 28, mass: 0.35 });

  useEffect(() => {
    if (!desktop || reduceMotion) return;

    // Motion values bypass React state — no re-render per mousemove.
    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [desktop, reduceMotion, x, y]);

  if (!desktop || reduceMotion) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[70] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-multiply dark:mix-blend-soft-light max-md:hidden"
      style={{
        x: springX,
        y: springY,
        background:
          "radial-gradient(circle, var(--cursor-glow), transparent 65%)",
      }}
    />
  );
}
