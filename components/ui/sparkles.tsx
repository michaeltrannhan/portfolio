"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type SparklesProps = {
  className?: string;
  count?: number;
};

/** Sparse particle accents near CTAs — very light. */
export function Sparkles({ className, count = 8 }: SparklesProps) {
  const reduceMotion = useReducedMotion();
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${8 + ((i * 37) % 84)}%`,
        top: `${12 + ((i * 53) % 70)}%`,
        size: 1.5 + (i % 3),
        delay: (i % 5) * 0.35,
        duration: 2.4 + (i % 4) * 0.4,
      })),
    [count]
  );

  if (reduceMotion) return null;

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 max-md:hidden", className)}
    >
      {dots.map((dot) => (
        <motion.span
          key={dot.id}
          className="absolute rounded-full bg-[var(--sparkle)]"
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
          }}
          animate={{ opacity: [0.15, 0.85, 0.15], scale: [0.8, 1.25, 0.8] }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
