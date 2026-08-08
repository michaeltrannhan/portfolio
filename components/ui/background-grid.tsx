"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type BackgroundGridProps = {
  className?: string;
};

/** Subtle grid with optional slow parallax drift. */
export function BackgroundGrid({ className }: BackgroundGridProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-[-10%] opacity-[0.35]",
          !reduceMotion && "animate-grid-drift"
        )}
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 75%)",
        }}
      />
    </div>
  );
}
