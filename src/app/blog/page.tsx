import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";

const description =
  "Short technical posts and engineering reflections that explain my thinking and process.";

export const metadata: Metadata = {
  title: "Writing",
  description,
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: { title: "Writing", description, url: `${siteUrl}/blog` },
  twitter: { card: "summary_large_image", title: "Writing", description },
};

export default function BlogPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          label="Blog"
          title="Writing"
          description="Short technical posts and engineering reflections that explain my thinking and process."
        />

        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <article key={post.slug} className="rounded-sm border border-line-strong bg-bg-raised p-6 transition-colors hover:border-accent">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-fg">{post.title}</p>
                  <p className="mt-2 text-sm text-fg-muted">{post.description}</p>
                </div>
                <div className="text-xs uppercase tracking-[0.24em] text-accent">{post.date}</div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-fg-faint">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-line px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent"
              >
                Read post
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
