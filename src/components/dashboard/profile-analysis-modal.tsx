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
    enabled: true,
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
          className="rounded bg-primary px-4 font-mono text-xs uppercase tracking-widest text-primary-foreground hover:bg-primary/90"
        >
          <Sparkles className="mr-2 h-3.5 w-3.5" />
          {isReady ? `Check AI Analysis` : `Analyze Profile`}
        </Button>

        {isFetching && (
          <span className="inline-flex items-center gap-1.5 rounded border border-border bg-secondary px-3 py-1 font-mono text-xs text-muted-foreground">
            <Loader2 className="h-3 w-3 animate-spin" />
            Analyzing...
          </span>
        )}

        {isReady && (
          <span className="inline-flex items-center gap-1.5 rounded border border-border bg-secondary px-3 py-1 font-mono text-xs text-[var(--text-secondary)]">
            <CheckCircle2 className="h-3 w-3 text-primary" />
            AI Analysis Ready
          </span>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-card border border-border rounded p-0 sm:max-w-3xl">
          <div className="flex max-h-[80vh] flex-col">
            <div className="border-b border-border px-6 py-5">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="rounded bg-secondary border border-border p-2">
                    <Sparkles className="h-4 w-4 text-muted-foreground" />
                  </div>
                  AI Summary &amp; Profile Analysis
                </DialogTitle>
              </DialogHeader>
            </div>

            <div className="overflow-y-auto px-6 py-5">
              {(isLoading || isFetching) && !analysis && (
                <div className="rounded border border-border bg-secondary p-5 font-mono text-sm text-muted-foreground">
                  Generating analysis...
                </div>
              )}

              {isError && (
                <div className="rounded border border-destructive/20 bg-destructive/10 p-5 font-mono text-sm text-destructive">
                  Could not generate AI analysis right now.
                </div>
              )}

              {analysis && (
                <div className="space-y-4">
                  <section className="rounded-r border-l-2 border-l-primary border-t border-r border-b border-border bg-secondary p-5">
                    <div className="mb-3">
                      <span className="rounded border border-border bg-muted px-3 py-1 font-mono text-xs text-muted-foreground">
                        AI Summary
                      </span>
                    </div>
                    <p className="font-mono text-sm leading-7 text-[var(--text-secondary)]">
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

            <div className="border-t border-border px-6 py-4">
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={handleRegenerate}
                  disabled={isFetching}
                  className="rounded border-border bg-secondary font-mono text-xs text-[var(--text-secondary)] hover:bg-muted hover:text-foreground"
                >
                  <RefreshCcw className="mr-2 h-3.5 w-3.5" />
                  Regenerate
                </Button>
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
    <section className="rounded border border-border bg-secondary p-5">
      <h3 className="mb-4 font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </h3>

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item}
            className="rounded border border-border bg-card px-4 py-3 font-mono text-sm leading-6 text-[var(--text-secondary)]"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
