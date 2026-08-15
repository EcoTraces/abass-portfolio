import { experience } from "@/data/experience";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

export function Experience() {
  return (
    <section id="experience" className="border-b border-line py-14 sm:py-20 lg:py-28">
      <Container>
        <SectionHeading index="03" label="Timeline" title="Experience" />
        <RevealGroup className="space-y-0">
          {experience.map((entry) => (
            <RevealItem
              key={entry.id}
              className="grid gap-4 border-t border-line py-8 sm:grid-cols-[160px_1fr] sm:gap-8 lg:grid-cols-[200px_1fr]"
            >
              <div className="font-mono text-xs uppercase tracking-wider text-fg-faint">
                {entry.startDate} — {entry.endDate}
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-xl font-medium text-fg">{entry.role}</h3>
                  <span className="text-fg-muted">· {entry.organization}</span>
                </div>
                {entry.context && (
                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-accent-2">
                    {entry.context}
                  </p>
                )}
                <p className="mt-3 max-w-2xl text-fg-muted">{entry.summary}</p>
                {entry.responsibilities && (
                  <ul className="mt-3 space-y-1.5">
                    {entry.responsibilities.map((r, idx) => (
                      <li key={idx} className="flex gap-2 text-sm text-fg-faint">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fg-faint" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </RevealItem>
          ))}
          <div className="border-t border-line" />
        </RevealGroup>
      </Container>
    </section>
  );
}
