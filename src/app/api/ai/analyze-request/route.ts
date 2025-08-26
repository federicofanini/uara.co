import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  analyzeRequestSize,
  quickSizeCheck,
} from "@/packages/ai/split-requests";
import { getCurrentUser } from "@/data/request-utils";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const AnalyzeRequestSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description } = AnalyzeRequestSchema.parse(body);

    // Quick heuristic check first
    const mightBeTooBig = quickSizeCheck({ title, description });

    if (!mightBeTooBig) {
      // If quick check suggests it's fine, return without AI analysis
      return NextResponse.json({
        isTooBig: false,
        reasoning: "This request appears to be appropriately sized.",
        subtasks: [],
        suggestion:
          "This looks like a perfect size request! I can get this done in 2-3 days.",
        quickCheck: true,
      });
    }

    // If quick check suggests it might be too big, use AI analysis
    const analysis = await analyzeRequestSize({ title, description });

    return NextResponse.json({
      ...analysis,
      quickCheck: false,
    });
  } catch (error) {
    console.error("Analyze request error:", error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      );
    }

    // Handle AI SDK specific errors
    if (error instanceof Error) {
      // Check for OpenAI API key error
      if (
        error.message.includes("API key") ||
        error.message.includes("Unauthorized")
      ) {
        return NextResponse.json(
          {
            error:
              "OpenAI API key is missing or invalid. Please configure your API key.",
          },
          { status: 500 }
        );
      }

      // Check for rate limiting
      if (
        error.message.includes("rate limit") ||
        error.message.includes("quota")
      ) {
        return NextResponse.json(
          { error: "OpenAI API rate limit exceeded. Please try again later." },
          { status: 429 }
        );
      }

      // Check for model errors
      if (
        error.message.includes("model") ||
        error.message.includes("invalid")
      ) {
        return NextResponse.json(
          { error: "AI model configuration error. Please contact support." },
          { status: 500 }
        );
      }
    }

    // Generic fallback
    return NextResponse.json(
      { error: "Failed to analyze request. Please try again." },
      { status: 500 }
    );
  }
}
