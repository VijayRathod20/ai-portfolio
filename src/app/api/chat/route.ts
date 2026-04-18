import { groq } from "@ai-sdk/groq";
import { streamText, createUIMessageStreamResponse, convertToModelMessages } from "ai";
import { getSystemPrompt } from "@/lib/ai/system-prompt";

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT) {
    return false;
  }

  entry.count++;
  return true;
}

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // Rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({
          error: "Too many requests. Please wait a moment before trying again.",
        }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check for API key
    if (!process.env.GROQ_API_KEY) {
      return new Response(
        JSON.stringify({
          error:
            "AI assistant is not configured yet. Please set up the GROQ_API_KEY environment variable.",
        }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    const { messages } = await req.json();

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid request. Messages are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Limit conversation length to prevent token abuse
    const recentMessages = messages.slice(-10);

    // Convert UIMessages (parts format) to ModelMessages (content format)
    const modelMessages = await convertToModelMessages(recentMessages);

    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
      system: getSystemPrompt(),
      messages: modelMessages,
      temperature: 0.7,
    });

    return createUIMessageStreamResponse({
      stream: result.toUIMessageStream(),
    });
  } catch (error) {
    console.error("Chat API error:", error);

    // Handle specific API errors
    const errorMessage =
      error instanceof Error ? error.message : String(error);

    if (errorMessage.includes("401") || errorMessage.includes("Unauthorized") || errorMessage.includes("Invalid API")) {
      return new Response(
        JSON.stringify({
          error:
            "AI assistant configuration error. Please contact the site owner.",
        }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    if (errorMessage.includes("429") || errorMessage.includes("rate limit") || errorMessage.includes("Rate limit")) {
      return new Response(
        JSON.stringify({
          error:
            "The AI assistant is temporarily busy. Please try again in a moment.",
        }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        error:
          "Sorry, I'm having trouble responding right now. Please try again in a moment.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
