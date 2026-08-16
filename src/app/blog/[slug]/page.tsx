import { blogPosts } from "@/data/blog";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteUrl } from "@/lib/site";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return {};
  const url = `${siteUrl}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return notFound();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading label="Blog" title={post.title} description={post.description} />
        <div className="-mt-8 mb-10 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wider text-fg-faint">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </time>
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-line px-3 py-1">
              {tag}
            </span>
          ))}
        </div>

        {post.content ? (
          <div className="max-w-2xl space-y-6 text-base leading-relaxed text-fg-muted">
            {post.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <p className="max-w-2xl text-fg-muted">
            This post isn&apos;t published yet — check back soon.
          </p>
        )}
      </Container>
    </section>
  );
}
