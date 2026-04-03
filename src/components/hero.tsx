"use client";

import { useState } from "react";
import { Globe, ArrowRight, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { extractGitHubUsername } from "@/utils/helpers";
import { useRouter } from "next/navigation";

import { DashboardPreview } from "@/components/dashboard-preview";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getUser, GitHubUserNotFoundError } from "@/lib/github";

const CODE_SNIPPETS = [
  `interface GitHubUser {
  login: string
  public_repos: number
  followers: number
  created_at: string
}`,
  `type Language = {
  name: string
  percentage: number
  color: string
}`,
  `async function fetchProfile(
  username: string
): Promise<GitHubUser> {
  const res = await fetch(
    \`/api/github/\${username}\`
  )
  return res.json()
}`,
  `const analyzeLanguages = (
  repos: Repository[]
): Language[] => {
  return repos
    .flatMap(r => r.languages)
    .reduce(aggregate, [])
}`,
  `export const LANG_COLORS:
  Record<string, string> = {
  TypeScript: '#5b9cf6',
  JavaScript: '#c8f135',
  CSS: '#e96b7e',
  Python: '#7b8ff5',
}`,
  `type StatCard = {
  label: string
  value: number | string
  icon: LucideIcon
}`,
  `interface Repository {
  name: string
  language: string
  stargazers_count: number
  updated_at: string
  description: string
}`,
  `const getDeveloperScore = (
  user: GitHubUser
): number => {
  return Math.min(
    user.public_repos * 2 +
    user.followers * 3,
    100
  )
}`,
];

function CodeBackground() {
  const columns = [
    { left: "2%", delay: 0, duration: 40 },
    { left: "20%", delay: -14, duration: 47 },
    { left: "38%", delay: -7, duration: 36 },
    { left: "57%", delay: -22, duration: 52 },
    { left: "74%", delay: -11, duration: 43 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes codeScroll {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
        .code-col {
          position: absolute;
          top: 0;
          width: 160px;
          font-family: 'Geist Mono', monospace;
          font-size: 10px;
          line-height: 1.7;
          white-space: pre;
          color: rgba(300, 241, 53, 0.12);
          animation-name: codeScroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          user-select: none;
        }
      `}</style>

      {columns.map((col, i) => {
        const text = Array.from(
          { length: 6 },
          (_, j) => CODE_SNIPPETS[(i * 2 + j) % CODE_SNIPPETS.length],
        ).join("\n\n");

        return (
          <div
            key={i}
            className="code-col"
            style={{
              left: col.left,
              animationDuration: `${col.duration}s`,
              animationDelay: `${col.delay}s`,
            }}
          >
            {text + "\n\n" + text}
          </div>
        );
      })}

      <div
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, #0c0c0c 30%, transparent)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #0c0c0c 30%, transparent)",
        }}
      />
    </div>
  );
}

export function Hero() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [invalidOpen, setInvalidOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userName = extractGitHubUsername(userInput);
      if (!userName) return;

      setLoading(true);

      await getUser(userName);
      router.push(`/users/${userName}`);
    } catch (error) {
      if (error instanceof GitHubUserNotFoundError) {
        setInvalidOpen(true);
        return;
      }

      console.error("Unexpected GitHub lookup error:", error);
      setInvalidOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden flex min-h-screen flex-col items-center justify-center px-6 pt-14">
        <CodeBackground />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded border border-border bg-card px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="font-mono text-xs text-muted-foreground">
              Developer Analytics Platform
            </span>
          </div>

          <h1 className="mb-6 text-balance text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Analyze GitHub
            <br />
            Developer Activity
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-pretty text-lg leading-relaxed text-[var(--text-secondary)]">
            Gain deep insights into any GitHub profile. Track repositories,
            analyze language usage, and discover developer patterns with
            powerful analytics.
          </p>

          <form onSubmit={handleSubmit} className="mx-auto max-w-lg">
            <div className="flex items-center rounded border border-border bg-card">
              <div className="flex items-center pl-4">
                <Globe className="h-4 w-4 text-muted-foreground" />
              </div>

              <input
                type="text"
                placeholder="Enter GitHub username or Link ..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="h-12 flex-1 bg-transparent px-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />

              <div className="pr-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-8 gap-2 bg-primary px-4 font-mono text-xs uppercase tracking-widest text-primary-foreground hover:bg-primary/90"
                >
                  {loading ? "Checking..." : "Analyze"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </form>

          <p className="mt-6 font-mono text-xs text-[var(--text-faint)]">
            Free to use. No account required.
          </p>

          <DashboardPreview />
        </div>
      </section>

      <Dialog open={invalidOpen} onOpenChange={setInvalidOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="rounded bg-destructive/10 p-2 text-destructive">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div>
                <DialogTitle>Invalid GitHub User</DialogTitle>
                <p className="mt-1 font-mono text-xs text-[var(--text-faint)]">
                  That GitHub username could not be found.
                </p>
              </div>
            </div>
          </DialogHeader>

          <div className="rounded border border-border bg-secondary p-4 font-mono text-sm text-[var(--text-secondary)]">
            Please check the username or profile link and try again.
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
