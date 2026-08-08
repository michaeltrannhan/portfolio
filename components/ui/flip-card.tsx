"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type FlipCardItem = {
  title: string;
  description: string;
  stack: string[];
  tag?: string;
};

type FlipCardProps = {
  item: FlipCardItem;
  className?: string;
};

/** Card that flips to reveal tech stack on the back. */
export function FlipCard({ item, className }: FlipCardProps) {
  const reduceMotion = useReducedMotion();
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((v) => !v)}
      onMouseEnter={() => {
        if (window.matchMedia("(pointer: fine)").matches) setFlipped(true);
      }}
      onMouseLeave={() => {
        if (window.matchMedia("(pointer: fine)").matches) setFlipped(false);
      }}
      className={cn(
        "group relative h-44 w-full [perspective:1200px] text-left",
        className
      )}
      aria-pressed={flipped}
      aria-label={`${item.title}. ${flipped ? "Showing stack" : "Show stack"}`}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={
          reduceMotion
            ? undefined
            : { rotateY: flipped ? 180 : 0 }
        }
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="glass absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl p-5 [backface-visibility:hidden]">
          {item.tag && (
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {item.tag}
            </p>
          )}
          <div>
            <h3 className="text-base font-medium tracking-tight">{item.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {item.description}
            </p>
          </div>
          <p className="text-[11px] text-muted-foreground/80">
            {reduceMotion ? "Tap for stack" : "Hover / tap for stack"}
          </p>
        </div>

        <div className="glass-strong absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Stack
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {item.stack.map((tech) => (
              <li
                key={tech}
                className="glass-soft rounded-full px-2.5 py-1 text-xs text-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>
          <p className="text-sm font-medium">{item.title}</p>
        </div>
      </motion.div>

      {reduceMotion && flipped && (
        <div className="glass-strong absolute inset-0 z-10 flex flex-col justify-between overflow-hidden rounded-2xl p-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Stack
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {item.stack.map((tech) => (
              <li
                key={tech}
                className="glass-soft rounded-full px-2.5 py-1 text-xs"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      )}
    </button>
  );
}
