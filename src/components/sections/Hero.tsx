"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { profile, socialLinks } from "@/data/profile";
import { isPlaceholder } from "@/lib/utils";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { WhatsappIcon } from "@/components/icons/WhatsappIcon";

const icons = { github: Github, linkedin: Linkedin, mail: Mail, whatsapp: WhatsappIcon };

const EASE = [0.16, 1, 0.3, 1] as const;

const primaryColumn: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const secondaryColumn: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.35 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden border-b border-line pt-8 sm:pt-12">
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_10%,transparent_75%)]"
      />
      <Container className="relative">
        <div className="grid gap-12 py-10 sm:py-16 lg:grid-cols-[1.3fr_0.8fr] lg:gap-8 lg:py-28">
          <motion.div variants={primaryColumn} initial="hidden" animate="visible">
            <motion.div
              variants={item}
              className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Open to opportunities
            </motion.div>

            <motion.h1
              variants={item}
              className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-fg sm:text-6xl"
            >
              {profile.name}
            </motion.h1>
            <motion.p
              variants={item}
              className="mt-4 font-mono text-sm uppercase tracking-wider text-fg-muted sm:text-base"
            >
              {profile.headline}
            </motion.p>
            <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
              {profile.positioning}
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="/resume" variant="primary">
                View Resume
                <ArrowUpRight size={16} />
              </Button>
              <Button href="#contact" variant="secondary">
                Contact Me
              </Button>
              <Button href={profile.resumePath} variant="ghost" download="Abass-David-Komeh-Resume.pdf">
                Download Resume
                <ArrowDown size={14} />
              </Button>
            </motion.div>

            <motion.div variants={item} className="mt-10 flex gap-3">
              {socialLinks.map((link) => {
                const Icon = icons[link.icon];
                const disabled = isPlaceholder(link.href);
                return (
                  <a
                    key={link.label}
                    href={disabled ? undefined : link.href}
                    aria-label={link.label}
                    aria-disabled={disabled}
                    target={link.icon !== "mail" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className={
                      "flex h-10 w-10 items-center justify-center rounded-sm border border-line-strong text-fg-muted transition-colors " +
                      (disabled ? "cursor-not-allowed opacity-40" : "hover:border-accent hover:text-accent")
                    }
                  >
                    <Icon size={17} />
                  </a>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            variants={secondaryColumn}
            initial="hidden"
            animate="visible"
            className="flex items-start lg:justify-end"
          >
            <div className="w-full max-w-sm space-y-6">
              <motion.div variants={item} className="overflow-hidden rounded-sm border border-line-strong bg-bg-raised">
                {profile.profileImage && !isPlaceholder(profile.profileImage) ? (
                  <Image
                    src={profile.profileImage}
                    alt={`${profile.name} portrait`}
                    width={461}
                    height={567}
                    className="aspect-[461/567] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[461/567] items-center justify-center bg-gradient-to-br from-accent/10 to-accent-2/10 text-4xl font-semibold text-fg-muted">
                    {profile.initials}
                  </div>
                )}
              </motion.div>

              <motion.div variants={item} className="rounded-sm border border-line-strong bg-bg-raised">
                <div className="flex items-center justify-between border-b border-line px-4 py-3">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-fg-faint">
                    status.log
                  </span>
                  <span className="h-2 w-2 rounded-full bg-accent-2" />
                </div>
                <dl className="divide-y divide-line px-4">
                  {[
                    ["Focus", "AI · Mobile · Cloud"],
                    ["Based in", profile.location],
                    ["Education", "B.Sc. Computer Science"],
                    ["Graduating", "November 2026"],
                    ["Status", "Open to roles"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between py-3 font-mono text-xs">
                      <dt className="text-fg-faint uppercase tracking-wider">{label}</dt>
                      <dd className="text-fg">{value}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
