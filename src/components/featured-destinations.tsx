import Image from "next/image";
import Link from "next/link";

import { Card } from "@/components/ui/card";

import USA from "../../public/destination/USA.png";
import Canada from "../../public/destination/Canada.png";
import Italy from "../../public/destination/Italy.png";
import Japan from "../../public/destination/Japan.png";
import France from "../../public/destination/France.png";
import India from "../../public/destination/India.png";

const destinations = [
  {
    id: "1",
    name: "United States",
    propertyCount: 12,
    imageUrl: USA,
  },
  {
    id: "2",
    name: "Canada",
    propertyCount: 25,
    imageUrl: Canada,
  },
  {
    id: "3",
    name: "France",
    propertyCount: 32,
    imageUrl: France,
  },
  {
    id: "4",
    name: "Italy",
    propertyCount: 18,
    imageUrl: Italy,
  },
  {
    id: "5",
    name: "Japan",
    propertyCount: 43,
    imageUrl: Japan,
  },
  {
    id: "6",
    name: "India",
    propertyCount: 21,
    imageUrl: India,
  },
];

export function FeaturedDestinations() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {destinations.map((destination) => (
        <Link
          key={destination.id}
          href={`/properties/?country=${destination.name}`}
        >
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
                <p className="text-sm">
                  {destination.propertyCount} properties
                </p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
