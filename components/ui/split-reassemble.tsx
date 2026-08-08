"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeOut } from "@/components/motion";

type SplitReassembleProps = {
  text: string;
  className?: string;
  as?: "h2" | "h3" | "p" | "span";
};

/** Words fly in from split offsets and reassemble on enter. */
export function SplitReassemble({
  text,
  className,
  as: Tag = "h2",
}: SplitReassembleProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (reduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={cn("flex flex-wrap gap-x-[0.35em]", className)} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block"
          initial={{
            opacity: 0,
            y: i % 2 === 0 ? 28 : -28,
            x: i % 3 === 0 ? -18 : 18,
            rotate: i % 2 === 0 ? -4 : 4,
          }}
          whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.55, ease: easeOut, delay: i * 0.05 }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
