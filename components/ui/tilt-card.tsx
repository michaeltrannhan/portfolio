"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePointerNormalized } from "@/lib/use-pointer-track";

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
  const reduceMotion = useReducedMotion();
  const { ref, pos, bind } = usePointerNormalized({
    enabled: !reduceMotion,
  });

  return (
    <motion.div
      ref={ref}
      {...bind}
      style={{ perspective: 900 }}
      className={cn("max-md:[transform:none!important]", className)}
    >
      <motion.div
        animate={{
          rotateX: (0.5 - pos.y) * maxTilt,
          rotateY: (pos.x - 0.5) * maxTilt,
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
