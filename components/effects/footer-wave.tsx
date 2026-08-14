"use client";

import { cn } from "@/lib/utils";
import { MorphPath } from "@/components/effects/morph-path";

type FooterWaveProps = {
  className?: string;
};

/** Morphing SVG wave separator above the footer. */
export function FooterWave({ className }: FooterWaveProps) {
  return (
    <div
      aria-hidden
      className={cn("relative -mb-px h-16 w-full overflow-hidden", className)}
    >
      <svg
        className="absolute inset-x-0 bottom-0 h-full w-full text-[var(--footer-wash)]"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <MorphPath
          paths={[
            "M0,40 C240,70 480,10 720,40 C960,70 1200,20 1440,45 L1440,80 L0,80 Z",
            "M0,48 C240,20 480,70 720,35 C960,10 1200,60 1440,40 L1440,80 L0,80 Z",
          ]}
          duration={10}
        />
      </svg>
    </div>
  );
}
