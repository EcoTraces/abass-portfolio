import { isPlaceholder } from "@/lib/utils";

export interface GitHubProfileData {
  username: string;
  publicRepos: number;
  updatedAt: string;
  topLanguages: string[];
  recentRepos: { name: string; url: string }[];
}

export function parseGitHubUsername(url?: string): string | null {
  if (!url || isPlaceholder(url)) return null;
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split("/").filter(Boolean);
    return parts[0] || null;
  } catch {
    return null;
  }
}

interface GitHubApiRepo {
  name: string;
  html_url: string;
  language: string | null;
}

interface GitHubApiUser {
  public_repos?: number;
  updated_at?: string;
}

export async function fetchGitHubProfile(username: string): Promise<GitHubProfileData | null> {
  const userRes = await fetch(`https://api.github.com/users/${username}`, {
    next: { revalidate: 3600 },
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!userRes.ok) return null;
  const userData: GitHubApiUser = await userRes.json();

  const repoRes = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=8`,
    {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  const repos: GitHubApiRepo[] = repoRes.ok ? await repoRes.json() : [];
  const languageCounts = new Map<string, number>();

  const recentRepos = Array.isArray(repos)
    ? repos.map((repo) => ({ name: repo.name, url: repo.html_url }))
    : [];

  if (Array.isArray(repos)) {
    repos.forEach((repo) => {
      if (repo.language) {
        languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
      }
    });
  }

  const topLanguages = Array.from(languageCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([language]) => language);

  return {
    username,
    publicRepos: userData.public_repos ?? 0,
    updatedAt: userData.updated_at ?? new Date().toISOString(),
    topLanguages,
    recentRepos: recentRepos.slice(0, 4),
  };
}
