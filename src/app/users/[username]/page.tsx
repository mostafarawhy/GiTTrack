import { DashboardNavbar } from "@/src/components/dashboard/dashboard-navbar";
import { ProfileHeader } from "@/src/components/dashboard/profile-header";
import { StatsGrid } from "@/src/components/dashboard/stats-grid";
import { mockDeveloper } from "@/src/lib/mock-user";

type UserDashboardPageProps = {
  params: Promise<{
    username: string;
  }>;
};

export default async function UserDashboardPage({
  params,
}: UserDashboardPageProps) {
  const { username } = await params;

  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardNavbar />

      <main className="relative">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-40 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
          <div className="absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-purple-500/10 blur-[140px]" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10">
          <div className="rounded-full border border-cyan-400/20 bg-white/5 px-4 py-2 text-sm text-white/60 backdrop-blur-xl w-fit">
            Viewing dashboard for{" "}
            <span className="text-cyan-300">@{username}</span>
          </div>

          <ProfileHeader developer={{ ...mockDeveloper, username }} />

          <StatsGrid developer={{ ...mockDeveloper, username }} />
        </div>
      </main>
    </div>
  );
}
