"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BuildingIcon,
  HelpCircleIcon,
  HomeIcon,
  InfoIcon,
  Menu,
  MessageCircleIcon,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { AuthContext } from "./authProvider/AuthProvider";
import { NavUser } from "./nav-user";
import { getCookieVal } from "@/lib/cookie";

// Sample User Data (Replace with Dynamic Data Later)
const sampleUser = {
  firstName: "Hari",
  lastName: "",
  avatar: "https://api.dicebear.com/9.x/lorelei/svg?flip=true",
  email: "sample@giaoed.com",
};

const routes = [
  { href: "/", label: "Home", icon: <HomeIcon /> },
  { href: "/properties", label: "Properties", icon: <BuildingIcon /> },
  { href: "/about", label: "About", icon: <InfoIcon /> },
  { href: "/contact", label: "Contact", icon: <MessageCircleIcon /> },
  { href: "/help", label: "Help", icon: <HelpCircleIcon /> },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const authContext = useContext(AuthContext);
  const user = authContext?.user ?? null;
  const userType = authContext?.userType ?? "guest";
  const setUser = authContext?.setUser ?? null;
  const setUserType = authContext?.setUserType ?? null;
  const [userVal, setUserVal] = useState(sampleUser);
  useEffect(() => {
    const getData = async () => {
      try {
        const user = await getCookieVal();
        const userType= localStorage.getItem("userType");
        const userDetail = await fetch(
          `/api/profile?id=${user?.value}&type=${userType}`
        );
        const data = await userDetail.json();
        setUserVal((prev) => ({ ...prev, ...data.data }));
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold">StayCation</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-base font-medium transition-colors hover:text-primary ${
                pathname === route.href
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        {/* Auth & Theme Toggle */}
        <div className="flex items-center gap-2">
          {user ? (
            <NavUser
              user={userVal}
              setUser={setUser}
              setUserType={setUserType}
            />
          ) : (
            <div className="hidden md:flex md:gap-2">
              <Button variant="outline" asChild>
                <Link href="/auth/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signup">Sign up</Link>
              </Button>
            </div>
          )}

          <ModeToggle />

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="container flex h-16 items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold">StayCation</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="container bg-background grid gap-2 p-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`text-base font-medium ${
                  pathname === route.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-4">
              {!user && (
                <>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/auth/login">Log in</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/auth/signup">Sign up</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
