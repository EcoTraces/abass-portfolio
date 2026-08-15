export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "why-software-should-be-built-for-constraints",
    title: "Why software should be built for constraints",
    description: "Lessons from building resilient systems where connectivity, data, and trust are limited.",
    date: "2026-05-12",
    tags: ["engineering", "systems", "design"],
  },
  {
    slug: "building-portfolios-that-earn-recruiter-trust",
    title: "Building portfolios that earn recruiter trust",
    description: "How to turn a personal site into a credibility signal instead of a static resume.",
    date: "2026-07-04",
    tags: ["career", "portfolio", "technical"],
  },
];
