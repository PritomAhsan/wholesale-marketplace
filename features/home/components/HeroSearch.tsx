"use client";

import { Search, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";

import { AppButton } from "@/components/ui/app-button";
import { AppInput } from "@/components/ui/app-input";

const categories = [
  "Products",
  "Suppliers",
  "Manufacturers",
];

const trending = [
  "LED Lights",
  "Solar Panels",
  "Safety Gloves",
  "Office Furniture",
  "Wireless Earbuds",
];

export default function HeroSearch() {
  return (
    <div className="mt-10">

      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl">

        {/* Search Row */}

        <div className="flex flex-col lg:flex-row">

          {/* Category */}

          <div className="flex items-center border-b border-slate-200 bg-slate-50 px-6 lg:w-64 lg:border-b-0 lg:border-r">

            <Sparkles className="mr-3 h-5 w-5 text-blue-600" />

            <select className="h-16 w-full cursor-pointer bg-transparent text-sm font-semibold outline-none">

              {categories.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}

            </select>

          </div>

          {/* Input */}

          <div className="flex flex-1 items-center px-6">

            <Search className="mr-4 h-5 w-5 text-slate-400" />

            <AppInput
              placeholder="Search products, suppliers, manufacturers or brands..."
              className="h-16 border-0 bg-transparent px-0 text-base shadow-none placeholder:text-slate-400 focus-visible:ring-0"
            />

          </div>

          {/* Button */}

          <div className="p-3">

            <AppButton
              size="lg"
              className="h-14 rounded-2xl px-10 text-base font-semibold shadow-lg"
            >
              Search
            </AppButton>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t bg-slate-50 px-6 py-5">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Trending */}

            <div className="flex flex-wrap items-center gap-3">

              <div className="flex items-center gap-2">

                <TrendingUp className="h-4 w-4 text-blue-600" />

                <span className="text-sm font-semibold text-slate-700">
                  Trending:
                </span>

              </div>

              {trending.map((item) => (
                <Link
                  key={item}
                  href="/products"
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition-all hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
                >
                  {item}
                </Link>
              ))}

            </div>

            {/* Features */}

            <div className="flex flex-wrap gap-3">

              <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-semibold text-green-700">
                ✔ Verified Suppliers
              </span>

              <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold text-blue-700">
                ✔ Secure RFQ
              </span>

              <span className="rounded-full bg-orange-100 px-4 py-2 text-xs font-semibold text-orange-700">
                ✔ Global Shipping
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}