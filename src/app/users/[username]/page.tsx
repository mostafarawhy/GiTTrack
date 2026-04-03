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
    <div id="dashboard-export" className="min-h-screen bg-dashboard">
      <DashboardNavbar username={developer.username} />
      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10">
        <DashboardTopBar developer={developer} />
        <ProfileHeader developer={developer} />
        <StatsGrid developer={developer} />
        <AnalyticsGrid developer={developer} />
        <RepositoryTable developer={developer} />
        <DeveloperInsightsCard developer={developer} />
      </main>
    </div>
  );
}
