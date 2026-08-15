import { cn, isPlaceholder } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit";
  className?: string;
  target?: string;
  disabled?: boolean;
  icon?: ReactNode;
  /** Forces a file download instead of navigation. Pass a string to set the saved filename. */
  download?: string | boolean;
};

const FILE_HREF_PATTERN = /\.[a-z0-9]{2,4}$/i;

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-medium tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-accent disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary: "bg-accent text-[#14171c] hover:bg-[#f2b458]",
  secondary: "border border-line-strong text-fg hover:border-accent hover:text-accent",
  ghost: "text-fg-muted hover:text-fg",
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  type = "button",
  className,
  target,
  disabled,
  icon,
  download,
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    // Placeholder hrefs (e.g. "[ADD_RESUME_FILE]") aren't real routes yet —
    // render as a disabled, non-navigating button instead of a Link/anchor
    // so Next.js never tries to prefetch or follow them.
    if (isPlaceholder(href)) {
      return (
        <button
          type="button"
          className={cn(classes, "cursor-not-allowed opacity-50")}
          disabled
          aria-label="Not yet available — add this link in src/data/profile.ts"
          title="Not yet available — add this link in src/data/profile.ts"
        >
          {children}
          {icon}
        </button>
      );
    }

    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    // A local static asset (e.g. "/resume/resume.pdf") isn't a Next.js page route —
    // use a plain anchor (optionally with `download`) instead of <Link>, which is
    // meant for client-side navigation between app routes.
    const isLocalFile = !isExternal && FILE_HREF_PATTERN.test(href);
    if (isExternal || isLocalFile) {
      return (
        <a
          href={href}
          className={classes}
          target={target}
          rel={isExternal ? "noopener noreferrer" : undefined}
          download={download}
        >
          {children}
          {icon}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
        {icon}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
      {icon}
    </button>
  );
}
