"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export function Shipped() {
  const shipped = [
    {
      company: "Boschitt.com",
      href: "https://boschitt.com",
      badges: [],
      logoUrl: "/boschitt.jpeg",
      description: "Gardening services website — SEO-optimized.",
    },
    {
      company: "GymBrah.com",
      href: "https://gymbrah.com",
      badges: [],
      logoUrl: "/gymbrah.png",
      description: "Run your fitness business without chaos. Open Source.",
    },
    {
      company: "fed.fan",
      href: "https://fed.fan",
      badges: [],
      logoUrl: "/fedfan.png",
      description: "A free link in bio for founders.",
    },
    {
      company: "Snake",
      href: "https://snakemed.it",
      badges: [],
      logoUrl: "/snake.png",
      description: "Defend your health, smarter.",
    },
    {
      company: "Blue Sky Analytics",
      href: "https://bsky.uno",
      badges: [],
      logoUrl: "/bsky.png",
      description: "A free link in bio for founders.",
    },
    {
      company: "SubsMap.com",
      href: "https://subsmap.com",
      badges: [],
      logoUrl: "/subs.png",
      description: "A map of all the subscriptions you have.",
    },
    {
      company: "Shipper",
      href: "https://shipper.studio/",
      badges: [],
      logoUrl: "/shipper.png",
      description: "NextJS Boilerplate to ship app faster.",
    },
    {
      company: "Astroport",
      href: "https://astroport.it/",
      badges: [],
      logoUrl: "/astro.png",
      description: "Indie Hacker's Toolkit",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16 space-y-6">
      <h2 className="text-2xl font-medium">websites shipped</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {shipped.map((project) => (
          <div
            key={project.company}
            onClick={() => window.open(project.href, "_blank")}
            className="group cursor-pointer"
          >
            <Card className="h-full border border-border hover:border-primary/60 transition-all duration-200 hover:shadow-md rounded-none bg-background">
              <CardHeader className="">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                    <img
                      src={`/work/${project.logoUrl}`}
                      alt={`${project.company} logo`}
                      className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = project.company
                            .charAt(0)
                            .toUpperCase();
                          parent.className +=
                            " text-sm font-medium text-muted-foreground";
                        }
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-medium text-sm sm:text-base truncate group-hover:text-primary transition-colors">
                        {project.company}
                      </h3>
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
