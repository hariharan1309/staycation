"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building,
  Calendar,
  Edit,
  Home,
  MessageSquare,
  Plus,
  Star,
  User,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ProfileBookings } from "@/components/profile-bookings";
import { ProfileProperties } from "@/components/profile-properties";
import { AuthContext } from "@/components/authProvider/AuthProvider";
import { ProfileSettings } from "@/components/profile-settings";
import { getCookieVal } from "@/lib/cookie";
// Sample User Data (Replace with Dynamic Data Later)
const sampleUser = {
  firstName: "Hari",
  lastName: "",
  avatar: "https://api.dicebear.com/9.x/lorelei/svg?flip=true",
  email: "sample@giaoed.com",
  createdAt: {
    seconds: 100000000,
    nanoseconds: 128292021,
  },
  address: "",
  country: "",
  phoneNumber: "",
};
export default function ProfilePage() {
  // In a real app, this would come from authentication
  const authContext = useContext(AuthContext);
  const userType = authContext?.userType;
  const [userVal, setUserVal] = useState(sampleUser);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const user = await getCookieVal();
        const userType = localStorage.getItem("userType")?.replaceAll(`"`, "");
        console.log(userType);
        const userDetail = await fetch(
          `/api/profile?id=${user?.value}&type=${userType}`
        );
        const data = await userDetail.json();
        console.log(data);
        setUserVal((prev) => ({ ...prev, ...data.data }));
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const getProperties = async () => {
    try {
      const user = await getCookieVal();
      const resp = await fetch(`/api/properties/owner/${user?.value}`);
      const props = await resp.json();
      setProperties(props.property);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const userType = localStorage.getItem("userType")?.replaceAll(`"`, "");
    if (userType === "host") {
      getProperties();
    }
  }, [userType]);
  const formatTimestamp = (timestamp: {
    seconds: number;
    nanoseconds: number;
  }) => {
    return new Date(timestamp.seconds * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <main className="container px-4 py-8 md:px-6 md:py-12 pt-4 md:pt-6">
      <div className="grid gap-6 md:grid-cols-[280px_1fr] lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={userVal.avatar} alt={userVal.firstName} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-xl font-bold">
                  {userVal.firstName + " " + userVal.lastName}
                </h2>
                <p className="text-sm text-muted-foreground">{userVal.email}</p>
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Joined on </p>
                    <p className="text-sm text-muted-foreground">
                      {formatTimestamp(userVal.createdAt) || "N/A"}
                    </p>
                  </div>
                </div>
                {userType === "host" && (
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Properties</p>
                      <p className="text-sm text-muted-foreground">
                        {properties.length || "Nil"}
                      </p>
                    </div>
                  </div>
                )}
                {userType === "host" && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/properties/new">
                      Add New Property
                      <Plus className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <Tabs defaultValue="settings">
            <TabsList
              className={`grid w-full ${
                userType === "host" ? "grid-cols-5" : "grid-cols-4"
              }`}
            >
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="bookings">
                {userType === "guest" ? "My Trips" : "Bookings"}
              </TabsTrigger>
              {userType === "host" && (
                <>
                  <TabsTrigger value="properties">Properties</TabsTrigger>
                </>
              )}
            </TabsList>

            {/* Bookings/Trips Tab */}
            <TabsContent value="bookings">
              <ProfileBookings userRole={userType as any} />
            </TabsContent>

            {/* Properties Tab (Owner Only) */}
            {userType === "host" && (
              <TabsContent value="properties">
                <ProfileProperties
                  data={properties}
                  getProperties={getProperties}
                />
              </TabsContent>
            )}

            <TabsContent value="settings">
              <ProfileSettings userRole={userType as any} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
