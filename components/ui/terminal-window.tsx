"use client";

import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";

const LINES = [
  "$ whoami",
  "michael — interface engineer",
  "$ focus --now",
  "clarity · craft · calm systems",
  "$ ship --with care",
  "✓ done",
];

type TerminalWindowProps = {
  className?: string;
};

/** Fake terminal window with progressive typing. */
export function TerminalWindow({ className }: TerminalWindowProps) {
  const hydrated = useHydrated();
  const reduceMotion = useHydratedReducedMotion();
  const [count, setCount] = useState(0);
  const animate = hydrated && !reduceMotion;
  const visibleCount = animate ? count : LINES.length;

  useEffect(() => {
    if (!animate) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= LINES.length) window.clearInterval(id);
    }, 520);
    return () => window.clearInterval(id);
  }, [animate]);

  return (
    <div
      className={cn(
        "glass-strong overflow-hidden rounded-2xl bg-[oklch(0.22_0.02_240_/_0.72)] text-[oklch(0.92_0.02_210)] dark:bg-[oklch(0.18_0.02_240_/_0.65)]",
        className
      )}
    >
      <div className="relative z-10 flex items-center gap-1.5 border-b border-[var(--glass-border)] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.12_25)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.82_0.12_95)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.1_150)]" />
        <span className="ml-2 font-mono text-[10px] text-white/50">
          portfolio — zsh
        </span>
      </div>
      <pre className="relative z-10 min-h-[10rem] space-y-1 p-4 font-mono text-xs leading-relaxed md:text-sm">
        {LINES.slice(0, visibleCount).map((line, i) => (
          <div
            key={`${line}-${i}`}
            className={
              line.startsWith("$")
                ? "text-[oklch(0.85_0.06_180)]"
                : line.startsWith("✓")
                  ? "text-[oklch(0.82_0.1_150)]"
                  : "text-white/80"
            }
          >
            {line}
          </div>
        ))}
        {animate && visibleCount < LINES.length && (
          <span className="inline-block h-4 w-2 animate-caret bg-[oklch(0.85_0.06_180)] align-middle" />
        )}
      </pre>
    </div>
  );
}
