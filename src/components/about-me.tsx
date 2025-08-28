import Image from "next/image";
import Link from "next/link";

export function AboutMe() {
  return (
    <div className="w-full space-y-16 max-w-4xl mx-auto px-4 py-16">
      {/* Story Block */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Photo Section */}
        <div className="code-block space-y-4 flex-shrink-0">
          <Image
            src="/ff.jpg"
            alt="Federico"
            width={128}
            height={128}
            className="rounded-md"
          />
        </div>

        {/* Story Section */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-medium text-foreground">
            about me<span className="text-teal-300">.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-4xl">
            hi, i&apos;m{" "}
            <Link
              href="https://federicofan.com"
              target="_blank"
              className="text-teal-300 hover:underline hover:underline-offset-4"
            >
              federico
            </Link>{" "}
            — medtech founder. i invested my savings into hardware, software,
            and regulatory fun times. cash runway: short. so i&apos;m doing what
            i do best: shipping simple websites fast. you get a clean site; i
            keep the dream alive.
          </p>
          <p className="text-sm text-muted-foreground font-mono">
            → this is my &quot;please buy a website so i can afford coffee&quot;
            face.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="space-y-8">
        <h3 className="text-xl font-medium text-foreground">values:</h3>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-green-400 font-mono text-sm">◇</span>
              <h4 className="text-sm font-medium">ship fast, fix fast</h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              broken is better than perfect (and late). i iterate, not
              procrastinate.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-green-400 font-mono text-sm">◇</span>
              <h4 className="text-sm font-medium">
                plain language &gt; buzzwords
              </h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              no &quot;synergistic paradigm shifts.&quot; just websites that
              work.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-green-400 font-mono text-sm">◇</span>
              <h4 className="text-sm font-medium">radical transparency</h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              my startup burn rate is public. everything will be documented.
              honesty &gt; hustle culture.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="space-y-6">
        <div className="code-block space-y-4">
          <h3 className="text-lg font-medium text-foreground">
            work together, cmon
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 terminal-prompt">
              <span className="text-muted-foreground">1.</span>
              <span>you tell me what you need.</span>
            </div>
            <div className="flex items-center gap-2 terminal-prompt">
              <span className="text-muted-foreground">2.</span>
              <span>i code like my startup depends on it.</span>
            </div>
            <div className="flex items-center gap-2 terminal-prompt">
              <span className="text-muted-foreground">3.</span>
              <span>you get a website. i get coffee money.</span>
            </div>
            <div className="flex items-center gap-2 terminal-prompt">
              <span className="text-muted-foreground">4.</span>
              <span>everyone wins.</span>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              let&apos;s build something beautiful:
            </p>
            {/* Subscribe component will be integrated here */}
            <div className="text-xs text-teal-300 font-mono">
              flat monthly fee. pause anytime. no drama.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
