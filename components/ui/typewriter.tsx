"use client";

import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";

type TypewriterProps = {
  text: string;
  className?: string;
  speed?: number;
};

function AnimatedText({ text, speed }: { text: string; speed: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let index = 0;
    const id = window.setInterval(() => {
      index += 1;
      setCount(index);
      if (index >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [speed, text]);

  return text.slice(0, count);
}

/** Quote typewriter with blinking caret. */
export function Typewriter({
  text,
  className,
  speed = 28,
}: TypewriterProps) {
  const hydrated = useHydrated();
  const reduceMotion = useHydratedReducedMotion();
  const animate = hydrated && !reduceMotion;

  return (
    <blockquote
      className={cn(
        "text-lg leading-relaxed text-foreground/90 md:text-xl",
        className
      )}
    >
      <span>
        “
        {animate ? (
          <AnimatedText key={`${text}:${speed}`} text={text} speed={speed} />
        ) : (
          text
        )}
      </span>
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
