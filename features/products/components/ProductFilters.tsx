"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";

import { Category } from "@/features/categories/data/categories";
import { Brand } from "../brandsApi";

interface Props {
  mobile?: boolean;
  categories: Category[];
  brands?: Brand[];
  hideCategories?: boolean;
}

export default function ProductFilters({
  mobile = false,
  categories,
  brands = [],
  hideCategories = false,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") ?? "";
  const activeBrand = searchParams.get("brand") ?? "";
  const activeMinPrice = searchParams.get("min_price") ?? "";
  const activeMaxPrice = searchParams.get("max_price") ?? "";
  const activeMaxMoq = searchParams.get("max_moq") ?? "";
  const activeInStock = searchParams.get("in_stock") === "1";

  const [categorySearch, setCategorySearch] = useState("");
  const [category, setCategory] = useState(activeCategory);
  const [brand, setBrand] = useState(activeBrand);
  const [minPrice, setMinPrice] = useState(activeMinPrice);
  const [maxPrice, setMaxPrice] = useState(activeMaxPrice);
  const [maxMoq, setMaxMoq] = useState(activeMaxMoq);
  const [inStock, setInStock] = useState(activeInStock);

  const visibleCategories = categorySearch
    ? categories.filter((c) =>
        c.name.toLowerCase().includes(categorySearch.toLowerCase())
      )
    : categories;

  function applyFilters() {
    const params = new URLSearchParams(searchParams.toString());

    category ? params.set("category", category) : params.delete("category");
    brand ? params.set("brand", brand) : params.delete("brand");
    minPrice ? params.set("min_price", minPrice) : params.delete("min_price");
    maxPrice ? params.set("max_price", maxPrice) : params.delete("max_price");
    maxMoq ? params.set("max_moq", maxMoq) : params.delete("max_moq");
    inStock ? params.set("in_stock", "1") : params.delete("in_stock");
    params.delete("page");

    router.push(`${pathname}?${params.toString()}`);
  }

  function clearFilters() {
    setCategory("");
    setBrand("");
    setMinPrice("");
    setMaxPrice("");
    setMaxMoq("");
    setInStock(false);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("brand");
    params.delete("min_price");
    params.delete("max_price");
    params.delete("max_moq");
    params.delete("in_stock");
    params.delete("page");

    router.push(`${pathname}?${params.toString()}`);
  }

  type FilterKey = "category" | "brand" | "min_price" | "max_price" | "max_moq" | "in_stock";

  function removeActiveFilter(key: FilterKey) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    params.delete("page");

    if (key === "category") setCategory("");
    if (key === "brand") setBrand("");
    if (key === "min_price") setMinPrice("");
    if (key === "max_price") setMaxPrice("");
    if (key === "max_moq") setMaxMoq("");
    if (key === "in_stock") setInStock(false);

    router.push(`${pathname}?${params.toString()}`);
  }

  const activeCategoryName = categories.find((c) => c.slug === activeCategory)?.name;
  const activeBrandName = brands.find((b) => b.slug === activeBrand)?.name;

  const hasActiveFilters =
    activeCategory || activeBrand || activeMinPrice || activeMaxPrice || activeMaxMoq || activeInStock;

  return (
    <aside
      className={
        mobile
          ? ""
          : "sticky top-20 lg:top-[172px] overflow-hidden rounded-xl border border-border bg-white"
      }
    >
      {/* Header */}

      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sapphire">
              <SlidersHorizontal className="h-4 w-4 text-white" />
            </div>

            <div>
              <h2 className="text-sm font-bold text-obsidian">Filters</h2>
              <p className="text-xs text-obsidian/50">Refine your search</p>
            </div>
          </div>

          <button
            onClick={clearFilters}
            className="text-xs font-semibold text-sapphire hover:text-sapphire-strong"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="space-y-6 p-4">
        {/* Categories */}

        {!hideCategories && (
          <>
            <div>
              <h3 className="mb-3 text-sm font-bold text-obsidian">Categories</h3>

              <input
                placeholder="Search category..."
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                className="mb-3 h-9 w-full rounded-lg border border-border px-3 text-xs outline-none transition focus:border-sapphire"
              />

              <div className="max-h-48 space-y-1 overflow-y-auto">
                <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition hover:bg-ivory">
                  <input
                    type="radio"
                    name="category"
                    checked={category === ""}
                    onChange={() => setCategory("")}
                    className="h-3.5 w-3.5 accent-sapphire"
                  />
                  <span className="text-xs font-medium text-obsidian">All Categories</span>
                </label>

                {visibleCategories.map((item) => (
                  <label
                    key={item.slug}
                    className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 transition hover:bg-ivory"
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="category"
                        checked={category === item.slug}
                        onChange={() => setCategory(item.slug)}
                        className="h-3.5 w-3.5 accent-sapphire"
                      />
                      <span className="text-xs font-medium text-obsidian">{item.name}</span>
                    </div>

                    <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-obsidian/50">
                      {item.products}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-border" />
          </>
        )}

        {/* Brand */}

        {brands.length > 0 && (
          <>
            <div>
              <h3 className="mb-3 text-sm font-bold text-obsidian">Brand</h3>

              <div className="max-h-40 space-y-1 overflow-y-auto">
                <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition hover:bg-ivory">
                  <input
                    type="radio"
                    name="brand"
                    checked={brand === ""}
                    onChange={() => setBrand("")}
                    className="h-3.5 w-3.5 accent-sapphire"
                  />
                  <span className="text-xs font-medium text-obsidian">All Brands</span>
                </label>

                {brands.map((item) => (
                  <label
                    key={item.slug}
                    className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition hover:bg-ivory"
                  >
                    <input
                      type="radio"
                      name="brand"
                      checked={brand === item.slug}
                      onChange={() => setBrand(item.slug)}
                      className="h-3.5 w-3.5 accent-sapphire"
                    />
                    <span className="text-xs font-medium text-obsidian">{item.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-border" />
          </>
        )}

        {/* Price */}

        <div>
          <h3 className="mb-3 text-sm font-bold text-obsidian">Price Range</h3>

          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="h-9 w-full rounded-lg border border-border px-3 text-xs outline-none transition focus:border-sapphire"
            />
            <span className="text-obsidian/30">–</span>
            <input
              type="number"
              min={0}
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="h-9 w-full rounded-lg border border-border px-3 text-xs outline-none transition focus:border-sapphire"
            />
          </div>
        </div>

        <hr className="border-border" />

        {/* MOQ */}

        <div>
          <h3 className="mb-3 text-sm font-bold text-obsidian">Maximum MOQ</h3>

          <input
            type="number"
            min={0}
            placeholder="e.g. 5"
            value={maxMoq}
            onChange={(e) => setMaxMoq(e.target.value)}
            className="h-9 w-full rounded-lg border border-border px-3 text-xs outline-none transition focus:border-sapphire"
          />
        </div>

        <hr className="border-border" />

        {/* In stock */}

        <label className="flex cursor-pointer items-center gap-2.5">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
            className="h-3.5 w-3.5 accent-sapphire"
          />
          <span className="text-sm font-medium text-obsidian">In stock only</span>
        </label>

        {/* Active Filters */}

        {hasActiveFilters && (
          <>
            <hr className="border-border" />

            <div>
              <h3 className="mb-3 text-sm font-bold text-obsidian">Active Filters</h3>

              <div className="flex flex-wrap gap-1.5">
                {activeCategory && (
                  <div className="flex items-center gap-1.5 rounded-full bg-sapphire-soft px-2.5 py-1.5 text-xs font-medium text-sapphire-strong">
                    {activeCategoryName ?? activeCategory}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeActiveFilter("category")} />
                  </div>
                )}

                {activeBrand && (
                  <div className="flex items-center gap-1.5 rounded-full bg-sapphire-soft px-2.5 py-1.5 text-xs font-medium text-sapphire-strong">
                    {activeBrandName ?? activeBrand}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeActiveFilter("brand")} />
                  </div>
                )}

                {activeMinPrice && (
                  <div className="flex items-center gap-1.5 rounded-full bg-sapphire-soft px-2.5 py-1.5 text-xs font-medium text-sapphire-strong">
                    Min ${activeMinPrice}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeActiveFilter("min_price")} />
                  </div>
                )}

                {activeMaxPrice && (
                  <div className="flex items-center gap-1.5 rounded-full bg-sapphire-soft px-2.5 py-1.5 text-xs font-medium text-sapphire-strong">
                    Max ${activeMaxPrice}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeActiveFilter("max_price")} />
                  </div>
                )}

                {activeMaxMoq && (
                  <div className="flex items-center gap-1.5 rounded-full bg-sapphire-soft px-2.5 py-1.5 text-xs font-medium text-sapphire-strong">
                    Max MOQ {activeMaxMoq}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeActiveFilter("max_moq")} />
                  </div>
                )}

                {activeInStock && (
                  <div className="flex items-center gap-1.5 rounded-full bg-sapphire-soft px-2.5 py-1.5 text-xs font-medium text-sapphire-strong">
                    In stock
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeActiveFilter("in_stock")} />
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Button */}

        <button
          onClick={applyFilters}
          className="w-full rounded-lg bg-sapphire py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sapphire-strong"
        >
          Apply Filters
        </button>
      </div>
    </aside>
  );
}
