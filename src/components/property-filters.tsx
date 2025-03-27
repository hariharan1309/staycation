"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"

interface PropertyFiltersProps {
  onFilter: (filters: any) => void
}

export function PropertyFilters({ onFilter }: PropertyFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 500])
  const [bedrooms, setBedrooms] = useState<number | null>(null)
  const [bathrooms, setBathrooms] = useState<number | null>(null)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  const amenities = [
    "WiFi",
    "Pool",
    "Kitchen",
    "Air conditioning",
    "Heating",
    "Washer",
    "Dryer",
    "Free parking",
    "Gym",
    "Hot tub",
    "Beach access",
    "Ocean view",
    "Mountain view",
    "Fireplace",
  ]

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenity])
    } else {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity))
    }
  }

  const handleApplyFilters = () => {
    onFilter({
      priceRange,
      bedrooms,
      bathrooms,
      amenities: selectedAmenities,
    })
  }

  const handleClearFilters = () => {
    setPriceRange([0, 500])
    setBedrooms(null)
    setBathrooms(null)
    setSelectedAmenities([])
    onFilter({})
  }

  return (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="mb-4 text-sm font-medium">Price Range</h3>
        <div className="mb-6">
          <Slider defaultValue={[0, 500]} max={1000} step={10} value={priceRange} onValueChange={setPriceRange} />
        </div>
        <div className="flex items-center justify-between">
          <div className="rounded-md border px-2 py-1 text-sm">${priceRange[0]}</div>
          <div className="rounded-md border px-2 py-1 text-sm">${priceRange[1]}</div>
        </div>
      </div>

      <Separator />

      {/* Bedrooms */}
      <div>
        <h3 className="mb-4 text-sm font-medium">Bedrooms</h3>
        <div className="flex flex-wrap gap-2">
          {[null, 1, 2, 3, 4, 5].map((num, i) => (
            <Button
              key={i}
              variant={bedrooms === num ? "default" : "outline"}
              size="sm"
              onClick={() => setBedrooms(num)}
            >
              {num === null ? "Any" : num === 5 ? "5+" : num}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Bathrooms */}
      <div>
        <h3 className="mb-4 text-sm font-medium">Bathrooms</h3>
        <div className="flex flex-wrap gap-2">
          {[null, 1, 2, 3, 4, 5].map((num, i) => (
            <Button
              key={i}
              variant={bathrooms === num ? "default" : "outline"}
              size="sm"
              onClick={() => setBathrooms(num)}
            >
              {num === null ? "Any" : num === 5 ? "5+" : num}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Amenities */}
      <div>
        <h3 className="mb-4 text-sm font-medium">Amenities</h3>
        <div className="grid grid-cols-1 gap-3">
          {amenities.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={`amenity-${amenity}`}
                checked={selectedAmenities.includes(amenity)}
                onCheckedChange={(checked) => handleAmenityChange(amenity, checked === true)}
              />
              <Label htmlFor={`amenity-${amenity}`} className="text-sm font-normal">
                {amenity}
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
  )
}

