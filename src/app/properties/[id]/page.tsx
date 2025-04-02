"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Check,
  Edit,
  ImageMinus,
  MapPin,
  SeparatorVertical,
  Share,
  Star,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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
import { getCookieVal } from "@/lib/cookie";
import { toast } from "sonner";
import { AuthContext } from "@/components/authProvider/AuthProvider";
import { DateRange } from "react-day-picker";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// Define interfaces for type safety
interface Location {
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  directions?: string;
}

interface Pricing {
  basePrice: number;
  cleaningFee: number;
  securityDeposit: number;
  minNights: number;
  maxNights: number;
  weeklyDiscount: number;
  monthlyDiscount: number;
  taxes: boolean;
  instantBook: boolean;
}

interface Amenities {
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
  [key: string]: boolean;
}

interface Property {
  id: string;
  title: string;
  description: string;
  location: Location;
  pricing: Pricing;
  amenities: Amenities;
  images: { main: boolean; url: string; publicId?: "string" }[];
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  type: string;
  owner: string;
  createdAt: string;
}

interface Booking {
  id?: string;
  propertyId?: string;
  guestId?: string;
  ownerId?: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  nights: number;
  totalAmount?: number;
  paymentStatus: "pending" | "completed";
}

interface AuthContextType {
  user: string | null;
}

export default function PropertyPage() {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<Booking>({
    nights: 1,
    guests: 1,
    checkIn: new Date(),
    checkOut: new Date(new Date().setDate(new Date().getDate() + 2)),
    paymentStatus: "pending",
  });
  const authContext = useContext(AuthContext) as AuthContextType | null;
  const userId = authContext?.user;
  const [bookingsList, setBookingsList] = useState<Booking[]>([]);
  const [dateError, setDateError] = useState<string | null>(null);
  const params = useParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!params.id) return;

      try {
        setLoading(true);
        await Promise.all([fetchProperty(), fetchBookings()]);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [params.id]);

  const fetchProperty = async (): Promise<void> => {
    try {
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
      throw err;
    }
  };

  const fetchBookings = async (): Promise<void> => {
    try {
      const req = await fetch(`/api/booking/${params.id}`);
      const bookingResp = await req.json();

      if (Array.isArray(bookingResp.booking)) {
        const listVal = bookingResp.booking.map(
          (booking: { checkIn: string; checkOut: string }) => ({
            ...booking,
            checkIn: new Date(booking.checkIn),
            checkOut: new Date(booking.checkOut),
          })
        );
        setBookingsList(
          listVal.sort(
            (a: any, b: any) => b.checkIn.getTime() - a.checkIn.getTime()
          )
        );
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw error;
    }
  };

  // Get amenities as array for rendering
  const getAmenities = (): string[] => {
    if (!property?.amenities) return [];

    const amenitiesMap: Record<string, string> = {
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
      .map(([key]) => amenitiesMap[key] || key);
  };

  // Calculate total price
  const calculateTotal = (): number => {
    if (!property) return 0;

    const baseTotal = property.pricing.basePrice * booking.nights;
    const cleaningFee = property.pricing.cleaningFee;
    const serviceFee = Math.round(baseTotal * 0.1); // 10% service fee

    return baseTotal + cleaningFee + serviceFee;
  };

  // Function to check if dates overlap with existing bookings
  const checkDateOverlap = (
    start: Date,
    end: Date,
    bookings: Booking[]
  ): Booking | null => {
    for (const booking of bookings) {
      const bookingStart = new Date(booking.checkIn);
      const bookingEnd = new Date(booking.checkOut);

      if (
        (start >= bookingStart && start < bookingEnd) ||
        (end > bookingStart && end <= bookingEnd) ||
        (start <= bookingStart && end >= bookingEnd)
      ) {
        return booking;
      }
    }
    return null;
  };

  // Get disabled dates from existing bookings
  const getDisabledDates = (): Date[] => {
    const disabledDates: Date[] = [];

    bookingsList.forEach((booking) => {
      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);

      // Generate all dates between checkIn and checkOut
      let currentDate = new Date(checkIn);
      while (currentDate < checkOut) {
        disabledDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    return disabledDates;
  };

  // Handle date range selection
  const handleDateRangeChange = (range: DateRange | undefined): void => {
    if (!range || !range.from || !range.to) return;

    // Check if selected range overlaps with existing bookings
    const overlappingBooking = checkDateOverlap(
      range.from,
      range.to,
      bookingsList
    );

    if (overlappingBooking) {
      setDateError(
        `These dates are unavailable. The property is booked from ${formatDate(
          overlappingBooking.checkIn
        )} to ${formatDate(overlappingBooking.checkOut)}`
      );
    } else {
      setDateError(null);
      const nights = Math.ceil(
        (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24)
      );

      setBooking((prev) => ({
        ...prev,
        checkIn: range.from!,
        checkOut: range.to!,
        nights: nights > 0 ? nights : 1,
        paymentStatus: "pending",
      }));
    }
  };

  const handleReserveWithoutPayment = async (): Promise<void> => {
    try {
      const userCookie = await getCookieVal();
      const userID = userCookie?.value;

      if (!userID) {
        toast.error("Please log in to book this property");
        return;
      }

      if (userID === property?.owner) {
        toast.warning("You can't book your own property");
        return;
      }

      if (dateError) {
        toast.error("Please select valid dates");
        return;
      }

      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId: property?.id,
          guestId: userID,
          ownerId: property?.owner,
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
          guests: booking.guests,
          nights: booking.nights,
          totalAmount: calculateTotal(),
          paymentStatus: "pending",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create booking");
      }

      const data = await response.json();
      // Redirect to confirmation page
      router.push(`/booking-confirmation?id=${data.bookingId}`);
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create booking. Please try again."
      );
    }
  };

  const handleBookWithPayment = async (): Promise<void> => {
    try {
      const userCookie = await getCookieVal();
      const userID = userCookie?.value;

      if (!userID) {
        toast.error("Please log in to book this property");
        return;
      }

      if (userID === property?.owner) {
        toast.warning("You can't book your own property");
        return;
      }

      if (dateError) {
        toast.error("Please select valid dates");
        return;
      }

      const response = await fetch("/api/checkout_session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId: property?.id,
          propertyTitle: property?.title,
          nights: booking.nights,
          guests: booking.guests,
          userID: userID,
          totalAmount: calculateTotal(),
          guestId: userID,
          ownerId: property?.owner,
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to create checkout session"
        );
      }

      const data = await response.json();
      // Redirect to Stripe checkout
      window.location.href = data.url;
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to process payment. Please try again."
      );
    }
  };

  // Format date for display
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format location string
  const getLocationString = (): string => {
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
      <main className="container px-4 py-8 md:px-6 md:py-12 lg:px-16">
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
      <main className="container px-4 py-8 md:px-6 md:py-12 lg:px-16">
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
    <main className="container px-4 py-8 md:px-6 md:py-12 lg:px-12">
      <div className="mb-4 flex items-center gap-2">
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
        {userId === property.owner && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/properties/${params.id}/edit`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        )}
      </div>

      {property.images && property.images.length > 0 ? (
        <PropertyGallery images={property.images} />
      ) : (
        <div className="mt-4 flex h-80 gap-4 w-full items-center justify-center bg-muted rounded-lg px-10">
          <ImageMinus />
          <p className="text-muted-foreground text-xl font-bold">
            No images available
          </p>
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
              src={"https://api.dicebear.com/9.x/lorelei/svg?flip=true"}
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
          {userId === property.owner ? (
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Bookings </h3>

                {bookingsList.length > 0 ? (
                  <div className="space-y-3">
                    {bookingsList.slice(0, 3).map((booking, index) => (
                      <Card key={booking.id || index}>
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">Dates</span>
                              <Badge variant="outline">
                                {formatDate(booking.checkIn)} -{" "}
                                {formatDate(booking.checkOut)}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 relative">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">
                                  Guests
                                </span>
                                <Badge variant="secondary">
                                  {booking.guests}
                                </Badge>
                              </div>
                              <div className="absolute w-[2px] h-full bg-primary/20 left-1/2"></div>
                              <div className=" flex justify-between items-center">
                                <span className="text-sm font-medium">
                                  Payment
                                </span>
                                <Badge
                                  variant={
                                    booking.paymentStatus === "completed"
                                      ? "default"
                                      : "outline"
                                  }
                                  className={
                                    booking.paymentStatus === "completed"
                                      ? "bg-green-500"
                                      : "text-amber-500 border-amber-500"
                                  }
                                >
                                  {booking.paymentStatus
                                    .charAt(0)
                                    .toUpperCase() +
                                    booking.paymentStatus.slice(1)}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 flex justify-center items-center">
                      <div className="text-center text-muted-foreground">
                        <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50 mb-2" />
                        <p>No bookings as of now</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="mb-4 flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-bold">
                      ${property.pricing.basePrice}
                    </span>
                    <span className="text-muted-foreground"> / night</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <DatePickerWithRange
                    className="w-full"
                    initialDateRange={{
                      from: booking.checkIn,
                      to: booking.checkOut,
                    }}
                    onChange={handleDateRangeChange}
                    disabledDates={getDisabledDates()}
                  />

                  {dateError && (
                    <div className="text-red-500 text-sm mt-1 flex items-center">
                      <Label className="mr-1">⚠️ {dateError}</Label>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Guests</label>
                      <Select
                        value={booking.guests.toString()}
                        onValueChange={(value) =>
                          setBooking((prev) => ({
                            ...prev,
                            guests: parseInt(value),
                          }))
                        }
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

                  <div className="flex gap-2 w-full">
                    <Button
                      className="w-1/2"
                      onClick={handleReserveWithoutPayment}
                      disabled={!!dateError}
                    >
                      Reserve
                    </Button>
                    <Button
                      className="w-1/2"
                      variant="default"
                      onClick={handleBookWithPayment}
                      disabled={!!dateError}
                    >
                      Book Now
                    </Button>
                  </div>
                  <p className="text-center text-sm text-muted-foreground">
                    "Book Now" requires payment to confirm
                  </p>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>
                        ${property.pricing.basePrice} x {booking.nights} nights
                      </span>
                      <span>
                        ${property.pricing.basePrice * booking.nights}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cleaning fee</span>
                      <span>${property.pricing.cleaningFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>
                        $
                        {Math.round(
                          property.pricing.basePrice * booking.nights * 0.1
                        )}
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
          )}
        </div>
      </div>
    </main>
  );
}
