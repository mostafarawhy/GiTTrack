import { ExternalLink, Users, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DeveloperProfile } from "@/src/lib/mock-user";

type ProfileHeaderProps = {
  developer: DeveloperProfile;
};

export function ProfileHeader({ developer }: ProfileHeaderProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(34,211,238,0.06)] backdrop-blur-xl">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex gap-4">
          <img
            src={developer.avatarUrl}
            alt={developer.name}
            className="h-20 w-20 rounded-2xl border border-white/10 object-cover"
          />

          <div className="space-y-2">
            <div>
              <h1 className="text-2xl font-bold text-white md:text-3xl">
                {developer.name}
              </h1>
              <p className="text-sm text-cyan-300">@{developer.username}</p>
            </div>

            <p className="max-w-2xl text-sm leading-6 text-white/70">
              {developer.bio}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-white/60">
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 text-cyan-300" />
                {developer.followers} followers
              </span>
              <span>{developer.following} following</span>
              <span className="flex items-center gap-2">
                <FolderGit2 className="h-4 w-4 text-purple-300" />
                {developer.publicRepos} public repos
              </span>
            </div>
          </div>
        </div>

        <Button
          asChild
          className="rounded-xl bg-white text-black hover:bg-white/90"
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
