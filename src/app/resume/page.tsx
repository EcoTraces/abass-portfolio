import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import { certifications } from "@/data/certifications";
import { projects } from "@/data/projects";
import { getSiteSettings } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";

const portfolioUrl = siteUrl;
const resumeLocation = "Freetown, Sierra Leone";

const formatDate = (value: string): string => {
  if (/^\d{4}-\d{2}$/.test(value)) {
    const [year, month] = value.split("-");
    const date = new Date(Number(year), Number(month) - 1, 1);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  }

  if (/^\d{4}$/.test(value)) return value;
  return value;
};

const formatRange = (start: string, end: string): string => `${formatDate(start)} – ${formatDate(end)}`;

const projectSummary = projects
  .filter((project) => ["ecotrace", "biometric-attendance-system", "library-management-system", "scholarsphere"].includes(project.slug))
  .map((project) => `${project.name}: ${project.shortDescription}`);

const skillsText = skillGroups
  .map((group) => `${group.category}: ${(group.items || []).map((item) => (typeof item === "string" ? item : item.name)).join(", ")}`)
  .join("; ");

export const metadata: Metadata = {
  title: "Resume",
  description: "MSc-seeking Computer Science graduate resume for AI/ML, computer vision, cybersecurity, and sustainability-focused opportunities.",
  alternates: { canonical: `${siteUrl}/resume` },
};

export default async function ResumePage() {
  const siteSettings = await getSiteSettings();
  const resumePdf = siteSettings.resumePath || profile.resumePath;
  const resumeDocx = siteSettings.resumeDocxPath || profile.resumeDocxPath;

  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-4xl">
        <div className="mb-6 flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">Resume</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-fg">{profile.name}</h1>
            <p className="mt-2 text-sm text-fg-muted">{resumeLocation}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/" variant="secondary">
              Back to site
            </Button>
            <Button href={resumePdf} variant="primary" download="Abass-David-Komeh-Resume.pdf">
              Download PDF
            </Button>
            <Button href={resumeDocx} variant="secondary" download="Abass-David-Komeh-Resume.docx">
              Download DOCX
            </Button>
          </div>
        </div>

        <article className="space-y-8 text-[15px] leading-relaxed text-fg-muted">
          <header className="space-y-2 border-b border-line pb-5">
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-fg-muted">
              <span>{resumeLocation}</span>
              <span>•</span>
              <span>{profile.email}</span>
              <span>•</span>
              <span>{profile.phone}</span>
              <span>•</span>
              <a href={profile.linkedin} className="text-fg hover:text-accent" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <span>•</span>
              <a href={profile.github} className="text-fg hover:text-accent" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <span>•</span>
              <a href={portfolioUrl} className="text-fg hover:text-accent" target="_blank" rel="noreferrer">
                Portfolio
              </a>
            </div>
            <p className="text-sm text-fg-muted">
              <strong className="font-semibold text-fg">Research interests:</strong> {profile.researchInterests}
            </p>
          </header>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-fg">Summary</h2>
            <p>{profile.about[0]}</p>
            <p className="mt-3">{profile.about[1]}</p>
            <p className="mt-3">{profile.about[2]}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-fg">Education</h2>
            {education.map((item) => (
              <div key={item.id} className="mb-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-semibold text-fg">{item.credential}</p>
                    <p>{item.institution}</p>
                  </div>
                  <p className="text-sm text-fg-faint">{formatRange(item.startDate, item.endDate)}</p>
                </div>
                <p className="mt-1 text-sm text-fg-faint">GPA: [TODO: X.XX / scale]</p>
                {item.notes && <p className="mt-2 text-sm">{item.notes}</p>}
              </div>
            ))}
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-fg">Experience</h2>
            {experience.map((entry) => (
              <div key={entry.id} className="mb-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-semibold text-fg">{entry.role}</p>
                    <p>{entry.organization}</p>
                    {entry.context && <p className="text-sm text-fg-faint">{entry.context}</p>}
                  </div>
                  <p className="text-sm text-fg-faint">{formatRange(entry.startDate, entry.endDate)}</p>
                </div>
                <p className="mt-2">{entry.summary}</p>
                {entry.responsibilities && (
                  <ul className="mt-3 list-disc space-y-2 pl-5">
                    {entry.responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-fg">Projects</h2>
            <ul className="list-disc space-y-2 pl-5">
              {projectSummary.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-fg">Skills</h2>
            <p>{skillsText}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-fg">Certifications</h2>
            <ul className="list-disc space-y-2 pl-5">
              {certifications.map((cert) => (
                <li key={cert.id}>{cert.title} — {cert.issuer} ({cert.date})</li>
              ))}
            </ul>
          </section>
        </article>
      </Container>
    </section>
  );
}
