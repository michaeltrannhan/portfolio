import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlassVariant = "default" | "strong" | "soft" | "pill";

const variantClass: Record<GlassVariant, string> = {
  default: "glass",
  strong: "glass-strong",
  soft: "glass-soft",
  pill: "glass-pill",
};

type GlassPanelProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: GlassVariant;
  as?: "div" | "section" | "article" | "aside";
};

/** Frosted glass surface — liquid-glass / Aero translucency with specular sheen. */
export function GlassPanel({
  children,
  className,
  variant = "default",
  as: Tag = "div",
  ...props
}: GlassPanelProps) {
  return (
    <Tag className={cn(variantClass[variant], className)} {...props}>
      {children}
    </Tag>
  );
}
