"use client";

import { useEffect } from "react";

/**
 * Locks body scroll while `active`, compensating for scrollbar width so
 * content does not shift horizontally. Each activation captures and restores
 * its own inline styles, so independent consumers do not clobber each other.
 */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
    };
  }, [active]);
}
