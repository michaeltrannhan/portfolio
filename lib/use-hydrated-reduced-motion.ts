"use client";

import { useReducedMotion } from "framer-motion";
import { useHydrated } from "@/lib/use-hydrated";

/**
 * Exposes the OS preference only after hydration so server and client render
 * identical markup. Global reduced-motion CSS still suppresses first-paint
 * animation before this value updates.
 */
export function useHydratedReducedMotion() {
  const hydrated = useHydrated();
  const preference = useReducedMotion();

  return hydrated && Boolean(preference);
}
