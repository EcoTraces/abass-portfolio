import { SocialLink } from "@/types";

export const profile = {
  name: "Abass David Komeh",
  initials: "ADK",
  headline: "Computer Science Student — Software Engineer",
  positioning:
    "Final-year Computer Science student applying AI, software engineering, and cybersecurity to practical problems in sustainability and digital transformation.",
  program: "B.Sc. Computer Science & Information Technology",
  location: "Sierra Leone",
  phone: "+23280395457",
  email: "abassdavidsonkomeh@gmail.com",
  github: "https://github.com/EcoTraces",
  linkedin: "https://www.linkedin.com/in/abass-david-komeh-35a345300",
  resumePath: "/resume/resume.pdf",
  profileImage: "/images/profile.jpg",
  about: [
    "Final-year Computer Science student at Njala University with an expected First-Class Honours degree and a cumulative GPA above 4.0 throughout the first three years of study.",
    "Passionate about applying artificial intelligence, software engineering, and cybersecurity to practical challenges in environmental sustainability and digital transformation.",
    "Completed a Network Operations Centre internship with Huawei Technologies under Orange Sierra Leone and led software development projects from concept through implementation and technical documentation.",
    "Currently seeking opportunities in engineering, research, or collaborative roles where I can apply rigorous systems thinking to real-world problems.",
  ],
} as const;

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: profile.github, icon: "github" },
  { label: "LinkedIn", href: profile.linkedin, icon: "linkedin" },
  { label: "Email", href: `mailto:${profile.email}`, icon: "mail" },
  { label: "WhatsApp", href: `https://wa.me/${profile.phone.replace(/\D/g, "")}`, icon: "whatsapp" },
];
