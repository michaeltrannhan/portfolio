"use client";

import { useLayoutEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { easeOut } from "@/components/motion";

const INTRO_KEY = "mt-intro-seen";

type CurtainState = "idle" | "show" | "gone";

/**
 * Soft wipe for returning visits only.
 * Skips when the intro cover handles first paint — avoids a post-hydration flash.
 */
export function PageCurtain() {
  const reduceMotion = useReducedMotion();
  const [state, setState] = useState<CurtainState>("idle");

  useLayoutEffect(() => {
    if (reduceMotion) {
      setState("gone");
      return;
    }

    let introPending = false;
    try {
      introPending = !sessionStorage.getItem(INTRO_KEY);
    } catch {
      introPending = true;
    }

    // First visit: IntroOverlay owns the cover — never flash a second layer.
    if (introPending) {
      setState("gone");
      return;
    }

    setState("show");
    const id = window.setTimeout(() => setState("gone"), 650);
    return () => window.clearTimeout(id);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {state === "show" && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[90] flex"
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <motion.div
            className="h-full w-full bg-[oklch(0.22_0.03_240)]"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            style={{ transformOrigin: "top" }}
            transition={{ duration: 0.55, ease: easeOut, delay: 0.04 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
