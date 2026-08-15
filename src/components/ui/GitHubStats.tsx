"use client";

import { GitHubProfileData } from "@/lib/github";
import { ArrowUpRight, Github } from "lucide-react";
import { Button } from "./Button";

export function GitHubStats({ stats }: { stats: GitHubProfileData }) {
  return (
    <section className="rounded-sm border border-line-strong bg-bg-raised p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.26em] text-accent">GitHub</p>
          <h2 className="mt-2 text-2xl font-semibold text-fg">Live stats</h2>
        </div>
        <Github className="text-fg-muted" size={24} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-sm border border-line p-4 text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-fg-faint">Repos</p>
          <p className="mt-2 text-2xl font-semibold text-fg">{stats.publicRepos}</p>
        </div>
        <div className="rounded-sm border border-line p-4 text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-fg-faint">Top languages</p>
          <p className="mt-2 text-sm text-fg-muted">{stats.topLanguages.join(", ") || "N/A"}</p>
        </div>
        <div className="rounded-sm border border-line p-4 text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-fg-faint">Updated</p>
          <p className="mt-2 text-sm text-fg-muted">{new Date(stats.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {stats.recentRepos.map((repo) => (
          <a
            key={repo.url}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-sm border border-line p-4 text-sm text-fg-muted transition-colors hover:border-accent hover:text-accent"
          >
            <div className="flex items-center justify-between gap-2">
              <span>{repo.name}</span>
              <ArrowUpRight size={14} />
            </div>
          </a>
        ))}
      </div>

      <div className="mt-6">
        <Button href={`https://github.com/${stats.username}`} variant="secondary" target="_blank">
          View GitHub profile
        </Button>
      </div>
    </section>
  );
}
