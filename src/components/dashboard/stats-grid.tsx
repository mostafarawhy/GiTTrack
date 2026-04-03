import { FolderKanban, Star, GitFork, Code2 } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import type { DeveloperProfile } from "@/lib/map-github-user";

type StatsGridProps = {
  developer: DeveloperProfile;
};

export function StatsGrid({ developer }: StatsGridProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Repositories"
        value={developer.publicRepos}
        icon={FolderKanban}
        isPrimary
      />
      <StatCard
        title="Total Stars"
        value={developer.totalStars}
        icon={Star}
      />
      <StatCard
        title="Forks"
        value={developer.totalForks}
        icon={GitFork}
      />
      <StatCard
        title="Top Language"
        value={developer.topLanguage}
        icon={Code2}
      />
    </section>
  );
}
