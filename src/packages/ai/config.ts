import { openai } from "@ai-sdk/openai";
import { generateObject, generateText } from "ai";
import { z } from "zod";

// AI SDK configuration - the provider automatically uses OPENAI_API_KEY env var
// Using gpt-4o-mini for cost-effective structured data generation
export const aiModel = openai("gpt-4o-mini");

// Helper function for generating text with consistent settings
export async function generateAIText(prompt: string) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error(
      "OpenAI API key is missing. Please set the OPENAI_API_KEY environment variable."
    );
  }

  const { text } = await generateText({
    model: aiModel,
    prompt,
  });

  return text;
}

// Helper function for generating structured objects
export async function generateAIObject<T>(
  prompt: string,
  schema: z.ZodSchema<T>
): Promise<T> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error(
      "OpenAI API key is missing. Please set the OPENAI_API_KEY environment variable."
    );
  }

  const { object } = await generateObject({
    model: aiModel,
    prompt,
    schema,
  });

  return object;
}

// Common prompts and configurations
export const AI_PROMPTS = {
  SPLIT_REQUEST: `# Prompt — Split Client Request into Smaller Tasks

You are an assistant helping me manage client requests for **Uara** (subscription websites service).

## Context
- A "request" = something I can ship in **2–3 business days**.  
- Typical size = a new page, a section, a component, or a simple integration (form, analytics, SEO, small fix).  
- Too big = multiple pages, multiple integrations, or a full app-level feature.  
- Goal = split oversized requests into **clear, deliverable subtasks** while keeping scope realistic.

## Instructions
1. Take the client's original request (could be long or vague).  
2. Decide if it's **too big** (would take more than 2–3 days).  
3. If too big, break it into **2–5 smaller requests**, each shippable in ~2–3 days.  
4. Each sub-request should:  
   - Be specific and clear.  
   - Have a natural order (if dependencies exist).  
   - Deliver incremental value (client sees progress quickly).  
5. Return the result as a **list of recommended subtasks**.

## Style
- Keep tone **friendly and helpful**.  
- If splitting, add a note like: *"this is too big for one request, here's how i'd break it down so it ships faster."*

## Response Format
You must respond with a JSON object containing:
- "isTooBig": boolean - whether the request needs to be split
- "reasoning": string - explanation of your decision
- "subtasks": array of objects with "title" and "description" fields (empty if not too big)
- "suggestion": string - friendly message to the user

## Example Response for a big request:
{
  "isTooBig": true,
  "reasoning": "This request involves building multiple pages, integrations, and complex functionality that would take more than 2-3 days to complete.",
  "subtasks": [
    {
      "title": "Homepage with hero, features section, and footer",
      "description": "Create the main landing page layout with hero section, key features overview, and footer navigation."
    },
    {
      "title": "About + Pricing page layouts (static sections)",
      "description": "Build the about page with company information and pricing page with plan comparison tables."
    },
    {
      "title": "Contact form (name/email/message) → save to Supabase + email via Resend",
      "description": "Implement a working contact form that saves submissions to database and sends notification emails."
    },
    {
      "title": "Stripe checkout button on Pricing page",
      "description": "Add payment processing with Stripe integration on the pricing page for plan subscriptions."
    }
  ],
  "suggestion": "This is too big for one request, here's how I'd break it down so it ships faster. Each part delivers value and you'll see progress every 2-3 days!"
}

## Example Response for a reasonable request:
{
  "isTooBig": false,
  "reasoning": "This is a focused request that can be completed within 2-3 days.",
  "subtasks": [],
  "suggestion": "This looks like a perfect size request! I can get this done in 2-3 days."
}`,
} as const;
