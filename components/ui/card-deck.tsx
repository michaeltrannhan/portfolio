"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type DeckCard = {
  title: string;
  body: string;
  accent?: string;
};

type CardDeckProps = {
  cards: DeckCard[];
  className?: string;
};

/** Stacked deck that fans out on hover / focus. */
export function CardDeck({ cards, className }: CardDeckProps) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn("relative mx-auto h-56 w-full max-w-md", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {cards.map((card, i) => {
        const mid = (cards.length - 1) / 2;
        const spread = open && !reduceMotion ? (i - mid) * 18 : 0;
        const lift = open && !reduceMotion ? Math.abs(i - mid) * -4 : 0;
        const rot = open && !reduceMotion ? (i - mid) * 6 : (i - mid) * 2;

        return (
          <motion.article
            key={card.title}
            tabIndex={0}
            className="glass absolute inset-x-6 top-6 overflow-hidden rounded-2xl p-5 outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{
              zIndex: i,
              backgroundImage: card.accent
                ? `linear-gradient(180deg, color-mix(in oklch, ${card.accent} 70%, transparent), var(--glass-bg))`
                : undefined,
            }}
            animate={{
              x: spread,
              y: lift + i * (open ? 2 : 6),
              rotate: rot,
            }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
          >
            <h3 className="text-sm font-medium tracking-tight">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {card.body}
            </p>
          </motion.article>
        );
      })}
    </div>
  );
}
