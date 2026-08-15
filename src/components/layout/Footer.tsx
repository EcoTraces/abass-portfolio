import { navLinks } from "@/data/nav";
import { profile, socialLinks } from "@/data/profile";
import { isPlaceholder } from "@/lib/utils";
import { Github, Linkedin, Mail } from "lucide-react";
import { Container } from "../ui/Container";
import { WhatsappIcon } from "@/components/icons/WhatsappIcon";

const icons = { github: Github, linkedin: Linkedin, mail: Mail, whatsapp: WhatsappIcon };

const pageLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Now", href: "/now" },
  { label: "Uses", href: "/uses" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <Container className="py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <p className="font-display text-lg font-semibold text-fg">
              {profile.initials}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">
              Building intelligent, scalable software across AI, mobile, web, and cloud.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-mono text-xs uppercase tracking-wider text-fg-muted hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer pages">
              {pageLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-mono text-xs uppercase tracking-wider text-fg-muted hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex gap-4">
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
                    "flex h-9 w-9 items-center justify-center rounded-sm border border-line-strong text-fg-muted transition-colors " +
                    (disabled ? "cursor-not-allowed opacity-40" : "hover:border-accent hover:text-accent")
                  }
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 font-mono text-xs text-fg-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {profile.name}. All rights reserved.</p>
          <p>Built with Next.js, TypeScript &amp; Tailwind CSS.</p>
        </div>
      </Container>
    </footer>
  );
}
