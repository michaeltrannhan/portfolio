"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { easeOut } from "@/components/motion";

const DESTINATIONS = [
  { id: "about", label: "About", hint: "Intro & story", href: "#about" },
  { id: "tech", label: "Tech", hint: "Stack & tools", href: "#tech" },
  {
    id: "projects",
    label: "Projects",
    hint: "Selected work",
    href: "#projects",
  },
  { id: "blog", label: "Blog", hint: "Writing", href: "#blog" },
  { id: "contact", label: "Contact", hint: "Footer / socials", href: "#contact" },
];

/** Dispatched by Navbar (and anything else) to open the palette. */
export const OPEN_COMMAND_PALETTE_EVENT = "mt:open-command-palette";

export function requestOpenCommandPalette() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_COMMAND_PALETTE_EVENT));
}

/** ⌘K / Ctrl+K quick jump — Spotlight-style top-center placement. */
export function CommandPalette() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DESTINATIONS;
    return DESTINATIONS.filter(
      (d) =>
        d.label.toLowerCase().includes(q) || d.hint.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpenRequest = () => setOpen(true);

    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_COMMAND_PALETTE_EVENT, onOpenRequest);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_COMMAND_PALETTE_EVENT, onOpenRequest);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (sbw > 0) document.body.style.paddingRight = `${sbw}px`;

    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 0);

    const onFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'input, button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onFocusTrap);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onFocusTrap);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
    };
  }, [open]);

  const jump = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      const id = href.slice(1);
      const el = document.getElementById(id);
      el?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", href);
    },
    [reduceMotion]
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const item = results[active] ?? results[0];
    if (item) jump(item.href);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="presentation"
          className="fixed inset-0 z-[80] flex items-start justify-center bg-foreground/25 px-3 pt-[min(18vh,7.5rem)] backdrop-blur-[var(--glass-blur-sm)] backdrop-saturate-[var(--glass-saturate)] sm:px-4"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.18, ease: easeOut }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Quick jump"
            initial={
              reduceMotion ? false : { opacity: 0, y: -10, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion ? undefined : { opacity: 0, y: -6, scale: 0.98 }
            }
            transition={{ duration: 0.22, ease: easeOut }}
            className="glass-strong w-full max-w-[min(100%,36rem)] overflow-hidden rounded-2xl shadow-[0_24px_80px_-24px_var(--glass-shadow-lg)]"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              onSubmit={onSubmit}
              className="border-b border-[var(--glass-border)]"
            >
              <div className="flex items-center gap-2 px-4 py-3.5">
                <Search
                  className="h-4 w-4 shrink-0 text-muted-foreground"
                  aria-hidden
                />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setActive((i) =>
                        Math.min(i + 1, Math.max(results.length - 1, 0))
                      );
                    }
                    if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setActive((i) => Math.max(i - 1, 0));
                    }
                  }}
                  placeholder="Jump to section…"
                  aria-label="Jump to section"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <kbd
                  aria-hidden
                  className="hidden rounded border border-[var(--glass-border)] px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline"
                >
                  esc
                </kbd>
              </div>
            </form>
            <ul className="max-h-[min(50vh,18rem)] overflow-auto p-2">
              {results.length === 0 && (
                <li className="px-3 py-4 text-sm text-muted-foreground">
                  No matches
                </li>
              )}
              {results.map((item, i) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => jump(item.href)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                      i === active
                        ? "bg-[var(--glass-bg-tint)] text-foreground shadow-[0_1px_0_0_var(--glass-highlight-soft)_inset]"
                        : "text-muted-foreground hover:bg-[var(--glass-bg-soft)]"
                    )}
                  >
                    <span className="font-medium">{item.label}</span>
                    <span className="text-xs">{item.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
