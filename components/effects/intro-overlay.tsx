"use client";

import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { easeOut } from "@/components/motion";
import { INTRO_SEEN_KEY } from "@/lib/site";
import { useHydrated } from "@/lib/use-hydrated";
import { useScrollLock } from "@/lib/use-scroll-lock";

type IntroMode = "boot" | "first" | "returning";

const LETTERS = ["N", "H", "A", "N"] as const;
const COVER =
  "fixed inset-0 z-[100] isolate overflow-hidden text-[#eef5f3]";

function hasSeenIntro() {
  try {
    return Boolean(sessionStorage.getItem(INTRO_SEEN_KEY));
  } catch {
    return false;
  }
}

type IntroContentProps = {
  mode: IntroMode;
  reduceMotion: boolean;
  onEnter: () => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
};

function IntroContent({
  mode,
  reduceMotion,
  onEnter,
  buttonRef,
}: IntroContentProps) {
  const firstVisit = mode === "first";
  const animate = firstVisit && !reduceMotion;
  const status =
    mode === "boot"
      ? "Calibrating interface"
      : firstVisit
        ? "Registration sequence"
        : "Welcome back";

  return (
    <motion.div
      key={mode}
      className="relative z-20 flex min-h-full flex-col justify-between px-5 py-5 sm:px-8 sm:py-7"
      exit={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, scale: 0.97, filter: "blur(8px)" }
      }
      transition={{ duration: reduceMotion ? 0.01 : 0.28, ease: easeOut }}
    >
      <motion.div
        className="flex items-start justify-between gap-6 font-mono text-[9px] uppercase tracking-[0.24em] text-[#eef5f3]/45 sm:text-[10px]"
        initial={animate ? { opacity: 0, y: -8 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.45, ease: easeOut }}
      >
        <p>
          Portfolio / 2026
          <span className="mt-1 block text-[#70e1d1]">Interface systems</span>
        </p>
        <p className="text-right">
          Ho Chi Minh City
          <span className="mt-1 block text-[#e3b66a]">UTC +07:00</span>
        </p>
      </motion.div>

      <div className="relative flex flex-1 items-center justify-center py-12">
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/2 aspect-square w-[min(58vw,23rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#70e1d1]/25"
          initial={animate ? { opacity: 0, scale: 0.72, rotate: -28 } : false}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.12, duration: 0.95, ease: easeOut }}
        >
          <div className="absolute inset-[12%] rounded-full border border-[#eef5f3]/10" />
          <div className="absolute left-1/2 top-[-8%] h-[116%] w-px bg-gradient-to-b from-transparent via-[#70e1d1]/35 to-transparent" />
          <div className="absolute left-[-8%] top-1/2 h-px w-[116%] bg-gradient-to-r from-transparent via-[#70e1d1]/35 to-transparent" />
          <motion.div
            className="absolute inset-[27%] rounded-full border border-dashed border-[#e3b66a]/50"
            animate={
              animate
                ? { rotate: 180 }
                : undefined
            }
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#70e1d1] shadow-[0_0_28px_8px_rgba(112,225,209,0.28)]" />
        </motion.div>

        <div className="relative z-10 w-full text-center">
          <motion.p
            className="mb-3 font-mono text-[9px] uppercase tracking-[0.32em] text-[#eef5f3]/48 sm:text-[10px]"
            initial={animate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28, duration: 0.45 }}
          >
            {status}
          </motion.p>

          <p
            aria-label="Nhan"
            className="flex justify-center overflow-hidden font-display text-[clamp(4.5rem,18vw,15rem)] font-semibold uppercase leading-[0.78] tracking-[-0.09em] text-[#eef5f3]"
          >
            {LETTERS.map((letter, index) => (
              <motion.span
                key={letter + index}
                aria-hidden
                className="inline-block"
                initial={
                  animate
                    ? {
                        opacity: 0,
                        y: index % 2 === 0 ? "80%" : "-80%",
                        rotate: index % 2 === 0 ? 5 : -5,
                      }
                    : false
                }
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{
                  delay: 0.18 + index * 0.075,
                  duration: 0.78,
                  ease: easeOut,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </p>

          <motion.div
            aria-hidden
            className="mx-auto mt-5 h-px max-w-[min(78vw,38rem)] origin-center bg-gradient-to-r from-transparent via-[#70e1d1]/80 to-transparent"
            initial={animate ? { scaleX: 0 } : false}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.46, duration: 0.85, ease: easeOut }}
          />

          {firstVisit && (
            <motion.div
              initial={animate ? { opacity: 0, y: 12 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.5, ease: easeOut }}
            >
              <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-[#eef5f3]/58 sm:text-base">
                Clear interfaces. Precise motion. Systems built to hold.
              </p>
              <button
                ref={buttonRef}
                type="button"
                onClick={onEnter}
                className="group mt-7 inline-flex items-center gap-3 rounded-full border border-[#eef5f3]/25 bg-[#eef5f3]/[0.04] px-5 py-2.5 text-sm font-medium text-[#eef5f3] backdrop-blur-sm transition-[background-color,border-color,transform] hover:-translate-y-0.5 hover:border-[#70e1d1]/60 hover:bg-[#70e1d1]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70e1d1] focus-visible:ring-offset-4 focus-visible:ring-offset-[#06121c]"
              >
                Enter portfolio
                <span
                  aria-hidden
                  className="text-[#70e1d1] transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <motion.div
        className="flex items-end justify-between gap-6 font-mono text-[9px] uppercase tracking-[0.22em] text-[#eef5f3]/35 sm:text-[10px]"
        initial={animate ? { opacity: 0, y: 8 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.72, duration: 0.45, ease: easeOut }}
      >
        <p>
          <span className="sm:hidden">Clarity / Craft</span>
          <span className="hidden sm:inline">
            01 — Clarity
            <span className="mx-2 text-[#70e1d1]/60">/</span>
            02 — Craft
          </span>
        </p>
        <p className="text-right">
          {firstVisit ? (
            <>
              <span className="sm:hidden">Enter / skip</span>
              <span className="hidden sm:inline">Enter · Esc · Space</span>
            </>
          ) : mode === "returning" ? (
            "Recalibrating"
          ) : (
            "Loading"
          )}
        </p>
      </motion.div>
    </motion.div>
  );
}

/** A first-visit registration sequence and a brief returning-visit shutter. */
export function IntroOverlay() {
  const hydrated = useHydrated();
  const reduceMotionPreference = useHydratedReducedMotion();
  const reduceMotion = Boolean(reduceMotionPreference);
  const [dismissed, setDismissed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const focusAfterExitRef = useRef(false);

  const seen = hydrated ? hasSeenIntro() : false;
  const mode: IntroMode = !hydrated ? "boot" : seen ? "returning" : "first";
  const visible = !dismissed;
  const interactive = hydrated && mode === "first" && visible;

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      /* Storage can be unavailable in privacy-restricted contexts. */
    }
    focusAfterExitRef.current = true;
    setDismissed(true);
  }, []);

  useEffect(() => {
    if (!hydrated || mode !== "returning" || dismissed) return;

    if (reduceMotion) {
      const frame = window.requestAnimationFrame(() => setDismissed(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const timeout = window.setTimeout(() => setDismissed(true), 240);
    return () => window.clearTimeout(timeout);
  }, [dismissed, hydrated, mode, reduceMotion]);

  useLayoutEffect(() => {
    if (!visible) return;

    const previousRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";

    const hash = window.location.hash;
    if (!hash || hash === "#about") {
      window.scrollTo(0, 0);
    }

    return () => {
      history.scrollRestoration = previousRestoration;
    };
  }, [visible]);

  useEffect(() => {
    if (!interactive) return;

    const focusFrame = window.requestAnimationFrame(() =>
      buttonRef.current?.focus()
    );
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
      if (event.key === "Tab") {
        event.preventDefault();
        buttonRef.current?.focus();
        return;
      }
      if (
        event.key === "Enter" ||
        event.key === "Escape" ||
        event.key === " "
      ) {
        event.preventDefault();
        dismiss();
      }
    };

    window.addEventListener("keydown", onKeyDown, true);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", onKeyDown, true);
    };
  }, [dismiss, interactive]);

  useScrollLock(visible);

  const exitDuration = reduceMotion ? 0.01 : mode === "returning" ? 0.56 : 0.82;

  return (
    <AnimatePresence
      initial={false}
      onExitComplete={() => {
        if (!focusAfterExitRef.current) return;
        focusAfterExitRef.current = false;
        const blockingDialog = document.querySelector(
          '[role="dialog"][aria-modal="true"]:not([aria-label="Enter portfolio"])'
        );
        if (!blockingDialog) {
          document.getElementById("main-content")?.focus({ preventScroll: true });
        }
      }}
    >
      {visible && (
        <motion.div
          role={interactive ? "dialog" : undefined}
          aria-label={interactive ? "Enter portfolio" : undefined}
          aria-modal={interactive ? "true" : undefined}
          aria-hidden={interactive ? undefined : true}
          className={COVER}
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          <motion.div
            aria-hidden
            className="absolute inset-y-0 left-0 w-1/2 bg-[#06121c]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 90% 45%, rgba(112,225,209,0.11), transparent 42%)",
            }}
            exit={reduceMotion ? { opacity: 0 } : { x: "-102%" }}
            transition={{ duration: exitDuration, ease: easeOut }}
          />
          <motion.div
            aria-hidden
            className="absolute inset-y-0 right-0 w-1/2 bg-[#06121c]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 10% 55%, rgba(227,182,106,0.08), transparent 44%)",
            }}
            exit={reduceMotion ? { opacity: 0 } : { x: "102%" }}
            transition={{ duration: exitDuration, ease: easeOut }}
          />
          <motion.div
            aria-hidden
            className="absolute inset-0 z-10 opacity-[0.16]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(238,245,243,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(238,245,243,0.18) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(circle at center, black 0%, transparent 76%)",
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.22 }}
          />
          <IntroContent
            mode={mode}
            reduceMotion={reduceMotion}
            onEnter={dismiss}
            buttonRef={buttonRef}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
