"use client";

import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";
import { motion } from "framer-motion";

type MorphPathProps = {
  /** `d` keyframes to morph between; the first is re-appended for a seamless loop. */
  paths: readonly [string, string, ...string[]];
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
  const reduceMotion = useHydratedReducedMotion();
  const d = [...paths, paths[0]];
  const target = reduceMotion ? paths[0] : d;

  return (
    <motion.path
      className={className}
      fill={fill}
      fillOpacity={fillOpacity}
      initial={{ d: paths[0] }}
      animate={{ d: target }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      d={paths[0]}
    />
  );
}
