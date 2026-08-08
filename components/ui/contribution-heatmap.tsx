"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

type ContributionHeatmapProps = {
  weeks?: number;
  className?: string;
};

function pseudo(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** GitHub-style contribution heatmap (deterministic fake data). */
export function ContributionHeatmap({
  weeks = 26,
  className,
}: ContributionHeatmapProps) {
  const cells = useMemo(() => {
    const out: number[] = [];
    for (let w = 0; w < weeks; w++) {
      for (let d = 0; d < 7; d++) {
        const r = pseudo(w * 7 + d + 3);
        out.push(r > 0.72 ? 3 : r > 0.5 ? 2 : r > 0.28 ? 1 : 0);
      }
    }
    return out;
  }, [weeks]);

  const levels = [
    "bg-muted",
    "bg-[var(--heatmap-1)]",
    "bg-[var(--heatmap-2)]",
    "bg-[var(--heatmap-3)]",
  ];

  return (
    <div
      className={cn(
        "glass w-full overflow-x-auto rounded-2xl p-4 md:p-5",
        className
      )}
    >
      <div
        className="relative z-10 inline-grid gap-[3px]"
        style={{
          gridTemplateRows: "repeat(7, 10px)",
          gridAutoFlow: "column",
          gridAutoColumns: "10px",
        }}
        aria-label="Contribution activity heatmap"
      >
        {cells.map((level, i) => (
          <span
            key={i}
            className={cn("rounded-[2px]", levels[level])}
            title={`Activity ${level}`}
          />
        ))}
      </div>
      <p className="relative z-10 mt-3 text-xs text-muted-foreground">
        Recent shipping rhythm
      </p>
    </div>
  );
}
