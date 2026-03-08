import { BarChart3, Code2, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: BarChart3,
    title: "Repository Analytics",
    description:
      "Get detailed insights into repository stats including stars, forks, issues, and commit activity.",
  },
  {
    icon: Code2,
    title: "Language Charts",
    description:
      "Visualize the distribution of programming languages across all repositories with interactive charts.",
  },
  {
    icon: Users,
    title: "Developer Insights",
    description:
      "Understand developer activity patterns, contribution history, and overall GitHub presence.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Powerful Features
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Everything you need to analyze GitHub developer activity and
            repository performance.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group border-border/50 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-neon-cyan/30 hover:bg-card"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-neon-cyan/10 text-neon-cyan transition-colors group-hover:bg-neon-cyan/15">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
