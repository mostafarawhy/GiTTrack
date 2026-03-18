![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/TailwindCSS-4-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)

# **GitTrack** — GitHub developer analytics dashboard, built for clarity

> Turn any GitHub username into a structured, AI-powered developer profile in seconds.

---

## Live Demo & Preview

**Live Demo:** [git-trac-k.vercel.app](https://git-trac-k.vercel.app)

### Landing Page
![Landing Page](./Screenshots/Screenshot%202026-03-11%20at%205.53.22%20AM.png)

### Developer Dashboard
![Dashboard](./Screenshots/Screenshot%202026-03-11%20at%205.53.57%20AM.png)
![Dashboard](./Screenshots/Screenshot%202026-03-11%20at%205.54.08%20AM.png)

### AI Profile Analysis
![AI Analysis](./Screenshots/Screenshot%202026-03-11%20at%205.54.25%20AM.png)

### Exported PDF Report
![PDF Export](./Screenshots/Screenshot%202026-03-11%20at%207.08.08%20AM.png)

---

## Why I Built This

GitHub profiles give you raw data but never synthesize it into something actionable. I wanted to build a tool that transforms a developer's public activity into a structured, readable profile — and use it as a deliberate exercise in clean data architecture: keeping API contracts isolated, UI components pure, and AI output deterministic through strict prompt engineering.

---

## Features

**Username or URL input** — accepts both a raw GitHub handle (`torvalds`) and a full profile URL (`https://github.com/torvalds`). A regex-based extractor in `utils/helpers.ts` normalises both formats before any API call is made, so the user never has to think about it.

**Server-side data fetching with 1-hour ISR caching** — GitHub API calls happen inside a Next.js async server component, not the browser. Responses are cached with `revalidate: 3600`, so repeated visits to the same profile are instant and don't hit the GitHub rate limit.

**Structured data mapping layer** — raw GitHub API responses are never passed directly to UI components. A dedicated transformation module (`lib/map-github-user.ts`) converts them into a typed `DeveloperProfile` domain model, computing language percentages, sorting repositories by stars, summing totals, and generating insights in one centralised place.

**Language distribution donut chart** — built with Recharts `PieChart` with an inner radius, showing each language's share of public repositories as a percentage. Includes a colour-coded legend and hover tooltip, using a five-colour neon palette.

**Top repositories card** — surfaces the four highest-starred repositories with name, description, language tag, star count, and fork count. Sorting happens inside the mapping layer, not in the component.

**Paginated repository table** — lists all public repositories (up to 100, sorted by last updated) with a "Show more" button revealing 10 additional rows at a time. The visible slice is derived with `useMemo` to avoid unnecessary recomputation.

**AI profile analysis modal** — clicking "Analyze Profile" sends the full `DeveloperProfile` to a backend API route, which calls an OpenRouter LLM with a carefully engineered prompt. The response is always a 70–90 word summary, exactly three strengths, three observed development patterns, and three stack focus areas. Results are cached by React Query per username for the session; a regenerate button lets the user force a fresh call.

**PDF export** — clones the `#dashboard-export` DOM node off-screen at a fixed 1800px width, renders it to a high-DPI canvas via `html2canvas-pro` (scale: 2 for print quality), then centres the resulting PNG on an A4 `jsPDF` document with a black background. Saves as `{username}-dashboard.pdf`.

**Invalid username error handling** — if GitHub returns a 404, `lib/github.ts` throws a custom `GitHubUserNotFoundError` class. The Hero component catches it and checks `instanceof GitHubUserNotFoundError` to distinguish a missing user from a real network failure, opening a friendly Dialog instead of crashing or showing a blank page.

**Vercel Analytics** — page views tracked automatically with a single component wrapper in the root layout, zero additional configuration.

---

## Tech Stack

| Technology | Why I chose it |
|---|---|
| **Next.js 15 (App Router)** | Server components let me co-locate data fetching with the route, eliminating client-side waterfalls and keeping GitHub API calls off the browser. The file-system routing maps cleanly to the `/users/[username]` URL structure with zero boilerplate. |
| **React 19** | Stable, production-ready foundation with first-class support for the server/client component model that Next.js 15 builds on. |
| **TypeScript 5 (strict mode)** | Strict mode caught real bugs during development — particularly around the mismatch between GitHub's `stargazers_count` field name and my domain model's `stars` field. It also makes the mapping layer entirely self-documenting. |
| **Tailwind CSS v4** | The v4 PostCSS-first approach removed the need for a `tailwind.config.js` file entirely. Using `oklch` for all custom colours gives perceptually uniform brightness across the neon cyan and purple accent palette. |
| **shadcn/ui + Radix UI** | Accessible, unstyled primitives (Dialog, Slot) that I can compose and style completely with Tailwind. No fighting library CSS specificity or shipping unused component styles. |
| **TanStack React Query v5** | Used specifically for the AI analysis fetch — provides session-scoped caching, loading/error state management, and manual cache invalidation in a pattern that fits async AI calls far better than `useEffect` + `useState`. |
| **Recharts** | Composable, React-native charting library. The `PieChart` + `Cell` API gives fine-grained control over donut chart colours per segment without any wrapper abstraction. |
| **OpenRouter API** | Free-tier access to capable open-source LLMs without a paid OpenAI account. Accepts the exact same interface as the OpenAI SDK — swapping models or providers requires only changing `baseURL` and the key. |
| **OpenAI SDK v6** | Used as the HTTP client for OpenRouter. The chat completions interface handles authentication headers, retries, and streaming cleanly without manual fetch wrappers. |
| **html2canvas-pro + jsPDF** | Client-side PDF generation means no server processing, no file storage, and no cold-start delays. `html2canvas-pro` handles modern CSS (oklch colours, `backdrop-blur`) better than the original `html2canvas`, which was the deciding factor. |
| **lucide-react** | Single, tree-shakeable icon library used everywhere in the project. Keeps the visual language consistent and bundle size predictable. |
| **Vercel Analytics** | Zero-config production analytics — one import in the root layout and it works on deploy. |

---

## Architecture

GitTrack is built in four explicit layers, each with a single responsibility. The boundary between them is enforced by TypeScript types.
```
app/users/[username]/page.tsx        ← Route layer (server component)
         │
         ├── lib/github.ts           ← GitHub API integration
         │
         ├── lib/map-github-user.ts  ← Data transformation / mapping layer
         │
         └── components/dashboard/  ← Modular UI component layer
                  │
                  └── app/api/profile-analysis/route.ts  ← AI analysis layer
```

**Route layer** (`app/users/[username]/page.tsx`) — An async Next.js server component. It is the only place in the entire application that calls the GitHub API and the mapping function. It fetches, transforms, and passes a fully-typed `DeveloperProfile` down as props. No child component is async; no child component talks to GitHub. This keeps the server/client boundary explicit and the data flow unidirectional.

**GitHub API integration** (`lib/github.ts`) — A thin, typed wrapper around two GitHub REST endpoints. It defines `GitHubUser` and `GitHubRepo` as the exact shapes returned by the API, exposes `getUser()` and `getUserRepos()`, and handles HTTP errors with a custom `GitHubUserNotFoundError` class so every caller can distinguish a missing profile from a network failure. ISR caching (`revalidate: 3600`) is set here, close to the fetch call.

**Data transformation / mapping layer** (`lib/map-github-user.ts`) — The most deliberate architectural decision in the project. Raw `GitHubUser` + `GitHubRepo[]` types from the API are never exposed to the UI layer. `mapGitHubDataToDeveloper()` converts them into a `DeveloperProfile` — computing language distribution percentages, sorting top repositories by stars, summing total stars and forks, and generating static insights. If GitHub changes their API response shape, only this file needs updating. Components are completely decoupled from the API contract.

**Modular UI component layer** (`components/dashboard/`) — Each visual section of the dashboard is its own component file. All accept `DeveloperProfile` as their prop. Leaf components like `StatCard` and `AnalysisCard` are purely presentational. The `"use client"` directive appears only where state or browser APIs are required — it's the minority, not the default.

**AI analysis layer** — Three pieces working together: `app/api/profile-analysis/route.ts` (POST handler, prompt engineering, OpenRouter call, JSON parsing), `lib/fetch-profile-analysis.ts` (typed client-side fetcher), and `ProfileAnalysisModal` (React Query integration, UI states). The prompt specifies exact output constraints — word counts, item counts, no markdown — so the JSON is always parseable. A defensive strip of markdown code fences runs before `JSON.parse()` as a fallback.

---

## Key Engineering Challenges

### Case-sensitive import failures on Vercel / Linux

The first deployment to Vercel failed with module-not-found errors that didn't reproduce locally. The cause: macOS's default file system is case-insensitive, so `import ... from '@/components/Dashboard/StatsGrid'` resolved successfully locally even though the actual folder was `dashboard` (lowercase). Linux — Vercel's runtime — is case-sensitive and rejected every mismatched import. Fixed by auditing all import paths and aligning them exactly with the on-disk directory casing.

### shadcn/ui component path configuration

The `components.json` file controls where shadcn generates components and how they reference internal utilities. Getting the `aliases` block wrong caused generated components to import from paths that didn't exist, breaking the build silently. Resolved by explicitly mapping all four aliases — `components`, `utils`, `ui`, `lib` — to their `@/`-prefixed counterparts, matching the path aliases defined in `tsconfig.json`.

### Raw API coupling eliminated by the mapping layer

Early versions passed `GitHubRepo[]` directly to dashboard components, so every component that displayed star counts wrote `repo.stargazers_count` and re-implemented formatting logic independently. Introducing `lib/map-github-user.ts` as an explicit transformation step renamed the property to `repo.stars`, centralised all derived computations, and reduced every component to consuming clean, purpose-built types. The API shape now only exists in one file.

### AI output inconsistency fixed via strict prompt engineering

Initial prompts returned Markdown-formatted blocks, inconsistent array lengths, and strings with embedded labels — none of it reliably parseable. The fix was to engineer explicit output constraints directly into the system prompt: "return only valid JSON, no markdown, no code fences, no labels, exactly 3 items per array, maximum 12 words per item." A defensive strip of any residual code fences runs before `JSON.parse()`. The result is a deterministic, structured response on every call.

### Invalid username UX with a custom error type

When a user searches for a non-existent GitHub profile, the naive path throws a generic `Error` and either crashes the component or shows a meaningless message. Instead, `lib/github.ts` throws `GitHubUserNotFoundError extends Error` specifically on 404 responses. The Hero component wraps the validation call in a try/catch and checks `instanceof GitHubUserNotFoundError` to route the user to a friendly Dialog modal rather than handling all errors the same way. Real network failures still propagate as generic errors and are handled separately.

---

## Setup & Installation

### Prerequisites

- Node.js 18 or later
- npm
- An [OpenRouter](https://openrouter.ai) account (free tier is sufficient)

### 1. Clone the repository
```bash
git clone https://github.com/mostafarawhy/Dermatique-E-commerce-skincare-products.git
cd gittrack
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:
```env
OPENROUTER_API_KEY=your_openrouter_key_here
```

### 4. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Enter any public GitHub username or profile URL and press Enter.

### 5. Build for production
```bash
npm run build
npm start
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `OPENROUTER_API_KEY` | **Yes** | Your OpenRouter API key. Used server-side only — never exposed to the browser. Create a free account at [openrouter.ai](https://openrouter.ai). |
| `NEXT_PUBLIC_SITE_URL` | No | The deployed URL of your application. Defaults to `http://localhost:3000` in local development. |

> **GitHub API rate limits** — The app accesses the GitHub API without authentication, which allows 60 requests per hour per IP. For a production deployment with real traffic, add a GitHub personal access token as a `Bearer` header in `lib/github.ts` to raise the limit to 5,000 requests per hour.

---

## What I Would Improve Next

**GitHub token support** — Add an optional `GITHUB_TOKEN` environment variable and pass it in the `Authorization` header inside `lib/github.ts`. The rate limit jumps from 60 to 5,000 requests per hour, which is necessary for any meaningful traffic.

**Streaming AI responses** — The current analysis modal waits for the full OpenRouter response before rendering. Switching to a streaming POST response and rendering tokens progressively would dramatically improve perceived performance.

**Comparative developer view** — Allow two usernames to be entered side by side and render a diff of their `DeveloperProfile` data. The mapping layer already produces structurally identical objects for every profile, so this is a pure UI problem.

**Contribution activity heatmap** — The GitHub API exposes contribution calendar data. Adding a heatmap grid would give a much richer picture of a developer's activity rhythm over time, not just static repository totals.

**Persistent caching layer** — Current ISR caching resets on every Vercel deployment. A Redis-backed cache (e.g. Upstash) would survive deployments and prevent redundant GitHub API calls for popular profiles.

**Unit tests for the mapping layer** — `lib/map-github-user.ts` is composed entirely of pure functions with deterministic outputs — ideal candidates for unit tests. Adding Vitest coverage here would catch regressions without requiring any UI or network mocking.

---

## Project Structure
```
src/
├── app/
│   ├── api/profile-analysis/route.ts   # AI analysis API endpoint
│   ├── users/[username]/page.tsx        # Dynamic dashboard route (server component)
│   ├── globals.css                      # Global styles + CSS variables
│   ├── layout.tsx                       # Root layout (QueryProvider, Analytics)
│   └── page.tsx                         # Landing page
├── components/
│   ├── dashboard/
│   │   ├── analytics-grid.tsx
│   │   ├── dashboard-navbar.tsx
│   │   ├── dashboard-top-bar.tsx
│   │   ├── developer-insights-card.tsx
│   │   ├── export-analysis-pdf-button.tsx
│   │   ├── language-distribution-card.tsx
│   │   ├── profile-analysis-modal.tsx
│   │   ├── profile-header.tsx
│   │   ├── repository-table.tsx
│   │   ├── stat-card.tsx
│   │   ├── stats-grid.tsx
│   │   └── top-repositories-card.tsx
│   ├── ui/                              # shadcn/ui primitives
│   ├── providers/query-provider.tsx
│   ├── dashboard-preview.tsx
│   ├── footer.tsx
│   ├── hero.tsx
│   └── navbar.tsx
├── lib/
│   ├── github.ts                        # GitHub API client + custom error types
│   ├── map-github-user.ts               # Data transformation layer + domain types
│   ├── fetch-profile-analysis.ts        # Client-side AI fetcher + AIAnalysis type
│   └── utils.ts                         # cn() Tailwind merge utility
└── utils/
    └── helpers.ts                       # extractGitHubUsername() URL parser
```

---

## Deployment

Zero-config deployment on Vercel. Connect the repository, set the `OPENROUTER_API_KEY` environment variable in Vercel project settings, and deploy.
```bash
vercel --prod
```

---

Built by [Mostafa Rawhy](https://github.com/mostafarawhy) · [LinkedIn](https://www.linkedin.com/in/mostafa-rawhy-b7ab522b2/)