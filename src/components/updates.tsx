export function Updates() {
  const updates = [
    {
      date: "aug 24",
      status: "planning",
      title: "first customers",
      description: "need brave souls to fund a broke founder's dream.",
    },
    {
      date: "aug 24",
      status: "done",
      title: "transparency page",
      description: "live revenue (still $0 lmao), traffic stats, open build.",
    },
    //{
    //date: "aug 21",
    //status: "building",
    //title: "dashboard",
    //description: "client portal for requests, status, and turnaround.",
    //progress: 40,
    //},
    {
      date: "aug 24",
      status: "done",
      title: "pricing",
      description: "$900/mo → rent money for me, science money for medtech.",
    },
    {
      date: "aug 23",
      status: "done",
      title: "launch site",
      description: "first version of uara.co online. subscription is live.",
      progress: 50,
    },
    {
      date: "aug 23",
      status: "done",
      title: "pivot decision",
      description: "all-in on medtech → websites on subscription to survive.",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "done":
        return "✓";
      case "building":
        return "◯";
      case "planning":
        return "◇";
      default:
        return "·";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "done":
        return "text-green-600 dark:text-green-400";
      case "building":
        return "text-amber-600 dark:text-yellow-400";
      case "planning":
        return "text-blue-600 dark:text-blue-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16">
      {/* Rough header */}
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-mono relative">
          updates & progress
          {/* Rough underline */}
          <div className="absolute -bottom-1 left-0 w-full h-1 opacity-60">
            <svg
              width="100%"
              height="4"
              viewBox="0 0 400 4"
              className="text-teal-400"
              preserveAspectRatio="none"
            >
              <path
                d="M0,2 Q10,1 20,2 T40,2 T60,1 T80,2 T100,2 T120,1 T140,2 T160,2 T180,1 T200,2 T220,2 T240,1 T260,2 T280,2 T300,1 T320,2 T340,2 T360,1 T380,2 T400,2"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
        </h2>
        <p className="text-muted-foreground text-sm font-mono opacity-80">
          // building in public, staying accountable
        </p>
      </div>

      {/* Simple scratchy list */}
      <div className="space-y-8 mb-16">
        {updates.map((update, index) => (
          <div key={index} className="relative group">
            {/* Rough bullet point */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <span
                  className={`font-mono text-xl font-bold ${getStatusColor(
                    update.status
                  )}`}
                >
                  {getStatusIcon(update.status)}
                </span>
              </div>

              <div className="flex-1 space-y-1">
                {/* Date in corner */}
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg font-bold text-foreground font-mono relative">
                    {update.title}
                    {/* Scratchy underline for titles */}
                    <div className="absolute -bottom-0.5 left-0 w-full h-0.5 opacity-40">
                      <svg
                        width="100%"
                        height="2"
                        viewBox="0 0 200 2"
                        className="text-current"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0,1 Q5,0.5 10,1 T20,1 T30,0.5 T40,1 T50,1 T60,0.5 T70,1 T80,1 T90,0.5 T100,1 T110,1 T120,0.5 T130,1 T140,1 T150,0.5 T160,1 T170,1 T180,0.5 T190,1 T200,1"
                          stroke="currentColor"
                          strokeWidth="1"
                          fill="none"
                        />
                      </svg>
                    </div>
                  </h3>
                  <span className="text-xs text-muted-foreground font-mono opacity-60">
                    {update.date}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed font-mono">
                  {update.description}
                </p>

                {/* Status indicator */}
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`text-xs font-mono px-2 py-0.5 rounded-sm border ${
                      update.status === "done"
                        ? "border-green-400/30 bg-green-400/10 text-green-400"
                        : update.status === "building"
                        ? "border-amber-400/30 bg-amber-400/10 text-amber-400"
                        : "border-blue-400/30 bg-blue-400/10 text-blue-400"
                    }`}
                  >
                    {update.status}
                  </span>
                </div>

                {/* Progress bar if exists */}
                {update.progress && (
                  <div className="mt-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted/50 rounded-none relative overflow-hidden">
                        {/* Rough progress bar */}
                        <div
                          className="h-full bg-teal-400/70 transition-all duration-300"
                          style={{
                            width: `${update.progress}%`,
                            clipPath:
                              "polygon(0 10%, 100% 0%, 100% 90%, 0% 100%)",
                          }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">
                        {update.progress}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Rough separator line */}
            <div className="mt-6 opacity-20">
              <svg
                width="100%"
                height="2"
                viewBox="0 0 400 2"
                className="text-muted-foreground"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,1 Q10,0.5 20,1 T40,1 T60,0.5 T80,1 T100,1 T120,0.5 T140,1 T160,1 T180,0.5 T200,1 T220,1 T240,0.5 T260,1 T280,1 T300,0.5 T320,1 T340,1 T360,0.5 T380,1 T400,1"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Next up section - simple scratchy style */}
      <div className="border-l-2 border-dashed border-muted-foreground/30 pl-6">
        <h3 className="text-xl font-bold text-foreground mb-6 font-mono relative">
          next up:
          <div className="absolute -bottom-0.5 left-0 w-20 h-0.5 opacity-40">
            <svg
              width="100%"
              height="2"
              viewBox="0 0 80 2"
              className="text-teal-400"
              preserveAspectRatio="none"
            >
              <path
                d="M0,1 Q5,0.5 10,1 T20,1 T30,0.5 T40,1 T50,1 T60,0.5 T70,1 T80,1"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </div>
        </h3>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-amber-400 font-mono text-lg mt-0.5">◯</span>
            <span className="text-sm font-mono text-foreground">
              finish dashboard (50% done)
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-amber-400 font-mono text-lg mt-0.5">◯</span>
            <span className="text-sm font-mono text-foreground">
              complete legal docs
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-blue-400 font-mono text-lg mt-0.5">◇</span>
            <span className="text-sm font-mono text-foreground">
              find first 10 customers
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
