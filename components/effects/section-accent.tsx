"use client";

import { useEffect } from "react";

const ACCENTS: Record<
  string,
  { line: string; wash: string; washDark: string }
> = {
  about: {
    line: "oklch(0.62 0.08 210)",
    wash: "oklch(0.975 0.012 215)",
    washDark: "oklch(0.18 0.014 230)",
  },
  tech: {
    line: "oklch(0.58 0.07 180)",
    wash: "oklch(0.975 0.014 180)",
    washDark: "oklch(0.18 0.016 180)",
  },
  projects: {
    line: "oklch(0.62 0.08 95)",
    wash: "oklch(0.978 0.014 95)",
    washDark: "oklch(0.185 0.016 95)",
  },
  blog: {
    line: "oklch(0.55 0.06 240)",
    wash: "oklch(0.975 0.012 240)",
    washDark: "oklch(0.18 0.014 240)",
  },
  contact: {
    line: "oklch(0.6 0.07 200)",
    wash: "oklch(0.97 0.01 220)",
    washDark: "oklch(0.17 0.014 220)",
  },
};

function isDarkMode() {
  return document.documentElement.classList.contains("dark");
}

function applyAccent(id: string) {
  const accent = ACCENTS[id];
  if (!accent) return;
  const root = document.documentElement;
  root.style.setProperty("--accent-line", accent.line);
  root.style.setProperty(
    "--section-wash",
    isDarkMode() ? accent.washDark : accent.wash
  );
}

/** Shifts CSS accent tokens as the active section changes. */
export function SectionAccent() {
  useEffect(() => {
    const ids = Object.keys(ACCENTS);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!elements.length) return;

    const root = document.documentElement;
    let activeId = ids[0];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          );
        const id = visible[0]?.target?.id;
        if (!id || !ACCENTS[id]) return;
        activeId = id;
        applyAccent(id);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.5] }
    );

    const themeObserver = new MutationObserver(() => {
      applyAccent(activeId);
    });
    themeObserver.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    elements.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      themeObserver.disconnect();
      root.style.removeProperty("--accent-line");
      root.style.removeProperty("--section-wash");
    };
  }, []);

  return null;
}
