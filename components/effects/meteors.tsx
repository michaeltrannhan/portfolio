"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";

type MeteorsProps = {
  count?: number;
  className?: string;
};

/** Sparse CSS meteors / shooting stars. */
export function Meteors({ count = 8, className }: MeteorsProps) {
  const hydrated = useHydrated();
  const reduceMotion = useReducedMotion();
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: `${8 + ((i * 11) % 70)}%`,
        left: `${5 + ((i * 17) % 85)}%`,
        delay: (i * 0.9) % 6,
        duration: 1.8 + (i % 4) * 0.35,
      })),
    [count]
  );

  if (!hydrated || reduceMotion) return null;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden max-md:hidden",
        className
      )}
    >
      {items.map((m) => (
        <motion.span
          key={m.id}
          className="absolute h-px w-20 origin-left bg-gradient-to-r from-[var(--accent-line)] to-transparent opacity-0"
          style={{ top: m.top, left: m.left, rotate: -28 }}
          animate={{
            opacity: [0, 0.85, 0],
            x: [0, 180],
            y: [0, 100],
          }}
          transition={{
            duration: m.duration,
            delay: m.delay,
            repeat: Infinity,
            repeatDelay: 5 + (m.id % 3),
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
