"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function Menu() {
  const links = [
    { href: "/how-it-works", label: "how it works" },
    { href: "/wall-of-love", label: "wall of love" },
    { href: "/faq", label: "faq" },
    { href: "/updates", label: "updates" },
    { href: "/blog", label: "blog" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        type="button"
        className="items-center gap-2 text-muted-foreground outline-none text-sm hidden md:flex"
      >
        others
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="max-h-[300px] overflow-y-auto text-muted-foreground"
      >
        {links.map((link) => (
          <DropdownMenuItem key={link.href} className="text-xs">
            <Link href={link.href}>{link.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
