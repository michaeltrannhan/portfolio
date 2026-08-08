"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { easeOut } from "@/components/motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { requestOpenCommandPalette } from "@/components/ui/command-palette";
import { Magnetic } from "@/components/ui/magnetic";

const links = [
  { name: "About", href: "#about" },
  { name: "Tech", href: "#tech" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
];

const SECTION_IDS = links.map((link) => link.href.slice(1));

/** Enter scrolled chrome past this offset; leave below the off threshold (hysteresis). */
const SCROLL_ON = 56;
const SCROLL_OFF = 32;

const Navbar = () => {
  const [active, setActive] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const chromeRef = useRef<HTMLDivElement>(null);
  const scrolledRef = useRef(false);
  const activeRef = useRef(active);
  const velocityRef = useRef(0);
  const squishRef = useRef(1);
  const lastY = useRef(0);
  const lastT = useRef(0);
  const scrollRaf = useRef(0);
  const decayRaf = useRef(0);
  const reduceMotionRef = useRef(reduceMotion);

  reduceMotionRef.current = reduceMotion;
  activeRef.current = active;

  const paintChrome = useCallback(() => {
    const el = chromeRef.current;
    if (!el) return;

    const v = velocityRef.current;
    const squish = squishRef.current;
    const isScrolled = scrolledRef.current;
    // Quantize blur so backdrop-filter isn't rewritten every sub-pixel frame.
    const blurRaw = isScrolled ? 18 + v * 10 : 12 + v * 6;
    const blurPx = Math.round(blurRaw * 2) / 2;

    const filter = `blur(${blurPx}px) saturate(var(--glass-saturate))`;
    el.style.backdropFilter = filter;
    el.style.setProperty("-webkit-backdrop-filter", filter);

    if (reduceMotionRef.current) {
      el.style.transform = "";
    } else {
      el.style.transform = `scaleY(${squish}) scaleX(${2 - squish})`;
      el.style.transformOrigin = "center top";
    }
  }, []);

  const stopDecay = useCallback(() => {
    if (decayRaf.current) {
      cancelAnimationFrame(decayRaf.current);
      decayRaf.current = 0;
    }
  }, []);

  const startDecay = useCallback(() => {
    if (reduceMotionRef.current || decayRaf.current) return;

    const tick = () => {
      const prevV = velocityRef.current;
      const prevS = squishRef.current;
      const nextV = prevV * 0.86;
      velocityRef.current = nextV < 0.02 ? 0 : nextV;
      squishRef.current = prevS + (1 - prevS) * 0.12;

      const settled =
        velocityRef.current === 0 && Math.abs(1 - squishRef.current) < 0.001;

      if (settled) {
        velocityRef.current = 0;
        squishRef.current = 1;
        paintChrome();
        decayRaf.current = 0;
        return;
      }

      paintChrome();
      decayRaf.current = requestAnimationFrame(tick);
    };

    decayRaf.current = requestAnimationFrame(tick);
  }, [paintChrome]);

  useEffect(() => {
    lastY.current = window.scrollY;
    lastT.current = performance.now();
    scrolledRef.current = window.scrollY > SCROLL_ON;
    setScrolled(scrolledRef.current);
    paintChrome();

    const onScroll = () => {
      if (scrollRaf.current) return;

      scrollRaf.current = requestAnimationFrame(() => {
        scrollRaf.current = 0;
        const y = window.scrollY;

        let nextScrolled = scrolledRef.current;
        if (!nextScrolled && y > SCROLL_ON) nextScrolled = true;
        else if (nextScrolled && y < SCROLL_OFF) nextScrolled = false;

        if (nextScrolled !== scrolledRef.current) {
          scrolledRef.current = nextScrolled;
          setScrolled(nextScrolled);
        }

        if (!reduceMotionRef.current) {
          const now = performance.now();
          const dt = Math.max(16, now - lastT.current);
          const dy = Math.abs(y - lastY.current);
          const v = Math.min(1, dy / dt);
          // Ease toward measured velocity so spikes don't thrash paint.
          velocityRef.current = Math.max(v, velocityRef.current * 0.7);
          squishRef.current = 1 - Math.min(0.06, velocityRef.current * 0.08);
          lastY.current = y;
          lastT.current = now;
          paintChrome();
          startDecay();
        } else {
          lastY.current = y;
          lastT.current = performance.now();
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current);
      stopDecay();
    };
  }, [paintChrome, startDecay, stopDecay]);

  useEffect(() => {
    if (reduceMotion) {
      stopDecay();
      velocityRef.current = 0;
      squishRef.current = 1;
      paintChrome();
    }
  }, [reduceMotion, paintChrome, stopDecay]);

  useEffect(() => {
    const elements = SECTION_IDS.map((id) =>
      document.getElementById(id)
    ).filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          );

        const nextId = visible[0]?.target?.id;
        if (!nextId || nextId === activeRef.current) return;

        // Require a clear lead before flipping — stops pill thrash at boundaries.
        const topRatio = visible[0].intersectionRatio ?? 0;
        const secondRatio = visible[1]?.intersectionRatio ?? 0;
        if (topRatio < secondRatio + 0.08 && visible.length > 1) return;

        activeRef.current = nextId;
        setActive(nextId);
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const handleNavClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, href: string) => {
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      setMenuOpen(false);
      activeRef.current = id;
      setActive(id);
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", href);
    },
    [reduceMotion]
  );

  return (
    <motion.nav
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: easeOut }}
      className="fixed inset-x-0 top-4 z-50 mx-auto max-w-3xl px-4"
    >
      <div
        ref={chromeRef}
        className={cn(
          "glass-pill flex items-center justify-between rounded-full px-3 py-2 transition-[background-color,box-shadow,border-color] duration-300 md:px-4 md:py-2.5",
          scrolled
            ? "bg-[var(--glass-bg-strong)] shadow-[0_1px_0_0_var(--glass-highlight)_inset,0_12px_40px_-12px_var(--glass-shadow-lg)]"
            : "bg-[var(--glass-bg-soft)] border-[var(--glass-border-subtle)]"
        )}
        style={{
          backdropFilter: "blur(12px) saturate(var(--glass-saturate))",
          WebkitBackdropFilter: "blur(12px) saturate(var(--glass-saturate))",
          transformOrigin: "center top",
        }}
      >
        <Magnetic strength={0.18}>
          <a
            href="#about"
            onClick={(event) => handleNavClick(event, "#about")}
            className="px-1 text-sm font-semibold tracking-tight text-foreground transition-opacity hover:opacity-70"
          >
            Nhan
          </a>
        </Magnetic>

        <div className="flex items-center gap-0.5">
          <div className="hidden items-center gap-0.5 md:flex">
            {links.map((link) => {
              const id = link.href.slice(1);
              const isActive = active === id;

              return (
                <Magnetic key={link.href} strength={0.22}>
                  <a
                    href={link.href}
                    onClick={(event) => handleNavClick(event, link.href)}
                    className={cn(
                      "relative rounded-full px-3 py-1.5 text-sm transition-colors",
                      isActive
                        ? "font-medium text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg-tint)] shadow-[0_1px_0_0_var(--glass-highlight-soft)_inset]"
                        transition={{ duration: 0.25, ease: easeOut }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </a>
                </Magnetic>
              );
            })}
          </div>

          <Magnetic strength={0.18}>
            <button
              type="button"
              onClick={() => requestOpenCommandPalette()}
              aria-label="Open jump palette"
              className="ml-0.5 inline-flex h-9 items-center gap-1.5 rounded-full px-2.5 text-xs text-muted-foreground transition-colors hover:bg-[var(--glass-bg-tint)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:px-3"
            >
              <Search className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span className="hidden sm:inline">Jump</span>
              <kbd
                aria-hidden
                className="hidden rounded border border-[var(--glass-border)] bg-[var(--glass-bg-soft)] px-1.5 py-0.5 font-mono text-[10px] md:inline"
              >
                ⌘K
              </kbd>
            </button>
          </Magnetic>

          <ThemeToggle className="ml-0.5" />

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2 text-foreground md:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: easeOut }}
            className="glass-strong mt-2 overflow-hidden rounded-2xl p-2 md:hidden"
          >
            {links.map((link) => {
              const id = link.href.slice(1);
              const isActive = active === id;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => handleNavClick(event, link.href)}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-sm transition-colors",
                    isActive
                      ? "bg-[var(--glass-bg-tint)] font-medium text-foreground shadow-[0_1px_0_0_var(--glass-highlight-soft)_inset]"
                      : "text-muted-foreground hover:bg-[var(--glass-bg-soft)] hover:text-foreground"
                  )}
                >
                  {link.name}
                </a>
              );
            })}
            <div className="mt-1 flex items-center justify-between rounded-xl px-4 py-2 text-sm text-muted-foreground">
              <span>Theme</span>
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
