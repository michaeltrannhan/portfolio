"use client";

import { BackgroundGrid } from "@/components/ui/background-grid";
import { ContributionHeatmap } from "@/components/ui/contribution-heatmap";
import { InfiniteMarquee } from "@/components/ui/infinite-marquee";
import { LampHeading } from "@/components/ui/lamp-heading";
import { OrbitingIcons } from "@/components/ui/orbiting-icons";
import { SectionReveal } from "@/components/ui/section-reveal";
import { SkillConstellation } from "@/components/ui/skill-constellation";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { tech } from "../data";

export function TechSection() {
  return (
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
  );
}
