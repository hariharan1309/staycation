"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProfileReviewsProps {
  userRole: "guest" | "owner"
}

export function ProfileReviews({ userRole }: ProfileReviewsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")

  // Mock reviews data
  const reviews = [
    {
      id: "1",
      propertyName: "Beachfront Villa",
      propertyLocation: "Bali, Indonesia",
      propertyImage: "/placeholder.svg?height=80&width=80",
      reviewerName: "Sarah Johnson",
      reviewerImage: "/placeholder.svg?height=40&width=40",
      rating: 5,
      comment:
        "Amazing property with stunning views! The host was incredibly helpful and responsive. The villa was clean, spacious, and had all the amenities we needed. Would definitely stay here again!",
      date: "May 20, 2023",
      type: userRole === "guest" ? "given" : "received",
    },
    {
      id: "2",
      propertyName: "Mountain Cabin",
      propertyLocation: "Aspen, Colorado",
      propertyImage: "/placeholder.svg?height=80&width=80",
      reviewerName: "Michael Chen",
      reviewerImage: "/placeholder.svg?height=40&width=40",
      rating: 4,
      comment:
        "Great location and cozy cabin. Perfect for a weekend getaway. The fireplace was a nice touch during the cold evenings. Only minor issue was the water pressure in the shower.",
      date: "April 15, 2023",
      type: userRole === "guest" ? "given" : "received",
    },
    {
      id: "3",
      propertyName: "Luxury Apartment",
      propertyLocation: "Paris, France",
      propertyImage: "/placeholder.svg?height=80&width=80",
      reviewerName: "Emma Rodriguez",
      reviewerImage: "/placeholder.svg?height=40&width=40",
      rating: 5,
      comment:
        "Absolutely perfect location in the heart of Paris. The apartment was beautifully decorated and had everything we needed. The host provided excellent recommendations for local restaurants and attractions.",
      date: "March 10, 2023",
      type: userRole === "guest" ? "received" : "given",
    },
    {
      id: "4",
      propertyName: "Seaside Cottage",
      propertyLocation: "Santorini, Greece",
      propertyImage: "/placeholder.svg?height=80&width=80",
      reviewerName: "David Kim",
      reviewerImage: "/placeholder.svg?height=40&width=40",
      rating: 3,
      comment:
        "The view was spectacular, but the cottage itself needed some maintenance. The air conditioning wasn't working properly, and there were some cleanliness issues. The host was responsive to our concerns though.",
      date: "February 5, 2023",
      type: userRole === "guest" ? "received" : "given",
    },
  ]

  // Filter reviews based on search query, rating, and type
  const filterReviews = (type: string) => {
    return reviews
      .filter((review) => {
        const matchesSearch =
          review.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.comment.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesRating = ratingFilter === "all" || review.rating === Number.parseInt(ratingFilter)

        const matchesType = review.type === type

        return matchesSearch && matchesRating && matchesType
      })
      .sort((a, b) => {
        if (sortOrder === "newest") {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        } else if (sortOrder === "oldest") {
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        } else if (sortOrder === "highest") {
          return b.rating - a.rating
        } else {
          return a.rating - b.rating
        }
      })
  }

  const receivedReviews = filterReviews("received")
  const givenReviews = filterReviews("given")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold">Reviews</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Export Reviews
          </Button>
        </div>
      </div>

      <Tabs defaultValue="received">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="received">
              {userRole === "guest" ? "Reviews About You" : "Property Reviews"}
            </TabsTrigger>
            <TabsTrigger value="given">
              {userRole === "guest" ? "Reviews by You" : "Reviews You've Written"}
            </TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search reviews..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="highest">Highest Rated</SelectItem>
                <SelectItem value="lowest">Lowest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="received" className="mt-6">
          <div className="space-y-4">
            {receivedReviews.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                <Star className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-xl font-semibold">No reviews yet</h3>
                <p className="mb-6 text-muted-foreground">
                  {userRole === "guest"
                    ? "You haven't received any reviews yet."
                    : "Your properties haven't received any reviews yet."}
                </p>
              </div>
            ) : (
              receivedReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="flex items-start gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-md">
                          <Image
                            src={review.propertyImage || "/placeholder.svg"}
                            alt={review.propertyName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{review.propertyName}</h3>
                          <p className="text-sm text-muted-foreground">{review.propertyLocation}</p>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="relative h-8 w-8 overflow-hidden rounded-full">
                              <Image
                                src={review.reviewerImage || "/placeholder.svg"}
                                alt={review.reviewerName}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{review.reviewerName}</p>
                              <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm">{review.comment}</p>
                        <div className="mt-4 flex justify-end gap-2">
                          <Button size="sm" variant="outline">
                            {userRole === "guest" ? "Say Thanks" : "Respond"}
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

        <TabsContent value="given" className="mt-6">
          <div className="space-y-4">
            {givenReviews.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                <Star className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-xl font-semibold">No reviews written</h3>
                <p className="mb-6 text-muted-foreground">
                  {userRole === "guest"
                    ? "You haven't written any reviews yet."
                    : "You haven't written any guest reviews yet."}
                </p>
                <Button>{userRole === "guest" ? "Write a Review" : "Review a Guest"}</Button>
              </div>
            ) : (
              givenReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="flex items-start gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-md">
                          <Image
                            src={review.propertyImage || "/placeholder.svg"}
                            alt={review.propertyName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{review.propertyName}</h3>
                          <p className="text-sm text-muted-foreground">{review.propertyLocation}</p>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="relative h-8 w-8 overflow-hidden rounded-full">
                              <Image
                                src={review.reviewerImage || "/placeholder.svg"}
                                alt="Your profile"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium">You</p>
                              <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm">{review.comment}</p>
                        <div className="mt-4 flex justify-end gap-2">
                          <Button size="sm" variant="outline">
                            Edit Review
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
  )
}

