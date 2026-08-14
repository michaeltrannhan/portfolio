"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { easeOut } from "@/components/motion";
import { useScrollLock } from "@/lib/use-scroll-lock";

export type CaseStudy = {
  id: string;
  title: string;
  tag: string;
  summary: string;
  body: string;
  stack: string[];
  preview?: string;
};

type ProjectModalProps = {
  studies: CaseStudy[];
  className?: string;
};

/** Expandable case studies with shared layoutId animation. */
export function ProjectModal({ studies, className }: ProjectModalProps) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<CaseStudy | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  // Lock background scroll (with scrollbar compensation) while a study is open.
  useScrollLock(active !== null);

  return (
    <div className={cn("grid gap-3 sm:grid-cols-2", className)}>
      {studies.map((study) => (
        <motion.button
          key={study.id}
          type="button"
          layoutId={reduceMotion ? undefined : `case-${study.id}`}
          onClick={() => setActive(study)}
          className="glass overflow-hidden rounded-2xl p-5 text-left transition-colors hover:bg-[var(--glass-bg-tint)]"
        >
          <motion.p
            layoutId={reduceMotion ? undefined : `case-tag-${study.id}`}
            className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
          >
            {study.tag}
          </motion.p>
          <motion.h3
            layoutId={reduceMotion ? undefined : `case-title-${study.id}`}
            className="mt-2 text-base font-medium tracking-tight"
          >
            {study.title}
          </motion.h3>
          <p className="mt-2 text-sm text-muted-foreground">{study.summary}</p>
        </motion.button>
      ))}

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-end justify-center bg-foreground/20 p-4 backdrop-blur-[var(--glass-blur-sm)] backdrop-saturate-[var(--glass-saturate)] sm:items-center"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.article
              layoutId={reduceMotion ? undefined : `case-${active.id}`}
              transition={{ duration: 0.35, ease: easeOut }}
              className="glass-strong relative max-h-[85vh] w-full max-w-lg overflow-auto rounded-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close case study"
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 z-10 rounded-full p-1.5 text-muted-foreground hover:bg-[var(--glass-bg-tint)] hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
              <motion.p
                layoutId={reduceMotion ? undefined : `case-tag-${active.id}`}
                className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
              >
                {active.tag}
              </motion.p>
              <motion.h3
                layoutId={reduceMotion ? undefined : `case-title-${active.id}`}
                className="mt-2 pr-8 text-xl font-semibold tracking-tight"
              >
                {active.title}
              </motion.h3>
              {active.preview && (
                <div
                  className="mt-4 aspect-[16/9] rounded-xl border border-border"
                  style={{ background: active.preview }}
                />
              )}
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {active.body}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {active.stack.map((s) => (
                  <li
                    key={s}
                    className="glass-soft rounded-full px-2.5 py-1 text-xs"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
