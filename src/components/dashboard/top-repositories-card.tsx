import { Star, GitFork } from "lucide-react";
import type { DeveloperProfile } from "@/lib/mock-user";

type TopRepositoriesCardProps = {
  developer: DeveloperProfile;
};

export function TopRepositoriesCard({ developer }: TopRepositoriesCardProps) {
  const topRepos = [...developer.repositories]
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 4);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">Top Repositories</h3>
        <p className="text-sm text-white/50">Highest-impact public projects</p>
      </div>

      <div className="space-y-4">
        {topRepos.map((repo) => (
          <div
            key={repo.id}
            className="rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/[0.07]"
          >
            <div className="mb-2 flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-white">{repo.name}</p>
                <p className="mt-1 text-sm text-white/50">{repo.description}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/60">
              <span>{repo.language}</span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400" />
                {repo.stars}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="h-4 w-4 text-cyan-400" />
                {repo.forks}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
