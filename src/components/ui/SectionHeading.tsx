import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

export function SectionHeading({
  index,
  label,
  title,
  description,
  className,
}: {
  index?: string;
  label: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-12 max-w-2xl sm:mb-16", className)}>
      <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
        {index && <span className="text-fg-faint">{index}</span>}
        <span>{label}</span>
        <span className="h-px flex-1 max-w-16 bg-line-strong" />
      </div>
      <h2 className="font-display text-3xl font-medium leading-tight tracking-tight text-fg sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-fg-muted">{description}</p>
      )}
    </Reveal>
  );
}
