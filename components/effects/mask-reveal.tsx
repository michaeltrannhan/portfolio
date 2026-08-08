"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeOut } from "@/components/motion";

type MaskRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/** Clip-path wipe entrance for hero content blocks. */
export function MaskReveal({
  children,
  className,
  delay = 0,
}: MaskRevealProps) {
  const reduceMotion = useReducedMotion();
  // Drop clip-path after the wipe so absolutely-positioned children can escape.
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const ms = Math.ceil((delay + 0.9) * 1000) + 80;
    const id = window.setTimeout(() => setRevealed(true), ms);
    return () => window.clearTimeout(id);
  }, [delay, reduceMotion]);

  if (reduceMotion || revealed) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.6 }}
      animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
      transition={{ duration: 0.9, ease: easeOut, delay }}
      onAnimationComplete={() => setRevealed(true)}
    >
      {children}
    </motion.div>
  );
}
