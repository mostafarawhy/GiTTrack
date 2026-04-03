import Link from "next/link";
import { Github } from "lucide-react";
import { ExportAnalysisPdfButton } from "@/components/dashboard/export-analysis-pdf-button";

type DashboardNavbarProps = {
  username: string;
};

export function DashboardNavbar({ username }: DashboardNavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
            <Github className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-semibold uppercase tracking-wider text-foreground">
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
