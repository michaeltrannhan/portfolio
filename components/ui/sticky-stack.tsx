import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type StickyPanel = {
  title: string;
  body: string;
  eyebrow?: string;
};

type StickyStackProps = {
  panels: StickyPanel[];
  className?: string;
  aside?: ReactNode;
};

/** Vertical sticky / scroll-pinned panel stack. */
export function StickyStack({ panels, className, aside }: StickyStackProps) {
  return (
    <div
      className={cn(
        "grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14",
        className
      )}
    >
      <div className="lg:sticky lg:top-28 lg:self-start">{aside}</div>
      <div className="space-y-6">
        {panels.map((panel, i) => (
          <article
            key={panel.title}
            className="glass overflow-hidden rounded-2xl p-6 lg:sticky"
            style={{ top: `${7 + i * 1.25}rem` }}
          >
            {panel.eyebrow && (
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {panel.eyebrow}
              </p>
            )}
            <h3 className="mt-2 text-lg font-medium tracking-tight">
              {panel.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {panel.body}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
