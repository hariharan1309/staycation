"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProfileBookingsProps {
  userRole: "guest" | "owner";
}

export function ProfileBookings({ userRole }: ProfileBookingsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  // Mock bookings data
  const bookings = [
    {
      id: "1",
      propertyName: "Beachfront Villa",
      location: "Bali, Indonesia",
      image: "/placeholder.svg?height=160&width=240",
      dates: "May 12 - May 18, 2023",
      guests: 4,
      total: 840,
      status: "upcoming",
      guestName: "Sarah Johnson",
      guestImage: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      propertyName: "Mountain Cabin",
      location: "Aspen, Colorado",
      image: "/placeholder.svg?height=160&width=240",
      dates: "Jun 5 - Jun 10, 2023",
      guests: 2,
      total: 1200,
      status: "upcoming",
      guestName: "Michael Chen",
      guestImage: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      propertyName: "Luxury Apartment",
      location: "Paris, France",
      image: "/placeholder.svg?height=160&width=240",
      dates: "Apr 3 - Apr 8, 2023",
      guests: 2,
      total: 950,
      status: "completed",
      guestName: "Emma Rodriguez",
      guestImage: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      propertyName: "Seaside Cottage",
      location: "Santorini, Greece",
      image: "/placeholder.svg?height=160&width=240",
      dates: "Mar 15 - Mar 20, 2023",
      guests: 3,
      total: 780,
      status: "completed",
      guestName: "David Kim",
      guestImage: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "5",
      propertyName: "City Center Studio",
      location: "Barcelona, Spain",
      image: "/placeholder.svg?height=160&width=240",
      dates: "Feb 8 - Feb 12, 2023",
      guests: 2,
      total: 520,
      status: "cancelled",
      guestName: "Olivia Smith",
      guestImage: "/placeholder.svg?height=40&width=40",
    },
  ];

  // Filter bookings based on search query and status
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Sort bookings
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (sortOrder === "newest") {
      return (
        new Date(b.dates.split(" - ")[0]).getTime() -
        new Date(a.dates.split(" - ")[0]).getTime()
      );
    } else {
      return (
        new Date(a.dates.split(" - ")[0]).getTime() -
        new Date(b.dates.split(" - ")[0]).getTime()
      );
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold">
          {userRole === "guest" ? "My Trips" : "Bookings"}
        </h2>
      </div>

      <Tabs defaultValue="all" onValueChange={setStatusFilter}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search bookings..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            {sortedBookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                <Calendar className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-xl font-semibold">
                  No bookings found
                </h3>
                <p className="mb-6 text-muted-foreground">
                  {userRole === "guest"
                    ? "You don't have any trips that match your search."
                    : "You don't have any bookings that match your search."}
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              sortedBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="relative h-40 w-full sm:h-auto sm:w-1/3 md:w-1/4">
                        <Image
                          src={booking.image || "/placeholder.svg"}
                          alt={booking.propertyName}
                          fill
                          className="rounded-md object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="mb-2 flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">
                              {booking.propertyName}
                            </h3>
                            <div className="mt-1 flex items-center text-sm text-muted-foreground">
                              <MapPin className="mr-1 h-3 w-3" />
                              {booking.location}
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 grid gap-2 text-sm md:grid-cols-3">
                          <div>
                            <p className="font-medium">Dates</p>
                            <p className="text-muted-foreground">
                              {booking.dates}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">Guests</p>
                            <p className="text-muted-foreground">
                              {booking.guests} guests
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">Total</p>
                            <p className="text-muted-foreground">
                              ${booking.total}
                            </p>
                          </div>
                        </div>
                        {userRole === "owner" && (
                          <div className="mt-4 flex items-center gap-2">
                            <div className="relative h-8 w-8 overflow-hidden rounded-full">
                              <Image
                                src={booking.guestImage || "/placeholder.svg"}
                                alt={booking.guestName}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                {booking.guestName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Guest
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          <div className="space-y-4">
            {sortedBookings.filter((b) => b.status === "upcoming").length ===
            0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                <Calendar className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-xl font-semibold">
                  No upcoming bookings
                </h3>
                <p className="mb-6 text-muted-foreground">
                  {userRole === "guest"
                    ? "You don't have any upcoming trips."
                    : "You don't have any upcoming bookings."}
                </p>
              </div>
            ) : (
              sortedBookings
                .filter((booking) => booking.status === "upcoming")
                .map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      {/* Same card content as above */}
                      <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="relative h-40 w-full sm:h-auto sm:w-1/3 md:w-1/4">
                          <Image
                            src={booking.image || "/placeholder.svg"}
                            alt={booking.propertyName}
                            fill
                            className="rounded-md object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="mb-2 flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold">
                                {booking.propertyName}
                              </h3>
                              <div className="mt-1 flex items-center text-sm text-muted-foreground">
                                <MapPin className="mr-1 h-3 w-3" />
                                {booking.location}
                              </div>
                            </div>
                            <Badge>Upcoming</Badge>
                          </div>
                          <div className="mt-2 grid gap-2 text-sm md:grid-cols-3">
                            <div>
                              <p className="font-medium">Dates</p>
                              <p className="text-muted-foreground">
                                {booking.dates}
                              </p>
                            </div>
                            <div>
                              <p className="font-medium">Guests</p>
                              <p className="text-muted-foreground">
                                {booking.guests} guests
                              </p>
                            </div>
                            <div>
                              <p className="font-medium">Total</p>
                              <p className="text-muted-foreground">
                                ${booking.total}
                              </p>
                            </div>
                          </div>
                          {userRole === "owner" && (
                            <div className="mt-4 flex items-center gap-2">
                              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                                <Image
                                  src={booking.guestImage || "/placeholder.svg"}
                                  alt={booking.guestName}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="text-sm font-medium">
                                  {booking.guestName}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Guest
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="space-y-4">
            {sortedBookings.filter((b) => b.status === "completed").length ===
            0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                <Calendar className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-xl font-semibold">
                  No completed bookings
                </h3>
                <p className="mb-6 text-muted-foreground">
                  {userRole === "guest"
                    ? "You don't have any completed trips."
                    : "You don't have any completed bookings."}
                </p>
              </div>
            ) : (
              sortedBookings
                .filter((booking) => booking.status === "completed")
                .map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      {/* Same card content structure */}
                      <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="relative h-40 w-full sm:h-auto sm:w-1/3 md:w-1/4">
                          <Image
                            src={booking.image || "/placeholder.svg"}
                            alt={booking.propertyName}
                            fill
                            className="rounded-md object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="mb-2 flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold">
                                {booking.propertyName}
                              </h3>
                              <div className="mt-1 flex items-center text-sm text-muted-foreground">
                                <MapPin className="mr-1 h-3 w-3" />
                                {booking.location}
                              </div>
                            </div>
                            <Badge variant="secondary">Completed</Badge>
                          </div>
                          <div className="mt-2 grid gap-2 text-sm md:grid-cols-3">
                            <div>
                              <p className="font-medium">Dates</p>
                              <p className="text-muted-foreground">
                                {booking.dates}
                              </p>
                            </div>
                            <div>
                              <p className="font-medium">Guests</p>
                              <p className="text-muted-foreground">
                                {booking.guests} guests
                              </p>
                            </div>
                            <div>
                              <p className="font-medium">Total</p>
                              <p className="text-muted-foreground">
                                ${booking.total}
                              </p>
                            </div>
                          </div>
                          {userRole === "owner" && (
                            <div className="mt-4 flex items-center gap-2">
                              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                                <Image
                                  src={booking.guestImage || "/placeholder.svg"}
                                  alt={booking.guestName}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="text-sm font-medium">
                                  {booking.guestName}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Guest
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="cancelled" className="mt-6">
          <div className="space-y-4">
            {sortedBookings.filter((b) => b.status === "cancelled").length ===
            0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                <Calendar className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-xl font-semibold">
                  No cancelled bookings
                </h3>
                <p className="mb-6 text-muted-foreground">
                  {userRole === "guest"
                    ? "You don't have any cancelled trips."
                    : "You don't have any cancelled bookings."}
                </p>
              </div>
            ) : (
              sortedBookings
                .filter((booking) => booking.status === "cancelled")
                .map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      {/* Same card content structure */}
                      <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="relative h-40 w-full sm:h-auto sm:w-1/3 md:w-1/4">
                          <Image
                            src={booking.image || "/placeholder.svg"}
                            alt={booking.propertyName}
                            fill
                            className="rounded-md object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="mb-2 flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold">
                                {booking.propertyName}
                              </h3>
                              <div className="mt-1 flex items-center text-sm text-muted-foreground">
                                <MapPin className="mr-1 h-3 w-3" />
                                {booking.location}
                              </div>
                            </div>
                            <Badge variant="destructive">Cancelled</Badge>
                          </div>
                          <div className="mt-2 grid gap-2 text-sm md:grid-cols-3">
                            <div>
                              <p className="font-medium">Dates</p>
                              <p className="text-muted-foreground">
                                {booking.dates}
                              </p>
                            </div>
                            <div>
                              <p className="font-medium">Guests</p>
                              <p className="text-muted-foreground">
                                {booking.guests} guests
                              </p>
                            </div>
                            <div>
                              <p className="font-medium">Total</p>
                              <p className="text-muted-foreground">
                                ${booking.total}
                              </p>
                            </div>
                          </div>
                          {userRole === "owner" && (
                            <div className="mt-4 flex items-center gap-2">
                              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                                <Image
                                  src={booking.guestImage || "/placeholder.svg"}
                                  alt={booking.guestName}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="text-sm font-medium">
                                  {booking.guestName}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Guest
                                </p>
                              </div>
                            </div>
                          )}
                          <div className="mt-auto flex flex-wrap gap-2 pt-4">
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                            <Button size="sm" variant="outline">
                              Book Again
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
