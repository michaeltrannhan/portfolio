"use client";

import { type ReactNode } from "react";
import { motion, type HTMLMotionProps, useReducedMotion } from "framer-motion";

export const easeOut = [0.22, 1, 0.36, 1] as const;

/** Canonical spring for magnetic hover offsets (Magnetic, MagneticTrail, …). */
export const magneticSpring = {
  type: "spring",
  stiffness: 260,
  damping: 18,
  mass: 0.4,
} as const;

/** Shared fade-up variants (Reveal). */
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
} as const;

type RevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, ease: easeOut, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type FadeInProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/** Entrance animation on mount (hero). */
export function FadeIn({
  children,
  className,
  delay = 0,
  ...props
}: FadeInProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: easeOut, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

