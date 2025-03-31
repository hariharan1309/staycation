"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ImageMinus,
  MapPin,
  Share,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { PropertyGallery } from "@/components/property-gallery";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

// Define property type for type safety
type PropertyType = {
  id: string;
  title: string;
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    directions?: string;
  };
  pricing: {
    basePrice: number;
    cleaningFee: number;
    securityDeposit: number;
    minNights: number;
    maxNights: number;
    weeklyDiscount: number;
    monthlyDiscount: number;
    taxes: boolean;
    instantBook: boolean;
  };
  amenities: {
    pool: boolean;
    beachfront: boolean;
    parking: boolean;
    tv: boolean;
    workspace: boolean;
    wifi: boolean;
    ac: boolean;
    heating: boolean;
    washer: boolean;
    kitchen: boolean;
    outdoorDining: boolean;
  };
  images: string[];
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  type: string;
  owner: string;
  createdAt: string;
};

export default function PropertyPage() {
  const [property, setProperty] = useState<PropertyType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nights, setNights] = useState(7);
  const [guests, setGuests] = useState(1);
  const params = useParams();

  useEffect(() => {
    const getProperty = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/properties/${params.id}/`);

        if (!res.ok) {
          throw new Error(`Failed to fetch property: ${res.status}`);
        }

        const data = await res.json();

        if (data.status === 200 && data.property) {
          setProperty(data.property);
        } else {
          throw new Error(data.message || "Failed to fetch property data");
        }
      } catch (err) {
        console.error("Error fetching property:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      getProperty();
    }
  }, [params.id]);

  // Get amenities as array for rendering
  const getAmenities = () => {
    if (!property?.amenities) return [];

    const amenitiesMap = {
      pool: "Private Pool",
      beachfront: "Beachfront",
      ac: "Air Conditioning",
      wifi: "Free WiFi",
      kitchen: "Kitchen",
      washer: "Washing Machine",
      parking: "Free Parking",
      tv: "TV",
      workspace: "Workspace",
      outdoorDining: "Outdoor Dining Area",
      heating: "Heating",
    };

    return Object.entries(property.amenities)
      .filter(([_, value]) => value === true)
      .map(([key]) => amenitiesMap[key as keyof typeof amenitiesMap]);
  };

  // Calculate total price
  const calculateTotal = () => {
    if (!property) return 0;

    const baseTotal = property.pricing.basePrice * nights;
    const cleaningFee = property.pricing.cleaningFee;
    const serviceFee = Math.round(baseTotal * 0.1); // 10% service fee

    return baseTotal + cleaningFee + serviceFee;
  };

  // Format location string
  const getLocationString = () => {
    if (!property?.location) return "";
    const { city, state, country } = property.location;
    return `${city}, ${state}, ${country}`;
  };

  // Render loading state
  if (loading) {
    return (
      <main className="container px-4 py-8 md:px-6 md:py-12 lg:px-8">
        <div className="mb-6 flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/properties">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to properties</span>
            </Link>
          </Button>
          <Skeleton className="h-10 w-3/4" />
        </div>

        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-8 w-24" />
        </div>

        <div className="mt-4 h-80 w-full">
          <Skeleton className="h-full w-full" />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="mt-6 h-60 w-full" />
          </div>
          <div>
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </main>
    );
  }

  // Render error state
  if (error) {
    return (
      <main className="container px-4 py-8 md:px-6 md:py-12 lg:px-8">
        <div className="mb-6 flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/properties">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to properties</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold md:text-3xl">Property Not Found</h1>
        </div>
        <div className="rounded-md bg-red-50 p-6 text-center">
          <h2 className="text-lg font-medium text-red-800">
            Error Loading Property
          </h2>
          <p className="mt-2 text-red-700">{error}</p>
          <Button className="mt-4" asChild>
            <Link href="/properties">Back to Properties</Link>
          </Button>
        </div>
      </main>
    );
  }

  // If property data is not available after loading is complete
  if (!property) {
    return (
      <main className="container px-4 py-8 md:px-6 md:py-12 lg:px-8">
        <div className="mb-6 flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/properties">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to properties</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold md:text-3xl">Property Not Found</h1>
        </div>
        <div className="rounded-md bg-yellow-50 p-6 text-center">
          <h2 className="text-lg font-medium text-yellow-800">
            No Property Data Available
          </h2>
          <p className="mt-2 text-yellow-700">
            The property information could not be loaded.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/properties">Browse Other Properties</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="container px-4 py-8 md:px-6 md:py-12 lg:px-8">
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
          <div className="flex items-center text-muted-foreground">
            <MapPin className="mr-1 h-4 w-4" />
            {getLocationString()}
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <Share className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>

      {property.images && property.images.length > 0 ? (
        <PropertyGallery images={property.images} />
      ) : (
        <div className="mt-4 flex h-80 gap-4 w-full items-center justify-center bg-muted rounded-lg px-10">
          <ImageMinus />
          <p className="text-muted-foreground text-xl font-bold">No images available</p>
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between border-b pb-6">
            <div>
              <h2 className="text-xl font-semibold">
                {property.type.charAt(0).toUpperCase() + property.type.slice(1)}{" "}
                hosted by Owner
              </h2>
              <p className="text-muted-foreground">
                {property.bedrooms} bedroom{property.bedrooms !== 1 ? "s" : ""}{" "}
                · {property.bathrooms} bathroom
                {property.bathrooms !== 1 ? "s" : ""} · {property.maxGuests}{" "}
                guest{property.maxGuests !== 1 ? "s" : ""}
              </p>
            </div>
            <Image
              src={"/placeholder.svg"}
              alt={"Host"}
              width={56}
              height={56}
              className="rounded-full"
            />
          </div>

          <div className="border-b py-6">
            <h3 className="mb-4 text-lg font-semibold">About this place</h3>
            <p className="text-muted-foreground">
              {property.description || "No description provided."}
            </p>
          </div>

          <div className="border-b py-6">
            <h3 className="mb-4 text-lg font-semibold">
              What this place offers
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {getAmenities().length > 0 ? (
                getAmenities().map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>{amenity}</span>
                  </div>
                ))
              ) : (
                <p className="col-span-2 text-muted-foreground">
                  No amenities listed
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="mb-4 flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-bold">
                    ${property.pricing.basePrice}
                  </span>
                  <span className="text-muted-foreground"> / night</span>
                </div>
                {/* <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                  <span className="font-medium">New</span>
                </div> */}
              </div>

              <div className="space-y-4">
                <DatePickerWithRange
                  className="w-full"
                  // onChange={(range) => {
                  //   if (range?.from && range?.to) {
                  //     const diffTime = Math.abs(
                  //       range.to.getTime() - range.from.getTime()
                  //     );
                  //     const diffDays = Math.ceil(
                  //       diffTime / (1000 * 60 * 60 * 24)
                  //     );
                  //     setNights(diffDays || 1);
                  //   }
                  // }}
                />

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Guests</label>
                    <Select
                      value={guests.toString()}
                      onValueChange={(value) => setGuests(parseInt(value))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Guests Count" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Array.from(
                            { length: property.maxGuests },
                            (_, i) => (
                              <SelectItem
                                key={i + 1}
                                value={(i + 1).toString()}
                              >
                                {i + 1} {i === 0 ? "Guest" : "Guests"}
                              </SelectItem>
                            )
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button className="w-full">Reserve</Button>

                <p className="text-center text-sm text-muted-foreground">
                  You won't be charged yet
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>
                      ${property.pricing.basePrice} x {nights} nights
                    </span>
                    <span>${property.pricing.basePrice * nights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cleaning fee</span>
                    <span>${property.pricing.cleaningFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>
                      ${Math.round(property.pricing.basePrice * nights * 0.1)}
                    </span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
