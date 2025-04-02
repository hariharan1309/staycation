import Image from "next/image"
import Link from "next/link"

import { Card } from "@/components/ui/card"

const destinations = [
  {
    id: "1",
    name: "United States",
    propertyCount: 12,
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "2",
    name: "Canada",
    propertyCount: 25,
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "3",
    name: "France",
    propertyCount: 32,
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "4",
    name: "Mexico",
    propertyCount: 18,
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "5",
    name: "Japan",
    propertyCount: 43,
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "6",
    name: "India",
    propertyCount: 21,
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
]

export function FeaturedDestinations() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {destinations.map((destination) => (
        <Link key={destination.id} href={`/destinations/${destination.id}`}>
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={destination.imageUrl || "/placeholder.svg"}
                alt={destination.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 p-4 text-white">
                <h3 className="text-lg font-semibold">{destination.name}</h3>
                <p className="text-sm">{destination.propertyCount} properties</p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}

