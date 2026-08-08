"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";

type NameIntroCardProps = {
  text?: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
};

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:hello@michaeltrannhan.dev",
    icon: Mail,
  },
];

const PANEL_WIDTH_REM = 17.5; // ~280px — tooltip / link-preview scale
const PANEL_GAP = 10;
const CLOSE_DELAY_MS = 120;

function isFinePointer() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches
  );
}

/**
 * Brand wordmark that reveals a lightweight intro preview on hover / focus / tap.
 * Portaled + fixed so hero overflow / clip-path cannot hide it.
 * Feel: Aceternity animated-tooltip / link-preview — soft glass, not a modal sheet.
 */
export function NameIntroCard({
  text = "Nhan",
  className,
  as: Tag = "h1",
}: NameIntroCardProps) {
  const reduceMotion = useReducedMotion();
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const updatePosition = useCallback(() => {
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const width = Math.min(PANEL_WIDTH_REM * 16, window.innerWidth - 40);
    const panelHeight = panelRef.current?.offsetHeight ?? 160;
    const maxLeft = Math.max(16, window.innerWidth - width - 16);
    const left = Math.min(Math.max(16, rect.left), maxLeft);

    let top = rect.bottom + PANEL_GAP;
    const maxTop = Math.max(16, window.innerHeight - panelHeight - 16);
    if (top > maxTop) {
      const above = rect.top - panelHeight - PANEL_GAP;
      top = above >= 16 ? above : maxTop;
    }

    setCoords({ top, left });
  }, []);

  const openCard = useCallback(() => {
    cancelClose();
    updatePosition();
    setOpen(true);
  }, [cancelClose, updatePosition]);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  }, [cancelClose]);

  const close = useCallback(() => {
    cancelClose();
    setOpen(false);
  }, [cancelClose]);

  useEffect(() => {
    if (!open) return;
    updatePosition();
    const onScrollOrResize = () => updatePosition();
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        rootRef.current?.contains(target) ||
        panelRef.current?.contains(target)
      ) {
        return;
      }
      close();
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, close]);

  useEffect(() => () => cancelClose(), [cancelClose]);

  const handleMouseEnter = useCallback(() => {
    if (isFinePointer()) openCard();
  }, [openCard]);

  const handleMouseLeave = useCallback(() => {
    if (isFinePointer()) scheduleClose();
  }, [scheduleClose]);

  const handleFocus = useCallback(() => {
    openCard();
  }, [openCard]);

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLDivElement>) => {
      const next = e.relatedTarget as Node | null;
      if (
        rootRef.current?.contains(next) ||
        panelRef.current?.contains(next)
      ) {
        return;
      }
      scheduleClose();
    },
    [scheduleClose]
  );

  const handlePointerUp = useCallback(
    (e: ReactPointerEvent) => {
      if (e.pointerType === "touch") {
        if (open) close();
        else openCard();
      }
    },
    [open, close, openCard]
  );

  const handleKeyDown = useCallback(
    (e: ReactKeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (open) close();
        else openCard();
      }
    },
    [close, open, openCard]
  );

  const panel =
    mounted &&
    open &&
    createPortal(
      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-label="Introduction"
        className={cn(
          "pointer-events-auto fixed z-[80] w-[min(17.5rem,calc(100vw-2.5rem))] origin-top-left",
          // CSS enter (Aceternity tooltip-like). Base stays visible if animation is skipped.
          !reduceMotion &&
            "animate-in fade-in-0 slide-in-from-top-1 duration-150"
        )}
        style={{ top: coords.top, left: coords.left }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <GlassPanel
          variant="soft"
          className="rounded-xl border-[var(--glass-border-subtle)] p-3.5"
        >
          <p className="text-sm font-medium tracking-tight text-foreground">
            {text}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Interface engineer
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Crafting clear, glassy web experiences with calm precision.
          </p>

          <div className="mt-2.5 flex items-center justify-between gap-2">
            <nav
              aria-label="Quick links"
              className="flex flex-wrap items-center gap-x-2 gap-y-0.5"
            >
              {navLinks.map((link, i) => (
                <span key={link.href} className="contents">
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="text-[10px] text-muted-foreground/50"
                    >
                      ·
                    </span>
                  )}
                  <a
                    href={link.href}
                    className="text-[11px] text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline"
                  >
                    {link.label}
                  </a>
                </span>
              ))}
            </nav>

            <ul className="flex shrink-0 items-center gap-0.5">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target={
                        social.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        social.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      aria-label={social.name}
                      className="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Icon className="h-3 w-3" strokeWidth={1.75} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </GlassPanel>
      </div>,
      document.body
    );

  return (
    <div
      ref={rootRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <Tag
        className={cn(
          "relative z-10 inline-block cursor-default select-none outline-none",
          "underline-offset-[0.14em] transition-opacity duration-200",
          "focus-visible:underline focus-visible:opacity-90",
          open && "underline",
          className
        )}
        tabIndex={0}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
      >
        {text}
      </Tag>
      {panel}
    </div>
  );
}
