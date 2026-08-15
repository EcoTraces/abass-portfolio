import { blogPosts } from "@/data/blog";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    lastModified: new Date(),
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const staticEntries: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/blog`, lastModified: new Date() },
    { url: `${siteUrl}/resume`, lastModified: new Date() },
    { url: `${siteUrl}/now`, lastModified: new Date() },
    { url: `${siteUrl}/uses`, lastModified: new Date() },
  ];

  return [...staticEntries, ...projectEntries, ...blogEntries];
}
