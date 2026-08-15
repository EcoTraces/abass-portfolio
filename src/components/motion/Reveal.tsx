"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  // No opacity in the hidden state: below-the-fold content must stay fully
  // legible even before the intersection observer fires (e.g. for automated
  // accessibility scanners, or users who never scroll it fully into view).
  // The rise-into-place motion comes from the y-transform alone.
  const variants: Variants = {
    hidden: { y },
    visible: { y: 0, transition: { duration: 0.6, delay, ease: EASE } },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container — pair with <RevealItem> children for sequenced entrances. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const variants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  y = 16,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  // See Reveal() above — no opacity in the hidden state so items stay legible
  // for anyone (or anything) that never triggers the intersection observer.
  const variants: Variants = {
    hidden: { y },
    visible: { y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
