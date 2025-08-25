"use client";

import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";

interface AIAssessmentData {
  assessment: string[];
  generatedAt: string;
  isStale: boolean;
}

interface MetricsData {
  visitors: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    sessions: number;
    pageviews: number;
    bounceRate: number;
    sessionDuration: number;
  };
  subscribers: {
    total: number;
    growth: number;
  };
  conversion: {
    rate: number;
    signups: number;
  };
  traffic: {
    organic: number;
    direct: number;
    social: number;
    referral: number;
  };
}

interface TransparencyAIAssessmentProps {
  metrics: MetricsData;
}

export function TransparencyAIAssessment({
  metrics,
}: TransparencyAIAssessmentProps) {
  const [aiAssessment, setAIAssessment] = useState<AIAssessmentData>({
    assessment: [
      "analyzing current metrics with brutal honesty...",
      "cross-referencing delusion levels with reality...",
      "calculating optimism vs despair ratio...",
      "generating assessment...",
    ],
    generatedAt: new Date().toISOString(),
    isStale: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateAssessment = async () => {
      try {
        // Check if we have a cached assessment from today
        const cached = localStorage.getItem("ai-assessment");
        const today = new Date().toDateString();

        if (cached) {
          const parsedCache = JSON.parse(cached);
          const cacheDate = new Date(parsedCache.generatedAt).toDateString();

          if (cacheDate === today) {
            setAIAssessment({
              ...parsedCache,
              isStale: false,
            });
            setIsLoading(false);
            return;
          }
        }

        // Generate new assessment using AI
        const response = await fetch("/api/ai/generate-assessment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            metrics,
            context: {
              website: "uara.co",
              purpose: "medtech research funding through subscription service",
              stage: "early pre-launch",
              founder: "solo founder burning savings",
            },
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate AI assessment");
        }

        const data = await response.json();
        const newAssessment = {
          assessment: data.assessment,
          generatedAt: new Date().toISOString(),
          isStale: false,
        };

        setAIAssessment(newAssessment);

        // Cache the assessment for today
        localStorage.setItem("ai-assessment", JSON.stringify(newAssessment));
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to generate AI assessment:", error);

        // Fallback to humorous placeholder
        const fallbackAssessment = {
          assessment: [
            `${metrics.visitors.total} visitors → basically tumbleweeds in a digital desert 🌵`,
            `conversion rate: ${metrics.conversion.rate.toFixed(
              1
            )}% → optimistic, considering most visitors think this is a typo`,
            `bounce rate: ${metrics.visitors.bounceRate.toFixed(
              1
            )}% → people see "medtech" and immediately remember they have laundry to do`,
            `assessment: still in the "friends and family pretending to be interested" phase`,
          ],
          generatedAt: new Date().toISOString(),
          isStale: true,
        };

        setAIAssessment(fallbackAssessment);
        setIsLoading(false);
      }
    };

    if (metrics.visitors.total !== undefined) {
      generateAssessment();
    }
  }, [metrics]);

  const formatGeneratedTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffHours === 0) return "just now";
    if (diffHours === 1) return "1 hour ago";
    if (diffHours < 24) return `${diffHours} hours ago`;
    return "today";
  };

  if (isLoading) {
    return (
      <div className="code-block space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-medium text-foreground">
            ai assessment:
          </h4>
          <Badge
            variant="outline"
            className="text-xs font-mono text-muted-foreground"
          >
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              generating...
            </div>
          </Badge>
        </div>
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-2 terminal-prompt">
              <div className="h-4 bg-muted rounded animate-pulse flex-1" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="code-block space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium text-foreground">ai assessment:</h4>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-xs font-mono text-muted-foreground"
          >
            <div className="flex items-center gap-1">
              <svg
                className="w-3 h-3 text-purple-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
              generated by gpt-4
            </div>
          </Badge>
          <Badge
            variant="outline"
            className="text-xs font-mono text-muted-foreground"
          >
            {formatGeneratedTime(aiAssessment.generatedAt)}
          </Badge>
        </div>
      </div>
      <div className="space-y-2">
        {aiAssessment.assessment.map((line, index) => (
          <div key={index} className="flex items-center gap-2 terminal-prompt">
            <span className="text-sm">{line}</span>
          </div>
        ))}
        {aiAssessment.isStale && (
          <div className="flex items-center gap-2 terminal-prompt mt-4 opacity-60">
            <span className="text-xs">
              ⚠️ ai service unavailable → showing fallback assessment
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
