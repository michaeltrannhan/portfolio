"use client";

import { type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";

type ShimmerTextProps = {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
  "aria-hidden"?: boolean | "true" | "false";
};

/** Subtle teal/amber gradient shimmer across headline text. */
export function ShimmerText({
  children,
  className,
  as: Tag = "span",
  "aria-hidden": ariaHidden,
}: ShimmerTextProps) {
  const hydrated = useHydrated();
  const reduceMotion = useReducedMotion();
  const animate = hydrated && !reduceMotion;

  if (!animate) {
    if (ariaHidden) {
      return (
        <Tag aria-hidden className={cn("opacity-0", className)}>
          {children}
        </Tag>
      );
    }
    return <Tag className={cn("text-foreground", className)}>{children}</Tag>;
  }

  return (
    <Tag
      aria-hidden={ariaHidden}
      className={cn(
        "animate-shimmer-text bg-[length:200%_100%] bg-clip-text text-transparent",
        className
      )}
      style={{ backgroundImage: "var(--shimmer-gradient)" }}
    >
      {children}
    </Tag>
  );
}
