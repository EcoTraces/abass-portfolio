import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import { certifications } from "@/data/certifications";
import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: profile.positioning,
  alternates: { canonical: `${siteUrl}/resume` },
};

export default function ResumePage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">Resume</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-fg">{profile.name}</h1>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-fg-muted">{profile.positioning}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/" variant="secondary">
              Back to site
            </Button>
            <Button href={profile.resumePath} variant="primary" download="Abass-David-Komeh-Resume.pdf">
              Download PDF
            </Button>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-10">
            <section>
              <h2 className="mb-4 text-lg font-semibold text-fg">Summary</h2>
              <div className="space-y-3 text-fg-muted">
                {profile.about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold text-fg">Experience</h2>
              <div className="space-y-6">
                {experience.map((entry) => (
                  <div key={entry.id} className="rounded-sm border border-line-strong bg-bg-raised p-6">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-medium text-fg">{entry.role}</p>
                        <p className="text-sm text-fg-muted">{entry.organization}</p>
                      </div>
                      <p className="text-sm text-fg-faint">
                        {entry.startDate} – {entry.endDate}
                      </p>
                    </div>
                    <p className="mt-4 text-sm text-fg-muted">{entry.summary}</p>
                    {entry.responsibilities && (
                      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-fg-muted">
                        {entry.responsibilities.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold text-fg">Education</h2>
              <div className="space-y-6">
                {education.map((item) => (
                  <div key={item.id} className="rounded-sm border border-line-strong bg-bg-raised p-6">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-medium text-fg">{item.credential}</p>
                        <p className="text-sm text-fg-muted">{item.institution}</p>
                      </div>
                      <p className="text-sm text-fg-faint">{item.startDate} – {item.endDate}</p>
                    </div>
                    {item.notes && <p className="mt-4 text-sm text-fg-muted">{item.notes}</p>}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-10">
            <section className="rounded-sm border border-line-strong bg-bg-raised p-6">
              <h2 className="mb-4 text-lg font-semibold text-fg">Contact</h2>
              <dl className="space-y-3 text-sm text-fg-muted">
                <div>
                  <dt className="font-medium text-fg">Location</dt>
                  <dd>{profile.location}</dd>
                </div>
                {profile.program && (
                  <div>
                    <dt className="font-medium text-fg">Program</dt>
                    <dd>{profile.program}</dd>
                  </div>
                )}
                {profile.phone && (
                  <div>
                    <dt className="font-medium text-fg">Phone</dt>
                    <dd>{profile.phone}</dd>
                  </div>
                )}
                <div>
                  <dt className="font-medium text-fg">Email</dt>
                  <dd>{profile.email}</dd>
                </div>
                <div>
                  <dt className="font-medium text-fg">GitHub</dt>
                  <dd>{profile.github}</dd>
                </div>
                <div>
                  <dt className="font-medium text-fg">LinkedIn</dt>
                  <dd>{profile.linkedin}</dd>
                </div>
              </dl>
            </section>

            <section className="rounded-sm border border-line-strong bg-bg-raised p-6">
              <h2 className="mb-4 text-lg font-semibold text-fg">Skills</h2>
              <div className="space-y-4 text-sm text-fg-muted">
                {skillGroups.map((group) => (
                  <div key={group.category}>
                    <p className="font-medium text-fg">{group.category}</p>
                    <p>{group.items.join(", ")}</p>
                  </div>
                ))}
              </div>
            </section>

            {certifications.length > 0 && (
              <section className="rounded-sm border border-line-strong bg-bg-raised p-6">
                <h2 className="mb-4 text-lg font-semibold text-fg">Certifications</h2>
                <ul className="space-y-3 text-sm text-fg-muted">
                  {certifications.map((cert) => (
                    <li key={cert.id}>
                      <p className="font-medium text-fg">{cert.title}</p>
                      <p>{cert.issuer}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </aside>
        </div>
      </Container>
    </section>
  );
}
