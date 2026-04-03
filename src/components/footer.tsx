import Link from "next/link";
import { GitBranch } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
            <GitBranch className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="font-display font-semibold uppercase tracking-wider text-foreground">
            GitTrack
          </span>
        </Link>

        <p className="font-mono text-xs text-[var(--text-faint)]">
          Built with Next.js and GitHub API
        </p>
      </div>
    </footer>
  );
}
