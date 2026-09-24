"use client";

import { Reveal } from "@/components/motion";
import { HorizontalGallery } from "@/components/ui/horizontal-gallery";
import { gallery } from "../data";

export function ProcessGallery() {
  return (
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
  );
}
