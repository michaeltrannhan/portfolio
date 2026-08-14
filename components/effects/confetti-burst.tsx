"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Particle = {
  id: number;
  x: number;
  y: number;
  color: string;
  rot: number;
  /** Precomputed flight vector — keeps render pure (no Math.random in render). */
  vx: number;
  vy: number;
};

const COLORS = [
  "oklch(0.7 0.1 210)",
  "oklch(0.78 0.1 95)",
  "oklch(0.72 0.08 180)",
  "oklch(0.65 0.06 240)",
];

type ConfettiBurstProps = {
  children: ReactNode;
  className?: string;
};

/** Tasteful one-shot confetti on primary CTA click. */
export function ConfettiBurst({ children, className }: ConfettiBurstProps) {
  const reduceMotion = useReducedMotion();
  const [bits, setBits] = useState<Particle[]>([]);
  const timerRef = useRef<number | null>(null);

  // Never leave a pending clear running after unmount.
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const burst = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const originX = e.clientX - rect.left;
      const originY = e.clientY - rect.top;
      const next = Array.from({ length: 18 }, (_, i) => ({
        id: Date.now() + i,
        x: originX + (Math.random() - 0.5) * 20,
        y: originY,
        color: COLORS[i % COLORS.length],
        rot: (Math.random() - 0.5) * 180,
        vx: (Math.random() - 0.5) * 120,
        vy: -40 - Math.random() * 80,
      }));
      setBits(next);
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setBits([]), 900);
    },
    [reduceMotion]
  );

  return (
    <div className={cn("relative inline-flex", className)} onClick={burst}>
      {children}
      <AnimatePresence>
        {bits.map((p, i) => (
          <motion.span
            key={p.id}
            aria-hidden
            className="pointer-events-none absolute h-1.5 w-1.5 rounded-[1px]"
            style={{ left: p.x, top: p.y, background: p.color }}
            initial={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
            animate={{
              opacity: 0,
              scale: 0.6,
              x: p.vx,
              y: p.vy,
              rotate: p.rot,
            }}
            transition={{ duration: 0.75, delay: i * 0.01, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
