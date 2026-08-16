import { Project } from "@/types";
import { isPlaceholder } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { StatusTag, TechBadge } from "../ui/TechBadge";

export function ProjectCard({ project }: { project: Project }) {
  const hasCover = project.coverImage && !isPlaceholder(project.coverImage);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col overflow-hidden rounded-sm border border-line-strong bg-bg-raised transition-colors hover:border-accent"
    >
      <Link href={`/projects/${project.slug}`} className="relative block aspect-16/10 overflow-hidden border-b border-line">
        <div className="bg-grid absolute inset-0 flex items-center justify-center opacity-60">
          {!hasCover && (
            <span className="font-display text-3xl font-medium text-fg-faint">
              {project.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 3)}
            </span>
          )}
        </div>
        {hasCover && (
          <Image
            src={project.coverImage}
            alt={`${project.name} icon`}
            fill
            className="object-contain p-8"
          />
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {project.categories.map((c) => (
            <TechBadge key={c} className="border-accent-2/30 text-accent-2">
              {c}
            </TechBadge>
          ))}
        </div>

        <h3 className="font-display text-xl font-medium text-fg">
          <Link href={`/projects/${project.slug}`} className="hover:text-accent">
            {project.name}
          </Link>
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">
          {project.shortDescription}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <TechBadge key={tech}>{tech}</TechBadge>
          ))}
          {project.stack.length > 4 && (
            <TechBadge>{`+${project.stack.length - 4}`}</TechBadge>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <StatusTag label="Status" value={project.status} />
          <div className="flex items-center gap-3">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} on GitHub`}
                className="text-fg-muted hover:text-accent"
              >
                <Github size={16} />
              </a>
            )}
            <Link
              href={`/projects/${project.slug}`}
              className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-fg-muted hover:text-accent"
            >
              Case Study
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
