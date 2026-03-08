import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  accent: "cyan" | "purple";
};

export function StatCard({ title, value, icon: Icon, accent }: StatCardProps) {
  const accentClasses =
    accent === "cyan"
      ? "from-cyan-400/20 to-cyan-500/5 text-cyan-300"
      : "from-purple-400/20 to-purple-500/5 text-purple-300";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-white/60">{title}</p>
        <div className={`rounded-xl bg-gradient-to-br p-2 ${accentClasses}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <p className="text-2xl font-bold tracking-tight text-white">{value}</p>
    </div>
  );
}
