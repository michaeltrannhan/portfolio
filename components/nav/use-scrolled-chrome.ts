"use client";

import { useEffect, useState } from "react";

/** Enter scrolled chrome past this offset; leave below the off threshold. */
const SCROLL_ON = 56;
const SCROLL_OFF = 32;

/**
 * Tracks the navbar's thresholded scroll state with hysteresis so its surface
 * does not flicker while the viewport hovers near the top boundary.
 */
export function useScrolledChrome() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      setScrolled((previous) =>
        previous ? y >= SCROLL_OFF : y > SCROLL_ON
      );
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return { scrolled };
}
