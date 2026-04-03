import Link from "next/link";
import { GitBranch } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-primary">
            <GitBranch className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-semibold uppercase tracking-wider text-foreground">
            GitTrack
          </span>
        </Link>
      </div>
    </header>
  );
}
