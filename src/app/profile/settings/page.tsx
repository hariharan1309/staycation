"use client";
import { ProfileSettings } from "@/components/profile-settings";
import { Button } from "@/components/ui/button";
import { useState } from "react";
interface ProfileSettingsProps {
  userRole: "guest" | "owner";
}
const ProfileSettingsPage = () => {
  const [userRole, setUserRole] = useState<"guest" | "owner">("owner");
  // Toggle role for demo purposes
  const toggleRole = () => {
    setUserRole(userRole === "guest" ? "owner" : "guest");
  };
  return (
    <main className="container px-4 py-8 md:px-6 md:py-12">
      {/* Role toggle for demo purposes */}
      <div className="mb-6 flex justify-end">
        <Button variant="outline" onClick={toggleRole}>
          Switch to {userRole === "guest" ? "Owner" : "Guest"} View
        </Button>
      </div>
      <ProfileSettings userRole={userRole} />
    </main>
  );
};

export default ProfileSettingsPage;
