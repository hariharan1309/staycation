// components/property-amenities-form.tsx
"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PropertyAmenities } from "@/app/properties/new/page";

interface PropertyAmenitiesFormProps {
  amenities: PropertyAmenities;
  updateAmenities: (amenities: PropertyAmenities) => void;
}

interface AmenityOption {
  id: string;
  label: string;
}

export function PropertyAmenitiesForm({
  amenities,
  updateAmenities,
}: PropertyAmenitiesFormProps) {
  const [localAmenities, setLocalAmenities] = useState<PropertyAmenities>(
    amenities || {
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
    }
  );

  useEffect(() => {
    updateAmenities(localAmenities);
  }, [localAmenities]);

  const handleChange = (name: string, checked: boolean) => {
    setLocalAmenities({
      ...localAmenities,
      [name]: checked,
    });
  };

  // List of amenities to match your property view page
  const amenityOptions: AmenityOption[] = [
    { id: "wifi", label: "Free WiFi" },
    { id: "kitchen", label: "Kitchen" },
    { id: "ac", label: "Air Conditioning" },
    { id: "heating", label: "Heating" },
    { id: "tv", label: "TV" },
    { id: "parking", label: "Free Parking" },
    { id: "pool", label: "Private Pool" },
    { id: "beachfront", label: "Beachfront" },
    { id: "washer", label: "Washing Machine" },
    { id: "workspace", label: "Workspace" },
    { id: "outdoorDining", label: "Outdoor Dining Area" },
  ];

  return (
    <div className="space-y-6 md:max-w-2/3">
      <div className="rounded-lg border p-4">
        <p className="text-sm text-muted-foreground">
          Select all the amenities that your property offers. These will be
          displayed to potential guests.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {amenityOptions.map((amenity) => (
          <div key={amenity.id} className="flex items-center space-x-2">
            <Checkbox
              id={amenity.id}
              checked={localAmenities[amenity.id] || false}
              onCheckedChange={(checked) =>
                handleChange(amenity.id, checked as boolean)
              }
            />
            <Label htmlFor={amenity.id} className="font-normal">
              {amenity.label}
            </Label>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-lg font-semibold">Selected Amenities</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(localAmenities)
            .filter(([_, value]) => value)
            .map(([key]) => {
              const amenity = amenityOptions.find((a) => a.id === key);
              return (
                <div key={key} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>{amenity?.label || key}</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
