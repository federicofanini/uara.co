"use client";

import { Buttoon } from "./buttoon";
import { trackHeroCTAClick } from "@/lib/events";

export function Hero() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-20 max-w-4xl mx-auto">
      {/* Main Hero Section */}
      <div className="text-center space-y-8">
        <div className="space-y-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            Get a website, in{" "}
            <span className="underline underline-offset-4 decoration-teal-300">
              days
            </span>
            , for a flat fee
            <span className="text-teal-300">.</span>
          </h1>

          <p className="md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            <span className="text-teal-300 font-mono font-semibold">
              Ship without the stress.
            </span>
            <br />
            No endless revisions, no surprise costs, no missed deadlines.
            <br />
            Just reliable execution, on demand.
          </p>
        </div>
        <div className="mt-10 w-full flex flex-col items-center justify-center">
          <CTA />
        </div>
      </div>
    </div>
  );
}

function CTA() {
  const handleCTAClick = () => {
    trackHeroCTAClick("hero_section");
    // Smooth scroll to pricing section
    document.getElementById("pricing")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full space-y-2">
      <p className="text-sm font-mono text-muted-foreground">
        Loved by Entrepreneurs ★★★★★
      </p>

      {/* Big CTA Button */}
      <div className="flex flex-col items-center space-y-4">
        <Buttoon
          onClick={handleCTAClick}
          className="bg-primary hover:bg-primary/90 text-primary-foreground text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[320px]"
        >
          Get Your Website
        </Buttoon>

        <div className="text-center">
          <p className="text-xs font-mono text-muted-foreground">
            <span className="text-primary">90% cheaper</span> than agencies.
            <span className="text-primary"> 10x faster</span> than freelancers.
          </p>
        </div>
      </div>
      <Highlights />
    </div>
  );
}

function Highlights() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 mt-16">
      {/* Magic Trick Header */}
      <div className="text-center space-y-2">
        <p className="text-xs font-mono text-teal-300 uppercase tracking-wider">
          OUR MAGIC TRICK
        </p>
        <h3 className="text-lg font-semibold text-foreground">
          Fire your dev team. Seriously.
        </h3>
      </div>

      {/* Cost Comparison Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
        {/* Freelancer Card */}
        <div className="relative border border-border rounded-lg p-4 text-center bg-background/50">
          <div className="mt-2 space-y-2">
            <p className="text-xs font-mono text-muted-foreground uppercase">
              Freelancer
            </p>
            <p className="text-xl font-bold text-foreground">$3,000</p>
            <p className="text-xs text-muted-foreground">/project</p>
            <div className="text-xs text-muted-foreground/80 space-y-1 mt-3">
              <p>• Wait weeks</p>
              <p>• Hope they deliver</p>
              <p>• Pay per revision</p>
            </div>
          </div>
        </div>

        {/* Agency Card */}
        <div className="relative border border-border rounded-lg p-4 text-center bg-background/50">
          <div className="mt-2 space-y-2">
            <p className="text-xs font-mono text-muted-foreground uppercase">
              Agency
            </p>
            <p className="text-xl font-bold text-foreground">$10,000+</p>
            <p className="text-xs text-muted-foreground">/project</p>
            <div className="text-xs text-muted-foreground/80 space-y-1 mt-3">
              <p>• Months of calls</p>
              <p>• Surprise invoices</p>
              <p>• Junior devs</p>
            </div>
          </div>
        </div>

        {/* Uara Card - The Winner */}
        <div className="relative border border-teal-300 rounded-lg p-4 text-center bg-background transform scale-105 shadow-lg">
          <div className="mt-2 space-y-2">
            <p className="text-xs font-mono text-primary uppercase font-bold">
              Uara.co
            </p>
            <p className="text-xl font-bold text-foreground">$900</p>
            <p className="text-xs text-muted-foreground">/month</p>

            <div className="text-xs text-muted-foreground space-y-1 mt-3">
              <p>• Ship in days</p>
              <p>• Unlimited requests</p>
              <p>• Pause anytime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Line */}
      <p className="text-xs font-mono text-muted-foreground">
        Unlimited Requests • Pause Anytime
      </p>
    </div>
  );
}
