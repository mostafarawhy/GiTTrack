import {
  Github,
  Star,
  GitFork,
  Code2,
  FolderKanban,
  Users,
} from "lucide-react";

export function DashboardPreview() {
  const stats = [
    { title: "Repos",  value: "26",  icon: FolderKanban },
    { title: "Stars",  value: "312", icon: Star },
    { title: "Forks",  value: "58",  icon: GitFork },
    { title: "Top",    value: "TS",  icon: Code2 },
  ];

  const languages = [
    { name: "TypeScript", value: 45, color: "var(--color-lang-ts)" },
    { name: "JavaScript", value: 30, color: "var(--color-lang-js)" },
    { name: "CSS",        value: 15, color: "var(--color-lang-css)" },
    { name: "HTML",       value: 10, color: "var(--color-lang-html)" },
  ];

  const repos = [
    { name: "gittrack",    language: "TypeScript", stars: 42 },
    { name: "dermatique",  language: "JavaScript", stars: 96 },
    { name: "foodies-hub", language: "JavaScript", stars: 71 },
  ];

  return (
    <div className="mx-auto mt-14 w-full max-w-6xl overflow-hidden rounded border border-border bg-card">
      {/* Mini navbar */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3 md:px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
            <Github className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              GitTrack
            </p>
            <p className="font-mono text-[10px] text-[var(--text-faint)]">
              Developer Analytics
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <span className="font-mono text-xs text-[var(--text-faint)]">Dashboard</span>
          <span className="font-mono text-xs text-[var(--text-faint)]">Insights</span>
        </div>
      </div>

      <div className="space-y-4 p-4 md:p-5">
        {/* Top bar */}
        <div className="flex flex-col gap-3 rounded border border-border bg-secondary p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-xs text-[var(--text-faint)]">
              Viewing dashboard for
            </p>
            <p className="font-mono text-sm text-foreground">@mostafarawhy</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="rounded bg-primary px-3 py-1.5 font-mono text-xs font-medium uppercase tracking-widest text-primary-foreground">
              Generate Summary
            </div>
            <div className="rounded border border-border px-3 py-1.5 font-mono text-xs text-[var(--text-secondary)]">
              Analyze Profile
            </div>
          </div>
        </div>

        {/* Profile */}
        <div className="rounded border border-border bg-secondary p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex gap-4">
              <div className="h-14 w-14 rounded border border-border bg-muted" />

              <div className="space-y-2">
                <div>
                  <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-foreground">
                    Mostafa Rawhy
                  </h3>
                  <p className="font-mono text-xs text-[var(--text-secondary)]">
                    @mostafarawhy
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <span className="flex items-center gap-1.5 font-mono text-xs text-[var(--text-faint)]">
                    <Users className="h-3 w-3" />
                    128 followers
                  </span>
                  <span className="font-mono text-xs text-[var(--text-faint)]">
                    74 following
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-xs text-[var(--text-faint)]">
                    <FolderKanban className="h-3 w-3" />
                    26 repos
                  </span>
                </div>
              </div>
            </div>

            <div className="w-fit rounded border border-border px-3 py-1.5 font-mono text-xs text-[var(--text-secondary)]">
              View GitHub
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="rounded border border-border bg-secondary p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {stat.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="rounded bg-muted border border-border p-1.5">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-primary" : "border border-border bg-secondary"}`}
                    />
                  </div>
                </div>
                <p className="font-display text-3xl font-semibold text-foreground">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Analytics */}
        <div className="grid gap-4 xl:grid-cols-2">
          {/* Language distribution */}
          <div className="rounded border border-border bg-secondary p-4">
            <div className="mb-4">
              <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Language Distribution
              </h4>
              <p className="font-mono text-xs text-[var(--text-faint)]">
                breakdown of detected repository languages
              </p>
            </div>

            <div className="space-y-3">
              {languages.map((lang) => (
                <div key={lang.name}>
                  <div className="mb-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: lang.color }}
                      />
                      <span className="font-mono text-xs text-[var(--text-secondary)]">
                        {lang.name}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      {lang.value}%
                    </span>
                  </div>
                  <div className="h-[3px] w-full bg-muted">
                    <div
                      className="h-[3px]"
                      style={{ width: `${lang.value}%`, background: lang.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top repos */}
          <div className="rounded border border-border bg-secondary p-4">
            <div className="mb-4">
              <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Top Repositories
              </h4>
              <p className="font-mono text-xs text-[var(--text-faint)]">
                highest-impact projects
              </p>
            </div>

            <div className="space-y-3">
              {repos.map((repo) => (
                <div
                  key={repo.name}
                  className="rounded border border-border bg-card p-3"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-mono text-sm text-[var(--text-secondary)]">
                      {repo.name}
                    </p>
                    <span className="font-mono text-xs text-primary">
                      {repo.language}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                      <Star className="h-3 w-3" />
                      {repo.stars}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
