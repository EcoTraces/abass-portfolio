"use client";

import { MotionConfig } from "framer-motion";
import { ReactNode } from "react";

/**
 * reducedMotion="user" makes every animation in the tree respect the OS-level
 * prefers-reduced-motion setting automatically (transform/layout motion is
 * dropped, opacity fades still play) — no per-component checks needed.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
