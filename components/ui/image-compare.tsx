"use client";

import { useCallback, useRef, useState, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

type ImageCompareProps = {
  beforeLabel?: string;
  afterLabel?: string;
  beforeStyle?: string;
  afterStyle?: string;
  className?: string;
};

/** Before/after slider for project visuals. */
export function ImageCompare({
  beforeLabel = "Before",
  afterLabel = "After",
  beforeStyle = "linear-gradient(135deg, oklch(0.88 0.02 240), oklch(0.92 0.02 220))",
  afterStyle = "linear-gradient(135deg, oklch(0.9 0.05 210), oklch(0.93 0.04 95))",
  className,
}: ImageCompareProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(52);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, next)));
  }, []);

  const onPointer = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    update(e.clientX);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative aspect-[16/10] w-full touch-none select-none overflow-hidden rounded-2xl border border-border",
        className
      )}
      onPointerDown={onPointer}
      onPointerMove={(e) => {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) update(e.clientX);
      }}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      aria-label="Compare before and after"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4));
        if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 4));
      }}
    >
      <div className="absolute inset-0" style={{ background: afterStyle }} />
      <div
        className="absolute inset-0"
        style={{
          background: beforeStyle,
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
        }}
      />
      <div
        className="absolute inset-y-0 z-10 w-px bg-foreground/70"
        style={{ left: `${pos}%` }}
      >
        <span className="glass-pill absolute top-1/2 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[10px] font-medium">
          ||
        </span>
      </div>
      <span className="glass-soft absolute top-3 left-3 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
        {beforeLabel}
      </span>
      <span className="glass-soft absolute top-3 right-3 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
        {afterLabel}
      </span>
    </div>
  );
}
