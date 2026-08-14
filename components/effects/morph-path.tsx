"use client";

import { motion, useReducedMotion } from "framer-motion";

type MorphPathProps = {
  /** `d` keyframes to morph between; the first is re-appended for a seamless loop. */
  paths: readonly string[];
  /** Seconds per full loop. */
  duration?: number;
  fill?: string;
  fillOpacity?: number;
  className?: string;
};

/** SVG path that morphs through `d` keyframes forever (static under reduced motion). */
export function MorphPath({
  paths,
  duration = 14,
  fill = "currentColor",
  fillOpacity,
  className,
}: MorphPathProps) {
  const reduceMotion = useReducedMotion();
  const d = [...paths, paths[0]];

  return (
    <motion.path
      className={className}
      fill={fill}
      fillOpacity={fillOpacity}
      animate={reduceMotion ? undefined : { d }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      d={paths[0]}
    />
  );
}
