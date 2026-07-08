"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SortDropdown() {
  return (
    <Select defaultValue="newest">
      <SelectTrigger className="h-12 w-full md:w-56 rounded-xl">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="newest">Newest</SelectItem>
        <SelectItem value="popular">Most Popular</SelectItem>
        <SelectItem value="price-asc">Price: Low → High</SelectItem>
        <SelectItem value="price-desc">Price: High → Low</SelectItem>
        <SelectItem value="rating">Highest Rated</SelectItem>
      </SelectContent>
    </Select>
  );
}