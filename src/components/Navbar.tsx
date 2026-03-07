import Link from "next/link";
import { GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <GitBranch className="h-4 w-4 text-accent-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight">GitTrack</span>
        </Link>

        <nav className="flex items-center gap-1">
          <Button variant="ghost" size="sm" asChild>
            <Link href="#dashboard">Dashboard</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Button>
          <Button size="sm" className="ml-2">
            Get Started
          </Button>
        </nav>
      </div>
    </header>
  );
}
