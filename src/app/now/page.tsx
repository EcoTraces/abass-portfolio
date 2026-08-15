import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now",
  description: "A quick, current snapshot of what I'm focused on right now.",
  alternates: { canonical: `${siteUrl}/now` },
};

// TODO: keep this in sync with what you're actually focused on.
const nowContent = [
  {
    title: "Learning",
    items: [
      "TODO — add what you're currently studying or exploring",
    ],
  },
  {
    title: "Building",
    items: [
      "TODO — add what you're currently building",
    ],
  },
  {
    title: "Exploring",
    items: [
      "TODO — add what you're currently exploring",
    ],
  },
];

export default function NowPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          label="Now"
          title="What I’m learning and building"
          description="A quick, current snapshot of what I’m focused on right now."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {nowContent.map((section) => (
            <div key={section.title} className="rounded-sm border border-line-strong bg-bg-raised p-6">
              <h2 className="mb-4 text-lg font-semibold text-fg">{section.title}</h2>
              <ul className="space-y-3 text-fg-muted">
                {section.items.map((item) => (
                  <li key={item} className="list-disc pl-5">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
