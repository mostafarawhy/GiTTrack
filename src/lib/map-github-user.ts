import type { GitHubRepo, GitHubUser } from "@/lib/github";

export type Repository = {
  id: number;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  updatedAt: string;
};

export type LanguageStat = {
  name: string;
  value: number;
};

export type DeveloperProfile = {
  name: string;
  username: string;
  avatarUrl: string;
  bio: string;
  followers: number;
  following: number;
  publicRepos: number;
  totalStars: number;
  totalForks: number;
  topLanguage: string;
  githubUrl: string;
  repositories: Repository[];
  topRepositories: Repository[];
  languages: LanguageStat[];
  insights: string[];
};

function formatUpdatedAt(updatedAt: string): string {
  const date = new Date(updatedAt);
  return date.toLocaleDateString();
}

function getTotalStars(repos: GitHubRepo[]): number {
  return repos.reduce((total, repo) => total + repo.stargazers_count, 0);
}

function getTotalForks(repos: GitHubRepo[]): number {
  return repos.reduce((total, repo) => total + repo.forks_count, 0);
}

function getLanguageDistribution(repos: GitHubRepo[]): LanguageStat[] {
  const languageCounts: Record<string, number> = {};

  for (const repo of repos) {
    if (!repo.language) continue;

    languageCounts[repo.language] = (languageCounts[repo.language] ?? 0) + 1;
  }

  const total = Object.values(languageCounts).reduce(
    (sum, count) => sum + count,
    0,
  );

  if (total === 0) return [];

  return Object.entries(languageCounts)
    .map(([name, count]) => ({
      name,
      value: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.value - a.value);
}

function getTopLanguage(languages: LanguageStat[]): string {
  return languages[0]?.name ?? "Unknown";
}

function mapRepositories(repos: GitHubRepo[]): Repository[] {
  return repos.map((repo) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description ?? "No description provided.",
    language: repo.language ?? "Unknown",
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updatedAt: formatUpdatedAt(repo.updated_at),
  }));
}

function generateInsights(
  user: GitHubUser,
  repos: GitHubRepo[],
  languages: LanguageStat[],
): string[] {
  const topLanguage = getTopLanguage(languages);
  const totalStars = getTotalStars(repos);

  return [
    `${user.login} appears to focus mainly on ${topLanguage}-based projects.`,
    `This profile has ${repos.length} fetched repositories with a combined ${totalStars} stars.`,
    "Repository activity suggests a product-focused developer profile with visible public work.",
  ];
}

function sortRepositoriesByStars(repos: Repository[]): Repository[] {
  return [...repos].sort((a, b) => b.stars - a.stars);
}

function getTopRepositories(repos: Repository[], limit = 5): Repository[] {
  return sortRepositoriesByStars(repos).slice(0, limit);
}

export function mapGitHubDataToDeveloper(
  user: GitHubUser,
  repos: GitHubRepo[],
): DeveloperProfile {
  const languages = getLanguageDistribution(repos);
  const mappedRepositories = mapRepositories(repos);
  const sortedRepositories = sortRepositoriesByStars(mappedRepositories);
  const topRepositories = getTopRepositories(sortedRepositories, 5);

  return {
    name: user.name ?? user.login,
    username: user.login,
    avatarUrl: user.avatar_url,
    bio: user.bio ?? "No bio available.",
    followers: user.followers,
    following: user.following,
    publicRepos: user.public_repos,
    totalStars: getTotalStars(repos),
    totalForks: getTotalForks(repos),
    topLanguage: getTopLanguage(languages),
    githubUrl: user.html_url,
    repositories: sortedRepositories,
    topRepositories,
    languages,
    insights: generateInsights(user, repos, languages),
  };
}
