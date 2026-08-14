"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { magneticSpring } from "@/components/motion";
import { cn } from "@/lib/utils";
import { useDesktopPointer } from "@/lib/use-media";
import { usePointerGeometry } from "@/lib/use-pointer-track";

type MagneticTrailProps = {
  children: ReactNode;
  className?: string;
};

type TrailDot = { id: number; x: number; y: number };

/** Magnetic pull plus short pointer trail for social icon clusters. */
export function MagneticTrail({ children, className }: MagneticTrailProps) {
  const reduceMotion = useReducedMotion();
  const desktop = useDesktopPointer();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const idRef = useRef(0);

  const { ref, onMouseMove } = usePointerGeometry(
    (g) => {
      setOffset({ x: g.dx * 0.22, y: g.dy * 0.22 });
      idRef.current += 1;
      const id = idRef.current;
      setTrail((prev) => [...prev.slice(-8), { id, x: g.px, y: g.py }]);
    },
    { enabled: desktop && !reduceMotion }
  );

  const onMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
    setTrail([]);
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={magneticSpring}
      className={cn("relative inline-flex max-md:!transform-none", className)}
    >
      {desktop &&
        !reduceMotion &&
        trail.map((dot, i) => (
          <span
            key={dot.id}
            aria-hidden
            className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-[var(--accent-line)]"
            style={{
              left: dot.x,
              top: dot.y,
              opacity: (i + 1) / (trail.length + 2),
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      {children}
    </motion.div>
  );
}
