import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { GetStartedWaitlist } from "./get-started-waitlist";

export function Pricing() {
  return (
    <div className="w-full space-y-16 max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-medium text-foreground">
          one plan. infinite copium<span className="text-teal-300">.</span>
        </h2>
        <div className="flex justify-center">
          <Badge variant="secondary" className="text-xs font-mono">
            <span className="text-teal-300 font-bold">5</span> spots available
          </Badge>
        </div>
      </div>

      {/* Main Plan Card */}
      <div className="space-y-8">
        <Card className="border-border bg-background/50 backdrop-blur-sm rounded-none">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-medium">
                the broke founder plan
              </CardTitle>
              <div className="text-right">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-muted-foreground line-through">
                    $1490
                  </span>
                  <span className="text-2xl font-medium text-foreground">
                    $790
                  </span>
                  <span className="text-sm text-muted-foreground">/mo</span>
                </div>
                <Badge
                  variant="outline"
                  className="text-xs text-teal-300 border-teal-300"
                >
                  launch price
                </Badge>
              </div>
            </div>
            <CardDescription className="text-muted-foreground">
              the subscription that gives you a website (and fund science).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-mono text-sm mt-1">◇</span>
                <div>
                  <p className="text-sm font-medium">
                    unlimited requests (but one at a time, i&apos;m just one
                    dude pls).
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-mono text-sm mt-1">◇</span>
                <div>
                  <p className="text-sm font-medium">2–3 day turnaround.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-mono text-sm mt-1">◇</span>
                <div>
                  <p className="text-sm font-medium">
                    next.js + tailwind + shadcn = ✨modern✨.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-mono text-sm mt-1">◇</span>
                <div>
                  <p className="text-sm font-medium">
                    full ownership (repos in your org, not my grandma&apos;s).
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-mono text-sm mt-1">◇</span>
                <div>
                  <p className="text-sm font-medium">
                    pause anytime (ghosting me is still rude tho).
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <GetStartedWaitlist className="w-full">
                get started (pls)
              </GetStartedWaitlist>
              <p className="text-xs text-muted-foreground text-center mt-2 font-mono">
                → flat monthly fee. pause anytime. no drama.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* One-offs Section 
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-xl font-medium text-foreground mb-2">
            One-offs for the commitment-phobic:
          </h3>
          <p className="text-sm text-muted-foreground font-mono">
            → because sometimes you just need a quick fix.
          </p>
        </div>

        <div className="grid md:grid-cols-1 gap-6">
          <Card className="border-border bg-background/50 backdrop-blur-sm rounded-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">
                  Launch Sprint
                </CardTitle>
                <span className="text-xl font-medium text-foreground">
                  $950
                </span>
              </div>
              <CardDescription>
                Get a landing page in 3–5 days. Impress your mom.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm mt-1">
                    ◇
                  </span>
                  <p className="text-sm">One beautiful landing page</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm mt-1">
                    ◇
                  </span>
                  <p className="text-sm">3-5 day delivery</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm mt-1">
                    ◇
                  </span>
                  <p className="text-sm">Full source code</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm mt-1">
                    ◇
                  </span>
                  <p className="text-sm">Two rounds of revisions</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                sprint to glory
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>*/}
    </div>
  );
}
