"use client";

import { navLinks } from "@/data/nav";
import { profile } from "@/data/profile";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={
        "sticky top-0 z-50 border-b transition-colors duration-300 " +
        (scrolled ? "border-line bg-bg/85 backdrop-blur-md" : "border-transparent bg-transparent")
      }
    >
      <Container>
        <div className="flex h-16 items-center justify-between sm:h-20">
          <Link
            href="#home"
            className="font-display text-lg font-semibold tracking-tight text-fg"
            aria-label={`${profile.name} — home`}
          >
            {profile.initials}
            <span className="text-accent">.</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={
                  "font-mono text-xs uppercase tracking-wider transition-colors " +
                  (active === link.href ? "text-accent" : "text-fg-muted hover:text-fg")
                }
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <Button href="/resume" variant="secondary" className="px-4 py-2 text-xs">
              View Resume
            </Button>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative flex h-9 w-9 items-center justify-center rounded-sm border border-line-strong text-fg"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.15 }}
                  className="flex"
                >
                  {open ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </Container>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-bg lg:hidden"
          >
            <Container>
              <nav className="flex flex-col py-4" aria-label="Mobile">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-line py-4 font-mono text-sm uppercase tracking-wider text-fg-muted last:border-none hover:text-accent"
                  >
                    {link.label}
                  </a>
                ))}
                <Button href="/resume" variant="primary" className="mt-4 w-full">
                  View Resume
                </Button>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
