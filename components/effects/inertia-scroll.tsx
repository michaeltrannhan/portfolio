"use client";

import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Lightweight inertia-feel enhancement:
 * briefly eases scroll anchoring after wheel bursts without a Lenis dependency.
 */
export function InertiaScroll() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let ticking = false;
    let last = 0;

    const onWheel = () => {
      last = performance.now();
      if (ticking) return;
      ticking = true;
      document.documentElement.classList.add("inertia-scroll");
      const loop = () => {
        if (performance.now() - last > 140) {
          document.documentElement.classList.remove("inertia-scroll");
          ticking = false;
          return;
        }
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      document.documentElement.classList.remove("inertia-scroll");
    };
  }, [reduceMotion]);

  return null;
}
