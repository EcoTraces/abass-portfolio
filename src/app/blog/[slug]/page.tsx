import { blogPosts } from "@/data/blog";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteUrl } from "@/lib/site";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts.find((item) => item.slug === params.slug);
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

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) return notFound();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading label="Blog" title={post.title} description={post.description} />
        <div className="mt-10 space-y-6 text-fg-muted">
          <p>This is a stub post that demonstrates the blog page structure. Add your real post content in <code className="rounded-sm bg-bg px-1 py-0.5">src/data/blog.ts</code>.</p>
          <p>Once you have real technical writing ready, replace this placeholder with actual Markdown or MDX content.</p>
        </div>
      </Container>
    </section>
  );
}
