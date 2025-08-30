"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";

export function Shipped() {
  const shipped = [
    {
      company: "Boschitt.com",
      href: "https://boschitt.com",
      logoUrl: "/boschitt.jpeg",
      description: "Gardening services website — SEO-optimized.",
    },
    {
      company: "GymBrah.com",
      href: "https://gymbrah.com",
      logoUrl: "/gymbrah.png",
      description: "Run your fitness business without chaos. Open Source.",
    },
    {
      company: "fed.fan",
      href: "https://fed.fan",
      logoUrl: "/fedfan.png",
      description: "A free link in bio for founders.",
    },
    {
      company: "Snake",
      href: "https://snakemed.it",
      logoUrl: "/snake.png",
      description: "Defend your health, smarter.",
    },
    {
      company: "Blue Sky Analytics",
      href: "https://bsky.uno",
      logoUrl: "/bsky.png",
      description: "Blue Sky social analytics platform.",
    },
    {
      company: "SubsMap.com",
      href: "https://subsmap.com",
      logoUrl: "/subs.png",
      description: "A map of all the subscriptions you have.",
    },
    {
      company: "Shipper",
      href: "https://shipper.studio/",
      logoUrl: "/shipper.png",
      description: "NextJS Boilerplate to ship app faster.",
    },
    {
      company: "Astroport",
      href: "https://astroport.it/",
      logoUrl: "/astro.png",
      description: "Indie Hacker's Toolkit",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-24 mb-24">
      <div className="text-center space-y-2 mb-8">
        <p className="text-xs font-mono text-teal-300 uppercase tracking-wider">
          WEBSITES SHIPPED
        </p>
        <h3 className="text-lg font-semibold text-foreground">
          Recent Work & Projects
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {shipped.map((project) => (
          <div
            key={project.company}
            onClick={() => window.open(project.href, "_blank")}
            className="group cursor-pointer border border-border rounded-lg p-4 bg-background/50 hover:bg-background/80 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-teal-300/20 transition-colors">
                <Image
                  src={`/work${project.logoUrl}`}
                  alt={`${project.company} logo`}
                  width={16}
                  height={16}
                  className="w-4 h-4 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = project.company
                        .charAt(0)
                        .toUpperCase();
                      parent.className +=
                        " text-xs font-medium text-muted-foreground";
                    }
                  }}
                />
              </div>
              <div className="flex items-center justify-between flex-1 min-w-0">
                <span className="text-sm font-medium truncate group-hover:text-teal-300 transition-colors">
                  {project.company}
                </span>
                <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-teal-300 transition-colors flex-shrink-0 ml-2" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
