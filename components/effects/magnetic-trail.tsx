"use client";

import {
  useCallback,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useDesktopPointer } from "@/lib/use-media";

type MagneticTrailProps = {
  children: ReactNode;
  className?: string;
};

type TrailDot = { id: number; x: number; y: number };

/** Magnetic pull plus short pointer trail for social icon clusters. */
export function MagneticTrail({ children, className }: MagneticTrailProps) {
  const reduceMotion = useReducedMotion();
  const desktop = useDesktopPointer();
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const idRef = useRef(0);

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!desktop || reduceMotion) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setOffset({
        x: (e.clientX - cx) * 0.22,
        y: (e.clientY - cy) * 0.22,
      });
      const lx = e.clientX - rect.left;
      const ly = e.clientY - rect.top;
      idRef.current += 1;
      const id = idRef.current;
      setTrail((prev) => [...prev.slice(-8), { id, x: lx, y: ly }]);
    },
    [desktop, reduceMotion]
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        setOffset({ x: 0, y: 0 });
        setTrail([]);
      }}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.4 }}
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
