"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Enter scrolled chrome past this offset; leave below the off threshold (hysteresis). */
const SCROLL_ON = 56;
const SCROLL_OFF = 32;

/**
 * Navbar "chrome" physics: scrolled-state hysteresis plus scroll-velocity
 * squish/blur painted directly on the element (no re-renders per frame).
 * Returns the ref for the chrome container and its scrolled state.
 */
export function useChromePhysics() {
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  const chromeRef = useRef<HTMLDivElement>(null);
  const scrolledRef = useRef(false);
  const velocityRef = useRef(0);
  const squishRef = useRef(1);
  const lastY = useRef(0);
  const lastT = useRef(0);
  const scrollRaf = useRef(0);
  const decayRaf = useRef(0);
  const reduceMotionRef = useRef(reduceMotion);

  useEffect(() => {
    reduceMotionRef.current = reduceMotion;
  }, [reduceMotion]);

  const paintChrome = useCallback(() => {
    const el = chromeRef.current;
    if (!el) return;

    const v = velocityRef.current;
    const squish = squishRef.current;
    const isScrolled = scrolledRef.current;
    // Quantize blur so backdrop-filter isn't rewritten every sub-pixel frame.
    const blurRaw = isScrolled ? 18 + v * 10 : 12 + v * 6;
    const blurPx = Math.round(blurRaw * 2) / 2;

    const filter = `blur(${blurPx}px) saturate(var(--glass-saturate))`;
    el.style.backdropFilter = filter;
    el.style.setProperty("-webkit-backdrop-filter", filter);

    if (reduceMotionRef.current) {
      el.style.transform = "";
    } else {
      el.style.transform = `scaleY(${squish}) scaleX(${2 - squish})`;
      el.style.transformOrigin = "center top";
    }
  }, []);

  const stopDecay = useCallback(() => {
    if (decayRaf.current) {
      cancelAnimationFrame(decayRaf.current);
      decayRaf.current = 0;
    }
  }, []);

  const startDecay = useCallback(() => {
    if (reduceMotionRef.current || decayRaf.current) return;

    const tick = () => {
      const prevV = velocityRef.current;
      const prevS = squishRef.current;
      const nextV = prevV * 0.86;
      velocityRef.current = nextV < 0.02 ? 0 : nextV;
      squishRef.current = prevS + (1 - prevS) * 0.12;

      const settled =
        velocityRef.current === 0 && Math.abs(1 - squishRef.current) < 0.001;

      if (settled) {
        velocityRef.current = 0;
        squishRef.current = 1;
        paintChrome();
        decayRaf.current = 0;
        return;
      }

      paintChrome();
      decayRaf.current = requestAnimationFrame(tick);
    };

    decayRaf.current = requestAnimationFrame(tick);
  }, [paintChrome]);

  useEffect(() => {
    lastY.current = window.scrollY;
    lastT.current = performance.now();
    scrolledRef.current = window.scrollY > SCROLL_ON;
    setScrolled(scrolledRef.current);
    paintChrome();

    const onScroll = () => {
      if (scrollRaf.current) return;

      scrollRaf.current = requestAnimationFrame(() => {
        scrollRaf.current = 0;
        const y = window.scrollY;

        let nextScrolled = scrolledRef.current;
        if (!nextScrolled && y > SCROLL_ON) nextScrolled = true;
        else if (nextScrolled && y < SCROLL_OFF) nextScrolled = false;

        if (nextScrolled !== scrolledRef.current) {
          scrolledRef.current = nextScrolled;
          setScrolled(nextScrolled);
        }

        if (!reduceMotionRef.current) {
          const now = performance.now();
          const dt = Math.max(16, now - lastT.current);
          const dy = Math.abs(y - lastY.current);
          const v = Math.min(1, dy / dt);
          // Ease toward measured velocity so spikes don't thrash paint.
          velocityRef.current = Math.max(v, velocityRef.current * 0.7);
          squishRef.current = 1 - Math.min(0.06, velocityRef.current * 0.08);
          lastY.current = y;
          lastT.current = now;
          paintChrome();
          startDecay();
        } else {
          lastY.current = y;
          lastT.current = performance.now();
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current);
      stopDecay();
    };
  }, [paintChrome, startDecay, stopDecay]);

  useEffect(() => {
    if (reduceMotion) {
      stopDecay();
      velocityRef.current = 0;
      squishRef.current = 1;
      paintChrome();
    }
  }, [reduceMotion, paintChrome, stopDecay]);

  return { chromeRef, scrolled };
}
