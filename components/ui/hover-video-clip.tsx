"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeOut } from "@/components/motion";

type HoverVideoClipProps = {
  title: string;
  subtitle?: string;
  gradient?: string;
  className?: string;
};

/** Scale-clipped preview pane that expands on hover (CSS motion, no video file). */
export function HoverVideoClip({
  title,
  subtitle = "Preview",
  gradient = "linear-gradient(135deg, oklch(0.88 0.05 210), oklch(0.92 0.04 95))",
  className,
}: HoverVideoClipProps) {
  const reduceMotion = useReducedMotion();
  const [hover, setHover] = useState(false);

  return (
    <div
      className={cn(
        "glass relative overflow-hidden rounded-2xl",
        className
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <motion.div
        className="aspect-[16/9] w-full"
        style={{ background: gradient }}
        animate={
          reduceMotion
            ? undefined
            : {
                scale: hover ? 1.08 : 1,
                clipPath: hover
                  ? "inset(0% 0% 0% 0% round 0px)"
                  : "inset(8% 10% 8% 10% round 16px)",
              }
        }
        transition={{ duration: 0.45, ease: easeOut }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(1_0_0_/_0.35),transparent_45%)]" />
        {!reduceMotion && (
          <motion.div
            aria-hidden
            className="absolute inset-x-0 top-1/3 h-px bg-foreground/20"
            animate={{ x: hover ? ["-20%", "120%"] : "0%" }}
            transition={{
              duration: 1.6,
              repeat: hover ? Infinity : 0,
              ease: "linear",
            }}
          />
        )}
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent p-4">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}
