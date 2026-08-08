"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeOut } from "@/components/motion";

type TextGenerateProps = {
  words: string;
  className?: string;
  delay?: number;
};

/** Word-by-word reveal for taglines. */
export function TextGenerate({
  words,
  className,
  delay = 0.35,
}: TextGenerateProps) {
  const reduceMotion = useReducedMotion();
  const parts = words.split(" ");

  if (reduceMotion) {
    return <p className={className}>{words}</p>;
  }

  return (
    <p className={cn("flex flex-wrap", className)}>
      {parts.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.45,
            ease: easeOut,
            delay: delay + i * 0.045,
          }}
          className="mr-[0.28em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}
