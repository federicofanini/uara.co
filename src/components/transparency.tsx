import { TransparencyRevenue } from "./transparency-revenue";
import { TransparencyGoals } from "./transparency-goals";
import { DottedSeparator } from "./dotted-separator";

export function Transparency() {
  return (
    <div className="w-full space-y-16 max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-medium text-foreground">
          transparency<span className="text-teal-300">.</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          building in public. sharing real numbers. documenting the journey from
          broke medtech founder to (hopefully) sustainable website subscription
          business.
        </p>
        <p className="text-xs text-muted-foreground font-mono">
          → updated weekly. no vanity metrics. no bullshit.
        </p>
      </div>

      {/* Revenue Section */}
      <TransparencyRevenue />

      <DottedSeparator />

      {/* Goals Section */}
      <TransparencyGoals />

      <DottedSeparator />

      {/* Footer Message */}
      <div className="code-block space-y-4">
        <h3 className="text-lg font-medium text-foreground">
          why this level of transparency?
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 terminal-prompt">
            <span className="text-teal-300">trust:</span>
            <span className="text-sm">
              if you&apos;re considering hiring me, you deserve to know where i
              stand
            </span>
          </div>
          <div className="flex items-center gap-2 terminal-prompt">
            <span className="text-teal-300">accountability:</span>
            <span className="text-sm">
              public goals keep me honest and motivated
            </span>
          </div>
          <div className="flex items-center gap-2 terminal-prompt">
            <span className="text-teal-300">learning:</span>
            <span className="text-sm">
              documenting this experiment for others to learn from
            </span>
          </div>
          <div className="flex items-center gap-2 terminal-prompt">
            <span className="text-teal-300">motivation:</span>
            <span className="text-sm">
              i&apos;m too motivated to fake it till i make it
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground font-mono">
            → follow the journey on{" "}
            <a
              href="https://x.com/FedericoFan"
              target="_blank"
              className="text-teal-300 hover:underline"
            >
              x/twitter
            </a>
            . questions? dm me there.
          </p>
        </div>
      </div>
    </div>
  );
}
