"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-sm border border-line-strong bg-bg-raised text-fg-muted shadow-lg transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
