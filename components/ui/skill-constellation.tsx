"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type SkillNode = {
  id: string;
  label: string;
  x: number;
  y: number;
};

type SkillConstellationProps = {
  nodes?: SkillNode[];
  className?: string;
};

const DEFAULT_NODES: SkillNode[] = [
  { id: "ts", label: "TypeScript", x: 50, y: 48 },
  { id: "react", label: "React", x: 28, y: 30 },
  { id: "next", label: "Next.js", x: 72, y: 28 },
  { id: "css", label: "CSS", x: 22, y: 62 },
  { id: "node", label: "Node", x: 78, y: 60 },
  { id: "motion", label: "Motion", x: 48, y: 18 },
  { id: "a11y", label: "A11y", x: 40, y: 78 },
  { id: "dx", label: "DX", x: 62, y: 76 },
];

/** Interactive skill node graph with hover focus. */
export function SkillConstellation({
  nodes = DEFAULT_NODES,
  className,
}: SkillConstellationProps) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const center = nodes[0];

  const edges = useMemo(
    () => nodes.slice(1).map((n) => ({ from: center.id, to: n.id })),
    [nodes, center.id]
  );

  const byId = useMemo(
    () => Object.fromEntries(nodes.map((n) => [n.id, n])),
    [nodes]
  );

  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-[var(--section-wash)]",
        className
      )}
      onMouseLeave={() => setActive(null)}
    >
      <svg className="absolute inset-0 h-full w-full" aria-hidden>
        {edges.map((edge) => {
          const a = byId[edge.from];
          const b = byId[edge.to];
          const lit =
            !active || active === edge.from || active === edge.to;
          return (
            <line
              key={`${edge.from}-${edge.to}`}
              x1={`${a.x}%`}
              y1={`${a.y}%`}
              x2={`${b.x}%`}
              y2={`${b.y}%`}
              stroke="var(--accent-line)"
              strokeOpacity={lit ? 0.35 : 0.08}
              strokeWidth={1}
            />
          );
        })}
      </svg>
      {nodes.map((node) => {
        const isActive = active === node.id;
        return (
          <motion.button
            key={node.id}
            type="button"
            onMouseEnter={() => setActive(node.id)}
            onFocus={() => setActive(node.id)}
            className={cn(
              "glass-pill absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-2.5 py-1 text-xs transition-colors",
              isActive
                ? "border-[var(--accent-line)] bg-[var(--glass-bg-strong)] text-foreground"
                : "text-muted-foreground"
            )}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            whileHover={reduceMotion ? undefined : { scale: 1.08 }}
            animate={
              reduceMotion || !isActive
                ? undefined
                : { boxShadow: "0 0 0 6px oklch(0.7 0.06 210 / 0.15)" }
            }
          >
            {node.label}
          </motion.button>
        );
      })}
    </div>
  );
}
