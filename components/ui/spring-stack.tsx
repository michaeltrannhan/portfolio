"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type SpringItem = {
  title: string;
  meta: string;
};

type SpringStackProps = {
  items: SpringItem[];
  className?: string;
};

/** Spring-physics stacked list that peels on hover. */
export function SpringStack({ items, className }: SpringStackProps) {
  const reduceMotion = useReducedMotion();

  return (
    <ul className={cn("relative space-y-0", className)}>
      {items.map((item, i) => (
        <motion.li
          key={item.title}
          className="relative -mt-2 first:mt-0"
          style={{ zIndex: items.length - i }}
          whileHover={
            reduceMotion
              ? undefined
              : { y: -8, scale: 1.02, zIndex: 20 }
          }
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
        >
          <div className="glass overflow-hidden rounded-2xl px-4 py-3">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.meta}</p>
            </div>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}
