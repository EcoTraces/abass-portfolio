import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { StatusTag, TechBadge } from "@/components/ui/TechBadge";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/site";
import { isPlaceholder } from "@/lib/utils";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  const url = `${siteUrl}/projects/${project.slug}`;
  const image = isPlaceholder(project.coverImage) ? "/images/social-preview.jpg" : project.coverImage;
  return {
    title: project.name,
    description: project.shortDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: project.name,
      description: project.shortDescription,
      url,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.shortDescription,
      images: [image],
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const cs = project.caseStudy;

  return (
    <article className="py-16 sm:py-24">
      <Container>
        <Link
          href="/#projects"
          className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-fg-muted hover:text-accent"
        >
          <ArrowLeft size={14} />
          Back to projects
        </Link>

        <div className="mb-4 flex flex-wrap gap-2">
          {project.categories.map((c) => (
            <TechBadge key={c} className="border-accent-2/30 text-accent-2">
              {c}
            </TechBadge>
          ))}
        </div>

        <h1 className="font-display text-3xl font-medium leading-tight tracking-tight text-fg sm:text-5xl">
          {project.name}
        </h1>
        {project.fullTitle && project.fullTitle !== project.name && (
          <p className="mt-3 max-w-2xl text-lg text-fg-muted">{project.fullTitle}</p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-line py-5">
          <StatusTag label="Status" value={project.status} accent />
          <StatusTag label="Year" value={project.year} />
          <div className="flex flex-wrap gap-2">
            {project.links.github && (
              <Button href={project.links.github} target="_blank" variant="secondary" className="px-4 py-2 text-xs">
                <Github size={14} />
                Repository
              </Button>
            )}
            {project.links.demo && (
              <Button href={project.links.demo} target="_blank" variant="secondary" className="px-4 py-2 text-xs">
                Live Demo
                <ArrowUpRight size={14} />
              </Button>
            )}
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-sm border border-line-strong bg-bg-raised">
          <div className="bg-grid relative flex aspect-[16/9] items-center justify-center">
            {isPlaceholder(project.coverImage) ? (
              <span className="font-display text-4xl font-medium text-fg-faint">
                {project.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 3)}
              </span>
            ) : (
              <Image src={project.coverImage} alt={`${project.name} cover`} fill className="object-contain p-10" />
            )}
          </div>
        </div>

        {project.screenshots && project.screenshots.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-fg-faint">
              Screenshots
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.screenshots.map((screenshot, index) => (
                <div key={screenshot} className="overflow-hidden rounded-sm border border-line-strong bg-bg-raised">
                  <div className="bg-grid relative aspect-[16/9]">
                    <Image
                      src={screenshot}
                      alt={`${project.name} screenshot ${index + 1}`}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.5fr_0.8fr] lg:gap-16">
          <div className="space-y-12">
            <CaseSection title="Overview" content={cs.overview} />
            <CaseSection title="Problem" content={cs.problem} />
            <CaseSection title="Motivation" content={cs.motivation} />
            <CaseSection title="Solution" content={cs.solution} />

            {cs.keyFeatures && cs.keyFeatures.length > 0 && (
              <div>
                <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-fg-faint">
                  Key Features
                </h2>
                <ul className="space-y-2">
                  {cs.keyFeatures.map((f, i) => (
                    <li key={i} className="flex gap-3 text-fg-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <CaseSection title="Architecture" content={cs.architecture} />

            {cs.process && cs.process.length > 0 && (
              <div>
                <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-fg-faint">
                  Development Process
                </h2>
                <ol className="space-y-2">
                  {cs.process.map((step, i) => (
                    <li key={i} className="flex gap-3 text-fg-muted">
                      <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {cs.challenges && cs.challenges.length > 0 && (
              <div>
                <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-fg-faint">
                  Challenges &amp; Solutions
                </h2>
                <div className="space-y-6">
                  {cs.challenges.map((item, i) => (
                    <div key={i} className="rounded-sm border border-line-strong p-5">
                      <p className="text-sm font-medium text-fg">{item.challenge}</p>
                      <p className="mt-2 text-sm text-fg-muted">{item.solution}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {cs.technicalDecisions && cs.technicalDecisions.length > 0 && (
              <div>
                <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-fg-faint">
                  Technical Decisions
                </h2>
                <ul className="space-y-2">
                  {cs.technicalDecisions.map((d, i) => (
                    <li key={i} className="flex gap-3 text-fg-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-2" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <CaseSection title="Lessons Learned" content={cs.lessonsLearned} />
          </div>

          <aside className="h-fit rounded-sm border border-line-strong p-6 lg:sticky lg:top-24">
            <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-fg-faint">
              Technology Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <TechBadge key={tech}>{tech}</TechBadge>
              ))}
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
}

function CaseSection({ title, content }: { title: string; content?: string }) {
  if (!content) return null;
  return (
    <div>
      <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-fg-faint">{title}</h2>
      <p className="max-w-2xl leading-relaxed text-fg-muted">{content}</p>
    </div>
  );
}
