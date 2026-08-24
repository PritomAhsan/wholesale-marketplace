"use client";

import MobileFilters from "./MobileFilters";
import SortDropdown from "./SortDropdown";
import SearchInput from "./SearchInput";

import { Category } from "@/features/categories/data/categories";
import { Brand } from "../brandsApi";

interface Props {
  total: number;
  categories: Category[];
  brands?: Brand[];
  hideCategories?: boolean;
}

export default function ProductToolbar({
  total,
  categories,
  brands = [],
  hideCategories = false,
}: Props) {
  return (
    <div className="space-y-4 border-b border-border pb-6">
      {/* Refine search — keeps every other active filter/sort param intact,
          unlike the hero search box above which starts a fresh search. */}
      <SearchInput placeholder="Refine search within these results..." />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-sm text-obsidian/60">
          <span className="font-semibold text-obsidian">{total}</span>{" "}
          wholesale product{total === 1 ? "" : "s"}
        </p>

        <div className="flex items-center gap-3">
          <div className="lg:hidden">
            <MobileFilters categories={categories} brands={brands} hideCategories={hideCategories} />
          </div>

          <SortDropdown />
        </div>
      </div>
    </div>
  );
}
