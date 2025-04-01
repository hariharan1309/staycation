"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { CreditCard, Upload, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface ProfileSettingsProps {
  userRole: "guest" | "host";
}

export function ProfileSettings({ userRole }: ProfileSettingsProps) {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Travel enthusiast and adventure seeker. Love exploring new places and experiencing different cultures. Always looking for the next great adventure!",
    address: "123 Main St, San Francisco, CA 94103",
    country: "United States",
    language: "English",
  });

  const handlePersonalInfoChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    });
  };

  return (
    <div className=" p-2 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your profile information and how it's displayed to others.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 max-w-3/4">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-medium">Profile Photo</h3>
              <p className="text-sm text-muted-foreground">
                Upload a photo to personalize your profile.
              </p>
              <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                <label
                  htmlFor="profile-image"
                  className="inline-flex cursor-pointer items-center text-sm font-medium text-primary hover:underline"
                >
                  Upload new image
                </label>
                <Button variant="link" size="sm" className="h-auto p-0">
                  Remove
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={personalInfo.firstName}
                onChange={handlePersonalInfoChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={personalInfo.lastName}
                onChange={handlePersonalInfoChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={personalInfo.email}
                onChange={handlePersonalInfoChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={personalInfo.phone}
                onChange={handlePersonalInfoChange}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                rows={4}
                value={personalInfo.bio}
                onChange={handlePersonalInfoChange}
                placeholder="Tell us a bit about yourself..."
              />
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={personalInfo.address}
                onChange={handlePersonalInfoChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                value={personalInfo.country}
                onValueChange={(value) =>
                  setPersonalInfo({ ...personalInfo, country: value })
                }
              >
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                  <SelectItem value="Germany">Germany</SelectItem>
                  <SelectItem value="France">France</SelectItem>
                  <SelectItem value="Japan">Japan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Preferred Language</Label>
              <Select
                value={personalInfo.language}
                onValueChange={(value) =>
                  setPersonalInfo({ ...personalInfo, language: value })
                }
              >
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="German">German</SelectItem>
                  <SelectItem value="Chinese">Chinese</SelectItem>
                  <SelectItem value="Japanese">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end max-w-3/4">
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>

      {userRole === "host" && (
        <Card>
          <CardHeader>
            <CardTitle>Host Settings</CardTitle>
            <CardDescription>
              Configure your host profile and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 max-w-3/4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="superhost">Superhost Status</Label>
                <p className="text-sm text-muted-foreground">
                  You're a Superhost! Keep up the great work.
                </p>
              </div>
              <Badge>Superhost</Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="instant-book">Instant Book</Label>
                <p className="text-sm text-muted-foreground">
                  Allow guests to book without sending a reservation request.
                </p>
              </div>
              <Switch id="instant-book" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="guest-requirements">Guest Requirements</Label>
                <p className="text-sm text-muted-foreground">
                  Set requirements for guests who can book your properties.
                </p>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Change your password to keep your account secure.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 max-w-3/4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end max-w-3/4">
          <Button>Update Password</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
