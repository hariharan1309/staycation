// components/property-pricing-form.tsx
"use client";

import { useEffect, useState } from "react";
import { DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { PropertyPricing } from "@/app/properties/new/page";

interface PropertyPricingFormProps {
  pricing: PropertyPricing;
  updatePricing: (pricing: PropertyPricing) => void;
}

export function PropertyPricingForm({
  pricing,
  updatePricing,
}: PropertyPricingFormProps) {
  const [localPricing, setLocalPricing] = useState<PropertyPricing>({
    basePrice: pricing.basePrice || 100,
    cleaningFee: pricing.cleaningFee || 50,
    securityDeposit: pricing.securityDeposit || 200,
    weeklyDiscount: pricing.weeklyDiscount || 10,
    monthlyDiscount: pricing.monthlyDiscount || 20,
    instantBook: pricing.instantBook ?? true,
    minNights: pricing.minNights || 2,
    maxNights: pricing.maxNights || 30,
    taxes: pricing.taxes ?? true,
  });

  useEffect(() => {
    updatePricing(localPricing);
  }, [localPricing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type } = e.target;
    setLocalPricing({
      ...localPricing,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSwitchChange = (name: string, checked: boolean): void => {
    setLocalPricing({
      ...localPricing,
      [name]: checked,
    });
  };

  return (
    <div className="space-y-6 md:max-w-2/3">
      <div className="rounded-lg border p-4">
        <p className="text-sm text-muted-foreground">
          Set your property's pricing and availability. You can always change
          these settings later.
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
            <p className="text-xs text-muted-foreground">
              Discount for stays of 7 nights or more
            </p>
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
            <p className="text-xs text-muted-foreground">
              Discount for stays of 28 nights or more
            </p>
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
              onCheckedChange={(checked) =>
                handleSwitchChange("instantBook", checked)
              }
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
            onCheckedChange={(checked) =>
              handleSwitchChange("taxes", checked === true)
            }
          />
          <Label htmlFor="taxes" className="font-normal">
            I understand that I'm responsible for collecting and remitting all
            applicable taxes
          </Label>
        </div>
      </div>
    </div>
  );
}
