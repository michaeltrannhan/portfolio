"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type WavyPathBgProps = {
  className?: string;
};

/** Morphing SVG wave bands behind hero content. */
export function WavyPathBg({ className }: WavyPathBgProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden opacity-50",
        className
      )}
    >
      <svg
        className="absolute -bottom-[10%] left-1/2 h-[70%] w-[160%] -translate-x-1/2 text-[var(--accent-line)]"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
      >
        <motion.path
          fill="currentColor"
          fillOpacity={0.08}
          animate={
            reduceMotion
              ? undefined
              : {
                  d: [
                    "M0,220 C240,160 480,280 720,220 C960,160 1200,260 1440,200 L1440,400 L0,400 Z",
                    "M0,200 C240,260 480,140 720,210 C960,280 1200,160 1440,230 L1440,400 L0,400 Z",
                    "M0,220 C240,160 480,280 720,220 C960,160 1200,260 1440,200 L1440,400 L0,400 Z",
                  ],
                }
          }
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          d="M0,220 C240,160 480,280 720,220 C960,160 1200,260 1440,200 L1440,400 L0,400 Z"
        />
        <motion.path
          fill="currentColor"
          fillOpacity={0.06}
          animate={
            reduceMotion
              ? undefined
              : {
                  d: [
                    "M0,260 C320,220 560,300 800,250 C1040,200 1240,280 1440,240 L1440,400 L0,400 Z",
                    "M0,250 C320,300 560,200 800,260 C1040,320 1240,220 1440,270 L1440,400 L0,400 Z",
                    "M0,260 C320,220 560,300 800,250 C1040,200 1240,280 1440,240 L1440,400 L0,400 Z",
                  ],
                }
          }
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          d="M0,260 C320,220 560,300 800,250 C1040,200 1240,280 1440,240 L1440,400 L0,400 Z"
        />
      </svg>
    </div>
  );
}
