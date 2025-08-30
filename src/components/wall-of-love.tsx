export function WallOfLove() {
  const testimonials = [
    {
      name: "Priyanka Saini",
      role: "Founder @ feedspace.io",
      content:
        "Very cool !  love the mission behind Uara Best of luck pushing the MVP live and driving science forward 🙌🏽",
      highlight: "love the mission behind Uara",
      avatar: "/ppl/ps.jpg",
      xLink: "https://x.com/PriyankaSaini28",
    },
    {
      name: "Maxime Beaudoin",
      role: "SW Engineer",
      content:
        "Pretty cool website and service ! Like the brutal honest stats too !",
      highlight: "cool website and service",
      avatar: "/ppl/mb.jpeg",
      xLink: "https://x.com/maximbeaudoin",
    },
  ];

  return (
    <div className="w-full space-y-16 max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="text-center space-y-2 mb-8">
          <p className="text-xs font-mono text-teal-300 uppercase tracking-wider">
            WALL OF LOVE
          </p>
          <h3 className="text-lg font-semibold text-foreground">
            First Impressions and Testimonials
          </h3>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => {
          const renderContentWithHighlight = (
            content: string,
            highlight: string
          ) => {
            if (!highlight) return content;

            const parts = content.split(highlight);
            if (parts.length === 1) return content;

            return (
              <>
                {parts[0]}
                <span className="text-teal-300 font-medium">{highlight}</span>
                {parts[1]}
              </>
            );
          };

          return (
            <div
              key={index}
              className="border border-border rounded-lg p-6 space-y-4 hover:border-teal-300/50 transition-colors"
            >
              {/* Content */}
              <div className="space-y-3">
                <p className="text-base text-muted-foreground leading-relaxed">
                  &quot;
                  {renderContentWithHighlight(
                    testimonial.content,
                    testimonial.highlight
                  )}
                  &quot;
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <a
                    href={testimonial.xLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-medium text-foreground hover:text-teal-300 transition-colors"
                  >
                    {testimonial.name},
                  </a>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
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
