"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function Menu() {
  const links = [
    { href: "/how-it-works", label: "How It Works" },
    { href: "/wall-of-love", label: "Wall of Love" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        type="button"
        className="items-center font-mono gap-0.5 text-muted-foreground outline-none text-sm hidden md:flex"
      >
        More <ChevronDown className="size-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="max-h-[300px] overflow-y-auto text-muted-foreground"
      >
        {links.map((link) => (
          <DropdownMenuItem key={link.href} className="text-xs font-mono">
            <Link href={link.href}>{link.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
