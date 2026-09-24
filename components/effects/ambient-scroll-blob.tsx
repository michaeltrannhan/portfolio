"use client";

import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";

type AmbientScrollBlobProps = {
  className?: string;
};

/**
 * Soft light blob that tracks scroll progress down the page.
 * Moves via translateY only (compositor-friendly) — animating `top` would
 * relayout + repaint a large blurred layer on every scroll frame.
 */
export function AmbientScrollBlob({ className }: AmbientScrollBlobProps) {
  const hydrated = useHydrated();
  const reduceMotion = useHydratedReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["12vh", "78vh"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.35, 0.55, 0.45, 0.25]
  );

  if (!hydrated || reduceMotion) return null;

  return (
    <motion.div
      aria-hidden
      className={cn(
        "pointer-events-none fixed left-1/2 top-0 z-0 h-64 w-64 -translate-x-1/2 rounded-full blur-3xl max-md:hidden",
        className
      )}
      style={{
        y,
        opacity,
        background:
          "radial-gradient(circle, var(--ambient-blob), transparent 70%)",
      }}
    />
  );
}
