"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";

type ThemeToggleProps = {
  className?: string;
};

/** Sun/moon toggle — icons follow the `.dark` class so FOUC and hydration stay aligned. */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light and dark mode"
      className={cn(
        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-[var(--glass-bg-tint)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      <Sun className="hidden h-4 w-4 dark:block" aria-hidden />
      <Moon className="h-4 w-4 dark:hidden" aria-hidden />
    </button>
  );
}
