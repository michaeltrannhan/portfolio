"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";

type TypewriterProps = {
  text: string;
  className?: string;
  speed?: number;
};

/** Quote typewriter with blinking caret. */
export function Typewriter({
  text,
  className,
  speed = 28,
}: TypewriterProps) {
  const hydrated = useHydrated();
  const reduceMotion = useReducedMotion();
  const [shown, setShown] = useState(text);
  const animate = hydrated && !reduceMotion;

  useEffect(() => {
    if (!hydrated) return;
    if (reduceMotion) {
      setShown(text);
      return;
    }
    setShown("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [hydrated, reduceMotion, speed, text]);

  return (
    <blockquote
      className={cn(
        "text-lg leading-relaxed text-foreground/90 md:text-xl",
        className
      )}
    >
      <span>“{shown}</span>
      {animate && (
        <span
          aria-hidden
          className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.1em] bg-[var(--accent-line)] align-middle animate-caret"
        />
      )}
      <span>”</span>
    </blockquote>
  );
}
