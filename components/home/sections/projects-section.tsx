"use client";

import { PointerBeam } from "@/components/effects/pointer-beam";
import { CardDeck } from "@/components/ui/card-deck";
import { DeviceMockup } from "@/components/ui/device-mockup";
import { FlipCard } from "@/components/ui/flip-card";
import { HoverVideoClip } from "@/components/ui/hover-video-clip";
import { ImageCompare } from "@/components/ui/image-compare";
import { LampHeading } from "@/components/ui/lamp-heading";
import { ProjectBento } from "@/components/ui/project-bento";
import { ProjectModal } from "@/components/ui/project-modal";
import { SectionReveal } from "@/components/ui/section-reveal";
import { SpringStack } from "@/components/ui/spring-stack";
import { StickySectionLabel } from "@/components/ui/sticky-section-label";
import { caseStudies, flipProjects, projects } from "../data";

export function ProjectsSection() {
  return (
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
  );
}
