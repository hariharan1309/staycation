"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    location: "New York, USA",
    text: "We had an amazing stay at the beachfront villa. The property was exactly as described, and the host was incredibly helpful. Will definitely book again!",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "2",
    name: "Michael Chen",
    location: "London, UK",
    text: "The mountain cabin exceeded our expectations. It was clean, cozy, and had breathtaking views. The booking process was smooth, and customer service was excellent.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    location: "Sydney, Australia",
    text: "This was our third time using StayCation, and it never disappoints. The apartment in Paris was in the perfect location, and the amenities were top-notch.",
    rating: 4,
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "4",
    name: "David Kim",
    location: "Toronto, Canada",
    text: "The booking process was seamless, and the property was exactly as pictured. The host was responsive and provided great local recommendations.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(testimonials.length / itemsPerPage)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  const visibleTestimonials = () => {
    const start = currentIndex * itemsPerPage
    return testimonials.slice(start, start + itemsPerPage)
  }

  return (
    <div className="relative">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleTestimonials().map((testimonial) => (
          <Card key={testimonial.id} className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
              <div className="mt-4 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-4 text-sm">{testimonial.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePrevious} aria-label="Previous testimonials">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i}
              variant={i === currentIndex ? "default" : "outline"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to page ${i + 1}`}
            >
              {i + 1}
            </Button>
          ))}
          <Button variant="outline" size="icon" onClick={handleNext} aria-label="Next testimonials">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

