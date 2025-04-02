"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PropertySearchBarProps {
  initialValue?: string;
  onSearch: (query: string) => void;
  onClear?: () => void;
  className?: string;
  placeholder?: string;
}

export function PropertySearchBar({
  initialValue = "",
  onSearch,
  onClear,
  className,
  placeholder = "Search locations, properties, amenities...",
}: PropertySearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  // Update local state if initialValue prop changes
  useEffect(() => {
    setSearchQuery(initialValue);
  }, [initialValue]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery("");
    if (onClear) {
      onClear();
    } else {
      onSearch(""); // Fall back to searching with empty string if no onClear provided
    }
  };

  return (
    <form onSubmit={handleSearch} className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          className={cn(
            "h-12 w-full rounded-full border pl-10 pr-16 focus-visible:ring-offset-2",
            isFocused && "ring-2 ring-ring ring-offset-2"
          )}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <div className="absolute right-1 top-1/2  -translate-y-1/2  flex flex-row items-center gap-4">
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className=" h-8 w-8  rounded-full p-0 hover:bg-muted"
              onClick={handleClear}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}

          <Button
            type="submit"
            className="h-10 rounded-full px-4 text-sm font-medium"
          >
            Search
          </Button>
        </div>
      </div>
    </form>
  );
}
