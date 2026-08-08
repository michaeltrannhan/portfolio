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

type PointerBeamProps = {
  children: ReactNode;
  className?: string;
};

/** Glowing beam that follows the pointer across a card grid. */
export function PointerBeam({ children, className }: PointerBeamProps) {
  const reduceMotion = useReducedMotion();
  const desktop = useDesktopPointer();
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 40 });
  const [visible, setVisible] = useState(false);

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!desktop || reduceMotion) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
      setVisible(true);
    },
    [desktop, reduceMotion]
  );

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setVisible(false)}
      className={cn("relative", className)}
    >
      {desktop && !reduceMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 max-md:hidden"
          style={{
            opacity: visible ? 1 : 0,
            background: `radial-gradient(420px circle at ${pos.x}% ${pos.y}%, var(--pointer-beam), transparent 55%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
