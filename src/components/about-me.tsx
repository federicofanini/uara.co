import Image from "next/image";
import Link from "next/link";

export function AboutMe() {
  const reasons = [
    {
      title: "Real Skin in the Game",
      description:
        "I've spent my life savings building a medtech startup. When I work on your project, I'm not just another freelancer—I'm someone who truly understands what it's like to bet everything on an idea.",
    },
    {
      title: "Proven Ship-First Mentality",
      description:
        "While others debate perfect solutions, I ship. My medtech background taught me that done beats perfect every time. Your website will go live fast, then we iterate based on real user feedback.",
    },
    {
      title: "Founder-to-Founder Understanding",
      description:
        "I know the pressure of runway anxiety, investor meetings, and sleepless nights. When you hire me, you get someone who viscerally understands your urgency and treats your project like their own survival depends on it.",
    },
    {
      title: "Radical Transparency Promise",
      description:
        "My startup's burn rate is public. My progress is documented. No black box, no surprises. You'll always know exactly what I'm working on and why. This isn't just a service—it's a partnership built on trust.",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-24 mb-24">
      <div className="text-center space-y-2 mb-8">
        <p className="text-xs font-mono text-teal-300 uppercase tracking-wider">
          FOUNDER&apos;S LETTER
        </p>
        <h3 className="text-lg font-semibold text-foreground">
          Why You Should Root for Me
        </h3>
      </div>

      {/* Personal Story */}
      <div className="border border-border rounded-lg p-6 bg-background/50 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-shrink-0">
            <Image
              src="/ff.jpg"
              alt="Federico"
              width={80}
              height={80}
              className="rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Hi, I&apos;m{" "}
              <Link
                href="https://federicofan.com"
                target="_blank"
                className="text-teal-300 hover:text-teal-200 transition-colors"
              >
                Federico
              </Link>
              . Three years ago, I started building a medtech startup that could
              save lives. I&apos;ve invested everything — my savings, my time,
              my sanity — into making it real.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Plot twist: Hardware is expensive. Regulatory approval takes
              forever. My runway is getting shorter by the day. But instead of
              giving up, I&apos;m doing what I do best — shipping websites.
              Every project I take on directly funds my mission to revolutionize
              healthcare.
            </p>
            <p className="text-xs text-teal-300 font-mono">
              → This isn&apos;t just freelancing. It&apos;s keeping a dream
              alive, one website at a time.
            </p>
          </div>
        </div>
      </div>

      {/* Why Care Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {reasons.map((reason, index) => (
          <div
            key={reason.title}
            className="border border-border rounded-lg p-4 bg-background/50 hover:bg-background/80 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-teal-300 font-mono text-sm font-bold">
                {index + 1}.
              </span>
              <span className="text-sm font-medium">{reason.title}</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {reason.description}
            </p>
          </div>
        ))}
      </div>

      {/* Long-term Commitment */}
      <div className="border border-border rounded-lg p-6 bg-background/50">
        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
          <span className="text-teal-300">🚀</span>
          My Promise to You
        </h4>
        <div className="space-y-3 text-xs text-muted-foreground">
          <p>
            <strong className="text-foreground">
              This isn&apos;t a side hustle.
            </strong>{" "}
            Every website I build is a stepping stone toward something bigger.
            When my medtech startup takes off (and it will), I&apos;ll remember
            every founder who believed in me when times were tough.
          </p>
          <p>
            <strong className="text-foreground">
              I&apos;m building a reputation, not just revenue.
            </strong>{" "}
            Your success stories become my case studies. Your referrals become
            my network. We&apos;re not just doing business — we&apos;re building
            something together.
          </p>
          <p>
            <strong className="text-foreground">
              The startup community needs more builders.
            </strong>{" "}
            By working with me, you&apos;re supporting someone who&apos;s
            actually in the arena, taking real risks, and fighting to make
            something meaningful happen.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs text-teal-300 font-mono">
            → When you hire me, you&apos;re not just getting a website.
            You&apos;re betting on a fellow founder who will remember who stood
            by them when it mattered.
          </p>
        </div>
      </div>
    </div>
  );
}
