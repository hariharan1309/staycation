"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

import {
  getAuth,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { toast } from "sonner";
import { getCookieVal } from "@/lib/cookie";

interface ProfileSettingsProps {
  userRole: "guest" | "host";
}
const sampleUser = {
  firstName: "Hari",
  lastName: "",
  avatar: "https://api.dicebear.com/9.x/lorelei/svg?flip=true",
  email: "sample@giaoed.com",
  createdAt: "9 March 2025 at 08:10:04 UTC+5:30",
  phoneNumber: "",
  address: "",
  country: "",
};
export function ProfileSettings({ userRole }: ProfileSettingsProps) {
  const router = useRouter();
  const [userVal, setUserVal] = useState(sampleUser);
  const [personalInfo, setPersonalInfo] = useState(sampleUser);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        const user = await getCookieVal();
        const userDetail = await fetch(
          `/api/profile?id=${user?.value}&type=${userRole}`
        );
        const data = await userDetail.json();
        console.log(data);
        setPersonalInfo((prev: any) => ({ ...prev, ...data.data }));
        setUserVal((prev: any) => ({ ...prev, ...data.data }));
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handlePersonalInfoChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setPersonalInfo((prev: any) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setPasswords((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const saveProfileChanges = async () => {
    if (JSON.stringify(personalInfo) === JSON.stringify(userVal)) {
      toast("No changes detected.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/profile/update?role=${userRole}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(personalInfo),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      toast.success("Profile information updated successfully.");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    if (passwords.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setPasswordLoading(true);
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user || !user.email) throw new Error("You need to be logged in.");

      const credential = EmailAuthProvider.credential(
        user.email,
        passwords.currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, passwords.newPassword);

      toast.success("Password updated successfully.");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      const errorMessages: Record<string, string> = {
        "auth/wrong-password": "Current password is incorrect.",
        "auth/weak-password": "New password is too weak.",
        "auth/requires-recent-login":
          "Please log in again before changing your password.",
      };
      toast.error(errorMessages[error.code] || "Failed to update password.");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="p-2 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your profile details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 max-w-3/4">
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
                disabled
              />
              <p className="text-xs text-muted-foreground">
                Email changes require separate verification.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={personalInfo.phoneNumber}
                onChange={handlePersonalInfoChange}
              />
            </div>
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
                  <SelectItem value="India">India</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Separator />
        </CardContent>
        <CardFooter className="flex justify-end max-w-3/4">
          <Button
            onClick={saveProfileChanges}
            disabled={
              isLoading ||
              JSON.stringify(personalInfo) === JSON.stringify(userVal)
            }
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Change your password.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 max-w-3/4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end max-w-3/4">
          <Button
            onClick={handleUpdatePassword}
            disabled={
              passwordLoading ||
              !passwords.currentPassword ||
              !passwords.newPassword ||
              !passwords.confirmPassword
            }
          >
            {passwordLoading ? "Updating..." : "Update Password"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
