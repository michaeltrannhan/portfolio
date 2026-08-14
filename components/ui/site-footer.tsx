"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SOCIALS } from "@/lib/site";
import { AnimatedLink } from "@/components/ui/animated-link";
import { FooterWave } from "@/components/effects/footer-wave";
import { MagneticTrail } from "@/components/effects/magnetic-trail";
import { SocialLink } from "@/components/ui/social-link";

type SiteFooterProps = {
  className?: string;
};

export function SiteFooter({ className }: SiteFooterProps) {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <FooterWave />
      <footer
        id="contact"
        className={cn(
          "relative border-t border-[var(--glass-border)] bg-[var(--footer-wash)] py-12 backdrop-blur-[var(--glass-blur-sm)] backdrop-saturate-[var(--glass-saturate)] md:py-16",
          className
        )}
      >
        <div className="container mx-auto flex max-w-4xl flex-col gap-8 px-6 md:flex-row md:items-end md:justify-between md:px-8">
          <div className="glass-soft max-w-sm rounded-2xl p-5">
            <p className="text-lg font-semibold tracking-tight">Michael Tran</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Crafting clear interfaces and calm systems.
            </p>
            <div className="mt-4">
              <AnimatedLink href="#about">Back to top</AnimatedLink>
            </div>
          </div>

          <ul className="flex items-center gap-2">
            {SOCIALS.map((social) => (
              <li key={social.name}>
                <MagneticTrail>
                  <SocialLink
                    social={social}
                    className={cn(
                      "glass-pill inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-[var(--glass-bg-tint)]",
                      reduceMotion && "transition-none"
                    )}
                    iconClassName="h-4 w-4"
                  />
                </MagneticTrail>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}
