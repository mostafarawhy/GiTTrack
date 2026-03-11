import type { DeveloperProfile } from "@/lib/map-github-user";
import { ProfileAnalysisModal } from "@/components/dashboard/profile-analysis-modal";

type DashboardTopBarProps = {
  developer: DeveloperProfile;
};

export function DashboardTopBar({ developer }: DashboardTopBarProps) {
  return (
    <section className="rounded-2xl border border-cyan-400/20 bg-white/5 p-4 backdrop-blur-xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <p className="text-sm text-white/60">Viewing dashboard for</p>
          <p className="truncate text-lg font-semibold text-cyan-300">
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
