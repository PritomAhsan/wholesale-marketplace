"use client";

import { SlidersHorizontal } from "lucide-react";

const categories = [
  "Electronics",
  "Fashion",
  "Furniture",
  "Packaging",
  "Machinery",
  "Home & Living",
];

const countries = [
  "China",
  "Bangladesh",
  "India",
  "Turkey",
  "Vietnam",
  "Germany",
];

interface Props {
  mobile?: boolean;
}

export default function ProductFilters({
  mobile = false,
}: Props) {
  return (
    <aside
  className={
    mobile
      ? ""
      : "sticky top-24 h-fit rounded-3xl border border-slate-200 bg-white p-6"
  }
>

      <div className="mb-8 flex items-center gap-3">

        <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
          <SlidersHorizontal size={18} />
        </div>

        <h2 className="text-lg font-bold">
          Filters
        </h2>

      </div>

      {/* Categories */}

      <div>

        <h3 className="mb-4 font-semibold">
          Categories
        </h3>

        <div className="space-y-3">

          {categories.map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-blue-600"
              />

              <span className="text-sm">
                {category}
              </span>

            </label>
          ))}

        </div>

      </div>

      <hr className="my-8" />

      {/* Countries */}

      <div>

        <h3 className="mb-4 font-semibold">
          Countries
        </h3>

        <div className="space-y-3">

          {countries.map((country) => (
            <label
              key={country}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-blue-600"
              />

              <span className="text-sm">
                {country}
              </span>

            </label>
          ))}

        </div>

      </div>

      <hr className="my-8" />

      {/* Price */}

      <div>

        <h3 className="mb-4 font-semibold">
          Price Range
        </h3>

        <input
          type="range"
          min={0}
          max={500}
          className="w-full accent-blue-600"
        />

        <div className="mt-3 flex justify-between text-sm text-slate-500">
          <span>$0</span>
          <span>$500+</span>
        </div>

      </div>

      <hr className="my-8" />

      {/* MOQ */}

      <div>

        <h3 className="mb-4 font-semibold">
          Minimum Order Quantity
        </h3>

        <input
          type="number"
          placeholder="e.g. 100"
          className="h-11 w-full rounded-xl border border-slate-200 px-4 outline-none focus:border-blue-500"
        />

      </div>

      <button
        className="
          mt-8
          w-full
          rounded-xl
          bg-blue-600
          py-3
          font-semibold
          text-white
          transition
          hover:bg-blue-700
        "
      >
        Apply Filters
      </button>

    </aside>
  );
}