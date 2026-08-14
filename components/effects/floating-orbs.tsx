"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useDesktopPointer } from "@/lib/use-media";
import { usePointerNormalized } from "@/lib/use-pointer-track";

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
  const { ref, pos, bind } = usePointerNormalized({
    enabled: desktop && !reduceMotion,
  });

  const offset = { x: (pos.x - 0.5) * 40, y: (pos.y - 0.5) * 28 };

  return (
    <div
      ref={ref}
      aria-hidden
      {...bind}
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
