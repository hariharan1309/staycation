"use client"

import type React from "react"

import { useState } from "react"
import { DollarSign } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

export function PropertyPricingForm() {
  const [pricing, setPricing] = useState({
    basePrice: 100,
    cleaningFee: 50,
    securityDeposit: 200,
    weeklyDiscount: 10,
    monthlyDiscount: 20,
    instantBook: true,
    minNights: 2,
    maxNights: 30,
    taxes: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setPricing({
      ...pricing,
      [name]: type === "number" ? Number.parseFloat(value) : value,
    })
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setPricing({
      ...pricing,
      [name]: checked,
    })
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4">
        <p className="text-sm text-muted-foreground">
          Set your property's pricing and availability. You can always change these settings later.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Base Pricing</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="basePrice">Base Price (per night)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="basePrice"
                name="basePrice"
                type="number"
                min={0}
                value={pricing.basePrice}
                onChange={handleChange}
                className="pl-9"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cleaningFee">Cleaning Fee</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="cleaningFee"
                name="cleaningFee"
                type="number"
                min={0}
                value={pricing.cleaningFee}
                onChange={handleChange}
                className="pl-9"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="securityDeposit">Security Deposit</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="securityDeposit"
                name="securityDeposit"
                type="number"
                min={0}
                value={pricing.securityDeposit}
                onChange={handleChange}
                className="pl-9"
              />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="font-medium">Discounts</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="weeklyDiscount">Weekly Discount (%)</Label>
            <Input
              id="weeklyDiscount"
              name="weeklyDiscount"
              type="number"
              min={0}
              max={100}
              value={pricing.weeklyDiscount}
              onChange={handleChange}
            />
            <p className="text-xs text-muted-foreground">Discount for stays of 7 nights or more</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthlyDiscount">Monthly Discount (%)</Label>
            <Input
              id="monthlyDiscount"
              name="monthlyDiscount"
              type="number"
              min={0}
              max={100}
              value={pricing.monthlyDiscount}
              onChange={handleChange}
            />
            <p className="text-xs text-muted-foreground">Discount for stays of 28 nights or more</p>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="font-medium">Booking Options</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="instantBook">Instant Book</Label>
              <p className="text-xs text-muted-foreground">
                Allow guests to book without sending a reservation request
              </p>
            </div>
            <Switch
              id="instantBook"
              checked={pricing.instantBook}
              onCheckedChange={(checked) => handleSwitchChange("instantBook", checked)}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="minNights">Minimum Nights</Label>
              <Input
                id="minNights"
                name="minNights"
                type="number"
                min={1}
                value={pricing.minNights}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxNights">Maximum Nights</Label>
              <Input
                id="maxNights"
                name="maxNights"
                type="number"
                min={1}
                value={pricing.maxNights}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="font-medium">Taxes</h3>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="taxes"
            checked={pricing.taxes}
            onCheckedChange={(checked) => handleSwitchChange("taxes", checked === true)}
          />
          <Label htmlFor="taxes" className="font-normal">
            I understand that I'm responsible for collecting and remitting all applicable taxes
          </Label>
        </div>
      </div>
    </div>
  )
}

