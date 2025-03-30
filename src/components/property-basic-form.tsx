// components/property-basic-info-form.tsx
"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyFormData } from "@/app/properties/new/page";
// import { PropertyFormData } from "@/app/properties/add/page";

interface PropertyBasicInfoFormProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}

interface BasicInfoState {
  title: string;
  description: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
}

export function PropertyBasicInfoForm({
  formData,
  updateFormData,
}: PropertyBasicInfoFormProps) {
  const [localData, setLocalData] = useState<BasicInfoState>({
    title: formData.title || "",
    description: formData.description || "",
    type: formData.type || "apartment",
    bedrooms: formData.bedrooms || 1,
    bathrooms: formData.bathrooms || 1,
    maxGuests: formData.maxGuests || 2,
  });

  useEffect(() => {
    updateFormData(localData);
  }, [localData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setLocalData({
      ...localData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setLocalData({
      ...localData,
      [name]: value,
    });
  };

  return (
    <div className="space-y-6 md:max-w-2/3">
      <div className="space-y-2">
        <Label htmlFor="title">Property Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="e.g. Cozy Beachfront Villa"
          value={localData.title}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Describe your property..."
          value={localData.description}
          onChange={handleInputChange}
          rows={5}
          required
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="type">Property Type</Label>
          <Select
            value={localData.type}
            onValueChange={(value) => handleSelectChange("type", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="cabin">Cabin</SelectItem>
              <SelectItem value="cottage">Cottage</SelectItem>
              <SelectItem value="bungalow">Bungalow</SelectItem>
              <SelectItem value="studio">Studio</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input
            id="bedrooms"
            name="bedrooms"
            type="number"
            min={0}
            value={localData.bedrooms}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Input
            id="bathrooms"
            name="bathrooms"
            type="number"
            min={0}
            step={0.5}
            value={localData.bathrooms}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxGuests">Max Guests</Label>
          <Input
            id="maxGuests"
            name="maxGuests"
            type="number"
            min={1}
            value={localData.maxGuests}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
    </div>
  );
}
