import { defineField, defineType } from "sanity";

const socialLinkType = defineType({
  name: "socialLink",
  title: "Social Link",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "href", type: "url", validation: (Rule) => Rule.required() }),
    defineField({
      name: "icon",
      type: "string",
      options: {
        list: [
          { title: "GitHub", value: "github" },
          { title: "LinkedIn", value: "linkedin" },
          { title: "Email", value: "mail" },
          { title: "WhatsApp", value: "whatsapp" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});

const skillIconOptions = [
  "siPython",
  "siDart",
  "siJavascript",
  "siTypescript",
  "siHtml5",
  "Database",
  "siReact",
  "siNextdotjs",
  "siTailwindcss",
  "Code2",
  "siFlutter",
  "siKotlin",
  "MonitorSmartphone",
  "Smartphone",
  "siNodedotjs",
  "ServerCog",
  "Rocket",
  "Route",
  "Cloud",
  "siSupabase",
  "TableProperties",
  "siFirebase",
  "ShieldCheck",
  "MessageSquareMore",
  "CloudFog",
  "MapPinned",
  "Image",
  "siVercel",
  "siPytorch",
  "Eye",
  "BrainCircuit",
  "Sparkles",
  "siGit",
  "siGithub",
  "Terminal",
  "siPostman",
  "Shield",
];

const skillCategoryType = defineType({
  name: "skillCategory",
  title: "Skill Category",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "order", type: "number", validation: (Rule) => Rule.required().min(0) }),
  ],
});

const skillType = defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "skillCategory" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "order", type: "number", validation: (Rule) => Rule.required().min(0) }),
    defineField({
      name: "iconSource",
      type: "string",
      initialValue: "library",
      options: {
        list: [
          { title: "Library icon", value: "library" },
          { title: "Upload image", value: "upload" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      type: "string",
      title: "Library icon",
      options: {
        list: skillIconOptions.map((value) => ({ title: value, value })),
      },
      hidden: ({ parent }) => parent?.iconSource !== "library",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { iconSource?: string } | undefined;
          if (parent?.iconSource === "library" && !value) return "Select a library icon";
          return true;
        }),
    }),
    defineField({
      name: "iconImage",
      type: "image",
      title: "Uploaded icon image",
      hidden: ({ parent }) => parent?.iconSource !== "upload",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({ name: "currentlyLearning", type: "boolean", initialValue: false }),
  ],
});

const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "headline", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "statusLine", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "positioning", type: "text", validation: (Rule) => Rule.required() }),
    defineField({ name: "researchInterests", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "about", type: "array", of: [{ type: "text" }], validation: (Rule) => Rule.required().min(1) }),
    defineField({ name: "socialLinks", type: "array", of: [{ type: "socialLink" }] }),
    defineField({ name: "resumePdf", type: "file", title: "Resume PDF" }),
    defineField({ name: "resumeDocx", type: "file", title: "Resume DOCX" }),
    defineField({
      name: "profileImage",
      type: "image",
      title: "Profile Image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "socialPreviewImage",
      type: "image",
      title: "Social Preview Image",
      options: { hotspot: true },
    }),
  ],
});

const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "summary", type: "text", validation: (Rule) => Rule.required() }),
    defineField({ name: "status", type: "string", options: { list: ["In Progress", "Completed", "Prototype", "Planned", "Update status"] }, validation: (Rule) => Rule.required() }),
    defineField({ name: "category", type: "array", of: [{ type: "string" }], validation: (Rule) => Rule.required().min(1) }),
    defineField({ name: "techStack", type: "array", of: [{ type: "string" }], validation: (Rule) => Rule.required().min(1) }),
    defineField({ name: "order", type: "number", validation: (Rule) => Rule.required().min(0) }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "year", type: "string" }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "links", type: "object", fields: [
      defineField({ name: "github", type: "url" }),
      defineField({ name: "demo", type: "url" }),
    ] }),
    defineField({ name: "caseStudy", type: "array", of: [{ type: "block" }], title: "Case Study" }),
  ],
});

const experienceType = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "organization", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "role", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "context", type: "string" }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "startDate", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "endDate", type: "string" }),
    defineField({ name: "summary", type: "text", validation: (Rule) => Rule.required() }),
    defineField({ name: "responsibilities", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "type", type: "string", options: { list: ["internship", "employment", "volunteer", "freelance"] }, validation: (Rule) => Rule.required() }),
    defineField({ name: "order", type: "number", validation: (Rule) => Rule.required().min(0) }),
  ],
});

const educationType = defineType({
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    defineField({ name: "institution", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "credential", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "startDate", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "endDate", type: "string" }),
    defineField({ name: "status", type: "string", options: { list: ["expected", "completed", "in-progress"] }, validation: (Rule) => Rule.required() }),
    defineField({ name: "notes", type: "text" }),
    defineField({ name: "order", type: "number", validation: (Rule) => Rule.required().min(0) }),
  ],
});

const certificationType = defineType({
  name: "certification",
  title: "Certification",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "issuer", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "date", type: "string" }),
    defineField({ name: "category", type: "string", options: { list: ["certification", "achievement", "competition", "training", "scholarship", "award"] }, validation: (Rule) => Rule.required() }),
    defineField({ name: "credentialUrl", type: "url" }),
    defineField({ name: "order", type: "number", validation: (Rule) => Rule.required().min(0) }),
  ],
});

const blogPostType = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "excerpt", type: "text", validation: (Rule) => Rule.required() }),
    defineField({ name: "date", type: "datetime", validation: (Rule) => Rule.required() }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "body", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "published", type: "boolean", initialValue: true }),
    defineField({ name: "order", type: "number", validation: (Rule) => Rule.required().min(0) }),
  ],
});

export const schemaTypes = [
  siteSettingsType,
  socialLinkType,
  skillCategoryType,
  skillType,
  projectType,
  experienceType,
  educationType,
  certificationType,
  blogPostType,
];
