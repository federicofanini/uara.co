import { Check, X } from "lucide-react";

export function Rules() {
  return (
    <div className="w-full space-y-16 max-w-4xl mx-auto px-4 py-16">
      {/* How It Works */}
      <div className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-medium text-foreground">
          how it works<span className="text-teal-300">.</span>
        </h2>

        <div className="space-y-6">
          <h3 className="text-xl font-medium text-foreground">the promise</h3>

          <div className="code-block space-y-2">
            <div className="flex items-center gap-2 terminal-prompt">
              <span className="text-muted-foreground">1.</span>
              <span>you pay me a flat monthly fee.</span>
            </div>
            <div className="flex items-center gap-2 terminal-prompt">
              <span className="text-muted-foreground">2.</span>
              <span>you throw requests at me.</span>
            </div>
            <div className="flex items-center gap-2 terminal-prompt">
              <span className="text-muted-foreground">3.</span>
              <span className="caffeine-jitter">
                i ship them in 2–3 business days (one at a time).
              </span>
              <span className="caffeine-level-critical"></span>
            </div>
            <div className="flex items-center gap-2 terminal-prompt">
              <span className="text-muted-foreground">4.</span>
              <span className="deploy-anxiety">
                repeat until your site looks less embarrassing.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* What Counts as a Task */}
      <div className="space-y-8">
        <h2 className="text-2xl font-medium text-foreground">
          what counts as a task?
        </h2>

        <p className="text-muted-foreground leading-relaxed">
          think small, shippable, snack-sized. stuff i can knock out fast.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Examples - Yes */}
          <div className="space-y-6">
            <h3 className="status-ok flex items-center gap-2">
              <Check className="size-4 text-green-400" /> examples:
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-mono text-sm mt-1">◇</span>
                <p className="text-sm">
                  build a pricing page (3 tiers, buttons included).
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-mono text-sm mt-1">◇</span>
                <p className="text-sm">
                  design a shiny hero section (headline, CTA, stock photo of
                  happy people).
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-mono text-sm mt-1">◇</span>
                <p className="text-sm">add a blog layout with 1 demo post.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-mono text-sm mt-1">◇</span>
                <p className="text-sm">
                  hook up a form to email (supabase + resend).
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-mono text-sm mt-1">◇</span>
                <p className="text-sm">
                  fix page speed (compress images, murder unused css).
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-mono text-sm mt-1">◇</span>
                <p className="text-sm">
                  restyle a button (shadcn dripped out).
                </p>
              </div>
            </div>
          </div>

          {/* Examples - No */}
          <div className="space-y-6">
            <h3 className="status-critical flex items-center gap-2">
              <X className="size-4 text-red-400" /> not a task (pls don&apos;t):
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-red-400 font-mono text-sm mt-1">×</span>
                <p className="text-sm">
                  &quot;build me a 7-page website in one go.&quot;
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-400 font-mono text-sm mt-1">×</span>
                <p className="text-sm">&quot;make the next facebook.&quot;</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-400 font-mono text-sm mt-1">×</span>
                <p className="text-sm">
                  &quot;tiny feature&quot; that somehow requires a phd in ai.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-400 font-mono text-sm mt-1">×</span>
                <p className="text-sm">
                  anything that&apos;ll take me 3 weeks and my soul.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Rule of Thumb */}
        <div className="code-block space-y-4">
          <h4 className="text-lg font-medium text-foreground">
            rule of thumb:
          </h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 terminal-prompt">
              <span>if i can ship it in 2–3 days → it&apos;s a task.</span>
            </div>
            <div className="flex items-center gap-2 terminal-prompt">
              <span>if not → we split it into multiple tasks.</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Flow */}
      <div className="space-y-8">
        <h2 className="text-2xl font-medium text-foreground">the flow</h2>

        <div className="code-block space-y-2">
          <div className="flex items-start gap-2 terminal-prompt">
            <span className="text-muted-foreground">→</span>
            <span>you add requests → backlog them. dream big.</span>
          </div>
          <div className="flex items-start gap-2 terminal-prompt">
            <span className="text-muted-foreground">→</span>
            <span>
              i pick <span className="text-teal-300">1</span> active task →
              because i&apos;m one human, not aws.
            </span>
          </div>
          <div className="flex items-start gap-2 terminal-prompt">
            <span className="text-muted-foreground">→</span>
            <span className="caffeine-jitter">
              i code like a caffeinated raccoon.
            </span>
          </div>
          <div className="flex items-start gap-2 terminal-prompt">
            <span className="text-muted-foreground">→</span>
            <span>i send a preview link (vercel deploy = magic).</span>
          </div>
          <div className="flex items-start gap-2 terminal-prompt">
            <span className="text-muted-foreground">→</span>
            <span>you approve or roast it.</span>
          </div>
          <div className="flex items-start gap-2 terminal-prompt">
            <span className="text-muted-foreground">→</span>
            <span className="text-teal-300">
              we ship → then move to the next.
            </span>
          </div>
        </div>

        <div className="bg-muted/50 border border-border rounded-lg p-4">
          <p className="text-sm font-medium text-foreground mb-2">
            rule: one active task at a time.
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            keeps me sane. keeps you shipping.
          </p>
        </div>
      </div>

      {/* Timing */}
      <div className="space-y-8">
        <h2 className="text-2xl font-medium text-foreground">timing</h2>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-green-400 font-mono text-sm mt-1">◇</span>
            <div>
              <p className="text-sm font-medium">
                normal task: ~2–3 business days.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-yellow-400 font-mono text-sm mt-1">◇</span>
            <div>
              <p className="text-sm font-medium">
                bigger tasks: split into smaller chunks.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-red-400 font-mono text-sm mt-1">◇</span>
            <div>
              <p className="text-sm font-medium">
                emergency? dm me on x with a meme.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pausing & Canceling */}
      <div className="space-y-8">
        <h2 className="text-2xl font-medium text-foreground">
          pausing & canceling
        </h2>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-green-400 font-mono text-sm mt-1">◇</span>
            <div>
              <p className="text-sm">
                <span className="font-medium">
                  don&apos;t need updates this month?
                </span>{" "}
                hit pause. no charge while paused, pick up anytime.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-red-400 font-mono text-sm mt-1">◇</span>
            <div>
              <p className="text-sm">
                <span className="font-medium">hate me?</span> cancel. no hard
                feelings (ok maybe a little).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why This Works */}
      <div className="space-y-8">
        <h2 className="text-2xl font-medium text-foreground">why this works</h2>

        <div className="code-block space-y-2">
          <div className="flex items-start gap-2 terminal-prompt">
            <span className="text-green-400">✓</span>
            <span>
              you get consistent progress without &quot;can we jump on a
              call?&quot;
            </span>
          </div>
          <div className="flex items-start gap-2 terminal-prompt">
            <span className="text-green-400">✓</span>
            <span>
              i get to pay rent while keeping my medtech startup alive.
            </span>
          </div>
          <div className="flex items-start gap-2 terminal-prompt">
            <span className="text-green-400">✓</span>
            <span className="deploy-anxiety">
              everyone wins (except hourly billing).
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
