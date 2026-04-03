import { Star, GitFork } from "lucide-react";
import type { DeveloperProfile } from "@/lib/map-github-user";

type TopRepositoriesCardProps = {
  developer: DeveloperProfile;
};

export function TopRepositoriesCard({ developer }: TopRepositoriesCardProps) {
  const topRepos = [...developer.repositories]
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 4);

  return (
    <section className="rounded border border-border bg-card p-6">
      <div className="mb-6">
        <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Top Repositories
        </h2>
        <p className="font-mono text-xs text-[var(--text-faint)] mt-1">
          highest-impact public projects
        </p>
      </div>

      <div className="space-y-3">
        {topRepos.map((repo) => (
          <div
            key={repo.id}
            className="rounded border border-border bg-secondary p-4"
          >
            <div className="mb-2 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-mono text-sm text-[var(--text-secondary)] truncate">
                  {repo.name}
                </p>
                {repo.description && (
                  <p className="mt-1 font-mono text-xs text-[var(--text-faint)] line-clamp-2">
                    {repo.description}
                  </p>
                )}
              </div>
              <span className="shrink-0 font-mono text-xs text-primary">
                {repo.language}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                <Star className="h-3 w-3" />
                {repo.stars}
              </span>
              <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                <GitFork className="h-3 w-3" />
                {repo.forks}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
