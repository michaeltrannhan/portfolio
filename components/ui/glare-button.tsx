"use client";

import { type AnchorHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlareButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "ghost";
};

/** CTA with shine sweep on hover. */
export function GlareButton({
  children,
  className,
  variant = "primary",
  ...props
}: GlareButtonProps) {
  return (
    <a
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium transition-[opacity,background-color] duration-300",
        variant === "primary" &&
          "glass-strong text-foreground hover:bg-[var(--glass-bg-tint)]",
        variant === "ghost" &&
          "glass-soft px-4 text-foreground no-underline hover:bg-[var(--glass-bg-tint)]",
        className
      )}
      {...props}
    >
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] -translate-x-full bg-gradient-to-r from-transparent via-[var(--glass-specular)] to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full max-md:hidden"
        />
      )}
      <span className="relative z-10">{children}</span>
    </a>
  );
}
