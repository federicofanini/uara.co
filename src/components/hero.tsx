import { Buttoon } from "./buttoon";
import { Memes } from "./memes";
import { Revenues } from "./revenues";

export function Hero() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 max-w-4xl mx-auto">
      {/* Main Hero Section */}
      <div className="text-center space-y-8 mb-16">
        <div className="space-y-4">
          <div className="flex justify-center mb-4">
            <Revenues />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-foreground leading-tight">
            need a website? hire a broke medtech founder
            <span className="text-teal-300">.</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            i blew all my cash on my startup. now i fund science (and groceries)
            by building simple shadcn websites. flat monthly fee. pause anytime.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Buttoon>gimme a website</Buttoon>
        </div>
      </div>

      {/* Why This Exists */}
      <div className="w-full space-y-12 mb-16">
        <div className="space-y-4">
          <h2 className="text-2xl font-medium text-foreground">
            why this exists
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            i invested everything in my medtech startup. to keep the dream alive
            (and eat), i&apos;m offering simple, beautiful websites on a flat
            monthly subscription. you get speed and transparency. i fund
            science.
          </p>
        </div>

        {/* What You Get */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="status-ok">what you get:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-mono text-sm mt-1">◇</span>
                <div>
                  <span className="text-sm font-medium">
                    clean{" "}
                    <a
                      href="https://ui.shadcn.com"
                      className="text-primary hover:underline hover:text-teal-300 transition-colors hover:underline-offset-4"
                      target="_blank"
                    >
                      shadcn ui
                    </a>
                  </span>
                  <p className="text-xs text-muted-foreground">
                    (looks like you hired a designer, but you didn&apos;t).
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-mono text-sm mt-1">◇</span>
                <div>
                  <p className="text-sm font-medium">next.js based</p>
                  <p className="text-xs text-muted-foreground">
                    → basically industry buzzwords that mean fast.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-mono text-sm mt-1">◇</span>
                <div>
                  <p className="text-sm font-medium">forms, seo, analytics</p>
                  <p className="text-xs text-muted-foreground">
                    → so you can brag about &quot;traffic.&quot;
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-mono text-sm mt-1">◇</span>
                <div>
                  <p className="text-sm font-medium">stripe buttons</p>
                  <p className="text-xs text-muted-foreground">
                    → because who doesn&apos;t want to accidentally get paid?
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="status-critical">what you don&apos;t get:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-red-400 font-mono text-sm mt-1">×</span>
                <p className="text-sm">your own metaverse.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-400 font-mono text-sm mt-1">×</span>
                <p className="text-sm">
                  that &quot;super tiny feature&quot; that&apos;s secretly a
                  saas.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-400 font-mono text-sm mt-1">×</span>
                <p className="text-sm">me joining daily zoom calls.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="w-full space-y-8 mb-16">
        <h2 className="text-2xl font-medium text-foreground">how it works:</h2>

        <div className="code-block space-y-2">
          <div className="flex items-center gap-2 terminal-prompt">
            <span className="text-muted-foreground">1.</span>
            <span>you beg for a site.</span>
          </div>
          <div className="flex items-center gap-2 terminal-prompt">
            <span className="text-muted-foreground">2.</span>
            <span className="caffeine-jitter">
              i code like a caffeine-addicted raccoon.
            </span>
            <span className="caffeine-level-critical"></span>
          </div>
          <div className="flex items-center gap-2 terminal-prompt">
            <span className="text-muted-foreground">3.</span>
            <span>you review it (and send memes).</span>
          </div>
          <div className="flex items-center gap-2 terminal-prompt">
            <span className="text-muted-foreground">4.</span>
            <span className="deploy-anxiety">we ship it. everyone claps.</span>
          </div>
        </div>
      </div>

      <Memes />
    </div>
  );
}
