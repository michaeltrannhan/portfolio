"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

type DeviceMockupProps = {
  className?: string;
  label?: string;
};

/** Laptop chrome with scroll-linked screen content. */
export function DeviceMockup({
  className,
  label = "Product preview",
}: DeviceMockupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);

  return (
    <div ref={ref} className={cn("mx-auto w-full max-w-xl", className)}>
      <div className="glass-soft rounded-t-xl border-b-0 px-3 py-2">
        <div className="mx-auto h-1.5 w-16 rounded-full bg-[var(--glass-border)]" />
      </div>
      <div className="glass overflow-hidden rounded-b-xl border-t-0">
        <div className="relative aspect-[16/10] overflow-hidden">
          <motion.div
            style={reduceMotion ? undefined : { y }}
            className="absolute inset-x-0 top-0 h-[140%]"
          >
            <div className="h-1/3 bg-gradient-to-br from-[oklch(0.9_0.04_210)] to-[oklch(0.94_0.03_95)]" />
            <div className="flex h-1/3 flex-col gap-2 bg-[var(--section-wash)] p-6">
              <div className="h-3 w-1/3 rounded bg-foreground/15" />
              <div className="h-2 w-2/3 rounded bg-foreground/10" />
              <div className="mt-2 grid grid-cols-3 gap-2">
                <div className="aspect-video rounded-md bg-[oklch(0.9_0.03_210)]" />
                <div className="aspect-video rounded-md bg-[oklch(0.92_0.03_180)]" />
                <div className="aspect-video rounded-md bg-[oklch(0.93_0.04_95)]" />
              </div>
            </div>
            <div className="h-1/3 bg-gradient-to-t from-[oklch(0.88_0.03_220)] to-[var(--section-wash)] p-6">
              <div className="h-2 w-1/2 rounded bg-foreground/12" />
              <div className="glass-soft mt-3 h-16 rounded-lg" />
            </div>
          </motion.div>
        </div>
      </div>
      <div className="mx-auto h-2 w-[70%] rounded-b-md bg-border/80" />
      <p className="mt-3 text-center text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
