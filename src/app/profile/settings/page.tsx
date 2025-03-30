"use client";
import { ProfileSettings } from "@/components/profile-settings";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface ProfileSettingsProps {
  userRole: "guest" | "host";
}
const ProfileSettingsPage = () => {
  const [userRole, setUserRole] = useState<"guest" | "host">("host");
  useEffect(() => {
    const role = localStorage.getItem("userType");
    if (role) {
      setUserRole(role as "guest" | "host");
    }
  }, []);
  const toggleRole = () => {
    setUserRole(userRole === "guest" ? "host" : "guest");
  };
  return (
    <main className="container px-4 py-6 md:py-8 md:px-6 lg:py-10">
      <ProfileSettings userRole={userRole} />
    </main>
  );
};

export default ProfileSettingsPage;
