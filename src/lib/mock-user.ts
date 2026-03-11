//testing. 

export type Repository = {
  id: number;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  updatedAt: string;
};

export type LanguageStat = {
  name: string;
  value: number;
};

export type DeveloperProfile = {
  name: string;
  username: string;
  avatarUrl: string;
  bio: string;
  followers: number;
  following: number;
  publicRepos: number;
  totalStars: number;
  totalForks: number;
  topLanguage: string;
  githubUrl: string;
  repositories: Repository[];
  languages: LanguageStat[];
  insights: string[];
};

export const mockDeveloper: DeveloperProfile = {
  name: "Mostafa Rawhy",
  username: "rawhydev",
  avatarUrl: "https://avatars.githubusercontent.com/u/583231?v=4",
  bio: "Frontend developer building modern interfaces with React, Next.js, and analytics-driven UX.",
  followers: 128,
  following: 74,
  publicRepos: 26,
  totalStars: 312,
  totalForks: 58,
  topLanguage: "TypeScript",
  githubUrl: "https://github.com/rawhydev",
  languages: [
    { name: "TypeScript", value: 45 },
    { name: "JavaScript", value: 30 },
    { name: "CSS", value: 15 },
    { name: "HTML", value: 10 },
  ],
  insights: [
    "Strong focus on frontend-heavy repositories with a TypeScript-first stack.",
    "Best-performing projects combine polished UI with product-style thinking.",
    "Repository activity suggests a preference for practical web applications over experimental repos.",
  ],
  repositories: [
    {
      id: 1,
      name: "gittrack",
      description:
        "Developer analytics dashboard built with Next.js and TypeScript.",
      language: "TypeScript",
      stars: 42,
      forks: 8,
      updatedAt: "2 days ago",
    },
    {
      id: 2,
      name: "dermatique",
      description: "Full-stack skincare e-commerce platform.",
      language: "JavaScript",
      stars: 96,
      forks: 14,
      updatedAt: "1 week ago",
    },
    {
      id: 3,
      name: "foodies-hub",
      description: "Real-time food-sharing social platform using Firebase.",
      language: "JavaScript",
      stars: 71,
      forks: 11,
      updatedAt: "5 days ago",
    },
    {
      id: 4,
      name: "tsp-visualizer",
      description:
        "Distributed genetic algorithm TSP visualizer with real-time collaboration.",
      language: "JavaScript",
      stars: 28,
      forks: 7,
      updatedAt: "3 days ago",
    },
  ],
};
