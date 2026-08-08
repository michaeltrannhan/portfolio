"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MovingBorder } from "@/components/ui/moving-border";
import { TiltCard } from "@/components/ui/tilt-card";
import { easeOut } from "@/components/motion";

export type Project = {
  title: string;
  description: string;
  tag: string;
  span?: "wide" | "tall" | "normal";
  preview?: string;
};

type ProjectBentoProps = {
  projects: Project[];
  className?: string;
};

/** Bento grid with tilt, moving border, and hover image preview. */
export function ProjectBento({ projects, className }: ProjectBentoProps) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "grid auto-rows-[minmax(11rem,auto)] gap-3 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {projects.map((project) => {
        const isWide = project.span === "wide";
        const isTall = project.span === "tall";

        return (
          <TiltCard
            key={project.title}
            className={cn(
              isWide && "sm:col-span-2",
              isTall && "sm:row-span-2"
            )}
          >
            <MovingBorder
              containerClassName="h-full"
              className="h-full"
              duration={7}
            >
              <article
                className="group relative flex h-full min-h-[11rem] flex-col justify-between overflow-hidden p-5"
                onMouseEnter={() => setHovered(project.title)}
                onMouseLeave={() => setHovered(null)}
                onMouseMove={(e) => {
                  const el = e.currentTarget;
                  const rect = el.getBoundingClientRect();
                  el.style.setProperty(
                    "--mx",
                    `${((e.clientX - rect.left) / rect.width) * 100}%`
                  );
                  el.style.setProperty(
                    "--my",
                    `${((e.clientY - rect.top) / rect.height) * 100}%`
                  );
                }}
              >
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500",
                    "bg-[radial-gradient(420px_circle_at_var(--mx,70%)_var(--my,30%),oklch(0.92_0.03_210_/_0.55),transparent_55%)]",
                    "group-hover:opacity-100 max-md:hidden"
                  )}
                />

                <div className="relative z-10">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {project.tag}
                  </p>
                  <h3 className="mt-2 text-lg font-medium tracking-tight">
                    {project.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                </div>

                <AnimatePresence>
                  {hovered === project.title && !reduceMotion && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.28, ease: easeOut }}
                      className="glass-soft pointer-events-none absolute bottom-4 right-4 z-10 hidden h-20 w-28 overflow-hidden rounded-md md:block"
                    >
                      <div
                        className="h-full w-full"
                        style={{
                          background:
                            project.preview ??
                            "linear-gradient(135deg, oklch(0.9 0.04 210), oklch(0.93 0.03 85))",
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:hidden"
                />
              </article>
            </MovingBorder>
          </TiltCard>
        );
      })}
    </div>
  );
}
