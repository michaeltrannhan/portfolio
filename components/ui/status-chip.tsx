"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type StatusChipProps = {
  label: string;
  value: number;
  suffix?: string;
  className?: string;
};

/** Small animated count-up chip. */
export function StatusChip({
  label,
  value,
  suffix = "",
  className,
}: StatusChipProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const total = 28;
    const id = window.setInterval(() => {
      frame += 1;
      const t = frame / total;
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));
      if (frame >= total) window.clearInterval(id);
    }, 28);

    return () => window.clearInterval(id);
  }, [inView, reduceMotion, value]);

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      className={cn(
        "glass-pill inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs",
        className
      )}
    >
      <span className="font-mono font-medium tabular-nums text-foreground">
        {display}
        {suffix}
      </span>
      <span className="text-muted-foreground">{label}</span>
    </motion.div>
  );
}
