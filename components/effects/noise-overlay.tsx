"use client";

import { cn } from "@/lib/utils";

type NoiseOverlayProps = {
  className?: string;
};

/**
 * Soft fractal-noise film grain.
 * Deliberately static: a full-viewport mix-blend layer that shifts with
 * scroll forces the whole page to recomposite every frame. The grain is
 * fine-grained enough that a fixed position is imperceptible anyway.
 */
export function NoiseOverlay({ className }: NoiseOverlayProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-[1] mix-blend-multiply dark:mix-blend-soft-light",
        className
      )}
      style={{
        opacity: "var(--noise-opacity)",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "160px 160px",
      }}
    />
  );
}
