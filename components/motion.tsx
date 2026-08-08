"use client";

import { type ReactNode } from "react";
import {
  motion,
  type HTMLMotionProps,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

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

type StaggerProps = {
  children: ReactNode;
  className?: string;
};

export function Stagger({ children, className }: StaggerProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8% 0px" }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  className?: string;
};

export function StaggerItem({
  children,
  className,
  ...props
}: StaggerItemProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={cn(className)} variants={fadeUp} {...props}>
      {children}
    </motion.div>
  );
}
