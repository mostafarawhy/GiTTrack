import Link from "next/link";
import { Github } from "lucide-react";
import { ExportAnalysisPdfButton } from "@/components/dashboard/export-analysis-pdf-button";

type DashboardNavbarProps = {
  username: string;
};

export function DashboardNavbar({ username }: DashboardNavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 shadow-[0_0_30px_rgba(34,211,238,0.25)]">
            <Github className="h-5 w-5 text-black" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            GitTrack
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <ExportAnalysisPdfButton username={username} />
        </div>
      </div>
    </header>
  );
}
