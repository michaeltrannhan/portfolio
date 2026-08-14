import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type StickySectionLabelProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

/** Sticky side label that pins while the section scrolls. */
export function StickySectionLabel({
  label,
  children,
  className,
}: StickySectionLabelProps) {
  return (
    <div
      className={cn(
        "relative grid gap-8 md:grid-cols-[7rem_minmax(0,1fr)] md:gap-12",
        className
      )}
    >
      <div className="md:sticky md:top-28 md:self-start">
        <p className="glass-soft inline-flex rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
      </div>
      <div>{children}</div>
    </div>
  );
}
