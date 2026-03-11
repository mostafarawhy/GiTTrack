import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
  try {
    const { developer } = await req.json();

    const prompt = `
Analyze this GitHub developer profile.

Rules:
- strong illustrative summary that must be 4 lines long at minimum, and 5 lines at max  only.
- Each list must contain exactly 3 items.
- Each item (not the summary) must be short: maximum 12 words.
- Be concise, specific, and professional.
- Do not repeat the same point across sections.
- Do not invent facts not supported by the data.
- Do not include markdown.
- Do not include labels inside the strings.

Return ONLY valid JSON in this exact format:

{
  "summary": "string",
  "strengths": ["string", "string", "string"],
  "patterns": ["string", "string", "string"],
  "stackFocus": ["string", "string", "string"]
}



Developer:
Name: ${developer.name}
Username: ${developer.username}
Bio: ${developer.bio}
Followers: ${developer.followers}
Following: ${developer.following}
Public Repos: ${developer.publicRepos}
Total Stars: ${developer.totalStars}
Total Forks: ${developer.totalForks}
Top Language: ${developer.topLanguage}

Languages:
${developer.languages?.map((l: any) => `${l.name}: ${l.value}%`).join("\n")}

Repositories:
${developer.repositories
  ?.slice(0, 8)
  .map(
    (r: any) => `${r.name} (${r.language}) stars:${r.stars} forks:${r.forks}`,
  )
  .join("\n")}
`;

    const completion = await client.chat.completions.create({
      model: "openrouter/free",
      messages: [
        {
          role: "system",
          content: "You are a GitHub developer profile analyst.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const content = completion.choices[0].message.content;

    const cleaned = content
      ?.replace(/```json/g, "")
      ?.replace(/```/g, "")
      ?.trim();

    const json = JSON.parse(cleaned || "{}");

    return NextResponse.json(json);
  } catch (error) {
    console.error("AI analysis error:", error);

    return NextResponse.json({ error: "AI analysis failed" }, { status: 500 });
  }
}
