"use client"

import type React from "react"

import { useState } from "react"
import { MapPin } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function PropertyLocationForm() {
  const [location, setLocation] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setLocation({
      ...location,
      [name]: value,
    })
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-dashed p-6">
        <div className="flex flex-col items-center justify-center text-center">
          <MapPin className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="mb-2 text-lg font-semibold">Property Location</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Enter the exact address of your property. This information will be used for map display and directions.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="address">Street Address</Label>
          <Input
            id="address"
            name="address"
            value={location.address}
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
              value={location.city}
              onChange={handleChange}
              placeholder="New York"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State/Province</Label>
            <Input id="state" name="state" value={location.state} onChange={handleChange} placeholder="NY" required />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="zipCode">Zip/Postal Code</Label>
            <Input
              id="zipCode"
              name="zipCode"
              value={location.zipCode}
              onChange={handleChange}
              placeholder="10001"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <select
              id="country"
              name="country"
              value={location.country}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="Mexico">Mexico</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="France">France</option>
              <option value="Germany">Germany</option>
              <option value="Italy">Italy</option>
              <option value="Spain">Spain</option>
              <option value="Australia">Australia</option>
              <option value="Japan">Japan</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="directions">Directions (Optional)</Label>
          <Textarea
            id="directions"
            name="directions"
            placeholder="Provide additional directions to help guests find your property..."
            rows={3}
          />
        </div>
      </div>
    </div>
  )
}

