"use client";

import { useState } from "react";
import { Copy, X, Check } from "lucide-react";

export function Memes() {
  const [copiedPrompt, setCopiedPrompt] = useState<number | null>(null);

  const memePrompts = [
    {
      title: "Distracted Boyfriend Meme",
      prompt: `Create a meme in the classic “distracted boyfriend” format.
  - Left: "me (supposed to be working on medtech)" (label above boyfriend)
  - Right: "medtech startup grind" (label above girlfriend)
  - In front: "cash from websites subscription" (label above girl walking by)
  Style: meme, clear text labels, same visual energy as the original.`,
      caption:
        "me (should be working on medtech) → looking at cash from websites",
    },
    {
      title: "Spongebob at 3AM",
      prompt: `Create a meme inspired by “Spongebob at 3am”. 
  - Spongebob character looks tired but excited, sitting at a computer.
  - Screen shows “vercel deploy” with a green checkmark.
  - Caption: “me deploying to vercel at 3am”.
  Style: cartoonish, bright, recognizable as Spongebob meme.`,
      caption: "me deploying to vercel",
    },
    {
      title: "Drake Hotline Bling Meme",
      prompt: `Create a meme in the classic “Drake Hotline Bling” template.
  - First frame (Drake rejecting with hand): “hourly billing ❌”
  - Second frame (Drake approving and smiling): “flat subscription ✅”
  Style: meme, high contrast, bold readable text labels.`,
      caption: "❌ hourly billing   ✅ flat subscription",
    },
  ] as const;

  const copyPrompt = async (promptIndex: number) => {
    try {
      await navigator.clipboard.writeText(memePrompts[promptIndex].prompt);
      setCopiedPrompt(promptIndex);
      setTimeout(() => setCopiedPrompt(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="w-full space-y-8 mb-16">
      <div className="text-center">
        <p className="text-sm text-muted-foreground font-mono">
          expectation vs reality
        </p>
        <p className="text-[10px] text-muted-foreground">
          no images so it loads faster
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-background border border-border rounded-lg p-4 text-center space-y-2">
          <div
            className="h-32 bg-muted rounded flex items-center justify-center relative group cursor-pointer transition-all hover:bg-muted/80"
            onClick={() => copyPrompt(0)}
          >
            <span className="font-mono text-xs text-muted-foreground group-hover:opacity-30 transition-opacity">
              distracted boyfriend meme
            </span>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-background/95 rounded opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 space-y-1">
              <Copy className="size-3 text-green-400" />
              <span className="text-[10px] font-mono text-center text-muted-foreground">
                {copiedPrompt === 0
                  ? "copied!"
                  : "copy prompt to use your tokens"}
              </span>
            </div>
          </div>
          <p className="text-xs font-mono">
            me (should be working on medtech) → looking at cash from websites
          </p>
        </div>

        <div className="bg-background border border-border rounded-lg p-4 text-center space-y-2">
          <div
            className="h-32 bg-muted rounded flex items-center justify-center relative group cursor-pointer transition-all hover:bg-muted/80"
            onClick={() => copyPrompt(1)}
          >
            <span className="font-mono text-xs text-muted-foreground group-hover:opacity-30 transition-opacity">
              spongebob at 3am
            </span>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-background/95 rounded opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 space-y-1">
              <Copy className="size-3 text-green-400" />
              <span className="text-[10px] font-mono text-center text-muted-foreground">
                {copiedPrompt === 1
                  ? "copied!"
                  : "copy prompt to use your tokens"}
              </span>
            </div>
          </div>
          <p className="text-xs font-mono">me deploying to vercel</p>
        </div>

        <div className="bg-background border border-border rounded-lg p-4 text-center space-y-2">
          <div
            className="h-32 bg-muted rounded flex items-center justify-center relative group cursor-pointer transition-all hover:bg-muted/80"
            onClick={() => copyPrompt(2)}
          >
            <span className="font-mono text-xs text-muted-foreground group-hover:opacity-30 transition-opacity">
              drake meme
            </span>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-background/95 rounded opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 space-y-1">
              <Copy className="size-3 text-green-400" />
              <span className="text-[10px] font-mono text-center text-muted-foreground">
                {copiedPrompt === 2
                  ? "copied!"
                  : "copy prompt to use your tokens"}
              </span>
            </div>
          </div>
          <p className="text-xs font-mono">
            <X className="w-4 h-4 inline-block text-red-400" /> hourly billing{" "}
            <Check className="w-4 h-4 inline-block text-green-400" /> flat
            subscription
          </p>
        </div>
      </div>
    </div>
  );
}
