import Link from "next/link";
import Image from "next/image";
import { MapPin, Star } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  featured?: boolean;
  url: string;
}

export function PropertyCard({
  id,
  title,
  location,
  price,
  rating,
  reviewCount,
  imageUrl,
  featured = false,
  url,
}: PropertyCardProps) {
  return (
    <Link href={url}>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
          />
          {featured && (
            <Badge className="absolute left-2 top-2">Featured</Badge>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{title}</h3>
              <div className="mt-1 flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-1 h-3 w-3" />
                {location}
              </div>
            </div>
            <div className="flex items-center">
              <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium">{rating}</span>
              <span className="ml-1 text-xs text-muted-foreground">
                ({reviewCount})
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t p-4">
          <div className="flex items-center justify-between w-full">
            <div>
              <span className="font-semibold">${price}</span>
              <span className="text-sm text-muted-foreground"> / night</span>
            </div>
            <Badge variant="outline">Available</Badge>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
