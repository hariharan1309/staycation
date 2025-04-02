"use client";

import { useEffect, useState } from "react";
import {
  Grid,
  List,
  MapPin,
  Search,
  SlidersHorizontal,
  Calendar,
  Users,
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PropertyCard } from "@/components/property-card";
import { PropertyFilters } from "@/components/property-filters";
import { PropertySearchBar } from "@/components/property-search-bar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

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
  images: { main: boolean; url: string; publicId?: string }[];
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  type: string;
  owner: string;
  createdAt: string;
  rating?: number;
  reviewCount?: number;
  featured?: boolean;
}

// Simplified property structure for display
interface DisplayProperty {
  id: string;
  title: string;
  location: string;
  country: string; // Added country field for filtering
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  amenities: string[];
  featured?: boolean;
  availableForDates?: boolean; // Track date availability
}

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<DisplayProperty[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<
    DisplayProperty[]
  >([]);
  const [sortOption, setSortOption] = useState("recommended");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;

  // Get URL parameters
  const urlCountry = searchParams.get("country") || "";
  const urlCheckIn = searchParams.get("checkIn") || "";
  const urlCheckOut = searchParams.get("checkOut") || "";
  const urlGuests = searchParams.get("guests")
    ? parseInt(searchParams.get("guests") as string)
    : 0;

  // Get properties from API on component mount
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/properties");
        const data = await response.json();

        if (data.status === 200 && Array.isArray(data.property)) {
          // Convert API properties to display format
          const displayProperties = data.property.map((property: Property) => ({
            id: property.id,
            title: property.title,
            location: `${property.location.city}, ${property.location.country}`,
            country: property.location.country,
            price: property.pricing.basePrice,
            rating: property.rating || (Math.random() * 1.0 + 4.0).toFixed(1), // Generate rating if not available
            reviewCount:
              property.reviewCount || Math.floor(Math.random() * 100) + 50, // Generate review count if not available
            imageUrl:
              property.images?.length > 0
                ? property.images[0].url
                : "/placeholder.svg?height=300&width=400",
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            guests: property.maxGuests,
            amenities: getPropertyAmenities(property.amenities),
            featured: Math.random() > 0.7, // Randomly mark some properties as featured
            availableForDates: true, // Assume available by default
          }));

          setProperties(displayProperties);
          // Apply URL filters after loading properties
          applyUrlFilters(displayProperties);
        } else {
          // If API fails, use mock data
          setProperties([]);
          applyUrlFilters([]);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
        setProperties([]);
        applyUrlFilters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Apply URL filters when properties are loaded
  const applyUrlFilters = (propertiesData: DisplayProperty[]) => {
    let results = [...propertiesData];

    // Set search query from URL country
    if (urlCountry) {
      setSearchQuery(urlCountry);
      results = results.filter(
        (property) =>
          property.country.toLowerCase().includes(urlCountry.toLowerCase()) ||
          property.location.toLowerCase().includes(urlCountry.toLowerCase())
      );
    }

    // Filter by guests
    if (urlGuests > 0) {
      results = results.filter((property) => property.guests >= urlGuests);
    }

    // Set date constraints (in a real app, you'd check availability)
    if (urlCheckIn && urlCheckOut) {
      // This is simplified - in a real app, you'd check the actual availability
      // Here we're just randomly marking some properties as unavailable
      results = results.map((property) => ({
        ...property,
        availableForDates: Math.random() > 0.3, // 70% chance of being available
      }));

      // Only show available properties
      results = results.filter((property) => property.availableForDates);
    }

    setFilteredProperties(results);
  };

  // Helper function to extract amenities from property
  const getPropertyAmenities = (amenities: Amenities): string[] => {
    return Object.entries(amenities)
      .filter(([_, isAvailable]) => isAvailable)
      .map(([amenity]) => amenity.charAt(0).toUpperCase() + amenity.slice(1));
  };

  // Handle search input
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    // Update the URL with the search query (as country)
    const params = new URLSearchParams(searchParams.toString());
    params.set("country", query);

    // Keep existing params
    if (urlCheckIn) params.set("checkIn", urlCheckIn);
    if (urlCheckOut) params.set("checkOut", urlCheckOut);
    if (urlGuests) params.set("guests", urlGuests.toString());

    // Update URL
    router.push(`/properties?${params.toString()}`);

    // Apply filters with the new search query
    applyFilters({ searchQuery: query });
  };

  // Handle sort selection
  const handleSort = (option: string) => {
    setSortOption(option);

    let sorted = [...filteredProperties];

    switch (option) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort(
          (a, b) => parseFloat(String(b.rating)) - parseFloat(String(a.rating))
        );
        break;
      default:
        // Default sorting (recommended)
        sorted = [...filteredProperties].sort(
          (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        );
    }

    setFilteredProperties(sorted);
    setCurrentPage(1);
  };

  // Apply filters
  const applyFilters = (filters: any) => {
    let results = [...properties];
    console.log(results);
    console.log(filters);
    // Apply search query if provided
    if (filters.searchQuery || searchQuery) {
      const query = (filters.searchQuery || searchQuery).toLowerCase();
      results = results.filter(
        (property) =>
          property.title.toLowerCase().includes(query) ||
          property.location.toLowerCase().includes(query) ||
          property.country.toLowerCase().includes(query)
      );
    }

    // Filter by price range
    if (filters.priceRange) {
      results = results.filter(
        (property) =>
          property.price >= filters.priceRange[0] &&
          property.price <= filters.priceRange[1]
      );
    }

    // Filter by bedrooms
    if (filters.bedrooms) {
      results = results.filter(
        (property) => property.bedrooms >= filters.bedrooms
      );
    }

    // Filter by bathrooms
    if (filters.bathrooms) {
      results = results.filter(
        (property) => property.bathrooms >= filters.bathrooms
      );
    }

    // Filter by guests from either filter or URL
    const guestsFilter = filters.guests || urlGuests;
    if (guestsFilter) {
      results = results.filter((property) => property.guests >= guestsFilter);
    }

    // Filter by amenities
    if (filters.amenities && filters.amenities.length > 0) {
      results = results.filter((property) =>
        filters.amenities.every((amenity: string) =>
          property.amenities.includes(amenity)
        )
      );
    }

    // Filter by dates (if provided in URL)
    if (urlCheckIn && urlCheckOut) {
      results = results.filter((property) => property.availableForDates);
    }

    // Apply current sort option to new filtered results
    switch (sortOption) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        results.sort(
          (a, b) => parseFloat(String(b.rating)) - parseFloat(String(a.rating))
        );
        break;
      default:
        // Default sorting (recommended)
        results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    setFilteredProperties(results);
    setCurrentPage(1);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");

    // Clear URL parameters
    router.push("/properties");

    setFilteredProperties([...properties]);
    setCurrentPage(1);
    setSortOption("recommended");
  };

  // Pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  // Format dates for display
  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (e) {
      return dateString;
    }
  };

  return (
    <main className="container px-4 py-8 md:px-6 md:py-12 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold">Find Your Perfect Stay</h1>

      {/* Search Bar */}
      <div className="mb-8">
        <PropertySearchBar
          initialValue={searchQuery}
          onSearch={handleSearch}
          onClear={clearFilters}
          placeholder="Search by location, property name..."
          className="max-w-[80vw] mx-auto"
        />
      </div>

      {/* Active Filters Display */}
      {(urlCountry || urlCheckIn || urlCheckOut || urlGuests > 0) && (
        <div className="mb-6 flex flex-wrap gap-2">
          {urlCountry && (
            <Badge variant="outline" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {urlCountry}
            </Badge>
          )}
          {urlCheckIn && urlCheckOut && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDateDisplay(urlCheckIn)} - {formatDateDisplay(urlCheckOut)}
            </Badge>
          )}
          {urlGuests > 0 && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {urlGuests} guest{urlGuests !== 1 ? "s" : ""}
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-6 px-2"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Mobile Filter Button */}
      <div className="mb-6 flex items-center justify-between md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <div className="py-4">
              <h2 className="mb-6 text-lg font-semibold">Filters</h2>
              <PropertyFilters
                onFilter={applyFilters}
                onClear={clearFilters}
                initialGuests={urlGuests}
              />
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2">
          <Select value={sortOption} onValueChange={handleSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex rounded-md border border-input">
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-none ${
                viewMode === "grid" ? "bg-muted" : ""
              }`}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-none ${
                viewMode === "list" ? "bg-muted" : ""
              }`}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        {/* Desktop Filters Sidebar */}
        <div className="hidden w-[280px] shrink-0 md:block">
          <div className="sticky top-24 rounded-lg border p-6">
            <h2 className="mb-6 text-lg font-semibold">Filters</h2>
            <PropertyFilters
              onFilter={applyFilters}
              onClear={clearFilters}
              initialGuests={urlGuests}
            />
          </div>
        </div>

        {/* Properties Grid/List */}
        <div className="flex-1">
          {/* Desktop Sort and View Options */}
          <div className="mb-6 hidden items-center justify-between md:flex">
            <p className="text-muted-foreground">
              {filteredProperties.length} properties found
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Sort by:</span>
              <Select value={sortOption} onValueChange={handleSort}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <div className="flex rounded-md border border-input">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-none ${
                    viewMode === "grid" ? "bg-muted" : ""
                  }`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                  <span className="sr-only">Grid view</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-none ${
                    viewMode === "list" ? "bg-muted" : ""
                  }`}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                  <span className="sr-only">List view</span>
                </Button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="mt-4 text-muted-foreground">
                Loading properties...
              </p>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
              <Search className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-xl font-semibold">
                No properties found
              </h3>
              <p className="mb-6 text-muted-foreground">
                Try adjusting your filters to find more properties.
              </p>
              <Button onClick={clearFilters}>Clear all filters</Button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  id={property.id}
                  title={property.title}
                  location={property.location}
                  price={property.price}
                  rating={property.rating}
                  reviewCount={property.reviewCount}
                  imageUrl={property.imageUrl}
                  featured={property.featured}
                  url={`/properties/${property.id}${
                    urlCheckIn && urlCheckOut
                      ? `?checkIn=${urlCheckIn}&checkOut=${urlCheckOut}&guests=${
                          urlGuests || 1
                        }`
                      : ""
                  }`}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {currentProperties.map((property) => (
                <div
                  key={property.id}
                  className="flex flex-col overflow-hidden rounded-lg border sm:flex-row"
                >
                  <div className="relative h-48 w-full sm:h-auto sm:w-1/3">
                    <Image
                      src={property.imageUrl || "/placeholder.svg"}
                      alt={property.title}
                      className="object-cover"
                      fill
                    />
                    {property.featured && (
                      <div className="absolute left-2 top-2 rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{property.title}</h3>
                        <div className="mt-1 flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-1 h-3 w-3" />
                          {property.location}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="mr-1 h-4 w-4 fill-primary text-primary"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm font-medium">
                          {property.rating}
                        </span>
                        <span className="ml-1 text-xs text-muted-foreground">
                          ({property.reviewCount})
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <div className="rounded-md bg-muted px-2 py-1 text-xs">
                        {property.bedrooms} bedroom
                        {property.bedrooms !== 1 && "s"}
                      </div>
                      <div className="rounded-md bg-muted px-2 py-1 text-xs">
                        {property.bathrooms} bathroom
                        {property.bathrooms !== 1 && "s"}
                      </div>
                      <div className="rounded-md bg-muted px-2 py-1 text-xs">
                        {property.guests} guest{property.guests !== 1 && "s"}
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {property.amenities.slice(0, 3).map((amenity) => (
                        <div
                          key={amenity}
                          className="rounded-md bg-muted px-2 py-1 text-xs"
                        >
                          {amenity}
                        </div>
                      ))}
                      {property.amenities.length > 3 && (
                        <div className="rounded-md bg-muted px-2 py-1 text-xs">
                          +{property.amenities.length - 3} more
                        </div>
                      )}
                    </div>

                    {/* Date information if available */}
                    {urlCheckIn && urlCheckOut && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        <Calendar className="mr-1 inline-block h-3 w-3" />
                        {formatDateDisplay(urlCheckIn)} -{" "}
                        {formatDateDisplay(urlCheckOut)}
                      </div>
                    )}

                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div>
                        <span className="font-semibold">${property.price}</span>
                        <span className="text-sm text-muted-foreground">
                          {" "}
                          / night
                        </span>
                      </div>
                      <Button asChild>
                        <a
                          href={`/properties/${property.id}${
                            urlCheckIn && urlCheckOut
                              ? `?checkIn=${urlCheckIn}&checkOut=${urlCheckOut}&guests=${
                                  urlGuests || 1
                                }`
                              : ""
                          }`}
                        >
                          View Details
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredProperties.length > 0 && (
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  <span className="sr-only">Previous page</span>
                </Button>

                {Array.from({ length: Math.min(totalPages, 3) }).map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant="outline"
                      size="sm"
                      className={
                        currentPage === pageNum
                          ? "bg-primary text-primary-foreground"
                          : ""
                      }
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}

                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                  <span className="sr-only">Next page</span>
                </Button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
