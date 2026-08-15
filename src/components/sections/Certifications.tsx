import { certifications } from "@/data/certifications";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

export function Certifications() {
  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="border-b border-line py-14 sm:py-20 lg:py-28">
      <Container>
        <SectionHeading
          index="06"
          label="Credentials"
          title="Certifications"
          description="Verified certifications, awards, and training built from the same data source as the rest of the site."
        />

        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <RevealItem
              key={cert.id}
              className="rounded-sm border border-line-strong p-6 transition-colors hover:border-accent"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-fg-faint">
                {cert.category} · {cert.date}
              </p>
              <h3 className="mt-3 text-lg font-medium text-fg">{cert.title}</h3>
              <p className="mt-2 text-sm text-fg-muted">{cert.issuer}</p>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex text-sm font-medium text-accent underline-offset-2 hover:underline"
                >
                  View credential
                </a>
              )}
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
