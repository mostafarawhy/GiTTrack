import { Sparkles, ScanSearch, FilePenLine } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AiActionsSection() {
  return (
    <section className="rounded border border-border bg-card p-6">
      <div className="mb-5">
        <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          AI Actions
        </h3>
        <p className="font-mono text-xs text-[var(--text-faint)] mt-1">
          Future-facing tools for profile analysis and content improvement
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Button className="h-10 justify-start rounded bg-primary font-mono text-xs uppercase tracking-widest text-primary-foreground hover:bg-primary/90">
          <Sparkles className="mr-2 h-4 w-4" />
          Generate AI Summary
        </Button>

        <Button
          variant="outline"
          className="h-10 justify-start rounded border-border bg-secondary font-mono text-xs text-[var(--text-secondary)] hover:bg-muted hover:text-foreground"
        >
          <ScanSearch className="mr-2 h-4 w-4" />
          Analyze Profile
        </Button>

        <Button
          variant="outline"
          className="h-10 justify-start rounded border-border bg-secondary font-mono text-xs text-[var(--text-secondary)] hover:bg-muted hover:text-foreground"
        >
          <FilePenLine className="mr-2 h-4 w-4" />
          Improve Repo Description
        </Button>
      </div>
    </section>
  );
}
