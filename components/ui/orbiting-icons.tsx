"use client";

import { Code2, Database, Layout, Sparkles, Terminal } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";

const ICONS = [
  { Icon: Code2, angle: 0 },
  { Icon: Layout, angle: 72 },
  { Icon: Terminal, angle: 144 },
  { Icon: Database, angle: 216 },
  { Icon: Sparkles, angle: 288 },
];

type OrbitingIconsProps = {
  className?: string;
  label?: string;
};

/** Icons orbiting a center node. */
export function OrbitingIcons({
  className,
  label = "Core",
}: OrbitingIconsProps) {
  const hydrated = useHydrated();
  const reduceMotion = useReducedMotion();
  const animate = hydrated && !reduceMotion;

  return (
    <div
      className={cn(
        "relative mx-auto flex h-52 w-52 items-center justify-center",
        className
      )}
    >
      <div className="absolute inset-6 rounded-full border border-dashed border-border" />
      <div className="glass-pill relative z-10 flex h-16 w-16 items-center justify-center rounded-full text-xs font-medium tracking-wide">
        {label}
      </div>
      <div
        className={cn("absolute inset-0", animate && "animate-spin-slower")}
      >
        {ICONS.map(({ Icon, angle }) => (
          <div
            key={angle}
            className="absolute top-1/2 left-1/2"
            style={{
              transform: `rotate(${angle}deg) translate(88px) rotate(-${angle}deg)`,
            }}
          >
            <span
              className={cn(
                "glass-pill flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full",
                animate && "animate-spin-slower-reverse"
              )}
            >
              <Icon className="h-4 w-4 text-foreground/80" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
