"use client";

import { useState } from "react";
import { Buttoon } from "./buttoon";
import { SubscribeInput } from "./subscribe-input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface GetStartedWaitlistProps {
  className?: string;
  children?: React.ReactNode;
}

export function GetStartedWaitlist({
  className,
  children = "get started (pls)",
}: GetStartedWaitlistProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Buttoon className={className}>{children}</Buttoon>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-w-[calc(100vw-1rem)] border-border bg-background/95 backdrop-blur-sm">
        <DialogHeader className="space-y-3 sm:space-y-4">
          <DialogTitle className="text-lg sm:text-xl font-medium text-foreground">
            almost ready<span className="text-teal-300">.</span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground leading-relaxed text-sm">
            i&apos;m putting the finishing touches on the platform.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 pt-3 sm:pt-4">
          {/* Status */}
          <div className="code-block space-y-1 sm:space-y-2">
            <div className="flex items-center gap-2 terminal-prompt">
              <span className="text-yellow-400">◇</span>
              <span className="text-xs sm:text-sm">
                building the dashboard...
              </span>
            </div>
            <div className="flex items-center gap-2 terminal-prompt">
              <span className="text-yellow-400">◇</span>
              <span className="text-xs sm:text-sm">
                setting up payment flows...
              </span>
            </div>
            <div className="flex items-center gap-2 terminal-prompt">
              <span className="text-green-400">◇</span>
              <span className="text-xs sm:text-sm">
                perfecting the process...
              </span>
            </div>
          </div>

          {/* Subscribe Input */}
          <div className="space-y-3 sm:space-y-4">
            <div className="text-center flex items-center justify-center overflow-hidden">
              <div className="scale-90 sm:scale-100 origin-center">
                <SubscribeInput />
              </div>
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground text-center font-mono px-2">
              → you&apos;ll be the first to know when the broke founder plan
              goes live.
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-medium text-foreground px-1">
              what happens next:
            </h4>
            <div className="code-block space-y-1">
              <div className="flex items-start gap-2 terminal-prompt">
                <span className="text-muted-foreground text-xs sm:text-sm flex-shrink-0">
                  1.
                </span>
                <span className="text-xs sm:text-sm">
                  you join the waiting list.
                </span>
              </div>
              <div className="flex items-start gap-2 terminal-prompt">
                <span className="text-muted-foreground text-xs sm:text-sm flex-shrink-0">
                  2.
                </span>
                <span className="text-xs sm:text-sm caffeine-jitter">
                  i finish building the platform.
                </span>
              </div>
              <div className="flex items-start gap-2 terminal-prompt">
                <span className="text-muted-foreground text-xs sm:text-sm flex-shrink-0">
                  3.
                </span>
                <span className="text-xs sm:text-sm">
                  you get early access + launch pricing.
                </span>
              </div>
              <div className="flex items-start gap-2 terminal-prompt">
                <span className="text-muted-foreground text-xs sm:text-sm flex-shrink-0">
                  4.
                </span>
                <span className="text-xs sm:text-sm text-teal-300">
                  we build beautiful websites together.
                </span>
              </div>
            </div>
          </div>

          {/* ETA */}
          <div className="bg-muted/50 border border-border rounded-lg p-3 sm:p-4">
            <p className="text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">
              eta: early february 2025
            </p>
            <p className="text-[10px] sm:text-xs text-muted-foreground font-mono">
              → because good things take time (but not too much time).
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
