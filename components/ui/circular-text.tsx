"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";

type CircularTextProps = {
  text?: string;
  className?: string;
  size?: number;
};

/** Spinning circular path label. */
export function CircularText({
  text = "CRAFT · MOTION · SYSTEMS · ",
  className,
  size = 140,
}: CircularTextProps) {
  const hydrated = useHydrated();
  const reduceMotion = useReducedMotion();
  const chars = text.split("");
  const radius = size / 2 - 10;

  return (
    <div
      aria-hidden
      className={cn(
        "relative inline-flex items-center justify-center",
        hydrated && !reduceMotion && "animate-spin-slow",
        className
      )}
      style={{ width: size, height: size }}
    >
      {chars.map((char, i) => {
        const angle = (i / chars.length) * 360;
        return (
          <span
            key={`${char}-${i}`}
            className="absolute top-1/2 left-1/2 origin-[0_0] text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase"
            style={{
              transform: `rotate(${angle}deg) translate(${radius}px) rotate(90deg)`,
            }}
          >
            {char}
          </span>
        );
      })}
      <span className="h-2 w-2 rounded-full bg-[var(--accent-line)]/70" />
    </div>
  );
}
