import { education } from "@/data/education";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

export function Education() {
  return (
    <section id="education" className="border-b border-line py-14 sm:py-20 lg:py-28">
      <Container>
        <SectionHeading index="04" label="Academics" title="Education" />
        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {education.map((entry) => (
            <RevealItem key={entry.id} className="rounded-sm border border-line-strong p-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
                {entry.status === "expected" ? "Expected " + entry.endDate : entry.endDate}
              </p>
              <h3 className="mt-3 font-display text-lg font-medium text-fg">{entry.credential}</h3>
              <p className="mt-1 text-sm text-fg-muted">{entry.institution}</p>
              <p className="mt-1 text-xs text-fg-faint">{entry.location}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
