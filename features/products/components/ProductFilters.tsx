"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";

import { Category } from "@/features/categories/data/categories";

interface Props {
  mobile?: boolean;
  categories: Category[];
}

export default function ProductFilters({
  mobile = false,
  categories,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") ?? "";
  const activeMinPrice = searchParams.get("min_price") ?? "";
  const activeMaxPrice = searchParams.get("max_price") ?? "";

  const [categorySearch, setCategorySearch] = useState("");
  const [category, setCategory] = useState(activeCategory);
  const [minPrice, setMinPrice] = useState(activeMinPrice);
  const [maxPrice, setMaxPrice] = useState(activeMaxPrice);

  const visibleCategories = categorySearch
    ? categories.filter((c) =>
        c.name.toLowerCase().includes(categorySearch.toLowerCase())
      )
    : categories;

  function applyFilters() {
    const params = new URLSearchParams(searchParams.toString());

    category ? params.set("category", category) : params.delete("category");
    minPrice ? params.set("min_price", minPrice) : params.delete("min_price");
    maxPrice ? params.set("max_price", maxPrice) : params.delete("max_price");
    params.delete("page");

    router.push(`${pathname}?${params.toString()}`);
  }

  function clearFilters() {
    setCategory("");
    setMinPrice("");
    setMaxPrice("");

    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("min_price");
    params.delete("max_price");
    params.delete("page");

    router.push(`${pathname}?${params.toString()}`);
  }

  function removeActiveFilter(key: "category" | "min_price" | "max_price") {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    params.delete("page");

    if (key === "category") setCategory("");
    if (key === "min_price") setMinPrice("");
    if (key === "max_price") setMaxPrice("");

    router.push(`${pathname}?${params.toString()}`);
  }

  const activeCategoryName = categories.find(
    (c) => c.slug === activeCategory
  )?.name;

  const hasActiveFilters = activeCategory || activeMinPrice || activeMaxPrice;

  return (
    <aside
      className={
        mobile
          ? ""
          : "sticky top-24 overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm"
      }
    >
      {/* Header */}

      <div className="border-b border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
              <SlidersHorizontal className="h-5 w-5 text-white" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">Filters</h2>
              <p className="text-sm text-slate-500">Refine your search</p>
            </div>
          </div>

          <button
            onClick={clearFilters}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Clear
          </button>
        </div>

        {/* Category search */}

        <div className="relative mt-6">
          <input
            placeholder="Search category..."
            value={categorySearch}
            onChange={(e) => setCategorySearch(e.target.value)}
            className="h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-blue-500"
          />
        </div>
      </div>

      <div className="space-y-8 p-6">
        {/* Categories */}

        <div>
          <h3 className="mb-5 font-bold text-slate-900">Categories</h3>

          <div className="space-y-3">
            <label className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-slate-50">
              <input
                type="radio"
                name="category"
                checked={category === ""}
                onChange={() => setCategory("")}
                className="h-4 w-4 accent-blue-600"
              />
              <span className="text-sm font-medium">All Categories</span>
            </label>

            {visibleCategories.map((item) => (
              <label
                key={item.slug}
                className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 transition hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="category"
                    checked={category === item.slug}
                    onChange={() => setCategory(item.slug)}
                    className="h-4 w-4 accent-blue-600"
                  />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>

                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500">
                  {item.products}
                </span>
              </label>
            ))}
          </div>
        </div>

        <hr />

        {/* Price */}

        <div>
          <h3 className="mb-5 font-bold">Price Range</h3>

          <div className="flex items-center gap-3">
            <input
              type="number"
              min={0}
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-blue-500"
            />
            <span className="text-slate-400">–</span>
            <input
              type="number"
              min={0}
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-blue-500"
            />
          </div>
        </div>

        {/* Active Filters */}

        {hasActiveFilters && (
          <>
            <hr />

            <div>
              <h3 className="mb-4 font-bold">Active Filters</h3>

              <div className="flex flex-wrap gap-2">
                {activeCategory && (
                  <div className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700">
                    {activeCategoryName ?? activeCategory}
                    <X
                      className="h-4 w-4 cursor-pointer"
                      onClick={() => removeActiveFilter("category")}
                    />
                  </div>
                )}

                {activeMinPrice && (
                  <div className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700">
                    Min ${activeMinPrice}
                    <X
                      className="h-4 w-4 cursor-pointer"
                      onClick={() => removeActiveFilter("min_price")}
                    />
                  </div>
                )}

                {activeMaxPrice && (
                  <div className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700">
                    Max ${activeMaxPrice}
                    <X
                      className="h-4 w-4 cursor-pointer"
                      onClick={() => removeActiveFilter("max_price")}
                    />
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Button */}

        <button
          onClick={applyFilters}
          className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          Apply Filters
        </button>
      </div>
    </aside>
  );
}
