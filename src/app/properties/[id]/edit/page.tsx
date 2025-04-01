"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyBasicInfoForm } from "@/components/property-basic-form";
import { PropertyLocationForm } from "@/components/property-location-form";
import { PropertyAmenitiesForm } from "@/components/property-amenities-form";
import { PropertyImagesForm } from "@/components/property-images-form";
import { PropertyPricingForm } from "@/components/property-pricing-form";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

// Define types for the property data
export interface PropertyImage {
  id: number;
  url: string;
  main: boolean;
}

export interface PropertyLocation {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  directions?: string;
}

export interface PropertyAmenities {
  wifi: boolean;
  kitchen: boolean;
  ac: boolean;
  heating: boolean;
  tv: boolean;
  parking: boolean;
  pool: boolean;
  beachfront: boolean;
  washer: boolean;
  workspace: boolean;
  outdoorDining: boolean;
  [key: string]: boolean;
}

export interface PropertyPricing {
  basePrice: number;
  cleaningFee: number;
  securityDeposit: number;
  weeklyDiscount: number;
  monthlyDiscount: number;
  // instantBook: boolean;
  minNights: number;
  maxNights: number;
  taxes: boolean;
}

export interface PropertyFormData {
  title: string;
  description: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  location: PropertyLocation;
  amenities: PropertyAmenities;
  images: PropertyImage[];
  pricing: PropertyPricing;
}

export default function EditPropertyPage() {
  const [activeTab, setActiveTab] = useState<string>("basic");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();

  const [formData, setFormData] = useState<PropertyFormData>({
    // Basic Info
    title: "",
    description: "",
    type: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,

    // Location
    location: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      directions: "",
    },

    // Amenities
    amenities: {
      wifi: false,
      kitchen: false,
      ac: false,
      heating: false,
      tv: false,
      parking: false,
      pool: false,
      beachfront: false,
      washer: false,
      workspace: false,
      outdoorDining: false,
    },

    // Images
    images: [],

    // Pricing
    pricing: {
      basePrice: 100,
      cleaningFee: 50,
      securityDeposit: 200,
      weeklyDiscount: 10,
      monthlyDiscount: 20,
      // instantBook: true,
      minNights: 2,
      maxNights: 30,
      taxes: true,
    },
  });

  // Fetch existing property data
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
          // Map the API data to form data structure
          const property = data.property;

          // Create image array in the format expected by the form
          const imageArray = property.images
            ? property.images.map((url: string, index: number) => ({
                id: index,
                url: url,
                main: index === 0, // First image is main by default
              }))
            : [];

          setFormData({
            title: property.title || "",
            description: property.description || "",
            type: property.type || "apartment",
            bedrooms: property.bedrooms || 1,
            bathrooms: property.bathrooms || 1,
            maxGuests: property.maxGuests || 2,
            location: {
              address: property.location?.address || "",
              city: property.location?.city || "",
              state: property.location?.state || "",
              zipCode: property.location?.zipCode || "",
              country: property.location?.country || "United States",
              directions: property.location?.directions || "",
            },
            amenities: {
              wifi: property.amenities?.wifi || false,
              kitchen: property.amenities?.kitchen || false,
              ac: property.amenities?.ac || false,
              heating: property.amenities?.heating || false,
              tv: property.amenities?.tv || false,
              parking: property.amenities?.parking || false,
              pool: property.amenities?.pool || false,
              beachfront: property.amenities?.beachfront || false,
              washer: property.amenities?.washer || false,
              workspace: property.amenities?.workspace || false,
              outdoorDining: property.amenities?.outdoorDining || false,
            },
            images: imageArray,
            pricing: {
              basePrice: property.pricing?.basePrice || 100,
              cleaningFee: property.pricing?.cleaningFee || 50,
              securityDeposit: property.pricing?.securityDeposit || 200,
              weeklyDiscount: property.pricing?.weeklyDiscount || 10,
              monthlyDiscount: property.pricing?.monthlyDiscount || 20,
              // instantBook: property.pricing?.instantBook || true,
              minNights: property.pricing?.minNights || 2,
              maxNights: property.pricing?.maxNights || 30,
              taxes: property.pricing?.taxes || true,
            },
          });
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

  const updateFormData = (section: string, data: any): void => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const handleNextTab = (): void => {
    const tabOrder = ["basic", "location", "amenities", "photos", "pricing"];
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    }
  };

  const handlePrevTab = (): void => {
    const tabOrder = ["basic", "location", "amenities", "photos", "pricing"];
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabOrder[currentIndex - 1]);
    }
  };

  const handleSubmit = async () => {
    try {
      // Validate form data
      if (!formData.title || !formData.description) {
        toast.warning("Missing Information", {
          description: "Please fill in all required fields",
        });
        return;
      }

      const finalData = {
        ...formData,
        // images: formData.images.map((img) => img.url), // Convert to array of URLs
        images: [],
      };

      // Send data to API
      const response = await fetch(`/api/properties/${params.id}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) throw new Error("Failed to update property");
      const data = await response.json();

      toast.success("Property updated successfully!");
      router.push(`/properties/${params.id}`);
    } catch (error: any) {
      console.error("Error:", error);
      toast.error("Error updating property", { description: error.message });
    }
  };

  // Render loading state
  if (loading) {
    return (
      <main className="container px-4 py-8 md:px-6 md:py-12">
        <div className="mb-6 flex items-center gap-2">
          <Button variant="ghost" size="icon" disabled>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Skeleton className="h-8 w-60" />
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-40 mb-2" />
            <Skeleton className="h-5 w-72" />
          </CardHeader>
          <CardContent>
            <div className="w-full px-2 md:p-5 lg:px-10">
              <Skeleton className="h-10 w-full mb-6" />
              <div className="mt-6 p-4 md:p-6 lg:p-8">
                <Skeleton className="h-12 w-full mb-4" />
                <Skeleton className="h-12 w-full mb-4" />
                <Skeleton className="h-12 w-full mb-4" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-28" />
          </CardFooter>
        </Card>
      </main>
    );
  }

  // Render error state
  if (error) {
    return (
      <main className="container px-4 py-8 md:px-6 md:py-12">
        <div className="mb-6 flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/properties">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to properties</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold md:text-[28px]">Error</h1>
        </div>

        <Card className="bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700">
              Failed to Load Property
            </CardTitle>
            <CardDescription className="text-red-600">{error}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <Link href="/properties">Return to Properties</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    );
  }

  return (
    <main className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-6 flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/properties/${params.id}`}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to property</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold md:text-[28px]">Update Property</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
          <CardDescription>
            Update the details about your property.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full px-2 md:p-5 lg:px-10"
          >
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="mt-6 p-4 md:p-6 lg:p-8">
              <PropertyBasicInfoForm
                formData={formData}
                updateFormData={(data: Partial<PropertyFormData>) => {
                  setFormData((prev) => ({ ...prev, ...data }));
                }}
              />
            </TabsContent>

            <TabsContent value="location" className="mt-6 p-4 md:p-6 lg:p-8">
              <PropertyLocationForm
                location={formData.location}
                updateLocation={(data: PropertyLocation) =>
                  updateFormData("location", data)
                }
              />
            </TabsContent>

            <TabsContent value="amenities" className="mt-6 p-4 md:p-6 lg:p-8">
              <PropertyAmenitiesForm
                amenities={formData.amenities}
                updateAmenities={(data: PropertyAmenities) =>
                  updateFormData("amenities", data)
                }
              />
            </TabsContent>

            <TabsContent value="photos" className="mt-6 p-4 md:p-6 lg:p-8">
              <PropertyImagesForm
                images={formData.images}
                updateImages={(data: PropertyImage[]) =>
                  updateFormData("images", data)
                }
              />
            </TabsContent>

            <TabsContent value="pricing" className="mt-6 p-4 md:p-6 lg:p-8">
              <PropertyPricingForm
                pricing={formData.pricing}
                updatePricing={(data: PropertyPricing) =>
                  updateFormData("pricing", data)
                }
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevTab}
            disabled={activeTab === "basic"}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {activeTab === "pricing" ? (
            <Button type="submit" onClick={handleSubmit}>
              <Check className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          ) : (
            <Button onClick={handleNextTab}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </main>
  );
}
