import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uses",
  description: "The tools, platforms, and workflow I use to ship software reliably.",
  alternates: { canonical: `${siteUrl}/uses` },
};

// TODO: confirm this reflects your actual day-to-day setup.
const uses = [
  {
    label: "Editor",
    value: "Visual Studio Code",
  },
  {
    label: "Languages",
    value: "TypeScript, JavaScript, Python, Dart, Java, C++, R, HTML, CSS",
  },
  {
    label: "Frontend",
    value: "Next.js, React, Tailwind CSS",
  },
  {
    label: "Backend",
    value: "Node.js, FastAPI, Express, Resend",
  },
  {
    label: "Database",
    value: "Supabase, Microsoft SQL Server",
  },
  {
    label: "Cloud",
    value: "Vercel, Render, Firebase, Cloudinary",
  },
  {
    label: "Mobile",
    value: "Flutter",
  },
  {
    label: "CMS",
    value: "Joomla",
  },
  {
    label: "Version Control",
    value: "Git + GitHub",
  },
];

export default function UsesPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          label="Uses"
          title="My development setup"
          description="The tools, platforms, and workflow I use to ship software reliably."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {uses.map((item) => (
            <div key={item.label} className="rounded-sm border border-line-strong bg-bg-raised p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-accent">{item.label}</p>
              <p className="mt-3 text-lg font-semibold text-fg">{item.value}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
