"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function SignUpPage() {
  const [userType, setUserType] = useState<"guest" | "host">("guest");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    agreeTerms: false,
    receiveUpdates: false,
  });
  const [message, setMessage] = useState<string | null>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const formValidate = (formData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    agreeTerms: boolean;
    receiveUpdates: boolean;
  }) => {
    if (formData.password !== formData.confirmPassword) {
      setMessage("Error: Passwords do not match");
      console.log("Error: Passwords do not match");
      return false;
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setMessage("Error: Invalid email address");
      console.log("Error: Invalid email address");
      return false;
    }
    if (formData.phoneNumber && !formData.phoneNumber.match(/^\d{10,15}$/)) {
      setMessage("Error: Invalid phone number");
      console.log("Error: Invalid phone number");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { userType, ...formData });
    // validation
    formValidate(formData);
  };

  return (
    <main className="container flex flex-col items-center justify-center px-4 py-6 md:py-10 lg:py-16">
      <Card className="mx-auto w-full max-w-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription>
            Sign up to start booking or listing your property
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="guest"
            onValueChange={(value) => setUserType(value as "guest" | "host")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="guest">I'm a Guest</TabsTrigger>
              <TabsTrigger value="host">I'm a Host</TabsTrigger>
            </TabsList>
            <TabsContent value="guest">
              <p className="my-4 text-sm text-muted-foreground col-span-full">
                Create an account to book properties and manage your trips.
              </p>
            </TabsContent>
            <TabsContent value="host">
              <p className="my-4 text-sm text-muted-foreground min-w-[90%]">
                Create an account to list your property and manage bookings.
              </p>
            </TabsContent>
          </Tabs>

          {/* <div className="mt-6 space-y-2">
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

          {/* <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div> */}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">
                Phone Number {userType === "host" && "*"}
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required={userType === "host"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={8}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                minLength={8}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, agreeTerms: checked === true })
                  }
                />
                <Label htmlFor="agreeTerms" className="text-sm font-normal">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="receiveUpdates"
                  name="receiveUpdates"
                  checked={formData.receiveUpdates}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      receiveUpdates: checked === true,
                    })
                  }
                />
                <Label htmlFor="receiveUpdates" className="text-sm font-normal">
                  I want to receive updates about promotions and new features
                </Label>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
