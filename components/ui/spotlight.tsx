"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { usePointerPercent } from "@/lib/use-pointer-track";

type SpotlightProps = {
  children: ReactNode;
  className?: string;
  /** Soft fill color for the spotlight (CSS color). */
  color?: string;
  size?: number;
};

/** Mouse-follow radial spotlight. Disabled on coarse pointers. */
export function Spotlight({
  children,
  className,
  color = "var(--spotlight)",
  size = 420,
}: SpotlightProps) {
  const { ref, pos, inside, bind } = usePointerPercent({
    initial: { x: 50, y: 40 },
  });

  return (
    <div
      ref={ref}
      {...bind}
      className={cn("relative overflow-hidden", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 max-md:hidden"
        style={{
          opacity: inside ? 1 : 0.35,
          background: `radial-gradient(${size}px circle at ${pos.x}% ${pos.y}%, ${color}, transparent 55%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
