"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

export function SignOut() {
  return (
    <LogoutLink>
      <DropdownMenuItem className="cursor-pointer">
        <LogOut className="mr-2 h-4 w-4" />
        <span>Sign out</span>
      </DropdownMenuItem>
    </LogoutLink>
  );
}
