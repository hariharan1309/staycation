"use client";

import { LogOutIcon, Settings, UserCircleIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { clearAuthCookie } from "@/lib/auth";
import { useRouter } from "next/navigation";

export function NavUser({
  user,
  setUser,
  setUserType,
}: {
  user: {
    firstName: string;
    lastName: string;
    avatar: string;
    email: string;
  };
  setUser: ((user: string | null) => void) | null;
  setUserType: ((type: string) => void) | null;
}) {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      clearAuthCookie(); // Clear the auth cookie
      if (setUser) setUser(null);
      if (setUserType) setUserType("guest");
      router.push("/auth/login"); // Redirect to the home page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer p-1">
          <Avatar className="h-8 w-8 rounded-full grayscale">
            <AvatarImage src={user.avatar} alt={user.firstName} />
            <AvatarFallback className="rounded-full">CN</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-full">
              <AvatarImage
                src={user.avatar}
                alt={user.firstName + " " + user.lastName}
              />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {user.firstName + " " + user.lastName}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={"/profile"}>
              <UserCircleIcon />
              Account
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            className="flex flex-row gap-4 items-center w-full cursor-pointer"
            size="sm"
            onClick={handleLogout}
          >
            <LogOutIcon />
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
