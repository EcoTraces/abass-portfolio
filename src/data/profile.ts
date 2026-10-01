import { SocialLink } from "@/types";

export const profile = {
  name: "Abass David Komeh",
  initials: "ADK",
  headline: "Computer Science Graduate — Software Engineer",
  positioning:
    "Computer Science graduate interested in practical software and AI solutions for local challenges.",
  program: "B.Sc. Computer Science, First Class Honours, Njala University",
  location: "Sierra Leone",
  phone: "+23280395457",
  email: "abassdavidsonkomeh@gmail.com",
  github: "https://github.com/EcoTraces",
  linkedin: "https://www.linkedin.com/in/abass-david-komeh-35a345300",
  resumePath: "/resume/resume.pdf",
  resumeDocxPath: "/resume/resume.docx",
  profileImage: "/images/profile.jpg",
  researchInterests: "AI/ML, computer vision, cybersecurity, sustainability",
  about: [
    "I'm a Computer Science graduate from Njala University in Sierra Leone, interested in using software and AI to solve practical local problems.",
    "Most of what I've learned has come from building. EcoTrace, my final-year project, is an e-waste pickup and recovery app that I piloted with a small group of households. I've also built a fingerprint-based attendance app, a library management system, and ScholarSphere, a platform that helps students find scholarships. During a 2025 internship at the Huawei Network Operations Centre with Orange Sierra Leone, I saw how real systems are monitored and kept running.",
    "I'm now looking to continue my studies at Master's level in AI, machine learning, or cybersecurity, and to keep working on technology that supports sustainability and digital inclusion.",
  ],
} as const;

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: profile.github, icon: "github" },
  { label: "LinkedIn", href: profile.linkedin, icon: "linkedin" },
  { label: "Email", href: `mailto:${profile.email}`, icon: "mail" },
  { label: "WhatsApp", href: `https://wa.me/${profile.phone.replace(/\D/g, "")}`, icon: "whatsapp" },
];
