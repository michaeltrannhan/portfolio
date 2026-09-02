"use client";

import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

export type GallerySlide = {
  title: string;
  caption: string;
  tone: string;
};

type HorizontalGalleryProps = {
  slides: GallerySlide[];
  className?: string;
};

/** Perspective horizontal scroll gallery driven by vertical scroll. */
export function HorizontalGallery({
  slides,
  className,
}: HorizontalGalleryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useHydratedReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

  if (reduceMotion) {
    return (
      <div
        className={cn(
          "flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory",
          className
        )}
      >
        {slides.map((slide) => (
          <article
            key={slide.title}
            className="glass min-w-[75%] snap-center overflow-hidden rounded-2xl p-5 sm:min-w-[40%]"
            style={{
              backgroundImage: slide.tone,
            }}
          >
            <h3 className="text-base font-medium">{slide.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{slide.caption}</p>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("relative h-[180vh]", className)}>
      <div className="sticky top-24 overflow-hidden py-8">
        {/*
         * Cards use a solid surface, not `.glass` — backdrop-filter inside a
         * scroll-driven transform re-blurs + re-rasterizes every frame and is
         * the main source of pinned-gallery jank/flicker.
         */}
        <motion.div style={{ x }} className="flex w-max gap-4 pr-[40vw]">
          {slides.map((slide, i) => (
            <article
              key={slide.title}
              className="w-[min(78vw,22rem)] shrink-0 overflow-hidden rounded-2xl border border-[var(--glass-border)] p-6 shadow-[0_1px_0_0_var(--glass-highlight-soft)_inset,0_16px_48px_-12px_var(--glass-shadow-lg)]"
              style={{
                backgroundImage: slide.tone,
              }}
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Frame {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-lg font-medium tracking-tight">
                {slide.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {slide.caption}
              </p>
            </article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
