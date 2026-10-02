import { readClient, hasSanityConfig } from "@/sanity/lib/client";
import { getSanityImageUrl } from "@/sanity/lib/image";
import { profile as fallbackProfile, socialLinks as fallbackSocialLinks } from "@/data/profile";
import { experience as fallbackExperience } from "@/data/experience";
import { education as fallbackEducation } from "@/data/education";
import { skillGroups as fallbackSkillGroups } from "@/data/skills";
import { certifications as fallbackCertifications } from "@/data/certifications";
import { blogPosts as fallbackBlogPosts } from "@/data/blog";
import { featuredProjects as fallbackFeaturedProjects, moreProjects as fallbackMoreProjects } from "@/data/projects";
import type { SkillGroup } from "@/types";

export type SiteSettings = {
  name: string;
  headline: string;
  statusLine: string;
  positioning: string;
  researchInterests: string;
  about: string[];
  socialLinks: { label: string; href: string; icon: "github" | "linkedin" | "mail" | "whatsapp" }[];
  profileImage: string;
  profileImageAlt: string;
  socialPreviewImage: string;
  resumePath: string;
  resumeDocxPath: string;
};

type SanitySiteSettings = {
  siteName?: string;
  headline?: string;
  statusLine?: string;
  positioning?: string;
  researchInterests?: string;
  about?: string[];
  socialLinks?: { label: string; href: string; icon: "github" | "linkedin" | "mail" | "whatsapp" }[];
  profileImage?: { asset?: { url?: string } | null; alt?: string } | null;
  socialPreviewImage?: { asset?: { url?: string } | null; alt?: string } | null;
  resumePath?: string;
  resumeDocxPath?: string;
};

async function safeFetch<T>(query: string, fallback: T): Promise<T> {
  if (!hasSanityConfig) return fallback;

  try {
    const result = await readClient.fetch<T>(query);
    return result ?? fallback;
  } catch {
    return fallback;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await safeFetch<SanitySiteSettings | null>(
    `*[_type == "siteSettings"][0]{
      siteName,
      headline,
      statusLine,
      positioning,
      researchInterests,
      about,
      socialLinks[]{ label, href, icon },
      profileImage { asset->{ _id, _ref, url }, alt, hotspot, crop },
      socialPreviewImage { asset->{ _id, _ref, url }, alt, hotspot, crop },
      "resumePath": resumePdf.asset->url,
      "resumeDocxPath": resumeDocx.asset->url
    }`,
    null,
  );

  const profileImageUrl = getSanityImageUrl(data?.profileImage) || fallbackProfile.profileImage;
  const socialPreviewUrl = getSanityImageUrl(data?.socialPreviewImage) || fallbackProfile.socialPreviewImage;

  if (!data) {
    return {
      name: fallbackProfile.name,
      headline: fallbackProfile.headline,
      statusLine: "Open to opportunities",
      positioning: fallbackProfile.positioning,
      researchInterests: fallbackProfile.researchInterests,
      about: [...fallbackProfile.about],
      socialLinks: fallbackSocialLinks.map((link) => ({ ...link })),
      profileImage: profileImageUrl,
      profileImageAlt: fallbackProfile.profileImageAlt,
      socialPreviewImage: socialPreviewUrl,
      resumePath: fallbackProfile.resumePath,
      resumeDocxPath: fallbackProfile.resumeDocxPath,
    };
  }

  return {
    name: data.siteName || fallbackProfile.name,
    headline: data.headline || fallbackProfile.headline,
    statusLine: data.statusLine || "Open to opportunities",
    positioning: data.positioning || fallbackProfile.positioning,
    researchInterests: data.researchInterests || fallbackProfile.researchInterests,
    about: data.about && data.about.length > 0 ? data.about : [...fallbackProfile.about],
    socialLinks:
      data.socialLinks && data.socialLinks.length > 0
        ? data.socialLinks.map((link) => ({
            label: link.label,
            href: link.href,
            icon: link.icon,
          }))
        : fallbackSocialLinks.map((link) => ({ ...link })),
    profileImage: profileImageUrl,
    profileImageAlt: data.profileImage?.alt || fallbackProfile.profileImageAlt,
    socialPreviewImage: socialPreviewUrl,
    resumePath: data.resumePath || fallbackProfile.resumePath,
    resumeDocxPath: data.resumeDocxPath || fallbackProfile.resumeDocxPath,
  };
}

export async function getProjectData() {
  const data = await safeFetch(
    `*[_type == "project"] | order(order asc) {
      title,
      "slug": slug.current,
      summary,
      status,
      category,
      techStack,
      featured,
      year,
      "coverImage": coverImage.asset->url,
      links,
      caseStudy,
      order
    }`,
    [],
  );

  const list = Array.isArray(data) && data.length > 0 ? data : [];
  const projects = list.length > 0 ? list : [...fallbackFeaturedProjects, ...fallbackMoreProjects];
  return {
    featured: projects.filter((item) => item.featured).map((item) => ({ ...item })),
    more: projects.filter((item) => !item.featured).map((item) => ({ ...item })),
  };
}

export async function getExperience() {
  const data = await safeFetch(
    `*[_type == "experience"] | order(order asc) { organization, role, context, location, startDate, endDate, summary, responsibilities, type }`,
    [],
  );
  return Array.isArray(data) && data.length > 0 ? data : fallbackExperience;
}

export async function getEducation() {
  const data = await safeFetch(
    `*[_type == "education"] | order(order asc) { institution, credential, location, startDate, endDate, status, notes }`,
    [],
  );
  return Array.isArray(data) && data.length > 0 ? data : fallbackEducation;
}

export async function getSkillGroups(): Promise<SkillGroup[]> {
  const data = await safeFetch<
    Array<{
      title?: string;
      order?: number;
      items?: Array<{
        name?: string;
        icon?: string;
        iconSource?: "library" | "upload";
        iconImage?: { asset?: { url?: string } | null; alt?: string } | null;
        currentlyLearning?: boolean;
      }>;
    }>
    >(
    `*[_type == "skillCategory"] | order(order asc) {
      title,
      order,
      "items": *[_type == "skill" && references(^._id)] | order(order asc) {
        name,
        icon,
        iconSource,
        iconImage { asset->{ url }, alt },
        currentlyLearning
      }
    }`,
    [],
  );

  if (!Array.isArray(data) || data.length === 0) {
    return fallbackSkillGroups;
  }

  const categories = data
    .map((group) => ({
      category: group.title || "Skills",
      items: (group.items || []).map((item) => ({
        name: item.name || "Skill",
        iconKey: item.icon || "Code2",
        iconSource: item.iconSource || "library",
        iconImage: item.iconImage?.asset?.url || undefined,
        iconImageAlt: item.iconImage?.alt || item.name || "Skill icon",
        currentlyLearning: Boolean(item.currentlyLearning),
      })),
    }))
    .filter((group) => group.items.length > 0);

  const currentlyLearningItems = categories.flatMap((group) => group.items).filter((item) => item.currentlyLearning);
  const learningGroup = currentlyLearningItems.length > 0 ? [{ category: "Currently learning", items: currentlyLearningItems }] : [];

  return [...categories.filter((group) => group.category !== "Currently learning"), ...learningGroup];
}

export async function getCertifications() {
  const data = await safeFetch(
    `*[_type == "certification"] | order(order asc) { title, issuer, date, category, credentialUrl }`,
    [],
  );
  return Array.isArray(data) && data.length > 0 ? data : fallbackCertifications;
}

export async function getBlogPosts() {
  const data = await safeFetch(
    `*[_type == "blogPost" && published == true] | order(order asc) { title, "slug": slug.current, excerpt, date, tags, body }`,
    [],
  );
  return Array.isArray(data) && data.length > 0 ? data : fallbackBlogPosts.map((post) => ({ ...post, description: post.description, content: post.content || [] }));
}
