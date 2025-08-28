export function WallOfLove() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Founder @ TechFlow",
      content:
        "Federico shipped our landing page in 2 days. Clean, fast, and exactly what we needed. No meetings, no drama, just results.",
      avatar: "SC",
    },
    {
      name: "Marcus Rodriguez",
      role: "CEO @ DataVibe",
      content:
        "Best subscription I've ever had. Unlimited requests, fast turnaround, and the guy actually knows what he's doing.",
      avatar: "MR",
    },
    {
      name: "Emily Watson",
      role: "Product Lead @ StartupX",
      content:
        "Finally, someone who gets it. No calls, no BS, just beautiful websites. Federico is a machine.",
      avatar: "EW",
    },
    {
      name: "David Kim",
      role: "Indie Hacker",
      content:
        "Paused my subscription for 3 months, came back, and Federico was still there. Reliable as hell.",
      avatar: "DK",
    },
    {
      name: "Lisa Thompson",
      role: "Designer @ CreativeCo",
      content:
        "I'm a designer and even I use Federico for dev work. His shadcn implementations are *chef's kiss*",
      avatar: "LT",
    },
    {
      name: "Alex Turner",
      role: "Founder @ GrowthLabs",
      content:
        "Tried 5 different agencies. Federico beats them all. One dude > entire teams.",
      avatar: "AT",
    },
    {
      name: "Maria Santos",
      role: "CMO @ BrandFlow",
      content:
        "Our site went from embarrassing to professional in one week. Worth every euro.",
      avatar: "MS",
    },
    {
      name: "James Wilson",
      role: "CTO @ TechStack",
      content:
        "Federico's code is cleaner than my apartment. And I'm pretty neat.",
      avatar: "JW",
    },
    {
      name: "Rachel Green",
      role: "Startup Founder",
      content:
        "Needed a pricing page ASAP. Federico delivered in 1.5 days. Now we're actually making money.",
      avatar: "RG",
    },
    {
      name: "Tom Anderson",
      role: "Product Manager",
      content:
        "The only developer who doesn't ask for a 2-hour discovery call. Just ships.",
      avatar: "TA",
    },
    {
      name: "Sophie Martin",
      role: "E-commerce Owner",
      content:
        "My conversion rate doubled after Federico redesigned our hero section. Magic.",
      avatar: "SM",
    },
    {
      name: "Chris Lee",
      role: "SaaS Founder",
      content:
        "Been subscribed for 6 months. Zero regrets. This man is funding science with websites.",
      avatar: "CL",
    },
  ];

  return (
    <div className="w-full space-y-16 max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-medium text-foreground">
          wall of love<span className="text-teal-300">.</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          real people, real websites, real results.
        </p>
        <p className="text-xs text-muted-foreground font-mono">
          (ok, these are from gpt5, but i&apos;m sure i can add similar in a
          while)
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-background/50 backdrop-blur-sm border border-border rounded-lg p-6 space-y-4 hover:border-teal-300/50 transition-colors"
          >
            {/* Content */}
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-300/10 border border-teal-300/20 flex items-center justify-center">
                <span className="text-xs font-mono text-teal-300">
                  {testimonial.avatar}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-border">
        <div className="text-center space-y-2">
          <div className="text-2xl font-medium text-foreground">8</div>
          <div className="text-sm text-muted-foreground">websites shipped</div>
          <div className="text-xs text-muted-foreground font-mono">
            → and counting
          </div>
        </div>
        <div className="text-center space-y-2">
          <div className="text-2xl font-medium text-foreground">2</div>
          <div className="text-sm text-muted-foreground">avg days to ship</div>
          <div className="text-xs text-muted-foreground font-mono">
            → faster than your last deployment
          </div>
        </div>
        <div className="text-center space-y-2">
          <div className="text-2xl font-medium text-foreground">0</div>
          <div className="text-sm text-muted-foreground">zoom calls forced</div>
          <div className="text-xs text-muted-foreground font-mono">
            → async ftw
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="space-y-6">
        <div className="code-block space-y-4">
          <h3 className="text-lg font-medium text-foreground">
            want to be on this wall?
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 terminal-prompt">
              <span className="text-muted-foreground">1.</span>
              <span>subscribe to the plan.</span>
            </div>
            <div className="flex items-center gap-2 terminal-prompt">
              <span className="text-muted-foreground">2.</span>
              <span>i build your website.</span>
            </div>
            <div className="flex items-center gap-2 terminal-prompt">
              <span className="text-muted-foreground">3.</span>
              <span>you get results, send me a nice message.</span>
            </div>
            <div className="flex items-center gap-2 terminal-prompt">
              <span className="text-muted-foreground">4.</span>
              <span className="text-teal-300">
                boom → you&apos;re on the wall of love.
              </span>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-xs text-muted-foreground font-mono">
              → testimonials help me pay rent and fund science. win-win.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
