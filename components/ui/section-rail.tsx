"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SECTIONS, SECTION_IDS } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/lib/use-active-section";

type SectionRailProps = {
  className?: string;
};

/** Side rail dots with active pulse as sections enter view. */
export function SectionRail({ className }: SectionRailProps) {
  const reduceMotion = useReducedMotion();
  const active = useActiveSection(SECTION_IDS);

  return (
    <nav
      aria-label="Section navigation"
      className={cn(
        "fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex",
        className
      )}
    >
      {SECTIONS.map((section) => {
        const isActive = active === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-label={section.label}
            aria-current={isActive ? "true" : undefined}
            className="group relative flex items-center justify-end"
            onClick={(e) => {
              const el = document.getElementById(section.id);
              if (!el) return;
              e.preventDefault();
              el.scrollIntoView({
                behavior: reduceMotion ? "auto" : "smooth",
                block: "start",
              });
            }}
          >
            <span className="glass-soft pointer-events-none mr-2 translate-x-1 rounded-full px-2 py-0.5 text-[10px] tracking-wide text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
              {section.label}
            </span>
            <span className="relative flex h-2.5 w-2.5 items-center justify-center">
              {isActive && !reduceMotion && (
                <motion.span
                  layoutId="rail-pulse"
                  className="absolute inset-[-4px] rounded-full border border-[var(--accent-line)]/50"
                  animate={{ scale: [1, 1.35, 1], opacity: [0.7, 0.2, 0.7] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
              )}
              <span
                className={cn(
                  "block h-2 w-2 rounded-full transition-colors",
                  isActive
                    ? "bg-[var(--accent-line)]"
                    : "bg-border group-hover:bg-muted-foreground"
                )}
              />
            </span>
          </a>
        );
      })}
    </nav>
  );
}
