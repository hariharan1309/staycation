"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, MapPinIcon, SearchIcon, UserIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DatePickerWithRange } from "@/components/date-range-picker"

export function PropertySearchBar() {
  const [destination, setDestination] = useState("")
  const [guests, setGuests] = useState(2)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic here
    console.log("Searching for:", { destination, guests })
  }

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <form onSubmit={handleSearch} className="grid gap-4 md:grid-cols-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <MapPinIcon className="h-4 w-4" />
            <span>Where</span>
          </div>
          <Input
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="h-10"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <CalendarIcon className="h-4 w-4" />
            <span>When</span>
          </div>
          <DatePickerWithRange className="h-10" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <UserIcon className="h-4 w-4" />
            <span>Guests</span>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min={1}
              value={guests}
              onChange={(e) => setGuests(Number.parseInt(e.target.value))}
              className="h-10"
            />
            <Button type="submit" size="sm" className="h-10 px-6">
              <SearchIcon className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

