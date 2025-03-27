"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PropertyAmenitiesForm } from "@/components/property-amenities-form"
import { PropertyPricingForm } from "@/components/property-pricing-form"
import { PropertyLocationForm } from "@/components/property-location-form"
import { PropertyImagesForm } from "@/components/property-images-form"

export default function AddPropertyPage() {
  const [activeTab, setActiveTab] = useState("basic")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: Number.parseInt(value) || 0,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleNextTab = () => {
    if (activeTab === "basic") setActiveTab("location")
    else if (activeTab === "location") setActiveTab("amenities")
    else if (activeTab === "amenities") setActiveTab("photos")
    else if (activeTab === "photos") setActiveTab("pricing")
  }

  const handlePrevTab = () => {
    if (activeTab === "pricing") setActiveTab("photos")
    else if (activeTab === "photos") setActiveTab("amenities")
    else if (activeTab === "amenities") setActiveTab("location")
    else if (activeTab === "location") setActiveTab("basic")
  }

  return (
    <main className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-6 flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/properties">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to properties</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold md:text-3xl">Add New Property</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
          <CardDescription>Fill in the details about your property to create a new listing.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="mt-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Property Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g. Cozy Beachfront Villa"
                    value={formData.title}
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
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={5}
                    required
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="type">Property Type</Label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="villa">Villa</option>
                      <option value="cabin">Cabin</option>
                      <option value="cottage">Cottage</option>
                      <option value="bungalow">Bungalow</option>
                      <option value="studio">Studio</option>
                      <option value="other">Other</option>
                    </select>
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
                      value={formData.bedrooms}
                      onChange={handleNumberChange}
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
                      value={formData.bathrooms}
                      onChange={handleNumberChange}
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
                      value={formData.maxGuests}
                      onChange={handleNumberChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="location" className="mt-6">
              <PropertyLocationForm />
            </TabsContent>

            <TabsContent value="amenities" className="mt-6">
              <PropertyAmenitiesForm />
            </TabsContent>

            <TabsContent value="photos" className="mt-6">
              <PropertyImagesForm />
            </TabsContent>

            <TabsContent value="pricing" className="mt-6">
              <PropertyPricingForm />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevTab} disabled={activeTab === "basic"}>
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
  )
}

