"use client";

import { Logo } from "@/components/logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Icons } from "./ui/icons";

export function Footer({ fullWidth = false }: { fullWidth?: boolean }) {
  const pathname = usePathname();

  const mainLinks = [
    { href: "/works", label: "Works" },
    { href: "/pricing", label: "Pricing" },
    { href: "/how-it-works", label: "How It Works" },
  ];

  const otherLinks = [
    { href: "/wall-of-love", label: "Wall of Love" },
    { href: "/faq", label: "FAQ" },
    { href: "/blog", label: "Blog" },
  ];

  const socialLinks = [
    {
      href: "https://github.com/federicofanini/uara.co",
      icon: Icons.github,
      label: "GitHub",
    },
    { href: "https://x.com/FedericoFan", icon: Icons.x, label: "Twitter" },
    {
      href: "https://www.linkedin.com/in/federico-fanini/",
      icon: Icons.linkedin,
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="border-t border-border bg-background px-2 md:px-0">
      <div className={cn("mx-auto py-12", !fullWidth && "container")}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Tagline */}
          <div className="space-y-4">
            <Logo />
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-mono">
                Get a website, in days, for a flat fee.
              </p>
              <p className="text-[10px] text-muted-foreground">
                Ship without the stress. No endless revisions, no surprise
                costs, no missed deadlines. Just reliable execution, on demand.
              </p>
            </div>
          </div>

          {/* Main Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Main</h4>
            <div className="space-y-2">
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block text-xs text-muted-foreground hover:text-primary transition-colors",
                    pathname?.endsWith(link.href) && "text-primary"
                  )}
                  prefetch
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Other Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Other</h4>
            <div className="space-y-2">
              {otherLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block text-xs text-muted-foreground hover:text-primary transition-colors",
                    pathname?.endsWith(link.href) && "text-primary"
                  )}
                  prefetch
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social & Inside Jokes */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Social</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                {socialLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <link.icon className="size-4" />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-mono">
                You get a website. I fund science. Everyone wins.
              </p>
            </div>

            <div className="space-y-1 text-right">
              <p className="text-[10px] text-muted-foreground font-mono">
                <Link
                  href="https://x.com/pontusab"
                  target="_blank"
                  className="hover:underline hover:underline-offset-2 hover:text-teal-300"
                >
                  Pontus
                </Link>{" "}
                and{" "}
                <Link
                  href="https://x.com/viktorhofte"
                  target="_blank"
                  className="hover:underline hover:underline-offset-2 hover:text-teal-300"
                >
                  Viktor
                </Link>{" "}
                are my gurus
              </p>
              <p className="text-[10px] text-muted-foreground">
                © 2025 uara.co - All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
