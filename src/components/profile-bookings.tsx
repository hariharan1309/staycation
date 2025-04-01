"use client";

import { useEffect, useState } from "react";
import { Calendar, Search, MapPin, Loader2 } from "lucide-react";

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
import { getCookieVal } from "@/lib/cookie";

interface ProfileBookingsProps {
  userRole: "guest" | "owner";
}

interface Booking {
  id: string;
  checkIn: string;
  checkOut: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  guestId: string;
  guests: number;
  nights: number;
  ownerId: string;
  paymentStatus: string;
  propertyId: string;
  totalAmount: number;
  paidAt?: {
    seconds: number;
    nanoseconds: number;
  };
  stripeSessionId?: string;
}

export function ProfileBookings({ userRole }: ProfileBookingsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const user = await getCookieVal();
        const userDetail = await fetch(
          `/api/booking/${userRole === "guest" ? "user" : "owner"}/${
            user?.value
          }/`
        );

        if (!userDetail.ok) {
          throw new Error(`HTTP error! Status: ${userDetail.status}`);
        }

        const data = await userDetail.json();
        console.log(data);
        setBookings(data.booking || []);
      } catch (error) {
        console.error(error);
        setError("Failed to load bookings. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [userRole]);

  // Filter bookings based on search query and status
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = booking.propertyId
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "completed" && booking.paymentStatus === "completed") ||
      (statusFilter === "upcoming" && booking.paymentStatus === "pending");

    return matchesSearch && matchesStatus;
  });

  // Sort bookings
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (sortOrder === "newest") {
      return (
        new Date(b.createdAt.seconds * 1000).getTime() -
        new Date(a.createdAt.seconds * 1000).getTime()
      );
    } else {
      return (
        new Date(a.createdAt.seconds * 1000).getTime() -
        new Date(b.createdAt.seconds * 1000).getTime()
      );
    }
  });

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTimestamp = (timestamp: {
    seconds: number;
    nanoseconds: number;
  }) => {
    return new Date(timestamp.seconds * 1000).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
            <TabsTrigger value="upcoming">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by property ID..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={sortOrder}
              onValueChange={(value: "newest" | "oldest") =>
                setSortOrder(value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="mt-12 flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading bookings...</span>
          </div>
        ) : error ? (
          <div className="mt-6 p-4 border border-red-200 bg-red-50 text-red-700 rounded-md">
            <p>{error}</p>
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        ) : (
          <>
            <TabsContent
              value="all"
              className="mt-6 max-h-[65vh] overflow-y-auto"
            >
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
                        <div className="flex flex-col gap-4">
                          <div className="mb-2 flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold">
                                Property ID: {booking.propertyId}
                              </h3>
                              <div className="mt-1 text-sm text-muted-foreground">
                                Created: {formatTimestamp(booking.createdAt)}
                              </div>
                            </div>
                            <Badge
                              variant={
                                booking.paymentStatus === "completed"
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              {booking.paymentStatus}
                            </Badge>
                          </div>
                          <div className="mt-2 grid gap-4 text-sm md:grid-cols-3">
                            <div>
                              <p className="font-medium">Check In</p>
                              <p className="text-muted-foreground">
                                {formatDate(booking.checkIn)}
                              </p>
                            </div>
                            <div>
                              <p className="font-medium">Check Out</p>
                              <p className="text-muted-foreground">
                                {formatDate(booking.checkOut)}
                              </p>
                            </div>
                            <div>
                              <p className="font-medium">Guests</p>
                              <p className="text-muted-foreground">
                                {booking.guests}{" "}
                                {booking.guests === 1 ? "guest" : "guests"}
                              </p>
                            </div>
                            <div>
                              <p className="font-medium">Nights</p>
                              <p className="text-muted-foreground">
                                {booking.nights}{" "}
                                {booking.nights === 1 ? "night" : "nights"}
                              </p>
                            </div>
                            <div>
                              <p className="font-medium">Total</p>
                              <p className="text-muted-foreground">
                                ${booking.totalAmount}
                              </p>
                            </div>
                            {booking.paidAt && (
                              <div>
                                <p className="font-medium">Paid At</p>
                                <p className="text-muted-foreground">
                                  {formatTimestamp(booking.paidAt)}
                                </p>
                              </div>
                            )}
                          </div>
                          {userRole === "owner" && (
                            <div className="mt-2">
                              <p className="font-medium">Guest ID</p>
                              <p className="text-muted-foreground">
                                {booking.guestId}
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent
              value="upcoming"
              className="mt-6 max-h-[65vh] overflow-y-auto"
            >
              <div className="space-y-4">
                {sortedBookings.filter((b) => b.paymentStatus === "pending")
                  .length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                    <Calendar className="mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 text-xl font-semibold">
                      No pending bookings
                    </h3>
                    <p className="mb-6 text-muted-foreground">
                      {userRole === "guest"
                        ? "You don't have any pending trips."
                        : "You don't have any pending bookings."}
                    </p>
                  </div>
                ) : (
                  sortedBookings
                    .filter((booking) => booking.paymentStatus === "pending")
                    .map((booking) => (
                      <Card key={booking.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col gap-4">
                            <div className="mb-2 flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold">
                                  Property ID: {booking.propertyId}
                                </h3>
                                <div className="mt-1 text-sm text-muted-foreground">
                                  Created: {formatTimestamp(booking.createdAt)}
                                </div>
                              </div>
                              <Badge variant="outline">Pending</Badge>
                            </div>
                            <div className="mt-2 grid gap-4 text-sm md:grid-cols-3">
                              <div>
                                <p className="font-medium">Check In</p>
                                <p className="text-muted-foreground">
                                  {formatDate(booking.checkIn)}
                                </p>
                              </div>
                              <div>
                                <p className="font-medium">Check Out</p>
                                <p className="text-muted-foreground">
                                  {formatDate(booking.checkOut)}
                                </p>
                              </div>
                              <div>
                                <p className="font-medium">Guests</p>
                                <p className="text-muted-foreground">
                                  {booking.guests}{" "}
                                  {booking.guests === 1 ? "guest" : "guests"}
                                </p>
                              </div>
                              <div>
                                <p className="font-medium">Nights</p>
                                <p className="text-muted-foreground">
                                  {booking.nights}{" "}
                                  {booking.nights === 1 ? "night" : "nights"}
                                </p>
                              </div>
                              <div>
                                <p className="font-medium">Total</p>
                                <p className="text-muted-foreground">
                                  ${booking.totalAmount}
                                </p>
                              </div>
                            </div>
                            {userRole === "owner" && (
                              <div className="mt-2">
                                <p className="font-medium">Guest ID</p>
                                <p className="text-muted-foreground">
                                  {booking.guestId}
                                </p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                )}
              </div>
            </TabsContent>

            <TabsContent
              value="completed"
              className="mt-6 max-h-[65vh] overflow-y-auto"
            >
              <div className="space-y-4">
                {sortedBookings.filter((b) => b.paymentStatus === "completed")
                  .length === 0 ? (
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
                    .filter((booking) => booking.paymentStatus === "completed")
                    .map((booking) => (
                      <Card key={booking.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col gap-4">
                            <div className="mb-2 flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold">
                                  Property ID: {booking.propertyId}
                                </h3>
                                <div className="mt-1 text-sm text-muted-foreground">
                                  Created: {formatTimestamp(booking.createdAt)}
                                </div>
                              </div>
                              <Badge variant="secondary">Completed</Badge>
                            </div>
                            <div className="mt-2 grid gap-4 text-sm md:grid-cols-3">
                              <div>
                                <p className="font-medium">Check In</p>
                                <p className="text-muted-foreground">
                                  {formatDate(booking.checkIn)}
                                </p>
                              </div>
                              <div>
                                <p className="font-medium">Check Out</p>
                                <p className="text-muted-foreground">
                                  {formatDate(booking.checkOut)}
                                </p>
                              </div>
                              <div>
                                <p className="font-medium">Guests</p>
                                <p className="text-muted-foreground">
                                  {booking.guests}{" "}
                                  {booking.guests === 1 ? "guest" : "guests"}
                                </p>
                              </div>
                              <div>
                                <p className="font-medium">Nights</p>
                                <p className="text-muted-foreground">
                                  {booking.nights}{" "}
                                  {booking.nights === 1 ? "night" : "nights"}
                                </p>
                              </div>
                              <div>
                                <p className="font-medium">Total</p>
                                <p className="text-muted-foreground">
                                  ${booking.totalAmount}
                                </p>
                              </div>
                              {booking.paidAt && (
                                <div>
                                  <p className="font-medium">Paid At</p>
                                  <p className="text-muted-foreground">
                                    {formatTimestamp(booking.paidAt)}
                                  </p>
                                </div>
                              )}
                              {booking.stripeSessionId && (
                                <div>
                                  <p className="font-medium">Payment ID</p>
                                  <p className="text-muted-foreground text-xs">
                                    {booking.stripeSessionId}
                                  </p>
                                </div>
                              )}
                            </div>
                            {userRole === "owner" && (
                              <div className="mt-2">
                                <p className="font-medium">Guest ID</p>
                                <p className="text-muted-foreground">
                                  {booking.guestId}
                                </p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                )}
              </div>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
}
