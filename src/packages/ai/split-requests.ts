import { z } from "zod";
import { generateAIObject, AI_PROMPTS } from "./config";

// Schema for request splitting response
const RequestSplitSchema = z.object({
  isTooBig: z.boolean(),
  reasoning: z.string(),
  subtasks: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  ),
  suggestion: z.string(),
});

export type RequestSplitResult = z.infer<typeof RequestSplitSchema>;

export interface AnalyzeRequestInput {
  title: string;
  description: string;
}

/**
 * Analyzes a request to determine if it's too big and suggests splits
 */
export async function analyzeRequestSize(
  input: AnalyzeRequestInput
): Promise<RequestSplitResult> {
  const prompt = `${AI_PROMPTS.SPLIT_REQUEST}

## Original Request to Analyze:
**Title:** ${input.title}
**Description:** ${input.description}

Analyze this request and determine if it needs to be split into smaller tasks.`;

  try {
    const result = await generateAIObject<RequestSplitResult>(
      prompt,
      RequestSplitSchema
    );

    return result;
  } catch (error) {
    console.error("Error analyzing request size:", error);

    // Fallback response if AI fails
    return {
      isTooBig: false,
      reasoning: "Unable to analyze request size at this time.",
      subtasks: [],
      suggestion:
        "Please proceed with your request as is. If it seems complex, consider breaking it down manually.",
    };
  }
}

/**
 * Helper function to estimate if a request might be too big based on simple heuristics
 * This can be used as a quick check before calling the AI
 */
export function quickSizeCheck(input: AnalyzeRequestInput): boolean {
  const combinedText = `${input.title} ${input.description}`.toLowerCase();

  // Keywords that often indicate complex requests
  const complexKeywords = [
    "multiple pages",
    "full website",
    "entire site",
    "complete app",
    "full application",
    "multiple integrations",
    "several features",
    "many components",
    "whole system",
    "entire platform",
    "comprehensive",
    "end-to-end",
    "full-stack",
    "complete solution",
  ];

  // Count indicators of complexity
  let complexityScore = 0;

  // Check for complex keywords
  complexKeywords.forEach((keyword) => {
    if (combinedText.includes(keyword)) {
      complexityScore += 2;
    }
  });

  // Check for multiple features mentioned (commas, "and", "also", etc.)
  const featureIndicators = [
    ",",
    " and ",
    " also ",
    " plus ",
    " along with ",
    " including ",
  ];
  featureIndicators.forEach((indicator) => {
    const matches = combinedText.split(indicator).length - 1;
    complexityScore += matches;
  });

  // Check for length (very long descriptions might be complex)
  if (input.description.length > 500) {
    complexityScore += 1;
  }

  // Check for technical integrations
  const integrationKeywords = [
    "stripe",
    "payment",
    "database",
    "api",
    "authentication",
    "auth",
    "email",
    "supabase",
    "prisma",
  ];
  let integrationCount = 0;
  integrationKeywords.forEach((keyword) => {
    if (combinedText.includes(keyword)) {
      integrationCount++;
    }
  });

  if (integrationCount > 2) {
    complexityScore += 2;
  }

  // Return true if complexity score suggests it might be too big
  return complexityScore >= 3;
}
