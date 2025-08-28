import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Clock, Gift } from "lucide-react";
import { Buttoon } from "./buttoon";
import Link from "next/link";
import { products } from "@/lib/products";
import { Button } from "./ui/button";

export function HeroPricing() {
  return (
    <div className="items-center gap-3 bg-background/50 backdrop-blur-sm border border-border rounded-none px-4 py-3 max-w-sm mx-auto">
      <Buttoon className="w-full">
        <Link href={products[0].link}>get a website for $500</Link>
      </Buttoon>
      <Link href="#pricing" className="text-xs text-muted-foreground font-mono">
        see more
      </Link>
    </div>
  );
}

export function Pricing() {
  return (
    <div
      className="w-full space-y-16 max-w-4xl mx-auto px-4 py-16"
      id="pricing"
    >
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* MPV price launch offer */}
        <div className="space-y-8">
          <Card className="border-border bg-background/50 backdrop-blur-sm rounded-none">
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-medium">
                  minimum viable page
                </CardTitle>
                <div className="text-right">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-muted-foreground line-through">
                      $2000
                    </span>
                    <span className="text-2xl font-medium text-foreground">
                      $500
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-xs text-teal-300 border-teal-300"
                  >
                    <Gift className="w-4 h-4" />
                    launch price
                  </Badge>
                </div>
              </div>
              <CardDescription className="text-muted-foreground">
                fund science and get a website.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm mt-1">
                    ◇
                  </span>
                  <div>
                    <p className="text-sm font-medium">
                      one-page site (next.js + shadcn).
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm mt-1">
                    ◇
                  </span>
                  <div>
                    <p className="text-sm font-medium">responsive + fast.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm mt-1">
                    ◇
                  </span>
                  <div>
                    <p className="text-sm font-medium">copy + seo optimized.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm mt-1">
                    ◇
                  </span>
                  <div>
                    <p className="text-sm font-medium">
                      full ownership (repos in your org, forever).
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm mt-1">
                    ◇
                  </span>
                  <div>
                    <p className="text-sm font-medium">
                      5 business days delivery time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Buttoon className="w-full">
                  <Link href={products[0].link}>get started</Link>
                </Buttoon>
                <p className="text-xs text-muted-foreground text-center mt-2 font-mono">
                  → flat one-time fee. no drama.
                </p>
              </div>
            </CardContent>
          </Card>
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
                    className="text-xs text-orange-300 border-orange-300"
                  >
                    <Clock className="w-4 h-4" />
                    coming soon
                  </Badge>
                </div>
              </div>
              <CardDescription className="text-muted-foreground">
                hire me as a service.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm mt-1">
                    ◇
                  </span>
                  <div>
                    <p className="text-sm font-medium">
                      unlimited requests (one at a time).
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm mt-1">
                    ◇
                  </span>
                  <div>
                    <p className="text-sm font-medium">2–3 day turnaround.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm mt-1">
                    ◇
                  </span>
                  <div>
                    <p className="text-sm font-medium">
                      next.js + tailwind + shadcn.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm mt-1">
                    ◇
                  </span>
                  <div>
                    <p className="text-sm font-medium">
                      full ownership (repos in your org).
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-mono text-sm mt-1">
                    ◇
                  </span>
                  <div>
                    <p className="text-sm font-medium">pause anytime.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full" disabled>
                  coming soon
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2 font-mono">
                  → flat monthly fee. pause anytime. no drama.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
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
