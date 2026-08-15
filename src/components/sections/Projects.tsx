import { projects } from "@/data/projects";
import { ProjectExplorer } from "../projects/ProjectExplorer";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

export function Projects() {
  return (
    <section id="projects" className="border-b border-line py-14 sm:py-20 lg:py-28">
      <Container>
        <SectionHeading
          index="05"
          label="Selected Work"
          title="Featured Projects"
          description="A few systems I've built end to end — each one framed as an engineering case study rather than a screenshot gallery."
        />
        <ProjectExplorer projects={projects} />
      </Container>
    </section>
  );
}
