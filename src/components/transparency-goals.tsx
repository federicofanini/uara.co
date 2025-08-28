import { Flame, Smile, Sparkles, Zap } from "lucide-react";

export function TransparencyGoals() {
  const goals = [
    {
      title: "survival",
      timeframe: "30 days",
      targets: [
        {
          metric: "paying customers",
          current: 0,
          target: 2,
          unit: "customers",
          priority: "critical",
          steps: ["pitch to 3 prospects weekly", "follow up on warm leads"],
        },
        {
          metric: "monthly revenue",
          current: 0,
          target: 1580,
          unit: "$",
          priority: "critical",
          steps: ["close 2 customers at $900/month", "launch premium tier"],
        },
      ],
    },
    {
      title: "growth",
      timeframe: "90 days",
      targets: [
        {
          metric: "paying customers",
          current: 0,
          target: 5,
          unit: "customers",
          priority: "critical",
          steps: ["content marketing push", "partnership deals"],
        },
        {
          metric: "monthly revenue",
          current: 0,
          target: 3950,
          unit: "$",
          priority: "critical",
          steps: ["5 customers × $900", "price optimization"],
        },
      ],
    },
    {
      title: "impact",
      timeframe: "end of year",
      targets: [
        {
          metric: "medtech funding",
          current: 0,
          target: 10000,
          unit: "$",
          priority: "critical",
          steps: [
            "profitable business = research capital $",
            "reinvest profit",
          ],
        },
        {
          metric: "websites shipped",
          current: 8,
          target: 50,
          unit: "websites",
          priority: "important",
          steps: ["streamline delivery process", "tasks automation"],
        },
      ],
    },
  ];

  const getProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "critical":
        return <Flame className="w-4 h-4" />;
      case "important":
        return <Zap className="w-4 h-4" />;
      case "nice-to-have":
        return <Sparkles className="w-4 h-4" />;
      case "realistic":
        return <Smile className="w-4 h-4" />;
      default:
        return <Smile className="w-4 h-4" />;
    }
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === "$") {
      return `$${value.toLocaleString()}`;
    }
    if (unit === "/5.0") {
      return `${value.toFixed(1)}/5.0`;
    }
    if (unit === "%") {
      return `${value}%`;
    }
    return `${value} ${unit}`;
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-medium text-foreground">
          goals<span className="text-teal-300">:</span>
        </h3>
      </div>

      <div className="space-y-8">
        {goals.map((goalGroup, groupIndex) => (
          <div key={groupIndex} className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-medium text-foreground">
                {goalGroup.title}
              </h4>
              <span className="text-xs text-muted-foreground font-mono">
                {goalGroup.timeframe}
              </span>
            </div>

            <div className="space-y-3">
              {goalGroup.targets.map((target, targetIndex) => (
                <div
                  key={targetIndex}
                  className="border border-border rounded-lg p-3 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs">
                        {getPriorityIcon(target.priority)}
                      </span>
                      <h5 className="text-sm font-medium text-foreground">
                        {target.metric}
                      </h5>
                    </div>
                    <div className="text-xs font-mono text-muted-foreground">
                      {formatValue(target.current, target.unit)} /{" "}
                      {formatValue(target.target, target.unit)}
                    </div>
                  </div>

                  <div className="w-full bg-muted rounded-full h-1">
                    <div
                      className="bg-teal-300 h-1 rounded-full transition-all duration-300"
                      style={{
                        width: `${getProgress(target.current, target.target)}%`,
                      }}
                    />
                  </div>

                  <div className="space-y-1">
                    {target.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-center gap-2">
                        <span className="text-teal-300 text-xs">→</span>
                        <span className="text-xs text-muted-foreground">
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Reality Check */}
      <div className="code-block space-y-4">
        <h4 className="text-lg font-medium text-foreground">reality check</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2 terminal-prompt">
            <span className="text-sm">
              current progress: 0 customers, $0 revenue (brutal honesty)
            </span>
          </div>
          <div className="flex items-center gap-2 terminal-prompt">
            <span className="text-sm">
              survival mode: need 2 customers by sep 15 or back to job hunting
            </span>
          </div>
          <div className="flex items-center gap-2 terminal-prompt">
            <span className="text-sm">
              runway burning: $200/day opportunity cost (not working elsewhere)
            </span>
          </div>
          <div className="flex items-center gap-2 terminal-prompt">
            <span className="text-sm">
              the mission: every usd of profit funds medtech research
            </span>
          </div>
        </div>
      </div>

      {/* Accountability */}
      <div className="bg-muted/50 border border-border rounded-lg p-6 space-y-4">
        <h4 className="text-lg font-medium text-foreground">
          why i&apos;m sharing this:
        </h4>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            most founders fake progress with vanity metrics. i&apos;m sharing
            real numbers and concrete steps.
          </p>
          <p>
            weekly updates, no fluff. if i miss survival goals by sep 15,
            i&apos;ll publicly document the failure and lessons learned.
          </p>
          <p>
            if i hit them, every usd of profit above living expenses goes
            straight into medtech research. receipts will be public.
          </p>
          <p className="text-teal-300 font-mono">
            → transparency is the only honest growth strategy when you&apos;re
            pushing hard.
          </p>
        </div>
      </div>
    </div>
  );
}
