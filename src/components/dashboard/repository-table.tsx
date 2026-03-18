"use client";

import { useMemo, useState } from "react";
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
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Repositories</h2>
          <p className="text-sm text-white/50">
            Showing {visibleRepositories.length} of{" "}
            {developer.repositories.length} repositories
          </p>
        </div>
      </div>

      <div className="space-y-3 [overflow-achor:none]">
        {visibleRepositories.map((repo) => (
          <div
            key={repo.id}
            className="rounded-xl border border-white/10 bg-black/20 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium text-white">{repo.name}</h3>
                <p className="mt-1 text-sm text-white/60">{repo.description}</p>
              </div>

              <span className="shrink-0 text-sm text-cyan-300">
                {repo.language}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-4 text-sm text-white/50">
              <span>⭐ {repo.stars}</span>
              <span>🍴 {repo.forks}</span>
              <span>Updated {repo.updatedAt}</span>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={handleShowMore}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
          >
            Show more
          </button>
        </div>
      )}
    </section>
  );
}
