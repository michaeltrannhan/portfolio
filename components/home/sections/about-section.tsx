"use client";

import { Reveal } from "@/components/motion";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { ScrambleText } from "@/components/ui/scramble-text";
import { ScrollHighlight } from "@/components/ui/scroll-highlight";
import { SectionReveal } from "@/components/ui/section-reveal";
import { SplitReassemble } from "@/components/ui/split-reassemble";
import { StatusChip } from "@/components/ui/status-chip";
import { StickySectionLabel } from "@/components/ui/sticky-section-label";
import { StickyStack } from "@/components/ui/sticky-stack";
import { Timeline } from "@/components/ui/timeline";
import { Typewriter } from "@/components/ui/typewriter";
import { principles, timeline } from "../data";

export function AboutSection() {
  return (
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
  );
}
