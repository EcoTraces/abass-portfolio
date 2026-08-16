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
      "Coursework toward my B.Sc. in Computer Science & Information Technology at Njala University",
    ],
  },
  {
    title: "Building",
    items: [
      "ScholarSphere — helping undergraduate and postgraduate students find scholarships, fellowships, and other opportunities that support their studies",
      "Agriculture Pest & Disease Detection System — computer-vision tool to help farmers identify crop pests and diseases early",
      "Digital Land Verification System — reducing land fraud and ownership disputes through verifiable digital records",
    ],
  },
  {
    title: "Exploring",
    items: [
      "Graduate programs in Cybersecurity, Data Science, Digital Transformation, AI, Software Engineering, or Project Management — narrowing down where to specialize at the master's level",
      "How technology and digital transformation can solve real-world problems, support my community, and motivate youth engagement",
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
