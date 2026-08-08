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

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

/** Pulls toward the cursor on desktop; no-op on touch / reduced motion. */
export function Magnetic({
  children,
  className,
  strength = 0.28,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [{ x, y }, set] = useState({ x: 0, y: 0 });

  const onMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      set({ x: dx * strength, y: dy * strength });
    },
    [reduceMotion, strength]
  );

  const onLeave = useCallback(() => set({ x: 0, y: 0 }), []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.4 }}
      className={cn("inline-flex max-md:!transform-none", className)}
    >
      {children}
    </motion.div>
  );
}
