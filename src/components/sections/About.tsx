import { fetchGitHubProfile, parseGitHubUsername } from "@/lib/github";
import { profile } from "@/data/profile";
import { SectionHeading } from "../ui/SectionHeading";
import { Container } from "../ui/Container";
import { GitHubStats } from "../ui/GitHubStats";
import { Reveal } from "@/components/motion/Reveal";

export default async function About() {
  const username = parseGitHubUsername(profile.github);
  const githubStats = username ? await fetchGitHubProfile(username) : null;

  return (
    <section id="about" className="border-b border-line py-14 sm:py-20 lg:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading index="01" label="About" title="Background" className="mb-0" />
            <Reveal delay={0.1} className="max-w-2xl space-y-6 text-base leading-relaxed text-fg-muted sm:text-lg">
              {profile.about.map((paragraph, i) => (
                <p key={i} className={i === 0 ? "text-fg" : undefined}>
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            {githubStats ? (
              <GitHubStats stats={githubStats} />
            ) : (
              <div className="rounded-sm border border-line-strong bg-bg-raised p-6 text-fg-muted">
                <p className="font-mono text-xs uppercase tracking-[0.26em] text-accent">GitHub</p>
                <h2 className="mt-3 text-2xl font-semibold text-fg">Live stats coming soon</h2>
                <p className="mt-4 text-sm leading-relaxed">
                  Connect a valid GitHub profile URL in <code className="rounded-sm bg-bg px-1 py-0.5">src/data/profile.ts</code> to surface live repo and language data here.
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
