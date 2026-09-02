"use client";

import { useLayoutEffect } from "react";

type SavedBodyStyles = {
  overflow: string;
  paddingRight: string;
  scrollbarGutter: string;
};

let lockCount = 0;
let savedBodyStyles: SavedBodyStyles | null = null;

function acquireBodyLock() {
  if (lockCount === 0) {
    const body = document.body;
    const root = document.documentElement;
    const scrollbarWidth =
      window.innerWidth - root.clientWidth;

    savedBodyStyles = {
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
      scrollbarGutter: root.style.scrollbarGutter,
    };

    // The site reserves a stable scrollbar gutter. Drop that reservation while
    // locked so full-viewport dialogs cover the complete canvas; padding below
    // keeps the underlying page from shifting when the gutter disappears.
    root.style.scrollbarGutter = "auto";
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      const currentPadding = Number.parseFloat(
        window.getComputedStyle(body).paddingRight
      );
      body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
    }
  }

  lockCount += 1;
}

function releaseBodyLock() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount !== 0 || !savedBodyStyles) return;

  document.body.style.overflow = savedBodyStyles.overflow;
  document.body.style.paddingRight = savedBodyStyles.paddingRight;
  document.documentElement.style.scrollbarGutter =
    savedBodyStyles.scrollbarGutter;
  savedBodyStyles = null;
}

/**
 * Locks body scroll while `active`, compensating for scrollbar width so
 * content does not shift horizontally. A module-level reference count keeps
 * overlapping dialogs locked until the final consumer releases its lock.
 */
export function useScrollLock(active: boolean) {
  useLayoutEffect(() => {
    if (!active) return;

    acquireBodyLock();
    return releaseBodyLock;
  }, [active]);
}
