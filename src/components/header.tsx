"use client";

import { Logo } from "@/components/logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { GithubStars } from "./github-stars";
import { MobileMenu } from "./mobile-menu";
import { SignIn } from "./sign-in";

export function Header({ fullWidth = false }: { fullWidth?: boolean }) {
  const pathname = usePathname();

  const links = [
    { href: "/pricing", label: "pricing" },
    { href: "/docs", label: "docs" },
    { href: "/updates", label: "updates" },
    {
      component: <SignIn />,
      className:
        pathname.split("/").length === 2
          ? "text-primary"
          : "text-muted-foreground hover:text-primary",
    },
  ];

  return (
    <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg">
      <div
        className={cn(
          "flex items-center justify-between mx-auto py-4",
          !fullWidth && "container"
        )}
      >
        <Logo />

        <div className="md:flex hidden items-center gap-6 text-sm">
          <Link href="https://github.com/federicofanini/uara.co">
            <Suspense fallback={<GithubStars />}>
              <GithubStars />
            </Suspense>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm">
            {links.map((link, i) =>
              link.component ? (
                <div
                  key={i.toString()}
                  className={cn(
                    "text-muted hover:text-primary transition-colors",
                    link.className
                  )}
                >
                  {link.component}
                </div>
              ) : (
                <Link
                  href={link.href!}
                  className={cn(
                    "text-muted-foreground hover:text-primary transition-colors hidden md:block",
                    link.className,
                    pathname?.endsWith(link.href) && "text-primary"
                  )}
                  key={link.href}
                  prefetch
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>

        <MobileMenu />
      </div>
    </div>
  );
}
