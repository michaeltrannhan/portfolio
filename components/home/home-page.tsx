"use client";

import { AmbientScrollBlob } from "@/components/effects/ambient-scroll-blob";
import { InertiaScroll } from "@/components/effects/inertia-scroll";
import { IntroOverlay } from "@/components/effects/intro-overlay";
import { NoiseOverlay } from "@/components/effects/noise-overlay";
import { PageCurtain } from "@/components/effects/page-curtain";
import { SectionAccent } from "@/components/effects/section-accent";
import { CommandPalette } from "@/components/ui/command-palette";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SectionRail } from "@/components/ui/section-rail";
import { SiteFooter } from "@/components/ui/site-footer";
import { AboutSection } from "./sections/about-section";
import { BlogSection } from "./sections/blog-section";
import { HeroSection } from "./sections/hero-section";
import { ProcessGallery } from "./sections/process-gallery";
import { ProjectsSection } from "./sections/projects-section";
import { TechSection } from "./sections/tech-section";

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
        <HeroSection />
        <AboutSection />
        <TechSection />
        <ProjectsSection />
        <ProcessGallery />
        <BlogSection />
        <SiteFooter />
      </main>
    </>
  );
}
