"use client";
import Link from "next/link";
import Image from "next/image";
import { CalendarIcon, MapPinIcon, SearchIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HeroImg from "../../public/hero1.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { PropertyCard } from "@/components/property-card";
// import { TestimonialCarousel } from "@/components/testimonial-carousel";
// import { FeaturedDestinations } from "@/components/featured-destinations";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Property } from "./properties/[id]/page";
import dynamic from "next/dynamic";
const FeaturedDestinations = dynamic(
  () =>
    import("@/components/featured-destinations").then(
      (mod) => mod.FeaturedDestinations
    )
);

const ListPropertyWithUs = dynamic(
  () => import("@/components/home-page/list-property-with-us")
);
const WhyUs = dynamic(() => import("@/components/home-page/why-us"));

const TestimonialCarousel = dynamic(
  () =>
    import("@/components/testimonial-carousel").then(
      (mod) => mod.TestimonialCarousel
    ),
  {
    ssr: false,
  }
);

export default function Home() {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState({
    country: "",
    checkIn: new Date().toISOString().split("T")[0],
    checkOut: new Date(new Date().setDate(new Date().getDate() + 7))
      .toISOString()
      .split("T")[0],
    guests: 2,
  });
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const getProperties = async () => {
      try {
        const resp = await fetch("/api/properties");
        const propertList = await resp.json();
        console.log(propertList);
        setProperties(propertList.property);
      } catch (error) {
        console.log(error);
      }
    };
    getProperties();
  }, []);
  const handleCountryChange = (value: any) => {
    setSearchParams((prev) => ({ ...prev, country: value }));
  };

  const handleDateRangeChange = (range: any) => {
    setSearchParams((prev) => ({
      ...prev,
      checkIn: range?.from ? range.from.toISOString().split("T")[0] : null,
      checkOut: range?.to ? range.to.toISOString().split("T")[0] : null,
    }));
  };

  const handleGuestsChange = (e: any) => {
    setSearchParams((prev) => ({
      ...prev,
      guests: parseInt(e.target.value, 10) || 1,
    }));
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    if (searchParams.country)
      queryParams.append("country", searchParams.country);
    if (searchParams.checkIn)
      queryParams.append("checkIn", searchParams.checkIn);
    if (searchParams.checkOut)
      queryParams.append("checkOut", searchParams.checkOut);
    if (searchParams.guests)
      queryParams.append("guests", searchParams.guests.toString());

    router.push(`/properties?${queryParams.toString()}`);
  };

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full">
        <Image
          src={HeroImg}
          alt="Beautiful vacation destination"
          fill
          className="object-cover brightness-75 h-[600px] w-[1600px]"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Find Your Perfect Getaway
          </h1>
          <p className="mb-8 max-w-md text-lg text-white md:max-w-lg">
            Discover and book unique accommodations around the world.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-4xl rounded-lg bg-white p-4 shadow-lg">
            <div className="grid gap-4 md:grid-cols-4 ">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm lg:text-[15px] font-medium">
                  <MapPinIcon className="h-4 w-4" />
                  <span>Where</span>
                </div>
                <Select
                  value={searchParams.country}
                  onValueChange={handleCountryChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select the Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="United States">
                        United States
                      </SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="Mexico">Mexico</SelectItem>
                      <SelectItem value="United Kingdom">
                        United Kingdom
                      </SelectItem>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="Italy">Italy</SelectItem>
                      <SelectItem value="Spain">Spain</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                      <SelectItem value="India">India</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center gap-2 text-sm lg:text-[15px] font-medium">
                  <CalendarIcon className="h-4 w-4" />
                  <span>When</span>
                </div>
                <DatePickerWithRange
                  className="h-10"
                  onChange={handleDateRangeChange}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm lg:text-[15px] font-medium">
                  <UserIcon className="h-4 w-4" />
                  <span>Guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={1}
                    value={searchParams.guests}
                    onChange={handleGuestsChange}
                    className="h-10"
                  />
                  <Button
                    size="sm"
                    className="h-10 px-6"
                    onClick={handleSearch}
                  >
                    <SearchIcon className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the component remains the same */}
      {/* Featured Properties */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Featured Properties
              </h2>
              <p className="text-muted-foreground">
                Explore our handpicked selection of stunning vacation rentals
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/properties">View all properties</Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties.slice(0, 4).map((property, index) => (
              <PropertyCard
                id={property.id}
                key={property.id}
                title={property.title}
                location={
                  property.location.state?.concat(",") +
                  property.location.country
                }
                price={property.pricing.basePrice}
                rating={4.0 + index / 10}
                reviewCount={10 + index}
                imageUrl={`${property.images[0]?.url ?? ""}`}
                url={`/properties/${property.id}`}
              />
            ))}
            {/* <PropertyCard
              id="1"
              title="Beachfront Villa"
              location="Bali, Indonesia"
              price={120}
              rating={4.9}
              reviewCount={128}
              imageUrl="/placeholder.svg?height=300&width=400"
            />
            <PropertyCard
              id="2"
              title="Mountain Cabin"
              location="Aspen, Colorado"
              price={200}
              rating={4.8}
              reviewCount={96}
              imageUrl="/placeholder.svg?height=300&width=400"
            />
            <PropertyCard
              id="3"
              title="Luxury Apartment"
              location="Paris, France"
              price={180}
              rating={4.7}
              reviewCount={74}
              imageUrl="/placeholder.svg?height=300&width=400"
            />
            <PropertyCard
              id="4"
              title="Seaside Cottage"
              location="Santorini, Greece"
              price={150}
              rating={4.9}
              reviewCount={112}
              imageUrl="/placeholder.svg?height=300&width=400"
            /> */}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="bg-muted py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
            Popular Destinations
          </h2>
          <FeaturedDestinations />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-16 lg:py-20">
        <WhyUs />
      </section>

      {/* Testimonials */}
      <section className="bg-muted py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">
            What Our Guests Say
          </h2>
          <TestimonialCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <ListPropertyWithUs />
      </section>
    </main>
  );
}
