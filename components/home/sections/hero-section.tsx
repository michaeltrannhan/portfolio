"use client";

import { ConfettiBurst } from "@/components/effects/confetti-burst";
import { FloatingOrbs } from "@/components/effects/floating-orbs";
import { HeroParallax } from "@/components/effects/hero-parallax";
import { MaskReveal } from "@/components/effects/mask-reveal";
import { Meteors } from "@/components/effects/meteors";
import { ShimmerText } from "@/components/effects/shimmer-text";
import { WarpingGrid } from "@/components/effects/warping-grid";
import { WavyPathBg } from "@/components/effects/wavy-path-bg";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { CircularText } from "@/components/ui/circular-text";
import { FadeIn } from "@/components/motion";
import { GlareButton } from "@/components/ui/glare-button";
import { HeroGlass } from "@/components/ui/hero-glass";
import { Magnetic } from "@/components/ui/magnetic";
import { NameIntroCard } from "@/components/ui/name-intro-card";
import { Sparkles } from "@/components/ui/sparkles";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerate } from "@/components/ui/text-generate";

export function HeroSection() {
  return (
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
  );
}
