"use client";

import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

type TimelineProps = {
  items: TimelineItem[];
  className?: string;
};

/** Vertical experience / about timeline. */
export function Timeline({ items, className }: TimelineProps) {
  return (
    <ol className={cn("relative space-y-8", className)}>
      {items.map((item, index) => (
        <Reveal key={item.title} delay={index * 0.05}>
          <li className="relative grid gap-2 border-l border-border pl-6 md:grid-cols-[5.5rem_1fr] md:gap-6 md:border-l-0 md:pl-0">
            <div
              aria-hidden
              className="glass-pill absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-[var(--accent-line)] md:hidden"
            />
            <p className="font-mono text-xs font-medium tracking-wide text-muted-foreground md:pt-1">
              {item.year}
            </p>
            <div>
              <h3 className="text-base font-medium tracking-tight">
                {item.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
