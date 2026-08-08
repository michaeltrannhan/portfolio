"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type FooterWaveProps = {
  className?: string;
};

/** Morphing SVG wave separator above the footer. */
export function FooterWave({ className }: FooterWaveProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className={cn("relative -mb-px h-16 w-full overflow-hidden", className)}
    >
      <svg
        className="absolute inset-x-0 bottom-0 h-full w-full text-[var(--footer-wash)]"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <motion.path
          fill="currentColor"
          animate={
            reduceMotion
              ? undefined
              : {
                  d: [
                    "M0,40 C240,70 480,10 720,40 C960,70 1200,20 1440,45 L1440,80 L0,80 Z",
                    "M0,48 C240,20 480,70 720,35 C960,10 1200,60 1440,40 L1440,80 L0,80 Z",
                    "M0,40 C240,70 480,10 720,40 C960,70 1200,20 1440,45 L1440,80 L0,80 Z",
                  ],
                }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          d="M0,40 C240,70 480,10 720,40 C960,70 1200,20 1440,45 L1440,80 L0,80 Z"
        />
      </svg>
    </div>
  );
}
