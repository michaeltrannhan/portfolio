"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type AuroraBackgroundProps = {
  className?: string;
};

/** Soft animated mesh / aurora plane — teal–amber, not purple. */
export function AuroraBackground({ className }: AuroraBackgroundProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-[var(--atmosphere-base)]" />
      <div
        className={cn(
          "absolute -left-[20%] -top-[30%] h-[70%] w-[70%] rounded-full bg-[var(--atmosphere-a)] blur-3xl",
          !reduceMotion && "animate-aurora-a"
        )}
      />
      <div
        className={cn(
          "absolute -right-[15%] top-[5%] h-[55%] w-[55%] rounded-full bg-[var(--atmosphere-b)] blur-3xl",
          !reduceMotion && "animate-aurora-b"
        )}
      />
      <div
        className={cn(
          "absolute bottom-[-10%] left-[25%] h-[45%] w-[50%] rounded-full bg-[var(--atmosphere-c)] blur-3xl",
          !reduceMotion && "animate-aurora-c"
        )}
      />
      <div className="hero-grain absolute inset-0" />
    </div>
  );
}
