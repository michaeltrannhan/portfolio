"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/$#@%";

type ScrambleTextProps = {
  text: string;
  className?: string;
  as?: "span" | "p" | "h2" | "h3";
};

/** Encrypted scramble that resolves on hover / focus. */
export function ScrambleText({
  text,
  className,
  as: Tag = "span",
}: ScrambleTextProps) {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);
  const timer = useRef<number | null>(null);

  const resolve = useCallback(() => {
    if (reduceMotion) {
      setDisplay(text);
      return;
    }
    let i = 0;
    if (timer.current) window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, idx) => {
            if (char === " ") return " ";
            if (idx < i) return text[idx];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );
      i += 0.6;
      if (i >= text.length) {
        setDisplay(text);
        if (timer.current) window.clearInterval(timer.current);
      }
      frame.current += 1;
    }, 28);
  }, [reduceMotion, text]);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  return (
    <Tag
      className={cn("font-mono tracking-tight", className)}
      onMouseEnter={resolve}
      onFocus={resolve}
      tabIndex={0}
    >
      {display}
    </Tag>
  );
}
