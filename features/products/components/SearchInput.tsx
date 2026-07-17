"use client";

import {
  Search,
  Sparkles,
} from "lucide-react";

interface Props {
  placeholder?: string;
}

export default function SearchInput({
  placeholder = "Search products, suppliers or categories...",
}: Props) {
  return (
    <div className="relative">

      <div className="group flex overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-xl focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

        {/* Left */}

        <div className="flex items-center gap-3 px-5">

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">

            <Search className="h-5 w-5 text-white" />

          </div>

        </div>

        {/* Input */}

        <input
          type="search"
          placeholder={placeholder}
          className="
            h-16
            flex-1
            border-0
            bg-transparent
            px-1
            text-[15px]
            font-medium
            text-slate-900
            placeholder:text-slate-400
            outline-none
          "
        />

        {/* Right */}

        <div className="hidden items-center gap-2 pr-5 lg:flex">

          <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-500">
            Products
          </span>

          <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-500">
            Suppliers
          </span>

          <button className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700">

            <Sparkles className="h-5 w-5" />

          </button>

        </div>

      </div>

    </div>
  );
}