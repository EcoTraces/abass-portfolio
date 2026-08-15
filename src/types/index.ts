export type ProjectCategory = "AI/ML" | "Web" | "Mobile" | "Full Stack" | "Research";

export type ProjectStatus = "In Progress" | "Completed" | "Prototype" | "Planned" | "Update status";

export interface ProjectLinks {
  github?: string;
  demo?: string;
}

export interface ProjectCaseStudy {
  overview?: string;
  problem?: string;
  motivation?: string;
  solution?: string;
  keyFeatures?: string[];
  architecture?: string;
  process?: string[];
  challenges?: { challenge: string; solution: string }[];
  technicalDecisions?: string[];
  lessonsLearned?: string;
}

export interface Project {
  slug: string;
  name: string;
  fullTitle?: string;
  shortDescription: string;
  categories: ProjectCategory[];
  stack: string[];
  status: ProjectStatus;
  year: string;
  featured: boolean;
  coverImage: string;
  screenshots?: string[];
  links: ProjectLinks;
  caseStudy: ProjectCaseStudy;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ExperienceEntry {
  id: string;
  organization: string;
  role: string;
  context?: string;
  location?: string;
  startDate: string;
  endDate: string | "Present";
  summary: string;
  responsibilities?: string[];
  type: "internship" | "employment" | "volunteer" | "freelance";
}

export interface EducationEntry {
  id: string;
  institution: string;
  credential: string;
  location: string;
  startDate: string;
  endDate: string;
  status: "expected" | "completed" | "in-progress";
  notes?: string;
}

export interface CertificationEntry {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  category: "certification" | "achievement" | "competition" | "training" | "scholarship" | "award";
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail" | "whatsapp";
}
