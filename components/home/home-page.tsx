"use client";

import { FadeIn, Reveal } from "@/components/motion";
import { AmbientScrollBlob } from "@/components/effects/ambient-scroll-blob";
import { ConfettiBurst } from "@/components/effects/confetti-burst";
import { FloatingOrbs } from "@/components/effects/floating-orbs";
import { HeroParallax } from "@/components/effects/hero-parallax";
import { InertiaScroll } from "@/components/effects/inertia-scroll";
import { IntroOverlay } from "@/components/effects/intro-overlay";
import { MaskReveal } from "@/components/effects/mask-reveal";
import { Meteors } from "@/components/effects/meteors";
import { NoiseOverlay } from "@/components/effects/noise-overlay";
import { PageCurtain } from "@/components/effects/page-curtain";
import { PointerBeam } from "@/components/effects/pointer-beam";
import { SectionAccent } from "@/components/effects/section-accent";
import { ShimmerText } from "@/components/effects/shimmer-text";
import { WarpingGrid } from "@/components/effects/warping-grid";
import { WavyPathBg } from "@/components/effects/wavy-path-bg";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { CardDeck } from "@/components/ui/card-deck";
import { CircularText } from "@/components/ui/circular-text";
import { CommandPalette } from "@/components/ui/command-palette";
import { ContributionHeatmap } from "@/components/ui/contribution-heatmap";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { DeviceMockup } from "@/components/ui/device-mockup";
import { FlipCard } from "@/components/ui/flip-card";
import { GlareButton } from "@/components/ui/glare-button";
import { HeroGlass } from "@/components/ui/hero-glass";
import { HoverExpandList } from "@/components/ui/hover-expand-list";
import { HoverVideoClip } from "@/components/ui/hover-video-clip";
import {
  HorizontalGallery,
  type GallerySlide,
} from "@/components/ui/horizontal-gallery";
import { ImageCompare } from "@/components/ui/image-compare";
import { InfiniteMarquee } from "@/components/ui/infinite-marquee";
import { LampHeading } from "@/components/ui/lamp-heading";
import { Magnetic } from "@/components/ui/magnetic";
import { NameIntroCard } from "@/components/ui/name-intro-card";
import { OrbitingIcons } from "@/components/ui/orbiting-icons";
import { ProjectBento, type Project } from "@/components/ui/project-bento";
import {
  ProjectModal,
  type CaseStudy,
} from "@/components/ui/project-modal";
import { ScrambleText } from "@/components/ui/scramble-text";
import { ScrollHighlight } from "@/components/ui/scroll-highlight";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SectionRail } from "@/components/ui/section-rail";
import { SectionReveal } from "@/components/ui/section-reveal";
import { SiteFooter } from "@/components/ui/site-footer";
import { SkillConstellation } from "@/components/ui/skill-constellation";
import { Sparkles } from "@/components/ui/sparkles";
import { SplitReassemble } from "@/components/ui/split-reassemble";
import { Spotlight } from "@/components/ui/spotlight";
import { SpringStack } from "@/components/ui/spring-stack";
import { StatusChip } from "@/components/ui/status-chip";
import { StickySectionLabel } from "@/components/ui/sticky-section-label";
import { StickyStack } from "@/components/ui/sticky-stack";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { TextGenerate } from "@/components/ui/text-generate";
import { Timeline } from "@/components/ui/timeline";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Typewriter } from "@/components/ui/typewriter";

const tech = [
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

const timeline = [
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

const projects: Project[] = [
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

const flipProjects = [
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

const caseStudies: CaseStudy[] = [
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

const posts = [
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

const gallery: GallerySlide[] = [
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

const principles = [
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

export function HomePage() {
  return (
    <>
      <IntroOverlay />
      <PageCurtain />
      <InertiaScroll />
      <SectionAccent />
      <ScrollProgress />
      <CursorGlow />
      <NoiseOverlay />
      <AmbientScrollBlob />
      <SectionRail />
      <CommandPalette />

      <main>
        <section
          id="about"
          className="relative flex min-h-[100svh] items-center overflow-hidden"
        >
          <AuroraBackground />
          <BackgroundGrid />
          <WavyPathBg />
          <FloatingOrbs />
          <WarpingGrid />
          <Meteors count={7} />
          <HeroGlass />

          <Spotlight className="relative z-10 w-full">
            <HeroParallax className="container relative mx-auto max-w-4xl px-6 pb-24 pt-32 md:px-8">
              <div className="absolute top-28 right-6 hidden md:block">
                <CircularText />
              </div>

              <MaskReveal delay={0.05}>
                <FadeIn>
                  <p className="text-sm font-medium tracking-[0.16em] text-muted-foreground uppercase">
                    Michael Tran
                  </p>
                </FadeIn>
              </MaskReveal>

              <MaskReveal delay={0.12} className="relative z-20 mt-4 overflow-visible">
                <NameIntroCard
                  text="Nhan"
                  className="text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
                />
                <ShimmerText
                  as="span"
                  className="pointer-events-none absolute inset-0 text-5xl font-semibold tracking-tight opacity-35 mix-blend-soft-light dark:opacity-45 sm:text-6xl md:text-7xl lg:text-8xl max-md:hidden"
                  aria-hidden
                >
                  Nhan
                </ShimmerText>
                <Sparkles className="opacity-70" count={7} />
              </MaskReveal>

              <MaskReveal delay={0.28}>
                <FadeIn delay={0.28}>
                  <p className="mt-5 text-xl font-medium tracking-tight text-foreground/90 md:text-2xl">
                    Interfaces with calm precision.
                  </p>
                </FadeIn>
              </MaskReveal>

              <TextGenerate
                className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
                words="Building thoughtful web experiences with a focus on clarity, craft, and simple interfaces."
                delay={0.45}
              />

              <div className="relative mt-9 flex flex-wrap items-center gap-3">
                <ConfettiBurst>
                  <Magnetic>
                    <GlareButton href="#projects">View projects</GlareButton>
                  </Magnetic>
                </ConfettiBurst>
                <Magnetic strength={0.2}>
                  <GlareButton href="#blog" variant="ghost">
                    Read blog
                  </GlareButton>
                </Magnetic>
                <Sparkles className="-inset-x-6 -inset-y-4 opacity-50" count={5} />
              </div>
            </HeroParallax>
          </Spotlight>
        </section>

        <section
          id="about-more"
          className="border-t border-[var(--glass-border-subtle)] py-20 md:py-28"
        >
          <SectionReveal className="container mx-auto max-w-4xl px-6 md:px-8">
            <StickySectionLabel label="About">
              <TracingBeam>
                <Reveal>
                  <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                    I design and build interfaces that stay out of the way —
                    precise typography, purposeful motion, and systems that hold
                    up under real use.{" "}
                    <ScrollHighlight>
                      Restraint is the feature.
                    </ScrollHighlight>
                  </p>
                </Reveal>

                <div className="mt-8">
                  <Typewriter text="Make the interface feel inevitable — never loud." />
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <StatusChip label="years shipping" value={5} suffix="+" />
                  <StatusChip label="focus areas" value={3} />
                </div>

                <div className="mt-10">
                  <Timeline items={timeline} />
                </div>

                <div className="mt-14">
                  <StickyStack
                    panels={principles}
                    aside={
                      <div>
                        <SplitReassemble
                          text="How I approach the work"
                          className="text-2xl font-semibold tracking-tight md:text-3xl"
                        />
                        <p className="mt-3 text-sm text-muted-foreground">
                          Scroll the stack — each principle pins as you move.
                        </p>
                        <div className="mt-6">
                          <ScrambleText
                            text="CLARITY · CRAFT · CARE"
                            className="text-sm text-muted-foreground"
                          />
                        </div>
                      </div>
                    }
                  />
                </div>
              </TracingBeam>
            </StickySectionLabel>
          </SectionReveal>
        </section>

        <section
          id="tech"
          className="relative overflow-hidden border-y border-[var(--glass-border-subtle)] bg-[var(--section-wash)] py-20 backdrop-blur-[var(--glass-blur-sm)] backdrop-saturate-[var(--glass-saturate)] md:py-28"
        >
          <BackgroundGrid className="opacity-40" />
          <SectionReveal className="container relative z-10 mx-auto max-w-4xl px-6 md:px-8">
            <LampHeading subtitle="Tools I reach for most often.">
              Tech Stack
            </LampHeading>
            <div className="mt-10">
              <InfiniteMarquee items={tech} />
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-2 md:items-center">
              <OrbitingIcons />
              <TerminalWindow />
            </div>

            <div className="mt-12">
              <SkillConstellation />
            </div>

            <div className="mt-10">
              <ContributionHeatmap />
            </div>
          </SectionReveal>
        </section>

        <section id="projects" className="py-20 md:py-28">
          <SectionReveal className="container mx-auto max-w-4xl px-6 md:px-8">
            <StickySectionLabel label="Work">
              <LampHeading
                align="left"
                className="pt-0"
                subtitle="Selected work and experiments."
              >
                Projects
              </LampHeading>

              <PointerBeam className="mt-8">
                <ProjectBento projects={projects} />
              </PointerBeam>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {flipProjects.map((item) => (
                  <FlipCard key={item.title} item={item} />
                ))}
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 md:items-center">
                <ImageCompare
                  beforeLabel="Wire"
                  afterLabel="Ship"
                  beforeStyle="linear-gradient(135deg, oklch(0.9 0.01 240), oklch(0.93 0.01 220))"
                  afterStyle="linear-gradient(135deg, oklch(0.9 0.05 210), oklch(0.93 0.04 95))"
                />
                <HoverVideoClip
                  title="Frame Lab"
                  subtitle="Hover to expand preview"
                />
              </div>

              <div className="mt-14">
                <DeviceMockup label="Signal Desk — scroll the frame" />
              </div>

              <div className="mt-14 grid gap-10 md:grid-cols-2 md:items-start">
                <CardDeck
                  cards={[
                    {
                      title: "Intake",
                      body: "Capture signal without ceremony.",
                      accent: "oklch(0.96 0.02 210)",
                    },
                    {
                      title: "Triage",
                      body: "Rank what matters in one glance.",
                      accent: "oklch(0.97 0.02 95)",
                    },
                    {
                      title: "Resolve",
                      body: "Close the loop with soft confirmation.",
                      accent: "oklch(0.96 0.02 180)",
                    },
                  ]}
                />
                <SpringStack
                  items={[
                    { title: "Design tokens", meta: "Foundation" },
                    { title: "Interaction kit", meta: "Motion" },
                    { title: "Content model", meta: "Structure" },
                    { title: "Ship checklist", meta: "Quality" },
                  ]}
                />
              </div>

              <div className="mt-14">
                <p className="mb-4 text-sm text-muted-foreground">
                  Open a case study
                </p>
                <ProjectModal studies={caseStudies} />
              </div>
            </StickySectionLabel>
          </SectionReveal>
        </section>

        <section className="border-t border-[var(--glass-border-subtle)] bg-[var(--section-wash)] py-8 backdrop-blur-[var(--glass-blur-sm)] md:py-12">
          <div className="container mx-auto max-w-5xl px-6 md:px-8">
            <Reveal>
              <p className="mb-2 text-sm font-medium tracking-[0.14em] text-muted-foreground uppercase">
                Process frames
              </p>
            </Reveal>
            <HorizontalGallery slides={gallery} />
          </div>
        </section>

        <section
          id="blog"
          className="border-t border-[var(--glass-border-subtle)] bg-[var(--section-wash)] py-20 backdrop-blur-[var(--glass-blur-sm)] md:py-28"
        >
          <SectionReveal className="container mx-auto max-w-4xl px-6 md:px-8">
            <StickySectionLabel label="Writing">
              <Reveal>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Blog
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Notes on building and learning.
                </p>
              </Reveal>
              <div className="mt-8">
                <HoverExpandList items={posts} />
              </div>
            </StickySectionLabel>
          </SectionReveal>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
