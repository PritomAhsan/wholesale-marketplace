"use client";

import {
  ArrowDownWideNarrow,
  Sparkles,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SortDropdown() {
  return (
    <div className="flex items-center gap-3">

      {/* Desktop Label */}

      <div className="hidden h-12 items-center gap-2 rounded-2xl bg-slate-100 px-4 lg:flex">

        <ArrowDownWideNarrow className="h-4 w-4 text-blue-600" />

        <span className="text-sm font-semibold text-slate-700">
          Sort By
        </span>

      </div>

      <Select defaultValue="featured">

        <SelectTrigger
          className="
            h-12
            w-full
            rounded-2xl
            border-slate-200
            bg-white
            shadow-sm
            transition-all
            duration-300
            hover:border-blue-400
            hover:shadow-lg
            md:w-72
          "
        >

          <div className="flex items-center gap-2">

            <Sparkles className="h-4 w-4 text-blue-600" />

            <SelectValue />

          </div>

        </SelectTrigger>

        <SelectContent className="rounded-2xl">

          <SelectItem value="featured">
            Featured Products
          </SelectItem>

          <SelectItem value="newest">
            Newest Arrivals
          </SelectItem>

          <SelectItem value="popular">
            Most Popular
          </SelectItem>

          <SelectItem value="rating">
            Highest Rated
          </SelectItem>

          <SelectItem value="orders">
            Best Selling
          </SelectItem>

          <SelectItem value="price-low">
            Price: Low → High
          </SelectItem>

          <SelectItem value="price-high">
            Price: High → Low
          </SelectItem>

          <SelectItem value="moq-low">
            Lowest MOQ
          </SelectItem>

          <SelectItem value="verified">
            Verified Suppliers
          </SelectItem>

        </SelectContent>

      </Select>

    </div>
  );
}