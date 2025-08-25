export function Updates() {
  const updates = [
    {
      date: "aug 24",
      status: "planning",
      title: "first customers",
      description: "need brave souls to fund a broke founder’s dream.",
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
      description: "$790/mo → rent money for me, science money for medtech.",
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
        return "text-green-400";
      case "building":
        return "text-yellow-400";
      case "planning":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="w-full space-y-16 max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-medium text-foreground">
          updates<span className="text-teal-300">.</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          building in public. staying accountable.
        </p>
      </div>

      {/* Updates List */}
      <div className="space-y-6">
        {updates.map((update, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center gap-3">
              <span
                className={`font-mono text-sm ${getStatusColor(update.status)}`}
              >
                {getStatusIcon(update.status)}
              </span>
              <span className="text-sm font-medium text-foreground">
                {update.title}
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                {update.date}
              </span>
            </div>
            <p className="text-sm text-muted-foreground pl-6">
              {update.description}
            </p>
            {update.progress && (
              <div className="pl-6">
                <div className="w-32 bg-muted rounded-full h-1">
                  <div
                    className="bg-teal-300 h-1 rounded-full"
                    style={{ width: `${update.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Current Focus */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">
          next up<span className="text-teal-300">:</span>
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 font-mono text-sm">◯</span>
            <span className="text-sm">finish dashboard (50% done)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 font-mono text-sm">◯</span>
            <span className="text-sm">complete legal docs</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-400 font-mono text-sm">◇</span>
            <span className="text-sm">find first 10 customers</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground font-mono pt-2">
          → launch target: late august 2025
        </p>
      </div>
    </div>
  );
}
