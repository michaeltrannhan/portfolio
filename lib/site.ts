import { Github, Linkedin, Mail, type LucideIcon } from "lucide-react";

export type SectionAccent = {
  line: string;
  wash: string;
  washDark: string;
};

export type Section = {
  id: string;
  label: string;
  /** Short description surfaced by the ⌘K command palette. */
  hint: string;
  /** Accent tokens applied by <SectionAccent /> while this section is active. */
  accent: SectionAccent;
  /** Whether the section appears in the navbar (contact lives in the footer only). */
  inNav: boolean;
};

/**
 * Single source of truth for page sections.
 * Consumed by: Navbar, SectionRail, SectionAccent, CommandPalette, NameIntroCard.
 */
export const SECTIONS: readonly Section[] = [
  {
    id: "about",
    label: "About",
    hint: "Intro & story",
    inNav: true,
    accent: {
      line: "oklch(0.62 0.08 210)",
      wash: "oklch(0.975 0.012 215)",
      washDark: "oklch(0.18 0.014 230)",
    },
  },
  {
    id: "tech",
    label: "Tech",
    hint: "Stack & tools",
    inNav: true,
    accent: {
      line: "oklch(0.58 0.07 180)",
      wash: "oklch(0.975 0.014 180)",
      washDark: "oklch(0.18 0.016 180)",
    },
  },
  {
    id: "projects",
    label: "Projects",
    hint: "Selected work",
    inNav: true,
    accent: {
      line: "oklch(0.62 0.08 95)",
      wash: "oklch(0.978 0.014 95)",
      washDark: "oklch(0.185 0.016 95)",
    },
  },
  {
    id: "blog",
    label: "Blog",
    hint: "Writing",
    inNav: true,
    accent: {
      line: "oklch(0.55 0.06 240)",
      wash: "oklch(0.975 0.012 240)",
      washDark: "oklch(0.18 0.014 240)",
    },
  },
  {
    id: "contact",
    label: "Contact",
    hint: "Footer / socials",
    inNav: false,
    accent: {
      line: "oklch(0.6 0.07 200)",
      wash: "oklch(0.97 0.01 220)",
      washDark: "oklch(0.17 0.014 220)",
    },
  },
];

export const NAV_SECTIONS = SECTIONS.filter((section) => section.inNav);

export const SECTION_IDS = SECTIONS.map((section) => section.id);

/**
 * sessionStorage flag coordinating the first-visit handoff:
 * IntroOverlay writes it, PageCurtain reads it to skip its wipe.
 */
export const INTRO_SEEN_KEY = "mt-intro-seen";

export type Social = {
  name: string;
  href: string;
  icon: LucideIcon;
};

/** Shared social links (NameIntroCard + SiteFooter). */
export const SOCIALS: readonly Social[] = [
  { name: "GitHub", href: "https://github.com/", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/", icon: Linkedin },
  { name: "Email", href: "mailto:hello@michaeltrannhan.dev", icon: Mail },
];
