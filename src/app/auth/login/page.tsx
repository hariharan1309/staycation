"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import LoginFunction from "@/utils/LoginFunction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [cred, setCred] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [userType, setUserType] = useState<"guest" | "host">("guest");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!cred.email || !cred.password) {
      toast.error("Please fill all the fields", {
        closeButton: true,
        duration: 2000,
        style: {
          color: "red",
        },
      });
      return;
    }
    try {
      const user = await LoginFunction({ ...cred, userType });
      console.log(user);
      if (user.success) {
        toast.success(user.message, {
          closeButton: true,
          duration: 2000,
          style: {
            color: "green",
          },
        });
        router.push("/");
      } else {
        toast.error(user.message, {
          closeButton: true,
          duration: 2000,
          style: {
            color: "red",
          },
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", {
        closeButton: true,
        duration: 2000,
        style: {
          color: "red",
        },
      });
    }
  };
  return (
    <main className="container flex flex-col items-center justify-center px-4 py-12 md:py-24">
      <Card className="mx-auto w-full max-w-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* <div className="space-y-2">
            <Button variant="outline" className="w-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4 fill-current">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
              Continue with Facebook
            </Button>
          </div> */}

          {/* <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div> */}

          <form className="space-y-4 p-2 md:p-3 lg:p-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                onChange={(e) => setCred({ ...cred, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                onChange={(e) => setCred({ ...cred, password: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              <Button
                type="submit"
                className="w-full"
                variant={userType === "guest" ? "default" : "outline"}
                onClick={() => setUserType("guest")}
              >
                Login as Guest
              </Button>
              <Button
                type="submit"
                className="w-full"
                variant={userType === "host" ? "default" : "outline"}
                onClick={() => setUserType("host")}
              >
                Login as Owner
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
