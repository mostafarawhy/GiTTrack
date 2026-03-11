import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { ProfileHeader } from "@/components/dashboard/profile-header";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { AnalyticsGrid } from "@/components/dashboard/analytics-grid";
import { RepositoryTable } from "@/components/dashboard/repository-table";
import { DeveloperInsightsCard } from "@/components/dashboard/developer-insights-card";
import { getUser, getUserRepos } from "@/lib/github";
import { mapGitHubDataToDeveloper } from "@/lib/map-github-user";
import { DashboardTopBar } from "@/components/dashboard/dashboard-top-bar";

type UserDashboardPageProps = {
  params: Promise<{ username: string }>;
};

export default async function UserDashboardPage({
  params,
}: UserDashboardPageProps) {
  const { username } = await params;
  const user = await getUser(username);
  const repos = await getUserRepos(username);
  const developer = mapGitHubDataToDeveloper(user, repos);

  return (
    <div id="dashboard-export" className="min-h-screen bg-black text-white">
      <DashboardNavbar username={developer.username} />
      <main className="relative">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-40 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
          <div className="absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-purple-500/10 blur-[140px]" />
        </div>
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10">
          <DashboardTopBar developer={developer} />
          <ProfileHeader developer={developer} />
          <StatsGrid developer={developer} />
          <AnalyticsGrid developer={developer} />
          <RepositoryTable developer={developer} />
          <DeveloperInsightsCard developer={developer} />
        </div>
      </main>
    </div>
  );
}
