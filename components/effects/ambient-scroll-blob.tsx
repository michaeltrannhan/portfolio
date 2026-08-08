"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";

type AmbientScrollBlobProps = {
  className?: string;
};

/** Soft light blob that tracks scroll progress down the page. */
export function AmbientScrollBlob({ className }: AmbientScrollBlobProps) {
  const hydrated = useHydrated();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const top = useTransform(scrollYProgress, [0, 1], ["12%", "78%"]);
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
        "pointer-events-none fixed left-1/2 z-0 h-64 w-64 -translate-x-1/2 rounded-full blur-3xl max-md:hidden",
        className
      )}
      style={{
        top,
        opacity,
        background:
          "radial-gradient(circle, var(--ambient-blob), transparent 70%)",
      }}
    />
  );
}
