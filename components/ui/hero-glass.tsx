"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type HeroGlassProps = {
  className?: string;
};

/** Layered frosted planes behind the hero — atmospheric depth, not clutter. */
export function HeroGlass({ className }: HeroGlassProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-[1] overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "glass-shard absolute -left-[8%] top-[18%] h-[42%] w-[46%] opacity-50 max-md:opacity-35",
          !reduceMotion && "animate-glass-drift-a"
        )}
      />
      <div
        className={cn(
          "glass-shard absolute -right-[6%] top-[28%] h-[36%] w-[38%] opacity-40 max-md:hidden",
          !reduceMotion && "animate-glass-drift-b"
        )}
      />
      <div
        className={cn(
          "glass-shard absolute bottom-[12%] left-[22%] h-[22%] w-[48%] opacity-30 max-md:opacity-20",
          !reduceMotion && "animate-glass-drift-c"
        )}
      />
    </div>
  );
}
