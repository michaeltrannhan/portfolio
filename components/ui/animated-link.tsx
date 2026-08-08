"use client";

import { type AnchorHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type AnimatedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

/** Link with animated underline grow on hover. */
export function AnimatedLink({
  children,
  className,
  ...props
}: AnimatedLinkProps) {
  return (
    <a
      className={cn(
        "group relative inline-flex items-center text-sm font-medium text-foreground",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <span
        aria-hidden
        className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-foreground transition-transform duration-300 ease-out group-hover:scale-x-100"
      />
    </a>
  );
}
