import Link from "next/link";
import { GitBranch } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/30 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-neon-cyan to-neon-purple">
            <GitBranch className="h-3.5 w-3.5 text-foreground" />
          </div>
          <span className="font-semibold text-foreground">GitTrack</span>
        </Link>

        <p className="text-sm text-muted-foreground">
          Built with Next.js and GitHub API
        </p>
      </div>
    </footer>
  );
}
