"use client";

import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Icons } from "./ui/icons";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Link from "next/link";

export function TransparencyBankBalance() {
  // Mock data - will be replaced with real Midday.ai integration
  const totalBalance = 138.52;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("eu-EU", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-foreground">
          bank balance<span className="text-teal-300">:</span>
        </h3>
        <Link
          href="https://midday.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <Badge
            variant="outline"
            className="text-xs font-mono text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-1">
              <Icons.midday className="w-3 h-3 text-foreground" />
            </div>
            midday
          </Badge>
        </Link>
      </div>

      <Card className="border-border bg-background/50 rounded-none">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-medium text-foreground">
                {formatCurrency(totalBalance)}
              </div>
              <p className="text-xs text-muted-foreground font-mono mt-1">
                balance
              </p>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-xs text-orange-400 font-mono hover:text-orange-300 transition-colors cursor-help">
                  WIP
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-3" side="left" align="start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-medium text-foreground">wip</h4>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Real bank data via Midday.ai API coming soon</p>
                    <p>• Currently showing mock balance</p>
                    <p>• Will sync automatically when connected</p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
