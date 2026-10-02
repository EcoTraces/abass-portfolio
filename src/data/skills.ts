import { SkillGroup, SkillItem } from "@/types";

export const skillCategories = [
  { title: "Languages", order: 0 },
  { title: "Frontend", order: 1 },
  { title: "Mobile", order: 2 },
  { title: "Backend", order: 3 },
  { title: "Database", order: 4 },
  { title: "Cloud & Infrastructure", order: 5 },
  { title: "AI / Machine Learning", order: 6 },
  { title: "Development Tools", order: 7 },
  { title: "Currently learning", order: 8 },
] as const;

export const skills: SkillItem[] = [
  { name: "Python", category: "Languages", order: 0, iconKey: "siPython", iconSource: "library" },
  { name: "Dart", category: "Languages", order: 1, iconKey: "siDart", iconSource: "library" },
  { name: "JavaScript", category: "Languages", order: 2, iconKey: "siJavascript", iconSource: "library" },
  { name: "TypeScript", category: "Languages", order: 3, iconKey: "siTypescript", iconSource: "library" },
  { name: "SQL", category: "Languages", order: 4, iconKey: "Database", iconSource: "library" },
  { name: "React", category: "Frontend", order: 0, iconKey: "siReact", iconSource: "library" },
  { name: "Next.js", category: "Frontend", order: 1, iconKey: "siNextdotjs", iconSource: "library" },
  { name: "Tailwind CSS", category: "Frontend", order: 2, iconKey: "siTailwindcss", iconSource: "library" },
  { name: "HTML/CSS", category: "Frontend", order: 3, iconKey: "siHtml5", iconSource: "library" },
  { name: "Flutter", category: "Mobile", order: 0, iconKey: "siFlutter", iconSource: "library" },
  { name: "Kotlin", category: "Mobile", order: 1, iconKey: "siKotlin", iconSource: "library" },
  { name: "Jetpack Compose", category: "Mobile", order: 2, iconKey: "MonitorSmartphone", iconSource: "library" },
  { name: "Android Development", category: "Mobile", order: 3, iconKey: "Smartphone", iconSource: "library" },
  { name: "Node.js", category: "Backend", order: 0, iconKey: "siNodedotjs", iconSource: "library" },
  { name: "Express", category: "Backend", order: 1, iconKey: "ServerCog", iconSource: "library" },
  { name: "FastAPI", category: "Backend", order: 2, iconKey: "Rocket", iconSource: "library" },
  { name: "REST APIs", category: "Backend", order: 3, iconKey: "Route", iconSource: "library" },
  { name: "Cloud Firestore", category: "Database", order: 0, iconKey: "Cloud", iconSource: "library" },
  { name: "Supabase", category: "Database", order: 1, iconKey: "siSupabase", iconSource: "library" },
  { name: "SQL", category: "Database", order: 2, iconKey: "TableProperties", iconSource: "library" },
  { name: "Firebase", category: "Cloud & Infrastructure", order: 0, iconKey: "siFirebase", iconSource: "library" },
  { name: "Firebase Authentication", category: "Cloud & Infrastructure", order: 1, iconKey: "ShieldCheck", iconSource: "library" },
  { name: "Firebase Cloud Messaging", category: "Cloud & Infrastructure", order: 2, iconKey: "MessageSquareMore", iconSource: "library" },
  { name: "Render", category: "Cloud & Infrastructure", order: 3, iconKey: "CloudFog", iconSource: "library" },
  { name: "Google Maps Platform", category: "Cloud & Infrastructure", order: 4, iconKey: "MapPinned", iconSource: "library" },
  { name: "Cloudinary", category: "Cloud & Infrastructure", order: 5, iconKey: "Image", iconSource: "library" },
  { name: "Vercel", category: "Cloud & Infrastructure", order: 6, iconKey: "siVercel", iconSource: "library" },
  { name: "PyTorch", category: "AI / Machine Learning", order: 0, iconKey: "siPytorch", iconSource: "library" },
  { name: "Computer Vision", category: "AI / Machine Learning", order: 1, iconKey: "Eye", iconSource: "library" },
  { name: "Applied ML", category: "AI / Machine Learning", order: 2, iconKey: "BrainCircuit", iconSource: "library" },
  { name: "Artificial Intelligence", category: "AI / Machine Learning", order: 3, iconKey: "Sparkles", iconSource: "library" },
  { name: "Git", category: "Development Tools", order: 0, iconKey: "siGit", iconSource: "library" },
  { name: "GitHub", category: "Development Tools", order: 1, iconKey: "siGithub", iconSource: "library" },
  { name: "VS Code", category: "Development Tools", order: 2, iconKey: "Terminal", iconSource: "library" },
  { name: "Postman", category: "Development Tools", order: 3, iconKey: "siPostman", iconSource: "library" },
  { name: "Cybersecurity", category: "Currently learning", order: 0, iconKey: "Shield", iconSource: "library", currentlyLearning: true },
] as const satisfies SkillItem[];

const iconOwners = new Map<string, string>();

for (const skill of skills) {
  if (skill.iconSource !== "library" || !skill.iconKey) continue;

  const existingOwner = iconOwners.get(skill.iconKey);
  if (existingOwner) {
    throw new Error(`Skills must use unique icon keys: ${existingOwner} and ${skill.name} both use ${skill.iconKey}`);
  }

  iconOwners.set(skill.iconKey, skill.name);
}

export const skillGroups: SkillGroup[] = skillCategories.map((category) => ({
  category: category.title,
  items: skills
    .filter((skill) => skill.category === category.title)
    .map((skill) => ({
      name: skill.name,
      iconKey: skill.iconKey,
      iconSource: skill.iconSource,
      currentlyLearning: skill.currentlyLearning,
    })),
}));
