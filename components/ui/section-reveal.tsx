"use client";

import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";
import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeOut } from "@/components/motion";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Fade + rise as section enters view.
 * No blur/filter on purpose: an inline `filter` left on a large section
 * container becomes a backdrop root and makes nested glass panels glitch
 * while scrolling, and repainting a filtered section is expensive.
 */
export function SectionReveal({ children, className }: SectionRevealProps) {
  const reduceMotion = useHydratedReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.65, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}
