import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitFork, Star, GitCommit, Code } from "lucide-react";

const stats = [
  { label: "Repositories", value: "42", icon: Code, change: "+3" },
  { label: "Total Stars", value: "1.2k", icon: Star, change: "+128" },
  { label: "Forks", value: "328", icon: GitFork, change: "+24" },
  { label: "Commits", value: "2.4k", icon: GitCommit, change: "+156" },
];

const languages = [
  { name: "TypeScript", percentage: 45, color: "bg-neon-cyan" },
  { name: "JavaScript", percentage: 25, color: "bg-neon-purple" },
  { name: "Python", percentage: 15, color: "bg-neon-violet" },
  { name: "Go", percentage: 10, color: "bg-chart-4" },
  { name: "Other", percentage: 5, color: "bg-muted-foreground" },
];

const recentRepos = [
  { name: "next-app", stars: 234, language: "TypeScript" },
  { name: "api-server", stars: 156, language: "Go" },
  { name: "ml-toolkit", stars: 89, language: "Python" },
];

export function DashboardPreview() {
  return (
    <section id="dashboard" className="relative px-6 py-24">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-purple/8 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Dashboard Preview
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            See how GitTrack visualizes developer data at a glance.
          </p>
        </div>

        <div className="rounded-2xl border border-border/50 bg-card/40 p-6 backdrop-blur-sm">
          {/* Stats Grid */}
          <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card
                key={stat.label}
                className="border-border/50 bg-background/70"
              >
                <CardContent className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neon-cyan/10">
                      <stat.icon className="h-4 w-4 text-neon-cyan" />
                    </div>
                    <span className="text-xs font-medium text-neon-cyan">
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Language Distribution */}
            <Card className="border-border/50 bg-background/70">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
                  <Code className="h-4 w-4 text-neon-cyan" />
                  Language Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {languages.map((lang) => (
                  <div key={lang.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">
                        {lang.name}
                      </span>
                      <span className="text-muted-foreground">
                        {lang.percentage}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted/50">
                      <div
                        className={`h-full rounded-full ${lang.color}`}
                        style={{ width: `${lang.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Repositories */}
            <Card className="border-border/50 bg-background/70">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
                  <Star className="h-4 w-4 text-neon-cyan" />
                  Top Repositories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentRepos.map((repo, index) => (
                  <div
                    key={repo.name}
                    className="flex items-center justify-between rounded-lg border border-border/50 bg-card/50 p-3 transition-colors hover:bg-card"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neon-cyan/10 text-sm font-semibold text-neon-cyan">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-foreground">
                          {repo.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {repo.language}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-3.5 w-3.5 text-neon-cyan" />
                      <span className="text-foreground">{repo.stars}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
