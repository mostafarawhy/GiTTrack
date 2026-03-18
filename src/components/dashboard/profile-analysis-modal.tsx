"use client";

import { useState } from "react";
import { Sparkles, RefreshCcw, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DeveloperProfile } from "@/lib/map-github-user";
import { fetchProfileAnalysis } from "@/lib/fetch-profile-analysis";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ProfileAnalysisModalProps = {
  developer: DeveloperProfile;
};

export function ProfileAnalysisModal({ developer }: ProfileAnalysisModalProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const queryKey = ["profile-analysis", developer.username];

  const {
    data: analysis,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: () => fetchProfileAnalysis(developer),
    enabled: true, // fetching starts immediately when component mounts
  });

  const handleRegenerate = async () => {
    await queryClient.invalidateQueries({ queryKey });
    await refetch();
  };

  const isReady = !!analysis && !isFetching;

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => setOpen(true)}
          className="h-11 rounded-xl bg-cyan-400 px-4 text-black hover:bg-cyan-300"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          {isReady ? `Check AI Analysis` : `Analyze Profile`}
        </Button>

        {isFetching && (
          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Analyzing...
          </span>
        )}

        {isReady && (
          <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">
            <CheckCircle2 className="h-3.5 w-3.5" />
            AI Ready
          </span>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-white/10 bg-zinc-950 p-0 text-white sm:max-w-3xl">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />
            </div>

            <div className="relative z-10 flex max-h-[80vh] flex-col">
              <div className="border-b border-white/10 px-6 py-5">
                <DialogHeader className="space-y-3 text-left">
                  <DialogTitle className="flex items-center gap-3 text-2xl font-semibold tracking-tight">
                    <div className="rounded-2xl bg-cyan-400/15 p-3 text-cyan-300">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    AI Summary & Profile Analysis
                  </DialogTitle>
                </DialogHeader>
              </div>

              <div className="overflow-y-auto px-6 py-5">
                {(isLoading || isFetching) && !analysis && (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white/70">
                    Generating analysis...
                  </div>
                )}

                {isError && (
                  <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-red-200">
                    Could not generate AI analysis right now.
                  </div>
                )}

                {analysis && (
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
                      <AnalysisCard
                        title="Patterns"
                        items={analysis.patterns}
                      />
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
                    onClick={handleRegenerate}
                    disabled={isFetching}
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
    </>
  );
}

function AnalysisCard({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-cyan-300">
        {title}
      </h3>

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-xl bg-black/20 px-4 py-3 text-sm leading-6 text-white/75 ring-1 ring-white/5"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
