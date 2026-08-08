"use client";

import { type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

type HeroParallaxProps = {
  children: ReactNode;
  className?: string;
};

/** Multi-layer depth: back atmosphere drifts slower than content. */
export function HeroParallax({ children, className }: HeroParallaxProps) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const yBack = useTransform(scrollY, [0, 500], [0, 80]);
  const yMid = useTransform(scrollY, [0, 500], [0, 40]);
  const yFront = useTransform(scrollY, [0, 500], [0, -20]);
  const opacity = useTransform(scrollY, [0, 420], [1, 0.35]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn("relative", className)}>
      <motion.div
        aria-hidden
        style={{ y: yBack }}
        className="pointer-events-none absolute inset-0 -z-10"
        data-parallax="back"
      />
      <motion.div style={{ y: yMid, opacity }} className="relative">
        <motion.div style={{ y: yFront }}>{children}</motion.div>
      </motion.div>
    </div>
  );
}
