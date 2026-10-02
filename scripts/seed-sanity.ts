import fs from "node:fs";
import path from "node:path";
import { writeClient } from "@/sanity/lib/client";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { skillCategories, skills } from "@/data/skills";
import { certifications } from "@/data/certifications";
import { blogPosts } from "@/data/blog";
import { featuredProjects, moreProjects } from "@/data/projects";

const requiredToken = process.env.SANITY_WRITE_TOKEN;

if (!requiredToken) {
  console.error("Missing SANITY_WRITE_TOKEN. Add it to your environment before running the seed script.");
  process.exit(1);
}

const allProjects = [...featuredProjects, ...moreProjects];

async function main() {
  const profileImagePath = path.resolve(process.cwd(), "public/images/profile.jpg");

  const profileImageAsset = await writeClient.assets.upload("image", fs.readFileSync(profileImagePath), {
    filename: "profile.jpg",
  });

  const siteSettings = await writeClient.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: profile.name,
    headline: profile.headline,
    statusLine: "Open to opportunities",
    positioning: profile.positioning,
    researchInterests: profile.researchInterests,
    about: profile.about,
    profileImage: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: profileImageAsset._id,
      },
      alt: profile.profileImageAlt,
    },
    socialPreviewImage: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: profileImageAsset._id,
      },
      alt: "Abass David Komeh portrait social preview",
    },
    socialLinks: [
      { _type: "socialLink", label: "GitHub", href: profile.github, icon: "github" },
      { _type: "socialLink", label: "LinkedIn", href: profile.linkedin, icon: "linkedin" },
      { _type: "socialLink", label: "Email", href: `mailto:${profile.email}`, icon: "mail" },
      { _type: "socialLink", label: "WhatsApp", href: `https://wa.me/${profile.phone.replace(/\D/g, "")}`, icon: "whatsapp" },
    ],
  });

  const createdProjects = await Promise.all(
    allProjects.map((project, index) =>
      writeClient.createOrReplace({
        _id: `project-${project.slug}`,
        _type: "project",
        title: project.name,
        slug: { _type: "slug", current: project.slug },
        summary: project.shortDescription,
        status: project.status,
        category: project.categories,
        techStack: project.stack,
        order: index,
        featured: project.featured,
        year: project.year,
        links: {
          _type: "object",
          github: project.links.github,
          demo: project.links.demo,
        },
        caseStudy: [{ _type: "block", _key: `case-${project.slug}`, children: [{ _type: "span", text: project.caseStudy.overview || "" }] }],
      }),
    ),
  );

  const createdExperience = await Promise.all(
    experience.map((entry, index) =>
      writeClient.createOrReplace({
        _id: `experience-${entry.id}`,
        _type: "experience",
        ...entry,
        order: index,
      }),
    ),
  );

  const createdEducation = await Promise.all(
    education.map((entry, index) =>
      writeClient.createOrReplace({
        _id: `education-${entry.id}`,
        _type: "education",
        ...entry,
        order: index,
      }),
    ),
  );

  const createdCategories = await Promise.all(
    skillCategories.map((category, index) =>
      writeClient.createOrReplace({
        _id: `skillCategory-${category.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        _type: "skillCategory",
        title: category.title,
        order: category.order ?? index,
      }),
    ),
  );

  const categoryMap = new Map<string, string>(createdCategories.map((category) => [category.title, category._id]));

  const createdSkills = await Promise.all(
    skills.map((skill, index) => {
      const skillCategory = (skill.category ?? "") as string;

      return writeClient.createOrReplace({
        _id: `skill-${skill.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        _type: "skill",
        name: skill.name,
        category: {
          _type: "reference",
          _ref: categoryMap.get(skillCategory) || createdCategories[0]._id,
        },
        order: skill.order ?? index,
        iconSource: skill.iconSource || "library",
        icon: skill.iconSource === "library" ? skill.iconKey : undefined,
        iconImage: undefined,
        currentlyLearning: Boolean(skill.currentlyLearning),
      });
    }),
  );

  const createdCertifications = await Promise.all(
    certifications.map((cert, index) =>
      writeClient.createOrReplace({
        _id: `certification-${cert.id}`,
        _type: "certification",
        ...cert,
        order: index,
      }),
    ),
  );

  const createdPosts = await Promise.all(
    blogPosts.map((post, index) =>
      writeClient.createOrReplace({
        _id: `blogPost-${post.slug}`,
        _type: "blogPost",
        title: post.title,
        slug: { _type: "slug", current: post.slug },
        excerpt: post.description,
        date: new Date(post.date).toISOString(),
        tags: post.tags,
        body: (post.content || []).map((paragraph) => ({
          _type: "block",
          _key: `${post.slug}-${paragraph.slice(0, 12)}`,
          children: [{ _type: "span", text: paragraph }],
        })),
        published: true,
        order: index,
      }),
    ),
  );

  const mapping = Object.fromEntries(
    skills.map((skill) => [skill.name, { category: skill.category, icon: skill.iconKey, currentlyLearning: Boolean(skill.currentlyLearning) }]),
  );

  console.log("Seeded Sanity CMS");
  console.log(JSON.stringify({ siteSettings, createdCategories: createdCategories.length, createdSkills: createdSkills.length, createdProjects: createdProjects.length, createdExperience: createdExperience.length, createdEducation: createdEducation.length, createdCertifications: createdCertifications.length, createdPosts: createdPosts.length, iconMapping: mapping }, null, 2));
}

main().catch((error) => {
  console.error("Seed script failed:", error);
  process.exit(1);
});
