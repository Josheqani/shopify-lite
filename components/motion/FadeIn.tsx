"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  /** Delay in seconds before the animation starts. Useful for staggering. */
  delay?: number;
  className?: string;
};

/**
 * Subtle entrance animation: fades in while sliding up a few pixels.
 * Marked "use client" because Framer Motion runs on the client.
 */
export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
