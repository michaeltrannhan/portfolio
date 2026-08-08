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

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
};

/** Subtle perspective tilt on hover (desktop). */
export function TiltCard({
  children,
  className,
  maxTilt = 6,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
  });

  const onMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      setTransform({
        rotateX: (0.5 - py) * maxTilt,
        rotateY: (px - 0.5) * maxTilt,
      });
    },
    [maxTilt, reduceMotion]
  );

  const onLeave = useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: 900 }}
      className={cn("max-md:[transform:none!important]", className)}
    >
      <motion.div
        animate={{
          rotateX: transform.rotateX,
          rotateY: transform.rotateY,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        style={{ transformStyle: "preserve-3d" }}
        className="h-full will-change-transform"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
