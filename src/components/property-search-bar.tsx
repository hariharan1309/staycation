"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface PropertySearchBarProps {
  initialValue?: string;
  onSearch: (query: string) => void;
}

export function PropertySearchBar({
  initialValue = "",
  onSearch,
}: PropertySearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(initialValue);

  // Update local state if initialValue prop changes
  useEffect(() => {
    setSearchQuery(initialValue);
  }, [initialValue]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search locations, properties, amenities..."
          className="h-12 w-full rounded-full border bg-background pl-10 pr-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:pr-20"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-1 top-1/2 hidden h-10 -translate-y-1/2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground md:block"
        >
          Search
        </button>
      </div>
    </form>
  );
}
