"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeOut } from "@/components/motion";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
};

/** Fade + slight blur mask as section enters view. */
export function SectionReveal({ children, className }: SectionRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.65, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}
