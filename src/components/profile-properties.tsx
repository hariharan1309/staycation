"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Edit,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate } from "date-fns";

export function ProfileProperties({ data }: { data: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);

  // Filter properties based on search query
  const filteredProperties = data.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location?.city
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      false ||
      property.location?.country
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      false;

    return matchesSearch;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortOrder === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortOrder === "price-high") {
      return (b.pricing?.basePrice || 0) - (a.pricing?.basePrice || 0);
    } else if (sortOrder === "price-low") {
      return (a.pricing?.basePrice || 0) - (b.pricing?.basePrice || 0);
    } else {
      return 0;
    }
  });

  const handleDeleteProperty = (id: string) => {
    setPropertyToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // In a real app, this would call an API to delete the property
    console.log(`Deleting property ${propertyToDelete}`);
    setDeleteDialogOpen(false);
    setPropertyToDelete(null);
  };

  return (
    <div className="space-y-6 mt-2">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold">Your Properties</h2>
        <Button asChild>
          <Link href="/properties/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Property
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search properties..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        {sortedProperties.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mb-4 h-12 w-12 text-muted-foreground"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
              />
            </svg>
            <h3 className="mb-2 text-xl font-semibold">No properties found</h3>
            <p className="mb-6 text-muted-foreground">
              You don't have any properties that match your search.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          sortedProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={
                    property.images?.length > 0
                      ? property.images[0]
                      : "/placeholder.svg"
                  }
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/properties/${property.id}`}>
                        View Listing
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/properties/${property.id}/edit`}>
                        Edit Property
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => handleDeleteProperty(property.id)}
                    >
                      Delete Property
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{property.title}</h3>
                    <div className="mt-1 flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-1 h-3 w-3" />
                      {property.location?.city}, {property.location?.country}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium capitalize">
                      {property.type}
                    </span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="font-medium">Price</p>
                    <p className="text-muted-foreground">
                      ${property.pricing?.basePrice}/night
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Rooms</p>
                    <p className="text-muted-foreground">
                      {property.bedrooms} bed, {property.bathrooms} bath
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Max Guests</p>
                    <p className="text-muted-foreground">
                      {property.maxGuests} guests
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Created</p>
                    <p className="text-muted-foreground">
                      {formatDate(
                        new Date(property.createdAt).toLocaleDateString(),
                        "MMM-dd-yyyy"
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/properties/${property.id}/edit`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/properties/${property.id}`}>View Listing</Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Property</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this property? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash className="mr-2 h-4 w-4" />
              Delete Property
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
