import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";

/*
hey designers,

i need a logo — here’s the vibe:

- funny + humble broke-founder energy
- minimal (no overcomplicated dribbble gradients pls)
- should look clean in:
    - dark mode (default)
    - favicon (tiny square, still recognizable)
    - twitter/x og images (wide format)
- should scream: dev websites, but indie hacker meme style”

inspo directions (pick one, surprise me):
- text logo (uara) with a quirky tweak (underline, cursor, handdrawn vibe)
- tiny mascot (like a stressed raccoon with a laptop? optional lol)
- ascii/code aesthetic (curly braces, brackets, terminal cursor)

rules:
- keep it lightweight (svg or png, no 12MB figma exports)
- must scale from favicon → social header
- 2 versions: full logo + icon/mark
- deliverables: `.svg` + `.png` + `.ico`

budget: €0 (i’m broke, remember?) — but your design goes live on the repo + site with credits

tl;dr: 
make it clean, funny, usable everywhere.
if it looks like “corporate consulting agency”, i will cry.
*/

export function Logo() {
  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger className="block">
        <span className="inline-flex items-center rounded-md border border-dashed border-zinc-700/60 px-2 py-1 font-mono text-xs text-zinc-400 hover:text-zinc-100">
          <span className="font-semibold">uara</span>
          <span className="rounded-sm bg-zinc-900/60 py-0.5 text-[9px] uppercase tracking-widest text-emerald-400">
            .co
          </span>
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="mt-4 w-72 p-3">
        <div className="space-y-2 text-xs font-mono text-zinc-400">
          <p>design fam, pls ship a logo</p>
          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/federicofanini/uara.co/blob/main/src/components/logo.tsx"
              className="rounded-sm bg-emerald-500/10 px-2 py-1 text-emerald-400 underline underline-offset-4 hover:bg-emerald-500/20"
            >
              open brief / drop a PR
            </Link>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
