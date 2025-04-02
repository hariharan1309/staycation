"use client";

import Image from "next/image";
import { Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Review1 from "../../public/review/review1.png";
import Review2 from "../../public/review/review2.png";
import Review3 from "../../public/review/review3.png";
import Review4 from "../../public/review/review4.png";

const testimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    location: "New York, USA",
    text: "We had an amazing stay at the beachfront villa. The property was exactly as described, and the host was incredibly helpful. Will definitely book again!",
    rating: 5,
    avatar: Review4,
  },
  {
    id: "2",
    name: "Michael Chen",
    location: "London, UK",
    text: "The mountain cabin exceeded our expectations. It was clean, cozy, and had breathtaking views. The booking process was smooth, and customer service was excellent.",
    rating: 5,
    avatar: Review2,
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    location: "Sydney, Australia",
    text: "This was our third time using StayCation, and it never disappoints. The apartment in Paris was in the perfect location, and the amenities were top-notch.",
    rating: 4,
    avatar: Review3,
  },
  {
    id: "4",
    name: "David Kim",
    location: "Toronto, Canada",
    text: "The booking process was reviewless, and the property was exactly as pictured. The host was responsive and provided great local recommendations.",
    rating: 5,
    avatar: Review1,
  },
];

export function TestimonialCarousel() {
  return (
    <div className="relative">
      <Carousel
        opts={{
          loop: true,
          duration: 300,
        }}
      >
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="border-none shadow-sm">
                <CardContent className="p-6 h-[240px]">
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
                      <p className="text-sm text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating
                            ? "fill-primary text-primary"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-sm">{testimonial.text}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
