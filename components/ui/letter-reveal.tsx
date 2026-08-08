"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeOut } from "@/components/motion";

type LetterRevealProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
};

/** Staggered character reveal for brand / headings. */
export function LetterReveal({
  text,
  className,
  as: Tag = "h1",
}: LetterRevealProps) {
  const reduceMotion = useReducedMotion();
  const chars = text.split("");

  if (reduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={cn("inline-flex flex-wrap", className)} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          aria-hidden
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: easeOut,
            delay: 0.08 + i * 0.028,
          }}
          className={char === " " ? "inline-block w-[0.28em]" : "inline-block"}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Tag>
  );
}
