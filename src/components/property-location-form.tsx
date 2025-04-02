// components/property-location-form.tsx
"use client";

import { useEffect, useState } from "react";
import { MapPin, MapPinHouse } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PropertyLocation } from "@/app/properties/new/page";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PropertyLocationFormProps {
  location: PropertyLocation;
  updateLocation: (location: PropertyLocation) => void;
}

export function PropertyLocationForm({
  location,
  updateLocation,
}: PropertyLocationFormProps) {
  const [localLocation, setLocalLocation] = useState<PropertyLocation>({
    address: location.address || "",
    city: location.city || "",
    state: location.state || "",
    zipCode: location.zipCode || "",
    country: location.country || "United States",
    directions: location.directions || "",
  });

  useEffect(() => {
    updateLocation(localLocation);
  }, [localLocation]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setLocalLocation({
      ...localLocation,
      [name]: value,
    });
  };

  const handleSelectChange = (value: string) => {
    setLocalLocation({
      ...localLocation,
      country: value,
    });
  };

  return (
    <div className="space-y-6 md:max-w-2/3">
      <div className="rounded-lg border border-dashed p-6">
        <div className="flex flex-col items-center justify-center text-center">
          <MapPinHouse className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="mb-2 text-lg font-semibold">Property Location</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Enter the exact address of your property. This information will be
            used for map display and directions.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="address">Street Address</Label>
          <Input
            id="address"
            name="address"
            value={localLocation.address}
            onChange={handleChange}
            placeholder="123 Main St"
            required
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              value={localLocation.city}
              onChange={handleChange}
              placeholder="New York"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State/Province</Label>
            <Input
              id="state"
              name="state"
              value={localLocation.state}
              onChange={handleChange}
              placeholder="NY"
              required
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="zipCode">Zip/Postal Code</Label>
            <Input
              id="zipCode"
              name="zipCode"
              value={localLocation.zipCode}
              onChange={handleChange}
              placeholder="10001"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select
              value={localLocation.country}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select the Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="Mexico">Mexico</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
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
        </div>

        <div className="space-y-2">
          <Label htmlFor="directions">Directions (SelectItemal)</Label>
          <Textarea
            id="directions"
            name="directions"
            value={localLocation.directions}
            onChange={handleChange}
            placeholder="Provide additional directions to help guests find your property..."
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}
