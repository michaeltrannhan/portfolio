"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-spy: tracks which section owns the viewport focus band.
 * Canonical behavior shared by Navbar, SectionRail, and SectionAccent so
 * all three always agree on the active section.
 *
 * Pass a stable, module-level array (e.g. SECTION_IDS from @/lib/site) —
 * the observer is re-created when the array identity changes.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          );

        const nextId = visible[0]?.target?.id;
        if (!nextId) return;

        // Require a clear lead before flipping — stops thrash at boundaries.
        const topRatio = visible[0].intersectionRatio ?? 0;
        const secondRatio = visible[1]?.intersectionRatio ?? 0;
        if (visible.length > 1 && topRatio < secondRatio + 0.08) return;

        // Functional update bails out when unchanged (no extra render).
        setActive((prev) => (prev === nextId ? prev : nextId));
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
