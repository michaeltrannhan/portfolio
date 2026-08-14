import type { GallerySlide } from "@/components/ui/horizontal-gallery";
import type { Project } from "@/components/ui/project-bento";
import type { CaseStudy } from "@/components/ui/project-modal";

/** Content data for the home page — layout lives in ./sections/*. */

export const tech = [
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Framer Motion",
  "PostgreSQL",
  "GraphQL",
  "Playwright",
  "Vercel",
];

export const timeline = [
  {
    year: "Now",
    title: "Building product interfaces",
    description:
      "Shipping calm, resilient web apps with a bias toward clarity and craft.",
  },
  {
    year: "2024",
    title: "Systems & design engineering",
    description:
      "Bridging design systems and application code so polish survives production.",
  },
  {
    year: "Earlier",
    title: "Open source & experiments",
    description:
      "Learning in public — small tools, motion studies, and thoughtful UI patterns.",
  },
];

export const projects: Project[] = [
  {
    title: "Signal Desk",
    description: "A focused dashboard for triage workflows with keyboard-first UX.",
    tag: "Product",
    span: "wide",
    preview:
      "linear-gradient(135deg, oklch(0.88 0.05 210), oklch(0.93 0.04 95))",
  },
  {
    title: "Harbor Docs",
    description: "Documentation site with search and calm reading rhythm.",
    tag: "Open source",
    preview:
      "linear-gradient(160deg, oklch(0.91 0.03 180), oklch(0.94 0.02 80))",
  },
  {
    title: "Frame Lab",
    description: "Motion playground for micro-interactions and page transitions.",
    tag: "Experiment",
    span: "tall",
    preview:
      "linear-gradient(200deg, oklch(0.9 0.04 85), oklch(0.92 0.03 220))",
  },
  {
    title: "Northwind CMS",
    description: "Lightweight content toolkit for small editorial teams.",
    tag: "Tooling",
    preview:
      "linear-gradient(120deg, oklch(0.93 0.02 140), oklch(0.9 0.035 230))",
  },
];

export const flipProjects = [
  {
    title: "Signal Desk",
    description: "Triage without the noise.",
    tag: "Product",
    stack: ["Next.js", "TypeScript", "Postgres", "Zustand"],
  },
  {
    title: "Harbor Docs",
    description: "Docs that feel like reading.",
    tag: "Open source",
    stack: ["MDX", "Algolia", "Tailwind", "Vercel"],
  },
  {
    title: "Frame Lab",
    description: "Motion studies in production form.",
    tag: "Experiment",
    stack: ["Framer Motion", "React", "CSS", "R3F-lite"],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "signal",
    title: "Signal Desk",
    tag: "Case study",
    summary: "Keyboard-first triage for busy operators.",
    body: "We rebuilt the intake surface around focus states, dense-but-calm tables, and optimistic updates so operators stay in flow. Motion is reserved for confirmation — never decoration.",
    stack: ["Next.js", "TypeScript", "Postgres"],
    preview:
      "linear-gradient(135deg, oklch(0.88 0.05 210), oklch(0.93 0.04 95))",
  },
  {
    id: "harbor",
    title: "Harbor Docs",
    tag: "Case study",
    summary: "Editorial rhythm for technical writing.",
    body: "Typography, search, and navigation were treated as one system. The result is a docs site that feels quieter as content grows — not louder.",
    stack: ["MDX", "Algolia", "Tailwind"],
    preview:
      "linear-gradient(160deg, oklch(0.91 0.03 180), oklch(0.94 0.02 80))",
  },
];

export const posts = [
  {
    title: "Designing for stillness",
    description: "How restraint and negative space make interfaces feel faster.",
    meta: "Essay",
    preview:
      "linear-gradient(145deg, oklch(0.92 0.03 210), oklch(0.95 0.02 90))",
  },
  {
    title: "Motion with manners",
    description: "A practical checklist for respectful animation on the web.",
    meta: "Notes",
    preview:
      "linear-gradient(165deg, oklch(0.94 0.025 100), oklch(0.91 0.03 200))",
  },
  {
    title: "Type as interface",
    description: "Using typography hierarchy before adding more chrome.",
    meta: "Craft",
    preview:
      "linear-gradient(190deg, oklch(0.9 0.04 220), oklch(0.93 0.03 70))",
  },
];

export const gallery: GallerySlide[] = [
  {
    title: "Quiet density",
    caption: "Information without visual shouting.",
    tone: "linear-gradient(145deg, oklch(0.93 0.03 210), oklch(0.96 0.02 95))",
  },
  {
    title: "Keyed actions",
    caption: "Shortcuts that feel discoverable.",
    tone: "linear-gradient(160deg, oklch(0.94 0.025 180), oklch(0.92 0.03 220))",
  },
  {
    title: "Soft feedback",
    caption: "Confirmation you feel, not just see.",
    tone: "linear-gradient(180deg, oklch(0.95 0.03 95), oklch(0.93 0.03 200))",
  },
  {
    title: "System seams",
    caption: "Where design tokens meet real code.",
    tone: "linear-gradient(200deg, oklch(0.92 0.03 240), oklch(0.95 0.02 160))",
  },
];

export const principles = [
  {
    eyebrow: "01",
    title: "Clarity first",
    body: "Every screen earns its keep with hierarchy and restraint before novelty.",
  },
  {
    eyebrow: "02",
    title: "Motion with manners",
    body: "Animation explains change. If it doesn’t help orientation, it doesn’t ship.",
  },
  {
    eyebrow: "03",
    title: "Systems that hold",
    body: "Tokens, components, and copy stay coherent under real product pressure.",
  },
];
