"use client";

import { useEffect, useRef } from "react";
import { SECTION_IDS, SECTIONS } from "@/lib/site";
import { useActiveSection } from "@/lib/use-active-section";

function isDarkMode() {
  return document.documentElement.classList.contains("dark");
}

function applyAccent(id: string) {
  const accent = SECTIONS.find((section) => section.id === id)?.accent;
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
  const active = useActiveSection(SECTION_IDS);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    applyAccent(active);
  }, [active]);

  // Re-apply the current accent when the theme flips (light/dark wash swap).
  useEffect(() => {
    const root = document.documentElement;
    const themeObserver = new MutationObserver(() => {
      applyAccent(activeRef.current);
    });
    themeObserver.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => {
      themeObserver.disconnect();
      root.style.removeProperty("--accent-line");
      root.style.removeProperty("--section-wash");
    };
  }, []);

  return null;
}
