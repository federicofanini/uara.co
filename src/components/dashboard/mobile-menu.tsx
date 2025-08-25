"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useState } from "react";
import { MainMenu } from "./main-menu";
import { Menu } from "lucide-react";

export function MobileMenu() {
  const [isOpen, setOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setOpen(true)}
          className="rounded-full w-8 h-8 items-center relative flex md:hidden"
        >
          <Menu className="w-4 h-4" />
        </Button>
      </div>
      <SheetContent side="left" className="border-none rounded-none -ml-4">
        <div className="ml-2 mb-8">
          <Icons.midday className="w-10 h-10" />
        </div>

        <div className="-ml-2">
          <MainMenu onSelect={() => setOpen(false)} isExpanded={true} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
