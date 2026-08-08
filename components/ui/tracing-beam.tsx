"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

type TracingBeamProps = {
  children: ReactNode;
  className?: string;
};

/** Vertical scroll-linked beam beside content (desktop). */
export function TracingBeam({ children, className }: TracingBeamProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 25%", "end 75%"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const glowTop = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-2 bottom-2 hidden w-px md:block"
      >
        <div className="absolute inset-0 bg-border" />
        <motion.div
          className="absolute left-0 top-0 h-full w-px origin-top bg-[var(--accent-line)]"
          style={{ scaleY: reduceMotion ? scrollYProgress : progress }}
        />
        {!reduceMotion && (
          <motion.div
            className="absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--accent-line)] bg-background"
            style={{ top: glowTop }}
          >
            <div className="absolute inset-0.5 rounded-full bg-[var(--accent-line)]" />
          </motion.div>
        )}
      </div>
      <div className="md:pl-10">{children}</div>
    </div>
  );
}
