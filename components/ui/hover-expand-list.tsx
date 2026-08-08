"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeOut } from "@/components/motion";

export type ExpandItem = {
  title: string;
  description: string;
  meta?: string;
  preview?: string;
};

type HoverExpandListProps = {
  items: ExpandItem[];
  className?: string;
};

/** Rows that expand on hover with a side preview panel (desktop). */
export function HoverExpandList({ items, className }: HoverExpandListProps) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <div
      className={cn(
        "grid gap-6 lg:grid-cols-[minmax(0,1fr)_14rem] lg:items-stretch",
        className
      )}
    >
      <ul className="glass divide-y divide-[var(--glass-border)] overflow-hidden rounded-2xl border-[var(--glass-border)]">
        {items.map((item, index) => {
          const open = active === index;
          return (
            <li key={item.title}>
              <button
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className={cn(
                  "relative z-10 flex w-full flex-col gap-1 px-4 py-4 text-left transition-colors",
                  open
                    ? "bg-[var(--glass-bg-tint)]"
                    : "hover:bg-[var(--glass-bg-soft)]"
                )}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-base font-medium tracking-tight">
                    {item.title}
                  </span>
                  {item.meta && (
                    <span className="font-mono text-xs text-muted-foreground">
                      {item.meta}
                    </span>
                  )}
                </div>
                <AnimatePresence initial={false}>
                  {(open || reduceMotion) && (
                    <motion.p
                      initial={
                        reduceMotion ? false : { height: 0, opacity: 0 }
                      }
                      animate={{ height: "auto", opacity: 1 }}
                      exit={
                        reduceMotion
                          ? undefined
                          : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.28, ease: easeOut }}
                      className="overflow-hidden text-sm text-muted-foreground"
                    >
                      {item.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="glass relative hidden min-h-[12rem] overflow-hidden rounded-xl lg:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={items[active]?.title}
            initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="absolute inset-0"
            style={{
              background:
                items[active]?.preview ??
                "linear-gradient(160deg, oklch(0.92 0.035 210), oklch(0.94 0.03 90))",
            }}
          />
        </AnimatePresence>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/70 to-transparent p-3">
          <p className="text-xs font-medium text-foreground">
            {items[active]?.title}
          </p>
        </div>
      </div>
    </div>
  );
}
