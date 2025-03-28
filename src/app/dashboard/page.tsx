import Link from "next/link";
import Image from "next/image";
import {
  BarChart3,
  Calendar,
  CreditCard,
  Home,
  MessageSquare,
  Plus,
  Settings,
  User,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

export default function DashboardPage() {
  return (
    <main className="flex-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 days
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,546</div>
            <p className="text-xs text-muted-foreground">
              +18% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Occupancy Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Your latest property bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="Property thumbnail"
                        width={40}
                        height={40}
                        className="rounded-md"
                      />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Beachfront Villa</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>May 12 - May 18, 2023</span>
                          <span className="mx-1">•</span>
                          <span>$840</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Recent guest messages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-4">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="User avatar"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Sarah Johnson</p>
                        <p className="text-xs text-muted-foreground">
                          Hi, I was wondering if early check-in would be
                          possible...
                        </p>
                        <p className="text-xs text-muted-foreground">
                          2 hours ago
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Reply
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Upcoming bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Mountain Cabin</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>May 20 - May 25, 2023</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Property Performance</CardTitle>
              <CardDescription>
                View how your properties are performing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Beachfront Villa",
                    revenue: "$4,250",
                    occupancy: "85%",
                    rating: "4.9",
                  },
                  {
                    name: "Mountain Cabin",
                    revenue: "$3,120",
                    occupancy: "72%",
                    rating: "4.8",
                  },
                  {
                    name: "Luxury Apartment",
                    revenue: "$2,890",
                    occupancy: "68%",
                    rating: "4.7",
                  },
                  {
                    name: "Seaside Cottage",
                    revenue: "$2,286",
                    occupancy: "81%",
                    rating: "4.9",
                  },
                ].map((property, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-4 items-center gap-4 rounded-lg border p-4"
                  >
                    <div>
                      <p className="font-medium">{property.name}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Revenue</p>
                      <p className="font-medium">{property.revenue}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Occupancy</p>
                      <p className="font-medium">{property.occupancy}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Rating</p>
                      <div className="flex items-center justify-center">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="ml-1 font-medium">
                          {property.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Detailed analytics for your properties
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Analytics content will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate and download reports</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Reports content will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
