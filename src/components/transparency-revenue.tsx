"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { Icons } from "./ui/icons";

interface RevenueData {
  total: number;
  monthly: number;
  lastMonth: number;
  subscribers: number;
  churn: number;
}

export function TransparencyRevenue() {
  const [revenue, setRevenue] = useState<RevenueData>({
    total: 0,
    monthly: 0,
    lastMonth: 0,
    subscribers: 0,
    churn: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        // TODO: Replace with actual Stripe API call
        // const response = await fetch('/api/stripe/revenue');
        // const data = await response.json();

        // Simulated data for now
        setRevenue({
          total: 0,
          monthly: 0,
          lastMonth: 0,
          subscribers: 0,
          churn: 0,
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch revenue:", error);
        setIsLoading(false);
      }
    };

    fetchRevenue();
    // Refresh every 5 minutes
    const interval = setInterval(fetchRevenue, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-medium text-foreground">
          revenue<span className="text-teal-300">:</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card
              key={i}
              className="border-border bg-background/50 rounded-none"
            >
              <CardHeader className="pb-3">
                <div className="h-4 bg-muted rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium text-foreground">
          revenue<span className="text-teal-300">:</span>
        </h3>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-xs font-mono text-muted-foreground"
          >
            <div className="flex items-center gap-1">
              <Icons.stripe className="w-3 h-3 text-indigo-400" />
            </div>
            live from stripe
          </Badge>
          <Link
            href="https://dashboard.openpanel.dev/share/overview/LzhkiB"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Badge
              variant="outline"
              className="text-xs font-mono text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-1">
                <Icons.openpanel className="size-4 text-primary" />
              </div>
              site stats
            </Badge>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-border bg-background/50 rounded-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              total revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium text-foreground">
              {formatCurrency(revenue.total)}
            </div>
            <p className="text-xs text-muted-foreground font-mono mt-1">
              start aug 24, 2025
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-background/50 rounded-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              this month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium text-foreground">
              {formatCurrency(revenue.monthly)}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-muted-foreground font-mono">
                vs last month:
              </span>
              {revenue.monthly >= revenue.lastMonth ? (
                <span className="text-xs text-green-400 font-mono">
                  +{formatCurrency(revenue.monthly - revenue.lastMonth)}
                </span>
              ) : (
                <span className="text-xs text-red-400 font-mono">
                  {formatCurrency(revenue.monthly - revenue.lastMonth)}
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-background/50 rounded-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              active subs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium text-foreground">
              {revenue.subscribers}
            </div>
            <p className="text-xs text-muted-foreground font-mono mt-1">
              → $900/mo each
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-background/50 rounded-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              churn rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium text-foreground">
              {revenue.churn.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground font-mono mt-1">
              → monthly churn
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Reality Check */}
      <div className="code-block space-y-4">
        <h4 className="text-lg font-medium text-foreground">screenshots</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2 terminal-prompt">
            <span className="text-sm">
              current revenue: {formatCurrency(revenue.total)} (brutal honesty)
            </span>
          </div>
          <div className="flex items-center gap-2 terminal-prompt">
            <span className="text-sm">
              runway left: burning through savings to fund this experiment
            </span>
          </div>
          <div className="flex items-center gap-2 terminal-prompt">
            <span className="text-sm">
              break-even goal: 2 paying customers = $1,580/mo
            </span>
          </div>
          <div className="flex items-center gap-2 terminal-prompt">
            <span className="text-sm">
              why: every usd funds medtech research + keeps me alive
            </span>
          </div>
        </div>
      </div>
      {/* The Why */}
      <div className="bg-muted/50 border border-border rounded-lg p-6 space-y-4">
        <h4 className="text-lg font-medium text-foreground">
          why i&apos;m sharing this:
        </h4>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>most founders fake it till they make it. i&apos;m honest.</p>
          <p>
            transparency builds trust. if you&apos;re going to trust me with
            your website, you deserve to know exactly where i stand.
          </p>
          <p>
            also, if this experiment fails spectacularly, at least we&apos;ll
            have documented the journey for others to learn from (or laugh at).
          </p>
          <p className="text-teal-300 font-mono">
            → building in public: the most honest marketing strategy ever.
          </p>
        </div>
      </div>
    </div>
  );
}
