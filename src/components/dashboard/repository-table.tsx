"use client";

import { useMemo, useState } from "react";
import { Star, GitFork } from "lucide-react";
import type { DeveloperProfile } from "@/lib/map-github-user";

type RepositoryTableProps = {
  developer: DeveloperProfile;
};

const INITIAL_VISIBLE_COUNT = 10;
const LOAD_MORE_COUNT = 10;

export function RepositoryTable({ developer }: RepositoryTableProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const visibleRepositories = useMemo(
    () => developer.repositories.slice(0, visibleCount),
    [developer.repositories, visibleCount],
  );

  const hasMore = developer.repositories.length > visibleCount;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + LOAD_MORE_COUNT);
  };

  return (
    <section className="rounded border border-border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Repositories
          </h2>
          <p className="font-mono text-xs text-[var(--text-faint)] mt-1">
            Showing {visibleRepositories.length} of{" "}
            {developer.repositories.length} repositories
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {visibleRepositories.map((repo) => (
          <div
            key={repo.id}
            className="rounded border border-border bg-secondary p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-mono text-sm text-[var(--text-secondary)] truncate">
                  {repo.name}
                </h3>
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

            <div className="mt-3 flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                <Star className="h-3 w-3" />
                {repo.stars}
              </span>
              <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                <GitFork className="h-3 w-3" />
                {repo.forks}
              </span>
              <span className="font-mono text-xs text-[var(--text-faint)]">
                Updated {repo.updatedAt}
              </span>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={handleShowMore}
            className="rounded border border-border bg-secondary px-4 py-2 font-mono text-xs text-[var(--text-secondary)] transition-colors hover:bg-muted hover:text-foreground"
          >
            Show more
          </button>
        </div>
      )}
    </section>
  );
}
