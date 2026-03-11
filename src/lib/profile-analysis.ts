import type { DeveloperProfile } from "@/lib/map-github-user";

export type StructuredProfileAnalysis = {
  strengths: string[];
  patterns: string[];
  stackFocus: string[];
};

function getTopRepoName(developer: DeveloperProfile): string {
  const sorted = [...developer.repositories].sort((a, b) => b.stars - a.stars);
  return sorted[0]?.name ?? "their public repositories";
}

function getTopLanguages(developer: DeveloperProfile): string[] {
  return developer.languages.map((lang) => lang.name).slice(0, 4);
}

export function generateProfileSummary(
  developer: DeveloperProfile,
  variant = 0,
): string {
  const topRepo = getTopRepoName(developer);

  const intros = [
    `${developer.name} appears to have a practical developer profile with a visible focus on ${developer.topLanguage}-based work.`,
    `${developer.name}'s public GitHub presence suggests a builder-oriented profile centered around ${developer.topLanguage} and project execution.`,
    `${developer.name} shows a product-driven development pattern, with visible public work and repeated use of ${developer.topLanguage}.`,
  ];

  const middles = [
    `The dashboard shows ${developer.publicRepos} public repositories, ${developer.totalStars} total stars, and ${developer.totalForks} total forks, indicating active experimentation and public implementation.`,
    `With ${developer.publicRepos} repositories and measurable engagement across projects, the profile reflects consistent project-based growth and visible technical effort.`,
    `The public repository set suggests a developer who learns and demonstrates skill through building complete projects rather than isolated snippets.`,
  ];

  const endings = [
    `The strongest repository signal appears around ${topRepo}, while the overall language mix points toward a clear technical direction.`,
    `The overall activity pattern suggests an engineer building toward stronger frontend and product engineering capability, with ${topRepo} acting as one representative project.`,
    `Taken together, the profile looks like a solid foundation for a modern application-focused developer, especially in projects like ${topRepo}.`,
  ];

  return `${intros[variant % intros.length]} ${middles[variant % middles.length]} ${endings[variant % endings.length]}`;
}

export function generateStructuredProfileAnalysis(
  developer: DeveloperProfile,
  variant = 0,
): StructuredProfileAnalysis {
  const topRepo = getTopRepoName(developer);
  const topLanguages = getTopLanguages(developer);

  const strengthsSets = [
    [
      `Clear visible focus on ${developer.topLanguage}-based development.`,
      `Public repository history shows repeated project-building effort.`,
      `${topRepo} stands out as a useful signal of hands-on implementation.`,
    ],
    [
      `Strong technical direction around ${developer.topLanguage} and modern application development.`,
      `The repository set gives recruiters visible proof of practical work.`,
      `The profile suggests consistent learning through building and shipping projects.`,
    ],
  ];

  const patternSets = [
    [
      `Repository activity suggests a preference for practical projects over abstract experiments.`,
      `Language usage is concentrated rather than random, which usually indicates stronger stack focus.`,
      `The profile appears shaped by iterative project work and portfolio-style development.`,
    ],
    [
      `The public work shows recurring effort around building usable software.`,
      `The dashboard points to a repeated pattern of application-oriented implementation.`,
      `The project history suggests learning through progressively more complete builds.`,
    ],
  ];

  const stackFocusSets = [
    [
      `Primary stack direction: ${developer.topLanguage}`,
      `Most visible languages: ${topLanguages.join(", ")}`,
      `Likely strength area: frontend/product-style engineering`,
    ],
    [
      `Core technical center: ${developer.topLanguage}`,
      `Supporting language mix: ${topLanguages.join(", ")}`,
      `Profile emphasis: application-focused web development`,
    ],
  ];

  return {
    strengths: strengthsSets[variant % strengthsSets.length],
    patterns: patternSets[variant % patternSets.length],
    stackFocus: stackFocusSets[variant % stackFocusSets.length],
  };
}
