import { getSkillGroups } from "@/lib/content";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { SkillBadge } from "../ui/SkillBadge";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

export default async function Skills() {
  const skillGroups = await getSkillGroups();

  return (
    <section id="skills" className="border-b border-line py-14 sm:py-20 lg:py-28">
      <Container>
        <SectionHeading
          index="02"
          label="Stack"
          title="Skills & Technologies"
          description="Organized by area — the tools and languages I reach for depending on what the problem needs."
        />
        <RevealGroup className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <RevealItem key={group.category}>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-fg-faint">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item, index) => {
                  const skill = typeof item === "string" ? { name: item, iconKey: "Code2", iconSource: "library" as const } : item;

                  return (
                    <SkillBadge
                      key={`${group.category}-${skill.name}-${index}`}
                      skill={skill}
                    />
                  );
                })}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
