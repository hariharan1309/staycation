"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

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
// import { useToast } from "@/components/ui/use-toast";

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
  instantBook: boolean;
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
      instantBook: true,
      minNights: 2,
      maxNights: 30,
      taxes: true,
    },
  });

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

  const handleSubmit = async (): Promise<void> => {
    try {
      // Validate form data before submission
      if (!formData.title || !formData.description) {
        toast.warning("Missing Information", {
          description: "Please fill in all required fields",
        });
        return;
      }

      // Here you would typically send the data to your API
      console.log("Submitting property:", formData);

      // Show success message
      toast.success("Property Created", {
        description: "Your property has been successfully created",
      });

      // Redirect to the properties page or the new property page
      // router.push("/properties");
    } catch (error) {
      toast.error("Error", {
        description: "Failed to create property. Please try again.",
      });
    }
  };

  return (
    <main className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-6 flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/properties">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to properties</span>
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
              Save Property
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
