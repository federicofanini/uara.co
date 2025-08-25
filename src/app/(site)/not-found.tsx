import Link from "next/link";

export default function NotFound() {
  return (
    <div className="p-4 flex flex-col items-center justify-center px-4 py-12 max-w-4xl mx-auto">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-foreground leading-tight">
            404 — page not ready (yet)
            <span className="text-teal-300">.</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            today is <span className="font-mono text-teal-300">08/24/2025</span>{" "}
            and i literally just started coding this site. this page will exist…
            for now, imagine something here.
          </p>
        </div>

        <div className="code-block space-y-2 max-w-lg mx-auto">
          <div className="flex items-center gap-2 terminal-prompt">
            <span className="text-muted-foreground">error:</span>
            <span>page.tsx not found</span>
          </div>
          <div className="flex items-center gap-2 terminal-prompt">
            <span className="text-muted-foreground">status:</span>
            <span className="status-critical">broke founder priorities</span>
          </div>
          <div className="flex items-center gap-2 terminal-prompt">
            <span className="text-muted-foreground">reason:</span>
            <span className="caffeine-jitter">chose coffee over coding</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground italic max-w-md mx-auto">
          (yes i&apos;m building in public, no i didn&apos;t forget about this
          page —{" "}
          <Link
            href="https://x.com/FedericoFan"
            target="_blank"
            className="underline underline-offset-2 hover:text-primary"
          >
            follow me
          </Link>{" "}
          to see this page coming to life)
        </p>

        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm"
          >
            take me back home
          </Link>
        </div>
      </div>
    </div>
  );
}
