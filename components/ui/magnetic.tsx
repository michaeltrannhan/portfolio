"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { magneticSpring } from "@/components/motion";
import { cn } from "@/lib/utils";
import { useMagneticOffset } from "@/lib/use-pointer-track";

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
  const reduceMotion = useReducedMotion();
  const { ref, offset, bind } = useMagneticOffset({
    strength,
    enabled: !reduceMotion,
  });

  return (
    <motion.div
      ref={ref}
      {...bind}
      animate={{ x: offset.x, y: offset.y }}
      transition={magneticSpring}
      className={cn("inline-flex max-md:!transform-none", className)}
    >
      {children}
    </motion.div>
  );
}
