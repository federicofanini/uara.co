import Link from "next/link";

export function FAQ() {
  const faqs = [
    {
      question: "How much does it cost?",
      answer: (
        <div className="space-y-2">
          <p>Flat $900/mo.</p>
          <p>Unlimited requests, one active at a time.</p>
          <p>Cancel or pause whenever.</p>
          <p className="text-teal-300 font-mono text-sm">
            aka: &quot;Netflix for websites, but I actually build stuff.&quot;
          </p>
        </div>
      ),
    },
    {
      question: "How fast do you ship?",
      answer: (
        <div className="space-y-2">
          <p>Most tasks: 2–3 business days.</p>
          <p>Sometimes faster.</p>
          <p>
            If it&apos;s bigger → I&apos;ll chop it into smaller tasks so we
            keep momentum.
          </p>
        </div>
      ),
    },
    {
      question: "What do I actually get?",
      answer: (
        <div className="space-y-2">
          <p>Clean, modern websites using Next.js + Tailwind + Shadcn.</p>
          <p>
            Think: landing pages, pricing pages, blog sections, forms, speed
            fixes.
          </p>
          <p className="text-teal-300 font-mono text-sm">
            Stuff you can ship now and brag about tomorrow.
          </p>
        </div>
      ),
    },
    {
      question: "What's not included?",
      answer: (
        <div className="space-y-1">
          <div className="flex items-start gap-2">
            <span className="text-red-400 font-mono text-sm mt-1">×</span>
            <p className="text-sm">Giant webapps / enterprise dashboards</p>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-red-400 font-mono text-sm mt-1">×</span>
            <p className="text-sm">Native mobile apps</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-400 font-mono text-sm mt-1">×</span>
            <p className="text-sm">
              AI metaverses on blockchain (sorry web3 bros)
            </p>
          </div>
        </div>
      ),
    },
    {
      question: "Do you do calls?",
      answer: (
        <div className="space-y-2">
          <p>Not really. I do commits.</p>
          <p>
            We can do a quick kickoff if needed, but 99% async = faster + less
            awkward.
          </p>
        </div>
      ),
    },
    {
      question: "Who owns the code?",
      answer: (
        <div className="space-y-2">
          <p>You. 100%.</p>
          <p>
            The repo lives in your org. Even if you cancel, it&apos;s still
            yours.
          </p>
        </div>
      ),
    },
    {
      question: "How do I request stuff?",
      answer: (
        <div className="space-y-2">
          <p>You&apos;ll get a simple dashboard + form.</p>
          <p>Add all the requests you want → I pick one → ship → repeat.</p>
          <p className="text-teal-300 font-mono text-sm">
            Bonus: you&apos;ll feel productive just by typing them in.
          </p>
        </div>
      ),
    },
    {
      question: "Pause vs Cancel?",
      answer: (
        <div className="space-y-2">
          <p>
            <span className="font-medium">Pause</span> = stop billing, keep your
            spot, come back later.
          </p>
          <p>
            <span className="font-medium">Cancel</span> = it&apos;s over,
            you&apos;ll need to re-subscribe (and i&apos;ll cry).
          </p>
          <p className="text-yellow-400 font-mono text-sm">
            Hint: pause is safer for both of us.
          </p>
        </div>
      ),
    },
    {
      question: "Refunds?",
      answer: (
        <div className="space-y-2">
          <p>
            Nope. Cancel anytime, but I don&apos;t give back money. We have
            unlimited reviews to make it perfect.
          </p>
        </div>
      ),
    },
    {
      question: "Can you host my site?",
      answer: (
        <div className="space-y-2">
          <p>Yep → I deploy to Vercel + hook up your domain.</p>
          <p>You still own everything.</p>
        </div>
      ),
    },
    {
      question: "Tech stack?",
      answer: (
        <div className="space-y-2">
          <p>
            Next.js · Tailwind · Shadcn · Supabase (if needed) · Stripe ·
            Resend.
          </p>
          <p className="text-teal-300 font-mono text-sm">
            Feel free to ask for more, we&apos;ll discuss it.
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
          FAQ<span className="text-teal-300">.</span>
        </h2>
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
        <span className="text-lg font-medium text-foreground">
          Till have questions? Reach out on{" "}
          <Link
            href="https://x.com/FedericoFan"
            target="_blank"
            className="text-teal-300 hover:underline hover:underline-offset-4"
          >
            X/Twitter
          </Link>
          .
        </span>
      </div>
    </div>
  );
}
