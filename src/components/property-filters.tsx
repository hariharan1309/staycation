"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";

interface PropertyFiltersProps {
  onFilter: (filters: any) => void;
  onClear: () => void;
  maxPrice?: number;
}

export function PropertyFilters({
  onFilter,
  onClear,
  maxPrice = 1000,
}: PropertyFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, maxPrice / 2]);
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [bathrooms, setBathrooms] = useState<number | null>(null);
  const [guests, setGuests] = useState<number | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // Standardized amenities list that matches the property data structure
  const amenities = [
    { key: "wifi", label: "WiFi", value: false },
    { key: "pool", label: "Pool", value: false },
    { key: "kitchen", label: "Kitchen", value: false },
    { key: "ac", label: "Air conditioning", value: false },
    { key: "heating", label: "Heating", value: false },
    { key: "washer", label: "Washer", value: false },
    { key: "parking", label: "Free parking", value: false },
    { key: "beachfront", label: "Beach access", value: false },
    { key: "outdoorDining", label: "Outdoor dining", value: false },
    { key: "tv", label: "TV", value: false }, // Added from JSON
    { key: "workspace", label: "Workspace", value: false }, // Added from JSON
  ];

  const handleAmenityChange = (amenityKey: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenityKey]);
    } else {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenityKey));
    }
  };

  const handleApplyFilters = () => {
    onFilter({
      priceRange,
      bedrooms,
      bathrooms,
      guests,
      amenities: selectedAmenities,
    });
  };

  const handleClearFilters = () => {
    setPriceRange([0, maxPrice / 2]);
    setBedrooms(null);
    setBathrooms(null);
    setGuests(null);
    setSelectedAmenities([]);
    onClear();
  };

  return (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="mb-4 text-sm font-medium">Price Range</h3>
        <div className="mb-6">
          <Slider
            defaultValue={[0, maxPrice / 2]}
            max={maxPrice}
            step={10}
            value={priceRange}
            onValueChange={setPriceRange}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="rounded-md border px-2 py-1 text-sm">
            ${priceRange[0]}
          </div>
          <div className="rounded-md border px-2 py-1 text-sm">
            ${priceRange[1]}
          </div>
        </div>
      </div>

      <Separator />

      {/* Bedrooms */}
      <div>
        <h3 className="mb-4 text-sm font-medium">Bedrooms</h3>
        <div className="flex flex-wrap gap-2">
          {[null, 1, 2, 3, 4].map((num, i) => (
            <Button
              key={i}
              variant={bedrooms === num ? "default" : "outline"}
              size="sm"
              onClick={() => setBedrooms(num)}
            >
              {num === null ? "Any" : num === 4 ? "4+" : num}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Bathrooms */}
      <div>
        <h3 className="mb-4 text-sm font-medium">Bathrooms</h3>
        <div className="flex flex-wrap gap-2">
          {[null, 1, 2, 3, 4].map((num, i) => (
            <Button
              key={i}
              variant={bathrooms === num ? "default" : "outline"}
              size="sm"
              onClick={() => setBathrooms(num)}
            >
              {num === null ? "Any" : num === 4 ? "4+" : num}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Guests */}
      <div>
        <h3 className="mb-4 text-sm font-medium">Guests</h3>
        <div className="flex flex-wrap gap-2">
          {[null, 1, 2, 4, 6].map((num, i) => (
            <Button
              key={i}
              variant={guests === num ? "default" : "outline"}
              size="sm"
              onClick={() => setGuests(num)}
            >
              {num === null ? "Any" : num === 6 ? "6+" : num}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Amenities */}
      <div>
        <h3 className="mb-4 text-sm font-medium">Amenities</h3>
        <div className="grid grid-cols-1 gap-3">
          {amenities.map(({ key, label }) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={`amenity-${key}`}
                checked={selectedAmenities.includes(key)}
                onCheckedChange={(checked) =>
                  handleAmenityChange(key, checked === true)
                }
              />
              <Label htmlFor={`amenity-${key}`} className="text-sm font-normal">
                {label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-4">
        <Button onClick={handleApplyFilters}>Apply Filters</Button>
        <Button variant="outline" onClick={handleClearFilters}>
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
