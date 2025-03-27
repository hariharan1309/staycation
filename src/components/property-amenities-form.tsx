"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function PropertyAmenitiesForm() {
  const [customAmenity, setCustomAmenity] = useState("")
  const [customAmenities, setCustomAmenities] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  const commonAmenities = [
    {
      category: "Essentials",
      items: ["WiFi", "Kitchen", "Washer", "Dryer", "Air conditioning", "Heating", "TV", "Iron"],
    },
    {
      category: "Features",
      items: ["Pool", "Hot tub", "Free parking", "EV charger", "Gym", "BBQ grill", "Fire pit", "Indoor fireplace"],
    },
    {
      category: "Location",
      items: ["Beachfront", "Waterfront", "Ski-in/ski-out", "Ocean view", "Lake view", "Mountain view"],
    },
    {
      category: "Safety",
      items: ["Smoke alarm", "Carbon monoxide alarm", "Fire extinguisher", "First aid kit", "Security cameras"],
    },
  ]

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenity])
    } else {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity))
    }
  }

  const handleAddCustomAmenity = () => {
    if (customAmenity.trim() !== "" && !customAmenities.includes(customAmenity)) {
      setCustomAmenities([...customAmenities, customAmenity])
      setSelectedAmenities([...selectedAmenities, customAmenity])
      setCustomAmenity("")
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4">
        <p className="text-sm text-muted-foreground">
          Select all the amenities that your property offers. Accurate amenities help set guest expectations.
        </p>
      </div>

      {commonAmenities.map((category) => (
        <div key={category.category} className="space-y-4">
          <h3 className="font-medium">{category.category}</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {category.items.map((amenity) => (
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
          <Separator className="my-4" />
        </div>
      ))}

      <div className="space-y-4">
        <h3 className="font-medium">Custom Amenities</h3>
        <div className="flex items-end gap-2">
          <div className="flex-1 space-y-2">
            <Label htmlFor="custom-amenity">Add Custom Amenity</Label>
            <Input
              id="custom-amenity"
              value={customAmenity}
              onChange={(e) => setCustomAmenity(e.target.value)}
              placeholder="e.g. Outdoor shower"
            />
          </div>
          <Button type="button" onClick={handleAddCustomAmenity}>
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>

        {customAmenities.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {customAmenities.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={`custom-amenity-${amenity}`}
                  checked={selectedAmenities.includes(amenity)}
                  onCheckedChange={(checked) => handleAmenityChange(amenity, checked === true)}
                />
                <Label htmlFor={`custom-amenity-${amenity}`} className="text-sm font-normal">
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

