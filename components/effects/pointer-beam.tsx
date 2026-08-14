"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useDesktopPointer } from "@/lib/use-media";
import { usePointerPercent } from "@/lib/use-pointer-track";

type PointerBeamProps = {
  children: ReactNode;
  className?: string;
};

/** Glowing beam that follows the pointer across a card grid. */
export function PointerBeam({ children, className }: PointerBeamProps) {
  const reduceMotion = useReducedMotion();
  const desktop = useDesktopPointer();
  const { ref, pos, inside, bind } = usePointerPercent({
    enabled: desktop && !reduceMotion,
    initial: { x: 50, y: 40 },
  });

  return (
    <div ref={ref} {...bind} className={cn("relative", className)}>
      {desktop && !reduceMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 max-md:hidden"
          style={{
            opacity: inside ? 1 : 0,
            background: `radial-gradient(420px circle at ${pos.x}% ${pos.y}%, var(--pointer-beam), transparent 55%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
