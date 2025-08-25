import { NextRequest, NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

// Revalidate every 1 day (86400 seconds)
export const revalidate = 86400;

interface MetricsData {
  visitors: {
    total: number;
    sessions: number;
    pageviews: number;
    bounceRate: number;
    sessionDuration: number;
  };
  subscribers: {
    total: number;
  };
  conversion: {
    rate: number;
  };
}

interface ContextData {
  website: string;
  purpose: string;
  stage: string;
  founder: string;
}

export async function POST(request: NextRequest) {
  let metrics: MetricsData | null = null;
  let context: ContextData | null = null;

  try {
    const requestData = await request.json();
    metrics = requestData.metrics;
    context = requestData.context;

    if (!metrics || !context) {
      throw new Error("Missing required metrics or context data");
    }

    if (!process.env.OPENAI_API_KEY) {
      // Return fallback assessment for development
      return NextResponse.json({
        assessment: [
          `${metrics.visitors.total} visitors → digital tumbleweeds in the vast internet desert 🌵`,
          `conversion rate: ${metrics.conversion.rate.toFixed(
            1
          )}% → optimistic considering most think this is a typo`,
          `bounce rate: ${metrics.visitors.bounceRate.toFixed(
            1
          )}% → people see "medtech" and suddenly remember urgent laundry`,
          `reality check: still in the "convincing friends to pretend they're interested" phase`,
        ],
      });
    }

    // Use Vercel AI SDK to generate structured assessment
    const result = await generateObject({
      model: openai("gpt-4o"),
      schema: z.object({
        assessment: z.array(z.string()).min(4).max(4),
      }),
      prompt: `You are a brutally honest, slightly sarcastic AI analyst reviewing website metrics for a medtech research funding platform. The founder is a solo entrepreneur burning through savings.

Current metrics:
- Unique visitors: ${metrics.visitors.total}
- Sessions: ${metrics.visitors.sessions}
- Pageviews: ${metrics.visitors.pageviews}
- Bounce rate: ${metrics.visitors.bounceRate}%
- Session duration: ${metrics.visitors.sessionDuration}s
- Email subscribers: ${metrics.subscribers.total}
- Conversion rate: ${metrics.conversion.rate}%

Context:
- Website: ${context.website}
- Purpose: ${context.purpose}
- Stage: ${context.stage}
- Situation: ${context.founder}

Generate exactly 4 brutally honest but humorous assessment lines about these metrics. Each line should:
1. Be realistic and data-driven
2. Include specific numbers from the metrics
3. Be somewhat self-deprecating but not overly harsh
4. Use tech/startup humor
5. Be under 80 characters each
6. Include relevant emojis occasionally

Return as an array of 4 assessment strings.`,
      temperature: 0.8,
    });

    return NextResponse.json({
      assessment: result.object.assessment,
    });
  } catch (error) {
    console.error("AI assessment generation error:", error);

    // Return fallback assessment on error
    const fallbackAssessment = [
      `${
        metrics?.visitors?.total || 0
      } visitors → basically crickets in a digital field 🦗`,
      `traffic mostly consists of the founder checking if the site still works`,
      `bounce rate suggests people see "medtech" and remember urgent Netflix shows`,
      `goal: achieve the impossible dream of 1 genuine human visitor`,
    ];

    return NextResponse.json({
      assessment: fallbackAssessment,
    });
  }
}
