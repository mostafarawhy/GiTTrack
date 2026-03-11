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
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-16">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-cyan/15 blur-[120px]" />
          <div className="absolute right-1/3 top-1/2 h-[300px] w-[300px] rounded-full bg-neon-purple/10 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-5 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-neon-cyan shadow-[0_0_8px_2px] shadow-neon-cyan/50" />
            <span className="text-sm font-medium text-muted-foreground">
              Developer Analytics Platform
            </span>
          </div>

          <div className="mb-8 flex items-center justify-center gap-2">
            <div className="h-0.5 w-16 rounded-full bg-gradient-to-r from-transparent via-neon-cyan to-neon-cyan" />
            <div className="h-0.5 w-16 rounded-full bg-gradient-to-r from-neon-purple to-transparent" />
          </div>

          <h1 className="mb-6 text-balance text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Analyze GitHub
            <br />
            <span className="text-neon-cyan">Developer Activity</span>
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Gain deep insights into any GitHub profile. Track repositories,
            analyze language usage, and discover developer patterns with
            powerful analytics.
          </p>

          <form onSubmit={handleSubmit} className="mx-auto max-w-lg">
            <div className="relative flex items-center rounded-xl bg-gradient-to-r from-neon-cyan/50 via-neon-purple/50 to-neon-purple/50 p-[1px]">
              <div className="flex w-full items-center rounded-xl bg-card">
                <div className="flex items-center pl-4">
                  <Globe className="h-5 w-5 text-neon-purple" />
                </div>

                <input
                  type="text"
                  placeholder="Enter GitHub username or Link ..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="h-14 flex-1 bg-transparent px-4 text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                />

                <div className="pr-2">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="h-10 gap-2 rounded-lg bg-card px-5 text-foreground hover:bg-muted"
                  >
                    {loading ? "Checking..." : "Analyze Developer"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </form>

          <p className="mt-6 text-sm text-muted-foreground">
            Free to use. No account required.
          </p>

          <DashboardPreview />
        </div>
      </section>

      <Dialog open={invalidOpen} onOpenChange={setInvalidOpen}>
        <DialogContent className="border-white/10 bg-zinc-950 text-white sm:max-w-md">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-0 h-36 w-36 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-36 w-36 rounded-full bg-purple-500/10 blur-3xl" />
          </div>

          <div className="relative z-10">
            <DialogHeader className="space-y-3 text-left">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-red-500/15 p-3 text-red-300">
                  <AlertTriangle className="h-5 w-5" />
                </div>

                <div>
                  <DialogTitle className="text-xl font-semibold">
                    Invalid GitHub User
                  </DialogTitle>
                  <p className="text-sm text-white/55">
                    Oops — that GitHub username could not be found.
                  </p>
                </div>
              </div>
            </DialogHeader>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/75">
              Please check the username or profile link and try again.
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
