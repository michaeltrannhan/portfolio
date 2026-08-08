"use client";

import { useCallback, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SpotlightProps = {
  children: ReactNode;
  className?: string;
  /** Soft fill color for the spotlight (CSS color). */
  color?: string;
  size?: number;
};

/** Mouse-follow radial spotlight. Disabled on coarse pointers. */
export function Spotlight({
  children,
  className,
  color = "var(--spotlight)",
  size = 420,
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 40 });
  const [active, setActive] = useState(false);

  const onMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={cn("relative overflow-hidden", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 max-md:hidden"
        style={{
          opacity: active ? 1 : 0.35,
          background: `radial-gradient(${size}px circle at ${pos.x}% ${pos.y}%, ${color}, transparent 55%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
