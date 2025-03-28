"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Edit, MapPin, MoreHorizontal, Plus, Search, Star, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function ProfileProperties() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null)

  // Mock properties data
  const properties = [
    {
      id: "1",
      title: "Beachfront Villa",
      location: "Bali, Indonesia",
      price: 120,
      rating: 4.9,
      reviewCount: 128,
      imageUrl: "/placeholder.svg?height=300&width=400",
      status: "active",
      bookings: 24,
      revenue: 2880,
      createdAt: "2023-01-15",
    },
    {
      id: "2",
      title: "Mountain Cabin",
      location: "Aspen, Colorado",
      price: 200,
      rating: 4.8,
      reviewCount: 96,
      imageUrl: "/placeholder.svg?height=300&width=400",
      status: "active",
      bookings: 18,
      revenue: 3600,
      createdAt: "2023-02-20",
    },
    {
      id: "3",
      title: "Luxury Apartment",
      location: "Paris, France",
      price: 180,
      rating: 4.7,
      reviewCount: 74,
      imageUrl: "/placeholder.svg?height=300&width=400",
      status: "inactive",
      bookings: 12,
      revenue: 2160,
      createdAt: "2023-03-10",
    },
    {
      id: "4",
      title: "Seaside Cottage",
      location: "Santorini, Greece",
      price: 150,
      rating: 4.9,
      reviewCount: 112,
      imageUrl: "/placeholder.svg?height=300&width=400",
      status: "active",
      bookings: 20,
      revenue: 3000,
      createdAt: "2023-04-05",
    },
  ]

  // Filter properties based on search query and status
  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || property.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortOrder === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    } else if (sortOrder === "price-high") {
      return b.price - a.price
    } else if (sortOrder === "price-low") {
      return a.price - b.price
    } else if (sortOrder === "rating") {
      return b.rating - a.rating
    } else {
      return b.bookings - a.bookings
    }
  })

  const handleDeleteProperty = (id: string) => {
    setPropertyToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, this would call an API to delete the property
    console.log(`Deleting property ${propertyToDelete}`)
    setDeleteDialogOpen(false)
    setPropertyToDelete(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold">Your Properties</h2>
        <Button asChild>
          <Link href="/properties/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Property
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all" onValueChange={setStatusFilter}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="all">All Properties</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search properties..."
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
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="bookings">Most Bookings</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProperties.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
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
                    d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
                  />
                </svg>
                <h3 className="mb-2 text-xl font-semibold">No properties found</h3>
                <p className="mb-6 text-muted-foreground">You don't have any properties that match your search.</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setStatusFilter("all")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              sortedProperties.map((property) => (
                <Card key={property.id} className="overflow-hidden">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={property.imageUrl || "/placeholder.svg"}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                    <Badge
                      className="absolute left-2 top-2"
                      variant={property.status === "active" ? "default" : "secondary"}
                    >
                      {property.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/properties/${property.id}`}>View Listing</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/properties/${property.id}/edit`}>Edit Property</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/properties/${property.id}/calendar`}>Manage Calendar</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeleteProperty(property.id)}
                        >
                          Delete Property
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{property.title}</h3>
                        <div className="mt-1 flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-1 h-3 w-3" />
                          {property.location}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                        <span className="text-sm font-medium">{property.rating}</span>
                        <span className="ml-1 text-xs text-muted-foreground">({property.reviewCount})</span>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="font-medium">Price</p>
                        <p className="text-muted-foreground">${property.price}/night</p>
                      </div>
                      <div>
                        <p className="font-medium">Bookings</p>
                        <p className="text-muted-foreground">{property.bookings} total</p>
                      </div>
                      <div>
                        <p className="font-medium">Revenue</p>
                        <p className="text-muted-foreground">${property.revenue}</p>
                      </div>
                      <div>
                        <p className="font-medium">Created</p>
                        <p className="text-muted-foreground">{new Date(property.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/properties/${property.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/properties/${property.id}`}>View Listing</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProperties.filter((p) => p.status === "active").length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
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
                    d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
                  />
                </svg>
                <h3 className="mb-2 text-xl font-semibold">No active properties</h3>
                <p className="mb-6 text-muted-foreground">You don't have any active properties.</p>
                <Button asChild>
                  <Link href="/properties/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Property
                  </Link>
                </Button>
              </div>
            ) : (
              sortedProperties
                .filter((property) => property.status === "active")
                .map((property) => (
                  <Card key={property.id} className="overflow-hidden">
                    {/* Same card content as above */}
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={property.imageUrl || "/placeholder.svg"}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                      <Badge className="absolute left-2 top-2">Active</Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/properties/${property.id}`}>View Listing</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/properties/${property.id}/edit`}>Edit Property</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/properties/${property.id}/calendar`}>Manage Calendar</Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDeleteProperty(property.id)}
                          >
                            Delete Property
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{property.title}</h3>
                          <div className="mt-1 flex items-center text-sm text-muted-foreground">
                            <MapPin className="mr-1 h-3 w-3" />
                            {property.location}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                          <span className="text-sm font-medium">{property.rating}</span>
                          <span className="ml-1 text-xs text-muted-foreground">({property.reviewCount})</span>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="font-medium">Price</p>
                          <p className="text-muted-foreground">${property.price}/night</p>
                        </div>
                        <div>
                          <p className="font-medium">Bookings</p>
                          <p className="text-muted-foreground">{property.bookings} total</p>
                        </div>
                        <div>
                          <p className="font-medium">Revenue</p>
                          <p className="text-muted-foreground">${property.revenue}</p>
                        </div>
                        <div>
                          <p className="font-medium">Created</p>
                          <p className="text-muted-foreground">{new Date(property.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/properties/${property.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/properties/${property.id}`}>View Listing</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="inactive" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProperties.filter((p) => p.status === "inactive").length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
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
                    d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
                  />
                </svg>
                <h3 className="mb-2 text-xl font-semibold">No inactive properties</h3>
                <p className="mb-6 text-muted-foreground">You don't have any inactive properties.</p>
              </div>
            ) : (
              sortedProperties
                .filter((property) => property.status === "inactive")
                .map((property) => (
                  <Card key={property.id} className="overflow-hidden">
                    {/* Same card content structure */}
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={property.imageUrl || "/placeholder.svg"}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                      <Badge variant="secondary" className="absolute left-2 top-2">
                        Inactive
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/properties/${property.id}`}>View Listing</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/properties/${property.id}/edit`}>Edit Property</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/properties/${property.id}/calendar`}>Manage Calendar</Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDeleteProperty(property.id)}
                          >
                            Delete Property
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{property.title}</h3>
                          <div className="mt-1 flex items-center text-sm text-muted-foreground">
                            <MapPin className="mr-1 h-3 w-3" />
                            {property.location}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                          <span className="text-sm font-medium">{property.rating}</span>
                          <span className="ml-1 text-xs text-muted-foreground">({property.reviewCount})</span>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="font-medium">Price</p>
                          <p className="text-muted-foreground">${property.price}/night</p>
                        </div>
                        <div>
                          <p className="font-medium">Bookings</p>
                          <p className="text-muted-foreground">{property.bookings} total</p>
                        </div>
                        <div>
                          <p className="font-medium">Revenue</p>
                          <p className="text-muted-foreground">${property.revenue}</p>
                        </div>
                        <div>
                          <p className="font-medium">Created</p>
                          <p className="text-muted-foreground">{new Date(property.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/properties/${property.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </Button>
                      <Button variant="default" size="sm">
                        Activate Listing
                      </Button>
                    </CardFooter>
                  </Card>
                ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Property</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this property? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash className="mr-2 h-4 w-4" />
              Delete Property
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

