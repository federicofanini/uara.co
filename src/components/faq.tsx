export function FAQ() {
  const faqs = [
    {
      question: "how much does it cost?",
      answer: (
        <div className="space-y-2">
          <p>flat €790/mo.</p>
          <p>unlimited requests, one active at a time.</p>
          <p>cancel or pause whenever.</p>
          <p className="text-teal-300 font-mono text-sm">
            aka: &quot;netflix for websites, but i actually build stuff.&quot;
          </p>
        </div>
      ),
    },
    {
      question: "how fast do you ship?",
      answer: (
        <div className="space-y-2">
          <p>most tasks: 2–3 business days.</p>
          <p>sometimes faster.</p>
          <p>
            if it&apos;s bigger → i&apos;ll chop it into smaller tasks so we
            keep momentum.
          </p>
        </div>
      ),
    },
    {
      question: "what do i actually get?",
      answer: (
        <div className="space-y-2">
          <p>clean, modern websites using next.js + tailwind + shadcn.</p>
          <p>
            think: landing pages, pricing pages, blog sections, forms, speed
            fixes.
          </p>
          <p className="text-teal-300 font-mono text-sm">
            stuff you can ship now and brag about tomorrow.
          </p>
        </div>
      ),
    },
    {
      question: "what's not included?",
      answer: (
        <div className="space-y-1">
          <div className="flex items-start gap-2">
            <span className="text-red-400 font-mono text-sm mt-1">×</span>
            <p className="text-sm">giant webapps / enterprise dashboards</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-400 font-mono text-sm mt-1">×</span>
            <p className="text-sm">
              &quot;just one tiny feature&quot; that eats 3 months
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-400 font-mono text-sm mt-1">×</span>
            <p className="text-sm">native mobile apps</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-400 font-mono text-sm mt-1">×</span>
            <p className="text-sm">
              ai metaverses on blockchain (sorry web3 bros)
            </p>
          </div>
        </div>
      ),
    },
    {
      question: "do you do calls?",
      answer: (
        <div className="space-y-2">
          <p>not really. i do commits.</p>
          <p>
            we can do a quick kickoff if needed, but 99% async = faster + less
            awkward.
          </p>
        </div>
      ),
    },
    {
      question: "who owns the code?",
      answer: (
        <div className="space-y-2">
          <p>you. 100%.</p>
          <p>
            the repo lives in your org. even if you cancel, it&apos;s still
            yours.
          </p>
        </div>
      ),
    },
    {
      question: "how do i request stuff?",
      answer: (
        <div className="space-y-2">
          <p>you&apos;ll get a simple dashboard + form.</p>
          <p>add all the requests you want → i pick one → ship → repeat.</p>
          <p className="text-teal-300 font-mono text-sm">
            bonus: you&apos;ll feel productive just by typing them in.
          </p>
        </div>
      ),
    },
    {
      question: "pause vs cancel?",
      answer: (
        <div className="space-y-2">
          <p>
            <span className="font-medium">pause</span> = stop billing, keep your
            spot, come back later.
          </p>
          <p>
            <span className="font-medium">cancel</span> = it&apos;s over,
            you&apos;ll need to re-subscribe (and i&apos;ll cry).
          </p>
          <p className="text-yellow-400 font-mono text-sm">
            hint: pause is safer for both of us.
          </p>
        </div>
      ),
    },
    {
      question: "refunds?",
      answer: (
        <div className="space-y-2">
          <p>
            nope. cancel anytime, but i don&apos;t venmo back money i already
            invested in science.
          </p>
        </div>
      ),
    },
    {
      question: "can you host my site?",
      answer: (
        <div className="space-y-2">
          <p>yep → i deploy to vercel + hook up your domain.</p>
          <p>you still own everything.</p>
        </div>
      ),
    },
    {
      question: "tech stack?",
      answer: (
        <div className="space-y-2">
          <p>
            next.js · tailwind · shadcn · supabase (if needed) · stripe ·
            resend.
          </p>
          <p className="text-teal-300 font-mono text-sm">
            aka: all the buzzwords your startup friends love.
          </p>
        </div>
      ),
    },
    {
      question: "why are you doing this?",
      answer: (
        <div className="space-y-2">
          <p>because i blew all my money on my medtech startup.</p>
          <p>this keeps me alive while i keep funding science.</p>
          <p className="text-teal-300 font-mono text-sm">
            you get websites, i get survival. win-win.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full space-y-16 max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-medium text-foreground">
          faq<span className="text-teal-300">.</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          questions i get asked (and some i made up).
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              {faq.question}
            </h3>
            <div className="code-block">
              <div className="text-sm text-muted-foreground">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="space-y-6">
        <div className="code-block space-y-4">
          <h3 className="text-lg font-medium text-foreground">
            still have questions?
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 terminal-prompt">
              <span className="text-muted-foreground">→</span>
              <span>
                dm me on{" "}
                <a
                  href="https://x.com/FedericoFan"
                  target="_blank"
                  className="text-teal-300 hover:underline hover:underline-offset-4"
                >
                  x
                </a>{" "}
                with your question.
              </span>
            </div>
            <div className="flex items-center gap-2 terminal-prompt">
              <span className="text-muted-foreground">→</span>
              <span className="caffeine-jitter">
                i&apos;ll answer faster than you can say &quot;can we jump on a
                call?&quot;
              </span>
              <span className="caffeine-level-high"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
