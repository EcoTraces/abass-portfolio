"use client";

import { Project, ProjectCategory } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ProjectCard } from "./ProjectCard";

export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const availableCategories = useMemo(() => {
    const set = new Set<ProjectCategory>();
    projects.forEach((p) => p.categories.forEach((c) => set.add(c)));
    return Array.from(set);
  }, [projects]);

  const filters = ["All", ...availableCategories];
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.categories.includes(active as ProjectCategory));

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            aria-pressed={active === filter}
            className={
              "rounded-sm border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors " +
              (active === filter
                ? "border-accent bg-accent-soft text-accent"
                : "border-line-strong text-fg-muted hover:border-accent hover:text-accent")
            }
          >
            {filter}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center font-mono text-sm text-fg-faint">
          No projects in this category yet.
        </p>
      ) : (
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
