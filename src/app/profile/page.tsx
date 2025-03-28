"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Building, Calendar, Edit, Home, MessageSquare, Plus, Star, User, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ProfileBookings } from "@/components/profile-bookings"
import { ProfileProperties } from "@/components/profile-properties"
import { ProfileReviews } from "@/components/profile-reviews"
import { ProfileSettings } from "@/components/profile-settings"
import { ProfileCustomers } from "@/components/profile-customers"

export default function ProfilePage() {
  // In a real app, this would come from authentication
  const [userRole, setUserRole] = useState<"guest" | "owner">("owner")

  // Toggle role for demo purposes
  const toggleRole = () => {
    setUserRole(userRole === "guest" ? "owner" : "guest")
  }

  return (
    <main className="container px-4 py-8 md:px-6 md:py-12">
      {/* Role toggle for demo purposes */}
      <div className="mb-6 flex justify-end">
        <Button variant="outline" onClick={toggleRole}>
          Switch to {userRole === "guest" ? "Owner" : "Guest"} View
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[280px_1fr] lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-xl font-bold">John Doe</h2>
                <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                <Badge className="mt-2" variant="outline">
                  {userRole === "owner" ? "Property Owner" : "Guest"}
                </Badge>
                {userRole === "owner" && (
                  <Badge className="mt-1" variant="secondary">
                    Superhost
                  </Badge>
                )}
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Member Since</p>
                    <p className="text-sm text-muted-foreground">January 2023</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Response Rate</p>
                    <p className="text-sm text-muted-foreground">98%</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Rating</p>
                    <p className="text-sm text-muted-foreground">4.9 (42 reviews)</p>
                  </div>
                </div>
                {userRole === "owner" && (
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Properties</p>
                      <p className="text-sm text-muted-foreground">4 active listings</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {userRole === "owner" && (
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-sm font-medium">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/properties/new">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Property
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/dashboard">
                      <Home className="mr-2 h-4 w-4" />
                      Go to Dashboard
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <Tabs defaultValue="dashboard">
            <TabsList className="grid w-full grid-cols-4 md:grid-cols-5">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="bookings">{userRole === "guest" ? "My Trips" : "Bookings"}</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              {userRole === "owner" && (
                <>
                  <TabsTrigger value="properties">Properties</TabsTrigger>
                  <TabsTrigger value="customers">Customers</TabsTrigger>
                </>
              )}
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      {userRole === "guest" ? "Total Trips" : "Total Revenue"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{userRole === "guest" ? "12" : "$8,450"}</div>
                    <p className="text-xs text-muted-foreground">+18% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      {userRole === "guest" ? "Upcoming Trips" : "Bookings"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{userRole === "guest" ? "2" : "32"}</div>
                    <p className="text-xs text-muted-foreground">
                      {userRole === "guest" ? "Next trip in 15 days" : "+8% from last month"}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      {userRole === "guest" ? "Saved Properties" : "Occupancy Rate"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{userRole === "guest" ? "24" : "78%"}</div>
                    <p className="text-xs text-muted-foreground">
                      {userRole === "guest" ? "5 new this month" : "+5% from last month"}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      {userRole === "guest" ? "Reviews Given" : "New Inquiries"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{userRole === "guest" ? "8" : "14"}</div>
                    <p className="text-xs text-muted-foreground">
                      {userRole === "guest" ? "Last review 2 weeks ago" : "3 require response"}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-xl font-bold">{userRole === "guest" ? "Upcoming Trips" : "Recent Bookings"}</h2>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="relative h-40 w-full sm:h-auto sm:w-1/3 md:w-1/4">
                          <Image
                            src="/placeholder.svg?height=160&width=240"
                            alt="Property"
                            fill
                            className="rounded-md object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="mb-2 flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold">{i === 1 ? "Beachfront Villa" : "Mountain Cabin"}</h3>
                              <div className="mt-1 flex items-center text-sm text-muted-foreground">
                                <MapPin className="mr-1 h-3 w-3" />
                                {i === 1 ? "Bali, Indonesia" : "Aspen, Colorado"}
                              </div>
                            </div>
                            <Badge>{userRole === "guest" ? "Confirmed" : "Paid"}</Badge>
                          </div>
                          <div className="mt-2 grid gap-2 text-sm md:grid-cols-3">
                            <div>
                              <p className="font-medium">Dates</p>
                              <p className="text-muted-foreground">
                                {i === 1 ? "May 12 - May 18, 2023" : "Jun 5 - Jun 10, 2023"}
                              </p>
                            </div>
                            <div>
                              <p className="font-medium">Guests</p>
                              <p className="text-muted-foreground">{i === 1 ? "4" : "2"} guests</p>
                            </div>
                            <div>
                              <p className="font-medium">Total</p>
                              <p className="text-muted-foreground">${i === 1 ? "840" : "1,200"}</p>
                            </div>
                          </div>
                          <div className="mt-auto flex flex-wrap gap-2 pt-4">
                            <Button size="sm" variant="outline">
                              {userRole === "guest" ? "View Booking" : "Manage Booking"}
                            </Button>
                            <Button size="sm" variant="outline">
                              {userRole === "guest" ? "Contact Host" : "Message Guest"}
                            </Button>
                            {userRole === "guest" && (
                              <Button size="sm" variant="outline">
                                Cancel
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-center">
                <Button variant="outline" asChild>
                  <Link href={userRole === "guest" ? "/profile/trips" : "/profile/bookings"}>
                    View All {userRole === "guest" ? "Trips" : "Bookings"}
                  </Link>
                </Button>
              </div>

              <Separator />

              <h2 className="text-xl font-bold">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  {
                    icon: <MessageSquare className="h-8 w-8 text-primary" />,
                    title: userRole === "guest" ? "Message from Host" : "New Message from Guest",
                    description:
                      userRole === "guest"
                        ? "Sarah (host of Beachfront Villa) sent you a message"
                        : "John (guest) sent you a message about Mountain Cabin",
                    time: "2 hours ago",
                  },
                  {
                    icon: <Star className="h-8 w-8 text-primary" />,
                    title: userRole === "guest" ? "Review Reminder" : "New Review",
                    description:
                      userRole === "guest"
                        ? "Don't forget to leave a review for your stay at Mountain Cabin"
                        : "Sarah left a 5-star review for Beachfront Villa",
                    time: "1 day ago",
                  },
                  {
                    icon: <Calendar className="h-8 w-8 text-primary" />,
                    title: userRole === "guest" ? "Upcoming Trip" : "New Booking",
                    description:
                      userRole === "guest"
                        ? "Your trip to Beachfront Villa is in 15 days"
                        : "New booking for Mountain Cabin (Jun 5 - Jun 10)",
                    time: "3 days ago",
                  },
                ].map((activity, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{activity.title}</h3>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Bookings/Trips Tab */}
            <TabsContent value="bookings">
              <ProfileBookings userRole={userRole} />
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <ProfileReviews userRole={userRole} />
            </TabsContent>

            {/* Properties Tab (Owner Only) */}
            {userRole === "owner" && (
              <TabsContent value="properties">
                <ProfileProperties />
              </TabsContent>
            )}

            {/* Customers Tab (Owner Only) */}
            {userRole === "owner" && (
              <TabsContent value="customers">
                <ProfileCustomers />
              </TabsContent>
            )}

            {/* Settings Tab */}
            <TabsContent value="settings">
              <ProfileSettings userRole={userRole} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}

