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
import { useRouter } from "next/navigation";

// import { useToast } from "@/components/ui/use-toast";

// Define types for the property data
export interface PropertyImage {
  id: number;
  url: string;
  main: boolean;
  publicId?: string;
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

export default function AddPropertyPage() {
  const [activeTab, setActiveTab] = useState<string>("basic");
  const router = useRouter();
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
      // F: true,
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

  const handleSubmit = async () => {
    try {
      const finalData = {
        ...formData,
        // Simplify the images structure before sending to API
        images: formData.images.map((img) => ({
          url: img.url,
          main: img.main,
          publicId: img.publicId,
        })),
      };

      toast.loading("Submitting property...", {
        duration: 1000,
      });

      // Step 3: Send data to API
      const response = await fetch("/api/properties/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) throw new Error("Failed to create property");
      const resp = await response.json();
      toast.success("Property created successfully!");
      router.push(`/properties/${resp.propertyId}`);
    } catch (error: any) {
      console.error("Error:", error);
      toast.error("Error submitting property", { description: error.message });
    }
  };

  // const uploadImageToFirebase = async (file: File): Promise<string> => {
  //   return new Promise(async (resolve, reject) => {
  //     const storageRef = ref(storage, `properties/${Date.now()}-${file.name}`);
  //     await uploadBytes(storageRef, file);
  //     const url = await getDownloadURL(storageRef);
  //     resolve(url);
  //   });
  // };

  return (
    <main className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-6 flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/properties">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to properties</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold md:text-[28px]">Add New Property</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
          <CardDescription>
            Fill in the details about your property to create a new listing.
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
