"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

function readInitialTheme(): "dark" | "light" {
  if (typeof document === "undefined") return "dark";
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "light" ? "light" : "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">(readInitialTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard mount-detection guard to avoid SSR/client render mismatch
    setMounted(true);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem("theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mounted ? `Switch to ${theme === "dark" ? "light" : "dark"} mode` : "Toggle theme"}
      className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-sm border border-line-strong text-fg-muted transition-colors hover:border-accent hover:text-accent"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mounted && theme === "dark" ? "sun" : "moon"}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.2 }}
          className="flex"
        >
          {mounted && theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
