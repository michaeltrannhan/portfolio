"use client";

import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { easeOut } from "@/components/motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { requestOpenCommandPalette } from "@/components/ui/command-palette";
import { Magnetic } from "@/components/ui/magnetic";
import { NAV_SECTIONS, SECTION_IDS } from "@/lib/site";
import { useActiveSection } from "@/lib/use-active-section";
import { useChromePhysics } from "@/components/nav/use-chrome-physics";

const Navbar = () => {
  const active = useActiveSection(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { chromeRef, scrolled } = useChromePhysics();

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
            {NAV_SECTIONS.map((section) => {
              const id = section.id;
              const isActive = active === id;

              return (
                <Magnetic key={section.id} strength={0.22}>
                  <a
                    href={`#${section.id}`}
                    onClick={(event) =>
                      handleNavClick(event, `#${section.id}`)
                    }
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
                    <span className="relative z-10">{section.label}</span>
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
            {NAV_SECTIONS.map((section) => {
              const id = section.id;
              const isActive = active === id;

              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(event) => handleNavClick(event, `#${section.id}`)}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-sm transition-colors",
                    isActive
                      ? "bg-[var(--glass-bg-tint)] font-medium text-foreground shadow-[0_1px_0_0_var(--glass-highlight-soft)_inset]"
                      : "text-muted-foreground hover:bg-[var(--glass-bg-soft)] hover:text-foreground"
                  )}
                >
                  {section.label}
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
