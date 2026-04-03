import type { DeveloperProfile } from "@/lib/map-github-user";

type LanguageDistributionCardProps = {
  developer: DeveloperProfile;
};

const KNOWN_LANGUAGE_COLORS: Record<string, string> = {
  JavaScript:  "#c8f135",
  TypeScript:  "#5b9cf6",
  CSS:         "#e96b7e",
  HTML:        "#f0a04b",
  Python:      "#7b8ff5",
  Rust:        "#e8845a",
  Go:          "#5dbfb0",
  Java:        "#e06c5a",
  Ruby:        "#d45e6e",
  "C++":       "#9b72cf",
  C:           "#7a9ecf",
  Shell:       "#8fbc8f",
  Swift:       "#f5855a",
  Kotlin:      "#a97de8",
  PHP:         "#9b7fcf",
  Dart:        "#5bc8e8",
  Vue:         "#8fda8f",
  Svelte:      "#e87060",
  Scala:       "#d47060",
};

const FALLBACK_COLOR_POOL = [
  "#c8a0e8",
  "#e8c87a",
  "#7ad4e8",
  "#e8a07a",
  "#a0e8c8",
  "#e87ab0",
  "#b0c8e8",
  "#d4e87a",
  "#e8b07a",
  "#7ab0e8",
];

function getLanguageColor(lang: string): string {
  if (KNOWN_LANGUAGE_COLORS[lang]) return KNOWN_LANGUAGE_COLORS[lang];
  const charSum = lang.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return FALLBACK_COLOR_POOL[charSum % FALLBACK_COLOR_POOL.length];
}

export function LanguageDistributionCard({
  developer,
}: LanguageDistributionCardProps) {
  const hasLanguages = developer.languages.length > 0;

  return (
    <section className="rounded border border-border bg-card p-6">
      <div className="mb-6">
        <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Language Distribution
        </h2>
        <p className="font-mono text-xs text-[var(--text-faint)] mt-1">
          breakdown of detected repository languages
        </p>
      </div>

      {!hasLanguages ? (
        <div className="rounded border border-border bg-secondary p-6 font-mono text-sm text-muted-foreground">
          No language data available.
        </div>
      ) : (
        <div className="space-y-4">
          {developer.languages.map((lang) => {
            const color = getLanguageColor(lang.name);
            const pct = lang.value.toFixed(1);
            return (
              <div key={lang.name} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: color }}
                    />
                    <span className="font-mono text-sm text-[var(--text-secondary)]">
                      {lang.name}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    {pct}%
                  </span>
                </div>
                <div className="h-[3px] w-full bg-secondary">
                  <div
                    className="h-[3px]"
                    style={{ width: `${pct}%`, background: color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
