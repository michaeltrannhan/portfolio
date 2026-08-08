"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeOut } from "@/components/motion";

type LampHeadingProps = {
  children: string;
  className?: string;
  subtitle?: string;
  align?: "center" | "left";
};

/** Soft lamp / spotlight wash behind a section title. */
export function LampHeading({
  children,
  className,
  subtitle,
  align = "center",
}: LampHeadingProps) {
  const reduceMotion = useReducedMotion();
  const centered = align === "center";

  return (
    <div className={cn("relative pb-2 pt-6", className)}>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-0 h-24 w-[min(100%,28rem)]",
          centered ? "left-1/2 -translate-x-1/2" : "left-0"
        )}
      >
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-line)] to-transparent opacity-70" />
        <div className="absolute inset-x-0 top-0 h-20 bg-[radial-gradient(ellipse_at_top,var(--lamp-glow),transparent_70%)]" />
      </div>
      <motion.h2
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.5, ease: easeOut }}
        className={cn(
          "relative text-2xl font-semibold tracking-tight md:text-3xl",
          centered && "text-center"
        )}
      >
        {children}
      </motion.h2>
      {subtitle && (
        <p
          className={cn(
            "relative mt-3 max-w-md text-muted-foreground",
            centered && "mx-auto text-center"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
