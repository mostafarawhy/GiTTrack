"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { DeveloperProfile } from "@/lib/map-github-user";

type LanguageDistributionCardProps = {
  developer: DeveloperProfile;
};

const COLORS = ["#22d3ee", "#a855f7", "#06b6d4", "#c084fc", "#2dd4bf"];

export function LanguageDistributionCard({
  developer,
}: LanguageDistributionCardProps) {
  const hasLanguages = developer.languages.length > 0;

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">
          Language Distribution
        </h3>
        <p className="text-sm text-white/50">
          Breakdown of detected repository languages
        </p>
      </div>

      {!hasLanguages ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-sm text-white/60">
          No language data available.
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={developer.languages}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={3}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth={1}
                >
                  {developer.languages.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    background: "rgba(10, 10, 10, 0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {developer.languages.map((lang, index) => (
              <div
                key={lang.name}
                className="rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="font-medium text-white">{lang.name}</span>
                  </div>

                  <span className="text-sm text-white/60">{lang.value}%</span>
                </div>

                <div className="h-2 rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${lang.value}%`,
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
