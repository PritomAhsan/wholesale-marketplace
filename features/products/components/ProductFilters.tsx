"use client";

import {
  BadgeCheck,
  Globe2,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Truck,
  X,
} from "lucide-react";

const categories = [
  { name: "Electronics", count: 1240 },
  { name: "Fashion", count: 865 },
  { name: "Furniture", count: 412 },
  { name: "Packaging", count: 294 },
  { name: "Machinery", count: 387 },
  { name: "Home & Living", count: 538 },
];

const countries = [
  "China",
  "Bangladesh",
  "India",
  "Turkey",
  "Vietnam",
  "Germany",
];

export default function ProductFilters({
  mobile = false,
}: {
  mobile?: boolean;
}) {
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

              <h2 className="text-xl font-bold text-slate-900">
                Filters
              </h2>

              <p className="text-sm text-slate-500">
                Refine your search
              </p>

            </div>

          </div>

          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            Clear
          </button>

        </div>

        {/* Search */}

        <div className="relative mt-6">

          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            placeholder="Search category..."
            className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4 outline-none transition focus:border-blue-500"
          />

        </div>

      </div>

      <div className="space-y-8 p-6">

        {/* Categories */}

        <div>

          <h3 className="mb-5 font-bold text-slate-900">
            Categories
          </h3>

          <div className="space-y-3">

            {categories.map((item) => (
              <label
                key={item.name}
                className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 transition hover:bg-slate-50"
              >

                <div className="flex items-center gap-3">

                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded accent-blue-600"
                  />

                  <span className="text-sm font-medium">
                    {item.name}
                  </span>

                </div>

                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500">
                  {item.count}
                </span>

              </label>
            ))}

          </div>

        </div>

        <hr />

        {/* Countries */}

        <div>

          <h3 className="mb-5 font-bold">
            Supplier Country
          </h3>

          <div className="space-y-3">

            {countries.map((country) => (
              <label
                key={country}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-slate-50"
              >

                <input
                  type="checkbox"
                  className="h-4 w-4 accent-blue-600"
                />

                <Globe2 className="h-4 w-4 text-slate-400" />

                <span className="text-sm">
                  {country}
                </span>

              </label>
            ))}

          </div>

        </div>

        <hr />

        {/* Price */}

        <div>

          <h3 className="mb-5 font-bold">
            Price Range
          </h3>

          <input
            type="range"
            min={0}
            max={1000}
            className="w-full accent-blue-600"
          />

          <div className="mt-3 flex justify-between">

            <span className="rounded-xl bg-slate-100 px-3 py-2 text-sm">
              $0
            </span>

            <span className="rounded-xl bg-slate-100 px-3 py-2 text-sm">
              $1000+
            </span>

          </div>

        </div>

        <hr />

        {/* MOQ */}

        <div>

          <h3 className="mb-5 font-bold">
            Minimum Order Quantity
          </h3>

          <input
            placeholder="100"
            className="h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-blue-500"
          />

        </div>

        <hr />

        {/* Supplier */}

        <div>

          <h3 className="mb-5 font-bold">
            Supplier Features
          </h3>

          <div className="space-y-3">

            <label className="flex items-center gap-3">

              <input type="checkbox" className="accent-blue-600" />

              <BadgeCheck className="h-4 w-4 text-blue-600" />

              Verified Supplier

            </label>

            <label className="flex items-center gap-3">

              <input type="checkbox" className="accent-blue-600" />

              <ShieldCheck className="h-4 w-4 text-green-600" />

              Trade Assurance

            </label>

            <label className="flex items-center gap-3">

              <input type="checkbox" className="accent-blue-600" />

              <Truck className="h-4 w-4 text-orange-500" />

              Ready To Ship

            </label>

          </div>

        </div>

        <hr />

        {/* Rating */}

        <div>

          <h3 className="mb-5 font-bold">
            Rating
          </h3>

          {[5, 4, 3].map((rating) => (
            <label
              key={rating}
              className="mb-3 flex items-center gap-3"
            >

              <input
                type="radio"
                name="rating"
                className="accent-blue-600"
              />

              <div className="flex">

                {Array.from({ length: rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}

              </div>

              <span className="text-sm">
                & Up
              </span>

            </label>
          ))}

        </div>

        {/* Active Filters */}

        <div>

          <h3 className="mb-4 font-bold">
            Active Filters
          </h3>

          <div className="flex flex-wrap gap-2">

            <div className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700">

              Electronics

              <X className="h-4 w-4 cursor-pointer" />

            </div>

            <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-2 text-sm font-medium text-green-700">

              Verified

              <X className="h-4 w-4 cursor-pointer" />

            </div>

          </div>

        </div>

        {/* Button */}

        <button className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          Apply Filters
        </button>

      </div>

    </aside>
  );
}