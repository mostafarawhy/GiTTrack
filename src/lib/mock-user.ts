export type Repository = {
  id: number
  name: string
  description: string
  language: string
  stars: number
  forks: number
  updatedAt: string
}

export type DeveloperProfile = {
  name: string
  username: string
  avatarUrl: string
  bio: string
  followers: number
  following: number
  publicRepos: number
  totalStars: number
  totalForks: number
  topLanguage: string
  githubUrl: string
  repositories: Repository[]
}

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
  repositories: [
    {
      id: 1,
      name: "gittrack",
      description: "Developer analytics dashboard built with Next.js and TypeScript.",
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
  ],
}