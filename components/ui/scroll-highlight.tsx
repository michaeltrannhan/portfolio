"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

type ScrollHighlightProps = {
  children: ReactNode;
  className?: string;
};

/** Text highlight that paints on as the line scrolls into view. */
export function ScrollHighlight({
  children,
  className,
}: ScrollHighlightProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <span ref={ref} className={cn("relative inline", className)}>
      <motion.span
        aria-hidden
        className="absolute inset-x-[-0.15em] inset-y-[0.1em] origin-left rounded-sm bg-[var(--scroll-highlight)]"
        style={reduceMotion ? { scaleX: 1 } : { scaleX }}
      />
      <span className="relative">{children}</span>
    </span>
  );
}
