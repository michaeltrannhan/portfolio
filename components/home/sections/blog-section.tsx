"use client";

import { Reveal } from "@/components/motion";
import { HoverExpandList } from "@/components/ui/hover-expand-list";
import { SectionReveal } from "@/components/ui/section-reveal";
import { StickySectionLabel } from "@/components/ui/sticky-section-label";
import { posts } from "../data";

export function BlogSection() {
  return (
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
  );
}
