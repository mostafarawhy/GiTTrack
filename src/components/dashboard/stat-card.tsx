import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  isPrimary?: boolean;
};

export function StatCard({ title, value, icon: Icon, isPrimary }: StatCardProps) {
  return (
    <div className="rounded border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="rounded bg-secondary border border-border p-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            isPrimary
              ? "bg-primary"
              : "border border-border bg-secondary"
          }`}
        />
      </div>

      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {title}
      </p>
      <p className="mt-1 font-display text-4xl font-semibold text-foreground">
        {value}
      </p>
    </div>
  );
}
