import { cn } from "@/lib/utils";

export function TechBadge({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-line-strong px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-fg-muted",
        className
      )}
    >
      {children}
    </span>
  );
}

export function StatusTag({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
      <span className="text-fg-faint">{label}</span>
      <span className={accent ? "text-accent" : "text-fg-muted"}>{value}</span>
    </div>
  );
}
