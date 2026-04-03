import { ExternalLink, Users, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DeveloperProfile } from "@/lib/map-github-user";
import Image from "next/image";

type ProfileHeaderProps = {
  developer: DeveloperProfile;
};

export function ProfileHeader({ developer }: ProfileHeaderProps) {
  return (
    <section className="rounded border border-border bg-card p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex gap-4">
          <Image
            src={developer.avatarUrl}
            alt={developer.name}
            height={80}
            width={80}
            className="h-20 w-20 rounded border border-border object-cover"
          />

          <div className="space-y-2">
            <div>
              <h1 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground md:text-3xl">
                {developer.name}
              </h1>
              <p className="font-mono text-sm text-[var(--text-secondary)]">
                @{developer.username}
              </p>
            </div>

            <p className="max-w-2xl font-mono text-sm leading-6 text-[var(--text-secondary)]">
              {developer.bio}
            </p>

            <div className="flex flex-wrap gap-4">
              <span className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
                <Users className="h-4 w-4 text-muted-foreground" />
                {developer.followers} followers
              </span>
              <span className="font-mono text-sm text-muted-foreground">
                {developer.following} following
              </span>
              <span className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
                <FolderGit2 className="h-4 w-4 text-muted-foreground" />
                {developer.publicRepos} public repos
              </span>
            </div>
          </div>
        </div>

        <Button
          asChild
          variant="outline"
          className="shrink-0"
        >
          <a href={developer.githubUrl} target="_blank" rel="noreferrer">
            View GitHub
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </section>
  );
}
