import Link from "next/link";
import { GitBranch } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple">
            <GitBranch className="h-4 w-4 text-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            GitTrack
          </span>
        </Link>
      </div>
    </header>
  );
}
