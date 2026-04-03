import type { DeveloperProfile } from "@/lib/map-github-user";
import { ProfileAnalysisModal } from "@/components/dashboard/profile-analysis-modal";

type DashboardTopBarProps = {
  developer: DeveloperProfile;
};

export function DashboardTopBar({ developer }: DashboardTopBarProps) {
  return (
    <section className="rounded border border-border bg-card p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <p className="font-mono text-xs text-[var(--text-faint)]">
            Viewing dashboard for
          </p>
          <p className="truncate font-mono text-base text-foreground">
            @{developer.username}
          </p>
        </div>

        <div className="flex flex-wrap justify-end gap-3">
          <ProfileAnalysisModal developer={developer} />
        </div>
      </div>
    </section>
  );
}
