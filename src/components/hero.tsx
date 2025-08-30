"use client";

import { Buttoon } from "./buttoon";
import { trackHeroCTAClick } from "@/lib/events";

export function Hero() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 max-w-4xl mx-auto">
      {/* Main Hero Section */}
      <div className="text-center space-y-8 mb-16">
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
    <div className="w-full mb-4 space-y-6">
      <p className="text-sm font-mono text-muted-foreground">
        Loved by Entrepreneurs ★★★★★
      </p>

      {/* Big CTA Button */}
      <div className="flex flex-col items-center space-y-4">
        <Buttoon
          onClick={handleCTAClick}
          className="bg-primary hover:bg-primary/90 text-primary-foreground text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[320px]"
        >
          Get Your Website Now
        </Buttoon>

        <p className="text-xs font-mono text-muted-foreground">
          <span className="font-semibold text-primary">$900 / Month</span> •
          Unlimited Requests • Pause Anytime
        </p>
      </div>
      <Highlights />
    </div>
  );
}

function Highlights() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
      highlights
    </div>
  );
}

export function whatYouGet() {
  return (
    <div className="w-full space-y-12 mb-16">
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
                that &quot;super tiny feature&quot; that&apos;s secretly a saas.
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
  );
}
