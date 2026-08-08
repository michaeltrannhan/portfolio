"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { easeOut } from "@/components/motion";

const STORAGE_KEY = "mt-intro-seen";

type Phase = "boot" | "intro" | "done";

function lockScroll() {
  const sbw = window.innerWidth - document.documentElement.clientWidth;
  const prevOverflow = document.body.style.overflow;
  const prevPadding = document.body.style.paddingRight;
  document.body.style.overflow = "hidden";
  if (sbw > 0) document.body.style.paddingRight = `${sbw}px`;
  return () => {
    document.body.style.overflow = prevOverflow;
    document.body.style.paddingRight = prevPadding;
  };
}

const COVER =
  "fixed inset-0 z-[100] flex items-center justify-center bg-[oklch(0.18_0.025_240)] text-[oklch(0.96_0.01_220)]";

/** Immersive enter-portfolio overlay; dismisses once per browser. */
export function IntroOverlay() {
  const reduceMotion = useReducedMotion();
  // SSR boots with a solid cover so the page never flashes underneath.
  const [phase, setPhase] = useState<Phase>("boot");

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    const hash = window.location.hash;
    if (!hash || hash === "#about") {
      window.scrollTo(0, 0);
    }

    try {
      if (sessionStorage.getItem(STORAGE_KEY)) {
        setPhase("done");
        return;
      }
    } catch {
      /* show intro when storage is unavailable */
    }
    setPhase("intro");
  }, []);

  const dismiss = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setPhase("done");
  };

  useEffect(() => {
    if (phase !== "intro") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape" || e.key === " ") {
        e.preventDefault();
        dismiss();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  useEffect(() => {
    if (phase === "done") return;
    return lockScroll();
  }, [phase]);

  // Returning visit: drop cover in the same layout pass — no exit wipe.
  if (phase === "boot") {
    return (
      <div className={COVER} aria-hidden>
        <span className="sr-only">Loading</span>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {phase === "intro" && (
        <motion.div
          role="dialog"
          aria-label="Enter portfolio"
          className={COVER}
          initial={false}
          animate={{ opacity: 1 }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, clipPath: "inset(0 0 100% 0)" }
          }
          transition={{ duration: 0.55, ease: easeOut }}
        >
          <div className="px-6 text-center">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease: easeOut }}
              className="text-xs tracking-[0.22em] uppercase text-white/55"
            >
              Michael Tran
            </motion.p>
            <motion.h2
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.55, ease: easeOut }}
              className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl"
            >
              Nhan
            </motion.h2>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.42, duration: 0.45 }}
              className="mx-auto mt-4 max-w-sm text-sm text-white/65"
            >
              Interfaces with calm precision.
            </motion.p>
            <motion.button
              type="button"
              onClick={dismiss}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              className="mt-8 rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Enter
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
