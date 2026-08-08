"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type NoiseOverlayProps = {
  className?: string;
};

/** Soft fractal-noise film grain that subtly shifts with scroll. */
export function NoiseOverlay({ className }: NoiseOverlayProps) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <motion.div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-[1] mix-blend-multiply dark:mix-blend-soft-light",
        className
      )}
      style={{
        opacity: "var(--noise-opacity)",
        ...(reduceMotion ? undefined : { x, y }),
      }}
    >
      <div
        className="h-[120%] w-[120%] -translate-x-[5%] -translate-y-[5%]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
        }}
      />
    </motion.div>
  );
}
