"use client";

import type { CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type InfiniteMarqueeProps = {
  items: string[];
  className?: string;
  speed?: number;
};

/** Infinite horizontal logo / tech cloud. */
export function InfiniteMarquee({
  items,
  className,
  speed = 36,
}: InfiniteMarqueeProps) {
  const reduceMotion = useReducedMotion();
  const loop = [...items, ...items];

  return (
    <div
      className={cn(
        "relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex w-max gap-3 py-1",
          !reduceMotion && "animate-marquee"
        )}
        style={
          !reduceMotion
            ? ({ "--marquee-duration": `${speed}s` } as CSSProperties)
            : undefined
        }
      >
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="glass-soft inline-flex shrink-0 items-center rounded-full px-4 py-2 text-sm text-foreground/90"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
