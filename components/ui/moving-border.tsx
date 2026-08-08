"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type MovingBorderProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  duration?: number;
};

/** Animated rotating border (Aceternity moving-border pattern). */
export function MovingBorder({
  children,
  className,
  containerClassName,
  duration = 6,
}: MovingBorderProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl p-[1px]",
        containerClassName
      )}
    >
      {reduceMotion ? (
        <div
          aria-hidden
          className="absolute inset-0 rounded-xl bg-border"
        />
      ) : (
        <motion.div
          aria-hidden
          className="absolute inset-[-100%]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0 70%, var(--border-glow) 85%, transparent 100%)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
        />
      )}
      <div
        className={cn(
          "glass relative z-10 h-full w-full overflow-hidden rounded-[11px]",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
