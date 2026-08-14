"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useDesktopPointer } from "@/lib/use-media";
import { usePointerGeometry } from "@/lib/use-pointer-track";

type WarpingGridProps = {
  className?: string;
};

/** CSS grid that warps near the cursor via radial mask + perspective. */
export function WarpingGrid({ className }: WarpingGridProps) {
  const reduceMotion = useReducedMotion();
  const desktop = useDesktopPointer();
  const { ref, onMouseMove } = usePointerGeometry(
    (g, el) => {
      el.style.setProperty("--gx", `${g.px}px`);
      el.style.setProperty("--gy", `${g.py}px`);
    },
    { enabled: desktop && !reduceMotion }
  );

  return (
    <div
      ref={ref}
      aria-hidden
      onMouseMove={onMouseMove}
      className={cn(
        "pointer-events-none absolute inset-0 max-md:hidden",
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: `
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(220px circle at var(--gx, 50%) var(--gy, 40%), black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(220px circle at var(--gx, 50%) var(--gy, 40%), black 0%, transparent 70%)",
          transform: reduceMotion
            ? undefined
            : "perspective(800px) rotateX(8deg) scale(1.08)",
          transformOrigin: "center top",
        }}
      />
    </div>
  );
}
