import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, MapPin, Share, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { PropertyGallery } from "@/components/property-gallery"

// This would typically come from a database
const property = {
  id: "1",
  title: "Beachfront Villa with Stunning Ocean Views",
  description:
    "Experience luxury living in this beautiful beachfront villa with direct access to the pristine white sand beach. The villa features 3 bedrooms, a private pool, and panoramic ocean views from every room.",
  location: "Bali, Indonesia",
  price: 120,
  rating: 4.9,
  reviewCount: 128,
  host: {
    name: "John Smith",
    avatar: "/placeholder.svg?height=80&width=80",
    isSuperhost: true,
    responseRate: 99,
    responseTime: "within an hour",
  },
  amenities: [
    "Private Pool",
    "Beachfront",
    "Air Conditioning",
    "Free WiFi",
    "Kitchen",
    "Washing Machine",
    "Free Parking",
    "TV",
    "Workspace",
    "Outdoor Dining Area",
  ],
  images: [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ],
  bedrooms: 3,
  bathrooms: 2,
  maxGuests: 6,
}

export default function PropertyPage({ params }: { params: { id: string } }) {
  return (
    <main className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-6 flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/properties">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to properties</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold md:text-3xl">{property.title}</h1>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Star className="mr-1 h-5 w-5 fill-primary text-primary" />
            <span className="font-medium">{property.rating}</span>
            <span className="ml-1 text-muted-foreground">({property.reviewCount} reviews)</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="mr-1 h-4 w-4" />
            {property.location}
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <Share className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>

      <PropertyGallery images={property.images} />

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between border-b pb-6">
            <div>
              <h2 className="text-xl font-semibold">Hosted by {property.host.name}</h2>
              <p className="text-muted-foreground">
                {property.bedrooms} bedrooms · {property.bathrooms} bathrooms · {property.maxGuests} guests
              </p>
            </div>
            <Image
              src={property.host.avatar || "/placeholder.svg"}
              alt={property.host.name}
              width={56}
              height={56}
              className="rounded-full"
            />
          </div>

          <div className="border-b py-6">
            <h3 className="mb-4 text-lg font-semibold">About this place</h3>
            <p className="text-muted-foreground">{property.description}</p>
          </div>

          <div className="border-b py-6">
            <h3 className="mb-4 text-lg font-semibold">What this place offers</h3>
            <div className="grid grid-cols-2 gap-4">
              {property.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="mb-4 flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-bold">${property.price}</span>
                  <span className="text-muted-foreground"> / night</span>
                </div>
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                  <span className="font-medium">{property.rating}</span>
                </div>
              </div>

              <div className="space-y-4">
                <DatePickerWithRange className="w-full" />

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Guests</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      {Array.from({ length: property.maxGuests }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? "guest" : "guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Button className="w-full">Reserve</Button>

                <p className="text-center text-sm text-muted-foreground">You won't be charged yet</p>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>${property.price} x 7 nights</span>
                    <span>${property.price * 7}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cleaning fee</span>
                    <span>$50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>$80</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${property.price * 7 + 50 + 80}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

