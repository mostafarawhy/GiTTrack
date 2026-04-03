import { Sparkles } from "lucide-react";
import type { DeveloperProfile } from "@/lib/map-github-user";

type DeveloperInsightsCardProps = {
  developer: DeveloperProfile;
};

export function DeveloperInsightsCard({
  developer,
}: DeveloperInsightsCardProps) {
  return (
    <section className="rounded-r border-l-2 border-l-primary border-t border-r border-b border-border bg-card p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded bg-secondary border border-border p-2">
          <Sparkles className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Developer Insights
          </h3>
          <p className="font-mono text-xs text-[var(--text-faint)]">
            AI-ready interpretation layer
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {developer.insights.map((insight) => (
          <div
            key={insight}
            className="flex items-start gap-3 rounded border border-border bg-secondary px-4 py-3"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <p className="font-mono text-sm leading-6 text-[var(--text-secondary)]">
              {insight}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
