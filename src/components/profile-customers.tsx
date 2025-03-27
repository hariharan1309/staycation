"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, ChevronLeft, ChevronRight, Search, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ProfileCustomers() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("recent")

  // Mock customers data
  const customers = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      image: "/placeholder.svg?height=40&width=40",
      bookings: 3,
      totalSpent: 2400,
      lastBooking: "May 20, 2023",
      rating: 4.9,
      status: "active",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael.chen@example.com",
      image: "/placeholder.svg?height=40&width=40",
      bookings: 2,
      totalSpent: 1800,
      lastBooking: "April 15, 2023",
      rating: 4.8,
      status: "active",
    },
    {
      id: "3",
      name: "Emma Rodriguez",
      email: "emma.rodriguez@example.com",
      image: "/placeholder.svg?height=40&width=40",
      bookings: 1,
      totalSpent: 950,
      lastBooking: "March 10, 2023",
      rating: 5.0,
      status: "active",
    },
    {
      id: "4",
      name: "David Kim",
      email: "david.kim@example.com",
      image: "/placeholder.svg?height=40&width=40",
      bookings: 1,
      totalSpent: 780,
      lastBooking: "February 5, 2023",
      rating: 3.5,
      status: "inactive",
    },
    {
      id: "5",
      name: "Olivia Smith",
      email: "olivia.smith@example.com",
      image: "/placeholder.svg?height=40&width=40",
      bookings: 1,
      totalSpent: 520,
      lastBooking: "January 8, 2023",
      rating: 4.2,
      status: "inactive",
    },
  ]

  // Filter customers based on search query
  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  // Sort customers
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if (sortOrder === "recent") {
      return new Date(b.lastBooking).getTime() - new Date(a.lastBooking).getTime()
    } else if (sortOrder === "bookings") {
      return b.bookings - a.bookings
    } else if (sortOrder === "spent") {
      return b.totalSpent - a.totalSpent
    } else {
      return b.rating - a.rating
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold">Your Customers</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">{filteredCustomers.length} customers found</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
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
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="bookings">Most Bookings</SelectItem>
              <SelectItem value="spent">Highest Spent</SelectItem>
              <SelectItem value="rating">Highest Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {sortedCustomers.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mb-4 h-12 w-12 text-muted-foreground"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
            <h3 className="mb-2 text-xl font-semibold">No customers found</h3>
            <p className="mb-6 text-muted-foreground">No customers match your search criteria.</p>
            <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
          </div>
        ) : (
          sortedCustomers.map((customer) => (
            <Card key={customer.id}>
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        src={customer.image || "/placeholder.svg"}
                        alt={customer.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{customer.name}</h3>
                      <p className="text-sm text-muted-foreground">{customer.email}</p>
                    </div>
                  </div>
                  <Badge variant={customer.status === "active" ? "default" : "secondary"} className="sm:ml-auto">
                    {customer.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div>
                    <p className="text-sm font-medium">Bookings</p>
                    <p className="text-sm text-muted-foreground">{customer.bookings} total</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Spent</p>
                    <p className="text-sm text-muted-foreground">${customer.totalSpent}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Last Booking</p>
                    <p className="text-sm text-muted-foreground">{customer.lastBooking}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Rating</p>
                    <div className="flex items-center">
                      <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm">{customer.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button size="sm" variant="outline">
                    View Bookings
                  </Button>
                  <Button size="sm" variant="outline">
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-1">
        <Button variant="outline" size="icon" disabled>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous page</span>
        </Button>
        <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="icon" disabled>
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next page</span>
        </Button>
      </div>
    </div>
  )
}

