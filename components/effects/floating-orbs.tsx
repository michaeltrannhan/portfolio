"use client";

import { useCallback, useRef, useState, type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useDesktopPointer } from "@/lib/use-media";

type FloatingOrbsProps = {
  className?: string;
};

const ORBS = [
  { size: 220, x: "18%", y: "28%", color: "var(--orb-a)" },
  { size: 160, x: "72%", y: "22%", color: "var(--orb-b)" },
  { size: 280, x: "58%", y: "62%", color: "var(--orb-c)" },
];

/** Blurred orbs that drift toward the pointer on desktop. */
export function FloatingOrbs({ className }: FloatingOrbsProps) {
  const reduceMotion = useReducedMotion();
  const desktop = useDesktopPointer();
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!desktop || reduceMotion) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      setOffset({ x: nx * 40, y: ny * 28 });
    },
    [desktop, reduceMotion]
  );

  return (
    <div
      ref={ref}
      aria-hidden
      onMouseMove={onMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden max-md:pointer-events-none",
        className
      )}
    >
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: orb.color,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: offset.x * (0.6 + i * 0.2),
                  y: offset.y * (0.5 + i * 0.15),
                }
          }
          transition={{ type: "spring", stiffness: 40, damping: 18 }}
        />
      ))}
    </div>
  );
}
