import { skills } from "@/data/skills";

const iconOwners = new Map<string, string>();
const mapping = Object.fromEntries(
  skills.map((skill) => [`${skill.category}: ${skill.name}`, skill.iconKey]),
);

for (const skill of skills) {
  if (skill.iconSource !== "library" || !skill.iconKey) continue;

  const existingOwner = iconOwners.get(skill.iconKey);
  if (existingOwner) {
    throw new Error(`${existingOwner} and ${skill.name} share icon key ${skill.iconKey}`);
  }

  iconOwners.set(skill.iconKey, skill.name);
}

console.log("Verified: every local library skill has a unique icon key.");
console.log(JSON.stringify(mapping, null, 2));
