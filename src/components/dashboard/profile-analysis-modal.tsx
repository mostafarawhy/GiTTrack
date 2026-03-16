"use client";

import { useState } from "react";
import { Sparkles, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DeveloperProfile } from "@/lib/map-github-user";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ProfileAnalysisModalProps = {
  developer: DeveloperProfile;
};

type AIAnalysis = {
  summary: string;
  strengths: string[];
  patterns: string[];
  stackFocus: string[];
};

export function ProfileAnalysisModal({ developer }: ProfileAnalysisModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [error, setError] = useState("");

  const generateAnalysis = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/profile-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ developer }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate analysis");
      }

      const data = await res.json();
      setAnalysis(data);
    } catch (err) {
      console.error(err);
      setError("Could not generate AI analysis right now.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = async (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (nextOpen && !analysis && !loading) {
      await generateAnalysis();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="h-11 rounded-xl bg-cyan-400 px-4 text-black hover:bg-cyan-300">
          <Sparkles className="mr-2 h-4 w-4" />
          Generate AI Summary and Analyze Profile
        </Button>
      </DialogTrigger>

      <DialogContent className="border-white/10 bg-zinc-950 p-0 text-white sm:max-w-3xl">
        <div className="relative overflow-hidden rounded-2xl">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />
          </div>

          <div className="relative z-10 flex max-h-[80vh] flex-col">
            <div className="border-b border-white/10 px-6 py-5">
              <DialogHeader className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-cyan-400/15 p-3 text-cyan-300">
                    <Sparkles className="h-5 w-5" />
                  </div>

                  <div>
                    <DialogTitle className="text-2xl font-semibold tracking-tight">
                      AI Summary & Profile Analysis
                    </DialogTitle>
                    <p className="text-sm text-white/50">
                      Generated from live dashboard signals.
                    </p>
                  </div>
                </div>
              </DialogHeader>
            </div>

            <div className="overflow-y-auto px-6 py-5">
              {loading && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white/70">
                  Generating analysis please wait it might take a minute...
                </div>
              )}

              {error && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-red-200">
                  {error}
                </div>
              )}

              {analysis && !loading && (
                <div className="space-y-5">
                  <section className="rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-cyan-400/10 via-white/5 to-purple-500/10 p-5 backdrop-blur-xl">
                    <div className="mb-3">
                      <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                        AI Summary
                      </span>
                    </div>

                    <p className="text-sm leading-7 text-white/80">
                      {analysis.summary}
                    </p>
                  </section>

                  <div className="grid gap-4 md:grid-cols-2">
                    <AnalysisCard
                      title="Strengths"
                      items={analysis.strengths}
                    />
                    <AnalysisCard title="Patterns" items={analysis.patterns} />
                    <div className="md:col-span-2">
                      <AnalysisCard
                        title="Stack Focus"
                        items={analysis.stackFocus}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-white/10 px-6 py-4">
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={generateAnalysis}
                  disabled={loading}
                  className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Regenerate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AnalysisCard({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-cyan-300">
        {title}
      </h3>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/75"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
